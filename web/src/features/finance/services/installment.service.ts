import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class InstallmentService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findInstallmentPlan(id: string) {
    const plan = await this.repository.findInstallmentPlanById(id);
    if (!plan) {
      logger.warn('Installment plan not found', { planId: id }, 'finance');
    }
    return plan;
  }

  async findAllInstallmentPlans() {
    return this.repository.listInstallmentPlans(this.schoolId);
  }

  async createInstallmentPlan(data: Record<string, unknown>) {
    const plan = await this.repository.createInstallmentPlan({ ...data, school_id: this.schoolId });
    logger.info('Installment plan created', { planId: plan.id }, 'finance');
    return plan;
  }

  async updateInstallmentPlan(id: string, data: Record<string, unknown>) {
    const plan = await this.repository.updateInstallmentPlan(id, data);
    logger.info('Installment plan updated', { planId: id }, 'finance');
    return plan;
  }
}
