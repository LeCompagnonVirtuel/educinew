import { useState, useEffect } from 'react';
import type { TeacherPayrollSummary } from '../types';

export function useTeacherPayroll(schoolId: string | null) {
  const [data, setData] = useState<TeacherPayrollSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) {
      setLoading(false);
      return;
    }

    const fetchPayroll = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/teachers/payroll?schoolId=${schoolId}`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, [schoolId]);

  return { data, loading, error };
}
