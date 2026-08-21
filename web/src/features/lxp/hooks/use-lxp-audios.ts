'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpAudioService } from '../services/lxp-audio.service';
import type { Audio } from '@educi/types';
import type { AudioQuery } from '../types';

export const useLxpAudios = (courseId: string) => {
  const [audios, setAudios] = useState<readonly Audio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAudios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAudioService(createClient());
      const data = await service.listAudios(courseId);
      setAudios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch audios');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchAudios();
  }, [fetchAudios]);

  return { audios, loading, error, refresh: fetchAudios };
};

export const useLxpAudio = (schoolId: string, id: string | null) => {
  const [audio, setAudio] = useState<Audio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAudio = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAudioService(createClient());
      const data = await service.getAudio(schoolId, id);
      setAudio(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch audio');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchAudio();
  }, [fetchAudio]);

  return { audio, loading, error, refresh: fetchAudio };
};

export const useLxpAudioCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (courseId: string, file: File, title: string): Promise<Audio | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAudioService(createClient());
      const result = await service.uploadAudio(courseId, file, title);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload audio');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpAudioStreamingUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStreamingUrl = useCallback(async (schoolId: string, id: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAudioService(createClient());
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

export const useLxpAudioDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAudioService(createClient());
      await service.deleteAudio(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete audio');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
