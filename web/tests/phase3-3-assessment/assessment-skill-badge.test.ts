import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentSkillBadgeService } from '@/features/assessment/services/assessment-skill-badge.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getSkillBadge: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listSkillBadges: vi.fn().mockResolvedValue([]),
    createSkillBadge: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateSkillBadge: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteSkillBadge: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentSkillBadgeService', () => {
  let service: AssessmentSkillBadgeService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentSkillBadgeService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentSkillBadgeService);
  });

  it('should get by id', async () => {
    const result = await service.getSkillBadge('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listSkillBadges('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createSkillBadge('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateSkillBadge('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteSkillBadge('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listSkillBadges('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listSkillBadges('school-1'),
      service.listSkillBadges('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
