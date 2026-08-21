'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { QrCode, Download, RefreshCw, Printer, Share2, AlertCircle } from 'lucide-react';

interface QRCodeData {
  id: string;
  qr_data: string;
  barcode_data: string;
  qr_url: string | null;
  is_active: boolean;
  user_type: string;
  generated_at: string;
  expires_at: string | null;
}

export default function QRBadgePage() {
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState<QRCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  const loadQRCode = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (data) {
        setQrCode(data);
      }
    } catch (err) {
      console.error('Failed to load QR code:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, supabase]);

  useEffect(() => { loadQRCode(); }, [loadQRCode]);

  const generateQR = async () => {
    if (!user?.id) return;
    setGenerating(true);
    setError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setError('Non authentifié');
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          userType: user.role || 'STUDENT',
          name: user.name,
        }),
      });

      if (res.ok) {
        await loadQRCode();
      } else {
        const err = await res.json().catch(() => ({}));
        setError(err.error || 'Erreur lors de la génération');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur réseau');
    } finally {
      setGenerating(false);
    }
  };

  const downloadQR = async () => {
    if (!qrCode?.qr_url) return;
    try {
      const response = await fetch(qrCode.qr_url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-badge-${qrCode.barcode_data || user?.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.open(qrCode.qr_url, '_blank');
    }
  };

  const printQR = () => {
    if (!qrCode?.qr_url) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html><head><title>Badge QR - ${user?.name || 'EduCI'}</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
          .badge { border: 2px solid #3525CD; border-radius: 16px; padding: 32px; max-width: 350px; margin: 0 auto; }
          .header { color: #3525CD; font-size: 18px; font-weight: bold; margin-bottom: 16px; }
          .qr { width: 200px; height: 200px; margin: 16px auto; }
          .qr img { width: 100%; height: 100%; }
          .name { font-size: 16px; font-weight: bold; margin-top: 12px; }
          .info { font-size: 12px; color: #666; margin-top: 4px; }
          .barcode { font-family: monospace; font-size: 14px; margin-top: 8px; color: #333; }
        </style></head><body>
        <div class="badge">
          <div class="header">EduCI — Badge QR</div>
          <div class="qr"><img src="${qrCode.qr_url}" alt="QR Code" /></div>
          <div class="name">${user?.name || ''}</div>
          <div class="info">${user?.role || ''} • ${qrCode.user_type}</div>
          <div class="barcode">${qrCode.barcode_data || ''}</div>
        </div>
        <script>window.print();window.close();</script>
        </body></html>
      `);
    }
  };

  const shareQR = async () => {
    if (!qrCode?.qr_url) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Badge QR - ${user?.name}`,
          text: `Badge QR EduCI de ${user?.name}`,
          url: qrCode.qr_url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(qrCode.qr_url);
    }
  };

  const getRoleLabel = (role?: string) => {
    const labels: Record<string, string> = {
      STUDENT: 'Élève', TEACHER: 'Enseignant', PARENT: 'Parent',
      ADMIN: 'Administrateur', COMPTABLE: 'Comptable', SECRETAIRE: 'Secrétaire',
      CENSEUR: 'Censeur', SURVEILLANT: 'Surveillant', CHAUFFEUR: 'Conducteur',
      STAFF: 'Personnel',
    };
    return labels[role || ''] || role || 'Utilisateur';
  };

  if (loading) {
    return <div className="p-6 flex items-center justify-center min-h-[400px]"><Skeleton className="h-80 w-80 rounded-2xl" /></div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-on-surface flex items-center justify-center gap-2">
          <QrCode className="w-7 h-7 text-primary" /> Mon Badge QR
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Votre identifiant personnel pour le pointage et l&apos;identification
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          {qrCode?.qr_url ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-56 h-56 bg-white rounded-2xl p-3 shadow-sm border border-outline-variant/20">
                <img
                  src={qrCode.qr_url}
                  alt="QR Code Badge"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center space-y-1">
                <p className="font-medium text-on-surface">{user?.name}</p>
                <p className="text-sm text-on-surface-variant">{getRoleLabel(user?.role)}</p>
                {qrCode.barcode_data && (
                  <p className="font-mono text-xs text-on-surface-variant bg-surface-container rounded-lg px-3 py-1 inline-block">
                    {qrCode.barcode_data}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className={`w-2 h-2 rounded-full ${qrCode.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                {qrCode.is_active ? 'Actif' : 'Révoqué'}
                {qrCode.generated_at && ` • Généré le ${new Date(qrCode.generated_at).toLocaleDateString('fr-FR')}`}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-8">
              <div className="w-24 h-24 bg-surface-container rounded-2xl flex items-center justify-center">
                <QrCode className="w-12 h-12 text-on-surface-variant/40" />
              </div>
              <p className="text-on-surface-variant text-sm">Aucun QR code généré</p>
              <Button onClick={generateQR} loading={generating}>
                <QrCode className="w-4 h-4 mr-1" /> Générer mon QR Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {qrCode?.qr_url && (
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={downloadQR}>
            <Download className="w-4 h-4 mr-1" /> Télécharger
          </Button>
          <Button variant="secondary" onClick={printQR}>
            <Printer className="w-4 h-4 mr-1" /> Imprimer
          </Button>
          <Button variant="secondary" onClick={shareQR}>
            <Share2 className="w-4 h-4 mr-1" /> Partager
          </Button>
          <Button variant="secondary" onClick={generateQR} loading={generating}>
            <RefreshCw className="w-4 h-4 mr-1" /> Régénérer
          </Button>
        </div>
      )}
    </div>
  );
}
