export enum AgentRegistryStatus {
  REGISTERED = 'REGISTERED',
  UNREGISTERED = 'UNREGISTERED',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR',
  MAINTENANCE = 'MAINTENANCE'
}

export enum AgentDiscoveryProtocol {
  BROADCAST = 'BROADCAST',
  MULTICAST = 'MULTICAST',
  UNICAST = 'UNICAST',
  GOSSIP = 'GOSSIP',
  DHT = 'DHT',
  DNS = 'DNS',
  REGISTRY = 'REGISTRY',
  HEARTBEAT = 'HEARTBEAT',
  BEACON = 'BEACON',
  PING = 'PING'
}

export enum AgentMessageType {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
  NOTIFICATION = 'NOTIFICATION',
  BROADCAST = 'BROADCAST',
  PING = 'PING',
  PONG = 'PONG',
  HEARTBEAT = 'HEARTBEAT',
  ACK = 'ACK',
  NACK = 'NACK',
  ERROR = 'ERROR',
  PROBE = 'PROBE',
  DISCOVERY = 'DISCOVERY',
  REGISTRATION = 'REGISTRATION',
  DEREGISTRATION = 'DEREGISTRATION',
  STATUS = 'STATUS',
  COMMAND = 'COMMAND',
  QUERY = 'QUERY',
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
  PUBLISH = 'PUBLISH'
}

export enum AgentCollaborationMode {
  SEQUENTIAL = 'SEQUENTIAL',
  PARALLEL = 'PARALLEL',
  PIPELINE = 'PIPELINE',
  CHOREOGRAPHY = 'CHOREOGRAPHY',
  ORCHESTRATION = 'ORCHESTRATION',
  HIERARCHICAL = 'HIERARCHICAL',
  PEER_TO_PEER = 'PEER_TO_PEER',
  HUB_AND_SPOKE = 'HUB_AND_SPOKE',
  RING = 'RING',
  MESH = 'MESH',
  STAR = 'STAR',
  TREE = 'TREE',
  DAG = 'DAG',
  HYBRID = 'HYBRID',
  ADAPTIVE = 'ADAPTIVE',
  DYNAMIC = 'DYNAMIC'
}

export enum AgentDelegationType {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  TEMPORARY = 'TEMPORARY',
  CONDITIONAL = 'CONDITIONAL',
  ESCALATION = 'ESCALATION',
  FALLBACK = 'FALLBACK',
  PROXY = 'PROXY',
  CHAIN = 'CHAIN',
  PARALLEL = 'PARALLEL',
  SEQUENTIAL = 'SEQUENTIAL'
}

export enum AgentNegotiationStatus {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  AGREED = 'AGREED',
  DISAGREED = 'DISAGREED',
  TIMED_OUT = 'TIMED_OUT',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  REVISION = 'REVISION',
  ACCEPTED = 'ACCEPTED'
}

export enum AgentVoteType {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  ABSTAIN = 'ABSTAIN',
  DEFER = 'DEFER',
  CONDITIONAL = 'CONDITIONAL',
  PRIORITY = 'PRIORITY',
  WEIGHTED = 'WEIGHTED',
  RANKED = 'RANKED',
  APPROVAL = 'APPROVAL',
  VETO = 'VETO'
}

export enum AgentConsensusAlgorithm {
  MAJORITY = 'MAJORITY',
  UNANIMOUS = 'UNANIMOUS',
  SUPERMAJORITY = 'SUPERMAJORITY',
  WEIGHTED = 'WEIGHTED',
  BFT = 'BFT',
  RAFT = 'RAFT',
  PBFT = 'PBFT',
  GOSSIP = 'GOSSIP',
  PUSH_SUM = 'PUSH_SUM',
  LEADER_ELECTION = 'LEADER_ELECTION'
}

export enum AgentConflictType {
  RESOURCE = 'RESOURCE',
  GOAL = 'GOAL',
  PRIORITY = 'PRIORITY',
  SCHEDULE = 'SCHEDULE',
  DATA = 'DATA',
  BEHAVIOR = 'BEHAVIOR',
  CONFIGURATION = 'CONFIGURATION',
  POLICY = 'POLICY',
  STRATEGY = 'STRATEGY',
  DECISION = 'DECISION'
}

export enum AgentMarketplaceCategory {
  ANALYTICS = 'ANALYTICS',
  AUTOMATION = 'AUTOMATION',
  COMMUNICATION = 'COMMUNICATION',
  DATA_PROCESSING = 'DATA_PROCESSING',
  INTEGRATION = 'INTEGRATION',
  MONITORING = 'MONITORING',
  SECURITY = 'SECURITY',
  OPTIMIZATION = 'OPTIMIZATION',
  LEARNING = 'LEARNING',
  CUSTOM = 'CUSTOM'
}

export enum AgentSchedulerMode {
  FIFO = 'FIFO',
  PRIORITY = 'PRIORITY',
  ROUND_ROBIN = 'ROUND_ROBIN',
  SHORTEST_JOB_FIRST = 'SHORTEST_JOB_FIRST',
  FAIR_SHARE = 'FAIR_SHARE',
  DEADLINE = 'DEADLINE',
  RESOURCE_AWARE = 'RESOURCE_AWARE',
  LOAD_BALANCING = 'LOAD_BALANCING',
  COST_OPTIMIZATION = 'COST_OPTIMIZATION',
  ADAPTIVE = 'ADAPTIVE'
}

export enum AgentBusEvent {
  AGENT_REGISTERED = 'AGENT_REGISTERED',
  AGENT_UNREGISTERED = 'AGENT_UNREGISTERED',
  AGENT_STATUS_CHANGED = 'AGENT_STATUS_CHANGED',
  AGENT_HEARTBEAT = 'AGENT_HEARTBEAT',
  AGENT_ERROR = 'AGENT_ERROR',
  AGENT_RECOVERY = 'AGENT_RECOVERY',
  MESSAGE_SENT = 'MESSAGE_SENT',
  MESSAGE_RECEIVED = 'MESSAGE_RECEIVED',
  MESSAGE_FAILED = 'MESSAGE_FAILED',
  COLLABORATION_STARTED = 'COLLABORATION_STARTED',
  COLLABORATION_COMPLETED = 'COLLABORATION_COMPLETED',
  DELEGATION_STARTED = 'DELEGATION_STARTED',
  DELEGATION_COMPLETED = 'DELEGATION_COMPLETED',
  NEGOTIATION_STARTED = 'NEGOTIATION_STARTED',
  NEGOTIATION_COMPLETED = 'NEGOTIATION_COMPLETED',
  VOTE_CAST = 'VOTE_CAST',
  CONSENSUS_REACHED = 'CONSENSUS_REACHED',
  CONFLICT_DETECTED = 'CONFLICT_DETECTED',
  CONFLICT_RESOLVED = 'CONFLICT_RESOLVED',
  WORKFLOW_STARTED = 'WORKFLOW_STARTED',
  WORKFLOW_COMPLETED = 'WORKFLOW_COMPLETED',
  WORKFLOW_FAILED = 'WORKFLOW_FAILED',
  MEMORY_STORED = 'MEMORY_STORED',
  MEMORY_RETRIEVED = 'MEMORY_RETRIEVED',
  MEMORY_SYNCHRONIZED = 'MEMORY_SYNCHRONIZED'
}

export enum OrchestrationPattern {
  SEQUENTIAL = 'SEQUENTIAL',
  PARALLEL = 'PARALLEL',
  CHOICE = 'CHOICE',
  LOOP = 'LOOP',
  COMPENSATION = 'COMPENSATION',
  SAGA = 'SAGA',
  CQRS = 'CQRS',
  EVENT_SOURCING = 'EVENT_SOURCING',
  CHOREOGRAPHY = 'CHOREOGRAPHY',
  ORCHESTRATION = 'ORCHESTRATION'
}

export enum WorkflowState {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  TIMEOUT = 'TIMEOUT',
  RETRYING = 'RETRYING',
  SUSPENDED = 'SUSPENDED'
}

export enum AgentHierarchyType {
  FLAT = 'FLAT',
  HIERARCHICAL = 'HIERARCHICAL',
  MATRIX = 'MATRIX',
  RING = 'RING',
  MESH = 'MESH',
  HYBRID = 'HYBRID',
  FEDERATED = 'FEDERATED',
  CENTRALIZED = 'CENTRALIZED',
  DECENTRALIZED = 'DECENTRALIZED',
  ADAPTIVE = 'ADAPTIVE'
}

export enum AgentEventPriority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  BACKGROUND = 'BACKGROUND'
}

export enum AgentMessageFormat {
  JSON = 'JSON',
  XML = 'XML',
  PROTOBUF = 'PROTOBUF',
  AVRO = 'AVRO',
  TEXT = 'TEXT',
  BINARY = 'BINARY',
  YAML = 'YAML',
  MSGPACK = 'MSGPACK',
  CBOR = 'CBOR',
  CUSTOM = 'CUSTOM'
}

export enum AgentMessageSecurity {
  NONE = 'NONE',
  SIGNING = 'SIGNING',
  ENCRYPTION = 'ENCRYPTION',
  SIGN_AND_ENCRYPT = 'SIGN_AND_ENCRYPT',
  TLS = 'TLS',
  MTLS = 'MTLS',
  JWT = 'JWT',
  OAUTH = 'OAUTH',
  API_KEY = 'API_KEY',
  CUSTOM = 'CUSTOM'
}

export enum AgentServiceDiscovery {
  STATIC = 'STATIC',
  DYNAMIC = 'DYNAMIC',
  DNS = 'DNS',
  CONSUL = 'CONSUL',
  ETCD = 'ETCD',
  ZOOKEEPER = 'ZOOKEEPER',
  EUREKA = 'EUREKA',
  KUBERNETES = 'KUBERNETES',
  DOCKER = 'DOCKER',
  CUSTOM = 'CUSTOM'
}

export enum AgentLoadBalancing {
  ROUND_ROBIN = 'ROUND_ROBIN',
  LEAST_CONNECTIONS = 'LEAST_CONNECTIONS',
  WEIGHTED = 'WEIGHTED',
  RANDOM = 'RANDOM',
  IP_HASH = 'IP_HASH',
  LEAST_RESPONSE_TIME = 'LEAST_RESPONSE_TIME',
  RESOURCE_BASED = 'RESOURCE_BASED',
  GEOGRAPHIC = 'GEOGRAPHIC',
  ADAPTIVE = 'ADAPTIVE',
  CUSTOM = 'CUSTOM'
}

export enum AgentCircuitBreakerState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
  DISABLED = 'DISABLED',
  FORCED_OPEN = 'FORCED_OPEN'
}

export enum AgentRetryStrategy {
  FIXED = 'FIXED',
  EXPONENTIAL = 'EXPONENTIAL',
  LINEAR = 'LINEAR',
  FIBONACCI = 'FIBONACCI',
  DECORRELATED_JITTER = 'DECORRELATED_JITTER',
  FULL_JITTER = 'FULL_JITTER',
  EQUAL_JITTER = 'EQUAL_JITTER',
  ADAPTIVE = 'ADAPTIVE',
  NONE = 'NONE',
  CUSTOM = 'CUSTOM'
}

export enum AgentTimeoutStrategy {
  FIXED = 'FIXED',
  DYNAMIC = 'DYNAMIC',
  ADAPTIVE = 'ADAPTIVE',
  PERCENTILE = 'PERCENTILE',
  SLA_BASED = 'SLA_BASED',
  NONE = 'NONE',
  CASCADING = 'CASCADING',
  HEDGED = 'HEDGED',
  BUDGET = 'BUDGET',
  CUSTOM = 'CUSTOM'
}

export enum AgentSerialization {
  JSON = 'JSON',
  BINARY = 'BINARY',
  PROTOBUF = 'PROTOBUF',
  AVRO = 'AVRO',
  MSGPACK = 'MSGPACK',
  CBOR = 'CBOR',
  THRIFT = 'THRIFT',
  KRYO = 'KRYO',
  CUSTOM = 'CUSTOM'
}

export enum AgentCompression {
  NONE = 'NONE',
  GZIP = 'GZIP',
  DEFLATE = 'DEFLATE',
  BROTLI = 'BROTLI',
  LZ4 = 'LZ4',
  SNAPPY = 'SNAPPY',
  ZSTD = 'ZSTD',
  CUSTOM = 'CUSTOM'
}

export enum AgentPriorityMode {
  STATIC = 'STATIC',
  DYNAMIC = 'DYNAMIC',
  ADAPTIVE = 'ADAPTIVE',
  CONTEXT_AWARE = 'CONTEXT_AWARE',
  DEADLINE_AWARE = 'DEADLINE_AWARE',
  RESOURCE_AWARE = 'RESOURCE_AWARE',
  COST_AWARE = 'COST_AWARE',
  CUSTOM = 'CUSTOM'
}

export enum AgentMemorySyncStrategy {
  IMMEDIATE = 'IMMEDIATE',
  PERIODIC = 'PERIODIC',
  EVENT_DRIVEN = 'EVENT_DRIVEN',
  LAZY = 'LAZY',
  EAGER = 'EAGER',
  BIDIRECTIONAL = 'BIDIRECTIONAL',
  UNIDIRECTIONAL = 'UNIDIRECTIONAL',
  MERGE = 'MERGE',
  CONFLICT_RESOLUTION = 'CONFLICT_RESOLUTION',
  CUSTOM = 'CUSTOM'
}

export enum AgentTaskDecomposition {
  SEQUENTIAL = 'SEQUENTIAL',
  PARALLEL = 'PARALLEL',
  HIERARCHICAL = 'HIERARCHICAL',
  DYNAMIC = 'DYNAMIC',
  ADAPTIVE = 'ADAPTIVE',
  ML_BASED = 'ML_BASED',
  RULE_BASED = 'RULE_BASED',
  HYBRID = 'HYBRID',
  MANUAL = 'MANUAL',
  CUSTOM = 'CUSTOM'
}

export enum AgentResourceAllocation {
  STATIC = 'STATIC',
  DYNAMIC = 'DYNAMIC',
  DEMAND_BASED = 'DEMAND_BASED',
  PREDICTIVE = 'PREDICTIVE',
  REACTIVE = 'REACTIVE',
  PRIORITY_BASED = 'PRIORITY_BASED',
  COST_OPTIMIZED = 'COST_OPTIMIZED',
  FAIR_SHARE = 'FAIR_SHARE',
  BURST = 'BURST',
  CUSTOM = 'CUSTOM'
}

export enum AgentQualityOfService {
  BEST_EFFORT = 'BEST_EFFORT',
  AT_MOST_ONCE = 'AT_MOST_ONCE',
  AT_LEAST_ONCE = 'AT_LEAST_ONCE',
  EXACTLY_ONCE = 'EXACTLY_ONCE',
  ORDERED = 'ORDERED',
  DURABLE = 'DURABLE',
  TRANSACTIONAL = 'TRANSACTIONAL',
  RELIABLE = 'RELIABLE',
  GUARANTEED = 'GUARANTEED',
  CUSTOM = 'CUSTOM'
}

export enum AgentObservabilityLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  DETAILED = 'DETAILED',
  COMPREHENSIVE = 'COMPREHENSIVE',
  DEBUG = 'DEBUG',
  TRACE = 'TRACE',
  PERFORMANCE = 'PERFORMANCE',
  SECURITY = 'SECURITY',
  CUSTOM = 'CUSTOM'
}

export enum AgentGovernanceModel {
  CENTRALIZED = 'CENTRALIZED',
  DECENTRALIZED = 'DECENTRALIZED',
  FEDERATED = 'FEDERATED',
  HIERARCHICAL = 'HIERARCHICAL',
  DEMOCRATIC = 'DEMOCRATIC',
  AUTOCRATIC = 'AUTOCRATIC',
  HYBRID = 'HYBRID',
  ADAPTIVE = 'ADAPTIVE',
  POLICY_BASED = 'POLICY_BASED',
  CUSTOM = 'CUSTOM'
}

export interface AgentRegistry {
  id: string;
  name: string;
  description: string;
  status: AgentRegistryStatus;
  agents: AgentRegistryEntry[];
  protocols: AgentDiscoveryProtocol[];
  heartbeatInterval: number;
  registrationTimeout: number;
  maxAgents: number;
  currentAgents: number;
  metadata: Record<string, unknown>;
}

export interface AgentRegistryEntry {
  id: string;
  agentId: string;
  name: string;
  role: string;
  capabilities: string[];
  status: AgentRegistryStatus;
  endpoint: string;
  protocol: AgentDiscoveryProtocol;
  registeredAt: string;
  lastHeartbeat: string;
  metadata: Record<string, unknown>;
}

export interface AgentDiscoveryService {
  id: string;
  protocol: AgentDiscoveryProtocol;
  discoveryInterval: number;
  cacheTimeout: number;
  filters: AgentDiscoveryFilter[];
  discoveredAgents: AgentDiscoveredAgent[];
  metadata: Record<string, unknown>;
}

export interface AgentDiscoveryFilter {
  id: string;
  type: string;
  operator: string;
  value: unknown;
  description: string;
  metadata: Record<string, unknown>;
}

export interface AgentDiscoveredAgent {
  id: string;
  agentId: string;
  name: string;
  capabilities: string[];
  endpoint: string;
  protocol: AgentDiscoveryProtocol;
  discoveredAt: string;
  ttl: number;
  metadata: Record<string, unknown>;
}

export interface AgentMessage {
  id: string;
  senderId: string;
  receiverId: string;
  type: AgentMessageType;
  format: AgentMessageFormat;
  security: AgentMessageSecurity;
  priority: AgentEventPriority;
  payload: Record<string, unknown>;
  timestamp: string;
  ttl: number;
  correlationId: string;
  causationId?: string;
  retryCount: number;
  maxRetries: number;
  metadata: Record<string, unknown>;
}

export interface AgentCollaborationSession {
  id: string;
  name: string;
  description: string;
  mode: AgentCollaborationMode;
  initiatorId: string;
  participantIds: string[];
  status: WorkflowState;
  objectives: string[];
  sharedMemory: string[];
  communicationLog: AgentMessage[];
  startTime: string;
  endTime?: string;
  outcome?: string;
  metadata: Record<string, unknown>;
}

export interface AgentDelegation {
  id: string;
  delegatorId: string;
  delegateId: string;
  type: AgentDelegationType;
  task: Record<string, unknown>;
  constraints: Record<string, unknown>;
  deadline: string;
  status: WorkflowState;
  result?: Record<string, unknown>;
  createdAt: string;
  completedAt?: string;
  metadata: Record<string, unknown>;
}

export interface AgentNegotiation {
  id: string;
  name: string;
  description: string;
  initiatorId: string;
  participantIds: string[];
  topic: string;
  proposals: AgentProposal[];
  status: AgentNegotiationStatus;
  agreement?: Record<string, unknown>;
  startTime: string;
  endTime?: string;
  roundCount: number;
  maxRounds: number;
  metadata: Record<string, unknown>;
}

export interface AgentProposal {
  id: string;
  negotiationId: string;
  proposerId: string;
  content: Record<string, unknown>;
  terms: Record<string, unknown>;
  deadline: string;
  status: AgentNegotiationStatus;
  votes: AgentVote[];
  metadata: Record<string, unknown>;
}

export interface AgentVote {
  id: string;
  proposalId: string;
  voterId: string;
  type: AgentVoteType;
  weight: number;
  rationale: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AgentConsensus {
  id: string;
  name: string;
  description: string;
  algorithm: AgentConsensusAlgorithm;
  participantIds: string[];
  topic: string;
  proposals: Record<string, unknown>[];
  decision?: Record<string, unknown>;
  status: WorkflowState;
  votes: AgentVote[];
  roundCount: number;
  startTime: string;
  endTime?: string;
  metadata: Record<string, unknown>;
}

export interface AgentConflict {
  id: string;
  type: AgentConflictType;
  parties: string[];
  description: string;
  severity: string;
  detectedAt: string;
  resolution?: AgentConflictResolution;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentConflictResolution {
  id: string;
  conflictId: string;
  strategy: string;
  mediatorId?: string;
  resolution: Record<string, unknown>;
  acceptedBy: string[];
  rejectedBy: string[];
  status: WorkflowState;
  resolvedAt?: string;
  metadata: Record<string, unknown>;
}

export interface AgentMarketplaceEntry {
  id: string;
  agentId: string;
  name: string;
  description: string;
  category: AgentMarketplaceCategory;
  capabilities: string[];
  version: string;
  author: string;
  price: number;
  rating: number;
  reviewCount: number;
  downloads: number;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentSchedule {
  id: string;
  name: string;
  description: string;
  mode: AgentSchedulerMode;
  tasks: AgentScheduledTask[];
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentScheduledTask {
  id: string;
  scheduleId: string;
  agentId: string;
  taskType: string;
  payload: Record<string, unknown>;
  priority: AgentEventPriority;
  scheduledAt: string;
  startedAt?: string;
  completedAt?: string;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentMemoryBusEvent {
  id: string;
  type: string;
  source: string;
  target?: string;
  payload: Record<string, unknown>;
  timestamp: string;
  ttl: number;
  version: number;
  metadata: Record<string, unknown>;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  pattern: OrchestrationPattern;
  steps: WorkflowStep[];
  triggers: WorkflowTrigger[];
  variables: Record<string, unknown>;
  errorHandling: WorkflowErrorHandling;
  metadata: Record<string, unknown>;
}

export interface WorkflowStep {
  id: string;
  workflowId: string;
  order: number;
  type: string;
  name: string;
  agentId: string;
  config: Record<string, unknown>;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  condition?: string;
  retryPolicy: WorkflowRetryPolicy;
  timeout: number;
  compensationStepId?: string;
  metadata: Record<string, unknown>;
}

export interface WorkflowTrigger {
  id: string;
  workflowId: string;
  type: string;
  config: Record<string, unknown>;
  conditions: Record<string, unknown>[];
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface WorkflowErrorHandling {
  strategy: string;
  maxRetries: number;
  retryDelay: number;
  fallbackSteps: string[];
  compensationEnabled: boolean;
  metadata: Record<string, unknown>;
}

export interface WorkflowRetryPolicy {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableErrors: string[];
  metadata: Record<string, unknown>;
}

export interface OrchestrationConfig {
  id: string;
  name: string;
  description: string;
  pattern: OrchestrationPattern;
  agents: string[];
  hierarchy: AgentHierarchyType;
  governance: AgentGovernanceModel;
  configuration: Record<string, unknown>;
  policies: Record<string, unknown>[];
  metadata: Record<string, unknown>;
}

export interface AgentHierarchy {
  id: string;
  name: string;
  description: string;
  type: AgentHierarchyType;
  rootAgentId: string;
  nodes: AgentHierarchyNode[];
  metadata: Record<string, unknown>;
}

export interface AgentHierarchyNode {
  id: string;
  hierarchyId: string;
  agentId: string;
  parentId?: string;
  children: string[];
  level: number;
  role: string;
  metadata: Record<string, unknown>;
}

export interface AgentEvent {
  id: string;
  type: AgentBusEvent;
  source: string;
  payload: Record<string, unknown>;
  timestamp: string;
  priority: AgentEventPriority;
  metadata: Record<string, unknown>;
}

export interface AgentEventSubscription {
  id: string;
  agentId: string;
  eventType: AgentBusEvent;
  filter: Record<string, unknown>;
  callback: string;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentEventFilter {
  id: string;
  type: string;
  operator: string;
  value: unknown;
  description: string;
  metadata: Record<string, unknown>;
}

export interface AgentServiceEndpoint {
  id: string;
  agentId: string;
  protocol: string;
  host: string;
  port: number;
  path: string;
  secure: boolean;
  metadata: Record<string, unknown>;
}

export interface AgentHealthCheck {
  id: string;
  agentId: string;
  endpoint: string;
  interval: number;
  timeout: number;
  healthyThreshold: number;
  unhealthyThreshold: number;
  lastCheck: string;
  status: string;
  metadata: Record<string, unknown>;
}

export interface AgentCircuitBreaker {
  id: string;
  agentId: string;
  failureThreshold: number;
  resetTimeout: number;
  halfOpenMax: number;
  state: AgentCircuitBreakerState;
  failureCount: number;
  successCount: number;
  lastFailureTime?: string;
  metadata: Record<string, unknown>;
}

export interface AgentRateLimiter {
  id: string;
  agentId: string;
  maxRequests: number;
  windowMs: number;
  currentRequests: number;
  blockedRequests: number;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentLoadBalancer {
  id: string;
  name: string;
  description: string;
  algorithm: AgentLoadBalancing;
  agents: string[];
  healthCheck: AgentHealthCheck;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentServiceMesh {
  id: string;
  name: string;
  description: string;
  agents: string[];
  configuration: Record<string, unknown>;
  policies: Record<string, unknown>[];
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentAPIGateway {
  id: string;
  name: string;
  description: string;
  routes: AgentAPIRoute[];
  rateLimit: number;
  authentication: Record<string, unknown>;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentAPIRoute {
  id: string;
  gatewayId: string;
  path: string;
  method: string;
  targetAgentId: string;
  timeout: number;
  retryPolicy: WorkflowRetryPolicy;
  metadata: Record<string, unknown>;
}

export interface AgentMessageQueue {
  id: string;
  name: string;
  description: string;
  messages: AgentQueuedMessage[];
  maxSize: number;
  currentSize: number;
  consumers: number;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentQueuedMessage {
  id: string;
  queueId: string;
  payload: Record<string, unknown>;
  priority: AgentEventPriority;
  enqueuedAt: string;
  deliveredAt?: string;
  acknowledgedAt?: string;
  status: WorkflowState;
  retryCount: number;
  metadata: Record<string, unknown>;
}

export interface AgentTopic {
  id: string;
  name: string;
  description: string;
  subscribers: string[];
  messageCount: number;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentSubscription {
  id: string;
  topicId: string;
  agentId: string;
  filter: Record<string, unknown>;
  callback: string;
  status: WorkflowState;
  lastDelivery?: string;
  metadata: Record<string, unknown>;
}

export interface AgentDeadLetterQueue {
  id: string;
  sourceQueueId: string;
  messages: AgentDeadLetterMessage[];
  maxSize: number;
  currentSize: number;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentDeadLetterMessage {
  id: string;
  queueId: string;
  originalMessage: AgentQueuedMessage;
  error: string;
  failureCount: number;
  lastFailureTime: string;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentCollaborationContract {
  id: string;
  name: string;
  description: string;
  participants: string[];
  terms: Record<string, unknown>;
  effectiveFrom: string;
  effectiveUntil?: string;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentCapabilityMatch {
  id: string;
  requiredCapability: string;
  matchedAgentId: string;
  matchScore: number;
  matchType: string;
  metadata: Record<string, unknown>;
}

export interface AgentPerformanceScore {
  id: string;
  agentId: string;
  metrics: Record<string, number>;
  overallScore: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AgentTrustScore {
  id: string;
  agentId: string;
  score: number;
  factors: Record<string, number>;
  lastUpdated: string;
  metadata: Record<string, unknown>;
}

export interface AgentCommunicationChannel {
  id: string;
  name: string;
  type: string;
  protocol: string;
  participants: string[];
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentMessageRouter {
  id: string;
  name: string;
  description: string;
  routingRules: AgentRoutingRule[];
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentRoutingRule {
  id: string;
  routerId: string;
  condition: string;
  targetAgentId: string;
  priority: number;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface AgentMessageTransformer {
  id: string;
  name: string;
  description: string;
  inputFormat: AgentMessageFormat;
  outputFormat: AgentMessageFormat;
  transformationRules: Record<string, unknown>[];
  metadata: Record<string, unknown>;
}

export interface AgentMessageValidator {
  id: string;
  name: string;
  description: string;
  schema: Record<string, unknown>;
  validationRules: Record<string, unknown>[];
  metadata: Record<string, unknown>;
}

export interface AgentMessageLogger {
  id: string;
  name: string;
  description: string;
  logLevel: string;
  retentionDays: number;
  status: WorkflowState;
  metadata: Record<string, unknown>;
}

export interface AgentMessageMetrics {
  id: string;
  agentId: string;
  messagesSent: number;
  messagesReceived: number;
  messagesFailed: number;
  averageLatency: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AgentCollaborationMetrics {
  id: string;
  sessionId: string;
  participantCount: number;
  messageCount: number;
  averageResponseTime: number;
  completionRate: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AgentWorkflowMetrics {
  id: string;
  workflowId: string;
  executionCount: number;
  successRate: number;
  averageDuration: number;
  errorRate: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AgentRegistryMetrics {
  id: string;
  registryId: string;
  totalAgents: number;
  activeAgents: number;
  registrationRate: number;
  deregistrationRate: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AgentDiscoveryMetrics {
  id: string;
  discoveryId: string;
  discoveryCount: number;
  averageDiscoveryTime: number;
  successRate: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AgentNegotiationMetrics {
  id: string;
  negotiationId: string;
  roundCount: number;
  agreementReached: boolean;
  averageRoundDuration: number;
  participantSatisfaction: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AgentConsensusMetrics {
  id: string;
  consensusId: string;
  roundCount: number;
  consensusReached: boolean;
  averageRoundDuration: number;
  participantCount: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AgentConflictMetrics {
  id: string;
  conflictId: string;
  resolutionTime: number;
  resolutionSuccess: boolean;
  partiesInvolved: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AgentDelegationMetrics {
  id: string;
  delegationId: string;
  completionTime: number;
  success: boolean;
  delegatorSatisfaction: number;
  delegateSatisfaction: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  status: AgentRegistryStatus;
  endpoint: string;
  protocol: AgentDiscoveryProtocol;
  metadata: Record<string, unknown>;
}
