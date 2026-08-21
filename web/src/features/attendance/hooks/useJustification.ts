import { useState } from 'react';

export function useJustification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createJustification = async (attendanceId: string, reason: string, documents?: File[]): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const formData = new FormData();
      formData.append('attendance_id', attendanceId);
      formData.append('reason', reason);
      if (documents) {
        documents.forEach((file, i) => formData.append(`document_${i}`, file));
      }

      const response = await fetch('/api/attendance/correction', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur création justification');
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(msg);
      throw err;
    } finally { setLoading(false); }
  };

  return { createJustification, loading, error };
}
