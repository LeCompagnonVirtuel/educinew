import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class TimelineService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async getTimeline(startDate: string, endDate: string) {
    const timeline = await this.repository.getFinanceTimeline(this.schoolId, startDate, endDate);
    logger.info('Finance timeline retrieved', { schoolId: this.schoolId, startDate, endDate }, 'finance');
    return timeline;
  }

  async getInvoiceTimeline(startDate: string, endDate: string) {
    const invoices = await this.repository.listInvoices(this.schoolId, { startDate, endDate });
    logger.info('Invoice timeline retrieved', { count: invoices.length }, 'finance');
    return invoices;
  }

  async getPaymentTimeline(startDate: string, endDate: string) {
    const payments = await this.repository.getPaymentsByDateRange(this.schoolId, startDate, endDate);
    logger.info('Payment timeline retrieved', { count: payments.length }, 'finance');
    return payments;
  }
}
