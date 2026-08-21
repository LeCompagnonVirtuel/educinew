import { supabase, camel, getUserSchoolId } from './supabase';
import { cached, executeRequest } from './base';

export async function login(identifier: string, password: string, _schoolCode?: string) {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  let email = identifier;

  if (!isEmail) {
    try {
      const { data: resolvedData, error: resolveError } = await supabase
        .rpc('resolve_login_identifier', { p_identifier: identifier });
      if (resolveError) {
        throw new Error('Identifiant non reconnu. Vérifiez votre identifiant ou contactez votre établissement.');
      }
      // Handle TABLE return type (array of objects with email field)
      const resolvedEmail = Array.isArray(resolvedData) ? resolvedData[0]?.email : resolvedData;
      if (!resolvedEmail) {
        throw new Error('Identifiant non reconnu. Vérifiez votre identifiant ou contactez votre établissement.');
      }
      email = resolvedEmail;
    } catch (err: any) {
      if (err.message?.includes('non reconnu')) throw err;
      throw new Error('Impossible de vérifier l\'identifiant. Vérifiez votre connexion et réessayez.');
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.message === 'Email not confirmed') {
      throw new Error('Votre email n\'est pas encore confirmé. Vérifiez votre boîte de réception.');
    }
    if (error.message?.includes('Invalid login')) {
      throw new Error('Identifiants incorrects. Vérifiez votre identifiant et mot de passe.');
    }
    throw error;
  }

  // Read trusted profile from public.users (not user_metadata)
  const { data: profile } = await supabase
    .from('users')
    .select('name, role, school_id, phone, photo_url, is_active')
    .eq('id', data.user.id)
    .single();

  // SECURITY: Always use DB role — never trust client-writable user_metadata
  const role = profile?.role || 'STUDENT';
  if (role === 'SUPER_ADMIN' || role === 'OWNER') {
    await supabase.auth.signOut();
    throw new Error('OWNER_BLOCKED');
  }
  if (role === 'ADMIN') {
    await supabase.auth.signOut();
    throw new Error('ADMIN_USE_WEB');
  }

  // Server-side is_active check — block deactivated users
  if (profile && profile.is_active === false) {
    await supabase.auth.signOut();
    throw new Error('Votre compte a été désactivé. Contactez l\'administration.');
  }

  const isFirstLogin = data.user.user_metadata?.is_first_login === true ||
    data.user.user_metadata?.must_change_password === true ||
    data.user.user_metadata?.first_login_completed === false;

  return {
    user: {
      id: data.user.id,
      name: profile?.name || data.user.email || '',
      email: data.user.email || '',
      role,
      schoolId: profile?.school_id,
      photoUrl: profile?.photo_url,
      phone: profile?.phone,
      isActive: profile?.is_active ?? true,
      isFirstLogin,
    },
    token: data.session.access_token,
    refreshToken: data.session.refresh_token,
  };
}

export async function refreshToken(_rt: string) {
  const { data, error } = await supabase.auth.refreshSession();
  if (error) throw error;
  return { token: data.session?.access_token || '', refreshToken: data.session?.refresh_token || '' };
}

export async function validateSchoolCode(code: string) {
  const { data, error } = await supabase.from('schools').select('id,name,code').eq('code', code).single();
  if (error) throw error;
  return data;
}

export async function forgotPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
  return { message: 'Email envoyé' };
}

function getApiBase(): string {
  const url = process.env.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_SITE_URL;
  if (!url) throw new Error('EXPO_PUBLIC_API_URL ou EXPO_PUBLIC_SITE_URL doit être configuré');
  return url;
}

export async function verifyOTP(email: string, code: string) {
  const res = await fetch(`${getApiBase()}/api/auth/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: code }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Lien invalide.');
  return data;
}

export async function verifyEmailToken(token: string) {
  const res = await fetch(`${getApiBase()}/api/auth/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Lien invalide.');
  return data;
}

export async function resendOTP(email: string) {
  const res = await fetch(`${getApiBase()}/api/auth/resend-confirmation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Impossible de renvoyer le code.');
  return { success: true };
}

export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Non authentifié');
  return cached(`profile_${user.id}`, 300000, async () => {
    const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
    if (data) return camel(data);
    // SECURITY: If DB profile not found, throw error instead of trusting metadata
    throw new Error('Profil utilisateur introuvable dans la base de données');
  });
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) throw new Error('Utilisateur non connecté');

  if (currentPassword) {
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (verifyError) throw new Error('Mot de passe actuel incorrect');
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
  return { message: 'Mot de passe modifié' };
}

export async function activateAccount(data: any) {
  if (!data.email) throw new Error('Email requis pour l\'activation');

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (!signInError) return login(data.email, data.password);

  if (signInError.message?.includes('Email not confirmed') || signInError.message?.includes('not confirmed')) {
    throw new Error('Compte existant non activé. Vérifiez votre email pour le code OTP.');
  }

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { data: { name: data.name, token: data.token, school_code: data.schoolCode } },
  });
  if (signUpError) throw signUpError;
  return { user: authData.user, token: authData.session?.access_token || '', refreshToken: authData.session?.refresh_token || '' };
}

export async function activateEnterpriseAccount(token: string, password: string, name: string, schoolCode: string) {
  const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/activate-account`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password, name, school_code: schoolCode }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Erreur d\'activation' }));
    throw new Error(err.message || `Erreur HTTP ${res.status}`);
  }
  const result = await res.json();
  if (result.token) {
    const { data, error } = await supabase.auth.signInWithPassword({ email: result.email, password });
    if (!error) {
      // SECURITY: Read from DB after sign-in, not from client-writable metadata
      const { data: profile } = await supabase
        .from('users')
        .select('name, role, school_id')
        .eq('id', data.user.id)
        .single();

      return {
        user: {
          id: data.user.id,
          name: profile?.name || name,
          email: data.user.email || '',
          role: profile?.role || 'STUDENT',
          schoolId: profile?.school_id,
        },
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
      };
    }
  }
  return result;
}

export async function validateInvitation(token: string) {
  const { data, error } = await supabase.from('invitations').select('*').eq('token', token).is('used_at', null).single();
  if (error) throw error;
  return data;
}

export async function loginWithQRCode(qrData: string) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/qr-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    },
    body: JSON.stringify({ qr_data: qrData }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'QR Code invalide' }));
    throw new Error(err.error || err.message || 'QR Code invalide ou expiré');
  }

  const result = await res.json();
  if (result.email && result.temp_token) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: result.email,
      password: result.temp_token,
    });
    if (error) throw error;

    const { data: qrProfile } = await supabase
      .from('users')
      .select('name, role, school_id, phone, photo_url, is_active')
      .eq('id', data.user.id)
      .single();

    return {
      user: {
        id: data.user.id,
        name: qrProfile?.name || data.user.email || '',
        email: data.user.email || '',
        // SECURITY: Always use DB values — never trust client-writable metadata
        role: qrProfile?.role || 'STUDENT',
        schoolId: qrProfile?.school_id,
        photoUrl: qrProfile?.photo_url,
        phone: qrProfile?.phone,
        isActive: qrProfile?.is_active ?? true,
      },
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }

  return result;
}

export async function completeFirstLogin(profileData: { phone?: string; emergency_contact?: string; first_login_completed: boolean }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Non authentifié');

  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      ...user.user_metadata,
      phone: profileData.phone || user.user_metadata?.phone,
      emergency_contact: profileData.emergency_contact,
      first_login_completed: true,
      is_first_login: false,
      must_change_password: false,
    },
  });
  if (metaError) throw metaError;

  if (profileData.phone) {
    await supabase.from('users').update({ phone: profileData.phone }).eq('id', user.id);
  }

  return { success: true };
}

export async function getSchoolBranding(schoolCode: string) {
  const { data, error } = await supabase
    .from('schools')
    .select('id, name, logo_url, primary_color, slogan')
    .eq('code', schoolCode)
    .single();
  if (error) return null;
  return data;
}

export async function registerSchool(_data: any): Promise<never> {
  throw new Error('La création d\'établissement se fait sur la plateforme Web educi.live.');
}

export async function getSchools() {
  const { data, error } = await supabase.from('schools').select('*');
  if (error) throw error;
  return camel(data || []);
}

export async function getSchool(id: string) {
  const { data, error } = await supabase.from('schools').select('*').eq('id', id).single();
  if (error) throw error;
  return camel(data);
}
