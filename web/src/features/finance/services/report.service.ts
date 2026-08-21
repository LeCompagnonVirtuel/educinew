import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class ReportService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async generateIncomeStatement(startDate: string, endDate: string) {
    const report = await this.repository.generateIncomeStatement(this.schoolId, startDate, endDate);
    logger.info('Income statement generated', { startDate, endDate }, 'finance');
    return report;
  }

  async generateBalanceSheet() {
    const report = await this.repository.generateBalanceSheet(this.schoolId);
    logger.info('Balance sheet generated', { schoolId: this.schoolId }, 'finance');
    return report;
  }

  async generateCashFlow(startDate: string, endDate: string) {
    const report = await this.repository.generateCashFlow(this.schoolId, startDate, endDate);
    logger.info('Cash flow report generated', { startDate, endDate }, 'finance');
    return report;
  }

  async generateProfitLoss(startDate: string, endDate: string) {
    const revenue = await this.repository.getTotalRevenue(this.schoolId, startDate, endDate);
    const expenses = await this.repository.getTotalExpenses(this.schoolId, startDate, endDate);
    const report = { revenue, expenses, profitLoss: revenue - expenses, period: { startDate, endDate } };
    logger.info('Profit and loss report generated', { startDate, endDate }, 'finance');
    return report;
  }

  async generateFinancialReport(startDate: string, endDate: string) {
    const incomeStatement = await this.repository.generateIncomeStatement(this.schoolId, startDate, endDate);
    const balanceSheet = await this.repository.generateBalanceSheet(this.schoolId);
    const cashFlow = await this.repository.generateCashFlow(this.schoolId, startDate, endDate);
    const report = { incomeStatement, balanceSheet, cashFlow, period: { startDate, endDate } };
    logger.info('Financial report generated', { startDate, endDate }, 'finance');
    return report;
  }
}
