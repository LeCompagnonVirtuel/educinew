import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class ReceiptService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findReceipt(id: string) {
    const receipt = await this.repository.findReceiptById(id);
    if (!receipt) {
      logger.warn('Receipt not found', { receiptId: id }, 'finance');
    }
    return receipt;
  }

  async findAllReceipts(filters?: Record<string, unknown>) {
    return this.repository.listReceipts(this.schoolId, filters);
  }

  async createReceipt(data: Record<string, unknown>) {
    const receipt = await this.repository.createReceipt({ ...data, school_id: this.schoolId });
    logger.info('Receipt created', { receiptId: receipt.id }, 'finance');
    return receipt;
  }

  async updateReceipt(id: string, data: Record<string, unknown>) {
    const receipt = await this.repository.updateReceipt(id, data);
    logger.info('Receipt updated', { receiptId: id }, 'finance');
    return receipt;
  }

  async deleteReceipt(id: string) {
    await this.repository.deleteReceipt(id);
    logger.info('Receipt deleted', { receiptId: id }, 'finance');
  }

  async generateReceipt(paymentId: string) {
    const payment = await this.repository.findPaymentById(paymentId);
    if (!payment) {
      logger.warn('Cannot generate receipt: payment not found', { paymentId }, 'finance');
      return null;
    }
    const receipt = await this.repository.createReceipt({
      payment_id: paymentId,
      student_id: payment.student_id,
      amount: payment.amount,
      issued_date: new Date().toISOString(),
      school_id: this.schoolId,
    });
    logger.info('Receipt generated', { receiptId: receipt.id, paymentId }, 'finance');
    return receipt;
  }

  async sendReceipt(id: string) {
    const receipt = await this.repository.updateReceipt(id, { status: 'sent', sent_at: new Date().toISOString() });
    logger.info('Receipt sent', { receiptId: id }, 'finance');
    return receipt;
  }

  async findReceiptTemplates() {
    return this.repository.listReceiptTemplates(this.schoolId);
  }
}
