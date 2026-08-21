-- ============================================================================
-- Documents & Communication Module Tables Migration
-- Created: 2026-08-21
-- ============================================================================
-- Sections:
--   DOCUMENTS MODULE (doc_*)
--     1.  Core Document Tables
--     2.  Metadata & Tags
--     3.  Collaboration & Sharing
--     4.  Workflow & Approvals
--     5.  Security & Compliance
--     6.  Analytics & Usage
--     7.  Storage & Sync
--     8.  Search, Conversion & Indexing
--     9.  Wiki, Project Items & Releases (consolidated)
--    10.  Infrastructure (consolidated)
--    11.  Event Sourcing & CQRS (consolidated)
--   COMMUNICATION MODULE (cm_*)
--    12.  Conversations & Messages
--    13.  Groups & Calls
--    14.  Email, SMS & Notifications
--    15.  Broadcasts, Announcements & Surveys
--    16.  Templates & Scheduled Messages
--    17.  Contacts & Blacklists
--    18.  Batch: Indexes, RLS, Triggers
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
-- DOCUMENTS MODULE (doc_*)
-- ============================================================================

-- ============================================================================
-- 1. CORE DOCUMENT TABLES
-- ============================================================================

CREATE TABLE doc_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES doc_folders(id) ON DELETE SET NULL,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES doc_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  content TEXT,
  category TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  content TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(document_id, version)
);

CREATE TABLE doc_storage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  checksum TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- ============================================================================
-- 2. METADATA & TAGS
-- ============================================================================

CREATE TABLE doc_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  key TEXT NOT NULL,
  value TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(document_id, key)
);

CREATE TABLE doc_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(document_id, tag)
);

CREATE TABLE doc_search_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  content TEXT,
  vectors JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 3. COLLABORATION & SHARING
-- ============================================================================

CREATE TABLE doc_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID NOT NULL,
  permission_type TEXT NOT NULL DEFAULT 'read' CHECK (permission_type IN ('read', 'write', 'admin', 'comment')),
  granted_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(document_id, user_id)
);

CREATE TABLE doc_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  shared_with UUID,
  share_type TEXT NOT NULL DEFAULT 'link' CHECK (share_type IN ('link', 'user', 'group', 'public')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(document_id, user_id)
);

CREATE TABLE doc_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(document_id, user_id)
);
-- ============================================================================
-- 4. WORKFLOW & APPROVALS
-- ============================================================================

CREATE TABLE doc_workflow_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  state TEXT NOT NULL DEFAULT 'draft' CHECK (state IN ('draft', 'review', 'approved', 'published', 'archived', 'rejected')),
  assigned_to UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  approver_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'deferred')),
  comments TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  signer_id UUID NOT NULL,
  signature_data TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'signed', 'rejected')),
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 5. SECURITY & COMPLIANCE
-- ============================================================================

CREATE TABLE doc_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID,
  action TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID,
  action TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_encryption (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  algorithm TEXT NOT NULL DEFAULT 'AES-256',
  key_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_watermarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  watermark_text TEXT NOT NULL,
  position TEXT DEFAULT 'center',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_compliance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  regulation TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'compliant', 'non_compliant', 'under_review')),
  reviewed_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_retention (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  retention_period INTERVAL NOT NULL,
  delete_after TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- ============================================================================
-- 6. ANALYTICS & USAGE
-- ============================================================================

CREATE TABLE doc_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  duration INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  metric_type TEXT NOT NULL,
  value NUMERIC,
  period TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID,
  action TEXT NOT NULL,
  duration INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  user_id UUID NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 7. STORAGE & SYNC
-- ============================================================================

CREATE TABLE doc_archives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  archived_by UUID,
  reason TEXT,
  archived_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_restores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  restored_by UUID,
  restored_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_migrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  source_id UUID,
  destination_id UUID,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_backups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  backup_path TEXT NOT NULL,
  backup_size BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_syncs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  source TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'synced', 'conflict', 'failed')),
  last_synced TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 8. SEARCH, CONVERSION & INDEXING
-- ============================================================================

CREATE TABLE doc_conversion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  source_format TEXT NOT NULL,
  target_format TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_translation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  source_lang TEXT NOT NULL,
  target_lang TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_ocr (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  extracted_text TEXT,
  confidence NUMERIC(5,4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_indexing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  index_status TEXT NOT NULL DEFAULT 'pending' CHECK (index_status IN ('pending', 'indexed', 'failed', 'outdated')),
  last_indexed TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_caching (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_id UUID NOT NULL,
  cache_key TEXT NOT NULL,
  cache_path TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- ============================================================================
-- 9. WIKI, PROJECT ITEMS & RELEASES (consolidated)
-- ============================================================================

CREATE TABLE doc_wiki_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID,
  category TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_project_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('task', 'story', 'epic', 'bug', 'feature', 'improvement', 'research', 'experiment', 'prototype', 'poc', 'mvp', 'alpha', 'beta', 'rc', 'release', 'backlog', 'sprint', 'roadmap', 'changelog', 'release_notes', 'tutorial', 'guide', 'reference', 'api_doc', 'sdk_doc', 'documentation')),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'review', 'done', 'closed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low', 'none')),
  assignee_id UUID,
  parent_id UUID REFERENCES doc_project_items(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'release' CHECK (type IN ('alpha', 'beta', 'rc', 'release', 'hotfix')),
  notes TEXT,
  release_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 10. INFRASTRUCTURE (consolidated)
-- ============================================================================

CREATE TABLE doc_infrastructure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL CHECK (component_type IN (
    'cache_config', 'rate_limiting', 'circuit_breaker', 'retry', 'timeout',
    'bulkhead', 'load_balancer', 'service_discovery', 'api_gateway',
    'message_queue', 'event_bus', 'webhook', 'streaming', 'batch',
    'pipeline', 'workflow', 'orchestration', 'choreography', 'saga'
  )),
  name TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'degraded', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 11. EVENT SOURCING & CQRS (consolidated)
-- ============================================================================

CREATE TABLE doc_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  aggregate_id UUID NOT NULL,
  aggregate_type TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB DEFAULT '{}',
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_projections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  projection_name TEXT NOT NULL,
  state JSONB DEFAULT '{}',
  last_event_id UUID REFERENCES doc_events(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  aggregate_id UUID NOT NULL,
  state JSONB DEFAULT '{}',
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_domain_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  aggregate_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_data_lineage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  target TEXT NOT NULL,
  transformation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doc_data_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  dataset TEXT NOT NULL,
  description TEXT,
  owner UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- ============================================================================
-- COMMUNICATION MODULE (cm_*)
-- ============================================================================

-- ============================================================================
-- 12. CONVERSATIONS & MESSAGES
-- ============================================================================

CREATE TABLE cm_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT,
  type TEXT NOT NULL DEFAULT 'direct' CHECK (type IN ('direct', 'group', 'channel', 'support')),
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_conversation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES cm_conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'readonly')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(conversation_id, user_id)
);

CREATE TABLE cm_message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  parent_message_id UUID NOT NULL,
  reply_count INTEGER NOT NULL DEFAULT 0,
  last_reply_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_message_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  message_id UUID NOT NULL,
  user_id UUID NOT NULL,
  read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(message_id, user_id)
);

CREATE TABLE cm_message_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  message_id UUID NOT NULL,
  user_id UUID NOT NULL,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(message_id, user_id, emoji)
);

CREATE TABLE cm_message_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  message_id UUID NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_message_pins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  message_id UUID NOT NULL,
  pinned_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- ============================================================================
-- 13. GROUPS & CALLS
-- ============================================================================

CREATE TABLE cm_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  avatar TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES cm_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

CREATE TABLE cm_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  caller_id UUID NOT NULL,
  callee_id UUID,
  type TEXT NOT NULL DEFAULT 'voice' CHECK (type IN ('voice', 'video', 'group')),
  status TEXT NOT NULL DEFAULT 'ringing' CHECK (status IN ('ringing', 'active', 'ended', 'missed', 'rejected')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_call_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  call_id UUID NOT NULL REFERENCES cm_calls(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  left_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 14. EMAIL, SMS & NOTIFICATIONS
-- ============================================================================

CREATE TABLE cm_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  from_address TEXT NOT NULL,
  to_addresses TEXT[] NOT NULL,
  subject TEXT NOT NULL,
  body TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'delivered', 'bounced', 'failed')),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  email_id UUID NOT NULL REFERENCES cm_emails(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'delivered', 'bounced', 'failed')),
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_sms_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  to_number TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_sms_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_sms_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  sms_id UUID NOT NULL REFERENCES cm_sms_messages(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'delivered', 'failed')),
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success', 'reminder')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'push', 'in_app')),
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, channel)
);

CREATE TABLE cm_push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  token TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- ============================================================================
-- 15. BROADCASTS, ANNOUNCEMENTS & SURVEYS
-- ============================================================================

CREATE TABLE cm_broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  target_audience TEXT NOT NULL DEFAULT 'all' CHECK (target_audience IN ('all', 'students', 'parents', 'teachers', 'staff', 'custom')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'cancelled')),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  publish_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_announcement_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  announcement_id UUID NOT NULL REFERENCES cm_announcements(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(announcement_id, user_id)
);

CREATE TABLE cm_surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  survey_id UUID NOT NULL REFERENCES cm_surveys(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  type TEXT NOT NULL DEFAULT 'general' CHECK (type IN ('general', 'bug', 'feature', 'complaint', 'suggestion')),
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 16. TEMPLATES & SCHEDULED MESSAGES
-- ============================================================================

CREATE TABLE cm_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'sms', 'push', 'in_app')),
  content TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_scheduled_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  template_id UUID REFERENCES cm_templates(id) ON DELETE SET NULL,
  recipient UUID NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'cancelled', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_message_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  message_id UUID NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'push', 'in_app')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_delivery_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  message_id UUID NOT NULL,
  status TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 17. CONTACTS & BLACKLISTS
-- ============================================================================

CREATE TABLE cm_contact_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  member_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cm_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  list_id UUID NOT NULL REFERENCES cm_contact_lists(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(list_id, user_id)
);

CREATE TABLE cm_blacklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  identifier TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'phone', 'ip', 'user')),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, identifier, type)
);

CREATE TABLE cm_opt_outs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'push', 'all')),
  opted_out_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, channel)
);
-- ============================================================================
-- 18. BATCH: INDEXES, RLS, TRIGGERS
-- ============================================================================

-- ------------------------------------------------------------
-- Indexes on school_id (and key FK columns) for all doc_* tables
-- ------------------------------------------------------------
DO
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'doc_folders', 'doc_categories', 'doc_templates',
            'doc_versions', 'doc_storage',
            'doc_metadata', 'doc_tags', 'doc_search_index',
            'doc_permissions', 'doc_shares', 'doc_comments',
            'doc_collaborations', 'doc_bookmarks',
            'doc_workflow_states', 'doc_approvals', 'doc_signatures',
            'doc_notifications',
            'doc_audit_logs', 'doc_access_logs',
            'doc_encryption', 'doc_watermarks',
            'doc_compliance', 'doc_retention',
            'doc_views', 'doc_downloads', 'doc_analytics',
            'doc_usage', 'doc_feedback',
            'doc_archives', 'doc_restores', 'doc_migrations',
            'doc_backups', 'doc_syncs',
            'doc_conversion', 'doc_translation', 'doc_ocr',
            'doc_indexing', 'doc_caching',
            'doc_wiki_pages', 'doc_project_items', 'doc_releases',
            'doc_infrastructure',
            'doc_events', 'doc_projections', 'doc_snapshots',
            'doc_domain_events', 'doc_data_lineage', 'doc_data_catalog',
            'cm_conversations', 'cm_conversation_members',
            'cm_message_threads', 'cm_message_reads',
            'cm_message_reactions', 'cm_message_attachments', 'cm_message_pins',
            'cm_groups', 'cm_group_members',
            'cm_calls', 'cm_call_participants',
            'cm_emails', 'cm_email_templates', 'cm_email_logs',
            'cm_sms_messages', 'cm_sms_templates', 'cm_sms_logs',
            'cm_notifications', 'cm_notification_preferences', 'cm_push_tokens',
            'cm_broadcasts', 'cm_announcements', 'cm_announcement_reads',
            'cm_surveys', 'cm_survey_responses', 'cm_feedback',
            'cm_templates', 'cm_scheduled_messages',
            'cm_message_logs', 'cm_delivery_reports',
            'cm_contact_lists', 'cm_contacts', 'cm_blacklist', 'cm_opt_outs'
        ])
    LOOP
        EXECUTE format(
            'CREATE INDEX IF NOT EXISTS idx_%s_school_id ON %I (school_id)',
            t, t
        );
    END LOOP;
END ;

-- Additional FK indexes for doc_* tables referencing document_id
DO
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'doc_versions', 'doc_storage', 'doc_metadata', 'doc_tags',
            'doc_search_index', 'doc_permissions', 'doc_shares',
            'doc_comments', 'doc_collaborations', 'doc_bookmarks',
            'doc_workflow_states', 'doc_approvals', 'doc_signatures',
            'doc_notifications', 'doc_audit_logs', 'doc_access_logs',
            'doc_encryption', 'doc_watermarks', 'doc_compliance',
            'doc_retention', 'doc_views', 'doc_downloads',
            'doc_analytics', 'doc_usage', 'doc_feedback',
            'doc_archives', 'doc_restores', 'doc_backups', 'doc_syncs',
            'doc_conversion', 'doc_translation', 'doc_ocr',
            'doc_indexing', 'doc_caching', 'doc_events', 'doc_snapshots',
            'doc_domain_events'
        ])
    LOOP
        EXECUTE format(
            'CREATE INDEX IF NOT EXISTS idx_%s_document_id ON %I (document_id)',
            t, t
        );
    END LOOP;
END ;

-- FK indexes for cm_* tables referencing conversation_id, message_id, call_id, etc.
DO
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'cm_conversation_members', 'cm_calls', 'cm_call_participants',
            'cm_email_logs', 'cm_sms_logs', 'cm_announcement_reads',
            'cm_survey_responses', 'cm_contacts'
        ])
    LOOP
        EXECUTE format(
            'CREATE INDEX IF NOT EXISTS idx_%s_fk ON %I (%s_id)',
            t, t,
            CASE t
                WHEN 'cm_conversation_members' THEN 'conversation'
                WHEN 'cm_calls' THEN 'call'
                WHEN 'cm_call_participants' THEN 'call'
                WHEN 'cm_email_logs' THEN 'email'
                WHEN 'cm_sms_logs' THEN 'sms'
                WHEN 'cm_announcement_reads' THEN 'announcement'
                WHEN 'cm_survey_responses' THEN 'survey'
                WHEN 'cm_contacts' THEN 'list'
            END
        );
    END LOOP;
END ;

-- Additional targeted indexes
CREATE INDEX IF NOT EXISTS idx_doc_folders_parent_id ON doc_folders(parent_id);
CREATE INDEX IF NOT EXISTS idx_doc_folders_created_by ON doc_folders(created_by);
CREATE INDEX IF NOT EXISTS idx_doc_categories_parent_id ON doc_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_doc_versions_document_id_version ON doc_versions(document_id, version);
CREATE INDEX IF NOT EXISTS idx_doc_workflow_states_document_id ON doc_workflow_states(document_id);
CREATE INDEX IF NOT EXISTS idx_doc_approvals_document_id ON doc_approvals(document_id);
CREATE INDEX IF NOT EXISTS idx_doc_approvals_approver_id ON doc_approvals(approver_id);
CREATE INDEX IF NOT EXISTS idx_doc_signatures_document_id ON doc_signatures(document_id);
CREATE INDEX IF NOT EXISTS idx_doc_signatures_signer_id ON doc_signatures(signer_id);
CREATE INDEX IF NOT EXISTS idx_doc_audit_logs_document_id ON doc_audit_logs(document_id);
CREATE INDEX IF NOT EXISTS idx_doc_audit_logs_user_id ON doc_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_doc_access_logs_document_id ON doc_access_logs(document_id);
CREATE INDEX IF NOT EXISTS idx_doc_events_aggregate_id ON doc_events(aggregate_id);
CREATE INDEX IF NOT EXISTS idx_doc_events_aggregate_type ON doc_events(aggregate_type);
CREATE INDEX IF NOT EXISTS idx_doc_events_event_type ON doc_events(event_type);
CREATE INDEX IF NOT EXISTS idx_doc_events_version ON doc_events(aggregate_id, version);
CREATE INDEX IF NOT EXISTS idx_doc_project_items_type ON doc_project_items(type);
CREATE INDEX IF NOT EXISTS idx_doc_project_items_status ON doc_project_items(status);
CREATE INDEX IF NOT EXISTS idx_doc_project_items_parent_id ON doc_project_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_doc_project_items_assignee_id ON doc_project_items(assignee_id);
CREATE INDEX IF NOT EXISTS idx_doc_infrastructure_component_type ON doc_infrastructure(component_type);
CREATE INDEX IF NOT EXISTS idx_doc_wiki_pages_status ON doc_wiki_pages(status);
CREATE INDEX IF NOT EXISTS idx_doc_wiki_pages_category ON doc_wiki_pages(category);
CREATE INDEX IF NOT EXISTS idx_doc_releases_version ON doc_releases(version);
CREATE INDEX IF NOT EXISTS idx_cm_conversations_type ON cm_conversations(type);
CREATE INDEX IF NOT EXISTS idx_cm_message_threads_parent_message_id ON cm_message_threads(parent_message_id);
CREATE INDEX IF NOT EXISTS idx_cm_message_reads_message_id ON cm_message_reads(message_id);
CREATE INDEX IF NOT EXISTS idx_cm_message_reads_user_id ON cm_message_reads(user_id);
CREATE INDEX IF NOT EXISTS idx_cm_message_reactions_message_id ON cm_message_reactions(message_id);
CREATE INDEX IF NOT EXISTS idx_cm_message_attachments_message_id ON cm_message_attachments(message_id);
CREATE INDEX IF NOT EXISTS idx_cm_calls_caller_id ON cm_calls(caller_id);
CREATE INDEX IF NOT EXISTS idx_cm_calls_status ON cm_calls(status);
CREATE INDEX IF NOT EXISTS idx_cm_call_participants_user_id ON cm_call_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_cm_emails_status ON cm_emails(status);
CREATE INDEX IF NOT EXISTS idx_cm_sms_messages_status ON cm_sms_messages(status);
CREATE INDEX IF NOT EXISTS idx_cm_notifications_user_id ON cm_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_cm_notifications_is_read ON cm_notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_cm_push_tokens_user_id ON cm_push_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_cm_push_tokens_active ON cm_push_tokens(active);
CREATE INDEX IF NOT EXISTS idx_cm_scheduled_messages_scheduled_at ON cm_scheduled_messages(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_cm_scheduled_messages_status ON cm_scheduled_messages(status);
CREATE INDEX IF NOT EXISTS idx_cm_surveys_status ON cm_surveys(status);
CREATE INDEX IF NOT EXISTS idx_cm_blacklist_identifier ON cm_blacklist(identifier);
-- ------------------------------------------------------------
-- Triggers: update_updated_at_column for all tables
-- ------------------------------------------------------------
DO
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'doc_folders', 'doc_categories', 'doc_templates',
            'doc_versions', 'doc_storage',
            'doc_metadata', 'doc_tags', 'doc_search_index',
            'doc_permissions', 'doc_shares', 'doc_comments',
            'doc_collaborations', 'doc_bookmarks',
            'doc_workflow_states', 'doc_approvals', 'doc_signatures',
            'doc_notifications',
            'doc_audit_logs', 'doc_access_logs',
            'doc_encryption', 'doc_watermarks',
            'doc_compliance', 'doc_retention',
            'doc_views', 'doc_downloads', 'doc_analytics',
            'doc_usage', 'doc_feedback',
            'doc_archives', 'doc_restores', 'doc_migrations',
            'doc_backups', 'doc_syncs',
            'doc_conversion', 'doc_translation', 'doc_ocr',
            'doc_indexing', 'doc_caching',
            'doc_wiki_pages', 'doc_project_items', 'doc_releases',
            'doc_infrastructure',
            'doc_events', 'doc_projections', 'doc_snapshots',
            'doc_domain_events', 'doc_data_lineage', 'doc_data_catalog',
            'cm_conversations', 'cm_conversation_members',
            'cm_message_threads', 'cm_message_reads',
            'cm_message_reactions', 'cm_message_attachments', 'cm_message_pins',
            'cm_groups', 'cm_group_members',
            'cm_calls', 'cm_call_participants',
            'cm_emails', 'cm_email_templates', 'cm_email_logs',
            'cm_sms_messages', 'cm_sms_templates', 'cm_sms_logs',
            'cm_notifications', 'cm_notification_preferences', 'cm_push_tokens',
            'cm_broadcasts', 'cm_announcements', 'cm_announcement_reads',
            'cm_surveys', 'cm_survey_responses', 'cm_feedback',
            'cm_templates', 'cm_scheduled_messages',
            'cm_message_logs', 'cm_delivery_reports',
            'cm_contact_lists', 'cm_contacts', 'cm_blacklist', 'cm_opt_outs'
        ])
    LOOP
        EXECUTE format(
            'CREATE TRIGGER %s_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()',
            t, t
        );
    END LOOP;
END ;

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY: Enable RLS and create school_id isolation
-- ------------------------------------------------------------
DO
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'doc_folders', 'doc_categories', 'doc_templates',
            'doc_versions', 'doc_storage',
            'doc_metadata', 'doc_tags', 'doc_search_index',
            'doc_permissions', 'doc_shares', 'doc_comments',
            'doc_collaborations', 'doc_bookmarks',
            'doc_workflow_states', 'doc_approvals', 'doc_signatures',
            'doc_notifications',
            'doc_audit_logs', 'doc_access_logs',
            'doc_encryption', 'doc_watermarks',
            'doc_compliance', 'doc_retention',
            'doc_views', 'doc_downloads', 'doc_analytics',
            'doc_usage', 'doc_feedback',
            'doc_archives', 'doc_restores', 'doc_migrations',
            'doc_backups', 'doc_syncs',
            'doc_conversion', 'doc_translation', 'doc_ocr',
            'doc_indexing', 'doc_caching',
            'doc_wiki_pages', 'doc_project_items', 'doc_releases',
            'doc_infrastructure',
            'doc_events', 'doc_projections', 'doc_snapshots',
            'doc_domain_events', 'doc_data_lineage', 'doc_data_catalog',
            'cm_conversations', 'cm_conversation_members',
            'cm_message_threads', 'cm_message_reads',
            'cm_message_reactions', 'cm_message_attachments', 'cm_message_pins',
            'cm_groups', 'cm_group_members',
            'cm_calls', 'cm_call_participants',
            'cm_emails', 'cm_email_templates', 'cm_email_logs',
            'cm_sms_messages', 'cm_sms_templates', 'cm_sms_logs',
            'cm_notifications', 'cm_notification_preferences', 'cm_push_tokens',
            'cm_broadcasts', 'cm_announcements', 'cm_announcement_reads',
            'cm_surveys', 'cm_survey_responses', 'cm_feedback',
            'cm_templates', 'cm_scheduled_messages',
            'cm_message_logs', 'cm_delivery_reports',
            'cm_contact_lists', 'cm_contacts', 'cm_blacklist', 'cm_opt_outs'
        ])
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
        EXECUTE format('DROP POLICY IF EXISTS school_isolation_policy ON %I', t);
        EXECUTE format(
            'CREATE POLICY school_isolation_policy ON %I
             USING (school_id = (SELECT school_id FROM user_schools WHERE user_id = auth.uid() LIMIT 1))
             WITH CHECK (school_id = (SELECT school_id FROM user_schools WHERE user_id = auth.uid() LIMIT 1))',
            t
        );
    END LOOP;
END ;
