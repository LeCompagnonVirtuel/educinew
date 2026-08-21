import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class LateFeeService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findLateFees(invoiceId: string) {
    return this.repository.findLateFeesByInvoice(invoiceId);
  }

  async applyLateFee(data: Record<string, unknown>) {
    const lateFee = await this.repository.createLateFee({ ...data, school_id: this.schoolId });
    logger.info('Late fee applied', { lateFeeId: lateFee.id }, 'finance');
    return lateFee;
  }

  async waiveLateFee(id: string, waivedBy: string, reason: string) {
    const lateFee = await this.repository.waiveLateFee(id, waivedBy, reason);
    logger.info('Late fee waived', { lateFeeId: id, waivedBy }, 'finance');
    return lateFee;
  }
}
