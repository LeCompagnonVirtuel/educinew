import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS AI Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getAgentRegistry: vi.fn(),
      listAgentRegistries: vi.fn(),
      createAgentRegistry: vi.fn(),
      updateAgentRegistry: vi.fn(),
      deleteAgentRegistry: vi.fn(),
      getPlanningEngine: vi.fn(),
      listPlanningEngines: vi.fn(),
      createPlanningEngine: vi.fn(),
      updatePlanningEngine: vi.fn(),
      deletePlanningEngine: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('AgentRegistryService', () => {
    it('should create service', async () => {
      const { EduOSAgentRegistryService } = await import('../eduos-agent-registry.service');
      const service = new EduOSAgentRegistryService({} as any);
      expect(service).toBeDefined();
    });

    it('should get agent registry', async () => {
      mockRepo.getAgentRegistry.mockResolvedValue({ id: 'ar-1', type: 'tutor' });
      const { EduOSAgentRegistryService } = await import('../eduos-agent-registry.service');
      const service = new EduOSAgentRegistryService({} as any);
      const result = await service.getAgentRegistry('school-1', 'ar-1');
      expect(result.id).toBe('ar-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getAgentRegistry.mockResolvedValue(null);
      const { EduOSAgentRegistryService } = await import('../eduos-agent-registry.service');
      const service = new EduOSAgentRegistryService({} as any);
      await expect(service.getAgentRegistry('school-1', 'ar-1')).rejects.toThrow();
    });

    it('should list agent registries', async () => {
      mockRepo.listAgentRegistries.mockResolvedValue([{ id: 'ar-1' }]);
      const { EduOSAgentRegistryService } = await import('../eduos-agent-registry.service');
      const service = new EduOSAgentRegistryService({} as any);
      const result = await service.listAgentRegistries('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create agent registry', async () => {
      mockRepo.createAgentRegistry.mockResolvedValue({ id: 'ar-1' });
      const { EduOSAgentRegistryService } = await import('../eduos-agent-registry.service');
      const service = new EduOSAgentRegistryService({} as any);
      const result = await service.createAgentRegistry('school-1', { type: 'tutor' });
      expect(result.id).toBe('ar-1');
    });

    it('should update agent registry', async () => {
      mockRepo.getAgentRegistry.mockResolvedValue({ id: 'ar-1' });
      mockRepo.updateAgentRegistry.mockResolvedValue({ id: 'ar-1', status: 'active' });
      const { EduOSAgentRegistryService } = await import('../eduos-agent-registry.service');
      const service = new EduOSAgentRegistryService({} as any);
      const result = await service.updateAgentRegistry('school-1', 'ar-1', { status: 'active' });
      expect(result.status).toBe('active');
    });

    it('should delete agent registry', async () => {
      mockRepo.getAgentRegistry.mockResolvedValue({ id: 'ar-1' });
      mockRepo.deleteAgentRegistry.mockResolvedValue(undefined);
      const { EduOSAgentRegistryService } = await import('../eduos-agent-registry.service');
      const service = new EduOSAgentRegistryService({} as any);
      await service.deleteAgentRegistry('school-1', 'ar-1');
      expect(mockRepo.deleteAgentRegistry).toHaveBeenCalledWith('school-1', 'ar-1');
    });
  });

  describe('PlanningEngineService', () => {
    it('should create service', async () => {
      const { EduOSPlanningEngineService } = await import('../eduos-planning-engine.service');
      const service = new EduOSPlanningEngineService({} as any);
      expect(service).toBeDefined();
    });

    it('should get planning engine', async () => {
      mockRepo.getPlanningEngine.mockResolvedValue({ id: 'pe-1', name: 'Schedule Optimizer' });
      const { EduOSPlanningEngineService } = await import('../eduos-planning-engine.service');
      const service = new EduOSPlanningEngineService({} as any);
      const result = await service.getPlanningEngine('school-1', 'pe-1');
      expect(result.id).toBe('pe-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getPlanningEngine.mockResolvedValue(null);
      const { EduOSPlanningEngineService } = await import('../eduos-planning-engine.service');
      const service = new EduOSPlanningEngineService({} as any);
      await expect(service.getPlanningEngine('school-1', 'pe-1')).rejects.toThrow();
    });

    it('should list planning engines', async () => {
      mockRepo.listPlanningEngines.mockResolvedValue([{ id: 'pe-1' }]);
      const { EduOSPlanningEngineService } = await import('../eduos-planning-engine.service');
      const service = new EduOSPlanningEngineService({} as any);
      const result = await service.listPlanningEngines('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create planning engine', async () => {
      mockRepo.createPlanningEngine.mockResolvedValue({ id: 'pe-1' });
      const { EduOSPlanningEngineService } = await import('../eduos-planning-engine.service');
      const service = new EduOSPlanningEngineService({} as any);
      const result = await service.createPlanningEngine('school-1', { name: 'Schedule Optimizer' });
      expect(result.id).toBe('pe-1');
    });

    it('should update planning engine', async () => {
      mockRepo.getPlanningEngine.mockResolvedValue({ id: 'pe-1' });
      mockRepo.updatePlanningEngine.mockResolvedValue({ id: 'pe-1', version: '2.0' });
      const { EduOSPlanningEngineService } = await import('../eduos-planning-engine.service');
      const service = new EduOSPlanningEngineService({} as any);
      const result = await service.updatePlanningEngine('school-1', 'pe-1', { version: '2.0' });
      expect(result.version).toBe('2.0');
    });

    it('should delete planning engine', async () => {
      mockRepo.getPlanningEngine.mockResolvedValue({ id: 'pe-1' });
      mockRepo.deletePlanningEngine.mockResolvedValue(undefined);
      const { EduOSPlanningEngineService } = await import('../eduos-planning-engine.service');
      const service = new EduOSPlanningEngineService({} as any);
      await service.deletePlanningEngine('school-1', 'pe-1');
      expect(mockRepo.deletePlanningEngine).toHaveBeenCalledWith('school-1', 'pe-1');
    });
  });
});
