-- ============================================================================
-- Enterprise Module Tables Migration
-- Created: 2026-08-21
-- ============================================================================
-- Sections:
--   1. Worker Pools
--   2. Vulnerability Scans
--   3. Feature Flags
--   4. Workflow Engine
--   5. Scheduler Core
--   6. Scheduler Notifications (consolidated)
-- ============================================================================

-- Helper: update_updated_at_column trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. WORKER POOLS
-- ============================================================================

CREATE TABLE ent_worker_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'draining', 'terminated')),
  min_workers INTEGER NOT NULL DEFAULT 1,
  max_workers INTEGER NOT NULL DEFAULT 10,
  current_workers INTEGER NOT NULL DEFAULT 0,
  target_workers INTEGER NOT NULL DEFAULT 1,
  idle_timeout_seconds INTEGER NOT NULL DEFAULT 300,
  scale_up_threshold NUMERIC(5,2) DEFAULT 0.8,
  scale_down_threshold NUMERIC(5,2) DEFAULT 0.2,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_worker_pools_school_id ON ent_worker_pools(school_id);
CREATE INDEX idx_ent_worker_pools_status ON ent_worker_pools(school_id, status);

CREATE TRIGGER ent_worker_pools_updated_at
  BEFORE UPDATE ON ent_worker_pools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_worker_pools ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_worker_pools
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_worker_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  pool_id UUID NOT NULL REFERENCES ent_worker_pools(id) ON DELETE CASCADE,
  worker_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'idle' CHECK (status IN ('idle', 'busy', 'draining', 'terminated')),
  current_task_id UUID,
  tasks_completed INTEGER NOT NULL DEFAULT 0,
  tasks_failed INTEGER NOT NULL DEFAULT 0,
  last_heartbeat_at TIMESTAMPTZ,
  capacity NUMERIC(5,2) NOT NULL DEFAULT 1.0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_worker_assignments_school_id ON ent_worker_assignments(school_id);
CREATE INDEX idx_ent_worker_assignments_pool_id ON ent_worker_assignments(pool_id);
CREATE INDEX idx_ent_worker_assignments_status ON ent_worker_assignments(school_id, status);

CREATE TRIGGER ent_worker_assignments_updated_at
  BEFORE UPDATE ON ent_worker_assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_worker_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_worker_assignments
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_worker_pool_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  pool_id UUID NOT NULL REFERENCES ent_worker_pools(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_level INTEGER NOT NULL DEFAULT 1 CHECK (skill_level BETWEEN 1 AND 10),
  required_for_task BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(pool_id, skill_name)
);

CREATE INDEX idx_ent_worker_pool_skills_school_id ON ent_worker_pool_skills(school_id);
CREATE INDEX idx_ent_worker_pool_skills_pool_id ON ent_worker_pool_skills(pool_id);

CREATE TRIGGER ent_worker_pool_skills_updated_at
  BEFORE UPDATE ON ent_worker_pool_skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_worker_pool_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_worker_pool_skills
  USING (school_id = (current_setting('app.current_school_id')::uuid));
-- ============================================================================
-- 2. VULNERABILITY SCANS
-- ============================================================================

CREATE TABLE ent_vulnerability_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
  scan_type TEXT NOT NULL DEFAULT 'full' CHECK (scan_type IN ('full', 'incremental', 'targeted', 'compliance')),
  target_scope TEXT NOT NULL DEFAULT 'all',
  target_resources JSONB DEFAULT '[]',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER,
  findings_count INTEGER NOT NULL DEFAULT 0,
  critical_count INTEGER NOT NULL DEFAULT 0,
  high_count INTEGER NOT NULL DEFAULT 0,
  medium_count INTEGER NOT NULL DEFAULT 0,
  low_count INTEGER NOT NULL DEFAULT 0,
  info_count INTEGER NOT NULL DEFAULT 0,
  scanner_version TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_vulnerability_scans_school_id ON ent_vulnerability_scans(school_id);
CREATE INDEX idx_ent_vulnerability_scans_status ON ent_vulnerability_scans(school_id, status);
CREATE INDEX idx_ent_vulnerability_scans_started_at ON ent_vulnerability_scans(school_id, started_at DESC);

CREATE TRIGGER ent_vulnerability_scans_updated_at
  BEFORE UPDATE ON ent_vulnerability_scans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_vulnerability_scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_vulnerability_scans
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_vulnerability_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  scan_id UUID NOT NULL REFERENCES ent_vulnerability_scans(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('critical', 'high', 'medium', 'low', 'info')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'confirmed', 'false_positive', 'fixed', 'accepted', 'deferred')),
  category TEXT,
  resource_type TEXT,
  resource_id TEXT,
  resource_name TEXT,
  evidence JSONB DEFAULT '{}',
  recommendation TEXT,
  cvss_score NUMERIC(3,1),
  cve_id TEXT,
  cwe_id TEXT,
  exploit_available BOOLEAN DEFAULT false,
  remediation_effort TEXT CHECK (remediation_effort IN ('low', 'medium', 'high')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_vulnerability_findings_school_id ON ent_vulnerability_findings(school_id);
CREATE INDEX idx_ent_vulnerability_findings_scan_id ON ent_vulnerability_findings(scan_id);
CREATE INDEX idx_ent_vulnerability_findings_severity ON ent_vulnerability_findings(school_id, severity);
CREATE INDEX idx_ent_vulnerability_findings_status ON ent_vulnerability_findings(school_id, status);
CREATE INDEX idx_ent_vulnerability_findings_assigned_to ON ent_vulnerability_findings(assigned_to) WHERE assigned_to IS NOT NULL;

CREATE TRIGGER ent_vulnerability_findings_updated_at
  BEFORE UPDATE ON ent_vulnerability_findings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_vulnerability_findings ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_vulnerability_findings
  USING (school_id = (current_setting('app.current_school_id')::uuid));
-- ============================================================================
-- 3. FEATURE FLAGS
-- ============================================================================

CREATE TABLE ent_feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive', 'archived')),
  flag_type TEXT NOT NULL DEFAULT 'boolean' CHECK (flag_type IN ('boolean', 'percentage', 'variant', 'experiment', 'kill_switch')),
  default_value JSONB NOT NULL DEFAULT 'false',
  enabled BOOLEAN NOT NULL DEFAULT false,
  archived BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, key)
);

CREATE INDEX idx_ent_feature_flags_school_id ON ent_feature_flags(school_id);
CREATE INDEX idx_ent_feature_flags_key ON ent_feature_flags(school_id, key);
CREATE INDEX idx_ent_feature_flags_status ON ent_feature_flags(school_id, status);

CREATE TRIGGER ent_feature_flags_updated_at
  BEFORE UPDATE ON ent_feature_flags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_feature_flags ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_feature_flags
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_feature_flag_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  flag_id UUID NOT NULL REFERENCES ent_feature_flags(id) ON DELETE CASCADE,
  allocation_type TEXT NOT NULL DEFAULT 'user' CHECK (allocation_type IN ('user', 'group', 'segment', 'percentage', 'all')),
  target_id TEXT,
  percentage NUMERIC(5,2) CHECK (percentage >= 0 AND percentage <= 100),
  variant TEXT,
  value JSONB,
  salt TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_feature_flag_allocations_school_id ON ent_feature_flag_allocations(school_id);
CREATE INDEX idx_ent_feature_flag_allocations_flag_id ON ent_feature_flag_allocations(flag_id);
CREATE INDEX idx_ent_feature_flag_allocations_target ON ent_feature_flag_allocations(allocation_type, target_id);

CREATE TRIGGER ent_feature_flag_allocations_updated_at
  BEFORE UPDATE ON ent_feature_flag_allocations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_feature_flag_allocations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_feature_flag_allocations
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_feature_flag_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  flag_id UUID NOT NULL REFERENCES ent_feature_flags(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC(15,4) NOT NULL DEFAULT 0,
  metric_type TEXT NOT NULL DEFAULT 'counter' CHECK (metric_type IN ('counter', 'gauge', 'histogram', 'rate')),
  variant TEXT,
  labels JSONB DEFAULT '{}',
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  window_start TIMESTAMPTZ,
  window_end TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_feature_flag_metrics_school_id ON ent_feature_flag_metrics(school_id);
CREATE INDEX idx_ent_feature_flag_metrics_flag_id ON ent_feature_flag_metrics(flag_id);
CREATE INDEX idx_ent_feature_flag_metrics_recorded_at ON ent_feature_flag_metrics(flag_id, recorded_at DESC);
CREATE INDEX idx_ent_feature_flag_metrics_name ON ent_feature_flag_metrics(flag_id, metric_name, recorded_at DESC);

CREATE TRIGGER ent_feature_flag_metrics_updated_at
  BEFORE UPDATE ON ent_feature_flag_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_feature_flag_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_feature_flag_metrics
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_feature_flag_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  flag_id UUID NOT NULL REFERENCES ent_feature_flags(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('created', 'updated', 'activated', 'deactivated', 'archived', 'allocated', 'deleted')),
  performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  changes JSONB DEFAULT '{}',
  previous_state JSONB,
  new_state JSONB,
  reason TEXT,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_feature_flag_audits_school_id ON ent_feature_flag_audits(school_id);
CREATE INDEX idx_ent_feature_flag_audits_flag_id ON ent_feature_flag_audits(flag_id);
CREATE INDEX idx_ent_feature_flag_audits_action ON ent_feature_flag_audits(flag_id, action);
CREATE INDEX idx_ent_feature_flag_audits_performed_by ON ent_feature_flag_audits(performed_by) WHERE performed_by IS NOT NULL;
CREATE INDEX idx_ent_feature_flag_audits_created_at ON ent_feature_flag_audits(flag_id, created_at DESC);

CREATE TRIGGER ent_feature_flag_audits_updated_at
  BEFORE UPDATE ON ent_feature_flag_audits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_feature_flag_audits ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_feature_flag_audits
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_feature_flag_experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  flag_id UUID NOT NULL REFERENCES ent_feature_flags(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'paused', 'completed', 'cancelled')),
  hypothesis TEXT,
  variants JSONB NOT NULL DEFAULT '[]',
  traffic_percentage NUMERIC(5,2) NOT NULL DEFAULT 100 CHECK (traffic_percentage >= 0 AND traffic_percentage <= 100),
  primary_metric TEXT,
  secondary_metrics TEXT[],
  winner_variant TEXT,
  confidence_level NUMERIC(5,4),
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_feature_flag_experiments_school_id ON ent_feature_flag_experiments(school_id);
CREATE INDEX idx_ent_feature_flag_experiments_flag_id ON ent_feature_flag_experiments(flag_id);
CREATE INDEX idx_ent_feature_flag_experiments_status ON ent_feature_flag_experiments(school_id, status);

CREATE TRIGGER ent_feature_flag_experiments_updated_at
  BEFORE UPDATE ON ent_feature_flag_experiments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_feature_flag_experiments ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_feature_flag_experiments
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_feature_flag_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  flag_id UUID NOT NULL REFERENCES ent_feature_flags(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  requested_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  requested_change JSONB NOT NULL,
  reason TEXT,
  comments TEXT,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_feature_flag_approvals_school_id ON ent_feature_flag_approvals(school_id);
CREATE INDEX idx_ent_feature_flag_approvals_flag_id ON ent_feature_flag_approvals(flag_id);
CREATE INDEX idx_ent_feature_flag_approvals_status ON ent_feature_flag_approvals(school_id, status);
CREATE INDEX idx_ent_feature_flag_approvals_requested_by ON ent_feature_flag_approvals(requested_by);
CREATE INDEX idx_ent_feature_flag_approvals_pending ON ent_feature_flag_approvals(school_id, status) WHERE status = 'pending';

CREATE TRIGGER ent_feature_flag_approvals_updated_at
  BEFORE UPDATE ON ent_feature_flag_approvals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_feature_flag_approvals ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_feature_flag_approvals
  USING (school_id = (current_setting('app.current_school_id')::uuid));
-- ============================================================================
-- 4. WORKFLOW ENGINE
-- ============================================================================

CREATE TABLE ent_workflow_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  state_type TEXT NOT NULL DEFAULT 'normal' CHECK (state_type IN ('initial', 'normal', 'final', 'error', 'suspended')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  color TEXT,
  icon TEXT,
  is_initial BOOLEAN NOT NULL DEFAULT false,
  is_final BOOLEAN NOT NULL DEFAULT false,
  allowed_roles TEXT[] DEFAULT '{}',
  on_enter_actions JSONB DEFAULT '[]',
  on_exit_actions JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_states_school_id ON ent_workflow_states(school_id);
CREATE INDEX idx_ent_workflow_states_status ON ent_workflow_states(school_id, status);

CREATE TRIGGER ent_workflow_states_updated_at
  BEFORE UPDATE ON ent_workflow_states
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_states ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_states
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_workflow_transitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  from_state_id UUID NOT NULL REFERENCES ent_workflow_states(id) ON DELETE CASCADE,
  to_state_id UUID NOT NULL REFERENCES ent_workflow_states(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  transition_type TEXT NOT NULL DEFAULT 'manual' CHECK (transition_type IN ('manual', 'automatic', 'conditional', 'scheduled')),
  guard_conditions JSONB DEFAULT '[]',
  priority INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_transitions_school_id ON ent_workflow_transitions(school_id);
CREATE INDEX idx_ent_workflow_transitions_from_state ON ent_workflow_transitions(from_state_id);
CREATE INDEX idx_ent_workflow_transitions_to_state ON ent_workflow_transitions(to_state_id);
CREATE INDEX idx_ent_workflow_transitions_status ON ent_workflow_transitions(school_id, status);

CREATE TRIGGER ent_workflow_transitions_updated_at
  BEFORE UPDATE ON ent_workflow_transitions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_transitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_transitions
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_workflow_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  transition_id UUID NOT NULL REFERENCES ent_workflow_transitions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  action_type TEXT NOT NULL CHECK (action_type IN ('notification', 'webhook', 'script', 'email', 'update_field', 'create_record', 'custom')),
  action_config JSONB NOT NULL DEFAULT '{}',
  execution_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  retry_on_failure BOOLEAN NOT NULL DEFAULT false,
  max_retries INTEGER NOT NULL DEFAULT 0,
  timeout_seconds INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_actions_school_id ON ent_workflow_actions(school_id);
CREATE INDEX idx_ent_workflow_actions_transition_id ON ent_workflow_actions(transition_id);
CREATE INDEX idx_ent_workflow_actions_status ON ent_workflow_actions(school_id, status);

CREATE TRIGGER ent_workflow_actions_updated_at
  BEFORE UPDATE ON ent_workflow_actions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_actions
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_workflow_variables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  variable_type TEXT NOT NULL DEFAULT 'string' CHECK (variable_type IN ('string', 'number', 'boolean', 'json', 'array', 'date')),
  default_value JSONB,
  is_required BOOLEAN NOT NULL DEFAULT false,
  is_readonly BOOLEAN NOT NULL DEFAULT false,
  validation_rules JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_variables_school_id ON ent_workflow_variables(school_id);
CREATE INDEX idx_ent_workflow_variables_name ON ent_workflow_variables(school_id, name);

CREATE TRIGGER ent_workflow_variables_updated_at
  BEFORE UPDATE ON ent_workflow_variables
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_variables ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_variables
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_workflow_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL,
  listener_type TEXT NOT NULL CHECK (listener_type IN ('webhook', 'email', 'internal', 'queue', 'custom')),
  listener_config JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  filter_conditions JSONB DEFAULT '{}',
  priority INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_subscriptions_school_id ON ent_workflow_subscriptions(school_id);
CREATE INDEX idx_ent_workflow_subscriptions_event_type ON ent_workflow_subscriptions(school_id, event_type);
CREATE INDEX idx_ent_workflow_subscriptions_status ON ent_workflow_subscriptions(school_id, status);

CREATE TRIGGER ent_workflow_subscriptions_updated_at
  BEFORE UPDATE ON ent_workflow_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_subscriptions
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_workflow_chains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive', 'archived')),
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('manual', 'event', 'schedule', 'webhook')),
  trigger_config JSONB DEFAULT '{}',
  steps JSONB NOT NULL DEFAULT '[]',
  variables JSONB DEFAULT '{}',
  error_handling JSONB DEFAULT '{}',
  timeout_seconds INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_chains_school_id ON ent_workflow_chains(school_id);
CREATE INDEX idx_ent_workflow_chains_status ON ent_workflow_chains(school_id, status);

CREATE TRIGGER ent_workflow_chains_updated_at
  BEFORE UPDATE ON ent_workflow_chains
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_chains ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_chains
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_workflow_state_machines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive', 'archived')),
  entity_type TEXT NOT NULL,
  states JSONB NOT NULL DEFAULT '[]',
  transitions JSONB NOT NULL DEFAULT '[]',
  initial_state TEXT NOT NULL,
  final_states TEXT[] DEFAULT '{}',
  version INTEGER NOT NULL DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_state_machines_school_id ON ent_workflow_state_machines(school_id);
CREATE INDEX idx_ent_workflow_state_machines_entity_type ON ent_workflow_state_machines(school_id, entity_type);
CREATE INDEX idx_ent_workflow_state_machines_status ON ent_workflow_state_machines(school_id, status);

CREATE TRIGGER ent_workflow_state_machines_updated_at
  BEFORE UPDATE ON ent_workflow_state_machines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_state_machines ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_state_machines
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_workflow_transitions_ai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  transition_id UUID NOT NULL REFERENCES ent_workflow_transitions(id) ON DELETE CASCADE,
  recommendation TEXT NOT NULL,
  confidence_score NUMERIC(5,4) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  reasoning TEXT,
  suggested_by TEXT NOT NULL DEFAULT 'system',
  applied BOOLEAN NOT NULL DEFAULT false,
  applied_at TIMESTAMPTZ,
  feedback TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_transitions_ai_school_id ON ent_workflow_transitions_ai(school_id);
CREATE INDEX idx_ent_workflow_transitions_ai_transition_id ON ent_workflow_transitions_ai(transition_id);
CREATE INDEX idx_ent_workflow_transitions_ai_applied ON ent_workflow_transitions_ai(transition_id, applied);

CREATE TRIGGER ent_workflow_transitions_ai_updated_at
  BEFORE UPDATE ON ent_workflow_transitions_ai
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_transitions_ai ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_transitions_ai
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_workflow_actions_ai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  action_id UUID NOT NULL REFERENCES ent_workflow_actions(id) ON DELETE CASCADE,
  recommendation TEXT NOT NULL,
  confidence_score NUMERIC(5,4) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  reasoning TEXT,
  suggested_by TEXT NOT NULL DEFAULT 'system',
  applied BOOLEAN NOT NULL DEFAULT false,
  applied_at TIMESTAMPTZ,
  feedback TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_actions_ai_school_id ON ent_workflow_actions_ai(school_id);
CREATE INDEX idx_ent_workflow_actions_ai_action_id ON ent_workflow_actions_ai(action_id);
CREATE INDEX idx_ent_workflow_actions_ai_applied ON ent_workflow_actions_ai(action_id, applied);

CREATE TRIGGER ent_workflow_actions_ai_updated_at
  BEFORE UPDATE ON ent_workflow_actions_ai
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_actions_ai ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_actions_ai
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_workflow_variables_ai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  variable_id UUID NOT NULL REFERENCES ent_workflow_variables(id) ON DELETE CASCADE,
  recommendation TEXT NOT NULL,
  confidence_score NUMERIC(5,4) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  reasoning TEXT,
  suggested_by TEXT NOT NULL DEFAULT 'system',
  applied BOOLEAN NOT NULL DEFAULT false,
  applied_at TIMESTAMPTZ,
  feedback TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_variables_ai_school_id ON ent_workflow_variables_ai(school_id);
CREATE INDEX idx_ent_workflow_variables_ai_variable_id ON ent_workflow_variables_ai(variable_id);

CREATE TRIGGER ent_workflow_variables_ai_updated_at
  BEFORE UPDATE ON ent_workflow_variables_ai
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_variables_ai ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_variables_ai
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_workflow_subscriptions_ai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  subscription_id UUID NOT NULL REFERENCES ent_workflow_subscriptions(id) ON DELETE CASCADE,
  recommendation TEXT NOT NULL,
  confidence_score NUMERIC(5,4) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  reasoning TEXT,
  suggested_by TEXT NOT NULL DEFAULT 'system',
  applied BOOLEAN NOT NULL DEFAULT false,
  applied_at TIMESTAMPTZ,
  feedback TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_subscriptions_ai_school_id ON ent_workflow_subscriptions_ai(school_id);
CREATE INDEX idx_ent_workflow_subscriptions_ai_subscription_id ON ent_workflow_subscriptions_ai(subscription_id);

CREATE TRIGGER ent_workflow_subscriptions_ai_updated_at
  BEFORE UPDATE ON ent_workflow_subscriptions_ai
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_subscriptions_ai ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_subscriptions_ai
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_workflow_chains_ai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  chain_id UUID NOT NULL REFERENCES ent_workflow_chains(id) ON DELETE CASCADE,
  recommendation TEXT NOT NULL,
  confidence_score NUMERIC(5,4) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  reasoning TEXT,
  suggested_by TEXT NOT NULL DEFAULT 'system',
  applied BOOLEAN NOT NULL DEFAULT false,
  applied_at TIMESTAMPTZ,
  feedback TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_workflow_chains_ai_school_id ON ent_workflow_chains_ai(school_id);
CREATE INDEX idx_ent_workflow_chains_ai_chain_id ON ent_workflow_chains_ai(chain_id);

CREATE TRIGGER ent_workflow_chains_ai_updated_at
  BEFORE UPDATE ON ent_workflow_chains_ai
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_workflow_chains_ai ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_workflow_chains_ai
  USING (school_id = (current_setting('app.current_school_id')::uuid));
-- ============================================================================
-- 5. SCHEDULER CORE
-- ============================================================================

CREATE TABLE ent_scheduler_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  job_type TEXT NOT NULL CHECK (job_type IN ('once', 'recurring', 'event_driven', 'chain')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'paused')),
  priority INTEGER NOT NULL DEFAULT 0,
  payload JSONB NOT NULL DEFAULT '{}',
  result JSONB,
  error_message TEXT,
  max_retries INTEGER NOT NULL DEFAULT 0,
  retry_count INTEGER NOT NULL DEFAULT 0,
  timeout_seconds INTEGER,
  scheduled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_jobs_school_id ON ent_scheduler_jobs(school_id);
CREATE INDEX idx_ent_scheduler_jobs_status ON ent_scheduler_jobs(school_id, status);
CREATE INDEX idx_ent_scheduler_jobs_scheduled_at ON ent_scheduler_jobs(scheduled_at) WHERE status IN ('pending', 'queued');
CREATE INDEX idx_ent_scheduler_jobs_priority ON ent_scheduler_jobs(priority DESC, scheduled_at ASC) WHERE status IN ('pending', 'queued');
CREATE INDEX idx_ent_scheduler_jobs_type ON ent_scheduler_jobs(school_id, job_type);

CREATE TRIGGER ent_scheduler_jobs_updated_at
  BEFORE UPDATE ON ent_scheduler_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_jobs
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_job_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES ent_scheduler_jobs(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed', 'cancelled', 'timeout')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER,
  result JSONB,
  error_message TEXT,
  error_stack TEXT,
  worker_id TEXT,
  attempt INTEGER NOT NULL DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_job_runs_school_id ON ent_scheduler_job_runs(school_id);
CREATE INDEX idx_ent_scheduler_job_runs_job_id ON ent_scheduler_job_runs(job_id);
CREATE INDEX idx_ent_scheduler_job_runs_status ON ent_scheduler_job_runs(job_id, status);

CREATE TRIGGER ent_scheduler_job_runs_updated_at
  BEFORE UPDATE ON ent_scheduler_job_runs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_job_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_job_runs
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_job_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES ent_scheduler_jobs(id) ON DELETE CASCADE,
  depends_on_job_id UUID NOT NULL REFERENCES ent_scheduler_jobs(id) ON DELETE CASCADE,
  dependency_type TEXT NOT NULL DEFAULT 'required' CHECK (dependency_type IN ('required', 'optional', 'blocking')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'satisfied', 'failed')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(job_id, depends_on_job_id)
);

CREATE INDEX idx_ent_scheduler_job_dependencies_school_id ON ent_scheduler_job_dependencies(school_id);
CREATE INDEX idx_ent_scheduler_job_dependencies_job_id ON ent_scheduler_job_dependencies(job_id);
CREATE INDEX idx_ent_scheduler_job_dependencies_depends_on ON ent_scheduler_job_dependencies(depends_on_job_id);

CREATE TRIGGER ent_scheduler_job_dependencies_updated_at
  BEFORE UPDATE ON ent_scheduler_job_dependencies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_job_dependencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_job_dependencies
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_scheduler_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES ent_scheduler_jobs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  schedule_type TEXT NOT NULL CHECK (schedule_type IN ('cron', 'interval', 'one_time', 'calendar')),
  cron_expression TEXT,
  interval_seconds INTEGER,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  enabled BOOLEAN NOT NULL DEFAULT true,
  next_run_at TIMESTAMPTZ,
  last_run_at TIMESTAMPTZ,
  max_instances INTEGER NOT NULL DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_schedules_school_id ON ent_scheduler_schedules(school_id);
CREATE INDEX idx_ent_scheduler_schedules_job_id ON ent_scheduler_schedules(job_id);
CREATE INDEX idx_ent_scheduler_schedules_next_run ON ent_scheduler_schedules(next_run_at) WHERE enabled = true;

CREATE TRIGGER ent_scheduler_schedules_updated_at
  BEFORE UPDATE ON ent_scheduler_schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_schedules
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_locks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  lock_name TEXT NOT NULL,
  lock_type TEXT NOT NULL DEFAULT 'mutex' CHECK (lock_type IN ('mutex', 'semaphore', 'read_write')),
  acquired_by TEXT NOT NULL,
  acquired_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  heartbeat_at TIMESTAMPTZ,
  holder_info JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, lock_name)
);

CREATE INDEX idx_ent_scheduler_locks_school_id ON ent_scheduler_locks(school_id);
CREATE INDEX idx_ent_scheduler_locks_lock_name ON ent_scheduler_locks(school_id, lock_name);
CREATE INDEX idx_ent_scheduler_locks_acquired_by ON ent_scheduler_locks(acquired_by);
CREATE INDEX idx_ent_scheduler_locks_expires_at ON ent_scheduler_locks(expires_at) WHERE expires_at IS NOT NULL;

CREATE TRIGGER ent_scheduler_locks_updated_at
  BEFORE UPDATE ON ent_scheduler_locks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_locks ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_locks
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC(15,4) NOT NULL DEFAULT 0,
  metric_type TEXT NOT NULL DEFAULT 'gauge' CHECK (metric_type IN ('counter', 'gauge', 'histogram', 'rate')),
  labels JSONB DEFAULT '{}',
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  window_start TIMESTAMPTZ,
  window_end TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_metrics_school_id ON ent_scheduler_metrics(school_id);
CREATE INDEX idx_ent_scheduler_metrics_name ON ent_scheduler_metrics(school_id, metric_name);
CREATE INDEX idx_ent_scheduler_metrics_recorded_at ON ent_scheduler_metrics(metric_name, recorded_at DESC);

CREATE TRIGGER ent_scheduler_metrics_updated_at
  BEFORE UPDATE ON ent_scheduler_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_metrics
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_scheduler_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('error', 'warning', 'info', 'critical')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'suppressed')),
  source TEXT NOT NULL,
  source_id UUID,
  message TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  severity INTEGER NOT NULL DEFAULT 0 CHECK (severity BETWEEN 0 AND 10),
  acknowledged_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_alerts_school_id ON ent_scheduler_alerts(school_id);
CREATE INDEX idx_ent_scheduler_alerts_status ON ent_scheduler_alerts(school_id, status);
CREATE INDEX idx_ent_scheduler_alerts_type ON ent_scheduler_alerts(school_id, alert_type);
CREATE INDEX idx_ent_scheduler_alerts_active ON ent_scheduler_alerts(school_id, status) WHERE status = 'active';

CREATE TRIGGER ent_scheduler_alerts_updated_at
  BEFORE UPDATE ON ent_scheduler_alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_alerts
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  alert_id UUID REFERENCES ent_scheduler_alerts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  notification_type TEXT NOT NULL DEFAULT 'info' CHECK (notification_type IN ('info', 'warning', 'error', 'success')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'read')),
  channel TEXT NOT NULL DEFAULT 'in_app' CHECK (channel IN ('in_app', 'email', 'sms', 'push', 'webhook')),
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_group TEXT,
  sent_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  retry_count INTEGER NOT NULL DEFAULT 0,
  max_retries INTEGER NOT NULL DEFAULT 3,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_notifications_school_id ON ent_scheduler_notifications(school_id);
CREATE INDEX idx_ent_scheduler_notifications_status ON ent_scheduler_notifications(school_id, status);
CREATE INDEX idx_ent_scheduler_notifications_recipient ON ent_scheduler_notifications(recipient_id) WHERE recipient_id IS NOT NULL;
CREATE INDEX idx_ent_scheduler_notifications_unread ON ent_scheduler_notifications(recipient_id, created_at DESC) WHERE status != 'read' AND recipient_id IS NOT NULL;

CREATE TRIGGER ent_scheduler_notifications_updated_at
  BEFORE UPDATE ON ent_scheduler_notifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_notifications
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_retries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES ent_scheduler_jobs(id) ON DELETE CASCADE,
  run_id UUID NOT NULL REFERENCES ent_scheduler_job_runs(id) ON DELETE CASCADE,
  retry_number INTEGER NOT NULL DEFAULT 1,
  max_retries INTEGER NOT NULL DEFAULT 3,
  retry_after TIMESTAMPTZ NOT NULL,
  backoff_ms INTEGER NOT NULL DEFAULT 1000,
  error_message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'executing', 'completed', 'failed', 'exhausted')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_retries_school_id ON ent_scheduler_retries(school_id);
CREATE INDEX idx_ent_scheduler_retries_job_id ON ent_scheduler_retries(job_id);
CREATE INDEX idx_ent_scheduler_retries_retry_after ON ent_scheduler_retries(retry_after) WHERE status = 'pending';

CREATE TRIGGER ent_scheduler_retries_updated_at
  BEFORE UPDATE ON ent_scheduler_retries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_retries ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_retries
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_scheduler_cancellations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES ent_scheduler_jobs(id) ON DELETE CASCADE,
  cancelled_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  cancelled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_cancellations_school_id ON ent_scheduler_cancellations(school_id);
CREATE INDEX idx_ent_scheduler_cancellations_job_id ON ent_scheduler_cancellations(job_id);

CREATE TRIGGER ent_scheduler_cancellations_updated_at
  BEFORE UPDATE ON ent_scheduler_cancellations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_cancellations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_cancellations
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_priorities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  priority_level INTEGER NOT NULL UNIQUE,
  weight NUMERIC(5,2) NOT NULL DEFAULT 1.0,
  max_concurrent INTEGER NOT NULL DEFAULT -1,
  queue_name TEXT DEFAULT 'default',
  preemption_enabled BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_priorities_school_id ON ent_scheduler_priorities(school_id);
CREATE INDEX idx_ent_scheduler_priorities_level ON ent_scheduler_priorities(priority_level);

CREATE TRIGGER ent_scheduler_priorities_updated_at
  BEFORE UPDATE ON ent_scheduler_priorities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_priorities ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_priorities
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('cpu', 'memory', 'io', 'network', 'custom')),
  total_capacity NUMERIC(15,4) NOT NULL,
  available_capacity NUMERIC(15,4) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'count',
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'limited', 'exhausted', 'maintenance')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_resources_school_id ON ent_scheduler_resources(school_id);
CREATE INDEX idx_ent_scheduler_resources_type ON ent_scheduler_resources(school_id, resource_type);
CREATE INDEX idx_ent_scheduler_resources_status ON ent_scheduler_resources(school_id, status);

CREATE TRIGGER ent_scheduler_resources_updated_at
  BEFORE UPDATE ON ent_scheduler_resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_resources
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_load_balancers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  algorithm TEXT NOT NULL DEFAULT 'round_robin' CHECK (algorithm IN ('round_robin', 'least_connections', 'weighted', 'random', 'ip_hash')),
  targets JSONB NOT NULL DEFAULT '[]',
  health_check_config JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_load_balancers_school_id ON ent_scheduler_load_balancers(school_id);
CREATE INDEX idx_ent_scheduler_load_balancers_status ON ent_scheduler_load_balancers(school_id, status);

CREATE TRIGGER ent_scheduler_load_balancers_updated_at
  BEFORE UPDATE ON ent_scheduler_load_balancers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_load_balancers ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_load_balancers
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_failovers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  primary_resource_id UUID REFERENCES ent_scheduler_resources(id) ON DELETE SET NULL,
  failover_resource_id UUID REFERENCES ent_scheduler_resources(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'standby' CHECK (status IN ('standby', 'active', 'failed', 'recovering')),
  trigger_condition JSONB DEFAULT '{}',
  failover_count INTEGER NOT NULL DEFAULT 0,
  last_failover_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_failovers_school_id ON ent_scheduler_failovers(school_id);
CREATE INDEX idx_ent_scheduler_failovers_status ON ent_scheduler_failovers(school_id, status);

CREATE TRIGGER ent_scheduler_failovers_updated_at
  BEFORE UPDATE ON ent_scheduler_failovers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_failovers ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_failovers
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_scheduler_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('created', 'updated', 'deleted', 'executed', 'cancelled', 'retried', 'completed', 'failed')),
  performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  changes JSONB DEFAULT '{}',
  previous_state JSONB,
  new_state JSONB,
  reason TEXT,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_scheduler_audits_school_id ON ent_scheduler_audits(school_id);
CREATE INDEX idx_ent_scheduler_audits_entity ON ent_scheduler_audits(entity_type, entity_id);
CREATE INDEX idx_ent_scheduler_audits_action ON ent_scheduler_audits(action);
CREATE INDEX idx_ent_scheduler_audits_performed_by ON ent_scheduler_audits(performed_by) WHERE performed_by IS NOT NULL;
CREATE INDEX idx_ent_scheduler_audits_created_at ON ent_scheduler_audits(created_at DESC);

CREATE TRIGGER ent_scheduler_audits_updated_at
  BEFORE UPDATE ON ent_scheduler_audits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_audits ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_audits
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, name, entity_type, entity_id)
);

CREATE INDEX idx_ent_scheduler_tags_school_id ON ent_scheduler_tags(school_id);
CREATE INDEX idx_ent_scheduler_tags_entity ON ent_scheduler_tags(entity_type, entity_id);
CREATE INDEX idx_ent_scheduler_tags_name ON ent_scheduler_tags(school_id, name);

CREATE TRIGGER ent_scheduler_tags_updated_at
  BEFORE UPDATE ON ent_scheduler_tags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_tags
  USING (school_id = (current_setting('app.current_school_id')::uuid));-- ============================================================================
-- 6. SCHEDULER NOTIFICATIONS (CONSOLIDATED)
-- ============================================================================
-- All ent_scheduler_notifications_channels_* subtables consolidated into
-- a single ent_scheduler_notifications_channels table with relevant columns
-- ============================================================================

CREATE TABLE ent_scheduler_notifications_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  channel_type TEXT NOT NULL CHECK (channel_type IN ('email', 'sms', 'push', 'webhook', 'in_app', 'slack', 'teams', 'custom')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance', 'error')),
  configuration JSONB NOT NULL DEFAULT '{}',
  credentials JSONB DEFAULT '{}',
  health_status TEXT NOT NULL DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'degraded', 'unhealthy', 'unknown')),
  last_health_check_at TIMESTAMPTZ,
  health_check_details JSONB DEFAULT '{}',
  total_sent INTEGER NOT NULL DEFAULT 0,
  total_delivered INTEGER NOT NULL DEFAULT 0,
  total_failed INTEGER NOT NULL DEFAULT 0,
  total_pending INTEGER NOT NULL DEFAULT 0,
  avg_latency_ms NUMERIC(10,2),
  success_rate NUMERIC(5,4),
  last_sent_at TIMESTAMPTZ,
  metrics_window_start TIMESTAMPTZ,
  metrics_window_end TIMESTAMPTZ,
  default_template_id UUID,
  templates JSONB DEFAULT '[]',
  rate_limit_enabled BOOLEAN NOT NULL DEFAULT false,
  rate_limit_per_second INTEGER,
  rate_limit_per_minute INTEGER,
  rate_limit_per_hour INTEGER,
  rate_limit_per_day INTEGER,
  rate_limit_window_seconds INTEGER DEFAULT 60,
  current_rate_count INTEGER NOT NULL DEFAULT 0,
  rate_limit_reset_at TIMESTAMPTZ,
  retry_enabled BOOLEAN NOT NULL DEFAULT true,
  max_retries INTEGER NOT NULL DEFAULT 3,
  retry_backoff_ms INTEGER NOT NULL DEFAULT 1000,
  retry_max_backoff_ms INTEGER NOT NULL DEFAULT 60000,
  retry_jitter BOOLEAN NOT NULL DEFAULT true,
  batching_enabled BOOLEAN NOT NULL DEFAULT false,
  batch_size INTEGER NOT NULL DEFAULT 10,
  batch_timeout_ms INTEGER NOT NULL DEFAULT 5000,
  batch_max_wait_ms INTEGER NOT NULL DEFAULT 30000,
  filter_rules JSONB DEFAULT '[]',
  filter_mode TEXT NOT NULL DEFAULT 'allow' CHECK (filter_mode IN ('allow', 'deny', 'custom')),
  transformations JSONB DEFAULT '[]',
  routing_rules JSONB DEFAULT '[]',
  routing_mode TEXT NOT NULL DEFAULT 'direct' CHECK (routing_mode IN ('direct', 'round_robin', 'weighted', 'fallback')),
  priority_level INTEGER NOT NULL DEFAULT 0,
  priority_weight NUMERIC(5,2) NOT NULL DEFAULT 1.0,
  schedule_enabled BOOLEAN NOT NULL DEFAULT true,
  schedule_config JSONB DEFAULT '{}',
  timezone TEXT NOT NULL DEFAULT 'UTC',
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  blackout_periods JSONB DEFAULT '[]',
  group_ids UUID[] DEFAULT '{}',
  group_config JSONB DEFAULT '{}',
  mappings JSONB DEFAULT '[]',
  validation_rules JSONB DEFAULT '[]',
  validation_enabled BOOLEAN NOT NULL DEFAULT true,
  version INTEGER NOT NULL DEFAULT 1,
  schema_version TEXT,
  schema JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  usage_count INTEGER NOT NULL DEFAULT 0,
  usage_last_at TIMESTAMPTZ,
  usage_quota INTEGER,
  usage_quota_period TEXT CHECK (usage_quota_period IN ('hourly', 'daily', 'weekly', 'monthly')),
  audit_enabled BOOLEAN NOT NULL DEFAULT true,
  health_check_interval_seconds INTEGER NOT NULL DEFAULT 300,
  health_check_timeout_seconds INTEGER NOT NULL DEFAULT 10,
  health_check_endpoint TEXT,
  health_check_expected_status INTEGER DEFAULT 200,
  compliance_rules JSONB DEFAULT '[]',
  compliance_enabled BOOLEAN NOT NULL DEFAULT false,
  privacy_mask_pii BOOLEAN NOT NULL DEFAULT false,
  privacy_encryption_enabled BOOLEAN NOT NULL DEFAULT false,
  privacy_retention_days INTEGER,
  privacy_anonymize_after_days INTEGER,
  consent_required BOOLEAN NOT NULL DEFAULT false,
  consent_field TEXT,
  consent_expiry_days INTEGER,
  retention_days INTEGER NOT NULL DEFAULT 90,
  retention_action TEXT NOT NULL DEFAULT 'delete' CHECK (retention_action IN ('delete', 'archive', 'anonymize')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);CREATE INDEX idx_ent_notifications_channels_school_id ON ent_scheduler_notifications_channels(school_id);
CREATE INDEX idx_ent_notifications_channels_type ON ent_scheduler_notifications_channels(school_id, channel_type);
CREATE INDEX idx_ent_notifications_channels_status ON ent_scheduler_notifications_channels(school_id, status);

CREATE TRIGGER ent_scheduler_notifications_channels_updated_at
  BEFORE UPDATE ON ent_scheduler_notifications_channels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_notifications_channels ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_notifications_channels
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_scheduler_notifications_escalations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES ent_scheduler_notifications_channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  escalation_level INTEGER NOT NULL DEFAULT 1,
  trigger_after_seconds INTEGER NOT NULL DEFAULT 300,
  notify_users UUID[] DEFAULT '{}',
  notify_groups TEXT[] DEFAULT '{}',
  repeat_interval_seconds INTEGER,
  max_escalations INTEGER NOT NULL DEFAULT 3,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_notifications_escalations_school_id ON ent_scheduler_notifications_escalations(school_id);
CREATE INDEX idx_ent_notifications_escalations_channel_id ON ent_scheduler_notifications_escalations(channel_id);

CREATE TRIGGER ent_scheduler_notifications_escalations_updated_at
  BEFORE UPDATE ON ent_scheduler_notifications_escalations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_notifications_escalations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_notifications_escalations
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_notifications_acknowledgments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES ent_scheduler_notifications_channels(id) ON DELETE CASCADE,
  notification_id UUID NOT NULL REFERENCES ent_scheduler_notifications(id) ON DELETE CASCADE,
  acknowledged_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  acknowledged_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_notifications_ack_school_id ON ent_scheduler_notifications_acknowledgments(school_id);
CREATE INDEX idx_ent_notifications_ack_channel_id ON ent_scheduler_notifications_acknowledgments(channel_id);
CREATE INDEX idx_ent_notifications_ack_notification_id ON ent_scheduler_notifications_acknowledgments(notification_id);

CREATE TRIGGER ent_scheduler_notifications_acknowledgments_updated_at
  BEFORE UPDATE ON ent_scheduler_notifications_acknowledgments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_notifications_acknowledgments ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_notifications_acknowledgments
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_scheduler_notifications_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES ent_scheduler_notifications_channels(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  template_type TEXT NOT NULL DEFAULT 'notification' CHECK (template_type IN ('notification', 'alert', 'reminder', 'report', 'custom')),
  subject_template TEXT,
  body_template TEXT NOT NULL,
  format TEXT NOT NULL DEFAULT 'text' CHECK (format IN ('text', 'html', 'json', 'markdown')),
  variables JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  version INTEGER NOT NULL DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_notifications_templates_school_id ON ent_scheduler_notifications_templates(school_id);
CREATE INDEX idx_ent_notifications_templates_channel_id ON ent_scheduler_notifications_templates(channel_id) WHERE channel_id IS NOT NULL;
CREATE INDEX idx_ent_notifications_templates_status ON ent_scheduler_notifications_templates(school_id, status);

CREATE TRIGGER ent_scheduler_notifications_templates_updated_at
  BEFORE UPDATE ON ent_scheduler_notifications_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_notifications_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_notifications_templates
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_notifications_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES ent_scheduler_notifications_channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  priority INTEGER NOT NULL DEFAULT 0,
  conditions JSONB NOT NULL DEFAULT '[]',
  actions JSONB NOT NULL DEFAULT '[]',
  evaluation_order INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_notifications_rules_school_id ON ent_scheduler_notifications_rules(school_id);
CREATE INDEX idx_ent_notifications_rules_channel_id ON ent_scheduler_notifications_rules(channel_id);
CREATE INDEX idx_ent_notifications_rules_status ON ent_scheduler_notifications_rules(school_id, status);

CREATE TRIGGER ent_scheduler_notifications_rules_updated_at
  BEFORE UPDATE ON ent_scheduler_notifications_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_notifications_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_notifications_rules
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TABLE ent_scheduler_notifications_suppressions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES ent_scheduler_notifications_channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  suppression_type TEXT NOT NULL DEFAULT 'global' CHECK (suppression_type IN ('global', 'user', 'channel', 'rule')),
  target_id TEXT,
  reason TEXT,
  conditions JSONB DEFAULT '{}',
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_notifications_suppressions_school_id ON ent_scheduler_notifications_suppressions(school_id);
CREATE INDEX idx_ent_notifications_suppressions_channel_id ON ent_scheduler_notifications_suppressions(channel_id);
CREATE INDEX idx_ent_notifications_suppressions_active ON ent_scheduler_notifications_suppressions(school_id, status, starts_at, ends_at) WHERE status = 'active';

CREATE TRIGGER ent_scheduler_notifications_suppressions_updated_at
  BEFORE UPDATE ON ent_scheduler_notifications_suppressions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_notifications_suppressions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_notifications_suppressions
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_notifications_deduplications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES ent_scheduler_notifications_channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  dedup_key TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  occurrence_count INTEGER NOT NULL DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(channel_id, fingerprint)
);

CREATE INDEX idx_ent_notifications_dedup_school_id ON ent_scheduler_notifications_deduplications(school_id);
CREATE INDEX idx_ent_notifications_dedup_channel_id ON ent_scheduler_notifications_deduplications(channel_id);
CREATE INDEX idx_ent_notifications_dedup_fingerprint ON ent_scheduler_notifications_deduplications(channel_id, fingerprint);
CREATE INDEX idx_ent_notifications_dedup_expires ON ent_scheduler_notifications_deduplications(expires_at) WHERE expires_at > now();

CREATE TRIGGER ent_scheduler_notifications_deduplications_updated_at
  BEFORE UPDATE ON ent_scheduler_notifications_deduplications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_notifications_deduplications ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_notifications_deduplications
  USING (school_id = (current_setting('app.current_school_id')::uuid));

CREATE TABLE ent_scheduler_notifications_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES ent_scheduler_notifications_channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  schedule_type TEXT NOT NULL DEFAULT 'cron' CHECK (schedule_type IN ('cron', 'interval', 'one_time', 'calendar')),
  cron_expression TEXT,
  interval_seconds INTEGER,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  enabled BOOLEAN NOT NULL DEFAULT true,
  next_run_at TIMESTAMPTZ,
  last_run_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ent_notifications_schedules_school_id ON ent_scheduler_notifications_schedules(school_id);
CREATE INDEX idx_ent_notifications_schedules_channel_id ON ent_scheduler_notifications_schedules(channel_id);
CREATE INDEX idx_ent_notifications_schedules_next_run ON ent_scheduler_notifications_schedules(next_run_at) WHERE enabled = true;

CREATE TRIGGER ent_scheduler_notifications_schedules_updated_at
  BEFORE UPDATE ON ent_scheduler_notifications_schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ent_scheduler_notifications_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ent_scheduler_notifications_schedules
  USING (school_id = (current_setting('app.current_school_id')::uuid));