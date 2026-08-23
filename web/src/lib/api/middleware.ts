import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient as createServerSupabase } from '@/lib/supabase/server';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface AuthContext {
  userId: string;
  schoolId: string;
  role: string;
  supabase: Awaited<ReturnType<typeof createServerSupabase>>;
}

export interface RouteConfig {
  method: HttpMethod;
  requireAuth?: boolean;
  requireSchool?: boolean;
  allowedRoles?: string[];
  bodySchema?: z.ZodSchema;
  querySchema?: z.ZodSchema;
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function authenticate(_request: NextRequest): Promise<AuthContext> {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Non authentifié');

  const { data: dbUser } = await supabase
    .from('users')
    .select('school_id, role')
    .eq('id', user.id)
    .single();

  return {
    userId: user.id,
    schoolId: dbUser?.school_id || user.user_metadata?.school_id || '',
    role: dbUser?.role || user.user_metadata?.role || 'STUDENT',
    supabase,
  };
}

export async function authorize(
  ctx: AuthContext,
  allowedRoles?: string[]
): Promise<void> {
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(ctx.role)) {
      throw new Error('Permissions insuffisantes');
    }
  }
}

export function validateBody<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.issues[0];
    const msg = firstError
      ? `${firstError.path.join('.')}: ${firstError.message}`
      : 'Données invalides';
    throw new Error(msg);
  }
  return result.data;
}

export type RouteHandler = (
  request: NextRequest,
  ctx: AuthContext,
  params?: Record<string, string>
) => Promise<NextResponse>;

export function createRoute(config: RouteConfig, handler: RouteHandler) {
  return async (
    request: NextRequest,
    context?: { params?: Promise<Record<string, string>> }
  ): Promise<NextResponse> => {
    try {
      if (config.method !== request.method) {
        return jsonError('Méthode non autorisée', 405);
      }

      let ctx: AuthContext | null = null;

      if (config.requireAuth !== false) {
        try {
          ctx = await authenticate(request);
        } catch {
          return jsonError('Non authentifié', 401);
        }

        if (config.allowedRoles && config.allowedRoles.length > 0) {
          try {
            await authorize(ctx, config.allowedRoles);
          } catch {
            return jsonError('Permissions insuffisantes', 403);
          }
        }

        if (config.requireSchool !== false && !ctx.schoolId) {
          return jsonError('Aucun établissement associé', 403);
        }
      } else {
        ctx = {
          userId: '',
          schoolId: '',
          role: '',
          supabase: await createServerSupabase(),
        };
      }

      if (config.bodySchema && (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH')) {
        try {
          const body = await request.json();
          validateBody(config.bodySchema, body);
        } catch (e) {
          if (e instanceof Error) {
            return jsonError(e.message, 400);
          }
          return jsonError('Données invalides', 400);
        }
      }

      const params = context?.params ? await context.params : undefined;
      return await handler(request, ctx, params);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erreur interne';
      if (message === 'Non authentifié') return jsonError(message, 401);
      if (message === 'Permissions insuffisantes') return jsonError(message, 403);
      if (message === 'Aucun établissement associé') return jsonError(message, 403);
      return jsonError(message, 500);
    }
  };
}
