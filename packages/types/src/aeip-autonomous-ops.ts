export enum TimetableSlot {
  MONDAY_MORNING = 'MONDAY_MORNING',
  MONDAY_AFTERNOON = 'MONDAY_AFTERNOON',
  TUESDAY_MORNING = 'TUESDAY_MORNING',
  TUESDAY_AFTERNOON = 'TUESDAY_AFTERNOON',
  WEDNESDAY_MORNING = 'WEDNESDAY_MORNING',
  WEDNESDAY_AFTERNOON = 'WEDNESDAY_AFTERNOON',
  THURSDAY_MORNING = 'THURSDAY_MORNING',
  THURSDAY_AFTERNOON = 'THURSDAY_AFTERNOON',
  FRIDAY_MORNING = 'FRIDAY_MORNING',
  FRIDAY_AFTERNOON = 'FRIDAY_AFTERNOON',
  SATURDAY_MORNING = 'SATURDAY_MORNING',
  SATURDAY_AFTERNOON = 'SATURDAY_AFTERNOON',
  SUNDAY_MORNING = 'SUNDAY_MORNING',
  SUNDAY_AFTERNOON = 'SUNDAY_AFTERNOON'
}

export enum RoomType {
  CLASSROOM = 'CLASSROOM',
  LABORATORY = 'LABORATORY',
  LIBRARY = 'LIBRARY',
  AUDITORIUM = 'AUDITORIUM',
  GYMNASIUM = 'GYMNASIUM',
  CAFETERIA = 'CAFETERIA',
  OFFICE = 'OFFICE',
  COMPUTER_LAB = 'COMPUTER_LAB',
  ART_ROOM = 'ART_ROOM',
  MUSIC_ROOM = 'MUSIC_ROOM',
  CONFERENCE = 'CONFERENCE',
  STUDY_ROOM = 'STUDY_ROOM',
  WORKSHOP = 'WORKSHOP',
  LECTURE_HALL = 'LECTURE_HALL',
  SEMINAR_ROOM = 'SEMINAR_ROOM'
}

export enum RoomOptimization {
  CAPACITY = 'CAPACITY',
  PROXIMITY = 'PROXIMITY',
  EQUIPMENT = 'EQUIPMENT',
  AVAILABILITY = 'AVAILABILITY',
  COST = 'COST',
  ENERGY = 'ENERGY',
  ACCESSIBILITY = 'ACCESSIBILITY',
  MAINTENANCE = 'MAINTENANCE',
  NOISE = 'NOISE',
  LIGHTING = 'LIGHTING'
}

export enum TeacherLoad {
  UNDERLOADED = 'UNDERLOADED',
  OPTIMAL = 'OPTIMAL',
  OVERLOADED = 'OVERLOADED',
  CRITICAL = 'CRITICAL',
  LEAVE = 'LEAVE',
  TRAINING = 'TRAINING',
  UNAVAILABLE = 'UNAVAILABLE'
}

export enum AbsencePrediction {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  CERTAIN = 'CERTAIN',
  UNKNOWN = 'UNKNOWN'
}

export enum RiskType {
  ACADEMIC = 'ACADEMIC',
  FINANCIAL = 'FINANCIAL',
  OPERATIONAL = 'OPERATIONAL',
  SAFETY = 'SAFETY',
  COMPLIANCE = 'COMPLIANCE',
  REPUTATION = 'REPUTATION',
  TECHNOLOGY = 'TECHNOLOGY',
  HUMAN_RESOURCES = 'HUMAN_RESOURCES',
  ENVIRONMENTAL = 'ENVIRONMENTAL',
  STRATEGIC = 'STRATEGIC'
}

export enum RiskLevel {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  CRITICAL = 'CRITICAL'
}

export enum ReminderType {
  ASSIGNMENT = 'ASSIGNMENT',
  EXAM = 'EXAM',
  MEETING = 'MEETING',
  DEADLINE = 'DEADLINE',
  EVENT = 'EVENT',
  PAYMENT = 'PAYMENT',
  ATTENDANCE = 'ATTENDANCE',
  PARENT_CONFERENCES = 'PARENT_CONFERENCES',
  CERTIFICATE = 'CERTIFICATE',
  REGISTRATION = 'REGISTRATION'
}

export enum EnrollmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  WAITLISTED = 'WAITLISTED',
  ENROLLED = 'ENROLLED',
  WITHDRAWN = 'WITHDRAWN',
  GRADUATED = 'GRADUATED',
  TRANSFERRED = 'TRANSFERRED',
  SUSPENDED = 'SUSPENDED',
  EXPELLED = 'EXPELLED'
}

export enum ReportType {
  ACADEMIC = 'ACADEMIC',
  FINANCIAL = 'FINANCIAL',
  ATTENDANCE = 'ATTENDANCE',
  BEHAVIOR = 'BEHAVIOR',
  HEALTH = 'HEALTH',
  TRANSPORT = 'TRANSPORT',
  LIBRARY = 'LIBRARY',
  DISCIPLINE = 'DISCIPLINE',
  ENROLLMENT = 'ENROLLMENT',
  STAFF = 'STAFF'
}

export enum WorkflowTrigger {
  SCHEDULED = 'SCHEDULED',
  EVENT = 'EVENT',
  THRESHOLD = 'THRESHOLD',
  MANUAL = 'MANUAL',
  CONDITIONAL = 'CONDITIONAL',
  CHAIN = 'CHAIN',
  COMPOSITE = 'COMPOSITE',
  TIME_BASED = 'TIME_BASED',
  DATA_BASED = 'DATA_BASED',
  EXTERNAL = 'EXTERNAL'
}

export enum AutomationLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  FULL = 'FULL',
  ADAPTIVE = 'ADAPTIVE',
  LEARNING = 'LEARNING',
  PREDICTIVE = 'PREDICTIVE',
  PRESCRIPTIVE = 'PRESCRIPTIVE',
  AUTONOMOUS = 'AUTONOMOUS'
}

export enum OptimizationGoal {
  MINIMIZE = 'MINIMIZE',
  MAXIMIZE = 'MAXIMIZE',
  BALANCE = 'BALANCE',
  SATISFY = 'SATISFY',
  OPTIMIZE = 'OPTIMIZE',
  EFFICIENCY = 'EFFICIENCY',
  COST = 'COST',
  TIME = 'TIME',
  QUALITY = 'QUALITY',
  SATISFACTION = 'SATISFACTION'
}

export enum ConstraintType {
  HARD = 'HARD',
  SOFT = 'SOFT',
  PREFERENCE = 'PREFERENCE',
  WEIGHTED = 'WEIGHTED',
  PRIORITY = 'PRIORITY',
  TEMPORAL = 'TEMPORAL',
  SPATIAL = 'SPATIAL',
  RESOURCE = 'RESOURCE',
  LOGICAL = 'LOGICAL',
  CUSTOM = 'CUSTOM'
}

export enum ScheduleStatus {
  DRAFT = 'DRAFT',
  VALIDATED = 'VALIDATED',
  OPTIMIZED = 'OPTIMIZED',
  PUBLISHED = 'PUBLISHED',
  ACTIVE = 'ACTIVE',
  LOCKED = 'LOCKED',
  ARCHIVED = 'ARCHIVED',
  CONFLICT = 'CONFLICT',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}

export enum RoomAssignmentStatus {
  AVAILABLE = 'AVAILABLE',
  ASSIGNED = 'ASSIGNED',
  MAINTENANCE = 'MAINTENANCE',
  RESERVED = 'RESERVED',
  UNAVAILABLE = 'UNAVAILABLE',
  CONFLICT = 'CONFLICT',
  OPTIMIZED = 'OPTIMIZED',
  PENDING = 'PENDING',
  LOCKED = 'LOCKED',
  ARCHIVED = 'ARCHIVED'
}

export enum TeacherWorkloadStatus {
  BALANCED = 'BALANCED',
  UNDERLOADED = 'UNDERLOADED',
  OVERLOADED = 'OVERLOADED',
  CRITICAL = 'CRITICAL',
  ON_LEAVE = 'ON_LEAVE',
  TRAINING = 'TRAINING',
  UNAVAILABLE = 'UNAVAILABLE',
  OPTIMIZED = 'OPTIMIZED',
  PENDING = 'PENDING',
  REBALANCED = 'REBALANCED'
}

export enum AbsenceImpact {
  NONE = 'NONE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum RiskMitigationStatus {
  IDENTIFIED = 'IDENTIFIED',
  ANALYZED = 'ANALYZED',
  MITIGATED = 'MITIGATED',
  MONITORED = 'MONITORED',
  RESOLVED = 'RESOLVED',
  ACCEPTED = 'ACCEPTED',
  TRANSFERRED = 'TRANSFERRED',
  AVOIDED = 'AVOIDED',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED'
}

export enum ReminderStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  SNOOZED = 'SNOOZED',
  RECURRING = 'RECURRING',
  EXPIRED = 'EXPIRED'
}

export enum EnrollmentWorkflowStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PENDING_DOCUMENTS = 'PENDING_DOCUMENTS',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  APPEALED = 'APPEALED'
}

export enum RegulatoryReportStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVISED = 'REVISED',
  ARCHIVED = 'ARCHIVED',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE'
}

export enum AutonomousWorkflowStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  SCHEDULED = 'SCHEDULED',
  WAITING = 'WAITING',
  RETRYING = 'RETRYING',
  TIMEOUT = 'TIMEOUT'
}

export enum AutomationTriggerType {
  TIME = 'TIME',
  EVENT = 'EVENT',
  CONDITION = 'CONDITION',
  THRESHOLD = 'THRESHOLD',
  PATTERN = 'PATTERN',
  ANOMALY = 'ANOMALY',
  PREDICTION = 'PREDICTION',
  EXTERNAL = 'EXTERNAL',
  MANUAL = 'MANUAL',
  CHAIN = 'CHAIN'
}

export enum AutomationActionType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  NOTIFY = 'NOTIFY',
  ASSIGN = 'ASSIGN',
  SCHEDULE = 'SCHEDULE',
  CANCEL = 'CANCEL',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  ESCALATE = 'ESCALATE'
}

export enum ResourceAllocationStrategy {
  EQUAL = 'EQUAL',
  PRIORITY = 'PRIORITY',
  DEMAND = 'DEMAND',
  CAPACITY = 'CAPACITY',
  COST_OPTIMIZED = 'COST_OPTIMIZED',
  FAIR_SHARE = 'FAIR_SHARE',
  ADAPTIVE = 'ADAPTIVE',
  PREDICTIVE = 'PREDICTIVE',
  HYBRID = 'HYBRID',
  CUSTOM = 'CUSTOM'
}

export interface AutonomousTimetable {
  id: string;
  name: string;
  description: string;
  academicYear: string;
  semester: string;
  slots: TimetableSlotConfig[];
  constraints: TimetableConstraint[];
  optimization: TimetableOptimization;
  status: ScheduleStatus;
  generatedAt: string;
  publishedAt?: string;
  metadata: Record<string, unknown>;
}

export interface TimetableSlotConfig {
  id: string;
  timetableId: string;
  slot: TimetableSlot;
  subjectId: string;
  teacherId: string;
  roomId: string;
  classId: string;
  duration: number;
  capacity: number;
  equipment: string[];
  metadata: Record<string, unknown>;
}

export interface TimetableConstraint {
  id: string;
  timetableId: string;
  type: ConstraintType;
  description: string;
  weight: number;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface TimetableOptimization {
  id: string;
  timetableId: string;
  goal: OptimizationGoal;
  algorithm: string;
  iterations: number;
  score: number;
  improvements: TimetableImprovement[];
  metadata: Record<string, unknown>;
}

export interface TimetableImprovement {
  id: string;
  optimizationId: string;
  type: string;
  description: string;
  impact: number;
  applied: boolean;
  metadata: Record<string, unknown>;
}

export interface RoomOptimizationPlan {
  id: string;
  name: string;
  description: string;
  strategy: RoomOptimization;
  rooms: RoomConfig[];
  assignments: RoomAssignment[];
  constraints: RoomConstraint[];
  metrics: RoomOptimizationMetrics;
  status: RoomAssignmentStatus;
  generatedAt: string;
  metadata: Record<string, unknown>;
}

export interface RoomConfig {
  id: string;
  planId: string;
  roomId: string;
  type: RoomType;
  capacity: number;
  equipment: string[];
  features: string[];
  availability: RoomAvailability;
  metadata: Record<string, unknown>;
}

export interface RoomAvailability {
  id: string;
  roomId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  available: boolean;
  reason?: string;
  metadata: Record<string, unknown>;
}

export interface RoomAssignment {
  id: string;
  planId: string;
  roomId: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  slot: TimetableSlot;
  startTime: string;
  endTime: string;
  status: RoomAssignmentStatus;
  metadata: Record<string, unknown>;
}

export interface RoomConstraint {
  id: string;
  planId: string;
  type: ConstraintType;
  description: string;
  weight: number;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface RoomOptimizationMetrics {
  id: string;
  planId: string;
  utilization: number;
  efficiency: number;
  conflicts: number;
  satisfaction: number;
  cost: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface TeacherWorkload {
  id: string;
  teacherId: string;
  academicYear: string;
  semester: string;
  totalHours: number;
  maxHours: number;
  subjects: TeacherSubject[];
  classes: TeacherClass[];
  schedule: TeacherSchedule[];
  status: TeacherWorkloadStatus;
  balanceScore: number;
  recommendations: TeacherRecommendation[];
  metadata: Record<string, unknown>;
}

export interface TeacherSubject {
  id: string;
  workloadId: string;
  subjectId: string;
  subjectName: string;
  hoursPerWeek: number;
  difficulty: number;
  priority: number;
  metadata: Record<string, unknown>;
}

export interface TeacherClass {
  id: string;
  workloadId: string;
  classId: string;
  className: string;
  studentCount: number;
  level: string;
  metadata: Record<string, unknown>;
}

export interface TeacherSchedule {
  id: string;
  workloadId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  type: string;
  subjectId?: string;
  classId?: string;
  roomId?: string;
  metadata: Record<string, unknown>;
}

export interface TeacherRecommendation {
  id: string;
  workloadId: string;
  type: string;
  description: string;
  priority: number;
  impact: number;
  metadata: Record<string, unknown>;
}

export interface AbsenceForecast {
  id: string;
  teacherId: string;
  date: string;
  prediction: AbsencePrediction;
  probability: number;
  factors: AbsenceFactor[];
  impact: AbsenceImpact;
  mitigation: string;
  confidence: number;
  metadata: Record<string, unknown>;
}

export interface AbsenceFactor {
  id: string;
  forecastId: string;
  type: string;
  weight: number;
  description: string;
  historical: boolean;
  metadata: Record<string, unknown>;
}

export interface SchoolRisk {
  id: string;
  type: RiskType;
  title: string;
  description: string;
  level: RiskLevel;
  probability: number;
  impact: number;
  score: number;
  identifiedAt: string;
  owner: string;
  status: RiskMitigationStatus;
  metadata: Record<string, unknown>;
}

export interface RiskMitigation {
  id: string;
  riskId: string;
  strategy: string;
  description: string;
  actions: RiskMitigationAction[];
  cost: number;
  effectiveness: number;
  status: RiskMitigationStatus;
  implementedAt?: string;
  metadata: Record<string, unknown>;
}

export interface RiskMitigationAction {
  id: string;
  mitigationId: string;
  type: string;
  description: string;
  assignee: string;
  deadline: string;
  status: string;
  completedAt?: string;
  metadata: Record<string, unknown>;
}

export interface AutomatedReminder {
  id: string;
  type: ReminderType;
  title: string;
  message: string;
  recipientIds: string[];
  channels: string[];
  scheduledAt: string;
  sentAt?: string;
  readAt?: string;
  status: ReminderStatus;
  recurring: boolean;
  recurrencePattern?: string;
  metadata: Record<string, unknown>;
}

export interface EnrollmentWorkflow {
  id: string;
  name: string;
  description: string;
  academicYear: string;
  steps: EnrollmentStep[];
  applications: EnrollmentApplication[];
  status: EnrollmentWorkflowStatus;
  deadline: string;
  metadata: Record<string, unknown>;
}

export interface EnrollmentStep {
  id: string;
  workflowId: string;
  order: number;
  name: string;
  type: string;
  required: boolean;
  autoProcess: boolean;
  config: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface EnrollmentApplication {
  id: string;
  workflowId: string;
  studentId: string;
  studentName: string;
  grade: string;
  status: EnrollmentStatus;
  submittedAt: string;
  processedAt?: string;
  documents: EnrollmentDocument[];
  payments: EnrollmentPayment[];
  metadata: Record<string, unknown>;
}

export interface EnrollmentDocument {
  id: string;
  applicationId: string;
  type: string;
  name: string;
  url: string;
  verified: boolean;
  verifiedAt?: string;
  metadata: Record<string, unknown>;
}

export interface EnrollmentPayment {
  id: string;
  applicationId: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  paidAt?: string;
  metadata: Record<string, unknown>;
}

export interface RegulatoryReport {
  id: string;
  type: ReportType;
  name: string;
  description: string;
  academicYear: string;
  period: string;
  data: Record<string, unknown>;
  generatedAt: string;
  submittedAt?: string;
  status: RegulatoryReportStatus;
  compliance: RegulatoryCompliance;
  metadata: Record<string, unknown>;
}

export interface RegulatoryCompliance {
  id: string;
  reportId: string;
  standard: string;
  compliant: boolean;
  score: number;
  findings: RegulatoryFinding[];
  recommendations: string[];
  metadata: Record<string, unknown>;
}

export interface RegulatoryFinding {
  id: string;
  complianceId: string;
  type: string;
  severity: string;
  description: string;
  evidence: string;
  recommendation: string;
  status: string;
  metadata: Record<string, unknown>;
}

export interface AutonomousWorkflow {
  id: string;
  name: string;
  description: string;
  type: string;
  trigger: WorkflowTriggerConfig;
  steps: AutonomousWorkflowStep[];
  variables: Record<string, unknown>;
  status: AutonomousWorkflowStatus;
  lastRun?: string;
  nextRun?: string;
  metadata: Record<string, unknown>;
}

export interface WorkflowTriggerConfig {
  type: AutomationTriggerType;
  config: Record<string, unknown>;
  conditions: AutomationCondition[];
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface AutonomousWorkflowStep {
  id: string;
  workflowId: string;
  order: number;
  type: string;
  name: string;
  config: Record<string, unknown>;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  condition?: string;
  retryPolicy: AutomationRetryPolicy;
  timeout: number;
  metadata: Record<string, unknown>;
}

export interface AutomationRetryPolicy {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableErrors: string[];
  metadata: Record<string, unknown>;
}

export interface WorkflowAction {
  id: string;
  stepId: string;
  type: AutomationActionType;
  target: string;
  parameters: Record<string, unknown>;
  condition?: string;
  metadata: Record<string, unknown>;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  priority: number;
  enabled: boolean;
  lastTriggered?: string;
  metadata: Record<string, unknown>;
}

export interface AutomationTrigger {
  id: string;
  ruleId: string;
  type: AutomationTriggerType;
  config: Record<string, unknown>;
  schedule?: string;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface AutomationCondition {
  id: string;
  ruleId: string;
  type: string;
  field: string;
  operator: string;
  value: unknown;
  logicOperator?: string;
  metadata: Record<string, unknown>;
}

export interface AutomationAction {
  id: string;
  ruleId: string;
  type: AutomationActionType;
  target: string;
  parameters: Record<string, unknown>;
  order: number;
  metadata: Record<string, unknown>;
}

export interface ScheduleOptimization {
  id: string;
  name: string;
  description: string;
  algorithm: string;
  parameters: Record<string, unknown>;
  constraints: ScheduleConstraint[];
  objective: OptimizationGoal;
  iterations: number;
  bestScore: number;
  status: ScheduleStatus;
  metadata: Record<string, unknown>;
}

export interface ScheduleConstraint {
  id: string;
  optimizationId: string;
  type: ConstraintType;
  description: string;
  weight: number;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface ResourceAllocation {
  id: string;
  name: string;
  description: string;
  strategy: ResourceAllocationStrategy;
  resources: ResourceItem[];
  allocations: ResourceAllocationItem[];
  constraints: ResourceConstraint[];
  metrics: ResourceAllocationMetrics;
  status: string;
  generatedAt: string;
  metadata: Record<string, unknown>;
}

export interface ResourceItem {
  id: string;
  allocationId: string;
  type: string;
  name: string;
  capacity: number;
  available: number;
  cost: number;
  metadata: Record<string, unknown>;
}

export interface ResourceAllocationItem {
  id: string;
  allocationId: string;
  resourceId: string;
  taskId: string;
  amount: number;
  startTime: string;
  endTime: string;
  priority: number;
  status: string;
  metadata: Record<string, unknown>;
}

export interface ResourceConstraint {
  id: string;
  allocationId: string;
  type: ConstraintType;
  description: string;
  weight: number;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface ResourceAllocationMetrics {
  id: string;
  allocationId: string;
  utilization: number;
  efficiency: number;
  cost: number;
  satisfaction: number;
  conflicts: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AttendancePrediction {
  id: string;
  classId: string;
  date: string;
  predictedRate: number;
  confidence: number;
  factors: AttendanceFactor[];
  recommendations: string[];
  metadata: Record<string, unknown>;
}

export interface AttendanceFactor {
  id: string;
  predictionId: string;
  type: string;
  weight: number;
  description: string;
  historical: boolean;
  metadata: Record<string, unknown>;
}

export interface AcademicPerformance {
  id: string;
  studentId: string;
  subjectId: string;
  period: string;
  score: number;
  grade: string;
  trend: string;
  predictions: PerformancePrediction[];
  recommendations: string[];
  metadata: Record<string, unknown>;
}

export interface PerformancePrediction {
  id: string;
  performanceId: string;
  metric: string;
  predictedValue: number;
  confidence: number;
  factors: string[];
  metadata: Record<string, unknown>;
}

export interface SchoolDashboard {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  layout: Record<string, unknown>;
  refreshInterval: number;
  lastRefreshed: string;
  metadata: Record<string, unknown>;
}

export interface DashboardWidget {
  id: string;
  dashboardId: string;
  type: string;
  title: string;
  config: Record<string, unknown>;
  position: Record<string, number>;
  size: Record<string, number>;
  refreshInterval: number;
  metadata: Record<string, unknown>;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  recipientIds: string[];
  channels: string[];
  priority: string;
  scheduledAt: string;
  sentAt?: string;
  readAt?: string;
  status: string;
  metadata: Record<string, unknown>;
}

export interface Alert {
  id: string;
  type: string;
  severity: string;
  title: string;
  message: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  resolved: boolean;
  resolvedAt?: string;
  metadata: Record<string, unknown>;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: Record<string, unknown>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
}

export interface SystemHealth {
  id: string;
  component: string;
  status: string;
  latency: number;
  errorRate: number;
  uptime: number;
  lastCheck: string;
  metadata: Record<string, unknown>;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  tags: Record<string, string>;
  metadata: Record<string, unknown>;
}

export interface CapacityPlan {
  id: string;
  name: string;
  description: string;
  currentCapacity: number;
  projectedDemand: number;
  gap: number;
  recommendations: CapacityRecommendation[];
  generatedAt: string;
  metadata: Record<string, unknown>;
}

export interface CapacityRecommendation {
  id: string;
  planId: string;
  type: string;
  description: string;
  impact: number;
  cost: number;
  timeline: string;
  metadata: Record<string, unknown>;
}

export interface CostOptimization {
  id: string;
  name: string;
  description: string;
  currentCost: number;
  optimizedCost: number;
  savings: number;
  recommendations: CostRecommendation[];
  generatedAt: string;
  metadata: Record<string, unknown>;
}

export interface CostRecommendation {
  id: string;
  optimizationId: string;
  type: string;
  description: string;
  savings: number;
  implementationCost: number;
  roi: number;
  timeline: string;
  metadata: Record<string, unknown>;
}
