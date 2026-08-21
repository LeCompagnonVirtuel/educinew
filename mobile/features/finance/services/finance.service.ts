import { logger } from '@educi/logger';
import { MobileFinanceRepository } from '../repositories/finance.repository';

export class MobileFinanceService {
  private readonly repository: MobileFinanceRepository;
  private readonly schoolId: string;
  constructor(deps: { repository: MobileFinanceRepository; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }

  async findInvoice(id: string) { return this.repository.findInvoice(id); }
  async findAllInvoices(filters?: Record<string, unknown>) { return this.repository.findAllInvoices(this.schoolId, filters); }
  async createInvoice(data: Record<string, unknown>) { return this.repository.createInvoice(data, this.schoolId); }
  async updateInvoice(id: string, data: Record<string, unknown>) { return this.repository.updateInvoice(id, data); }
  async deleteInvoice(id: string) { return this.repository.deleteInvoice(id); }
  async findPayment(id: string) { return this.repository.findPayment(id); }
  async findAllPayments(filters?: Record<string, unknown>) { return this.repository.findAllPayments(this.schoolId, filters); }
  async createPayment(data: Record<string, unknown>) { return this.repository.createPayment(data, this.schoolId); }
  async confirmPayment(id: string, confirmedBy: string) { return this.repository.confirmPayment(id, confirmedBy); }
  async findReceipt(id: string) { return this.repository.findReceipt(id); }
  async findAllReceipts(filters?: Record<string, unknown>) { return this.repository.findAllReceipts(this.schoolId, filters); }
  async createReceipt(data: Record<string, unknown>) { return this.repository.createReceipt(data, this.schoolId); }
  async generateReceipt(paymentId: string) { return this.repository.generateReceipt(paymentId); }
  async findExpense(id: string) { return this.repository.findExpense(id); }
  async findAllExpenses(filters?: Record<string, unknown>) { return this.repository.findAllExpenses(this.schoolId, filters); }
  async createExpense(data: Record<string, unknown>) { return this.repository.createExpense(data, this.schoolId); }
  async approveExpense(id: string, approvedBy: string) { return this.repository.approveExpense(id, approvedBy); }
  async findRevenue(id: string) { return this.repository.findRevenue(id); }
  async findAllRevenues(filters?: Record<string, unknown>) { return this.repository.findAllRevenues(this.schoolId, filters); }
  async createRevenue(data: Record<string, unknown>) { return this.repository.createRevenue(data, this.schoolId); }
  async findCashRegister(id: string) { return this.repository.findCashRegister(id); }
  async openCashRegister(id: string, openedBy: string) { return this.repository.openCashRegister(id, openedBy); }
  async closeCashRegister(id: string, closingBalance: number, closedBy: string) { return this.repository.closeCashRegister(id, closingBalance, closedBy); }
  async findCashRegisterMovements(cashRegisterId: string) { return this.repository.findCashRegisterMovements(cashRegisterId); }
  async findAccountingEntry(id: string) { return this.repository.findAccountingEntry(id); }
  async findAllAccountingEntries(filters?: Record<string, unknown>) { return this.repository.findAllAccountingEntries(this.schoolId, filters); }
  async createAccountingEntry(data: Record<string, unknown>) { return this.repository.createAccountingEntry(data, this.schoolId); }
  async findBudget(id: string) { return this.repository.findBudget(id); }
  async findAllBudgets() { return this.repository.findAllBudgets(this.schoolId); }
  async createBudget(data: Record<string, unknown>) { return this.repository.createBudget(data, this.schoolId); }
  async getDashboard() { return this.repository.getDashboard(this.schoolId); }
  async getFinanceStatistics() { return this.repository.getFinanceStatistics(this.schoolId); }
  async getFinanceAnalytics() { return this.repository.getFinanceAnalytics(this.schoolId); }
  async searchInvoices(query: string) { return this.repository.searchInvoices(this.schoolId, query); }
  async logAudit(userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>) { return this.repository.logAudit(this.schoolId, userId, action, entityType, entityId, previousValue, newValue); }
  async getAuditLog(filters?: Record<string, unknown>) { return this.repository.getAuditLog(this.schoolId, filters); }
}
