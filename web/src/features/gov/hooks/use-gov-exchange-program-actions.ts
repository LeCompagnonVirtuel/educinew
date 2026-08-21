'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ExchangeProgram } from '@educi/types';

export function useGOVExchangeProgramActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<ExchangeProgram>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_exchange_programs').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ExchangeProgram;
  };
  const update = async (id: string, data: Partial<ExchangeProgram>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_exchange_programs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ExchangeProgram;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_exchange_programs').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
