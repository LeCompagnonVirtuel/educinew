import { useState, useEffect } from 'react';
import type { ConversationMember } from '../types';

export function useConversationMembers(conversationId: string | null) {
  const [data, setData] = useState<ConversationMember[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!conversationId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const response = await fetch(`/api/messages/conversations/${conversationId}/members`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [conversationId]);

  return { data, loading, error };
}
