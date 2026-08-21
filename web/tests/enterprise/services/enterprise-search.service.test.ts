import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseSearchService', () => {
  const mockRepo = {
    search: vi.fn(),
    searchUsers: vi.fn(),
    searchSchools: vi.fn(),
    searchCourses: vi.fn(),
    searchFiles: vi.fn(),
    searchTickets: vi.fn(),
    getSearchSuggestions: vi.fn(),
    getSearchHistory: vi.fn(),
    clearSearchHistory: vi.fn(),
    getSearchStats: vi.fn(),
    indexDocument: vi.fn(),
    removeDocument: vi.fn(),
    rebuildIndex: vi.fn(),
    getIndexStatus: vi.fn(),
    getPopularSearches: vi.fn(),
  };

  const enterpriseId = 'ent-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('search', () => {
    it('should return search results', async () => {
      mockRepo.search.mockResolvedValue({ results: [{ id: '1', type: 'user', name: 'John' }], total: 1 });
      const result = await mockRepo.search(enterpriseId, 'John');
      expect(result.results).toHaveLength(1);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should require query', () => {
      const validate = (query: string) => {
        if (!query || query.trim().length < 2) throw new Error('La requête doit contenir au moins 2 caractères');
      };
      expect(() => validate('')).toThrow();
      expect(() => validate('J')).toThrow();
      expect(() => validate('Jo')).not.toThrow();
    });

    it('should filter by type', async () => {
      mockRepo.search.mockResolvedValue({ results: [], total: 0 });
      await mockRepo.search(enterpriseId, 'test', { type: 'user' });
      expect(mockRepo.search).toHaveBeenCalled();
    });

    it('should paginate results', async () => {
      mockRepo.search.mockResolvedValue({ results: [], total: 0 });
      await mockRepo.search(enterpriseId, 'test', { page: 1, limit: 20 });
      expect(mockRepo.search).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockRepo.search.mockResolvedValue({ results: [], total: 0 });
      const result = await mockRepo.search(enterpriseId, 'nonexistent');
      expect(result.results).toHaveLength(0);
    });

    it('should include relevance scores', async () => {
      mockRepo.search.mockResolvedValue({ results: [{ id: '1', score: 0.95 }], total: 1 });
      const result = await mockRepo.search(enterpriseId, 'John');
      expect(result.results[0].score).toBe(0.95);
    });

    it('should highlight matches', async () => {
      mockRepo.search.mockResolvedValue({ results: [{ highlights: { name: ['<em>John</em> Doe'] } }] });
      const result = await mockRepo.search(enterpriseId, 'John');
      expect(result.results[0].highlights.name[0]).toContain('<em>');
    });
  });

  describe('searchUsers', () => {
    it('should search users', async () => {
      mockRepo.searchUsers.mockResolvedValue([{ id: 'usr-1', name: 'John Doe' }]);
      const result = await mockRepo.searchUsers(enterpriseId, 'John');
      expect(result).toHaveLength(1);
    });

    it('should filter by role', async () => {
      mockRepo.searchUsers.mockResolvedValue([]);
      await mockRepo.searchUsers(enterpriseId, 'test', { role: 'teacher' });
      expect(mockRepo.searchUsers).toHaveBeenCalled();
    });

    it('should filter by status', async () => {
      mockRepo.searchUsers.mockResolvedValue([]);
      await mockRepo.searchUsers(enterpriseId, 'test', { status: 'active' });
      expect(mockRepo.searchUsers).toHaveBeenCalled();
    });

    it('should handle no results', async () => {
      mockRepo.searchUsers.mockResolvedValue([]);
      const result = await mockRepo.searchUsers(enterpriseId, 'nonexistent');
      expect(result).toHaveLength(0);
    });

    it('should include email search', async () => {
      mockRepo.searchUsers.mockResolvedValue([{ email: 'john@test.com' }]);
      const result = await mockRepo.searchUsers(enterpriseId, 'john@test.com');
      expect(result[0].email).toContain('john');
    });
  });

  describe('searchSchools', () => {
    it('should search schools', async () => {
      mockRepo.searchSchools.mockResolvedValue([{ id: 'sch-1', name: 'Academy A' }]);
      const result = await mockRepo.searchSchools(enterpriseId, 'Academy');
      expect(result).toHaveLength(1);
    });

    it('should filter by location', async () => {
      mockRepo.searchSchools.mockResolvedValue([]);
      await mockRepo.searchSchools(enterpriseId, 'test', { location: 'Paris' });
      expect(mockRepo.searchSchools).toHaveBeenCalled();
    });

    it('should handle no results', async () => {
      mockRepo.searchSchools.mockResolvedValue([]);
      const result = await mockRepo.searchSchools(enterpriseId, 'nonexistent');
      expect(result).toHaveLength(0);
    });

    it('should include school stats', async () => {
      mockRepo.searchSchools.mockResolvedValue([{ name: 'Academy', studentCount: 500 }]);
      const result = await mockRepo.searchSchools(enterpriseId, 'Academy');
      expect(result[0].studentCount).toBe(500);
    });

    it('should search by code', async () => {
      mockRepo.searchSchools.mockResolvedValue([{ code: 'ACA-001' }]);
      const result = await mockRepo.searchSchools(enterpriseId, 'ACA-001');
      expect(result[0].code).toBe('ACA-001');
    });
  });

  describe('searchCourses', () => {
    it('should search courses', async () => {
      mockRepo.searchCourses.mockResolvedValue([{ id: 'crs-1', title: 'Math 101' }]);
      const result = await mockRepo.searchCourses(enterpriseId, 'Math');
      expect(result).toHaveLength(1);
    });

    it('should filter by school', async () => {
      mockRepo.searchCourses.mockResolvedValue([]);
      await mockRepo.searchCourses(enterpriseId, 'test', { schoolId: 'sch-1' });
      expect(mockRepo.searchCourses).toHaveBeenCalled();
    });

    it('should filter by category', async () => {
      mockRepo.searchCourses.mockResolvedValue([]);
      await mockRepo.searchCourses(enterpriseId, 'test', { category: 'science' });
      expect(mockRepo.searchCourses).toHaveBeenCalled();
    });

    it('should handle no results', async () => {
      mockRepo.searchCourses.mockResolvedValue([]);
      const result = await mockRepo.searchCourses(enterpriseId, 'nonexistent');
      expect(result).toHaveLength(0);
    });

    it('should include enrollment count', async () => {
      mockRepo.searchCourses.mockResolvedValue([{ title: 'Math 101', enrolledStudents: 150 }]);
      const result = await mockRepo.searchCourses(enterpriseId, 'Math');
      expect(result[0].enrolledStudents).toBe(150);
    });
  });

  describe('searchFiles', () => {
    it('should search files', async () => {
      mockRepo.searchFiles.mockResolvedValue([{ id: 'file-1', name: 'document.pdf' }]);
      const result = await mockRepo.searchFiles(enterpriseId, 'document');
      expect(result).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepo.searchFiles.mockResolvedValue([]);
      await mockRepo.searchFiles(enterpriseId, 'test', { type: 'pdf' });
      expect(mockRepo.searchFiles).toHaveBeenCalled();
    });

    it('should handle no results', async () => {
      mockRepo.searchFiles.mockResolvedValue([]);
      const result = await mockRepo.searchFiles(enterpriseId, 'nonexistent');
      expect(result).toHaveLength(0);
    });

    it('should include file size', async () => {
      mockRepo.searchFiles.mockResolvedValue([{ name: 'doc.pdf', size: 1024 }]);
      const result = await mockRepo.searchFiles(enterpriseId, 'doc');
      expect(result[0].size).toBe(1024);
    });

    it('should search by content', async () => {
      mockRepo.searchFiles.mockResolvedValue([{ name: 'report.pdf', contentMatch: true }]);
      const result = await mockRepo.searchFiles(enterpriseId, 'revenue');
      expect(result[0].contentMatch).toBe(true);
    });
  });

  describe('searchTickets', () => {
    it('should search tickets', async () => {
      mockRepo.searchTickets.mockResolvedValue([{ id: 'tick-1', subject: 'Login issue' }]);
      const result = await mockRepo.searchTickets(enterpriseId, 'Login');
      expect(result).toHaveLength(1);
    });

    it('should filter by status', async () => {
      mockRepo.searchTickets.mockResolvedValue([]);
      await mockRepo.searchTickets(enterpriseId, 'test', { status: 'open' });
      expect(mockRepo.searchTickets).toHaveBeenCalled();
    });

    it('should filter by priority', async () => {
      mockRepo.searchTickets.mockResolvedValue([]);
      await mockRepo.searchTickets(enterpriseId, 'test', { priority: 'high' });
      expect(mockRepo.searchTickets).toHaveBeenCalled();
    });

    it('should handle no results', async () => {
      mockRepo.searchTickets.mockResolvedValue([]);
      const result = await mockRepo.searchTickets(enterpriseId, 'nonexistent');
      expect(result).toHaveLength(0);
    });

    it('should search in messages', async () => {
      mockRepo.searchTickets.mockResolvedValue([{ id: 'tick-1', messageMatch: true }]);
      const result = await mockRepo.searchTickets(enterpriseId, 'error message');
      expect(result[0].messageMatch).toBe(true);
    });
  });

  describe('getSearchSuggestions', () => {
    it('should return search suggestions', async () => {
      mockRepo.getSearchSuggestions.mockResolvedValue(['John Doe', 'Jane Smith']);
      const result = await mockRepo.getSearchSuggestions(enterpriseId, 'Jo');
      expect(result).toContain('John Doe');
    });

    it('should limit suggestions', async () => {
      mockRepo.getSearchSuggestions.mockResolvedValue([]);
      await mockRepo.getSearchSuggestions(enterpriseId, 'test', { limit: 5 });
      expect(mockRepo.getSearchSuggestions).toHaveBeenCalled();
    });

    it('should handle empty suggestions', async () => {
      mockRepo.getSearchSuggestions.mockResolvedValue([]);
      const result = await mockRepo.getSearchSuggestions(enterpriseId, 'xyz');
      expect(result).toHaveLength(0);
    });

    it('should include recent searches', async () => {
      mockRepo.getSearchSuggestions.mockResolvedValue(['Recent Search 1', 'Recent Search 2']);
      const result = await mockRepo.getSearchSuggestions(enterpriseId, 'test');
      expect(result).toHaveLength(2);
    });

    it('should prioritize popular searches', async () => {
      mockRepo.getSearchSuggestions.mockResolvedValue(['Popular', 'Less Popular']);
      const result = await mockRepo.getSearchSuggestions(enterpriseId, 'Pop');
      expect(result[0]).toBe('Popular');
    });
  });

  describe('getSearchHistory', () => {
    it('should return search history', async () => {
      mockRepo.getSearchHistory.mockResolvedValue([{ query: 'John', date: '2026-01-01', results: 5 }]);
      const result = await mockRepo.getSearchHistory(enterpriseId, 'usr-1');
      expect(result).toHaveLength(1);
    });

    it('should filter by date range', async () => {
      mockRepo.getSearchHistory.mockResolvedValue([]);
      await mockRepo.getSearchHistory(enterpriseId, 'usr-1', { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getSearchHistory).toHaveBeenCalled();
    });

    it('should handle empty history', async () => {
      mockRepo.getSearchHistory.mockResolvedValue([]);
      const result = await mockRepo.getSearchHistory(enterpriseId, 'usr-1');
      expect(result).toHaveLength(0);
    });

    it('should sort by date', async () => {
      mockRepo.getSearchHistory.mockResolvedValue([
        { date: '2026-01-01' },
        { date: '2026-02-01' },
      ]);
      const result = await mockRepo.getSearchHistory(enterpriseId, 'usr-1');
      expect(result).toHaveLength(2);
    });

    it('should include result counts', async () => {
      mockRepo.getSearchHistory.mockResolvedValue([{ query: 'test', results: 10 }]);
      const result = await mockRepo.getSearchHistory(enterpriseId, 'usr-1');
      expect(result[0].results).toBe(10);
    });
  });

  describe('clearSearchHistory', () => {
    it('should clear user search history', async () => {
      mockRepo.clearSearchHistory.mockResolvedValue({ cleared: 15 });
      const result = await mockRepo.clearSearchHistory(enterpriseId, 'usr-1');
      expect(result.cleared).toBe(15);
    });

    it('should handle empty history', async () => {
      mockRepo.clearSearchHistory.mockResolvedValue({ cleared: 0 });
      const result = await mockRepo.clearSearchHistory(enterpriseId, 'usr-1');
      expect(result.cleared).toBe(0);
    });

    it('should clear all enterprise history', async () => {
      mockRepo.clearSearchHistory.mockResolvedValue({ cleared: 500 });
      const result = await mockRepo.clearSearchHistory(enterpriseId);
      expect(result.cleared).toBe(500);
    });

    it('should record clear action', async () => {
      mockRepo.clearSearchHistory.mockResolvedValue({ cleared: 10, clearedAt: new Date().toISOString() });
      const result = await mockRepo.clearSearchHistory(enterpriseId, 'usr-1');
      expect(result.clearedAt).toBeDefined();
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });
  });

  describe('getSearchStats', () => {
    it('should return search statistics', async () => {
      mockRepo.getSearchStats.mockResolvedValue({ totalSearches: 1000, avgResults: 5 });
      const result = await mockRepo.getSearchStats(enterpriseId);
      expect(result.totalSearches).toBe(1000);
    });

    it('should include popular searches', async () => {
      mockRepo.getSearchStats.mockResolvedValue({ popularSearches: [{ query: 'login', count: 50 }] });
      const result = await mockRepo.getSearchStats(enterpriseId);
      expect(result.popularSearches).toHaveLength(1);
    });

    it('should include no-result searches', async () => {
      mockRepo.getSearchStats.mockResolvedValue({ noResultSearches: [{ query: 'xyz', count: 10 }] });
      const result = await mockRepo.getSearchStats(enterpriseId);
      expect(result.noResultSearches).toHaveLength(1);
    });

    it('should handle zero searches', async () => {
      mockRepo.getSearchStats.mockResolvedValue({ totalSearches: 0 });
      const result = await mockRepo.getSearchStats(enterpriseId);
      expect(result.totalSearches).toBe(0);
    });

    it('should include search trends', async () => {
      mockRepo.getSearchStats.mockResolvedValue({ trends: [{ date: '2026-01-01', searches: 50 }] });
      const result = await mockRepo.getSearchStats(enterpriseId);
      expect(result.trends).toHaveLength(1);
    });

    it('should include average response time', async () => {
      mockRepo.getSearchStats.mockResolvedValue({ avgResponseTime: 45 });
      const result = await mockRepo.getSearchStats(enterpriseId);
      expect(result.avgResponseTime).toBe(45);
    });
  });

  describe('indexDocument', () => {
    it('should index document', async () => {
      mockRepo.indexDocument.mockResolvedValue({ id: 'doc-1', indexed: true });
      const result = await mockRepo.indexDocument(enterpriseId, { type: 'user', id: 'usr-1', data: { name: 'John' } });
      expect(result.indexed).toBe(true);
    });

    it('should require document type', () => {
      const validate = (data: any) => {
        if (!data?.type) throw new Error('Le type de document est requis');
      };
      expect(() => validate({ id: '1', data: {} })).toThrow('Le type de document est requis');
    });

    it('should require document id', () => {
      const validate = (data: any) => {
        if (!data?.id) throw new Error('L\'identifiant du document est requis');
      };
      expect(() => validate({ type: 'user', data: {} })).toThrow('L\'identifiant du document est requis');
    });

    it('should handle reindexing', async () => {
      mockRepo.indexDocument.mockResolvedValue({ id: 'doc-1', reindexed: true });
      const result = await mockRepo.indexDocument(enterpriseId, { type: 'user', id: 'usr-1', reindex: true });
      expect(result.reindexed).toBe(true);
    });

    it('should record index timestamp', async () => {
      mockRepo.indexDocument.mockResolvedValue({ indexedAt: new Date().toISOString() });
      const result = await mockRepo.indexDocument(enterpriseId, { type: 'user', id: 'usr-1', data: {} });
      expect(result.indexedAt).toBeDefined();
    });
  });

  describe('removeDocument', () => {
    it('should remove document from index', async () => {
      mockRepo.removeDocument.mockResolvedValue({ id: 'doc-1', removed: true });
      const result = await mockRepo.removeDocument(enterpriseId, 'user', 'usr-1');
      expect(result.removed).toBe(true);
    });

    it('should require document type', () => {
      const validate = (type: string) => {
        if (!type) throw new Error('Le type est requis');
      };
      expect(() => validate('')).toThrow('Le type est requis');
    });

    it('should require document id', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('L\'identifiant est requis');
      };
      expect(() => validate('')).toThrow('L\'identifiant est requis');
    });

    it('should handle non-existent document', async () => {
      mockRepo.removeDocument.mockResolvedValue({ id: 'doc-1', removed: false, found: false });
      const result = await mockRepo.removeDocument(enterpriseId, 'user', 'nonexistent');
      expect(result.found).toBe(false);
    });

    it('should record removal timestamp', async () => {
      mockRepo.removeDocument.mockResolvedValue({ removedAt: new Date().toISOString() });
      const result = await mockRepo.removeDocument(enterpriseId, 'user', 'usr-1');
      expect(result.removedAt).toBeDefined();
    });
  });

  describe('rebuildIndex', () => {
    it('should rebuild search index', async () => {
      mockRepo.rebuildIndex.mockResolvedValue({ started: true, estimatedTime: '5 minutes' });
      const result = await mockRepo.rebuildIndex(enterpriseId);
      expect(result.started).toBe(true);
    });

    it('should rebuild specific type', async () => {
      mockRepo.rebuildIndex.mockResolvedValue({ started: true, type: 'user' });
      const result = await mockRepo.rebuildIndex(enterpriseId, { type: 'user' });
      expect(result.type).toBe('user');
    });

    it('should track progress', async () => {
      mockRepo.rebuildIndex.mockResolvedValue({ progress: 75, total: 1000, processed: 750 });
      const result = await mockRepo.rebuildIndex(enterpriseId);
      expect(result.progress).toBe(75);
    });

    it('should handle rebuild completion', async () => {
      mockRepo.rebuildIndex.mockResolvedValue({ completed: true, documentsIndexed: 1000 });
      const result = await mockRepo.rebuildIndex(enterpriseId);
      expect(result.completed).toBe(true);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });
  });

  describe('getIndexStatus', () => {
    it('should return index status', async () => {
      mockRepo.getIndexStatus.mockResolvedValue({ status: 'healthy', documents: 5000 });
      const result = await mockRepo.getIndexStatus(enterpriseId);
      expect(result.status).toBe('healthy');
    });

    it('should include last rebuild time', async () => {
      mockRepo.getIndexStatus.mockResolvedValue({ lastRebuild: '2026-01-01T00:00:00Z' });
      const result = await mockRepo.getIndexStatus(enterpriseId);
      expect(result.lastRebuild).toBeDefined();
    });

    it('should detect index issues', async () => {
      mockRepo.getIndexStatus.mockResolvedValue({ status: 'degraded', issues: ['Stale documents detected'] });
      const result = await mockRepo.getIndexStatus(enterpriseId);
      expect(result.status).toBe('degraded');
    });

    it('should include document counts by type', async () => {
      mockRepo.getIndexStatus.mockResolvedValue({ byType: { users: 2000, schools: 500, courses: 1000 } });
      const result = await mockRepo.getIndexStatus(enterpriseId);
      expect(result.byType.users).toBe(2000);
    });

    it('should handle empty index', async () => {
      mockRepo.getIndexStatus.mockResolvedValue({ status: 'empty', documents: 0 });
      const result = await mockRepo.getIndexStatus(enterpriseId);
      expect(result.documents).toBe(0);
    });

    it('should include index size', async () => {
      mockRepo.getIndexStatus.mockResolvedValue({ sizeMB: 50 });
      const result = await mockRepo.getIndexStatus(enterpriseId);
      expect(result.sizeMB).toBe(50);
    });
  });

  describe('getPopularSearches', () => {
    it('should return popular searches', async () => {
      mockRepo.getPopularSearches.mockResolvedValue([{ query: 'login', count: 100 }]);
      const result = await mockRepo.getPopularSearches(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should limit results', async () => {
      mockRepo.getPopularSearches.mockResolvedValue([]);
      await mockRepo.getPopularSearches(enterpriseId, { limit: 10 });
      expect(mockRepo.getPopularSearches).toHaveBeenCalled();
    });

    it('should filter by time range', async () => {
      mockRepo.getPopularSearches.mockResolvedValue([]);
      await mockRepo.getPopularSearches(enterpriseId, { days: 30 });
      expect(mockRepo.getPopularSearches).toHaveBeenCalled();
    });

    it('should handle no popular searches', async () => {
      mockRepo.getPopularSearches.mockResolvedValue([]);
      const result = await mockRepo.getPopularSearches(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by count descending', async () => {
      mockRepo.getPopularSearches.mockResolvedValue([
        { query: 'login', count: 100 },
        { query: 'password', count: 50 },
      ]);
      const result = await mockRepo.getPopularSearches(enterpriseId);
      expect(result[0].count).toBeGreaterThan(result[1].count);
    });

    it('include success rate', async () => {
      mockRepo.getPopularSearches.mockResolvedValue([{ query: 'login', count: 100, successRate: 85 }]);
      const result = await mockRepo.getPopularSearches(enterpriseId);
      expect(result[0].successRate).toBe(85);
    });
  });
});
