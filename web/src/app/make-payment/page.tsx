'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { paymentsApi } from '@/lib/api/payments';
import { formatCurrency } from '@/lib/utils';
import { CreditCard, Check, Loader2, ExternalLink } from 'lucide-react';

export default function MakePaymentPage() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();
  const [amount, setAmount] = useState(25000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    setError('');
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const invoiceId = searchParams.get('invoiceId');
      if (!invoiceId) {
        setError(lang === 'fr' ? 'Facture non spécifiée' : 'Invoice not specified');
        return;
      }

      const result = await paymentsApi.initiatePayment(invoiceId, 'MOBILE_MONEY');
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/payment-receipt?ref=' + result.reference), 2000);
      }
    } catch (err: any) {
      setError(err.message || (lang === 'fr' ? 'Paiement échoué' : 'Payment failed'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <RoleLayout role="admin">
        <div className="max-w-lg mx-auto text-center py-20">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#111827] mb-2">{lang === 'fr' ? 'Paiement initié !' : 'Payment Initiated!'}</h2>
          <p className="text-[#6B7280]">{lang === 'fr' ? 'Redirection vers Money Fusion...' : 'Redirecting to Money Fusion...'}</p>
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: lang === 'fr' ? 'Paiements' : 'Payments' }, { label: lang === 'fr' ? 'Effectuer un paiement' : 'Make Payment' }]}>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>}
          <div className="bg-white p-8 rounded-2xl shadow-card">
            <h3 className="text-lg font-bold text-[#191c1d] mb-4">{lang === 'fr' ? 'Montant' : 'Amount'}</h3>
            <div className="bg-[#f3f4f5] rounded-xl p-4 flex items-baseline gap-2">
              <span className="text-lg text-[#464555]">FCFA</span>
              <span className="text-4xl font-black text-[#3525cd]">{amount.toLocaleString()}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {[5000, 25000, 50000, 100000].map((a) => (
                <button key={a} onClick={() => setAmount(a)} className={`px-4 py-2 rounded-full text-sm font-semibold ${amount === a ? 'bg-[#3525cd] text-white' : 'bg-white border border-[#c7c4d8]'}`}>
                  {a.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-card">
            <h3 className="text-lg font-bold text-[#191c1d] mb-4">{lang === 'fr' ? 'Moyen de paiement' : 'Payment Method'}</h3>
            <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#3525cd] bg-[#e2dfff]">
              <span className="text-2xl">💰</span>
              <div>
                <span className="font-semibold text-[#191c1d]">Money Fusion</span>
                <p className="text-xs text-slate-500">{lang === 'fr' ? 'Mobile Money, Carte bancaire' : 'Mobile Money, Bank Card'}</p>
              </div>
              <Check size={20} className="ml-auto text-[#3525cd]" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-[#edeeef] p-6 rounded-2xl">
            <h4 className="text-sm font-bold text-[#464555] uppercase tracking-wider mb-4">{lang === 'fr' ? 'Résumé' : 'Summary'}</h4>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-[#464555]">{lang === 'fr' ? 'Montant' : 'Amount'}</span><span className="font-semibold">{formatCurrency(amount)}</span></div>
              <div className="flex justify-between"><span className="text-[#464555]">{lang === 'fr' ? 'Passerelle' : 'Gateway'}</span><span className="font-semibold">Money Fusion</span></div>
              <div className="flex justify-between pt-3 border-t border-[#c7c4d8]"><span className="font-bold">Total</span><span className="text-xl font-black text-[#3525cd]">{formatCurrency(amount)}</span></div>
            </div>
          </div>
          <button onClick={handlePay} disabled={loading} className="w-full py-4 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50">
            {loading ? <><Loader2 size={18} className="animate-spin" /> {lang === 'fr' ? 'Traitement...' : 'Processing...'}</> : <><ExternalLink size={18} /> {lang === 'fr' ? 'Payer via Money Fusion' : 'Pay via Money Fusion'}</>}
          </button>
          <p className="text-xs text-center text-slate-400">{lang === 'fr' ? 'Vous serez redirigé vers Money Fusion pour finaliser le paiement.' : 'You will be redirected to Money Fusion to complete payment.'}</p>
        </div>
      </div>
    </RoleLayout>
  );
}
