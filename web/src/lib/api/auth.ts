import { sbAuth } from './supabase-client';
import { createClient } from '@/lib/supabase/client';
import { emailTrigger } from './domains/email-trigger.service';
import { authAudit } from './auth-audit.service';

const ALLOWED_SELF_REGISTER_ROLES = ['STUDENT', 'PARENT'];

export const authApi = {
  login(identifier: string, password: string) {
    return sbAuth.login(identifier, password) as Promise<{ user: any; token: string; refreshToken: string }>;
  },

  async forgotPassword(email: string) {
    return sbAuth.forgotPassword(email) as Promise<{ message: string }>;
  },

  async register(data: any) {
    const supabase = createClient();
    const role = ALLOWED_SELF_REGISTER_ROLES.includes(data.role) ? data.role : 'STUDENT';
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://educi.live';
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { name: data.name, role },
        emailRedirectTo: `${siteUrl}/verification`,
      },
    });
    if (error) throw new Error(error.message || 'Erreur lors de l\'inscription');
    if (authData.user) {
      const name = data.name || data.email.split('@')[0];
      emailTrigger.onLoginConfirmation(data.email, name).catch(() => {});
    }
    return { user: authData.user, token: authData.session?.access_token || '' } as { user: any; token: string };
  },

  async activateAccount(data: { token: string; password: string; name: string; schoolCode?: string; matricule?: string; dateOfBirth?: string }) {
    const result = await sbAuth.activateAccount(data) as any;
    return result;
  },

  registerSchool(data: { adminName: string; adminEmail: string; adminPassword: string; schoolName: string; address?: string; phone?: string; schoolEmail?: string; region: string; city: string }) {
    return sbAuth.registerSchool(data) as Promise<{ pending: boolean; requiresConfirmation: boolean; userId: string }>;
  },

  getProfile() {
    return sbAuth.getProfile() as Promise<any>;
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: currentPassword,
    });
    if (verifyError) throw new Error('Mot de passe actuel incorrect');

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(error.message || 'Erreur lors du changement de mot de passe');

    const schoolId = user.user_metadata?.school_id;
    if (schoolId) {
      try { await authAudit.logPasswordChange(schoolId, user.id); } catch {}
    }

    return { message: 'Mot de passe modifié' } as { message: string };
  },

  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    return this.changePassword(currentPassword, newPassword);
  },
};
