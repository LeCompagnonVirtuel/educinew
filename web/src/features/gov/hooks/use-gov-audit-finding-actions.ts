'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AuditFinding } from '@educi/types';

export function useGOVAuditFindingActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<AuditFinding>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_audit_findings').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as AuditFinding;
  };
  const update = async (id: string, data: Partial<AuditFinding>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_audit_findings').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as AuditFinding;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_audit_findings').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
