import { describe, it, expect } from 'vitest';
import {
  createInvoiceSchema,
  updateInvoiceSchema,
  createInvoiceItemSchema,
  createInvoiceTemplateSchema,
  paymentSchema,
  bulkPaymentSchema,
  partialPaymentSchema,
  onlinePaymentSchema,
  confirmPaymentSchema,
  cancelPaymentSchema,
  refundSchema,
  approveRefundSchema,
  expenseSchema,
  updateExpenseSchema,
  approveExpenseSchema,
  revenueSchema,
  cashRegisterSchema,
  openCashRegisterSchema,
  closeCashRegisterSchema,
  cashRegisterMovementSchema,
  accountingEntrySchema,
  postAccountingEntrySchema,
  journalSchema,
  accountSchema,
  budgetSchema,
  budgetItemSchema,
  executeBudgetItemSchema,
  discountSchema,
  scholarshipSchema,
  installmentPlanSchema,
  installmentPaymentSchema,
  lateFeeSchema,
  waiveLateFeeSchema,
  taxSchema,
  taxRuleSchema,
  payrollSchema,
  payrollItemSchema,
  voucherSchema,
  reportSchema,
  financeSettingsSchema,
  invoiceFiltersSchema,
  paymentFiltersSchema,
  expenseFiltersSchema,
  revenueFiltersSchema,
  invoiceSearchSchema,
  transactionSchema,
  receiptSchema,
  generateReceiptSchema,
  exportSchema,
  importSchema,
} from '@/features/finance/validators';

describe('Finance Validators', () => {
  describe('createInvoiceSchema', () => {
    it('should validate correct invoice data', () => {
      const result = createInvoiceSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        studentId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        title: 'Frais de scolarité',
        dueDate: '2025-10-15T00:00:00Z',
        items: [{ description: 'Frais', quantity: 1, unitPrice: 500000 }],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty title', () => {
      const result = createInvoiceSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        studentId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        title: '',
        dueDate: '2025-10-15T00:00:00Z',
        items: [{ description: 'Frais', quantity: 1, unitPrice: 500000 }],
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty items', () => {
      const result = createInvoiceSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        studentId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        title: 'Test',
        dueDate: '2025-10-15T00:00:00Z',
        items: [],
      });
      expect(result.success).toBe(false);
    });

    it('should accept optional fields', () => {
      const result = createInvoiceSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        studentId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        title: 'Test',
        description: 'Description',
        dueDate: '2025-10-15T00:00:00Z',
        items: [{ description: 'Frais', quantity: 1, unitPrice: 500000, taxRate: 18, discountAmount: 10000, category: 'TUITION' }],
        notes: 'Notes',
        metadata: { key: 'value' },
      });
      expect(result.success).toBe(true);
    });
  });

  describe('updateInvoiceSchema', () => {
    it('should validate partial update', () => {
      const result = updateInvoiceSchema.safeParse({ title: 'Updated' });
      expect(result.success).toBe(true);
    });

    it('should accept all optional fields', () => {
      const result = updateInvoiceSchema.safeParse({
        title: 'Updated',
        description: 'New description',
        dueDate: '2025-11-15T00:00:00Z',
        status: 'paid',
        notes: 'Updated notes',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('paymentSchema', () => {
    it('should validate correct payment data', () => {
      const result = paymentSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        studentId: '123e4567-e89b-12d3-a456-426614174002',
        amount: 500000,
        method: 'cash',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all payment methods', () => {
      for (const method of ['cash', 'bank_transfer', 'credit_card', 'debit_card', 'mobile_money', 'check', 'online', 'installment']) {
        const result = paymentSchema.safeParse({
          schoolId: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          studentId: '123e4567-e89b-12d3-a456-426614174002',
          amount: 100000,
          method,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should reject negative amount', () => {
      const result = paymentSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        studentId: '123e4567-e89b-12d3-a456-426614174002',
        amount: -100,
        method: 'cash',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('bulkPaymentSchema', () => {
    it('should validate correct bulk payment', () => {
      const result = bulkPaymentSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        studentId: '123e4567-e89b-12d3-a456-426614174001',
        payments: [{ invoiceId: '123e4567-e89b-12d3-a456-426614174002', amount: 500000, method: 'cash' }],
        totalAmount: 500000,
        paymentMethod: 'cash',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty payments', () => {
      const result = bulkPaymentSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        studentId: '123e4567-e89b-12d3-a456-426614174001',
        payments: [],
        totalAmount: 0,
        paymentMethod: 'cash',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('expenseSchema', () => {
    it('should validate correct expense data', () => {
      const result = expenseSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Achat fournitures',
        amount: 100000,
        category: 'supplies',
        expenseDate: '2025-10-15T00:00:00Z',
        submittedBy: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all categories', () => {
      for (const category of ['salary', 'supplies', 'maintenance', 'utilities', 'transport', 'insurance', 'marketing', 'technology', 'other']) {
        const result = expenseSchema.safeParse({
          schoolId: '123e4567-e89b-12d3-a456-426614174000',
          title: 'Test',
          amount: 100000,
          category,
          expenseDate: '2025-10-15T00:00:00Z',
          submittedBy: '123e4567-e89b-12d3-a456-426614174001',
        });
        expect(result.success).toBe(true);
      }
    });

    it('should reject empty title', () => {
      const result = expenseSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        title: '',
        amount: 100000,
        category: 'supplies',
        expenseDate: '2025-10-15T00:00:00Z',
        submittedBy: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('revenueSchema', () => {
    it('should validate correct revenue data', () => {
      const result = revenueSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        source: 'Frais inscription',
        amount: 500000,
        category: 'registration',
        receiptDate: '2025-10-15T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('cashRegisterSchema', () => {
    it('should validate correct cash register', () => {
      const result = cashRegisterSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Caisse principale',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('openCashRegisterSchema', () => {
    it('should validate correct open request', () => {
      const result = openCashRegisterSchema.safeParse({
        cashRegisterId: '123e4567-e89b-12d3-a456-426614174000',
        openingBalance: 100000,
        openedBy: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('closeCashRegisterSchema', () => {
    it('should validate correct close request', () => {
      const result = closeCashRegisterSchema.safeParse({
        cashRegisterId: '123e4567-e89b-12d3-a456-426614174000',
        sessionId: '123e4567-e89b-12d3-a456-426614174001',
        closingBalance: 500000,
        closedBy: '123e4567-e89b-12d3-a456-426614174002',
        countedCash: 500000,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('accountingEntrySchema', () => {
    it('should validate correct accounting entry', () => {
      const result = accountingEntrySchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        date: '2025-10-15T00:00:00Z',
        description: 'Enregistrement paiement',
        lines: [
          { accountId: '123e4567-e89b-12d3-a456-426614174001', debit: 500000 },
          { accountId: '123e4567-e89b-12d3-a456-426614174002', credit: 500000 },
        ],
      });
      expect(result.success).toBe(true);
    });

    it('should reject less than 2 lines', () => {
      const result = accountingEntrySchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        date: '2025-10-15T00:00:00Z',
        description: 'Test',
        lines: [{ accountId: '123e4567-e89b-12d3-a456-426614174001', debit: 500000 }],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('journalSchema', () => {
    it('should validate correct journal', () => {
      const result = journalSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Journal général',
        code: 'GEN',
        type: 'general',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('accountSchema', () => {
    it('should validate correct account', () => {
      const result = accountSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        code: '512',
        name: 'Banque',
        type: 'asset',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('budgetSchema', () => {
    it('should validate correct budget', () => {
      const result = budgetSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        academicYearId: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Budget 2025',
        totalAmount: 50000000,
        startDate: '2025-01-01T00:00:00Z',
        endDate: '2025-12-31T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('budgetItemSchema', () => {
    it('should validate correct budget item', () => {
      const result = budgetItemSchema.safeParse({
        budgetId: '123e4567-e89b-12d3-a456-426614174000',
        category: 'Salaires',
        plannedAmount: 20000000,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('discountSchema', () => {
    it('should validate correct discount', () => {
      const result = discountSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Réduction fratrie',
        type: 'sibling',
        value: 10,
        applicableTo: 'tuition',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all types', () => {
      for (const type of ['percentage', 'fixed', 'early_payment', 'sibling', 'scholarship']) {
        const result = discountSchema.safeParse({
          schoolId: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Test',
          type,
          value: 10,
          applicableTo: 'all',
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('scholarshipSchema', () => {
    it('should validate correct scholarship', () => {
      const result = scholarshipSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        studentId: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Bourse mérite',
        type: 'merit',
        amount: 50,
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        startDate: '2025-01-01T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('installmentPlanSchema', () => {
    it('should validate correct installment plan', () => {
      const result = installmentPlanSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        studentId: '123e4567-e89b-12d3-a456-426614174002',
        totalAmount: 1000000,
        numberOfInstallments: 3,
        frequency: 'monthly',
        startDate: '2025-01-01T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });

    it('should reject less than 2 installments', () => {
      const result = installmentPlanSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        studentId: '123e4567-e89b-12d3-a456-426614174002',
        totalAmount: 1000000,
        numberOfInstallments: 1,
        frequency: 'monthly',
        startDate: '2025-01-01T00:00:00Z',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('lateFeeSchema', () => {
    it('should validate correct late fee', () => {
      const result = lateFeeSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        studentId: '123e4567-e89b-12d3-a456-426614174002',
        type: 'percentage',
        amount: 5,
        dueDate: '2025-11-15T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('waiveLateFeeSchema', () => {
    it('should validate correct waive request', () => {
      const result = waiveLateFeeSchema.safeParse({
        lateFeeId: '123e4567-e89b-12d3-a456-426614174000',
        waivedBy: '123e4567-e89b-12d3-a456-426614174001',
        reason: 'Circonstances exceptionnelles',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('taxSchema', () => {
    it('should validate correct tax', () => {
      const result = taxSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'TVA',
        rate: 18,
        type: 'percentage',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('payrollSchema', () => {
    it('should validate correct payroll', () => {
      const result = payrollSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        period: 'Octobre 2025',
        startDate: '2025-10-01T00:00:00Z',
        endDate: '2025-10-31T00:00:00Z',
        paymentDate: '2025-10-25T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('payrollItemSchema', () => {
    it('should validate correct payroll item', () => {
      const result = payrollItemSchema.safeParse({
        payrollId: '123e4567-e89b-12d3-a456-426614174000',
        employeeId: '123e4567-e89b-12d3-a456-426614174001',
        baseSalary: 500000,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('voucherSchema', () => {
    it('should validate correct voucher', () => {
      const result = voucherSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        code: 'VC-001',
        name: 'Bon de réduction',
        type: 'discount',
        value: 50000,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('reportSchema', () => {
    it('should validate correct report', () => {
      const result = reportSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        type: 'income_statement',
        title: 'Rapport mensuel',
        startDate: '2025-10-01T00:00:00Z',
        endDate: '2025-10-31T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('financeSettingsSchema', () => {
    it('should validate correct settings', () => {
      const result = financeSettingsSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        currency: 'XOF',
        taxEnabled: true,
        defaultTaxRate: 18,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('refundSchema', () => {
    it('should validate correct refund', () => {
      const result = refundSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        paymentId: '123e4567-e89b-12d3-a456-426614174001',
        studentId: '123e4567-e89b-12d3-a456-426614174002',
        amount: 250000,
        reason: 'overpayment',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all reasons', () => {
      for (const reason of ['overpayment', 'duplicate_payment', 'course_cancellation', 'withdrawal', 'error', 'other']) {
        const result = refundSchema.safeParse({
          schoolId: '123e4567-e89b-12d3-a456-426614174000',
          paymentId: '123e4567-e89b-12d3-a456-426614174001',
          studentId: '123e4567-e89b-12d3-a456-426614174002',
          amount: 100000,
          reason,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('transactionSchema', () => {
    it('should validate correct transaction', () => {
      const result = transactionSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        type: 'income',
        amount: 500000,
        description: 'Paiement frais',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('receiptSchema', () => {
    it('should validate correct receipt', () => {
      const result = receiptSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        paymentId: '123e4567-e89b-12d3-a456-426614174002',
        studentId: '123e4567-e89b-12d3-a456-426614174003',
        amount: 500000,
        method: 'cash',
        issuedDate: '2025-10-15T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('exportSchema', () => {
    it('should validate correct export', () => {
      const result = exportSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        type: 'invoices',
        format: 'pdf',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('importSchema', () => {
    it('should validate correct import', () => {
      const result = importSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        type: 'invoices',
        fileUrl: 'https://example.com/data.csv',
        fileName: 'data.csv',
        format: 'csv',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('invoiceFiltersSchema', () => {
    it('should validate with defaults', () => {
      const result = invoiceFiltersSchema.safeParse({ schoolId: '123e4567-e89b-12d3-a456-426614174000' });
      expect(result.success).toBe(true);
    });
  });

  describe('paymentFiltersSchema', () => {
    it('should validate with defaults', () => {
      const result = paymentFiltersSchema.safeParse({ schoolId: '123e4567-e89b-12d3-a456-426614174000' });
      expect(result.success).toBe(true);
    });
  });

  describe('expenseFiltersSchema', () => {
    it('should validate with defaults', () => {
      const result = expenseFiltersSchema.safeParse({ schoolId: '123e4567-e89b-12d3-a456-426614174000' });
      expect(result.success).toBe(true);
    });
  });

  describe('revenueFiltersSchema', () => {
    it('should validate with defaults', () => {
      const result = revenueFiltersSchema.safeParse({ schoolId: '123e4567-e89b-12d3-a456-426614174000' });
      expect(result.success).toBe(true);
    });
  });

  describe('invoiceSearchSchema', () => {
    it('should validate correct search', () => {
      const result = invoiceSearchSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        query: 'test',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty query', () => {
      const result = invoiceSearchSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        query: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('confirmPaymentSchema', () => {
    it('should validate correct confirmation', () => {
      const result = confirmPaymentSchema.safeParse({
        paymentId: '123e4567-e89b-12d3-a456-426614174000',
        transactionId: 'TXN-001',
        status: 'completed',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty transactionId', () => {
      const result = confirmPaymentSchema.safeParse({
        paymentId: '123e4567-e89b-12d3-a456-426614174000',
        transactionId: '',
        status: 'completed',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('cancelPaymentSchema', () => {
    it('should validate correct cancellation', () => {
      const result = cancelPaymentSchema.safeParse({
        paymentId: '123e4567-e89b-12d3-a456-426614174000',
        reason: 'Annulation demande client',
        cancelledBy: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('approveRefundSchema', () => {
    it('should validate correct approval', () => {
      const result = approveRefundSchema.safeParse({
        refundId: '123e4567-e89b-12d3-a456-426614174000',
        approvedBy: '123e4567-e89b-12d3-a456-426614174001',
        approved: true,
      });
      expect(result.success).toBe(true);
    });

    it('should validate rejection', () => {
      const result = approveRefundSchema.safeParse({
        refundId: '123e4567-e89b-12d3-a456-426614174000',
        approvedBy: '123e4567-e89b-12d3-a456-426614174001',
        approved: false,
        notes: 'Justification insuffisante',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('approveExpenseSchema', () => {
    it('should validate correct approval', () => {
      const result = approveExpenseSchema.safeParse({
        expenseId: '123e4567-e89b-12d3-a456-426614174000',
        approvedBy: '123e4567-e89b-12d3-a456-426614174001',
        approved: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('postAccountingEntrySchema', () => {
    it('should validate correct posting', () => {
      const result = postAccountingEntrySchema.safeParse({
        entryId: '123e4567-e89b-12d3-a456-426614174000',
        postedBy: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('generateReceiptSchema', () => {
    it('should validate correct generation', () => {
      const result = generateReceiptSchema.safeParse({
        paymentId: '123e4567-e89b-12d3-a456-426614174000',
        format: 'pdf',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all formats', () => {
      for (const format of ['pdf', 'html', 'json']) {
        const result = generateReceiptSchema.safeParse({
          paymentId: '123e4567-e89b-12d3-a456-426614174000',
          format,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('taxRuleSchema', () => {
    it('should validate correct tax rule', () => {
      const result = taxRuleSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        taxId: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Règle TVA',
        category: 'TUITION',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('installmentPaymentSchema', () => {
    it('should validate correct installment payment', () => {
      const result = installmentPaymentSchema.safeParse({
        installmentPlanId: '123e4567-e89b-12d3-a456-426614174000',
        installmentNumber: 1,
        amount: 333333,
        method: 'cash',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('cashRegisterMovementSchema', () => {
    it('should validate correct movement', () => {
      const result = cashRegisterMovementSchema.safeParse({
        cashRegisterId: '123e4567-e89b-12d3-a456-426614174000',
        sessionId: '123e4567-e89b-12d3-a456-426614174001',
        type: 'sale',
        amount: 500000,
        performedBy: '123e4567-e89b-12d3-a456-426614174002',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all movement types', () => {
      for (const type of ['opening', 'closing', 'sale', 'refund', 'withdrawal', 'deposit', 'adjustment']) {
        const result = cashRegisterMovementSchema.safeParse({
          cashRegisterId: '123e4567-e89b-12d3-a456-426614174000',
          sessionId: '123e4567-e89b-12d3-a456-426614174001',
          type,
          amount: 100000,
          performedBy: '123e4567-e89b-12d3-a456-426614174002',
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('executeBudgetItemSchema', () => {
    it('should validate correct execution', () => {
      const result = executeBudgetItemSchema.safeParse({
        budgetItemId: '123e4567-e89b-12d3-a456-426614174000',
        executedAmount: 500000,
        executedBy: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('updateExpenseSchema', () => {
    it('should validate partial update', () => {
      const result = updateExpenseSchema.safeParse({ title: 'Updated expense' });
      expect(result.success).toBe(true);
    });

    it('should accept all optional fields', () => {
      const result = updateExpenseSchema.safeParse({
        title: 'Updated',
        amount: 200000,
        category: 'maintenance',
        status: 'approved',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('cashRegisterSchema', () => {
    it('should accept optional fields', () => {
      const result = cashRegisterSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Caisse secondaire',
        location: 'Bâtiment B',
        openingBalance: 50000,
        isActive: true,
      });
      expect(result.success).toBe(true);
    });
  });
});
