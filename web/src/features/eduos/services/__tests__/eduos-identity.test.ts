import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Identity Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getStudentIdentity: vi.fn(),
      listStudentIdentities: vi.fn(),
      createStudentIdentity: vi.fn(),
      updateStudentIdentity: vi.fn(),
      deleteStudentIdentity: vi.fn(),
      getTeacherIdentity: vi.fn(),
      listTeacherIdentities: vi.fn(),
      createTeacherIdentity: vi.fn(),
      updateTeacherIdentity: vi.fn(),
      deleteTeacherIdentity: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('StudentIdentityService', () => {
    it('should create service', async () => {
      const { EduOSStudentIdentityService } = await import('../eduos-student-identity.service');
      const service = new EduOSStudentIdentityService({} as any);
      expect(service).toBeDefined();
    });

    it('should get student identity', async () => {
      mockRepo.getStudentIdentity.mockResolvedValue({ id: 'si-1', studentId: 'stu-1' });
      const { EduOSStudentIdentityService } = await import('../eduos-student-identity.service');
      const service = new EduOSStudentIdentityService({} as any);
      const result = await service.getStudentIdentity('school-1', 'si-1');
      expect(result.id).toBe('si-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getStudentIdentity.mockResolvedValue(null);
      const { EduOSStudentIdentityService } = await import('../eduos-student-identity.service');
      const service = new EduOSStudentIdentityService({} as any);
      await expect(service.getStudentIdentity('school-1', 'si-1')).rejects.toThrow();
    });

    it('should list student identities', async () => {
      mockRepo.listStudentIdentities.mockResolvedValue([{ id: 'si-1' }]);
      const { EduOSStudentIdentityService } = await import('../eduos-student-identity.service');
      const service = new EduOSStudentIdentityService({} as any);
      const result = await service.listStudentIdentities('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create student identity', async () => {
      mockRepo.createStudentIdentity.mockResolvedValue({ id: 'si-1' });
      const { EduOSStudentIdentityService } = await import('../eduos-student-identity.service');
      const service = new EduOSStudentIdentityService({} as any);
      const result = await service.createStudentIdentity('school-1', { studentId: 'stu-1' });
      expect(result.id).toBe('si-1');
    });

    it('should update student identity', async () => {
      mockRepo.getStudentIdentity.mockResolvedValue({ id: 'si-1' });
      mockRepo.updateStudentIdentity.mockResolvedValue({ id: 'si-1', verified: true });
      const { EduOSStudentIdentityService } = await import('../eduos-student-identity.service');
      const service = new EduOSStudentIdentityService({} as any);
      const result = await service.updateStudentIdentity('school-1', 'si-1', { verified: true });
      expect(result.verified).toBe(true);
    });

    it('should delete student identity', async () => {
      mockRepo.getStudentIdentity.mockResolvedValue({ id: 'si-1' });
      mockRepo.deleteStudentIdentity.mockResolvedValue(undefined);
      const { EduOSStudentIdentityService } = await import('../eduos-student-identity.service');
      const service = new EduOSStudentIdentityService({} as any);
      await service.deleteStudentIdentity('school-1', 'si-1');
      expect(mockRepo.deleteStudentIdentity).toHaveBeenCalledWith('school-1', 'si-1');
    });
  });

  describe('TeacherIdentityService', () => {
    it('should create service', async () => {
      const { EduOSTeacherIdentityService } = await import('../eduos-teacher-identity.service');
      const service = new EduOSTeacherIdentityService({} as any);
      expect(service).toBeDefined();
    });

    it('should get teacher identity', async () => {
      mockRepo.getTeacherIdentity.mockResolvedValue({ id: 'ti-1', teacherId: 'tch-1' });
      const { EduOSTeacherIdentityService } = await import('../eduos-teacher-identity.service');
      const service = new EduOSTeacherIdentityService({} as any);
      const result = await service.getTeacherIdentity('school-1', 'ti-1');
      expect(result.id).toBe('ti-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getTeacherIdentity.mockResolvedValue(null);
      const { EduOSTeacherIdentityService } = await import('../eduos-teacher-identity.service');
      const service = new EduOSTeacherIdentityService({} as any);
      await expect(service.getTeacherIdentity('school-1', 'ti-1')).rejects.toThrow();
    });

    it('should list teacher identities', async () => {
      mockRepo.listTeacherIdentities.mockResolvedValue([{ id: 'ti-1' }]);
      const { EduOSTeacherIdentityService } = await import('../eduos-teacher-identity.service');
      const service = new EduOSTeacherIdentityService({} as any);
      const result = await service.listTeacherIdentities('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create teacher identity', async () => {
      mockRepo.createTeacherIdentity.mockResolvedValue({ id: 'ti-1' });
      const { EduOSTeacherIdentityService } = await import('../eduos-teacher-identity.service');
      const service = new EduOSTeacherIdentityService({} as any);
      const result = await service.createTeacherIdentity('school-1', { teacherId: 'tch-1' });
      expect(result.id).toBe('ti-1');
    });

    it('should update teacher identity', async () => {
      mockRepo.getTeacherIdentity.mockResolvedValue({ id: 'ti-1' });
      mockRepo.updateTeacherIdentity.mockResolvedValue({ id: 'ti-1', verified: true });
      const { EduOSTeacherIdentityService } = await import('../eduos-teacher-identity.service');
      const service = new EduOSTeacherIdentityService({} as any);
      const result = await service.updateTeacherIdentity('school-1', 'ti-1', { verified: true });
      expect(result.verified).toBe(true);
    });

    it('should delete teacher identity', async () => {
      mockRepo.getTeacherIdentity.mockResolvedValue({ id: 'ti-1' });
      mockRepo.deleteTeacherIdentity.mockResolvedValue(undefined);
      const { EduOSTeacherIdentityService } = await import('../eduos-teacher-identity.service');
      const service = new EduOSTeacherIdentityService({} as any);
      await service.deleteTeacherIdentity('school-1', 'ti-1');
      expect(mockRepo.deleteTeacherIdentity).toHaveBeenCalledWith('school-1', 'ti-1');
    });
  });
});
