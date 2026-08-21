import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createCouponService(repo: EnterpriseRepositoryExtended) {
  return {
    async findCoupons(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findCoupons(enterpriseId, filters);
    },

    async findCouponById(enterpriseId: string, couponId: string) {
      if (!enterpriseId || !couponId) throw new AppError('Identifiants requis');
      const coupon = await repo.findCouponById(enterpriseId, couponId);
      if (!coupon) throw new AppError('Coupon non trouvé');
      return coupon;
    },

    async createCoupon(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.code) throw new AppError('Le code du coupon est requis');
      if (!data?.discount) throw new AppError('La remise est requise');
      return repo.createCoupon({ ...data, enterprise_id: enterpriseId });
    },

    async updateCoupon(enterpriseId: string, couponId: string, data: any) {
      if (!enterpriseId || !couponId) throw new AppError('Identifiants requis');
      const existing = await repo.findCouponById(enterpriseId, couponId);
      if (!existing) throw new AppError('Coupon non trouvé');
      return repo.updateCoupon(enterpriseId, couponId, data);
    },

    async deleteCoupon(enterpriseId: string, couponId: string) {
      if (!enterpriseId || !couponId) throw new AppError('Identifiants requis');
      const existing = await repo.findCouponById(enterpriseId, couponId);
      if (!existing) throw new AppError('Coupon non trouvé');
      return repo.deleteCoupon(enterpriseId, couponId);
    },

    async validateCoupon(enterpriseId: string, code: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!code) throw new AppError('Le code du coupon est requis');
      return repo.validateCoupon(enterpriseId, code);
    },
  };
}
