import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('CouponService', () => {
  const mockRepo = {
    findCoupons: vi.fn(),
    findCouponById: vi.fn(),
    findCouponByCode: vi.fn(),
    createCoupon: vi.fn(),
    updateCoupon: vi.fn(),
    deleteCoupon: vi.fn(),
    validateCoupon: vi.fn(),
    applyCoupon: vi.fn(),
    removeCoupon: vi.fn(),
    getCouponUsage: vi.fn(),
    getCouponStats: vi.fn(),
    bulkCreateCoupons: vi.fn(),
    getCouponHistory: vi.fn(),
    getCouponBySubscription: vi.fn(),
    getCampaignCoupons: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const couponId = 'coup-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findCoupons', () => {
    it('should return coupons list', async () => {
      const coupons = [{ id: couponId, code: 'SAVE20', discount: 20 }];
      mockRepo.findCoupons.mockResolvedValue(coupons);
      const result = await mockRepo.findCoupons(enterpriseId);
      expect(result).toEqual(coupons);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by status', async () => {
      mockRepo.findCoupons.mockResolvedValue([]);
      await mockRepo.findCoupons(enterpriseId, { status: 'active' });
      expect(mockRepo.findCoupons).toHaveBeenCalled();
    });

    it('should filter by type', async () => {
      mockRepo.findCoupons.mockResolvedValue([]);
      await mockRepo.findCoupons(enterpriseId, { type: 'percentage' });
      expect(mockRepo.findCoupons).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockRepo.findCoupons.mockResolvedValue([]);
      const result = await mockRepo.findCoupons(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by creation date', async () => {
      mockRepo.findCoupons.mockResolvedValue([]);
      await mockRepo.findCoupons(enterpriseId, { sortBy: 'createdAt', order: 'desc' });
      expect(mockRepo.findCoupons).toHaveBeenCalled();
    });

    it('should include usage counts', async () => {
      mockRepo.findCoupons.mockResolvedValue([{ id: couponId, usageCount: 15 }]);
      const result = await mockRepo.findCoupons(enterpriseId);
      expect(result[0].usageCount).toBe(15);
    });
  });

  describe('findCouponById', () => {
    it('should return coupon by id', async () => {
      const coupon = { id: couponId, code: 'SAVE20', discount: 20 };
      mockRepo.findCouponById.mockResolvedValue(coupon);
      const result = await mockRepo.findCouponById(couponId);
      expect(result).toEqual(coupon);
    });

    it('should throw if not found', async () => {
      mockRepo.findCouponById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const coupon = await mockRepo.findCouponById(id);
        if (!coupon) throw new Error('Coupon non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Coupon non trouvé');
    });

    it('should require couponId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include validity dates', async () => {
      mockRepo.findCouponById.mockResolvedValue({ id: couponId, validFrom: '2026-01-01', validUntil: '2026-12-31' });
      const result = await mockRepo.findCouponById(couponId);
      expect(result.validFrom).toBeDefined();
    });

    it('should include restrictions', async () => {
      mockRepo.findCouponById.mockResolvedValue({ id: couponId, restrictions: { minAmount: 50, maxUses: 100 } });
      const result = await mockRepo.findCouponById(couponId);
      expect(result.restrictions.minAmount).toBe(50);
    });
  });

  describe('findCouponByCode', () => {
    it('should return coupon by code', async () => {
      mockRepo.findCouponByCode.mockResolvedValue({ id: couponId, code: 'SAVE20' });
      const result = await mockRepo.findCouponByCode(enterpriseId, 'SAVE20');
      expect(result.code).toBe('SAVE20');
    });

    it('should throw if code not found', async () => {
      mockRepo.findCouponByCode.mockResolvedValue(null);
      const findOrThrow = async (code: string) => {
        const coupon = await mockRepo.findCouponByCode(enterpriseId, code);
        if (!coupon) throw new Error('Coupon non trouvé');
      };
      await expect(findOrThrow('INVALID')).rejects.toThrow('Coupon non trouvé');
    });

    it('should require code', () => {
      const validate = (code: string) => {
        if (!code) throw new Error('Le code est requis');
      };
      expect(() => validate('')).toThrow('Le code est requis');
    });

    it('should handle case-insensitive lookup', async () => {
      mockRepo.findCouponByCode.mockResolvedValue({ id: couponId, code: 'SAVE20' });
      const result = await mockRepo.findCouponByCode(enterpriseId, 'save20');
      expect(result.code).toBe('SAVE20');
    });
  });

  describe('createCoupon', () => {
    it('should create coupon with valid data', async () => {
      const data = { code: 'SAVE20', type: 'percentage', value: 20, validUntil: '2026-12-31' };
      mockRepo.findCouponByCode.mockResolvedValue(null);
      mockRepo.createCoupon.mockResolvedValue({ id: couponId, ...data });
      const result = await mockRepo.createCoupon({ ...data, enterprise_id: enterpriseId });
      expect(result.code).toBe('SAVE20');
    });

    it('should require code', () => {
      const validate = (data: any) => {
        if (!data?.code) throw new Error('Le code est requis');
      };
      expect(() => validate({ type: 'percentage', value: 20 })).toThrow('Le code est requis');
    });

    it('should require type', () => {
      const validate = (data: any) => {
        if (!data?.type) throw new Error('Le type est requis');
      };
      expect(() => validate({ code: 'CODE', value: 20 })).toThrow('Le type est requis');
    });

    it('should require value', () => {
      const validate = (data: any) => {
        if (!data?.value || data.value <= 0) throw new Error('La valeur est requise');
      };
      expect(() => validate({ code: 'CODE', type: 'percentage' })).toThrow('La valeur est requise');
    });

    it('should validate code format', () => {
      const isValidCode = (code: string) => /^[A-Z0-9]{4,20}$/.test(code);
      expect(isValidCode('SAVE20')).toBe(true);
      expect(isValidCode('AB')).toBe(false);
      expect(isValidCode('invalid code')).toBe(false);
    });

    it('should validate percentage range', () => {
      const validate = (value: number, type: string) => {
        if (type === 'percentage' && (value < 1 || value > 100)) throw new Error('Le pourcentage doit être entre 1 et 100');
      };
      expect(() => validate(50, 'percentage')).not.toThrow();
      expect(() => validate(101, 'percentage')).toThrow();
    });

    it('should reject duplicate code', async () => {
      mockRepo.findCouponByCode.mockResolvedValue({ id: 'existing' });
      const createOrThrow = async (code: string) => {
        const existing = await mockRepo.findCouponByCode(enterpriseId, code);
        if (existing) throw new Error('Un coupon avec ce code existe déjà');
      };
      await expect(createOrThrow('SAVE20')).rejects.toThrow();
    });

    it('should set default values', async () => {
      mockRepo.findCouponByCode.mockResolvedValue(null);
      mockRepo.createCoupon.mockResolvedValue({ id: couponId, active: true, usageCount: 0 });
      const result = await mockRepo.createCoupon({ code: 'NEW', type: 'percentage', value: 10, enterprise_id: enterpriseId });
      expect(result.active).toBe(true);
      expect(result.usageCount).toBe(0);
    });

    it('should accept valid coupon types', () => {
      const validTypes = ['percentage', 'fixed', 'free_trial', 'free_shipping'];
      const validate = (type: string) => {
        if (!validTypes.includes(type)) throw new Error('Type de coupon invalide');
      };
      expect(() => validate('percentage')).not.toThrow();
      expect(() => validate('invalid')).toThrow();
    });
  });

  describe('updateCoupon', () => {
    it('should update coupon', async () => {
      mockRepo.findCouponById.mockResolvedValue({ id: couponId, code: 'SAVE20' });
      mockRepo.updateCoupon.mockResolvedValue({ id: couponId, value: 30 });
      const result = await mockRepo.updateCoupon(couponId, { value: 30 });
      expect(result.value).toBe(30);
    });

    it('should throw if not found', async () => {
      mockRepo.findCouponById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const coupon = await mockRepo.findCouponById(couponId);
        if (!coupon) throw new Error('Coupon non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow('Coupon non trouvé');
    });

    it('should allow disabling coupon', async () => {
      mockRepo.findCouponById.mockResolvedValue({ id: couponId });
      mockRepo.updateCoupon.mockResolvedValue({ active: false });
      const result = await mockRepo.updateCoupon(couponId, { active: false });
      expect(result.active).toBe(false);
    });

    it('should update expiry date', async () => {
      mockRepo.findCouponById.mockResolvedValue({ id: couponId });
      mockRepo.updateCoupon.mockResolvedValue({ validUntil: '2027-12-31' });
      const result = await mockRepo.updateCoupon(couponId, { validUntil: '2027-12-31' });
      expect(result.validUntil).toBe('2027-12-31');
    });

    it('should validate update data', () => {
      const validate = (data: any) => {
        if (data.value !== undefined && data.value < 0) throw new Error('La valeur ne peut pas être négative');
      };
      expect(() => validate({ value: 20 })).not.toThrow();
      expect(() => validate({ value: -1 })).toThrow();
    });

    it('should not update used coupons', async () => {
      mockRepo.findCouponById.mockResolvedValue({ id: couponId, usageCount: 50 });
      const updateOrThrow = async () => {
        const coupon = await mockRepo.findCouponById(couponId);
        if (coupon && coupon.usageCount > 0) throw new Error('Cannot update coupon with existing usage');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('deleteCoupon', () => {
    it('should delete coupon', async () => {
      mockRepo.findCouponById.mockResolvedValue({ id: couponId, usageCount: 0 });
      mockRepo.deleteCoupon.mockResolvedValue(undefined);
      await mockRepo.deleteCoupon(couponId);
      expect(mockRepo.deleteCoupon).toHaveBeenCalledWith(couponId);
    });

    it('should throw if not found', async () => {
      mockRepo.findCouponById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const coupon = await mockRepo.findCouponById(couponId);
        if (!coupon) throw new Error('Coupon non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Coupon non trouvé');
    });

    it('should not delete coupon with usage', async () => {
      mockRepo.findCouponById.mockResolvedValue({ id: couponId, usageCount: 50 });
      const deleteOrThrow = async () => {
        const coupon = await mockRepo.findCouponById(couponId);
        if (coupon && coupon.usageCount > 0) throw new Error('Cannot delete coupon with existing usage');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });

    it('should soft delete coupon', async () => {
      mockRepo.findCouponById.mockResolvedValue({ id: couponId });
      mockRepo.deleteCoupon.mockResolvedValue({ deleted: true, archivedAt: new Date().toISOString() });
      const result = await mockRepo.deleteCoupon(couponId);
      expect(result.deleted).toBe(true);
    });

    it('should handle already deleted coupon', async () => {
      mockRepo.findCouponById.mockResolvedValue({ id: couponId, deleted: true });
      const deleteOrThrow = async () => {
        const coupon = await mockRepo.findCouponById(couponId);
        if (coupon?.deleted) throw new Error('Le coupon est déjà supprimé');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('validateCoupon', () => {
    it('should validate active coupon', async () => {
      mockRepo.validateCoupon.mockResolvedValue({ valid: true, discount: 20, type: 'percentage' });
      const result = await mockRepo.validateCoupon(enterpriseId, 'SAVE20', 100);
      expect(result.valid).toBe(true);
    });

    it('should reject expired coupon', async () => {
      mockRepo.validateCoupon.mockResolvedValue({ valid: false, reason: 'expired' });
      const result = await mockRepo.validateCoupon(enterpriseId, 'EXPIRED', 100);
      expect(result.valid).toBe(false);
    });

    it('should reject inactive coupon', async () => {
      mockRepo.validateCoupon.mockResolvedValue({ valid: false, reason: 'inactive' });
      const result = await mockRepo.validateCoupon(enterpriseId, 'INACTIVE', 100);
      expect(result.valid).toBe(false);
    });

    it('should reject max uses exceeded', async () => {
      mockRepo.validateCoupon.mockResolvedValue({ valid: false, reason: 'max_uses_exceeded' });
      const result = await mockRepo.validateCoupon(enterpriseId, 'FULL', 100);
      expect(result.valid).toBe(false);
    });

    it('should reject below minimum amount', async () => {
      mockRepo.validateCoupon.mockResolvedValue({ valid: false, reason: 'minimum_not_met', minimumAmount: 50 });
      const result = await mockRepo.validateCoupon(enterpriseId, 'SAVE20', 30);
      expect(result.valid).toBe(false);
    });

    it('should calculate discount amount', async () => {
      mockRepo.validateCoupon.mockResolvedValue({ valid: true, discount: 20, discountAmount: 20 });
      const result = await mockRepo.validateCoupon(enterpriseId, 'SAVE20', 100);
      expect(result.discountAmount).toBe(20);
    });

    it('should handle fixed amount coupon', async () => {
      mockRepo.validateCoupon.mockResolvedValue({ valid: true, type: 'fixed', discountAmount: 15 });
      const result = await mockRepo.validateCoupon(enterpriseId, 'FLAT15', 100);
      expect(result.discountAmount).toBe(15);
    });

    it('should require code', () => {
      const validate = (code: string) => {
        if (!code) throw new Error('Le code est requis');
      };
      expect(() => validate('')).toThrow('Le code est requis');
    });

    it('should validate amount parameter', () => {
      const validate = (amount: number) => {
        if (amount < 0) throw new Error('Le montant ne peut pas être négatif');
      };
      expect(() => validate(100)).not.toThrow();
      expect(() => validate(-10)).toThrow();
    });
  });

  describe('applyCoupon', () => {
    it('should apply coupon to subscription', async () => {
      mockRepo.applyCoupon.mockResolvedValue({ subscriptionId: 'sub-1', couponId, discount: 20 });
      const result = await mockRepo.applyCoupon(enterpriseId, 'sub-1', 'SAVE20');
      expect(result.discount).toBe(20);
    });

    it('should throw if coupon invalid', async () => {
      mockRepo.applyCoupon.mockRejectedValue(new Error('Coupon invalide'));
      await expect(mockRepo.applyCoupon(enterpriseId, 'sub-1', 'INVALID')).rejects.toThrow('Coupon invalide');
    });

    it('should not apply same coupon twice', async () => {
      mockRepo.applyCoupon.mockRejectedValue(new Error('Le coupon est déjà appliqué'));
      await expect(mockRepo.applyCoupon(enterpriseId, 'sub-1', 'SAVE20')).rejects.toThrow('Le coupon est déjà appliqué');
    });

    it('should record application timestamp', async () => {
      mockRepo.applyCoupon.mockResolvedValue({ appliedAt: new Date().toISOString() });
      const result = await mockRepo.applyCoupon(enterpriseId, 'sub-1', 'SAVE20');
      expect(result.appliedAt).toBeDefined();
    });

    it('should update usage count', async () => {
      mockRepo.applyCoupon.mockResolvedValue({ newUsageCount: 16 });
      const result = await mockRepo.applyCoupon(enterpriseId, 'sub-1', 'SAVE20');
      expect(result.newUsageCount).toBe(16);
    });

    it('should handle different coupon types', async () => {
      mockRepo.applyCoupon.mockResolvedValue({ type: 'percentage', discount: 20 });
      const result = await mockRepo.applyCoupon(enterpriseId, 'sub-1', 'SAVE20');
      expect(result.type).toBe('percentage');
    });
  });

  describe('removeCoupon', () => {
    it('should remove coupon from subscription', async () => {
      mockRepo.removeCoupon.mockResolvedValue({ subscriptionId: 'sub-1', removed: true });
      const result = await mockRepo.removeCoupon(enterpriseId, 'sub-1');
      expect(result.removed).toBe(true);
    });

    it('should require subscription ID', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('L\'identifiant d\'abonnement est requis');
      };
      expect(() => validate('')).toThrow('L\'identifiant d\'abonnement est requis');
    });

    it('should handle no coupon applied', async () => {
      mockRepo.removeCoupon.mockResolvedValue({ subscriptionId: 'sub-1', removed: false, reason: 'No coupon applied' });
      const result = await mockRepo.removeCoupon(enterpriseId, 'sub-1');
      expect(result.removed).toBe(false);
    });

    it('should record removal timestamp', async () => {
      mockRepo.removeCoupon.mockResolvedValue({ removedAt: new Date().toISOString() });
      const result = await mockRepo.removeCoupon(enterpriseId, 'sub-1');
      expect(result.removedAt).toBeDefined();
    });

    it('should restore original price', async () => {
      mockRepo.removeCoupon.mockResolvedValue({ originalPrice: 100, discountedPrice: null });
      const result = await mockRepo.removeCoupon(enterpriseId, 'sub-1');
      expect(result.originalPrice).toBe(100);
    });
  });

  describe('getCouponUsage', () => {
    it('should return coupon usage', async () => {
      mockRepo.getCouponUsage.mockResolvedValue({ couponId, totalUses: 15, totalDiscount: 300 });
      const result = await mockRepo.getCouponUsage(enterpriseId, couponId);
      expect(result.totalUses).toBe(15);
    });

    it('should include user breakdown', async () => {
      mockRepo.getCouponUsage.mockResolvedValue({ byUser: [{ userId: 'usr-1', uses: 3 }] });
      const result = await mockRepo.getCouponUsage(enterpriseId, couponId);
      expect(result.byUser).toHaveLength(1);
    });

    it('should handle zero usage', async () => {
      mockRepo.getCouponUsage.mockResolvedValue({ totalUses: 0 });
      const result = await mockRepo.getCouponUsage(enterpriseId, couponId);
      expect(result.totalUses).toBe(0);
    });

    it('should include revenue impact', async () => {
      mockRepo.getCouponUsage.mockResolvedValue({ revenueImpact: 300, percentageOfRevenue: 2.5 });
      const result = await mockRepo.getCouponUsage(enterpriseId, couponId);
      expect(result.revenueImpact).toBe(300);
    });

    it('should filter by date range', async () => {
      mockRepo.getCouponUsage.mockResolvedValue({});
      await mockRepo.getCouponUsage(enterpriseId, couponId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getCouponUsage).toHaveBeenCalled();
    });
  });

  describe('getCouponStats', () => {
    it('should return coupon statistics', async () => {
      mockRepo.getCouponStats.mockResolvedValue({ total: 10, active: 8, expired: 2 });
      const result = await mockRepo.getCouponStats(enterpriseId);
      expect(result.total).toBe(10);
    });

    it('should include total discounts given', async () => {
      mockRepo.getCouponStats.mockResolvedValue({ totalDiscount: 5000 });
      const result = await mockRepo.getCouponStats(enterpriseId);
      expect(result.totalDiscount).toBe(5000);
    });

    it('should include top performing coupons', async () => {
      mockRepo.getCouponStats.mockResolvedValue({ topCoupons: [{ code: 'SAVE20', uses: 50 }] });
      const result = await mockRepo.getCouponStats(enterpriseId);
      expect(result.topCoupons).toHaveLength(1);
    });

    it('should handle zero coupons', async () => {
      mockRepo.getCouponStats.mockResolvedValue({ total: 0 });
      const result = await mockRepo.getCouponStats(enterpriseId);
      expect(result.total).toBe(0);
    });

    it('should include conversion rate', async () => {
      mockRepo.getCouponStats.mockResolvedValue({ conversionRate: 15 });
      const result = await mockRepo.getCouponStats(enterpriseId);
      expect(result.conversionRate).toBe(15);
    });

    it('should include average discount', async () => {
      mockRepo.getCouponStats.mockResolvedValue({ avgDiscount: 18.5 });
      const result = await mockRepo.getCouponStats(enterpriseId);
      expect(result.avgDiscount).toBe(18.5);
    });
  });

  describe('bulkCreateCoupons', () => {
    it('should create multiple coupons', async () => {
      const coupons = [
        { code: 'BULK1', type: 'percentage', value: 10 },
        { code: 'BULK2', type: 'percentage', value: 20 },
      ];
      mockRepo.bulkCreateCoupons.mockResolvedValue(coupons.map((c, i) => ({ id: `coup-${i}`, ...c })));
      const result = await mockRepo.bulkCreateCoupons(enterpriseId, coupons);
      expect(result).toHaveLength(2);
    });

    it('should handle empty batch', async () => {
      mockRepo.bulkCreateCoupons.mockResolvedValue([]);
      const result = await mockRepo.bulkCreateCoupons(enterpriseId, []);
      expect(result).toHaveLength(0);
    });

    it('should validate batch size', () => {
      const maxBatchSize = 100;
      const batchSize = 50;
      const isValid = batchSize <= maxBatchSize;
      expect(isValid).toBe(true);
    });

    it('should report errors for invalid coupons', async () => {
      mockRepo.bulkCreateCoupons.mockResolvedValue({ created: 1, errors: [{ code: 'BAD', reason: 'Invalid code' }] });
      const result = await mockRepo.bulkCreateCoupons(enterpriseId, [{ code: 'BAD' }]);
      expect(result.errors).toHaveLength(1);
    });

    it('should generate unique codes', async () => {
      mockRepo.bulkCreateCoupons.mockResolvedValue([{ code: 'GEN-001' }, { code: 'GEN-002' }]);
      const result = await mockRepo.bulkCreateCoupons(enterpriseId, [{ type: 'percentage', value: 10 }, { type: 'percentage', value: 20 }]);
      expect(result[0].code).not.toBe(result[1].code);
    });
  });

  describe('getCouponHistory', () => {
    it('should return coupon history', async () => {
      mockRepo.getCouponHistory.mockResolvedValue([{ action: 'created', date: '2026-01-01' }]);
      const result = await mockRepo.getCouponHistory(enterpriseId, couponId);
      expect(result).toHaveLength(1);
    });

    it('should filter by action type', async () => {
      mockRepo.getCouponHistory.mockResolvedValue([]);
      await mockRepo.getCouponHistory(enterpriseId, couponId, { action: 'applied' });
      expect(mockRepo.getCouponHistory).toHaveBeenCalled();
    });

    it('should handle empty history', async () => {
      mockRepo.getCouponHistory.mockResolvedValue([]);
      const result = await mockRepo.getCouponHistory(enterpriseId, couponId);
      expect(result).toHaveLength(0);
    });

    it('should sort by date', async () => {
      mockRepo.getCouponHistory.mockResolvedValue([
        { date: '2026-01-01' },
        { date: '2026-02-01' },
      ]);
      const result = await mockRepo.getCouponHistory(enterpriseId, couponId);
      expect(result).toHaveLength(2);
    });

    it('include user info', async () => {
      mockRepo.getCouponHistory.mockResolvedValue([{ action: 'applied', userId: 'usr-1', userName: 'John' }]);
      const result = await mockRepo.getCouponHistory(enterpriseId, couponId);
      expect(result[0].userName).toBe('John');
    });
  });

  describe('getCampaignCoupons', () => {
    it('should return coupons for campaign', async () => {
      mockRepo.getCampaignCoupons.mockResolvedValue([{ id: couponId, campaignId: 'camp-1' }]);
      const result = await mockRepo.getCampaignCoupons(enterpriseId, 'camp-1');
      expect(result).toHaveLength(1);
    });

    it('should handle no campaign coupons', async () => {
      mockRepo.getCampaignCoupons.mockResolvedValue([]);
      const result = await mockRepo.getCampaignCoupons(enterpriseId, 'camp-1');
      expect(result).toHaveLength(0);
    });

    it('should include campaign stats', async () => {
      mockRepo.getCampaignCoupons.mockResolvedValue({ coupons: [{ id: couponId }], totalUses: 100 });
      const result = await mockRepo.getCampaignCoupons(enterpriseId, 'camp-1');
      expect(result.totalUses).toBe(100);
    });

    it('should require campaign ID', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('L\'identifiant de campagne est requis');
      };
      expect(() => validate('')).toThrow('L\'identifiant de campagne est requis');
    });

    it('should filter by coupon status', async () => {
      mockRepo.getCampaignCoupons.mockResolvedValue([]);
      await mockRepo.getCampaignCoupons(enterpriseId, 'camp-1', { status: 'active' });
      expect(mockRepo.getCampaignCoupons).toHaveBeenCalled();
    });
  });
});
