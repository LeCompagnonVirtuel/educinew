import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Marketplace Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getMarketplaceProduct: vi.fn(),
      listMarketplaceProducts: vi.fn(),
      createMarketplaceProduct: vi.fn(),
      updateMarketplaceProduct: vi.fn(),
      deleteMarketplaceProduct: vi.fn(),
      getMarketplaceCourse: vi.fn(),
      listMarketplaceCourses: vi.fn(),
      createMarketplaceCourse: vi.fn(),
      updateMarketplaceCourse: vi.fn(),
      deleteMarketplaceCourse: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('MarketplaceProductService', () => {
    it('should create service', async () => {
      const { EduOSMarketplaceProductService } = await import('../eduos-marketplace-product.service');
      const service = new EduOSMarketplaceProductService({} as any);
      expect(service).toBeDefined();
    });

    it('should get marketplace product', async () => {
      mockRepo.getMarketplaceProduct.mockResolvedValue({ id: 'mp-1', name: 'Textbook' });
      const { EduOSMarketplaceProductService } = await import('../eduos-marketplace-product.service');
      const service = new EduOSMarketplaceProductService({} as any);
      const result = await service.getMarketplaceProduct('school-1', 'mp-1');
      expect(result.id).toBe('mp-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getMarketplaceProduct.mockResolvedValue(null);
      const { EduOSMarketplaceProductService } = await import('../eduos-marketplace-product.service');
      const service = new EduOSMarketplaceProductService({} as any);
      await expect(service.getMarketplaceProduct('school-1', 'mp-1')).rejects.toThrow();
    });

    it('should list marketplace products', async () => {
      mockRepo.listMarketplaceProducts.mockResolvedValue([{ id: 'mp-1' }]);
      const { EduOSMarketplaceProductService } = await import('../eduos-marketplace-product.service');
      const service = new EduOSMarketplaceProductService({} as any);
      const result = await service.listMarketplaceProducts('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create marketplace product', async () => {
      mockRepo.createMarketplaceProduct.mockResolvedValue({ id: 'mp-1' });
      const { EduOSMarketplaceProductService } = await import('../eduos-marketplace-product.service');
      const service = new EduOSMarketplaceProductService({} as any);
      const result = await service.createMarketplaceProduct('school-1', { name: 'Textbook' });
      expect(result.id).toBe('mp-1');
    });

    it('should update marketplace product', async () => {
      mockRepo.getMarketplaceProduct.mockResolvedValue({ id: 'mp-1' });
      mockRepo.updateMarketplaceProduct.mockResolvedValue({ id: 'mp-1', price: 25 });
      const { EduOSMarketplaceProductService } = await import('../eduos-marketplace-product.service');
      const service = new EduOSMarketplaceProductService({} as any);
      const result = await service.updateMarketplaceProduct('school-1', 'mp-1', { price: 25 });
      expect(result.price).toBe(25);
    });

    it('should delete marketplace product', async () => {
      mockRepo.getMarketplaceProduct.mockResolvedValue({ id: 'mp-1' });
      mockRepo.deleteMarketplaceProduct.mockResolvedValue(undefined);
      const { EduOSMarketplaceProductService } = await import('../eduos-marketplace-product.service');
      const service = new EduOSMarketplaceProductService({} as any);
      await service.deleteMarketplaceProduct('school-1', 'mp-1');
      expect(mockRepo.deleteMarketplaceProduct).toHaveBeenCalledWith('school-1', 'mp-1');
    });
  });

  describe('MarketplaceCourseService', () => {
    it('should create service', async () => {
      const { EduOSMarketplaceCourseService } = await import('../eduos-marketplace-course.service');
      const service = new EduOSMarketplaceCourseService({} as any);
      expect(service).toBeDefined();
    });

    it('should get marketplace course', async () => {
      mockRepo.getMarketplaceCourse.mockResolvedValue({ id: 'mc-1', title: 'Math 101' });
      const { EduOSMarketplaceCourseService } = await import('../eduos-marketplace-course.service');
      const service = new EduOSMarketplaceCourseService({} as any);
      const result = await service.getMarketplaceCourse('school-1', 'mc-1');
      expect(result.id).toBe('mc-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getMarketplaceCourse.mockResolvedValue(null);
      const { EduOSMarketplaceCourseService } = await import('../eduos-marketplace-course.service');
      const service = new EduOSMarketplaceCourseService({} as any);
      await expect(service.getMarketplaceCourse('school-1', 'mc-1')).rejects.toThrow();
    });

    it('should list marketplace courses', async () => {
      mockRepo.listMarketplaceCourses.mockResolvedValue([{ id: 'mc-1' }]);
      const { EduOSMarketplaceCourseService } = await import('../eduos-marketplace-course.service');
      const service = new EduOSMarketplaceCourseService({} as any);
      const result = await service.listMarketplaceCourses('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create marketplace course', async () => {
      mockRepo.createMarketplaceCourse.mockResolvedValue({ id: 'mc-1' });
      const { EduOSMarketplaceCourseService } = await import('../eduos-marketplace-course.service');
      const service = new EduOSMarketplaceCourseService({} as any);
      const result = await service.createMarketplaceCourse('school-1', { title: 'Math 101' });
      expect(result.id).toBe('mc-1');
    });

    it('should update marketplace course', async () => {
      mockRepo.getMarketplaceCourse.mockResolvedValue({ id: 'mc-1' });
      mockRepo.updateMarketplaceCourse.mockResolvedValue({ id: 'mc-1', price: 50 });
      const { EduOSMarketplaceCourseService } = await import('../eduos-marketplace-course.service');
      const service = new EduOSMarketplaceCourseService({} as any);
      const result = await service.updateMarketplaceCourse('school-1', 'mc-1', { price: 50 });
      expect(result.price).toBe(50);
    });

    it('should delete marketplace course', async () => {
      mockRepo.getMarketplaceCourse.mockResolvedValue({ id: 'mc-1' });
      mockRepo.deleteMarketplaceCourse.mockResolvedValue(undefined);
      const { EduOSMarketplaceCourseService } = await import('../eduos-marketplace-course.service');
      const service = new EduOSMarketplaceCourseService({} as any);
      await service.deleteMarketplaceCourse('school-1', 'mc-1');
      expect(mockRepo.deleteMarketplaceCourse).toHaveBeenCalledWith('school-1', 'mc-1');
    });
  });
});
