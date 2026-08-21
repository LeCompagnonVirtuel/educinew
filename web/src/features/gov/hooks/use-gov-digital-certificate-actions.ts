'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { DigitalCertificate } from '@educi/types';

export function useGOVDigitalCertificateActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<DigitalCertificate>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_digital_certificates').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as DigitalCertificate;
  };
  const update = async (id: string, data: Partial<DigitalCertificate>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_digital_certificates').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as DigitalCertificate;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_digital_certificates').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
