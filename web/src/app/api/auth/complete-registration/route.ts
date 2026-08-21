import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { sbEmailTrigger } from '@/lib/api/domains/email-trigger.service';
export const runtime = 'nodejs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, adminName, adminEmail, schoolName, address, phone, schoolEmail, region, city, schoolType } = body;

    if (!userId || !adminName || !adminEmail || !schoolName) {
      return NextResponse.json(
        { error: 'Données manquantes pour compléter l\'inscription.' },
        { status: 400 }
      );
    }

    // Verify caller identity via JWT
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const anonSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: { user: authUser }, error: authError } = await anonSupabase.auth.getUser(token);

    if (authError || !authUser) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    if (authUser.id !== userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Use register_school_via_activation (no auth.uid() check, safe for service role)
    const { data: school, error: schoolError } = await supabase.rpc('register_school_via_activation', {
      p_admin_id: userId,
      p_admin_name: adminName,
      p_admin_email: adminEmail,
      p_school_name: schoolName,
      p_address: address || null,
      p_phone: phone || null,
      p_school_email: schoolEmail || null,
      p_region: region || 'ABJ',
      p_city: city || 'Abidjan',
      p_school_type: schoolType || 'SECONDARY',
    });

    if (schoolError) {
      console.error('[complete-registration] RPC error:', schoolError.message);
      return NextResponse.json(
        { error: 'Erreur lors de la création de l\'établissement.', details: schoolError.message },
        { status: 500 }
      );
    }

    const schoolId = typeof school === 'object' ? school.id : school;
    if (!schoolId) {
      return NextResponse.json(
        { error: 'Aucune donnée d\'établissement retournée.' },
        { status: 500 }
      );
    }

    const { data: { user: existingUser } } = await supabase.auth.admin.getUserById(userId);
    await supabase.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...(existingUser?.user_metadata || {}),
        name: adminName,
        role: 'ADMIN',
        school_id: schoolId,
        school_name: schoolName,
      },
    });

    sbEmailTrigger.onSchoolCreated(adminEmail, adminName, schoolName);

    return NextResponse.json({ success: true, school: { id: schoolId, ...( typeof school === 'object' ? school : {}) } });
  } catch (error: any) {
    console.error('[complete-registration] Fatal error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}
