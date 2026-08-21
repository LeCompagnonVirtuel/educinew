import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class BudgetService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findBudget(id: string) {
    const budget = await this.repository.findBudgetById(id);
    if (!budget) {
      logger.warn('Budget not found', { budgetId: id }, 'finance');
    }
    return budget;
  }

  async findAllBudgets() {
    return this.repository.listBudgets(this.schoolId);
  }

  async createBudget(data: Record<string, unknown>) {
    const budget = await this.repository.createBudget({ ...data, school_id: this.schoolId });
    logger.info('Budget created', { budgetId: budget.id }, 'finance');
    return budget;
  }

  async updateBudget(id: string, data: Record<string, unknown>) {
    const budget = await this.repository.updateBudget(id, data);
    logger.info('Budget updated', { budgetId: id }, 'finance');
    return budget;
  }

  async deleteBudget(id: string) {
    await this.repository.deleteBudget(id);
    logger.info('Budget deleted', { budgetId: id }, 'finance');
  }

  async executeBudgetItem(id: string, executedAmount: number) {
    const item = await this.repository.executeBudgetItem(id, executedAmount);
    logger.info('Budget item executed', { itemId: id, executedAmount }, 'finance');
    return item;
  }

  async findBudgetItems(budgetId: string) {
    return this.repository.listBudgetItems(budgetId);
  }
}
