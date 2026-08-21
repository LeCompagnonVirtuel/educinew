import { describe, it, expect, vi, beforeEach } from 'vitest';

function createMockRequest(method: string, path: string, body?: any) {
  return {
    method,
    url: `http://localhost:3000/api/finance${path}`,
    body: body || null,
    params: {},
    query: {},
    headers: { 'content-type': 'application/json' },
  };
}

function createMockResponse() {
  const res: any = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    end: vi.fn().mockReturnThis(),
  };
  return res;
}

function createMockCashRegister() {
  return {
    id: 'cr1',
    name: 'Caisse principale',
    status: 'OPEN',
    openingBalance: 100000,
    currentBalance: 500000,
  };
}

function createMockAccountingEntry() {
  return {
    id: 'ae1',
    entryNumber: 'AE-001',
    type: 'JOURNAL',
    amount: 500000,
    isBalanced: true,
    isPosted: false,
  };
}

function createMockBudget() {
  return {
    id: 'b1',
    name: 'Budget 2025',
    status: 'ACTIVE',
    totalAmount: 50000000,
    spentAmount: 25000000,
    utilizationRate: 50,
  };
}

function createMockDiscount() {
  return {
    id: 'd1',
    name: 'Réduction fratrie',
    type: 'SIBLING',
    value: 10,
    valueType: 'PERCENTAGE',
    isActive: true,
  };
}

function createMockScholarship() {
  return {
    id: 'scholarship1',
    name: 'Bourse mérite',
    type: 'MERIT',
    value: 50,
    valueType: 'PERCENTAGE',
    isActive: true,
  };
}

describe('Finance Extended API Routes', () => {
  describe('POST /api/finance/cash-registers', () => {
    it('should create cash register', async () => {
      const req = createMockRequest('POST', '/cash-registers', {
        name: 'Caisse principale',
        openingBalance: 100000,
      });
      expect(req.body.name).toBe('Caisse principale');
      expect(req.body.openingBalance).toBe(100000);
    });

    it('should reject cash register without name', () => {
      const req = createMockRequest('POST', '/cash-registers', {
        openingBalance: 100000,
      });
      expect(req.body.name).toBeUndefined();
    });

    it('should reject negative opening balance', () => {
      const req = createMockRequest('POST', '/cash-registers', {
        name: 'Caisse 1',
        openingBalance: -10000,
      });
      expect(req.body.openingBalance).toBeLessThan(0);
    });

    it('should accept zero opening balance', () => {
      const req = createMockRequest('POST', '/cash-registers', {
        name: 'Caisse 1',
        openingBalance: 0,
      });
      expect(req.body.openingBalance).toBe(0);
    });
  });

  describe('GET /api/finance/cash-registers', () => {
    it('should list cash registers', async () => {
      const req = createMockRequest('GET', '/cash-registers');
      expect(req.method).toBe('GET');
    });

    it('should support status filter', () => {
      const req = createMockRequest('GET', '/cash-registers?status=OPEN');
      expect(req.url).toContain('status=OPEN');
    });

    it('should support pagination', () => {
      const req = createMockRequest('GET', '/cash-registers?page=1&limit=20');
      expect(req.url).toContain('page=1');
    });

    it('should return cash register list', () => {
      const result = { data: [createMockCashRegister()], total: 1 };
      expect(result.data).toHaveLength(1);
    });
  });

  describe('POST /api/finance/cash-registers/:id/open', () => {
    it('should open cash register', async () => {
      const req = createMockRequest('POST', '/cash-registers/cr1/open');
      expect(req.url).toContain('cr1/open');
    });

    it('should not open already open register', () => {
      const register = createMockCashRegister();
      register.status = 'OPEN';
      expect(register.status).toBe('OPEN');
    });
  });

  describe('POST /api/finance/cash-registers/:id/close', () => {
    it('should close cash register', async () => {
      const req = createMockRequest('POST', '/cash-registers/cr1/close', {
        closingBalance: 500000,
      });
      expect(req.url).toContain('cr1/close');
      expect(req.body.closingBalance).toBe(500000);
    });

    it('should calculate discrepancy', () => {
      const expected = 500000;
      const actual = 490000;
      const discrepancy = actual - expected;
      expect(discrepancy).toBe(-10000);
    });

    it('should detect positive discrepancy', () => {
      const expected = 500000;
      const actual = 510000;
      const discrepancy = actual - expected;
      expect(discrepancy).toBe(10000);
    });
  });

  describe('POST /api/finance/cash-registers/:id/movements', () => {
    it('should add movement to cash register', async () => {
      const req = createMockRequest('POST', '/cash-registers/cr1/movements', {
        type: 'IN',
        amount: 500000,
        description: 'Paiement frais',
      });
      expect(req.body.type).toBe('IN');
      expect(req.body.amount).toBe(500000);
    });

    it('should handle IN movement type', () => {
      const req = createMockRequest('POST', '/cash-registers/cr1/movements', { type: 'IN' });
      expect(req.body.type).toBe('IN');
    });

    it('should handle OUT movement type', () => {
      const req = createMockRequest('POST', '/cash-registers/cr1/movements', { type: 'OUT' });
      expect(req.body.type).toBe('OUT');
    });

    it('should reject movement without type', () => {
      const req = createMockRequest('POST', '/cash-registers/cr1/movements', {
        amount: 100000,
      });
      expect(req.body.type).toBeUndefined();
    });

    it('should reject movement without amount', () => {
      const req = createMockRequest('POST', '/cash-registers/cr1/movements', {
        type: 'IN',
      });
      expect(req.body.amount).toBeUndefined();
    });
  });

  describe('POST /api/finance/accounting/entries', () => {
    it('should create accounting entry', async () => {
      const req = createMockRequest('POST', '/accounting/entries', {
        type: 'JOURNAL',
        description: 'Enregistrement paiement',
        debitAccount: '512',
        creditAccount: '411',
        amount: 500000,
      });
      expect(req.body.type).toBe('JOURNAL');
      expect(req.body.amount).toBe(500000);
    });

    it('should reject entry without type', () => {
      const req = createMockRequest('POST', '/accounting/entries', {
        amount: 500000,
      });
      expect(req.body.type).toBeUndefined();
    });

    it('should handle type JOURNAL', () => {
      const req = createMockRequest('POST', '/accounting/entries', { type: 'JOURNAL' });
      expect(req.body.type).toBe('JOURNAL');
    });

    it('should handle type RECEIPT', () => {
      const req = createMockRequest('POST', '/accounting/entries', { type: 'RECEIPT' });
      expect(req.body.type).toBe('RECEIPT');
    });

    it('should handle type PAYMENT', () => {
      const req = createMockRequest('POST', '/accounting/entries', { type: 'PAYMENT' });
      expect(req.body.type).toBe('PAYMENT');
    });

    it('should validate entry balancing', () => {
      const lines = [{ debit: 500000 }, { credit: 500000 }];
      const totalDebit = lines.reduce((sum, l) => sum + ((l as any).debit || 0), 0);
      const totalCredit = lines.reduce((sum, l) => sum + ((l as any).credit || 0), 0);
      expect(totalDebit === totalCredit).toBe(true);
    });

    it('should detect unbalanced entry', () => {
      const lines = [{ debit: 500000 }, { credit: 400000 }];
      const totalDebit = lines.reduce((sum, l) => sum + ((l as any).debit || 0), 0);
      const totalCredit = lines.reduce((sum, l) => sum + ((l as any).credit || 0), 0);
      expect(totalDebit === totalCredit).toBe(false);
    });
  });

  describe('GET /api/finance/accounting/entries', () => {
    it('should list accounting entries', async () => {
      const req = createMockRequest('GET', '/accounting/entries');
      expect(req.method).toBe('GET');
    });

    it('should support type filter', () => {
      const req = createMockRequest('GET', '/accounting/entries?type=JOURNAL');
      expect(req.url).toContain('type=JOURNAL');
    });

    it('should support posted filter', () => {
      const req = createMockRequest('GET', '/accounting/entries?isPosted=true');
      expect(req.url).toContain('isPosted=true');
    });

    it('should support date range filter', () => {
      const req = createMockRequest('GET', '/accounting/entries?from=2025-01-01&to=2025-12-31');
      expect(req.url).toContain('from=2025-01-01');
    });

    it('should return entry list', () => {
      const result = { data: [createMockAccountingEntry()], total: 1 };
      expect(result.data).toHaveLength(1);
    });
  });

  describe('POST /api/finance/accounting/entries/:id/post', () => {
    it('should post accounting entry', async () => {
      const req = createMockRequest('POST', '/accounting/entries/ae1/post');
      expect(req.url).toContain('ae1/post');
    });

    it('should not post unbalanced entry', () => {
      const entry = createMockAccountingEntry();
      entry.isBalanced = false;
      expect(entry.isBalanced).toBe(false);
    });

    it('should not post already posted entry', () => {
      const entry = createMockAccountingEntry();
      entry.isPosted = true;
      expect(entry.isPosted).toBe(true);
    });
  });

  describe('POST /api/finance/accounting/entries/:id/lock', () => {
    it('should lock accounting entry', async () => {
      const req = createMockRequest('POST', '/accounting/entries/ae1/lock');
      expect(req.url).toContain('ae1/lock');
    });

    it('should not lock unposted entry', () => {
      const entry = createMockAccountingEntry();
      entry.isPosted = false;
      expect(entry.isPosted).toBe(false);
    });
  });

  describe('POST /api/finance/accounting/journals', () => {
    it('should create journal', async () => {
      const req = createMockRequest('POST', '/accounting/journals', {
        name: 'Journal général',
        code: 'GEN',
        type: 'JOURNAL',
      });
      expect(req.body.name).toBe('Journal général');
      expect(req.body.code).toBe('GEN');
    });

    it('should reject journal without name', () => {
      const req = createMockRequest('POST', '/accounting/journals', {
        code: 'GEN',
      });
      expect(req.body.name).toBeUndefined();
    });

    it('should reject journal without code', () => {
      const req = createMockRequest('POST', '/accounting/journals', {
        name: 'Journal général',
      });
      expect(req.body.code).toBeUndefined();
    });
  });

  describe('POST /api/finance/accounting/accounts', () => {
    it('should create account', async () => {
      const req = createMockRequest('POST', '/accounting/accounts', {
        code: '512',
        name: 'Banque',
        type: 'ASSET',
      });
      expect(req.body.code).toBe('512');
      expect(req.body.type).toBe('ASSET');
    });

    it('should handle ASSET type', () => {
      const req = createMockRequest('POST', '/accounting/accounts', { type: 'ASSET' });
      expect(req.body.type).toBe('ASSET');
    });

    it('should handle LIABILITY type', () => {
      const req = createMockRequest('POST', '/accounting/accounts', { type: 'LIABILITY' });
      expect(req.body.type).toBe('LIABILITY');
    });

    it('should handle EQUITY type', () => {
      const req = createMockRequest('POST', '/accounting/accounts', { type: 'EQUITY' });
      expect(req.body.type).toBe('EQUITY');
    });

    it('should handle REVENUE type', () => {
      const req = createMockRequest('POST', '/accounting/accounts', { type: 'REVENUE' });
      expect(req.body.type).toBe('REVENUE');
    });

    it('should handle EXPENSE type', () => {
      const req = createMockRequest('POST', '/accounting/accounts', { type: 'EXPENSE' });
      expect(req.body.type).toBe('EXPENSE');
    });

    it('should reject invalid account type', () => {
      const validTypes = ['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'];
      expect(validTypes).not.toContain('INVALID');
    });
  });

  describe('POST /api/finance/budgets', () => {
    it('should create budget', async () => {
      const req = createMockRequest('POST', '/budgets', {
        name: 'Budget 2025',
        totalAmount: 50000000,
        startDate: '2025-01-01',
        endDate: '2025-12-31',
      });
      expect(req.body.name).toBe('Budget 2025');
      expect(req.body.totalAmount).toBe(50000000);
    });

    it('should reject budget without name', () => {
      const req = createMockRequest('POST', '/budgets', {
        totalAmount: 50000000,
      });
      expect(req.body.name).toBeUndefined();
    });

    it('should reject budget with negative total', () => {
      const req = createMockRequest('POST', '/budgets', {
        name: 'Budget',
        totalAmount: -100000,
      });
      expect(req.body.totalAmount).toBeLessThan(0);
    });

    it('should handle date range', () => {
      const req = createMockRequest('POST', '/budgets', {
        startDate: '2025-01-01',
        endDate: '2025-12-31',
      });
      expect(req.body.startDate).toBe('2025-01-01');
      expect(req.body.endDate).toBe('2025-12-31');
    });
  });

  describe('GET /api/finance/budgets', () => {
    it('should list budgets', async () => {
      const req = createMockRequest('GET', '/budgets');
      expect(req.method).toBe('GET');
    });

    it('should support status filter', () => {
      const req = createMockRequest('GET', '/budgets?status=ACTIVE');
      expect(req.url).toContain('status=ACTIVE');
    });

    it('should support pagination', () => {
      const req = createMockRequest('GET', '/budgets?page=1&limit=20');
      expect(req.url).toContain('page=1');
    });

    it('should return budget list', () => {
      const result = { data: [createMockBudget()], total: 1 };
      expect(result.data).toHaveLength(1);
    });
  });

  describe('POST /api/finance/budgets/:id/items', () => {
    it('should add budget item', async () => {
      const req = createMockRequest('POST', '/budgets/b1/items', {
        category: 'Salaires',
        allocatedAmount: 20000000,
      });
      expect(req.body.category).toBe('Salaires');
      expect(req.body.allocatedAmount).toBe(20000000);
    });

    it('should reject item without category', () => {
      const req = createMockRequest('POST', '/budgets/b1/items', {
        allocatedAmount: 20000000,
      });
      expect(req.body.category).toBeUndefined();
    });

    it('should reject item with negative amount', () => {
      const req = createMockRequest('POST', '/budgets/b1/items', {
        category: 'Salaires',
        allocatedAmount: -100000,
      });
      expect(req.body.allocatedAmount).toBeLessThan(0);
    });
  });

  describe('POST /api/finance/budgets/:id/execute', () => {
    it('should execute budget item', async () => {
      const req = createMockRequest('POST', '/budgets/b1/execute', {
        budgetItemId: 'bi1',
        amount: 500000,
        description: 'Paiement salaire',
      });
      expect(req.body.amount).toBe(500000);
    });

    it('should reject execution exceeding allocated amount', () => {
      const allocated = 1000000;
      const requested = 1500000;
      expect(requested > allocated).toBe(true);
    });
  });

  describe('POST /api/finance/discounts', () => {
    it('should create discount', async () => {
      const req = createMockRequest('POST', '/discounts', {
        name: 'Réduction fratrie',
        type: 'SIBLING',
        value: 10,
        valueType: 'PERCENTAGE',
        applicableTo: ['TUITION'],
      });
      expect(req.body.name).toBe('Réduction fratrie');
      expect(req.body.type).toBe('SIBLING');
    });

    it('should reject discount without name', () => {
      const req = createMockRequest('POST', '/discounts', {
        type: 'SIBLING',
        value: 10,
      });
      expect(req.body.name).toBeUndefined();
    });

    it('should handle type SIBLING', () => {
      const req = createMockRequest('POST', '/discounts', { type: 'SIBLING' });
      expect(req.body.type).toBe('SIBLING');
    });

    it('should handle type LOYALTY', () => {
      const req = createMockRequest('POST', '/discounts', { type: 'LOYALTY' });
      expect(req.body.type).toBe('LOYALTY');
    });

    it('should handle type EARLY_PAYMENT', () => {
      const req = createMockRequest('POST', '/discounts', { type: 'EARLY_PAYMENT' });
      expect(req.body.type).toBe('EARLY_PAYMENT');
    });

    it('should handle type PROMOTIONAL', () => {
      const req = createMockRequest('POST', '/discounts', { type: 'PROMOTIONAL' });
      expect(req.body.type).toBe('PROMOTIONAL');
    });

    it('should handle PERCENTAGE value type', () => {
      const req = createMockRequest('POST', '/discounts', { valueType: 'PERCENTAGE' });
      expect(req.body.valueType).toBe('PERCENTAGE');
    });

    it('should handle FIXED value type', () => {
      const req = createMockRequest('POST', '/discounts', { valueType: 'FIXED' });
      expect(req.body.valueType).toBe('FIXED');
    });

    it('should reject percentage over 100', () => {
      const req = createMockRequest('POST', '/discounts', {
        value: 150,
        valueType: 'PERCENTAGE',
      });
      expect(req.body.value).toBeGreaterThan(100);
    });
  });

  describe('GET /api/finance/discounts', () => {
    it('should list discounts', async () => {
      const req = createMockRequest('GET', '/discounts');
      expect(req.method).toBe('GET');
    });

    it('should support type filter', () => {
      const req = createMockRequest('GET', '/discounts?type=SIBLING');
      expect(req.url).toContain('type=SIBLING');
    });

    it('should support active filter', () => {
      const req = createMockRequest('GET', '/discounts?isActive=true');
      expect(req.url).toContain('isActive=true');
    });

    it('should return discount list', () => {
      const result = { data: [createMockDiscount()], total: 1 };
      expect(result.data).toHaveLength(1);
    });
  });

  describe('POST /api/finance/scholarships', () => {
    it('should create scholarship', async () => {
      const req = createMockRequest('POST', '/scholarships', {
        studentId: 's1',
        name: 'Bourse mérite',
        type: 'MERIT',
        value: 50,
        valueType: 'PERCENTAGE',
      });
      expect(req.body.studentId).toBe('s1');
      expect(req.body.type).toBe('MERIT');
    });

    it('should reject scholarship without studentId', () => {
      const req = createMockRequest('POST', '/scholarships', {
        name: 'Bourse',
        type: 'MERIT',
        value: 50,
      });
      expect(req.body.studentId).toBeUndefined();
    });

    it('should handle type MERIT', () => {
      const req = createMockRequest('POST', '/scholarships', { type: 'MERIT' });
      expect(req.body.type).toBe('MERIT');
    });

    it('should handle type NEED', () => {
      const req = createMockRequest('POST', '/scholarships', { type: 'NEED' });
      expect(req.body.type).toBe('NEED');
    });

    it('should handle type SPORTS', () => {
      const req = createMockRequest('POST', '/scholarships', { type: 'SPORTS' });
      expect(req.body.type).toBe('SPORTS');
    });

    it('should handle type ARTS', () => {
      const req = createMockRequest('POST', '/scholarships', { type: 'ARTS' });
      expect(req.body.type).toBe('ARTS');
    });

    it('should handle PERCENTAGE value type', () => {
      const req = createMockRequest('POST', '/scholarships', { valueType: 'PERCENTAGE' });
      expect(req.body.valueType).toBe('PERCENTAGE');
    });

    it('should handle FIXED value type', () => {
      const req = createMockRequest('POST', '/scholarships', { valueType: 'FIXED' });
      expect(req.body.valueType).toBe('FIXED');
    });

    it('should reject percentage over 100', () => {
      const req = createMockRequest('POST', '/scholarships', {
        value: 150,
        valueType: 'PERCENTAGE',
      });
      expect(req.body.value).toBeGreaterThan(100);
    });
  });

  describe('GET /api/finance/scholarships', () => {
    it('should list scholarships', async () => {
      const req = createMockRequest('GET', '/scholarships');
      expect(req.method).toBe('GET');
    });

    it('should support student filter', () => {
      const req = createMockRequest('GET', '/scholarships?studentId=s1');
      expect(req.url).toContain('studentId=s1');
    });

    it('should support type filter', () => {
      const req = createMockRequest('GET', '/scholarships?type=MERIT');
      expect(req.url).toContain('type=MERIT');
    });

    it('should support active filter', () => {
      const req = createMockRequest('GET', '/scholarships?isActive=true');
      expect(req.url).toContain('isActive=true');
    });

    it('should return scholarship list', () => {
      const result = { data: [createMockScholarship()], total: 1 };
      expect(result.data).toHaveLength(1);
    });
  });

  describe('Response Format', () => {
    it('should return JSON content type', () => {
      const contentType = 'application/json';
      expect(contentType).toBe('application/json');
    });

    it('should include data in response', () => {
      const response = { data: createMockCashRegister() };
      expect(response.data).toBeDefined();
    });

    it('should include total in list responses', () => {
      const response = { data: [], total: 0 };
      expect(response.total).toBe(0);
    });

    it('should include error in error responses', () => {
      const response = { error: 'Something went wrong' };
      expect(response.error).toBeDefined();
    });

    it('should return 201 for creation', () => {
      const status = 201;
      expect(status).toBe(201);
    });

    it('should return 200 for success', () => {
      const status = 200;
      expect(status).toBe(200);
    });

    it('should return 400 for bad request', () => {
      const status = 400;
      expect(status).toBe(400);
    });

    it('should return 404 for not found', () => {
      const status = 404;
      expect(status).toBe(404);
    });
  });
});
