'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbTeacherCheckin } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import {
  MapPin, LogIn, LogOut, Clock, CheckCircle, AlertTriangle,
  Navigation, Calendar, BookOpen, Smartphone,
  QrCode, UserCheck, TrendingUp, Award, List,
  Loader2, Crosshair, Shield, Map,
} from 'lucide-react';

type Step = 'arrival' | 'gps-validation' | 'departure';

export default function TeacherCheckinPage() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checkedIn, setCheckedIn] = useState(false);
  const [gpsValidated, setGpsValidated] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  const [gpsValidationTime, setGpsValidationTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [gpsError, setGpsError] = useState('');
  const [message, setMessage] = useState('');
  const [activeStep, setActiveStep] = useState<Step>('arrival');
  const [monthlyStats, setMonthlyStats] = useState({ presentDays: 0, totalDays: 0, lateDays: 0, punctualityScore: 100 });
  const [gpsDistance, setGpsDistance] = useState<number | null>(null);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);

  const steps: { key: Step; label: string; icon: any }[] = [
    { key: 'arrival', label: lang === 'fr' ? 'Arrivée' : 'Arrival', icon: LogIn },
    { key: 'gps-validation', label: lang === 'fr' ? 'Présence GPS' : 'GPS Presence', icon: Crosshair },
    { key: 'departure', label: lang === 'fr' ? 'Départ' : 'Departure', icon: LogOut },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    loadCurrentStatus();
    loadHistory();
    loadMonthlyStats();
    return () => clearInterval(timer);
  }, [user?.id]);

  async function loadCurrentStatus() {
    if (!user?.id) return;
    try {
      const today = new Date().toISOString().split('T')[0];
      const records = await sbTeacherCheckin.getRecords({ teacherId: user.id, date: today });
      if (Array.isArray(records) && records.length > 0) {
        const rec = records[0];
        setCheckedIn(true);
        setCheckInTime(new Date(rec.checkInTime || rec.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
        if (rec.gpsValidatedAt) {
          setGpsValidated(true);
          setActiveStep('departure');
          setGpsValidationTime(new Date(rec.gpsValidatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
          setGpsDistance(rec.distanceMeters);
          setGpsCoords(rec.latitude != null && rec.longitude != null ? { lat: rec.latitude, lng: rec.longitude } : null);
        } else {
          setActiveStep('gps-validation');
        }
        if (rec.checkOutTime) {
          setCheckedOut(true);
          setActiveStep('departure');
          setCheckOutTime(new Date(rec.checkOutTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (err) {
    }
  }

  async function loadHistory() {
    try {
      const data = await sbTeacherCheckin.getRecords({ teacherId: user?.id });
      if (Array.isArray(data)) {
        setHistory(data.slice(0, 7).map((r: any) => ({
          date: new Date(r.date || r.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
          dayName: new Date(r.date || r.createdAt).toLocaleDateString('fr-FR', { weekday: 'short' }),
          arrival: r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '-',
          departure: r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '-',
          gpsValidated: r.gpsValidatedAt ? new Date(r.gpsValidatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '-',
          hours: typeof r.duration === 'number' ? r.duration.toFixed(1) : (r.duration || '-'),
          status: r.checkOutTime ? (r.status === 'LATE' ? 'delayed' : 'success') : (r.status === 'LATE' ? 'delayed' : 'absent'),
          lateMinutes: r.lateMinutes || 0,
          distance: r.distanceMeters,
        })));
      }
    } catch (err) {
    }
  }

  async function loadMonthlyStats() {
    try {
      const now = new Date();
      const stats = await sbTeacherCheckin.getMonthlyStats(user?.id || '', now.getMonth() + 1, now.getFullYear());
      if (stats) {
        setMonthlyStats({
          presentDays: (stats as any).present || 0,
          totalDays: (stats as any).total || 0,
          lateDays: (stats as any).late || 0,
          punctualityScore: (stats as any).rate || 100,
        });
      }
    } catch (err) {
    }
  }

  const handleCheckIn = async () => {
    setLoading(true);
    setGpsError('');
    setMessage('');
    if (!navigator.geolocation) {
      setGpsError(lang === 'fr' ? 'Géolocalisation non disponible' : 'Geolocation not available');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const result = await sbTeacherCheckin.checkinGPS(user?.id || '', pos.coords.latitude, pos.coords.longitude);
          setCheckedIn(true);
          setActiveStep('gps-validation');
          setCheckInTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
          setGpsCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setGpsDistance(Math.round((result as any)?.distance || 0));
          const msg = (result as any)?.message || (lang === 'fr' ? 'Arrivée enregistrée' : 'Check-in recorded');
          const late = (result as any)?.lateMinutes || 0;
          setMessage(late > 0 ? `${msg} (${late} min ${lang === 'fr' ? 'de retard' : 'late'})` : msg);
          loadHistory();
        } catch (err: any) {
          setGpsError(err.message || (lang === 'fr' ? 'Erreur de pointage' : 'Check-in error'));
        }
        setLoading(false);
      },
      () => {
        setGpsError(lang === 'fr' ? 'Activez le GPS pour pointer' : 'Enable GPS to check in');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleValidatePresence = async () => {
    setLoading(true);
    setGpsError('');
    setMessage('');
    if (!navigator.geolocation) {
      setGpsError(lang === 'fr' ? 'Géolocalisation non disponible' : 'Geolocation not available');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const result = await sbTeacherCheckin.validateGPS(user?.id || '', pos.coords.latitude, pos.coords.longitude);
          setGpsCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setGpsDistance(Math.round((result as any)?.distance || 0));
          if ((result as any)?.success) {
            setGpsValidated(true);
            setActiveStep('departure');
            setGpsValidationTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
            setMessage(lang === 'fr' ? 'Présence confirmée sur site' : 'Presence confirmed on site');
            loadHistory();
          } else {
            setGpsError((result as any)?.message || (lang === 'fr' ? 'Hors périmètre' : 'Out of range'));
            setGpsDistance(Math.round((result as any)?.distance || 0));
          }
        } catch (err: any) {
          setGpsError(err.message || (lang === 'fr' ? 'Erreur de validation' : 'Validation error'));
        }
        setLoading(false);
      },
      () => {
        setGpsError(lang === 'fr' ? 'Activez le GPS pour valider' : 'Enable GPS to validate');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleCheckOut = async () => {
    setLoading(true);
    setMessage('');
    try {
      const result = await sbTeacherCheckin.checkout(user?.id || '');
      setCheckedOut(true);
      setCheckOutTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
      const hours = (result as any)?.hours || 0;
      setMessage(hours > 0
        ? `${lang === 'fr' ? 'Départ enregistré' : 'Check-out recorded'} — ${hours}h ${lang === 'fr' ? 'travaillées' : 'worked'}`
        : (lang === 'fr' ? 'Départ enregistré' : 'Check-out recorded'));
      loadHistory();
    } catch (err: any) {
      setGpsError(err.message || (lang === 'fr' ? 'Erreur' : 'Error'));
    }
    setLoading(false);
  };

  const getStepStatus = (stepKey: Step) => {
    if (stepKey === 'arrival') return checkedIn ? 'completed' : (activeStep === stepKey ? 'active' : 'pending');
    if (stepKey === 'gps-validation') return gpsValidated ? 'completed' : (checkedIn && !checkedOut ? 'active' : 'pending');
    if (stepKey === 'departure') return checkedOut ? 'completed' : (gpsValidated ? 'active' : 'pending');
    return 'pending';
  };

  return (
    <RoleLayout role="teacher" breadcrumbs={[{ label: lang === 'fr' ? 'Enseignant' : 'Teacher' }, { label: lang === 'fr' ? 'Pointage GPS' : 'GPS Check-in' }]}>
      {/* Time & Status */}
      <section className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
              {lang === 'fr' ? 'Session en cours' : 'Current Session'}
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900">
              {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {[monthlyStats.presentDays, monthlyStats.totalDays, monthlyStats.punctualityScore].map((_, i) => (
              <div key={i} className="hidden sm:block text-center px-4 py-2 bg-slate-50 rounded-xl">
                <p className="text-lg font-bold text-slate-900">
                  {i === 0 ? monthlyStats.presentDays : i === 1 ? monthlyStats.totalDays : `${monthlyStats.punctualityScore}%`}
                </p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">
                  {i === 0 ? (lang === 'fr' ? 'Présences' : 'Present') :
                   i === 1 ? (lang === 'fr' ? 'Jours' : 'Days') :
                   (lang === 'fr' ? 'Ponctualité' : 'Punctuality')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Progress */}
      <section className="bg-white rounded-xl border border-slate-100 p-5 mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => {
            const status = getStepStatus(step.key);
            return (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    status === 'completed' ? 'bg-emerald-500 text-white' :
                    status === 'active' ? 'bg-indigo-500 text-white ring-4 ring-indigo-100' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {status === 'completed' ? <CheckCircle size={18} /> : <step.icon size={18} />}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-sm font-bold ${status === 'completed' ? 'text-emerald-600' : status === 'active' ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {status === 'completed' ? (lang === 'fr' ? 'Terminé' : 'Done') :
                       status === 'active' ? (lang === 'fr' ? 'En cours' : 'In progress') :
                       (lang === 'fr' ? 'À faire' : 'Pending')}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${status === 'completed' ? 'bg-emerald-300' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Messages */}
      {message && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 mb-4 animate-fade-in">
          <CheckCircle size={16} /> {message}
        </div>
      )}
      {gpsError && (
        <div className="bg-amber-50 border border-amber-100 text-amber-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 mb-4 animate-fade-in">
          <AlertTriangle size={16} /> {gpsError}
        </div>
      )}

      {/* Step 1: Arrival */}
      {!checkedIn && (
        <section className="mb-6">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <LogIn size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{lang === 'fr' ? 'Pointer votre arrivée' : 'Check In'}</h3>
                <p className="text-indigo-200 text-sm">{lang === 'fr' ? 'Activez votre service' : 'Start your service'}</p>
              </div>
            </div>
            <p className="text-indigo-100 text-sm mb-6">
              {lang === 'fr'
                ? 'Votre position sera vérifiée automatiquement par GPS.'
                : 'Your location will be verified automatically via GPS.'}
            </p>
            <button
              onClick={handleCheckIn}
              disabled={loading}
              className="w-full py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-indigo-50 disabled:opacity-50 active:scale-[0.98] transition-all shadow-lg"
            >
              {loading ? <Loader2 size={22} className="animate-spin" /> : <MapPin size={22} />}
              {lang === 'fr' ? 'Pointer mon arrivée' : 'Check In Now'}
            </button>
          </div>
        </section>
      )}

      {/* Step 2: GPS Presence Validation */}
      {checkedIn && !gpsValidated && !checkedOut && (
        <section className="mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Crosshair size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{lang === 'fr' ? 'Confirmer votre présence' : 'Confirm Your Presence'}</h3>
                <p className="text-emerald-200 text-sm">{lang === 'fr' ? 'Géolocalisation en temps réel' : 'Real-time geolocation'}</p>
              </div>
            </div>

            {/* GPS Info */}
            <div className="bg-white/10 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Map size={20} className="text-emerald-200" />
                <span className="text-sm font-medium text-emerald-100">
                  {lang === 'fr' ? 'Vérification de position' : 'Position verification'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-emerald-200 font-medium mb-1">
                    {lang === 'fr' ? 'Statut' : 'Status'}
                  </p>
                  <p className="text-sm font-bold">
                    {gpsDistance !== null && gpsDistance <= 100
                      ? (lang === 'fr' ? 'Dans le périmètre' : 'Within range')
                      : (lang === 'fr' ? 'En attente...' : 'Waiting...')}
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-emerald-200 font-medium mb-1">
                    {lang === 'fr' ? 'Distance' : 'Distance'}
                  </p>
                  <p className="text-sm font-bold">
                    {gpsDistance !== null ? `${gpsDistance}m` : '-'}
                  </p>
                </div>
              </div>
              {gpsCoords && (
                <p className="text-xs text-emerald-200 text-center mt-3">
                  {lang === 'fr' ? 'Position' : 'Position'}: {gpsCoords.lat.toFixed(5)}, {gpsCoords.lng.toFixed(5)}
                </p>
              )}
            </div>

            <p className="text-emerald-100 text-sm mb-6 flex items-center gap-2">
              <Shield size={16} />
              {lang === 'fr'
                ? 'Validation anti-fraude : votre position sera comparée à celle de l\'établissement.'
                : 'Anti-fraud validation: your position will be compared to the school location.'}
            </p>

            <button
              onClick={handleValidatePresence}
              disabled={loading}
              className="w-full py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-emerald-50 disabled:opacity-50 active:scale-[0.98] transition-all shadow-lg"
            >
              {loading ? <Loader2 size={22} className="animate-spin" /> : <Navigation size={22} />}
              {lang === 'fr' ? 'Valider ma présence GPS' : 'Validate My GPS Presence'}
            </button>
          </div>
        </section>
      )}

      {/* Step 3: Departure */}
      {gpsValidated && !checkedOut && (
        <section className="mb-6">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <LogOut size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{lang === 'fr' ? 'Fin de service' : 'End of Service'}</h3>
                <p className="text-slate-300 text-sm">
                  {lang === 'fr' ? 'Enregistrez votre départ' : 'Record your departure'}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{checkInTime || '-'}</p>
                <p className="text-xs text-slate-300 font-medium">{lang === 'fr' ? 'Arrivée' : 'Arrival'}</p>
                <div className="mt-2 flex justify-center">
                  <div className="p-1 bg-indigo-500/30 rounded">
                    <MapPin size={14} className="text-indigo-300" />
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{gpsValidationTime || '-'}</p>
                <p className="text-xs text-slate-300 font-medium">{lang === 'fr' ? 'Présence GPS' : 'GPS Validation'}</p>
                <div className="mt-2 flex justify-center">
                  <div className="p-1 bg-emerald-500/30 rounded">
                    <Crosshair size={14} className="text-emerald-300" />
                  </div>
                </div>
                {gpsDistance !== null && (
                  <p className="text-[10px] text-emerald-300 mt-1">{gpsDistance}m</p>
                )}
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-xs text-slate-300 font-medium">{lang === 'fr' ? 'Maintenant' : 'Now'}</p>
              </div>
            </div>

            <button
              onClick={handleCheckOut}
              disabled={loading}
              className="w-full py-4 bg-white text-slate-800 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-100 disabled:opacity-50 active:scale-[0.98] transition-all shadow-lg"
            >
              {loading ? <Loader2 size={22} className="animate-spin" /> : <LogOut size={22} />}
              {lang === 'fr' ? 'Terminer ma journée' : 'End My Day'}
            </button>
          </div>
        </section>
      )}

      {/* Completed state */}
      {checkedOut && (
        <section className="mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">{lang === 'fr' ? 'Journée terminée !' : 'Day Complete!'}</h3>
            <p className="text-emerald-100 text-sm mb-2">
              {lang === 'fr'
                ? `Arrivée: ${checkInTime} — GPS: ${gpsValidationTime} — Départ: ${checkOutTime}`
                : `Arrival: ${checkInTime} — GPS: ${gpsValidationTime} — Departure: ${checkOutTime}`}
            </p>
            {gpsDistance !== null && (
              <p className="text-emerald-100 text-xs mb-4">
                {lang === 'fr' ? 'Distance validée' : 'Validated distance'}: {gpsDistance}m
              </p>
            )}
            <button
              onClick={() => {
                setCheckedIn(false); setGpsValidated(false); setCheckedOut(false);
                setCheckInTime(''); setGpsValidationTime(''); setCheckOutTime('');
                setActiveStep('arrival'); setMessage(''); setGpsDistance(null); setGpsCoords(null);
              }}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-sm transition-all"
            >
              {lang === 'fr' ? 'Nouveau pointage' : 'New Check-in'}
            </button>
          </div>
        </section>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase mb-1">
            <UserCheck size={14} /> {lang === 'fr' ? 'Présences mois' : 'Monthly Present'}
          </div>
          <p className="text-2xl font-bold text-slate-900">{monthlyStats.presentDays}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase mb-1">
            <Calendar size={14} /> {lang === 'fr' ? 'Total jours' : 'Total Days'}
          </div>
          <p className="text-2xl font-bold text-slate-900">{monthlyStats.totalDays}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase mb-1">
            <Clock size={14} /> {lang === 'fr' ? 'Retards' : 'Late'}
          </div>
          <p className="text-2xl font-bold text-amber-600">{monthlyStats.lateDays}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase mb-1">
            <Award size={14} /> {lang === 'fr' ? 'Ponctualité' : 'Punctuality'}
          </div>
          <p className="text-2xl font-bold text-emerald-600">{monthlyStats.punctualityScore}%</p>
        </div>
      </div>

      {/* History */}
      <section className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <List size={18} /> {lang === 'fr' ? 'Historique des pointages' : 'Check-in History'}
          </h3>
          <button onClick={loadHistory} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
            <Loader2 size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
        {history.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-sm">{lang === 'fr' ? 'Aucun historique' : 'No history'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-2 text-left text-[10px] font-semibold text-slate-400 uppercase">{lang === 'fr' ? 'Jour' : 'Day'}</th>
                  <th className="py-2 text-left text-[10px] font-semibold text-slate-400 uppercase">{lang === 'fr' ? 'Arrivée' : 'In'}</th>
                  <th className="py-2 text-left text-[10px] font-semibold text-slate-400 uppercase">GPS</th>
                  <th className="py-2 text-left text-[10px] font-semibold text-slate-400 uppercase">{lang === 'fr' ? 'Départ' : 'Out'}</th>
                  <th className="py-2 text-left text-[10px] font-semibold text-slate-400 uppercase">{lang === 'fr' ? 'Heures' : 'Hours'}</th>
                  <th className="py-2 text-left text-[10px] font-semibold text-slate-400 uppercase">{lang === 'fr' ? 'Statut' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {history.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3">
                      <span className="font-medium text-slate-900">{item.dayName}</span>
                      <span className="text-slate-400 ml-1">{item.date}</span>
                    </td>
                    <td className="py-3 text-slate-600">{item.arrival}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 ${
                        item.gpsValidated !== '-' ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                        {item.gpsValidated !== '-' ? <CheckCircle size={12} /> : <Clock size={12} />}
                        {item.gpsValidated}
                      </span>
                    </td>
                    <td className="py-3 text-slate-600">{item.departure}</td>
                    <td className="py-3 text-slate-600 font-medium">{item.hours}h</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'success' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'delayed' ? 'bg-amber-50 text-amber-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {item.status === 'success' ? (lang === 'fr' ? 'Complet' : 'Complete') :
                         item.status === 'delayed' ? `${item.lateMinutes}min` :
                         (lang === 'fr' ? 'Absent' : 'Absent')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </RoleLayout>
  );
}