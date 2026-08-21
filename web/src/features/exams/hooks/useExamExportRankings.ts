import { useState } from 'react';

export function useExamExportRankings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exportResult, setExportResult] = useState<any>(null);

  const exportRankings = async (academicYearId: string, format?: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/exams/export/rankings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ academicYearId, format }),
      });
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setExportResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { exportRankings, loading, error, exportResult };
}
