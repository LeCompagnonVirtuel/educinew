import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class ExpenseService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findExpense(id: string) {
    const expense = await this.repository.findExpenseById(id);
    if (!expense) {
      logger.warn('Expense not found', { expenseId: id }, 'finance');
    }
    return expense;
  }

  async findAllExpenses(filters?: Record<string, unknown>) {
    return this.repository.listExpenses(this.schoolId, filters);
  }

  async createExpense(data: Record<string, unknown>) {
    const expense = await this.repository.createExpense({ ...data, school_id: this.schoolId });
    logger.info('Expense created', { expenseId: expense.id }, 'finance');
    return expense;
  }

  async updateExpense(id: string, data: Record<string, unknown>) {
    const expense = await this.repository.updateExpense(id, data);
    logger.info('Expense updated', { expenseId: id }, 'finance');
    return expense;
  }

  async deleteExpense(id: string) {
    await this.repository.deleteExpense(id);
    logger.info('Expense deleted', { expenseId: id }, 'finance');
  }

  async approveExpense(id: string, approvedBy: string) {
    const expense = await this.repository.approveExpense(id, approvedBy);
    logger.info('Expense approved', { expenseId: id, approvedBy }, 'finance');
    return expense;
  }

  async cancelExpense(id: string) {
    const expense = await this.repository.updateExpense(id, { status: 'cancelled' });
    logger.info('Expense cancelled', { expenseId: id }, 'finance');
    return expense;
  }
}
