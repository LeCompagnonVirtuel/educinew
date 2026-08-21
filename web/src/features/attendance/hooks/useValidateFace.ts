import { useState } from 'react';

export function useValidateFace() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ valid: boolean; data?: any } | null>(null);

  const validate = async (studentId: string, faceData: string): Promise<{ valid: boolean; data?: any }> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/face/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, face_data: faceData }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur de validation faciale');
      setResult(data);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(msg);
      throw err;
    } finally { setLoading(false); }
  };

  return { validate, result, loading, error };
}
