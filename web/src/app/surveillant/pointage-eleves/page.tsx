'use client';

import React, { useState, useEffect, useRef } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { sbSurveillance } from '@/lib/api/domains/surveillance.service';
import { sbStudents } from '@/lib/api/domains/students.service';
import {
  QrCode, Search, Loader2, UserCheck, UserX, Clock, Camera,
  CheckCircle, AlertTriangle, Users,
} from 'lucide-react';

export default function PointageElevesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);
  const [today, setToday] = useState(new Date().toISOString().split('T')[0]);

  const loadData = async () => {
    try {
      const [attData, studData] = await Promise.all([
        sbSurveillance.getStudentAttendance(today),
        sbStudents.list(),
      ]);
      setAttendance(attData);
      setStudents(studData);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [today]);

  const handleQRScan = async (qrCode: string) => {
    setScanning(true);
    setScanResult(null);
    try {
      await sbSurveillance.scanStudentQR(qrCode, user!.id);
      setScanResult({ success: true, message: 'Pointage enregistré avec succès' });
      loadData();
    } catch (err: any) {
      setScanResult({ success: false, message: err.message });
    } finally {
      setScanning(false);
      setTimeout(() => setScanResult(null), 3000);
    }
  };

  const handleManualMark = async (studentId: string) => {
    try {
      await sbSurveillance.recordStudentArrival(studentId, user!.id);
      setScanResult({ success: true, message: 'Pointage enregistré' });
      loadData();
    } catch (err: any) {
      setScanResult({ success: false, message: err.message });
      setTimeout(() => setScanResult(null), 3000);
    }
  };

  const filtered = students.filter(s =>
    s.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.matricule?.toLowerCase().includes(search.toLowerCase())
  );

  const markedIds = new Set(attendance.map((a: any) => a.studentId));

  if (loading) {
    return (
      <RoleLayout role="surveillant" breadcrumbs={[{ label: 'Pointage Élèves' }]}>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="surveillant" breadcrumbs={[{ label: 'Pointage Élèves' }]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-on-surface">Pointage des Élèves</h1>
            <p className="text-on-surface-variant">
              {attendance.length} élève(s) pointé(s) aujourd'hui
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input type="date" value={today} onChange={e => setToday(e.target.value)}
              className="px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-sm" />
          </div>
        </div>

        {/* Scan Result Toast */}
        {scanResult && (
          <div className={`flex items-center gap-3 p-4 rounded-xl ${
            scanResult.success ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {scanResult.success ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
            <p className="text-sm font-medium">{scanResult.message}</p>
          </div>
        )}

        {/* QR Scanner Section */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20">
          <h3 className="font-semibold text-on-surface mb-4 flex items-center gap-2">
            <QrCode size={20} /> Scanner un QR Code
          </h3>
          <div className="flex gap-3">
            <input type="text" id="qr-input"
              placeholder="Scannez ou saisissez le QR code..."
              className="flex-1 px-4 py-3 bg-surface border border-outline-variant/30 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value.trim()) {
                    handleQRScan(input.value.trim());
                    input.value = '';
                  }
                }
              }}
              disabled={scanning}
            />
            <button onClick={() => {
              const input = document.getElementById('qr-input') as HTMLInputElement;
              if (input?.value.trim()) {
                handleQRScan(input.value.trim());
                input.value = '';
              }
            }} disabled={scanning}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
              {scanning ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Valider'}
            </button>
          </div>
          <p className="text-xs text-on-surface-variant mt-2">
            Le scanner se déclenche automatiquement lors de la saisie. Appuyez sur Entrée pour valider.
          </p>
        </div>

        {/* Search & Student List */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un élève par nom ou matricule..."
            className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        {/* Student Attendance List */}
        <div className="bg-surface-container rounded-xl border border-outline-variant/20 overflow-hidden">
          <div className="p-4 border-b border-outline-variant/10">
            <h3 className="font-semibold text-on-surface flex items-center gap-2">
              <Users size={18} /> Liste des élèves
            </h3>
          </div>
          <div className="divide-y divide-outline-variant/10 max-h-[500px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-3" />
                <p className="text-on-surface-variant">Aucun élève trouvé</p>
              </div>
            ) : (
              filtered.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary text-xs font-bold">
                      {s.user?.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-surface">{s.user?.name}</p>
                      <p className="text-xs text-on-surface-variant">{s.matricule} — {s.class?.name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {markedIds.has(s.id) ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle size={14} /> Pointé
                      </span>
                    ) : (
                      <button onClick={() => handleManualMark(s.id)}
                        className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors">
                        Pointer
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
