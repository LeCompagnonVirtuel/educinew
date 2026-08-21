import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  createDashboardSchema,
  updateDashboardSchema,
  dashboardIdSchema,
  shareDashboardSchema,
  addWidgetSchema,
  updateWidgetSchema,
  widgetIdSchema,
  getChartDataSchema,
  getGeoMapDataSchema,
  getHeatmapDataSchema,
  getFunnelDataSchema,
  createReportSchema,
  updateReportSchema,
  reportIdSchema,
  executeReportSchema,
  runPredictiveModelSchema,
  getPredictionsSchema,
  getAcademicAnalyticsSchema,
  getFinancialAnalyticsSchema,
  getHrAnalyticsSchema,
  getStudentAnalyticsSchema,
  getTeacherAnalyticsSchema,
  getParentAnalyticsSchema,
  exportDataSchema,
  importDataSchema,
  createScheduledReportSchema,
  updateScheduledReportSchema,
  scheduledReportIdSchema,
  getKPISchema,
  getKPITrendSchema,
  getFactTableSchema,
  getDimensionSchema,
  runETLSchema,
  createSnapshotSchema,
  restoreSnapshotSchema,
  logAnalyticsEventSchema,
  getAnalyticsEventsSchema,
  bulkExportSchema,
  bulkImportSchema,
} from '../../src/features/analytics/validators/schemas';

describe('AnalyticsSchemas', () => {
  describe('createDashboardSchema', () => {
    it('should validate valid dashboard data', () => {
      const data = { name: 'Test Dashboard' };
      const result = createDashboardSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const data = { name: '' };
      const result = createDashboardSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should accept dashboard with description', () => {
      const data = { name: 'Dashboard', description: 'A test dashboard' };
      const result = createDashboardSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept dashboard with isDefault flag', () => {
      const data = { name: 'Default Dashboard', isDefault: true };
      const result = createDashboardSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept dashboard with widgets', () => {
      const data = {
        name: 'Widget Dashboard',
        widgets: [{
          type: 'kpi',
          title: 'Revenue KPI',
          dataSource: 'finance',
          config: {},
          position: { x: 0, y: 0, w: 4, h: 3 },
        }],
      };
      const result = createDashboardSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('updateDashboardSchema', () => {
    it('should validate valid update data', () => {
      const data = { name: 'Updated Dashboard' };
      const result = updateDashboardSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept partial update', () => {
      const data = { description: 'Updated description' };
      const result = updateDashboardSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept isDefault update', () => {
      const data = { isDefault: true };
      const result = updateDashboardSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('dashboardIdSchema', () => {
    it('should validate valid UUID', () => {
      const data = { dashboardId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = dashboardIdSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid UUID', () => {
      const data = { dashboardId: 'invalid-uuid' };
      const result = dashboardIdSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('shareDashboardSchema', () => {
    it('should validate valid share data', () => {
      const data = {
        dashboardId: '550e8400-e29b-41d4-a716-446655440000',
        userIds: ['550e8400-e29b-41d4-a716-446655440001'],
      };
      const result = shareDashboardSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty userIds', () => {
      const data = {
        dashboardId: '550e8400-e29b-41d4-a716-446655440000',
        userIds: [],
      };
      const result = shareDashboardSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('addWidgetSchema', () => {
    it('should validate valid widget data', () => {
      const data = {
        dashboardId: '550e8400-e29b-41d4-a716-446655440000',
        type: 'kpi',
        title: 'Revenue KPI',
        dataSource: 'finance',
        config: {},
        position: { x: 0, y: 0, w: 4, h: 3 },
      };
      const result = addWidgetSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid widget type', () => {
      const data = {
        dashboardId: '550e8400-e29b-41d4-a716-446655440000',
        type: 'invalid_type',
        title: 'Test',
        dataSource: 'students',
        config: {},
        position: { x: 0, y: 0, w: 4, h: 3 },
      };
      const result = addWidgetSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should accept all valid widget types', () => {
      const types = ['kpi', 'chart', 'table', 'map', 'gauge', 'heatmap', 'timeline', 'text', 'image', 'list', 'progress', 'comparison'];
      for (const type of types) {
        const data = {
          dashboardId: '550e8400-e29b-41d4-a716-446655440000',
          type,
          title: `Widget ${type}`,
          dataSource: 'students',
          config: {},
          position: { x: 0, y: 0, w: 4, h: 3 },
        };
        const result = addWidgetSchema.safeParse(data);
        expect(result.success).toBe(true);
      }
    });
  });

  describe('getChartDataSchema', () => {
    it('should validate valid chart data request', () => {
      const data = { dataSource: 'students', chartType: 'bar' };
      const result = getChartDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept chart with xAxis and yAxis', () => {
      const data = { dataSource: 'students', chartType: 'scatter', xAxis: 'gpa', yAxis: 'attendance' };
      const result = getChartDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept chart with series', () => {
      const data = { dataSource: 'students', chartType: 'line', series: ['Math', 'Science'] };
      const result = getChartDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getHeatmapDataSchema', () => {
    it('should validate valid heatmap data request', () => {
      const data = { dataSource: 'attendance', rowField: 'day', columnField: 'hour', valueField: 'rate' };
      const result = getHeatmapDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getFunnelDataSchema', () => {
    it('should validate valid funnel data request', () => {
      const data = { dataSource: 'enrollments', stages: ['Applied', 'Accepted', 'Enrolled'] };
      const result = getFunnelDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject stages with less than 2 items', () => {
      const data = { dataSource: 'enrollments', stages: ['Applied'] };
      const result = getFunnelDataSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('createReportSchema', () => {
    it('should validate valid report data', () => {
      const data = { name: 'Monthly Report', dataSource: 'students' };
      const result = createReportSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const data = { name: '', dataSource: 'students' };
      const result = createReportSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should accept report with columns', () => {
      const data = {
        name: 'Report',
        dataSource: 'students',
        columns: [{ key: 'name', label: 'Name', type: 'string' }],
      };
      const result = createReportSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('executeReportSchema', () => {
    it('should validate valid execute request', () => {
      const data = { reportId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = executeReportSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept format parameter', () => {
      const data = { reportId: '550e8400-e29b-41d4-a716-446655440000', format: 'excel' };
      const result = executeReportSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('runPredictiveModelSchema', () => {
    it('should validate valid model request', () => {
      const data = { model: 'dropout', schoolId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = runPredictiveModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid model type', () => {
      const data = { model: 'invalid_model', schoolId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = runPredictiveModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('getAcademicAnalyticsSchema', () => {
    it('should validate valid request', () => {
      const data = { schoolId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = getAcademicAnalyticsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept period parameter', () => {
      const data = { schoolId: '550e8400-e29b-41d4-a716-446655440000', period: 'quarterly' };
      const result = getAcademicAnalyticsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('exportDataSchema', () => {
    it('should validate valid export request', () => {
      const data = { format: 'pdf', dataSource: 'students' };
      const result = exportDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept all valid formats', () => {
      const formats = ['excel', 'pdf', 'csv', 'json', 'xml', 'powerpoint'];
      for (const format of formats) {
        const data = { format, dataSource: 'students' };
        const result = exportDataSchema.safeParse(data);
        expect(result.success).toBe(true);
      }
    });
  });

  describe('importDataSchema', () => {
    it('should validate valid import request', () => {
      const data = { format: 'csv', dataSource: 'students', data: {} };
      const result = importDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('createScheduledReportSchema', () => {
    it('should validate valid scheduled report', () => {
      const data = {
        reportConfigId: '550e8400-e29b-41d4-a716-446655440000',
        schedule: 'weekly',
        recipients: ['admin@school.com'],
        channel: 'email',
      };
      const result = createScheduledReportSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty recipients', () => {
      const data = {
        reportConfigId: '550e8400-e29b-41d4-a716-446655440000',
        schedule: 'weekly',
        recipients: [],
        channel: 'email',
      };
      const result = createScheduledReportSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('createSnapshotSchema', () => {
    it('should validate valid snapshot request', () => {
      const data = { schoolId: '550e8400-e29b-41d4-a716-446655440000', type: 'monthly' };
      const result = createSnapshotSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid snapshot type', () => {
      const data = { schoolId: '550e8400-e29b-41d4-a716-446655440000', type: 'invalid' };
      const result = createSnapshotSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('restoreSnapshotSchema', () => {
    it('should validate valid restore request', () => {
      const data = { snapshotId: '550e8400-e29b-41d4-a716-446655440000', confirm: true };
      const result = restoreSnapshotSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject confirm: false', () => {
      const data = { snapshotId: '550e8400-e29b-41d4-a716-446655440000', confirm: false };
      const result = restoreSnapshotSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('logAnalyticsEventSchema', () => {
    it('should validate valid event data', () => {
      const data = { schoolId: '550e8400-e29b-41d4-a716-446655440000', event: 'page_view' };
      const result = logAnalyticsEventSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty event name', () => {
      const data = { schoolId: '550e8400-e29b-41d4-a716-446655440000', event: '' };
      const result = logAnalyticsEventSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('getKPISchema', () => {
    it('should validate valid KPI request', () => {
      const data = {};
      const result = getKPISchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept type parameter', () => {
      const data = { type: 'revenue' };
      const result = getKPISchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('bulkExportSchema', () => {
    it('should validate valid bulk export', () => {
      const data = { format: 'csv', dataSources: ['students', 'teachers'] };
      const result = bulkExportSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty dataSources', () => {
      const data = { format: 'csv', dataSources: [] };
      const result = bulkExportSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('bulkImportSchema', () => {
    it('should validate valid bulk import', () => {
      const data = { format: 'csv', dataSources: ['students'], data: {} };
      const result = bulkImportSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getFactTableSchema', () => {
    it('should validate valid fact table request', () => {
      const data = {};
      const result = getFactTableSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getDimensionSchema', () => {
    it('should validate valid dimension request', () => {
      const data = { type: 'schools' };
      const result = getDimensionSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('runETLSchema', () => {
    it('should validate valid ETL request', () => {
      const data = { jobId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = runETLSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('widgetIdSchema', () => {
    it('should validate valid widget ID request', () => {
      const data = {
        dashboardId: '550e8400-e29b-41d4-a716-446655440000',
        widgetId: '550e8400-e29b-41d4-a716-446655440001',
      };
      const result = widgetIdSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('updateWidgetSchema', () => {
    it('should validate valid widget update', () => {
      const data = {
        dashboardId: '550e8400-e29b-41d4-a716-446655440000',
        widgetId: '550e8400-e29b-41d4-a716-446655440001',
        title: 'Updated Widget',
      };
      const result = updateWidgetSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getGeoMapDataSchema', () => {
    it('should validate valid geo map request', () => {
      const data = {};
      const result = getGeoMapDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept region parameter', () => {
      const data = { region: 'Abidjan' };
      const result = getGeoMapDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getPredictionsSchema', () => {
    it('should validate valid predictions request', () => {
      const data = { model: 'dropout', schoolId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = getPredictionsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept risk level filter', () => {
      const data = { model: 'dropout', schoolId: '550e8400-e29b-41d4-a716-446655440000', riskLevel: 'high' };
      const result = getPredictionsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getStudentAnalyticsSchema', () => {
    it('should validate valid student analytics request', () => {
      const data = { schoolId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = getStudentAnalyticsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getTeacherAnalyticsSchema', () => {
    it('should validate valid teacher analytics request', () => {
      const data = { schoolId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = getTeacherAnalyticsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getParentAnalyticsSchema', () => {
    it('should validate valid parent analytics request', () => {
      const data = { schoolId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = getParentAnalyticsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getKPITrendSchema', () => {
    it('should validate valid KPI trend request', () => {
      const data = { kpiId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = getKPITrendSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('updateScheduledReportSchema', () => {
    it('should validate valid update', () => {
      const data = { schedule: 'monthly' };
      const result = updateScheduledReportSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('scheduledReportIdSchema', () => {
    it('should validate valid ID', () => {
      const data = { scheduledReportId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = scheduledReportIdSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('getAnalyticsEventsSchema', () => {
    it('should validate valid events request', () => {
      const data = { schoolId: '550e8400-e29b-41d4-a716-446655440000' };
      const result = getAnalyticsEventsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});
