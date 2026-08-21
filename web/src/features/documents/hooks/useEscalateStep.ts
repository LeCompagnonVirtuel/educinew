'use client';
import { useState, useCallback } from 'react';
export function useEscalateStep() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const escalateStep = useCallback(async (approvalId: string, stepId: string, escalateToUserId: string, reason?: string) => {
    setLoading(true); setError(null);
    try {
      const result = await fetch(`/api/documents/approvals/${approvalId}/steps/${stepId}/escalate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ escalateToUserId, reason })
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
      return json.data;
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred');
    } finally { setLoading(false); }
  }, []);
  return { data, loading, error, escalateStep };
}
