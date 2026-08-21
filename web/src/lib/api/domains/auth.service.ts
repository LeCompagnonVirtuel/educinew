import { getSupabase } from '../shared';

export const sbAuth = {
  async login(identifier: string, password: string) {
    const supabase = getSupabase();

    let email = identifier;
    if (!identifier.includes('@')) {
      const { data: resolved, error: rpcError } = await supabase.rpc('resolve_login_identifier', {
        p_identifier: identifier,
      });
      if (rpcError) {
        throw new Error('Identifiant non reconnu. Vérifiez votre email, matricule ou téléphone.');
      }
      // Handle TABLE return type (array of objects with email field)
      const resolvedEmail = Array.isArray(resolved) ? resolved[0]?.email : resolved;
      if (resolvedEmail) {
        email = resolvedEmail;
      } else {
        throw new Error('Identifiant non reconnu. Vérifiez votre email, matricule ou téléphone.');
      }
    }

    // Pre-check: if email is not confirmed, try auto-repair silently
    // If repair fails, let signInWithPassword handle the error naturally
    try {
      const statusRes = await fetch('/api/auth/check-email-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const statusData = await statusRes.json();
      if (statusData.exists && !statusData.emailConfirmed) {
        await fetch('/api/auth/resend-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      }
    } catch {
      // Ignore pre-check errors — signInWithPassword will be the authority
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message || 'Identifiants incorrects');
    }
    if (!data?.session) throw new Error('Aucune session créée. Vérifiez vos identifiants.');

    const { data: profile } = await supabase
      .from('users')
      .select('name, role, school_id, phone, photo_url, is_active, is_first_login')
      .eq('id', data.user.id)
      .single();

    // Server-side is_active check — block deactivated users
    if (profile && profile.is_active === false) {
      await supabase.auth.signOut();
      throw new Error('Votre compte a été désactivé. Contactez l\'administration.');
    }

    return {
      user: {
        id: data.user.id,
        name: profile?.name || data.user.email || '',
        email: data.user.email || '',
        // SECURITY: Always use DB values — never trust client-writable user_metadata
        role: profile?.role || 'STUDENT',
        schoolId: profile?.school_id,
        phone: profile?.phone,
        photoUrl: profile?.photo_url,
        isActive: profile?.is_active ?? true,
        createdAt: data.user.created_at,
        emailConfirmedAt: data.user.email_confirmed_at,
        isFirstLogin: profile?.is_first_login ?? false,
      },
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  },

  async registerSchool(data: {
    adminName: string;
    adminEmail: string;
    adminPassword: string;
    schoolName: string;
    address?: string;
    phone?: string;
    schoolEmail?: string;
    region: string;
    city: string;
    schoolType?: string;
  }) {
    const supabase = getSupabase();
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://educi.live';
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.adminEmail,
      password: data.adminPassword,
      options: {
        data: {
          name: data.adminName,
          role: 'ADMIN',
          school_name: data.schoolName,
        },
        emailRedirectTo: `${siteUrl}/verification`,
      },
    });
    if (authError) throw authError;
    if (!authData.user) {
      throw new Error('Inscription échouée. Veuillez réessayer.');
    }

    const pendingData = {
      userId: authData.user.id,
      adminName: data.adminName,
      adminEmail: data.adminEmail,
      schoolName: data.schoolName,
      address: data.address || null,
      phone: data.phone || null,
      schoolEmail: data.schoolEmail || null,
      region: data.region,
      city: data.city,
      schoolType: data.schoolType || 'SECONDARY',
    };

    if (!authData.session) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('educi_pending_registration', JSON.stringify(pendingData));
      }

      // Send confirmation email with link
      const emailResponse = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.adminEmail }),
      });
      const emailResult = await emailResponse.json().catch(() => ({}));
      if (!emailResponse.ok || emailResult.success === false) {
        console.error('[registerSchool] Failed to send confirmation email:', emailResult);
        throw new Error(emailResult.error || 'Impossible d\'envoyer l\'email de confirmation. Réessayez.');
      }

      // Save draft
      try {
        await fetch('/api/auth/save-draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: authData.user.id,
            adminName: data.adminName,
            adminEmail: data.adminEmail,
            adminPhone: data.phone || null,
            schoolName: data.schoolName,
            schoolType: data.schoolType || 'SECONDARY',
            city: data.city,
            address: data.address || null,
            phone: data.phone || null,
            email: data.schoolEmail || null,
            region: data.region,
          }),
        });
      } catch (e) {
        console.error('Failed to save registration draft:', e);
      }
      return { pending: true, requiresConfirmation: true, userId: authData.user.id };
    }

    // Session exists (email auto-confirmed) — STILL require OTP verification
    // Redirect to verification page, do NOT create school yet
    if (typeof window !== 'undefined') {
      localStorage.setItem('educi_pending_registration', JSON.stringify(pendingData));
    }

    try {
      await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.adminEmail }),
      });
    } catch {}

    try {
      await fetch('/api/auth/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: authData.user.id,
          adminName: data.adminName,
          adminEmail: data.adminEmail,
          adminPhone: data.phone || null,
          schoolName: data.schoolName,
          schoolType: data.schoolType || 'SECONDARY',
          city: data.city,
          address: data.address || null,
          phone: data.phone || null,
          email: data.schoolEmail || null,
          region: data.region,
        }),
      });
    } catch {}

    return { pending: true, requiresConfirmation: true, userId: authData.user.id };
  },

  async forgotPassword(email: string) {
    const supabase = getSupabase();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://educi.live');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/reset-password`,
    });
    if (error) throw new Error(error.message || 'Erreur lors de l\'envoi de l\'email');
    return { message: 'Email de réinitialisation envoyé' };
  },

  async getProfile() {
    const supabase = getSupabase();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) throw new Error('Non authentifié');

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!profile) {
      throw new Error('Profil utilisateur introuvable dans la base de données');
    }
    return profile;
  },

  async changePassword(newPassword: string) {
    const supabase = getSupabase();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw new Error(error.message || 'Erreur lors du changement de mot de passe');
    return { message: 'Mot de passe modifié' };
  },

  async validateInvitation(token: string) {
    const supabase = getSupabase();

    const { data: invitation } = await supabase
      .from('invitations')
      .select('*')
      .eq('token', token)
      .is('used_at', null)
      .gt('expires_at', new Date().toISOString())
      .single();
    if (invitation) return invitation;

    const { data: staffInvite } = await supabase
      .from('staff_invitations')
      .select('*')
      .eq('invitation_token', token)
      .eq('status', 'PENDING')
      .gt('expires_at', new Date().toISOString())
      .single();
    if (staffInvite) {
      return {
        email: staffInvite.email,
        role: staffInvite.role,
        token: staffInvite.invitation_token,
        expires_at: staffInvite.expires_at,
        school_id: staffInvite.school_id,
        is_staff_invitation: true,
        position: staffInvite.position,
        department: staffInvite.department,
      };
    }

    throw new Error('Invitation invalide ou expirée');
  },

  async activateAccount(data: { email?: string; password: string; name: string; token: string; schoolCode?: string; matricule?: string; dateOfBirth?: string }) {
    const supabase = getSupabase();
    if (!data.email) throw new Error('Email requis');

    const { data: staffInvite } = await supabase
      .from('staff_invitations')
      .select('*')
      .eq('invitation_token', data.token)
      .eq('status', 'PENDING')
      .single();

    const { data: generalInvite } = await supabase
      .from('invitations')
      .select('*')
      .eq('token', data.token)
      .is('used_at', null)
      .single();

    const userMeta: Record<string, any> = { name: data.name };
    if (staffInvite) {
      userMeta.role = staffInvite.role;
      userMeta.school_id = staffInvite.school_id;
      userMeta.is_first_login = false;
    } else if (generalInvite) {
      userMeta.role = generalInvite.role;
      userMeta.school_id = generalInvite.school_id;
      userMeta.is_first_login = false;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: userMeta,
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : 'https://educi.live'}/verification`,
      },
    });
    if (authError) throw authError;

    if (staffInvite) {
      const newUserId = authData?.user?.id;
      if (newUserId) {
        await supabase.from('staff').insert({
          user_id: newUserId,
          school_id: staffInvite.school_id,
          position: staffInvite.position,
          department: staffInvite.department || null,
          is_active: true,
        });
        await supabase.from('staff_invitations')
          .update({ status: 'ACCEPTED', accepted_at: new Date().toISOString() })
          .eq('invitation_token', data.token);
      }
    } else if (generalInvite) {
      const newUserId = authData?.user?.id;
      if (newUserId) {
        await supabase.from('users').upsert({
          id: newUserId,
          name: data.name,
          email: data.email,
          role: generalInvite.role,
          school_id: generalInvite.school_id,
          is_active: true,
        }, { onConflict: 'id' });

        if (generalInvite.student_id) {
          await supabase.from('parents').upsert({
            user_id: newUserId,
            school_id: generalInvite.school_id,
          }, { onConflict: 'user_id' });
        } else if (generalInvite.role === 'STUDENT') {
          await supabase.from('students').insert({
            user_id: newUserId,
            school_id: generalInvite.school_id,
            is_active: true,
          });
        } else if (generalInvite.role === 'TEACHER') {
          await supabase.from('teachers').insert({
            user_id: newUserId,
            school_id: generalInvite.school_id,
          });
        } else if (['SECRETAIRE', 'COMPTABLE', 'CENSEUR', 'SURVEILLANT', 'DIRECTEUR', 'CHAUFFEUR'].includes(generalInvite.role)) {
          await supabase.from('staff').insert({
            user_id: newUserId,
            school_id: generalInvite.school_id,
            position: generalInvite.role,
            is_active: true,
          });
        }

        await supabase.from('invitations').update({ used_at: new Date().toISOString() }).eq('token', data.token);
      }
    }

    return { user: authData.user };
  },

  async logout() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
  },
};
