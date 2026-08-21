import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class TaxService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findTax(id: string) {
    const tax = await this.repository.findTaxById(id);
    if (!tax) {
      logger.warn('Tax not found', { taxId: id }, 'finance');
    }
    return tax;
  }

  async findAllTaxes() {
    return this.repository.listTaxes(this.schoolId);
  }

  async createTax(data: Record<string, unknown>) {
    const tax = await this.repository.createTax({ ...data, school_id: this.schoolId });
    logger.info('Tax created', { taxId: tax.id }, 'finance');
    return tax;
  }

  async updateTax(id: string, data: Record<string, unknown>) {
    const tax = await this.repository.updateTax(id, data);
    logger.info('Tax updated', { taxId: id }, 'finance');
    return tax;
  }

  async deleteTax(id: string) {
    await this.repository.deleteTax(id);
    logger.info('Tax deleted', { taxId: id }, 'finance');
  }

  async findTaxRules(taxId: string) {
    return this.repository.listTaxRules(taxId);
  }

  async createTaxRule(data: Record<string, unknown>) {
    const rule = await this.repository.createTaxRule(data);
    logger.info('Tax rule created', { ruleId: rule.id }, 'finance');
    return rule;
  }
}
