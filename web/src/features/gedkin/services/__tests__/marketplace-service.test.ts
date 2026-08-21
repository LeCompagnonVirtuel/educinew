import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarketplaceService } from '../marketplace-service';

const mockProductRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByType: vi.fn(),
  findByStatus: vi.fn(),
};

const mockSubscriptionRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByProductId: vi.fn(),
  findByUserId: vi.fn(),
};

const mockAccessLogRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByProductId: vi.fn(),
};

const mockReviewRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByProductId: vi.fn(),
};

const mockSlaRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByProductId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const PRODUCT_ID = '660e8400-e29b-41d4-a716-446655440001';
const SUBSCRIPTION_ID = '770e8400-e29b-41d4-a716-446655440002';
const REVIEW_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockProduct = {
  id: PRODUCT_ID,
  school_id: SCHOOL_ID,
  name: 'Student Analytics Dataset',
  description: 'Comprehensive student analytics data',
  type: 'DATASET',
  version: '1.0.0',
  status: 'PUBLISHED',
  license: 'EDUCATIONAL',
  pricing: { monthly: 100 },
  schema: { fields: ['id', 'name'] },
  documentation: 'https://docs.example.com',
  rating: 4.5,
  downloads: 250,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockSubscription = {
  id: SUBSCRIPTION_ID,
  school_id: SCHOOL_ID,
  productId: PRODUCT_ID,
  userId: 'user-123',
  status: 'ACTIVE',
  startDate: '2024-01-01T00:00:00Z',
  endDate: '2024-12-31T00:00:00Z',
  usage: { queries: 100 },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockReview = {
  id: REVIEW_ID,
  school_id: SCHOOL_ID,
  productId: PRODUCT_ID,
  userId: 'user-123',
  rating: 4,
  comment: 'Great dataset',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: MarketplaceService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new MarketplaceService(
    mockProductRepo as never,
    mockSubscriptionRepo as never,
    mockAccessLogRepo as never,
    mockReviewRepo as never,
    mockSlaRepo as never,
  );
});

describe('MarketplaceService', () => {
  describe('listProducts', () => {
    it('should list products for a school', async () => {
      mockProductRepo.findAll.mockResolvedValue({ data: [mockProduct], total: 1, offset: 0, limit: 50 });

      const result = await service.listProducts(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listProducts('')).rejects.toThrow();
    });
  });

  describe('getProduct', () => {
    it('should retrieve a product by id', async () => {
      mockProductRepo.exists.mockResolvedValue(true);
      mockProductRepo.findById.mockResolvedValue(mockProduct);

      const result = await service.getProduct(SCHOOL_ID, PRODUCT_ID);

      expect(result).toEqual(mockProduct);
    });

    it('should throw if product not found', async () => {
      mockProductRepo.exists.mockResolvedValue(false);

      await expect(service.getProduct(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      mockProductRepo.create.mockResolvedValue(mockProduct);

      const result = await service.createProduct(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Student Analytics Dataset',
        description: 'Comprehensive student analytics data',
        type: 'DATASET',
        version: '1.0.0',
        status: 'PUBLISHED',
        license: 'EDUCATIONAL',
        pricing: { monthly: 100 },
        schema: { fields: ['id', 'name'] },
        documentation: 'https://docs.example.com',
        rating: 4.5,
        downloads: 250,
      });

      expect(result).toEqual(mockProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should soft delete a product', async () => {
      mockProductRepo.exists.mockResolvedValue(true);
      mockProductRepo.findById.mockResolvedValue(mockProduct);
      mockProductRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteProduct(SCHOOL_ID, PRODUCT_ID);

      expect(mockProductRepo.softDelete).toHaveBeenCalledWith(PRODUCT_ID, SCHOOL_ID);
    });
  });

  describe('listByType', () => {
    it('should list products by type', async () => {
      mockProductRepo.findByType.mockResolvedValue({ data: [mockProduct], total: 1, offset: 0, limit: 50 });

      const result = await service.listByType(SCHOOL_ID, 'DATASET');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createSubscription', () => {
    it('should create a subscription successfully', async () => {
      mockSubscriptionRepo.create.mockResolvedValue(mockSubscription);

      const result = await service.createSubscription(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        productId: PRODUCT_ID,
        userId: 'aa0e8400-e29b-41d4-a716-446655440010',
        status: 'ACTIVE',
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-12-31T00:00:00Z',
        usage: { queries: 100 },
      });

      expect(result).toEqual(mockSubscription);
    });
  });

  describe('listByProduct', () => {
    it('should list subscriptions by product', async () => {
      mockSubscriptionRepo.findByProductId.mockResolvedValue({ data: [mockSubscription], total: 1, offset: 0, limit: 50 });

      const result = await service.listByProduct(SCHOOL_ID, PRODUCT_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createAccessLog', () => {
    it('should create an access log successfully', async () => {
      const mockLog = {
        id: 'log-id',
        school_id: SCHOOL_ID,
        productId: PRODUCT_ID,
        userId: 'user-123',
        action: 'READ',
        details: { query: 'SELECT *' },
        timestamp: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockAccessLogRepo.create.mockResolvedValue(mockLog);

      const result = await service.createAccessLog(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        productId: PRODUCT_ID,
        userId: 'aa0e8400-e29b-41d4-a716-446655440010',
        action: 'READ',
        details: { query: 'SELECT *' },
      });

      expect(result.action).toBe('READ');
    });
  });

  describe('createReview', () => {
    it('should create a review successfully', async () => {
      mockReviewRepo.create.mockResolvedValue(mockReview);

      const result = await service.createReview(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        productId: PRODUCT_ID,
        userId: 'aa0e8400-e29b-41d4-a716-446655440010',
        rating: 4,
        comment: 'Great dataset',
      });

      expect(result).toEqual(mockReview);
    });
  });

  describe('listByProductForReviews', () => {
    it('should list reviews by product', async () => {
      mockReviewRepo.findByProductId.mockResolvedValue({ data: [mockReview], total: 1, offset: 0, limit: 50 });

      const result = await service.listByProductForReviews(SCHOOL_ID, PRODUCT_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('getMarketplaceStats', () => {
    it('should return marketplace statistics', async () => {
      mockProductRepo.findAll.mockResolvedValue({ data: [mockProduct], total: 1, offset: 0, limit: 1000 });
      mockSubscriptionRepo.findAll.mockResolvedValue({ data: [mockSubscription], total: 1, offset: 0, limit: 1000 });
      mockReviewRepo.findAll.mockResolvedValue({ data: [mockReview], total: 1, offset: 0, limit: 1000 });

      const result = await service.getMarketplaceStats(SCHOOL_ID);

      expect(result.totalProducts).toBe(1);
      expect(result.totalSubscriptions).toBe(1);
      expect(result.totalReviews).toBe(1);
      expect(result.averageRating).toBe(4);
    });
  });
});
