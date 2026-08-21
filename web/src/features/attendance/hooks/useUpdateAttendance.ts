import { useState } from 'react';
import type { Attendance } from '../types';

export function useUpdateAttendance(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, data: Partial<Attendance>): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/attendance/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { update, loading, error };
}
