import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class AccountingService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findAccountingEntry(id: string) {
    const entry = await this.repository.findAccountingEntryById(id);
    if (!entry) {
      logger.warn('Accounting entry not found', { entryId: id }, 'finance');
    }
    return entry;
  }

  async findAllAccountingEntries(filters?: Record<string, unknown>) {
    return this.repository.listAccountingEntries(this.schoolId, filters);
  }

  async createAccountingEntry(data: Record<string, unknown>) {
    const entry = await this.repository.createAccountingEntry({ ...data, school_id: this.schoolId });
    logger.info('Accounting entry created', { entryId: entry.id }, 'finance');
    return entry;
  }

  async postAccountingEntry(id: string, postedBy: string) {
    const entry = await this.repository.postAccountingEntry(id, postedBy);
    logger.info('Accounting entry posted', { entryId: id, postedBy }, 'finance');
    return entry;
  }

  async lockAccountingEntry(id: string) {
    const entry = await this.repository.updateAccountingEntry(id, { status: 'locked', locked_at: new Date().toISOString() });
    logger.info('Accounting entry locked', { entryId: id }, 'finance');
    return entry;
  }

  async findJournals() {
    return this.repository.listJournals(this.schoolId);
  }

  async createJournal(data: Record<string, unknown>) {
    const journal = await this.repository.createJournal({ ...data, school_id: this.schoolId });
    logger.info('Journal created', { journalId: journal.id }, 'finance');
    return journal;
  }

  async updateJournal(id: string, data: Record<string, unknown>) {
    const journal = await this.repository.updateJournal(id, data);
    logger.info('Journal updated', { journalId: id }, 'finance');
    return journal;
  }

  async findAccounts(type?: string) {
    return this.repository.listAccounts(this.schoolId, type);
  }

  async createAccount(data: Record<string, unknown>) {
    const account = await this.repository.createAccount({ ...data, school_id: this.schoolId });
    logger.info('Account created', { accountId: account.id }, 'finance');
    return account;
  }

  async updateAccount(id: string, data: Record<string, unknown>) {
    const account = await this.repository.updateAccount(id, data);
    logger.info('Account updated', { accountId: id }, 'finance');
    return account;
  }
}
