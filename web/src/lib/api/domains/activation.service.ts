import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export interface ActivationResult {
  success: boolean;
  schoolCreated: boolean;
  schoolId: string | null;
  hasSchool: boolean;
  profile: {
    name: string;
    email: string;
    role: string;
    schoolId: string | null;
  };
  error?: string;
}

export interface RegistrationStatus {
  isComplete: boolean;
  missingSteps: string[];
  draft: any | null;
  schoolId: string | null;
}

class ActivationService {
  async activate(token: string, userId: string): Promise<ActivationResult> {
    const response = await fetch('/api/auth/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        schoolCreated: false,
        schoolId: null,
        hasSchool: false,
        profile: { name: '', email: '', role: '', schoolId: null },
        error: result.error || 'Activation failed',
      };
    }

    return result;
  }

  async getRegistrationStatus(userId: string): Promise<RegistrationStatus> {
    const { data: user } = await supabase
      .from('users')
      .select('school_id, role, name, email, phone, is_active')
      .eq('id', userId)
      .single();

    if (!user?.school_id) {
      const { data: draft } = await supabase
        .from('onboarding_drafts')
        .select('*')
        .eq('user_id', userId)
        .eq('completed', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      return {
        isComplete: false,
        missingSteps: ['school_creation'],
        draft,
        schoolId: null,
      };
    }

    const missingSteps: string[] = [];

    const { data: branding } = await supabase
      .from('school_branding')
      .select('id')
      .eq('school_id', user.school_id)
      .single();
    if (!branding) missingSteps.push('branding');

    const { data: academicYear } = await supabase
      .from('academic_years')
      .select('id')
      .eq('school_id', user.school_id)
      .eq('is_active', true)
      .single();
    if (!academicYear) missingSteps.push('academic_config');

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('school_id', user.school_id)
      .single();
    if (!subscription) missingSteps.push('subscription');

    return {
      isComplete: missingSteps.length === 0,
      missingSteps,
      draft: null,
      schoolId: user.school_id,
    };
  }

  async saveDraft(userId: string, draftPayload: Record<string, any>): Promise<string | null> {
    const { data: existing } = await supabase
      .from('onboarding_drafts')
      .select('id')
      .eq('user_id', userId)
      .eq('completed', false)
      .limit(1)
      .single();

    if (existing) {
      const { data: updated } = await supabase
        .from('onboarding_drafts')
        .update({ data: draftPayload, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select('id')
        .single();
      return updated?.id || null;
    } else {
      const { data: created } = await supabase
        .from('onboarding_drafts')
        .insert({
          user_id: userId,
          email: draftPayload.admin_email || draftPayload.email || '',
          school_name: draftPayload.school_name || '',
          step: 1,
          completed: false,
          data: draftPayload,
        })
        .select('id')
        .single();
      return created?.id || null;
    }
  }

  async updateDraft(draftId: string, draftPayload: Record<string, any>): Promise<void> {
    await supabase
      .from('onboarding_drafts')
      .update({ data: draftPayload, updated_at: new Date().toISOString() })
      .eq('id', draftId);
  }

  async completeOnboarding(userId: string, schoolId: string): Promise<boolean> {
    try {
      await supabase.auth.updateUser({
        data: { onboarding_completed: true, is_first_login: false }
      });

      await supabase
        .from('users')
        .update({ is_active: true })
        .eq('id', userId);

      await supabase
        .from('onboarding_drafts')
        .update({ completed: true })
        .eq('user_id', userId)
        .eq('school_id', schoolId);

      return true;
    } catch {
      return false;
    }
  }
}

export const activationService = new ActivationService();
