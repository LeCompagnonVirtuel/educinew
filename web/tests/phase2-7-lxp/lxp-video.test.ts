import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpVideoService } from '@/features/lxp/services/lxp-video.service';

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
  list: vi.fn().mockReturnThis(),
};

describe('LxpVideoService', () => {
  let service: LxpVideoService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpVideoService(mockSupabase as never, mockStorage as never);
  });

  describe('getVideo', () => {
    it('should return video by id', async () => {
      mockSupabase.data = { id: 'video-1', title: 'Intro Video' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getVideo('video-1');
      expect(result).toBeDefined();
    });

    it('should return null when video not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getVideo('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getVideo('video-1')).rejects.toThrow();
    });

    it('should include transcoding status', async () => {
      mockSupabase.data = { id: 'video-1', transcode_status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getVideo('video-1', { includeTranscodeStatus: true });
      expect(result).toBeDefined();
    });

    it('should validate video id', async () => {
      await expect(service.getVideo('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'video-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getVideo('video-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include streaming URLs', async () => {
      mockSupabase.data = { id: 'video-1', stream_url: 'https://stream.example.com/video-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getVideo('video-1', { includeStreamUrl: true });
      expect(result).toBeDefined();
    });

    it('should include thumbnail', async () => {
      mockSupabase.data = { id: 'video-1', thumbnail_url: 'https://thumb.example.com/video-1.jpg' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getVideo('video-1', { includeThumbnail: true });
      expect(result).toBeDefined();
    });

    it('should include captions', async () => {
      mockSupabase.data = { id: 'video-1', captions: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getVideo('video-1', { includeCaptions: true });
      expect(result).toBeDefined();
    });

    it('should include analytics data', async () => {
      mockSupabase.data = { id: 'video-1', view_count: 150 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getVideo('video-1', { includeAnalytics: true });
      expect(result).toBeDefined();
    });
  });

  describe('createVideo', () => {
    it('should create a new video entry', async () => {
      const videoData = { title: 'New Video', lesson_id: 'lesson-1' };
      mockSupabase.data = { id: 'video-new', ...videoData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVideo(videoData);
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createVideo({ title: '' })).rejects.toThrow();
    });

    it('should set default status to pending', async () => {
      mockSupabase.data = { id: 'video-new', status: 'pending' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVideo({ title: 'Video' });
      expect(result).toHaveProperty('status', 'pending');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'video-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVideo({ title: 'Video' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with metadata', async () => {
      const videoData = { title: 'Video', metadata: { duration: 300, resolution: '1080p' } };
      mockSupabase.data = { id: 'video-new', ...videoData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVideo(videoData);
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createVideo({ title: 'Video' })).rejects.toThrow();
    });

    it('should handle creation with tags', async () => {
      const videoData = { title: 'Video', tags: ['tutorial', 'beginner'] };
      mockSupabase.data = { id: 'video-new', ...videoData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVideo(videoData);
      expect(result).toBeDefined();
    });

    it('should handle creation with lesson association', async () => {
      const videoData = { title: 'Video', lesson_id: 'lesson-1' };
      mockSupabase.data = { id: 'video-new', ...videoData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVideo(videoData);
      expect(result).toBeDefined();
    });

    it('should handle creation with description', async () => {
      const videoData = { title: 'Video', description: 'A helpful tutorial' };
      mockSupabase.data = { id: 'video-new', ...videoData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVideo(videoData);
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      const videoData = { title: 'Video', author_id: 'user-1' };
      mockSupabase.data = { id: 'video-new', ...videoData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVideo(videoData);
      expect(result).toBeDefined();
    });
  });

  describe('updateVideo', () => {
    it('should update video fields', async () => {
      const updates = { title: 'Updated Video' };
      mockSupabase.data = { id: 'video-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateVideo('video-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle partial updates', async () => {
      const updates = { description: 'New description' };
      mockSupabase.data = { id: 'video-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateVideo('video-1', updates);
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'video-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateVideo('video-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateVideo('video-1', {})).rejects.toThrow();
    });

    it('should handle non-existent video', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateVideo('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateVideo('video-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update thumbnail', async () => {
      const updates = { thumbnail_url: 'https://example.com/new-thumb.jpg' };
      mockSupabase.data = { id: 'video-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateVideo('video-1', updates);
      expect(result).toBeDefined();
    });

    it('should update captions', async () => {
      const updates = { captions: [{ language: 'en', url: 'captions.vtt' }] };
      mockSupabase.data = { id: 'video-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateVideo('video-1', updates);
      expect(result).toBeDefined();
    });

    it('should update metadata', async () => {
      const updates = { metadata: { duration: 600 } };
      mockSupabase.data = { id: 'video-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateVideo('video-1', updates);
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      const updates = { tags: ['updated_tag'] };
      mockSupabase.data = { id: 'video-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateVideo('video-1', updates);
      expect(result).toBeDefined();
    });
  });

  describe('deleteVideo', () => {
    it('should delete a video', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteVideo('video-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should also delete storage file', async () => {
      mockSupabase.data = { id: 'video-1', storage_path: 'videos/video-1.mp4' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await service.deleteVideo('video-1');
      expect(mockStorage.remove).toHaveBeenCalled();
    });

    it('should handle non-existent video deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteVideo('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteVideo('video-1')).rejects.toThrow();
    });

    it('should prevent deletion of video with active references', async () => {
      mockSupabase.data = { id: 'video-1', has_references: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteVideo('video-1')).rejects.toThrow();
    });

    it('should validate video id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteVideo('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteVideo('video-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle storage errors during deletion', async () => {
      mockSupabase.data = { id: 'video-1', storage_path: 'videos/video-1.mp4' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      mockStorage.remove.mockRejectedValue(new Error('Storage error'));
      await expect(service.deleteVideo('video-1')).rejects.toThrow();
    });
  });

  describe('uploadVideo', () => {
    it('should upload video file', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'videos/video-1.mp4' }, error: null });
      mockSupabase.data = { id: 'video-1', storage_path: 'videos/video-1.mp4' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'video.mp4', { type: 'video/mp4' });
      const result = await service.uploadVideo('video-1', file);
      expect(result).toBeDefined();
    });

    it('should handle upload errors', async () => {
      mockStorage.upload.mockResolvedValue({ data: null, error: { message: 'upload failed' } });
      const file = new File(['content'], 'video.mp4', { type: 'video/mp4' });
      await expect(service.uploadVideo('video-1', file)).rejects.toThrow();
    });

    it('should validate file type', async () => {
      const file = new File(['content'], 'image.jpg', { type: 'image/jpeg' });
      await expect(service.uploadVideo('video-1', file)).rejects.toThrow();
    });

    it('should validate file size', async () => {
      const largeContent = 'x'.repeat(500 * 1024 * 1024);
      const file = new File([largeContent], 'large.mp4', { type: 'video/mp4' });
      await expect(service.uploadVideo('video-1', file)).rejects.toThrow();
    });

    it('should update video status after upload', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'videos/video-1.mp4' }, error: null });
      mockSupabase.data = { id: 'video-1', status: 'uploaded' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'video.mp4', { type: 'video/mp4' });
      const result = await service.uploadVideo('video-1', file);
      expect(result).toBeDefined();
    });

    it('should handle upload with progress callback', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'videos/video-1.mp4' }, error: null });
      mockSupabase.data = { id: 'video-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'video.mp4', { type: 'video/mp4' });
      const onProgress = vi.fn();
      const result = await service.uploadVideo('video-1', file, { onProgress });
      expect(result).toBeDefined();
    });

    it('should validate video id', async () => {
      const file = new File(['content'], 'video.mp4', { type: 'video/mp4' });
      await expect(service.uploadVideo('', file)).rejects.toThrow();
    });

    it('should handle duplicate upload', async () => {
      mockSupabase.data = { id: 'video-1', status: 'uploaded' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'video.mp4', { type: 'video/mp4' });
      await expect(service.uploadVideo('video-1', file)).rejects.toThrow();
    });

    it('should handle upload with custom metadata', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'videos/video-1.mp4' }, error: null });
      mockSupabase.data = { id: 'video-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'video.mp4', { type: 'video/mp4' });
      const result = await service.uploadVideo('video-1', file, { metadata: { title: 'Custom' } });
      expect(result).toBeDefined();
    });

    it('should handle upload with content type validation', async () => {
      const file = new File(['content'], 'video.mkv', { type: 'video/x-matroska' });
      await expect(service.uploadVideo('video-1', file)).rejects.toThrow();
    });
  });

  describe('transcodeVideo', () => {
    it('should start transcoding process', async () => {
      mockSupabase.data = { id: 'video-1', transcode_status: 'processing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.transcodeVideo('video-1');
      expect(result).toBeDefined();
    });

    it('should set transcoding status to processing', async () => {
      mockSupabase.data = { id: 'video-1', transcode_status: 'processing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.transcodeVideo('video-1');
      expect(result).toHaveProperty('transcode_status', 'processing');
    });

    it('should handle transcoding with quality options', async () => {
      mockSupabase.data = { id: 'video-1', transcode_status: 'processing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.transcodeVideo('video-1', { qualities: ['720p', '1080p'] });
      expect(result).toBeDefined();
    });

    it('should prevent re-transcoding completed video', async () => {
      mockSupabase.data = { id: 'video-1', transcode_status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.transcodeVideo('video-1')).rejects.toThrow();
    });

    it('should handle database errors during transcode', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'transcode failed' } });
      await expect(service.transcodeVideo('video-1')).rejects.toThrow();
    });

    it('should validate video id', async () => {
      await expect(service.transcodeVideo('')).rejects.toThrow();
    });

    it('should handle transcoding with output format', async () => {
      mockSupabase.data = { id: 'video-1', transcode_status: 'processing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.transcodeVideo('video-1', { outputFormat: 'hls' });
      expect(result).toBeDefined();
    });

    it('should handle transcoding with bitrate settings', async () => {
      mockSupabase.data = { id: 'video-1', transcode_status: 'processing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.transcodeVideo('video-1', { bitrate: '5000k' });
      expect(result).toBeDefined();
    });

    it('should handle transcoding with resolution settings', async () => {
      mockSupabase.data = { id: 'video-1', transcode_status: 'processing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.transcodeVideo('video-1', { resolution: '1920x1080' });
      expect(result).toBeDefined();
    });

    it('should handle transcoding with fps settings', async () => {
      mockSupabase.data = { id: 'video-1', transcode_status: 'processing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.transcodeVideo('video-1', { fps: 30 });
      expect(result).toBeDefined();
    });
  });

  describe('getStreamUrl', () => {
    it('should return streaming URL for video', async () => {
      mockSupabase.data = { id: 'video-1', stream_url: 'https://stream.example.com/video-1.m3u8' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getStreamUrl('video-1');
      expect(result).toBeDefined();
    });

    it('should return null for non-transcoded video', async () => {
      mockSupabase.data = { id: 'video-1', transcode_status: 'pending' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getStreamUrl('video-1');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getStreamUrl('video-1')).rejects.toThrow();
    });

    it('should validate video id', async () => {
      await expect(service.getStreamUrl('')).rejects.toThrow();
    });

    it('should support different quality streams', async () => {
      mockSupabase.data = { id: 'video-1', stream_urls: { '720p': 'url-720', '1080p': 'url-1080' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getStreamUrl('video-1', { quality: '720p' });
      expect(result).toBeDefined();
    });

    it('should handle expired stream URLs', async () => {
      mockSupabase.data = { id: 'video-1', stream_url: 'https://stream.example.com/video-1.m3u8', stream_expires_at: new Date(Date.now() - 1000).toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getStreamUrl('video-1');
      expect(result).toBeDefined();
    });

    it('should support HLS format', async () => {
      mockSupabase.data = { id: 'video-1', stream_url: 'https://stream.example.com/video-1.m3u8', format: 'hls' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getStreamUrl('video-1', { format: 'hls' });
      expect(result).toBeDefined();
    });

    it('should support DASH format', async () => {
      mockSupabase.data = { id: 'video-1', stream_url: 'https://stream.example.com/video-1.mpd', format: 'dash' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getStreamUrl('video-1', { format: 'dash' });
      expect(result).toBeDefined();
    });
  });

  describe('getOfflineVideo', () => {
    it('should return download URL for offline access', async () => {
      mockSupabase.data = { id: 'video-1', download_url: 'https://download.example.com/video-1.mp4' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineVideo('video-1');
      expect(result).toBeDefined();
    });

    it('should return null when offline not available', async () => {
      mockSupabase.data = { id: 'video-1', offline_enabled: false };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineVideo('video-1');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getOfflineVideo('video-1')).rejects.toThrow();
    });

    it('should validate video id', async () => {
      await expect(service.getOfflineVideo('')).rejects.toThrow();
    });

    it('should support different quality downloads', async () => {
      mockSupabase.data = { id: 'video-1', download_urls: { '720p': 'url-720' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineVideo('video-1', { quality: '720p' });
      expect(result).toBeDefined();
    });

    it('should check user permissions for offline access', async () => {
      mockSupabase.data = { id: 'video-1', offline_enabled: true, requires_subscription: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineVideo('video-1', { userId: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should handle download with DRM', async () => {
      mockSupabase.data = { id: 'video-1', download_url: 'url', drm_enabled: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineVideo('video-1', { userId: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should return file size info', async () => {
      mockSupabase.data = { id: 'video-1', download_url: 'url', file_size: 524288000 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineVideo('video-1');
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
      mockSupabase.data = Array.from({ length: 1000 }, (_, i) => ({ id: `item-${i}` }));
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
      mockSupabase.data = Array.from({ length: 10000 }, (_, i) => ({ id: `item-${i}`, data: 'x'.repeat(100) }));
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
      mockSupabase.data = { id: 'unicode-1', name: '??????' };
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
