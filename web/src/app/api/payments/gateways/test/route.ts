import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { decrypt } from '@/lib/api/domains/payment-gateway.service';
import { validateMoneyFusionUrl } from '@/lib/payments/providers/moneyfusion';
import { z } from 'zod';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const gatewayTestSchema = z.object({
  gatewayId: z.string().uuid('ID gateway invalide'),
});

async function testMoneyFusion(config: Record<string, any>): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const paymentUrl = config.payment_url ? await decrypt(config.payment_url) : '';
    if (!paymentUrl) return { success: false, message: 'URL de paiement Money Fusion non configurée' };

    const validation = validateMoneyFusionUrl(paymentUrl);
    if (!validation.valid) {
      return { success: false, message: validation.error || 'URL invalide' };
    }

    return {
      success: true,
      message: `Money Fusion configuré pour "${validation.businessName}". Prêt à recevoir des paiements.`,
    };
  } catch (e: any) {
    return { success: false, message: `Erreur: ${e.message}` };
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!['ADMIN', 'SUPER_ADMIN'].includes(profile?.role)) {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs' }, { status: 403 });
    }
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const body = await req.json();
    const bodyValidation = gatewayTestSchema.safeParse(body);
    if (!bodyValidation.success) {
      return NextResponse.json({ error: bodyValidation.error.issues[0]?.message || 'Données invalides' }, { status: 400 });
    }
    const { gatewayId } = bodyValidation.data;

    const { data: config, error } = await supabase
      .from('payment_gateway_configs')
      .select('*')
      .eq('id', gatewayId)
      .eq('school_id', schoolId)
      .single();

    if (error || !config) return NextResponse.json({ error: 'Passerelle introuvable' }, { status: 404 });

    const startTime = Date.now();
    const result = await testMoneyFusion(config.config_encrypted || {});
    const duration = Date.now() - startTime;

    await supabase
      .from('payment_gateway_configs')
      .update({
        last_tested_at: new Date().toISOString(),
        last_test_status: result.success ? 'SUCCESS' : 'FAILED',
        last_test_message: result.message,
      })
      .eq('id', gatewayId);

    await supabase.from('gateway_test_results').insert({
      school_id: schoolId,
      gateway_id: gatewayId,
      test_type: 'CONNECTION',
      status: result.success ? 'SUCCESS' : 'FAILED',
      error_message: result.success ? null : result.message,
      duration_ms: duration,
    });

    await supabase.from('transaction_logs').insert({
      school_id: schoolId,
      gateway_id: gatewayId,
      action: 'GATEWAY_TEST',
      status: result.success ? 'SUCCESS' : 'FAILED',
      gateway_response: { gateway: 'MONEY_FUSION', result, duration_ms: duration },
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
