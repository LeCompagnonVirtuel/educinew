'use client';

import { useState, useCallback } from 'react';
import { EduOSMetadataRecordService } from '../services/eduos-metadata-record.service';
import { createClient } from '@/lib/supabase/client';
import type { MetadataRecord } from '@educi/types';

export const useEduOSMetadataRecordActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MetadataRecord): Promise<MetadataRecord | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMetadataRecordService(supabase);
      return await service.createMetadataRecord(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MetadataRecord>): Promise<MetadataRecord | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMetadataRecordService(supabase);
      return await service.updateMetadataRecord(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMetadataRecordService(supabase);
      await service.deleteMetadataRecord(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};