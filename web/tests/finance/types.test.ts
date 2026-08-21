import { describe, it, expect } from 'vitest';
import type {
  Invoice,
  InvoiceItem,
  InvoiceTemplate,
  Payment,
  PaymentHistory,
  PaymentAttempt,
  PaymentMethodConfig,
  Receipt,
  ReceiptTemplate,
  Transaction,
  Expense,
  Revenue,
  CashRegister,
  CashRegisterMovement,
  AccountingEntry,
  AccountingJournal,
  AccountingAccount,
  Budget,
  BudgetItem,
  BudgetExecution,
  Discount,
  Scholarship,
  InstallmentPlan,
  Installment,
  Refund,
  LateFee,
  FinancialReport,
  IncomeStatement,
  BalanceSheet,
  CashFlow,
  ProfitLoss,
  FinanceStatistics,
  FinanceAnalytics,
  FinanceTimeline,
  FinanceAudit,
  FinanceNotification,
  FinanceSettings,
  StudentBalance,
  ParentStatement,
  FinancialKPIs,
  FinanceDashboard,
  InvoiceSearch,
  InvoiceFilters,
  PaymentFilters,
  ExpenseFilters,
  RevenueFilters,
  Payroll,
  PayrollItem,
  Tax,
  TaxRule,
  Voucher,
  VoucherItem,
  CurrencyRate,
  PaymentReminder,
  TeacherSalary,
  Debt,
} from '@educi/types';

describe('Finance Types', () => {
  it('should define Invoice interface correctly', () => {
    const invoice: Invoice = {
      id: '1',
      schoolId: 'sch1',
      invoiceNumber: 'INV-001',
      studentId: 's1',
      type: 'TUITION',
      status: 'PENDING',
      amount: 500000,
      discount: 0,
      tax: 0,
      totalAmount: 500000,
      currency: 'XOF',
      dueDate: '2025-10-15',
      isRecurring: false,
      createdBy: 'u1',
      items: [],
      payments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(invoice.id).toBe('1');
    expect(invoice.status).toBe('PENDING');
  });

  it('should define InvoiceItem interface correctly', () => {
    const item: InvoiceItem = {
      id: '1',
      invoiceId: 'inv1',
      description: 'Frais de scolarité',
      quantity: 1,
      unitPrice: 500000,
      amount: 500000,
      taxRate: 18,
      taxAmount: 90000,
      totalAmount: 590000,
      category: 'TUITION',
    };
    expect(item.amount).toBe(500000);
    expect(item.category).toBe('TUITION');
  });

  it('should define InvoiceTemplate interface correctly', () => {
    const template: InvoiceTemplate = {
      id: '1',
      schoolId: 'sch1',
      name: 'Modèle standard',
      type: 'TUITION',
      items: [{ description: 'Frais', amount: 100000, category: 'TUITION' }],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(template.name).toBe('Modèle standard');
    expect(template.isActive).toBe(true);
  });

  it('should define Payment interface correctly', () => {
    const payment: Payment = {
      id: '1',
      schoolId: 'sch1',
      paymentNumber: 'PAY-001',
      invoiceId: 'inv1',
      studentId: 's1',
      amount: 500000,
      currency: 'XOF',
      method: 'CASH',
      status: 'COMPLETED',
      receivedBy: 'u1',
      receivedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(payment.method).toBe('CASH');
    expect(payment.status).toBe('COMPLETED');
  });

  it('should define PaymentHistory interface correctly', () => {
    const history: PaymentHistory = {
      id: '1',
      paymentId: 'pay1',
      action: 'CONFIRM',
      previousStatus: 'PENDING',
      newStatus: 'COMPLETED',
      performedBy: 'u1',
      performedAt: new Date().toISOString(),
    };
    expect(history.action).toBe('CONFIRM');
  });

  it('should define PaymentAttempt interface correctly', () => {
    const attempt: PaymentAttempt = {
      id: '1',
      paymentId: 'pay1',
      status: 'COMPLETED',
      attemptedAt: new Date().toISOString(),
    };
    expect(attempt.status).toBe('COMPLETED');
  });

  it('should define PaymentMethodConfig interface correctly', () => {
    const config: PaymentMethodConfig = {
      id: '1',
      schoolId: 'sch1',
      method: 'CASH',
      isEnabled: true,
      config: {},
      fees: 0,
      feeType: 'FIXED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(config.method).toBe('CASH');
    expect(config.feeType).toBe('FIXED');
  });

  it('should define Receipt interface correctly', () => {
    const receipt: Receipt = {
      id: '1',
      schoolId: 'sch1',
      receiptNumber: 'REC-001',
      paymentId: 'pay1',
      invoiceId: 'inv1',
      studentId: 's1',
      amount: 500000,
      currency: 'XOF',
      status: 'ISSUED',
      issuedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(receipt.status).toBe('ISSUED');
  });

  it('should define ReceiptTemplate interface correctly', () => {
    const template: ReceiptTemplate = {
      id: '1',
      schoolId: 'sch1',
      name: 'Reçu standard',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(template.name).toBe('Reçu standard');
  });

  it('should define Transaction interface correctly', () => {
    const transaction: Transaction = {
      id: '1',
      schoolId: 'sch1',
      type: 'INCOME',
      category: 'TUITION',
      amount: 500000,
      currency: 'XOF',
      description: 'Frais de scolarité',
      date: '2025-10-15',
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(transaction.type).toBe('INCOME');
    expect(transaction.amount).toBe(500000);
  });

  it('should define Expense interface correctly', () => {
    const expense: Expense = {
      id: '1',
      schoolId: 'sch1',
      expenseNumber: 'EXP-001',
      category: 'SALARIES',
      amount: 2000000,
      currency: 'XOF',
      description: 'Salaires du mois',
      status: 'APPROVED',
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(expense.category).toBe('SALARIES');
    expect(expense.status).toBe('APPROVED');
  });

  it('should define Revenue interface correctly', () => {
    const revenue: Revenue = {
      id: '1',
      schoolId: 'sch1',
      revenueNumber: 'REV-001',
      category: 'TUITION',
      amount: 5000000,
      currency: 'XOF',
      description: 'Frais de scolarité trimestre 1',
      date: '2025-10-15',
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(revenue.category).toBe('TUITION');
  });

  it('should define CashRegister interface correctly', () => {
    const register: CashRegister = {
      id: '1',
      schoolId: 'sch1',
      name: 'Caisse principale',
      status: 'OPEN',
      openingBalance: 100000,
      currentBalance: 500000,
      openedBy: 'u1',
      openedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(register.status).toBe('OPEN');
    expect(register.openingBalance).toBe(100000);
  });

  it('should define CashRegisterMovement interface correctly', () => {
    const movement: CashRegisterMovement = {
      id: '1',
      cashRegisterId: 'cr1',
      type: 'IN',
      amount: 500000,
      description: 'Paiement frais scolarité',
      performedBy: 'u1',
      performedAt: new Date().toISOString(),
    };
    expect(movement.type).toBe('IN');
  });

  it('should define AccountingEntry interface correctly', () => {
    const entry: AccountingEntry = {
      id: '1',
      schoolId: 'sch1',
      entryNumber: 'AE-001',
      type: 'JOURNAL',
      date: '2025-10-15',
      description: 'Enregistrement paiement',
      debitAccount: '512',
      creditAccount: '411',
      amount: 500000,
      currency: 'XOF',
      isBalanced: true,
      isPosted: false,
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(entry.type).toBe('JOURNAL');
    expect(entry.isBalanced).toBe(true);
  });

  it('should define AccountingJournal interface correctly', () => {
    const journal: AccountingJournal = {
      id: '1',
      schoolId: 'sch1',
      name: 'Journal général',
      code: 'GEN',
      type: 'JOURNAL',
      isActive: true,
      entryCount: 0,
      totalDebit: 0,
      totalCredit: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(journal.code).toBe('GEN');
  });

  it('should define AccountingAccount interface correctly', () => {
    const account: AccountingAccount = {
      id: '1',
      schoolId: 'sch1',
      code: '512',
      name: 'Banque',
      type: 'ASSET',
      isActive: true,
      balance: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(account.type).toBe('ASSET');
  });

  it('should define Budget interface correctly', () => {
    const budget: Budget = {
      id: '1',
      schoolId: 'sch1',
      name: 'Budget 2025',
      academicYearId: 'ay1',
      status: 'ACTIVE',
      totalAmount: 50000000,
      spentAmount: 25000000,
      remainingAmount: 25000000,
      utilizationRate: 50,
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      items: [],
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(budget.utilizationRate).toBe(50);
  });

  it('should define BudgetItem interface correctly', () => {
    const item: BudgetItem = {
      id: '1',
      budgetId: 'b1',
      category: 'Salaires',
      allocatedAmount: 20000000,
      spentAmount: 18000000,
      remainingAmount: 2000000,
      utilizationRate: 90,
    };
    expect(item.utilizationRate).toBe(90);
  });

  it('should define BudgetExecution interface correctly', () => {
    const execution: BudgetExecution = {
      id: '1',
      budgetId: 'b1',
      budgetItemId: 'bi1',
      amount: 500000,
      description: 'Paiement salaire',
      executedAt: new Date().toISOString(),
      executedBy: 'u1',
    };
    expect(execution.amount).toBe(500000);
  });

  it('should define Discount interface correctly', () => {
    const discount: Discount = {
      id: '1',
      schoolId: 'sch1',
      name: 'Réduction fratrie',
      type: 'SIBLING',
      value: 10,
      valueType: 'PERCENTAGE',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: true,
      applicableTo: ['TUITION'],
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(discount.type).toBe('SIBLING');
    expect(discount.valueType).toBe('PERCENTAGE');
  });

  it('should define Scholarship interface correctly', () => {
    const scholarship: Scholarship = {
      id: '1',
      studentId: 's1',
      name: 'Bourse mérite',
      type: 'MERIT',
      value: 50,
      valueType: 'PERCENTAGE',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: true,
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(scholarship.type).toBe('MERIT');
  });

  it('should define InstallmentPlan interface correctly', () => {
    const plan: InstallmentPlan = {
      id: '1',
      schoolId: 'sch1',
      invoiceId: 'inv1',
      studentId: 's1',
      totalAmount: 1000000,
      numberOfInstallments: 3,
      frequency: 'MONTHLY',
      startDate: '2025-01-01',
      installments: [],
      status: 'ACTIVE',
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(plan.frequency).toBe('MONTHLY');
    expect(plan.status).toBe('ACTIVE');
  });

  it('should define Installment interface correctly', () => {
    const installment: Installment = {
      id: '1',
      planId: 'ip1',
      installmentNumber: 1,
      amount: 333333,
      dueDate: '2025-02-01',
      status: 'PAID',
      paidAt: new Date().toISOString(),
    };
    expect(installment.installmentNumber).toBe(1);
    expect(installment.status).toBe('PAID');
  });

  it('should define Refund interface correctly', () => {
    const refund: Refund = {
      id: '1',
      schoolId: 'sch1',
      refundNumber: 'REF-001',
      paymentId: 'pay1',
      invoiceId: 'inv1',
      studentId: 's1',
      amount: 250000,
      reason: 'Annulation cours',
      status: 'PENDING',
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(refund.status).toBe('PENDING');
  });

  it('should define LateFee interface correctly', () => {
    const fee: LateFee = {
      id: '1',
      schoolId: 'sch1',
      invoiceId: 'inv1',
      studentId: 's1',
      amount: 25000,
      rate: 5,
      daysOverdue: 30,
      appliedAt: new Date().toISOString(),
      appliedBy: 'u1',
      isWaived: false,
    };
    expect(fee.daysOverdue).toBe(30);
    expect(fee.isWaived).toBe(false);
  });

  it('should define FinancialReport interface correctly', () => {
    const report: FinancialReport = {
      id: '1',
      schoolId: 'sch1',
      name: 'Rapport mensuel',
      type: 'INCOME_STATEMENT',
      period: 'Octobre 2025',
      startDate: '2025-10-01',
      endDate: '2025-10-31',
      data: {},
      generatedAt: new Date().toISOString(),
      generatedBy: 'u1',
      createdAt: new Date().toISOString(),
    };
    expect(report.type).toBe('INCOME_STATEMENT');
  });

  it('should define IncomeStatement interface correctly', () => {
    const statement: IncomeStatement = {
      totalRevenue: 10000000,
      totalExpenses: 7000000,
      netIncome: 3000000,
      revenueByCategory: [{ category: 'TUITION', amount: 8000000, percentage: 80 }],
      expensesByCategory: [{ category: 'SALARIES', amount: 5000000, percentage: 71.4 }],
      period: 'Octobre 2025',
    };
    expect(statement.netIncome).toBe(3000000);
  });

  it('should define BalanceSheet interface correctly', () => {
    const sheet: BalanceSheet = {
      totalAssets: 20000000,
      totalLiabilities: 5000000,
      totalEquity: 15000000,
      assets: [{ account: 'Banque', amount: 15000000 }],
      liabilities: [{ account: 'Fournisseurs', amount: 5000000 }],
      equity: [{ account: 'Capital', amount: 15000000 }],
      asOf: '2025-10-31',
    };
    expect(sheet.totalAssets).toBe(20000000);
  });

  it('should define CashFlow interface correctly', () => {
    const cashFlow: CashFlow = {
      operatingCashFlow: 3000000,
      investingCashFlow: -1000000,
      financingCashFlow: -500000,
      netCashFlow: 1500000,
      beginningCash: 5000000,
      endingCash: 6500000,
      period: 'Octobre 2025',
    };
    expect(cashFlow.netCashFlow).toBe(1500000);
  });

  it('should define ProfitLoss interface correctly', () => {
    const pl: ProfitLoss = {
      revenue: 10000000,
      costOfGoodsSold: 2000000,
      grossProfit: 8000000,
      operatingExpenses: 5000000,
      operatingIncome: 3000000,
      otherIncome: 200000,
      otherExpenses: 100000,
      netIncome: 3100000,
      period: 'Octobre 2025',
    };
    expect(pl.grossProfit).toBe(8000000);
  });

  it('should define FinanceStatistics interface correctly', () => {
    const stats: FinanceStatistics = {
      totalRevenue: 10000000,
      totalExpenses: 7000000,
      netIncome: 3000000,
      collectionRate: 85,
      outstandingAmount: 1500000,
      paidAmount: 8500000,
      averagePaymentTime: 15,
      revenueByMonth: [],
      expensesByMonth: [],
      paymentsByMethod: [],
      topRevenueCategories: [],
      topExpenseCategories: [],
    };
    expect(stats.collectionRate).toBe(85);
  });

  it('should define FinanceAnalytics interface correctly', () => {
    const analytics: FinanceAnalytics = {
      revenueGrowth: 12,
      expenseGrowth: 8,
      profitMargin: 30,
      collectionEfficiency: 85,
      averageInvoiceAmount: 500000,
      averagePaymentDelay: 10,
      overdueRate: 15,
      refundRate: 2,
      trends: [],
      predictions: [],
    };
    expect(analytics.profitMargin).toBe(30);
  });

  it('should define FinanceTimeline interface correctly', () => {
    const timeline: FinanceTimeline = {
      events: [],
    };
    expect(timeline.events).toHaveLength(0);
  });

  it('should define FinanceAudit interface correctly', () => {
    const audit: FinanceAudit = {
      id: '1',
      schoolId: 'sch1',
      userId: 'u1',
      action: 'CREATE',
      entityType: 'INVOICE',
      entityId: 'inv1',
      createdAt: new Date().toISOString(),
    };
    expect(audit.action).toBe('CREATE');
  });

  it('should define FinanceNotification interface correctly', () => {
    const notification: FinanceNotification = {
      id: '1',
      schoolId: 'sch1',
      userId: 'u1',
      type: 'PAYMENT_RECEIVED',
      title: 'Paiement reçu',
      body: 'Un paiement a été reçu',
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    expect(notification.type).toBe('PAYMENT_RECEIVED');
  });

  it('should define FinanceSettings interface correctly', () => {
    const settings: FinanceSettings = {
      id: '1',
      schoolId: 'sch1',
      currency: 'XOF',
      taxRate: 18,
      lateFeeRate: 5,
      lateFeeMaxAmount: 50000,
      invoicePrefix: 'INV',
      receiptPrefix: 'REC',
      paymentPrefix: 'PAY',
      autoGenerateReceipt: true,
      enableInstallments: true,
      maxInstallments: 12,
      reminderDaysBefore: 7,
      overdueReminderDays: 3,
      fiscalYearStart: '01/01',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(settings.currency).toBe('XOF');
    expect(settings.taxRate).toBe(18);
  });

  it('should define StudentBalance interface correctly', () => {
    const balance: StudentBalance = {
      studentId: 's1',
      totalPaid: 500000,
      totalDue: 250000,
      balance: -250000,
      currency: 'XOF',
    };
    expect(balance.balance).toBe(-250000);
  });

  it('should define ParentStatement interface correctly', () => {
    const statement: ParentStatement = {
      parentId: 'p1',
      students: [{ studentId: 's1', studentName: 'Diallo', totalPaid: 500000, totalDue: 250000, balance: -250000 }],
      totalPaid: 500000,
      totalDue: 250000,
      balance: -250000,
      period: 'Octobre 2025',
    };
    expect(statement.students).toHaveLength(1);
  });

  it('should define FinancialKPIs interface correctly', () => {
    const kpis: FinancialKPIs = {
      totalRevenue: 10000000,
      totalExpenses: 7000000,
      netIncome: 3000000,
      profitMargin: 30,
      collectionRate: 85,
      outstandingAmount: 1500000,
      overdueAmount: 500000,
      averagePaymentTime: 15,
      revenuePerStudent: 100000,
      expensePerStudent: 70000,
    };
    expect(kpis.profitMargin).toBe(30);
  });

  it('should define FinanceDashboard interface correctly', () => {
    const dashboard: FinanceDashboard = {
      totalRevenue: 10000000,
      totalExpenses: 7000000,
      netIncome: 3000000,
      outstandingAmount: 1500000,
      overdueAmount: 500000,
      collectionRate: 85,
      recentPayments: [],
      recentExpenses: [],
      topRevenueCategories: [],
      topExpenseCategories: [],
      monthlyTrend: [],
    };
    expect(dashboard.collectionRate).toBe(85);
  });

  it('should define InvoiceSearch interface correctly', () => {
    const search: InvoiceSearch = {
      query: 'test',
      status: 'PENDING',
      limit: 10,
    };
    expect(search.query).toBe('test');
  });

  it('should define InvoiceFilters interface correctly', () => {
    const filters: InvoiceFilters = {
      status: 'PENDING',
      page: 1,
      limit: 20,
    };
    expect(filters.page).toBe(1);
  });

  it('should define PaymentFilters interface correctly', () => {
    const filters: PaymentFilters = {
      status: 'COMPLETED',
      method: 'CASH',
      page: 1,
      limit: 20,
    };
    expect(filters.method).toBe('CASH');
  });

  it('should define ExpenseFilters interface correctly', () => {
    const filters: ExpenseFilters = {
      category: 'SALARIES',
      status: 'APPROVED',
      page: 1,
      limit: 20,
    };
    expect(filters.category).toBe('SALARIES');
  });

  it('should define RevenueFilters interface correctly', () => {
    const filters: RevenueFilters = {
      category: 'TUITION',
      page: 1,
      limit: 20,
    };
    expect(filters.category).toBe('TUITION');
  });

  it('should define Payroll interface correctly', () => {
    const payroll: Payroll = {
      id: '1',
      schoolId: 'sch1',
      name: 'Octobre 2025',
      month: '10',
      year: 2025,
      totalAmount: 5000000,
      totalTeachers: 10,
      status: 'COMPLETED',
      items: [],
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(payroll.status).toBe('COMPLETED');
  });

  it('should define PayrollItem interface correctly', () => {
    const item: PayrollItem = {
      id: '1',
      payrollId: 'pay1',
      teacherId: 't1',
      baseSalary: 500000,
      allowances: 50000,
      deductions: 75000,
      netSalary: 475000,
      status: 'PAID',
    };
    expect(item.netSalary).toBe(475000);
  });

  it('should define Tax interface correctly', () => {
    const tax: Tax = {
      id: '1',
      schoolId: 'sch1',
      name: 'TVA',
      type: 'VAT',
      rate: 18,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(tax.rate).toBe(18);
    expect(tax.type).toBe('VAT');
  });

  it('should define TaxRule interface correctly', () => {
    const rule: TaxRule = {
      id: '1',
      schoolId: 'sch1',
      taxId: 't1',
      category: 'TUITION',
      minAmount: 100000,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(rule.category).toBe('TUITION');
  });

  it('should define Voucher interface correctly', () => {
    const voucher: Voucher = {
      id: '1',
      schoolId: 'sch1',
      voucherNumber: 'VC-001',
      type: 'DISCOUNT',
      amount: 50000,
      currency: 'XOF',
      description: 'Bon de réduction',
      isUsed: false,
      expiresAt: '2025-12-31',
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(voucher.type).toBe('DISCOUNT');
    expect(voucher.isUsed).toBe(false);
  });

  it('should define VoucherItem interface correctly', () => {
    const item: VoucherItem = {
      id: '1',
      voucherId: 'v1',
      description: 'Frais de scolarité',
      amount: 50000,
    };
    expect(item.amount).toBe(50000);
  });

  it('should define CurrencyRate interface correctly', () => {
    const rate: CurrencyRate = {
      from: 'XOF',
      to: 'EUR',
      rate: 0.00152,
      updatedAt: new Date().toISOString(),
    };
    expect(rate.from).toBe('XOF');
  });

  it('should define PaymentReminder interface correctly', () => {
    const reminder: PaymentReminder = {
      id: '1',
      invoiceId: 'inv1',
      studentId: 's1',
      type: 'BEFORE_DUE',
      sentAt: new Date().toISOString(),
      channel: 'EMAIL',
    };
    expect(reminder.type).toBe('BEFORE_DUE');
  });

  it('should define TeacherSalary interface correctly', () => {
    const salary: TeacherSalary = {
      id: '1',
      schoolId: 'sch1',
      teacherId: 't1',
      month: '10',
      year: 2025,
      baseSalary: 500000,
      allowances: 50000,
      deductions: 75000,
      netSalary: 475000,
      status: 'PAID',
      createdAt: new Date().toISOString(),
    };
    expect(salary.netSalary).toBe(475000);
    expect(salary.status).toBe('PAID');
  });

  it('should define Debt interface correctly', () => {
    const debt: Debt = {
      studentId: 's1',
      totalDebt: 500000,
      currency: 'XOF',
      invoices: [{ invoiceId: 'inv1', amount: 500000, dueDate: '2025-10-15', daysOverdue: 30 }],
    };
    expect(debt.totalDebt).toBe(500000);
    expect(debt.invoices).toHaveLength(1);
  });
});
