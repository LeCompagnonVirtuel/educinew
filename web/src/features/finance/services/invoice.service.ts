import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class InvoiceService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findInvoice(id: string) {
    const invoice = await this.repository.findInvoiceById(id);
    if (!invoice) {
      logger.warn('Invoice not found', { invoiceId: id }, 'finance');
    }
    return invoice;
  }

  async findAllInvoices(filters?: Record<string, unknown>) {
    return this.repository.listInvoices(this.schoolId, filters);
  }

  async createInvoice(data: Record<string, unknown>) {
    const invoice = await this.repository.createInvoice({ ...data, school_id: this.schoolId });
    logger.info('Invoice created', { invoiceId: invoice.id }, 'finance');
    return invoice;
  }

  async updateInvoice(id: string, data: Record<string, unknown>) {
    const invoice = await this.repository.updateInvoice(id, data);
    logger.info('Invoice updated', { invoiceId: id }, 'finance');
    return invoice;
  }

  async deleteInvoice(id: string) {
    await this.repository.deleteInvoice(id);
    logger.info('Invoice deleted', { invoiceId: id }, 'finance');
  }

  async cancelInvoice(id: string) {
    const invoice = await this.repository.updateInvoice(id, { status: 'cancelled' });
    logger.info('Invoice cancelled', { invoiceId: id }, 'finance');
    return invoice;
  }

  async sendInvoice(id: string) {
    const invoice = await this.repository.updateInvoice(id, { status: 'sent', sent_at: new Date().toISOString() });
    logger.info('Invoice sent', { invoiceId: id }, 'finance');
    return invoice;
  }

  async voidInvoice(id: string) {
    const invoice = await this.repository.updateInvoice(id, { status: 'voided' });
    logger.info('Invoice voided', { invoiceId: id }, 'finance');
    return invoice;
  }

  async findInvoiceItems(invoiceId: string) {
    return this.repository.listInvoiceItems(invoiceId);
  }

  async createInvoiceItem(data: Record<string, unknown>) {
    const item = await this.repository.createInvoiceItem(data);
    logger.info('Invoice item created', { itemId: item.id }, 'finance');
    return item;
  }

  async updateInvoiceItem(id: string, data: Record<string, unknown>) {
    const item = await this.repository.updateInvoiceItem(id, data);
    logger.info('Invoice item updated', { itemId: id }, 'finance');
    return item;
  }

  async deleteInvoiceItem(id: string) {
    await this.repository.deleteInvoiceItem(id);
    logger.info('Invoice item deleted', { itemId: id }, 'finance');
  }

  async findInvoiceTemplates() {
    return this.repository.listInvoiceTemplates(this.schoolId);
  }

  async createInvoiceTemplate(data: Record<string, unknown>) {
    const template = await this.repository.createInvoiceTemplate({ ...data, school_id: this.schoolId });
    logger.info('Invoice template created', { templateId: template.id }, 'finance');
    return template;
  }

  async updateInvoiceTemplate(id: string, data: Record<string, unknown>) {
    const template = await this.repository.updateInvoiceTemplate(id, data);
    logger.info('Invoice template updated', { templateId: id }, 'finance');
    return template;
  }

  async deleteInvoiceTemplate(id: string) {
    await this.repository.deleteInvoiceTemplate(id);
    logger.info('Invoice template deleted', { templateId: id }, 'finance');
  }
}
