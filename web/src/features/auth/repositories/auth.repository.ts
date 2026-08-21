import { createClient } from '@/lib/supabase/client';
import type { AuthRepository, AuthSession, AuthUser } from '../types';
import { AuthenticationError, InvalidCredentialsError, SessionExpiredError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createAuthRepository(): AuthRepository {
  const supabase = createClient();

  return {
    async signIn(identifier: string, password: string): Promise<AuthSession> {
      let email = identifier;

      if (!identifier.includes('@')) {
        const { data: resolved, error: rpcError } = await supabase.rpc('resolve_login_identifier', {
          p_identifier: identifier,
        });
        if (rpcError) {
          logger.security('Login identifier resolution failed', { identifier, error: rpcError.message }, 'auth');
          throw new InvalidCredentialsError('Identifiant non reconnu. Vérifiez votre email, matricule ou téléphone.');
        }
        const resolvedEmail = Array.isArray(resolved) ? resolved[0]?.email : resolved;
        if (!resolvedEmail) {
          throw new InvalidCredentialsError('Identifiant non reconnu. Vérifiez votre email, matricule ou téléphone.');
        }
        email = resolvedEmail;
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        logger.security('Login failed', { identifier, error: error.message }, 'auth');
        throw new InvalidCredentialsError('Identifiants incorrects');
      }
      if (!data?.session) {
        throw new AuthenticationError('Aucune session créée. Vérifiez vos identifiants.');
      }

      const { data: profile } = await supabase
        .from('users')
        .select('name, role, school_id, phone, photo_url, is_active, is_first_login')
        .eq('id', data.user.id)
        .single();

      if (profile && profile.is_active === false) {
        await supabase.auth.signOut();
        logger.security('Deactivated user login attempt', { userId: data.user.id }, 'auth');
        throw new AuthenticationError('Votre compte a été désactivé. Contactez l\'administration.');
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

    async signUp(data) {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: data.metadata },
      });
      if (error) throw new AuthenticationError(error.message);
      return {
        userId: authData?.user?.id || '',
        requiresConfirmation: !authData?.session,
      };
    },

    async signOut() {
      await supabase.auth.signOut();
    },

    async getSession(): Promise<AuthSession | null> {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data: profile } = await supabase
        .from('users')
        .select('name, role, school_id, phone, photo_url, is_active, is_first_login')
        .eq('id', session.user.id)
        .single();

      return {
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: session.expires_at,
        user: {
          id: session.user.id,
          name: profile?.name || session.user.email || '',
          email: session.user.email || '',
          role: (profile?.role as AuthUser['role']) || 'STUDENT',
          schoolId: profile?.school_id || undefined,
          phone: profile?.phone || undefined,
          photoUrl: profile?.photo_url || undefined,
          isActive: profile?.is_active ?? true,
          emailConfirmedAt: session.user.email_confirmed_at || undefined,
          isFirstLogin: profile?.is_first_login ?? false,
          createdAt: session.user.created_at,
        },
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

    async refreshSession(): Promise<AuthSession> {
      const { data, error } = await supabase.auth.refreshSession();
      if (error || !data?.session) {
        throw new SessionExpiredError();
      }
      const user = await this.getUser();
      if (!user) throw new SessionExpiredError();

      return {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
        user,
      };
    },

    async resetPassword(email: string) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://educi.live');
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/reset-password`,
      });
      if (error) throw new AuthenticationError(error.message || 'Erreur lors de l\'envoi de l\'email');
    },

    async updateUserPassword(newPassword: string) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw new AuthenticationError(error.message || 'Erreur lors du changement de mot de passe');
    },

    async verifyEmail(token: string) {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const result = await response.json();
      if (!response.ok) throw new AuthenticationError(result.error || 'Vérification échouée');
    },

    async resolveIdentifier(identifier: string): Promise<string> {
      if (identifier.includes('@')) return identifier;
      const { data: resolved, error } = await supabase.rpc('resolve_login_identifier', {
        p_identifier: identifier,
      });
      if (error) throw new InvalidCredentialsError('Identifiant non reconnu');
      const email = Array.isArray(resolved) ? resolved[0]?.email : resolved;
      if (!email) throw new InvalidCredentialsError('Identifiant non reconnu');
      return email;
    },
  };
}
