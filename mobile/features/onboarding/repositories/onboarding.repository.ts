import { supabase } from '../../services/supabase';
import type { OnboardingState, OnboardingData, OnboardingProgress, OnboardingStatus } from '@educi/types';
import { logger } from '@educi/logger';

export interface MobileOnboardingRepository {
  create(userId: string): Promise<OnboardingState>;
  findById(id: string): Promise<OnboardingState | null>;
  findByUserId(userId: string): Promise<OnboardingState | null>;
  update(id: string, data: Partial<OnboardingData>): Promise<OnboardingState>;
  updateProgress(id: string, progress: Partial<OnboardingProgress>): Promise<void>;
  updateStatus(id: string, status: OnboardingStatus): Promise<void>;
  delete(id: string): Promise<void>;
  complete(id: string, schoolId: string): Promise<void>;
}

export function createMobileOnboardingRepository(): MobileOnboardingRepository {
  return {
    async create(userId: string): Promise<OnboardingState> {
      const now = new Date().toISOString();
      const defaultData: OnboardingData = {
        generalInfo: { name: '', email: '', country: "Côte d'Ivoire" },
        adminInfo: { schoolType: 'PRIVE', languages: ['fr'], currency: 'XOF', timezone: 'Africa/Abidjan' },
        academicConfig: {
          academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
          yearStartDate: '', yearEndDate: '',
          termsCount: 3, semestersCount: 2, gradingSystem: 'FRENCH_20',
          passingGrade: 10, mentionThresholds: { 'Bien': 14, 'Très Bien': 16, 'Excellent': 18 },
          coefficientSystem: false,
        },
        pedagogicStructure: { levels: [] },
        director: { firstName: '', lastName: '', email: '', password: '' },
        modules: {
          payments: false, transport: false, library: false, cafeteria: false,
          health: false, discipline: false, marketplace: false, hr: false,
          gps: false, exams: true, sms: false, ai: false,
        },
        branding: { colorPrimary: '#1E40AF', colorSecondary: '#3B82F6' },
      };

      const progress: OnboardingProgress = {
        currentStep: 'general_info',
        completedSteps: [],
        startedAt: now,
        updatedAt: now,
      };

      const { data, error } = await supabase
        .from('onboarding_drafts')
        .insert({
          user_id: userId,
          status: 'IN_PROGRESS',
          data: defaultData,
          progress,
          created_at: now,
          updated_at: now,
        })
        .select()
        .single();

      if (error) {
        logger.error('Mobile: Failed to create onboarding', { userId, error: error.message }, 'onboarding');
        throw new Error(error.message);
      }

      return {
        id: data.id,
        userId,
        status: data.status as OnboardingStatus,
        data: data.data as unknown as OnboardingData,
        progress: data.progress as unknown as OnboardingProgress,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    },

    async findById(id: string): Promise<OnboardingState | null> {
      const { data, error } = await supabase
        .from('onboarding_drafts')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) return null;

      return {
        id: data.id,
        schoolId: data.school_id || undefined,
        userId: data.user_id,
        status: data.status as OnboardingStatus,
        data: data.data as unknown as OnboardingData,
        progress: data.progress as unknown as OnboardingProgress,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    },

    async findByUserId(userId: string): Promise<OnboardingState | null> {
      const { data, error } = await supabase
        .from('onboarding_drafts')
        .select('*')
        .eq('user_id', userId)
        .in('status', ['DRAFT', 'IN_PROGRESS'])
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) return null;

      return {
        id: data.id,
        schoolId: data.school_id || undefined,
        userId: data.user_id,
        status: data.status as OnboardingStatus,
        data: data.data as unknown as OnboardingData,
        progress: data.progress as unknown as OnboardingProgress,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    },

    async update(id: string, data: Partial<OnboardingData>): Promise<OnboardingState> {
      const existing = await this.findById(id);
      if (!existing) throw new Error('Onboarding introuvable');

      const merged = {
        generalInfo: { ...existing.data.generalInfo, ...data.generalInfo },
        adminInfo: { ...existing.data.adminInfo, ...data.adminInfo },
        academicConfig: { ...existing.data.academicConfig, ...data.academicConfig },
        pedagogicStructure: data.pedagogicStructure || existing.data.pedagogicStructure,
        director: { ...existing.data.director, ...data.director },
        modules: { ...existing.data.modules, ...data.modules },
        branding: { ...existing.data.branding, ...data.branding },
      };

      const { error } = await supabase
        .from('onboarding_drafts')
        .update({ data: merged, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw new Error(error.message);

      return { ...existing, data: merged, updatedAt: new Date().toISOString() };
    },

    async updateProgress(id: string, progress: Partial<OnboardingProgress>): Promise<void> {
      const existing = await this.findById(id);
      if (!existing) throw new Error('Onboarding introuvable');

      const updated = { ...existing.progress, ...progress, updatedAt: new Date().toISOString() };
      const { error } = await supabase
        .from('onboarding_drafts')
        .update({ progress: updated, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw new Error(error.message);
    },

    async updateStatus(id: string, status: OnboardingStatus): Promise<void> {
      const { error } = await supabase
        .from('onboarding_drafts')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw new Error(error.message);
    },

    async delete(id: string): Promise<void> {
      const { error } = await supabase
        .from('onboarding_drafts')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },

    async complete(id: string, schoolId: string): Promise<void> {
      const { error } = await supabase
        .from('onboarding_drafts')
        .update({
          status: 'COMPLETED',
          school_id: schoolId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
  };
}
