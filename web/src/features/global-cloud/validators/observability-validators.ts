import { z } from 'zod'

const schoolId = z.string().uuid()

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Distributed Tracing
// ============================================================================

const DistributedTraceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  status: z.enum(['OK', 'ERROR', 'TIMEOUT', 'CANCELLED', 'UNSET']),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.number().min(0),
  spanCount: z.number().int().min(0),
  spans: z.array(z.object({
    id: z.string().uuid(),
    traceId: z.string().uuid(),
    parentSpanId: z.string().uuid().optional(),
    name: z.string(),
    kind: z.enum(['INTERNAL', 'SERVER', 'CLIENT', 'PRODUCER', 'CONSUMER']),
    status: z.enum(['OK', 'ERROR', 'TIMEOUT', 'CANCELLED', 'UNSET']),
    startTime: z.string(),
    endTime: z.string(),
    duration: z.number().min(0),
    service: z.string(),
    tags: z.record(z.string()),
    logs: z.array(z.object({
      timestamp: z.string(),
      fields: z.record(z.string()),
    })),
  })),
  serviceCount: z.number().int().min(0),
  tags: z.record(z.string()),
})

const CreateDistributedTraceSchema = DistributedTraceSchema.omit({ id: true })
const UpdateDistributedTraceSchema = DistributedTraceSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Metrics
// ============================================================================

const MetricSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(['COUNTER', 'GAUGE', 'HISTOGRAM', 'SUMMARY', 'RATE', 'PERCENTILE']),
  labels: z.record(z.string()),
  value: z.number(),
  unit: z.string().optional(),
  timestamp: z.string(),
})

const CreateMetricSchema = MetricSchema.omit({ id: true })
const UpdateMetricSchema = MetricSchema.partial().required({ id: true })

const MetricSeriesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(['COUNTER', 'GAUGE', 'HISTOGRAM', 'SUMMARY', 'RATE', 'PERCENTILE']),
  labels: z.record(z.string()),
  dataPoints: z.array(z.object({
    timestamp: z.string(),
    value: z.number(),
  })),
  aggregatedValue: z.number().optional(),
  aggregation: z.enum(['SUM', 'AVG', 'MIN', 'MAX', 'COUNT', 'PERCENTILE']).optional(),
  unit: z.string().optional(),
})

const CreateMetricSeriesSchema = MetricSeriesSchema.omit({ id: true })
const UpdateMetricSeriesSchema = MetricSeriesSchema.partial().required({ id: true })

const MetricAlertSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  metric: z.string(),
  condition: z.string(),
  threshold: z.number(),
  severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
  status: z.enum(['FIRING', 'ACKNOWLEDGED', 'RESOLVED', 'SILENCED', 'EXPIRED']),
  currentValue: z.number(),
  triggeredAt: z.string().optional(),
  resolvedAt: z.string().optional(),
  labels: z.record(z.string()),
})

const CreateMetricAlertSchema = MetricAlertSchema.omit({ id: true })
const UpdateMetricAlertSchema = MetricAlertSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Logs
// ============================================================================

const LogEntrySchema = z.object({
  id: z.string().uuid(),
  timestamp: z.string(),
  level: z.enum(['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL']),
  service: z.string(),
  message: z.string(),
  traceId: z.string().uuid().optional(),
  spanId: z.string().uuid().optional(),
  labels: z.record(z.string()),
  fields: z.record(z.string()),
})

const CreateLogEntrySchema = LogEntrySchema.omit({ id: true })
const UpdateLogEntrySchema = LogEntrySchema.partial().required({ id: true })

const LogAggregationRecordSchema = z.object({
  id: z.string().uuid(),
  service: z.string(),
  level: z.enum(['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL']),
  count: z.number().int().min(0),
  pattern: z.string(),
  firstSeen: z.string(),
  lastSeen: z.string(),
  sampleLogs: z.array(z.string()),
})

const CreateLogAggregationRecordSchema = LogAggregationRecordSchema.omit({ id: true })
const UpdateLogAggregationRecordSchema = LogAggregationRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Events & Correlation
// ============================================================================

const EventSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  source: z.string(),
  timestamp: z.string(),
  severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
  message: z.string(),
  data: z.record(z.unknown()),
  correlations: z.array(z.object({
    eventId: z.string().uuid(),
    correlatedId: z.string().uuid(),
    type: z.enum(['CAUSAL', 'TEMPORAL', 'SPATIAL', 'STATISTICAL']),
    strength: z.number().min(0).max(1),
  })),
})

const CreateEventSchema = EventSchema.omit({ id: true })
const UpdateEventSchema = EventSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Alert Rules & Incidents
// ============================================================================

const AlertRuleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  metric: z.string(),
  condition: z.string(),
  threshold: z.number(),
  severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
  group: z.enum(['INFRASTRUCTURE', 'APPLICATION', 'SECURITY', 'BUSINESS', 'COMPLIANCE']),
  notificationChannels: z.array(z.enum(['EMAIL', 'SLACK', 'PAGERDUTY', 'WEBHOOK', 'SMS', 'TEAMS'])),
  escalationPolicy: z.string().optional(),
  cooldown: z.number().int().min(0),
  enabled: z.boolean(),
  labels: z.record(z.string()),
  annotations: z.record(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreateAlertRuleSchema = AlertRuleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdateAlertRuleSchema = AlertRuleSchema.partial().required({ id: true })

const AlertIncidentSchema = z.object({
  id: z.string().uuid(),
  ruleId: z.string().uuid(),
  ruleName: z.string(),
  severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
  status: z.enum(['FIRING', 'ACKNOWLEDGED', 'RESOLVED', 'SILENCED', 'EXPIRED']),
  message: z.string(),
  service: z.string(),
  labels: z.record(z.string()),
  triggeredAt: z.string(),
  acknowledgedAt: z.string().optional(),
  resolvedAt: z.string().optional(),
  acknowledgements: z.array(z.object({
    userId: z.string().uuid(),
    timestamp: z.string(),
    message: z.string().optional(),
  })),
  escalations: z.array(z.object({
    level: z.enum(['L1', 'L2', 'L3', 'MANAGEMENT', 'EXECUTIVE']),
    target: z.string(),
    timestamp: z.string(),
    channel: z.enum(['EMAIL', 'SLACK', 'PAGERDUTY', 'WEBHOOK', 'SMS', 'TEAMS']),
  })),
  duration: z.number().min(0),
})

const CreateAlertIncidentSchema = AlertIncidentSchema.omit({ id: true })
const UpdateAlertIncidentSchema = AlertIncidentSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - SLO & Error Budget
// ============================================================================

const SLAMonitorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: z.enum(['AVAILABILITY', 'LATENCY', 'THROUGHPUT', 'ERROR_RATE', 'DURABILITY']),
  target: z.number().min(0).max(100),
  current: z.number().min(0).max(100),
  unit: z.string(),
  status: z.enum(['MET', 'VIOLATED', 'AT_RISK', 'NOT_APPLICABLE']),
  errorBudget: z.object({
    total: z.number().min(0),
    consumed: z.number().min(0),
    remaining: z.number().min(0),
    percentage: z.number().min(0).max(100),
    status: z.enum(['REMAINING', 'CONSUMED', 'EXHAUSTED']),
    projectedExhaustionDate: z.string().optional(),
    burnRate: z.enum(['SLOW', 'NORMAL', 'FAST', 'CRITICAL']),
  }),
  burnRate: z.enum(['SLOW', 'NORMAL', 'FAST', 'CRITICAL']),
  window: z.string(),
  trend: z.string(),
})

const CreateSLAMonitorSchema = SLAMonitorSchema.omit({ id: true })
const UpdateSLAMonitorSchema = SLAMonitorSchema.partial().required({ id: true })

const SLOTargetSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  category: z.enum(['AVAILABILITY', 'LATENCY', 'THROUGHPUT', 'ERROR_RATE', 'DURABILITY']),
  targetValue: z.number().min(0).max(100),
  current: z.number().min(0).max(100),
  unit: z.string(),
  window: z.string(),
  status: z.enum(['MET', 'VIOLATED', 'AT_RISK', 'NOT_APPLICABLE']),
  errorBudget: z.object({
    total: z.number().min(0),
    consumed: z.number().min(0),
    remaining: z.number().min(0),
    percentage: z.number().min(0).max(100),
    status: z.enum(['REMAINING', 'CONSUMED', 'EXHAUSTED']),
    projectedExhaustionDate: z.string().optional(),
    burnRate: z.enum(['SLOW', 'NORMAL', 'FAST', 'CRITICAL']),
  }),
})

const CreateSLOTargetSchema = SLOTargetSchema.omit({ id: true })
const UpdateSLOTargetSchema = SLOTargetSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Cost Monitoring
// ============================================================================

const CostMonitorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  provider: z.string(),
  totalCost: z.number().min(0),
  budget: z.number().min(0),
  projectedCost: z.number().min(0),
  breakdown: z.array(z.object({
    category: z.enum(['COMPUTE', 'STORAGE', 'NETWORK', 'DATABASE', 'AI_ML', 'SUPPORT', 'LICENSE']),
    amount: z.number().min(0),
    percentage: z.number().min(0).max(100),
    trend: z.string(),
  })),
  alerts: z.array(z.object({
    id: z.string().uuid(),
    type: z.string(),
    threshold: z.number(),
    current: z.number(),
    severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
    triggeredAt: z.string(),
    message: z.string(),
  })),
  trend: z.string(),
  period: z.string(),
})

const CreateCostMonitorSchema = CostMonitorSchema.omit({ id: true })
const UpdateCostMonitorSchema = CostMonitorSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Business & Infrastructure
// ============================================================================

const BusinessMonitorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  metric: z.enum(['ACTIVE_USERS', 'SIGN_UPS', 'RETENTION', 'CONVERSION', 'REVENUE', 'SATISFACTION']),
  value: z.number(),
  target: z.number(),
  unit: z.string(),
  status: z.enum(['MET', 'VIOLATED', 'AT_RISK', 'NOT_APPLICABLE']),
  trend: z.string(),
  period: z.string(),
  breakdown: z.record(z.number()),
})

const CreateBusinessMonitorSchema = BusinessMonitorSchema.omit({ id: true })
const UpdateBusinessMonitorSchema = BusinessMonitorSchema.partial().required({ id: true })

const InfrastructureMonitorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  target: z.enum(['SERVICE', 'DATABASE', 'CACHE', 'QUEUE', 'CDN', 'API', 'SERVER', 'CONTAINER', 'CLUSTER']),
  metrics: z.array(z.object({
    metric: z.enum(['CPU', 'MEMORY', 'DISK', 'NETWORK', 'PROCESS_COUNT', 'FILE_DESCRIPTOR']),
    value: z.number().min(0),
    unit: z.string(),
    utilization: z.number().min(0).max(100),
    threshold: z.number().min(0).max(100),
    status: z.enum(['LOW', 'MODERATE', 'HIGH', 'CRITICAL']),
  })),
  health: z.string(),
  alerts: z.array(z.object({
    id: z.string().uuid(),
    ruleId: z.string().uuid(),
    ruleName: z.string(),
    severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
    status: z.enum(['FIRING', 'ACKNOWLEDGED', 'RESOLVED', 'SILENCED', 'EXPIRED']),
    message: z.string(),
    service: z.string(),
    labels: z.record(z.string()),
    triggeredAt: z.string(),
    acknowledgedAt: z.string().optional(),
    resolvedAt: z.string().optional(),
    acknowledgements: z.array(z.object({
      userId: z.string().uuid(),
      timestamp: z.string(),
      message: z.string().optional(),
    })),
    escalations: z.array(z.object({
      level: z.enum(['L1', 'L2', 'L3', 'MANAGEMENT', 'EXECUTIVE']),
      target: z.string(),
      timestamp: z.string(),
      channel: z.enum(['EMAIL', 'SLACK', 'PAGERDUTY', 'WEBHOOK', 'SMS', 'TEAMS']),
    })),
    duration: z.number().min(0),
  })),
  capacity: z.array(z.object({
    id: z.string().uuid(),
    resource: z.string(),
    current: z.number().min(0),
    capacity: z.number().min(0),
    unit: z.string(),
    utilization: z.number().min(0).max(100),
    threshold: z.number().min(0).max(100),
    status: z.enum(['LOW', 'MODERATE', 'HIGH', 'CRITICAL']),
    forecast: z.object({
      model: z.string(),
      predictedCapacity: z.number().min(0),
      daysUntilFull: z.number().int().min(0),
      confidence: z.number().min(0).max(100),
    }),
  })),
})

const CreateInfrastructureMonitorSchema = InfrastructureMonitorSchema.omit({ id: true })
const UpdateInfrastructureMonitorSchema = InfrastructureMonitorSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Digital Twin & Prediction
// ============================================================================

const DigitalTwinMonitorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(['SIMULATION', 'PREDICTION', 'OPTIMIZATION', 'WHAT_IF', 'SCENARIO']),
  modelId: z.string().uuid(),
  inputs: z.record(z.unknown()),
  outputs: z.record(z.unknown()),
  accuracy: z.number().min(0).max(100),
  lastSync: z.string(),
  predictions: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(['CAPACITY', 'FAILURE', 'COST', 'PERFORMANCE', 'DEMAND']),
    predictedValue: z.number(),
    confidence: z.number().min(0).max(100),
    timeHorizon: z.string(),
    generatedAt: z.string(),
  })),
})

const CreateDigitalTwinMonitorSchema = DigitalTwinMonitorSchema.omit({ id: true })
const UpdateDigitalTwinMonitorSchema = DigitalTwinMonitorSchema.partial().required({ id: true })

const PredictiveAlertSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(['CAPACITY', 'FAILURE', 'COST', 'PERFORMANCE', 'DEMAND']),
  prediction: z.string(),
  confidence: z.number().min(0).max(100),
  timeHorizon: z.string(),
  severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
  service: z.string(),
  modelId: z.string().uuid(),
  generatedAt: z.string(),
})

const CreatePredictiveAlertSchema = PredictiveAlertSchema.omit({ id: true })
const UpdatePredictiveAlertSchema = PredictiveAlertSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Anomaly Detection
// ============================================================================

const AnomalyDetectorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  metric: z.string(),
  type: z.enum(['POINT', 'CONTEXTUAL', 'COLLECTIVE', 'PATTERN']),
  sensitivity: z.number().min(0).max(100),
  baselineWindow: z.string(),
  anomalies: z.array(z.object({
    id: z.string().uuid(),
    timestamp: z.string(),
    value: z.number(),
    expected: z.number(),
    deviation: z.number(),
    severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
    type: z.enum(['POINT', 'CONTEXTUAL', 'COLLECTIVE', 'PATTERN']),
    resolved: z.boolean(),
  })),
})

const CreateAnomalyDetectorSchema = AnomalyDetectorSchema.omit({ id: true })
const UpdateAnomalyDetectorSchema = AnomalyDetectorSchema.partial().required({ id: true })

const CorrelationEngineSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  metrics: z.array(z.string()),
  type: z.enum(['CAUSAL', 'TEMPORAL', 'SPATIAL', 'STATISTICAL']),
  correlations: z.array(z.object({
    metricA: z.string(),
    metricB: z.string(),
    type: z.enum(['CAUSAL', 'TEMPORAL', 'SPATIAL', 'STATISTICAL']),
    coefficient: z.number().min(-1).max(1),
    significance: z.number().min(0).max(1),
    lag: z.number().int(),
  })),
})

const CreateCorrelationEngineSchema = CorrelationEngineSchema.omit({ id: true })
const UpdateCorrelationEngineSchema = CorrelationEngineSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Dashboards & Reports
// ============================================================================

const ObservabilityDashboardSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  widgets: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(['TIME_SERIES', 'GAUGE', 'TABLE', 'HEATMAP', 'MAP', 'LOG_VIEWER', 'TOPOLOGY', 'alert_list']),
    title: z.string(),
    query: z.string(),
    position: z.object({ x: z.number(), y: z.number() }),
    size: z.object({ width: z.number(), height: z.number() }),
    config: z.record(z.unknown()),
  })),
  refreshInterval: z.number().int().min(1),
  timeRange: z.string(),
  filters: z.record(z.string()),
  createdBy: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreateObservabilityDashboardSchema = ObservabilityDashboardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdateObservabilityDashboardSchema = ObservabilityDashboardSchema.partial().required({ id: true })

const ObservabilityReportSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(['OPERATIONAL', 'EXECUTIVE', 'INCIDENT', 'CAPACITY', 'COST']),
  period: z.string(),
  generatedAt: z.string(),
  content: z.string(),
  metrics: z.array(z.object({
    name: z.string(),
    value: z.number(),
    change: z.number(),
    trend: z.string(),
    unit: z.string(),
  })),
  status: z.string(),
})

const CreateObservabilityReportSchema = ObservabilityReportSchema.omit({ id: true })
const UpdateObservabilityReportSchema = ObservabilityReportSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Runbooks & Incidents
// ============================================================================

const RunbookSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  trigger: z.string(),
  steps: z.array(z.object({
    order: z.number().int().min(1),
    action: z.enum(['RESTART', 'SCALE_UP', 'SCALE_DOWN', 'FAILOVER', 'ROLLBACK', 'NOTIFY', 'DRAIN', 'BLOCK']),
    description: z.string(),
    command: z.string().optional(),
    timeout: z.number().int().min(0),
    rollbackAction: z.enum(['RESTART', 'SCALE_UP', 'SCALE_DOWN', 'FAILOVER', 'ROLLBACK', 'NOTIFY', 'DRAIN', 'BLOCK']).optional(),
  })),
  alertRuleId: z.string().uuid().optional(),
  enabled: z.boolean(),
  lastExecuted: z.string().optional(),
  executionCount: z.number().int().min(0),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreateRunbookSchema = RunbookSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdateRunbookSchema = RunbookSchema.partial().required({ id: true })

const IncidentSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'POSTMORTEM']),
  service: z.string(),
  assignedTo: z.array(z.string().uuid()),
  rootCause: z.string().optional(),
  impact: z.string(),
  timeline: z.array(z.object({
    timestamp: z.string(),
    action: z.string(),
    actor: z.string(),
    message: z.string(),
  })),
  relatedAlerts: z.array(z.string().uuid()),
  startTime: z.string(),
  acknowledgedAt: z.string().optional(),
  resolvedAt: z.string().optional(),
  closedAt: z.string().optional(),
  duration: z.number().min(0).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreateIncidentSchema = IncidentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdateIncidentSchema = IncidentSchema.partial().required({ id: true })

const PostMortemSchema = z.object({
  id: z.string().uuid(),
  incidentId: z.string().uuid(),
  title: z.string(),
  status: z.enum(['DRAFT', 'IN_REVIEW', 'APPROVED', 'PUBLISHED']),
  summary: z.string(),
  timeline: z.array(z.object({
    timestamp: z.string(),
    event: z.string(),
    who: z.string(),
  })),
  rootCause: z.string(),
  impact: z.object({
    duration: z.number().min(0),
    affectedUsers: z.number().int().min(0),
    dataLoss: z.boolean(),
    financialImpact: z.number().min(0),
  }),
  actionItems: z.array(z.object({
    id: z.string().uuid(),
    description: z.string(),
    assignee: z.string().uuid(),
    dueDate: z.string(),
    completed: z.boolean(),
    priority: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
  })),
  lessonsLearned: z.array(z.string()),
  author: z.string().uuid(),
  reviewers: z.array(z.string().uuid()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreatePostMortemSchema = PostMortemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdatePostMortemSchema = PostMortemSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - On-Call & Maintenance
// ============================================================================

const OnCallScheduleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  strategy: z.enum(['ROUND_ROBIN', 'ESCALATION', 'LOAD_BALANCE', 'SKILL_BASED']),
  rotations: z.array(z.object({
    userId: z.string().uuid(),
    level: z.enum(['PRIMARY', 'SECONDARY', 'TERTIARY', 'FOLLOW_THE_SUN']),
    startDate: z.string(),
    endDate: z.string(),
  })),
  escalationPolicy: z.string(),
  timeZone: z.string(),
  overrides: z.array(z.object({
    userId: z.string().uuid(),
    startDate: z.string(),
    endDate: z.string(),
    reason: z.string(),
  })),
})

const CreateOnCallScheduleSchema = OnCallScheduleSchema.omit({ id: true })
const UpdateOnCallScheduleSchema = OnCallScheduleSchema.partial().required({ id: true })

const MaintenanceWindowRecordSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(['SCHEDULED', 'EMERGENCY', 'RECURRING']),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  affectedServices: z.array(z.string()),
  changeRequest: z.string().uuid().optional(),
  status: z.string(),
  createdBy: z.string().uuid(),
  createdAt: z.string(),
})

const CreateMaintenanceWindowRecordSchema = MaintenanceWindowRecordSchema.omit({
  id: true,
  createdAt: true,
})

const UpdateMaintenanceWindowRecordSchema = MaintenanceWindowRecordSchema.partial().required({ id: true })

const ChangeRequestSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  type: z.enum(['MAJOR', 'MINOR', 'STANDARD', 'EMERGENCY']),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'ROLLED_BACK']),
  riskLevel: z.string(),
  changeOwner: z.string().uuid(),
  approvers: z.array(z.string().uuid()),
  affectedServices: z.array(z.string()),
  rollbackPlan: z.string(),
  scheduledAt: z.string().optional(),
  executedAt: z.string().optional(),
  completedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreateChangeRequestSchema = ChangeRequestSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdateChangeRequestSchema = ChangeRequestSchema.partial().required({ id: true })

const DeploymentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  version: z.string(),
  service: z.string(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'ROLLED_BACK']),
  environment: z.string(),
  commitHash: z.string(),
  deployedBy: z.string().uuid(),
  startedAt: z.string(),
  completedAt: z.string().optional(),
  duration: z.number().min(0).optional(),
  healthCheck: z.object({
    id: z.string().uuid(),
    service: z.string(),
    status: z.string(),
    checks: z.array(z.object({
      name: z.string(),
      status: z.string(),
      message: z.string().optional(),
      duration: z.number().min(0),
    })),
    lastCheck: z.string(),
    interval: z.number().int().min(1),
  }),
})

const CreateDeploymentSchema = DeploymentSchema.omit({ id: true })
const UpdateDeploymentSchema = DeploymentSchema.partial().required({ id: true })

const FeatureFlagRecordSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(['BOOLEAN', 'PERCENTAGE', 'USER_SEGMENT', 'KILL_SWITCH']),
  enabled: z.boolean(),
  description: z.string(),
  rules: z.array(z.object({
    id: z.string().uuid(),
    condition: z.string(),
    value: z.boolean(),
    percentage: z.number().min(0).max(100).optional(),
    userSegment: z.string().optional(),
  })),
  killSwitch: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreateFeatureFlagRecordSchema = FeatureFlagRecordSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdateFeatureFlagRecordSchema = FeatureFlagRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Performance
// ============================================================================

const PerformanceBaselineSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  service: z.string(),
  metrics: z.array(z.object({
    name: z.string(),
    p50: z.number().min(0),
    p95: z.number().min(0),
    p99: z.number().min(0),
    unit: z.string(),
  })),
  period: z.string(),
  status: z.string(),
  createdAt: z.string(),
})

const CreatePerformanceBaselineSchema = PerformanceBaselineSchema.omit({
  id: true,
  createdAt: true,
})

const UpdatePerformanceBaselineSchema = PerformanceBaselineSchema.partial().required({ id: true })

const PerformanceReportSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  period: z.string(),
  summary: z.string(),
  services: z.array(z.object({
    service: z.string(),
    latency: z.object({
      p50: z.number().min(0),
      p75: z.number().min(0),
      p90: z.number().min(0),
      p95: z.number().min(0),
      p99: z.number().min(0),
      unit: z.string(),
    }),
    throughput: z.number().min(0),
    errorRate: z.number().min(0).max(100),
    availability: z.number().min(0).max(100),
  })),
  generatedAt: z.string(),
})

const CreatePerformanceReportSchema = PerformanceReportSchema.omit({ id: true })
const UpdatePerformanceReportSchema = PerformanceReportSchema.partial().required({ id: true })

// ============================================================================
// MODULE 11: ENTERPRISE OBSERVABILITY - Exports
// ============================================================================

export {
  CreateDistributedTraceSchema,
  UpdateDistributedTraceSchema,
  CreateMetricSchema,
  UpdateMetricSchema,
  CreateMetricSeriesSchema,
  UpdateMetricSeriesSchema,
  CreateMetricAlertSchema,
  UpdateMetricAlertSchema,
  CreateLogEntrySchema,
  UpdateLogEntrySchema,
  CreateLogAggregationRecordSchema,
  UpdateLogAggregationRecordSchema,
  CreateEventSchema,
  UpdateEventSchema,
  CreateAlertRuleSchema,
  UpdateAlertRuleSchema,
  CreateAlertIncidentSchema,
  UpdateAlertIncidentSchema,
  CreateSLAMonitorSchema,
  UpdateSLAMonitorSchema,
  CreateSLOTargetSchema,
  UpdateSLOTargetSchema,
  CreateCostMonitorSchema,
  UpdateCostMonitorSchema,
  CreateBusinessMonitorSchema,
  UpdateBusinessMonitorSchema,
  CreateInfrastructureMonitorSchema,
  UpdateInfrastructureMonitorSchema,
  CreateDigitalTwinMonitorSchema,
  UpdateDigitalTwinMonitorSchema,
  CreatePredictiveAlertSchema,
  UpdatePredictiveAlertSchema,
  CreateAnomalyDetectorSchema,
  UpdateAnomalyDetectorSchema,
  CreateCorrelationEngineSchema,
  UpdateCorrelationEngineSchema,
  CreateObservabilityDashboardSchema,
  UpdateObservabilityDashboardSchema,
  CreateObservabilityReportSchema,
  UpdateObservabilityReportSchema,
  CreateRunbookSchema,
  UpdateRunbookSchema,
  CreateIncidentSchema,
  UpdateIncidentSchema,
  CreatePostMortemSchema,
  UpdatePostMortemSchema,
  CreateOnCallScheduleSchema,
  UpdateOnCallScheduleSchema,
  CreateMaintenanceWindowRecordSchema,
  UpdateMaintenanceWindowRecordSchema,
  CreateChangeRequestSchema,
  UpdateChangeRequestSchema,
  CreateDeploymentSchema,
  UpdateDeploymentSchema,
  CreateFeatureFlagRecordSchema,
  UpdateFeatureFlagRecordSchema,
  CreatePerformanceBaselineSchema,
  UpdatePerformanceBaselineSchema,
  CreatePerformanceReportSchema,
  UpdatePerformanceReportSchema,
}
