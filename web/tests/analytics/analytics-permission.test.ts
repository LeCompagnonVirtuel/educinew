import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAnalyticsPermissionService } from '../../src/features/analytics/services/analytics-permission.service';

const mockRepository = {
  checkAnalyticsPermission: vi.fn(),
  getAnalyticsPermissions: vi.fn(),
};

describe('AnalyticsPermissionService', () => {
  let service: ReturnType<typeof createAnalyticsPermissionService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createAnalyticsPermissionService(mockRepository as any);
  });

  describe('checkAnalyticsPermission', () => {
    it('should check permission with all params', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, resource: 'dashboard', action: 'view' });
      const result = await service.checkAnalyticsPermission('user-1', 'dashboard', 'view');
      expect(mockRepository.checkAnalyticsPermission).toHaveBeenCalledWith('user-1', 'dashboard', 'view');
      expect(result.granted).toBe(true);
    });

    it('should propagate errors from checkAnalyticsPermission', async () => {
      mockRepository.checkAnalyticsPermission.mockRejectedValue(new Error('Permission error'));
      await expect(service.checkAnalyticsPermission('user-1', 'dashboard', 'view')).rejects.toThrow('Permission error');
    });

    it('should check view permission for dashboard', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, role: 'admin' });
      const result = await service.checkAnalyticsPermission('admin-1', 'dashboard', 'view');
      expect(result.granted).toBe(true);
      expect(result.role).toBe('admin');
    });

    it('should check edit permission for report', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, role: 'editor' });
      const result = await service.checkAnalyticsPermission('editor-1', 'report', 'edit');
      expect(result.granted).toBe(true);
    });

    it('should check delete permission for widget', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: false, reason: 'Insufficient privileges' });
      const result = await service.checkAnalyticsPermission('viewer-1', 'widget', 'delete');
      expect(result.granted).toBe(false);
      expect(result.reason).toBe('Insufficient privileges');
    });

    it('should check create permission for chart', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, role: 'analyst' });
      const result = await service.checkAnalyticsPermission('analyst-1', 'chart', 'create');
      expect(result.granted).toBe(true);
    });

    it('should check export permission for data', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, exportLimit: 1000 });
      const result = await service.checkAnalyticsPermission('user-1', 'data', 'export');
      expect(result.granted).toBe(true);
      expect(result.exportLimit).toBe(1000);
    });

    it('should check share permission for dashboard', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: false, reason: 'Sharing not allowed' });
      const result = await service.checkAnalyticsPermission('basic-user', 'dashboard', 'share');
      expect(result.granted).toBe(false);
    });

    it('should check admin permission', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, role: 'admin', permissions: ['all'] });
      const result = await service.checkAnalyticsPermission('super-admin', 'system', 'admin');
      expect(result.granted).toBe(true);
      expect(result.permissions).toContain('all');
    });

    it('should check read-only permission', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, readOnly: true });
      const result = await service.checkAnalyticsPermission('viewer-1', 'analytics', 'read');
      expect(result.granted).toBe(true);
      expect(result.readOnly).toBe(true);
    });

    it('should check time-limited permission', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, expiresAt: '2025-12-31T23:59:59Z' });
      const result = await service.checkAnalyticsPermission('temp-user', 'report', 'view');
      expect(result.expiresAt).toBeDefined();
    });

    it('should check IP-restricted permission', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, ipRestricted: true, allowedIPs: ['192.168.1.0/24'] });
      const result = await service.checkAnalyticsPermission('secure-user', 'sensitive-data', 'view');
      expect(result.ipRestricted).toBe(true);
    });

    it('should check MFA-required permission', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, mfaRequired: true });
      const result = await service.checkAnalyticsPermission('mfa-user', 'financial-data', 'view');
      expect(result.mfaRequired).toBe(true);
    });

    it('should check permission with scope', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, scope: 'school-1' });
      const result = await service.checkAnalyticsPermission('school-admin', 'enrollment', 'view', { scope: 'school-1' });
      expect(result.scope).toBe('school-1');
    });

    it('should check permission with date range', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, dateRange: { from: '2025-01-01', to: '2025-12-31' } });
      const result = await service.checkAnalyticsPermission('analyst-1', 'historical-data', 'view');
      expect(result.dateRange).toBeDefined();
    });

    it('should check permission with resource ID', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, resourceId: 'report-123' });
      const result = await service.checkAnalyticsPermission('user-1', 'report', 'view', { resourceId: 'report-123' });
      expect(result.resourceId).toBe('report-123');
    });

    it('should check batch permissions', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, batch: true });
      const result = await service.checkAnalyticsPermission('batch-user', 'data', 'export', { batch: true });
      expect(result.batch).toBe(true);
    });

    it('should check permission with rate limiting', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, rateLimit: 100, remaining: 95 });
      const result = await service.checkAnalyticsPermission('api-user', 'analytics', 'query');
      expect(result.rateLimit).toBe(100);
      expect(result.remaining).toBe(95);
    });

    it('should deny permission for unauthorized user', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: false, reason: 'User not authorized' });
      const result = await service.checkAnalyticsPermission('unauthorized-user', 'admin-panel', 'access');
      expect(result.granted).toBe(false);
    });

    it('should check permission with audit logging', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, auditLog: true, logId: 'log-456' });
      const result = await service.checkAnalyticsPermission('audited-user', 'sensitive-data', 'view');
      expect(result.auditLog).toBe(true);
    });

    it('should check permission with data classification', async () => {
      mockRepository.checkAnalyticsPermission.mockResolvedValue({ granted: true, classification: 'confidential' });
      const result = await service.checkAnalyticsPermission('clearance-user', 'classified-data', 'view');
      expect(result.classification).toBe('confidential');
    });
  });

  describe('getAnalyticsPermissions', () => {
    it('should get permissions for user', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'user-1', permissions: ['view', 'edit'] });
      const result = await service.getAnalyticsPermissions('user-1');
      expect(mockRepository.getAnalyticsPermissions).toHaveBeenCalledWith('user-1');
      expect(result.permissions).toHaveLength(2);
    });

    it('should propagate errors from getAnalyticsPermissions', async () => {
      mockRepository.getAnalyticsPermissions.mockRejectedValue(new Error('Permissions fetch error'));
      await expect(service.getAnalyticsPermissions('user-1')).rejects.toThrow('Permissions fetch error');
    });

    it('should get admin permissions', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'admin-1', role: 'admin', permissions: ['all'] });
      const result = await service.getAnalyticsPermissions('admin-1');
      expect(result.role).toBe('admin');
      expect(result.permissions).toContain('all');
    });

    it('should get viewer permissions', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'viewer-1', role: 'viewer', permissions: ['view'] });
      const result = await service.getAnalyticsPermissions('viewer-1');
      expect(result.role).toBe('viewer');
      expect(result.permissions).toContain('view');
    });

    it('should get editor permissions', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'editor-1', role: 'editor', permissions: ['view', 'edit'] });
      const result = await service.getAnalyticsPermissions('editor-1');
      expect(result.role).toBe('editor');
      expect(result.permissions).toHaveLength(2);
    });

    it('should get analyst permissions', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'analyst-1', role: 'analyst', permissions: ['view', 'edit', 'export'] });
      const result = await service.getAnalyticsPermissions('analyst-1');
      expect(result.role).toBe('analyst');
      expect(result.permissions).toHaveLength(3);
    });

    it('should get permissions with resource access', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'user-1', resources: ['dashboard-1', 'report-2'] });
      const result = await service.getAnalyticsPermissions('user-1');
      expect(result.resources).toHaveLength(2);
    });

    it('should get permissions with expiration', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'temp-user', expiresAt: '2025-12-31T23:59:59Z', permissions: ['view'] });
      const result = await service.getAnalyticsPermissions('temp-user');
      expect(result.expiresAt).toBeDefined();
    });

    it('should get permissions with restrictions', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'restricted-user', restrictions: ['no-export', 'no-share'], permissions: ['view', 'edit'] });
      const result = await service.getAnalyticsPermissions('restricted-user');
      expect(result.restrictions).toHaveLength(2);
    });

    it('should get permissions with scope', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'scoped-user', scope: 'department-1', permissions: ['view'] });
      const result = await service.getAnalyticsPermissions('scoped-user');
      expect(result.scope).toBe('department-1');
    });

    it('should get permissions with custom roles', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'custom-user', role: 'custom-analyst', permissions: ['view', 'export', 'schedule'] });
      const result = await service.getAnalyticsPermissions('custom-user');
      expect(result.role).toBe('custom-analyst');
    });

    it('should get permissions with API access', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'api-user', apiAccess: true, apiKey: 'key-123', permissions: ['view'] });
      const result = await service.getAnalyticsPermissions('api-user');
      expect(result.apiAccess).toBe(true);
    });

    it('should get permissions with dashboard access', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'dash-user', dashboardAccess: ['dash-1', 'dash-2', 'dash-3'], permissions: ['view'] });
      const result = await service.getAnalyticsPermissions('dash-user');
      expect(result.dashboardAccess).toHaveLength(3);
    });

    it('should get permissions with export limits', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'export-user', exportLimit: 500, exportsUsed: 120, permissions: ['view', 'export'] });
      const result = await service.getAnalyticsPermissions('export-user');
      expect(result.exportLimit).toBe(500);
      expect(result.exportsUsed).toBe(120);
    });

    it('should get permissions with notification settings', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'notify-user', notifications: { email: true, sms: false }, permissions: ['view'] });
      const result = await service.getAnalyticsPermissions('notify-user');
      expect(result.notifications.email).toBe(true);
    });

    it('should get permissions with audit trail', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'audit-user', auditTrail: true, lastAccess: '2025-06-15T10:30:00Z', permissions: ['view'] });
      const result = await service.getAnalyticsPermissions('audit-user');
      expect(result.auditTrail).toBe(true);
    });

    it('should get empty permissions for new user', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'new-user', permissions: [] });
      const result = await service.getAnalyticsPermissions('new-user');
      expect(result.permissions).toHaveLength(0);
    });

    it('should get permissions with data access levels', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'level-user', dataAccess: { students: 'full', finance: 'limited', hr: 'none' }, permissions: ['view'] });
      const result = await service.getAnalyticsPermissions('level-user');
      expect(result.dataAccess.students).toBe('full');
    });

    it('should get permissions with schedule access', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'schedule-user', scheduleAccess: true, permissions: ['view', 'schedule'] });
      const result = await service.getAnalyticsPermissions('schedule-user');
      expect(result.scheduleAccess).toBe(true);
    });

    it('should get permissions with sharing capabilities', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'share-user', sharing: { internal: true, external: false }, permissions: ['view', 'share'] });
      const result = await service.getAnalyticsPermissions('share-user');
      expect(result.sharing.internal).toBe(true);
      expect(result.sharing.external).toBe(false);
    });

    it('should handle user with no permissions gracefully', async () => {
      mockRepository.getAnalyticsPermissions.mockResolvedValue({ userId: 'empty-user', permissions: [], role: 'none' });
      const result = await service.getAnalyticsPermissions('empty-user');
      expect(result.permissions).toHaveLength(0);
      expect(result.role).toBe('none');
    });
  });
});
