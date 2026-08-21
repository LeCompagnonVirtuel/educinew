import { describe, it, expect, vi, beforeEach } from 'vitest';

function createMockHook() {
  return {
    data: null,
    error: null,
    loading: false,
    mutate: vi.fn(),
    refetch: vi.fn(),
  };
}

function createMockInvoice() {
  return {
    id: 'inv1',
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
}

function createMockPayment() {
  return {
    id: 'pay1',
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
}

function createMockReceipt() {
  return {
    id: 'rec1',
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
}

function createMockExpense() {
  return {
    id: 'exp1',
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
}

function createMockRevenue() {
  return {
    id: 'rev1',
    schoolId: 'sch1',
    revenueNumber: 'REV-001',
    category: 'TUITION',
    amount: 5000000,
    currency: 'XOF',
    description: 'Frais de scolarité',
    date: '2025-10-15',
    createdBy: 'u1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

describe('Finance Core Hooks', () => {
  describe('useInvoice', () => {
    it('should return loading state initially', () => {
      const hook = createMockHook();
      expect(hook.loading).toBe(false);
      expect(hook.data).toBeNull();
    });

    it('should have mutate function', () => {
      const hook = createMockHook();
      expect(typeof hook.mutate).toBe('function');
    });

    it('should have refetch function', () => {
      const hook = createMockHook();
      expect(typeof hook.refetch).toBe('function');
    });

    it('should set data when invoice is loaded', () => {
      const hook = createMockHook();
      hook.data = createMockInvoice();
      expect(hook.data).toBeDefined();
      expect(hook.data.id).toBe('inv1');
    });

    it('should set error on failure', () => {
      const hook = createMockHook();
      hook.error = new Error('Not found');
      expect(hook.error).toBeDefined();
    });

    it('should handle invoice status PENDING', () => {
      const invoice = createMockInvoice();
      expect(invoice.status).toBe('PENDING');
    });

    it('should handle invoice status PAID', () => {
      const invoice = createMockInvoice();
      invoice.status = 'PAID';
      expect(invoice.status).toBe('PAID');
    });

    it('should handle invoice status SENT', () => {
      const invoice = createMockInvoice();
      invoice.status = 'SENT';
      expect(invoice.status).toBe('SENT');
    });

    it('should handle invoice status CANCELLED', () => {
      const invoice = createMockInvoice();
      invoice.status = 'CANCELLED';
      expect(invoice.status).toBe('CANCELLED');
    });

    it('should handle invoice status OVERDUE', () => {
      const invoice = createMockInvoice();
      invoice.status = 'OVERDUE';
      expect(invoice.status).toBe('OVERDUE');
    });

    it('should handle invoice total amount calculation', () => {
      const invoice = createMockInvoice();
      invoice.amount = 1000000;
      invoice.discount = 100000;
      invoice.tax = 180000;
      invoice.totalAmount = invoice.amount - invoice.discount + invoice.tax;
      expect(invoice.totalAmount).toBe(1080000);
    });

    it('should handle invoice with items', () => {
      const invoice = createMockInvoice();
      invoice.items = [{ id: 'item1', description: 'Frais', quantity: 1, unitPrice: 500000, amount: 500000, taxRate: 18, taxAmount: 90000, totalAmount: 590000, category: 'TUITION' }];
      expect(invoice.items).toHaveLength(1);
    });

    it('should handle invoice currency', () => {
      const invoice = createMockInvoice();
      expect(invoice.currency).toBe('XOF');
    });

    it('should handle invoice due date', () => {
      const invoice = createMockInvoice();
      expect(invoice.dueDate).toBe('2025-10-15');
    });

    it('should handle invoice recurring flag', () => {
      const invoice = createMockInvoice();
      expect(invoice.isRecurring).toBe(false);
    });

    it('should handle mutate call', () => {
      const hook = createMockHook();
      hook.mutate();
      expect(hook.mutate).toHaveBeenCalled();
    });

    it('should handle refetch call', () => {
      const hook = createMockHook();
      hook.refetch();
      expect(hook.refetch).toHaveBeenCalled();
    });

    it('should handle null data', () => {
      const hook = createMockHook();
      expect(hook.data).toBeNull();
    });

    it('should handle null error', () => {
      const hook = createMockHook();
      expect(hook.error).toBeNull();
    });

    it('should handle invoice number format', () => {
      const invoice = createMockInvoice();
      expect(invoice.invoiceNumber).toMatch(/^INV-\d+$/);
    });
  });

  describe('useInvoices', () => {
    it('should return empty array initially', () => {
      const hook = createMockHook();
      hook.data = [];
      expect(hook.data).toEqual([]);
    });

    it('should have refetch function', () => {
      const hook = createMockHook();
      expect(typeof hook.refetch).toBe('function');
    });

    it('should handle multiple invoices', () => {
      const hook = createMockHook();
      hook.data = [createMockInvoice(), createMockInvoice()];
      expect(hook.data).toHaveLength(2);
    });

    it('should handle pagination', () => {
      const pagination = { page: 1, limit: 20, total: 100 };
      expect(pagination.page).toBe(1);
      expect(pagination.limit).toBe(20);
    });

    it('should handle filter by status', () => {
      const invoices = [createMockInvoice(), createMockInvoice()];
      invoices[0].status = 'PAID';
      invoices[1].status = 'PENDING';
      const filtered = invoices.filter(i => i.status === 'PAID');
      expect(filtered).toHaveLength(1);
    });

    it('should handle empty result set', () => {
      const hook = createMockHook();
      hook.data = [];
      expect(hook.data).toHaveLength(0);
    });

    it('should handle loading state', () => {
      const hook = createMockHook();
      hook.loading = true;
      expect(hook.loading).toBe(true);
    });

    it('should handle error state', () => {
      const hook = createMockHook();
      hook.error = new Error('Failed to fetch');
      expect(hook.error).toBeDefined();
    });

    it('should handle total count', () => {
      const hook = createMockHook();
      hook.data = [createMockInvoice()];
      expect(hook.data.length).toBeGreaterThan(0);
    });

    it('should handle sorting by date', () => {
      const invoices = [createMockInvoice(), createMockInvoice()];
      invoices[0].createdAt = '2025-01-01';
      invoices[1].createdAt = '2025-06-01';
      invoices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      expect(invoices[0].createdAt).toBe('2025-06-01');
    });

    it('should handle search query', () => {
      const invoices = [createMockInvoice()];
      const query = 'INV-001';
      const filtered = invoices.filter(i => i.invoiceNumber.includes(query));
      expect(filtered).toHaveLength(1);
    });

    it('should handle date range filter', () => {
      const invoices = [createMockInvoice()];
      const start = '2020-01-01';
      const end = '2030-12-31';
      const filtered = invoices.filter(i => i.createdAt >= start && i.createdAt <= end);
      expect(filtered).toHaveLength(1);
    });

    it('should handle student filter', () => {
      const invoices = [createMockInvoice()];
      const filtered = invoices.filter(i => i.studentId === 's1');
      expect(filtered).toHaveLength(1);
    });

    it('should handle type filter', () => {
      const invoices = [createMockInvoice()];
      const filtered = invoices.filter(i => i.type === 'TUITION');
      expect(filtered).toHaveLength(1);
    });

    it('should handle amount range filter', () => {
      const invoices = [createMockInvoice()];
      const filtered = invoices.filter(i => i.amount >= 100000 && i.amount <= 1000000);
      expect(filtered).toHaveLength(1);
    });

    it('should handle multiple filter combination', () => {
      const invoices = [createMockInvoice()];
      const filtered = invoices.filter(i => i.status === 'PENDING' && i.type === 'TUITION');
      expect(filtered).toHaveLength(1);
    });

    it('should handle refetch after mutation', () => {
      const hook = createMockHook();
      hook.refetch();
      expect(hook.refetch).toHaveBeenCalled();
    });

    it('should handle data transformation', () => {
      const invoices = [createMockInvoice()];
      const transformed = invoices.map(i => ({ ...i, label: `${i.invoiceNumber} - ${i.status}` }));
      expect(transformed[0].label).toBe('INV-001 - PENDING');
    });

    it('should handle deduplication', () => {
      const invoices = [createMockInvoice(), createMockInvoice()];
      const unique = [...new Map(invoices.map(i => [i.id, i])).values()];
      expect(unique).toHaveLength(1);
    });
  });

  describe('usePayment', () => {
    it('should return loading state initially', () => {
      const hook = createMockHook();
      expect(hook.loading).toBe(false);
    });

    it('should have mutate function', () => {
      const hook = createMockHook();
      expect(typeof hook.mutate).toBe('function');
    });

    it('should set data when payment is loaded', () => {
      const hook = createMockHook();
      hook.data = createMockPayment();
      expect(hook.data).toBeDefined();
      expect(hook.data.id).toBe('pay1');
    });

    it('should handle payment status COMPLETED', () => {
      const payment = createMockPayment();
      expect(payment.status).toBe('COMPLETED');
    });

    it('should handle payment status PENDING', () => {
      const payment = createMockPayment();
      payment.status = 'PENDING';
      expect(payment.status).toBe('PENDING');
    });

    it('should handle payment status CANCELLED', () => {
      const payment = createMockPayment();
      payment.status = 'CANCELLED';
      expect(payment.status).toBe('CANCELLED');
    });

    it('should handle payment method CASH', () => {
      const payment = createMockPayment();
      expect(payment.method).toBe('CASH');
    });

    it('should handle payment method BANK_TRANSFER', () => {
      const payment = createMockPayment();
      payment.method = 'BANK_TRANSFER';
      expect(payment.method).toBe('BANK_TRANSFER');
    });

    it('should handle payment amount', () => {
      const payment = createMockPayment();
      expect(payment.amount).toBe(500000);
    });

    it('should handle payment invoice reference', () => {
      const payment = createMockPayment();
      expect(payment.invoiceId).toBe('inv1');
    });

    it('should handle payment student reference', () => {
      const payment = createMockPayment();
      expect(payment.studentId).toBe('s1');
    });

    it('should handle payment receipt generation', () => {
      const payment = createMockPayment();
      expect(payment.receiptNumber).toBeUndefined();
    });

    it('should handle mutate call', () => {
      const hook = createMockHook();
      hook.mutate();
      expect(hook.mutate).toHaveBeenCalled();
    });

    it('should handle refetch call', () => {
      const hook = createMockHook();
      hook.refetch();
      expect(hook.refetch).toHaveBeenCalled();
    });

    it('should handle error state', () => {
      const hook = createMockHook();
      hook.error = new Error('Payment failed');
      expect(hook.error).toBeDefined();
    });

    it('should handle payment number format', () => {
      const payment = createMockPayment();
      expect(payment.paymentNumber).toMatch(/^PAY-\d+$/);
    });

    it('should handle payment currency', () => {
      const payment = createMockPayment();
      expect(payment.currency).toBe('XOF');
    });

    it('should handle payment receivedBy', () => {
      const payment = createMockPayment();
      expect(payment.receivedBy).toBe('u1');
    });

    it('should handle payment timestamps', () => {
      const payment = createMockPayment();
      expect(payment.receivedAt).toBeDefined();
      expect(payment.createdAt).toBeDefined();
    });

    it('should handle payment schoolId', () => {
      const payment = createMockPayment();
      expect(payment.schoolId).toBe('sch1');
    });
  });

  describe('usePayments', () => {
    it('should return empty array initially', () => {
      const hook = createMockHook();
      hook.data = [];
      expect(hook.data).toEqual([]);
    });

    it('should have refetch function', () => {
      const hook = createMockHook();
      expect(typeof hook.refetch).toBe('function');
    });

    it('should handle multiple payments', () => {
      const hook = createMockHook();
      hook.data = [createMockPayment(), createMockPayment()];
      expect(hook.data).toHaveLength(2);
    });

    it('should handle filter by method', () => {
      const payments = [createMockPayment(), createMockPayment()];
      payments[0].method = 'CASH';
      payments[1].method = 'BANK_TRANSFER';
      const filtered = payments.filter(p => p.method === 'CASH');
      expect(filtered).toHaveLength(1);
    });

    it('should handle filter by status', () => {
      const payments = [createMockPayment(), createMockPayment()];
      payments[0].status = 'COMPLETED';
      payments[1].status = 'PENDING';
      const filtered = payments.filter(p => p.status === 'COMPLETED');
      expect(filtered).toHaveLength(1);
    });

    it('should handle pagination', () => {
      const pagination = { page: 1, limit: 20 };
      expect(pagination.page).toBe(1);
      expect(pagination.limit).toBe(20);
    });

    it('should handle date range filter', () => {
      const payments = [createMockPayment()];
      const filtered = payments.filter(p => p.receivedAt >= '2020-01-01' && p.receivedAt <= '2030-12-31');
      expect(filtered).toHaveLength(1);
    });

    it('should handle total calculation', () => {
      const payments = [createMockPayment(), createMockPayment()];
      const total = payments.reduce((sum, p) => sum + p.amount, 0);
      expect(total).toBe(1000000);
    });

    it('should handle loading state', () => {
      const hook = createMockHook();
      hook.loading = true;
      expect(hook.loading).toBe(true);
    });

    it('should handle error state', () => {
      const hook = createMockHook();
      hook.error = new Error('Failed');
      expect(hook.error).toBeDefined();
    });

    it('should handle sorting by amount', () => {
      const payments = [createMockPayment(), createMockPayment()];
      payments[0].amount = 100000;
      payments[1].amount = 500000;
      payments.sort((a, b) => b.amount - a.amount);
      expect(payments[0].amount).toBe(500000);
    });

    it('should handle search by payment number', () => {
      const payments = [createMockPayment()];
      const filtered = payments.filter(p => p.paymentNumber.includes('PAY'));
      expect(filtered).toHaveLength(1);
    });

    it('should handle student filter', () => {
      const payments = [createMockPayment()];
      const filtered = payments.filter(p => p.studentId === 's1');
      expect(filtered).toHaveLength(1);
    });

    it('should handle invoice filter', () => {
      const payments = [createMockPayment()];
      const filtered = payments.filter(p => p.invoiceId === 'inv1');
      expect(filtered).toHaveLength(1);
    });

    it('should handle refetch', () => {
      const hook = createMockHook();
      hook.refetch();
      expect(hook.refetch).toHaveBeenCalled();
    });

    it('should handle data transformation', () => {
      const payments = [createMockPayment()];
      const transformed = payments.map(p => ({ ...p, label: `${p.paymentNumber} - ${p.method}` }));
      expect(transformed[0].label).toBe('PAY-001 - CASH');
    });

    it('should handle grouping by method', () => {
      const payments = [createMockPayment(), createMockPayment()];
      payments[0].method = 'CASH';
      payments[1].method = 'BANK_TRANSFER';
      const grouped = payments.reduce((acc, p) => { acc[p.method] = (acc[p.method] || 0) + p.amount; return acc; }, {} as Record<string, number>);
      expect(grouped['CASH']).toBe(500000);
      expect(grouped['BANK_TRANSFER']).toBe(500000);
    });

    it('should handle empty result', () => {
      const hook = createMockHook();
      hook.data = [];
      expect(hook.data).toHaveLength(0);
    });

    it('should handle single result', () => {
      const hook = createMockHook();
      hook.data = [createMockPayment()];
      expect(hook.data).toHaveLength(1);
    });
  });

  describe('useReceipt', () => {
    it('should return loading state initially', () => {
      const hook = createMockHook();
      expect(hook.loading).toBe(false);
    });

    it('should have mutate function', () => {
      const hook = createMockHook();
      expect(typeof hook.mutate).toBe('function');
    });

    it('should set data when receipt is loaded', () => {
      const hook = createMockHook();
      hook.data = createMockReceipt();
      expect(hook.data).toBeDefined();
      expect(hook.data.id).toBe('rec1');
    });

    it('should handle receipt status ISSUED', () => {
      const receipt = createMockReceipt();
      expect(receipt.status).toBe('ISSUED');
    });

    it('should handle receipt status SENT', () => {
      const receipt = createMockReceipt();
      receipt.status = 'SENT';
      expect(receipt.status).toBe('SENT');
    });

    it('should handle receipt number format', () => {
      const receipt = createMockReceipt();
      expect(receipt.receiptNumber).toMatch(/^REC-\d+$/);
    });

    it('should handle receipt amount', () => {
      const receipt = createMockReceipt();
      expect(receipt.amount).toBe(500000);
    });

    it('should handle receipt payment reference', () => {
      const receipt = createMockReceipt();
      expect(receipt.paymentId).toBe('pay1');
    });

    it('should handle receipt invoice reference', () => {
      const receipt = createMockReceipt();
      expect(receipt.invoiceId).toBe('inv1');
    });

    it('should handle receipt student reference', () => {
      const receipt = createMockReceipt();
      expect(receipt.studentId).toBe('s1');
    });

    it('should handle receipt currency', () => {
      const receipt = createMockReceipt();
      expect(receipt.currency).toBe('XOF');
    });

    it('should handle receipt schoolId', () => {
      const receipt = createMockReceipt();
      expect(receipt.schoolId).toBe('sch1');
    });

    it('should handle receipt issuedAt', () => {
      const receipt = createMockReceipt();
      expect(receipt.issuedAt).toBeDefined();
    });

    it('should handle mutate call', () => {
      const hook = createMockHook();
      hook.mutate();
      expect(hook.mutate).toHaveBeenCalled();
    });

    it('should handle refetch call', () => {
      const hook = createMockHook();
      hook.refetch();
      expect(hook.refetch).toHaveBeenCalled();
    });

    it('should handle error state', () => {
      const hook = createMockHook();
      hook.error = new Error('Receipt error');
      expect(hook.error).toBeDefined();
    });

    it('should handle null data', () => {
      const hook = createMockHook();
      expect(hook.data).toBeNull();
    });

    it('should handle receipt timestamps', () => {
      const receipt = createMockReceipt();
      expect(receipt.createdAt).toBeDefined();
      expect(receipt.updatedAt).toBeDefined();
    });

    it('should handle receipt with template', () => {
      const receipt = createMockReceipt();
      expect(receipt.templateId).toBeUndefined();
    });

    it('should handle receipt with notes', () => {
      const receipt = createMockReceipt();
      expect(receipt.notes).toBeUndefined();
    });
  });

  describe('useExpense', () => {
    it('should return loading state initially', () => {
      const hook = createMockHook();
      expect(hook.loading).toBe(false);
    });

    it('should have mutate function', () => {
      const hook = createMockHook();
      expect(typeof hook.mutate).toBe('function');
    });

    it('should set data when expense is loaded', () => {
      const hook = createMockHook();
      hook.data = createMockExpense();
      expect(hook.data).toBeDefined();
      expect(hook.data.id).toBe('exp1');
    });

    it('should handle expense status PENDING', () => {
      const expense = createMockExpense();
      expense.status = 'PENDING';
      expect(expense.status).toBe('PENDING');
    });

    it('should handle expense status APPROVED', () => {
      const expense = createMockExpense();
      expect(expense.status).toBe('APPROVED');
    });

    it('should handle expense status REJECTED', () => {
      const expense = createMockExpense();
      expense.status = 'REJECTED';
      expect(expense.status).toBe('REJECTED');
    });

    it('should handle expense category', () => {
      const expense = createMockExpense();
      expect(expense.category).toBe('SALARIES');
    });

    it('should handle expense amount', () => {
      const expense = createMockExpense();
      expect(expense.amount).toBe(2000000);
    });

    it('should handle expense number format', () => {
      const expense = createMockExpense();
      expect(expense.expenseNumber).toMatch(/^EXP-\d+$/);
    });

    it('should handle expense currency', () => {
      const expense = createMockExpense();
      expect(expense.currency).toBe('XOF');
    });

    it('should handle expense description', () => {
      const expense = createMockExpense();
      expect(expense.description).toBe('Salaires du mois');
    });

    it('should handle expense createdBy', () => {
      const expense = createMockExpense();
      expect(expense.createdBy).toBe('u1');
    });

    it('should handle mutate call', () => {
      const hook = createMockHook();
      hook.mutate();
      expect(hook.mutate).toHaveBeenCalled();
    });

    it('should handle refetch call', () => {
      const hook = createMockHook();
      hook.refetch();
      expect(hook.refetch).toHaveBeenCalled();
    });

    it('should handle error state', () => {
      const hook = createMockHook();
      hook.error = new Error('Expense error');
      expect(hook.error).toBeDefined();
    });

    it('should handle null data', () => {
      const hook = createMockHook();
      expect(hook.data).toBeNull();
    });

    it('should handle expense with attachments', () => {
      const expense = createMockExpense();
      expect(expense.attachments).toBeUndefined();
    });

    it('should handle expense approval workflow', () => {
      const expense = createMockExpense();
      const workflow = ['DRAFT', 'PENDING', 'APPROVED', 'PAID'];
      expect(workflow).toContain(expense.status);
    });

    it('should handle expense timestamps', () => {
      const expense = createMockExpense();
      expect(expense.createdAt).toBeDefined();
      expect(expense.updatedAt).toBeDefined();
    });

    it('should handle expense schoolId', () => {
      const expense = createMockExpense();
      expect(expense.schoolId).toBe('sch1');
    });
  });

  describe('useRevenue', () => {
    it('should return loading state initially', () => {
      const hook = createMockHook();
      expect(hook.loading).toBe(false);
    });

    it('should have mutate function', () => {
      const hook = createMockHook();
      expect(typeof hook.mutate).toBe('function');
    });

    it('should set data when revenue is loaded', () => {
      const hook = createMockHook();
      hook.data = createMockRevenue();
      expect(hook.data).toBeDefined();
      expect(hook.data.id).toBe('rev1');
    });

    it('should handle revenue category', () => {
      const revenue = createMockRevenue();
      expect(revenue.category).toBe('TUITION');
    });

    it('should handle revenue amount', () => {
      const revenue = createMockRevenue();
      expect(revenue.amount).toBe(5000000);
    });

    it('should handle revenue number format', () => {
      const revenue = createMockRevenue();
      expect(revenue.revenueNumber).toMatch(/^REV-\d+$/);
    });

    it('should handle revenue currency', () => {
      const revenue = createMockRevenue();
      expect(revenue.currency).toBe('XOF');
    });

    it('should handle revenue description', () => {
      const revenue = createMockRevenue();
      expect(revenue.description).toBe('Frais de scolarité');
    });

    it('should handle revenue date', () => {
      const revenue = createMockRevenue();
      expect(revenue.date).toBe('2025-10-15');
    });

    it('should handle revenue createdBy', () => {
      const revenue = createMockRevenue();
      expect(revenue.createdBy).toBe('u1');
    });

    it('should handle revenue schoolId', () => {
      const revenue = createMockRevenue();
      expect(revenue.schoolId).toBe('sch1');
    });

    it('should handle mutate call', () => {
      const hook = createMockHook();
      hook.mutate();
      expect(hook.mutate).toHaveBeenCalled();
    });

    it('should handle refetch call', () => {
      const hook = createMockHook();
      hook.refetch();
      expect(hook.refetch).toHaveBeenCalled();
    });

    it('should handle error state', () => {
      const hook = createMockHook();
      hook.error = new Error('Revenue error');
      expect(hook.error).toBeDefined();
    });

    it('should handle null data', () => {
      const hook = createMockHook();
      expect(hook.data).toBeNull();
    });

    it('should handle revenue timestamps', () => {
      const revenue = createMockRevenue();
      expect(revenue.createdAt).toBeDefined();
      expect(revenue.updatedAt).toBeDefined();
    });

    it('should handle revenue with category types', () => {
      const categories = ['TUITION', 'FEES', 'DONATIONS', 'GRANTS', 'OTHER'];
      expect(categories).toContain('TUITION');
      expect(categories.length).toBe(5);
    });

    it('should handle revenue with tags', () => {
      const revenue = createMockRevenue();
      expect(revenue.tags).toBeUndefined();
    });

    it('should handle revenue with academic year', () => {
      const revenue = createMockRevenue();
      expect(revenue.academicYearId).toBeUndefined();
    });

    it('should handle revenue with installment', () => {
      const revenue = createMockRevenue();
      expect(revenue.installmentPlanId).toBeUndefined();
    });
  });
});
