'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSCommitteeMemberService } from '../services/eduos-committee-member.service';
import { createClient } from '@/lib/supabase/client';
import type { CommitteeMember } from '@educi/types';

export const useEduOSCommitteeMemberList = (schoolId: string) => {
  const [items, setItems] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCommitteeMemberService(supabase);
      const data = await service.listCommitteeMembers(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
