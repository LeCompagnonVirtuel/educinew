// ──────────────────────────────────────────────
// Digital Twin Platform — Enums
// ──────────────────────────────────────────────

export enum TwinType {
  MINISTRY = "MINISTRY",
  REGION = "REGION",
  SCHOOL = "SCHOOL",
  CAMPUS = "CAMPUS",
  BUILDING = "BUILDING",
  CLASSROOM = "CLASSROOM",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  EMPLOYEE = "EMPLOYEE",
  RESOURCE = "RESOURCE",
  VEHICLE = "VEHICLE",
  LABORATORY = "LABORATORY",
  LIBRARY = "LIBRARY",
  SPORTS = "SPORTS",
  DORMITORY = "DORMITORY",
  CAFETERIA = "CAFETERIA",
  INFIRMARY = "INFIRMARY",
  TRANSPORT = "TRANSPORT",
}

export enum TwinState {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SIMULATING = "SIMULATING",
  MAINTENANCE = "MAINTENANCE",
  OFFLINE = "OFFLINE",
  ERROR = "ERROR",
  SYNCING = "SYNCING",
}

export enum TwinSyncMode {
  REALTIME = "REALTIME",
  PERIODIC = "PERIODIC",
  ON_DEMAND = "ON_DEMAND",
  EVENT_DRIVEN = "EVENT_DRIVEN",
  BATCH = "BATCH",
}

export enum SimulationType {
  WHAT_IF = "WHAT_IF",
  SCENARIO = "SCENARIO",
  PREDICTIVE = "PREDICTIVE",
  PRESCRIPTIVE = "PRESCRIPTIVE",
  STOCHASTIC = "STOCHASTIC",
  MONTE_CARLO = "MONTE_CARLO",
}

export enum SimulationStatus {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum PredictionModel {
  LINEAR = "LINEAR",
  POLYNOMIAL = "POLYNOMIAL",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  RANDOM_FOREST = "RANDOM_FOREST",
  XGBOOST = "XGBOOST",
  LSTM = "LSTM",
  TRANSFORMER = "TRANSFORMER",
}

export enum PredictionAccuracy {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  EXACT = "EXACT",
}

export enum AlertType {
  THRESHOLD = "THRESHOLD",
  ANOMALY = "ANOMALY",
  PREDICTIVE = "PREDICTIVE",
  PATTERN = "PATTERN",
  CORRELATION = "CORRELATION",
  CASCADE = "CASCADE",
}

export enum AlertPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY",
}

export enum KPIType {
  COUNT = "COUNT",
  PERCENTAGE = "PERCENTAGE",
  RATIO = "RATIO",
  AVERAGE = "AVERAGE",
  SUM = "SUM",
  MIN = "MIN",
  MAX = "MAX",
  TREND = "TREND",
  FORECAST = "FORECAST",
}

export enum KPITrend {
  UP = "UP",
  DOWN = "DOWN",
  STABLE = "STABLE",
  VOLATILE = "VOLATILE",
  CYCLICAL = "CYCLICAL",
  SEASONAL = "SEASONAL",
}

export enum MaintenanceType {
  PREVENTIVE = "PREVENTIVE",
  CORRECTIVE = "CORRECTIVE",
  PREDICTIVE = "PREDICTIVE",
  CONDITION_BASED = "CONDITION_BASED",
  EMERGENCY = "EMERGENCY",
}

export enum MaintenanceStatus {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

export enum AnalyticsType {
  DESCRIPTIVE = "DESCRIPTIVE",
  DIAGNOSTIC = "DIAGNOSTIC",
  PREDICTIVE = "PREDICTIVE",
  PRESCRIPTIVE = "PRESCRIPTIVE",
  COGNITIVE = "COGNITIVE",
}

export enum DataSourceType {
  SENSOR = "SENSOR",
  API = "API",
  DATABASE = "DATABASE",
  FILE = "FILE",
  STREAM = "STREAM",
  WEBHOOK = "WEBHOOK",
  MANUAL = "MANUAL",
}

export enum SensorType {
  TEMPERATURE = "TEMPERATURE",
  HUMIDITY = "HUMIDITY",
  PRESSURE = "PRESSURE",
  MOTION = "MOTION",
  PROXIMITY = "PROXIMITY",
  LIGHT = "LIGHT",
  NOISE = "NOISE",
  AIR_QUALITY = "AIR_QUALITY",
  WATER_LEVEL = "WATER_LEVEL",
  ENERGY = "ENERGY",
  SPEED = "SPEED",
  GPS = "GPS",
  CAMERA = "CAMERA",
  RFID = "RFID",
  NFC = "NFC",
  BLUETOOTH = "BLUETOOTH",
  WIFI = "WIFI",
}

export enum DeviceStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  LOW_BATTERY = "LOW_BATTERY",
  MAINTENANCE = "MAINTENANCE",
  DECOMMISSIONED = "DECOMMISSIONED",
}

export enum EventSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
}

export enum EventType {
  HEALTH = "HEALTH",
  PERFORMANCE = "PERFORMANCE",
  SECURITY = "SECURITY",
  MAINTENANCE = "MAINTENANCE",
  CAPACITY = "CAPACITY",
  USAGE = "USAGE",
  ANOMALY = "ANOMALY",
}

export enum MetricUnit {
  COUNT = "COUNT",
  PERCENTAGE = "PERCENTAGE",
  MB = "MB",
  GB = "GB",
  TB = "TB",
  MS = "MS",
  SEC = "SEC",
  MIN = "MIN",
  HOUR = "HOUR",
  DEGREE = "DEGREE",
  CELSIUS = "CELSIUS",
  FAHRENHEIT = "FAHRENHEIT",
  WATT = "WATT",
  KWH = "KWH",
  METER = "METER",
  KM = "KM",
  MPH = "MPH",
}

export enum TrendDirection {
  INCREASING = "INCREASING",
  DECREASING = "DECREASING",
  STABLE = "STABLE",
  FLUCTUATING = "FLUCTUATING",
  SPIKE = "SPIKE",
  DROP = "DROP",
}

export enum CorrelationType {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  NONE = "NONE",
  STRONG = "STRONG",
  MODERATE = "MODERATE",
  WEAK = "WEAK",
}

export enum ScenarioStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
}

export enum ForecastHorizon {
  HOUR = "HOUR",
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  QUARTER = "QUARTER",
  YEAR = "YEAR",
}

export enum ForecastAccuracy {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum TwinRelationship {
  PARENT = "PARENT",
  CHILD = "CHILD",
  SIBLING = "SIBLING",
  DEPENDS_ON = "DEPENDS_ON",
  FEEDS = "FEEDS",
  MONITORS = "MONITORS",
  CONTROLS = "CONTROLS",
  SIMULATES = "SIMULATES",
}

export enum VisualizationType {
  _2D = "2D",
  _3D = "3D",
  HEATMAP = "HEATMAP",
  TIMELINE = "TIMELINE",
  GRAPH = "GRAPH",
  TABLE = "TABLE",
  CHART = "CHART",
  MAP = "MAP",
}

export enum RealtimeProtocol {
  WEBSOCKET = "WEBSOCKET",
  SSE = "SSE",
  MQTT = "MQTT",
  GRPC_STREAM = "GRPC_STREAM",
  POLLING = "POLLING",
}

export enum DataRetention {
  DAYS_7 = "DAYS_7",
  DAYS_30 = "DAYS_30",
  DAYS_90 = "DAYS_90",
  DAYS_365 = "DAYS_365",
  INFINITE = "INFINITE",
}

export enum CompressionType {
  NONE = "NONE",
  GZIP = "GZIP",
  LZ4 = "LZ4",
  SNAPPY = "SNAPPY",
  ZSTD = "ZSTD",
}

export enum TwinTemplate {
  DEFAULT = "DEFAULT",
  MINISTRY = "MINISTRY",
  SCHOOL = "SCHOOL",
  CLASSROOM = "CLASSROOM",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  TRANSPORT = "TRANSPORT",
  ENERGY = "ENERGY",
  SECURITY = "SECURITY",
}

export enum SimulationEngine {
  DYNAMICS = "DYNAMICS",
  SYSTEM_DYNAMICS = "SYSTEM_DYNAMICS",
  AGENT_BASED = "AGENT_BASED",
  DISCRETE_EVENT = "DISCRETE_EVENT",
  CELLULAR_AUTOMATA = "CELLULAR_AUTOMATA",
  FINITE_ELEMENT = "FINITE_ELEMENT",
}

export enum AIModelType {
  CLASSIFICATION = "CLASSIFICATION",
  REGRESSION = "REGRESSION",
  CLUSTERING = "CLUSTERING",
  ANOMALY_DETECTION = "ANOMALY_DETECTION",
  RECOMMENDATION = "RECOMMENDATION",
  NLP = "NLP",
  COMPUTER_VISION = "COMPUTER_VISION",
  REINFORCEMENT = "REINFORCEMENT",
}

export enum MaintenancePriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  URGENT = "URGENT",
  CRITICAL = "CRITICAL",
}

export enum EnergyType {
  ELECTRICITY = "ELECTRICITY",
  SOLAR = "SOLAR",
  WIND = "WIND",
  BATTERY = "BATTERY",
  DIESEL = "DIESEL",
  GAS = "GAS",
  HYBRID = "HYBRID",
}

export enum WaterType {
  POTABLE = "POTABLE",
  RECYCLED = "RECYCLED",
  RAINWATER = "RAINWATER",
  GROUNDWATER = "GROUNDWATER",
  TREATED = "TREATED",
}

export enum WasteType {
  RECYCLABLE = "RECYCLABLE",
  ORGANIC = "ORGANIC",
  HAZARDOUS = "HAZARDOUS",
  ELECTRONIC = "ELECTRONIC",
  CONSTRUCTION = "CONSTRUCTION",
}

export enum SecurityLevel {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
  TOP_SECRET = "TOP_SECRET",
}

export enum AccessRole {
  VIEWER = "VIEWER",
  OPERATOR = "OPERATOR",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum TwinLifecycle {
  PLANNED = "PLANNED",
  DEPLOYING = "DEPLOYING",
  ACTIVE = "ACTIVE",
  SCALING = "SCALING",
  UPGRADING = "UPGRADING",
  MIGRATING = "MIGRATING",
  RETIRING = "RETIRING",
  DECOMMISSIONED = "DECOMMISSIONED",
}

export enum DataQuality {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
  UNKNOWN = "UNKNOWN",
}

export enum IntegrationStatus {
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  SYNCING = "SYNCING",
  ERROR = "ERROR",
  CONFIGURING = "CONFIGURING",
}

export enum AlertAction {
  NOTHING = "NOTHING",
  ESCALATE = "ESCALATE",
  AUTO_HEAL = "AUTO_HEAL",
  NOTIFY = "NOTIFY",
  LOG = "LOG",
  BLOCK = "BLOCK",
}

export enum PerformanceRating {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  AVERAGE = "AVERAGE",
  POOR = "POOR",
  CRITICAL = "CRITICAL",
}

export enum CapacityStatus {
  AVAILABLE = "AVAILABLE",
  LIMITED = "LIMITED",
  FULL = "FULL",
  OVERLOADED = "OVERLOADED",
  MAINTENANCE = "MAINTENANCE",
}

export enum DigitalTwinStage {
  DESIGN = "DESIGN",
  BUILD = "BUILD",
  TEST = "TEST",
  DEPLOY = "DEPLOY",
  OPERATE = "OPERATE",
  OPTIMIZE = "OPTIMIZE",
  RETIRE = "RETIRE",
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Base & Common
// ──────────────────────────────────────────────

export interface BaseTwin {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: TwinType;
  state: TwinState;
  lifecycle: TwinLifecycle;
  template: TwinTemplate;
  parentId: string | null;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TwinSnapshot {
  id: string;
  twinId: string;
  timestamp: string;
  state: TwinState;
  metrics: TwinMetric[];
  metadata: Record<string, unknown>;
  version: number;
  checksum: string;
}

export interface TwinHistory {
  id: string;
  twinId: string;
  snapshots: TwinSnapshot[];
  startTime: string;
  endTime: string;
  totalSnapshots: number;
  interval: string;
}

export interface TwinEvent {
  id: string;
  twinId: string;
  schoolId: string;
  type: EventType;
  severity: EventSeverity;
  title: string;
  message: string;
  source: string;
  data: Record<string, unknown>;
  acknowledged: boolean;
  acknowledgedBy: string | null;
  acknowledgedAt: string | null;
  resolvedAt: string | null;
  createdAt: string;
}

export interface TwinMetric {
  id: string;
  twinId: string;
  name: string;
  value: number;
  unit: MetricUnit;
  type: KPIType;
  trend: KPITrend;
  threshold: MetricThreshold | null;
  timestamp: string;
  source: string;
}

export interface MetricThreshold {
  min: number | null;
  max: number | null;
  warning: number;
  critical: number;
  unit: MetricUnit;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Entity Twins
// ──────────────────────────────────────────────

export interface MinistryTwin extends BaseTwin {
  type: TwinType.MINISTRY;
  regionCount: number;
  schoolCount: number;
  totalStudents: number;
  totalTeachers: number;
  budget: number;
  policies: MinistryPolicy[];
  regions: string[];
}

export interface MinistryPolicy {
  id: string;
  name: string;
  description: string;
  effectiveDate: string;
  expiryDate: string | null;
  status: "ACTIVE" | "EXPIRED" | "DRAFT";
  complianceRate: number;
}

export interface RegionTwin extends BaseTwin {
  type: TwinType.REGION;
  regionCode: string;
  ministryId: string;
  schoolCount: number;
  totalStudents: number;
  totalTeachers: number;
  schools: string[];
  districts: string[];
  performance: RegionPerformance;
}

export interface RegionPerformance {
  overallScore: number;
  academicScore: number;
  infrastructureScore: number;
  financialScore: number;
  rank: number;
  trend: TrendDirection;
  lastEvaluatedAt: string;
}

export interface SchoolTwin extends BaseTwin {
  type: TwinType.SCHOOL;
  schoolCode: string;
  regionId: string;
  campusCount: number;
  studentCount: number;
  teacherCount: number;
  employeeCount: number;
  classCount: number;
  capacity: SchoolCapacity;
  academics: SchoolAcademics;
  finances: SchoolFinances;
  infrastructure: SchoolInfrastructure;
  campuses: string[];
}

export interface SchoolCapacity {
  maxStudents: number;
  currentStudents: number;
  utilization: number;
  status: CapacityStatus;
  projectedGrowth: number;
  lastAssessedAt: string;
}

export interface SchoolAcademics {
  averageGrade: number;
  passRate: number;
  dropoutRate: number;
  attendanceRate: number;
  teacherStudentRatio: number;
  topPerformingClass: string;
  bottomPerformingClass: string;
  lastEvaluatedAt: string;
}

export interface SchoolFinances {
  annualBudget: number;
  spent: number;
  remaining: number;
  revenue: number;
  expenses: number;
  deficit: number;
  fundingSources: FundingSource[];
  lastEvaluatedAt: string;
}

export interface FundingSource {
  id: string;
  name: string;
  amount: number;
  type: "GOVERNMENT" | "PRIVATE" | "DONATION" | "FEES" | "GRANT";
  status: "ACTIVE" | "PENDING" | "EXPIRED";
}

export interface SchoolInfrastructure {
  totalBuildings: number;
  totalClassrooms: number;
  totalLabs: number;
  totalLibraries: number;
  totalSportsFields: number;
  overallCondition: PerformanceRating;
  lastInspectionDate: string;
  nextInspectionDate: string;
}

export interface CampusTwin extends BaseTwin {
  type: TwinType.CAMPUS;
  schoolId: string;
  campusCode: string;
  buildingCount: number;
  area: number;
  address: string;
  latitude: number;
  longitude: number;
  buildings: string[];
  facilities: CampusFacility[];
}

export interface CampusFacility {
  id: string;
  name: string;
  type: string;
  capacity: number;
  currentUsage: number;
  status: "OPERATIONAL" | "MAINTENANCE" | "CLOSED";
}

export interface BuildingTwin extends BaseTwin {
  type: TwinType.BUILDING;
  campusId: string;
  schoolId: string;
  buildingCode: string;
  floors: number;
  area: number;
  yearBuilt: number;
  condition: PerformanceRating;
  classroomCount: number;
  classrooms: string[];
  energy: BuildingEnergy;
  security: BuildingSecurity;
}

export interface BuildingEnergy {
  totalConsumption: number;
  dailyAverage: number;
  peakHour: number;
  efficiency: number;
  solarPanel: boolean;
  generatorBackup: boolean;
  lastAuditDate: string;
}

export interface BuildingSecurity {
  cameras: number;
  accessPoints: number;
  alarmSystem: boolean;
  fireSystem: boolean;
  lastInspectionDate: string;
  securityRating: PerformanceRating;
}

export interface ClassroomTwin extends BaseTwin {
  type: TwinType.CLASSROOM;
  buildingId: string;
  schoolId: string;
  roomNumber: string;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  area: number;
  equipment: ClassroomEquipment[];
  environmental: ClassroomEnvironment;
  schedule: ClassroomSchedule;
}

export interface ClassroomEquipment {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  lastMaintenance: string;
}

export interface ClassroomEnvironment {
  temperature: number;
  humidity: number;
  lightLevel: number;
  noiseLevel: number;
  airQuality: number;
  co2Level: number;
  lastMeasuredAt: string;
}

export interface ClassroomSchedule {
  currentSubject: string | null;
  currentTeacher: string | null;
  nextClass: string | null;
  nextClassTime: string | null;
  todayClasses: number;
  occupancyRate: number;
}

export interface StudentTwin extends BaseTwin {
  type: TwinType.STUDENT;
  studentId: string;
  schoolId: string;
  classId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  enrollmentDate: string;
  grade: string;
  performance: StudentPerformance;
  attendance: StudentAttendance;
  behavior: StudentBehavior;
  health: StudentHealth;
}

export interface StudentPerformance {
  averageGrade: number;
  gpa: number;
  rank: number;
  totalStudents: number;
  subjects: SubjectScore[];
  trend: TrendDirection;
  lastEvaluatedAt: string;
}

export interface SubjectScore {
  subjectId: string;
  subjectName: string;
  score: number;
  grade: string;
  trend: TrendDirection;
}

export interface StudentAttendance {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  rate: number;
  streak: number;
  lastAbsentDate: string | null;
}

export interface StudentBehavior {
  incidents: number;
  positivePoints: number;
  negativePoints: number;
  overallBehavior: PerformanceRating;
  lastIncidentDate: string | null;
}

export interface StudentHealth {
  bloodType: string | null;
  allergies: string[];
  medications: string[];
  lastCheckup: string;
  bmi: number;
  vaccinationStatus: "COMPLETE" | "PARTIAL" | "NONE";
}

export interface TeacherTwin extends BaseTwin {
  type: TwinType.TEACHER;
  teacherId: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  subjects: string[];
  classIds: string[];
  performance: TeacherPerformance;
  workload: TeacherWorkload;
  certifications: TeacherCertification[];
}

export interface TeacherPerformance {
  overallRating: PerformanceRating;
  studentSatisfaction: number;
  classPassRate: number;
  averageStudentGrade: number;
  attendanceRate: number;
  peerReviewScore: number;
  lastEvaluatedAt: string;
}

export interface TeacherWorkload {
  weeklyHours: number;
  maxHours: number;
  classesCount: number;
  studentCount: number;
  utilization: number;
  overtimeHours: number;
}

export interface TeacherCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  verified: boolean;
}

export interface ParentTwin extends BaseTwin {
  type: TwinType.PARENT;
  parentId: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  childIds: string[];
  communicationPreference: "EMAIL" | "SMS" | "PHONE" | "APP";
  engagement: ParentEngagement;
}

export interface ParentEngagement {
  meetingAttendance: number;
  eventParticipation: number;
  communicationFrequency: number;
  portalLoginCount: number;
  lastInteraction: string;
  score: number;
}

export interface EmployeeTwin extends BaseTwin {
  type: TwinType.EMPLOYEE;
  employeeId: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
  performance: EmployeePerformance;
  attendance: EmployeeAttendance;
}

export interface EmployeePerformance {
  overallRating: PerformanceRating;
  taskCompletion: number;
  punctuality: number;
  supervisorRating: number;
  lastEvaluatedAt: string;
}

export interface EmployeeAttendance {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  rate: number;
  lastAbsentDate: string | null;
}

export interface ResourceTwin extends BaseTwin {
  type: TwinType.RESOURCE;
  resourceId: string;
  schoolId: string;
  category: string;
  quantity: number;
  condition: PerformanceRating;
  location: string;
  cost: number;
  acquisitionDate: string;
  lastMaintenance: string | null;
  nextMaintenance: string | null;
  utilization: ResourceUtilization;
}

export interface ResourceUtilization {
  rate: number;
  hoursUsed: number;
  hoursAvailable: number;
  idleTime: number;
  efficiency: number;
  lastMeasuredAt: string;
}

export interface VehicleTwin extends BaseTwin {
  type: TwinType.VEHICLE;
  vehicleId: string;
  schoolId: string;
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  capacity: number;
  currentPassengers: number;
  routeId: string | null;
  status: "IN_SERVICE" | "IDLE" | "MAINTENANCE" | "RETIRED";
  gps: VehicleGPS;
  maintenance: VehicleMaintenance;
}

export interface VehicleGPS {
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  altitude: number;
  lastUpdated: string;
}

export interface VehicleMaintenance {
  lastService: string;
  nextService: string;
  mileage: number;
  fuelLevel: number;
  tireCondition: PerformanceRating;
  overallCondition: PerformanceRating;
}

export interface LaboratoryTwin extends BaseTwin {
  type: TwinType.LABORATORY;
  labId: string;
  schoolId: string;
  buildingId: string;
  roomNumber: string;
  labType: string;
  capacity: number;
  equipmentCount: number;
  safetyLevel: SecurityLevel;
  equipment: LabEquipment[];
  schedule: LabSchedule;
}

export interface LabEquipment {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  calibrationDate: string | null;
  nextCalibration: string | null;
  value: number;
}

export interface LabSchedule {
  currentSession: string | null;
  nextSession: string | null;
  todaySessions: number;
  utilizationRate: number;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Simulation
// ──────────────────────────────────────────────

export interface Simulation {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  description: string;
  type: SimulationType;
  status: SimulationStatus;
  engine: SimulationEngine;
  config: SimulationConfig;
  result: SimulationResult | null;
  createdBy: string;
  startedAt: string | null;
  completedAt: string | null;
  duration: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface SimulationConfig {
  parameters: Record<string, unknown>;
  timeRange: { start: string; end: string };
  resolution: string;
  iterations: number;
  randomSeed: number | null;
  variables: SimulationVariable[];
  constraints: SimulationConstraint[];
  assumptions: string[];
}

export interface SimulationVariable {
  name: string;
  type: "INPUT" | "OUTPUT" | "INTERMEDIATE";
  dataType: string;
  minValue: number | null;
  maxValue: number | null;
  defaultValue: unknown;
  distribution: string | null;
}

export interface SimulationConstraint {
  name: string;
  expression: string;
  description: string;
  severity: "SOFT" | "HARD";
}

export interface SimulationResult {
  id: string;
  simulationId: string;
  status: SimulationStatus;
  outputs: SimulationOutput[];
  metrics: SimulationMetrics;
  comparison: SimulationComparison | null;
  charts: SimulationChart[];
  exportUrl: string | null;
  completedAt: string;
}

export interface SimulationOutput {
  name: string;
  value: unknown;
  unit: MetricUnit;
  confidence: number;
  timestamp: string;
}

export interface SimulationMetrics {
  executionTime: number;
  memoryUsed: number;
  iterations: number;
  convergenceRate: number;
  errorRate: number;
}

export interface SimulationComparison {
  baselineId: string;
  scenarioId: string;
  differences: SimulationDifference[];
  overallImpact: number;
  recommendation: string;
}

export interface SimulationDifference {
  metric: string;
  baselineValue: number;
  scenarioValue: number;
  changePercent: number;
  significance: "LOW" | "MEDIUM" | "HIGH";
}

export interface SimulationChart {
  id: string;
  type: VisualizationType;
  title: string;
  data: Record<string, unknown>;
  xAxis: string;
  yAxis: string;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Prediction
// ──────────────────────────────────────────────

export interface Prediction {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  description: string;
  model: PredictionModel;
  accuracy: PredictionAccuracy;
  confidence: number;
  horizon: ForecastHorizon;
  inputs: PredictionInput[];
  outputs: PredictionOutput[];
  trainedAt: string;
  expiresAt: string;
  createdAt: string;
}

export interface PredictionInput {
  name: string;
  value: unknown;
  weight: number;
  importance: number;
}

export interface PredictionOutput {
  name: string;
  predictedValue: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
  unit: MetricUnit;
}

export interface PredictionModelConfig {
  id: string;
  name: string;
  type: PredictionModel;
  hyperparameters: Record<string, unknown>;
  features: string[];
  target: string;
  trainingDataSize: number;
  validationDataSize: number;
  testDataSize: number;
  metrics: ModelMetrics;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rmse: number;
  mae: number;
  r2: number;
  auc: number;
}

export interface PredictionResult {
  id: string;
  predictionId: string;
  timestamp: string;
  inputs: Record<string, unknown>;
  outputs: PredictionOutput[];
  actualValues: Record<string, number> | null;
  error: number | null;
  modelVersion: string;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Alerts & KPIs
// ──────────────────────────────────────────────

export interface TwinAlert {
  id: string;
  schoolId: string;
  twinId: string;
  type: AlertType;
  priority: AlertPriority;
  title: string;
  message: string;
  description: string;
  source: string;
  metric: string;
  currentValue: number;
  thresholdValue: number;
  action: AlertAction;
  acknowledged: boolean;
  acknowledgedBy: string | null;
  acknowledgedAt: string | null;
  resolvedAt: string | null;
  escalationLevel: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface TwinKPI {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  description: string;
  type: KPIType;
  value: number;
  target: number;
  unit: MetricUnit;
  trend: KPITrend;
  trendPercentage: number;
  status: PerformanceRating;
  history: KPIHistory[];
  lastCalculatedAt: string;
}

export interface KPIHistory {
  date: string;
  value: number;
  target: number;
  status: PerformanceRating;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Analytics
// ──────────────────────────────────────────────

export interface TwinAnalytics {
  id: string;
  schoolId: string;
  twinId: string;
  type: AnalyticsType;
  name: string;
  description: string;
  data: AnalyticsData;
  insights: AnalyticsInsight[];
  visualizations: AnalyticsVisualization[];
  generatedAt: string;
  expiresAt: string;
}

export interface AnalyticsData {
  summary: Record<string, number>;
  details: Record<string, unknown>[];
  aggregations: AnalyticsAggregation[];
  filters: AnalyticsFilter[];
}

export interface AnalyticsAggregation {
  field: string;
  operation: "COUNT" | "SUM" | "AVG" | "MIN" | "MAX" | "DISTINCT";
  result: number;
}

export interface AnalyticsFilter {
  field: string;
  operator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE" | "IN" | "LIKE";
  value: unknown;
}

export interface AnalyticsInsight {
  id: string;
  type: "TREND" | "ANOMALY" | "CORRELATION" | "PATTERN" | "PREDICTION";
  title: string;
  description: string;
  confidence: number;
  impact: "LOW" | "MEDIUM" | "HIGH";
  recommendation: string;
  data: Record<string, unknown>;
}

export interface AnalyticsVisualization {
  id: string;
  type: VisualizationType;
  title: string;
  config: Record<string, unknown>;
  dataSource: string;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Maintenance
// ──────────────────────────────────────────────

export interface TwinMaintenance {
  id: string;
  schoolId: string;
  twinId: string;
  type: MaintenanceType;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  title: string;
  description: string;
  assignedTo: string | null;
  scheduledDate: string;
  startedAt: string | null;
  completedAt: string | null;
  estimatedDuration: number;
  actualDuration: number | null;
  cost: number;
  parts: MaintenancePart[];
  logs: TwinMaintenanceLog[];
  createdAt: string;
  updatedAt: string;
}

export interface MaintenancePart {
  id: string;
  name: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  supplier: string;
}

export interface TwinMaintenanceLog {
  id: string;
  maintenanceId: string;
  action: string;
  notes: string;
  performedBy: string;
  timestamp: string;
}

export interface TwinMaintenanceSchedule {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  type: MaintenanceType;
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  nextRun: string;
  lastRun: string | null;
  active: boolean;
  config: Record<string, unknown>;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Sensors
// ──────────────────────────────────────────────

export interface TwinSensor {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  type: SensorType;
  status: DeviceStatus;
  model: string;
  manufacturer: string;
  installDate: string;
  lastCalibration: string | null;
  nextCalibration: string | null;
  location: SensorLocation;
  config: SensorConfig;
  batteryLevel: number;
  signalStrength: number;
}

export interface SensorLocation {
  buildingId: string | null;
  classroomId: string | null;
  floor: number | null;
  x: number | null;
  y: number | null;
  z: number | null;
  description: string;
}

export interface SensorConfig {
  samplingRate: number;
  unit: MetricUnit;
  minThreshold: number | null;
  maxThreshold: number | null;
  alertEnabled: boolean;
  dataRetention: DataRetention;
  compression: CompressionType;
}

export interface TwinSensorData {
  id: string;
  sensorId: string;
  value: number;
  unit: MetricUnit;
  quality: DataQuality;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface TwinSensorAlert {
  id: string;
  sensorId: string;
  twinId: string;
  type: AlertType;
  priority: AlertPriority;
  message: string;
  value: number;
  threshold: number;
  acknowledged: boolean;
  createdAt: string;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Relationships
// ──────────────────────────────────────────────

export interface TwinRelationshipRecord {
  id: string;
  schoolId: string;
  sourceTwinId: string;
  targetTwinId: string;
  type: TwinRelationship;
  strength: number;
  bidirectional: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface TwinDependency {
  id: string;
  twinId: string;
  dependsOnTwinId: string;
  type: "HARD" | "SOFT";
  criticality: "LOW" | "MEDIUM" | "HIGH";
  impactOnFailure: string;
  status: "ACTIVE" | "BROKEN" | "DEGRADED";
}

export interface TwinImpact {
  id: string;
  sourceTwinId: string;
  targetTwinId: string;
  impactType: "PERFORMANCE" | "COST" | "AVAILABILITY" | "SECURITY";
  severity: EventSeverity;
  probability: number;
  estimatedImpact: number;
  mitigationStrategy: string;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Visualization
// ──────────────────────────────────────────────

export interface TwinVisualization {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  description: string;
  type: VisualizationType;
  config: Record<string, unknown>;
  dataSource: string;
  refreshInterval: number;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TwinDashboard {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  layout: DashboardLayout;
  widgets: DashboardWidget[];
  isDefault: boolean;
  sharedWith: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardLayout {
  columns: number;
  rows: number;
  grid: DashboardGrid[];
}

export interface DashboardGrid {
  widgetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DashboardWidget {
  id: string;
  type: "CHART" | "TABLE" | "KPI" | "ALERT" | "MAP" | "GAUGE" | "THERMOMETER" | "STATUS";
  title: string;
  config: Record<string, unknown>;
  twinIds: string[];
  refreshInterval: number;
}

export interface TwinReport {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "ANNUAL" | "CUSTOM";
  format: "PDF" | "HTML" | "CSV" | "JSON";
  config: Record<string, unknown>;
  schedule: string | null;
  lastGenerated: string | null;
  nextGeneration: string | null;
  recipients: string[];
  createdBy: string;
  createdAt: string;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — AI
// ──────────────────────────────────────────────

export interface TwinAI {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  description: string;
  modelType: AIModelType;
  status: "TRAINING" | "READY" | "RUNNING" | "ERROR" | "DEPRECATED";
  model: TwinAIModelConfig;
  lastPrediction: string | null;
  accuracy: number;
  createdAt: string;
  updatedAt: string;
}

export interface TwinAIModelConfig {
  version: string;
  framework: string;
  hyperparameters: Record<string, unknown>;
  features: string[];
  target: string;
  trainingMetrics: ModelMetrics;
  validationMetrics: ModelMetrics;
  modelSize: number;
  inferenceTime: number;
}

export interface TwinAIPrediction {
  id: string;
  aiId: string;
  twinId: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  confidence: number;
  explanation: string;
  modelVersion: string;
  latency: number;
  createdAt: string;
}

export interface TwinAIRecommendation {
  id: string;
  aiId: string;
  twinId: string;
  type: "OPTIMIZATION" | "WARNING" | "SUGGESTION" | "PREDICTION";
  title: string;
  description: string;
  impact: "LOW" | "MEDIUM" | "HIGH";
  confidence: number;
  actionable: boolean;
  actionUrl: string | null;
  metadata: Record<string, unknown>;
  status: "NEW" | "READ" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  createdAt: string;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Forecast
// ──────────────────────────────────────────────

export interface TwinForecast {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  metric: string;
  horizon: ForecastHorizon;
  accuracy: ForecastAccuracy;
  values: ForecastValue[];
  confidenceInterval: number;
  model: PredictionModel;
  generatedAt: string;
  expiresAt: string;
}

export interface ForecastValue {
  date: string;
  predicted: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Scenarios & What-If
// ──────────────────────────────────────────────

export interface TwinScenario {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  description: string;
  status: ScenarioStatus;
  type: SimulationType;
  parameters: Record<string, unknown>;
  assumptions: string[];
  expectedOutcome: string;
  actualOutcome: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TwinWhatIf {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  description: string;
  variable: string;
  currentValue: number;
  testValues: WhatIfTestValue[];
  results: WhatIfResult[];
  createdBy: string;
  createdAt: string;
}

export interface WhatIfTestValue {
  value: number;
  unit: MetricUnit;
  description: string;
}

export interface WhatIfResult {
  testValue: number;
  outcome: Record<string, number>;
  impact: number;
  recommendation: string;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Performance & Capacity
// ──────────────────────────────────────────────

export interface TwinPerformance {
  id: string;
  twinId: string;
  schoolId: string;
  rating: PerformanceRating;
  score: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
  uptime: number;
  availability: number;
  metrics: PerformanceMetric[];
  history: PerformanceHistory[];
  lastEvaluatedAt: string;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: MetricUnit;
  target: number;
  status: PerformanceRating;
  trend: TrendDirection;
}

export interface PerformanceHistory {
  date: string;
  score: number;
  rating: PerformanceRating;
}

export interface TwinCapacity {
  id: string;
  twinId: string;
  schoolId: string;
  type: "STORAGE" | "COMPUTE" | "NETWORK" | "MEMORY" | "USERS" | "CONNECTIONS";
  total: number;
  used: number;
  available: number;
  unit: MetricUnit;
  utilization: number;
  status: CapacityStatus;
  threshold: CapacityThreshold;
  projections: CapacityProjection[];
  lastMeasuredAt: string;
}

export interface CapacityThreshold {
  warning: number;
  critical: number;
  maximum: number;
}

export interface CapacityProjection {
  date: string;
  projectedUsage: number;
  confidence: number;
  status: CapacityStatus;
}

export interface TwinUtilization {
  id: string;
  twinId: string;
  schoolId: string;
  resource: string;
  totalCapacity: number;
  usedCapacity: number;
  utilizationRate: number;
  peakUsage: number;
  averageUsage: number;
  idleTime: number;
  efficiency: number;
  trend: TrendDirection;
  period: string;
  lastMeasuredAt: string;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Sustainability
// ──────────────────────────────────────────────

export interface TwinEnergy {
  id: string;
  schoolId: string;
  twinId: string;
  type: EnergyType;
  totalConsumption: number;
  dailyAverage: number;
  peakDemand: number;
  efficiency: number;
  cost: number;
  carbonEmissions: number;
  renewablePercentage: number;
  sources: EnergySource[];
  history: EnergyHistory[];
  lastMeasuredAt: string;
}

export interface EnergySource {
  type: EnergyType;
  capacity: number;
  currentOutput: number;
  efficiency: number;
  costPerKwh: number;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
}

export interface EnergyHistory {
  date: string;
  consumption: number;
  cost: number;
  carbonEmissions: number;
  renewablePercentage: number;
}

export interface TwinWater {
  id: string;
  schoolId: string;
  twinId: string;
  type: WaterType;
  totalConsumption: number;
  dailyAverage: number;
  cost: number;
  quality: DataQuality;
  sources: WaterSource[];
  history: WaterHistory[];
  lastMeasuredAt: string;
}

export interface WaterSource {
  type: WaterType;
  capacity: number;
  currentLevel: number;
  quality: DataQuality;
  costPerLiter: number;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
}

export interface WaterHistory {
  date: string;
  consumption: number;
  cost: number;
  quality: DataQuality;
}

export interface TwinWaste {
  id: string;
  schoolId: string;
  twinId: string;
  type: WasteType;
  totalGenerated: number;
  recycled: number;
  disposed: number;
  recyclingRate: number;
  cost: number;
  history: WasteHistory[];
  lastMeasuredAt: string;
}

export interface WasteHistory {
  date: string;
  generated: number;
  recycled: number;
  disposed: number;
  recyclingRate: number;
}

export interface TwinCarbon {
  id: string;
  schoolId: string;
  twinId: string;
  totalEmissions: number;
  scope1Emissions: number;
  scope2Emissions: number;
  scope3Emissions: number;
  offset: number;
  netEmissions: number;
  target: number;
  reductionPlan: string;
  history: CarbonHistory[];
  lastMeasuredAt: string;
}

export interface CarbonHistory {
  date: string;
  totalEmissions: number;
  scope1: number;
  scope2: number;
  scope3: number;
  offset: number;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Security
// ──────────────────────────────────────────────

export interface TwinSecurity {
  id: string;
  schoolId: string;
  twinId: string;
  level: SecurityLevel;
  score: number;
  vulnerabilities: SecurityVulnerability[];
  accessControls: TwinAccess[];
  auditLogs: TwinAuditLog[];
  lastScanAt: string;
  nextScanAt: string;
}

export interface SecurityVulnerability {
  id: string;
  severity: EventSeverity;
  title: string;
  description: string;
  cve: string | null;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "FALSE_POSITIVE";
  discoveredAt: string;
  resolvedAt: string | null;
  mitigation: string;
}

export interface TwinAccess {
  id: string;
  twinId: string;
  userId: string;
  role: AccessRole;
  permissions: AccessPermission[];
  grantedBy: string;
  grantedAt: string;
  expiresAt: string | null;
  lastAccessed: string | null;
}

export interface AccessPermission {
  resource: string;
  actions: ("READ" | "WRITE" | "DELETE" | "EXECUTE" | "ADMIN")[];
}

export interface TwinAuditLog {
  id: string;
  twinId: string;
  schoolId: string;
  userId: string;
  action: string;
  resource: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Integration
// ──────────────────────────────────────────────

export interface TwinIntegration {
  id: string;
  schoolId: string;
  twinId: string;
  name: string;
  type: DataSourceType;
  status: IntegrationStatus;
  endpoint: string;
  config: Record<string, unknown>;
  syncMode: TwinSyncMode;
  syncInterval: number;
  lastSyncAt: string | null;
  nextSyncAt: string | null;
  errorCount: number;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TwinSync {
  id: string;
  integrationId: string;
  twinId: string;
  direction: "INBOUND" | "OUTBOUND" | "BIDIRECTIONAL";
  status: IntegrationStatus;
  recordsProcessed: number;
  recordsFailed: number;
  startedAt: string;
  completedAt: string | null;
  duration: number | null;
  errors: SyncError[];
}

export interface SyncError {
  recordId: string;
  field: string;
  message: string;
  severity: EventSeverity;
}

export interface TwinMapping {
  id: string;
  sourceTwinId: string;
  targetTwinId: string;
  sourceField: string;
  targetField: string;
  transform: string | null;
  required: boolean;
  defaultValue: unknown | null;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Templates & Plugins
// ──────────────────────────────────────────────

export interface TwinTemplateRecord {
  id: string;
  name: string;
  type: TwinTemplate;
  description: string;
  version: string;
  schema: Record<string, unknown>;
  defaults: Record<string, unknown>;
  metrics: string[];
  alerts: string[];
  visualizations: string[];
  isPublic: boolean;
  usageCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TwinPlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  type: "METRIC" | "ALERT" | "VISUALIZATION" | "INTEGRATION" | "AI" | "SIMULATION";
  config: TwinPluginConfig;
  metrics: TwinPluginMetrics;
  status: "ACTIVE" | "INACTIVE" | "DEPRECATED";
  installedAt: string;
  updatedAt: string;
}

export interface TwinPluginConfig {
  settings: Record<string, unknown>;
  schema: Record<string, unknown>;
  requiredPermissions: string[];
  dependencies: string[];
  compatibility: {
    minVersion: string;
    maxVersion: string;
  };
}

export interface TwinPluginMetrics {
  usageCount: number;
  lastUsedAt: string | null;
  averageExecutionTime: number;
  errorRate: number;
  rating: number;
}

export interface TwinPluginVersion {
  id: string;
  pluginId: string;
  version: string;
  changelog: string;
  downloadUrl: string;
  size: number;
  publishedAt: string;
  isLatest: boolean;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Event System
// ──────────────────────────────────────────────

export interface TwinEventTypeRecord {
  id: string;
  name: string;
  type: EventType;
  severity: EventSeverity;
  description: string;
  schema: Record<string, unknown>;
  defaultAction: AlertAction;
  escalationPolicy: EscalationPolicy;
  active: boolean;
}

export interface EscalationPolicy {
  levels: EscalationLevel[];
  timeoutMinutes: number;
  repeatInterval: number;
}

export interface EscalationLevel {
  level: number;
  assignees: string[];
  actions: AlertAction[];
  timeoutMinutes: number;
}

export interface TwinEventSource {
  id: string;
  name: string;
  type: "SENSOR" | "API" | "MANUAL" | "SYSTEM" | "EXTERNAL";
  status: "ACTIVE" | "INACTIVE" | "ERROR";
  reliability: number;
  lastEventAt: string | null;
  eventsPerMinute: number;
  config: Record<string, unknown>;
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Additional Enums
// ──────────────────────────────────────────────

export enum TwinLayer {
  PHYSICAL = "PHYSICAL",
  LOGICAL = "LOGICAL",
  FUNCTIONAL = "FUNCTIONAL",
  DATA = "DATA",
  PRESENTATION = "PRESENTATION",
}

export enum SyncConflictResolution {
  LAST_WRITE = "LAST_WRITE",
  FIRST_WRITE = "FIRST_WRITE",
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
  MERGE = "MERGE",
}

export enum DataFlowDirection {
  UNIDIRECTIONAL = "UNIDIRECTIONAL",
  BIDIRECTIONAL = "BIDIRECTIONAL",
  MULTICAST = "MULTICAST",
}

export enum TwinHealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY",
  UNKNOWN = "UNKNOWN",
}

export enum AnomalyType {
  POINT = "POINT",
  CONTEXTUAL = "CONTEXTUAL",
  COLLECTIVE = "COLLECTIVE",
  PATTERN = "PATTERN",
  SEASONAL = "SEASONAL",
}

export enum OptimizationGoal {
  MINIMIZE_COST = "MINIMIZE_COST",
  MAXIMIZE_EFFICIENCY = "MAXIMIZE_EFFICIENCY",
  BALANCE = "BALANCE",
  MAXIMIZE_SATISFACTION = "MAXIMIZE_SATISFACTION",
  MINIMIZE_RISK = "MINIMIZE_RISK",
}

export enum TwinScope {
  GLOBAL = "GLOBAL",
  SCHOOL = "SCHOOL",
  DEPARTMENT = "DEPARTMENT",
  CLASS = "CLASS",
  INDIVIDUAL = "INDIVIDUAL",
}

export enum ChangeType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  ARCHIVE = "ARCHIVE",
  RESTORE = "RESTORE",
}

export enum DataFormat {
  JSON = "JSON",
  CSV = "CSV",
  XML = "XML",
  PARQUET = "PARQUET",
  AVRO = "AVRO",
  PROTOBUF = "PROTOBUF",
}

export enum NotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  WEBHOOK = "WEBHOOK",
  IN_APP = "IN_APP",
  SLACK = "SLACK",
}

export enum ReportFormat {
  PDF = "PDF",
  HTML = "HTML",
  CSV = "CSV",
  XLSX = "XLSX",
  JSON = "JSON",
}

export enum TimeGranularity {
  REALTIME = "REALTIME",
  MINUTE = "MINUTE",
  HOUR = "HOUR",
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
}

export enum AggregationType {
  SUM = "SUM",
  AVG = "AVG",
  MIN = "MIN",
  MAX = "MAX",
  COUNT = "COUNT",
  DISTINCT = "DISTINCT",
  MEDIAN = "MEDIAN",
}

export enum TwinPermission {
  VIEW = "VIEW",
  EDIT = "EDIT",
  DELETE = "DELETE",
  SIMULATE = "SIMULATE",
  EXPORT = "EXPORT",
  SHARE = "SHARE",
  ADMIN = "ADMIN",
}

// ──────────────────────────────────────────────
// Digital Twin Platform — Additional Interfaces
// ──────────────────────────────────────────────

export interface TwinConfig {
  id: string;
  twinId: string;
  schoolId: string;
  layer: TwinLayer;
  scope: TwinScope;
  permissions: TwinPermission[];
  syncMode: TwinSyncMode;
  dataRetention: DataRetention;
  compression: CompressionType;
  realtimeProtocol: RealtimeProtocol;
  visualizationTypes: VisualizationType[];
  alertConfig: TwinAlertConfig;
  createdAt: string;
  updatedAt: string;
}

export interface TwinAlertConfig {
  enabled: boolean;
  channels: NotificationChannel[];
  quietHoursStart: string | null;
  quietHoursEnd: string | null;
  escalationEnabled: boolean;
  maxAlertsPerHour: number;
  deduplicationWindow: number;
}

export interface TwinChangeLog {
  id: string;
  twinId: string;
  schoolId: string;
  changeType: ChangeType;
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changedBy: string;
  reason: string;
  timestamp: string;
}

export interface TwinDataFlow {
  id: string;
  sourceTwinId: string;
  targetTwinId: string;
  direction: DataFlowDirection;
  dataFormat: DataFormat;
  frequency: string;
  lastTransferAt: string | null;
  totalRecordsTransferred: number;
  errorCount: number;
  status: IntegrationStatus;
}

export interface TwinHealth {
  twinId: string;
  schoolId: string;
  status: TwinHealthStatus;
  score: number;
  lastCheckAt: string;
  uptime: number;
  responseTime: number;
  errorRate: number;
  components: TwinHealthComponent[];
}

export interface TwinHealthComponent {
  name: string;
  status: TwinHealthStatus;
  latency: number;
  errorRate: number;
  lastCheckAt: string;
}

export interface TwinAnomaly {
  id: string;
  twinId: string;
  schoolId: string;
  type: AnomalyType;
  severity: EventSeverity;
  metric: string;
  expectedValue: number;
  actualValue: number;
  deviation: number;
  confidence: number;
  detectedAt: string;
  acknowledged: boolean;
  resolvedAt: string | null;
  rootCause: string | null;
}

export interface TwinOptimization {
  id: string;
  twinId: string;
  schoolId: string;
  goal: OptimizationGoal;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  parameters: Record<string, unknown>;
  recommendations: OptimizationRecommendation[];
  estimatedSavings: number;
  confidence: number;
  createdAt: string;
  completedAt: string | null;
}

export interface OptimizationRecommendation {
  id: string;
  title: string;
  description: string;
  impact: number;
  effort: "LOW" | "MEDIUM" | "HIGH";
  confidence: number;
  implementationSteps: string[];
  status: "NEW" | "ACCEPTED" | "IMPLEMENTED" | "REJECTED";
}

export interface TwinNotification {
  id: string;
  twinId: string;
  schoolId: string;
  channel: NotificationChannel;
  title: string;
  message: string;
  data: Record<string, unknown>;
  sentAt: string;
  deliveredAt: string | null;
  readAt: string | null;
  status: "PENDING" | "SENT" | "DELIVERED" | "READ" | "FAILED";
}

export interface TwinAggregation {
  id: string;
  twinId: string;
  schoolId: string;
  metric: string;
  aggregationType: AggregationType;
  granularity: TimeGranularity;
  value: number;
  periodStart: string;
  periodEnd: string;
  sampleCount: number;
}

export interface TwinTimeSeries {
  id: string;
  twinId: string;
  metric: string;
  dataPoints: TimeSeriesDataPoint[];
  granularity: TimeGranularity;
  startTime: string;
  endTime: string;
  totalPoints: number;
}

export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
  quality: DataQuality;
  metadata: Record<string, unknown>;
}

export interface TwinCorrelation {
  id: string;
  twinId: string;
  schoolId: string;
  metric1: string;
  metric2: string;
  type: CorrelationType;
  coefficient: number;
  significance: number;
  sampleSize: number;
  timeRange: { start: string; end: string };
  detectedAt: string;
}

export interface TwinBenchmark {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  metrics: BenchmarkMetric[];
  schoolRank: number;
  totalSchools: number;
  percentile: number;
  calculatedAt: string;
}

export interface BenchmarkMetric {
  name: string;
  schoolValue: number;
  averageValue: number;
  bestValue: number;
  worstValue: number;
  unit: MetricUnit;
  rank: number;
}

export interface TwinProjection {
  id: string;
  twinId: string;
  schoolId: string;
  metric: string;
  current: number;
  projected: ProjectionValue[];
  confidence: number;
  model: PredictionModel;
  generatedAt: string;
}

export interface ProjectionValue {
  date: string;
  value: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
}

export interface TwinConstraint {
  id: string;
  twinId: string;
  schoolId: string;
  name: string;
  description: string;
  expression: string;
  type: "HARD" | "SOFT";
  active: boolean;
  violatedCount: number;
  lastViolatedAt: string | null;
  createdAt: string;
}

export interface TwinDependencyGraph {
  nodes: DependencyGraphNode[];
  edges: DependencyGraphEdge[];
  criticalPath: string[];
  totalDependencies: number;
  maxDepth: number;
}

export interface DependencyGraphNode {
  id: string;
  twinId: string;
  name: string;
  type: TwinType;
  state: TwinState;
  criticality: "LOW" | "MEDIUM" | "HIGH";
}

export interface DependencyGraphEdge {
  source: string;
  target: string;
  type: TwinRelationship;
  weight: number;
}

export interface TwinGovernance {
  id: string;
  schoolId: string;
  twinId: string;
  policy: GovernancePolicy;
  compliance: GovernanceCompliance;
  lastAuditAt: string;
  nextAuditAt: string;
}

export interface GovernancePolicy {
  name: string;
  description: string;
  rules: GovernanceRule[];
  effectiveDate: string;
  expiryDate: string | null;
}

export interface GovernanceRule {
  id: string;
  name: string;
  description: string;
  expression: string;
  severity: "WARNING" | "ERROR" | "CRITICAL";
  action: AlertAction;
}

export interface GovernanceCompliance {
  overallScore: number;
  rulesCompliant: number;
  rulesTotal: number;
  violations: GovernanceViolation[];
  lastCheckedAt: string;
}

export interface GovernanceViolation {
  ruleId: string;
  ruleName: string;
  severity: EventSeverity;
  message: string;
  detectedAt: string;
  resolvedAt: string | null;
}

export interface TwinLifecycleEvent {
  id: string;
  twinId: string;
  schoolId: string;
  fromStage: DigitalTwinStage;
  toStage: DigitalTwinStage;
  triggeredBy: string;
  reason: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}

export interface TwinMetadata {
  twinId: string;
  schoolId: string;
  version: string;
  tags: string[];
  customFields: Record<string, unknown>;
  labels: Record<string, string>;
  annotations: Record<string, string>;
  owner: string;
  team: string;
  costCenter: string;
  lastReviewedAt: string;
  nextReviewAt: string;
}

export interface TwinVersion {
  id: string;
  twinId: string;
  version: string;
  changelog: string;
  snapshot: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
  isActive: boolean;
}

export interface TwinExport {
  id: string;
  twinId: string;
  schoolId: string;
  format: ReportFormat;
  scope: string[];
  status: "PENDING" | "GENERATING" | "COMPLETED" | "FAILED";
  downloadUrl: string | null;
  fileSize: number | null;
  expiresAt: string | null;
  requestedBy: string;
  createdAt: string;
}

export interface TwinImport {
  id: string;
  twinId: string;
  schoolId: string;
  format: DataFormat;
  source: string;
  status: "PENDING" | "VALIDATING" | "IMPORTING" | "COMPLETED" | "FAILED";
  recordsTotal: number;
  recordsProcessed: number;
  recordsFailed: number;
  errors: ImportError[];
  requestedBy: string;
  createdAt: string;
  completedAt: string | null;
}

export interface ImportError {
  row: number;
  field: string;
  message: string;
  value: unknown;
}

export interface TwinTag {
  id: string;
  name: string;
  color: string;
  description: string;
  twinCount: number;
  createdAt: string;
}

export interface TwinSearch {
  query: string;
  filters: TwinSearchFilter[];
  results: TwinSearchResult[];
  totalCount: number;
  page: number;
  pageSize: number;
  tookMs: number;
}

export interface TwinSearchFilter {
  field: string;
  operator: "EQ" | "NEQ" | "CONTAINS" | "IN" | "RANGE";
  value: unknown;
}

export interface TwinSearchResult {
  twinId: string;
  name: string;
  type: TwinType;
  score: number;
  highlights: Record<string, string>;
  metadata: Record<string, unknown>;
}

export interface TwinComparison {
  id: string;
  schoolId: string;
  twinIds: string[];
  name: string;
  description: string;
  metrics: ComparisonMetric[];
  summary: string;
  createdAt: string;
}

export interface ComparisonMetric {
  name: string;
  values: ComparisonValue[];
  winner: string | null;
  spread: number;
}

export interface ComparisonValue {
  twinId: string;
  twinName: string;
  value: number;
  rank: number;
  unit: MetricUnit;
}

export interface TwinSimulationScenario {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  variables: SimulationScenarioVariable[];
  constraints: SimulationConstraint[];
  objectives: SimulationObjective[];
  status: ScenarioStatus;
  createdBy: string;
  createdAt: string;
}

export interface SimulationScenarioVariable {
  name: string;
  type: "CONTINUOUS" | "DISCRETE" | "CATEGORICAL";
  range: { min: number; max: number } | null;
  categories: string[] | null;
  currentValue: unknown;
}

export interface SimulationObjective {
  name: string;
  type: "MAXIMIZE" | "MINIMIZE" | "TARGET";
  target: number | null;
  weight: number;
}

export interface TwinAIInsight {
  id: string;
  aiId: string;
  twinId: string;
  schoolId: string;
  type: "PATTERN" | "ANOMALY" | "PREDICTION" | "RECOMMENDATION" | "CORRELATION";
  title: string;
  description: string;
  confidence: number;
  evidence: Record<string, unknown>[];
  actionable: boolean;
  priority: AlertPriority;
  generatedAt: string;
  expiresAt: string;
  status: "NEW" | "READ" | "ACTED_ON" | "EXPIRED";
}

export interface TwinAIConfig {
  id: string;
  twinId: string;
  schoolId: string;
  models: AIModelType[];
  autoRetrain: boolean;
  retrainInterval: string;
  dataWindow: string;
  minDataPoints: number;
  confidenceThreshold: number;
  lastTrainedAt: string | null;
  nextTrainingAt: string | null;
}

export interface TwinRealtimeStream {
  id: string;
  twinId: string;
  schoolId: string;
  protocol: RealtimeProtocol;
  topic: string;
  status: "ACTIVE" | "INACTIVE" | "ERROR";
  subscribers: number;
  messagesPerSecond: number;
  lastMessageAt: string | null;
  totalMessages: number;
  config: Record<string, unknown>;
}

export interface TwinCache {
  id: string;
  twinId: string;
  schoolId: string;
  key: string;
  value: unknown;
  ttl: number;
  hits: number;
  misses: number;
  createdAt: string;
  expiresAt: string;
  lastAccessedAt: string;
}

export interface TwinRateLimit {
  id: string;
  twinId: string;
  schoolId: string;
  endpoint: string;
  maxRequests: number;
  windowMs: number;
  currentRequests: number;
  blockedRequests: number;
  lastResetAt: string;
}

export interface TwinWebhook {
  id: string;
  schoolId: string;
  twinId: string;
  url: string;
  secret: string;
  events: EventType[];
  active: boolean;
  lastTriggeredAt: string | null;
  successCount: number;
  failureCount: number;
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TwinAPIKey {
  id: string;
  schoolId: string;
  name: string;
  key: string;
  permissions: TwinPermission[];
  rateLimit: number;
  expiresAt: string | null;
  lastUsedAt: string | null;
  active: boolean;
  createdBy: string;
  createdAt: string;
}

export interface TwinBackup {
  id: string;
  twinId: string;
  schoolId: string;
  type: "FULL" | "INCREMENTAL" | "DIFFERENTIAL";
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  size: number;
  downloadUrl: string | null;
  expiresAt: string;
  createdBy: string;
  createdAt: string;
  completedAt: string | null;
}

export interface TwinRestore {
  id: string;
  backupId: string;
  twinId: string;
  schoolId: string;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  progress: number;
  requestedBy: string;
  createdAt: string;
  completedAt: string | null;
}

export interface TwinCostAnalysis {
  id: string;
  twinId: string;
  schoolId: string;
  category: "INFRASTRUCTURE" | "ENERGY" | "WATER" | "MAINTENANCE" | "PERSONNEL" | "SOFTWARE" | "HARDWARE";
  totalCost: number;
  monthlyAverage: number;
  costPerStudent: number;
  costPerClassroom: number;
  trend: TrendDirection;
  breakdown: CostBreakdownItem[];
  period: { start: string; end: string };
  lastCalculatedAt: string;
}

export interface CostBreakdownItem {
  name: string;
  amount: number;
  percentage: number;
  trend: TrendDirection;
}

export interface TwinRiskAssessment {
  id: string;
  twinId: string;
  schoolId: string;
  category: "OPERATIONAL" | "FINANCIAL" | "COMPLIANCE" | "SECURITY" | "REPUTATIONAL" | "ENVIRONMENTAL";
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  score: number;
  probability: number;
  impact: number;
  mitigation: string;
  owner: string;
  status: "IDENTIFIED" | "MITIGATING" | "ACCEPTED" | "CLOSED";
  lastReviewedAt: string;
  nextReviewAt: string;
}

export interface TwinSLA {
  id: string;
  twinId: string;
  schoolId: string;
  name: string;
  description: string;
  target: number;
  actual: number;
  unit: MetricUnit;
  status: "MET" | "BREACHED" | "AT_RISK";
  period: string;
  history: SLAHistory[];
  penalties: SLAPenalty[];
  lastEvaluatedAt: string;
}

export interface SLAHistory {
  date: string;
  target: number;
  actual: number;
  status: "MET" | "BREACHED";
}

export interface SLAPenalty {
  breachDate: string;
  severity: EventSeverity;
  amount: number;
  description: string;
}

export interface TwinCapacityPlan {
  id: string;
  schoolId: string;
  twinId: string;
  resource: string;
  currentCapacity: number;
  projectedDemand: CapacityProjection[];
  expansionOptions: CapacityExpansion[];
  budget: number;
  timeline: string;
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
}

export interface CapacityExpansion {
  id: string;
  option: string;
  cost: number;
  additionalCapacity: number;
  timeline: string;
  roi: number;
  recommended: boolean;
}

export interface TwinSchedule {
  id: string;
  twinId: string;
  schoolId: string;
  name: string;
  type: "MAINTENANCE" | "SYNC" | "BACKUP" | "REPORT" | "OPTIMIZATION" | "TRAINING";
  cronExpression: string;
  timezone: string;
  active: boolean;
  lastRunAt: string | null;
  nextRunAt: string | null;
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TwinLog {
  id: string;
  twinId: string;
  schoolId: string;
  level: "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";
  message: string;
  source: string;
  context: Record<string, unknown>;
  stackTrace: string | null;
  timestamp: string;
}

export interface TwinLatency {
  id: string;
  twinId: string;
  schoolId: string;
  operation: string;
  p50: number;
  p90: number;
  p95: number;
  p99: number;
  max: number;
  avg: number;
  sampleCount: number;
  period: { start: string; end: string };
  measuredAt: string;
}

export interface TwinThroughput {
  id: string;
  twinId: string;
  schoolId: string;
  operation: string;
  requestsPerSecond: number;
  peakRps: number;
  avgRps: number;
  totalRequests: number;
  errorRequests: number;
  period: { start: string; end: string };
  measuredAt: string;
}

export interface TwinStorageMetrics {
  id: string;
  twinId: string;
  schoolId: string;
  totalSize: number;
  usedSize: number;
  availableSize: number;
  compressionRatio: number;
  indexSize: number;
  documentCount: number;
  avgDocumentSize: number;
  growthRate: number;
  lastMeasuredAt: string;
}

export interface TwinNetworkMetrics {
  id: string;
  twinId: string;
  schoolId: string;
  bandwidth: number;
  latency: number;
  packetLoss: number;
  throughput: number;
  activeConnections: number;
  maxConnections: number;
  errors: number;
  lastMeasuredAt: string;
}

export interface TwinComputeMetrics {
  id: string;
  twinId: string;
  schoolId: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  gpuUsage: number | null;
  processes: number;
  threads: number;
  loadAverage: number[];
  lastMeasuredAt: string;
}

export interface TwinEdgeNode {
  id: string;
  schoolId: string;
  name: string;
  type: "GATEWAY" | "ROUTER" | "PROCESSOR" | "STORAGE" | "SENSOR_HUB";
  status: DeviceStatus;
  location: string;
  ip: string;
  port: number;
  capabilities: string[];
  connectedTwins: string[];
  metrics: TwinComputeMetrics;
  lastHeartbeat: string;
  createdAt: string;
}

export interface TwinTopology {
  id: string;
  schoolId: string;
  name: string;
  nodes: TwinTopologyNode[];
  edges: TwinTopologyEdge[];
  layers: TwinTopologyLayer[];
  criticalPaths: string[][];
  healthScore: number;
  lastAnalyzedAt: string;
}

export interface TwinTopologyNode {
  id: string;
  twinId: string;
  name: string;
  type: TwinType;
  state: TwinState;
  x: number;
  y: number;
  zone: string;
}

export interface TwinTopologyEdge {
  source: string;
  target: string;
  type: TwinRelationship;
  bandwidth: number;
  latency: number;
  active: boolean;
}

export interface TwinTopologyLayer {
  id: string;
  name: string;
  zIndex: number;
  nodeIds: string[];
  visible: boolean;
}

export interface TwinDataLineage {
  id: string;
  twinId: string;
  schoolId: string;
  source: string;
  destination: string;
  transformations: DataTransformation[];
  quality: DataQuality;
  freshness: number;
  volume: number;
  lastProcessedAt: string;
}

export interface DataTransformation {
  step: number;
  type: "FILTER" | "MAP" | "AGGREGATE" | "JOIN" | "SPLIT" | "VALIDATE";
  description: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  recordsProcessed: number;
}
