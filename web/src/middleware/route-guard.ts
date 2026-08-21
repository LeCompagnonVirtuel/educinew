import { ROLE_ROUTES, PUBLIC_ROUTES } from '@educi/config';

export function isStaticFile(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    /\.(?:ico|svg|png|jpg|jpeg|gif|webp|css|js|woff2?|ttf|eot|map|json|txt|xml|webmanifest)$/.test(pathname)
  );
}

export function isPublicPath(pathname: string): boolean {
  return (
    (PUBLIC_ROUTES as readonly string[]).includes(pathname) ||
    (PUBLIC_ROUTES as readonly string[]).some((p) => pathname.startsWith(p + '/'))
  );
}

export function isProtectedRoute(pathname: string): boolean {
  return Object.values(ROLE_ROUTES).flat().some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );
}

export function canAccessRoute(role: string, pathname: string): boolean {
  const allowedRoutes = ROLE_ROUTES[role] || [];
  return allowedRoutes.some((p) => pathname === p || pathname.startsWith(p + '/'));
}
