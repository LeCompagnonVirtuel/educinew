import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class SettingsService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findSettings() {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    if (!settings) {
      logger.warn('Finance settings not found', { schoolId: this.schoolId }, 'finance');
    }
    return settings;
  }

  async updateSettings(data: Record<string, unknown>) {
    const settings = await this.repository.updateFinanceSettings(this.schoolId, data);
    logger.info('Finance settings updated', { schoolId: this.schoolId }, 'finance');
    return settings;
  }
}
