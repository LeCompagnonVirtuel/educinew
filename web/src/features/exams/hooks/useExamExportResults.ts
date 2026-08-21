import { useState } from 'react';

export function useExamExportResults() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exportResult, setExportResult] = useState<any>(null);

  const exportResults = async (termId: string, format?: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/exams/export/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ termId, format }),
      });
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setExportResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { exportResults, loading, error, exportResult };
}
