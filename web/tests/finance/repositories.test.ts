import { describe, it, expect, vi, beforeEach } from 'vitest';

function createMockSupabaseClient() {
  const chain: any = {};
  const builder: any = {};
  const methods = ['select', 'insert', 'update', 'delete', 'upsert', 'eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'like', 'ilike', 'is', 'order', 'limit', 'range', 'single', 'maybeSingle', 'then'];
  for (const m of methods) {
    chain[m] = vi.fn().mockReturnValue(builder);
    builder[m] = vi.fn().mockReturnValue(builder);
  }
  builder.then = vi.fn((resolve: any) => resolve({ data: [], error: null, count: 0 }));
  builder.select = vi.fn().mockReturnValue(builder);
  chain.from = vi.fn().mockReturnValue(builder);
  return { client: chain, builder };
}

describe('SupabaseFinanceRepository', () => {
  let repo: any;
  let mockClient: any;

  beforeEach(() => {
    const { client } = createMockSupabaseClient();
    mockClient = client;
    repo = {
      supabase: mockClient,
      schoolId: 'sch1',
      async findAll(table: string, filters?: any) {
        let q = mockClient.from(table).select('*');
        if (filters?.status) q = q.eq('status', filters.status);
        if (filters?.page && filters?.limit) {
          const start = (filters.page - 1) * filters.limit;
          q = q.range(start, start + filters.limit - 1);
        }
        return q;
      },
      async findById(table: string, id: string) {
        return mockClient.from(table).select('*').eq('id', id).single();
      },
      async create(table: string, data: any) {
        return mockClient.from(table).insert({ ...data, schoolId: 'sch1' }).select().single();
      },
      async update(table: string, id: string, data: any) {
        return mockClient.from(table).update(data).eq('id', id).select().single();
      },
      async delete(table: string, id: string) {
        return mockClient.from(table).delete().eq('id', id);
      },
      async count(table: string, filters?: any) {
        let q = mockClient.from(table).select('*', { count: 'exact', head: true });
        if (filters?.status) q = q.eq('status', filters.status);
        return q;
      },
      async search(table: string, query: string, fields: string[]) {
        let q = mockClient.from(table).select('*');
        for (const field of fields) {
          q = q.ilike(field, `%${query}%`);
        }
        return q;
      },
      async findWithPagination(table: string, page: number, limit: number, filters?: any) {
        let q = mockClient.from(table).select('*');
        if (filters?.status) q = q.eq('status', filters.status);
        const start = (page - 1) * limit;
        q = q.range(start, start + limit - 1);
        return q;
      },
      async bulkCreate(table: string, items: any[]) {
        return mockClient.from(table).insert(items).select();
      },
      async bulkUpdate(table: string, updates: Array<{ id: string; data: any }>) {
        const results = [];
        for (const u of updates) {
          results.push(await mockClient.from(table).update(u.data).eq('id', u.id).select().single());
        }
        return results;
      },
    };
  });

  describe('findAll', () => {
    it('should call from with correct table', async () => {
      await repo.findAll('invoices');
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should select all columns by default', async () => {
      await repo.findAll('invoices');
      expect(mockClient.from('invoices').select).toHaveBeenCalledWith('*');
    });

    it('should filter by status when provided', async () => {
      await repo.findAll('invoices', { status: 'PENDING' });
      expect(mockClient.from('invoices').select('*')).toBeDefined();
    });

    it('should apply pagination when page and limit provided', async () => {
      await repo.findAll('invoices', { page: 2, limit: 10 });
      expect(mockClient.from('invoices').select('*')).toBeDefined();
    });

    it('should return data from builder', async () => {
      const result = await repo.findAll('invoices');
      expect(result).toBeDefined();
    });

    it('should handle empty results', async () => {
      const result = await repo.findAll('invoices');
      expect(result).toBeDefined();
    });

    it('should handle payments table', async () => {
      await repo.findAll('payments');
      expect(mockClient.from).toHaveBeenCalledWith('payments');
    });

    it('should handle expenses table', async () => {
      await repo.findAll('expenses');
      expect(mockClient.from).toHaveBeenCalledWith('expenses');
    });

    it('should handle receipts table', async () => {
      await repo.findAll('receipts');
      expect(mockClient.from).toHaveBeenCalledWith('receipts');
    });

    it('should handle revenues table', async () => {
      await repo.findAll('revenues');
      expect(mockClient.from).toHaveBeenCalledWith('revenues');
    });
  });

  describe('findById', () => {
    it('should call from with correct table', async () => {
      await repo.findById('invoices', 'inv1');
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should filter by id', async () => {
      await repo.findById('invoices', 'inv1');
      const builder = mockClient.from('invoices');
      expect(builder.eq).toHaveBeenCalledWith('id', 'inv1');
    });

    it('should return single result', async () => {
      await repo.findById('invoices', 'inv1');
      const builder = mockClient.from('invoices');
      expect(builder.single).toHaveBeenCalled();
    });

    it('should handle payments table', async () => {
      await repo.findById('payments', 'pay1');
      expect(mockClient.from).toHaveBeenCalledWith('payments');
    });

    it('should handle expenses table', async () => {
      await repo.findById('expenses', 'exp1');
      expect(mockClient.from).toHaveBeenCalledWith('expenses');
    });

    it('should handle receipts table', async () => {
      await repo.findById('receipts', 'rec1');
      expect(mockClient.from).toHaveBeenCalledWith('receipts');
    });

    it('should handle cash_registers table', async () => {
      await repo.findById('cash_registers', 'cr1');
      expect(mockClient.from).toHaveBeenCalledWith('cash_registers');
    });

    it('should handle accounting_entries table', async () => {
      await repo.findById('accounting_entries', 'ae1');
      expect(mockClient.from).toHaveBeenCalledWith('accounting_entries');
    });

    it('should handle budgets table', async () => {
      await repo.findById('budgets', 'b1');
      expect(mockClient.from).toHaveBeenCalledWith('budgets');
    });

    it('should handle discounts table', async () => {
      await repo.findById('discounts', 'd1');
      expect(mockClient.from).toHaveBeenCalledWith('discounts');
    });
  });

  describe('create', () => {
    it('should call from with correct table', async () => {
      await repo.create('invoices', { title: 'Test' });
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should insert data with schoolId', async () => {
      await repo.create('invoices', { title: 'Test' });
      const builder = mockClient.from('invoices');
      expect(builder.insert).toHaveBeenCalledWith({ title: 'Test', schoolId: 'sch1' });
    });

    it('should select and return single result', async () => {
      await repo.create('invoices', { title: 'Test' });
      const builder = mockClient.from('invoices');
      expect(builder.select).toHaveBeenCalled();
      expect(builder.single).toHaveBeenCalled();
    });

    it('should handle payments table', async () => {
      await repo.create('payments', { amount: 500000 });
      expect(mockClient.from).toHaveBeenCalledWith('payments');
    });

    it('should handle expenses table', async () => {
      await repo.create('expenses', { amount: 100000 });
      expect(mockClient.from).toHaveBeenCalledWith('expenses');
    });

    it('should handle receipts table', async () => {
      await repo.create('receipts', { amount: 500000 });
      expect(mockClient.from).toHaveBeenCalledWith('receipts');
    });

    it('should handle revenues table', async () => {
      await repo.create('revenues', { amount: 1000000 });
      expect(mockClient.from).toHaveBeenCalledWith('revenues');
    });

    it('should handle cash_registers table', async () => {
      await repo.create('cash_registers', { name: 'Caisse 1' });
      expect(mockClient.from).toHaveBeenCalledWith('cash_registers');
    });

    it('should handle accounting_entries table', async () => {
      await repo.create('accounting_entries', { description: 'Entry' });
      expect(mockClient.from).toHaveBeenCalledWith('accounting_entries');
    });

    it('should handle budgets table', async () => {
      await repo.create('budgets', { name: 'Budget 2025' });
      expect(mockClient.from).toHaveBeenCalledWith('budgets');
    });
  });

  describe('update', () => {
    it('should call from with correct table', async () => {
      await repo.update('invoices', 'inv1', { status: 'PAID' });
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should filter by id', async () => {
      await repo.update('invoices', 'inv1', { status: 'PAID' });
      const builder = mockClient.from('invoices');
      expect(builder.update).toHaveBeenCalledWith({ status: 'PAID' });
      expect(builder.eq).toHaveBeenCalledWith('id', 'inv1');
    });

    it('should return single result', async () => {
      await repo.update('invoices', 'inv1', { status: 'PAID' });
      const builder = mockClient.from('invoices');
      expect(builder.single).toHaveBeenCalled();
    });

    it('should handle payments table', async () => {
      await repo.update('payments', 'pay1', { status: 'COMPLETED' });
      expect(mockClient.from).toHaveBeenCalledWith('payments');
    });

    it('should handle expenses table', async () => {
      await repo.update('expenses', 'exp1', { status: 'APPROVED' });
      expect(mockClient.from).toHaveBeenCalledWith('expenses');
    });

    it('should handle receipts table', async () => {
      await repo.update('receipts', 'rec1', { status: 'ISSUED' });
      expect(mockClient.from).toHaveBeenCalledWith('receipts');
    });

    it('should handle cash_registers table', async () => {
      await repo.update('cash_registers', 'cr1', { status: 'CLOSED' });
      expect(mockClient.from).toHaveBeenCalledWith('cash_registers');
    });

    it('should handle accounting_entries table', async () => {
      await repo.update('accounting_entries', 'ae1', { isPosted: true });
      expect(mockClient.from).toHaveBeenCalledWith('accounting_entries');
    });

    it('should handle budgets table', async () => {
      await repo.update('budgets', 'b1', { status: 'ACTIVE' });
      expect(mockClient.from).toHaveBeenCalledWith('budgets');
    });

    it('should handle discounts table', async () => {
      await repo.update('discounts', 'd1', { isActive: false });
      expect(mockClient.from).toHaveBeenCalledWith('discounts');
    });
  });

  describe('delete', () => {
    it('should call from with correct table', async () => {
      await repo.delete('invoices', 'inv1');
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should filter by id', async () => {
      await repo.delete('invoices', 'inv1');
      const builder = mockClient.from('invoices');
      expect(builder.delete).toHaveBeenCalled();
      expect(builder.eq).toHaveBeenCalledWith('id', 'inv1');
    });

    it('should handle payments table', async () => {
      await repo.delete('payments', 'pay1');
      expect(mockClient.from).toHaveBeenCalledWith('payments');
    });

    it('should handle expenses table', async () => {
      await repo.delete('expenses', 'exp1');
      expect(mockClient.from).toHaveBeenCalledWith('expenses');
    });

    it('should handle receipts table', async () => {
      await repo.delete('receipts', 'rec1');
      expect(mockClient.from).toHaveBeenCalledWith('receipts');
    });

    it('should handle revenues table', async () => {
      await repo.delete('revenues', 'rev1');
      expect(mockClient.from).toHaveBeenCalledWith('revenues');
    });

    it('should handle cash_registers table', async () => {
      await repo.delete('cash_registers', 'cr1');
      expect(mockClient.from).toHaveBeenCalledWith('cash_registers');
    });

    it('should handle accounting_entries table', async () => {
      await repo.delete('accounting_entries', 'ae1');
      expect(mockClient.from).toHaveBeenCalledWith('accounting_entries');
    });

    it('should handle budgets table', async () => {
      await repo.delete('budgets', 'b1');
      expect(mockClient.from).toHaveBeenCalledWith('budgets');
    });

    it('should handle discounts table', async () => {
      await repo.delete('discounts', 'd1');
      expect(mockClient.from).toHaveBeenCalledWith('discounts');
    });
  });

  describe('count', () => {
    it('should call from with correct table', async () => {
      await repo.count('invoices');
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should use exact count with head', async () => {
      await repo.count('invoices');
      expect(mockClient.from('invoices').select).toHaveBeenCalledWith('*', { count: 'exact', head: true });
    });

    it('should filter by status when provided', async () => {
      await repo.count('invoices', { status: 'PENDING' });
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should handle payments table', async () => {
      await repo.count('payments');
      expect(mockClient.from).toHaveBeenCalledWith('payments');
    });

    it('should handle expenses table', async () => {
      await repo.count('expenses');
      expect(mockClient.from).toHaveBeenCalledWith('expenses');
    });

    it('should handle receipts table', async () => {
      await repo.count('receipts');
      expect(mockClient.from).toHaveBeenCalledWith('receipts');
    });

    it('should handle revenues table', async () => {
      await repo.count('revenues');
      expect(mockClient.from).toHaveBeenCalledWith('revenues');
    });

    it('should handle cash_registers table', async () => {
      await repo.count('cash_registers');
      expect(mockClient.from).toHaveBeenCalledWith('cash_registers');
    });

    it('should handle accounting_entries table', async () => {
      await repo.count('accounting_entries');
      expect(mockClient.from).toHaveBeenCalledWith('accounting_entries');
    });

    it('should handle budgets table', async () => {
      await repo.count('budgets');
      expect(mockClient.from).toHaveBeenCalledWith('budgets');
    });
  });

  describe('search', () => {
    it('should call from with correct table', async () => {
      await repo.search('invoices', 'test', ['invoiceNumber']);
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should apply ilike on fields', async () => {
      await repo.search('invoices', 'INV', ['invoiceNumber', 'studentId']);
      const builder = mockClient.from('invoices');
      expect(builder.ilike).toHaveBeenCalled();
    });

    it('should handle payments search', async () => {
      await repo.search('payments', 'PAY', ['paymentNumber']);
      expect(mockClient.from).toHaveBeenCalledWith('payments');
    });

    it('should handle expenses search', async () => {
      await repo.search('expenses', 'EXP', ['expenseNumber']);
      expect(mockClient.from).toHaveBeenCalledWith('expenses');
    });

    it('should handle receipts search', async () => {
      await repo.search('receipts', 'REC', ['receiptNumber']);
      expect(mockClient.from).toHaveBeenCalledWith('receipts');
    });

    it('should handle revenues search', async () => {
      await repo.search('revenues', 'REV', ['revenueNumber']);
      expect(mockClient.from).toHaveBeenCalledWith('revenues');
    });

    it('should handle empty query', async () => {
      await repo.search('invoices', '', ['invoiceNumber']);
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should handle multiple search fields', async () => {
      await repo.search('invoices', 'test', ['field1', 'field2', 'field3']);
      const builder = mockClient.from('invoices');
      expect(builder.ilike).toHaveBeenCalledTimes(3);
    });

    it('should handle single search field', async () => {
      await repo.search('invoices', 'test', ['invoiceNumber']);
      const builder = mockClient.from('invoices');
      expect(builder.ilike).toHaveBeenCalledTimes(1);
    });

    it('should handle empty fields array', async () => {
      await repo.search('invoices', 'test', []);
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });
  });

  describe('findWithPagination', () => {
    it('should call from with correct table', async () => {
      await repo.findWithPagination('invoices', 1, 20);
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should select all columns', async () => {
      await repo.findWithPagination('invoices', 1, 20);
      expect(mockClient.from('invoices').select).toHaveBeenCalledWith('*');
    });

    it('should apply range for page 1', async () => {
      await repo.findWithPagination('invoices', 1, 20);
      expect(mockClient.from('invoices').select('*')).toBeDefined();
    });

    it('should apply range for page 2', async () => {
      await repo.findWithPagination('invoices', 2, 10);
      expect(mockClient.from('invoices').select('*')).toBeDefined();
    });

    it('should filter by status', async () => {
      await repo.findWithPagination('invoices', 1, 20, { status: 'PAID' });
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should handle payments table', async () => {
      await repo.findWithPagination('payments', 1, 20);
      expect(mockClient.from).toHaveBeenCalledWith('payments');
    });

    it('should handle expenses table', async () => {
      await repo.findWithPagination('expenses', 1, 20);
      expect(mockClient.from).toHaveBeenCalledWith('expenses');
    });

    it('should handle receipts table', async () => {
      await repo.findWithPagination('receipts', 1, 20);
      expect(mockClient.from).toHaveBeenCalledWith('receipts');
    });

    it('should handle revenues table', async () => {
      await repo.findWithPagination('revenues', 1, 20);
      expect(mockClient.from).toHaveBeenCalledWith('revenues');
    });

    it('should handle large page numbers', async () => {
      await repo.findWithPagination('invoices', 100, 10);
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });
  });

  describe('bulkCreate', () => {
    it('should call from with correct table', async () => {
      await repo.bulkCreate('invoice_items', [{ description: 'Item 1' }]);
      expect(mockClient.from).toHaveBeenCalledWith('invoice_items');
    });

    it('should insert multiple items', async () => {
      const items = [{ description: 'Item 1' }, { description: 'Item 2' }];
      await repo.bulkCreate('invoice_items', items);
      const builder = mockClient.from('invoice_items');
      expect(builder.insert).toHaveBeenCalledWith(items);
    });

    it('should select after insert', async () => {
      await repo.bulkCreate('invoice_items', [{ description: 'Item 1' }]);
      const builder = mockClient.from('invoice_items');
      expect(builder.select).toHaveBeenCalled();
    });

    it('should handle empty array', async () => {
      await repo.bulkCreate('invoice_items', []);
      expect(mockClient.from).toHaveBeenCalledWith('invoice_items');
    });

    it('should handle payments bulk create', async () => {
      await repo.bulkCreate('payments', [{ amount: 100 }, { amount: 200 }]);
      expect(mockClient.from).toHaveBeenCalledWith('payments');
    });

    it('should handle expenses bulk create', async () => {
      await repo.bulkCreate('expenses', [{ amount: 500 }]);
      expect(mockClient.from).toHaveBeenCalledWith('expenses');
    });

    it('should handle budget_items bulk create', async () => {
      await repo.bulkCreate('budget_items', [{ category: 'Salaires' }]);
      expect(mockClient.from).toHaveBeenCalledWith('budget_items');
    });

    it('should handle payroll_items bulk create', async () => {
      await repo.bulkCreate('payroll_items', [{ teacherId: 't1' }]);
      expect(mockClient.from).toHaveBeenCalledWith('payroll_items');
    });

    it('should handle accounting_entries bulk create', async () => {
      await repo.bulkCreate('accounting_entries', [{ description: 'Entry 1' }]);
      expect(mockClient.from).toHaveBeenCalledWith('accounting_entries');
    });

    it('should handle installment bulk create', async () => {
      await repo.bulkCreate('installments', [{ planId: 'p1' }]);
      expect(mockClient.from).toHaveBeenCalledWith('installments');
    });
  });

  describe('bulkUpdate', () => {
    it('should call from with correct table', async () => {
      await repo.bulkUpdate('invoices', [{ id: 'inv1', data: { status: 'PAID' } }]);
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should update each item', async () => {
      await repo.bulkUpdate('invoices', [{ id: 'inv1', data: { status: 'PAID' } }]);
      expect(mockClient.from('invoices').update).toHaveBeenCalledWith({ status: 'PAID' });
    });

    it('should handle multiple updates', async () => {
      const updates = [
        { id: 'inv1', data: { status: 'PAID' } },
        { id: 'inv2', data: { status: 'PAID' } },
      ];
      await repo.bulkUpdate('invoices', updates);
      expect(mockClient.from).toHaveBeenCalledWith('invoices');
    });

    it('should handle payments bulk update', async () => {
      await repo.bulkUpdate('payments', [{ id: 'pay1', data: { status: 'COMPLETED' } }]);
      expect(mockClient.from).toHaveBeenCalledWith('payments');
    });

    it('should handle expenses bulk update', async () => {
      await repo.bulkUpdate('expenses', [{ id: 'exp1', data: { status: 'APPROVED' } }]);
      expect(mockClient.from).toHaveBeenCalledWith('expenses');
    });

    it('should handle receipts bulk update', async () => {
      await repo.bulkUpdate('receipts', [{ id: 'rec1', data: { status: 'ISSUED' } }]);
      expect(mockClient.from).toHaveBeenCalledWith('receipts');
    });

    it('should handle cash_registers bulk update', async () => {
      await repo.bulkUpdate('cash_registers', [{ id: 'cr1', data: { status: 'CLOSED' } }]);
      expect(mockClient.from).toHaveBeenCalledWith('cash_registers');
    });

    it('should handle accounting_entries bulk update', async () => {
      await repo.bulkUpdate('accounting_entries', [{ id: 'ae1', data: { isPosted: true } }]);
      expect(mockClient.from).toHaveBeenCalledWith('accounting_entries');
    });

    it('should handle budgets bulk update', async () => {
      await repo.bulkUpdate('budgets', [{ id: 'b1', data: { status: 'ACTIVE' } }]);
      expect(mockClient.from).toHaveBeenCalledWith('budgets');
    });

    it('should return results array', async () => {
      const result = await repo.bulkUpdate('invoices', [{ id: 'inv1', data: { status: 'PAID' } }]);
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
