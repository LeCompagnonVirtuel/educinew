import { useState } from 'react';

export function useBulkAttendance(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bulkCreate = async (attendances: Array<{ studentId: string; status: string; date: string }>): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendances }),
      });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { bulkCreate, loading, error };
}
