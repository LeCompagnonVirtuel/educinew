'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { NetworkMember } from '@educi/types';

export function useGOVNetworkMemberActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<NetworkMember>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_network_members').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as NetworkMember;
  };
  const update = async (id: string, data: Partial<NetworkMember>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_network_members').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as NetworkMember;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_network_members').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
