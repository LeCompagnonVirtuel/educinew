import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { encrypt, decrypt, maskKey, getConfigFieldsForGateway, SUPPORTED_GATEWAYS } from '@/lib/api/domains/payment-gateway.service';
import { validateMoneyFusionUrl } from '@/lib/payments/providers/moneyfusion';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const gatewayConfigSchema = z.object({
  gateway: z.literal('MONEY_FUSION'),
  config: z.record(z.string(), z.string()).optional(),
  isActive: z.boolean().default(false),
});

function getAuthenticatedAdmin(supabase: any, req: NextRequest) {
  return async () => {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) throw new Error('NON_AUTH');
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) throw new Error('NON_AUTH');
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!['ADMIN', 'SUPER_ADMIN'].includes(profile?.role)) throw new Error('NON_ADMIN');
    if (!profile?.school_id) throw new Error('NO_SCHOOL');
    return { user, profile, schoolId: profile.school_id };
  };
}

export async function GET(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY);

  try {
    const auth = await getAuthenticatedAdmin(supabase, req)();
    const schoolId = auth.schoolId;

    const { data: configs } = await supabase
      .from('payment_gateway_configs')
      .select('*')
      .eq('school_id', schoolId)
      .eq('gateway', 'MONEY_FUSION');

    const config = configs?.[0];

    const gateways = await Promise.all(SUPPORTED_GATEWAYS.map(async gw => {
      let maskedUrl = null;
      if (config?.config_encrypted?.payment_url) {
        const decrypted = await decrypt(config.config_encrypted.payment_url);
        maskedUrl = maskKey(decrypted);
      }
      return {
        ...gw,
        configured: !!config,
        isActive: config?.is_active || false,
        configId: config?.id || null,
        lastTestedAt: config?.last_tested_at || null,
        lastTestStatus: config?.last_test_status || null,
        lastTestMessage: config?.last_test_message || null,
        configFields: getConfigFieldsForGateway(gw.name),
        maskedUrl,
      };
    }));

    return NextResponse.json({ gateways });
  } catch (error: any) {
    if (error.message === 'NON_AUTH') return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    if (error.message === 'NON_ADMIN') return NextResponse.json({ error: 'Accès réservé aux administrateurs' }, { status: 403 });
    if (error.message === 'NO_SCHOOL') return NextResponse.json({ error: 'Établissement non trouvé' }, { status: 401 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY);

  try {
    const auth = await getAuthenticatedAdmin(supabase, req)();
    const schoolId = auth.schoolId;

    const body = await req.json();
    const bodyValidation = gatewayConfigSchema.safeParse(body);
    if (!bodyValidation.success) {
      return NextResponse.json({ error: bodyValidation.error.issues[0]?.message || 'Données invalides' }, { status: 400 });
    }
    const { gateway, config, isActive } = bodyValidation.data;

    const paymentUrl = config?.payment_url || '';

    if (paymentUrl && !paymentUrl.includes('****')) {
      const validation = validateMoneyFusionUrl(paymentUrl);
      if (!validation.valid) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
    }

    const { data: existingConfig } = await supabase
      .from('payment_gateway_configs')
      .select('config_encrypted')
      .eq('school_id', schoolId)
      .eq('gateway', gateway)
      .single();

    const encryptedConfig: Record<string, string> = {};

    if (paymentUrl) {
      if (!paymentUrl.includes('****')) {
        encryptedConfig.payment_url = await encrypt(paymentUrl);
      } else if (existingConfig?.config_encrypted?.payment_url) {
        encryptedConfig.payment_url = existingConfig.config_encrypted.payment_url;
      }
    }

    const gwInfo = SUPPORTED_GATEWAYS[0];
    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://educi.live';

    const { data, error } = await supabase
      .from('payment_gateway_configs')
      .upsert({
        school_id: schoolId,
        gateway: 'MONEY_FUSION',
        gateway_name: 'MONEY_FUSION',
        display_name: gwInfo.label,
        description: gwInfo.description,
        is_active: isActive ?? false,
        config: encryptedConfig,
        config_encrypted: encryptedConfig,
        credentials: encryptedConfig,
        supported_methods: gwInfo.supportedMethods,
        supported_currencies: gwInfo.supportedCurrencies,
        supported_countries: gwInfo.supportedCountries,
        currency: 'XOF',
        country: 'CI',
        webhook_url: `${appUrl}/api/payments/webhook/money-fusion`,
        return_url: `${appUrl}/payment-receipt`,
        cancel_url: `${appUrl}/parent/payments`,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'school_id,gateway' })
      .select()
      .single();

    if (error) throw error;

    await supabase.from('transaction_logs').insert({
      school_id: schoolId,
      gateway_id: data.id,
      action: 'CONFIG_SAVED',
      status: 'SUCCESS',
      gateway_response: { gateway, configured_by: auth.user.id },
    });

    return NextResponse.json({ success: true, configId: data.id });
  } catch (error: any) {
    if (error.message === 'NON_AUTH') return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    if (error.message === 'NON_ADMIN') return NextResponse.json({ error: 'Accès réservé aux administrateurs' }, { status: 403 });
    if (error.message === 'NO_SCHOOL') return NextResponse.json({ error: 'Établissement non trouvé' }, { status: 401 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY);

  try {
    const auth = await getAuthenticatedAdmin(supabase, req)();
    const schoolId = auth.schoolId;

    const { searchParams } = new URL(req.url);
    const configId = searchParams.get('id');
    if (!configId) return NextResponse.json({ error: 'ID requis' }, { status: 400 });

    const { error } = await supabase
      .from('payment_gateway_configs')
      .delete()
      .eq('id', configId)
      .eq('school_id', schoolId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'NON_AUTH') return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    if (error.message === 'NON_ADMIN') return NextResponse.json({ error: 'Accès réservé aux administrateurs' }, { status: 403 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
