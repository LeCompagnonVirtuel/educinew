import { useState } from 'react';
import type { GroupMember } from '../types';

export function useAddGroupMember(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMember = async (groupId: string, data: Partial<GroupMember>): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/groups/${groupId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { addMember, loading, error };
}
