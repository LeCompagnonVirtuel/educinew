import { useState } from 'react';

export function useImportAttendance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importData = async (data: string, importType: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, importType }),
      });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { importData, loading, error };
}
