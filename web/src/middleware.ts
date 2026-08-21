import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { ROLE_REDIRECTS } from '@educi/config';

const PUBLIC_PATHS = ['/', '/login', '/register', '/register/', '/reset-password', '/forgot-password', '/verification', '/api/health'];
const STATIC_EXTENSIONS = ['.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.css', '.js', '.woff', '.woff2', '.ttf', '.eot'];

const ROLE_ROUTES: Record<string, string[]> = {
  SUPER_ADMIN: ['/super-admin', '/admin', '/dashboard'],
  ADMIN: ['/admin', '/dashboard'],
  TEACHER: ['/teacher', '/dashboard'],
  STUDENT: ['/student', '/dashboard'],
  PARENT: ['/parent', '/dashboard'],
  ACCOUNTANT: ['/accountant', '/dashboard'],
  STAFF: ['/staff', '/dashboard'],
};

export function isStaticFile(pathname: string): boolean {
  return STATIC_EXTENSIONS.some((ext) => pathname.toLowerCase().endsWith(ext)) || pathname.startsWith('/_next/') || pathname.startsWith('/favicon');
}

export function checkCSRF(request: NextRequest): NextResponse | null {
  if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'OPTIONS') return null;
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.host !== host) {
        return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
    }
  }
  return null;
}

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.includes(pathname) || pathname.startsWith('/api/public');
}

export function isProtectedRoute(pathname: string): boolean {
  if (isPublicPath(pathname) || isStaticFile(pathname)) return false;
  return !pathname.startsWith('/api/public');
}

export function canAccessRoute(role: string, pathname: string): boolean {
  if (role === 'SUPER_ADMIN') return true;
  const allowedRoutes = ROLE_ROUTES[role] || [];
  return allowedRoutes.some((route) => pathname.startsWith(route)) || pathname.startsWith('/dashboard');
}

export function applySecurityHeaders(headers: Headers): void {
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticFile(pathname)) {
    return NextResponse.next();
  }

  const csrfError = checkCSRF(request);
  if (csrfError) return csrfError;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (isProtectedRoute(pathname)) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    const emailConfirmed = user.email_confirmed_at;
    if (!emailConfirmed) {
      const { data: dbUser } = await supabase
        .from('users')
        .select('school_id, role, is_activated')
        .eq('id', user.id)
        .single();

      if (!(dbUser?.is_activated || (dbUser?.school_id && dbUser?.role))) {
        const url = request.nextUrl.clone();
        url.pathname = '/verification';
        return NextResponse.redirect(url);
      }
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('is_first_login, school_id, role, activation_token')
      .eq('id', user.id)
      .single();

    const isFirstLogin = dbUser?.is_first_login === true && !!dbUser?.activation_token;
    if (isFirstLogin && pathname !== '/first-login') {
      const url = request.nextUrl.clone();
      url.pathname = '/first-login';
      return NextResponse.redirect(url);
    }

    const userRole = dbUser?.role as string | undefined;
    const schoolId = dbUser?.school_id;

    if (!userRole) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    if (userRole === 'ADMIN' && !schoolId && pathname !== '/register' && !pathname.startsWith('/register/')) {
      const url = request.nextUrl.clone();
      url.pathname = '/register';
      return NextResponse.redirect(url);
    }

    if (!canAccessRoute(userRole, pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = ROLE_REDIRECTS[userRole] || '/login';
      return NextResponse.redirect(url);
    }
  }

  applySecurityHeaders(supabaseResponse.headers);

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
