import { z } from 'zod';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 1 — Global Cloud Infrastructure
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapCloudProviderType {
  AWS = 'AWS',
  AZURE = 'AZURE',
  GCP = 'GCP',
  ORACLE = 'ORACLE',
  PRIVATE = 'PRIVATE',
  ON_PREMISE = 'ON_PREMISE',
  HYBRID = 'HYBRID',
}

export enum GecirapCloudAccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  CREDENTIALS_EXPIRED = 'CREDENTIALS_EXPIRED',
}

export enum GecirapResourceType {
  VM = 'VM',
  CONTAINER = 'CONTAINER',
  DATABASE = 'DATABASE',
  STORAGE = 'STORAGE',
  NETWORK = 'NETWORK',
  LOAD_BALANCER = 'LOAD_BALANCER',
  CDN = 'CDN',
  DNS = 'DNS',
  FIREWALL = 'FIREWALL',
  CACHE = 'CACHE',
  QUEUE = 'QUEUE',
  SERVERLESS = 'SERVERLESS',
}

export enum GecirapResourceStatus {
  PROVISIONING = 'PROVISIONING',
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  TERMINATED = 'TERMINATED',
  ERROR = 'ERROR',
  SUSPENDED = 'SUSPENDED',
  MIGRATING = 'MIGRATING',
  UPDATING = 'UPDATING',
  DELETING = 'DELETING',
}

export enum GecirapEnvironmentType {
  PRODUCTION = 'PRODUCTION',
  STAGING = 'STAGING',
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  DR = 'DR',
  QA = 'QA',
}

export enum GecirapDeploymentStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ROLLED_BACK = 'ROLLED_BACK',
  CANCELLED = 'CANCELLED',
}

export enum GecirapCloudHealthStatus {
  HEALTHY = 'HEALTHY',
  DEGRADED = 'DEGRADED',
  UNHEALTHY = 'UNHEALTHY',
  UNKNOWN = 'UNKNOWN',
}

export interface GecirapCloudProvider {
  id: string;
  schoolId: string;
  name: string;
  type: GecirapCloudProviderType;
  enabled: boolean;
  config: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapCloudAccount {
  id: string;
  schoolId: string;
  providerId: string;
  name: string;
  accountId: string;
  status: GecirapCloudAccountStatus;
  credentials: Record<string, unknown>;
  regions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapCloudRegion {
  id: string;
  schoolId: string;
  accountId: string;
  name: string;
  provider: GecirapCloudProviderType;
  location: string;
  lat: number;
  lng: number;
  status: GecirapCloudHealthStatus;
  zones: string[];
  services: string[];
  createdAt: Date;
}

export interface GecirapCloudResource {
  id: string;
  schoolId: string;
  accountId: string;
  regionId: string;
  name: string;
  type: GecirapResourceType;
  status: GecirapResourceStatus;
  tags: Record<string, string>;
  config: Record<string, unknown>;
  cost: number;
  health: GecirapCloudHealthStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapCloudEnvironment {
  id: string;
  schoolId: string;
  name: string;
  type: GecirapEnvironmentType;
  providerId: string;
  regionIds: string[];
  status: GecirapDeploymentStatus;
  config: Record<string, unknown>;
  createdAt: Date;
}

export interface GecirapCloudDeployment {
  id: string;
  schoolId: string;
  environmentId: string;
  name: string;
  strategy: string;
  status: GecirapDeploymentStatus;
  resources: string[];
  createdAt: Date;
  completedAt: Date | null;
}

export interface GecirapCloudQuota {
  id: string;
  schoolId: string;
  regionId: string;
  resource: string;
  limit: number;
  used: number;
  unit: string;
  updatedAt: Date;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 2 — Multi-Region & Geo-Distribution
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapRegionTopology {
  ACTIVE_ACTIVE = 'ACTIVE_ACTIVE',
  ACTIVE_PASSIVE = 'ACTIVE_PASSIVE',
  SPINE_LEAF = 'SPINE_LEAF',
  STAR = 'STAR',
  MESH = 'MESH',
  HUB_SPOKE = 'HUB_SPOKE',
}

export enum GecirapFailoverMode {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
  SEMI_AUTOMATIC = 'SEMI_AUTOMATIC',
}

export enum GecirapGeoRoutingStrategy {
  ROUND_ROBIN = 'ROUND_ROBIN',
  LATENCY_BASED = 'LATENCY_BASED',
  GEOGRAPHIC = 'GEOGRAPHIC',
  WEIGHTED = 'WEIGHTED',
  FAILOVER = 'FAILOVER',
  LEAST_CONNECTIONS = 'LEAST_CONNECTIONS',
}

export enum GecirapReplicationMode {
  SYNCHRONOUS = 'SYNCHRONOUS',
  ASYNCHRONOUS = 'ASYNCHRONOUS',
  SEMI_SYNC = 'SEMI_SYNC',
}

export enum GecirapTrafficStatus {
  ACTIVE = 'ACTIVE',
  THROTTLED = 'THROTTLED',
  DIVERGED = 'DIVERGED',
  FAILOVER = 'FAILOVER',
  MAINTENANCE = 'MAINTENANCE',
}

export interface GecirapGeoRegion {
  id: string;
  schoolId: string;
  name: string;
  provider: GecirapCloudProviderType;
  location: string;
  lat: number;
  lng: number;
  status: GecirapCloudHealthStatus;
  topology: GecirapRegionTopology;
  capacity: number;
  createdAt: Date;
}

export interface GecirapRegionPolicy {
  id: string;
  schoolId: string;
  name: string;
  primaryRegionId: string;
  secondaryRegionIds: string[];
  failoverMode: GecirapFailoverMode;
  replicationMode: GecirapReplicationMode;
  rto: number;
  rpo: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapRegionHealth {
  id: string;
  schoolId: string;
  regionId: string;
  status: GecirapCloudHealthStatus;
  latency: number;
  availability: number;
  throughput: number;
  errors: number;
  lastCheckedAt: Date;
}

export interface GecirapFailoverPolicy {
  id: string;
  schoolId: string;
  name: string;
  sourceRegionId: string;
  targetRegionId: string;
  trigger: string;
  conditions: Record<string, unknown>;
  enabled: boolean;
  createdAt: Date;
}

export interface GecirapTrafficRoute {
  id: string;
  schoolId: string;
  name: string;
  strategy: GecirapGeoRoutingStrategy;
  routes: Array<{ regionId: string; weight: number }>;
  weight: number;
  healthCheck: Record<string, unknown>;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapRegionalDeployment {
  id: string;
  schoolId: string;
  regionId: string;
  deploymentId: string;
  status: GecirapDeploymentStatus;
  replicationLag: number;
  lastSyncedAt: Date | null;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 3 — Container & Workload Orchestration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapClusterStatus {
  PROVISIONING = 'PROVISIONING',
  RUNNING = 'RUNNING',
  SCALING = 'SCALING',
  UPDATING = 'UPDATING',
  DEGRADED = 'DEGRADED',
  TERMINATED = 'TERMINATED',
  ERROR = 'ERROR',
}

export enum GecirapWorkloadType {
  DEPLOYMENT = 'DEPLOYMENT',
  STATEFULSET = 'STATEFULSET',
  DAEMONSET = 'DAEMONSET',
  JOB = 'JOB',
  CRONJOB = 'CRONJOB',
  REPLICASET = 'REPLICASET',
}

export enum GecirapDeploymentStrategy {
  ROLLING_UPDATE = 'ROLLING_UPDATE',
  RECREATE = 'RECREATE',
  BLUE_GREEN = 'BLUE_GREEN',
  CANARY = 'CANARY',
}

export enum GecirapWorkloadHealthStatus {
  HEALTHY = 'HEALTHY',
  DEGRADED = 'DEGRADED',
  UNHEALTHY = 'UNHEALTHY',
  UNKNOWN = 'UNKNOWN',
}

export enum GecirapContainerStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CRASH_LOOP = 'CRASH_LOOP',
  TERMINATED = 'TERMINATED',
}

export interface GecirapCluster {
  id: string;
  schoolId: string;
  name: string;
  provider: GecirapCloudProviderType;
  region: string;
  status: GecirapClusterStatus;
  nodeCount: number;
  capacity: Record<string, number>;
  config: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapNode {
  id: string;
  schoolId: string;
  clusterId: string;
  name: string;
  status: GecirapClusterStatus;
  cpu: { total: number; used: number };
  memory: { total: number; used: number };
  disk: { total: number; used: number };
  gpu: { total: number; used: number } | null;
  labels: Record<string, string>;
  createdAt: Date;
}

export interface GecirapNodePool {
  id: string;
  schoolId: string;
  clusterId: string;
  name: string;
  minSize: number;
  maxSize: number;
  instanceType: string;
  status: GecirapClusterStatus;
  createdAt: Date;
}

export interface GecirapNamespace {
  id: string;
  schoolId: string;
  clusterId: string;
  name: string;
  labels: Record<string, string>;
  quotas: Record<string, number>;
  createdAt: Date;
}

export interface GecirapWorkload {
  id: string;
  schoolId: string;
  namespaceId: string;
  name: string;
  type: GecirapWorkloadType;
  replicas: number;
  strategy: GecirapDeploymentStrategy;
  status: GecirapDeploymentStatus;
  containers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapContainer {
  id: string;
  schoolId: string;
  workloadId: string;
  name: string;
  image: string;
  status: GecirapContainerStatus;
  resources: { cpu: string; memory: string };
  env: Record<string, string>;
  createdAt: Date;
}

export interface GecirapService {
  id: string;
  schoolId: string;
  namespaceId: string;
  name: string;
  type: string;
  ports: Array<{ name: string; port: number; targetPort: number; protocol: string }>;
  selector: Record<string, string>;
  createdAt: Date;
}

export interface GecirapIngress {
  id: string;
  schoolId: string;
  namespaceId: string;
  name: string;
  host: string;
  paths: Array<{ path: string; pathType: string; backend: Record<string, unknown> }>;
  tls: Array<{ hosts: string[]; secretName: string }>;
  createdAt: Date;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 4 — Infrastructure as Code
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapIaCProvider {
  TERRAFORM = 'TERRAFORM',
  PULUMI = 'PULUMI',
  CLOUDFORMATION = 'CLOUDFORMATION',
  BICEP = 'BICEP',
  CDK = 'CDK',
  CROSSPLANE = 'CROSSPLANE',
}

export enum GecirapStackStatus {
  PENDING = 'PENDING',
  PLANNING = 'PLANNING',
  APPLYING = 'APPLYING',
  APPLIED = 'APPLIED',
  DESTROYING = 'DESTROYING',
  DRIFTED = 'DRIFTED',
  FAILED = 'FAILED',
  LOCKED = 'LOCKED',
}

export enum GecirapChangeType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  REPLACE = 'REPLACE',
  NO_CHANGE = 'NO_CHANGE',
}

export enum GecirapDriftStatus {
  IN_SYNC = 'IN_SYNC',
  DRIFTED = 'DRIFTED',
  UNKNOWN = 'UNKNOWN',
}

export enum GecirapApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export interface GecirapInfrastructureTemplate {
  id: string;
  schoolId: string;
  name: string;
  provider: GecirapIaCProvider;
  content: string;
  version: string;
  variables: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapInfrastructureStack {
  id: string;
  schoolId: string;
  templateId: string;
  name: string;
  environment: GecirapEnvironmentType;
  status: GecirapStackStatus;
  variables: Record<string, unknown>;
  state: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapProvisioningJob {
  id: string;
  schoolId: string;
  stackId: string;
  action: string;
  status: GecirapStackStatus;
  plan: Record<string, unknown>;
  changes: GecirapResourceChange[];
  startedAt: Date;
  completedAt: Date | null;
  error: string | null;
}

export interface GecirapResourceChange {
  id: string;
  schoolId: string;
  stackId: string;
  resource: string;
  type: string;
  changeType: GecirapChangeType;
  before: Record<string, unknown>;
  after: Record<string, unknown>;
  status: GecirapApprovalStatus;
}

export interface GecirapDriftDetection {
  id: string;
  schoolId: string;
  stackId: string;
  status: GecirapDriftStatus;
  drifts: Array<{ resource: string; expected: unknown; actual: unknown }>;
  lastCheckedAt: Date;
  createdAt: Date;
}

export interface GecirapInfrastructurePolicy {
  id: string;
  schoolId: string;
  name: string;
  rules: Array<{ type: string; params: Record<string, unknown> }>;
  enforced: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 5 — Autoscaling & Capacity Intelligence
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapScalingTrigger {
  CPU = 'CPU',
  MEMORY = 'MEMORY',
  NETWORK = 'NETWORK',
  CUSTOM_METRIC = 'CUSTOM_METRIC',
  SCHEDULE = 'SCHEDULE',
  QUEUE_DEPTH = 'QUEUE_DEPTH',
  PREDICTIVE = 'PREDICTIVE',
}

export enum GecirapScalingDirection {
  UP = 'UP',
  DOWN = 'DOWN',
  OUT = 'OUT',
  IN = 'IN',
}

export enum GecirapForecastModel {
  LINEAR = 'LINEAR',
  POLYNOMIAL = 'POLYNOMIAL',
  ARIMA = 'ARIMA',
  LSTM = 'LSTM',
  PROPHET = 'PROPHET',
}

export enum GecirapCapacityStatus {
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  OVER_PROVISIONED = 'OVER_PROVISIONED',
}

export enum GecirapAlertLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export interface GecirapScalingPolicy {
  id: string;
  schoolId: string;
  name: string;
  resourceType: GecirapResourceType;
  resourceId: string;
  trigger: GecirapScalingTrigger;
  minSize: number;
  maxSize: number;
  cooldown: number;
  conditions: Array<{ metric: string; operator: string; threshold: number }>;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapScalingEvent {
  id: string;
  schoolId: string;
  policyId: string;
  direction: GecirapScalingDirection;
  from: number;
  to: number;
  reason: string;
  timestamp: Date;
  duration: number;
}

export interface GecirapCapacityForecast {
  id: string;
  schoolId: string;
  resourceType: GecirapResourceType;
  resourceId: string;
  metric: string;
  forecast: Array<{ date: Date; value: number }>;
  model: GecirapForecastModel;
  confidence: number;
  period: number;
  createdAt: Date;
}

export interface GecirapCapacityPlan {
  id: string;
  schoolId: string;
  name: string;
  resources: string[];
  forecasts: string[];
  recommendations: Array<{ action: string; priority: number; savings: number }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapResourceUtilization {
  id: string;
  schoolId: string;
  resourceId: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  timestamp: Date;
}

export interface GecirapCapacityAlert {
  id: string;
  schoolId: string;
  resourceType: GecirapResourceType;
  level: GecirapAlertLevel;
  message: string;
  utilization: number;
  threshold: number;
  createdAt: Date;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 6 — Disaster Recovery 2.0
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapRecoveryStatus {
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  PARTIAL = 'PARTIAL',
}

export enum GecirapRecoveryType {
  BACKUP_RESTORE = 'BACKUP_RESTORE',
  SNAPSHOT = 'SNAPSHOT',
  REPLICATION = 'REPLICATION',
  PILOT_LIGHT = 'PILOT_LIGHT',
  WARM_STANDBY = 'WARM_STANDBY',
  MULTI_SITE = 'MULTI_SITE',
}

export enum GecirapTestStatus {
  SCHEDULED = 'SCHEDULED',
  RUNNING = 'RUNNING',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum GecirapDependencyType {
  DATABASE = 'DATABASE',
  STORAGE = 'STORAGE',
  NETWORK = 'NETWORK',
  SERVICE = 'SERVICE',
  CONFIG = 'CONFIG',
  CREDENTIAL = 'CREDENTIAL',
}

export interface GecirapDisasterRecoveryPlan {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: GecirapRecoveryStatus;
  strategies: string[];
  rtoObjective: number;
  rpoObjective: number;
  lastTestedAt: Date | null;
  nextTestAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapRecoveryStrategy {
  id: string;
  schoolId: string;
  planId: string;
  name: string;
  type: GecirapRecoveryType;
  priority: number;
  steps: Array<{ order: number; action: string; params: Record<string, unknown> }>;
  automated: boolean;
  createdAt: Date;
}

export interface GecirapRecoveryExecution {
  id: string;
  schoolId: string;
  planId: string;
  strategyId: string;
  status: GecirapRecoveryStatus;
  startedAt: Date;
  completedAt: Date | null;
  duration: number | null;
  steps: Array<{ name: string; status: GecirapRecoveryStatus; duration: number | null }>;
  error: string | null;
}

export interface GecirapRecoveryTest {
  id: string;
  schoolId: string;
  planId: string;
  status: GecirapTestStatus;
  startedAt: Date;
  completedAt: Date | null;
  duration: number | null;
  results: Array<{ metric: string; expected: number; actual: number; passed: boolean }>;
  passed: boolean;
  issues: string[];
  createdAt: Date;
}

export interface GecirapRecoveryDependency {
  id: string;
  schoolId: string;
  serviceId: string;
  dependsOn: string[];
  dependencyType: GecirapDependencyType;
  restoreOrder: number;
  timeout: number;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 7 — Multi-Cloud Orchestration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapPlacementCriteria {
  COST = 'COST',
  LATENCY = 'LATENCY',
  COMPLIANCE = 'COMPLIANCE',
  CAPACITY = 'CAPACITY',
  AVAILABILITY = 'AVAILABILITY',
  DATA_RESIDENCY = 'DATA_RESIDENCY',
}

export enum GecirapMigrationStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ROLLED_BACK = 'ROLLED_BACK',
}

export enum GecirapCloudBalanceStatus {
  BALANCED = 'BALANCED',
  UNBALANCED = 'UNBALANCED',
  OPTIMIZING = 'OPTIMIZING',
}

export interface GecirapCloudPlacementDecision {
  id: string;
  schoolId: string;
  workloadId: string;
  selectedCloud: GecirapCloudProviderType;
  selectedRegion: string;
  score: number;
  criteria: Record<string, number>;
  alternatives: Array<{ cloud: GecirapCloudProviderType; region: string; score: number }>;
  createdAt: Date;
}

export interface GecirapCloudMigration {
  id: string;
  schoolId: string;
  sourceCloud: GecirapCloudProviderType;
  targetCloud: GecirapCloudProviderType;
  resources: string[];
  status: GecirapMigrationStatus;
  startedAt: Date | null;
  completedAt: Date | null;
  error: string | null;
}

export interface GecirapCloudBalance {
  id: string;
  schoolId: string;
  name: string;
  strategy: string;
  targets: Array<{ cloud: GecirapCloudProviderType; weight: number; current: number }>;
  status: GecirapCloudBalanceStatus;
  lastBalancedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapProviderCapability {
  id: string;
  schoolId: string;
  providerId: string;
  service: string;
  region: string;
  available: boolean;
  costPerHour: number;
  latency: number;
  compliance: string[];
  createdAt: Date;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 8 — Edge Computing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapEdgeNodeType {
  GATEWAY = 'GATEWAY',
  SERVER = 'SERVER',
  RASPBERRY = 'RASPBERRY',
  MICRO_DC = 'MICRO_DC',
  IOT_HUB = 'IOT_HUB',
}

export enum GecirapEdgeStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  DEGRADED = 'DEGRADED',
  MAINTENANCE = 'MAINTENANCE',
}

export enum GecirapSyncStatus {
  SYNCED = 'SYNCED',
  SYNCING = 'SYNCING',
  CONFLICT = 'CONFLICT',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

export enum GecirapOfflineCapability {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  NONE = 'NONE',
}

export interface GecirapEdgeNode {
  id: string;
  schoolId: string;
  name: string;
  type: GecirapEdgeNodeType;
  location: string;
  status: GecirapEdgeStatus;
  capacity: Record<string, number>;
  syncStatus: GecirapSyncStatus;
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapEdgeCluster {
  id: string;
  schoolId: string;
  name: string;
  nodes: string[];
  status: GecirapEdgeStatus;
  config: Record<string, unknown>;
  createdAt: Date;
}

export interface GecirapEdgeDeployment {
  id: string;
  schoolId: string;
  edgeNodeId: string;
  name: string;
  status: GecirapDeploymentStatus;
  image: string;
  config: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapEdgeSyncJob {
  id: string;
  schoolId: string;
  edgeNodeId: string;
  type: string;
  status: GecirapSyncStatus;
  startedAt: Date;
  completedAt: Date | null;
  itemsSynced: number;
  conflictsResolved: number;
  error: string | null;
}

export interface GecirapEdgeCache {
  id: string;
  schoolId: string;
  edgeNodeId: string;
  key: string;
  value: unknown;
  ttl: number;
  expiresAt: Date;
  size: number;
}

export interface GecirapEdgePolicy {
  id: string;
  schoolId: string;
  name: string;
  syncFrequency: number;
  offlineCap: GecirapOfflineCapability;
  cacheSize: number;
  priority: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapOfflinePackage {
  id: string;
  schoolId: string;
  name: string;
  content: Record<string, unknown>;
  version: string;
  size: number;
  checksum: string;
  createdAt: Date;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 9 — Network & CDN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapNetworkType {
  VPC = 'VPC',
  SUBNET = 'SUBNET',
  VPN = 'VPN',
  PEERING = 'PEERING',
  DIRECT_CONNECT = 'DIRECT_CONNECT',
}

export enum GecirapLoadBalancerAlgorithm {
  ROUND_ROBIN = 'ROUND_ROBIN',
  LEAST_CONNECTIONS = 'LEAST_CONNECTIONS',
  IP_HASH = 'IP_HASH',
  LEAST_RESPONSE_TIME = 'LEAST_RESPONSE_TIME',
  WEIGHTED = 'WEIGHTED',
}

export enum GecirapCDNStatus {
  ACTIVE = 'ACTIVE',
  PURGING = 'PURGING',
  INVALIDATING = 'INVALIDATING',
  ERROR = 'ERROR',
}

export enum GecirapTrafficAnomalyType {
  SPIKE = 'SPIKE',
  DROP = 'DROP',
  PLATEAU = 'PLATEAU',
  FLUCTUATION = 'FLUCTUATION',
  UNUSUAL_PATTERN = 'UNUSUAL_PATTERN',
}

export interface GecirapNetwork {
  id: string;
  schoolId: string;
  name: string;
  type: GecirapNetworkType;
  cidr: string;
  status: GecirapCloudHealthStatus;
  routes: string[];
  createdAt: Date;
}

export interface GecirapNetworkRoute {
  id: string;
  schoolId: string;
  networkId: string;
  destination: string;
  target: string;
  metric: number;
  status: GecirapCloudHealthStatus;
  createdAt: Date;
}

export interface GecirapLoadBalancer {
  id: string;
  schoolId: string;
  name: string;
  algorithm: GecirapLoadBalancerAlgorithm;
  backends: Array<{ address: string; port: number; weight: number }>;
  healthCheck: Record<string, unknown>;
  status: GecirapCloudHealthStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapCDNDistribution {
  id: string;
  schoolId: string;
  name: string;
  provider: string;
  origins: Array<{ domain: string; path: string }>;
  cacheRules: Array<{ pattern: string; ttl: number; type: string }>;
  status: GecirapCDNStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapDNSRecord {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  value: string;
  ttl: number;
  status: GecirapCloudHealthStatus;
  createdAt: Date;
}

export interface GecirapNetworkHealth {
  id: string;
  schoolId: string;
  networkId: string;
  status: GecirapCloudHealthStatus;
  latency: number;
  packetLoss: number;
  bandwidth: number;
  timestamp: Date;
}

export interface GecirapTrafficMetric {
  id: string;
  schoolId: string;
  networkId: string;
  requests: number;
  bytesIn: number;
  bytesOut: number;
  errors: number;
  latency: number;
  timestamp: Date;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 10 — AIOps
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapAIOpsAgentType {
  MONITORING = 'MONITORING',
  ANOMALY = 'ANOMALY',
  CORRELATION = 'CORRELATION',
  ROOT_CAUSE = 'ROOT_CAUSE',
  REMEDIATION = 'REMEDIATION',
  PREDICTIVE = 'PREDICTIVE',
}

export enum GecirapIncidentStatus {
  OPEN = 'OPEN',
  INVESTIGATING = 'INVESTIGATING',
  IDENTIFIED = 'IDENTIFIED',
  MONITORING = 'MONITORING',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum GecirapDiagnosisType {
  PERFORMANCE = 'PERFORMANCE',
  AVAILABILITY = 'AVAILABILITY',
  SECURITY = 'SECURITY',
  COST = 'COST',
  COMPLIANCE = 'COMPLIANCE',
}

export enum GecirapRemediationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  EXECUTING = 'EXECUTING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ROLLED_BACK = 'ROLLED_BACK',
}

export enum GecirapActionRisk {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface GecirapAIOpsAgent {
  id: string;
  schoolId: string;
  type: GecirapAIOpsAgentType;
  name: string;
  status: string;
  capabilities: string[];
  config: Record<string, unknown>;
  lastActiveAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapInfrastructureEvent {
  id: string;
  schoolId: string;
  source: string;
  type: string;
  severity: GecirapAlertLevel;
  message: string;
  metadata: Record<string, unknown>;
  correlated: string[];
  timestamp: Date;
}

export interface GecirapIncidentCorrelation {
  id: string;
  schoolId: string;
  events: string[];
  pattern: string;
  confidence: number;
  rootCause: string | null;
  impact: Record<string, unknown>;
  createdAt: Date;
}

export interface GecirapRootCauseAnalysis {
  id: string;
  schoolId: string;
  incidentId: string;
  findings: Array<{ category: string; description: string; confidence: number }>;
  confidence: number;
  evidence: string[];
  recommendations: string[];
  createdAt: Date;
}

export interface GecirapRecommendation {
  id: string;
  schoolId: string;
  agentId: string;
  type: GecirapDiagnosisType;
  title: string;
  description: string;
  impact: string;
  risk: GecirapActionRisk;
  autoExecutable: boolean;
  createdAt: Date;
  expiresAt: Date;
}

export interface GecirapAutomatedAction {
  id: string;
  schoolId: string;
  recommendationId: string;
  action: string;
  parameters: Record<string, unknown>;
  risk: GecirapActionRisk;
  status: GecirapRemediationStatus;
  approvedBy: string | null;
  executedAt: Date | null;
  result: Record<string, unknown> | null;
}

export interface GecirapRemediationPlan {
  id: string;
  schoolId: string;
  name: string;
  steps: Array<{ order: number; action: string; params: Record<string, unknown> }>;
  status: GecirapRemediationStatus;
  createdBy: string;
  approvedBy: string | null;
  createdAt: Date;
  completedAt: Date | null;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 11 — FinOps
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapCostPeriod {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

export enum GecirapBudgetStatus {
  ON_TRACK = 'ON_TRACK',
  AT_RISK = 'AT_RISK',
  EXCEEDED = 'EXCEEDED',
  FORECAST_EXCEED = 'FORECAST_EXCEED',
}

export enum GecirapAnomalyType {
  COST_SPIKE = 'COST_SPIKE',
  COST_DROP = 'COST_DROP',
  USAGE_SPIKE = 'USAGE_SPIKE',
  USAGE_DROP = 'USAGE_DROP',
  NEW_SERVICE = 'NEW_SERVICE',
  UNUSUAL_PATTERN = 'UNUSUAL_PATTERN',
}

export enum GecirapOptimizationType {
  RIGHTSIZING = 'RIGHTSIZING',
  RESERVED_CAPACITY = 'RESERVED_CAPACITY',
  SPOT_INSTANCES = 'SPOT_INSTANCES',
  STORAGE_TIERING = 'STORAGE_TIERING',
  NETWORK_OPTIMIZATION = 'NETWORK_OPTIMIZATION',
  IDLE_RESOURCE = 'IDLE_RESOURCE',
}

export enum GecirapCommitmentType {
  ON_DEMAND = 'ON_DEMAND',
  RESERVED_1Y = 'RESERVED_1Y',
  RESERVED_3Y = 'RESERVED_3Y',
  SPOT = 'SPOT',
  SAVINGS_PLAN = 'SAVINGS_PLAN',
}

export interface GecirapCloudCost {
  id: string;
  schoolId: string;
  providerId: string;
  accountId: string;
  service: string;
  region: string;
  amount: number;
  currency: string;
  period: GecirapCostPeriod;
  tags: Record<string, string>;
  createdAt: Date;
}

export interface GecirapCostAllocation {
  id: string;
  schoolId: string;
  costId: string;
  school: string;
  module: string;
  department: string;
  percentage: number;
  amount: number;
}

export interface GecirapCostCenter {
  id: string;
  schoolId: string;
  name: string;
  budget: number;
  spent: number;
  forecast: number;
  status: GecirapBudgetStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapBudget {
  id: string;
  schoolId: string;
  name: string;
  amount: number;
  period: GecirapCostPeriod;
  spent: number;
  forecast: number;
  alertThreshold: number;
  status: GecirapBudgetStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapCostForecast {
  id: string;
  schoolId: string;
  service: string;
  forecast: Array<{ date: Date; amount: number }>;
  model: GecirapForecastModel;
  confidence: number;
  period: GecirapCostPeriod;
  createdAt: Date;
}

export interface GecirapCostAnomaly {
  id: string;
  schoolId: string;
  service: string;
  amount: number;
  expectedAmount: number;
  deviation: number;
  type: GecirapAnomalyType;
  severity: GecirapAlertLevel;
  detectedAt: Date;
  acknowledged: boolean;
}

export interface GecirapOptimizationRecommendation {
  id: string;
  schoolId: string;
  type: GecirapOptimizationType;
  service: string;
  currentCost: number;
  optimizedCost: number;
  savings: number;
  effort: string;
  risk: GecirapActionRisk;
  implemented: boolean;
  createdAt: Date;
}

export interface GecirapReservedCapacity {
  id: string;
  schoolId: string;
  providerId: string;
  service: string;
  type: GecirapCommitmentType;
  quantity: number;
  term: number;
  utilization: number;
  cost: number;
  savings: number;
  expiresAt: Date;
  createdAt: Date;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE 12 — Infrastructure Digital Twin
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export enum GecirapTwinType {
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  NETWORK = 'NETWORK',
  APPLICATION = 'APPLICATION',
  DATA_FLOW = 'DATA_FLOW',
  SECURITY = 'SECURITY',
  FULL_STACK = 'FULL_STACK',
}

export enum GecirapTwinStatus {
  SYNCED = 'SYNCED',
  SYNCING = 'SYNCING',
  STALE = 'STALE',
  ERROR = 'ERROR',
  CREATING = 'CREATING',
}

export enum GecirapSimulationType {
  CAPACITY = 'CAPACITY',
  FAILURE = 'FAILURE',
  SCALING = 'SCALING',
  MIGRATION = 'MIGRATION',
  COST = 'COST',
  PERFORMANCE = 'PERFORMANCE',
}

export enum GecirapTwinScenarioStatus {
  DRAFT = 'DRAFT',
  VALIDATED = 'VALIDATED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface GecirapInfrastructureTwin {
  id: string;
  schoolId: string;
  name: string;
  type: GecirapTwinType;
  status: GecirapTwinStatus;
  config: Record<string, unknown>;
  state: Record<string, unknown>;
  lastSyncedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapTwinSimulation {
  id: string;
  schoolId: string;
  twinId: string;
  type: GecirapSimulationType;
  name: string;
  parameters: Record<string, unknown>;
  status: GecirapTwinScenarioStatus;
  results: Record<string, unknown> | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
}

export interface GecirapTwinScenario {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  description: string;
  assumptions: Record<string, unknown>;
  expectedImpact: Record<string, unknown>;
  status: GecirapTwinScenarioStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GecirapTwinResult {
  id: string;
  schoolId: string;
  simulationId: string;
  scenarioId: string;
  impact: Record<string, unknown>;
  cost: number;
  availability: number;
  risks: Array<{ type: string; severity: GecirapAlertLevel; description: string }>;
  recommendations: string[];
  timestamp: Date;
}

export interface GecirapTwinSync {
  id: string;
  schoolId: string;
  twinId: string;
  source: string;
  status: GecirapSyncStatus;
  lastSyncedAt: Date | null;
  itemsSynced: number;
  error: string | null;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 1: Global Cloud Infrastructure
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapCloudProviderSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  type: z.nativeEnum(GecirapCloudProviderType),
  enabled: z.boolean().default(true),
  config: z.record(z.unknown()).default({}),
});
export const updateGecirapCloudProviderSchema = createGecirapCloudProviderSchema.partial();

export const createGecirapCloudAccountSchema = z.object({
  schoolId: z.string().uuid(),
  providerId: z.string().uuid(),
  name: z.string().min(1).max(128),
  accountId: z.string().min(1),
  status: z.nativeEnum(GecirapCloudAccountStatus).default(GecirapCloudAccountStatus.PENDING),
  credentials: z.record(z.unknown()),
  regions: z.array(z.string()).default([]),
});
export const updateGecirapCloudAccountSchema = createGecirapCloudAccountSchema.partial();

export const createGecirapCloudRegionSchema = z.object({
  schoolId: z.string().uuid(),
  accountId: z.string().uuid(),
  name: z.string().min(1).max(128),
  provider: z.nativeEnum(GecirapCloudProviderType),
  location: z.string().min(1),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  status: z.nativeEnum(GecirapCloudHealthStatus).default(GecirapCloudHealthStatus.UNKNOWN),
  zones: z.array(z.string()).default([]),
  services: z.array(z.string()).default([]),
});
export const updateGecirapCloudRegionSchema = createGecirapCloudRegionSchema.partial();

export const createGecirapCloudResourceSchema = z.object({
  schoolId: z.string().uuid(),
  accountId: z.string().uuid(),
  regionId: z.string().uuid(),
  name: z.string().min(1).max(128),
  type: z.nativeEnum(GecirapResourceType),
  status: z.nativeEnum(GecirapResourceStatus).default(GecirapResourceStatus.PROVISIONING),
  tags: z.record(z.string()).default({}),
  config: z.record(z.unknown()).default({}),
  cost: z.number().min(0).default(0),
  health: z.nativeEnum(GecirapCloudHealthStatus).default(GecirapCloudHealthStatus.UNKNOWN),
});
export const updateGecirapCloudResourceSchema = createGecirapCloudResourceSchema.partial();

export const createGecirapCloudEnvironmentSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  type: z.nativeEnum(GecirapEnvironmentType),
  providerId: z.string().uuid(),
  regionIds: z.array(z.string().uuid()).min(1),
  status: z.nativeEnum(GecirapDeploymentStatus).default(GecirapDeploymentStatus.PENDING),
  config: z.record(z.unknown()).default({}),
});
export const updateGecirapCloudEnvironmentSchema = createGecirapCloudEnvironmentSchema.partial();

export const createGecirapCloudDeploymentSchema = z.object({
  schoolId: z.string().uuid(),
  environmentId: z.string().uuid(),
  name: z.string().min(1).max(128),
  strategy: z.string().min(1),
  status: z.nativeEnum(GecirapDeploymentStatus).default(GecirapDeploymentStatus.PENDING),
  resources: z.array(z.string()).default([]),
});
export const updateGecirapCloudDeploymentSchema = createGecirapCloudDeploymentSchema.partial();

export const createGecirapCloudQuotaSchema = z.object({
  schoolId: z.string().uuid(),
  regionId: z.string().uuid(),
  resource: z.string().min(1),
  limit: z.number().int().min(1),
  used: z.number().int().min(0).default(0),
  unit: z.string().min(1),
});
export const updateGecirapCloudQuotaSchema = createGecirapCloudQuotaSchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 2: Multi-Region & Geo-Distribution
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapGeoRegionSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  provider: z.nativeEnum(GecirapCloudProviderType),
  location: z.string().min(1),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  status: z.nativeEnum(GecirapCloudHealthStatus).default(GecirapCloudHealthStatus.UNKNOWN),
  topology: z.nativeEnum(GecirapRegionTopology),
  capacity: z.number().int().min(0),
});
export const updateGecirapGeoRegionSchema = createGecirapGeoRegionSchema.partial();

export const createGecirapRegionPolicySchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  primaryRegionId: z.string().uuid(),
  secondaryRegionIds: z.array(z.string().uuid()).default([]),
  failoverMode: z.nativeEnum(GecirapFailoverMode),
  replicationMode: z.nativeEnum(GecirapReplicationMode),
  rto: z.number().int().min(0),
  rpo: z.number().int().min(0),
  enabled: z.boolean().default(true),
});
export const updateGecirapRegionPolicySchema = createGecirapRegionPolicySchema.partial();

export const createGecirapRegionHealthSchema = z.object({
  schoolId: z.string().uuid(),
  regionId: z.string().uuid(),
  status: z.nativeEnum(GecirapCloudHealthStatus),
  latency: z.number().min(0),
  availability: z.number().min(0).max(100),
  throughput: z.number().min(0),
  errors: z.number().int().min(0),
});
export const updateGecirapRegionHealthSchema = createGecirapRegionHealthSchema.partial();

export const createGecirapFailoverPolicySchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  sourceRegionId: z.string().uuid(),
  targetRegionId: z.string().uuid(),
  trigger: z.string().min(1),
  conditions: z.record(z.unknown()).default({}),
  enabled: z.boolean().default(true),
});
export const updateGecirapFailoverPolicySchema = createGecirapFailoverPolicySchema.partial();

export const createGecirapTrafficRouteSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  strategy: z.nativeEnum(GecirapGeoRoutingStrategy),
  routes: z.array(z.object({ regionId: z.string().uuid(), weight: z.number().int().min(0) })).min(1),
  weight: z.number().int().min(0).default(100),
  healthCheck: z.record(z.unknown()).default({}),
  enabled: z.boolean().default(true),
});
export const updateGecirapTrafficRouteSchema = createGecirapTrafficRouteSchema.partial();

export const createGecirapRegionalDeploymentSchema = z.object({
  schoolId: z.string().uuid(),
  regionId: z.string().uuid(),
  deploymentId: z.string().uuid(),
  status: z.nativeEnum(GecirapDeploymentStatus).default(GecirapDeploymentStatus.PENDING),
  replicationLag: z.number().min(0).default(0),
});
export const updateGecirapRegionalDeploymentSchema = createGecirapRegionalDeploymentSchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 3: Container & Workload Orchestration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapClusterSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  provider: z.nativeEnum(GecirapCloudProviderType),
  region: z.string().min(1),
  status: z.nativeEnum(GecirapClusterStatus).default(GecirapClusterStatus.PROVISIONING),
  nodeCount: z.number().int().min(0).default(0),
  capacity: z.record(z.number()).default({}),
  config: z.record(z.unknown()).default({}),
});
export const updateGecirapClusterSchema = createGecirapClusterSchema.partial();

export const createGecirapNodeSchema = z.object({
  schoolId: z.string().uuid(),
  clusterId: z.string().uuid(),
  name: z.string().min(1).max(128),
  status: z.nativeEnum(GecirapClusterStatus).default(GecirapClusterStatus.PROVISIONING),
  cpu: z.object({ total: z.number().min(0), used: z.number().min(0) }),
  memory: z.object({ total: z.number().min(0), used: z.number().min(0) }),
  disk: z.object({ total: z.number().min(0), used: z.number().min(0) }),
  gpu: z.object({ total: z.number().int().min(0), used: z.number().int().min(0) }).nullable().default(null),
  labels: z.record(z.string()).default({}),
});
export const updateGecirapNodeSchema = createGecirapNodeSchema.partial();

export const createGecirapNodePoolSchema = z.object({
  schoolId: z.string().uuid(),
  clusterId: z.string().uuid(),
  name: z.string().min(1).max(128),
  minSize: z.number().int().min(0),
  maxSize: z.number().int().min(1),
  instanceType: z.string().min(1),
  status: z.nativeEnum(GecirapClusterStatus).default(GecirapClusterStatus.PROVISIONING),
});
export const updateGecirapNodePoolSchema = createGecirapNodePoolSchema.partial();

export const createGecirapNamespaceSchema = z.object({
  schoolId: z.string().uuid(),
  clusterId: z.string().uuid(),
  name: z.string().min(1).max(128),
  labels: z.record(z.string()).default({}),
  quotas: z.record(z.number().int().min(0)).default({}),
});
export const updateGecirapNamespaceSchema = createGecirapNamespaceSchema.partial();

export const createGecirapWorkloadSchema = z.object({
  schoolId: z.string().uuid(),
  namespaceId: z.string().uuid(),
  name: z.string().min(1).max(128),
  type: z.nativeEnum(GecirapWorkloadType),
  replicas: z.number().int().min(0).default(1),
  strategy: z.nativeEnum(GecirapDeploymentStrategy).default(GecirapDeploymentStrategy.ROLLING_UPDATE),
  status: z.nativeEnum(GecirapDeploymentStatus).default(GecirapDeploymentStatus.PENDING),
  containers: z.array(z.string()).default([]),
});
export const updateGecirapWorkloadSchema = createGecirapWorkloadSchema.partial();

export const createGecirapContainerSchema = z.object({
  schoolId: z.string().uuid(),
  workloadId: z.string().uuid(),
  name: z.string().min(1).max(128),
  image: z.string().min(1),
  status: z.nativeEnum(GecirapContainerStatus).default(GecirapContainerStatus.PENDING),
  resources: z.object({ cpu: z.string(), memory: z.string() }),
  env: z.record(z.string()).default({}),
});
export const updateGecirapContainerSchema = createGecirapContainerSchema.partial();

export const createGecirapServiceSchema = z.object({
  schoolId: z.string().uuid(),
  namespaceId: z.string().uuid(),
  name: z.string().min(1).max(128),
  type: z.string().min(1),
  ports: z.array(z.object({
    name: z.string(),
    port: z.number().int().min(1).max(65535),
    targetPort: z.number().int().min(1).max(65535),
    protocol: z.string(),
  })).min(1),
  selector: z.record(z.string()).default({}),
});
export const updateGecirapServiceSchema = createGecirapServiceSchema.partial();

export const createGecirapIngressSchema = z.object({
  schoolId: z.string().uuid(),
  namespaceId: z.string().uuid(),
  name: z.string().min(1).max(128),
  host: z.string().min(1),
  paths: z.array(z.object({
    path: z.string(),
    pathType: z.string(),
    backend: z.record(z.unknown()),
  })).min(1),
  tls: z.array(z.object({ hosts: z.array(z.string()), secretName: z.string() })).default([]),
});
export const updateGecirapIngressSchema = createGecirapIngressSchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 4: Infrastructure as Code
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapInfrastructureTemplateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  provider: z.nativeEnum(GecirapIaCProvider),
  content: z.string().min(1),
  version: z.string().min(1),
  variables: z.record(z.unknown()).default({}),
});
export const updateGecirapInfrastructureTemplateSchema = createGecirapInfrastructureTemplateSchema.partial();

export const createGecirapInfrastructureStackSchema = z.object({
  schoolId: z.string().uuid(),
  templateId: z.string().uuid(),
  name: z.string().min(1).max(128),
  environment: z.nativeEnum(GecirapEnvironmentType),
  status: z.nativeEnum(GecirapStackStatus).default(GecirapStackStatus.PENDING),
  variables: z.record(z.unknown()).default({}),
  state: z.record(z.unknown()).default({}),
});
export const updateGecirapInfrastructureStackSchema = createGecirapInfrastructureStackSchema.partial();

export const createGecirapProvisioningJobSchema = z.object({
  schoolId: z.string().uuid(),
  stackId: z.string().uuid(),
  action: z.string().min(1),
  status: z.nativeEnum(GecirapStackStatus).default(GecirapStackStatus.PENDING),
  plan: z.record(z.unknown()).default({}),
  changes: z.array(z.string()).default([]),
});
export const updateGecirapProvisioningJobSchema = createGecirapProvisioningJobSchema.partial();

export const createGecirapResourceChangeSchema = z.object({
  schoolId: z.string().uuid(),
  stackId: z.string().uuid(),
  resource: z.string().min(1),
  type: z.string().min(1),
  changeType: z.nativeEnum(GecirapChangeType),
  before: z.record(z.unknown()).default({}),
  after: z.record(z.unknown()).default({}),
  status: z.nativeEnum(GecirapApprovalStatus).default(GecirapApprovalStatus.PENDING),
});
export const updateGecirapResourceChangeSchema = createGecirapResourceChangeSchema.partial();

export const createGecirapDriftDetectionSchema = z.object({
  schoolId: z.string().uuid(),
  stackId: z.string().uuid(),
  status: z.nativeEnum(GecirapDriftStatus).default(GecirapDriftStatus.UNKNOWN),
  drifts: z.array(z.object({ resource: z.string(), expected: z.unknown(), actual: z.unknown() })).default([]),
});
export const updateGecirapDriftDetectionSchema = createGecirapDriftDetectionSchema.partial();

export const createGecirapInfrastructurePolicySchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  rules: z.array(z.object({ type: z.string(), params: z.record(z.unknown()) })).min(1),
  enforced: z.boolean().default(true),
});
export const updateGecirapInfrastructurePolicySchema = createGecirapInfrastructurePolicySchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 5: Autoscaling & Capacity Intelligence
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapScalingPolicySchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  resourceType: z.nativeEnum(GecirapResourceType),
  resourceId: z.string().uuid(),
  trigger: z.nativeEnum(GecirapScalingTrigger),
  minSize: z.number().int().min(0),
  maxSize: z.number().int().min(1),
  cooldown: z.number().int().min(0),
  conditions: z.array(z.object({ metric: z.string(), operator: z.string(), threshold: z.number() })).min(1),
  enabled: z.boolean().default(true),
});
export const updateGecirapScalingPolicySchema = createGecirapScalingPolicySchema.partial();

export const createGecirapScalingEventSchema = z.object({
  schoolId: z.string().uuid(),
  policyId: z.string().uuid(),
  direction: z.nativeEnum(GecirapScalingDirection),
  from: z.number().int().min(0),
  to: z.number().int().min(0),
  reason: z.string().min(1),
  duration: z.number().int().min(0),
});
export const updateGecirapScalingEventSchema = createGecirapScalingEventSchema.partial();

export const createGecirapCapacityForecastSchema = z.object({
  schoolId: z.string().uuid(),
  resourceType: z.nativeEnum(GecirapResourceType),
  resourceId: z.string().uuid(),
  metric: z.string().min(1),
  forecast: z.array(z.object({ date: z.date(), value: z.number() })).min(1),
  model: z.nativeEnum(GecirapForecastModel),
  confidence: z.number().min(0).max(1),
  period: z.number().int().min(1),
});
export const updateGecirapCapacityForecastSchema = createGecirapCapacityForecastSchema.partial();

export const createGecirapCapacityPlanSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  resources: z.array(z.string().uuid()).min(1),
  forecasts: z.array(z.string().uuid()).default([]),
  recommendations: z.array(z.object({
    action: z.string(),
    priority: z.number().int().min(0),
    savings: z.number().min(0),
  })).default([]),
});
export const updateGecirapCapacityPlanSchema = createGecirapCapacityPlanSchema.partial();

export const createGecirapResourceUtilizationSchema = z.object({
  schoolId: z.string().uuid(),
  resourceId: z.string().uuid(),
  cpu: z.number().min(0).max(100),
  memory: z.number().min(0).max(100),
  disk: z.number().min(0).max(100),
  network: z.number().min(0).max(100),
});
export const updateGecirapResourceUtilizationSchema = createGecirapResourceUtilizationSchema.partial();

export const createGecirapCapacityAlertSchema = z.object({
  schoolId: z.string().uuid(),
  resourceType: z.nativeEnum(GecirapResourceType),
  level: z.nativeEnum(GecirapAlertLevel),
  message: z.string().min(1),
  utilization: z.number().min(0).max(100),
  threshold: z.number().min(0).max(100),
});
export const updateGecirapCapacityAlertSchema = createGecirapCapacityAlertSchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 6: Disaster Recovery 2.0
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapDisasterRecoveryPlanSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  description: z.string().min(1),
  status: z.nativeEnum(GecirapRecoveryStatus).default(GecirapRecoveryStatus.READY),
  strategies: z.array(z.string().uuid()).default([]),
  rtoObjective: z.number().int().min(0),
  rpoObjective: z.number().int().min(0),
});
export const updateGecirapDisasterRecoveryPlanSchema = createGecirapDisasterRecoveryPlanSchema.partial();

export const createGecirapRecoveryStrategySchema = z.object({
  schoolId: z.string().uuid(),
  planId: z.string().uuid(),
  name: z.string().min(1).max(128),
  type: z.nativeEnum(GecirapRecoveryType),
  priority: z.number().int().min(0),
  steps: z.array(z.object({
    order: z.number().int().min(0),
    action: z.string().min(1),
    params: z.record(z.unknown()),
  })).min(1),
  automated: z.boolean().default(false),
});
export const updateGecirapRecoveryStrategySchema = createGecirapRecoveryStrategySchema.partial();

export const createGecirapRecoveryExecutionSchema = z.object({
  schoolId: z.string().uuid(),
  planId: z.string().uuid(),
  strategyId: z.string().uuid(),
  status: z.nativeEnum(GecirapRecoveryStatus).default(GecirapRecoveryStatus.IN_PROGRESS),
});
export const updateGecirapRecoveryExecutionSchema = createGecirapRecoveryExecutionSchema.partial();

export const createGecirapRecoveryTestSchema = z.object({
  schoolId: z.string().uuid(),
  planId: z.string().uuid(),
  status: z.nativeEnum(GecirapTestStatus).default(GecirapTestStatus.SCHEDULED),
});
export const updateGecirapRecoveryTestSchema = createGecirapRecoveryTestSchema.partial();

export const createGecirapRecoveryDependencySchema = z.object({
  schoolId: z.string().uuid(),
  serviceId: z.string().uuid(),
  dependsOn: z.array(z.string().uuid()).default([]),
  dependencyType: z.nativeEnum(GecirapDependencyType),
  restoreOrder: z.number().int().min(0),
  timeout: z.number().int().min(0),
});
export const updateGecirapRecoveryDependencySchema = createGecirapRecoveryDependencySchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 7: Multi-Cloud Orchestration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapCloudPlacementDecisionSchema = z.object({
  schoolId: z.string().uuid(),
  workloadId: z.string().uuid(),
  selectedCloud: z.nativeEnum(GecirapCloudProviderType),
  selectedRegion: z.string().min(1),
  score: z.number().min(0).max(100),
  criteria: z.record(z.number().min(0).max(100)).default({}),
  alternatives: z.array(z.object({
    cloud: z.nativeEnum(GecirapCloudProviderType),
    region: z.string(),
    score: z.number().min(0).max(100),
  })).default([]),
});
export const updateGecirapCloudPlacementDecisionSchema = createGecirapCloudPlacementDecisionSchema.partial();

export const createGecirapCloudMigrationSchema = z.object({
  schoolId: z.string().uuid(),
  sourceCloud: z.nativeEnum(GecirapCloudProviderType),
  targetCloud: z.nativeEnum(GecirapCloudProviderType),
  resources: z.array(z.string().uuid()).min(1),
  status: z.nativeEnum(GecirapMigrationStatus).default(GecirapMigrationStatus.PLANNING),
});
export const updateGecirapCloudMigrationSchema = createGecirapCloudMigrationSchema.partial();

export const createGecirapCloudBalanceSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  strategy: z.string().min(1),
  targets: z.array(z.object({
    cloud: z.nativeEnum(GecirapCloudProviderType),
    weight: z.number().int().min(0),
    current: z.number().min(0),
  })).min(1),
  status: z.nativeEnum(GecirapCloudBalanceStatus).default(GecirapCloudBalanceStatus.UNBALANCED),
});
export const updateGecirapCloudBalanceSchema = createGecirapCloudBalanceSchema.partial();

export const createGecirapProviderCapabilitySchema = z.object({
  schoolId: z.string().uuid(),
  providerId: z.string().uuid(),
  service: z.string().min(1),
  region: z.string().min(1),
  available: z.boolean().default(true),
  costPerHour: z.number().min(0),
  latency: z.number().min(0),
  compliance: z.array(z.string()).default([]),
});
export const updateGecirapProviderCapabilitySchema = createGecirapProviderCapabilitySchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 8: Edge Computing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapEdgeNodeSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  type: z.nativeEnum(GecirapEdgeNodeType),
  location: z.string().min(1),
  status: z.nativeEnum(GecirapEdgeStatus).default(GecirapEdgeStatus.OFFLINE),
  capacity: z.record(z.number()).default({}),
  syncStatus: z.nativeEnum(GecirapSyncStatus).default(GecirapSyncStatus.PENDING),
});
export const updateGecirapEdgeNodeSchema = createGecirapEdgeNodeSchema.partial();

export const createGecirapEdgeClusterSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  nodes: z.array(z.string().uuid()).min(1),
  status: z.nativeEnum(GecirapEdgeStatus).default(GecirapEdgeStatus.OFFLINE),
  config: z.record(z.unknown()).default({}),
});
export const updateGecirapEdgeClusterSchema = createGecirapEdgeClusterSchema.partial();

export const createGecirapEdgeDeploymentSchema = z.object({
  schoolId: z.string().uuid(),
  edgeNodeId: z.string().uuid(),
  name: z.string().min(1).max(128),
  status: z.nativeEnum(GecirapDeploymentStatus).default(GecirapDeploymentStatus.PENDING),
  image: z.string().min(1),
  config: z.record(z.unknown()).default({}),
});
export const updateGecirapEdgeDeploymentSchema = createGecirapEdgeDeploymentSchema.partial();

export const createGecirapEdgeSyncJobSchema = z.object({
  schoolId: z.string().uuid(),
  edgeNodeId: z.string().uuid(),
  type: z.string().min(1),
  status: z.nativeEnum(GecirapSyncStatus).default(GecirapSyncStatus.PENDING),
  itemsSynced: z.number().int().min(0).default(0),
  conflictsResolved: z.number().int().min(0).default(0),
});
export const updateGecirapEdgeSyncJobSchema = createGecirapEdgeSyncJobSchema.partial();

export const createGecirapEdgeCacheSchema = z.object({
  schoolId: z.string().uuid(),
  edgeNodeId: z.string().uuid(),
  key: z.string().min(1),
  value: z.unknown(),
  ttl: z.number().int().min(0),
  size: z.number().int().min(0),
});
export const updateGecirapEdgeCacheSchema = createGecirapEdgeCacheSchema.partial();

export const createGecirapEdgePolicySchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  syncFrequency: z.number().int().min(0),
  offlineCap: z.nativeEnum(GecirapOfflineCapability),
  cacheSize: z.number().int().min(0),
  priority: z.number().int().min(0),
  enabled: z.boolean().default(true),
});
export const updateGecirapEdgePolicySchema = createGecirapEdgePolicySchema.partial();

export const createGecirapOfflinePackageSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  content: z.record(z.unknown()),
  version: z.string().min(1),
  size: z.number().int().min(0),
  checksum: z.string().min(1),
});
export const updateGecirapOfflinePackageSchema = createGecirapOfflinePackageSchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 9: Network & CDN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapNetworkSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  type: z.nativeEnum(GecirapNetworkType),
  cidr: z.string().min(1),
  status: z.nativeEnum(GecirapCloudHealthStatus).default(GecirapCloudHealthStatus.UNKNOWN),
  routes: z.array(z.string().uuid()).default([]),
});
export const updateGecirapNetworkSchema = createGecirapNetworkSchema.partial();

export const createGecirapNetworkRouteSchema = z.object({
  schoolId: z.string().uuid(),
  networkId: z.string().uuid(),
  destination: z.string().min(1),
  target: z.string().min(1),
  metric: z.number().int().min(0),
  status: z.nativeEnum(GecirapCloudHealthStatus).default(GecirapCloudHealthStatus.UNKNOWN),
});
export const updateGecirapNetworkRouteSchema = createGecirapNetworkRouteSchema.partial();

export const createGecirapLoadBalancerSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  algorithm: z.nativeEnum(GecirapLoadBalancerAlgorithm),
  backends: z.array(z.object({
    address: z.string().min(1),
    port: z.number().int().min(1).max(65535),
    weight: z.number().int().min(0),
  })).min(1),
  healthCheck: z.record(z.unknown()).default({}),
  status: z.nativeEnum(GecirapCloudHealthStatus).default(GecirapCloudHealthStatus.UNKNOWN),
});
export const updateGecirapLoadBalancerSchema = createGecirapLoadBalancerSchema.partial();

export const createGecirapCDNDistributionSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  provider: z.string().min(1),
  origins: z.array(z.object({ domain: z.string(), path: z.string() })).min(1),
  cacheRules: z.array(z.object({ pattern: z.string(), ttl: z.number().int().min(0), type: z.string() })).default([]),
  status: z.nativeEnum(GecirapCDNStatus).default(GecirapCDNStatus.ACTIVE),
});
export const updateGecirapCDNDistributionSchema = createGecirapCDNDistributionSchema.partial();

export const createGecirapDNSRecordSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1),
  type: z.string().min(1),
  value: z.string().min(1),
  ttl: z.number().int().min(0).default(3600),
  status: z.nativeEnum(GecirapCloudHealthStatus).default(GecirapCloudHealthStatus.UNKNOWN),
});
export const updateGecirapDNSRecordSchema = createGecirapDNSRecordSchema.partial();

export const createGecirapNetworkHealthSchema = z.object({
  schoolId: z.string().uuid(),
  networkId: z.string().uuid(),
  status: z.nativeEnum(GecirapCloudHealthStatus),
  latency: z.number().min(0),
  packetLoss: z.number().min(0).max(100),
  bandwidth: z.number().min(0),
});
export const updateGecirapNetworkHealthSchema = createGecirapNetworkHealthSchema.partial();

export const createGecirapTrafficMetricSchema = z.object({
  schoolId: z.string().uuid(),
  networkId: z.string().uuid(),
  requests: z.number().int().min(0),
  bytesIn: z.number().int().min(0),
  bytesOut: z.number().int().min(0),
  errors: z.number().int().min(0),
  latency: z.number().min(0),
});
export const updateGecirapTrafficMetricSchema = createGecirapTrafficMetricSchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 10: AIOps
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapAIOpsAgentSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GecirapAIOpsAgentType),
  name: z.string().min(1).max(128),
  status: z.string().min(1).default('inactive'),
  capabilities: z.array(z.string()).default([]),
  config: z.record(z.unknown()).default({}),
});
export const updateGecirapAIOpsAgentSchema = createGecirapAIOpsAgentSchema.partial();

export const createGecirapInfrastructureEventSchema = z.object({
  schoolId: z.string().uuid(),
  source: z.string().min(1),
  type: z.string().min(1),
  severity: z.nativeEnum(GecirapAlertLevel),
  message: z.string().min(1),
  metadata: z.record(z.unknown()).default({}),
  correlated: z.array(z.string().uuid()).default([]),
});
export const updateGecirapInfrastructureEventSchema = createGecirapInfrastructureEventSchema.partial();

export const createGecirapIncidentCorrelationSchema = z.object({
  schoolId: z.string().uuid(),
  events: z.array(z.string().uuid()).min(1),
  pattern: z.string().min(1),
  confidence: z.number().min(0).max(1),
  rootCause: z.string().nullable().default(null),
  impact: z.record(z.unknown()).default({}),
});
export const updateGecirapIncidentCorrelationSchema = createGecirapIncidentCorrelationSchema.partial();

export const createGecirapRootCauseAnalysisSchema = z.object({
  schoolId: z.string().uuid(),
  incidentId: z.string().uuid(),
  findings: z.array(z.object({
    category: z.string(),
    description: z.string(),
    confidence: z.number().min(0).max(1),
  })).min(1),
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
});
export const updateGecirapRootCauseAnalysisSchema = createGecirapRootCauseAnalysisSchema.partial();

export const createGecirapRecommendationSchema = z.object({
  schoolId: z.string().uuid(),
  agentId: z.string().uuid(),
  type: z.nativeEnum(GecirapDiagnosisType),
  title: z.string().min(1).max(128),
  description: z.string().min(1),
  impact: z.string().min(1),
  risk: z.nativeEnum(GecirapActionRisk),
  autoExecutable: z.boolean().default(false),
});
export const updateGecirapRecommendationSchema = createGecirapRecommendationSchema.partial();

export const createGecirapAutomatedActionSchema = z.object({
  schoolId: z.string().uuid(),
  recommendationId: z.string().uuid(),
  action: z.string().min(1),
  parameters: z.record(z.unknown()).default({}),
  risk: z.nativeEnum(GecirapActionRisk),
  status: z.nativeEnum(GecirapRemediationStatus).default(GecirapRemediationStatus.PENDING),
});
export const updateGecirapAutomatedActionSchema = createGecirapAutomatedActionSchema.partial();

export const createGecirapRemediationPlanSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  steps: z.array(z.object({
    order: z.number().int().min(0),
    action: z.string().min(1),
    params: z.record(z.unknown()),
  })).min(1),
  status: z.nativeEnum(GecirapRemediationStatus).default(GecirapRemediationStatus.PENDING),
  createdBy: z.string().uuid(),
});
export const updateGecirapRemediationPlanSchema = createGecirapRemediationPlanSchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 11: FinOps
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapCloudCostSchema = z.object({
  schoolId: z.string().uuid(),
  providerId: z.string().uuid(),
  accountId: z.string().uuid(),
  service: z.string().min(1),
  region: z.string().min(1),
  amount: z.number().min(0),
  currency: z.string().min(1).max(3),
  period: z.nativeEnum(GecirapCostPeriod),
  tags: z.record(z.string()).default({}),
});
export const updateGecirapCloudCostSchema = createGecirapCloudCostSchema.partial();

export const createGecirapCostAllocationSchema = z.object({
  schoolId: z.string().uuid(),
  costId: z.string().uuid(),
  school: z.string().min(1),
  module: z.string().min(1),
  department: z.string().min(1),
  percentage: z.number().min(0).max(100),
  amount: z.number().min(0),
});
export const updateGecirapCostAllocationSchema = createGecirapCostAllocationSchema.partial();

export const createGecirapCostCenterSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  budget: z.number().min(0),
  spent: z.number().min(0).default(0),
  forecast: z.number().min(0).default(0),
  status: z.nativeEnum(GecirapBudgetStatus).default(GecirapBudgetStatus.ON_TRACK),
});
export const updateGecirapCostCenterSchema = createGecirapCostCenterSchema.partial();

export const createGecirapBudgetSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  amount: z.number().min(0),
  period: z.nativeEnum(GecirapCostPeriod),
  spent: z.number().min(0).default(0),
  forecast: z.number().min(0).default(0),
  alertThreshold: z.number().min(0).max(100).default(80),
  status: z.nativeEnum(GecirapBudgetStatus).default(GecirapBudgetStatus.ON_TRACK),
});
export const updateGecirapBudgetSchema = createGecirapBudgetSchema.partial();

export const createGecirapCostForecastSchema = z.object({
  schoolId: z.string().uuid(),
  service: z.string().min(1),
  forecast: z.array(z.object({ date: z.date(), amount: z.number().min(0) })).min(1),
  model: z.nativeEnum(GecirapForecastModel),
  confidence: z.number().min(0).max(1),
  period: z.nativeEnum(GecirapCostPeriod),
});
export const updateGecirapCostForecastSchema = createGecirapCostForecastSchema.partial();

export const createGecirapCostAnomalySchema = z.object({
  schoolId: z.string().uuid(),
  service: z.string().min(1),
  amount: z.number().min(0),
  expectedAmount: z.number().min(0),
  deviation: z.number(),
  type: z.nativeEnum(GecirapAnomalyType),
  severity: z.nativeEnum(GecirapAlertLevel),
});
export const updateGecirapCostAnomalySchema = createGecirapCostAnomalySchema.partial();

export const createGecirapOptimizationRecommendationSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GecirapOptimizationType),
  service: z.string().min(1),
  currentCost: z.number().min(0),
  optimizedCost: z.number().min(0),
  savings: z.number().min(0),
  effort: z.string().min(1),
  risk: z.nativeEnum(GecirapActionRisk),
  implemented: z.boolean().default(false),
});
export const updateGecirapOptimizationRecommendationSchema = createGecirapOptimizationRecommendationSchema.partial();

export const createGecirapReservedCapacitySchema = z.object({
  schoolId: z.string().uuid(),
  providerId: z.string().uuid(),
  service: z.string().min(1),
  type: z.nativeEnum(GecirapCommitmentType),
  quantity: z.number().int().min(1),
  term: z.number().int().min(1),
  utilization: z.number().min(0).max(100).default(0),
  cost: z.number().min(0),
  savings: z.number().min(0).default(0),
  expiresAt: z.date(),
});
export const updateGecirapReservedCapacitySchema = createGecirapReservedCapacitySchema.partial();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ZOD SCHEMAS — Module 12: Infrastructure Digital Twin
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const createGecirapInfrastructureTwinSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  type: z.nativeEnum(GecirapTwinType),
  status: z.nativeEnum(GecirapTwinStatus).default(GecirapTwinStatus.CREATING),
  config: z.record(z.unknown()).default({}),
  state: z.record(z.unknown()).default({}),
});
export const updateGecirapInfrastructureTwinSchema = createGecirapInfrastructureTwinSchema.partial();

export const createGecirapTwinSimulationSchema = z.object({
  schoolId: z.string().uuid(),
  twinId: z.string().uuid(),
  type: z.nativeEnum(GecirapSimulationType),
  name: z.string().min(1).max(128),
  parameters: z.record(z.unknown()).default({}),
  status: z.nativeEnum(GecirapTwinScenarioStatus).default(GecirapTwinScenarioStatus.DRAFT),
});
export const updateGecirapTwinSimulationSchema = createGecirapTwinSimulationSchema.partial();

export const createGecirapTwinScenarioSchema = z.object({
  schoolId: z.string().uuid(),
  twinId: z.string().uuid(),
  name: z.string().min(1).max(128),
  description: z.string().min(1),
  assumptions: z.record(z.unknown()).default({}),
  expectedImpact: z.record(z.unknown()).default({}),
  status: z.nativeEnum(GecirapTwinScenarioStatus).default(GecirapTwinScenarioStatus.DRAFT),
});
export const updateGecirapTwinScenarioSchema = createGecirapTwinScenarioSchema.partial();

export const createGecirapTwinResultSchema = z.object({
  schoolId: z.string().uuid(),
  simulationId: z.string().uuid(),
  scenarioId: z.string().uuid(),
  impact: z.record(z.unknown()).default({}),
  cost: z.number().min(0),
  availability: z.number().min(0).max(100),
  risks: z.array(z.object({
    type: z.string(),
    severity: z.nativeEnum(GecirapAlertLevel),
    description: z.string(),
  })).default([]),
  recommendations: z.array(z.string()).default([]),
});
export const updateGecirapTwinResultSchema = createGecirapTwinResultSchema.partial();

export const createGecirapTwinSyncSchema = z.object({
  schoolId: z.string().uuid(),
  twinId: z.string().uuid(),
  source: z.string().min(1),
  status: z.nativeEnum(GecirapSyncStatus).default(GecirapSyncStatus.PENDING),
  itemsSynced: z.number().int().min(0).default(0),
});
export const updateGecirapTwinSyncSchema = createGecirapTwinSyncSchema.partial();
