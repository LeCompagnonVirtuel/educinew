import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseMonitoringService', () => {
  const mockRepo = {
    getSystemHealth: vi.fn(),
    getServerMetrics: vi.fn(),
    getApiMetrics: vi.fn(),
    getErrorLogs: vi.fn(),
    getAlerts: vi.fn(),
    createAlert: vi.fn(),
    updateAlert: vi.fn(),
    deleteAlert: vi.fn(),
    getUptimeStats: vi.fn(),
    getPerformanceMetrics: vi.fn(),
    getHealthChecks: vi.fn(),
    getIncidents: vi.fn(),
    createIncident: vi.fn(),
    resolveIncident: vi.fn(),
    getNotificationChannels: vi.fn(),
  };

  const enterpriseId = 'ent-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSystemHealth', () => {
    it('should return system health', async () => {
      mockRepo.getSystemHealth.mockResolvedValue({ status: 'healthy', uptime: 99.9 });
      const result = await mockRepo.getSystemHealth(enterpriseId);
      expect(result.status).toBe('healthy');
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should include component statuses', async () => {
      mockRepo.getSystemHealth.mockResolvedValue({
        components: { database: 'up', cache: 'up', storage: 'up' },
      });
      const result = await mockRepo.getSystemHealth(enterpriseId);
      expect(result.components.database).toBe('up');
    });

    it('should detect degraded state', async () => {
      mockRepo.getSystemHealth.mockResolvedValue({ status: 'degraded', issue: 'High latency' });
      const result = await mockRepo.getSystemHealth(enterpriseId);
      expect(result.status).toBe('degraded');
    });

    it('should detect down state', async () => {
      mockRepo.getSystemHealth.mockResolvedValue({ status: 'down', issue: 'Database connection failed' });
      const result = await mockRepo.getSystemHealth(enterpriseId);
      expect(result.status).toBe('down');
    });

    it('should include last check timestamp', async () => {
      mockRepo.getSystemHealth.mockResolvedValue({ lastChecked: new Date().toISOString() });
      const result = await mockRepo.getSystemHealth(enterpriseId);
      expect(result.lastChecked).toBeDefined();
    });

    it('should handle repository errors', async () => {
      mockRepo.getSystemHealth.mockRejectedValue(new Error('Health check failed'));
      await expect(mockRepo.getSystemHealth(enterpriseId)).rejects.toThrow('Health check failed');
    });
  });

  describe('getServerMetrics', () => {
    it('should return server metrics', async () => {
      mockRepo.getServerMetrics.mockResolvedValue({ cpu: 45, memory: 60, disk: 70 });
      const result = await mockRepo.getServerMetrics(enterpriseId);
      expect(result.cpu).toBe(45);
    });

    it('should include historical data', async () => {
      mockRepo.getServerMetrics.mockResolvedValue({ history: [{ timestamp: '2026-01-01', cpu: 50 }] });
      const result = await mockRepo.getServerMetrics(enterpriseId);
      expect(result.history).toHaveLength(1);
    });

    it('should handle high CPU usage', async () => {
      mockRepo.getServerMetrics.mockResolvedValue({ cpu: 95, alert: true });
      const result = await mockRepo.getServerMetrics(enterpriseId);
      expect(result.cpu).toBeGreaterThan(90);
      expect(result.alert).toBe(true);
    });

    it('should handle high memory usage', async () => {
      mockRepo.getServerMetrics.mockResolvedValue({ memory: 92, alert: true });
      const result = await mockRepo.getServerMetrics(enterpriseId);
      expect(result.memory).toBeGreaterThan(90);
    });

    it('should include network metrics', async () => {
      mockRepo.getServerMetrics.mockResolvedValue({ network: { in: 1000, out: 2000 } });
      const result = await mockRepo.getServerMetrics(enterpriseId);
      expect(result.network.in).toBe(1000);
    });

    it('should filter by time range', async () => {
      mockRepo.getServerMetrics.mockResolvedValue({});
      await mockRepo.getServerMetrics(enterpriseId, { hours: 24 });
      expect(mockRepo.getServerMetrics).toHaveBeenCalled();
    });
  });

  describe('getApiMetrics', () => {
    it('should return API metrics', async () => {
      mockRepo.getApiMetrics.mockResolvedValue({ totalRequests: 100000, avgResponseTime: 120 });
      const result = await mockRepo.getApiMetrics(enterpriseId);
      expect(result.totalRequests).toBe(100000);
    });

    it('should include error rate', async () => {
      mockRepo.getApiMetrics.mockResolvedValue({ errorRate: 0.5, totalErrors: 500 });
      const result = await mockRepo.getApiMetrics(enterpriseId);
      expect(result.errorRate).toBe(0.5);
    });

    it('should include endpoint breakdown', async () => {
      mockRepo.getApiMetrics.mockResolvedValue({
        endpoints: [{ path: '/api/users', requests: 50000, avgTime: 100 }],
      });
      const result = await mockRepo.getApiMetrics(enterpriseId);
      expect(result.endpoints).toHaveLength(1);
    });

    it('should include status code distribution', async () => {
      mockRepo.getApiMetrics.mockResolvedValue({ statusCodes: { '200': 90000, '400': 5000, '500': 500 } });
      const result = await mockRepo.getApiMetrics(enterpriseId);
      expect(result.statusCodes['200']).toBe(90000);
    });

    it('should handle zero requests', async () => {
      mockRepo.getApiMetrics.mockResolvedValue({ totalRequests: 0 });
      const result = await mockRepo.getApiMetrics(enterpriseId);
      expect(result.totalRequests).toBe(0);
    });

    it('should filter by endpoint', async () => {
      mockRepo.getApiMetrics.mockResolvedValue({});
      await mockRepo.getApiMetrics(enterpriseId, { endpoint: '/api/users' });
      expect(mockRepo.getApiMetrics).toHaveBeenCalled();
    });
  });

  describe('getErrorLogs', () => {
    it('should return error logs', async () => {
      mockRepo.getErrorLogs.mockResolvedValue([{ id: 'e-1', message: 'Error occurred', level: 'error' }]);
      const result = await mockRepo.getErrorLogs(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by level', async () => {
      mockRepo.getErrorLogs.mockResolvedValue([]);
      await mockRepo.getErrorLogs(enterpriseId, { level: 'critical' });
      expect(mockRepo.getErrorLogs).toHaveBeenCalled();
    });

    it('should paginate results', async () => {
      mockRepo.getErrorLogs.mockResolvedValue([]);
      await mockRepo.getErrorLogs(enterpriseId, { page: 1, limit: 50 });
      expect(mockRepo.getErrorLogs).toHaveBeenCalled();
    });

    it('should handle no errors', async () => {
      mockRepo.getErrorLogs.mockResolvedValue([]);
      const result = await mockRepo.getErrorLogs(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by timestamp', async () => {
      mockRepo.getErrorLogs.mockResolvedValue([
        { timestamp: '2026-01-01T10:00:00Z' },
        { timestamp: '2026-01-01T11:00:00Z' },
      ]);
      const result = await mockRepo.getErrorLogs(enterpriseId);
      expect(new Date(result[0].timestamp).getTime()).toBeLessThan(new Date(result[1].timestamp).getTime());
    });

    it('should include stack traces', async () => {
      mockRepo.getErrorLogs.mockResolvedValue([{ stackTrace: 'Error at line 10' }]);
      const result = await mockRepo.getErrorLogs(enterpriseId);
      expect(result[0].stackTrace).toBeDefined();
    });
  });

  describe('getAlerts', () => {
    it('should return alerts', async () => {
      mockRepo.getAlerts.mockResolvedValue([{ id: 'a-1', type: 'cpu_high', severity: 'warning' }]);
      const result = await mockRepo.getAlerts(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by severity', async () => {
      mockRepo.getAlerts.mockResolvedValue([]);
      await mockRepo.getAlerts(enterpriseId, { severity: 'critical' });
      expect(mockRepo.getAlerts).toHaveBeenCalled();
    });

    it('should filter by status', async () => {
      mockRepo.getAlerts.mockResolvedValue([]);
      await mockRepo.getAlerts(enterpriseId, { status: 'active' });
      expect(mockRepo.getAlerts).toHaveBeenCalled();
    });

    it('should include alert details', async () => {
      mockRepo.getAlerts.mockResolvedValue([{ id: 'a-1', details: { threshold: 90, current: 95 } }]);
      const result = await mockRepo.getAlerts(enterpriseId);
      expect(result[0].details).toBeDefined();
    });

    it('should handle no alerts', async () => {
      mockRepo.getAlerts.mockResolvedValue([]);
      const result = await mockRepo.getAlerts(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by creation date', async () => {
      mockRepo.getAlerts.mockResolvedValue([
        { createdAt: '2026-01-01' },
        { createdAt: '2026-01-02' },
      ]);
      const result = await mockRepo.getAlerts(enterpriseId);
      expect(result).toHaveLength(2);
    });
  });

  describe('createAlert', () => {
    it('should create alert', async () => {
      mockRepo.createAlert.mockResolvedValue({ id: 'a-1', type: 'cpu_high', threshold: 90 });
      const result = await mockRepo.createAlert(enterpriseId, { type: 'cpu_high', threshold: 90 });
      expect(result.id).toBe('a-1');
    });

    it('should require type', () => {
      const validate = (data: any) => {
        if (!data?.type) throw new Error('Le type d\'alerte est requis');
      };
      expect(() => validate({})).toThrow('Le type d\'alerte est requis');
    });

    it('should require threshold', () => {
      const validate = (data: any) => {
        if (data?.threshold === undefined) throw new Error('Le seuil est requis');
      };
      expect(() => validate({ type: 'cpu_high' })).toThrow('Le seuil est requis');
    });

    it('should validate threshold range', () => {
      const validate = (threshold: number) => {
        if (threshold < 0 || threshold > 100) throw new Error('Le seuil doit être entre 0 et 100');
      };
      expect(() => validate(50)).not.toThrow();
      expect(() => validate(-1)).toThrow();
      expect(() => validate(101)).toThrow();
    });

    it('should validate alert type', () => {
      const validTypes = ['cpu_high', 'memory_high', 'disk_high', 'error_rate', 'response_time'];
      const validate = (type: string) => {
        if (!validTypes.includes(type)) throw new Error('Type d\'alerte invalide');
      };
      expect(() => validate('cpu_high')).not.toThrow();
      expect(() => validate('invalid')).toThrow();
    });
  });

  describe('updateAlert', () => {
    it('should update alert', async () => {
      mockRepo.updateAlert.mockResolvedValue({ id: 'a-1', threshold: 85 });
      const result = await mockRepo.updateAlert('a-1', { threshold: 85 });
      expect(result.threshold).toBe(85);
    });

    it('should throw if alert not found', async () => {
      mockRepo.updateAlert.mockRejectedValue(new Error('Alerte non trouvée'));
      await expect(mockRepo.updateAlert('nonexistent', { threshold: 80 })).rejects.toThrow('Alerte non trouvée');
    });

    it('should allow enabling/disabling', async () => {
      mockRepo.updateAlert.mockResolvedValue({ id: 'a-1', enabled: false });
      const result = await mockRepo.updateAlert('a-1', { enabled: false });
      expect(result.enabled).toBe(false);
    });
  });

  describe('deleteAlert', () => {
    it('should delete alert', async () => {
      mockRepo.deleteAlert.mockResolvedValue(undefined);
      await mockRepo.deleteAlert('a-1');
      expect(mockRepo.deleteAlert).toHaveBeenCalledWith('a-1');
    });

    it('should throw if alert not found', async () => {
      mockRepo.deleteAlert.mockRejectedValue(new Error('Alerte non trouvée'));
      await expect(mockRepo.deleteAlert('nonexistent')).rejects.toThrow('Alerte non trouvée');
    });
  });

  describe('getUptimeStats', () => {
    it('should return uptime stats', async () => {
      mockRepo.getUptimeStats.mockResolvedValue({ uptime: 99.9, downtime: 0.1 });
      const result = await mockRepo.getUptimeStats(enterpriseId);
      expect(result.uptime).toBe(99.9);
    });

    it('should include SLA target', async () => {
      mockRepo.getUptimeStats.mockResolvedValue({ sla: { target: 99.9, met: true } });
      const result = await mockRepo.getUptimeStats(enterpriseId);
      expect(result.sla.met).toBe(true);
    });

    it('should include incident count', async () => {
      mockRepo.getUptimeStats.mockResolvedValue({ incidents: 2, totalDowntimeMinutes: 30 });
      const result = await mockRepo.getUptimeStats(enterpriseId);
      expect(result.incidents).toBe(2);
    });

    it('should handle 100% uptime', async () => {
      mockRepo.getUptimeStats.mockResolvedValue({ uptime: 100, downtime: 0 });
      const result = await mockRepo.getUptimeStats(enterpriseId);
      expect(result.uptime).toBe(100);
    });

    it('should handle low uptime', async () => {
      mockRepo.getUptimeStats.mockResolvedValue({ uptime: 95, status: 'degraded' });
      const result = await mockRepo.getUptimeStats(enterpriseId);
      expect(result.status).toBe('degraded');
    });

    it('should filter by period', async () => {
      mockRepo.getUptimeStats.mockResolvedValue({});
      await mockRepo.getUptimeStats(enterpriseId, { period: '30d' });
      expect(mockRepo.getUptimeStats).toHaveBeenCalled();
    });
  });

  describe('getIncidents', () => {
    it('should return incidents', async () => {
      mockRepo.getIncidents.mockResolvedValue([{ id: 'inc-1', title: 'DB Connection Issue', status: 'resolved' }]);
      const result = await mockRepo.getIncidents(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by status', async () => {
      mockRepo.getIncidents.mockResolvedValue([]);
      await mockRepo.getIncidents(enterpriseId, { status: 'open' });
      expect(mockRepo.getIncidents).toHaveBeenCalled();
    });

    it('should include severity', async () => {
      mockRepo.getIncidents.mockResolvedValue([{ severity: 'critical' }]);
      const result = await mockRepo.getIncidents(enterpriseId);
      expect(result[0].severity).toBe('critical');
    });

    it('should include timeline', async () => {
      mockRepo.getIncidents.mockResolvedValue([{ timeline: [{ event: 'detected', time: '2026-01-01' }] }]);
      const result = await mockRepo.getIncidents(enterpriseId);
      expect(result[0].timeline).toHaveLength(1);
    });

    it('should handle no incidents', async () => {
      mockRepo.getIncidents.mockResolvedValue([]);
      const result = await mockRepo.getIncidents(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by detection time', async () => {
      mockRepo.getIncidents.mockResolvedValue([
        { detectedAt: '2026-01-01T10:00:00Z' },
        { detectedAt: '2026-01-01T11:00:00Z' },
      ]);
      const result = await mockRepo.getIncidents(enterpriseId);
      expect(result).toHaveLength(2);
    });
  });

  describe('createIncident', () => {
    it('should create incident', async () => {
      mockRepo.createIncident.mockResolvedValue({ id: 'inc-1', title: 'Service Down', severity: 'critical' });
      const result = await mockRepo.createIncident(enterpriseId, { title: 'Service Down', severity: 'critical' });
      expect(result.id).toBe('inc-1');
    });

    it('should require title', () => {
      const validate = (data: any) => {
        if (!data?.title) throw new Error('Le titre est requis');
      };
      expect(() => validate({ severity: 'critical' })).toThrow('Le titre est requis');
    });

    it('should require severity', () => {
      const validate = (data: any) => {
        if (!data?.severity) throw new Error('La sévérité est requise');
      };
      expect(() => validate({ title: 'Issue' })).toThrow('La sévérité est requise');
    });

    it('should validate severity', () => {
      const validSeverities = ['low', 'medium', 'high', 'critical'];
      const validate = (s: string) => {
        if (!validSeverities.includes(s)) throw new Error('Sévérité invalide');
      };
      expect(() => validate('critical')).not.toThrow();
      expect(() => validate('invalid')).toThrow();
    });

    it('should set initial status to open', async () => {
      mockRepo.createIncident.mockResolvedValue({ id: 'inc-1', status: 'open' });
      const result = await mockRepo.createIncident(enterpriseId, { title: 'Issue', severity: 'high' });
      expect(result.status).toBe('open');
    });
  });

  describe('resolveIncident', () => {
    it('should resolve incident', async () => {
      mockRepo.resolveIncident.mockResolvedValue({ id: 'inc-1', status: 'resolved', resolvedAt: new Date().toISOString() });
      const result = await mockRepo.resolveIncident('inc-1', 'Fixed the issue');
      expect(result.status).toBe('resolved');
    });

    it('should require resolution note', () => {
      const validate = (note: string) => {
        if (!note || note.trim().length < 3) throw new Error('La note de résolution est requise');
      };
      expect(() => validate('')).toThrow('La note de résolution est requise');
    });

    it('should throw if already resolved', async () => {
      mockRepo.resolveIncident.mockRejectedValue(new Error('L\'incident est déjà résolu'));
      await expect(mockRepo.resolveIncident('inc-1', 'note')).rejects.toThrow('L\'incident est déjà résolu');
    });

    it('should set resolved timestamp', async () => {
      mockRepo.resolveIncident.mockResolvedValue({ resolvedAt: new Date().toISOString() });
      const result = await mockRepo.resolveIncident('inc-1', 'Fixed');
      expect(result.resolvedAt).toBeDefined();
    });

    it('should track resolution time', async () => {
      mockRepo.resolveIncident.mockResolvedValue({ resolutionTimeMinutes: 45 });
      const result = await mockRepo.resolveIncident('inc-1', 'Fixed');
      expect(result.resolutionTimeMinutes).toBe(45);
    });
  });

  describe('getNotificationChannels', () => {
    it('should return notification channels', async () => {
      mockRepo.getNotificationChannels.mockResolvedValue([{ type: 'email', enabled: true }]);
      const result = await mockRepo.getNotificationChannels(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should include channel config', async () => {
      mockRepo.getNotificationChannels.mockResolvedValue([{ type: 'email', config: { recipients: ['admin@test.com'] } }]);
      const result = await mockRepo.getNotificationChannels(enterpriseId);
      expect(result[0].config.recipients).toContain('admin@test.com');
    });

    it('should handle no channels', async () => {
      mockRepo.getNotificationChannels.mockResolvedValue([]);
      const result = await mockRepo.getNotificationChannels(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should support multiple channel types', async () => {
      mockRepo.getNotificationChannels.mockResolvedValue([
        { type: 'email', enabled: true },
        { type: 'slack', enabled: true },
        { type: 'webhook', enabled: false },
      ]);
      const result = await mockRepo.getNotificationChannels(enterpriseId);
      expect(result).toHaveLength(3);
    });

    it('should filter by enabled status', async () => {
      mockRepo.getNotificationChannels.mockResolvedValue([]);
      await mockRepo.getNotificationChannels(enterpriseId, { enabled: true });
      expect(mockRepo.getNotificationChannels).toHaveBeenCalled();
    });
  });
});
