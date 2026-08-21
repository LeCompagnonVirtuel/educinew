'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { getSupabase } from '@/lib/api/shared';
import { FileText, Download, Eye, Printer, ChevronRight, Loader2 } from 'lucide-react';

export default function StudentDocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabase();
        const { data, error: dbError } = await supabase
          .from('student_documents')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        if (dbError) throw dbError;
        setDocuments(data || []);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Students' }, { label: 'Documents' }]}>
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-[#191c1d] mb-2">Student Documents</h2>
        <p className="text-[#464555] mb-8">Manage and verify student documentation.</p>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-4 text-sm">{error}</div>
        )}

        <div className="bg-white rounded-xl overflow-hidden shadow-card">
          <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f3f4f5]">
                <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Document</th>
                <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7c4d8]/10">
              {loading ? (
                <tr><td colSpan={4} className="text-center py-12"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></td></tr>
              ) : documents.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-12 text-slate-400">Aucun document trouvé</td></tr>
              ) : (
                documents.map((doc: any) => (
                  <tr key={doc.id} className="hover:bg-[#f8f9fa]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#e2dfff] flex items-center justify-center">
                          <FileText size={18} className="text-[#3525cd]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#191c1d]">{doc.name || doc.title || 'Document'}</p>
                          <p className="text-xs text-[#464555]">{doc.created_at ? new Date(doc.created_at).toLocaleDateString('fr-FR') : '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#464555]">{doc.type || doc.document_type || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${doc.status === 'verified' || doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {doc.status || 'En attente'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-[#464555] hover:text-[#3525cd]"><Eye size={16} /></button>
                        <button className="p-2 text-[#464555] hover:text-[#3525cd]"><Download size={16} /></button>
                        <button className="p-2 text-[#464555] hover:text-[#3525cd]"><Printer size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-card border-2 border-dashed border-[#c7c4d8]/30 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#e2dfff] flex items-center justify-center mx-auto mb-4">
            <FileText size={28} className="text-[#3525cd]" />
          </div>
          <h3 className="font-bold text-[#191c1d]">Upload New Document</h3>
          <p className="text-sm text-[#464555] mt-1">PDF, JPG, PNG up to 10MB</p>
          <button className="mt-4 px-6 py-2.5 bg-[#3525cd] text-white font-semibold rounded-full text-sm">
            Choose File
          </button>
        </div>
      </div>
    </RoleLayout>
  );
}
