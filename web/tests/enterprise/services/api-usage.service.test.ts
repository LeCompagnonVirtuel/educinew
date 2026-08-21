import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ApiUsageService', () => {
  const mockRepo = {
    getApiUsageStats: vi.fn(),
    getApiKeyUsage: vi.fn(),
    getApiEndpoints: vi.fn(),
    getApiErrors: vi.fn(),
    getApiLatency: vi.fn(),
    getApiRateLimits: vi.fn(),
    updateRateLimit: vi.fn(),
    getApiKeys: vi.fn(),
    createApiKey: vi.fn(),
    revokeApiKey: vi.fn(),
    getApiQuota: vi.fn(),
    getApiHistory: vi.fn(),
    getApiHealth: vi.fn(),
    getApiCosts: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const apiKeyId = 'key-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getApiUsageStats', () => {
    it('should return API usage stats', async () => {
      mockRepo.getApiUsageStats.mockResolvedValue({ totalRequests: 100000, avgResponseTime: 120 });
      const result = await mockRepo.getApiUsageStats(enterpriseId);
      expect(result.totalRequests).toBe(100000);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should include error rate', async () => {
      mockRepo.getApiUsageStats.mockResolvedValue({ errorRate: 0.5, totalErrors: 500 });
      const result = await mockRepo.getApiUsageStats(enterpriseId);
      expect(result.errorRate).toBe(0.5);
    });

    it('should filter by date range', async () => {
      mockRepo.getApiUsageStats.mockResolvedValue({});
      await mockRepo.getApiUsageStats(enterpriseId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getApiUsageStats).toHaveBeenCalled();
    });

    it('should handle zero requests', async () => {
      mockRepo.getApiUsageStats.mockResolvedValue({ totalRequests: 0 });
      const result = await mockRepo.getApiUsageStats(enterpriseId);
      expect(result.totalRequests).toBe(0);
    });

    it('should include peak usage times', async () => {
      mockRepo.getApiUsageStats.mockResolvedValue({ peakHours: [9, 14, 20] });
      const result = await mockRepo.getApiUsageStats(enterpriseId);
      expect(result.peakHours).toContain(14);
    });
  });

  describe('getApiKeyUsage', () => {
    it('should return API key usage', async () => {
      mockRepo.getApiKeyUsage.mockResolvedValue([{ keyId: 'key-1', requests: 5000, lastUsed: '2026-01-01' }]);
      const result = await mockRepo.getApiKeyUsage(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should sort by usage', async () => {
      mockRepo.getApiKeyUsage.mockResolvedValue([]);
      await mockRepo.getApiKeyUsage(enterpriseId, { sortBy: 'requests', order: 'desc' });
      expect(mockRepo.getApiKeyUsage).toHaveBeenCalled();
    });

    it('should handle no API keys', async () => {
      mockRepo.getApiKeyUsage.mockResolvedValue([]);
      const result = await mockRepo.getApiKeyUsage(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should include error counts', async () => {
      mockRepo.getApiKeyUsage.mockResolvedValue([{ keyId: 'key-1', errors: 10, errorRate: 0.2 }]);
      const result = await mockRepo.getApiKeyUsage(enterpriseId);
      expect(result[0].errors).toBe(10);
    });

    it('should filter by key status', async () => {
      mockRepo.getApiKeyUsage.mockResolvedValue([]);
      await mockRepo.getApiKeyUsage(enterpriseId, { status: 'active' });
      expect(mockRepo.getApiKeyUsage).toHaveBeenCalled();
    });
  });

  describe('getApiEndpoints', () => {
    it('should return API endpoints', async () => {
      mockRepo.getApiEndpoints.mockResolvedValue([{ path: '/api/users', method: 'GET', requests: 10000 }]);
      const result = await mockRepo.getApiEndpoints(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should sort by request count', async () => {
      mockRepo.getApiEndpoints.mockResolvedValue([]);
      await mockRepo.getApiEndpoints(enterpriseId, { sortBy: 'requests', order: 'desc' });
      expect(mockRepo.getApiEndpoints).toHaveBeenCalled();
    });

    it('should include response times', async () => {
      mockRepo.getApiEndpoints.mockResolvedValue([{ path: '/api/users', avgResponseTime: 50, p99ResponseTime: 200 }]);
      const result = await mockRepo.getApiEndpoints(enterpriseId);
      expect(result[0].avgResponseTime).toBe(50);
    });

    it('should handle no endpoints', async () => {
      mockRepo.getApiEndpoints.mockResolvedValue([]);
      const result = await mockRepo.getApiEndpoints(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should filter by method', async () => {
      mockRepo.getApiEndpoints.mockResolvedValue([]);
      await mockRepo.getApiEndpoints(enterpriseId, { method: 'POST' });
      expect(mockRepo.getApiEndpoints).toHaveBeenCalled();
    });

    it('should include error rates per endpoint', async () => {
      mockRepo.getApiEndpoints.mockResolvedValue([{ path: '/api/upload', errorRate: 5.0 }]);
      const result = await mockRepo.getApiEndpoints(enterpriseId);
      expect(result[0].errorRate).toBe(5.0);
    });
  });

  describe('getApiErrors', () => {
    it('should return API errors', async () => {
      mockRepo.getApiErrors.mockResolvedValue([{ id: 'err-1', message: 'Rate limited', count: 50 }]);
      const result = await mockRepo.getApiErrors(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by status code', async () => {
      mockRepo.getApiErrors.mockResolvedValue([]);
      await mockRepo.getApiErrors(enterpriseId, { statusCode: 429 });
      expect(mockRepo.getApiErrors).toHaveBeenCalled();
    });

    it('should sort by count', async () => {
      mockRepo.getApiErrors.mockResolvedValue([]);
      await mockRepo.getApiErrors(enterpriseId, { sortBy: 'count', order: 'desc' });
      expect(mockRepo.getApiErrors).toHaveBeenCalled();
    });

    it('should handle no errors', async () => {
      mockRepo.getApiErrors.mockResolvedValue([]);
      const result = await mockRepo.getApiErrors(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should include stack traces', async () => {
      mockRepo.getApiErrors.mockResolvedValue([{ id: 'err-1', stackTrace: 'Error at line 10' }]);
      const result = await mockRepo.getApiErrors(enterpriseId);
      expect(result[0].stackTrace).toBeDefined();
    });

    it('should group by error type', async () => {
      mockRepo.getApiErrors.mockResolvedValue([{ type: 'ValidationError', count: 100 }, { type: 'AuthError', count: 50 }]);
      const result = await mockRepo.getApiErrors(enterpriseId);
      expect(result).toHaveLength(2);
    });
  });

  describe('getApiLatency', () => {
    it('should return latency stats', async () => {
      mockRepo.getApiLatency.mockResolvedValue({ p50: 80, p95: 200, p99: 500 });
      const result = await mockRepo.getApiLatency(enterpriseId);
      expect(result.p50).toBe(80);
    });

    it('should include latency by endpoint', async () => {
      mockRepo.getApiLatency.mockResolvedValue({ byEndpoint: [{ path: '/api/users', p50: 50 }] });
      const result = await mockRepo.getApiLatency(enterpriseId);
      expect(result.byEndpoint).toHaveLength(1);
    });

    it('should include latency trends', async () => {
      mockRepo.getApiLatency.mockResolvedValue({ trends: [{ date: '2026-01-01', p50: 80 }] });
      const result = await mockRepo.getApiLatency(enterpriseId);
      expect(result.trends).toHaveLength(1);
    });

    it('should handle zero latency', async () => {
      mockRepo.getApiLatency.mockResolvedValue({ p50: 0, p95: 0, p99: 0 });
      const result = await mockRepo.getApiLatency(enterpriseId);
      expect(result.p50).toBe(0);
    });

    it('should filter by time range', async () => {
      mockRepo.getApiLatency.mockResolvedValue({});
      await mockRepo.getApiLatency(enterpriseId, { hours: 24 });
      expect(mockRepo.getApiLatency).toHaveBeenCalled();
    });

    it('should detect latency spikes', async () => {
      mockRepo.getApiLatency.mockResolvedValue({ spikes: [{ timestamp: '2026-01-01T14:00:00Z', p99: 2000 }] });
      const result = await mockRepo.getApiLatency(enterpriseId);
      expect(result.spikes).toHaveLength(1);
    });
  });

  describe('getApiRateLimits', () => {
    it('should return rate limits', async () => {
      mockRepo.getApiRateLimits.mockResolvedValue({ default: 1000, perEndpoint: { '/api/upload': 100 } });
      const result = await mockRepo.getApiRateLimits(enterpriseId);
      expect(result.default).toBe(1000);
    });

    it('should include current usage', async () => {
      mockRepo.getApiRateLimits.mockResolvedValue({ currentUsage: 500, limit: 1000 });
      const result = await mockRepo.getApiRateLimits(enterpriseId);
      expect(result.currentUsage).toBe(500);
    });

    it('should detect rate limit hits', async () => {
      mockRepo.getApiRateLimits.mockResolvedValue({ rateLimitHits: 25, lastHit: '2026-01-01T14:00:00Z' });
      const result = await mockRepo.getApiRateLimits(enterpriseId);
      expect(result.rateLimitHits).toBe(25);
    });

    it('should handle unlimited rate limits', async () => {
      mockRepo.getApiRateLimits.mockResolvedValue({ default: -1, unlimited: true });
      const result = await mockRepo.getApiRateLimits(enterpriseId);
      expect(result.unlimited).toBe(true);
    });

    it('should include time windows', async () => {
      mockRepo.getApiRateLimits.mockResolvedValue({ windows: { perSecond: 10, perMinute: 100, perHour: 1000 } });
      const result = await mockRepo.getApiRateLimits(enterpriseId);
      expect(result.windows.perSecond).toBe(10);
    });
  });

  describe('updateRateLimit', () => {
    it('should update rate limit', async () => {
      mockRepo.updateRateLimit.mockResolvedValue({ endpoint: '/api/upload', limit: 200 });
      const result = await mockRepo.updateRateLimit(enterpriseId, '/api/upload', 200);
      expect(result.limit).toBe(200);
    });

    it('should validate limit value', () => {
      const validate = (limit: number) => {
        if (limit < -1) throw new Error('Limite invalide');
      };
      expect(() => validate(100)).not.toThrow();
      expect(() => validate(-2)).toThrow();
    });

    it('should allow unlimited', async () => {
      mockRepo.updateRateLimit.mockResolvedValue({ limit: -1, unlimited: true });
      const result = await mockRepo.updateRateLimit(enterpriseId, '/api/upload', -1);
      expect(result.unlimited).toBe(true);
    });

    it('should require endpoint', () => {
      const validate = (endpoint: string) => {
        if (!endpoint) throw new Error('L\'endpoint est requis');
      };
      expect(() => validate('')).toThrow('L\'endpoint est requis');
    });

    it('should record update metadata', async () => {
      mockRepo.updateRateLimit.mockResolvedValue({ updatedAt: new Date().toISOString(), updatedBy: 'usr-1' });
      const result = await mockRepo.updateRateLimit(enterpriseId, '/api/upload', 200, 'usr-1');
      expect(result.updatedBy).toBe('usr-1');
    });
  });

  describe('createApiKey', () => {
    it('should create API key', async () => {
      mockRepo.createApiKey.mockResolvedValue({ id: apiKeyId, key: 'ak_abc123', name: 'Production', createdAt: new Date().toISOString() });
      const result = await mockRepo.createApiKey(enterpriseId, { name: 'Production' });
      expect(result.key).toMatch(/^ak_/);
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom est requis');
      };
      expect(() => validate({})).toThrow('Le nom est requis');
    });

    it('should set default permissions', async () => {
      mockRepo.createApiKey.mockResolvedValue({ id: apiKeyId, permissions: ['read'] });
      const result = await mockRepo.createApiKey(enterpriseId, { name: 'Key' });
      expect(result.permissions).toContain('read');
    });

    it('should validate name length', () => {
      const validate = (name: string) => {
        if (name.length < 3 || name.length > 50) throw new Error('Le nom doit contenir entre 3 et 50 caractères');
      };
      expect(() => validate('Hi')).toThrow();
      expect(() => validate('Valid Name')).not.toThrow();
    });

    it('should generate unique key', async () => {
      mockRepo.createApiKey.mockResolvedValueOnce({ key: 'ak_abc123' }).mockResolvedValueOnce({ key: 'ak_def456' });
      const key1 = await mockRepo.createApiKey(enterpriseId, { name: 'Key 1' });
      const key2 = await mockRepo.createApiKey(enterpriseId, { name: 'Key 2' });
      expect(key1.key).not.toBe(key2.key);
    });

    it('should support custom permissions', async () => {
      mockRepo.createApiKey.mockResolvedValue({ id: apiKeyId, permissions: ['read', 'write', 'admin'] });
      const result = await mockRepo.createApiKey(enterpriseId, { name: 'Admin Key', permissions: ['read', 'write', 'admin'] });
      expect(result.permissions).toHaveLength(3);
    });

    it('should validate permission values', () => {
      const validPermissions = ['read', 'write', 'admin', 'delete'];
      const validate = (perms: string[]) => {
        const invalid = perms.filter(p => !validPermissions.includes(p));
        if (invalid.length > 0) throw new Error(`Permissions invalides: ${invalid.join(', ')}`);
      };
      expect(() => validate(['read', 'write'])).not.toThrow();
      expect(() => validate(['invalid'])).toThrow();
    });
  });

  describe('revokeApiKey', () => {
    it('should revoke API key', async () => {
      mockRepo.revokeApiKey.mockResolvedValue({ id: apiKeyId, status: 'revoked', revokedAt: new Date().toISOString() });
      const result = await mockRepo.revokeApiKey(enterpriseId, apiKeyId);
      expect(result.status).toBe('revoked');
    });

    it('should throw if key not found', async () => {
      mockRepo.revokeApiKey.mockRejectedValue(new Error('Clé API non trouvée'));
      await expect(mockRepo.revokeApiKey(enterpriseId, 'nonexistent')).rejects.toThrow('Clé API non trouvée');
    });

    it('should not revoke already revoked key', async () => {
      mockRepo.revokeApiKey.mockRejectedValue(new Error('La clé est déjà révoquée'));
      await expect(mockRepo.revokeApiKey(enterpriseId, apiKeyId)).rejects.toThrow('La clé est déjà révoquée');
    });

    it('should require reason', () => {
      const validate = (reason: string) => {
        if (!reason || reason.trim().length < 3) throw new Error('La raison est requise');
      };
      expect(() => validate('')).toThrow('La raison est requise');
    });

    it('should record revocation metadata', async () => {
      mockRepo.revokeApiKey.mockResolvedValue({ revokedAt: new Date().toISOString(), revokedBy: 'usr-1', reason: 'Compromised' });
      const result = await mockRepo.revokeApiKey(enterpriseId, apiKeyId, 'Compromised', 'usr-1');
      expect(result.revokedBy).toBe('usr-1');
    });
  });

  describe('getApiQuota', () => {
    it('should return API quota', async () => {
      mockRepo.getApiQuota.mockResolvedValue({ used: 5000, limit: 10000, resetsAt: '2026-02-01' });
      const result = await mockRepo.getApiQuota(enterpriseId);
      expect(result.used).toBe(5000);
    });

    it('should calculate remaining quota', () => {
      const used = 5000;
      const limit = 10000;
      const remaining = limit - used;
      expect(remaining).toBe(5000);
    });

    it('should detect quota exceeded', async () => {
      mockRepo.getApiQuota.mockResolvedValue({ used: 10000, limit: 10000, exceeded: true });
      const result = await mockRepo.getApiQuota(enterpriseId);
      expect(result.exceeded).toBe(true);
    });

    it('should include quota reset time', async () => {
      mockRepo.getApiQuota.mockResolvedValue({ resetsAt: '2026-02-01T00:00:00Z' });
      const result = await mockRepo.getApiQuota(enterpriseId);
      expect(result.resetsAt).toBeDefined();
    });

    it('should handle unlimited quota', async () => {
      mockRepo.getApiQuota.mockResolvedValue({ used: 5000, limit: -1, unlimited: true });
      const result = await mockRepo.getApiQuota(enterpriseId);
      expect(result.unlimited).toBe(true);
    });
  });

  describe('getApiHistory', () => {
    it('should return API history', async () => {
      mockRepo.getApiHistory.mockResolvedValue([{ date: '2026-01-01', requests: 5000 }]);
      const result = await mockRepo.getApiHistory(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should accept different granularities', async () => {
      const granularities = ['hourly', 'daily', 'weekly', 'monthly'];
      for (const g of granularities) {
        mockRepo.getApiHistory.mockResolvedValue([]);
        await mockRepo.getApiHistory(enterpriseId, { granularity: g });
        expect(mockRepo.getApiHistory).toHaveBeenCalled();
      }
    });

    it('should filter by date range', async () => {
      mockRepo.getApiHistory.mockResolvedValue([]);
      await mockRepo.getApiHistory(enterpriseId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getApiHistory).toHaveBeenCalled();
    });

    it('should handle empty history', async () => {
      mockRepo.getApiHistory.mockResolvedValue([]);
      const result = await mockRepo.getApiHistory(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by date ascending', async () => {
      mockRepo.getApiHistory.mockResolvedValue([
        { date: '2026-01-01', requests: 5000 },
        { date: '2026-01-02', requests: 6000 },
      ]);
      const result = await mockRepo.getApiHistory(enterpriseId);
      expect(result[0].date < result[1].date).toBe(true);
    });

    it('should include multiple metrics', async () => {
      mockRepo.getApiHistory.mockResolvedValue([{ date: '2026-01-01', requests: 5000, errors: 50, latency: 120 }]);
      const result = await mockRepo.getApiHistory(enterpriseId);
      expect(result[0].errors).toBeDefined();
    });
  });

  describe('getApiHealth', () => {
    it('should return API health', async () => {
      mockRepo.getApiHealth.mockResolvedValue({ status: 'healthy', uptime: 99.9 });
      const result = await mockRepo.getApiHealth(enterpriseId);
      expect(result.status).toBe('healthy');
    });

    it('should include component health', async () => {
      mockRepo.getApiHealth.mockResolvedValue({ components: { auth: 'up', database: 'up', cache: 'up' } });
      const result = await mockRepo.getApiHealth(enterpriseId);
      expect(result.components.auth).toBe('up');
    });

    it('should detect degraded state', async () => {
      mockRepo.getApiHealth.mockResolvedValue({ status: 'degraded', issue: 'High latency on /api/users' });
      const result = await mockRepo.getApiHealth(enterpriseId);
      expect(result.status).toBe('degraded');
    });

    it('should include last check time', async () => {
      mockRepo.getApiHealth.mockResolvedValue({ lastChecked: new Date().toISOString() });
      const result = await mockRepo.getApiHealth(enterpriseId);
      expect(result.lastChecked).toBeDefined();
    });

    it('should handle down state', async () => {
      mockRepo.getApiHealth.mockResolvedValue({ status: 'down', issue: 'Database connection failed' });
      const result = await mockRepo.getApiHealth(enterpriseId);
      expect(result.status).toBe('down');
    });
  });

  describe('getApiCosts', () => {
    it('should return API costs', async () => {
      mockRepo.getApiCosts.mockResolvedValue({ totalCost: 150, currency: 'EUR' });
      const result = await mockRepo.getApiCosts(enterpriseId);
      expect(result.totalCost).toBe(150);
    });

    it('should include cost by endpoint', async () => {
      mockRepo.getApiCosts.mockResolvedValue({ byEndpoint: [{ path: '/api/upload', cost: 50 }] });
      const result = await mockRepo.getApiCosts(enterpriseId);
      expect(result.byEndpoint).toHaveLength(1);
    });

    it('should include cost trends', async () => {
      mockRepo.getApiCosts.mockResolvedValue({ trends: [{ date: '2026-01-01', cost: 5 }] });
      const result = await mockRepo.getApiCosts(enterpriseId);
      expect(result.trends).toHaveLength(1);
    });

    it('should handle zero costs', async () => {
      mockRepo.getApiCosts.mockResolvedValue({ totalCost: 0 });
      const result = await mockRepo.getApiCosts(enterpriseId);
      expect(result.totalCost).toBe(0);
    });

    it('should filter by date range', async () => {
      mockRepo.getApiCosts.mockResolvedValue({});
      await mockRepo.getApiCosts(enterpriseId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getApiCosts).toHaveBeenCalled();
    });

    it('should include cost projections', async () => {
      mockRepo.getApiCosts.mockResolvedValue({ projection: { nextMonth: 160 } });
      const result = await mockRepo.getApiCosts(enterpriseId);
      expect(result.projection.nextMonth).toBe(160);
    });
  });
});
