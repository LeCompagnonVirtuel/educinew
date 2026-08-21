'use client';

import React, { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { getSupabase } from '@/lib/api/shared';
import {
  FileText,
  Search,
  Eye,
  Check,
  AlertTriangle,
  Clock,
  Zap,
  Activity,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Loader2,
  Download,
} from 'lucide-react';

type FilterTab = 'Tous' | 'En attente' | 'En cours' | 'Terminés';

interface DocumentRequest {
  id: string;
  date: string;
  student: string;
  type: string;
  urgency: string;
  status: string;
}

const templates = [
  { name: 'Certificat de scolarité', icon: GraduationCap, description: 'Attestation d inscription scolaire' },
  { name: 'Attestation', icon: FileText, description: 'Attestation de présence ou de bonne conduite' },
  { name: 'Relevé de notes', icon: BookOpen, description: 'Récapitulatif des notes par période' },
  { name: 'Bulletin', icon: Activity, description: 'Bulletin trimestriel complet' },
];

const tabs: FilterTab[] = ['Tous', 'En attente', 'En cours', 'Terminés'];

const statusColors: Record<string, string> = {
  'En attente': 'bg-orange-100 text-orange-800',
  'En cours': 'bg-blue-100 text-blue-800',
  Terminé: 'bg-green-100 text-green-800',
};

const urgencyColors: Record<string, string> = {
  Normal: 'bg-gray-100 text-gray-800',
  Urgent: 'bg-orange-100 text-orange-800',
  'Très urgent': 'bg-red-100 text-red-800',
};

export default function DocumentsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<FilterTab>('Tous');
  const [search, setSearch] = useState('');
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabase();
        const { data, error: dbError } = await supabase
          .from('documents')
          .select('*, student:students(*, user:users!students_user_id_fkey(*))')
          .order('created_at', { ascending: false })
          .limit(100);
        if (dbError) throw dbError;
        const mapped: DocumentRequest[] = (data || []).map((req: any) => ({
          id: req.id,
          date: req.created_at ? new Date(req.created_at).toLocaleDateString('fr-FR') : '-',
          student: req.student?.user?.name || req.student_name || 'Inconnu',
          type: req.document_type || req.type || '-',
          urgency: 'Normal',
          status: req.status || 'En attente',
        }));
        setRequests(mapped);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = requests.filter((req) => {
    const matchesTab = activeTab === 'Tous' || req.status === activeTab;
    const matchesSearch = req.student.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <RoleLayout role="secretaire">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#191c1d' }}>
              Gestion des documents
            </h1>
            <p className="text-sm mt-1" style={{ color: '#464555' }}>
              Demandes et génération de documents administratifs
            </p>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab ? 'text-white shadow-sm' : 'hover:bg-white'
                }`}
                style={{
                  backgroundColor: activeTab === tab ? '#4f46e5' : 'transparent',
                  color: activeTab === tab ? 'white' : '#464555',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: '#464555' }}
            />
            <input
              type="text"
              placeholder="Rechercher un élève..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm outline-none focus:ring-2"
              style={{ borderColor: '#e5e7eb', color: '#191c1d' }}
            />
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-xl shadow-sm border overflow-hidden"
          style={{ backgroundColor: '#f8f9fa', borderColor: '#e5e7eb' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b" style={{ color: '#464555' }}>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Élève</th>
                  <th className="px-5 py-4 font-medium">Type</th>
                  <th className="px-5 py-4 font-medium">Urgence</th>
                  <th className="px-5 py-4 font-medium">Statut</th>
                  <th className="px-5 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-12"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-slate-400">Aucune demande trouvée</td></tr>
                ) : (
                filtered.map((req, i) => (
                  <tr
                    key={i}
                    className="border-b transition-colors hover:bg-white"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    <td className="px-5 py-3" style={{ color: '#191c1d' }}>
                      {req.date}
                    </td>
                    <td className="px-5 py-3 font-medium" style={{ color: '#191c1d' }}>
                      {req.student}
                    </td>
                    <td className="px-5 py-3" style={{ color: '#464555' }}>
                      {req.type}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${urgencyColors[req.urgency]}`}
                      >
                        {req.urgency}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[req.status]}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded-md transition-colors hover:bg-gray-100"
                          style={{ color: '#4f46e5' }}
                          title="Voir"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-white text-xs font-medium transition-colors"
                          style={{ backgroundColor: '#3525cd' }}
                          title="Générer le document"
                          onClick={async () => {
                            setGenerating(req.id);
                            try {
                              const { getSupabase } = await import('@/lib/api/shared');
                              const supabase = getSupabase();
                              const { data, error } = await supabase.functions.invoke('generate-pdf', {
                                body: { type: req.type?.toLowerCase() || 'certificat', studentId: req.id, requestId: req.id },
                              });
                              if (error) throw error;
                              if (data?.url) {
                                window.open(data.url, '_blank');
                              } else if (data?.base64) {
                                const blob = await fetch(`data:application/pdf;base64,${data.base64}`).then(r => r.blob());
                                const url = URL.createObjectURL(blob);
                                window.open(url, '_blank');
                              }
                            } catch (err) {
                              alert('Erreur lors de la génération du document');
                            } finally {
                              setGenerating(null);
                            }
                          }}
                          disabled={generating === req.id}
                        >
                          {generating === req.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
                          {generating === req.id ? 'Génération...' : 'Générer'}
                        </button>
                      </div>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12" style={{ color: '#464555' }}>
              Aucune demande trouvée
            </div>
          )}
        </div>

        {/* Document Templates */}
        <div
          className="rounded-xl shadow-sm border p-5"
          style={{ backgroundColor: '#f8f9fa', borderColor: '#e5e7eb' }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#191c1d' }}>
            Modèles de documents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((tpl, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border transition-colors hover:shadow-md cursor-pointer"
                style={{ borderColor: '#e5e7eb' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: '#4f46e5' }}
                >
                  <tpl.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-medium text-sm" style={{ color: '#191c1d' }}>
                  {tpl.name}
                </p>
                <p className="text-xs mt-1" style={{ color: '#464555' }}>
                  {tpl.description}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md text-white text-xs font-medium"
                    style={{ backgroundColor: '#3525cd' }}
                    onClick={async () => {
                      try {
                        const { getSupabase } = await import('@/lib/api/shared');
                        const supabase = getSupabase();
                        const { data, error } = await supabase.functions.invoke('generate-pdf', {
                          body: { type: tpl.name.toLowerCase().replace(/ /g, '_'), template: true },
                        });
                        if (error) throw error;
                        if (data?.url) window.open(data.url, '_blank');
                        else window.print();
                      } catch {
                        window.print();
                      }
                    }}
                  >
                    <FileText className="w-3 h-3" />
                    Imprimer
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md border text-xs font-medium"
                    style={{ borderColor: '#e5e7eb', color: '#464555' }}
                    onClick={async () => {
                      try {
                        const { getSupabase } = await import('@/lib/api/shared');
                        const supabase = getSupabase();
                        const { data, error } = await supabase.functions.invoke('generate-pdf', {
                          body: { type: tpl.name.toLowerCase().replace(/ /g, '_'), template: true, download: true },
                        });
                        if (error) throw error;
                        if (data?.base64) {
                          const blob = await fetch(`data:application/pdf;base64,${data.base64}`).then(r => r.blob());
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${tpl.name.replace(/ /g, '_')}.pdf`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }
                      } catch {
                        alert('Erreur lors du téléchargement');
                      }
                    }}
                  >
                    <Download className="w-3 h-3" />
                    Télécharger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
