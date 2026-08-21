import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Registry Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getSchoolRegistry: vi.fn(),
      listSchoolRegistries: vi.fn(),
      createSchoolRegistry: vi.fn(),
      updateSchoolRegistry: vi.fn(),
      deleteSchoolRegistry: vi.fn(),
      getTeacherRegistry: vi.fn(),
      listTeacherRegistries: vi.fn(),
      createTeacherRegistry: vi.fn(),
      updateTeacherRegistry: vi.fn(),
      deleteTeacherRegistry: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('SchoolRegistryService', () => {
    it('should create service', async () => {
      const { EduOSSchoolRegistryService } = await import('../eduos-school-registry.service');
      const service = new EduOSSchoolRegistryService({} as any);
      expect(service).toBeDefined();
    });

    it('should get school registry', async () => {
      mockRepo.getSchoolRegistry.mockResolvedValue({ id: 'sr-1', name: 'National Registry' });
      const { EduOSSchoolRegistryService } = await import('../eduos-school-registry.service');
      const service = new EduOSSchoolRegistryService({} as any);
      const result = await service.getSchoolRegistry('school-1', 'sr-1');
      expect(result.id).toBe('sr-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getSchoolRegistry.mockResolvedValue(null);
      const { EduOSSchoolRegistryService } = await import('../eduos-school-registry.service');
      const service = new EduOSSchoolRegistryService({} as any);
      await expect(service.getSchoolRegistry('school-1', 'sr-1')).rejects.toThrow();
    });

    it('should list school registries', async () => {
      mockRepo.listSchoolRegistries.mockResolvedValue([{ id: 'sr-1' }]);
      const { EduOSSchoolRegistryService } = await import('../eduos-school-registry.service');
      const service = new EduOSSchoolRegistryService({} as any);
      const result = await service.listSchoolRegistries('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create school registry', async () => {
      mockRepo.createSchoolRegistry.mockResolvedValue({ id: 'sr-1' });
      const { EduOSSchoolRegistryService } = await import('../eduos-school-registry.service');
      const service = new EduOSSchoolRegistryService({} as any);
      const result = await service.createSchoolRegistry('school-1', { name: 'National Registry' });
      expect(result.id).toBe('sr-1');
    });

    it('should update school registry', async () => {
      mockRepo.getSchoolRegistry.mockResolvedValue({ id: 'sr-1' });
      mockRepo.updateSchoolRegistry.mockResolvedValue({ id: 'sr-1', verified: true });
      const { EduOSSchoolRegistryService } = await import('../eduos-school-registry.service');
      const service = new EduOSSchoolRegistryService({} as any);
      const result = await service.updateSchoolRegistry('school-1', 'sr-1', { verified: true });
      expect(result.verified).toBe(true);
    });

    it('should delete school registry', async () => {
      mockRepo.getSchoolRegistry.mockResolvedValue({ id: 'sr-1' });
      mockRepo.deleteSchoolRegistry.mockResolvedValue(undefined);
      const { EduOSSchoolRegistryService } = await import('../eduos-school-registry.service');
      const service = new EduOSSchoolRegistryService({} as any);
      await service.deleteSchoolRegistry('school-1', 'sr-1');
      expect(mockRepo.deleteSchoolRegistry).toHaveBeenCalledWith('school-1', 'sr-1');
    });
  });

  describe('TeacherRegistryService', () => {
    it('should create service', async () => {
      const { EduOSTeacherRegistryService } = await import('../eduos-teacher-registry.service');
      const service = new EduOSTeacherRegistryService({} as any);
      expect(service).toBeDefined();
    });

    it('should get teacher registry', async () => {
      mockRepo.getTeacherRegistry.mockResolvedValue({ id: 'tr-1', teacherId: 'tch-1' });
      const { EduOSTeacherRegistryService } = await import('../eduos-teacher-registry.service');
      const service = new EduOSTeacherRegistryService({} as any);
      const result = await service.getTeacherRegistry('school-1', 'tr-1');
      expect(result.id).toBe('tr-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getTeacherRegistry.mockResolvedValue(null);
      const { EduOSTeacherRegistryService } = await import('../eduos-teacher-registry.service');
      const service = new EduOSTeacherRegistryService({} as any);
      await expect(service.getTeacherRegistry('school-1', 'tr-1')).rejects.toThrow();
    });

    it('should list teacher registries', async () => {
      mockRepo.listTeacherRegistries.mockResolvedValue([{ id: 'tr-1' }]);
      const { EduOSTeacherRegistryService } = await import('../eduos-teacher-registry.service');
      const service = new EduOSTeacherRegistryService({} as any);
      const result = await service.listTeacherRegistries('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create teacher registry', async () => {
      mockRepo.createTeacherRegistry.mockResolvedValue({ id: 'tr-1' });
      const { EduOSTeacherRegistryService } = await import('../eduos-teacher-registry.service');
      const service = new EduOSTeacherRegistryService({} as any);
      const result = await service.createTeacherRegistry('school-1', { teacherId: 'tch-1' });
      expect(result.id).toBe('tr-1');
    });

    it('should update teacher registry', async () => {
      mockRepo.getTeacherRegistry.mockResolvedValue({ id: 'tr-1' });
      mockRepo.updateTeacherRegistry.mockResolvedValue({ id: 'tr-1', status: 'active' });
      const { EduOSTeacherRegistryService } = await import('../eduos-teacher-registry.service');
      const service = new EduOSTeacherRegistryService({} as any);
      const result = await service.updateTeacherRegistry('school-1', 'tr-1', { status: 'active' });
      expect(result.status).toBe('active');
    });

    it('should delete teacher registry', async () => {
      mockRepo.getTeacherRegistry.mockResolvedValue({ id: 'tr-1' });
      mockRepo.deleteTeacherRegistry.mockResolvedValue(undefined);
      const { EduOSTeacherRegistryService } = await import('../eduos-teacher-registry.service');
      const service = new EduOSTeacherRegistryService({} as any);
      await service.deleteTeacherRegistry('school-1', 'tr-1');
      expect(mockRepo.deleteTeacherRegistry).toHaveBeenCalledWith('school-1', 'tr-1');
    });
  });
});
