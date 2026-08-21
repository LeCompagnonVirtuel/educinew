import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class PayrollService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findPayroll(id: string) {
    const payroll = await this.repository.findPayrollById(id);
    if (!payroll) {
      logger.warn('Payroll not found', { payrollId: id }, 'finance');
    }
    return payroll;
  }

  async findAllPayrolls(filters?: Record<string, unknown>) {
    return this.repository.listPayrolls(this.schoolId, filters);
  }

  async createPayroll(data: Record<string, unknown>) {
    const payroll = await this.repository.createPayroll({ ...data, school_id: this.schoolId });
    logger.info('Payroll created', { payrollId: payroll.id }, 'finance');
    return payroll;
  }

  async updatePayroll(id: string, data: Record<string, unknown>) {
    const payroll = await this.repository.updatePayroll(id, data);
    logger.info('Payroll updated', { payrollId: id }, 'finance');
    return payroll;
  }

  async processPayroll(id: string) {
    const payroll = await this.repository.updatePayroll(id, { status: 'processed', processed_at: new Date().toISOString() });
    logger.info('Payroll processed', { payrollId: id }, 'finance');
    return payroll;
  }

  async findTeacherSalary(teacherId: string) {
    return this.repository.findTeacherSalary(teacherId);
  }

  async processTeacherSalary(teacherId: string, data: Record<string, unknown>) {
    const salary = await this.repository.processTeacherSalary(teacherId, { ...data, school_id: this.schoolId });
    logger.info('Teacher salary processed', { teacherId }, 'finance');
    return salary;
  }
}
