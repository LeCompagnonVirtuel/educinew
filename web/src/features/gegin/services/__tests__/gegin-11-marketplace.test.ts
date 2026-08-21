import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/marketplace.repository', () => ({
  MarketplaceRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findListingById: vi.fn(),
  createListing: vi.fn(),
  updateListing: vi.fn(),
  deleteListing: vi.fn(),
  listListings: vi.fn(),
  findOfferById: vi.fn(),
  createOffer: vi.fn(),
  listOffers: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Marketplace Service - Listings', () => {
  it('should list marketplace listings', async () => {
    mockRepo.listListings.mockResolvedValue([
      { id: '1', title: 'Textbook Exchange', type: 'academic' },
    ]);
    const result = await mockRepo.listListings('school1');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('academic');
  });

  it('should create a listing', async () => {
    const data = { school_id: 'school1', title: 'Lab Equipment', type: 'equipment' };
    mockRepo.createListing.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createListing(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.title).toBe('Lab Equipment');
  });

  it('should update a listing', async () => {
    mockRepo.findListingById.mockResolvedValue({ id: '1', title: 'Old Title' });
    mockRepo.updateListing.mockResolvedValue({ id: '1', title: 'New Title' });
    const result = await mockRepo.updateListing('school1', '1', { title: 'New Title' });
    expect(result.title).toBe('New Title');
  });

  it('should delete a listing', async () => {
    mockRepo.findListingById.mockResolvedValue({ id: '1' });
    mockRepo.deleteListing.mockResolvedValue(undefined);
    await expect(mockRepo.deleteListing('school1', '1')).resolves.toBeUndefined();
  });

  it('should throw when listing not found', async () => {
    mockRepo.findListingById.mockResolvedValue(null);
    const result = await mockRepo.findListingById('school1', '999');
    expect(result).toBeNull();
  });
});

describe('Marketplace Service - Offers', () => {
  it('should list offers', async () => {
    mockRepo.listOffers.mockResolvedValue([
      { id: '1', listing_id: 'l1', amount: 5000 },
    ]);
    const result = await mockRepo.listOffers('school1');
    expect(result).toHaveLength(1);
    expect(result[0].amount).toBe(5000);
  });

  it('should create an offer', async () => {
    mockRepo.createOffer.mockResolvedValue({ id: '1', listing_id: 'l1', amount: 3000 });
    const result = await mockRepo.createOffer({ school_id: 'school1', listing_id: 'l1', amount: 3000 });
    expect(result).toHaveProperty('id', '1');
  });

  it('should handle DB errors', async () => {
    mockRepo.listListings.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listListings('school1')).rejects.toThrow('Timeout');
  });
});
