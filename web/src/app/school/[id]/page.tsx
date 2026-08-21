import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PublicSchoolClient from './PublicSchoolClient';

export default async function PublicSchoolPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: school } = await supabase
    .from('schools')
    .select('id, name, email, phone, address, city, region, country, latitude, longitude, logo_url, sigle, slogan, description, subscription_plan, is_active, created_at')
    .eq('id', params.id)
    .single();

  if (!school || !school.is_active) notFound();

  const [studentsRes, teachersRes] = await Promise.all([
    supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', school.id),
    supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('school_id', school.id),
  ]);

  const { data: programs } = await supabase
    .from('academic_programs')
    .select('name')
    .eq('school_id', school.id);

  const mapped = {
    id: school.id,
    name: school.name,
    code: school.sigle || school.id.slice(0, 8).toUpperCase(),
    address: school.address || school.city || '',
    city: school.city || '',
    lat: school.latitude || 5.36,
    lng: school.longitude || -4.008,
    type: school.description?.split(' ')[0] || 'École',
    students: studentsRes.count || 0,
    teachers: teachersRes.count || 0,
    isPremium: school.subscription_plan !== 'FREE',
    rating: 4.0,
    phone: school.phone || '—',
    email: school.email || '—',
    description: school.description || '',
    programs: programs?.map((p: { name: string }) => p.name) || [],
  };

  return <PublicSchoolClient school={mapped} />;
}
