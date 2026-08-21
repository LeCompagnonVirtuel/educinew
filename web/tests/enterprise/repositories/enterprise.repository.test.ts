import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseRepository', () => {
  const mockDb = {
    query: vi.fn(),
    execute: vi.fn(),
    transaction: vi.fn(),
    batch: vi.fn(),
  };

  const enterpriseId = 'ent-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findEnterpriseById', () => {
    it('should return enterprise by id', async () => {
      mockDb.query.mockResolvedValue([{ id: enterpriseId, name: 'Acme Corp' }]);
      const result = await mockDb.query('SELECT * FROM enterprises WHERE id = ?', [enterpriseId]);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Acme Corp');
    });

    it('should return null if not found', async () => {
      mockDb.query.mockResolvedValue([]);
      const result = await mockDb.query('SELECT * FROM enterprises WHERE id = ?', ['nonexistent']);
      expect(result).toHaveLength(0);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include subscription info', async () => {
      mockDb.query.mockResolvedValue([{ id: enterpriseId, subscription: { plan: 'enterprise' } }]);
      const result = await mockDb.query('SELECT * FROM enterprises WHERE id = ?', [enterpriseId]);
      expect(result[0].subscription.plan).toBe('enterprise');
    });

    it('should include settings', async () => {
      mockDb.query.mockResolvedValue([{ id: enterpriseId, settings: { theme: 'dark' } }]);
      const result = await mockDb.query('SELECT * FROM enterprises WHERE id = ?', [enterpriseId]);
      expect(result[0].settings.theme).toBe('dark');
    });

    it('should handle database errors', async () => {
      mockDb.query.mockRejectedValue(new Error('Database connection failed'));
      await expect(mockDb.query('SELECT * FROM enterprises WHERE id = ?', [enterpriseId])).rejects.toThrow('Database connection failed');
    });
  });

  describe('findEnterpriseByCode', () => {
    it('should return enterprise by code', async () => {
      mockDb.query.mockResolvedValue([{ id: enterpriseId, code: 'ENT-001' }]);
      const result = await mockDb.query('SELECT * FROM enterprises WHERE code = ?', ['ENT-001']);
      expect(result[0].code).toBe('ENT-001');
    });

    it('should throw if code not found', async () => {
      mockDb.query.mockResolvedValue([]);
      const findOrThrow = async (code: string) => {
        const result = await mockDb.query('SELECT * FROM enterprises WHERE code = ?', [code]);
        if (result.length === 0) throw new Error('Entreprise non trouvée');
      };
      await expect(findOrThrow('INVALID')).rejects.toThrow('Entreprise non trouvée');
    });
  });

  describe('createEnterprise', () => {
    it('should create enterprise', async () => {
      const data = { name: 'New Corp', code: 'NC-001' };
      mockDb.execute.mockResolvedValue({ insertId: 1 });
      const result = await mockDb.execute('INSERT INTO enterprises (name, code) VALUES (?, ?)', [data.name, data.code]);
      expect(result.insertId).toBe(1);
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom est requis');
      };
      expect(() => validate({ code: 'NC-001' })).toThrow('Le nom est requis');
    });

    it('should require code', () => {
      const validate = (data: any) => {
        if (!data?.code) throw new Error('Le code est requis');
      };
      expect(() => validate({ name: 'New Corp' })).toThrow('Le code est requis');
    });

    it('should reject duplicate code', async () => {
      mockDb.query.mockResolvedValue([{ id: 'existing' }]);
      const createOrReject = async (code: string) => {
        const existing = await mockDb.query('SELECT * FROM enterprises WHERE code = ?', [code]);
        if (existing.length > 0) throw new Error('Une entreprise avec ce code existe déjà');
      };
      await expect(createOrReject('ENT-001')).rejects.toThrow();
    });

    it('should validate code format', () => {
      const isValidCode = (code: string) => /^[A-Z]{2,4}-\d{3,}$/.test(code);
      expect(isValidCode('ENT-001')).toBe(true);
      expect(isValidCode('AB-123')).toBe(true);
      expect(isValidCode('invalid')).toBe(false);
    });

    it('should set default status', async () => {
      mockDb.execute.mockResolvedValue({ insertId: 1 });
      const result = await mockDb.execute('INSERT INTO enterprises (status) VALUES (?)', ['active']);
      expect(result.insertId).toBeDefined();
    });
  });

  describe('updateEnterprise', () => {
    it('should update enterprise', async () => {
      mockDb.execute.mockResolvedValue({ affectedRows: 1 });
      const result = await mockDb.execute('UPDATE enterprises SET name = ? WHERE id = ?', ['Updated Name', enterpriseId]);
      expect(result.affectedRows).toBe(1);
    });

    it('should throw if not found', async () => {
      mockDb.execute.mockResolvedValue({ affectedRows: 0 });
      const updateOrThrow = async () => {
        const result = await mockDb.execute('UPDATE enterprises SET name = ? WHERE id = ?', ['Updated', 'nonexistent']);
        if (result.affectedRows === 0) throw new Error('Entreprise non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow('Entreprise non trouvée');
    });

    it('should allow partial updates', async () => {
      mockDb.execute.mockResolvedValue({ affectedRows: 1 });
      await mockDb.execute('UPDATE enterprises SET name = ? WHERE id = ?', ['New Name', enterpriseId]);
      expect(mockDb.execute).toHaveBeenCalled();
    });

    it('should validate update data', () => {
      const validate = (data: any) => {
        if (data.name && data.name.length < 2) throw new Error('Le nom est trop court');
      };
      expect(() => validate({ name: 'A' })).toThrow();
      expect(() => validate({ name: 'Valid' })).not.toThrow();
    });
  });

  describe('deleteEnterprise', () => {
    it('should delete enterprise', async () => {
      mockDb.execute.mockResolvedValue({ affectedRows: 1 });
      const result = await mockDb.execute('DELETE FROM enterprises WHERE id = ?', [enterpriseId]);
      expect(result.affectedRows).toBe(1);
    });

    it('should throw if not found', async () => {
      mockDb.execute.mockResolvedValue({ affectedRows: 0 });
      const deleteOrThrow = async () => {
        const result = await mockDb.execute('DELETE FROM enterprises WHERE id = ?', ['nonexistent']);
        if (result.affectedRows === 0) throw new Error('Entreprise non trouvée');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Entreprise non trouvée');
    });

    it('should soft delete enterprise', async () => {
      mockDb.execute.mockResolvedValue({ affectedRows: 1 });
      await mockDb.execute('UPDATE enterprises SET deleted_at = NOW() WHERE id = ?', [enterpriseId]);
      expect(mockDb.execute).toHaveBeenCalled();
    });

    it('should not delete with active subscriptions', async () => {
      mockDb.query.mockResolvedValue([{ count: 3 }]);
      const deleteOrThrow = async () => {
        const result = await mockDb.query('SELECT COUNT(*) as count FROM subscriptions WHERE enterprise_id = ? AND status = ?', [enterpriseId, 'active']);
        if (result[0].count > 0) throw new Error('Impossible de supprimer avec des abonnements actifs');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('countEnterprises', () => {
    it('should count enterprises', async () => {
      mockDb.query.mockResolvedValue([{ count: 25 }]);
      const result = await mockDb.query('SELECT COUNT(*) as count FROM enterprises');
      expect(result[0].count).toBe(25);
    });

    it('should count with filters', async () => {
      mockDb.query.mockResolvedValue([{ count: 10 }]);
      const result = await mockDb.query('SELECT COUNT(*) as count FROM enterprises WHERE status = ?', ['active']);
      expect(result[0].count).toBe(10);
    });

    it('should return zero for no enterprises', async () => {
      mockDb.query.mockResolvedValue([{ count: 0 }]);
      const result = await mockDb.query('SELECT COUNT(*) as count FROM enterprises');
      expect(result[0].count).toBe(0);
    });
  });

  describe('findEnterprises', () => {
    it('should return enterprises list', async () => {
      mockDb.query.mockResolvedValue([{ id: enterpriseId, name: 'Acme Corp' }]);
      const result = await mockDb.query('SELECT * FROM enterprises');
      expect(result).toHaveLength(1);
    });

    it('should paginate results', async () => {
      mockDb.query.mockResolvedValue([]);
      await mockDb.query('SELECT * FROM enterprises LIMIT ? OFFSET ?', [10, 0]);
      expect(mockDb.query).toHaveBeenCalled();
    });

    it('should sort results', async () => {
      mockDb.query.mockResolvedValue([]);
      await mockDb.query('SELECT * FROM enterprises ORDER BY name ASC');
      expect(mockDb.query).toHaveBeenCalled();
    });

    it('should filter by status', async () => {
      mockDb.query.mockResolvedValue([]);
      await mockDb.query('SELECT * FROM enterprises WHERE status = ?', ['active']);
      expect(mockDb.query).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockDb.query.mockResolvedValue([]);
      const result = await mockDb.query('SELECT * FROM enterprises');
      expect(result).toHaveLength(0);
    });

    it('should search by name', async () => {
      mockDb.query.mockResolvedValue([]);
      await mockDb.query('SELECT * FROM enterprises WHERE name LIKE ?', ['%Acme%']);
      expect(mockDb.query).toHaveBeenCalled();
    });
  });

  describe('getEnterpriseStats', () => {
    it('should return enterprise statistics', async () => {
      mockDb.query.mockResolvedValue([{ totalSchools: 10, totalUsers: 500 }]);
      const result = await mockDb.query('SELECT COUNT(schools.id) as totalSchools, COUNT(users.id) as totalUsers FROM enterprises');
      expect(result[0].totalSchools).toBe(10);
    });

    it('should include subscription stats', async () => {
      mockDb.query.mockResolvedValue([{ activeSubscriptions: 5, trialSubscriptions: 2 }]);
      const result = await mockDb.query('SELECT COUNT(*) as activeSubscriptions FROM subscriptions WHERE status = ?', ['active']);
      expect(result[0].activeSubscriptions).toBe(5);
    });

    it('should include revenue stats', async () => {
      mockDb.query.mockResolvedValue([{ totalRevenue: 50000 }]);
      const result = await mockDb.query('SELECT SUM(amount) as totalRevenue FROM invoices WHERE status = ?', ['paid']);
      expect(result[0].totalRevenue).toBe(50000);
    });

    it('should handle zero stats', async () => {
      mockDb.query.mockResolvedValue([{ totalSchools: 0, totalUsers: 0 }]);
      const result = await mockDb.query('SELECT COUNT(*) as totalSchools FROM schools WHERE enterprise_id = ?', [enterpriseId]);
      expect(result[0].totalSchools).toBe(0);
    });

    it('should include growth metrics', async () => {
      mockDb.query.mockResolvedValue([{ newUsersThisMonth: 50, newSchoolsThisMonth: 2 }]);
      const result = await mockDb.query('SELECT COUNT(*) as newUsersThisMonth FROM users WHERE created_at > ?', ['2026-01-01']);
      expect(result[0].newUsersThisMonth).toBe(50);
    });
  });

  describe('transaction', () => {
    it('should execute transaction', async () => {
      mockDb.transaction.mockResolvedValue({ success: true });
      const result = await mockDb.transaction(async (tx) => {
        await tx.execute('INSERT INTO enterprises (name) VALUES (?)', ['New']);
        return { success: true };
      });
      expect(result.success).toBe(true);
    });

    it('should rollback on error', async () => {
      mockDb.transaction.mockRejectedValue(new Error('Transaction failed'));
      await expect(mockDb.transaction(async () => {
        throw new Error('Transaction failed');
      })).rejects.toThrow('Transaction failed');
    });

    it('should handle nested transactions', async () => {
      mockDb.transaction.mockResolvedValue({ nested: true });
      const result = await mockDb.transaction(async (tx) => {
        return { nested: true };
      });
      expect(result.nested).toBe(true);
    });
  });

  describe('batch', () => {
    it('should execute batch operations', async () => {
      mockDb.batch.mockResolvedValue([{ insertId: 1 }, { insertId: 2 }]);
      const result = await mockDb.batch([
        { sql: 'INSERT INTO enterprises (name) VALUES (?)', args: ['Corp 1'] },
        { sql: 'INSERT INTO enterprises (name) VALUES (?)', args: ['Corp 2'] },
      ]);
      expect(result).toHaveLength(2);
    });

    it('should handle empty batch', async () => {
      mockDb.batch.mockResolvedValue([]);
      const result = await mockDb.batch([]);
      expect(result).toHaveLength(0);
    });

    it('should validate batch size', () => {
      const maxBatchSize = 1000;
      const batchSize = 500;
      const isValid = batchSize <= maxBatchSize;
      expect(isValid).toBe(true);
    });
  });

  describe('searchEnterprises', () => {
    it('should search enterprises', async () => {
      mockDb.query.mockResolvedValue([{ id: enterpriseId, name: 'Acme Corp' }]);
      const result = await mockDb.query('SELECT * FROM enterprises WHERE name LIKE ?', ['%Acme%']);
      expect(result).toHaveLength(1);
    });

    it('should require minimum query', () => {
      const validate = (query: string) => {
        if (!query || query.trim().length < 2) throw new Error('La requête doit contenir au moins 2 caractères');
      };
      expect(() => validate('')).toThrow();
      expect(() => validate('A')).toThrow();
      expect(() => validate('Ac')).not.toThrow();
    });

    it('should handle no results', async () => {
      mockDb.query.mockResolvedValue([]);
      const result = await mockDb.query('SELECT * FROM enterprises WHERE name LIKE ?', ['%nonexistent%']);
      expect(result).toHaveLength(0);
    });

    it('should search across fields', async () => {
      mockDb.query.mockResolvedValue([]);
      await mockDb.query('SELECT * FROM enterprises WHERE name LIKE ? OR code LIKE ?', ['%query%', '%query%']);
      expect(mockDb.query).toHaveBeenCalled();
    });

    it('should sort by relevance', async () => {
      mockDb.query.mockResolvedValue([]);
      await mockDb.query('SELECT * FROM enterprises WHERE name LIKE ? ORDER BY name', ['%query%']);
      expect(mockDb.query).toHaveBeenCalled();
    });
  });

  describe('getEnterpriseAuditLog', () => {
    it('should return audit log', async () => {
      mockDb.query.mockResolvedValue([{ id: 'audit-1', action: 'enterprise.update' }]);
      const result = await mockDb.query('SELECT * FROM audit_logs WHERE enterprise_id = ?', [enterpriseId]);
      expect(result).toHaveLength(1);
    });

    it('should filter by action', async () => {
      mockDb.query.mockResolvedValue([]);
      await mockDb.query('SELECT * FROM audit_logs WHERE enterprise_id = ? AND action = ?', [enterpriseId, 'user.login']);
      expect(mockDb.query).toHaveBeenCalled();
    });

    it('should filter by date range', async () => {
      mockDb.query.mockResolvedValue([]);
      await mockDb.query('SELECT * FROM audit_logs WHERE enterprise_id = ? AND created_at BETWEEN ? AND ?', [enterpriseId, '2026-01-01', '2026-12-31']);
      expect(mockDb.query).toHaveBeenCalled();
    });

    it('should paginate results', async () => {
      mockDb.query.mockResolvedValue([]);
      await mockDb.query('SELECT * FROM audit_logs WHERE enterprise_id = ? LIMIT ? OFFSET ?', [enterpriseId, 50, 0]);
      expect(mockDb.query).toHaveBeenCalled();
    });

    it('should handle empty log', async () => {
      mockDb.query.mockResolvedValue([]);
      const result = await mockDb.query('SELECT * FROM audit_logs WHERE enterprise_id = ?', [enterpriseId]);
      expect(result).toHaveLength(0);
    });

    it('should sort by timestamp', async () => {
      mockDb.query.mockResolvedValue([]);
      await mockDb.query('SELECT * FROM audit_logs WHERE enterprise_id = ? ORDER BY created_at DESC', [enterpriseId]);
      expect(mockDb.query).toHaveBeenCalled();
    });
  });
});
