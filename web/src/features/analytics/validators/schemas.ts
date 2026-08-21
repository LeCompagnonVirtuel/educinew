import { z } from 'zod';

const analyticsPeriodEnum = z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']);
const chartTypeEnum = z.enum(['line', 'area', 'bar', 'pie', 'donut', 'radar', 'polar', 'treemap', 'sankey', 'bubble', 'scatter', 'heatmap', 'gauge', 'funnel', 'candlestick', 'timeline', 'calendar', 'geo_map']);
const exportFormatEnum = z.enum(['excel', 'pdf', 'csv', 'json', 'xml', 'powerpoint']);
const reportScheduleEnum = z.enum(['none', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly']);
const dataSourceTypeEnum = z.enum(['students', 'teachers', 'classes', 'subjects', 'exams', 'attendance', 'finance', 'hr', 'messages', 'schools', 'users', 'payments', 'enrollments']);
const riskLevelEnum = z.enum(['low', 'medium', 'high', 'critical']);
const predictiveModelEnum = z.enum(['dropout', 'payment_default', 'academic_risk', 'revenue_forecast', 'enrollment_forecast', 'staff_turnover', 'class_overload', 'demand_forecast']);
const widgetTypeEnum = z.enum(['kpi', 'chart', 'table', 'map', 'gauge', 'heatmap', 'timeline', 'text', 'image', 'list', 'progress', 'comparison']);
const dimensionGranularityEnum = z.enum(['day', 'week', 'month', 'quarter', 'year']);

const dateRangeSchema = z.object({
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

const sortSchema = z.object({
  sortBy: z.string().max(100).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// --- Dashboard Schemas ---

export const createDashboardSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  isDefault: z.boolean().default(false),
  isShared: z.boolean().default(false),
  sharedWith: z.array(z.string().uuid()).max(50).optional(),
  widgets: z.array(z.object({
    type: widgetTypeEnum,
    title: z.string().min(1).max(200),
    dataSource: dataSourceTypeEnum,
    config: z.record(z.unknown()).default({}),
    position: z.object({
      x: z.number().int().min(0).max(11),
      y: z.number().int().min(0),
      w: z.number().int().min(1).max(12),
      h: z.number().int().min(1).max(8),
    }),
    refreshInterval: z.number().int().min(30).max(3600).default(300),
    visible: z.boolean().default(true),
  })).max(50).optional(),
});

export const updateDashboardSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  isDefault: z.boolean().optional(),
  isShared: z.boolean().optional(),
  sharedWith: z.array(z.string().uuid()).max(50).optional(),
  widgets: z.array(z.object({
    id: z.string().uuid().optional(),
    type: widgetTypeEnum,
    title: z.string().min(1).max(200),
    dataSource: dataSourceTypeEnum,
    config: z.record(z.unknown()).default({}),
    position: z.object({
      x: z.number().int().min(0).max(11),
      y: z.number().int().min(0),
      w: z.number().int().min(1).max(12),
      h: z.number().int().min(1).max(8),
    }),
    refreshInterval: z.number().int().min(30).max(3600).default(300),
    visible: z.boolean().default(true),
  })).max(50).optional(),
});

export const dashboardIdSchema = z.object({
  dashboardId: z.string().uuid(),
});

export const shareDashboardSchema = z.object({
  dashboardId: z.string().uuid(),
  userIds: z.array(z.string().uuid()).min(1).max(50),
});

// --- Widget Schemas ---

export const addWidgetSchema = z.object({
  dashboardId: z.string().uuid(),
  type: widgetTypeEnum,
  title: z.string().min(1).max(200),
  dataSource: dataSourceTypeEnum,
  config: z.record(z.unknown()).default({}),
  position: z.object({
    x: z.number().int().min(0).max(11),
    y: z.number().int().min(0),
    w: z.number().int().min(1).max(12),
    h: z.number().int().min(1).max(8),
  }),
  refreshInterval: z.number().int().min(30).max(3600).default(300),
  visible: z.boolean().default(true),
});

export const updateWidgetSchema = z.object({
  dashboardId: z.string().uuid(),
  widgetId: z.string().uuid(),
  type: widgetTypeEnum.optional(),
  title: z.string().min(1).max(200).optional(),
  dataSource: dataSourceTypeEnum.optional(),
  config: z.record(z.unknown()).optional(),
  position: z.object({
    x: z.number().int().min(0).max(11),
    y: z.number().int().min(0),
    w: z.number().int().min(1).max(12),
    h: z.number().int().min(1).max(8),
  }).optional(),
  refreshInterval: z.number().int().min(30).max(3600).optional(),
  visible: z.boolean().optional(),
});

export const widgetIdSchema = z.object({
  dashboardId: z.string().uuid(),
  widgetId: z.string().uuid(),
});

// --- Chart Schemas ---

export const getChartDataSchema = z.object({
  dataSource: dataSourceTypeEnum,
  chartType: chartTypeEnum,
  xAxis: z.string().max(100).optional(),
  yAxis: z.string().max(100).optional(),
  series: z.array(z.string().max(100)).max(10).optional(),
  filters: z.record(z.unknown()).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
});

export const getGeoMapDataSchema = z.object({
  country: z.string().max(10).default('CI'),
  region: z.string().max(100).optional(),
  metric: z.string().max(100).optional(),
  ...dateRangeSchema.shape,
});

export const getHeatmapDataSchema = z.object({
  dataSource: dataSourceTypeEnum,
  rowField: z.string().max(100),
  columnField: z.string().max(100),
  valueField: z.string().max(100),
  ...dateRangeSchema.shape,
});

export const getFunnelDataSchema = z.object({
  dataSource: dataSourceTypeEnum,
  stages: z.array(z.string().max(100)).min(2).max(20),
  ...dateRangeSchema.shape,
});

// --- Report Schemas ---

export const createReportSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  dataSource: dataSourceTypeEnum,
  filters: z.record(z.unknown()).default({}),
  groupBy: z.array(z.string().max(100)).max(10).default([]),
  sortBy: z.string().max(100).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  columns: z.array(z.object({
    key: z.string().max(100),
    label: z.string().max(200),
    type: z.string().max(50),
    format: z.string().max(50).optional(),
    width: z.number().int().min(50).max(500).optional(),
    visible: z.boolean().default(true),
  })).max(50).default([]),
  charts: z.array(z.object({
    id: z.string().uuid().optional(),
    type: chartTypeEnum,
    title: z.string().min(1).max(200),
    dataSource: dataSourceTypeEnum,
    xAxis: z.string().max(100),
    yAxis: z.string().max(100),
    series: z.array(z.string().max(100)).max(10).default([]),
    colors: z.array(z.string().max(20)).max(10).default([]),
    position: z.object({
      x: z.number().int().min(0).max(11),
      y: z.number().int().min(0),
      w: z.number().int().min(1).max(12),
      h: z.number().int().min(1).max(8),
    }),
  })).max(10).default([]),
  schedule: reportScheduleEnum.default('none'),
  scheduleConfig: z.record(z.unknown()).default({}),
  recipients: z.array(z.string().email()).max(100).default([]),
  format: exportFormatEnum.default('pdf'),
});

export const updateReportSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  dataSource: dataSourceTypeEnum.optional(),
  filters: z.record(z.unknown()).optional(),
  groupBy: z.array(z.string().max(100)).max(10).optional(),
  sortBy: z.string().max(100).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  columns: z.array(z.object({
    key: z.string().max(100),
    label: z.string().max(200),
    type: z.string().max(50),
    format: z.string().max(50).optional(),
    width: z.number().int().min(50).max(500).optional(),
    visible: z.boolean().default(true),
  })).max(50).optional(),
  charts: z.array(z.object({
    id: z.string().uuid().optional(),
    type: chartTypeEnum,
    title: z.string().min(1).max(200),
    dataSource: dataSourceTypeEnum,
    xAxis: z.string().max(100),
    yAxis: z.string().max(100),
    series: z.array(z.string().max(100)).max(10).default([]),
    colors: z.array(z.string().max(20)).max(10).default([]),
    position: z.object({
      x: z.number().int().min(0).max(11),
      y: z.number().int().min(0),
      w: z.number().int().min(1).max(12),
      h: z.number().int().min(1).max(8),
    }),
  })).max(10).optional(),
  schedule: reportScheduleEnum.optional(),
  scheduleConfig: z.record(z.unknown()).optional(),
  recipients: z.array(z.string().email()).max(100).optional(),
  format: exportFormatEnum.optional(),
});

export const reportIdSchema = z.object({
  reportId: z.string().uuid(),
});

export const executeReportSchema = z.object({
  reportId: z.string().uuid(),
  format: exportFormatEnum.default('pdf'),
});

// --- Predictive AI Schemas ---

export const runPredictiveModelSchema = z.object({
  model: predictiveModelEnum,
  schoolId: z.string().uuid(),
  params: z.record(z.unknown()).optional(),
});

export const getPredictionsSchema = z.object({
  model: predictiveModelEnum,
  schoolId: z.string().uuid(),
  riskLevel: riskLevelEnum.optional(),
  minRiskScore: z.number().min(0).max(1).optional(),
  maxRiskScore: z.number().min(0).max(1).optional(),
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

// --- Analytics Query Schemas ---

export const getAcademicAnalyticsSchema = z.object({
  schoolId: z.string().uuid(),
  period: analyticsPeriodEnum.default('monthly'),
  ...dateRangeSchema.shape,
});

export const getFinancialAnalyticsSchema = z.object({
  schoolId: z.string().uuid(),
  period: analyticsPeriodEnum.default('monthly'),
  ...dateRangeSchema.shape,
});

export const getHrAnalyticsSchema = z.object({
  schoolId: z.string().uuid(),
  period: analyticsPeriodEnum.default('monthly'),
  ...dateRangeSchema.shape,
});

export const getStudentAnalyticsSchema = z.object({
  schoolId: z.string().uuid(),
  period: analyticsPeriodEnum.default('monthly'),
  classId: z.string().uuid().optional(),
  levelId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const getTeacherAnalyticsSchema = z.object({
  schoolId: z.string().uuid(),
  period: analyticsPeriodEnum.default('monthly'),
  departmentId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const getParentAnalyticsSchema = z.object({
  schoolId: z.string().uuid(),
  period: analyticsPeriodEnum.default('monthly'),
  ...dateRangeSchema.shape,
});

export const getExecutiveDashboardSchema = z.object({
  ...dateRangeSchema.shape,
});

// --- Export/Import Schemas ---

export const exportDataSchema = z.object({
  format: exportFormatEnum,
  dataSource: dataSourceTypeEnum,
  filters: z.record(z.unknown()).optional(),
  columns: z.array(z.string().max(100)).max(50).optional(),
  ...dateRangeSchema.shape,
});

export const importDataSchema = z.object({
  format: exportFormatEnum,
  dataSource: dataSourceTypeEnum,
  data: z.record(z.unknown()),
  validateOnly: z.boolean().default(false),
});

// --- Scheduled Report Schemas ---

export const createScheduledReportSchema = z.object({
  reportConfigId: z.string().uuid(),
  schedule: reportScheduleEnum,
  recipients: z.array(z.string().email()).min(1).max(50),
  channel: z.enum(['email', 'sms', 'push', 'webhook']),
});

export const updateScheduledReportSchema = z.object({
  schedule: reportScheduleEnum.optional(),
  recipients: z.array(z.string().email()).min(1).max(50).optional(),
  channel: z.enum(['email', 'sms', 'push', 'webhook']).optional(),
  status: z.enum(['active', 'paused', 'disabled']).optional(),
});

export const scheduledReportIdSchema = z.object({
  scheduledReportId: z.string().uuid(),
});

// --- KPI Schemas ---

export const getKPISchema = z.object({
  schoolId: z.string().uuid().optional(),
  type: z.enum(['revenue', 'students', 'teachers', 'attendance', 'performance', 'enrollment', 'retention', 'satisfaction', 'cost', 'profit']).optional(),
  period: analyticsPeriodEnum.default('monthly'),
  ...dateRangeSchema.shape,
});

export const getKPITrendSchema = z.object({
  kpiId: z.string().uuid(),
  period: analyticsPeriodEnum.default('monthly'),
  ...dateRangeSchema.shape,
});

// --- Data Warehouse Schemas ---

export const getFactTableSchema = z.object({
  schoolId: z.string().uuid().optional(),
  metric: z.string().max(100).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
});

export const getDimensionSchema = z.object({
  type: z.string().max(100),
});

export const runETLSchema = z.object({
  jobId: z.string().uuid(),
});

// --- Snapshot Schemas ---

export const createSnapshotSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  description: z.string().max(1000).optional(),
});

export const restoreSnapshotSchema = z.object({
  snapshotId: z.string().uuid(),
  confirm: z.literal(true),
});

// --- Analytics Event Schemas ---

export const logAnalyticsEventSchema = z.object({
  schoolId: z.string().uuid(),
  event: z.string().min(1).max(200),
  data: z.record(z.unknown()).default({}),
});

export const getAnalyticsEventsSchema = z.object({
  schoolId: z.string().uuid(),
  event: z.string().max(200).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
});

// --- Bulk Analytics Schemas ---

export const bulkExportSchema = z.object({
  format: exportFormatEnum,
  dataSources: z.array(dataSourceTypeEnum).min(1).max(13),
  filters: z.record(z.unknown()).optional(),
  ...dateRangeSchema.shape,
});

export const bulkImportSchema = z.object({
  format: exportFormatEnum,
  dataSources: z.array(dataSourceTypeEnum).min(1).max(13),
  data: z.record(z.unknown()),
  validateOnly: z.boolean().default(false),
});
