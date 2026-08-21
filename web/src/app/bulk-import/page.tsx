'use client';

import { useState, useRef } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import {
  Upload, FileSpreadsheet, Download, Check, AlertTriangle,
  X, ChevronRight, Loader2, Users, CheckCircle, AlertCircle, Eye,
  ArrowRight, RefreshCw,
} from 'lucide-react';
import { sbImport } from '@/lib/api';
import { useExportBranding } from '@/hooks/useExportBranding';

interface ValidationRow {
  row: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  classe: string;
  matricule: string;
  nomParent: string;
  telephoneParent: string;
  emailParent: string;
  adresse: string;
  errors: string[];
  valid: boolean;
}

interface ImportResult {
  totalRows: number;
  validRows: number;
  errorRows: number;
  studentsCreated: number;
  parentsCreated: number;
  errors: Array<{ row: number; message: string; value: string }>;
  credentials: Array<{
    studentName: string;
    className: string;
    matricule: string;
    studentLogin: string;
    studentPassword: string;
    parentName: string;
    parentLogin: string;
    parentPassword: string;
  }>;
}

type Step = 'upload' | 'validate' | 'confirm' | 'result';

export default function BulkImportPage() {
  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationData, setValidationData] = useState<{
    totalRows: number;
    validRows: number;
    errorRows: number;
    rows: ValidationRow[];
  } | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [showErrorsOnly, setShowErrorsOnly] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportBranding = useExportBranding();

  const steps = [
    { id: 'upload', label: 'Téléverser', labelEn: 'Upload' },
    { id: 'validate', label: 'Valider', labelEn: 'Validate' },
    { id: 'confirm', label: 'Confirmer', labelEn: 'Confirm' },
    { id: 'result', label: 'Résultat', labelEn: 'Result' },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  const handleDownloadTemplate = async () => {
    try {
      const res = await sbImport.downloadTemplate();
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'modele_import_eleves_educi.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const ext = selectedFile.name.toLowerCase().split('.').pop();
    if (!['xlsx', 'xls', 'csv'].includes(ext || '')) {
      setError('Format non supporté. Utilisez .xlsx ou .csv');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('Fichier trop volumineux (max 10MB)');
      return;
    }
    setFile(selectedFile);
    setError('');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleValidate = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const result = await sbImport.validateFile(file);
      setValidationData(result);
      setStep('validate');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!validationData) return;
    setLoading(true);
    setError('');
    try {
      const validRows = validationData.rows.filter((r) => r.valid).map((r) => ({
        nom: r.nom,
        prenom: r.prenom,
        dateNaissance: r.dateNaissance,
        sexe: r.sexe,
        classe: r.classe,
        matricule: r.matricule,
        nomParent: r.nomParent,
        telephoneParent: r.telephoneParent,
        emailParent: r.emailParent,
        adresse: r.adresse,
      }));
      const result = await sbImport.confirmImport(validRows);
      setImportResult(result);
      setStep('result');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!importResult?.credentials) return;
    try {
      const blob = await sbImport.exportAccessCardsPDF(importResult.credentials, exportBranding);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cartes_acces_educi.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setStep('upload');
    setFile(null);
    setValidationData(null);
    setImportResult(null);
    setError('');
    setShowErrorsOnly(false);
  };

  const displayRows = validationData
    ? showErrorsOnly
      ? validationData.rows.filter((r) => !r.valid)
      : validationData.rows
    : [];

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Élèves', href: '/students' }, { label: 'Import en masse' }]}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#191c1d] mb-2">Import en masse d'élèves</h1>
          <p className="text-[#464555]">Importez des centaines d'élèves en une seule opération depuis un fichier Excel ou CSV.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between max-w-2xl mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < stepIndex ? 'bg-emerald-500 text-white' :
                i === stepIndex ? 'bg-[#3525cd] text-white shadow-lg shadow-indigo-200' :
                'bg-[#e7e8e9] text-[#464555]'
              }`}>
                {i < stepIndex ? <Check size={18} /> : i + 1}
              </div>
              <span className={`text-xs font-bold uppercase hidden sm:block ${
                i <= stepIndex ? 'text-[#3525cd]' : 'text-[#464555]'
              }`}>{s.label}</span>
              {i < 3 && <div className={`w-8 sm:w-12 h-0.5 ${i < stepIndex ? 'bg-emerald-500' : 'bg-[#e7e8e9]'}`} />}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
            <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600"><X size={18} /></button>
          </div>
        )}

        {/* ─── STEP 1: UPLOAD ─────────────────────── */}
        {step === 'upload' && (
          <div>
            <div
              className={`bg-white rounded-2xl p-12 border-2 border-dashed transition-all text-center mb-8 cursor-pointer ${
                dragging ? 'border-[#3525cd] bg-indigo-50/50' : 'border-[#c7c4d8]/30 hover:border-[#3525cd]/40'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
              <div className="w-20 h-20 rounded-2xl bg-[#e2dfff] flex items-center justify-center mx-auto mb-6">
                <Upload size={36} className="text-[#3525cd]" />
              </div>
              {file ? (
                <>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <FileSpreadsheet size={24} className="text-[#3525cd]" />
                    <div className="text-left">
                      <p className="font-bold text-[#191c1d]">{file.name}</p>
                      <p className="text-xs text-[#464555]">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="ml-2 p-1 text-slate-400 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-[#191c1d] mb-2">Glissez votre fichier ici</h3>
                  <p className="text-[#464555] mb-6">ou <span className="text-[#3525cd] font-medium">parcourir</span> vos fichiers</p>
                </>
              )}
              <div className="flex gap-3 justify-center flex-wrap">
                <span className="px-4 py-2 bg-[#f3f4f5] rounded-full text-xs font-medium text-[#464555] flex items-center gap-2">
                  <FileSpreadsheet size={14} /> CSV
                </span>
                <span className="px-4 py-2 bg-[#f3f4f5] rounded-full text-xs font-medium text-[#464555] flex items-center gap-2">
                  <FileSpreadsheet size={14} /> XLSX
                </span>
                <span className="px-4 py-2 bg-[#f3f4f5] rounded-full text-xs font-medium text-[#464555]">Max 10MB</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleDownloadTemplate}
                className="flex items-center gap-2 px-5 py-2.5 text-[#3525cd] font-semibold text-sm hover:bg-indigo-50 rounded-xl transition-colors"
              >
                <Download size={16} /> Télécharger le modèle Excel
              </button>
              <button
                onClick={handleValidate}
                disabled={!file || loading}
                className="px-8 py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <><Continuer /> <ChevronRight size={18} /></>}
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: VALIDATE ──────────────────── */}
        {step === 'validate' && validationData && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#191c1d]">{validationData.totalRows}</p>
                    <p className="text-xs text-[#464555]">Total lignes</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <CheckCircle size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">{validationData.validRows}</p>
                    <p className="text-xs text-[#464555]">Valides</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <AlertTriangle size={20} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{validationData.errorRows}</p>
                    <p className="text-xs text-[#464555]">Erreurs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter toggle */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#191c1d]">Aperçu des données</h3>
              <button
                onClick={() => setShowErrorsOnly(!showErrorsOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  showErrorsOnly ? 'bg-red-100 text-red-700' : 'bg-[#f3f4f5] text-[#464555] hover:bg-slate-200'
                }`}
              >
                <Eye size={14} />
                {showErrorsOnly ? 'Tout afficher' : 'Erreurs uniquement'}
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-8">
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#f8f9fa] sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Ligne</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Statut</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Nom</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Prénom</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Classe</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Matricule</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Erreurs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayRows.map((row, i) => (
                      <tr key={i} className={`border-t border-slate-50 ${row.valid ? '' : 'bg-red-50/50'}`}>
                        <td className="px-4 py-3 font-mono text-xs text-[#464555]">{row.row}</td>
                        <td className="px-4 py-3">
                          {row.valid ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                              <Check size={12} /> OK
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                              <X size={12} /> Erreur
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium text-[#191c1d]">{row.nom}</td>
                        <td className="px-4 py-3 text-[#191c1d]">{row.prenom}</td>
                        <td className="px-4 py-3 text-[#464555]">{row.classe}</td>
                        <td className="px-4 py-3 font-mono text-xs text-[#464555]">{row.matricule}</td>
                        <td className="px-4 py-3">
                          {row.errors.length > 0 && (
                            <div className="space-y-1">
                              {row.errors.map((err, j) => (
                                <p key={j} className="text-xs text-red-600">• {err}</p>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button onClick={handleReset} className="flex items-center gap-2 px-5 py-2.5 text-[#464555] font-medium text-sm hover:bg-slate-100 rounded-xl transition-colors">
                <RefreshCw size={16} /> Recommencer
              </button>
              <button
                onClick={() => setStep('confirm')}
                disabled={validationData.validRows === 0}
                className="px-8 py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
              >
                Confirmer {validationData.validRows} élèves <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: CONFIRM ─────────────────── */}
        {step === 'confirm' && validationData && (
          <div className="bg-white rounded-2xl p-10 border border-slate-100 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={36} className="text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#191c1d] mb-3">Confirmer l'importation</h2>
            <p className="text-[#464555] mb-2 max-w-lg mx-auto">
              Vous êtes sur le point de créer <strong className="text-[#191c1d]">{validationData.validRows} comptes élèves</strong> et leurs comptes parents associés.
            </p>
            {validationData.errorRows > 0 && (
              <p className="text-sm text-red-600 mb-6">
                {validationData.errorRows} ligne(s) avec erreurs seront ignorées.
              </p>
            )}
            <div className="bg-[#f8f9fa] rounded-xl p-6 mb-8 max-w-md mx-auto text-left">
              <p className="text-sm font-bold text-[#191c1d] mb-3">Ce qui va être créé :</p>
              <ul className="space-y-2 text-sm text-[#464555]">
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> {validationData.validRows} comptes élèves</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> {validationData.validRows} comptes parents</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Association élèves ↔ parents</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Association élèves ↔ classes</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Identifiants et mots de passe générés</li>
              </ul>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setStep('validate')} className="px-6 py-3 text-[#464555] font-medium hover:bg-slate-100 rounded-xl transition-colors">
                Retour
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50 hover:shadow-xl transition-all"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <><Check size={18} /> Confirmer l'importation</>}
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: RESULT ──────────────────── */}
        {step === 'result' && importResult && (
          <div>
            <div className="bg-white rounded-2xl p-10 border border-slate-100 text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={36} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#191c1d] mb-3">Importation réussie !</h2>
              <p className="text-[#464555] mb-8">Les comptes ont été créés avec succès.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-blue-600">{importResult.studentsCreated}</p>
                  <p className="text-xs text-blue-700">Élèves créés</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-purple-600">{importResult.parentsCreated}</p>
                  <p className="text-xs text-purple-700">Parents créés</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-red-600">{importResult.errorRows}</p>
                  <p className="text-xs text-red-700">Ignorés</p>
                </div>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="px-8 py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 mx-auto hover:shadow-xl transition-all"
              >
                <Download size={18} /> Télécharger les cartes d'accès (PDF)
              </button>
            </div>

            {/* Credentials table */}
            {importResult.credentials.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-[#191c1d]">Identifiants générés</h3>
                  <p className="text-xs text-[#464555]">Distribuez ces accès aux élèves et parents</p>
                </div>
                <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#f8f9fa] sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Élève</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Classe</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Identifiant élève</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Mot de passe</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Parent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importResult.credentials.map((cred, i) => (
                        <tr key={i} className="border-t border-slate-50">
                          <td className="px-4 py-3 font-medium text-[#191c1d]">{cred.studentName}</td>
                          <td className="px-4 py-3 text-[#464555]">{cred.className}</td>
                          <td className="px-4 py-3 font-mono text-xs text-[#191c1d]">{cred.studentLogin}</td>
                          <td className="px-4 py-3 font-mono text-xs font-bold text-red-600">{cred.studentPassword}</td>
                          <td className="px-4 py-3 text-xs text-[#464555]">
                            <p className="font-mono">{cred.parentLogin}</p>
                            <p className="font-mono text-red-500">{cred.parentPassword}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Errors */}
            {importResult.errors.length > 0 && (
              <div className="bg-red-50 rounded-2xl border border-red-100 p-6 mb-8">
                <h3 className="text-lg font-bold text-red-800 mb-3">Lignes ignorées</h3>
                <div className="space-y-2">
                  {importResult.errors.map((err, i) => (
                    <p key={i} className="text-sm text-red-700">• Ligne {err.row} ({err.value}) : {err.message}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button onClick={handleReset} className="px-8 py-3 bg-[#f3f4f5] text-[#191c1d] font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2">
                <Upload size={18} /> Nouvel import
              </button>
            </div>
          </div>
        )}
      </div>
    </RoleLayout>
  );
}

function Continuer() {
  return <span>Continuer</span>;
}
