// ==================== AUTOMATION ENUMS ====================

export const AutomationStatus = {
  draft: 'draft',
  active: 'active',
  paused: 'paused',
  failed: 'failed',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;
export type AutomationStatus = (typeof AutomationStatus)[keyof typeof AutomationStatus];

export const AutomationTriggerType = {
  manual: 'manual',
  schedule: 'schedule',
  event: 'event',
  webhook: 'webhook',
  condition: 'condition',
  recurring: 'recurring',
} as const;
export type AutomationTriggerType = (typeof AutomationTriggerType)[keyof typeof AutomationTriggerType];

export const AutomationActionType = {
  http_request: 'http_request',
  send_email: 'send_email',
  send_sms: 'send_sms',
  update_record: 'update_record',
  create_record: 'create_record',
  delete_record: 'delete_record',
  transform_data: 'transform_data',
  call_webhook: 'call_webhook',
  run_script: 'run_script',
  wait: 'wait',
  branch: 'branch',
  loop: 'loop',
  parallel: 'parallel',
  approval: 'approval',
  ai_action: 'ai_action',
} as const;
export type AutomationActionType = (typeof AutomationActionType)[keyof typeof AutomationActionType];

export const WorkflowStatus = {
  draft: 'draft',
  published: 'published',
  archived: 'archived',
  running: 'running',
  paused: 'paused',
  failed: 'failed',
  completed: 'completed',
} as const;
export type WorkflowStatus = (typeof WorkflowStatus)[keyof typeof WorkflowStatus];

export const WorkflowStepType = {
  action: 'action',
  condition: 'condition',
  delay: 'delay',
  approval: 'approval',
  parallel: 'parallel',
  loop: 'loop',
  branch: 'branch',
  transform: 'transform',
  notification: 'notification',
} as const;
export type WorkflowStepType = (typeof WorkflowStepType)[keyof typeof WorkflowStepType];

export const WorkflowTriggerType = {
  manual: 'manual',
  schedule: 'schedule',
  event: 'event',
  api_call: 'api_call',
  database_change: 'database_change',
} as const;
export type WorkflowTriggerType = (typeof WorkflowTriggerType)[keyof typeof WorkflowTriggerType];

export const ApprovalStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
  escalated: 'escalated',
  expired: 'expired',
} as const;
export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

export const ApprovalChannel = {
  email: 'email',
  sms: 'sms',
  push: 'push',
  in_app: 'in_app',
  slack: 'slack',
  teams: 'teams',
} as const;
export type ApprovalChannel = (typeof ApprovalChannel)[keyof typeof ApprovalChannel];

export const ConnectorCategory = {
  crm: 'crm',
  erp: 'erp',
  communication: 'communication',
  storage: 'storage',
  payment: 'payment',
  ai: 'ai',
  analytics: 'analytics',
  devops: 'devops',
  hr: 'hr',
  education: 'education',
  social: 'social',
  messaging: 'messaging',
} as const;
export type ConnectorCategory = (typeof ConnectorCategory)[keyof typeof ConnectorCategory];

export const ConnectorStatus = {
  active: 'active',
  inactive: 'inactive',
  deprecated: 'deprecated',
  beta: 'beta',
  maintenance: 'maintenance',
} as const;
export type ConnectorStatus = (typeof ConnectorStatus)[keyof typeof ConnectorStatus];

export const ConnectorAuthType = {
  oauth2: 'oauth2',
  api_key: 'api_key',
  basic: 'basic',
  token: 'token',
  webhook: 'webhook',
  none: 'none',
} as const;
export type ConnectorAuthType = (typeof ConnectorAuthType)[keyof typeof ConnectorAuthType];

export const TemplateStatus = {
  draft: 'draft',
  published: 'published',
  archived: 'archived',
  community: 'community',
} as const;
export type TemplateStatus = (typeof TemplateStatus)[keyof typeof TemplateStatus];

// ==================== AUTOMATION INTERFACES ====================

export interface Automation {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: AutomationStatus;
  triggerType: AutomationTriggerType;
  triggerConfig: Record<string, unknown>;
  steps: AutomationStep[];
  variables: Record<string, unknown>;
  tags: string[];
  version: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface AutomationStep {
  id: string;
  automationId: string;
  name: string;
  type: AutomationActionType;
  config: Record<string, unknown>;
  conditions: AutomationCondition[];
  onError: string;
  retryConfig: Record<string, unknown>;
  timeout: number;
  metadata: Record<string, unknown>;
}

export interface AutomationCondition {
  field: string;
  operator: string;
  value: unknown;
  logicalOperator: string;
  metadata: Record<string, unknown>;
}

export interface AutomationExecution {
  id: string;
  automationId: string;
  schoolId: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  status: AutomationStatus;
  currentStep: string;
  error: string;
  metadata: Record<string, unknown>;
  startedAt: string;
  completedAt: string;
  duration: number;
}

export interface AutomationLog {
  id: string;
  executionId: string;
  stepId: string;
  status: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  error: string;
  duration: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AutomationTemplate {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  category: string;
  triggerType: AutomationTriggerType;
  steps: AutomationStep[];
  variables: Record<string, unknown>;
  version: number;
  usageCount: number;
  rating: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AutomationSchedule {
  id: string;
  automationId: string;
  schoolId: string;
  cron: string;
  timezone: string;
  nextRunAt: string;
  lastRunAt: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AutomationVariable {
  id: string;
  automationId: string;
  name: string;
  type: string;
  defaultValue: unknown;
  required: boolean;
  description: string;
  metadata: Record<string, unknown>;
}

// ==================== WORKFLOW INTERFACES ====================

export interface Workflow {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  triggerType: WorkflowTriggerType;
  triggerConfig: Record<string, unknown>;
  steps: WorkflowStep[];
  variables: Record<string, unknown>;
  version: number;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface WorkflowStep {
  id: string;
  workflowId: string;
  name: string;
  type: WorkflowStepType;
  config: Record<string, unknown>;
  nextStepId: string;
  onError: string;
  conditions: AutomationCondition[];
  metadata: Record<string, unknown>;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  schoolId: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  status: WorkflowStatus;
  currentStepId: string;
  error: string;
  metadata: Record<string, unknown>;
  startedAt: string;
  completedAt: string;
}

export interface WorkflowVersion {
  id: string;
  workflowId: string;
  version: number;
  steps: WorkflowStep[];
  changelog: string;
  publishedAt: string;
  publishedBy: string;
  metadata: Record<string, unknown>;
}

export interface HumanApproval {
  id: string;
  workflowId: string;
  executionId: string;
  schoolId: string;
  stepId: string;
  approverId: string;
  approverIds: string[];
  status: ApprovalStatus;
  channel: ApprovalChannel;
  message: string;
  response: string;
  metadata: Record<string, unknown>;
  requestedAt: string;
  respondedAt: string;
  expiresAt: string;
}

// ==================== CONNECTOR INTERFACES ====================

export interface Connector {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  category: ConnectorCategory;
  provider: string;
  status: ConnectorStatus;
  version: string;
  authType: ConnectorAuthType;
  config: Record<string, unknown>;
  capabilities: string[];
  rateLimit: number;
  documentation: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectorConfig {
  id: string;
  connectorId: string;
  schoolId: string;
  credentials: Record<string, unknown>;
  settings: Record<string, unknown>;
  status: ConnectorStatus;
  lastValidatedAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectorMapping {
  id: string;
  connectorId: string;
  schoolId: string;
  sourceField: string;
  targetField: string;
  transform: string;
  defaultValue: unknown;
  required: boolean;
  metadata: Record<string, unknown>;
}

export interface ConnectorSync {
  id: string;
  connectorId: string;
  schoolId: string;
  entityType: string;
  direction: string;
  lastSyncAt: string;
  status: string;
  recordsProcessed: number;
  recordsFailed: number;
  error: string;
  metadata: Record<string, unknown>;
}

export interface ConnectorLog {
  id: string;
  connectorId: string;
  schoolId: string;
  action: string;
  status: string;
  request: Record<string, unknown>;
  response: Record<string, unknown>;
  duration: number;
  error: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ConnectorTemplate {
  id: string;
  name: string;
  description: string;
  category: ConnectorCategory;
  provider: string;
  authType: ConnectorAuthType;
  configTemplate: Record<string, unknown>;
  capabilities: string[];
  metadata: Record<string, unknown>;
}

// ==================== THIRD-PARTY CONNECTOR INTERFACES ====================

export interface GoogleWorkspaceConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  domain: string;
  serviceAccountKey: Record<string, unknown>;
  delegatedUser: string;
  scopes: string[];
  metadata: Record<string, unknown>;
}

export interface Microsoft365Connector {
  id: string;
  connectorId: string;
  schoolId: string;
  tenantId: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  metadata: Record<string, unknown>;
}

export interface ZoomConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  apiKey: string;
  apiSecret: string;
  webhookSecret: string;
  metadata: Record<string, unknown>;
}

export interface SlackConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  botToken: string;
  signingSecret: string;
  appId: string;
  metadata: Record<string, unknown>;
}

export interface TwilioConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  accountSid: string;
  authToken: string;
  phoneNumber: string;
  metadata: Record<string, unknown>;
}

export interface StripeConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  secretKey: string;
  publishableKey: string;
  webhookSecret: string;
  metadata: Record<string, unknown>;
}

export interface FirebaseConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  projectId: string;
  serviceAccountKey: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface SupabaseConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  metadata: Record<string, unknown>;
}

export interface AWSConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  services: string[];
  metadata: Record<string, unknown>;
}

export interface AzureConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  tenantId: string;
  subscriptionId: string;
  clientId: string;
  clientSecret: string;
  metadata: Record<string, unknown>;
}

export interface OpenAIConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  apiKey: string;
  organizationId: string;
  defaultModel: string;
  metadata: Record<string, unknown>;
}

export interface AnthropicConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  apiKey: string;
  defaultModel: string;
  metadata: Record<string, unknown>;
}

export interface GitHubConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  token: string;
  organization: string;
  metadata: Record<string, unknown>;
}

export interface LDAPConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  host: string;
  port: number;
  baseDn: string;
  bindDn: string;
  bindPassword: string;
  useSSL: boolean;
  metadata: Record<string, unknown>;
}

export interface SAMLSConnector {
  id: string;
  connectorId: string;
  schoolId: string;
  entityId: string;
  ssoUrl: string;
  certificate: string;
  metadata: Record<string, unknown>;
}

// ==================== CONNECTOR HEALTH & METRICS ====================

export interface ConnectorHealth {
  id: string;
  connectorId: string;
  schoolId: string;
  status: ConnectorStatus;
  responseTime: number;
  lastCheck: string;
  errorRate: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ConnectorMetrics {
  connectorId: string;
  schoolId: string;
  totalCalls: number;
  successRate: number;
  averageResponseTime: number;
  errorRate: number;
  period: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ConnectorEvent {
  id: string;
  connectorId: string;
  schoolId: string;
  eventType: string;
  payload: Record<string, unknown>;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ConnectorWebhook {
  id: string;
  connectorId: string;
  schoolId: string;
  url: string;
  secret: string;
  events: string[];
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ConnectorBatch {
  id: string;
  connectorId: string;
  schoolId: string;
  entityType: string;
  operation: string;
  records: Record<string, unknown>[];
  status: string;
  processedCount: number;
  failedCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

// ==================== CONNECTOR FIELD & TRANSFORMATION ====================

export interface ConnectorFieldMapping {
  id: string;
  connectorId: string;
  sourceField: string;
  targetField: string;
  type: string;
  required: boolean;
  transform: string;
  metadata: Record<string, unknown>;
}

export interface ConnectorTransformation {
  id: string;
  connectorId: string;
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  transformScript: string;
  metadata: Record<string, unknown>;
}

// ==================== CONNECTOR INFRASTRUCTURE ====================

export interface ConnectorCache {
  id: string;
  connectorId: string;
  key: string;
  value: unknown;
  expiresAt: string;
  createdAt: string;
}

export interface ConnectorRateLimit {
  id: string;
  connectorId: string;
  requestsPerMinute: number;
  requestsPerHour: number;
  burstLimit: number;
  currentUsage: number;
  resetsAt: string;
  metadata: Record<string, unknown>;
}

export interface ConnectorRetryConfig {
  id: string;
  connectorId: string;
  maxRetries: number;
  backoffType: string;
  initialDelay: number;
  maxDelay: number;
  metadata: Record<string, unknown>;
}

export interface ConnectorVersion {
  id: string;
  connectorId: string;
  version: string;
  changelog: string;
  breakingChanges: boolean;
  metadata: Record<string, unknown>;
  releasedAt: string;
}
