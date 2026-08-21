import { useState } from 'react';

export function useValidateQR() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ valid: boolean; data?: any } | null>(null);

  const validate = async (qrCode: string): Promise<{ valid: boolean; data?: any }> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/qr/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qr_code: qrCode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur de validation QR');
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
