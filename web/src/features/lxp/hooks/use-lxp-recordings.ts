'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpRecordingService } from '../services/lxp-recording.service';
import type { Recording } from '@educi/types';
import type { RecordingQuery } from '../types';

export const useLxpRecordings = (sessionId: string) => {
  const [recordings, setRecordings] = useState<readonly Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecordings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRecordingService(createClient());
      const data = await service.listRecordings(sessionId);
      setRecordings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recordings');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchRecordings();
  }, [fetchRecordings]);

  return { recordings, loading, error, refresh: fetchRecordings };
};

export const useLxpRecording = (schoolId: string, id: string | null) => {
  const [recording, setRecording] = useState<Recording | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecording = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRecordingService(createClient());
      const data = await service.getRecording(schoolId, id);
      setRecording(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recording');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchRecording();
  }, [fetchRecording]);

  return { recording, loading, error, refresh: fetchRecording };
};

export const useLxpRecordingStart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async (sessionId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRecordingService(createClient());
      const result = await service.startRecording(sessionId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { start, loading, error };
};

export const useLxpRecordingStop = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stop = useCallback(async (sessionId: string): Promise<Recording | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRecordingService(createClient());
      const result = await service.stopRecording(sessionId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stop recording');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { stop, loading, error };
};

export const useLxpRecordingDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRecordingService(createClient());
      await service.deleteRecording(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete recording');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
