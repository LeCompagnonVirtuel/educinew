'use client';

import { RegistrationProvider } from '@/components/registration/RegistrationContext';
import RegistrationSidebar from '@/components/registration/RegistrationSidebar';

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <RegistrationProvider>
      <div className="min-h-screen flex flex-col lg:flex-row bg-[#F9FAFB]">
        <RegistrationSidebar />
        <div className="flex-1 flex items-start lg:items-center justify-center pt-24 lg:pt-0 p-4 sm:p-6 lg:p-10 relative overflow-y-auto min-h-screen">
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#4F46E5]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#8B5CF6]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 w-full max-w-3xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </RegistrationProvider>
  );
}
