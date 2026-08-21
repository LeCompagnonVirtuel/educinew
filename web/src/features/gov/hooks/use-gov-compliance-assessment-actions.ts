'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ComplianceAssessment } from '@educi/types';

export function useGOVComplianceAssessmentActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<ComplianceAssessment>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_compliance_assessments').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ComplianceAssessment;
  };
  const update = async (id: string, data: Partial<ComplianceAssessment>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_compliance_assessments').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ComplianceAssessment;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_compliance_assessments').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
