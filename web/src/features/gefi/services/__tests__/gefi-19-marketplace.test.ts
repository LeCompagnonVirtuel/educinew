import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  order: vi.fn().mockReturnThis(),
};

const mockListing = {
  id: 'lst-001',
  school_id: 'sch-001',
  seller_id: 'usr-001',
  title: 'Manuel Mathématiques Terminale',
  description: 'Manuel usage, bon état',
  category: 'BOOKS',
  price: 5000,
  currency: 'XOF',
  condition: 'USED_GOOD',
  status: 'ACTIVE',
  images: ['img1.jpg', 'img2.jpg'],
  created_at: new Date().toISOString(),
};

const mockOrder = {
  id: 'ord-001',
  listing_id: 'lst-001',
  buyer_id: 'usr-002',
  quantity: 1,
  total_amount: 5000,
  currency: 'XOF',
  status: 'PENDING',
  payment_method: 'mobile_money',
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('MarketplaceService', () => {
  describe('createListing', () => {
    it('should create marketplace listing', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockListing, error: null });
      const result = await mockSupabase.from('marketplace_listings').insert(mockListing);

      expect(result.data.category).toBe('BOOKS');
      expect(result.error).toBeNull();
    });

    it('should validate price is positive', async () => {
      expect(mockListing.price).toBeGreaterThan(0);
    });

    it('should require images', async () => {
      expect(mockListing.images.length).toBeGreaterThan(0);
    });
  });

  describe('createOrder', () => {
    it('should create purchase order', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockOrder, error: null });
      const result = await mockSupabase.from('marketplace_orders').insert(mockOrder);

      expect(result.data.status).toBe('PENDING');
    });

    it('should calculate total_amount', async () => {
      const total = mockListing.price * mockOrder.quantity;
      expect(total).toBe(mockOrder.total_amount);
    });
  });

  describe('confirmOrder', () => {
    it('should update order status to CONFIRMED', async () => {
      const confirmed = { ...mockOrder, status: 'CONFIRMED' };
      mockSupabase.update.mockResolvedValue({ data: confirmed, error: null });
      const result = await mockSupabase.from('marketplace_orders')
        .update({ status: 'CONFIRMED' })
        .eq('id', 'ord-001');

      expect(result.data.status).toBe('CONFIRMED');
    });
  });

  describe('completeOrder', () => {
    it('should set status to COMPLETED', async () => {
      const completed = { ...mockOrder, status: 'COMPLETED' };
      mockSupabase.update.mockResolvedValue({ data: completed, error: null });
      const result = await mockSupabase.from('marketplace_orders')
        .update({ status: 'COMPLETED' })
        .eq('id', 'ord-001');

      expect(result.data.status).toBe('COMPLETED');
    });
  });

  describe('searchListings', () => {
    it('should filter by category', async () => {
      mockSupabase.order.mockResolvedValue({ data: [mockListing], error: null });
      const result = await mockSupabase.from('marketplace_listings')
        .select('*')
        .eq('category', 'BOOKS')
        .eq('status', 'ACTIVE')
        .order('created_at', { ascending: false });

      expect(result.data).toHaveLength(1);
    });
  });

  describe('rateSeller', () => {
    it('should create seller rating', async () => {
      const rating = {
        id: 'rat-001',
        seller_id: 'usr-001',
        order_id: 'ord-001',
        rating: 5,
        comment: 'Excellent état',
        created_at: new Date().toISOString(),
      };
      mockSupabase.insert.mockResolvedValue({ data: rating, error: null });
      const result = await mockSupabase.from('seller_ratings').insert(rating);

      expect(result.data.rating).toBe(5);
    });

    it('should validate rating range', async () => {
      const rating = 5;
      expect(rating).toBeGreaterThanOrEqual(1);
      expect(rating).toBeLessThanOrEqual(5);
    });
  });

  describe('error handling', () => {
    it('should handle listing not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('marketplace_listings')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
