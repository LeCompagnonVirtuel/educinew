import { NextRequest, NextResponse } from 'next/server';
import { createIntegrationRepository } from '@/features/integration/repositories/integration.repository';
import { createConnectorConfigService } from '@/features/integration/services/connector-config.service';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createIntegrationRepository(supabase);
    const service = createConnectorConfigService(repo);
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams);
    const data = await service.listConnectorConfigs(params.schoolId || '', params.userId || '', params.connectorId || '');
    return NextResponse.json({ data });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createIntegrationRepository(supabase);
    const service = createConnectorConfigService(repo);
    const data = await service.createConnectorConfig(body.schoolId, body.userId, body.connectorId, body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}
