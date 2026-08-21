-- ============================================================================
-- Integration Module Tables Migration
-- Created: 2026-08-21
-- ============================================================================
-- Consolidates 67 auto-generated integration_* tables into 11 logical tables:
--
-- Section 1 – Core Integration (5 tables)
--   integration_configs, integration_oauth_states, integration_sync_logs,
--   integration_webhook_events, integration_api_keys
--
-- Section 2 – Infrastructure (1 consolidated table)
--   integration_infrastructure
--
-- Section 3 – Event Sourcing / CQRS (2 consolidated tables)
--   integration_events, integration_projections
--
-- Section 4 – Documentation & Project Management (3 consolidated tables)
--   integration_doc_pages, integration_project_items, integration_releases
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
-- 1. CORE INTEGRATION TABLES
-- ============================================================================

-- 1a. integration_configs ---------------------------------------------------
-- Stores per-school provider configuration (credentials, settings, flags).

CREATE TABLE integration_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}',
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, provider)
);

CREATE INDEX idx_integration_configs_school_id ON integration_configs(school_id);
CREATE INDEX idx_integration_configs_provider ON integration_configs(school_id, provider);

ALTER TABLE integration_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON integration_configs
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER integration_configs_updated_at
  BEFORE UPDATE ON integration_configs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1b. integration_oauth_states ----------------------------------------------
-- Temporary OAuth 2.0 state tokens for callback verification.

CREATE TABLE integration_oauth_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  state TEXT NOT NULL,
  provider TEXT NOT NULL,
  user_id UUID,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_integration_oauth_states_school_id ON integration_oauth_states(school_id);
CREATE INDEX idx_integration_oauth_states_state ON integration_oauth_states(state);
CREATE INDEX idx_integration_oauth_states_provider ON integration_oauth_states(school_id, provider);
CREATE INDEX idx_integration_oauth_states_expires_at ON integration_oauth_states(expires_at);

ALTER TABLE integration_oauth_states ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON integration_oauth_states
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER integration_oauth_states_updated_at
  BEFORE UPDATE ON integration_oauth_states
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1c. integration_sync_logs -------------------------------------------------
-- Records every data-sync run between the platform and external providers.

CREATE TABLE integration_sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound', 'bidirectional')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'success', 'failed', 'cancelled')),
  records_synced INTEGER NOT NULL DEFAULT 0,
  error TEXT,
  metadata JSONB DEFAULT '{}',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_integration_sync_logs_school_id ON integration_sync_logs(school_id);
CREATE INDEX idx_integration_sync_logs_provider ON integration_sync_logs(school_id, provider);
CREATE INDEX idx_integration_sync_logs_status ON integration_sync_logs(school_id, status);

ALTER TABLE integration_sync_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON integration_sync_logs
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER integration_sync_logs_updated_at
  BEFORE UPDATE ON integration_sync_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1d. integration_webhook_events --------------------------------------------
-- Inbound webhook events received from external providers.

CREATE TABLE integration_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  processed BOOLEAN NOT NULL DEFAULT false,
  processed_at TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_integration_webhook_events_school_id ON integration_webhook_events(school_id);
CREATE INDEX idx_integration_webhook_events_provider ON integration_webhook_events(school_id, provider);
CREATE INDEX idx_integration_webhook_events_processed ON integration_webhook_events(school_id, processed);
CREATE INDEX idx_integration_webhook_events_event_type ON integration_webhook_events(school_id, event_type);

ALTER TABLE integration_webhook_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON integration_webhook_events
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER integration_webhook_events_updated_at
  BEFORE UPDATE ON integration_webhook_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1e. integration_api_keys --------------------------------------------------
-- Stores hashed API keys for inbound authentication.

CREATE TABLE integration_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  permissions JSONB NOT NULL DEFAULT '[]',
  expires_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_integration_api_keys_school_id ON integration_api_keys(school_id);
CREATE INDEX idx_integration_api_keys_provider ON integration_api_keys(school_id, provider);
CREATE INDEX idx_integration_api_keys_key_hash ON integration_api_keys(key_hash);

ALTER TABLE integration_api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON integration_api_keys
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER integration_api_keys_updated_at
  BEFORE UPDATE ON integration_api_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2. INFRASTRUCTURE (CONSOLIDATED)
-- ============================================================================
-- Replaces: integration_rate_limits, integration_health_checks,
--   integration_circuit_breakers, integration_retries, integration_timeouts,
--   integration_bulkheads, integration_load_balancers,
--   integration_service_discovery, integration_api_gateways,
--   integration_message_queues, integration_event_buses,
--   integration_webhooks, integration_streaming, integration_batch,
--   integration_pipelines, integration_workflows, integration_orchestration,
--   integration_choreography, integration_sagas

CREATE TABLE integration_infrastructure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL,
  name TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error', 'maintenance')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_integration_infrastructure_school_id ON integration_infrastructure(school_id);
CREATE INDEX idx_integration_infrastructure_component_type ON integration_infrastructure(school_id, component_type);
CREATE INDEX idx_integration_infrastructure_status ON integration_infrastructure(school_id, status);

ALTER TABLE integration_infrastructure ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON integration_infrastructure
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER integration_infrastructure_updated_at
  BEFORE UPDATE ON integration_infrastructure
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 3. EVENT SOURCING / CQRS (CONSOLIDATED)
-- ============================================================================
-- Replaces: integration_event_sourcing, integration_cqrs,
--   integration_domain_events, integration_integration_events,
--   integration_event_store, integration_projections,
--   integration_snapshots, integration_versioning,
--   integration_schema_evolution, integration_data_lineage,
--   integration_data_catalog, integration_metadata_store,
--   integration_glossary, integration_ontology, integration_taxonomy,
--   integration_knowledge_graph

-- 3a. integration_events ----------------------------------------------------
-- Append-only event store for domain and integration events.

CREATE TABLE integration_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  aggregate_id UUID NOT NULL,
  aggregate_type TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  version INTEGER NOT NULL DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_integration_events_school_id ON integration_events(school_id);
CREATE INDEX idx_integration_events_aggregate ON integration_events(aggregate_id, aggregate_type);
CREATE INDEX idx_integration_events_event_type ON integration_events(school_id, event_type);
CREATE INDEX idx_integration_events_version ON integration_events(aggregate_id, version);

-- No RLS – events are accessed via application-level RPCs.
-- No update trigger – events are immutable.

-- 3b. integration_projections -----------------------------------------------
-- Materialised read models built from integration_events.

CREATE TABLE integration_projections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  projection_name TEXT NOT NULL,
  state JSONB NOT NULL DEFAULT '{}',
  last_event_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, projection_name)
);

CREATE INDEX idx_integration_projections_school_id ON integration_projections(school_id);
CREATE INDEX idx_integration_projections_projection_name ON integration_projections(school_id, projection_name);
CREATE INDEX idx_integration_projections_last_event_id ON integration_projections(last_event_id);

ALTER TABLE integration_projections ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON integration_projections
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER integration_projections_updated_at
  BEFORE UPDATE ON integration_projections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 4. DOCUMENTATION & PROJECT MANAGEMENT (CONSOLIDATED)
-- ============================================================================
-- Replaces: integration_knowledge_base, integration_wiki,
--   integration_documentation, integration_tutorial, integration_guide,
--   integration_reference, integration_api_doc, integration_sdk_doc,
--   integration_release_notes, integration_changelog, integration_roadmap,
--   integration_backlog, integration_sprint, integration_epic,
--   integration_story, integration_task, integration_subtask,
--   integration_bug, integration_feature, integration_improvement,
--   integration_research, integration_experiment, integration_prototype,
--   integration_poc, integration_mvp, integration_alpha, integration_beta,
--   integration_rc, integration_release (the doc item, not the table below)

-- 4a. integration_doc_pages -------------------------------------------------
-- Wiki, tutorials, guides, API docs, changelogs, and other documentation.

CREATE TABLE integration_doc_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'wiki', 'tutorial', 'guide', 'reference', 'api_doc', 'sdk_doc',
    'release_notes', 'changelog', 'knowledge_base', 'other'
  )),
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_integration_doc_pages_school_id ON integration_doc_pages(school_id);
CREATE INDEX idx_integration_doc_pages_type ON integration_doc_pages(school_id, type);
CREATE INDEX idx_integration_doc_pages_status ON integration_doc_pages(school_id, status);

ALTER TABLE integration_doc_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON integration_doc_pages
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER integration_doc_pages_updated_at
  BEFORE UPDATE ON integration_doc_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4b. integration_project_items ---------------------------------------------
-- Epics, stories, tasks, subtasks, bugs, features, improvements,
-- research, experiments, prototypes, POCs, MVPs, and release milestones.

CREATE TABLE integration_project_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'epic', 'story', 'task', 'subtask', 'bug', 'feature', 'improvement',
    'research', 'experiment', 'prototype', 'poc', 'mvp', 'alpha',
    'beta', 'rc', 'release', 'roadmap_item', 'backlog_item', 'sprint_item'
  )),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'backlog' CHECK (status IN (
    'backlog', 'todo', 'in_progress', 'in_review', 'done', 'cancelled'
  )),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low', 'none')),
  assignee_id UUID,
  parent_id UUID REFERENCES integration_project_items(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_integration_project_items_school_id ON integration_project_items(school_id);
CREATE INDEX idx_integration_project_items_type ON integration_project_items(school_id, type);
CREATE INDEX idx_integration_project_items_status ON integration_project_items(school_id, status);
CREATE INDEX idx_integration_project_items_parent_id ON integration_project_items(parent_id);
CREATE INDEX idx_integration_project_items_assignee_id ON integration_project_items(assignee_id);

ALTER TABLE integration_project_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON integration_project_items
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER integration_project_items_updated_at
  BEFORE UPDATE ON integration_project_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4c. integration_releases --------------------------------------------------
-- Versioned release records (replaces integration_release doc items).

CREATE TABLE integration_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'stable' CHECK (type IN ('alpha', 'beta', 'rc', 'stable', 'lts')),
  notes TEXT,
  release_date TIMESTAMPTZ DEFAULT now(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, version)
);

CREATE INDEX idx_integration_releases_school_id ON integration_releases(school_id);
CREATE INDEX idx_integration_releases_type ON integration_releases(school_id, type);
CREATE INDEX idx_integration_releases_release_date ON integration_releases(school_id, release_date);

ALTER TABLE integration_releases ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON integration_releases
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER integration_releases_updated_at
  BEFORE UPDATE ON integration_releases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
