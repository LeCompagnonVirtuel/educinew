import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repo from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Runtime Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockRepo = {
      getRuntimeManager: vi.fn(),
      listRuntimeManagers: vi.fn(),
      createRuntimeManager: vi.fn(),
      updateRuntimeManager: vi.fn(),
      deleteRuntimeManager: vi.fn(),
    };
    (repo.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('RuntimeManagerService', () => {
    it('should create service', async () => {
      const { EduOSRuntimeManagerService } = await import('../eduos-runtime-manager.service');
      const service = new EduOSRuntimeManagerService({} as any);
      expect(service).toBeDefined();
    });

    it('should get runtime manager', async () => {
      mockRepo.getRuntimeManager.mockResolvedValue({ id: 'rm-1', name: 'Test Manager' });
      const { EduOSRuntimeManagerService } = await import('../eduos-runtime-manager.service');
      const service = new EduOSRuntimeManagerService({} as any);
      const result = await service.getRuntimeManager('school-1', 'rm-1');
      expect(result.id).toBe('rm-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getRuntimeManager.mockResolvedValue(null);
      const { EduOSRuntimeManagerService } = await import('../eduos-runtime-manager.service');
      const service = new EduOSRuntimeManagerService({} as any);
      await expect(service.getRuntimeManager('school-1', 'rm-1')).rejects.toThrow();
    });

    it('should list runtime managers', async () => {
      mockRepo.listRuntimeManagers.mockResolvedValue([{ id: 'rm-1' }]);
      const { EduOSRuntimeManagerService } = await import('../eduos-runtime-manager.service');
      const service = new EduOSRuntimeManagerService({} as any);
      const result = await service.listRuntimeManagers('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create runtime manager', async () => {
      mockRepo.createRuntimeManager.mockResolvedValue({ id: 'rm-1' });
      const { EduOSRuntimeManagerService } = await import('../eduos-runtime-manager.service');
      const service = new EduOSRuntimeManagerService({} as any);
      const result = await service.createRuntimeManager('school-1', { name: 'Test' });
      expect(result.id).toBe('rm-1');
    });

    it('should update runtime manager', async () => {
      mockRepo.getRuntimeManager.mockResolvedValue({ id: 'rm-1' });
      mockRepo.updateRuntimeManager.mockResolvedValue({ id: 'rm-1', name: 'Updated' });
      const { EduOSRuntimeManagerService } = await import('../eduos-runtime-manager.service');
      const service = new EduOSRuntimeManagerService({} as any);
      const result = await service.updateRuntimeManager('school-1', 'rm-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should delete runtime manager', async () => {
      mockRepo.getRuntimeManager.mockResolvedValue({ id: 'rm-1' });
      mockRepo.deleteRuntimeManager.mockResolvedValue(undefined);
      const { EduOSRuntimeManagerService } = await import('../eduos-runtime-manager.service');
      const service = new EduOSRuntimeManagerService({} as any);
      await service.deleteRuntimeManager('school-1', 'rm-1');
      expect(mockRepo.deleteRuntimeManager).toHaveBeenCalledWith('school-1', 'rm-1');
    });
  });
});
