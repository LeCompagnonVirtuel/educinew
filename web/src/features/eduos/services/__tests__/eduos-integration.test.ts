import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Integration Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getIntegrationConnector: vi.fn(),
      listIntegrationConnectors: vi.fn(),
      createIntegrationConnector: vi.fn(),
      updateIntegrationConnector: vi.fn(),
      deleteIntegrationConnector: vi.fn(),
      getLMSIntegration: vi.fn(),
      listLMSIntegrations: vi.fn(),
      createLMSIntegration: vi.fn(),
      updateLMSIntegration: vi.fn(),
      deleteLMSIntegration: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('IntegrationConnectorService', () => {
    it('should create service', async () => {
      const { EduOSIntegrationConnectorService } = await import('../eduos-integration-connector.service');
      const service = new EduOSIntegrationConnectorService({} as any);
      expect(service).toBeDefined();
    });

    it('should get integration connector', async () => {
      mockRepo.getIntegrationConnector.mockResolvedValue({ id: 'ic-1', type: 'lms' });
      const { EduOSIntegrationConnectorService } = await import('../eduos-integration-connector.service');
      const service = new EduOSIntegrationConnectorService({} as any);
      const result = await service.getIntegrationConnector('school-1', 'ic-1');
      expect(result.id).toBe('ic-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getIntegrationConnector.mockResolvedValue(null);
      const { EduOSIntegrationConnectorService } = await import('../eduos-integration-connector.service');
      const service = new EduOSIntegrationConnectorService({} as any);
      await expect(service.getIntegrationConnector('school-1', 'ic-1')).rejects.toThrow();
    });

    it('should list integration connectors', async () => {
      mockRepo.listIntegrationConnectors.mockResolvedValue([{ id: 'ic-1' }]);
      const { EduOSIntegrationConnectorService } = await import('../eduos-integration-connector.service');
      const service = new EduOSIntegrationConnectorService({} as any);
      const result = await service.listIntegrationConnectors('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create integration connector', async () => {
      mockRepo.createIntegrationConnector.mockResolvedValue({ id: 'ic-1' });
      const { EduOSIntegrationConnectorService } = await import('../eduos-integration-connector.service');
      const service = new EduOSIntegrationConnectorService({} as any);
      const result = await service.createIntegrationConnector('school-1', { type: 'lms' });
      expect(result.id).toBe('ic-1');
    });

    it('should update integration connector', async () => {
      mockRepo.getIntegrationConnector.mockResolvedValue({ id: 'ic-1' });
      mockRepo.updateIntegrationConnector.mockResolvedValue({ id: 'ic-1', status: 'active' });
      const { EduOSIntegrationConnectorService } = await import('../eduos-integration-connector.service');
      const service = new EduOSIntegrationConnectorService({} as any);
      const result = await service.updateIntegrationConnector('school-1', 'ic-1', { status: 'active' });
      expect(result.status).toBe('active');
    });

    it('should delete integration connector', async () => {
      mockRepo.getIntegrationConnector.mockResolvedValue({ id: 'ic-1' });
      mockRepo.deleteIntegrationConnector.mockResolvedValue(undefined);
      const { EduOSIntegrationConnectorService } = await import('../eduos-integration-connector.service');
      const service = new EduOSIntegrationConnectorService({} as any);
      await service.deleteIntegrationConnector('school-1', 'ic-1');
      expect(mockRepo.deleteIntegrationConnector).toHaveBeenCalledWith('school-1', 'ic-1');
    });
  });

  describe('LMSIntegrationService', () => {
    it('should create service', async () => {
      const { EduOSLMSIntegrationService } = await import('../eduos-lms-integration.service');
      const service = new EduOSLMSIntegrationService({} as any);
      expect(service).toBeDefined();
    });

    it('should get lms integration', async () => {
      mockRepo.getLMSIntegration.mockResolvedValue({ id: 'li-1', platform: 'moodle' });
      const { EduOSLMSIntegrationService } = await import('../eduos-lms-integration.service');
      const service = new EduOSLMSIntegrationService({} as any);
      const result = await service.getLMSIntegration('school-1', 'li-1');
      expect(result.id).toBe('li-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getLMSIntegration.mockResolvedValue(null);
      const { EduOSLMSIntegrationService } = await import('../eduos-lms-integration.service');
      const service = new EduOSLMSIntegrationService({} as any);
      await expect(service.getLMSIntegration('school-1', 'li-1')).rejects.toThrow();
    });

    it('should list lms integrations', async () => {
      mockRepo.listLMSIntegrations.mockResolvedValue([{ id: 'li-1' }]);
      const { EduOSLMSIntegrationService } = await import('../eduos-lms-integration.service');
      const service = new EduOSLMSIntegrationService({} as any);
      const result = await service.listLMSIntegrations('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create lms integration', async () => {
      mockRepo.createLMSIntegration.mockResolvedValue({ id: 'li-1' });
      const { EduOSLMSIntegrationService } = await import('../eduos-lms-integration.service');
      const service = new EduOSLMSIntegrationService({} as any);
      const result = await service.createLMSIntegration('school-1', { platform: 'moodle' });
      expect(result.id).toBe('li-1');
    });

    it('should update lms integration', async () => {
      mockRepo.getLMSIntegration.mockResolvedValue({ id: 'li-1' });
      mockRepo.updateLMSIntegration.mockResolvedValue({ id: 'li-1', syncEnabled: true });
      const { EduOSLMSIntegrationService } = await import('../eduos-lms-integration.service');
      const service = new EduOSLMSIntegrationService({} as any);
      const result = await service.updateLMSIntegration('school-1', 'li-1', { syncEnabled: true });
      expect(result.syncEnabled).toBe(true);
    });

    it('should delete lms integration', async () => {
      mockRepo.getLMSIntegration.mockResolvedValue({ id: 'li-1' });
      mockRepo.deleteLMSIntegration.mockResolvedValue(undefined);
      const { EduOSLMSIntegrationService } = await import('../eduos-lms-integration.service');
      const service = new EduOSLMSIntegrationService({} as any);
      await service.deleteLMSIntegration('school-1', 'li-1');
      expect(mockRepo.deleteLMSIntegration).toHaveBeenCalledWith('school-1', 'li-1');
    });
  });
});
