import { useState } from 'react';

export function useValidateNFC() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ valid: boolean; data?: any } | null>(null);

  const validate = async (nfcTag: string): Promise<{ valid: boolean; data?: any }> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/nfc/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nfc_tag: nfcTag }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur de validation NFC');
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
