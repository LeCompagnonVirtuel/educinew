import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class PermissionService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async canViewInvoices(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_invoice_view !== false;
  }

  async canCreateInvoices(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_invoice_creation !== false;
  }

  async canEditInvoices(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_invoice_edit !== false;
  }

  async canDeleteInvoices(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_invoice_deletion === true;
  }

  async canViewPayments(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_payment_view !== false;
  }

  async canCreatePayments(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_payment_creation !== false;
  }

  async canConfirmPayments(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_payment_confirmation === true;
  }

  async canProcessRefunds(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_refund_processing === true;
  }

  async canViewExpenses(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_expense_view !== false;
  }

  async canCreateExpenses(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_expense_creation !== false;
  }

  async canApproveExpenses(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_expense_approval === true;
  }

  async canViewBudgets(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_budget_view !== false;
  }

  async canCreateBudgets(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_budget_creation === true;
  }

  async canViewAccounting(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_accounting_view !== false;
  }

  async canPostEntries(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_entry_posting === true;
  }

  async canViewReports(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_report_view !== false;
  }

  async canExportReports(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_report_export !== false;
  }

  async canManageSettings(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_settings_management === true;
  }

  async canViewDashboard(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_dashboard_view !== false;
  }

  async canViewAudit(userId: string) {
    const settings = await this.repository.getFinanceSettings(this.schoolId);
    return settings?.allow_audit_view === true;
  }
}
