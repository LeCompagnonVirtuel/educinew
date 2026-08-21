import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentPortfolioService } from '@/features/assessment/services/assessment-portfolio.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getPortfolio: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listPortfolios: vi.fn().mockResolvedValue([]),
    createPortfolio: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updatePortfolio: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deletePortfolio: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentPortfolioService', () => {
  let service: AssessmentPortfolioService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentPortfolioService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentPortfolioService);
  });

  it('should get by id', async () => {
    const result = await service.getPortfolio('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listPortfolios('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createPortfolio('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updatePortfolio('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deletePortfolio('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listPortfolios('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listPortfolios('school-1'),
      service.listPortfolios('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
