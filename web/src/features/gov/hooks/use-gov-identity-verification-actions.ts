'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { IdentityVerification } from '@educi/types';

export function useGOVIdentityVerificationActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<IdentityVerification>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_identity_verifications').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as IdentityVerification;
  };
  const update = async (id: string, data: Partial<IdentityVerification>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_identity_verifications').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as IdentityVerification;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_identity_verifications').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
