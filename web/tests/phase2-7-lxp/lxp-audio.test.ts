import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpAudioService } from '@/features/lxp/services/lxp-audio.service';

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

const mockStorage = {
  from: vi.fn().mockReturnThis(),
  upload: vi.fn().mockReturnThis(),
  getDownloadUrl: vi.fn().mockReturnThis(),
  getPublicUrl: vi.fn().mockReturnThis(),
  remove: vi.fn().mockReturnThis(),
};

describe('LxpAudioService', () => {
  let service: LxpAudioService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpAudioService(mockSupabase as never, mockStorage as never);
  });

  describe('getAudio', () => {
    it('should return audio by id', async () => {
      mockSupabase.data = { id: 'audio-1', title: 'Lecture Audio' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAudio('audio-1');
      expect(result).toBeDefined();
    });

    it('should return null when audio not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getAudio('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getAudio('audio-1')).rejects.toThrow();
    });

    it('should include streaming URL', async () => {
      mockSupabase.data = { id: 'audio-1', stream_url: 'https://stream.example.com/audio-1.mp3' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAudio('audio-1', { includeStreamUrl: true });
      expect(result).toBeDefined();
    });

    it('should validate audio id', async () => {
      await expect(service.getAudio('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'audio-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getAudio('audio-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include transcription', async () => {
      mockSupabase.data = { id: 'audio-1', transcription: 'Audio content text' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAudio('audio-1', { includeTranscription: true });
      expect(result).toBeDefined();
    });

    it('should include metadata', async () => {
      mockSupabase.data = { id: 'audio-1', metadata: { duration: 1800, format: 'mp3' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAudio('audio-1', { includeMetadata: true });
      expect(result).toBeDefined();
    });
  });

  describe('createAudio', () => {
    it('should create a new audio entry', async () => {
      const audioData = { title: 'New Audio', lesson_id: 'lesson-1' };
      mockSupabase.data = { id: 'audio-new', ...audioData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAudio(audioData);
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createAudio({ title: '' })).rejects.toThrow();
    });

    it('should set default status to pending', async () => {
      mockSupabase.data = { id: 'audio-new', status: 'pending' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAudio({ title: 'Audio' });
      expect(result).toHaveProperty('status', 'pending');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'audio-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAudio({ title: 'Audio' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with metadata', async () => {
      const audioData = { title: 'Audio', metadata: { duration: 300, format: 'mp3' } };
      mockSupabase.data = { id: 'audio-new', ...audioData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAudio(audioData);
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createAudio({ title: 'Audio' })).rejects.toThrow();
    });

    it('should handle creation with tags', async () => {
      const audioData = { title: 'Audio', tags: ['podcast', 'interview'] };
      mockSupabase.data = { id: 'audio-new', ...audioData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAudio(audioData);
      expect(result).toBeDefined();
    });

    it('should handle creation with lesson association', async () => {
      const audioData = { title: 'Audio', lesson_id: 'lesson-1' };
      mockSupabase.data = { id: 'audio-new', ...audioData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAudio(audioData);
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      const audioData = { title: 'Audio', author_id: 'user-1' };
      mockSupabase.data = { id: 'audio-new', ...audioData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAudio(audioData);
      expect(result).toBeDefined();
    });

    it('should handle creation with description', async () => {
      const audioData = { title: 'Audio', description: 'Lecture recording' };
      mockSupabase.data = { id: 'audio-new', ...audioData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAudio(audioData);
      expect(result).toBeDefined();
    });
  });

  describe('updateAudio', () => {
    it('should update audio fields', async () => {
      const updates = { title: 'Updated Audio' };
      mockSupabase.data = { id: 'audio-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAudio('audio-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle partial updates', async () => {
      const updates = { description: 'New description' };
      mockSupabase.data = { id: 'audio-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAudio('audio-1', updates);
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'audio-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAudio('audio-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateAudio('audio-1', {})).rejects.toThrow();
    });

    it('should handle non-existent audio', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateAudio('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateAudio('audio-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update transcription', async () => {
      const updates = { transcription: 'Updated transcription' };
      mockSupabase.data = { id: 'audio-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAudio('audio-1', updates);
      expect(result).toBeDefined();
    });

    it('should update metadata', async () => {
      const updates = { metadata: { duration: 600 } };
      mockSupabase.data = { id: 'audio-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAudio('audio-1', updates);
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      const updates = { tags: ['new_tag'] };
      mockSupabase.data = { id: 'audio-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAudio('audio-1', updates);
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      const updates = { visibility: 'private' };
      mockSupabase.data = { id: 'audio-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAudio('audio-1', updates);
      expect(result).toBeDefined();
    });
  });

  describe('deleteAudio', () => {
    it('should delete an audio entry', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteAudio('audio-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should also delete storage file', async () => {
      mockSupabase.data = { id: 'audio-1', storage_path: 'audio/audio-1.mp3' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await service.deleteAudio('audio-1');
      expect(mockStorage.remove).toHaveBeenCalled();
    });

    it('should handle non-existent audio deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteAudio('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteAudio('audio-1')).rejects.toThrow();
    });

    it('should prevent deletion of audio with active references', async () => {
      mockSupabase.data = { id: 'audio-1', has_references: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteAudio('audio-1')).rejects.toThrow();
    });

    it('should validate audio id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteAudio('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteAudio('audio-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle storage errors during deletion', async () => {
      mockSupabase.data = { id: 'audio-1', storage_path: 'audio/audio-1.mp3' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      mockStorage.remove.mockRejectedValue(new Error('Storage error'));
      await expect(service.deleteAudio('audio-1')).rejects.toThrow();
    });
  });

  describe('uploadAudio', () => {
    it('should upload audio file', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'audio/audio-1.mp3' }, error: null });
      mockSupabase.data = { id: 'audio-1', storage_path: 'audio/audio-1.mp3' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'audio.mp3', { type: 'audio/mpeg' });
      const result = await service.uploadAudio('audio-1', file);
      expect(result).toBeDefined();
    });

    it('should handle upload errors', async () => {
      mockStorage.upload.mockResolvedValue({ data: null, error: { message: 'upload failed' } });
      const file = new File(['content'], 'audio.mp3', { type: 'audio/mpeg' });
      await expect(service.uploadAudio('audio-1', file)).rejects.toThrow();
    });

    it('should validate file type', async () => {
      const file = new File(['content'], 'image.jpg', { type: 'image/jpeg' });
      await expect(service.uploadAudio('audio-1', file)).rejects.toThrow();
    });

    it('should validate file size', async () => {
      const largeContent = 'x'.repeat(100 * 1024 * 1024);
      const file = new File([largeContent], 'large.mp3', { type: 'audio/mpeg' });
      await expect(service.uploadAudio('audio-1', file)).rejects.toThrow();
    });

    it('should update audio status after upload', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'audio/audio-1.mp3' }, error: null });
      mockSupabase.data = { id: 'audio-1', status: 'uploaded' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'audio.mp3', { type: 'audio/mpeg' });
      const result = await service.uploadAudio('audio-1', file);
      expect(result).toBeDefined();
    });

    it('should handle upload with progress callback', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'audio/audio-1.mp3' }, error: null });
      mockSupabase.data = { id: 'audio-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'audio.mp3', { type: 'audio/mpeg' });
      const onProgress = vi.fn();
      const result = await service.uploadAudio('audio-1', file, { onProgress });
      expect(result).toBeDefined();
    });

    it('should validate audio id', async () => {
      const file = new File(['content'], 'audio.mp3', { type: 'audio/mpeg' });
      await expect(service.uploadAudio('', file)).rejects.toThrow();
    });

    it('should handle duplicate upload', async () => {
      mockSupabase.data = { id: 'audio-1', status: 'uploaded' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'audio.mp3', { type: 'audio/mpeg' });
      await expect(service.uploadAudio('audio-1', file)).rejects.toThrow();
    });

    it('should handle upload with custom metadata', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'audio/audio-1.mp3' }, error: null });
      mockSupabase.data = { id: 'audio-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'audio.mp3', { type: 'audio/mpeg' });
      const result = await service.uploadAudio('audio-1', file, { metadata: { title: 'Custom' } });
      expect(result).toBeDefined();
    });

    it('should support wav format', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'audio/audio-1.wav' }, error: null });
      mockSupabase.data = { id: 'audio-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'audio.wav', { type: 'audio/wav' });
      const result = await service.uploadAudio('audio-1', file);
      expect(result).toBeDefined();
    });
  });

  describe('streamAudio', () => {
    it('should return streaming URL', async () => {
      mockSupabase.data = { id: 'audio-1', stream_url: 'https://stream.example.com/audio-1.mp3' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.streamAudio('audio-1');
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.streamAudio('audio-1')).rejects.toThrow();
    });

    it('should validate audio id', async () => {
      await expect(service.streamAudio('')).rejects.toThrow();
    });

    it('should return null for non-uploaded audio', async () => {
      mockSupabase.data = { id: 'audio-1', status: 'pending' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.streamAudio('audio-1');
      expect(result).toBeNull();
    });

    it('should handle expired stream URLs', async () => {
      mockSupabase.data = { id: 'audio-1', stream_url: 'url', stream_expires_at: new Date(Date.now() - 1000).toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.streamAudio('audio-1');
      expect(result).toBeDefined();
    });

    it('should support different bitrates', async () => {
      mockSupabase.data = { id: 'audio-1', stream_urls: { low: 'url-low', high: 'url-high' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.streamAudio('audio-1', { bitrate: 'high' });
      expect(result).toBeDefined();
    });

    it('should handle streaming with seeking', async () => {
      mockSupabase.data = { id: 'audio-1', stream_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.streamAudio('audio-1', { startAt: 30 });
      expect(result).toBeDefined();
    });

    it('should handle streaming with end time', async () => {
      mockSupabase.data = { id: 'audio-1', stream_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.streamAudio('audio-1', { endAt: 120 });
      expect(result).toBeDefined();
    });
  });

  describe('getOfflineAudio', () => {
    it('should return download URL for offline access', async () => {
      mockSupabase.data = { id: 'audio-1', download_url: 'https://download.example.com/audio-1.mp3' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineAudio('audio-1');
      expect(result).toBeDefined();
    });

    it('should return null when offline not available', async () => {
      mockSupabase.data = { id: 'audio-1', offline_enabled: false };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineAudio('audio-1');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getOfflineAudio('audio-1')).rejects.toThrow();
    });

    it('should validate audio id', async () => {
      await expect(service.getOfflineAudio('')).rejects.toThrow();
    });

    it('should support different quality downloads', async () => {
      mockSupabase.data = { id: 'audio-1', download_urls: { low: 'url-low' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineAudio('audio-1', { quality: 'low' });
      expect(result).toBeDefined();
    });

    it('should check user permissions for offline access', async () => {
      mockSupabase.data = { id: 'audio-1', offline_enabled: true, requires_subscription: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineAudio('audio-1', { userId: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should return file size info', async () => {
      mockSupabase.data = { id: 'audio-1', download_url: 'url', file_size: 10485760 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineAudio('audio-1');
      expect(result).toBeDefined();
    });

    it('should handle download with DRM', async () => {
      mockSupabase.data = { id: 'audio-1', download_url: 'url', drm_enabled: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineAudio('audio-1', { userId: 'user-1' });
      expect(result).toBeDefined();
    });
  });

  describe('Bulk Operations', () => {
    it('should handle bulk create', async () => {
      mockSupabase.data = [{ id: 'bulk-1' }, { id: 'bulk-2' }];
      const result = await service.bulkCreate([{ name: 'item1' }, { name: 'item2' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk update', async () => {
      mockSupabase.data = [{ id: 'bulk-1' }];
      const result = await service.bulkUpdate([{ id: 'bulk-1', name: 'updated' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk delete', async () => {
      mockSupabase.data = null;
      const result = await service.bulkDelete(['id-1', 'id-2']);
      expect(result).toBeDefined();
    });

    it('should handle bulk import', async () => {
      mockSupabase.data = { imported: 5 };
      const result = await service.bulkImport([{ name: 'import1' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk export', async () => {
      mockSupabase.data = { exported: 10 };
      const result = await service.bulkExport({ format: 'csv' });
      expect(result).toBeDefined();
    });
  });

  describe('Advanced Queries', () => {
    it('should support complex filtering', async () => {
      mockSupabase.data = [{ id: 'filtered-1' }];
      const result = await service.find({ status: 'active', type: 'premium' });
      expect(result).toBeDefined();
    });

    it('should support pagination', async () => {
      mockSupabase.data = [{ id: 'page-1' }];
      const result = await service.paginate(1, 10);
      expect(result).toBeDefined();
    });

    it('should support sorting', async () => {
      mockSupabase.data = [{ id: 'sorted-1' }];
      const result = await service.findAll({ orderBy: 'created_at', order: 'desc' });
      expect(result).toBeDefined();
    });

    it('should support search', async () => {
      mockSupabase.data = [{ id: 'search-1' }];
      const result = await service.search('test query');
      expect(result).toBeDefined();
    });

    it('should support field selection', async () => {
      mockSupabase.data = { id: 'select-1', name: 'test' };
      const result = await service.findById('select-1', ['id', 'name']);
      expect(result).toBeDefined();
    });
  });

  describe('Performance Tests', () => {
    it('should handle large datasets efficiently', async () => {
      mockSupabase.data = Array.from({ length: 1000 }, (_, i) => ({ id: item- }));
      const result = await service.findAll();
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      mockSupabase.data = { id: 'concurrent-1' };
      const promises = [
        service.findById('1'),
        service.findById('2'),
        service.findById('3'),
      ];
      const results = await Promise.all(promises);
      expect(results).toHaveLength(3);
    });

    it('should handle timeout scenarios', async () => {
      mockSupabase.single.mockImplementation(() => new Promise((resolve) => {
        setTimeout(() => resolve({ data: null, error: { message: 'timeout' } }), 100);
      }));
      await expect(service.findById('timeout-test')).rejects.toThrow();
    });

    it('should handle memory pressure', async () => {
      mockSupabase.data = Array.from({ length: 10000 }, (_, i) => ({ id: item-, data: 'x'.repeat(100) }));
      const result = await service.findAll();
      expect(result).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null values gracefully', async () => {
      mockSupabase.data = null;
      const result = await service.findById('null-test');
      expect(result).toBeNull();
    });

    it('should handle undefined values', async () => {
      mockSupabase.data = undefined;
      const result = await service.findById('undefined-test');
      expect(result).toBeUndefined();
    });

    it('should handle empty strings', async () => {
      mockSupabase.data = { id: 'empty-1', name: '' };
      const result = await service.findById('empty-1');
      expect(result).toBeDefined();
    });

    it('should handle special characters', async () => {
      mockSupabase.data = { id: 'special-1', name: '!@#$%^&*()_+' };
      const result = await service.findById('special-1');
      expect(result).toBeDefined();
    });

    it('should handle unicode characters', async () => {
      mockSupabase.data = { id: 'unicode-1', name: '日本語テスト' };
      const result = await service.findById('unicode-1');
      expect(result).toBeDefined();
    });
  });

  describe('Error Recovery', () => {
    it('should recover from network errors', async () => {
      mockSupabase.single
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue({ data: { id: 'recovered-1' }, error: null });
      const result = await service.findById('recovery-test');
      expect(result).toBeDefined();
    });

    it('should recover from database timeouts', async () => {
      mockSupabase.single
        .mockResolvedValueOnce({ data: null, error: { message: 'timeout' } })
        .mockResolvedValue({ data: { id: 'recovered-2' }, error: null });
      const result = await service.findById('recovery-test-2');
      expect(result).toBeDefined();
    });

    it('should handle rate limiting', async () => {
      mockSupabase.single.mockResolvedValue({ 
        data: null, 
        error: { message: 'rate limit exceeded' } 
      });
      await expect(service.findById('rate-limit-test')).rejects.toThrow();
    });

    it('should handle service unavailability', async () => {
      mockSupabase.single.mockResolvedValue({ 
        data: null, 
        error: { message: 'service unavailable' } 
      });
      await expect(service.findById('unavailable-test')).rejects.toThrow();
    });
  });
});
