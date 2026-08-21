import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class RefundService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findRefund(id: string) {
    const refund = await this.repository.findRefundById(id);
    if (!refund) {
      logger.warn('Refund not found', { refundId: id }, 'finance');
    }
    return refund;
  }

  async findAllRefunds(filters?: Record<string, unknown>) {
    return this.repository.listRefunds(this.schoolId, filters);
  }

  async createRefund(data: Record<string, unknown>) {
    const refund = await this.repository.createRefund({ ...data, school_id: this.schoolId });
    logger.info('Refund created', { refundId: refund.id }, 'finance');
    return refund;
  }

  async approveRefund(id: string, approvedBy: string) {
    const refund = await this.repository.approveRefund(id, approvedBy);
    logger.info('Refund approved', { refundId: id, approvedBy }, 'finance');
    return refund;
  }

  async processRefund(id: string) {
    const refund = await this.repository.processRefund(id);
    logger.info('Refund processed', { refundId: id }, 'finance');
    return refund;
  }

  async rejectRefund(id: string) {
    const refund = await this.repository.updateRefund(id, { status: 'rejected' });
    logger.info('Refund rejected', { refundId: id }, 'finance');
    return refund;
  }
}
