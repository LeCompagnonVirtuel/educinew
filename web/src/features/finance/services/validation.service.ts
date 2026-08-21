import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class ValidationService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async validateInvoice(data: Record<string, unknown>) {
    const errors: string[] = [];
    if (!data.student_id) errors.push('student_id is required');
    if (!data.items || !Array.isArray(data.items) || (data.items as any[]).length === 0) errors.push('At least one item is required');
    if (data.total_amount !== undefined && (data.total_amount as number) <= 0) errors.push('total_amount must be positive');
    const valid = errors.length === 0;
    if (!valid) {
      logger.warn('Invoice validation failed', { errors }, 'finance');
    }
    return { valid, errors };
  }

  async validatePayment(data: Record<string, unknown>) {
    const errors: string[] = [];
    if (!data.invoice_id) errors.push('invoice_id is required');
    if (!data.amount || (data.amount as number) <= 0) errors.push('amount must be positive');
    if (!data.method) errors.push('method is required');
    const valid = errors.length === 0;
    if (!valid) {
      logger.warn('Payment validation failed', { errors }, 'finance');
    }
    return { valid, errors };
  }

  async validateExpense(data: Record<string, unknown>) {
    const errors: string[] = [];
    if (!data.description) errors.push('description is required');
    if (!data.amount || (data.amount as number) <= 0) errors.push('amount must be positive');
    if (!data.category) errors.push('category is required');
    const valid = errors.length === 0;
    if (!valid) {
      logger.warn('Expense validation failed', { errors }, 'finance');
    }
    return { valid, errors };
  }

  async validateBudget(data: Record<string, unknown>) {
    const errors: string[] = [];
    if (!data.name) errors.push('name is required');
    if (!data.start_date) errors.push('start_date is required');
    if (!data.end_date) errors.push('end_date is required');
    if (data.total_amount !== undefined && (data.total_amount as number) <= 0) errors.push('total_amount must be positive');
    const valid = errors.length === 0;
    if (!valid) {
      logger.warn('Budget validation failed', { errors }, 'finance');
    }
    return { valid, errors };
  }
}
