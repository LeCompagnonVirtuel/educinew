import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class RevenueService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findRevenue(id: string) {
    const revenue = await this.repository.findRevenueById(id);
    if (!revenue) {
      logger.warn('Revenue not found', { revenueId: id }, 'finance');
    }
    return revenue;
  }

  async findAllRevenues(filters?: Record<string, unknown>) {
    return this.repository.listRevenue(this.schoolId, filters);
  }

  async createRevenue(data: Record<string, unknown>) {
    const revenue = await this.repository.createRevenue({ ...data, school_id: this.schoolId });
    logger.info('Revenue created', { revenueId: revenue.id }, 'finance');
    return revenue;
  }
}
