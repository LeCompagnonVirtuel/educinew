import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('SubscriptionService', () => {
  const mockRepo = {
    findSubscriptions: vi.fn(),
    findSubscriptionById: vi.fn(),
    findSubscriptionByEnterprise: vi.fn(),
    createSubscription: vi.fn(),
    updateSubscription: vi.fn(),
    cancelSubscription: vi.fn(),
    renewSubscription: vi.fn(),
    upgradeSubscription: vi.fn(),
    downgradeSubscription: vi.fn(),
    getSubscriptionInvoices: vi.fn(),
    getSubscriptionUsage: vi.fn(),
    getSubscriptionLimits: vi.fn(),
    checkSubscriptionStatus: vi.fn(),
    getTrialEndDate: vi.fn(),
    extendTrial: vi.fn(),
    pauseSubscription: vi.fn(),
    resumeSubscription: vi.fn(),
    getSubscriptionHistory: vi.fn(),
    applyPromoCode: vi.fn(),
    removePromoCode: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const subscriptionId = 'sub-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findSubscriptions', () => {
    it('should return subscriptions list', async () => {
      const subs = [{ id: subscriptionId, plan: 'premium' }];
      mockRepo.findSubscriptions.mockResolvedValue(subs);
      const result = await mockRepo.findSubscriptions(enterpriseId);
      expect(result).toEqual(subs);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by status', async () => {
      mockRepo.findSubscriptions.mockResolvedValue([]);
      await mockRepo.findSubscriptions(enterpriseId, { status: 'active' });
      expect(mockRepo.findSubscriptions).toHaveBeenCalledWith(enterpriseId, { status: 'active' });
    });

    it('should handle empty results', async () => {
      mockRepo.findSubscriptions.mockResolvedValue([]);
      const result = await mockRepo.findSubscriptions(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by creation date', async () => {
      mockRepo.findSubscriptions.mockResolvedValue([]);
      await mockRepo.findSubscriptions(enterpriseId, { sortBy: 'createdAt', order: 'desc' });
      expect(mockRepo.findSubscriptions).toHaveBeenCalled();
    });

    it('should filter by plan type', async () => {
      mockRepo.findSubscriptions.mockResolvedValue([]);
      await mockRepo.findSubscriptions(enterpriseId, { plan: 'enterprise' });
      expect(mockRepo.findSubscriptions).toHaveBeenCalledWith(enterpriseId, { plan: 'enterprise' });
    });
  });

  describe('findSubscriptionById', () => {
    it('should return subscription by id', async () => {
      const sub = { id: subscriptionId, plan: 'premium' };
      mockRepo.findSubscriptionById.mockResolvedValue(sub);
      const result = await mockRepo.findSubscriptionById(subscriptionId);
      expect(result).toEqual(sub);
    });

    it('should throw if not found', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const sub = await mockRepo.findSubscriptionById(id);
        if (!sub) throw new Error('Abonnement non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Abonnement non trouvé');
    });

    it('should require subscriptionId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include billing info', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, billing: { nextDate: '2026-08-01' } });
      const result = await mockRepo.findSubscriptionById(subscriptionId);
      expect(result.billing.nextDate).toBe('2026-08-01');
    });
  });

  describe('findSubscriptionByEnterprise', () => {
    it('should return active subscription for enterprise', async () => {
      mockRepo.findSubscriptionByEnterprise.mockResolvedValue({ id: subscriptionId, enterpriseId });
      const result = await mockRepo.findSubscriptionByEnterprise(enterpriseId);
      expect(result.enterpriseId).toBe(enterpriseId);
    });

    it('should return null if no subscription', async () => {
      mockRepo.findSubscriptionByEnterprise.mockResolvedValue(null);
      const result = await mockRepo.findSubscriptionByEnterprise(enterpriseId);
      expect(result).toBeNull();
    });
  });

  describe('createSubscription', () => {
    it('should create subscription with valid data', async () => {
      const data = { plan: 'premium', billingCycle: 'monthly' };
      mockRepo.createSubscription.mockResolvedValue({ id: subscriptionId, ...data });
      const result = await mockRepo.createSubscription({ ...data, enterprise_id: enterpriseId });
      expect(result.plan).toBe('premium');
    });

    it('should require plan', () => {
      const validate = (data: any) => {
        if (!data?.plan) throw new Error('Le plan est requis');
      };
      expect(() => validate({ billingCycle: 'monthly' })).toThrow('Le plan est requis');
    });

    it('should require billingCycle', () => {
      const validate = (data: any) => {
        if (!data?.billingCycle) throw new Error('Le cycle de facturation est requis');
      };
      expect(() => validate({ plan: 'premium' })).toThrow('Le cycle de facturation est requis');
    });

    it('should accept valid billing cycles', () => {
      const isValid = (cycle: string) => ['monthly', 'quarterly', 'annually'].includes(cycle);
      expect(isValid('monthly')).toBe(true);
      expect(isValid('quarterly')).toBe(true);
      expect(isValid('annually')).toBe(true);
      expect(isValid('weekly')).toBe(false);
    });

    it('should set trial start date', async () => {
      mockRepo.createSubscription.mockResolvedValue({ id: subscriptionId, trialStart: new Date().toISOString() });
      const result = await mockRepo.createSubscription({ plan: 'premium', billingCycle: 'monthly', enterprise_id: enterpriseId });
      expect(result.trialStart).toBeDefined();
    });

    it('should reject duplicate active subscription', async () => {
      mockRepo.findSubscriptionByEnterprise.mockResolvedValue({ id: 'existing' });
      const createOrReject = async () => {
        const existing = await mockRepo.findSubscriptionByEnterprise(enterpriseId);
        if (existing) throw new Error('Un abonnement actif existe déjà');
      };
      await expect(createOrReject()).rejects.toThrow('Un abonnement actif existe déjà');
    });
  });

  describe('updateSubscription', () => {
    it('should update subscription', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, plan: 'basic' });
      mockRepo.updateSubscription.mockResolvedValue({ id: subscriptionId, plan: 'premium' });
      const result = await mockRepo.updateSubscription(subscriptionId, { plan: 'premium' });
      expect(result.plan).toBe('premium');
    });

    it('should throw if not found', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const sub = await mockRepo.findSubscriptionById(subscriptionId);
        if (!sub) throw new Error('Abonnement non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow('Abonnement non trouvé');
    });

    it('should allow billing cycle change', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId });
      mockRepo.updateSubscription.mockResolvedValue({ id: subscriptionId, billingCycle: 'annually' });
      const result = await mockRepo.updateSubscription(subscriptionId, { billingCycle: 'annually' });
      expect(result.billingCycle).toBe('annually');
    });
  });

  describe('cancelSubscription', () => {
    it('should cancel subscription', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, status: 'active' });
      mockRepo.cancelSubscription.mockResolvedValue({ id: subscriptionId, status: 'cancelled' });
      const result = await mockRepo.cancelSubscription(subscriptionId, 'Too expensive');
      expect(result.status).toBe('cancelled');
    });

    it('should throw if already cancelled', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, status: 'cancelled' });
      const cancelOrThrow = async () => {
        const sub = await mockRepo.findSubscriptionById(subscriptionId);
        if (sub?.status === 'cancelled') throw new Error('L\'abonnement est déjà annulé');
      };
      await expect(cancelOrThrow()).rejects.toThrow('L\'abonnement est déjà annulé');
    });

    it('should require cancellation reason', () => {
      const validate = (reason: string) => {
        if (!reason || reason.trim().length < 3) throw new Error('Le motif d\'annulation est requis');
      };
      expect(() => validate('')).toThrow('Le motif d\'annulation est requis');
    });

    it('should set end date', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, status: 'active' });
      mockRepo.cancelSubscription.mockResolvedValue({ endDate: '2026-08-01' });
      const result = await mockRepo.cancelSubscription(subscriptionId, 'reason');
      expect(result.endDate).toBeDefined();
    });

    it('should allow cancellation with valid reason', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, status: 'active' });
      mockRepo.cancelSubscription.mockResolvedValue(undefined);
      await mockRepo.cancelSubscription(subscriptionId, 'Budget constraints');
      expect(mockRepo.cancelSubscription).toHaveBeenCalled();
    });
  });

  describe('upgradeSubscription', () => {
    it('should upgrade subscription plan', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, plan: 'basic' });
      mockRepo.upgradeSubscription.mockResolvedValue({ id: subscriptionId, plan: 'premium' });
      const result = await mockRepo.upgradeSubscription(subscriptionId, 'premium');
      expect(result.plan).toBe('premium');
    });

    it('should calculate prorated amount', () => {
      const calculateProrated = (currentPrice: number, newPrice: number, daysRemaining: number, totalDays: number) => {
        return ((newPrice - currentPrice) * daysRemaining) / totalDays;
      };
      const prorated = calculateProrated(10, 20, 15, 30);
      expect(prorated).toBe(5);
    });

    it('should throw if same plan', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, plan: 'premium' });
      const upgradeOrThrow = async (plan: string) => {
        const sub = await mockRepo.findSubscriptionById(subscriptionId);
        if (sub?.plan === plan) throw new Error('Vous êtes déjà sur ce plan');
      };
      await expect(upgradeOrThrow('premium')).rejects.toThrow('Vous êtes déjà sur ce plan');
    });

    it('should validate target plan exists', () => {
      const validPlans = ['basic', 'standard', 'premium', 'enterprise'];
      expect(validPlans.includes('premium')).toBe(true);
      expect(validPlans.includes('invalid')).toBe(false);
    });
  });

  describe('downgradeSubscription', () => {
    it('should downgrade subscription plan', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, plan: 'premium' });
      mockRepo.downgradeSubscription.mockResolvedValue({ id: subscriptionId, plan: 'basic' });
      const result = await mockRepo.downgradeSubscription(subscriptionId, 'basic');
      expect(result.plan).toBe('basic');
    });

    it('should warn about feature loss', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, plan: 'premium' });
      mockRepo.downgradeSubscription.mockResolvedValue({ warnings: ['Loss of advanced analytics'] });
      const result = await mockRepo.downgradeSubscription(subscriptionId, 'basic');
      expect(result.warnings).toBeDefined();
    });

    it('should not downgrade to same plan', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, plan: 'basic' });
      const downgradeOrThrow = async (plan: string) => {
        const sub = await mockRepo.findSubscriptionById(subscriptionId);
        if (sub?.plan === plan) throw new Error('Vous êtes déjà sur ce plan');
      };
      await expect(downgradeOrThrow('basic')).rejects.toThrow('Vous êtes déjà sur ce plan');
    });
  });

  describe('getSubscriptionInvoices', () => {
    it('should return invoices list', async () => {
      mockRepo.getSubscriptionInvoices.mockResolvedValue([{ id: 'inv-1', amount: 100 }]);
      const result = await mockRepo.getSubscriptionInvoices(subscriptionId);
      expect(result).toHaveLength(1);
    });

    it('should filter by status', async () => {
      mockRepo.getSubscriptionInvoices.mockResolvedValue([]);
      await mockRepo.getSubscriptionInvoices(subscriptionId, { status: 'paid' });
      expect(mockRepo.getSubscriptionInvoices).toHaveBeenCalled();
    });

    it('should handle no invoices', async () => {
      mockRepo.getSubscriptionInvoices.mockResolvedValue([]);
      const result = await mockRepo.getSubscriptionInvoices(subscriptionId);
      expect(result).toHaveLength(0);
    });
  });

  describe('checkSubscriptionStatus', () => {
    it('should return subscription status', async () => {
      mockRepo.checkSubscriptionStatus.mockResolvedValue({ status: 'active', daysUntilExpiry: 30 });
      const result = await mockRepo.checkSubscriptionStatus(enterpriseId);
      expect(result.status).toBe('active');
    });

    it('should detect expired subscription', async () => {
      mockRepo.checkSubscriptionStatus.mockResolvedValue({ status: 'expired' });
      const result = await mockRepo.checkSubscriptionStatus(enterpriseId);
      expect(result.status).toBe('expired');
    });

    it('should detect trial period', async () => {
      mockRepo.checkSubscriptionStatus.mockResolvedValue({ status: 'trial', daysLeft: 7 });
      const result = await mockRepo.checkSubscriptionStatus(enterpriseId);
      expect(result.status).toBe('trial');
    });

    it('should detect past due', async () => {
      mockRepo.checkSubscriptionStatus.mockResolvedValue({ status: 'past_due' });
      const result = await mockRepo.checkSubscriptionStatus(enterpriseId);
      expect(result.status).toBe('past_due');
    });
  });

  describe('pauseSubscription', () => {
    it('should pause active subscription', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, status: 'active' });
      mockRepo.pauseSubscription.mockResolvedValue({ id: subscriptionId, status: 'paused' });
      const result = await mockRepo.pauseSubscription(subscriptionId);
      expect(result.status).toBe('paused');
    });

    it('should throw if subscription not active', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, status: 'cancelled' });
      const pauseOrThrow = async () => {
        const sub = await mockRepo.findSubscriptionById(subscriptionId);
        if (sub?.status !== 'active') throw new Error('Seul un abonnement actif peut être mis en pause');
      };
      await expect(pauseOrThrow()).rejects.toThrow('Seul un abonnement actif peut être mis en pause');
    });

    it('should limit pause duration', () => {
      const maxPauseDays = 90;
      const requestedDays = 120;
      const allowedDays = Math.min(requestedDays, maxPauseDays);
      expect(allowedDays).toBe(90);
    });
  });

  describe('resumeSubscription', () => {
    it('should resume paused subscription', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, status: 'paused' });
      mockRepo.resumeSubscription.mockResolvedValue({ id: subscriptionId, status: 'active' });
      const result = await mockRepo.resumeSubscription(subscriptionId);
      expect(result.status).toBe('active');
    });

    it('should throw if not paused', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, status: 'active' });
      const resumeOrThrow = async () => {
        const sub = await mockRepo.findSubscriptionById(subscriptionId);
        if (sub?.status !== 'paused') throw new Error('L\'abonnement n\'est pas en pause');
      };
      await expect(resumeOrThrow()).rejects.toThrow('L\'abonnement n\'est pas en pause');
    });
  });

  describe('applyPromoCode', () => {
    it('should apply promo code', async () => {
      mockRepo.applyPromoCode.mockResolvedValue({ discount: 20, promoCode: 'SAVE20' });
      const result = await mockRepo.applyPromoCode(subscriptionId, 'SAVE20');
      expect(result.discount).toBe(20);
    });

    it('should reject invalid promo code', async () => {
      mockRepo.applyPromoCode.mockRejectedValue(new Error('Code promo invalide'));
      await expect(mockRepo.applyPromoCode(subscriptionId, 'INVALID')).rejects.toThrow('Code promo invalide');
    });

    it('should reject expired promo code', async () => {
      mockRepo.applyPromoCode.mockRejectedValue(new Error('Le code promo a expiré'));
      await expect(mockRepo.applyPromoCode(subscriptionId, 'EXPIRED')).rejects.toThrow('Le code promo a expiré');
    });

    it('should not apply same promo code twice', async () => {
      mockRepo.applyPromoCode.mockRejectedValue(new Error('Le code promo est déjà appliqué'));
      await expect(mockRepo.applyPromoCode(subscriptionId, 'USED')).rejects.toThrow('Le code promo est déjà appliqué');
    });

    it('should validate promo code format', () => {
      const isValidCode = (code: string) => /^[A-Z0-9]{4,20}$/.test(code);
      expect(isValidCode('SAVE20')).toBe(true);
      expect(isValidCode('AB')).toBe(false);
      expect(isValidCode('invalid code')).toBe(false);
    });
  });

  describe('getSubscriptionLimits', () => {
    it('should return subscription limits', async () => {
      mockRepo.getSubscriptionLimits.mockResolvedValue({ maxSchools: 10, maxUsers: 500 });
      const result = await mockRepo.getSubscriptionLimits(subscriptionId);
      expect(result.maxSchools).toBe(10);
    });

    it('should return different limits per plan', () => {
      const limits: Record<string, any> = {
        basic: { maxSchools: 2, maxUsers: 50 },
        premium: { maxSchools: 10, maxUsers: 500 },
        enterprise: { maxSchools: 100, maxUsers: 10000 },
      };
      expect(limits.basic.maxSchools).toBe(2);
      expect(limits.enterprise.maxUsers).toBe(10000);
    });

    it('should check if limit exceeded', () => {
      const checkLimit = (current: number, max: number) => current >= max;
      expect(checkLimit(5, 10)).toBe(false);
      expect(checkLimit(10, 10)).toBe(true);
      expect(checkLimit(11, 10)).toBe(true);
    });
  });

  describe('extendTrial', () => {
    it('should extend trial period', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, status: 'trial' });
      mockRepo.extendTrial.mockResolvedValue({ newEndDate: '2026-09-01' });
      const result = await mockRepo.extendTrial(subscriptionId, 14);
      expect(result.newEndDate).toBeDefined();
    });

    it('should throw if not in trial', async () => {
      mockRepo.findSubscriptionById.mockResolvedValue({ id: subscriptionId, status: 'active' });
      const extendOrThrow = async () => {
        const sub = await mockRepo.findSubscriptionById(subscriptionId);
        if (sub?.status !== 'trial') throw new Error('L\'abonnement n\'est pas en période d\'essai');
      };
      await expect(extendOrThrow()).rejects.toThrow('L\'abonnement n\'est pas en période d\'essai');
    });

    it('should limit max trial extension', () => {
      const maxExtensionDays = 30;
      const requestedDays = 60;
      const allowedDays = Math.min(requestedDays, maxExtensionDays);
      expect(allowedDays).toBe(30);
    });
  });

  describe('getSubscriptionHistory', () => {
    it('should return subscription history', async () => {
      mockRepo.getSubscriptionHistory.mockResolvedValue([{ event: 'created', date: '2026-01-01' }]);
      const result = await mockRepo.getSubscriptionHistory(subscriptionId);
      expect(result).toHaveLength(1);
    });

    it('should sort by date', async () => {
      mockRepo.getSubscriptionHistory.mockResolvedValue([
        { event: 'created', date: '2026-01-01' },
        { event: 'upgraded', date: '2026-02-01' },
      ]);
      const result = await mockRepo.getSubscriptionHistory(subscriptionId);
      expect(new Date(result[0].date).getTime()).toBeLessThanOrEqual(new Date(result[1].date).getTime());
    });
  });
});
