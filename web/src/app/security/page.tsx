'use client';

import { useState } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { Shield, Key, Smartphone, Eye, Bell, Trash2, CheckCircle } from 'lucide-react';

export default function SecuritySettingsPage() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginNotifs, setLoginNotifs] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Settings' }, { label: 'Security' }]}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold bg-emerald-500 text-white">
          {toast}
        </div>
      )}

      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-[#191c1d] mb-2">Security Settings</h2>
        <p className="text-[#464555] mb-8">Manage your account security and privacy.</p>

        <div className="space-y-6">
          {[
            {
              section: 'Authentication',
              items: [
                { icon: Key, label: 'Change Password', desc: 'Update your account password', action: 'link', onClick: () => showToast('Redirection vers le changement de mot de passe') },
                { icon: Smartphone, label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', action: 'toggle', value: twoFactor, onClick: () => setTwoFactor(!twoFactor) },
                { icon: Eye, label: 'Active Sessions', desc: '3 active sessions', action: 'link', onClick: () => showToast('Sessions actives affichées') },
              ],
            },
            {
              section: 'Privacy',
              items: [
                { icon: Bell, label: 'Login Notifications', desc: 'Get notified of new logins', action: 'toggle', value: loginNotifs, onClick: () => setLoginNotifs(!loginNotifs) },
                { icon: Shield, label: 'Data Export', desc: 'Download all your data', action: 'link', onClick: () => showToast('Export des données en cours...') },
                { icon: Trash2, label: 'Delete Account', desc: 'Permanently delete your account', action: 'danger', onClick: () => showToast('Contactez le support pour supprimer votre compte') },
              ],
            },
          ].map((group) => (
            <div key={group.section}>
              <h3 className="text-xs font-bold text-[#464555] uppercase tracking-widest mb-3 px-1">{group.section}</h3>
              <div className="bg-white rounded-xl overflow-hidden shadow-card">
                {group.items.map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 ${i < group.items.length - 1 ? 'border-b border-[#e7e8e9]' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#e2dfff] flex items-center justify-center">
                        <item.icon size={18} className="text-[#3525cd]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#191c1d]">{item.label}</p>
                        <p className="text-xs text-[#464555]">{item.desc}</p>
                      </div>
                    </div>
                    {item.action === 'toggle' ? (
                      <button onClick={item.onClick} className={`w-12 h-6 rounded-full ${item.value ? 'bg-[#3525cd]' : 'bg-[#e7e8e9]'} relative cursor-pointer transition-colors`}>
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${item.value ? 'left-6' : 'left-0.5'}`} />
                      </button>
                    ) : item.action === 'danger' ? (
                      <button onClick={item.onClick} className="text-sm font-semibold text-[#ba1a1a]">Supprimer</button>
                    ) : (
                      <button onClick={item.onClick} className="text-[#c7c4d8] hover:text-[#3525cd] transition-colors">→</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleLayout>
  );
}
