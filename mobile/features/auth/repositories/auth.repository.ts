import { supabase } from '../../services/supabase';
import type { AuthUser, AuthSession } from '@educi/types';
import { logger } from '@educi/logger';

export interface MobileAuthRepository {
  signIn(identifier: string, password: string): Promise<AuthSession>;
  signOut(): Promise<void>;
  refreshSession(): Promise<AuthSession>;
  getUser(): Promise<AuthUser | null>;
  resolveIdentifier(identifier: string): Promise<string>;
  updateUserPassword(newPassword: string): Promise<void>;
}

export function createMobileAuthRepository(): MobileAuthRepository {
  return {
    async signIn(identifier: string, password: string): Promise<AuthSession> {
      let email = identifier;

      if (!identifier.includes('@')) {
        const { data: resolved, error: rpcError } = await supabase.rpc('resolve_login_identifier', {
          p_identifier: identifier,
        });
        if (rpcError) {
          logger.security('Mobile login identifier resolution failed', { identifier, error: rpcError.message }, 'mobile-auth');
          throw new Error('Identifiant non reconnu. Vérifiez votre email, matricule ou téléphone.');
        }
        const resolvedEmail = Array.isArray(resolved) ? resolved[0]?.email : resolved;
        if (!resolvedEmail) {
          throw new Error('Identifiant non reconnu. Vérifiez votre email, matricule ou téléphone.');
        }
        email = resolvedEmail;
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        logger.security('Mobile login failed', { identifier, error: error.message }, 'mobile-auth');
        throw new Error(error.message || 'Identifiants incorrects');
      }
      if (!data?.session) throw new Error('Aucune session créée. Vérifiez vos identifiants.');

      const { data: profile } = await supabase
        .from('users')
        .select('name, role, school_id, phone, photo_url, is_active, is_first_login')
        .eq('id', data.user.id)
        .single();

      if (profile && profile.is_active === false) {
        await supabase.auth.signOut();
        throw new Error('Votre compte a été désactivé. Contactez l\'administration.');
      }

      const user: AuthUser = {
        id: data.user.id,
        name: profile?.name || data.user.email || '',
        email: data.user.email || '',
        role: (profile?.role as AuthUser['role']) || 'STUDENT',
        schoolId: profile?.school_id || undefined,
        phone: profile?.phone || undefined,
        photoUrl: profile?.photo_url || undefined,
        isActive: profile?.is_active ?? true,
        emailConfirmedAt: data.user.email_confirmed_at || undefined,
        isFirstLogin: profile?.is_first_login ?? false,
        createdAt: data.user.created_at,
      };

      return {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
        user,
      };
    },

    async signOut() {
      await supabase.auth.signOut();
    },

    async refreshSession(): Promise<AuthSession> {
      const { data, error } = await supabase.auth.refreshSession();
      if (error || !data?.session) throw new Error('Session expirée');

      const user = await this.getUser();
      if (!user) throw new Error('Session expirée');

      return {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
        user,
      };
    },

    async getUser(): Promise<AuthUser | null> {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from('users')
        .select('name, role, school_id, phone, photo_url, is_active, is_first_login')
        .eq('id', user.id)
        .single();

      return {
        id: user.id,
        name: profile?.name || user.email || '',
        email: user.email || '',
        role: (profile?.role as AuthUser['role']) || 'STUDENT',
        schoolId: profile?.school_id || undefined,
        phone: profile?.phone || undefined,
        photoUrl: profile?.photo_url || undefined,
        isActive: profile?.is_active ?? true,
        emailConfirmedAt: user.email_confirmed_at || undefined,
        isFirstLogin: profile?.is_first_login ?? false,
        createdAt: user.created_at,
      };
    },

    async resolveIdentifier(identifier: string): Promise<string> {
      if (identifier.includes('@')) return identifier;
      const { data: resolved, error } = await supabase.rpc('resolve_login_identifier', {
        p_identifier: identifier,
      });
      if (error) throw new Error('Identifiant non reconnu');
      const email = Array.isArray(resolved) ? resolved[0]?.email : resolved;
      if (!email) throw new Error('Identifiant non reconnu');
      return email;
    },

    async updateUserPassword(newPassword: string) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw new Error(error.message || 'Erreur lors du changement de mot de passe');
    },
  };
}
