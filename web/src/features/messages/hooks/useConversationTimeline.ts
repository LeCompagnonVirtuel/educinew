import { useState, useEffect } from 'react';
import type { ConversationTimeline } from '../types';

export function useConversationTimeline(conversationId: string | null, filters?: Record<string, string>) {
  const [data, setData] = useState<ConversationTimeline[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!conversationId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const params = new URLSearchParams();
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            params.append(key, value);
          });
        }
        const response = await fetch(`/api/messages/conversations/${conversationId}/timeline?${params.toString()}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [conversationId, filters]);

  return { data, loading, error };
}
