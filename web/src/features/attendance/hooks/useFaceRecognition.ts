import { useState } from 'react';

export function useFaceRecognition() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const checkIn = async (studentId: string, faceData: string): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/face', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, face_data: faceData }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erreur pointage facial');
      setData(result);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(msg);
      throw err;
    } finally { setLoading(false); }
  };

  return { checkIn, data, loading, error };
}
