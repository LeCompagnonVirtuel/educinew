import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpOfficeHoursService } from '@/features/lxp/services/lxp-office-hours.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
  data: null as Record<string, unknown> | null,
  error: null as { message: string } | null,
};

describe('LxpOfficeHoursService', () => {
  let service: LxpOfficeHoursService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpOfficeHoursService(mockSupabase as never);
  });

  describe('GetOfficeHours', () => {
    it('should getOfficeHours office hours successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetOfficeHours('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when office hours not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetOfficeHours('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getOfficeHours', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetOfficeHours('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getOfficeHours', async () => {
      await expect(service.GetOfficeHours('')).rejects.toThrow();
    });
  });
  describe('CreateOfficeHours', () => {
    it('should createOfficeHours office hours successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateOfficeHours('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when office hours not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateOfficeHours('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createOfficeHours', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateOfficeHours('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createOfficeHours', async () => {
      await expect(service.CreateOfficeHours('')).rejects.toThrow();
    });
  });
  describe('UpdateOfficeHours', () => {
    it('should updateOfficeHours office hours successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateOfficeHours('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when office hours not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateOfficeHours('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateOfficeHours', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateOfficeHours('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateOfficeHours', async () => {
      await expect(service.UpdateOfficeHours('')).rejects.toThrow();
    });
  });
  describe('DeleteOfficeHours', () => {
    it('should deleteOfficeHours office hours successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteOfficeHours('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when office hours not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteOfficeHours('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteOfficeHours', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteOfficeHours('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteOfficeHours', async () => {
      await expect(service.DeleteOfficeHours('')).rejects.toThrow();
    });
  });
  describe('BookSlot', () => {
    it('should bookSlot office hours successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.BookSlot('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when office hours not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.BookSlot('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during bookSlot', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.BookSlot('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for bookSlot', async () => {
      await expect(service.BookSlot('')).rejects.toThrow();
    });
  });
  describe('CancelBooking', () => {
    it('should cancelBooking office hours successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CancelBooking('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when office hours not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CancelBooking('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during cancelBooking', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CancelBooking('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for cancelBooking', async () => {
      await expect(service.CancelBooking('')).rejects.toThrow();
    });
  });
  describe('GetAvailableSlots', () => {
    it('should getAvailableSlots office hours successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetAvailableSlots('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when office hours not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetAvailableSlots('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getAvailableSlots', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetAvailableSlots('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getAvailableSlots', async () => {
      await expect(service.GetAvailableSlots('')).rejects.toThrow();
    });
  });
  describe('GetOfficeHoursByInstructor', () => {
    it('should getOfficeHoursByInstructor office hours successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetOfficeHoursByInstructor('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when office hours not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetOfficeHoursByInstructor('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getOfficeHoursByInstructor', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetOfficeHoursByInstructor('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getOfficeHoursByInstructor', async () => {
      await expect(service.GetOfficeHoursByInstructor('')).rejects.toThrow();
    });
  });
  describe('GetOfficeHoursStats', () => {
    it('should getOfficeHoursStats office hours successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetOfficeHoursStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when office hours not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetOfficeHoursStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getOfficeHoursStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetOfficeHoursStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getOfficeHoursStats', async () => {
      await expect(service.GetOfficeHoursStats('')).rejects.toThrow();
    });
  });
  describe('GetUpcomingBookings', () => {
    it('should getUpcomingBookings office hours successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetUpcomingBookings('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when office hours not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetUpcomingBookings('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getUpcomingBookings', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetUpcomingBookings('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getUpcomingBookings', async () => {
      await expect(service.GetUpcomingBookings('')).rejects.toThrow();
    });
  });

});
