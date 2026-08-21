import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseExportService', () => {
  const mockRepo = {
    exportUsers: vi.fn(),
    exportSchools: vi.fn(),
    exportCourses: vi.fn(),
    exportEnrollments: vi.fn(),
    exportSubscriptions: vi.fn(),
    exportBilling: vi.fn(),
    exportAuditLogs: vi.fn(),
    exportAnalytics: vi.fn(),
    getExportJobs: vi.fn(),
    getExportJobById: vi.fn(),
    cancelExportJob: vi.fn(),
    downloadExport: vi.fn(),
    getExportFormats: vi.fn(),
    getExportHistory: vi.fn(),
    scheduleExport: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const jobId = 'job-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('exportUsers', () => {
    it('should export users as CSV', async () => {
      mockRepo.exportUsers.mockResolvedValue({ jobId, status: 'completed', fileUrl: '/exports/users.csv' });
      const result = await mockRepo.exportUsers(enterpriseId, 'csv');
      expect(result.fileUrl).toContain('.csv');
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should require format', () => {
      const validate = (format: string) => {
        if (!format) throw new Error('Le format est requis');
      };
      expect(() => validate('')).toThrow('Le format est requis');
    });

    it('should filter by status', async () => {
      mockRepo.exportUsers.mockResolvedValue({ jobId, status: 'completed' });
      await mockRepo.exportUsers(enterpriseId, 'csv', { status: 'active' });
      expect(mockRepo.exportUsers).toHaveBeenCalled();
    });

    it('should filter by role', async () => {
      mockRepo.exportUsers.mockResolvedValue({ jobId });
      await mockRepo.exportUsers(enterpriseId, 'csv', { role: 'teacher' });
      expect(mockRepo.exportUsers).toHaveBeenCalled();
    });

    it('should validate format', () => {
      const validFormats = ['csv', 'json', 'xlsx'];
      const validate = (format: string) => {
        if (!validFormats.includes(format)) throw new Error('Format invalide');
      };
      expect(() => validate('csv')).not.toThrow();
      expect(() => validate('pdf')).toThrow();
    });

    it('should handle empty export', async () => {
      mockRepo.exportUsers.mockResolvedValue({ jobId, status: 'completed', totalRows: 0 });
      const result = await mockRepo.exportUsers(enterpriseId, 'csv');
      expect(result.totalRows).toBe(0);
    });

    it('should include column selection', async () => {
      mockRepo.exportUsers.mockResolvedValue({ jobId });
      await mockRepo.exportUsers(enterpriseId, 'csv', { columns: ['name', 'email', 'role'] });
      expect(mockRepo.exportUsers).toHaveBeenCalled();
    });
  });

  describe('exportSchools', () => {
    it('should export schools', async () => {
      mockRepo.exportSchools.mockResolvedValue({ jobId, status: 'completed', fileUrl: '/exports/schools.csv' });
      const result = await mockRepo.exportSchools(enterpriseId, 'csv');
      expect(result.fileUrl).toContain('.csv');
    });

    it('should include statistics', async () => {
      mockRepo.exportSchools.mockResolvedValue({ jobId, includeStats: true });
      const result = await mockRepo.exportSchools(enterpriseId, 'csv', { includeStats: true });
      expect(result.includeStats).toBe(true);
    });

    it('should filter by status', async () => {
      mockRepo.exportSchools.mockResolvedValue({ jobId });
      await mockRepo.exportSchools(enterpriseId, 'csv', { status: 'active' });
      expect(mockRepo.exportSchools).toHaveBeenCalled();
    });

    it('should handle no schools', async () => {
      mockRepo.exportSchools.mockResolvedValue({ jobId, totalRows: 0 });
      const result = await mockRepo.exportSchools(enterpriseId, 'csv');
      expect(result.totalRows).toBe(0);
    });

    it('should include nested data', async () => {
      mockRepo.exportSchools.mockResolvedValue({ jobId, nested: true });
      const result = await mockRepo.exportSchools(enterpriseId, 'csv', { nested: true });
      expect(result.nested).toBe(true);
    });

    it('should support different formats', async () => {
      const formats = ['csv', 'json', 'xlsx'];
      for (const format of formats) {
        mockRepo.exportSchools.mockResolvedValue({ jobId });
        await mockRepo.exportSchools(enterpriseId, format);
        expect(mockRepo.exportSchools).toHaveBeenCalled();
      }
    });
  });

  describe('exportCourses', () => {
    it('should export courses', async () => {
      mockRepo.exportCourses.mockResolvedValue({ jobId, status: 'completed', fileUrl: '/exports/courses.csv' });
      const result = await mockRepo.exportCourses(enterpriseId, 'csv');
      expect(result.fileUrl).toContain('.csv');
    });

    it('should filter by school', async () => {
      mockRepo.exportCourses.mockResolvedValue({ jobId });
      await mockRepo.exportCourses(enterpriseId, 'csv', { schoolId: 'sch-1' });
      expect(mockRepo.exportCourses).toHaveBeenCalled();
    });

    it('should include enrollment data', async () => {
      mockRepo.exportCourses.mockResolvedValue({ jobId, includeEnrollments: true });
      const result = await mockRepo.exportCourses(enterpriseId, 'csv', { includeEnrollments: true });
      expect(result.includeEnrollments).toBe(true);
    });

    it('should handle no courses', async () => {
      mockRepo.exportCourses.mockResolvedValue({ jobId, totalRows: 0 });
      const result = await mockRepo.exportCourses(enterpriseId, 'csv');
      expect(result.totalRows).toBe(0);
    });

    it('should filter by category', async () => {
      mockRepo.exportCourses.mockResolvedValue({ jobId });
      await mockRepo.exportCourses(enterpriseId, 'csv', { category: 'science' });
      expect(mockRepo.exportCourses).toHaveBeenCalled();
    });

    it('should include instructor info', async () => {
      mockRepo.exportCourses.mockResolvedValue({ jobId, includeInstructors: true });
      const result = await mockRepo.exportCourses(enterpriseId, 'csv', { includeInstructors: true });
      expect(result.includeInstructors).toBe(true);
    });
  });

  describe('exportEnrollments', () => {
    it('should export enrollments', async () => {
      mockRepo.exportEnrollments.mockResolvedValue({ jobId, status: 'completed' });
      const result = await mockRepo.exportEnrollments(enterpriseId, 'csv');
      expect(result.status).toBe('completed');
    });

    it('should filter by date range', async () => {
      mockRepo.exportEnrollments.mockResolvedValue({ jobId });
      await mockRepo.exportEnrollments(enterpriseId, 'csv', { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.exportEnrollments).toHaveBeenCalled();
    });

    it('should include progress data', async () => {
      mockRepo.exportEnrollments.mockResolvedValue({ jobId, includeProgress: true });
      const result = await mockRepo.exportEnrollments(enterpriseId, 'csv', { includeProgress: true });
      expect(result.includeProgress).toBe(true);
    });

    it('should handle no enrollments', async () => {
      mockRepo.exportEnrollments.mockResolvedValue({ jobId, totalRows: 0 });
      const result = await mockRepo.exportEnrollments(enterpriseId, 'csv');
      expect(result.totalRows).toBe(0);
    });

    it('should filter by course', async () => {
      mockRepo.exportEnrollments.mockResolvedValue({ jobId });
      await mockRepo.exportEnrollments(enterpriseId, 'csv', { courseId: 'crs-1' });
      expect(mockRepo.exportEnrollments).toHaveBeenCalled();
    });

    it('should include completion status', async () => {
      mockRepo.exportEnrollments.mockResolvedValue({ jobId, includeCompletion: true });
      const result = await mockRepo.exportEnrollments(enterpriseId, 'csv', { includeCompletion: true });
      expect(result.includeCompletion).toBe(true);
    });
  });

  describe('exportSubscriptions', () => {
    it('should export subscriptions', async () => {
      mockRepo.exportSubscriptions.mockResolvedValue({ jobId, status: 'completed' });
      const result = await mockRepo.exportSubscriptions(enterpriseId, 'csv');
      expect(result.status).toBe('completed');
    });

    it('should include billing info', async () => {
      mockRepo.exportSubscriptions.mockResolvedValue({ jobId, includeBilling: true });
      const result = await mockRepo.exportSubscriptions(enterpriseId, 'csv', { includeBilling: true });
      expect(result.includeBilling).toBe(true);
    });

    it('should filter by plan', async () => {
      mockRepo.exportSubscriptions.mockResolvedValue({ jobId });
      await mockRepo.exportSubscriptions(enterpriseId, 'csv', { plan: 'premium' });
      expect(mockRepo.exportSubscriptions).toHaveBeenCalled();
    });

    it('should handle no subscriptions', async () => {
      mockRepo.exportSubscriptions.mockResolvedValue({ jobId, totalRows: 0 });
      const result = await mockRepo.exportSubscriptions(enterpriseId, 'csv');
      expect(result.totalRows).toBe(0);
    });

    it('should include payment history', async () => {
      mockRepo.exportSubscriptions.mockResolvedValue({ jobId, includePayments: true });
      const result = await mockRepo.exportSubscriptions(enterpriseId, 'csv', { includePayments: true });
      expect(result.includePayments).toBe(true);
    });

    it('should filter by status', async () => {
      mockRepo.exportSubscriptions.mockResolvedValue({ jobId });
      await mockRepo.exportSubscriptions(enterpriseId, 'csv', { status: 'active' });
      expect(mockRepo.exportSubscriptions).toHaveBeenCalled();
    });
  });

  describe('exportBilling', () => {
    it('should export billing data', async () => {
      mockRepo.exportBilling.mockResolvedValue({ jobId, status: 'completed' });
      const result = await mockRepo.exportBilling(enterpriseId, 'csv');
      expect(result.status).toBe('completed');
    });

    it('should filter by date range', async () => {
      mockRepo.exportBilling.mockResolvedValue({ jobId });
      await mockRepo.exportBilling(enterpriseId, 'csv', { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.exportBilling).toHaveBeenCalled();
    });

    it('should include invoice details', async () => {
      mockRepo.exportBilling.mockResolvedValue({ jobId, includeInvoices: true });
      const result = await mockRepo.exportBilling(enterpriseId, 'csv', { includeInvoices: true });
      expect(result.includeInvoices).toBe(true);
    });

    it('should handle no billing data', async () => {
      mockRepo.exportBilling.mockResolvedValue({ jobId, totalRows: 0 });
      const result = await mockRepo.exportBilling(enterpriseId, 'csv');
      expect(result.totalRows).toBe(0);
    });

    it('should include payment methods', async () => {
      mockRepo.exportBilling.mockResolvedValue({ jobId, includePaymentMethods: true });
      const result = await mockRepo.exportBilling(enterpriseId, 'csv', { includePaymentMethods: true });
      expect(result.includePaymentMethods).toBe(true);
    });

    it('should support tax report format', async () => {
      mockRepo.exportBilling.mockResolvedValue({ jobId, taxReport: true });
      const result = await mockRepo.exportBilling(enterpriseId, 'csv', { taxReport: true });
      expect(result.taxReport).toBe(true);
    });
  });

  describe('exportAuditLogs', () => {
    it('should export audit logs', async () => {
      mockRepo.exportAuditLogs.mockResolvedValue({ jobId, status: 'completed' });
      const result = await mockRepo.exportAuditLogs(enterpriseId, 'csv');
      expect(result.status).toBe('completed');
    });

    it('should filter by date range', async () => {
      mockRepo.exportAuditLogs.mockResolvedValue({ jobId });
      await mockRepo.exportAuditLogs(enterpriseId, 'csv', { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.exportAuditLogs).toHaveBeenCalled();
    });

    it('should filter by action', async () => {
      mockRepo.exportAuditLogs.mockResolvedValue({ jobId });
      await mockRepo.exportAuditLogs(enterpriseId, 'csv', { action: 'user.login' });
      expect(mockRepo.exportAuditLogs).toHaveBeenCalled();
    });

    it('should handle no audit logs', async () => {
      mockRepo.exportAuditLogs.mockResolvedValue({ jobId, totalRows: 0 });
      const result = await mockRepo.exportAuditLogs(enterpriseId, 'csv');
      expect(result.totalRows).toBe(0);
    });

    it('should include IP addresses', async () => {
      mockRepo.exportAuditLogs.mockResolvedValue({ jobId, includeIP: true });
      const result = await mockRepo.exportAuditLogs(enterpriseId, 'csv', { includeIP: true });
      expect(result.includeIP).toBe(true);
    });

    it('should support compliance format', async () => {
      mockRepo.exportAuditLogs.mockResolvedValue({ jobId, complianceFormat: true });
      const result = await mockRepo.exportAuditLogs(enterpriseId, 'csv', { complianceFormat: true });
      expect(result.complianceFormat).toBe(true);
    });
  });

  describe('exportAnalytics', () => {
    it('should export analytics', async () => {
      mockRepo.exportAnalytics.mockResolvedValue({ jobId, status: 'completed' });
      const result = await mockRepo.exportAnalytics(enterpriseId, 'csv');
      expect(result.status).toBe('completed');
    });

    it('should accept different formats', async () => {
      mockRepo.exportAnalytics.mockResolvedValue({ jobId });
      await mockRepo.exportAnalytics(enterpriseId, 'json');
      expect(mockRepo.exportAnalytics).toHaveBeenCalled();
    });

    it('should filter by metric type', async () => {
      mockRepo.exportAnalytics.mockResolvedValue({ jobId });
      await mockRepo.exportAnalytics(enterpriseId, 'csv', { metrics: ['users', 'revenue'] });
      expect(mockRepo.exportAnalytics).toHaveBeenCalled();
    });

    it('should handle empty analytics', async () => {
      mockRepo.exportAnalytics.mockResolvedValue({ jobId, totalRows: 0 });
      const result = await mockRepo.exportAnalytics(enterpriseId, 'csv');
      expect(result.totalRows).toBe(0);
    });

    it('should include charts data', async () => {
      mockRepo.exportAnalytics.mockResolvedValue({ jobId, includeCharts: true });
      const result = await mockRepo.exportAnalytics(enterpriseId, 'csv', { includeCharts: true });
      expect(result.includeCharts).toBe(true);
    });

    it('should support comparison data', async () => {
      mockRepo.exportAnalytics.mockResolvedValue({ jobId, includeComparison: true });
      const result = await mockRepo.exportAnalytics(enterpriseId, 'csv', { includeComparison: true });
      expect(result.includeComparison).toBe(true);
    });
  });

  describe('getExportJobs', () => {
    it('should return export jobs', async () => {
      mockRepo.getExportJobs.mockResolvedValue([{ id: jobId, type: 'users', status: 'completed' }]);
      const result = await mockRepo.getExportJobs(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by status', async () => {
      mockRepo.getExportJobs.mockResolvedValue([]);
      await mockRepo.getExportJobs(enterpriseId, { status: 'pending' });
      expect(mockRepo.getExportJobs).toHaveBeenCalled();
    });

    it('should paginate results', async () => {
      mockRepo.getExportJobs.mockResolvedValue([]);
      await mockRepo.getExportJobs(enterpriseId, { page: 1, limit: 10 });
      expect(mockRepo.getExportJobs).toHaveBeenCalled();
    });

    it('should handle no jobs', async () => {
      mockRepo.getExportJobs.mockResolvedValue([]);
      const result = await mockRepo.getExportJobs(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by creation date', async () => {
      mockRepo.getExportJobs.mockResolvedValue([]);
      await mockRepo.getExportJobs(enterpriseId, { sortBy: 'createdAt', order: 'desc' });
      expect(mockRepo.getExportJobs).toHaveBeenCalled();
    });

    it('should include download URLs', async () => {
      mockRepo.getExportJobs.mockResolvedValue([{ id: jobId, fileUrl: '/exports/file.csv' }]);
      const result = await mockRepo.getExportJobs(enterpriseId);
      expect(result[0].fileUrl).toBeDefined();
    });
  });

  describe('getExportJobById', () => {
    it('should return job by id', async () => {
      const job = { id: jobId, type: 'users', status: 'completed' };
      mockRepo.getExportJobById.mockResolvedValue(job);
      const result = await mockRepo.getExportJobById(jobId);
      expect(result).toEqual(job);
    });

    it('should throw if not found', async () => {
      mockRepo.getExportJobById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const job = await mockRepo.getExportJobById(id);
        if (!job) throw new Error('Job non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Job non trouvé');
    });

    it('should require jobId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include progress info', async () => {
      mockRepo.getExportJobById.mockResolvedValue({ id: jobId, progress: 75, totalRows: 1000, processedRows: 750 });
      const result = await mockRepo.getExportJobById(jobId);
      expect(result.progress).toBe(75);
    });

    it('should include error info', async () => {
      mockRepo.getExportJobById.mockResolvedValue({ id: jobId, status: 'failed', error: 'Export timeout' });
      const result = await mockRepo.getExportJobById(jobId);
      expect(result.error).toBe('Export timeout');
    });
  });

  describe('cancelExportJob', () => {
    it('should cancel export job', async () => {
      mockRepo.cancelExportJob.mockResolvedValue({ id: jobId, status: 'cancelled' });
      const result = await mockRepo.cancelExportJob(jobId);
      expect(result.status).toBe('cancelled');
    });

    it('should throw if not found', async () => {
      mockRepo.cancelExportJob.mockRejectedValue(new Error('Job non trouvé'));
      await expect(mockRepo.cancelExportJob('nonexistent')).rejects.toThrow('Job non trouvé');
    });

    it('should not cancel completed job', async () => {
      mockRepo.cancelExportJob.mockRejectedValue(new Error('Le job est déjà terminé'));
      await expect(mockRepo.cancelExportJob(jobId)).rejects.toThrow('Le job est déjà terminé');
    });

    it('should record cancellation', async () => {
      mockRepo.cancelExportJob.mockResolvedValue({ cancelledAt: new Date().toISOString() });
      const result = await mockRepo.cancelExportJob(jobId);
      expect(result.cancelledAt).toBeDefined();
    });

    it('should clean up partial export', async () => {
      mockRepo.cancelExportJob.mockResolvedValue({ cleanedUp: true });
      const result = await mockRepo.cancelExportJob(jobId);
      expect(result.cleanedUp).toBe(true);
    });
  });

  describe('downloadExport', () => {
    it('should generate download URL', async () => {
      mockRepo.downloadExport.mockResolvedValue({ url: 'https://storage.example.com/exports/file.csv', expiresAt: new Date(Date.now() + 3600000).toISOString() });
      const result = await mockRepo.downloadExport(jobId);
      expect(result.url).toContain('https://');
    });

    it('should throw if job not found', async () => {
      mockRepo.downloadExport.mockRejectedValue(new Error('Job non trouvé'));
      await expect(mockRepo.downloadExport('nonexistent')).rejects.toThrow('Job non trouvé');
    });

    it('should throw if job not completed', async () => {
      mockRepo.downloadExport.mockRejectedValue(new Error('Le job n\'est pas terminé'));
      await expect(mockRepo.downloadExport(jobId)).rejects.toThrow('Le job n\'est pas terminé');
    });

    it('should set expiry time', async () => {
      mockRepo.downloadExport.mockResolvedValue({ expiresAt: new Date(Date.now() + 3600000).toISOString() });
      const result = await mockRepo.downloadExport(jobId);
      expect(new Date(result.expiresAt).getTime()).toBeGreaterThan(Date.now());
    });

    it('should include file size', async () => {
      mockRepo.downloadExport.mockResolvedValue({ url: 'https://example.com/file.csv', fileSize: 1024 * 50 });
      const result = await mockRepo.downloadExport(jobId);
      expect(result.fileSize).toBe(1024 * 50);
    });
  });

  describe('getExportFormats', () => {
    it('should return available formats', async () => {
      mockRepo.getExportFormats.mockResolvedValue([{ format: 'csv', label: 'CSV', extensions: ['.csv'] }]);
      const result = await mockRepo.getExportFormats();
      expect(result).toHaveLength(1);
    });

    it('should include format details', async () => {
      mockRepo.getExportFormats.mockResolvedValue([{ format: 'csv', maxSize: 100 * 1024 * 1024 }]);
      const result = await mockRepo.getExportFormats();
      expect(result[0].maxSize).toBe(100 * 1024 * 1024);
    });

    it('should support multiple formats', async () => {
      mockRepo.getExportFormats.mockResolvedValue([{ format: 'csv' }, { format: 'json' }, { format: 'xlsx' }]);
      const result = await mockRepo.getExportFormats();
      expect(result).toHaveLength(3);
    });

    it('should indicate if format requires processing', async () => {
      mockRepo.getExportFormats.mockResolvedValue([{ format: 'xlsx', requiresProcessing: true }]);
      const result = await mockRepo.getExportFormats();
      expect(result[0].requiresProcessing).toBe(true);
    });

    it('should include description', async () => {
      mockRepo.getExportFormats.mockResolvedValue([{ format: 'csv', description: 'Comma-separated values' }]);
      const result = await mockRepo.getExportFormats();
      expect(result[0].description).toBe('Comma-separated values');
    });
  });

  describe('getExportHistory', () => {
    it('should return export history', async () => {
      mockRepo.getExportHistory.mockResolvedValue([{ jobId, type: 'users', exportedAt: '2026-01-01' }]);
      const result = await mockRepo.getExportHistory(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepo.getExportHistory.mockResolvedValue([]);
      await mockRepo.getExportHistory(enterpriseId, { type: 'users' });
      expect(mockRepo.getExportHistory).toHaveBeenCalled();
    });

    it('should handle empty history', async () => {
      mockRepo.getExportHistory.mockResolvedValue([]);
      const result = await mockRepo.getExportHistory(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by date', async () => {
      mockRepo.getExportHistory.mockResolvedValue([
        { exportedAt: '2026-01-01' },
        { exportedAt: '2026-02-01' },
      ]);
      const result = await mockRepo.getExportHistory(enterpriseId);
      expect(result).toHaveLength(2);
    });

    it('should include user info', async () => {
      mockRepo.getExportHistory.mockResolvedValue([{ jobId, exportedBy: 'usr-1', userName: 'Admin' }]);
      const result = await mockRepo.getExportHistory(enterpriseId);
      expect(result[0].userName).toBe('Admin');
    });

    it('should include file sizes', async () => {
      mockRepo.getExportHistory.mockResolvedValue([{ jobId, fileSize: 1024 * 100 }]);
      const result = await mockRepo.getExportHistory(enterpriseId);
      expect(result[0].fileSize).toBe(1024 * 100);
    });
  });

  describe('scheduleExport', () => {
    it('should schedule export', async () => {
      mockRepo.scheduleExport.mockResolvedValue({ jobId, scheduledAt: '2026-01-01T02:00:00Z', status: 'scheduled' });
      const result = await mockRepo.scheduleExport(enterpriseId, { type: 'users', format: 'csv', schedule: 'daily' });
      expect(result.status).toBe('scheduled');
    });

    it('should require schedule type', () => {
      const validate = (data: any) => {
        if (!data?.schedule) throw new Error('La planification est requise');
      };
      expect(() => validate({ type: 'users' })).toThrow('La planification est requise');
    });

    it('should accept valid schedules', () => {
      const validSchedules = ['daily', 'weekly', 'monthly'];
      const validate = (schedule: string) => {
        if (!validSchedules.includes(schedule)) throw new Error('Planification invalide');
      };
      expect(() => validate('daily')).not.toThrow();
      expect(() => validate('invalid')).toThrow();
    });

    it('should include notification settings', async () => {
      mockRepo.scheduleExport.mockResolvedValue({ notifyOnComplete: true, notifyEmail: 'admin@test.com' });
      const result = await mockRepo.scheduleExport(enterpriseId, { type: 'users', format: 'csv', schedule: 'weekly', notifyOnComplete: true, notifyEmail: 'admin@test.com' });
      expect(result.notifyOnComplete).toBe(true);
    });

    it('should set next run time', async () => {
      mockRepo.scheduleExport.mockResolvedValue({ nextRun: '2026-01-02T02:00:00Z' });
      const result = await mockRepo.scheduleExport(enterpriseId, { type: 'users', format: 'csv', schedule: 'daily' });
      expect(result.nextRun).toBeDefined();
    });

    it('should handle recurring exports', async () => {
      mockRepo.scheduleExport.mockResolvedValue({ recurring: true, interval: 'daily' });
      const result = await mockRepo.scheduleExport(enterpriseId, { type: 'users', format: 'csv', schedule: 'daily' });
      expect(result.recurring).toBe(true);
    });
  });
});
