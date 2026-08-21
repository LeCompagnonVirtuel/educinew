import { useState } from 'react';

export function useCreateCorrection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: { attendanceId: string; newStatus: string; reason: string }): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/correction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { create, loading, error };
}
