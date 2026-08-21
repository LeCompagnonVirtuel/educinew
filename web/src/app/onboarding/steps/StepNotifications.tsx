'use client';

import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import { Mail, Bell, MessageSquare, Phone } from 'lucide-react';

export default function StepNotifications() {
  const { data, updateNotifications, nextStep } = useOnboarding();

  const channels = [
    { key: 'emailEnabled', label: 'Emails', icon: Mail, desc: 'Notifications par email via Resend', color: 'text-[#4F46E5]' },
    { key: 'pushEnabled', label: 'Push', icon: Bell, desc: 'Notifications push sur mobile et web', color: 'text-[#8B5CF6]' },
    { key: 'smsEnabled', label: 'SMS', icon: MessageSquare, desc: 'Messages SMS (prochainement)', color: 'text-[#F59E0B]' },
    { key: 'whatsappEnabled', label: 'WhatsApp', icon: Phone, desc: 'Messages WhatsApp (prochainement)', color: 'text-[#10B981]' },
  ];

  return (
    <StepCard
      title="Notifications"
      subtitle="Configurez les canaux de communication avec vos utilisateurs."
      icon="🔔"
      onNext={nextStep}
    >
      <div className="space-y-3">
        {channels.map(({ key, label, icon: Icon, desc, color }) => (
          <button
            key={key}
            onClick={() => updateNotifications({ [key]: !(data.notifications as any)[key] })}
            className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
              (data.notifications as any)[key]
                ? 'border-[#4F46E5]/30 bg-[#4F46E5]/5'
                : 'border-slate-100 hover:border-slate-200 opacity-60'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              (data.notifications as any)[key] ? 'bg-[#4F46E5]/10' : 'bg-slate-100'
            }`}>
              <Icon size={22} className={(data.notifications as any)[key] ? color : 'text-slate-400'} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </div>
            <div className={`w-12 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${
              (data.notifications as any)[key] ? 'bg-[#4F46E5] justify-end' : 'bg-slate-200 justify-start'
            }`}>
              <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </div>
          </button>
        ))}
      </div>
    </StepCard>
  );
}
