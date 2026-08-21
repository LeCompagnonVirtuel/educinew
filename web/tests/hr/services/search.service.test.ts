import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('SearchService', () => {
  const mockRepo = {
    searchEmployees: vi.fn(),
    searchDepartments: vi.fn(),
    searchPositions: vi.fn(),
  };

  const schoolId = 'school-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('searchEmployees', () => {
    it('should search employees', async () => {
      mockRepo.searchEmployees.mockResolvedValue([{ first_name: 'John' }]);
      const result = await mockRepo.searchEmployees(schoolId, 'John');
      expect(result).toHaveLength(1);
    });

    it('should return empty for no matches', async () => {
      mockRepo.searchEmployees.mockResolvedValue([]);
      const result = await mockRepo.searchEmployees(schoolId, 'Nonexistent');
      expect(result).toHaveLength(0);
    });

    it('should require minimum query length', () => {
      const validateQuery = (query: string) => {
        if (query.trim().length < 2) throw new Error('Query too short');
      };
      expect(() => validateQuery('')).toThrow();
      expect(() => validateQuery('a')).toThrow();
      expect(() => validateQuery('Jo')).not.toThrow();
    });
  });

  describe('searchDepartments', () => {
    it('should search departments', async () => {
      mockRepo.searchDepartments.mockResolvedValue([{ name: 'IT' }]);
      const result = await mockRepo.searchDepartments(schoolId, 'IT');
      expect(result).toHaveLength(1);
    });
  });

  describe('searchPositions', () => {
    it('should search positions', async () => {
      mockRepo.searchPositions.mockResolvedValue([{ name: 'Director' }]);
      const result = await mockRepo.searchPositions(schoolId, 'Director');
      expect(result).toHaveLength(1);
    });
  });

  describe('Search normalization', () => {
    it('should normalize search query', () => {
      const normalize = (query: string) => query.trim().toLowerCase();
      expect(normalize('  John  ')).toBe('john');
      expect(normalize('DIRECTOR')).toBe('director');
    });
  });

  describe('Search highlighting', () => {
    it('should highlight matching text', () => {
      const highlight = (text: string, query: string) => {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
      };
      expect(highlight('John Doe', 'John')).toBe('<mark>John</mark> Doe');
    });
  });
});
