'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const roleDashboards: Record<string, string> = {
  SUPER_ADMIN: '/superadmin',
  ADMIN: '/dashboard',
  COMPTABLE: '/comptable',
  SECRETAIRE: '/secretaire',
  CENSEUR: '/censeur',
  SURVEILLANT: '/surveillant',
  TEACHER: '/teacher-dashboard',
  PARENT: '/parent',
  STUDENT: '/student',
  CHAUFFEUR: '/driver-dashboard',
};

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        const role = profile?.role || 'STUDENT';
        router.replace(roleDashboards[role] || '/dashboard');
      } else {
        router.replace('/auth/select-role');
      }
    };
    checkAuth();
  }, [router]);

  return null;
}
