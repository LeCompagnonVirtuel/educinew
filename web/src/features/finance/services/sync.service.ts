import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class SyncService {
  private offlineQueue: Record<string, unknown>[] = [];

  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async syncInvoices(localInvoices: Record<string, unknown>[]) {
    const results = [];
    for (const invoice of localInvoices) {
      try {
        const existing = await this.repository.findInvoiceById(invoice.id as string);
        if (existing) {
          const updated = await this.repository.updateInvoice(invoice.id as string, invoice);
          results.push({ id: invoice.id, status: 'updated', data: updated });
        } else {
          const created = await this.repository.createInvoice({ ...invoice, school_id: this.schoolId });
          results.push({ id: invoice.id, status: 'created', data: created });
        }
      } catch {
        this.offlineQueue.push({ ...invoice, syncType: 'invoice' });
        results.push({ id: invoice.id, status: 'queued' });
      }
    }
    logger.info('Invoices synced', { count: results.length }, 'finance');
    return results;
  }

  async syncPayments(localPayments: Record<string, unknown>[]) {
    const results = [];
    for (const payment of localPayments) {
      try {
        const existing = await this.repository.findPaymentById(payment.id as string);
        if (existing) {
          const updated = await this.repository.updatePayment(payment.id as string, payment);
          results.push({ id: payment.id, status: 'updated', data: updated });
        } else {
          const created = await this.repository.createPayment({ ...payment, school_id: this.schoolId });
          results.push({ id: payment.id, status: 'created', data: created });
        }
      } catch {
        this.offlineQueue.push({ ...payment, syncType: 'payment' });
        results.push({ id: payment.id, status: 'queued' });
      }
    }
    logger.info('Payments synced', { count: results.length }, 'finance');
    return results;
  }

  async syncExpenses(localExpenses: Record<string, unknown>[]) {
    const results = [];
    for (const expense of localExpenses) {
      try {
        const existing = await this.repository.findExpenseById(expense.id as string);
        if (existing) {
          const updated = await this.repository.updateExpense(expense.id as string, expense);
          results.push({ id: expense.id, status: 'updated', data: updated });
        } else {
          const created = await this.repository.createExpense({ ...expense, school_id: this.schoolId });
          results.push({ id: expense.id, status: 'created', data: created });
        }
      } catch {
        this.offlineQueue.push({ ...expense, syncType: 'expense' });
        results.push({ id: expense.id, status: 'queued' });
      }
    }
    logger.info('Expenses synced', { count: results.length }, 'finance');
    return results;
  }

  async resolveConflict(localData: Record<string, unknown>, remoteData: Record<string, unknown>) {
    const localDate = new Date(localData.updated_at as string);
    const remoteDate = new Date(remoteData.updated_at as string);
    const resolved = localDate >= remoteDate ? localData : remoteData;
    logger.info('Conflict resolved', { id: localData.id, winner: localDate >= remoteDate ? 'local' : 'remote' }, 'finance');
    return resolved;
  }

  async getOfflineQueue() {
    return this.offlineQueue;
  }

  async processOfflineQueue() {
    const results = [];
    while (this.offlineQueue.length > 0) {
      const item = this.offlineQueue.shift()!;
      try {
        switch (item.syncType) {
          case 'invoice':
            await this.repository.createInvoice({ ...item, school_id: this.schoolId });
            break;
          case 'payment':
            await this.repository.createPayment({ ...item, school_id: this.schoolId });
            break;
          case 'expense':
            await this.repository.createExpense({ ...item, school_id: this.schoolId });
            break;
        }
        results.push({ id: item.id, status: 'synced' });
      } catch {
        this.offlineQueue.push(item);
        results.push({ id: item.id, status: 'failed' });
      }
    }
    logger.info('Offline queue processed', { count: results.length }, 'finance');
    return results;
  }
}
