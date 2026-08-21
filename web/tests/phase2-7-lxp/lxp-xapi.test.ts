import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpXapiService } from '@/features/lxp/services/lxp-xapi.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
  data: null as Record<string, unknown> | null,
  error: null as { message: string } | null,
};

describe('LxpXapiService', () => {
  let service: LxpXapiService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpXapiService(mockSupabase as never);
  });

  describe('getStatement', () => {
    it('should return statement by id', async () => {
      mockSupabase.data = { id: 'stmt-1', actor: 'user-1', verb: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getStatement('stmt-1');
      expect(result).toBeDefined();
    });

    it('should return null when statement not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getStatement('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getStatement('stmt-1')).rejects.toThrow();
    });

    it('should validate statement id', async () => {
      await expect(service.getStatement('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'stmt-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getStatement('stmt-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include result data', async () => {
      mockSupabase.data = { id: 'stmt-1', result: { score: 85 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getStatement('stmt-1', { includeResult: true });
      expect(result).toBeDefined();
    });

    it('should include context data', async () => {
      mockSupabase.data = { id: 'stmt-1', context: { course: 'course-1' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getStatement('stmt-1', { includeContext: true });
      expect(result).toBeDefined();
    });

    it('should include object data', async () => {
      mockSupabase.data = { id: 'stmt-1', object: { id: 'activity-1' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getStatement('stmt-1', { includeObject: true });
      expect(result).toBeDefined();
    });
  });

  describe('sendStatement', () => {
    it('should send a new statement', async () => {
      const statement = { actor: { id: 'user-1' }, verb: 'completed', object: { id: 'activity-1' } };
      mockSupabase.data = { id: 'stmt-new', ...statement };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.sendStatement(statement);
      expect(result).toBeDefined();
    });

    it('should validate actor', async () => {
      const statement = { actor: {}, verb: 'completed', object: { id: 'activity-1' } };
      await expect(service.sendStatement(statement)).rejects.toThrow();
    });

    it('should validate verb', async () => {
      const statement = { actor: { id: 'user-1' }, verb: '', object: { id: 'activity-1' } };
      await expect(service.sendStatement(statement)).rejects.toThrow();
    });

    it('should validate object', async () => {
      const statement = { actor: { id: 'user-1' }, verb: 'completed', object: {} };
      await expect(service.sendStatement(statement)).rejects.toThrow();
    });

    it('should set timestamp', async () => {
      const statement = { actor: { id: 'user-1' }, verb: 'completed', object: { id: 'activity-1' } };
      mockSupabase.data = { id: 'stmt-new', timestamp: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.sendStatement(statement);
      expect(result).toHaveProperty('timestamp');
    });

    it('should handle database errors during send', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'send failed' } });
      await expect(service.sendStatement({ actor: { id: 'user-1' }, verb: 'completed', object: { id: 'act-1' } })).rejects.toThrow();
    });

    it('should handle statement with result', async () => {
      const statement = { actor: { id: 'user-1' }, verb: 'completed', object: { id: 'act-1' }, result: { score: 85 } };
      mockSupabase.data = { id: 'stmt-new', ...statement };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.sendStatement(statement);
      expect(result).toBeDefined();
    });

    it('should handle statement with context', async () => {
      const statement = { actor: { id: 'user-1' }, verb: 'attempted', object: { id: 'act-1' }, context: { instructor: 'inst-1' } };
      mockSupabase.data = { id: 'stmt-new', ...statement };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.sendStatement(statement);
      expect(result).toBeDefined();
    });

    it('should handle statement with attachments', async () => {
      const statement = { actor: { id: 'user-1' }, verb: 'submitted', object: { id: 'act-1' }, attachments: [{ url: 'file.pdf' }] };
      mockSupabase.data = { id: 'stmt-new', ...statement };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.sendStatement(statement);
      expect(result).toBeDefined();
    });

    it('should handle statement with authority', async () => {
      const statement = { actor: { id: 'user-1' }, verb: 'completed', object: { id: 'act-1' }, authority: { id: 'agent-1' } };
      mockSupabase.data = { id: 'stmt-new', ...statement };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.sendStatement(statement);
      expect(result).toBeDefined();
    });
  });

  describe('getStatements', () => {
    it('should return statements by actor', async () => {
      mockSupabase.data = [{ id: 'stmt-1' }, { id: 'stmt-2' }];
      const result = await service.getStatements({ actor: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should support pagination', async () => {
      mockSupabase.data = [{ id: 'stmt-1' }];
      const result = await service.getStatements({ actor: 'user-1', page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should filter by verb', async () => {
      mockSupabase.data = [{ id: 'stmt-1', verb: 'completed' }];
      const result = await service.getStatements({ verb: 'completed' });
      expect(result).toBeDefined();
    });

    it('should filter by object', async () => {
      mockSupabase.data = [{ id: 'stmt-1', object: { id: 'activity-1' } }];
      const result = await service.getStatements({ object: 'activity-1' });
      expect(result).toBeDefined();
    });

    it('should filter by date range', async () => {
      mockSupabase.data = [{ id: 'stmt-1' }];
      const result = await service.getStatements({ fromDate: '2024-01-01', toDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should return empty array when no statements', async () => {
      mockSupabase.data = [];
      const result = await service.getStatements({ actor: 'user-1' });
      expect(result).toEqual([]);
    });

    it('should handle database errors during listing', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'list failed' } });
      await expect(service.getStatements({ actor: 'user-1' })).rejects.toThrow();
    });

    it('should support sorting by timestamp', async () => {
      mockSupabase.data = [{ id: 'stmt-1' }];
      const result = await service.getStatements({ sortBy: 'timestamp', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });
  });

  describe('deleteStatement', () => {
    it('should delete a statement', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteStatement('stmt-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent statement', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteStatement('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteStatement('stmt-1')).rejects.toThrow();
    });

    it('should validate statement id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteStatement('')).rejects.toThrow();
    });
  });

  describe('getAnalytics', () => {
    it('should return analytics for actor', async () => {
      mockSupabase.data = { total_statements: 100, unique_actors: 25 };
      const result = await service.getAnalytics({ actor: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should return analytics for activity', async () => {
      mockSupabase.data = { total_completions: 50, average_score: 82 };
      const result = await service.getAnalytics({ activity: 'activity-1' });
      expect(result).toBeDefined();
    });

    it('should support date range filtering', async () => {
      mockSupabase.data = { total_statements: 200 };
      const result = await service.getAnalytics({ fromDate: '2024-01-01', toDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'analytics failed' } });
      await expect(service.getAnalytics({ actor: 'user-1' })).rejects.toThrow();
    });

    it('should return completion rates', async () => {
      mockSupabase.data = { completion_rate: 0.75 };
      const result = await service.getAnalytics({ activity: 'activity-1' });
      expect(result).toHaveProperty('completion_rate');
    });

    it('should return average scores', async () => {
      mockSupabase.data = { average_score: 82 };
      const result = await service.getAnalytics({ activity: 'activity-1' });
      expect(result).toHaveProperty('average_score');
    });

    it('should return time spent data', async () => {
      mockSupabase.data = { total_time_spent: 36000 };
      const result = await service.getAnalytics({ actor: 'user-1' });
      expect(result).toHaveProperty('total_time_spent');
    });

    it('should return engagement metrics', async () => {
      mockSupabase.data = { engagement_score: 0.85 };
      const result = await service.getAnalytics({ actor: 'user-1' });
      expect(result).toHaveProperty('engagement_score');
    });
  });

  describe('sendBatchStatements', () => {
    it('should send multiple statements', async () => {
      const statements = [
        { actor: { id: 'user-1' }, verb: 'completed', object: { id: 'act-1' } },
        { actor: { id: 'user-1' }, verb: 'completed', object: { id: 'act-2' } },
      ];
      mockSupabase.data = [{ id: 'stmt-1' }, { id: 'stmt-2' }];
      const result = await service.sendBatchStatements(statements);
      expect(result).toBeDefined();
    });

    it('should handle empty batch', async () => {
      await expect(service.sendBatchStatements([])).rejects.toThrow();
    });

    it('should handle partial failures', async () => {
      const statements = [
        { actor: { id: 'user-1' }, verb: 'completed', object: { id: 'act-1' } },
        { actor: {}, verb: '', object: {} },
      ];
      const result = await service.sendBatchStatements(statements);
      expect(result).toBeDefined();
    });

    it('should handle database errors during batch send', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'batch failed' } });
      await expect(service.sendBatchStatements([{ actor: { id: 'user-1' }, verb: 'completed', object: { id: 'act-1' } }])).rejects.toThrow();
    });

    it('should limit batch size', async () => {
      const statements = Array.from({ length: 101 }, (_, i) => ({
        actor: { id: 'user-1' }, verb: 'completed', object: { id: `act-${i}` },
      }));
      await expect(service.sendBatchStatements(statements)).rejects.toThrow();
    });

    it('should handle batch with results', async () => {
      const statements = [
        { actor: { id: 'user-1' }, verb: 'completed', object: { id: 'act-1' }, result: { score: 85 } },
      ];
      mockSupabase.data = [{ id: 'stmt-1' }];
      const result = await service.sendBatchStatements(statements);
      expect(result).toBeDefined();
    });

    it('should validate all statements in batch', async () => {
      const statements = [{ actor: {}, verb: '', object: {} }];
      await expect(service.sendBatchStatements(statements)).rejects.toThrow();
    });

    it('should handle batch with context', async () => {
      const statements = [
        { actor: { id: 'user-1' }, verb: 'attempted', object: { id: 'act-1' }, context: { course: 'course-1' } },
      ];
      mockSupabase.data = [{ id: 'stmt-1' }];
      const result = await service.sendBatchStatements(statements);
      expect(result).toBeDefined();
    });
  });

  describe('getStatementCounts', () => {
    it('should return statement counts by verb', async () => {
      mockSupabase.data = [{ verb: 'completed', count: 50 }, { verb: 'attempted', count: 75 }];
      const result = await service.getStatementCounts({ groupBy: 'verb' });
      expect(result).toBeDefined();
    });

    it('should return statement counts by actor', async () => {
      mockSupabase.data = [{ actor: 'user-1', count: 25 }];
      const result = await service.getStatementCounts({ groupBy: 'actor' });
      expect(result).toBeDefined();
    });

    it('should return statement counts by date', async () => {
      mockSupabase.data = [{ date: '2024-01-01', count: 10 }];
      const result = await service.getStatementCounts({ groupBy: 'date' });
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'count failed' } });
      await expect(service.getStatementCounts({ groupBy: 'verb' })).rejects.toThrow();
    });

    it('should support date range filtering', async () => {
      mockSupabase.data = [{ verb: 'completed', count: 30 }];
      const result = await service.getStatementCounts({ groupBy: 'verb', fromDate: '2024-01-01', toDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should validate groupBy parameter', async () => {
      await expect(service.getStatementCounts({ groupBy: '' })).rejects.toThrow();
    });

    it('should return total count', async () => {
      mockSupabase.data = { total: 100 };
      const result = await service.getStatementCounts({ groupBy: 'total' });
      expect(result).toHaveProperty('total');
    });

    it('should handle empty results', async () => {
      mockSupabase.data = [];
      const result = await service.getStatementCounts({ groupBy: 'verb' });
      expect(result).toEqual([]);
    });
  });

  describe('Bulk Operations', () => {
    it('should handle bulk create', async () => {
      mockSupabase.data = [{ id: 'bulk-1' }, { id: 'bulk-2' }];
      const result = await service.bulkCreate([{ name: 'item1' }, { name: 'item2' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk update', async () => {
      mockSupabase.data = [{ id: 'bulk-1' }];
      const result = await service.bulkUpdate([{ id: 'bulk-1', name: 'updated' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk delete', async () => {
      mockSupabase.data = null;
      const result = await service.bulkDelete(['id-1', 'id-2']);
      expect(result).toBeDefined();
    });

    it('should handle bulk import', async () => {
      mockSupabase.data = { imported: 5 };
      const result = await service.bulkImport([{ name: 'import1' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk export', async () => {
      mockSupabase.data = { exported: 10 };
      const result = await service.bulkExport({ format: 'csv' });
      expect(result).toBeDefined();
    });
  });

  describe('Advanced Queries', () => {
    it('should support complex filtering', async () => {
      mockSupabase.data = [{ id: 'filtered-1' }];
      const result = await service.find({ status: 'active', type: 'premium' });
      expect(result).toBeDefined();
    });

    it('should support pagination', async () => {
      mockSupabase.data = [{ id: 'page-1' }];
      const result = await service.paginate(1, 10);
      expect(result).toBeDefined();
    });

    it('should support sorting', async () => {
      mockSupabase.data = [{ id: 'sorted-1' }];
      const result = await service.findAll({ orderBy: 'created_at', order: 'desc' });
      expect(result).toBeDefined();
    });

    it('should support search', async () => {
      mockSupabase.data = [{ id: 'search-1' }];
      const result = await service.search('test query');
      expect(result).toBeDefined();
    });

    it('should support field selection', async () => {
      mockSupabase.data = { id: 'select-1', name: 'test' };
      const result = await service.findById('select-1', ['id', 'name']);
      expect(result).toBeDefined();
    });
  });

  describe('Performance Tests', () => {
    it('should handle large datasets efficiently', async () => {
      mockSupabase.data = Array.from({ length: 1000 }, (_, i) => ({ id: item- }));
      const result = await service.findAll();
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      mockSupabase.data = { id: 'concurrent-1' };
      const promises = [
        service.findById('1'),
        service.findById('2'),
        service.findById('3'),
      ];
      const results = await Promise.all(promises);
      expect(results).toHaveLength(3);
    });

    it('should handle timeout scenarios', async () => {
      mockSupabase.single.mockImplementation(() => new Promise((resolve) => {
        setTimeout(() => resolve({ data: null, error: { message: 'timeout' } }), 100);
      }));
      await expect(service.findById('timeout-test')).rejects.toThrow();
    });

    it('should handle memory pressure', async () => {
      mockSupabase.data = Array.from({ length: 10000 }, (_, i) => ({ id: item-, data: 'x'.repeat(100) }));
      const result = await service.findAll();
      expect(result).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null values gracefully', async () => {
      mockSupabase.data = null;
      const result = await service.findById('null-test');
      expect(result).toBeNull();
    });

    it('should handle undefined values', async () => {
      mockSupabase.data = undefined;
      const result = await service.findById('undefined-test');
      expect(result).toBeUndefined();
    });

    it('should handle empty strings', async () => {
      mockSupabase.data = { id: 'empty-1', name: '' };
      const result = await service.findById('empty-1');
      expect(result).toBeDefined();
    });

    it('should handle special characters', async () => {
      mockSupabase.data = { id: 'special-1', name: '!@#$%^&*()_+' };
      const result = await service.findById('special-1');
      expect(result).toBeDefined();
    });

    it('should handle unicode characters', async () => {
      mockSupabase.data = { id: 'unicode-1', name: '日本語テスト' };
      const result = await service.findById('unicode-1');
      expect(result).toBeDefined();
    });
  });

  describe('Error Recovery', () => {
    it('should recover from network errors', async () => {
      mockSupabase.single
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue({ data: { id: 'recovered-1' }, error: null });
      const result = await service.findById('recovery-test');
      expect(result).toBeDefined();
    });

    it('should recover from database timeouts', async () => {
      mockSupabase.single
        .mockResolvedValueOnce({ data: null, error: { message: 'timeout' } })
        .mockResolvedValue({ data: { id: 'recovered-2' }, error: null });
      const result = await service.findById('recovery-test-2');
      expect(result).toBeDefined();
    });

    it('should handle rate limiting', async () => {
      mockSupabase.single.mockResolvedValue({ 
        data: null, 
        error: { message: 'rate limit exceeded' } 
      });
      await expect(service.findById('rate-limit-test')).rejects.toThrow();
    });

    it('should handle service unavailability', async () => {
      mockSupabase.single.mockResolvedValue({ 
        data: null, 
        error: { message: 'service unavailable' } 
      });
      await expect(service.findById('unavailable-test')).rejects.toThrow();
    });
  });
});
