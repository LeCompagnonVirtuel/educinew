'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbAttendance } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useRealtimeSubscription } from '@/hooks/useRealtime';
import { cn, getInitials } from '@/lib/utils';
import QRScanner from '@/components/ui/QRScanner';
import {
  GraduationCap, ScanLine, CheckCircle, XCircle, Clock,
  Loader2, Hash, Camera, X, Users, AlertCircle, RefreshCw,
} from 'lucide-react';

interface ScanResult {
  success: boolean;
  message: string;
  personName?: string;
  className?: string;
  matricule?: string;
  time?: string;
}

export default function TeacherScanStudentsPage() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const fr = lang === 'fr';

  const [cameraMode, setCameraMode] = useState(false);
  const [scanInput, setScanInput] = useState('');
  const [scanLoading, setScanLoading] = useState(false);
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);
  const [scanCount, setScanCount] = useState(0);
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);
  const scanInputRef = useRef<HTMLInputElement>(null);

  // Realtime: auto-refresh when attendance changes
  useRealtimeSubscription([
    { table: 'attendance', event: 'INSERT', onData: () => {} },
  ]);

  const handleScan = useCallback(async (code?: string) => {
    const matricule = code || scanInput.trim();
    if (!matricule) return;

    setScanLoading(true);
    try {
      const result = await sbAttendance.scanQR(matricule.toUpperCase(), 'ARRIVAL');
      const scanResult: ScanResult = {
        success: result?.success || false,
        message: result?.message || (fr ? 'Échec du pointage' : 'Check-in failed'),
        personName: result?.student?.user?.name || result?.student?.name,
        className: result?.student?.class?.name,
        matricule: result?.student?.matricule || matricule,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };

      setLastResult(scanResult);
      if (scanResult.success) {
        setScanCount(c => c + 1);
        setRecentScans(prev => [scanResult, ...prev].slice(0, 20));
      }

      setScanInput('');
      scanInputRef.current?.focus();
    } catch (err: any) {
      setLastResult({
        success: false,
        message: err?.message || (fr ? 'Erreur de connexion' : 'Connection error'),
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
    } finally {
      setScanLoading(false);
    }
  }, [scanInput, fr]);

  return (
    <RoleLayout role="teacher" breadcrumbs={[{ label: fr ? 'Scanner les élèves' : 'Scan Students' }]}>
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 shadow-xl">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/30">
                <GraduationCap size={22} className="text-indigo-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{fr ? 'Scanner les élèves' : 'Scan Students'}</h1>
                <p className="text-slate-400 text-sm">{fr ? 'Scannez le QR Code de chaque élève' : 'Scan each student\'s QR Code'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">{scanCount}</p>
              <p className="text-[11px] text-slate-400">{fr ? 'élèves pointés' : 'students checked'}</p>
            </div>
          </div>
        </div>

        {/* Scanner */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex flex-col items-center gap-5 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <ScanLine size={28} className="text-slate-600" />
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-full">
              <button onClick={() => setCameraMode(true)} className={cn('flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all', cameraMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
                <Camera size={16} />{fr ? 'Caméra' : 'Camera'}
              </button>
              <button onClick={() => setCameraMode(false)} className={cn('flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all', !cameraMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
                <Hash size={16} />{fr ? 'Manuel' : 'Manual'}
              </button>
            </div>

            {cameraMode && (
              <div className="w-full">
                <QRScanner
                  active={cameraMode}
                  onScan={(data) => handleScan(data)}
                />
              </div>
            )}

            {!cameraMode && (
              <div className="w-full">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      ref={scanInputRef}
                      type="text"
                      value={scanInput}
                      onChange={e => setScanInput(e.target.value.toUpperCase())}
                      onKeyDown={e => e.key === 'Enter' && handleScan()}
                      placeholder="16137807D"
                      className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none text-lg font-mono text-center tracking-wider transition-all"
                      disabled={scanLoading}
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={() => handleScan()}
                    disabled={scanLoading || !scanInput.trim()}
                    className={cn(
                      'px-6 py-4 rounded-xl font-medium transition-all',
                      scanLoading || !scanInput.trim()
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] shadow-sm'
                    )}
                  >
                    {scanLoading ? <Loader2 size={20} className="animate-spin" /> : <ScanLine size={20} />}
                  </button>
                </div>
                <p className="text-center text-xs text-slate-400 mt-3">{fr ? 'Saisissez le matricule de l\'élève' : 'Enter student matricule'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Last result */}
        {lastResult && (
          <div className={cn('rounded-2xl p-5 border transition-all', lastResult.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200')}>
            <div className="flex items-start gap-4">
              <div className={cn('p-2.5 rounded-xl', lastResult.success ? 'bg-emerald-100' : 'bg-red-100')}>
                {lastResult.success ? <CheckCircle size={22} className="text-emerald-600" /> : <XCircle size={22} className="text-red-600" />}
              </div>
              <div className="flex-1">
                <h3 className={cn('font-bold', lastResult.success ? 'text-emerald-800' : 'text-red-800')}>
                  {lastResult.success ? (fr ? 'Présence enregistrée' : 'Attendance recorded') : (fr ? 'Échec' : 'Failed')}
                </h3>
                <p className={cn('text-sm mt-0.5', lastResult.success ? 'text-emerald-600' : 'text-red-600')}>{lastResult.message}</p>
                {lastResult.personName && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <span className="font-medium">{lastResult.personName}</span>
                    {lastResult.className && <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">{lastResult.className}</span>}
                    {lastResult.matricule && <span className="text-xs text-slate-400 font-mono">{lastResult.matricule}</span>}
                  </div>
                )}
                {lastResult.time && <p className="text-xs text-slate-400 mt-1 font-mono">{lastResult.time}</p>}
              </div>
              <button onClick={() => setLastResult(null)} className="text-slate-400 hover:text-slate-600 p-1"><X size={16} /></button>
            </div>
          </div>
        )}

        {/* Recent scans */}
        {recentScans.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <Users size={16} className="text-slate-500" />
                {fr ? 'Derniers pointages' : 'Recent check-ins'}
              </h3>
              <span className="text-xs text-slate-400">{recentScans.length} {fr ? 'scans' : 'scans'}</span>
            </div>
            <div className="divide-y divide-slate-50 max-h-[300px] overflow-y-auto">
              {recentScans.map((scan, i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={14} className="text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{scan.personName || '—'}</p>
                    <p className="text-xs text-slate-400">{scan.className || '—'} {scan.matricule && `· ${scan.matricule}`}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono flex-shrink-0">{scan.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {recentScans.length === 0 && !lastResult && (
          <div className="text-center py-8 text-slate-400">
            <GraduationCap size={40} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">{fr ? 'Scannez le premier élève pour commencer' : 'Scan the first student to begin'}</p>
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
