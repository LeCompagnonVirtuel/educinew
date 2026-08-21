import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class DiscountService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findDiscount(id: string) {
    const discount = await this.repository.findDiscountById(id);
    if (!discount) {
      logger.warn('Discount not found', { discountId: id }, 'finance');
    }
    return discount;
  }

  async findAllDiscounts() {
    return this.repository.listDiscounts(this.schoolId);
  }

  async createDiscount(data: Record<string, unknown>) {
    const discount = await this.repository.createDiscount({ ...data, school_id: this.schoolId });
    logger.info('Discount created', { discountId: discount.id }, 'finance');
    return discount;
  }

  async updateDiscount(id: string, data: Record<string, unknown>) {
    const discount = await this.repository.updateDiscount(id, data);
    logger.info('Discount updated', { discountId: id }, 'finance');
    return discount;
  }

  async deleteDiscount(id: string) {
    await this.repository.deleteDiscount(id);
    logger.info('Discount deleted', { discountId: id }, 'finance');
  }
}
