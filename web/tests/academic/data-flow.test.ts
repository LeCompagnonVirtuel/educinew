import { describe, it, expect } from 'vitest';
import { AcademicFiltersSchema, AcademicSearchSchema } from '@/features/academic/validators';

describe('Academic Data Flow', () => {
  describe('Filter parsing', () => {
    it('should parse empty filters', () => {
      const result = AcademicFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
        expect(result.data.sortBy).toBe('created_at');
        expect(result.data.sortOrder).toBe('desc');
      }
    });

    it('should parse search filter', () => {
      const result = AcademicFiltersSchema.safeParse({ search: 'math' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.search).toBe('math');
      }
    });

    it('should parse level filter', () => {
      const result = AcademicFiltersSchema.safeParse({
        levelId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(true);
    });

    it('should parse pagination', () => {
      const result = AcademicFiltersSchema.safeParse({ page: 2, limit: 10 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(2);
        expect(result.data.limit).toBe(10);
      }
    });

    it('should parse sort options', () => {
      const result = AcademicFiltersSchema.safeParse({
        sortBy: 'name',
        sortOrder: 'asc',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sortBy).toBe('name');
        expect(result.data.sortOrder).toBe('asc');
      }
    });

    it('should reject invalid page', () => {
      const result = AcademicFiltersSchema.safeParse({ page: 0 });
      expect(result.success).toBe(false);
    });

    it('should reject invalid limit', () => {
      const result = AcademicFiltersSchema.safeParse({ limit: 101 });
      expect(result.success).toBe(false);
    });
  });

  describe('Search parsing', () => {
    it('should parse valid search', () => {
      const result = AcademicSearchSchema.safeParse({ query: 'math' });
      expect(result.success).toBe(true);
    });

    it('should parse search with types', () => {
      const result = AcademicSearchSchema.safeParse({
        query: 'math',
        types: ['CLASS', 'SUBJECT'],
      });
      expect(result.success).toBe(true);
    });

    it('should parse search with limit', () => {
      const result = AcademicSearchSchema.safeParse({
        query: 'math',
        limit: 10,
      });
      expect(result.success).toBe(true);
    });

    it('should reject short query', () => {
      const result = AcademicSearchSchema.safeParse({ query: 'a' });
      expect(result.success).toBe(false);
    });

    it('should reject empty query', () => {
      const result = AcademicSearchSchema.safeParse({ query: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('Pagination calculation', () => {
    it('should calculate offset correctly', () => {
      const page = 3;
      const limit = 20;
      const offset = (page - 1) * limit;
      expect(offset).toBe(40);
    });

    it('should calculate offset for first page', () => {
      const page = 1;
      const limit = 20;
      const offset = (page - 1) * limit;
      expect(offset).toBe(0);
    });
  });

  describe('Filter combination', () => {
    it('should combine multiple filters', () => {
      const result = AcademicFiltersSchema.safeParse({
        search: 'math',
        levelId: '550e8400-e29b-41d4-a716-446655440000',
        status: 'ACTIVE',
        page: 1,
        limit: 20,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.search).toBe('math');
        expect(result.data.levelId).toBeDefined();
        expect(result.data.status).toBe('ACTIVE');
      }
    });
  });
});
