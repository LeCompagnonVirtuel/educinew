import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpNoteService } from '@/features/lxp/services/lxp-note.service';

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

describe('LxpNoteService', () => {
  let service: LxpNoteService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpNoteService(mockSupabase as never);
  });

  describe('GetNote', () => {
    it('should getNote note successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNote('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when note not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNote('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNote', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNote('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNote', async () => {
      await expect(service.GetNote('')).rejects.toThrow();
    });
  });
  describe('CreateNote', () => {
    it('should createNote note successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateNote('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when note not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateNote('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createNote', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateNote('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createNote', async () => {
      await expect(service.CreateNote('')).rejects.toThrow();
    });
  });
  describe('UpdateNote', () => {
    it('should updateNote note successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateNote('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when note not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateNote('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateNote', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateNote('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateNote', async () => {
      await expect(service.UpdateNote('')).rejects.toThrow();
    });
  });
  describe('DeleteNote', () => {
    it('should deleteNote note successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteNote('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when note not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteNote('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteNote', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteNote('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteNote', async () => {
      await expect(service.DeleteNote('')).rejects.toThrow();
    });
  });
  describe('GetNotesByLesson', () => {
    it('should getNotesByLesson note successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNotesByLesson('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when note not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNotesByLesson('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNotesByLesson', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNotesByLesson('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNotesByLesson', async () => {
      await expect(service.GetNotesByLesson('')).rejects.toThrow();
    });
  });
  describe('GetNotesByStudent', () => {
    it('should getNotesByStudent note successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNotesByStudent('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when note not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNotesByStudent('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNotesByStudent', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNotesByStudent('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNotesByStudent', async () => {
      await expect(service.GetNotesByStudent('')).rejects.toThrow();
    });
  });
  describe('SearchNotes', () => {
    it('should searchNotes note successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.SearchNotes('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when note not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.SearchNotes('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during searchNotes', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.SearchNotes('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for searchNotes', async () => {
      await expect(service.SearchNotes('')).rejects.toThrow();
    });
  });
  describe('ShareNote', () => {
    it('should shareNote note successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.ShareNote('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when note not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.ShareNote('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during shareNote', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.ShareNote('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for shareNote', async () => {
      await expect(service.ShareNote('')).rejects.toThrow();
    });
  });
  describe('GetSharedNotes', () => {
    it('should getSharedNotes note successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetSharedNotes('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when note not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetSharedNotes('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getSharedNotes', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetSharedNotes('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getSharedNotes', async () => {
      await expect(service.GetSharedNotes('')).rejects.toThrow();
    });
  });
  describe('GetNoteStats', () => {
    it('should getNoteStats note successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNoteStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when note not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNoteStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNoteStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNoteStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNoteStats', async () => {
      await expect(service.GetNoteStats('')).rejects.toThrow();
    });
  });

});
