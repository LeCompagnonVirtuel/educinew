'use client';
import { useState, useCallback } from 'react';
import { ScRFIDService } from '../services/sc-rfid.service';
import { createClient } from '@/lib/supabase/client';
import type { RFIDTag, RFIDTagCreate } from '@educi/types';

export const useScRFIDScanner = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scan = useCallback(async (tagId: string): Promise<RFIDTag | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScRFIDService(createClient());
      const tags = await service.listRFIDs(schoolId, { tagId });
      return tags.length > 0 ? tags[0] : null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const register = useCallback(async (data: RFIDTagCreate): Promise<RFIDTag | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScRFIDService(createClient());
      return await service.createRFID(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getTag = useCallback(async (rfidId: string): Promise<RFIDTag | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScRFIDService(createClient());
      return await service.getRFID(schoolId, rfidId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, scan, register, getTag };
};
