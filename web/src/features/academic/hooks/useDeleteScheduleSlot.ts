import { useState } from 'react';

export function useDeleteScheduleSlot() {
  const [data, setData] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/academic/timetable/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Suppression du créneau échouée');
      setData(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, remove };
}
