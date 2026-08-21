import { useState, useEffect } from 'react';
import type { Room } from '../types';

export function useRoom(id: string | null) {
  const [data, setData] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchRoom = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/rooms/${id}`);
        if (!response.ok) throw new Error('Salle introuvable');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  return { data, loading, error };
}