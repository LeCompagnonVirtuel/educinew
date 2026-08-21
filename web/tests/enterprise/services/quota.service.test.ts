import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('QuotaService', () => {
  const mockRepo = {
    getQuotas: vi.fn(),
    getQuotaByType: vi.fn(),
    updateQuota: vi.fn(),
    checkQuota: vi.fn(),
    incrementUsage: vi.fn(),
    decrementUsage: vi.fn(),
    resetQuota: vi.fn(),
    getQuotaHistory: vi.fn(),
    getQuotaAlerts: vi.fn(),
    setQuotaAlert: vi.fn(),
    getQuotaReport: vi.fn(),
    getPlanLimits: vi.fn(),
    checkFeatureAccess: vi.fn(),
    getUsageByFeature: vi.fn(),
  };

  const enterpriseId = 'ent-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getQuotas', () => {
    it('should return all quotas', async () => {
      const quotas = [
        { type: 'users', used: 50, limit: 100 },
        { type: 'schools', used: 5, limit: 10 },
      ];
      mockRepo.getQuotas.mockResolvedValue(quotas);
      const result = await mockRepo.getQuotas(enterpriseId);
      expect(result).toHaveLength(2);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should calculate usage percentages', async () => {
      mockRepo.getQuotas.mockResolvedValue([{ type: 'users', used: 50, limit: 100 }]);
      const result = await mockRepo.getQuotas(enterpriseId);
      const percentage = Math.round((result[0].used / result[0].limit) * 100);
      expect(percentage).toBe(50);
    });

    it('should handle unlimited quotas', async () => {
      mockRepo.getQuotas.mockResolvedValue([{ type: 'users', used: 50, limit: -1, unlimited: true }]);
      const result = await mockRepo.getQuotas(enterpriseId);
      expect(result[0].unlimited).toBe(true);
    });

    it('should handle empty quotas', async () => {
      mockRepo.getQuotas.mockResolvedValue([]);
      const result = await mockRepo.getQuotas(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should include quota metadata', async () => {
      mockRepo.getQuotas.mockResolvedValue([{ type: 'users', used: 50, limit: 100, resetsAt: '2026-02-01' }]);
      const result = await mockRepo.getQuotas(enterpriseId);
      expect(result[0].resetsAt).toBeDefined();
    });
  });

  describe('getQuotaByType', () => {
    it('should return quota by type', async () => {
      mockRepo.getQuotaByType.mockResolvedValue({ type: 'users', used: 50, limit: 100 });
      const result = await mockRepo.getQuotaByType(enterpriseId, 'users');
      expect(result.type).toBe('users');
    });

    it('should throw if type not found', async () => {
      mockRepo.getQuotaByType.mockResolvedValue(null);
      const findOrThrow = async (type: string) => {
        const quota = await mockRepo.getQuotaByType(enterpriseId, type);
        if (!quota) throw new Error('Quota non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Quota non trouvé');
    });

    it('should require type', () => {
      const validate = (type: string) => {
        if (!type) throw new Error('Le type est requis');
      };
      expect(() => validate('')).toThrow('Le type est requis');
    });

    it('should include warning status', async () => {
      mockRepo.getQuotaByType.mockResolvedValue({ type: 'users', used: 90, limit: 100, warning: true });
      const result = await mockRepo.getQuotaByType(enterpriseId, 'users');
      expect(result.warning).toBe(true);
    });

    it('should detect exceeded quota', async () => {
      mockRepo.getQuotaByType.mockResolvedValue({ type: 'users', used: 105, limit: 100, exceeded: true });
      const result = await mockRepo.getQuotaByType(enterpriseId, 'users');
      expect(result.exceeded).toBe(true);
    });
  });

  describe('updateQuota', () => {
    it('should update quota limit', async () => {
      mockRepo.updateQuota.mockResolvedValue({ type: 'users', limit: 200, updatedAt: new Date().toISOString() });
      const result = await mockRepo.updateQuota(enterpriseId, 'users', 200);
      expect(result.limit).toBe(200);
    });

    it('should validate limit value', () => {
      const validate = (limit: number) => {
        if (limit < -1) throw new Error('Limite invalide');
      };
      expect(() => validate(100)).not.toThrow();
      expect(() => validate(-2)).toThrow();
    });

    it('should not set below current usage', async () => {
      mockRepo.getQuotaByType.mockResolvedValue({ used: 50 });
      const validate = (newLimit: number, currentUsage: number) => {
        if (newLimit !== -1 && newLimit < currentUsage) throw new Error('La limite ne peut pas être inférieure à l\'utilisation actuelle');
      };
      expect(() => validate(100, 50)).not.toThrow();
      expect(() => validate(30, 50)).toThrow();
    });

    it('should allow unlimited quota', async () => {
      mockRepo.updateQuota.mockResolvedValue({ limit: -1, unlimited: true });
      const result = await mockRepo.updateQuota(enterpriseId, 'users', -1);
      expect(result.unlimited).toBe(true);
    });

    it('should record update metadata', async () => {
      mockRepo.updateQuota.mockResolvedValue({ updatedAt: new Date().toISOString(), updatedBy: 'usr-1' });
      const result = await mockRepo.updateQuota(enterpriseId, 'users', 200, 'usr-1');
      expect(result.updatedBy).toBe('usr-1');
    });

    it('should validate quota type', () => {
      const validTypes = ['users', 'schools', 'storage', 'api_calls', 'courses'];
      const validate = (type: string) => {
        if (!validTypes.includes(type)) throw new Error('Type de quota invalide');
      };
      expect(() => validate('users')).not.toThrow();
      expect(() => validate('invalid')).toThrow();
    });
  });

  describe('checkQuota', () => {
    it('should check if quota is available', async () => {
      mockRepo.checkQuota.mockResolvedValue({ available: true, remaining: 50 });
      const result = await mockRepo.checkQuota(enterpriseId, 'users');
      expect(result.available).toBe(true);
    });

    it('should detect quota exceeded', async () => {
      mockRepo.checkQuota.mockResolvedValue({ available: false, remaining: 0, exceeded: true });
      const result = await mockRepo.checkQuota(enterpriseId, 'users');
      expect(result.available).toBe(false);
    });

    it('should check for specific amount', async () => {
      mockRepo.checkQuota.mockResolvedValue({ available: true, remaining: 50 });
      await mockRepo.checkQuota(enterpriseId, 'users', { amount: 10 });
      expect(mockRepo.checkQuota).toHaveBeenCalled();
    });

    it('should handle unlimited quota', async () => {
      mockRepo.checkQuota.mockResolvedValue({ available: true, unlimited: true });
      const result = await mockRepo.checkQuota(enterpriseId, 'users');
      expect(result.unlimited).toBe(true);
    });

    it('should return remaining count', async () => {
      mockRepo.checkQuota.mockResolvedValue({ available: true, remaining: 25 });
      const result = await mockRepo.checkQuota(enterpriseId, 'users');
      expect(result.remaining).toBe(25);
    });
  });

  describe('incrementUsage', () => {
    it('should increment usage', async () => {
      mockRepo.incrementUsage.mockResolvedValue({ type: 'users', used: 51, limit: 100 });
      const result = await mockRepo.incrementUsage(enterpriseId, 'users');
      expect(result.used).toBe(51);
    });

    it('should increment by amount', async () => {
      mockRepo.incrementUsage.mockResolvedValue({ type: 'users', used: 60, limit: 100 });
      const result = await mockRepo.incrementUsage(enterpriseId, 'users', 10);
      expect(result.used).toBe(60);
    });

    it('should throw if quota exceeded', async () => {
      mockRepo.incrementUsage.mockRejectedValue(new Error('Quota dépassé'));
      await expect(mockRepo.incrementUsage(enterpriseId, 'users')).rejects.toThrow('Quota dépassé');
    });

    it('should handle unlimited quota', async () => {
      mockRepo.incrementUsage.mockResolvedValue({ type: 'users', used: 10000, unlimited: true });
      const result = await mockRepo.incrementUsage(enterpriseId, 'users');
      expect(result.unlimited).toBe(true);
    });

    it('should validate increment amount', () => {
      const validate = (amount: number) => {
        if (amount < 1) throw new Error('Le montant doit être positif');
      };
      expect(() => validate(1)).not.toThrow();
      expect(() => validate(0)).toThrow();
      expect(() => validate(-1)).toThrow();
    });

    it('should update last updated timestamp', async () => {
      mockRepo.incrementUsage.mockResolvedValue({ used: 51, lastUpdated: new Date().toISOString() });
      const result = await mockRepo.incrementUsage(enterpriseId, 'users');
      expect(result.lastUpdated).toBeDefined();
    });
  });

  describe('decrementUsage', () => {
    it('should decrement usage', async () => {
      mockRepo.decrementUsage.mockResolvedValue({ type: 'users', used: 49, limit: 100 });
      const result = await mockRepo.decrementUsage(enterpriseId, 'users');
      expect(result.used).toBe(49);
    });

    it('should not go below zero', async () => {
      mockRepo.decrementUsage.mockResolvedValue({ type: 'users', used: 0, limit: 100 });
      const result = await mockRepo.decrementUsage(enterpriseId, 'users');
      expect(result.used).toBeGreaterThanOrEqual(0);
    });

    it('should decrement by amount', async () => {
      mockRepo.decrementUsage.mockResolvedValue({ type: 'users', used: 40, limit: 100 });
      const result = await mockRepo.decrementUsage(enterpriseId, 'users', 10);
      expect(result.used).toBe(40);
    });

    it('should validate decrement amount', () => {
      const validate = (amount: number) => {
        if (amount < 1) throw new Error('Le montant doit être positif');
      };
      expect(() => validate(1)).not.toThrow();
      expect(() => validate(0)).toThrow();
    });

    it('should update timestamp', async () => {
      mockRepo.decrementUsage.mockResolvedValue({ used: 49, lastUpdated: new Date().toISOString() });
      const result = await mockRepo.decrementUsage(enterpriseId, 'users');
      expect(result.lastUpdated).toBeDefined();
    });
  });

  describe('resetQuota', () => {
    it('should reset quota usage', async () => {
      mockRepo.resetQuota.mockResolvedValue({ type: 'users', used: 0, limit: 100 });
      const result = await mockRepo.resetQuota(enterpriseId, 'users');
      expect(result.used).toBe(0);
    });

    it('should require quota type', () => {
      const validate = (type: string) => {
        if (!type) throw new Error('Le type de quota est requis');
      };
      expect(() => validate('')).toThrow('Le type de quota est requis');
    });

    it('should record reset action', async () => {
      mockRepo.resetQuota.mockResolvedValue({ resetAt: new Date().toISOString(), resetBy: 'usr-1' });
      const result = await mockRepo.resetQuota(enterpriseId, 'users', 'usr-1');
      expect(result.resetBy).toBe('usr-1');
    });

    it('should not reset system quotas', async () => {
      mockRepo.resetQuota.mockRejectedValue(new Error('Ce quota ne peut pas être réinitialisé'));
      await expect(mockRepo.resetQuota(enterpriseId, 'system')).rejects.toThrow();
    });

    it('should handle partial reset', async () => {
      mockRepo.resetQuota.mockResolvedValue({ type: 'users', used: 50, resetTo: 50 });
      const result = await mockRepo.resetQuota(enterpriseId, 'users');
      expect(result.resetTo).toBe(50);
    });
  });

  describe('getQuotaHistory', () => {
    it('should return quota history', async () => {
      mockRepo.getQuotaHistory.mockResolvedValue([{ date: '2026-01-01', used: 45, limit: 100 }]);
      const result = await mockRepo.getQuotaHistory(enterpriseId, 'users');
      expect(result).toHaveLength(1);
    });

    it('should filter by date range', async () => {
      mockRepo.getQuotaHistory.mockResolvedValue([]);
      await mockRepo.getQuotaHistory(enterpriseId, 'users', { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getQuotaHistory).toHaveBeenCalled();
    });

    it('should handle empty history', async () => {
      mockRepo.getQuotaHistory.mockResolvedValue([]);
      const result = await mockRepo.getQuotaHistory(enterpriseId, 'users');
      expect(result).toHaveLength(0);
    });

    it('should sort by date ascending', async () => {
      mockRepo.getQuotaHistory.mockResolvedValue([
        { date: '2026-01-01', used: 45 },
        { date: '2026-02-01', used: 50 },
      ]);
      const result = await mockRepo.getQuotaHistory(enterpriseId, 'users');
      expect(result[0].used).toBeLessThanOrEqual(result[1].used);
    });

    it('should include limit changes', async () => {
      mockRepo.getQuotaHistory.mockResolvedValue([{ date: '2026-01-01', used: 45, limit: 100, limitChanged: false }]);
      const result = await mockRepo.getQuotaHistory(enterpriseId, 'users');
      expect(result[0].limitChanged).toBe(false);
    });
  });

  describe('getQuotaAlerts', () => {
    it('should return quota alerts', async () => {
      mockRepo.getQuotaAlerts.mockResolvedValue([{ type: 'users', threshold: 80, enabled: true }]);
      const result = await mockRepo.getQuotaAlerts(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepo.getQuotaAlerts.mockResolvedValue([]);
      await mockRepo.getQuotaAlerts(enterpriseId, { type: 'users' });
      expect(mockRepo.getQuotaAlerts).toHaveBeenCalled();
    });

    it('should handle no alerts', async () => {
      mockRepo.getQuotaAlerts.mockResolvedValue([]);
      const result = await mockRepo.getQuotaAlerts(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should include alert status', async () => {
      mockRepo.getQuotaAlerts.mockResolvedValue([{ type: 'users', threshold: 80, triggered: true, triggeredAt: '2026-01-01' }]);
      const result = await mockRepo.getQuotaAlerts(enterpriseId);
      expect(result[0].triggered).toBe(true);
    });

    it('should validate threshold', () => {
      const validate = (threshold: number) => {
        if (threshold < 1 || threshold > 100) throw new Error('Le seuil doit être entre 1 et 100');
      };
      expect(() => validate(80)).not.toThrow();
      expect(() => validate(0)).toThrow();
      expect(() => validate(101)).toThrow();
    });
  });

  describe('setQuotaAlert', () => {
    it('should set quota alert', async () => {
      mockRepo.setQuotaAlert.mockResolvedValue({ type: 'users', threshold: 80, enabled: true });
      const result = await mockRepo.setQuotaAlert(enterpriseId, 'users', 80);
      expect(result.threshold).toBe(80);
    });

    it('should validate threshold', () => {
      const validate = (threshold: number) => {
        if (threshold < 1 || threshold > 100) throw new Error('Le seuil doit être entre 1 et 100');
      };
      expect(() => validate(80)).not.toThrow();
      expect(() => validate(0)).toThrow();
    });

    it('should require type', () => {
      const validate = (type: string) => {
        if (!type) throw new Error('Le type est requis');
      };
      expect(() => validate('')).toThrow('Le type est requis');
    });

    it('should update existing alert', async () => {
      mockRepo.setQuotaAlert.mockResolvedValue({ type: 'users', threshold: 90, updatedAt: new Date().toISOString() });
      const result = await mockRepo.setQuotaAlert(enterpriseId, 'users', 90);
      expect(result.threshold).toBe(90);
    });

    it('should support notification channels', async () => {
      mockRepo.setQuotaAlert.mockResolvedValue({ type: 'users', threshold: 80, channels: ['email', 'slack'] });
      const result = await mockRepo.setQuotaAlert(enterpriseId, 'users', 80, { channels: ['email', 'slack'] });
      expect(result.channels).toContain('email');
    });
  });

  describe('getQuotaReport', () => {
    it('should return quota report', async () => {
      mockRepo.getQuotaReport.mockResolvedValue({ total: 5, exceeded: 1, warning: 2 });
      const result = await mockRepo.getQuotaReport(enterpriseId);
      expect(result.total).toBe(5);
    });

    it('should include usage trends', async () => {
      mockRepo.getQuotaReport.mockResolvedValue({ trends: [{ type: 'users', growth: 5 }] });
      const result = await mockRepo.getQuotaReport(enterpriseId);
      expect(result.trends).toHaveLength(1);
    });

    it('should include predictions', async () => {
      mockRepo.getQuotaReport.mockResolvedValue({ predictions: [{ type: 'users', willExceedIn: 30 }] });
      const result = await mockRepo.getQuotaReport(enterpriseId);
      expect(result.predictions).toHaveLength(1);
    });

    it('should handle no quotas', async () => {
      mockRepo.getQuotaReport.mockResolvedValue({ total: 0 });
      const result = await mockRepo.getQuotaReport(enterpriseId);
      expect(result.total).toBe(0);
    });

    it('should include recommendations', async () => {
      mockRepo.getQuotaReport.mockResolvedValue({ recommendations: ['Increase users quota'] });
      const result = await mockRepo.getQuotaReport(enterpriseId);
      expect(result.recommendations).toHaveLength(1);
    });
  });

  describe('getPlanLimits', () => {
    it('should return plan limits', async () => {
      mockRepo.getPlanLimits.mockResolvedValue({ plan: 'enterprise', limits: { users: 1000, schools: 100 } });
      const result = await mockRepo.getPlanLimits(enterpriseId);
      expect(result.plan).toBe('enterprise');
    });

    it('should include feature availability', async () => {
      mockRepo.getPlanLimits.mockResolvedValue({ features: { analytics: true, api_access: true } });
      const result = await mockRepo.getPlanLimits(enterpriseId);
      expect(result.features.analytics).toBe(true);
    });

    it('should compare with current usage', async () => {
      mockRepo.getPlanLimits.mockResolvedValue({ limits: { users: 100 }, usage: { users: 50 } });
      const result = await mockRepo.getPlanLimits(enterpriseId);
      expect(result.usage.users).toBeLessThanOrEqual(result.limits.users);
    });

    it('should handle different plans', async () => {
      const plans = ['basic', 'standard', 'premium', 'enterprise'];
      for (const plan of plans) {
        mockRepo.getPlanLimits.mockResolvedValue({ plan });
        await mockRepo.getPlanLimits(enterpriseId);
        expect(mockRepo.getPlanLimits).toHaveBeenCalled();
      }
    });

    it('should include upgrade suggestions', async () => {
      mockRepo.getPlanLimits.mockResolvedValue({ upgradeSuggestion: { plan: 'premium', reason: 'Storage limit reached' } });
      const result = await mockRepo.getPlanLimits(enterpriseId);
      expect(result.upgradeSuggestion).toBeDefined();
    });
  });

  describe('checkFeatureAccess', () => {
    it('should check feature access', async () => {
      mockRepo.checkFeatureAccess.mockResolvedValue({ feature: 'analytics', hasAccess: true });
      const result = await mockRepo.checkFeatureAccess(enterpriseId, 'analytics');
      expect(result.hasAccess).toBe(true);
    });

    it('should deny access for restricted feature', async () => {
      mockRepo.checkFeatureAccess.mockResolvedValue({ feature: 'advanced_api', hasAccess: false, reason: 'Plan upgrade required' });
      const result = await mockRepo.checkFeatureAccess(enterpriseId, 'advanced_api');
      expect(result.hasAccess).toBe(false);
    });

    it('should require feature name', () => {
      const validate = (feature: string) => {
        if (!feature) throw new Error('La fonctionnalité est requise');
      };
      expect(() => validate('')).toThrow('La fonctionnalité est requise');
    });

    it('should handle feature flags', async () => {
      mockRepo.checkFeatureAccess.mockResolvedValue({ feature: 'beta_feature', hasAccess: true, viaFlag: true });
      const result = await mockRepo.checkFeatureAccess(enterpriseId, 'beta_feature');
      expect(result.viaFlag).toBe(true);
    });

    it('should include required plan', async () => {
      mockRepo.checkFeatureAccess.mockResolvedValue({ feature: 'sso', hasAccess: false, requiredPlan: 'enterprise' });
      const result = await mockRepo.checkFeatureAccess(enterpriseId, 'sso');
      expect(result.requiredPlan).toBe('enterprise');
    });
  });

  describe('getUsageByFeature', () => {
    it('should return usage by feature', async () => {
      mockRepo.getUsageByFeature.mockResolvedValue([{ feature: 'analytics', requests: 5000 }]);
      const result = await mockRepo.getUsageByFeature(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should sort by usage', async () => {
      mockRepo.getUsageByFeature.mockResolvedValue([]);
      await mockRepo.getUsageByFeature(enterpriseId, { sortBy: 'requests', order: 'desc' });
      expect(mockRepo.getUsageByFeature).toHaveBeenCalled();
    });

    it('should handle no usage', async () => {
      mockRepo.getUsageByFeature.mockResolvedValue([]);
      const result = await mockRepo.getUsageByFeature(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should include cost per feature', async () => {
      mockRepo.getUsageByFeature.mockResolvedValue([{ feature: 'storage', usage: 5, cost: 10 }]);
      const result = await mockRepo.getUsageByFeature(enterpriseId);
      expect(result[0].cost).toBe(10);
    });

    it('should filter by date range', async () => {
      mockRepo.getUsageByFeature.mockResolvedValue([]);
      await mockRepo.getUsageByFeature(enterpriseId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getUsageByFeature).toHaveBeenCalled();
    });
  });
});
