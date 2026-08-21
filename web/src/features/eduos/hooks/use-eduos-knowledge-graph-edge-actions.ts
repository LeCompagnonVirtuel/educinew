'use client';

import { useState, useCallback } from 'react';
import { EduOSKnowledgeGraphEdgeService } from '../services/eduos-knowledge-graph-edge.service';
import { createClient } from '@/lib/supabase/client';
import type { KnowledgeGraphEdge } from '@educi/types';

export const useEduOSKnowledgeGraphEdgeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: KnowledgeGraphEdge): Promise<KnowledgeGraphEdge | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSKnowledgeGraphEdgeService(supabase);
      return await service.createKnowledgeGraphEdge(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<KnowledgeGraphEdge>): Promise<KnowledgeGraphEdge | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSKnowledgeGraphEdgeService(supabase);
      return await service.updateKnowledgeGraphEdge(schoolId, id, data);
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
      const service = new EduOSKnowledgeGraphEdgeService(supabase);
      await service.deleteKnowledgeGraphEdge(schoolId, id);
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