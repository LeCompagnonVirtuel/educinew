import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Data Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getDataMesh: vi.fn(),
      listDataMeshs: vi.fn(),
      createDataMesh: vi.fn(),
      updateDataMesh: vi.fn(),
      deleteDataMesh: vi.fn(),
      getDataCatalog: vi.fn(),
      listDataCatalogs: vi.fn(),
      createDataCatalog: vi.fn(),
      updateDataCatalog: vi.fn(),
      deleteDataCatalog: vi.fn(),
      getETLPipeline: vi.fn(),
      listETLPipelines: vi.fn(),
      createETLPipeline: vi.fn(),
      updateETLPipeline: vi.fn(),
      deleteETLPipeline: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('DataMeshService', () => {
    it('should create service', async () => {
      const { EduOSDataMeshService } = await import('../eduos-data-mesh.service');
      const service = new EduOSDataMeshService({} as any);
      expect(service).toBeDefined();
    });

    it('should get data mesh', async () => {
      mockRepo.getDataMesh.mockResolvedValue({ id: 'dm-1', name: 'Student Data Mesh' });
      const { EduOSDataMeshService } = await import('../eduos-data-mesh.service');
      const service = new EduOSDataMeshService({} as any);
      const result = await service.getDataMesh('school-1', 'dm-1');
      expect(result.id).toBe('dm-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getDataMesh.mockResolvedValue(null);
      const { EduOSDataMeshService } = await import('../eduos-data-mesh.service');
      const service = new EduOSDataMeshService({} as any);
      await expect(service.getDataMesh('school-1', 'dm-1')).rejects.toThrow();
    });

    it('should list data meshes', async () => {
      mockRepo.listDataMeshs.mockResolvedValue([{ id: 'dm-1' }]);
      const { EduOSDataMeshService } = await import('../eduos-data-mesh.service');
      const service = new EduOSDataMeshService({} as any);
      const result = await service.listDataMeshs('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create data mesh', async () => {
      mockRepo.createDataMesh.mockResolvedValue({ id: 'dm-1' });
      const { EduOSDataMeshService } = await import('../eduos-data-mesh.service');
      const service = new EduOSDataMeshService({} as any);
      const result = await service.createDataMesh('school-1', { name: 'Student Data Mesh' });
      expect(result.id).toBe('dm-1');
    });

    it('should update data mesh', async () => {
      mockRepo.getDataMesh.mockResolvedValue({ id: 'dm-1' });
      mockRepo.updateDataMesh.mockResolvedValue({ id: 'dm-1', status: 'active' });
      const { EduOSDataMeshService } = await import('../eduos-data-mesh.service');
      const service = new EduOSDataMeshService({} as any);
      const result = await service.updateDataMesh('school-1', 'dm-1', { status: 'active' });
      expect(result.status).toBe('active');
    });

    it('should delete data mesh', async () => {
      mockRepo.getDataMesh.mockResolvedValue({ id: 'dm-1' });
      mockRepo.deleteDataMesh.mockResolvedValue(undefined);
      const { EduOSDataMeshService } = await import('../eduos-data-mesh.service');
      const service = new EduOSDataMeshService({} as any);
      await service.deleteDataMesh('school-1', 'dm-1');
      expect(mockRepo.deleteDataMesh).toHaveBeenCalledWith('school-1', 'dm-1');
    });
  });

  describe('EtlPipelineService', () => {
    it('should create service', async () => {
      const { EduOSETLPipelineService } = await import('../eduos-etl-pipeline.service');
      const service = new EduOSETLPipelineService({} as any);
      expect(service).toBeDefined();
    });

    it('should get etl pipeline', async () => {
      mockRepo.getETLPipeline.mockResolvedValue({ id: 'etl-1', name: 'Daily Sync' });
      const { EduOSETLPipelineService } = await import('../eduos-etl-pipeline.service');
      const service = new EduOSETLPipelineService({} as any);
      const result = await service.getETLPipeline('school-1', 'etl-1');
      expect(result.id).toBe('etl-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getETLPipeline.mockResolvedValue(null);
      const { EduOSETLPipelineService } = await import('../eduos-etl-pipeline.service');
      const service = new EduOSETLPipelineService({} as any);
      await expect(service.getETLPipeline('school-1', 'etl-1')).rejects.toThrow();
    });

    it('should list etl pipelines', async () => {
      mockRepo.listETLPipelines.mockResolvedValue([{ id: 'etl-1' }]);
      const { EduOSETLPipelineService } = await import('../eduos-etl-pipeline.service');
      const service = new EduOSETLPipelineService({} as any);
      const result = await service.listETLPipelines('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create etl pipeline', async () => {
      mockRepo.createETLPipeline.mockResolvedValue({ id: 'etl-1' });
      const { EduOSETLPipelineService } = await import('../eduos-etl-pipeline.service');
      const service = new EduOSETLPipelineService({} as any);
      const result = await service.createETLPipeline('school-1', { name: 'Daily Sync' });
      expect(result.id).toBe('etl-1');
    });

    it('should update etl pipeline', async () => {
      mockRepo.getETLPipeline.mockResolvedValue({ id: 'etl-1' });
      mockRepo.updateETLPipeline.mockResolvedValue({ id: 'etl-1', schedule: '0 2 * * *' });
      const { EduOSETLPipelineService } = await import('../eduos-etl-pipeline.service');
      const service = new EduOSETLPipelineService({} as any);
      const result = await service.updateETLPipeline('school-1', 'etl-1', { schedule: '0 2 * * *' });
      expect(result.schedule).toBe('0 2 * * *');
    });

    it('should delete etl pipeline', async () => {
      mockRepo.getETLPipeline.mockResolvedValue({ id: 'etl-1' });
      mockRepo.deleteETLPipeline.mockResolvedValue(undefined);
      const { EduOSETLPipelineService } = await import('../eduos-etl-pipeline.service');
      const service = new EduOSETLPipelineService({} as any);
      await service.deleteETLPipeline('school-1', 'etl-1');
      expect(mockRepo.deleteETLPipeline).toHaveBeenCalledWith('school-1', 'etl-1');
    });
  });
});
