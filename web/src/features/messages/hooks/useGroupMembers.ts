import { useState, useEffect } from 'react';
import type { GroupMember } from '../types';

export function useGroupMembers(groupId: string | null) {
  const [data, setData] = useState<GroupMember[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const response = await fetch(`/api/messages/groups/${groupId}/members`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [groupId]);

  return { data, loading, error };
}
