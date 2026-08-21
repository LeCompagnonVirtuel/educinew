'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { QrCode, RefreshCw, CheckCircle, XCircle, BarChart3, Search } from 'lucide-react';

interface QRStats {
  total: number;
  active: number;
  revoked: number;
  students: number;
  teachers: number;
  staff: number;
  parents: number;
  total_scans: number;
  scanned_today: number;
  generated_today: number;
}

interface QRCodeRecord {
  id: string;
  user_id: string;
  user_type: string;
  qr_type: string;
  qr_data: string;
  barcode_data: string;
  is_active: boolean;
  scan_count: number;
  generated_at: string;
  last_scanned_at: string | null;
  expires_at: string | null;
  metadata: Record<string, any>;
}

export default function QRMonitoringPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<QRStats | null>(null);
  const [qrCodes, setQrCodes] = useState<QRCodeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'revoked'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const loadData = useCallback(async () => {
    if (!user?.schoolId) return;
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { data: statsData } = await supabase.rpc('get_qr_stats', { p_school_id: user.schoolId });
      if (statsData) setStats(statsData);

      let query = supabase
        .from('qr_codes')
        .select('*')
        .eq('school_id', user.schoolId)
        .order('generated_at', { ascending: false })
        .limit(200);

      if (filter === 'active') query = query.eq('is_active', true);
      if (filter === 'revoked') query = query.eq('is_active', false);
      if (typeFilter !== 'all') query = query.eq('user_type', typeFilter);

      const { data } = await query;
      setQrCodes(data || []);
    } catch (err) {
      console.error('Failed to load QR stats:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.schoolId, filter, typeFilter]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleRevoke = async (id: string) => {
    const supabase = getSupabase();
    await supabase.from('qr_codes').update({ is_active: false }).eq('id', id);
    setQrCodes(prev => prev.map(q => q.id === id ? { ...q, is_active: false } : q));
    loadData();
  };

  const handleRegenerate = async (qr: QRCodeRecord) => {
    const supabase = getSupabase();
    await supabase.from('qr_codes').update({ is_active: false }).eq('id', qr.id);
    const res = await fetch('/api/pointage/qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` },
      body: JSON.stringify({ type: qr.user_type.toLowerCase(), user_id: qr.user_id, expires_hours: 8 }),
    });
    if (res.ok) loadData();
  };

  const handleRevokeAll = async () => {
    if (!confirm('Êtes-vous sûr de vouloir révoquer TOUS les QR codes actifs ?')) return;
    const supabase = getSupabase();
    await supabase.from('qr_codes').update({ is_active: false }).eq('school_id', user?.schoolId).eq('is_active', true);
    loadData();
  };

  const filteredQrCodes = qrCodes.filter(q => {
    if (search) {
      const s = search.toLowerCase();
      return q.barcode_data?.toLowerCase().includes(s) || q.user_type.toLowerCase().includes(s) || q.qr_data.toLowerCase().includes(s);
    }
    return true;
  });

  const getUserTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      STUDENT: 'bg-blue-100 text-blue-700', TEACHER: 'bg-green-100 text-green-700',
      STAFF: 'bg-purple-100 text-purple-700', PARENT: 'bg-orange-100 text-orange-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return <div className="p-6 space-y-4"><Skeleton className="h-8 w-64" /><div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <Skeleton key={i} className="h-28" />)}</div></div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface flex items-center gap-2"><QrCode className="w-7 h-7 text-primary" /> Supervision QR Codes</h1>
          <p className="text-on-surface-variant text-sm mt-1">Monitoring et gestion de tous les QR codes de l&apos;établissement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={loadData}><RefreshCw className="w-4 h-4 mr-1" /> Actualiser</Button>
          <Button variant="danger" onClick={handleRevokeAll}><XCircle className="w-4 h-4 mr-1" /> Tout révoquer</Button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard title="Total" value={stats.total} icon={QrCode} />
          <StatCard title="Actifs" value={stats.active} icon={CheckCircle} />
          <StatCard title="Révoqués" value={stats.revoked} icon={XCircle} />
          <StatCard title="Scans total" value={stats.total_scans} icon={BarChart3} />
          <StatCard title="Scans aujourd'hui" value={stats.scanned_today} icon={BarChart3} />
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">{stats.students}</p><p className="text-xs text-on-surface-variant">Élèves</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-green-600">{stats.teachers}</p><p className="text-xs text-on-surface-variant">Enseignants</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-purple-600">{stats.staff}</p><p className="text-xs text-on-surface-variant">Personnel</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-orange-600">{stats.parents}</p><p className="text-xs text-on-surface-variant">Parents</p></CardContent></Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input type="text" placeholder="Rechercher par matricule, type..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-outline-variant/30 rounded-lg text-sm bg-surface text-on-surface" />
            </div>
            <div className="flex gap-2">
              {(['all', 'active', 'revoked'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                  {f === 'all' ? 'Tous' : f === 'active' ? 'Actifs' : 'Révoqués'}
                </button>
              ))}
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs border border-outline-variant/30 bg-surface text-on-surface">
              <option value="all">Tous les types</option>
              <option value="STUDENT">Élèves</option>
              <option value="TEACHER">Enseignants</option>
              <option value="STAFF">Personnel</option>
              <option value="PARENT">Parents</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-outline-variant/20">
                <th className="text-left py-3 px-2 text-on-surface-variant font-medium">Type</th>
                <th className="text-left py-3 px-2 text-on-surface-variant font-medium">Identifiant</th>
                <th className="text-left py-3 px-2 text-on-surface-variant font-medium">Statut</th>
                <th className="text-center py-3 px-2 text-on-surface-variant font-medium">Scans</th>
                <th className="text-left py-3 px-2 text-on-surface-variant font-medium">Créé le</th>
                <th className="text-left py-3 px-2 text-on-surface-variant font-medium">Dernier scan</th>
                <th className="text-right py-3 px-2 text-on-surface-variant font-medium">Actions</th>
              </tr></thead>
              <tbody>
                {filteredQrCodes.map(qr => (
                  <tr key={qr.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50">
                    <td className="py-3 px-2"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getUserTypeColor(qr.user_type)}`}>{qr.user_type}</span></td>
                    <td className="py-3 px-2 font-mono text-xs">{qr.barcode_data || qr.user_id?.slice(0, 8)}</td>
                    <td className="py-3 px-2"><Badge variant={qr.is_active ? 'success' : 'danger'}>{qr.is_active ? 'Actif' : 'Révoqué'}</Badge></td>
                    <td className="py-3 px-2 text-center">{qr.scan_count || 0}</td>
                    <td className="py-3 px-2 text-xs text-on-surface-variant">{qr.generated_at ? new Date(qr.generated_at).toLocaleDateString('fr-FR') : '-'}</td>
                    <td className="py-3 px-2 text-xs text-on-surface-variant">{qr.last_scanned_at ? new Date(qr.last_scanned_at).toLocaleString('fr-FR') : 'Jamais'}</td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex justify-end gap-1">
                        {qr.is_active && <Button variant="ghost" size="sm" onClick={() => handleRevoke(qr.id)} title="Révoquer"><XCircle className="w-3.5 h-3.5 text-red-500" /></Button>}
                        <Button variant="ghost" size="sm" onClick={() => handleRegenerate(qr)} title="Régénérer"><RefreshCw className="w-3.5 h-3.5 text-primary" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredQrCodes.length === 0 && (
                  <tr><td colSpan={7} className="py-8 text-center text-on-surface-variant">Aucun QR code trouvé</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
