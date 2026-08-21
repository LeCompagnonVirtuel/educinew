import type { Invoice, InvoiceItem, InvoiceTemplate, Payment, PaymentHistory, PaymentAttempt, PaymentMethodConfig, Receipt, ReceiptTemplate, Transaction, Expense, Revenue, CashRegister, CashRegisterMovement, AccountingEntry, AccountingJournal, AccountingAccount, Budget, BudgetItem, BudgetExecution, Discount, Scholarship, InstallmentPlan, Installment, Refund, LateFee, FinancialReport, IncomeStatement, BalanceSheet, CashFlow, ProfitLoss, FinanceStatistics, FinanceAnalytics, FinanceTimeline, FinanceAudit, FinanceNotification, FinanceSettings, StudentBalance, ParentStatement, FinancialKPIs, FinanceDashboard, FinanceRepository } from '@educi/types';

export interface FinanceRepositoryExtended extends FinanceRepository {
  findStudent(studentId: string): Promise<any | null>;
  findParent(parentId: string): Promise<any | null>;
  findTeacher(teacherId: string): Promise<any | null>;
  findClass(classId: string): Promise<any | null>;
  findAcademicYear(yearId: string): Promise<any | null>;
  getSchoolSettings(schoolId: string): Promise<any>;
  logAuditEntry(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>): Promise<void>;
}

export type { Invoice, InvoiceItem, InvoiceTemplate, Payment, PaymentHistory, PaymentAttempt, PaymentMethodConfig, Receipt, ReceiptTemplate, Transaction, Expense, Revenue, CashRegister, CashRegisterMovement, AccountingEntry, AccountingJournal, AccountingAccount, Budget, BudgetItem, BudgetExecution, Discount, Scholarship, InstallmentPlan, Installment, Refund, LateFee, FinancialReport, IncomeStatement, BalanceSheet, CashFlow, ProfitLoss, FinanceStatistics, FinanceAnalytics, FinanceTimeline, FinanceAudit, FinanceNotification, FinanceSettings, StudentBalance, ParentStatement, FinancialKPIs, FinanceDashboard };
