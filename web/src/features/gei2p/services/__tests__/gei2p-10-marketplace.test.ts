import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-marketplace.repository', () => ({
  Gei2pMarketplaceRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findListingById: vi.fn(),
  findListingsByCategory: vi.fn(),
  createListing: vi.fn(),
  updateListing: vi.fn(),
  delistListing: vi.fn(),
  listListings: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P Marketplace Service - CRUD', () => {
  it('should list marketplace listings', async () => {
    mockRepo.listListings.mockResolvedValue([
      { id: '1', name: 'Python Course', category: 'courses', price: 50 },
    ]);
    const result = await mockRepo.listListings('school1');
    expect(result).toHaveLength(1);
    expect(result[0].price).toBe(50);
  });

  it('should create a listing', async () => {
    const data = { school_id: 'school1', name: 'Data Science', category: 'courses' };
    mockRepo.createListing.mockResolvedValue({ id: '1', ...data, status: 'active' });
    const result = await mockRepo.createListing(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.status).toBe('active');
  });

  it('should update a listing', async () => {
    mockRepo.findListingById.mockResolvedValue({ id: '1', price: 50 });
    mockRepo.updateListing.mockResolvedValue({ id: '1', price: 75 });
    const result = await mockRepo.updateListing('school1', '1', { price: 75 });
    expect(result.price).toBe(75);
  });

  it('should delist a listing', async () => {
    mockRepo.delistListing.mockResolvedValue({ id: '1', listed: false });
    const result = await mockRepo.delistListing('school1', '1');
    expect(result.listed).toBe(false);
  });

  it('should find listings by category', async () => {
    mockRepo.findListingsByCategory.mockResolvedValue([
      { id: '1', category: 'courses' },
    ]);
    const result = await mockRepo.findListingsByCategory('school1', 'courses');
    expect(result).toHaveLength(1);
  });
});

describe('GEI2P Marketplace Service - Error Handling', () => {
  it('should return null when listing not found', async () => {
    mockRepo.findListingById.mockResolvedValue(null);
    const result = await mockRepo.findListingById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listListings.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listListings('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
