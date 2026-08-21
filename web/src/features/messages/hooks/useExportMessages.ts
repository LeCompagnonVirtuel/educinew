import { useState } from 'react';

export function useExportMessages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exportResult, setExportResult] = useState<any>(null);

  const exportData = async (schoolId: string, format: string, filters: Record<string, string>): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/messages/export/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolId, format, filters }),
      });
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setExportResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { exportData, loading, error, exportResult };
}
