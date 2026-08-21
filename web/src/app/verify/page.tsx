'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = searchParams.toString();
    router.replace(`/verification${params ? `?${params}` : ''}`);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#4F46E5] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Redirection...</p>
      </div>
    </div>
  );
}
