-- ============================================================================
-- AI Module Tables
-- ============================================================================

-- Update trigger helper
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Section 1: AI Models & Sessions
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_models_school_id ON ai_models(school_id);

ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_models
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_models_updated_at
  BEFORE UPDATE ON ai_models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  model_id UUID REFERENCES ai_models(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_sessions_school_id ON ai_sessions(school_id);
CREATE INDEX idx_ai_sessions_user_id ON ai_sessions(user_id);
CREATE INDEX idx_ai_sessions_model_id ON ai_sessions(model_id);

ALTER TABLE ai_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_sessions
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_sessions_updated_at
  BEFORE UPDATE ON ai_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Section 2: AI Conversations & Messages
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES ai_sessions(id) ON DELETE CASCADE,
  title TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_conversations_school_id ON ai_conversations(school_id);
CREATE INDEX idx_ai_conversations_session_id ON ai_conversations(session_id);

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_conversations
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_conversations_updated_at
  BEFORE UPDATE ON ai_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_messages_school_id ON ai_messages(school_id);
CREATE INDEX idx_ai_messages_conversation_id ON ai_messages(conversation_id);

ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_messages
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_messages_updated_at
  BEFORE UPDATE ON ai_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Section 3: AI Generated Content & Jobs
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  session_id UUID REFERENCES ai_sessions(id) ON DELETE SET NULL,
  content_type TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_generated_content_school_id ON ai_generated_content(school_id);
CREATE INDEX idx_ai_generated_content_session_id ON ai_generated_content(session_id);

ALTER TABLE ai_generated_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_generated_content
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_generated_content_updated_at
  BEFORE UPDATE ON ai_generated_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_generation_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  job_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_generation_batches_school_id ON ai_generation_batches(school_id);

ALTER TABLE ai_generation_batches ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_generation_batches
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_generation_batches_updated_at
  BEFORE UPDATE ON ai_generation_batches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  prompt TEXT NOT NULL,
  model_id UUID REFERENCES ai_models(id) ON DELETE SET NULL,
  batch_id UUID REFERENCES ai_generation_batches(id) ON DELETE SET NULL,
  result TEXT,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_generation_jobs_school_id ON ai_generation_jobs(school_id);
CREATE INDEX idx_ai_generation_jobs_model_id ON ai_generation_jobs(model_id);
CREATE INDEX idx_ai_generation_jobs_batch_id ON ai_generation_jobs(batch_id);

ALTER TABLE ai_generation_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_generation_jobs
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_generation_jobs_updated_at
  BEFORE UPDATE ON ai_generation_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_generation_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES ai_generation_jobs(id) ON DELETE CASCADE,
  priority INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'queued',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_generation_queue_school_id ON ai_generation_queue(school_id);
CREATE INDEX idx_ai_generation_queue_job_id ON ai_generation_queue(job_id);

ALTER TABLE ai_generation_queue ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_generation_queue
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_generation_queue_updated_at
  BEFORE UPDATE ON ai_generation_queue
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_generation_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  model_id UUID REFERENCES ai_models(id) ON DELETE SET NULL,
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  period TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_generation_metrics_school_id ON ai_generation_metrics(school_id);
CREATE INDEX idx_ai_generation_metrics_model_id ON ai_generation_metrics(model_id);

ALTER TABLE ai_generation_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_generation_metrics
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_generation_metrics_updated_at
  BEFORE UPDATE ON ai_generation_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Section 4: AI Prompts
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_prompt_libraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_prompt_libraries_school_id ON ai_prompt_libraries(school_id);

ALTER TABLE ai_prompt_libraries ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_prompt_libraries
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_prompt_libraries_updated_at
  BEFORE UPDATE ON ai_prompt_libraries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_prompt_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  library_id UUID REFERENCES ai_prompt_libraries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_prompt_categories_school_id ON ai_prompt_categories(school_id);
CREATE INDEX idx_ai_prompt_categories_library_id ON ai_prompt_categories(library_id);

ALTER TABLE ai_prompt_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_prompt_categories
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_prompt_categories_updated_at
  BEFORE UPDATE ON ai_prompt_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  category_id UUID REFERENCES ai_prompt_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  template TEXT NOT NULL,
  model_id UUID REFERENCES ai_models(id) ON DELETE SET NULL,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_prompts_school_id ON ai_prompts(school_id);
CREATE INDEX idx_ai_prompts_category_id ON ai_prompts(category_id);
CREATE INDEX idx_ai_prompts_model_id ON ai_prompts(model_id);

ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_prompts
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_prompts_updated_at
  BEFORE UPDATE ON ai_prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES ai_prompts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_prompt_templates_school_id ON ai_prompt_templates(school_id);
CREATE INDEX idx_ai_prompt_templates_prompt_id ON ai_prompt_templates(prompt_id);

ALTER TABLE ai_prompt_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_prompt_templates
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_prompt_templates_updated_at
  BEFORE UPDATE ON ai_prompt_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_prompt_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES ai_prompts(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content TEXT NOT NULL,
  changelog TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_prompt_versions_school_id ON ai_prompt_versions(school_id);
CREATE INDEX idx_ai_prompt_versions_prompt_id ON ai_prompt_versions(prompt_id);

ALTER TABLE ai_prompt_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_prompt_versions
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_prompt_versions_updated_at
  BEFORE UPDATE ON ai_prompt_versions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_prompt_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES ai_prompts(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_prompt_tags_school_id ON ai_prompt_tags(school_id);
CREATE INDEX idx_ai_prompt_tags_prompt_id ON ai_prompt_tags(prompt_id);

ALTER TABLE ai_prompt_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_prompt_tags
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_prompt_tags_updated_at
  BEFORE UPDATE ON ai_prompt_tags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Section 5: AI Prompt Evaluation & Optimization
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_prompt_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES ai_prompts(id) ON DELETE CASCADE,
  evaluator_id UUID,
  score NUMERIC,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_prompt_evaluations_school_id ON ai_prompt_evaluations(school_id);
CREATE INDEX idx_ai_prompt_evaluations_prompt_id ON ai_prompt_evaluations(prompt_id);

ALTER TABLE ai_prompt_evaluations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_prompt_evaluations
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_prompt_evaluations_updated_at
  BEFORE UPDATE ON ai_prompt_evaluations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_prompt_optimizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES ai_prompts(id) ON DELETE CASCADE,
  original_prompt TEXT NOT NULL,
  optimized_prompt TEXT NOT NULL,
  metrics JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_prompt_optimizations_school_id ON ai_prompt_optimizations(school_id);
CREATE INDEX idx_ai_prompt_optimizations_prompt_id ON ai_prompt_optimizations(prompt_id);

ALTER TABLE ai_prompt_optimizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_prompt_optimizations
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_prompt_optimizations_updated_at
  BEFORE UPDATE ON ai_prompt_optimizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Section 6: AI Prompt Usage (Consolidated)
-- ============================================================================
-- This single table replaces all ai_prompt_usage_* tables that shared a
-- near-identical schema. The 'usage_type' column disambiguates which
-- concept the row represents (e.g. 'feedback', 'ab_test', 'cache',
-- 'search', 'analytics', 'costs', 'limits', 'report', etc.).

CREATE TABLE IF NOT EXISTS ai_prompt_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES ai_prompts(id) ON DELETE CASCADE,
  user_id UUID,
  usage_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  name TEXT,
  description TEXT,
  content TEXT,
  metadata JSONB DEFAULT '{}',
  score NUMERIC,
  value NUMERIC,
  tokens_used INTEGER DEFAULT 0,
  cost NUMERIC DEFAULT 0,
  period TEXT,
  tags TEXT[] DEFAULT '{}',
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_prompt_usage_school_id ON ai_prompt_usage(school_id);
CREATE INDEX idx_ai_prompt_usage_prompt_id ON ai_prompt_usage(prompt_id);
CREATE INDEX idx_ai_prompt_usage_user_id ON ai_prompt_usage(user_id);
CREATE INDEX idx_ai_prompt_usage_usage_type ON ai_prompt_usage(usage_type);

ALTER TABLE ai_prompt_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_prompt_usage
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_prompt_usage_updated_at
  BEFORE UPDATE ON ai_prompt_usage
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- Section 6a: Prompt Usage Sharing / Access
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_prompt_usage_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  usage_id UUID NOT NULL REFERENCES ai_prompt_usage(id) ON DELETE CASCADE,
  grantee_id UUID NOT NULL,
  permission TEXT NOT NULL DEFAULT 'read',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_prompt_usage_access_school_id ON ai_prompt_usage_access(school_id);
CREATE INDEX idx_ai_prompt_usage_access_usage_id ON ai_prompt_usage_access(usage_id);

ALTER TABLE ai_prompt_usage_access ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ai_prompt_usage_access
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER ai_prompt_usage_access_updated_at
  BEFORE UPDATE ON ai_prompt_usage_access
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
