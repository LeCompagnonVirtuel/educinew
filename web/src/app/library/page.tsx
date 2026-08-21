'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import {
  BookOpen, Users, Clock, AlertTriangle, Plus, Search,
  Loader2, X, CheckCircle, RotateCcw, BookMarked,
  Filter, Download, ArrowUpDown,
} from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  total_copies: number;
  available_copies: number;
  publisher: string;
  publication_year: number;
  is_active: boolean;
}

interface Loan {
  id: string;
  book_id: string;
  student_id: string;
  borrowed_at: string;
  due_date: string;
  returned_at: string | null;
  status: string;
  book?: { title: string; author: string };
  student?: { first_name: string; last_name: string; class?: { name: string } };
}

const CATEGORIES = ['Roman', 'Science', 'Mathématiques', 'Histoire', 'Géographie', 'Philosophie', 'Anglais', 'Informatique', 'Dictionnaire', 'Manuel scolaire', 'Autre'];

export default function LibraryPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'books' | 'loans' | 'history'>('books');
  const [books, setBooks] = useState<Book[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [history, setHistory] = useState<Loan[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showAddBook, setShowAddBook] = useState(false);
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ totalBooks: 0, activeLoans: 0, overdue: 0, newThisMonth: 0 });

  const [newBook, setNewBook] = useState({
    title: '', author: '', isbn: '', category: 'Roman',
    total_copies: 1, publisher: '', publication_year: new Date().getFullYear(), description: '',
  });
  const [newLoan, setNewLoan] = useState({ student_id: '', book_id: '', due_date: '' });

  useEffect(() => {
    if (!user?.schoolId) return;
    loadData();
  }, [user?.schoolId]);

  async function loadData() {
    setLoading(true);
    const supabase = getSupabase();
    const schoolId = user!.schoolId;
    const now = new Date().toISOString();
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

    const [booksRes, loansRes, histRes, studRes] = await Promise.all([
      supabase.from('library_books').select('*').eq('school_id', schoolId).eq('is_active', true).order('title'),
      supabase.from('library_loans').select('*, book:library_books(title, author), student:students(first_name, last_name, class:classes(name))').eq('school_id', schoolId).is('returned_at', null).order('due_date'),
      supabase.from('library_loans').select('*, book:library_books(title, author), student:students(first_name, last_name, class:classes(name))').eq('school_id', schoolId).not('returned_at', 'is', null).order('returned_at', { ascending: false }).limit(100),
      supabase.from('students').select('id, first_name, last_name, class:classes(name)').eq('school_id', schoolId).eq('is_active', true).order('last_name'),
    ]);

    const allBooks = booksRes.data || [];
    const activeLoans = loansRes.data || [];
    const overdueCount = activeLoans.filter((l: any) => new Date(l.due_date) < new Date()).length;
    const newCount = allBooks.filter((b: any) => new Date(b.created_at || '') >= new Date(monthStart)).length;

    setBooks(allBooks);
    setLoans(activeLoans);
    setHistory(histRes.data || []);
    setStudents(studRes.data || []);
    setStats({ totalBooks: allBooks.length, activeLoans: activeLoans.length, overdue: overdueCount, newThisMonth: newCount });
    setLoading(false);
  }

  async function handleAddBook() {
    if (!newBook.title || !newBook.author) return;
    setSaving(true);
    const supabase = getSupabase();
    await supabase.from('library_books').insert({
      school_id: user!.schoolId,
      ...newBook,
      available_copies: newBook.total_copies,
      is_active: true,
    });
    setShowAddBook(false);
    setNewBook({ title: '', author: '', isbn: '', category: 'Roman', total_copies: 1, publisher: '', publication_year: new Date().getFullYear(), description: '' });
    setSaving(false);
    loadData();
  }

  async function handleAddLoan() {
    if (!newLoan.student_id || !newLoan.book_id || !newLoan.due_date) return;
    setSaving(true);
    const supabase = getSupabase();
    await supabase.from('library_loans').insert({
      school_id: user!.schoolId,
      student_id: newLoan.student_id,
      book_id: newLoan.book_id,
      borrowed_at: new Date().toISOString(),
      due_date: newLoan.due_date,
      status: 'BORROWED',
      created_by: user!.id,
    });
    await supabase.from('library_books').update({ available_copies: books.find(b => b.id === newLoan.book_id)!.available_copies - 1 }).eq('id', newLoan.book_id);
    setShowAddLoan(false);
    setNewLoan({ student_id: '', book_id: '', due_date: '' });
    setSaving(false);
    loadData();
  }

  async function handleReturn(loan: Loan) {
    const supabase = getSupabase();
    await supabase.from('library_loans').update({ returned_at: new Date().toISOString(), status: 'RETURNED' }).eq('id', loan.id);
    const book = books.find(b => b.id === loan.book_id);
    if (book) {
      await supabase.from('library_books').update({ available_copies: book.available_copies + 1 }).eq('id', book.id);
    }
    loadData();
  }

  const filteredBooks = books.filter(b => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || b.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Modules' }, { label: 'Bibliothèque' }]}>
        <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-[#3525cd]" /></div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Modules' }, { label: 'Bibliothèque' }]}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#191c1d]">Bibliothèque</h2>
          <p className="text-[#464555] mt-1">Gestion des livres, emprunts et retours.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowAddLoan(true)} className="px-5 py-2.5 bg-[#e7e8e9] text-[#3525cd] font-semibold rounded-full text-sm flex items-center gap-2">
            <RotateCcw size={16} /> Nouvel emprunt
          </button>
          <button onClick={() => setShowAddBook(true)} className="px-5 py-2.5 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-full text-sm flex items-center gap-2">
            <Plus size={16} /> Ajouter un livre
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total livres', value: stats.totalBooks, icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
          { title: 'Emprunts en cours', value: stats.activeLoans, icon: BookMarked, color: 'bg-purple-50 text-purple-600' },
          { title: 'Retours en retard', value: stats.overdue, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
          { title: 'Ajoutés ce mois', value: stats.newThisMonth, icon: Plus, color: 'bg-green-50 text-green-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className={`p-2.5 rounded-xl ${stat.color} inline-flex mb-3`}><stat.icon size={20} /></div>
            <p className="text-2xl font-bold text-[#191c1d]">{stat.value}</p>
            <p className="text-sm text-[#464555] mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-1">
        {[
          { key: 'books', label: 'Catalogue', icon: BookOpen },
          { key: 'loans', label: `Emprunts (${stats.activeLoans})`, icon: Clock },
          { key: 'history', label: 'Historique', icon: RotateCcw },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-[#3525cd] text-white' : 'text-[#464555] hover:bg-gray-100'}`}>
            <tab.icon size={16} />{tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'books' && (
        <>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un livre..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]" />
            </div>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]">
              <option value="">Toutes catégories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-[#464555]">Titre</th>
                  <th className="text-left px-4 py-3 font-medium text-[#464555]">Auteur</th>
                  <th className="text-left px-4 py-3 font-medium text-[#464555] hidden md:table-cell">Catégorie</th>
                  <th className="text-left px-4 py-3 font-medium text-[#464555] hidden lg:table-cell">ISBN</th>
                  <th className="text-center px-4 py-3 font-medium text-[#464555]">Disponibles</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-12 text-[#464555]">Aucun livre trouvé.</td></tr>
                ) : filteredBooks.map(book => (
                  <tr key={book.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-[#191c1d]">{book.title}</td>
                    <td className="px-4 py-3 text-[#464555]">{book.author}</td>
                    <td className="px-4 py-3 text-[#464555] hidden md:table-cell"><span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">{book.category}</span></td>
                    <td className="px-4 py-3 text-[#464555] hidden lg:table-cell font-mono text-xs">{book.isbn || '—'}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-semibold ${book.available_copies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {book.available_copies}/{book.total_copies}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'loans' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-[#464555]">Élève</th>
                <th className="text-left px-4 py-3 font-medium text-[#464555]">Livre</th>
                <th className="text-left px-4 py-3 font-medium text-[#464555] hidden md:table-cell">Emprunté le</th>
                <th className="text-left px-4 py-3 font-medium text-[#464555]">Retour prévu</th>
                <th className="text-center px-4 py-3 font-medium text-[#464555]">Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-[#464555]">Aucun emprunt en cours.</td></tr>
              ) : loans.map(loan => {
                const isOverdue = new Date(loan.due_date) < new Date();
                return (
                  <tr key={loan.id} className={`border-b border-gray-50 ${isOverdue ? 'bg-red-50/30' : 'hover:bg-gray-50/50'}`}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#191c1d]">{loan.student?.first_name} {loan.student?.last_name}</p>
                      <p className="text-xs text-[#464555]">{loan.student?.class?.name || ''}</p>
                    </td>
                    <td className="px-4 py-3 text-[#464555]">{loan.book?.title}</td>
                    <td className="px-4 py-3 text-[#464555] hidden md:table-cell">{new Date(loan.borrowed_at).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-[#464555]'}`}>
                        {new Date(loan.due_date).toLocaleDateString('fr-FR')}
                        {isOverdue && <AlertTriangle size={12} className="inline ml-1" />}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => handleReturn(loan)} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors">
                        <CheckCircle size={12} className="inline mr-1" />Retourner
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-[#464555]">Élève</th>
                <th className="text-left px-4 py-3 font-medium text-[#464555]">Livre</th>
                <th className="text-left px-4 py-3 font-medium text-[#464555] hidden md:table-cell">Emprunté le</th>
                <th className="text-left px-4 py-3 font-medium text-[#464555]">Retourné le</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-12 text-[#464555]">Aucun historique disponible.</td></tr>
              ) : history.map(loan => (
                <tr key={loan.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-[#191c1d]">{loan.student?.first_name} {loan.student?.last_name}</td>
                  <td className="px-4 py-3 text-[#464555]">{loan.book?.title}</td>
                  <td className="px-4 py-3 text-[#464555] hidden md:table-cell">{new Date(loan.borrowed_at).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3 text-[#464555]">{loan.returned_at ? new Date(loan.returned_at).toLocaleDateString('fr-FR') : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Book Modal */}
      {showAddBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#191c1d]">Ajouter un livre</h3>
              <button onClick={() => setShowAddBook(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#464555] mb-1">Titre *</label>
                <input value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#464555] mb-1">Auteur *</label>
                <input value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#464555] mb-1">ISBN</label>
                  <input value={newBook.isbn} onChange={e => setNewBook({ ...newBook, isbn: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#464555] mb-1">Catégorie</label>
                  <select value={newBook.category} onChange={e => setNewBook({ ...newBook, category: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#464555] mb-1">Exemplaires</label>
                  <input type="number" min={1} value={newBook.total_copies} onChange={e => setNewBook({ ...newBook, total_copies: parseInt(e.target.value) || 1 })} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#464555] mb-1">Année</label>
                  <input type="number" value={newBook.publication_year} onChange={e => setNewBook({ ...newBook, publication_year: parseInt(e.target.value) || 2024 })} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#464555] mb-1">Éditeur</label>
                <input value={newBook.publisher} onChange={e => setNewBook({ ...newBook, publisher: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]" />
              </div>
              <button onClick={handleAddBook} disabled={saving || !newBook.title || !newBook.author} className="w-full py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Loan Modal */}
      {showAddLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#191c1d]">Nouvel emprunt</h3>
              <button onClick={() => setShowAddLoan(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#464555] mb-1">Élève *</label>
                <select value={newLoan.student_id} onChange={e => setNewLoan({ ...newLoan, student_id: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]">
                  <option value="">Sélectionner un élève</option>
                  {students.map((s: any) => <option key={s.id} value={s.id}>{s.first_name} {s.last_name} — {s.class?.name || ''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#464555] mb-1">Livre *</label>
                <select value={newLoan.book_id} onChange={e => setNewLoan({ ...newLoan, book_id: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]">
                  <option value="">Sélectionner un livre</option>
                  {books.filter(b => b.available_copies > 0).map(b => <option key={b.id} value={b.id}>{b.title} — {b.author} ({b.available_copies} dispo.)</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#464555] mb-1">Date de retour prévue *</label>
                <input type="date" value={newLoan.due_date} onChange={e => setNewLoan({ ...newLoan, due_date: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]" />
              </div>
              <button onClick={handleAddLoan} disabled={saving || !newLoan.student_id || !newLoan.book_id || !newLoan.due_date} className="w-full py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />} Enregistrer l&apos;emprunt
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
