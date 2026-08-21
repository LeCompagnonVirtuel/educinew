'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpVideoService } from '../services/lxp-video.service';
import type { Video } from '@educi/types';
import type { VideoQuery } from '../types';

export const useLxpVideos = (courseId: string) => {
  const [videos, setVideos] = useState<readonly Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVideoService(createClient());
      const data = await service.listVideos(courseId);
      setVideos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, loading, error, refresh: fetchVideos };
};

export const useLxpVideo = (schoolId: string, id: string | null) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideo = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVideoService(createClient());
      const data = await service.getVideo(schoolId, id);
      setVideo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  return { video, loading, error, refresh: fetchVideo };
};

export const useLxpVideoCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (courseId: string, file: File, title: string): Promise<Video | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVideoService(createClient());
      const result = await service.uploadVideo(courseId, file, title);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload video');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpVideoStreamingUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStreamingUrl = useCallback(async (schoolId: string, id: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVideoService(createClient());
      const url = await service.getStreamingUrl(schoolId, id);
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get streaming URL');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getStreamingUrl, loading, error };
};

export const useLxpVideoDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVideoService(createClient());
      await service.deleteVideo(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete video');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
