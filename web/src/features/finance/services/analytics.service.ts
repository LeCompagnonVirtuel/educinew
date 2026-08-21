import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class AnalyticsService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async getFinanceAnalytics(startDate: string, endDate: string) {
    const analytics = await this.repository.getFinanceAnalytics(this.schoolId, startDate, endDate);
    logger.info('Finance analytics retrieved', { schoolId: this.schoolId, startDate, endDate }, 'finance');
    return analytics;
  }

  async getTrends(startDate: string, endDate: string) {
    const analytics = await this.repository.getFinanceAnalytics(this.schoolId, startDate, endDate);
    const timeline = await this.repository.getFinanceTimeline(this.schoolId, startDate, endDate);
    logger.info('Finance trends retrieved', { schoolId: this.schoolId }, 'finance');
    return { analytics, timeline };
  }

  async getPredictions(startDate: string, endDate: string) {
    const analytics = await this.repository.getFinanceAnalytics(this.schoolId, startDate, endDate);
    const statistics = await this.repository.getFinanceStatistics(this.schoolId);
    logger.info('Finance predictions retrieved', { schoolId: this.schoolId }, 'finance');
    return { current: analytics, statistics };
  }
}
