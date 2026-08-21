'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateSchoolPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/register');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-extrabold text-lg">E</span>
        </div>
        <p className="text-sm text-slate-500">Redirection vers l'inscription…</p>
      </div>
    </div>
  );
}
