import { useState, useEffect } from 'react';
import type { AttendanceReport } from '../types';

export function useAttendanceReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AttendanceReport | null>(null);

  const generate = async (params: { schoolId: string; reportType: string; startDate?: string; endDate?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/attendance/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setReport(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error, report };
}
