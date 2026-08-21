import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Automation Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getAutomationBuilder: vi.fn(),
      listAutomationBuilders: vi.fn(),
      createAutomationBuilder: vi.fn(),
      updateAutomationBuilder: vi.fn(),
      deleteAutomationBuilder: vi.fn(),
      getEventTrigger: vi.fn(),
      listEventTriggers: vi.fn(),
      createEventTrigger: vi.fn(),
      updateEventTrigger: vi.fn(),
      deleteEventTrigger: vi.fn(),
      getCronJob: vi.fn(),
      listCronJobs: vi.fn(),
      createCronJob: vi.fn(),
      updateCronJob: vi.fn(),
      deleteCronJob: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('AutomationBuilderService', () => {
    it('should create service', async () => {
      const { EduOSAutomationBuilderService } = await import('../eduos-automation-builder.service');
      const service = new EduOSAutomationBuilderService({} as any);
      expect(service).toBeDefined();
    });

    it('should get automation builder', async () => {
      mockRepo.getAutomationBuilder.mockResolvedValue({ id: 'ab-1', name: 'Enrollment Automation' });
      const { EduOSAutomationBuilderService } = await import('../eduos-automation-builder.service');
      const service = new EduOSAutomationBuilderService({} as any);
      const result = await service.getAutomationBuilder('school-1', 'ab-1');
      expect(result.id).toBe('ab-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getAutomationBuilder.mockResolvedValue(null);
      const { EduOSAutomationBuilderService } = await import('../eduos-automation-builder.service');
      const service = new EduOSAutomationBuilderService({} as any);
      await expect(service.getAutomationBuilder('school-1', 'ab-1')).rejects.toThrow();
    });

    it('should list automation builders', async () => {
      mockRepo.listAutomationBuilders.mockResolvedValue([{ id: 'ab-1' }]);
      const { EduOSAutomationBuilderService } = await import('../eduos-automation-builder.service');
      const service = new EduOSAutomationBuilderService({} as any);
      const result = await service.listAutomationBuilders('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create automation builder', async () => {
      mockRepo.createAutomationBuilder.mockResolvedValue({ id: 'ab-1' });
      const { EduOSAutomationBuilderService } = await import('../eduos-automation-builder.service');
      const service = new EduOSAutomationBuilderService({} as any);
      const result = await service.createAutomationBuilder('school-1', { name: 'Enrollment Automation' });
      expect(result.id).toBe('ab-1');
    });

    it('should update automation builder', async () => {
      mockRepo.getAutomationBuilder.mockResolvedValue({ id: 'ab-1' });
      mockRepo.updateAutomationBuilder.mockResolvedValue({ id: 'ab-1', active: true });
      const { EduOSAutomationBuilderService } = await import('../eduos-automation-builder.service');
      const service = new EduOSAutomationBuilderService({} as any);
      const result = await service.updateAutomationBuilder('school-1', 'ab-1', { active: true });
      expect(result.active).toBe(true);
    });

    it('should delete automation builder', async () => {
      mockRepo.getAutomationBuilder.mockResolvedValue({ id: 'ab-1' });
      mockRepo.deleteAutomationBuilder.mockResolvedValue(undefined);
      const { EduOSAutomationBuilderService } = await import('../eduos-automation-builder.service');
      const service = new EduOSAutomationBuilderService({} as any);
      await service.deleteAutomationBuilder('school-1', 'ab-1');
      expect(mockRepo.deleteAutomationBuilder).toHaveBeenCalledWith('school-1', 'ab-1');
    });
  });

  describe('CronJobService', () => {
    it('should create service', async () => {
      const { EduOSCronJobService } = await import('../eduos-cron-job.service');
      const service = new EduOSCronJobService({} as any);
      expect(service).toBeDefined();
    });

    it('should get cron job', async () => {
      mockRepo.getCronJob.mockResolvedValue({ id: 'cj-1', schedule: '0 9 * * 1' });
      const { EduOSCronJobService } = await import('../eduos-cron-job.service');
      const service = new EduOSCronJobService({} as any);
      const result = await service.getCronJob('school-1', 'cj-1');
      expect(result.id).toBe('cj-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getCronJob.mockResolvedValue(null);
      const { EduOSCronJobService } = await import('../eduos-cron-job.service');
      const service = new EduOSCronJobService({} as any);
      await expect(service.getCronJob('school-1', 'cj-1')).rejects.toThrow();
    });

    it('should list cron jobs', async () => {
      mockRepo.listCronJobs.mockResolvedValue([{ id: 'cj-1' }]);
      const { EduOSCronJobService } = await import('../eduos-cron-job.service');
      const service = new EduOSCronJobService({} as any);
      const result = await service.listCronJobs('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create cron job', async () => {
      mockRepo.createCronJob.mockResolvedValue({ id: 'cj-1' });
      const { EduOSCronJobService } = await import('../eduos-cron-job.service');
      const service = new EduOSCronJobService({} as any);
      const result = await service.createCronJob('school-1', { schedule: '0 9 * * 1' });
      expect(result.id).toBe('cj-1');
    });

    it('should update cron job', async () => {
      mockRepo.getCronJob.mockResolvedValue({ id: 'cj-1' });
      mockRepo.updateCronJob.mockResolvedValue({ id: 'cj-1', enabled: false });
      const { EduOSCronJobService } = await import('../eduos-cron-job.service');
      const service = new EduOSCronJobService({} as any);
      const result = await service.updateCronJob('school-1', 'cj-1', { enabled: false });
      expect(result.enabled).toBe(false);
    });

    it('should delete cron job', async () => {
      mockRepo.getCronJob.mockResolvedValue({ id: 'cj-1' });
      mockRepo.deleteCronJob.mockResolvedValue(undefined);
      const { EduOSCronJobService } = await import('../eduos-cron-job.service');
      const service = new EduOSCronJobService({} as any);
      await service.deleteCronJob('school-1', 'cj-1');
      expect(mockRepo.deleteCronJob).toHaveBeenCalledWith('school-1', 'cj-1');
    });
  });
});
