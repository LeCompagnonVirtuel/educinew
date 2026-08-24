# GESTCRP — Deployment Guide

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGciOiJIUzI1NiIs...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJhbGciOiJIUzI1NiIs...` |
| `GESTCRP_ENCRYPTION_KEY` | Master encryption key (256-bit) | `base64_encoded_key` |
| `GESTCRP_HMAC_SECRET` | HMAC signing secret | `base64_encoded_secret` |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GESTCRP_ENABLED` | `true` | Enable/disable GESTCRP module |
| `GESTCRP_MAX_PAGE_SIZE` | `200` | Maximum records per page |
| `GESTCRP_AUDIT_LOG_ENABLED` | `true` | Enable audit logging |
| `GESTCRP_VALIDATION_ENABLED` | `true` | Enable input validation |
| `GESTCRP_SIEM_INGESTION_RATE` | `10000` | Max events/second |
| `GESTCRP_THREAT_FEED_TIMEOUT` | `30000` | Feed fetch timeout (ms) |
| `GESTCRP_SOAR_EXECUTION_TIMEOUT` | `3600` | Max playbook execution (s) |
| `GESTCRP_DIGITAL_TWIN_TIMEOUT` | `7200` | Max simulation time (s) |

---

## Database Migrations

### Tables Overview

All tables require `school_id`, `created_at`, `updated_at`, and `deleted_at` columns.

#### Zero Trust

```sql
CREATE TABLE gestcrp_zero_trust_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 500,
  zones JSONB DEFAULT '[]',
  conditions JSONB DEFAULT '[]',
  actions JSONB DEFAULT '[]',
  enforcement_mode TEXT NOT NULL DEFAULT 'STRICT',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_zero_trust_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  subject_type TEXT NOT NULL CHECK (subject_type IN ('USER','DEVICE','SERVICE','DATA')),
  subject_id TEXT NOT NULL,
  decision TEXT NOT NULL,
  confidence INTEGER NOT NULL CHECK (confidence BETWEEN 0 AND 100),
  risk_score INTEGER NOT NULL CHECK (risk_score BETWEEN 0 AND 100),
  risk_factors JSONB DEFAULT '[]',
  policies_evaluated JSONB DEFAULT '[]',
  enforcement_actions JSONB DEFAULT '[]',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_zero_trust_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  policy_id UUID NOT NULL REFERENCES gestcrp_zero_trust_policies(id),
  subject_type TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  result TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  factors JSONB DEFAULT '{}',
  evaluated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_zero_trust_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 10),
  policies JSONB DEFAULT '[]',
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_zero_trust_contexts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  user_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  user_agent TEXT,
  geolocation JSONB DEFAULT '{}',
  risk_score INTEGER DEFAULT 0,
  verification_level TEXT DEFAULT 'NONE',
  trust_level TEXT DEFAULT 'UNKNOWN',
  last_verified_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### IAM

```sql
CREATE TABLE gestcrp_iam_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  effect TEXT NOT NULL CHECK (effect IN ('ALLOW','DENY')),
  subjects JSONB NOT NULL DEFAULT '[]',
  resources JSONB NOT NULL DEFAULT '[]',
  actions JSONB NOT NULL DEFAULT '[]',
  conditions JSONB DEFAULT '[]',
  priority INTEGER DEFAULT 500,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_iam_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  user_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  auth_method TEXT NOT NULL,
  identity_provider TEXT DEFAULT '',
  ip_address TEXT NOT NULL,
  user_agent TEXT DEFAULT '',
  geolocation JSONB DEFAULT '{}',
  success BOOLEAN NOT NULL,
  risk_score INTEGER DEFAULT 0,
  risk_factors JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_iam_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  refresh_token_hash TEXT DEFAULT '',
  auth_method TEXT NOT NULL,
  identity_provider TEXT DEFAULT '',
  device_context JSONB DEFAULT '{}',
  ip_address TEXT NOT NULL,
  user_agent TEXT DEFAULT '',
  geolocation JSONB DEFAULT '{}',
  risk_score INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ NOT NULL,
  last_activity_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_credential_rotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  credential_type TEXT NOT NULL,
  rotation_interval_days INTEGER NOT NULL,
  max_age INTEGER NOT NULL,
  alert_before_expiration_days INTEGER DEFAULT 30,
  enforce_rotation BOOLEAN DEFAULT true,
  notification_channels JSONB DEFAULT '[]',
  enabled BOOLEAN DEFAULT true,
  last_rotated_at TIMESTAMPTZ,
  next_rotation_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_biometric_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  template_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  algorithm TEXT NOT NULL,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  last_used_at TIMESTAMPTZ,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### SOC

```sql
CREATE TABLE gestcrp_soc_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'NEW',
  category TEXT NOT NULL,
  source TEXT NOT NULL,
  affected_systems JSONB DEFAULT '[]',
  affected_users JSONB DEFAULT '[]',
  indicators JSONB DEFAULT '[]',
  timeline JSONB DEFAULT '[]',
  apt_actions JSONB DEFAULT '[]',
  assigned_to TEXT,
  resolved_at TIMESTAMPTZ,
  root_cause TEXT,
  remediation TEXT,
  lessons_learned TEXT,
  risk_score INTEGER DEFAULT 0,
  estimated_impact INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_soc_indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  incident_id UUID NOT NULL REFERENCES gestcrp_soc_incidents(id),
  type TEXT NOT NULL,
  value TEXT NOT NULL,
  confidence INTEGER NOT NULL CHECK (confidence BETWEEN 0 AND 100),
  severity TEXT NOT NULL,
  source TEXT NOT NULL,
  tags JSONB DEFAULT '[]',
  first_seen TIMESTAMPTZ DEFAULT now(),
  last_seen TIMESTAMPTZ DEFAULT now(),
  expiry TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_apt_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  incident_id UUID NOT NULL REFERENCES gestcrp_soc_incidents(id),
  action TEXT NOT NULL,
  parameters JSONB DEFAULT '{}',
  executed_by TEXT NOT NULL,
  executed_at TIMESTAMPTZ DEFAULT now(),
  result TEXT DEFAULT 'PENDING',
  rollback_available BOOLEAN DEFAULT false,
  rollback_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### SIEM

```sql
CREATE TABLE gestcrp_siem_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  source TEXT NOT NULL,
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  message TEXT NOT NULL,
  raw_log TEXT NOT NULL,
  parsed_fields JSONB DEFAULT '{}',
  user TEXT,
  ip_address TEXT,
  device TEXT,
  application TEXT,
  tags JSONB DEFAULT '[]',
  ioc_matches JSONB DEFAULT '[]',
  correlated_events JSONB DEFAULT '[]',
  normalized BOOLEAN DEFAULT false,
  timestamp TIMESTAMPTZ DEFAULT now(),
  ingested_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_siem_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  severity TEXT NOT NULL,
  event_type TEXT NOT NULL,
  conditions JSONB NOT NULL DEFAULT '[]',
  actions JSONB DEFAULT '[]',
  suppression_window INTEGER DEFAULT 300,
  match_count INTEGER DEFAULT 0,
  last_matched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_siem_correlations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  events JSONB NOT NULL DEFAULT '[]',
  time_window INTEGER NOT NULL,
  threshold INTEGER NOT NULL,
  severity TEXT NOT NULL,
  actions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### Threat Detection

```sql
CREATE TABLE gestcrp_threat_indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  type TEXT NOT NULL,
  value TEXT NOT NULL,
  confidence INTEGER NOT NULL CHECK (confidence BETWEEN 0 AND 100),
  severity TEXT NOT NULL,
  category TEXT NOT NULL,
  source TEXT NOT NULL,
  tags JSONB DEFAULT '[]',
  description TEXT,
  first_seen TIMESTAMPTZ DEFAULT now(),
  last_seen TIMESTAMPTZ DEFAULT now(),
  expiry TIMESTAMPTZ,
  mitre_attack_ids JSONB DEFAULT '[]',
  associated_threats JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_threat_feeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  feed_type TEXT NOT NULL,
  format TEXT NOT NULL,
  refresh_interval_minutes INTEGER NOT NULL,
  enabled BOOLEAN DEFAULT true,
  last_synced_at TIMESTAMPTZ,
  indicators_count INTEGER DEFAULT 0,
  reliability INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_threat_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  threat_id UUID NOT NULL REFERENCES gestcrp_threat_indicators(id),
  analyst TEXT NOT NULL,
  methodology TEXT NOT NULL,
  findings JSONB DEFAULT '[]',
  risk_assessment JSONB DEFAULT '{}',
  recommendations JSONB DEFAULT '[]',
  evidence JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_threat_feed_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  feed_id UUID NOT NULL REFERENCES gestcrp_threat_feeds(id),
  indicator_id UUID NOT NULL REFERENCES gestcrp_threat_indicators(id),
  matched_event TEXT NOT NULL,
  confidence INTEGER NOT NULL CHECK (confidence BETWEEN 0 AND 100),
  acknowledged BOOLEAN DEFAULT false,
  acknowledged_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### Application Security

```sql
CREATE TABLE gestcrp_app_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  scan_type TEXT NOT NULL,
  target TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  findings JSONB DEFAULT '[]',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  duration INTEGER,
  scanner TEXT NOT NULL,
  version TEXT NOT NULL,
  triggered_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_vulnerabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  scan_id UUID NOT NULL REFERENCES gestcrp_app_scans(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'NEW',
  category TEXT NOT NULL,
  cwe_id TEXT,
  cve_id TEXT,
  cvss_score NUMERIC,
  affected_component TEXT NOT NULL,
  affected_file TEXT,
  affected_line INTEGER,
  evidence TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  references JSONB DEFAULT '[]',
  exploit_available BOOLEAN DEFAULT false,
  patch_available BOOLEAN DEFAULT false,
  risk_score INTEGER NOT NULL DEFAULT 0,
  discovered_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_api_security_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  api_path TEXT NOT NULL,
  methods JSONB NOT NULL DEFAULT '[]',
  rate_limit INTEGER NOT NULL DEFAULT 100,
  rate_limit_window INTEGER NOT NULL DEFAULT 60,
  authentication TEXT NOT NULL DEFAULT 'BEARER',
  authorization JSONB DEFAULT '[]',
  input_validation JSONB DEFAULT '[]',
  output_encoding TEXT DEFAULT 'JSON',
  cors_policy JSONB,
  waf_rules JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_dependency_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  target TEXT NOT NULL,
  dependencies JSONB DEFAULT '[]',
  vulnerabilities JSONB DEFAULT '[]',
  completed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### Data Security

```sql
CREATE TABLE gestcrp_dlp_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  policy_type TEXT NOT NULL,
  data_classification JSONB NOT NULL DEFAULT '[]',
  patterns JSONB DEFAULT '[]',
  actions JSONB NOT NULL DEFAULT '[]',
  exclusions JSONB DEFAULT '[]',
  severity TEXT NOT NULL,
  notification_channels JSONB DEFAULT '[]',
  applies_to TEXT NOT NULL DEFAULT 'ALL',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_dlp_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  policy_id UUID NOT NULL REFERENCES gestcrp_dlp_policies(id),
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  data_classification TEXT NOT NULL,
  matched_patterns JSONB DEFAULT '[]',
  source TEXT NOT NULL,
  destination TEXT NOT NULL,
  file_name TEXT,
  file_size INTEGER,
  file_type TEXT,
  content_preview TEXT NOT NULL,
  blocked BOOLEAN DEFAULT false,
  encrypted BOOLEAN DEFAULT false,
  watermarked BOOLEAN DEFAULT false,
  notified BOOLEAN DEFAULT false,
  timestamp TIMESTAMPTZ DEFAULT now(),
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  disposition TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_encryption_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  algorithm TEXT NOT NULL,
  size INTEGER NOT NULL,
  purpose TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  fingerprint TEXT NOT NULL,
  public_key TEXT,
  encrypted_private_key TEXT NOT NULL,
  key_version INTEGER DEFAULT 1,
  expires_at TIMESTAMPTZ NOT NULL,
  rotated_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_data_retention_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  data_classification JSONB NOT NULL DEFAULT '[]',
  retention_days INTEGER NOT NULL,
  archive_before_deletion BOOLEAN DEFAULT false,
  archive_duration_days INTEGER,
  deletion_method TEXT NOT NULL,
  exceptions JSONB DEFAULT '[]',
  compliance_frameworks JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_data_masking_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  field_patterns JSONB NOT NULL DEFAULT '[]',
  masking_type TEXT NOT NULL,
  mask_char TEXT DEFAULT '*',
  preserve_length BOOLEAN DEFAULT true,
  tokenization_key TEXT,
  applies_to JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### Device Security

```sql
CREATE TABLE gestcrp_device_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  hostname TEXT NOT NULL,
  platform TEXT NOT NULL,
  os_version TEXT NOT NULL,
  architecture TEXT DEFAULT '',
  serial_number TEXT NOT NULL,
  mac_address TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  last_seen_at TIMESTAMPTZ DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'ONLINE',
  owner TEXT NOT NULL,
  department TEXT DEFAULT '',
  location TEXT DEFAULT '',
  tags JSONB DEFAULT '[]',
  managed_by TEXT DEFAULT 'MANUAL',
  protection_status JSONB DEFAULT '{}',
  compliance_status JSONB DEFAULT '{}',
  installed_software JSONB DEFAULT '[]',
  open_ports JSONB DEFAULT '[]',
  network_interfaces JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_device_compliance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  device_id UUID NOT NULL REFERENCES gestcrp_device_inventory(id),
  compliant BOOLEAN NOT NULL DEFAULT false,
  last_checked_at TIMESTAMPTZ DEFAULT now(),
  issues JSONB DEFAULT '[]',
  patch_level TEXT DEFAULT '',
  os_up_to_date BOOLEAN DEFAULT false,
  encryption_compliant BOOLEAN DEFAULT false,
  password_compliant BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_mdm_commands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  device_id UUID NOT NULL REFERENCES gestcrp_device_inventory(id),
  command TEXT NOT NULL,
  parameters JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'PENDING',
  sent_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  result JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### SOAR

```sql
CREATE TABLE gestcrp_soar_playbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  trigger TEXT NOT NULL,
  conditions JSONB DEFAULT '[]',
  steps JSONB NOT NULL DEFAULT '[]',
  on_success JSONB DEFAULT '[]',
  on_failure JSONB DEFAULT '[]',
  execution_count INTEGER DEFAULT 0,
  last_executed_at TIMESTAMPTZ,
  average_execution_time INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_soar_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  playbook_id UUID NOT NULL REFERENCES gestcrp_soar_playbooks(id),
  trigger TEXT NOT NULL,
  triggered_by TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'RUNNING',
  steps JSONB DEFAULT '[]',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  duration INTEGER,
  error TEXT,
  result JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### BCP & DR

```sql
CREATE TABLE gestcrp_bcp_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  scope TEXT NOT NULL,
  objectives JSONB NOT NULL DEFAULT '[]',
  critical_functions JSONB NOT NULL DEFAULT '[]',
  recovery_procedures JSONB DEFAULT '[]',
  roles JSONB DEFAULT '[]',
  communication_plan JSONB DEFAULT '{}',
  testing_schedule JSONB DEFAULT '{}',
  last_tested_at TIMESTAMPTZ,
  next_test_at TIMESTAMPTZ,
  last_review_at TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_backup_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  backup_type TEXT NOT NULL,
  schedule TEXT NOT NULL,
  retention_days INTEGER NOT NULL,
  encryption_enabled BOOLEAN DEFAULT true,
  compression_enabled BOOLEAN DEFAULT true,
  target_location TEXT NOT NULL,
  sources JSONB NOT NULL DEFAULT '[]',
  verify_after_backup BOOLEAN DEFAULT true,
  last_backup_at TIMESTAMPTZ,
  last_backup_status TEXT DEFAULT 'SUCCESS',
  next_backup_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_backup_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  policy_id UUID NOT NULL REFERENCES gestcrp_backup_policies(id),
  status TEXT NOT NULL DEFAULT 'RUNNING',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  duration INTEGER,
  total_size INTEGER DEFAULT 0,
  compressed_size INTEGER DEFAULT 0,
  files_count INTEGER DEFAULT 0,
  encrypted BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_dr_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  plan_id UUID NOT NULL REFERENCES gestcrp_bcp_plans(id),
  procedure_id TEXT NOT NULL,
  test_date TIMESTAMPTZ DEFAULT now(),
  duration INTEGER NOT NULL,
  success BOOLEAN NOT NULL,
  issues JSONB DEFAULT '[]',
  improvements JSONB DEFAULT '[]',
  participant_feedback JSONB DEFAULT '[]',
  next_steps JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### Compliance & Governance

```sql
CREATE TABLE gestcrp_compliance_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  standard TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'NOT_STARTED',
  scope TEXT NOT NULL,
  requirements JSONB DEFAULT '[]',
  assessment_date TIMESTAMPTZ DEFAULT now(),
  assessor TEXT NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,
  score INTEGER DEFAULT 0,
  max_score INTEGER DEFAULT 100,
  findings JSONB DEFAULT '[]',
  recommendations JSONB DEFAULT '[]',
  documents JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_governance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  owner TEXT NOT NULL,
  approver TEXT DEFAULT '',
  effective_date TIMESTAMPTZ NOT NULL,
  review_date TIMESTAMPTZ NOT NULL,
  expiry_date TIMESTAMPTZ,
  applicable_roles JSONB DEFAULT '[]',
  applicable_data JSONB DEFAULT '[]',
  tags JSONB DEFAULT '[]',
  document_url TEXT,
  last_review_at TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_risk_registers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  likelihood INTEGER NOT NULL CHECK (likelihood BETWEEN 1 AND 5),
  impact INTEGER NOT NULL CHECK (impact BETWEEN 1 AND 5),
  risk_score INTEGER NOT NULL,
  risk_level TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'IDENTIFIED',
  owner TEXT NOT NULL,
  controls JSONB DEFAULT '[]',
  treatment_plan TEXT NOT NULL,
  residual_risk INTEGER,
  last_assessed_at TIMESTAMPTZ DEFAULT now(),
  next_assessment_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  actor_type TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address TEXT DEFAULT '',
  user_agent TEXT DEFAULT '',
  result TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

#### Cyber Digital Twin

```sql
CREATE TABLE gestcrp_cyber_digital_twins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  simulation_type TEXT NOT NULL,
  scope TEXT NOT NULL,
  environment JSONB DEFAULT '{}',
  attack_scenarios JSONB DEFAULT '[]',
  defenses JSONB DEFAULT '[]',
  created_by TEXT NOT NULL,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  duration INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_twin_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  twin_id UUID NOT NULL REFERENCES gestcrp_cyber_digital_twins(id),
  scenario_id TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  detection_time INTEGER NOT NULL,
  response_time INTEGER NOT NULL,
  mitigation_time INTEGER NOT NULL,
  findings JSONB DEFAULT '[]',
  recommendations JSONB DEFAULT '[]',
  score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE gestcrp_attack_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  twin_id UUID NOT NULL REFERENCES gestcrp_cyber_digital_twins(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  technique TEXT NOT NULL,
  mitre_attack_id TEXT,
  severity TEXT NOT NULL,
  target TEXT NOT NULL,
  expected_duration INTEGER NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]',
  success_criteria JSONB NOT NULL DEFAULT '[]',
  rollback_plan TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

### Indexes

Create indexes for performance on all tables:

```sql
-- All tables: filter by school_id
CREATE INDEX idx_<table>_school_id ON <table>(school_id);

-- Incidents: filter by severity and status
CREATE INDEX idx_soc_incidents_severity ON gestcrp_soc_incidents(severity);
CREATE INDEX idx_soc_incidents_status ON gestcrp_soc_incidents(status);

-- SIEM events: time-based queries
CREATE INDEX idx_siem_events_timestamp ON gestcrp_siem_events(timestamp);
CREATE INDEX idx_siem_events_source ON gestcrp_siem_events(source);

-- Threat indicators: type and category
CREATE INDEX idx_threat_indicators_type ON gestcrp_threat_indicators(type);
CREATE INDEX idx_threat_indicators_category ON gestcrp_threat_indicators(category);

-- Vulnerabilities: severity and status
CREATE INDEX idx_vulnerabilities_severity ON gestcrp_vulnerabilities(severity);
CREATE INDEX idx_vulnerabilities_status ON gestcrp_vulnerabilities(status);

-- Devices: platform and status
CREATE INDEX idx_device_inventory_platform ON gestcrp_device_inventory(platform);
CREATE INDEX idx_device_inventory_status ON gestcrp_device_inventory(status);

-- Audit logs: timestamp
CREATE INDEX idx_audit_logs_timestamp ON gestcrp_audit_logs(timestamp);
```

### Row Level Security

Enable RLS on every table:

```sql
ALTER TABLE gestcrp_zero_trust_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_isolation" ON gestcrp_zero_trust_policies
  USING (school_id = auth.uid()::text);

-- Repeat for all gestcrp_* tables
```

---

## Service Dependencies

### Required Services

| Service | Purpose | Required |
|---------|---------|----------|
| Supabase | Database, Auth, Storage | Yes |
| Supabase Edge Functions | Webhook processing, scheduled tasks | Yes |
| Next.js | Web application server | Yes |

### Optional Services

| Service | Purpose |
|---------|---------|
| External threat intelligence feeds | STIX/TAXII/MISP feed sync |
| Email service (SMTP) | Notifications and alerts |
| Slack/Teams webhooks | Real-time alerting |
| External SIEM | Log forwarding |
| MDM provider | Device management integration |

---

## Monitoring Setup

### Health Checks

Monitor these endpoints:

```
GET /api/gestcrp/dashboard/score
```

Expected response time: < 2 seconds

### Key Metrics

| Metric | Warning | Critical |
|--------|---------|----------|
| API response time | > 1s | > 5s |
| SIEM ingestion rate | > 8,000/s | > 9,500/s |
| SOAR execution failures | > 5% | > 10% |
| Backup job failures | > 0 | > 0 |
| Open CRITICAL incidents | > 0 | > 5 |
| Device compliance rate | < 90% | < 80% |

### Alerting Rules

| Alert | Condition | Severity |
|-------|-----------|----------|
| Zero Trust evaluation failure | Any failure in STRICT mode | HIGH |
| SOC incident CRITICAL | New CRITICAL incident created | CRITICAL |
| Backup job failed | Backup job status = FAILED | HIGH |
| Compliance score drop | Score drops > 10 points | MEDIUM |
| Digital twin simulation failed | Simulation status = FAILED | LOW |
| Credential rotation overdue | rotation overdue by > 7 days | HIGH |

---

## Backup Procedures

### Database Backups

1. **Automated backups** run daily via backup policies
2. **Backup retention:** 365 days (configurable per policy)
3. **Backup encryption:** AES-256-GCM (mandatory)
4. **Backup verification:** Post-backup checksum validation
5. **Offsite copy:** Replicate to cloud/offsite location

### Backup Verification

After each backup job:

1. Verify checksum integrity
2. Test restore to staging environment
3. Validate data consistency
4. Log verification results in `gestcrp_backup_jobs`

### Disaster Recovery

1. **RTO (Recovery Time Objective):** Per BCP plan configuration
2. **RPO (Recovery Point Objective):** Per BCP plan configuration
3. **DR testing:** Quarterly tabletop exercises, annual full exercises
4. **DR site:** Primary, secondary, cloud, or offsite

---

## Deployment Checklist

Before deploying GESTCRP:

- [ ] Environment variables configured
- [ ] Database migrations executed
- [ ] RLS policies enabled on all tables
- [ ] Indexes created
- [ ] Encryption keys generated and backed up
- [ ] Supabase service role key secured
- [ ] Threat intelligence feed URLs accessible
- [ ] Email/Slack notification channels configured
- [ ] MDM provider integrated (if applicable)
- [ ] Backup policies reviewed
- [ ] DR test completed
- [ ] Monitoring and alerting configured
- [ ] Security score baseline established

---

## Production Hardening

1. **Never expose** `SUPABASE_SERVICE_ROLE_KEY` to the client
2. **Enable HTTPS** for all API endpoints
3. **Configure CORS** to allow only trusted origins
4. **Set rate limits** on all public-facing endpoints
5. **Enable audit logging** for all write operations
6. **Rotate encryption keys** every 90 days
7. **Review SIEM rules** quarterly
8. **Test SOAR playbooks** monthly
9. **Conduct DR tests** quarterly (tabletop) and annually (full exercise)
10. **Review compliance assessments** semi-annually
