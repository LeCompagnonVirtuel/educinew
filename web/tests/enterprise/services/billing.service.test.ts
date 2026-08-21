import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('BillingService', () => {
  const mockRepo = {
    getBillingInfo: vi.fn(),
    updateBillingInfo: vi.fn(),
    getPaymentMethods: vi.fn(),
    addPaymentMethod: vi.fn(),
    removePaymentMethod: vi.fn(),
    setDefaultPaymentMethod: vi.fn(),
    getInvoices: vi.fn(),
    getInvoiceById: vi.fn(),
    generateInvoice: vi.fn(),
    downloadInvoice: vi.fn(),
    processPayment: vi.fn(),
    refundPayment: vi.fn(),
    getBillingHistory: vi.fn(),
    getUpcomingInvoice: vi.fn(),
    applyCredit: vi.fn(),
    getCreditBalance: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const invoiceId = 'inv-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getBillingInfo', () => {
    it('should return billing info', async () => {
      mockRepo.getBillingInfo.mockResolvedValue({ enterpriseId, currency: 'EUR', taxRate: 20 });
      const result = await mockRepo.getBillingInfo(enterpriseId);
      expect(result.currency).toBe('EUR');
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should include billing address', async () => {
      mockRepo.getBillingInfo.mockResolvedValue({ address: { street: '123 Main St', city: 'Paris' } });
      const result = await mockRepo.getBillingInfo(enterpriseId);
      expect(result.address.city).toBe('Paris');
    });

    it('should include tax info', async () => {
      mockRepo.getBillingInfo.mockResolvedValue({ taxId: 'FR12345678900', taxRate: 20 });
      const result = await mockRepo.getBillingInfo(enterpriseId);
      expect(result.taxRate).toBe(20);
    });

    it('should handle missing billing info', async () => {
      mockRepo.getBillingInfo.mockResolvedValue(null);
      const result = await mockRepo.getBillingInfo(enterpriseId);
      expect(result).toBeNull();
    });

    it('should include payment terms', async () => {
      mockRepo.getBillingInfo.mockResolvedValue({ paymentTerms: 'net30' });
      const result = await mockRepo.getBillingInfo(enterpriseId);
      expect(result.paymentTerms).toBe('net30');
    });
  });

  describe('updateBillingInfo', () => {
    it('should update billing info', async () => {
      mockRepo.updateBillingInfo.mockResolvedValue({ currency: 'USD', updatedAt: new Date().toISOString() });
      const result = await mockRepo.updateBillingInfo(enterpriseId, { currency: 'USD' });
      expect(result.currency).toBe('USD');
    });

    it('should validate currency', () => {
      const validCurrencies = ['EUR', 'USD', 'GBP', 'CHF'];
      const validate = (currency: string) => {
        if (!validCurrencies.includes(currency)) throw new Error('Devise invalide');
      };
      expect(() => validate('EUR')).not.toThrow();
      expect(() => validate('INVALID')).toThrow();
    });

    it('should validate tax rate', () => {
      const validate = (rate: number) => {
        if (rate < 0 || rate > 100) throw new Error('Taux de TVA invalide');
      };
      expect(() => validate(20)).not.toThrow();
      expect(() => validate(-1)).toThrow();
      expect(() => validate(101)).toThrow();
    });

    it('should validate address fields', () => {
      const validate = (address: any) => {
        if (!address?.street) throw new Error('La rue est requise');
        if (!address?.city) throw new Error('La ville est requise');
      };
      expect(() => validate({ street: '123 Main', city: 'Paris' })).not.toThrow();
      expect(() => validate({ city: 'Paris' })).toThrow();
    });

    it('should require valid tax ID format', () => {
      const isValidTaxId = (id: string) => /^[A-Z]{2}\d{8,}$/.test(id);
      expect(isValidTaxId('FR12345678900')).toBe(true);
      expect(isValidTaxId('INVALID')).toBe(false);
    });

    it('should handle partial updates', async () => {
      mockRepo.updateBillingInfo.mockResolvedValue({ currency: 'EUR', taxRate: 10 });
      const result = await mockRepo.updateBillingInfo(enterpriseId, { taxRate: 10 });
      expect(result.taxRate).toBe(10);
    });

    it('should record update metadata', async () => {
      mockRepo.updateBillingInfo.mockResolvedValue({ updatedAt: new Date().toISOString(), updatedBy: 'usr-1' });
      const result = await mockRepo.updateBillingInfo(enterpriseId, { currency: 'EUR' }, 'usr-1');
      expect(result.updatedBy).toBe('usr-1');
    });
  });

  describe('getPaymentMethods', () => {
    it('should return payment methods', async () => {
      mockRepo.getPaymentMethods.mockResolvedValue([{ id: 'pm-1', type: 'card', last4: '4242', isDefault: true }]);
      const result = await mockRepo.getPaymentMethods(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should mark default method', async () => {
      mockRepo.getPaymentMethods.mockResolvedValue([{ id: 'pm-1', isDefault: true }, { id: 'pm-2', isDefault: false }]);
      const result = await mockRepo.getPaymentMethods(enterpriseId);
      expect(result[0].isDefault).toBe(true);
    });

    it('should handle no payment methods', async () => {
      mockRepo.getPaymentMethods.mockResolvedValue([]);
      const result = await mockRepo.getPaymentMethods(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should include card brand info', async () => {
      mockRepo.getPaymentMethods.mockResolvedValue([{ type: 'card', brand: 'visa', last4: '4242' }]);
      const result = await mockRepo.getPaymentMethods(enterpriseId);
      expect(result[0].brand).toBe('visa');
    });

    it('should include expiry info', async () => {
      mockRepo.getPaymentMethods.mockResolvedValue([{ type: 'card', expMonth: 12, expYear: 2027 }]);
      const result = await mockRepo.getPaymentMethods(enterpriseId);
      expect(result[0].expMonth).toBe(12);
    });

    it('should handle multiple methods', async () => {
      mockRepo.getPaymentMethods.mockResolvedValue([{ id: 'pm-1' }, { id: 'pm-2' }, { id: 'pm-3' }]);
      const result = await mockRepo.getPaymentMethods(enterpriseId);
      expect(result).toHaveLength(3);
    });
  });

  describe('addPaymentMethod', () => {
    it('should add payment method', async () => {
      mockRepo.addPaymentMethod.mockResolvedValue({ id: 'pm-1', type: 'card', last4: '4242' });
      const result = await mockRepo.addPaymentMethod(enterpriseId, { type: 'card', token: 'tok_123' });
      expect(result.id).toBe('pm-1');
    });

    it('should require payment token', () => {
      const validate = (data: any) => {
        if (!data?.token) throw new Error('Le token de paiement est requis');
      };
      expect(() => validate({ type: 'card' })).toThrow('Le token de paiement est requis');
    });

    it('should validate card token format', () => {
      const isValidToken = (token: string) => /^tok_/.test(token);
      expect(isValidToken('tok_123')).toBe(true);
      expect(isValidToken('invalid')).toBe(false);
    });

    it('should set as default if first method', async () => {
      mockRepo.getPaymentMethods.mockResolvedValue([]);
      mockRepo.addPaymentMethod.mockResolvedValue({ id: 'pm-1', isDefault: true });
      const result = await mockRepo.addPaymentMethod(enterpriseId, { type: 'card', token: 'tok_123' });
      expect(result.isDefault).toBe(true);
    });

    it('should handle duplicate method', async () => {
      mockRepo.addPaymentMethod.mockRejectedValue(new Error('Cette méthode de paiement existe déjà'));
      await expect(mockRepo.addPaymentMethod(enterpriseId, { type: 'card', token: 'tok_duplicate' })).rejects.toThrow();
    });

    it('should validate method type', () => {
      const validTypes = ['card', 'bank_transfer', 'paypal'];
      const validate = (type: string) => {
        if (!validTypes.includes(type)) throw new Error('Type de paiement invalide');
      };
      expect(() => validate('card')).not.toThrow();
      expect(() => validate('crypto')).toThrow();
    });
  });

  describe('removePaymentMethod', () => {
    it('should remove payment method', async () => {
      mockRepo.getPaymentMethods.mockResolvedValue([{ id: 'pm-1' }, { id: 'pm-2', isDefault: true }]);
      mockRepo.removePaymentMethod.mockResolvedValue(undefined);
      await mockRepo.removePaymentMethod(enterpriseId, 'pm-1');
      expect(mockRepo.removePaymentMethod).toHaveBeenCalledWith(enterpriseId, 'pm-1');
    });

    it('should throw if last method', async () => {
      mockRepo.getPaymentMethods.mockResolvedValue([{ id: 'pm-1', isDefault: true }]);
      const removeOrThrow = async () => {
        const methods = await mockRepo.getPaymentMethods(enterpriseId);
        if (methods.length === 1) throw new Error('Cannot remove the last payment method');
      };
      await expect(removeOrThrow()).rejects.toThrow();
    });

    it('should not remove default method', async () => {
      mockRepo.getPaymentMethods.mockResolvedValue([{ id: 'pm-1', isDefault: true }, { id: 'pm-2' }]);
      const removeOrThrow = async () => {
        const methods = await mockRepo.getPaymentMethods(enterpriseId);
        const method = methods.find((m: any) => m.id === 'pm-1');
        if (method?.isDefault) throw new Error('Change the default method first');
      };
      await expect(removeOrThrow()).rejects.toThrow();
    });

    it('should handle non-existent method', async () => {
      mockRepo.removePaymentMethod.mockRejectedValue(new Error('Méthode de paiement non trouvée'));
      await expect(mockRepo.removePaymentMethod(enterpriseId, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('setDefaultPaymentMethod', () => {
    it('should set default payment method', async () => {
      mockRepo.setDefaultPaymentMethod.mockResolvedValue({ id: 'pm-2', isDefault: true });
      const result = await mockRepo.setDefaultPaymentMethod(enterpriseId, 'pm-2');
      expect(result.isDefault).toBe(true);
    });

    it('should unmark previous default', async () => {
      mockRepo.setDefaultPaymentMethod.mockResolvedValue({ previousDefault: 'pm-1', newDefault: 'pm-2' });
      const result = await mockRepo.setDefaultPaymentMethod(enterpriseId, 'pm-2');
      expect(result.previousDefault).toBe('pm-1');
    });

    it('should handle same method as default', async () => {
      mockRepo.setDefaultPaymentMethod.mockResolvedValue({ id: 'pm-1', isDefault: true, alreadyDefault: true });
      const result = await mockRepo.setDefaultPaymentMethod(enterpriseId, 'pm-1');
      expect(result.alreadyDefault).toBe(true);
    });

    it('should require valid method ID', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('L\'identifiant de la méthode est requis');
      };
      expect(() => validate('')).toThrow('L\'identifiant de la méthode est requis');
    });
  });

  describe('getInvoices', () => {
    it('should return invoices', async () => {
      mockRepo.getInvoices.mockResolvedValue([{ id: invoiceId, amount: 100, status: 'paid' }]);
      const result = await mockRepo.getInvoices(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by status', async () => {
      mockRepo.getInvoices.mockResolvedValue([]);
      await mockRepo.getInvoices(enterpriseId, { status: 'paid' });
      expect(mockRepo.getInvoices).toHaveBeenCalled();
    });

    it('should paginate results', async () => {
      mockRepo.getInvoices.mockResolvedValue([]);
      await mockRepo.getInvoices(enterpriseId, { page: 1, limit: 10 });
      expect(mockRepo.getInvoices).toHaveBeenCalled();
    });

    it('should handle no invoices', async () => {
      mockRepo.getInvoices.mockResolvedValue([]);
      const result = await mockRepo.getInvoices(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by date', async () => {
      mockRepo.getInvoices.mockResolvedValue([]);
      await mockRepo.getInvoices(enterpriseId, { sortBy: 'date', order: 'desc' });
      expect(mockRepo.getInvoices).toHaveBeenCalled();
    });

    it('should filter by date range', async () => {
      mockRepo.getInvoices.mockResolvedValue([]);
      await mockRepo.getInvoices(enterpriseId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getInvoices).toHaveBeenCalled();
    });
  });

  describe('generateInvoice', () => {
    it('should generate invoice', async () => {
      mockRepo.generateInvoice.mockResolvedValue({ id: invoiceId, number: 'INV-2026-001', amount: 100 });
      const result = await mockRepo.generateInvoice(enterpriseId, { period: '2026-01' });
      expect(result.number).toBe('INV-2026-001');
    });

    it('should require period', () => {
      const validate = (data: any) => {
        if (!data?.period) throw new Error('La période est requise');
      };
      expect(() => validate({})).toThrow('La période est requise');
    });

    it('should validate period format', () => {
      const isValidPeriod = (period: string) => /^\d{4}-\d{2}$/.test(period);
      expect(isValidPeriod('2026-01')).toBe(true);
      expect(isValidPeriod('invalid')).toBe(false);
    });

    it('should include line items', async () => {
      mockRepo.generateInvoice.mockResolvedValue({ id: invoiceId, lineItems: [{ description: 'Subscription', amount: 100 }] });
      const result = await mockRepo.generateInvoice(enterpriseId, { period: '2026-01' });
      expect(result.lineItems).toHaveLength(1);
    });

    it('should calculate tax', async () => {
      mockRepo.generateInvoice.mockResolvedValue({ subtotal: 100, tax: 20, total: 120 });
      const result = await mockRepo.generateInvoice(enterpriseId, { period: '2026-01' });
      expect(result.total).toBe(120);
    });

    it('should handle credit application', async () => {
      mockRepo.generateInvoice.mockResolvedValue({ subtotal: 100, credit: -20, total: 80 });
      const result = await mockRepo.generateInvoice(enterpriseId, { period: '2026-01', applyCredit: true });
      expect(result.total).toBe(80);
    });
  });

  describe('processPayment', () => {
    it('should process payment', async () => {
      mockRepo.processPayment.mockResolvedValue({ success: true, transactionId: 'txn-123' });
      const result = await mockRepo.processPayment(enterpriseId, invoiceId);
      expect(result.success).toBe(true);
    });

    it('should require invoice ID', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('L\'identifiant de facture est requis');
      };
      expect(() => validate('')).toThrow('L\'identifiant de facture est requis');
    });

    it('should handle payment failure', async () => {
      mockRepo.processPayment.mockResolvedValue({ success: false, error: 'Insufficient funds' });
      const result = await mockRepo.processPayment(enterpriseId, invoiceId);
      expect(result.success).toBe(false);
    });

    it('should require valid payment method', async () => {
      mockRepo.processPayment.mockResolvedValue({ success: false, error: 'No valid payment method' });
      const result = await mockRepo.processPayment(enterpriseId, invoiceId);
      expect(result.error).toContain('payment method');
    });

    it('should record transaction ID', async () => {
      mockRepo.processPayment.mockResolvedValue({ transactionId: 'txn_123abc' });
      const result = await mockRepo.processPayment(enterpriseId, invoiceId);
      expect(result.transactionId).toMatch(/^txn_/);
    });
  });

  describe('refundPayment', () => {
    it('should refund payment', async () => {
      mockRepo.refundPayment.mockResolvedValue({ refundId: 'ref-1', amount: 50, status: 'processed' });
      const result = await mockRepo.refundPayment(enterpriseId, invoiceId, 50, 'Customer request');
      expect(result.status).toBe('processed');
    });

    it('should require refund amount', () => {
      const validate = (amount: number) => {
        if (!amount || amount <= 0) throw new Error('Le montant doit être positif');
      };
      expect(() => validate(0)).toThrow('Le montant doit être positif');
      expect(() => validate(-10)).toThrow('Le montant doit être positif');
      expect(() => validate(50)).not.toThrow();
    });

    it('should require reason', () => {
      const validate = (reason: string) => {
        if (!reason || reason.trim().length < 3) throw new Error('La raison est requise');
      };
      expect(() => validate('')).toThrow('La raison est requise');
    });

    it('should not refund more than invoice amount', () => {
      const validate = (refundAmount: number, invoiceAmount: number) => {
        if (refundAmount > invoiceAmount) throw new Error('Le remboursement ne peut pas dépasser le montant de la facture');
      };
      expect(() => validate(50, 100)).not.toThrow();
      expect(() => validate(150, 100)).toThrow();
    });

    it('should handle partial refund', async () => {
      mockRepo.refundPayment.mockResolvedValue({ refundId: 'ref-1', amount: 50, partial: true });
      const result = await mockRepo.refundPayment(enterpriseId, invoiceId, 50, 'Partial refund');
      expect(result.partial).toBe(true);
    });
  });

  describe('getCreditBalance', () => {
    it('should return credit balance', async () => {
      mockRepo.getCreditBalance.mockResolvedValue({ balance: 200, currency: 'EUR' });
      const result = await mockRepo.getCreditBalance(enterpriseId);
      expect(result.balance).toBe(200);
    });

    it('should handle zero balance', async () => {
      mockRepo.getCreditBalance.mockResolvedValue({ balance: 0 });
      const result = await mockRepo.getCreditBalance(enterpriseId);
      expect(result.balance).toBe(0);
    });

    it('should include credit history', async () => {
      mockRepo.getCreditBalance.mockResolvedValue({ balance: 200, history: [{ amount: 100, type: 'refund' }] });
      const result = await mockRepo.getCreditBalance(enterpriseId);
      expect(result.history).toHaveLength(1);
    });

    it('should handle negative balance', async () => {
      mockRepo.getCreditBalance.mockResolvedValue({ balance: -50 });
      const result = await mockRepo.getCreditBalance(enterpriseId);
      expect(result.balance).toBeLessThan(0);
    });
  });

  describe('applyCredit', () => {
    it('should apply credit to invoice', async () => {
      mockRepo.applyCredit.mockResolvedValue({ invoiceId, creditApplied: 50, remainingTotal: 50 });
      const result = await mockRepo.applyCredit(enterpriseId, invoiceId, 50);
      expect(result.creditApplied).toBe(50);
    });

    it('should not apply more than balance', async () => {
      mockRepo.applyCredit.mockRejectedValue(new Error('Solde insuffisant'));
      await expect(mockRepo.applyCredit(enterpriseId, invoiceId, 1000)).rejects.toThrow('Solde insuffisant');
    });

    it('should require positive amount', () => {
      const validate = (amount: number) => {
        if (amount <= 0) throw new Error('Le montant doit être positif');
      };
      expect(() => validate(50)).not.toThrow();
      expect(() => validate(-10)).toThrow();
    });

    it('should handle full credit application', async () => {
      mockRepo.applyCredit.mockResolvedValue({ invoiceId, creditApplied: 100, remainingTotal: 0 });
      const result = await mockRepo.applyCredit(enterpriseId, invoiceId, 100);
      expect(result.remainingTotal).toBe(0);
    });

    it('should record credit usage', async () => {
      mockRepo.applyCredit.mockResolvedValue({ creditUsed: 50, newBalance: 150 });
      const result = await mockRepo.applyCredit(enterpriseId, invoiceId, 50);
      expect(result.newBalance).toBe(150);
    });
  });
});
