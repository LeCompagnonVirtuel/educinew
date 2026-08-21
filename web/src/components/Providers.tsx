'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import { LanguageProvider } from '@/hooks/useLanguage';
import { SchoolProvider } from '@/hooks/useSchool';
import { ThemeProvider } from '@/hooks/useTheme';
import { BrandingProvider } from '@/components/branding/BrandingProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RealtimeToast } from '@/components/RealtimeToast';
import { RealtimeProvider } from '@/lib/realtime/RealtimeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <RealtimeProvider>
                <SchoolProvider>
                  <BrandingProvider>
                    <RealtimeToast />
                    {children}
                  </BrandingProvider>
                </SchoolProvider>
              </RealtimeProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
