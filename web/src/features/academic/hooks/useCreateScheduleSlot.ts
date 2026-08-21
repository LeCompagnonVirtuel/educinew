import { useState } from 'react';
import type { TimetableSlot, CreateScheduleSlotRequest } from '../types';

export function useCreateScheduleSlot() {
  const [data, setData] = useState<TimetableSlot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (payload: CreateScheduleSlotRequest, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/academic/timetable?schoolId=${schoolId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Création du créneau échouée');
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, create };
}
