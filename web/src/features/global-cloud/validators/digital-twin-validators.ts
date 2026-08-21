import { z } from 'zod';

const schoolId = z.string().uuid();

// =============================================================================
// Base Twin
// =============================================================================

export const CreateBaseTwinSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['MINISTRY', 'REGION', 'SCHOOL', 'CAMPUS', 'BUILDING', 'CLASSROOM', 'STUDENT', 'TEACHER', 'PARENT', 'EMPLOYEE', 'RESOURCE', 'VEHICLE', 'LABORATORY', 'LIBRARY', 'SPORTS', 'DORMITORY', 'CAFETERIA', 'INFIRMARY', 'TRANSPORT']),
  state: z.enum(['ACTIVE', 'INACTIVE', 'SIMULATING', 'MAINTENANCE', 'OFFLINE', 'ERROR', 'SYNCING']),
  lifecycle: z.enum(['PLANNED', 'DEPLOYING', 'ACTIVE', 'SCALING', 'UPGRADING', 'MIGRATING', 'RETIRING', 'DECOMMISSIONED']),
  template: z.enum(['DEFAULT', 'MINISTRY', 'SCHOOL', 'CLASSROOM', 'STUDENT', 'TEACHER', 'INFRASTRUCTURE', 'TRANSPORT', 'ENERGY', 'SECURITY']),
  parent_id: z.string().uuid().nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
  tags: z.array(z.string()).optional(),
});

export const UpdateBaseTwinSchema = CreateBaseTwinSchema.partial();

// =============================================================================
// Twin Snapshot
// =============================================================================

export const CreateTwinSnapshotSchema = z.object({
  twin_id: z.string().uuid(),
  timestamp: z.string(),
  state: z.enum(['ACTIVE', 'INACTIVE', 'SIMULATING', 'MAINTENANCE', 'OFFLINE', 'ERROR', 'SYNCING']),
  metadata: z.record(z.unknown()).optional(),
  version: z.number().int().min(1),
  checksum: z.string().min(1),
});

export const UpdateTwinSnapshotSchema = CreateTwinSnapshotSchema.partial();

// =============================================================================
// Twin Event
// =============================================================================

export const CreateTwinEventSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  type: z.enum(['HEALTH', 'PERFORMANCE', 'SECURITY', 'MAINTENANCE', 'CAPACITY', 'USAGE', 'ANOMALY']),
  severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
  title: z.string().min(1),
  message: z.string().min(1),
  source: z.string().min(1),
  data: z.record(z.unknown()).optional(),
});

export const UpdateTwinEventSchema = CreateTwinEventSchema.partial();

// =============================================================================
// Twin Metric
// =============================================================================

export const CreateTwinMetricSchema = z.object({
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  value: z.number(),
  unit: z.enum(['COUNT', 'PERCENTAGE', 'MB', 'GB', 'TB', 'MS', 'SEC', 'MIN', 'HOUR', 'DEGREE', 'CELSIUS', 'FAHRENHEIT', 'WATT', 'KWH', 'METER', 'KM', 'MPH']),
  type: z.enum(['COUNT', 'PERCENTAGE', 'RATIO', 'AVERAGE', 'SUM', 'MIN', 'MAX', 'TREND', 'FORECAST']),
  trend: z.enum(['UP', 'DOWN', 'STABLE', 'VOLATILE', 'CYCLICAL', 'SEASONAL']),
  source: z.string().min(1),
});

export const UpdateTwinMetricSchema = CreateTwinMetricSchema.partial();

// =============================================================================
// Simulation
// =============================================================================

export const CreateSimulationSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['WHAT_IF', 'SCENARIO', 'PREDICTIVE', 'PRESCRIPTIVE', 'STOCHASTIC', 'MONTE_CARLO']),
  status: z.enum(['IDLE', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED']),
  engine: z.enum(['DYNAMICS', 'SYSTEM_DYNAMICS', 'AGENT_BASED', 'DISCRETE_EVENT', 'CELLULAR_AUTOMATA', 'FINITE_ELEMENT']),
  created_by: z.string().uuid(),
});

export const UpdateSimulationSchema = CreateSimulationSchema.partial();

// =============================================================================
// Prediction
// =============================================================================

export const CreatePredictionSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  model: z.enum(['LINEAR', 'POLYNOMIAL', 'NEURAL_NETWORK', 'RANDOM_FOREST', 'XGBOOST', 'LSTM', 'TRANSFORMER']),
  accuracy: z.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH', 'EXACT']),
  confidence: z.number().min(0).max(1),
  horizon: z.enum(['HOUR', 'DAY', 'WEEK', 'MONTH', 'QUARTER', 'YEAR']),
  trained_at: z.string(),
  expires_at: z.string(),
});

export const UpdatePredictionSchema = CreatePredictionSchema.partial();

// =============================================================================
// Twin Alert
// =============================================================================

export const CreateTwinAlertSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  type: z.enum(['THRESHOLD', 'ANOMALY', 'PREDICTIVE', 'PATTERN', 'CORRELATION', 'CASCADE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'EMERGENCY']),
  title: z.string().min(1),
  message: z.string().min(1),
  description: z.string().min(1),
  source: z.string().min(1),
  metric: z.string().min(1),
  current_value: z.number(),
  threshold_value: z.number(),
  action: z.enum(['NOTHING', 'ESCALATE', 'AUTO_HEAL', 'NOTIFY', 'LOG', 'BLOCK']),
});

export const UpdateTwinAlertSchema = CreateTwinAlertSchema.partial();

// =============================================================================
// Twin KPI
// =============================================================================

export const CreateTwinKPISchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['COUNT', 'PERCENTAGE', 'RATIO', 'AVERAGE', 'SUM', 'MIN', 'MAX', 'TREND', 'FORECAST']),
  value: z.number(),
  target: z.number(),
  unit: z.enum(['COUNT', 'PERCENTAGE', 'MB', 'GB', 'TB', 'MS', 'SEC', 'MIN', 'HOUR', 'DEGREE', 'CELSIUS', 'FAHRENHEIT', 'WATT', 'KWH', 'METER', 'KM', 'MPH']),
  trend: z.enum(['UP', 'DOWN', 'STABLE', 'VOLATILE', 'CYCLICAL', 'SEASONAL']),
  trend_percentage: z.number(),
  status: z.enum(['EXCELLENT', 'GOOD', 'AVERAGE', 'POOR', 'CRITICAL']),
});

export const UpdateTwinKPISchema = CreateTwinKPISchema.partial();

// =============================================================================
// Twin Analytics
// =============================================================================

export const CreateTwinAnalyticsSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  type: z.enum(['DESCRIPTIVE', 'DIAGNOSTIC', 'PREDICTIVE', 'PRESCRIPTIVE', 'COGNITIVE']),
  name: z.string().min(1),
  description: z.string().min(1),
  data: z.record(z.unknown()),
  generated_at: z.string(),
  expires_at: z.string(),
});

export const UpdateTwinAnalyticsSchema = CreateTwinAnalyticsSchema.partial();

// =============================================================================
// Twin Maintenance
// =============================================================================

export const CreateTwinMaintenanceSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  type: z.enum(['PREVENTIVE', 'CORRECTIVE', 'PREDICTIVE', 'CONDITION_BASED', 'EMERGENCY']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL']),
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE', 'CANCELLED']),
  title: z.string().min(1),
  description: z.string().min(1),
  assigned_to: z.string().uuid().nullable().optional(),
  scheduled_date: z.string(),
  estimated_duration: z.number().int().min(0),
  cost: z.number().min(0),
});

export const UpdateTwinMaintenanceSchema = CreateTwinMaintenanceSchema.partial();

// =============================================================================
// Twin Sensor
// =============================================================================

export const CreateTwinSensorSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  type: z.enum(['TEMPERATURE', 'HUMIDITY', 'PRESSURE', 'MOTION', 'PROXIMITY', 'LIGHT', 'NOISE', 'AIR_QUALITY', 'WATER_LEVEL', 'ENERGY', 'SPEED', 'GPS', 'CAMERA', 'RFID', 'NFC', 'BLUETOOTH', 'WIFI']),
  status: z.enum(['ONLINE', 'OFFLINE', 'LOW_BATTERY', 'MAINTENANCE', 'DECOMMISSIONED']),
  model: z.string().min(1),
  manufacturer: z.string().min(1),
  install_date: z.string(),
  battery_level: z.number().min(0).max(100),
  signal_strength: z.number(),
});

export const UpdateTwinSensorSchema = CreateTwinSensorSchema.partial();

// =============================================================================
// Twin Relationship
// =============================================================================

export const CreateTwinRelationshipSchema = z.object({
  schoolId,
  source_twin_id: z.string().uuid(),
  target_twin_id: z.string().uuid(),
  type: z.enum(['PARENT', 'CHILD', 'SIBLING', 'DEPENDS_ON', 'FEEDS', 'MONITORS', 'CONTROLS', 'SIMULATES']),
  strength: z.number().min(0).max(1),
  bidirectional: z.boolean(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateTwinRelationshipSchema = CreateTwinRelationshipSchema.partial();

// =============================================================================
// Twin Visualization
// =============================================================================

export const CreateTwinVisualizationSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['_2D', '_3D', 'HEATMAP', 'TIMELINE', 'GRAPH', 'TABLE', 'CHART', 'MAP']),
  config: z.record(z.unknown()),
  data_source: z.string().min(1),
  refresh_interval: z.number().int().min(1),
  is_public: z.boolean(),
  created_by: z.string().uuid(),
});

export const UpdateTwinVisualizationSchema = CreateTwinVisualizationSchema.partial();

// =============================================================================
// Twin Dashboard
// =============================================================================

export const CreateTwinDashboardSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  layout: z.object({
    columns: z.number().int().min(1),
    rows: z.number().int().min(1),
    grid: z.array(z.object({
      widget_id: z.string().uuid(),
      x: z.number().int().min(0),
      y: z.number().int().min(0),
      width: z.number().int().min(1),
      height: z.number().int().min(1),
    })),
  }),
  is_default: z.boolean(),
  shared_with: z.array(z.string().uuid()),
  created_by: z.string().uuid(),
});

export const UpdateTwinDashboardSchema = CreateTwinDashboardSchema.partial();

// =============================================================================
// Twin Report
// =============================================================================

export const CreateTwinReportSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL', 'CUSTOM']),
  format: z.enum(['PDF', 'HTML', 'CSV', 'JSON']),
  config: z.record(z.unknown()),
  schedule: z.string().nullable().optional(),
  recipients: z.array(z.string().uuid()),
  created_by: z.string().uuid(),
});

export const UpdateTwinReportSchema = CreateTwinReportSchema.partial();

// =============================================================================
// Twin AI
// =============================================================================

export const CreateTwinAISchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  model_type: z.enum(['CLASSIFICATION', 'REGRESSION', 'CLUSTERING', 'ANOMALY_DETECTION', 'RECOMMENDATION', 'NLP', 'COMPUTER_VISION', 'REINFORCEMENT']),
  status: z.enum(['TRAINING', 'READY', 'RUNNING', 'ERROR', 'DEPRECATED']),
  accuracy: z.number().min(0).max(1),
});

export const UpdateTwinAISchema = CreateTwinAISchema.partial();

// =============================================================================
// Twin Forecast
// =============================================================================

export const CreateTwinForecastSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  metric: z.string().min(1),
  horizon: z.enum(['HOUR', 'DAY', 'WEEK', 'MONTH', 'QUARTER', 'YEAR']),
  accuracy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  confidence_interval: z.number().min(0).max(1),
  model: z.enum(['LINEAR', 'POLYNOMIAL', 'NEURAL_NETWORK', 'RANDOM_FOREST', 'XGBOOST', 'LSTM', 'TRANSFORMER']),
  generated_at: z.string(),
  expires_at: z.string(),
});

export const UpdateTwinForecastSchema = CreateTwinForecastSchema.partial();

// =============================================================================
// Twin Scenario
// =============================================================================

export const CreateTwinScenarioSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED', 'RUNNING', 'COMPLETED']),
  type: z.enum(['WHAT_IF', 'SCENARIO', 'PREDICTIVE', 'PRESCRIPTIVE', 'STOCHASTIC', 'MONTE_CARLO']),
  parameters: z.record(z.unknown()),
  assumptions: z.array(z.string()),
  expected_outcome: z.string().min(1),
  created_by: z.string().uuid(),
});

export const UpdateTwinScenarioSchema = CreateTwinScenarioSchema.partial();

// =============================================================================
// Twin What-If
// =============================================================================

export const CreateTwinWhatIfSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  variable: z.string().min(1),
  current_value: z.number(),
  test_values: z.array(z.object({
    value: z.number(),
    unit: z.enum(['COUNT', 'PERCENTAGE', 'MB', 'GB', 'TB', 'MS', 'SEC', 'MIN', 'HOUR', 'DEGREE', 'CELSIUS', 'FAHRENHEIT', 'WATT', 'KWH', 'METER', 'KM', 'MPH']),
    description: z.string().min(1),
  })),
  created_by: z.string().uuid(),
});

export const UpdateTwinWhatIfSchema = CreateTwinWhatIfSchema.partial();

// =============================================================================
// Twin Performance
// =============================================================================

export const CreateTwinPerformanceSchema = z.object({
  twin_id: z.string().uuid(),
  schoolId,
  rating: z.enum(['EXCELLENT', 'GOOD', 'AVERAGE', 'POOR', 'CRITICAL']),
  score: z.number().min(0).max(100),
  response_time: z.number().min(0),
  throughput: z.number().min(0),
  error_rate: z.number().min(0).max(1),
  uptime: z.number().min(0).max(1),
  availability: z.number().min(0).max(1),
});

export const UpdateTwinPerformanceSchema = CreateTwinPerformanceSchema.partial();

// =============================================================================
// Twin Capacity
// =============================================================================

export const CreateTwinCapacitySchema = z.object({
  twin_id: z.string().uuid(),
  schoolId,
  type: z.enum(['STORAGE', 'COMPUTE', 'NETWORK', 'MEMORY', 'USERS', 'CONNECTIONS']),
  total: z.number().min(0),
  used: z.number().min(0),
  available: z.number().min(0),
  unit: z.enum(['COUNT', 'PERCENTAGE', 'MB', 'GB', 'TB', 'MS', 'SEC', 'MIN', 'HOUR', 'DEGREE', 'CELSIUS', 'FAHRENHEIT', 'WATT', 'KWH', 'METER', 'KM', 'MPH']),
  utilization: z.number().min(0).max(1),
  status: z.enum(['AVAILABLE', 'LIMITED', 'FULL', 'OVERLOADED', 'MAINTENANCE']),
  threshold: z.object({
    warning: z.number().min(0).max(1),
    critical: z.number().min(0).max(1),
    maximum: z.number().min(0).max(1),
  }),
});

export const UpdateTwinCapacitySchema = CreateTwinCapacitySchema.partial();

// =============================================================================
// Twin Energy
// =============================================================================

export const CreateTwinEnergySchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  type: z.enum(['ELECTRICITY', 'SOLAR', 'WIND', 'BATTERY', 'DIESEL', 'GAS', 'HYBRID']),
  total_consumption: z.number().min(0),
  daily_average: z.number().min(0),
  peak_demand: z.number().min(0),
  efficiency: z.number().min(0).max(1),
  cost: z.number().min(0),
  carbon_emissions: z.number().min(0),
  renewable_percentage: z.number().min(0).max(1),
});

export const UpdateTwinEnergySchema = CreateTwinEnergySchema.partial();

// =============================================================================
// Twin Water
// =============================================================================

export const CreateTwinWaterSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  type: z.enum(['POTABLE', 'RECYCLED', 'RAINWATER', 'GROUNDWATER', 'TREATED']),
  total_consumption: z.number().min(0),
  daily_average: z.number().min(0),
  cost: z.number().min(0),
  quality: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'UNKNOWN']),
});

export const UpdateTwinWaterSchema = CreateTwinWaterSchema.partial();

// =============================================================================
// Twin Waste
// =============================================================================

export const CreateTwinWasteSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  type: z.enum(['RECYCLABLE', 'ORGANIC', 'HAZARDOUS', 'ELECTRONIC', 'CONSTRUCTION']),
  total_generated: z.number().min(0),
  recycled: z.number().min(0),
  disposed: z.number().min(0),
  recycling_rate: z.number().min(0).max(1),
  cost: z.number().min(0),
});

export const UpdateTwinWasteSchema = CreateTwinWasteSchema.partial();

// =============================================================================
// Twin Carbon
// =============================================================================

export const CreateTwinCarbonSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  total_emissions: z.number().min(0),
  scope1_emissions: z.number().min(0),
  scope2_emissions: z.number().min(0),
  scope3_emissions: z.number().min(0),
  offset: z.number().min(0),
  net_emissions: z.number(),
  target: z.number().min(0),
  reduction_plan: z.string().min(1),
});

export const UpdateTwinCarbonSchema = CreateTwinCarbonSchema.partial();

// =============================================================================
// Twin Security
// =============================================================================

export const CreateTwinSecuritySchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  level: z.enum(['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED', 'TOP_SECRET']),
  score: z.number().min(0).max(100),
});

export const UpdateTwinSecuritySchema = CreateTwinSecuritySchema.partial();

// =============================================================================
// Twin Integration
// =============================================================================

export const CreateTwinIntegrationSchema = z.object({
  schoolId,
  twin_id: z.string().uuid(),
  name: z.string().min(1),
  type: z.enum(['SENSOR', 'API', 'DATABASE', 'FILE', 'STREAM', 'WEBHOOK', 'MANUAL']),
  status: z.enum(['CONNECTED', 'DISCONNECTED', 'SYNCING', 'ERROR', 'CONFIGURING']),
  endpoint: z.string().url(),
  config: z.record(z.unknown()).optional(),
  sync_mode: z.enum(['REALTIME', 'PERIODIC', 'ON_DEMAND', 'EVENT_DRIVEN', 'BATCH']),
  sync_interval: z.number().int().min(1),
});

export const UpdateTwinIntegrationSchema = CreateTwinIntegrationSchema.partial();
