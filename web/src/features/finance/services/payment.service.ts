import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class PaymentService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findPayment(id: string) {
    const payment = await this.repository.findPaymentById(id);
    if (!payment) {
      logger.warn('Payment not found', { paymentId: id }, 'finance');
    }
    return payment;
  }

  async findAllPayments(filters?: Record<string, unknown>) {
    return this.repository.listPayments(this.schoolId, filters);
  }

  async createPayment(data: Record<string, unknown>) {
    const payment = await this.repository.createPayment({ ...data, school_id: this.schoolId });
    logger.info('Payment created', { paymentId: payment.id }, 'finance');
    return payment;
  }

  async updatePayment(id: string, data: Record<string, unknown>) {
    const payment = await this.repository.updatePayment(id, data);
    logger.info('Payment updated', { paymentId: id }, 'finance');
    return payment;
  }

  async deletePayment(id: string) {
    await this.repository.deletePayment(id);
    logger.info('Payment deleted', { paymentId: id }, 'finance');
  }

  async confirmPayment(id: string) {
    const payment = await this.repository.updatePayment(id, { status: 'completed', confirmed_at: new Date().toISOString() });
    logger.info('Payment confirmed', { paymentId: id }, 'finance');
    return payment;
  }

  async cancelPayment(id: string) {
    const payment = await this.repository.updatePayment(id, { status: 'cancelled' });
    logger.info('Payment cancelled', { paymentId: id }, 'finance');
    return payment;
  }

  async processBulkPayments(payments: Record<string, unknown>[]) {
    const results = [];
    for (const paymentData of payments) {
      const payment = await this.repository.createPayment({ ...paymentData, school_id: this.schoolId });
      results.push(payment);
    }
    logger.info('Bulk payments processed', { count: results.length }, 'finance');
    return results;
  }

  async verifyPayment(id: string) {
    const payment = await this.repository.updatePayment(id, { status: 'verified', verified_at: new Date().toISOString() });
    logger.info('Payment verified', { paymentId: id }, 'finance');
    return payment;
  }

  async findPaymentHistory(paymentId: string) {
    return this.repository.listPaymentHistory(paymentId);
  }

  async findPaymentAttempts(paymentId: string) {
    return this.repository.listPaymentAttempts(paymentId);
  }
}
