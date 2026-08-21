'use client';

import { useState, useEffect, useRef } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbAttendance } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import {
  QrCode, Camera, CheckCircle, XCircle, Clock, AlertTriangle,
  User, Smartphone, Loader2, ScanLine, History, Calendar,
  MapPin, LogIn, Shield, Zap,
} from 'lucide-react';

export default function StudentCheckinPage() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [matricule, setMatricule] = useState('');
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [todayStatus, setTodayStatus] = useState<'checked' | 'not-checked' | 'loading'>('loading');
  const [todayTime, setTodayTime] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [scannerSupported, setScannerSupported] = useState(false);
  const htmlScannerRef = useRef<any>(null);

  useEffect(() => {
    setScannerSupported(typeof navigator !== 'undefined' && !!(navigator.mediaDevices?.getUserMedia));
    loadTodayStatus();
    return () => {
      if (htmlScannerRef.current) {
        htmlScannerRef.current.stop().catch(() => {});
        htmlScannerRef.current.clear();
      }
    };
  }, [user?.id]);

  async function loadTodayStatus() {
    if (!user?.id) return;
    try {
      const records = await sbAttendance.list({ studentId: user.id, date: new Date().toISOString().split('T')[0] });
      if (records && records.length > 0) {
        setTodayStatus('checked');
        setTodayTime(new Date(records[0].createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
      } else {
        setTodayStatus('not-checked');
      }
    } catch (err) {
      setTodayStatus('not-checked');
    }
  }

  useEffect(() => {
    if (!user?.id) return;
    const loadHistory = async () => {
      try {
        const data = await sbAttendance.list({ studentId: user.id });
        if (Array.isArray(data)) {
          setHistory(data.slice(0, 10));
        }
      } catch (err) {
      }
    };
    loadHistory();
  }, [user?.id, todayStatus]);

  const handleCheckIn = async (qrCode?: string) => {
    const code = qrCode || matricule.trim();
    if (!code) {
      setMessage(lang === 'fr' ? 'Entrez votre matricule ou scannez votre QR Code' : 'Enter your ID or scan your QR code');
      setMessageType('error');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const result = await sbAttendance.scanQR(code, 'ARRIVAL');
      if (result?.success) {
        setMessage(lang === 'fr' ? 'Présence enregistrée !' : 'Check-in successful!');
        setMessageType('success');
        setTodayStatus('checked');
        setTodayTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
        setMatricule('');
      } else {
        setMessage(result?.message || (lang === 'fr' ? 'Échec du pointage' : 'Check-in failed'));
        setMessageType('error');
      }
    } catch (err: any) {
      setMessage(err?.message || (lang === 'fr' ? 'Erreur de connexion' : 'Connection error'));
      setMessageType('error');
    }
    setLoading(false);
  };

  const handleStartScan = async () => {
    if (!scannerSupported) {
      setMessage(lang === 'fr' ? 'Caméra non disponible. Saisissez votre matricule.' : 'Camera unavailable. Enter your ID.');
      setMessageType('info');
      return;
    }

    setScanning(true);
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const scanner = new Html5Qrcode('student-qr-scanner');
      htmlScannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 200, height: 200 }, aspectRatio: 1.0 },
        (decodedText: string) => {
          handleCheckIn(decodedText);
          stopScanner();
        },
        () => {}
      );
    } catch (err: any) {
      setScanning(false);
      setMessage(lang === 'fr' ? 'Erreur caméra — utilisez la saisie manuelle' : 'Camera error — use manual entry');
      setMessageType('error');
    }
  };

  const stopScanner = async () => {
    try {
      if (htmlScannerRef.current) {
        await htmlScannerRef.current.stop();
        htmlScannerRef.current.clear();
        htmlScannerRef.current = null;
      }
    } catch {}
    setScanning(false);
  };

  return (
    <RoleLayout role="student">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 bg-indigo-100 rounded-2xl flex items-center justify-center">
            <QrCode size={32} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {lang === 'fr' ? 'Pointage Élève' : 'Student Check-in'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {lang === 'fr' ? 'Scannez votre QR Code ou saisissez votre matricule' : 'Scan your QR code or enter your student ID'}
          </p>
        </div>

        {/* Today's Status */}
        <div className={`rounded-2xl p-5 mb-6 ${
          todayStatus === 'checked'
            ? 'bg-emerald-50 border border-emerald-200'
            : todayStatus === 'loading'
            ? 'bg-slate-50 border border-slate-200'
            : 'bg-amber-50 border border-amber-200'
        }`}>
          <div className="flex items-center gap-3">
            {todayStatus === 'loading' ? (
              <Loader2 size={24} className="animate-spin text-slate-400" />
            ) : todayStatus === 'checked' ? (
              <div className="p-2 bg-emerald-100 rounded-full">
                <CheckCircle size={24} className="text-emerald-600" />
              </div>
            ) : (
              <div className="p-2 bg-amber-100 rounded-full">
                <Clock size={24} className="text-amber-600" />
              </div>
            )}
            <div>
              <p className="font-bold text-slate-800">
                {todayStatus === 'loading'
                  ? (lang === 'fr' ? 'Chargement...' : 'Loading...')
                  : todayStatus === 'checked'
                  ? (lang === 'fr' ? 'Pointé aujourd\'hui' : 'Checked in today')
                  : (lang === 'fr' ? 'Pas encore pointé' : 'Not checked in yet')}
              </p>
              <p className="text-sm text-slate-500">
                {todayStatus === 'checked'
                  ? `${lang === 'fr' ? 'Arrivée' : 'Arrival'}: ${todayTime}`
                  : (lang === 'fr' ? 'Scannez votre QR pour pointer' : 'Scan your QR to check in')}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 mb-4 ${
            messageType === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            messageType === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
            'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {messageType === 'success' ? <CheckCircle size={16} /> :
             messageType === 'error' ? <XCircle size={16} /> :
             <AlertTriangle size={16} />}
            {message}
          </div>
        )}

        {/* QR Scanner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
          {scanning ? (
            <div className="text-center">
              <div id="student-qr-scanner" className="w-full max-w-xs mx-auto rounded-xl overflow-hidden mb-4" />
              <button
                onClick={stopScanner}
                className="px-6 py-2 bg-red-50 rounded-xl text-sm font-medium text-red-600 hover:bg-red-100"
              >
                {lang === 'fr' ? 'Arrêter le scanner' : 'Stop scanner'}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Smartphone size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {lang === 'fr' ? 'Scanner QR Code' : 'QR Code Scanner'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'fr' ? 'Utilisez votre appareil photo' : 'Use your camera'}
                  </p>
                </div>
              </div>
              {scannerSupported ? (
                <button
                  onClick={handleStartScan}
                  className="w-full py-4 bg-indigo-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-indigo-600 active:scale-[0.98] transition-all"
                >
                  <Camera size={22} />
                  {lang === 'fr' ? 'Activer la caméra' : 'Activate camera'}
                </button>
              ) : (
                <div className="w-full py-4 bg-slate-100 rounded-xl flex items-center justify-center gap-3 text-slate-500">
                  <Camera size={22} />
                  {lang === 'fr' ? 'Caméra non disponible' : 'Camera not available'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Manual Entry */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-100 rounded-lg">
              <User size={20} className="text-slate-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">
                {lang === 'fr' ? 'Saisie manuelle' : 'Manual Entry'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'fr' ? 'Entrez votre numéro matricule' : 'Enter your student ID'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={matricule}
              onChange={e => setMatricule(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheckIn()}
              placeholder={lang === 'fr' ? 'Ex: 16137807D' : 'E.g. 16137807D'}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              onClick={() => handleCheckIn()}
              disabled={loading || !matricule.trim()}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-600 disabled:opacity-50 active:scale-[0.98] transition-all"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
              {lang === 'fr' ? 'Pointer' : 'Check In'}
            </button>
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <History size={16} className="text-slate-400" />
              <h3 className="font-semibold text-slate-800 text-sm">
                {lang === 'fr' ? 'Historique récent' : 'Recent History'}
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {history.map((record: any, i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${
                    record.status === 'PRESENT' ? 'bg-emerald-100' :
                    record.status === 'LATE' ? 'bg-amber-100' : 'bg-red-100'
                  }`}>
                    {record.status === 'PRESENT' ? (
                      <CheckCircle size={14} className="text-emerald-600" />
                    ) : record.status === 'LATE' ? (
                      <Clock size={14} className="text-amber-600" />
                    ) : (
                      <XCircle size={14} className="text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {new Date(record.date || record.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    record.status === 'PRESENT' ? 'bg-emerald-50 text-emerald-600' :
                    record.status === 'LATE' ? 'bg-amber-50 text-amber-600' :
                    'bg-red-50 text-red-600'
                  }`}>
                    {record.status === 'PRESENT' ? (lang === 'fr' ? 'Présent' : 'Present') :
                     record.status === 'LATE' ? `${record.lateMinutes || 0}min` :
                     (lang === 'fr' ? 'Absent' : 'Absent')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-xs text-slate-500">
            <Shield size={14} />
            {lang === 'fr'
              ? 'Votre pointage est sécurisé et horodaté'
              : 'Your check-in is secure and timestamped'}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}