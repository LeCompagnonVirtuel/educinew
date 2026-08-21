import { describe, it, expect } from 'vitest';
import {
  InvoiceNotFoundError,
  InvoiceAlreadyPaidError,
  InvoiceCancelledError,
  InvoiceOverdueError,
  InvoiceVoidError,
  InvoiceDraftError,
  InvoiceNumberDuplicateError,
  InvoiceTemplateNotFoundError,
  PaymentFailedError,
  PaymentAlreadyProcessedError,
  PaymentNotFoundError,
  PaymentInsufficientError,
  PaymentMethodNotSupportedError,
  PaymentNumberDuplicateError,
  ReceiptGenerationError,
  ReceiptNotFoundError,
  ReceiptNumberDuplicateError,
  ReceiptTemplateNotFoundError,
  ExpenseNotFoundError,
  ExpenseAlreadyApprovedError,
  ExpenseNotApprovedError,
  ExpenseNumberDuplicateError,
  RevenueNotFoundError,
  CashRegisterNotFoundError,
  CashRegisterAlreadyOpenError,
  CashRegisterClosedError,
  CashRegisterMismatchError,
  AccountingEntryNotFoundError,
  AccountingEntryLockedError,
  AccountingEntryUnbalancedError,
  JournalNotFoundError,
  AccountNotFoundError,
  AccountAlreadyExistsError,
  BudgetNotFoundError,
  BudgetExceededError,
  BudgetAlreadyActiveError,
  DiscountNotFoundError,
  DiscountExpiredError,
  DiscountNotApplicableError,
  ScholarshipNotFoundError,
  ScholarshipExpiredError,
  ScholarshipAlreadyAssignedError,
  InstallmentPlanNotFoundError,
  InstallmentPlanAlreadyCompletedError,
  InstallmentNotFoundError,
  InstallmentAlreadyPaidError,
  RefundNotFoundError,
  RefundAlreadyProcessedError,
  RefundExceedsAmountError,
  LateFeeNotFoundError,
  LateFeeAlreadyAppliedError,
  TransactionNotFoundError,
  TransactionAlreadyProcessedError,
  PayrollNotFoundError,
  PayrollAlreadyProcessedError,
  TeacherSalaryNotFoundError,
  VoucherNotFoundError,
  VoucherAlreadyUsedError,
  VoucherExpiredError,
  CurrencyMismatchError,
  CurrencyConversionError,
  FinanceDashboardError,
  FinanceStatisticsError,
  FinanceAnalyticsError,
  FinanceReportError,
  FinanceExportError,
  FinanceImportError,
  FinanceSettingsError,
  FinanceValidationError,
  FinancePermissionError,
  FinanceSyncError,
  FinanceAuditError,
} from '@educi/errors';

describe('Finance Errors', () => {
  it('InvoiceNotFoundError should have correct message', () => {
    const error = new InvoiceNotFoundError();
    expect(error).toBeInstanceOf(InvoiceNotFoundError);
    expect(error.message).toContain('Facture');
    expect(error.statusCode).toBe(404);
  });

  it('InvoiceNotFoundError should accept identifier', () => {
    const error = new InvoiceNotFoundError('INV001');
    expect(error.message).toContain('INV001');
  });

  it('InvoiceAlreadyPaidError should have correct code', () => {
    const error = new InvoiceAlreadyPaidError();
    expect(error).toBeInstanceOf(InvoiceAlreadyPaidError);
    expect(error.statusCode).toBe(409);
  });

  it('InvoiceCancelledError should have correct code', () => {
    const error = new InvoiceCancelledError();
    expect(error).toBeInstanceOf(InvoiceCancelledError);
    expect(error.statusCode).toBe(409);
  });

  it('InvoiceOverdueError should have correct code', () => {
    const error = new InvoiceOverdueError();
    expect(error).toBeInstanceOf(InvoiceOverdueError);
    expect(error.statusCode).toBe(409);
  });

  it('InvoiceVoidError should have correct code', () => {
    const error = new InvoiceVoidError();
    expect(error).toBeInstanceOf(InvoiceVoidError);
    expect(error.statusCode).toBe(409);
  });

  it('InvoiceDraftError should have correct code', () => {
    const error = new InvoiceDraftError();
    expect(error).toBeInstanceOf(InvoiceDraftError);
    expect(error.statusCode).toBe(409);
  });

  it('InvoiceNumberDuplicateError should have correct message', () => {
    const error = new InvoiceNumberDuplicateError('INV-001');
    expect(error).toBeInstanceOf(InvoiceNumberDuplicateError);
    expect(error.message).toContain('INV-001');
    expect(error.statusCode).toBe(409);
  });

  it('InvoiceTemplateNotFoundError should have correct message', () => {
    const error = new InvoiceTemplateNotFoundError();
    expect(error).toBeInstanceOf(InvoiceTemplateNotFoundError);
    expect(error.statusCode).toBe(404);
  });

  it('PaymentFailedError should have correct code', () => {
    const error = new PaymentFailedError();
    expect(error).toBeInstanceOf(PaymentFailedError);
    expect(error.statusCode).toBe(400);
  });

  it('PaymentAlreadyProcessedError should have correct code', () => {
    const error = new PaymentAlreadyProcessedError();
    expect(error).toBeInstanceOf(PaymentAlreadyProcessedError);
    expect(error.statusCode).toBe(409);
  });

  it('PaymentNotFoundError should have correct message', () => {
    const error = new PaymentNotFoundError();
    expect(error).toBeInstanceOf(PaymentNotFoundError);
    expect(error.message).toContain('Paiement');
    expect(error.statusCode).toBe(404);
  });

  it('PaymentNotFoundError should accept identifier', () => {
    const error = new PaymentNotFoundError('PAY001');
    expect(error.message).toContain('PAY001');
  });

  it('PaymentInsufficientError should have correct code', () => {
    const error = new PaymentInsufficientError();
    expect(error).toBeInstanceOf(PaymentInsufficientError);
    expect(error.statusCode).toBe(400);
  });

  it('PaymentMethodNotSupportedError should have correct message', () => {
    const error = new PaymentMethodNotSupportedError('CRYPTO');
    expect(error).toBeInstanceOf(PaymentMethodNotSupportedError);
    expect(error.message).toContain('CRYPTO');
    expect(error.statusCode).toBe(400);
  });

  it('PaymentNumberDuplicateError should have correct message', () => {
    const error = new PaymentNumberDuplicateError('PAY-001');
    expect(error).toBeInstanceOf(PaymentNumberDuplicateError);
    expect(error.message).toContain('PAY-001');
    expect(error.statusCode).toBe(409);
  });

  it('ReceiptGenerationError should have correct code', () => {
    const error = new ReceiptGenerationError();
    expect(error).toBeInstanceOf(ReceiptGenerationError);
    expect(error.statusCode).toBe(500);
  });

  it('ReceiptNotFoundError should have correct message', () => {
    const error = new ReceiptNotFoundError();
    expect(error).toBeInstanceOf(ReceiptNotFoundError);
    expect(error.message).toContain('Reçu');
    expect(error.statusCode).toBe(404);
  });

  it('ReceiptNumberDuplicateError should have correct message', () => {
    const error = new ReceiptNumberDuplicateError('REC-001');
    expect(error).toBeInstanceOf(ReceiptNumberDuplicateError);
    expect(error.message).toContain('REC-001');
    expect(error.statusCode).toBe(409);
  });

  it('ReceiptTemplateNotFoundError should have correct message', () => {
    const error = new ReceiptTemplateNotFoundError();
    expect(error).toBeInstanceOf(ReceiptTemplateNotFoundError);
    expect(error.statusCode).toBe(404);
  });

  it('ExpenseNotFoundError should have correct message', () => {
    const error = new ExpenseNotFoundError();
    expect(error).toBeInstanceOf(ExpenseNotFoundError);
    expect(error.message).toContain('Dépense');
    expect(error.statusCode).toBe(404);
  });

  it('ExpenseAlreadyApprovedError should have correct code', () => {
    const error = new ExpenseAlreadyApprovedError();
    expect(error).toBeInstanceOf(ExpenseAlreadyApprovedError);
    expect(error.statusCode).toBe(409);
  });

  it('ExpenseNotApprovedError should have correct code', () => {
    const error = new ExpenseNotApprovedError();
    expect(error).toBeInstanceOf(ExpenseNotApprovedError);
    expect(error.statusCode).toBe(409);
  });

  it('ExpenseNumberDuplicateError should have correct message', () => {
    const error = new ExpenseNumberDuplicateError('EXP-001');
    expect(error).toBeInstanceOf(ExpenseNumberDuplicateError);
    expect(error.message).toContain('EXP-001');
    expect(error.statusCode).toBe(409);
  });

  it('RevenueNotFoundError should have correct message', () => {
    const error = new RevenueNotFoundError();
    expect(error).toBeInstanceOf(RevenueNotFoundError);
    expect(error.message).toContain('Revenu');
    expect(error.statusCode).toBe(404);
  });

  it('CashRegisterNotFoundError should have correct message', () => {
    const error = new CashRegisterNotFoundError();
    expect(error).toBeInstanceOf(CashRegisterNotFoundError);
    expect(error.message).toContain('Caisse');
    expect(error.statusCode).toBe(404);
  });

  it('CashRegisterAlreadyOpenError should have correct code', () => {
    const error = new CashRegisterAlreadyOpenError();
    expect(error).toBeInstanceOf(CashRegisterAlreadyOpenError);
    expect(error.statusCode).toBe(409);
  });

  it('CashRegisterClosedError should have correct code', () => {
    const error = new CashRegisterClosedError();
    expect(error).toBeInstanceOf(CashRegisterClosedError);
    expect(error.statusCode).toBe(409);
  });

  it('CashRegisterMismatchError should have correct code', () => {
    const error = new CashRegisterMismatchError();
    expect(error).toBeInstanceOf(CashRegisterMismatchError);
    expect(error.statusCode).toBe(400);
  });

  it('AccountingEntryNotFoundError should have correct message', () => {
    const error = new AccountingEntryNotFoundError();
    expect(error).toBeInstanceOf(AccountingEntryNotFoundError);
    expect(error.message).toContain('Écriture comptable');
    expect(error.statusCode).toBe(404);
  });

  it('AccountingEntryLockedError should have correct code', () => {
    const error = new AccountingEntryLockedError();
    expect(error).toBeInstanceOf(AccountingEntryLockedError);
    expect(error.statusCode).toBe(409);
  });

  it('AccountingEntryUnbalancedError should have correct code', () => {
    const error = new AccountingEntryUnbalancedError();
    expect(error).toBeInstanceOf(AccountingEntryUnbalancedError);
    expect(error.statusCode).toBe(400);
  });

  it('JournalNotFoundError should have correct message', () => {
    const error = new JournalNotFoundError();
    expect(error).toBeInstanceOf(JournalNotFoundError);
    expect(error.message).toContain('Journal');
    expect(error.statusCode).toBe(404);
  });

  it('AccountNotFoundError should have correct message', () => {
    const error = new AccountNotFoundError();
    expect(error).toBeInstanceOf(AccountNotFoundError);
    expect(error.message).toContain('Compte');
    expect(error.statusCode).toBe(404);
  });

  it('AccountAlreadyExistsError should have correct message', () => {
    const error = new AccountAlreadyExistsError('512');
    expect(error).toBeInstanceOf(AccountAlreadyExistsError);
    expect(error.message).toContain('512');
    expect(error.statusCode).toBe(409);
  });

  it('BudgetNotFoundError should have correct message', () => {
    const error = new BudgetNotFoundError();
    expect(error).toBeInstanceOf(BudgetNotFoundError);
    expect(error.message).toContain('Budget');
    expect(error.statusCode).toBe(404);
  });

  it('BudgetExceededError should have correct code', () => {
    const error = new BudgetExceededError();
    expect(error).toBeInstanceOf(BudgetExceededError);
    expect(error.statusCode).toBe(400);
  });

  it('BudgetAlreadyActiveError should have correct code', () => {
    const error = new BudgetAlreadyActiveError();
    expect(error).toBeInstanceOf(BudgetAlreadyActiveError);
    expect(error.statusCode).toBe(409);
  });

  it('DiscountNotFoundError should have correct message', () => {
    const error = new DiscountNotFoundError();
    expect(error).toBeInstanceOf(DiscountNotFoundError);
    expect(error.message).toContain('Réduction');
    expect(error.statusCode).toBe(404);
  });

  it('DiscountExpiredError should have correct code', () => {
    const error = new DiscountExpiredError();
    expect(error).toBeInstanceOf(DiscountExpiredError);
    expect(error.statusCode).toBe(409);
  });

  it('DiscountNotApplicableError should have correct code', () => {
    const error = new DiscountNotApplicableError();
    expect(error).toBeInstanceOf(DiscountNotApplicableError);
    expect(error.statusCode).toBe(400);
  });

  it('ScholarshipNotFoundError should have correct message', () => {
    const error = new ScholarshipNotFoundError();
    expect(error).toBeInstanceOf(ScholarshipNotFoundError);
    expect(error.message).toContain('Bourse');
    expect(error.statusCode).toBe(404);
  });

  it('ScholarshipExpiredError should have correct code', () => {
    const error = new ScholarshipExpiredError();
    expect(error).toBeInstanceOf(ScholarshipExpiredError);
    expect(error.statusCode).toBe(409);
  });

  it('ScholarshipAlreadyAssignedError should have correct code', () => {
    const error = new ScholarshipAlreadyAssignedError();
    expect(error).toBeInstanceOf(ScholarshipAlreadyAssignedError);
    expect(error.statusCode).toBe(409);
  });

  it('InstallmentPlanNotFoundError should have correct message', () => {
    const error = new InstallmentPlanNotFoundError();
    expect(error).toBeInstanceOf(InstallmentPlanNotFoundError);
    expect(error.message).toContain('Plan de paiement');
    expect(error.statusCode).toBe(404);
  });

  it('InstallmentPlanAlreadyCompletedError should have correct code', () => {
    const error = new InstallmentPlanAlreadyCompletedError();
    expect(error).toBeInstanceOf(InstallmentPlanAlreadyCompletedError);
    expect(error.statusCode).toBe(409);
  });

  it('InstallmentNotFoundError should have correct message', () => {
    const error = new InstallmentNotFoundError();
    expect(error).toBeInstanceOf(InstallmentNotFoundError);
    expect(error.message).toContain('Échéance');
    expect(error.statusCode).toBe(404);
  });

  it('InstallmentAlreadyPaidError should have correct code', () => {
    const error = new InstallmentAlreadyPaidError();
    expect(error).toBeInstanceOf(InstallmentAlreadyPaidError);
    expect(error.statusCode).toBe(409);
  });

  it('RefundNotFoundError should have correct message', () => {
    const error = new RefundNotFoundError();
    expect(error).toBeInstanceOf(RefundNotFoundError);
    expect(error.message).toContain('Remboursement');
    expect(error.statusCode).toBe(404);
  });

  it('RefundAlreadyProcessedError should have correct code', () => {
    const error = new RefundAlreadyProcessedError();
    expect(error).toBeInstanceOf(RefundAlreadyProcessedError);
    expect(error.statusCode).toBe(409);
  });

  it('RefundExceedsAmountError should have correct message', () => {
    const error = new RefundExceedsAmountError(100000, 50000);
    expect(error).toBeInstanceOf(RefundExceedsAmountError);
    expect(error.message).toContain('100000');
    expect(error.message).toContain('50000');
    expect(error.statusCode).toBe(400);
  });

  it('LateFeeNotFoundError should have correct message', () => {
    const error = new LateFeeNotFoundError();
    expect(error).toBeInstanceOf(LateFeeNotFoundError);
    expect(error.message).toContain('Frais de retard');
    expect(error.statusCode).toBe(404);
  });

  it('LateFeeAlreadyAppliedError should have correct code', () => {
    const error = new LateFeeAlreadyAppliedError();
    expect(error).toBeInstanceOf(LateFeeAlreadyAppliedError);
    expect(error.statusCode).toBe(409);
  });

  it('TransactionNotFoundError should have correct message', () => {
    const error = new TransactionNotFoundError();
    expect(error).toBeInstanceOf(TransactionNotFoundError);
    expect(error.message).toContain('Transaction');
    expect(error.statusCode).toBe(404);
  });

  it('TransactionAlreadyProcessedError should have correct code', () => {
    const error = new TransactionAlreadyProcessedError();
    expect(error).toBeInstanceOf(TransactionAlreadyProcessedError);
    expect(error.statusCode).toBe(409);
  });

  it('PayrollNotFoundError should have correct message', () => {
    const error = new PayrollNotFoundError();
    expect(error).toBeInstanceOf(PayrollNotFoundError);
    expect(error.message).toContain('Paie');
    expect(error.statusCode).toBe(404);
  });

  it('PayrollAlreadyProcessedError should have correct code', () => {
    const error = new PayrollAlreadyProcessedError();
    expect(error).toBeInstanceOf(PayrollAlreadyProcessedError);
    expect(error.statusCode).toBe(409);
  });

  it('TeacherSalaryNotFoundError should have correct message', () => {
    const error = new TeacherSalaryNotFoundError();
    expect(error).toBeInstanceOf(TeacherSalaryNotFoundError);
    expect(error.message).toContain('Salaire enseignant');
    expect(error.statusCode).toBe(404);
  });

  it('VoucherNotFoundError should have correct message', () => {
    const error = new VoucherNotFoundError();
    expect(error).toBeInstanceOf(VoucherNotFoundError);
    expect(error.message).toContain('Bon');
    expect(error.statusCode).toBe(404);
  });

  it('VoucherAlreadyUsedError should have correct code', () => {
    const error = new VoucherAlreadyUsedError();
    expect(error).toBeInstanceOf(VoucherAlreadyUsedError);
    expect(error.statusCode).toBe(409);
  });

  it('VoucherExpiredError should have correct code', () => {
    const error = new VoucherExpiredError();
    expect(error).toBeInstanceOf(VoucherExpiredError);
    expect(error.statusCode).toBe(409);
  });

  it('CurrencyMismatchError should have correct message', () => {
    const error = new CurrencyMismatchError('XOF', 'EUR');
    expect(error).toBeInstanceOf(CurrencyMismatchError);
    expect(error.message).toContain('EUR');
    expect(error.message).toContain('XOF');
    expect(error.statusCode).toBe(400);
  });

  it('CurrencyConversionError should have correct message', () => {
    const error = new CurrencyConversionError('XOF', 'USD');
    expect(error).toBeInstanceOf(CurrencyConversionError);
    expect(error.message).toContain('XOF');
    expect(error.message).toContain('USD');
    expect(error.statusCode).toBe(400);
  });

  it('FinanceDashboardError should have correct code', () => {
    const error = new FinanceDashboardError();
    expect(error).toBeInstanceOf(FinanceDashboardError);
    expect(error.statusCode).toBe(500);
  });

  it('FinanceStatisticsError should have correct code', () => {
    const error = new FinanceStatisticsError();
    expect(error).toBeInstanceOf(FinanceStatisticsError);
    expect(error.statusCode).toBe(500);
  });

  it('FinanceAnalyticsError should have correct code', () => {
    const error = new FinanceAnalyticsError();
    expect(error).toBeInstanceOf(FinanceAnalyticsError);
    expect(error.statusCode).toBe(500);
  });

  it('FinanceReportError should have correct code', () => {
    const error = new FinanceReportError();
    expect(error).toBeInstanceOf(FinanceReportError);
    expect(error.statusCode).toBe(500);
  });

  it('FinanceExportError should have correct code', () => {
    const error = new FinanceExportError();
    expect(error).toBeInstanceOf(FinanceExportError);
    expect(error.statusCode).toBe(500);
  });

  it('FinanceImportError should have correct code', () => {
    const error = new FinanceImportError();
    expect(error).toBeInstanceOf(FinanceImportError);
    expect(error.statusCode).toBe(500);
  });

  it('FinanceSettingsError should have correct code', () => {
    const error = new FinanceSettingsError();
    expect(error).toBeInstanceOf(FinanceSettingsError);
    expect(error.statusCode).toBe(500);
  });

  it('FinanceValidationError should have correct code', () => {
    const error = new FinanceValidationError();
    expect(error).toBeInstanceOf(FinanceValidationError);
    expect(error.statusCode).toBe(400);
  });

  it('FinancePermissionError should have correct code', () => {
    const error = new FinancePermissionError();
    expect(error).toBeInstanceOf(FinancePermissionError);
    expect(error.statusCode).toBe(403);
  });

  it('FinanceSyncError should have correct code', () => {
    const error = new FinanceSyncError();
    expect(error).toBeInstanceOf(FinanceSyncError);
    expect(error.statusCode).toBe(500);
  });

  it('FinanceAuditError should have correct code', () => {
    const error = new FinanceAuditError();
    expect(error).toBeInstanceOf(FinanceAuditError);
    expect(error.statusCode).toBe(500);
  });
});
