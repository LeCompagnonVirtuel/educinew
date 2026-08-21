import { useState, useEffect } from 'react';
import type { AttendanceSession } from '../types';

export function useStartSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = async (data: { classId: string; date: string; period?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/attendance/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur');
      await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return { start, loading, error };
}
