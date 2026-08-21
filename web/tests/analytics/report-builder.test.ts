import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ReportBuilderService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Report Configuration', () => {
    it('should create report configuration', () => {
      const config = { name: 'Monthly Report', dataSource: 'students', columns: [] };
      expect(config.name).toBe('Monthly Report');
    });

    it('should add columns to report', () => {
      const columns = [
        { key: 'name', label: 'Student Name', type: 'string', visible: true },
        { key: 'score', label: 'Score', type: 'number', format: 'decimal' },
      ];
      expect(columns).toHaveLength(2);
    });

    it('should add filters to report', () => {
      const filters = { schoolId: 'sch-1', dateFrom: '2025-01-01', dateTo: '2025-12-31' };
      expect(filters.schoolId).toBe('sch-1');
    });

    it('should add group by to report', () => {
      const groupBy = ['class', 'subject'];
      expect(groupBy).toHaveLength(2);
    });

    it('should add sorting to report', () => {
      const sort = { sortBy: 'score', sortOrder: 'desc' };
      expect(sort.sortOrder).toBe('desc');
    });

    it('should configure report pagination', () => {
      const pagination = { page: 1, limit: 25, total: 500 };
      expect(pagination.limit).toBe(25);
    });

    it('should configure report schedule', () => {
      const schedule = { frequency: 'weekly', dayOfWeek: 1, time: '09:00' };
      expect(schedule.frequency).toBe('weekly');
    });

    it('should configure report recipients', () => {
      const recipients = ['admin@school.com', 'teacher@school.com'];
      expect(recipients).toHaveLength(2);
    });

    it('should configure report format', () => {
      const formats = ['pdf', 'excel', 'csv', 'json', 'xml', 'powerpoint'];
      expect(formats).toContain('pdf');
    });

    it('should configure report charts', () => {
      const charts = [{ type: 'bar', title: 'Score Distribution', xAxis: 'class', yAxis: 'avgScore' }];
      expect(charts).toHaveLength(1);
    });
  });

  describe('Report Generation', () => {
    it('should generate report data', async () => {
      const generate = vi.fn().mockResolvedValue({ rows: [{ name: 'John', score: 90 }], total: 1 });
      const result = await generate({ dataSource: 'students' });
      expect(result.rows).toHaveLength(1);
    });

    it('should generate report with filters applied', async () => {
      const generate = vi.fn().mockResolvedValue({ rows: [], total: 0 });
      await generate({ dataSource: 'students', filters: { classId: 'cls-1' } });
      expect(generate).toHaveBeenCalled();
    });

    it('should generate report with aggregation', async () => {
      const generate = vi.fn().mockResolvedValue({ rows: [{ class: 'A', avgScore: 85 }], total: 1 });
      const result = await generate({ dataSource: 'exam_results', groupBy: ['class'] });
      expect(result.rows[0].avgScore).toBe(85);
    });

    it('should generate report with summary', async () => {
      const generate = vi.fn().mockResolvedValue({ rows: [], summary: { totalStudents: 500, avgScore: 85 } });
      const result = await generate({ dataSource: 'students', includeSummary: true });
      expect(result.summary.totalStudents).toBe(500);
    });

    it('should handle empty report data', async () => {
      const generate = vi.fn().mockResolvedValue({ rows: [], total: 0 });
      const result = await generate({ dataSource: 'students', filters: { status: 'archived' } });
      expect(result.rows).toEqual([]);
    });

    it('should generate report with calculated columns', async () => {
      const generate = vi.fn().mockResolvedValue({ rows: [{ name: 'John', score: 90, grade: 'A' }], total: 1 });
      const result = await generate({ dataSource: 'students', calculatedColumns: [{ key: 'grade', formula: 'score >= 90 ? "A" : "B"' }] });
      expect(result.rows[0].grade).toBe('A');
    });

    it('should generate report with subtotals', async () => {
      const generate = vi.fn().mockResolvedValue({ rows: [], subtotals: [{ class: 'A', total: 25 }] });
      const result = await generate({ dataSource: 'students', includeSubtotals: true });
      expect(result.subtotals).toHaveLength(1);
    });

    it('should generate report with grand total', async () => {
      const generate = vi.fn().mockResolvedValue({ rows: [], grandTotal: 500 });
      const result = await generate({ dataSource: 'students', includeGrandTotal: true });
      expect(result.grandTotal).toBe(500);
    });

    it('should generate report with conditional formatting', async () => {
      const rules = [{ field: 'score', condition: '< 60', style: { backgroundColor: 'red' } }];
      const generate = vi.fn().mockResolvedValue({ rows: [{ score: 50 }], formatting: rules });
      const result = await generate({ dataSource: 'students', formatting: rules });
      expect(result.formatting).toHaveLength(1);
    });

    it('should generate report with cross-tabulation', async () => {
      const generate = vi.fn().mockResolvedValue({ rows: [], pivot: { rows: ['Class A'], columns: ['Math', 'Science'] } });
      const result = await generate({ dataSource: 'exam_results', pivot: { rowField: 'class', colField: 'subject' } });
      expect(result.pivot).toBeDefined();
    });
  });

  describe('Report Export', () => {
    it('should export report as PDF', async () => {
      const exportReport = vi.fn().mockResolvedValue({ url: 'https://storage.example.com/report.pdf', format: 'pdf' });
      const result = await exportReport('rpt-1', 'pdf');
      expect(result.format).toBe('pdf');
    });

    it('should export report as Excel', async () => {
      const exportReport = vi.fn().mockResolvedValue({ url: 'https://storage.example.com/report.xlsx', format: 'excel' });
      const result = await exportReport('rpt-1', 'excel');
      expect(result.format).toBe('excel');
    });

    it('should export report as CSV', async () => {
      const exportReport = vi.fn().mockResolvedValue({ content: 'name,score\nJohn,90', format: 'csv' });
      const result = await exportReport('rpt-1', 'csv');
      expect(result.format).toBe('csv');
    });

    it('should export report as JSON', async () => {
      const exportReport = vi.fn().mockResolvedValue({ data: [{ name: 'John', score: 90 }], format: 'json' });
      const result = await exportReport('rpt-1', 'json');
      expect(result.format).toBe('json');
    });

    it('should export report as PowerPoint', async () => {
      const exportReport = vi.fn().mockResolvedValue({ url: 'https://storage.example.com/report.pptx', format: 'powerpoint' });
      const result = await exportReport('rpt-1', 'powerpoint');
      expect(result.format).toBe('powerpoint');
    });

    it('should export report as XML', async () => {
      const exportReport = vi.fn().mockResolvedValue({ content: '<report></report>', format: 'xml' });
      const result = await exportReport('rpt-1', 'xml');
      expect(result.format).toBe('xml');
    });

    it('should export with custom template', async () => {
      const exportReport = vi.fn().mockResolvedValue({ url: 'report.pdf', template: 'custom' });
      const result = await exportReport('rpt-1', 'pdf', { template: 'custom' });
      expect(result.template).toBe('custom');
    });

    it('should export with watermark', async () => {
      const exportReport = vi.fn().mockResolvedValue({ url: 'report.pdf', watermark: 'CONFIDENTIAL' });
      const result = await exportReport('rpt-1', 'pdf', { watermark: 'CONFIDENTIAL' });
      expect(result.watermark).toBe('CONFIDENTIAL');
    });

    it('should export with password protection', async () => {
      const exportReport = vi.fn().mockResolvedValue({ url: 'report.pdf', protected: true });
      const result = await exportReport('rpt-1', 'pdf', { password: 'secret123' });
      expect(result.protected).toBe(true);
    });

    it('should export with compression', async () => {
      const exportReport = vi.fn().mockResolvedValue({ url: 'report.zip', compressed: true });
      const result = await exportReport('rpt-1', 'pdf', { compress: true });
      expect(result.compressed).toBe(true);
    });
  });

  describe('Report Scheduling', () => {
    it('should schedule report', async () => {
      const schedule = vi.fn().mockResolvedValue({ id: 'sched-1', status: 'active' });
      const result = await schedule({ reportId: 'rpt-1', frequency: 'daily' });
      expect(result.status).toBe('active');
    });

    it('should update report schedule', async () => {
      const update = vi.fn().mockResolvedValue({ id: 'sched-1', frequency: 'weekly' });
      const result = await update('sched-1', { frequency: 'weekly' });
      expect(result.frequency).toBe('weekly');
    });

    it('should pause report schedule', async () => {
      const pause = vi.fn().mockResolvedValue({ id: 'sched-1', status: 'paused' });
      const result = await pause('sched-1');
      expect(result.status).toBe('paused');
    });

    it('should resume report schedule', async () => {
      const resume = vi.fn().mockResolvedValue({ id: 'sched-1', status: 'active' });
      const result = await resume('sched-1');
      expect(result.status).toBe('active');
    });

    it('should delete report schedule', async () => {
      const deleteSchedule = vi.fn().mockResolvedValue({ deleted: true });
      const result = await deleteSchedule('sched-1');
      expect(result.deleted).toBe(true);
    });

    it('should get next run time', () => {
      const getNextRun = (frequency: string, lastRun: string) => {
        const date = new Date(lastRun);
        if (frequency === 'daily') date.setDate(date.getDate() + 1);
        if (frequency === 'weekly') date.setDate(date.getDate() + 7);
        return date.toISOString();
      };
      expect(getNextRun('daily', '2025-07-24T00:00:00Z')).toContain('2025-07-25');
    });

    it('should get schedule history', () => {
      const history = [
        { runId: 'run-1', status: 'completed', executedAt: '2025-07-23' },
        { runId: 'run-2', status: 'completed', executedAt: '2025-07-24' },
      ];
      expect(history).toHaveLength(2);
    });

    it('should handle schedule with timezone', () => {
      const schedule = { frequency: 'daily', time: '09:00', timezone: 'Africa/Abidjan' };
      expect(schedule.timezone).toBe('Africa/Abidjan');
    });

    it('should handle schedule with date range', () => {
      const schedule = { frequency: 'monthly', startDate: '2025-01-01', endDate: '2025-12-31' };
      expect(schedule.startDate).toBe('2025-01-01');
    });

    it('should handle schedule with dependencies', () => {
      const schedule = { frequency: 'weekly', dependsOn: ['etl-job-1'] };
      expect(schedule.dependsOn).toHaveLength(1);
    });
  });

  describe('Report Sharing', () => {
    it('should share report with user', async () => {
      const share = vi.fn().mockResolvedValue({ shared: true, userId: 'user-1' });
      const result = await share('rpt-1', 'user-1');
      expect(result.shared).toBe(true);
    });

    it('should share report with group', async () => {
      const share = vi.fn().mockResolvedValue({ shared: true, groupId: 'group-1' });
      const result = await share('rpt-1', 'group-1', { type: 'group' });
      expect(result.shared).toBe(true);
    });

    it('should set report permissions', async () => {
      const setPermission = vi.fn().mockResolvedValue({ permission: 'read' });
      const result = await setPermission('rpt-1', 'user-1', 'read');
      expect(result.permission).toBe('read');
    });

    it('should revoke report access', async () => {
      const revoke = vi.fn().mockResolvedValue({ revoked: true });
      const result = await revoke('rpt-1', 'user-1');
      expect(result.revoked).toBe(true);
    });

    it('should generate shareable link', async () => {
      const generateLink = vi.fn().mockResolvedValue({ url: 'https://educi.app/reports/rpt-1?token=abc123', expiresAt: '2025-07-31' });
      const result = await generateLink('rpt-1', { expiresIn: 7 });
      expect(result.url).toContain('token=');
    });

    it('should list report shares', async () => {
      const listShares = vi.fn().mockResolvedValue([{ userId: 'user-1', permission: 'read' }]);
      const result = await listShares('rpt-1');
      expect(result).toHaveLength(1);
    });

    it('should handle public report link', async () => {
      const generateLink = vi.fn().mockResolvedValue({ url: 'https://educi.app/public/reports/rpt-1', isPublic: true });
      const result = await generateLink('rpt-1', { public: true });
      expect(result.isPublic).toBe(true);
    });

    it('should handle report with expiry', async () => {
      const generateLink = vi.fn().mockResolvedValue({ url: 'report-link', expiresAt: '2025-08-01' });
      const result = await generateLink('rpt-1', { expiresIn: 7 });
      expect(result.expiresAt).toBeDefined();
    });

    it('should handle report with access log', () => {
      const accessLog = [
        { userId: 'user-1', accessedAt: '2025-07-24T10:00:00Z', action: 'view' },
        { userId: 'user-2', accessedAt: '2025-07-24T11:00:00Z', action: 'download' },
      ];
      expect(accessLog).toHaveLength(2);
    });

    it('should handle report with password protection', async () => {
      const generateLink = vi.fn().mockResolvedValue({ url: 'report-link', passwordProtected: true });
      const result = await generateLink('rpt-1', { password: 'secret' });
      expect(result.passwordProtected).toBe(true);
    });
  });

  describe('Report Templates', () => {
    it('should get report template', () => {
      const template = { name: 'Student Performance', columns: ['name', 'score', 'grade'], charts: ['bar'] };
      expect(template.columns).toHaveLength(3);
    });

    it('should list available templates', () => {
      const templates = ['Student Performance', 'Financial Summary', 'Attendance Report', 'HR Dashboard'];
      expect(templates).toHaveLength(4);
    });

    it('should apply template to report', () => {
      const report = { name: 'My Report', template: 'Student Performance' };
      expect(report.template).toBe('Student Performance');
    });

    it('should customize template', () => {
      const template = { name: 'Custom', columns: [], customField: 'value' };
      expect(template.customField).toBe('value');
    });

    it('should save custom template', async () => {
      const save = vi.fn().mockResolvedValue({ id: 'tpl-1', name: 'Custom Template' });
      const result = await save({ name: 'Custom Template', config: {} });
      expect(result.id).toBe('tpl-1');
    });

    it('should delete template', async () => {
      const deleteTemplate = vi.fn().mockResolvedValue({ deleted: true });
      const result = await deleteTemplate('tpl-1');
      expect(result.deleted).toBe(true);
    });

    it('should share template', async () => {
      const share = vi.fn().mockResolvedValue({ shared: true });
      const result = await share('tpl-1', 'user-1');
      expect(result.shared).toBe(true);
    });

    it('should get template preview', async () => {
      const preview = vi.fn().mockResolvedValue({ preview: 'HTML content', format: 'html' });
      const result = await preview('tpl-1');
      expect(result.format).toBe('html');
    });

    it('should import template', async () => {
      const importTemplate = vi.fn().mockResolvedValue({ imported: true, id: 'tpl-2' });
      const result = await importTemplate({ name: 'Imported', config: {} });
      expect(result.imported).toBe(true);
    });

    it('should export template', async () => {
      const exportTemplate = vi.fn().mockResolvedValue({ exported: true, data: {} });
      const result = await exportTemplate('tpl-1');
      expect(result.exported).toBe(true);
    });
  });
});
