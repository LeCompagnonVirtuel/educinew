'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { InternationalPartnership } from '@educi/types';

export function useGOVInternationalPartnershipActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<InternationalPartnership>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_international_partnerships').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as InternationalPartnership;
  };
  const update = async (id: string, data: Partial<InternationalPartnership>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_international_partnerships').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as InternationalPartnership;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_international_partnerships').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
