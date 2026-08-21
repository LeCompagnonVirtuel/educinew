import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export const runtime = 'nodejs';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    // Authenticate the caller via Bearer token
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: { user: caller }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !caller) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { userId, adminName, adminEmail, adminPhone, schoolName, schoolType, city, address, phone, email, region } = body;

    if (!userId || !adminEmail || !schoolName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Only allow users to save their own draft
    if (caller.id !== userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { data: { user: authUser } } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (!authUser || authUser.email !== adminEmail.toLowerCase().trim()) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 403 });
    }

    // Upsert into onboarding_drafts (uses data JSONB for extra fields)
    const { data, error } = await supabaseAdmin
      .from('onboarding_drafts')
      .upsert({
        user_id: userId,
        email: adminEmail,
        school_name: schoolName,
        step: 1,
        completed: false,
        data: {
          admin_name: adminName,
          admin_email: adminEmail,
          admin_phone: adminPhone || null,
          school_type: schoolType || 'SECONDARY',
          country: "Côte d'Ivoire",
          city: city || '',
          address: address || null,
          phone: phone || null,
          region: region || '',
        },
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      console.error('[SaveDraft] Failed to insert:', error);
      return NextResponse.json({ error: 'Failed to save draft', details: error.message, code: error.code }, { status: 500 });
    }

    return NextResponse.json({ success: true, draft: data });
  } catch (error) {
    console.error('[SaveDraft] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
