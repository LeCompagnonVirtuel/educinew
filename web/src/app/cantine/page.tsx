'use client';

import { useState, useEffect, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import {
  UtensilsCrossed, CalendarDays, AlertTriangle, TrendingUp,
  Plus, Search, Loader2, Check, X, Leaf, ChevronLeft, ChevronRight,
  Users, ClipboardList, BarChart3, ShieldAlert, Coffee, Sun, Cookie
} from 'lucide-react';

type TabId = 'menu' | 'orders' | 'service' | 'reporting';

interface MenuItem {
  id: string;
  school_id: string;
  day_of_week: number;
  meal_type: string;
  name: string;
  description: string;
  price: number;
  allergens: string[];
  is_vegetarian: boolean;
  is_active: boolean;
  week_start: string;
  created_at: string;
}

interface Subscription {
  id: string;
  school_id: string;
  student_id: string;
  plan_type: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  student?: { first_name: string; last_name: string; allergies?: string };
}

interface Order {
  id: string;
  school_id: string;
  student_id: string;
  menu_id: string;
  date: string;
  status: string;
  served_at: string | null;
  served_by: string | null;
  created_at: string;
  student?: { first_name: string; last_name: string; allergies?: string };
  menu?: { name: string; meal_type: string; allergens: string[] };
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const MEAL_TYPES = [
  { value: 'breakfast', label: 'Petit-dejeuner', icon: Coffee },
  { value: 'lunch', label: 'Dejeuner', icon: Sun },
  { value: 'snack', label: 'Gouter', icon: Cookie },
];
const PLAN_TYPES = [
  { value: 'daily', label: 'Journalier' },
  { value: 'weekly', label: 'Hebdomadaire' },
  { value: 'monthly', label: 'Mensuel' },
];

function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

export default function CantinePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('menu');
  const [currentWeek, setCurrentWeek] = useState(() => getWeekStart(new Date()));

  // Data states
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ served: 0, planned: 0, allergies: 0, revenue: 0 });

  // Modal states
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = useCallback(async () => {
    if (!user?.schoolId) return;
    setLoading(true);
    try {
      const supabase = getSupabase();
      const today = new Date().toISOString().split('T')[0];

      const [menusRes, subsRes, ordersRes, servedRes] = await Promise.all([
        supabase.from('cantine_menus').select('*')
          .eq('school_id', user.schoolId).eq('week_start', currentWeek).eq('is_active', true),
        supabase.from('cantine_subscriptions').select('*, student:students(first_name, last_name, allergies)')
          .eq('school_id', user.schoolId).eq('is_active', true),
        supabase.from('cantine_orders').select('*, student:students(first_name, last_name, allergies), menu:cantine_menus(name, meal_type, allergens)')
          .eq('school_id', user.schoolId).eq('date', today),
        supabase.from('cantine_orders').select('id', { count: 'exact' })
          .eq('school_id', user.schoolId).eq('date', today).eq('status', 'served'),
      ]);

      setMenus(menusRes.data || []);
      setSubscriptions(subsRes.data || []);
      setOrders(ordersRes.data || []);

      const allergySubs = (subsRes.data || []).filter((s: any) => s.student?.allergies);
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
      const revenueRes = await supabase.from('cantine_orders')
        .select('menu:cantine_menus(price)')
        .eq('school_id', user.schoolId).gte('date', monthStart).eq('status', 'served');

      const totalRevenue = (revenueRes.data || []).reduce((sum: number, o: any) => sum + (o.menu?.price || 0), 0);

      setStats({
        served: servedRes.count || 0,
        planned: (ordersRes.data || []).length,
        allergies: allergySubs.length,
        revenue: totalRevenue,
      });
    } catch (err) {
      console.error('Erreur chargement cantine:', err);
      showToast('Erreur lors du chargement des donnees', 'error');
    } finally {
      setLoading(false);
    }
  }, [user?.schoolId, currentWeek]);

  useEffect(() => { loadData(); }, [loadData]);

  const navigateWeek = (direction: number) => {
    const d = new Date(currentWeek);
    d.setDate(d.getDate() + direction * 7);
    setCurrentWeek(d.toISOString().split('T')[0]);
  };

  const handleMarkServed = async (orderId: string) => {
    if (!user) return;
    const supabase = getSupabase();
    const { error } = await supabase.from('cantine_orders')
      .update({ status: 'served', served_at: new Date().toISOString(), served_by: user.id })
      .eq('id', orderId);
    if (error) { showToast('Erreur lors du marquage', 'error'); return; }
    showToast('Repas marque comme servi');
    loadData();
  };

  const handleDeleteMenu = async (menuId: string) => {
    const supabase = getSupabase();
    const { error } = await supabase.from('cantine_menus')
      .update({ is_active: false }).eq('id', menuId);
    if (error) { showToast('Erreur lors de la suppression', 'error'); return; }
    showToast('Menu supprime');
    loadData();
  };

  const tabs = [
    { id: 'menu' as const, icon: CalendarDays, label: 'Menus' },
    { id: 'orders' as const, icon: ClipboardList, label: 'Abonnements' },
    { id: 'service' as const, icon: UtensilsCrossed, label: 'Service' },
    { id: 'reporting' as const, icon: BarChart3, label: 'Rapports' },
  ];

  if (loading) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Cantine' }]}>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#3525cd]" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Cantine' }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#191c1d]">Gestion de la Cantine</h1>
            <p className="text-[#464555] text-sm mt-1">Gerez les menus, abonnements et le service quotidien</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border-l-4 border-emerald-500 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <UtensilsCrossed className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#191c1d]">{stats.served}</p>
                <p className="text-xs text-[#464555]">Repas servis aujourd&apos;hui</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border-l-4 border-blue-500 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CalendarDays className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#191c1d]">{stats.planned}</p>
                <p className="text-xs text-[#464555]">Repas prevus</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border-l-4 border-amber-500 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#191c1d]">{stats.allergies}</p>
                <p className="text-xs text-[#464555]">Allergies signalees</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border-l-4 border-[#3525cd] shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#3525cd]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#191c1d]">{stats.revenue.toLocaleString()} FCFA</p>
                <p className="text-xs text-[#464555]">Recettes du mois</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#f8f9fa] p-1 rounded-xl overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-white text-[#3525cd] shadow-sm' : 'text-[#464555] hover:text-[#191c1d]'
              }`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'menu' && <MenuTab menus={menus} currentWeek={currentWeek} navigateWeek={navigateWeek}
          onAdd={() => { setEditingMenu(null); setShowMenuModal(true); }}
          onEdit={(m) => { setEditingMenu(m); setShowMenuModal(true); }}
          onDelete={handleDeleteMenu} />}
        {activeTab === 'orders' && <OrdersTab subscriptions={subscriptions} searchTerm={searchTerm}
          setSearchTerm={setSearchTerm} onAdd={() => setShowSubModal(true)} />}
        {activeTab === 'service' && <ServiceTab orders={orders} onMarkServed={handleMarkServed} />}
        {activeTab === 'reporting' && <ReportingTab schoolId={user?.schoolId || ''} />}
      </div>

      {/* Menu Modal */}
      {showMenuModal && <MenuModal weekStart={currentWeek} schoolId={user?.schoolId || ''}
        editing={editingMenu} onClose={() => setShowMenuModal(false)} onSaved={() => { setShowMenuModal(false); loadData(); }} showToast={showToast} />}

      {/* Subscription Modal */}
      {showSubModal && <SubscriptionModal schoolId={user?.schoolId || ''}
        onClose={() => setShowSubModal(false)} onSaved={() => { setShowSubModal(false); loadData(); }} showToast={showToast} />}

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${
          toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
    </RoleLayout>
  );
}

/* ============ MENU TAB ============ */
function MenuTab({ menus, currentWeek, navigateWeek, onAdd, onEdit, onDelete }: {
  menus: MenuItem[]; currentWeek: string; navigateWeek: (d: number) => void;
  onAdd: () => void; onEdit: (m: MenuItem) => void; onDelete: (id: string) => void;
}) {
  const weekDate = new Date(currentWeek);
  const weekEnd = new Date(weekDate); weekEnd.setDate(weekEnd.getDate() + 6);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigateWeek(-1)} className="p-2 rounded-lg hover:bg-[#f8f9fa] transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#464555]" />
          </button>
          <span className="text-sm font-medium text-[#191c1d]">
            Semaine du {weekDate.toLocaleDateString('fr-FR')} au {weekEnd.toLocaleDateString('fr-FR')}
          </span>
          <button onClick={() => navigateWeek(1)} className="p-2 rounded-lg hover:bg-[#f8f9fa] transition-colors">
            <ChevronRight className="w-5 h-5 text-[#464555]" />
          </button>
        </div>
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] text-white rounded-lg text-sm font-medium hover:bg-[#2a1ea3] transition-colors">
          <Plus className="w-4 h-4" /> Ajouter un plat
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
        {DAYS.map((day, idx) => {
          const dayMenus = menus.filter(m => m.day_of_week === idx + 1);
          return (
            <div key={day} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#f8f9fa] px-3 py-2 border-b">
                <h3 className="text-xs font-semibold text-[#191c1d] uppercase">{day}</h3>
              </div>
              <div className="p-2 space-y-2 min-h-[120px]">
                {dayMenus.length === 0 && (
                  <p className="text-xs text-[#464555] text-center py-4">Aucun plat</p>
                )}
                {dayMenus.map(menu => (
                  <div key={menu.id} className="p-2 bg-[#f8f9fa] rounded-lg group relative">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#191c1d] truncate">{menu.name}</p>
                        <p className="text-[10px] text-[#464555] capitalize">{MEAL_TYPES.find(t => t.value === menu.meal_type)?.label}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {menu.is_vegetarian && <Leaf className="w-3 h-3 text-emerald-500" />}
                          {menu.allergens?.length > 0 && <ShieldAlert className="w-3 h-3 text-amber-500" />}
                          <span className="text-[10px] font-medium text-[#3525cd]">{menu.price} F</span>
                        </div>
                      </div>
                      <div className="hidden group-hover:flex items-center gap-1">
                        <button onClick={() => onEdit(menu)} className="p-1 rounded hover:bg-white">
                          <CalendarDays className="w-3 h-3 text-[#464555]" />
                        </button>
                        <button onClick={() => onDelete(menu.id)} className="p-1 rounded hover:bg-white">
                          <X className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============ ORDERS/SUBSCRIPTIONS TAB ============ */
function OrdersTab({ subscriptions, searchTerm, setSearchTerm, onAdd }: {
  subscriptions: Subscription[]; searchTerm: string; setSearchTerm: (s: string) => void; onAdd: () => void;
}) {
  const filtered = subscriptions.filter(s => {
    const name = `${s.student?.first_name || ''} ${s.student?.last_name || ''}`.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#464555]" />
          <input type="text" placeholder="Rechercher un eleve..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd]" />
        </div>
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] text-white rounded-lg text-sm font-medium hover:bg-[#2a1ea3] transition-colors">
          <Plus className="w-4 h-4" /> Nouvel abonnement
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8f9fa]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#464555]">Eleve</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#464555]">Formule</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#464555]">Debut</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#464555]">Fin</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#464555]">Allergies</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#464555]">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-[#464555]">Aucun abonnement trouve</td></tr>
              )}
              {filtered.map(sub => (
                <tr key={sub.id} className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="px-4 py-3 text-sm text-[#191c1d] font-medium">
                    {sub.student?.first_name} {sub.student?.last_name}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#464555] capitalize">
                    {PLAN_TYPES.find(p => p.value === sub.plan_type)?.label || sub.plan_type}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#464555]">{new Date(sub.start_date).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3 text-sm text-[#464555]">{sub.end_date ? new Date(sub.end_date).toLocaleDateString('fr-FR') : '-'}</td>
                  <td className="px-4 py-3">
                    {sub.student?.allergies ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                        <AlertTriangle className="w-3 h-3" /> {sub.student.allergies}
                      </span>
                    ) : <span className="text-xs text-[#464555]">Aucune</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      sub.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {sub.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============ SERVICE TAB ============ */
function ServiceTab({ orders, onMarkServed }: { orders: Order[]; onMarkServed: (id: string) => void }) {
  const pending = orders.filter(o => o.status !== 'served');
  const served = orders.filter(o => o.status === 'served');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#191c1d]">Service du jour</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#464555]">
            <span className="font-semibold text-emerald-600">{served.length}</span> / {orders.length} servis
          </span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: orders.length > 0 ? `${(served.length / orders.length) * 100}%` : '0%' }} />
          </div>
        </div>
      </div>

      {pending.length === 0 && served.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <UtensilsCrossed className="w-12 h-12 text-[#464555] mx-auto mb-3 opacity-40" />
          <p className="text-sm text-[#464555]">Aucune commande pour aujourd&apos;hui</p>
        </div>
      )}

      {pending.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b bg-[#f8f9fa]">
            <h3 className="text-sm font-semibold text-[#191c1d]">En attente ({pending.length})</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {pending.map(order => (
              <div key={order.id} className="flex items-center justify-between px-4 py-3 hover:bg-[#f8f9fa] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3525cd]/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#3525cd]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#191c1d]">
                      {order.student?.first_name} {order.student?.last_name}
                    </p>
                    <p className="text-xs text-[#464555]">{order.menu?.name} - {MEAL_TYPES.find(t => t.value === order.menu?.meal_type)?.label}</p>
                  </div>
                  {order.student?.allergies && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-medium">
                      <ShieldAlert className="w-3 h-3" /> Allergie
                    </span>
                  )}
                </div>
                <button onClick={() => onMarkServed(order.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors">
                  <Check className="w-3.5 h-3.5" /> Servi
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {served.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden opacity-75">
          <div className="px-4 py-3 border-b bg-[#f8f9fa]">
            <h3 className="text-sm font-semibold text-emerald-700">Servis ({served.length})</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {served.map(order => (
              <div key={order.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#191c1d]">{order.student?.first_name} {order.student?.last_name}</p>
                    <p className="text-xs text-[#464555]">{order.menu?.name}</p>
                  </div>
                </div>
                <span className="text-xs text-[#464555]">
                  {order.served_at ? new Date(order.served_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ REPORTING TAB ============ */
function ReportingTab({ schoolId }: { schoolId: string }) {
  const [reportData, setReportData] = useState<{ daily: Record<string, number>; popular: { name: string; count: number }[]; totalServed: number; totalRevenue: number } | null>(null);
  const [loadingReport, setLoadingReport] = useState(true);

  useEffect(() => {
    if (!schoolId) return;
    const loadReport = async () => {
      setLoadingReport(true);
      try {
        const supabase = getSupabase();
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
        const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];

        const { data: monthOrders } = await supabase.from('cantine_orders')
          .select('date, status, menu:cantine_menus(name, price)')
          .eq('school_id', schoolId).gte('date', monthStart).lte('date', monthEnd).eq('status', 'served');

        const daily: Record<string, number> = {};
        const mealCount: Record<string, number> = {};
        let totalRevenue = 0;

        (monthOrders || []).forEach((o: any) => {
          const dayName = DAYS[new Date(o.date).getDay() === 0 ? 6 : new Date(o.date).getDay() - 1];
          daily[dayName] = (daily[dayName] || 0) + 1;
          if (o.menu?.name) mealCount[o.menu.name] = (mealCount[o.menu.name] || 0) + 1;
          totalRevenue += o.menu?.price || 0;
        });

        const popular = Object.entries(mealCount)
          .sort(([, a], [, b]) => b - a).slice(0, 5)
          .map(([name, count]) => ({ name, count }));

        setReportData({ daily, popular, totalServed: (monthOrders || []).length, totalRevenue });
      } catch (err) {
        console.error('Erreur chargement rapports:', err);
      } finally {
        setLoadingReport(false);
      }
    };
    loadReport();
  }, [schoolId]);

  if (loadingReport) {
    return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-[#3525cd]" /></div>;
  }

  if (!reportData) return null;

  const maxDaily = Math.max(...Object.values(reportData.daily), 1);
  const maxPopular = Math.max(...reportData.popular.map(p => p.count), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#191c1d] mb-1">Total repas servis (mois)</h3>
          <p className="text-3xl font-bold text-[#3525cd]">{reportData.totalServed}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#191c1d] mb-1">Chiffre d&apos;affaires (mois)</h3>
          <p className="text-3xl font-bold text-emerald-600">{reportData.totalRevenue.toLocaleString()} FCFA</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-[#191c1d] mb-4">Frequentation par jour</h3>
        <div className="space-y-3">
          {DAYS.slice(0, 6).map(day => (
            <div key={day} className="flex items-center gap-3">
              <span className="text-xs text-[#464555] w-16">{day.slice(0, 3)}</span>
              <div className="flex-1 h-6 bg-[#f8f9fa] rounded-full overflow-hidden">
                <div className="h-full bg-[#3525cd]/80 rounded-full transition-all"
                  style={{ width: `${((reportData.daily[day] || 0) / maxDaily) * 100}%` }} />
              </div>
              <span className="text-xs font-medium text-[#191c1d] w-8 text-right">{reportData.daily[day] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-[#191c1d] mb-4">Plats les plus populaires</h3>
        {reportData.popular.length === 0 && (
          <p className="text-sm text-[#464555] text-center py-4">Aucune donnee disponible</p>
        )}
        <div className="space-y-3">
          {reportData.popular.map((item, idx) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#3525cd] w-5">{idx + 1}</span>
              <span className="text-sm text-[#191c1d] flex-1 truncate">{item.name}</span>
              <div className="w-24 h-4 bg-[#f8f9fa] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500/70 rounded-full" style={{ width: `${(item.count / maxPopular) * 100}%` }} />
              </div>
              <span className="text-xs font-medium text-[#464555] w-8 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ MENU MODAL ============ */
function MenuModal({ weekStart, schoolId, editing, onClose, onSaved, showToast }: {
  weekStart: string; schoolId: string; editing: MenuItem | null;
  onClose: () => void; onSaved: () => void; showToast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [form, setForm] = useState({
    meal_type: editing?.meal_type || 'lunch',
    day_of_week: editing?.day_of_week || 1,
    name: editing?.name || '',
    description: editing?.description || '',
    price: editing?.price || 0,
    allergens: editing?.allergens?.join(', ') || '',
    is_vegetarian: editing?.is_vegetarian || false,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { showToast('Le nom du plat est requis', 'error'); return; }
    setSaving(true);
    try {
      const supabase = getSupabase();
      const payload = {
        school_id: schoolId,
        meal_type: form.meal_type,
        day_of_week: form.day_of_week,
        name: form.name.trim(),
        description: form.description.trim(),
        price: form.price,
        allergens: form.allergens.split(',').map(a => a.trim()).filter(Boolean),
        is_vegetarian: form.is_vegetarian,
        is_active: true,
        week_start: weekStart,
      };

      if (editing) {
        const { error } = await supabase.from('cantine_menus').update(payload).eq('id', editing.id);
        if (error) throw error;
        showToast('Plat mis a jour');
      } else {
        const { error } = await supabase.from('cantine_menus').insert(payload);
        if (error) throw error;
        showToast('Plat ajoute');
      }
      onSaved();
    } catch (err) {
      console.error(err);
      showToast('Erreur lors de l\'enregistrement', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#191c1d]">{editing ? 'Modifier le plat' : 'Ajouter un plat'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f8f9fa]"><X className="w-5 h-5 text-[#464555]" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#464555] mb-1">Type de repas</label>
              <select value={form.meal_type} onChange={e => setForm(f => ({ ...f, meal_type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd]">
                {MEAL_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#464555] mb-1">Jour</label>
              <select value={form.day_of_week} onChange={e => setForm(f => ({ ...f, day_of_week: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd]">
                {DAYS.map((d, i) => <option key={d} value={i + 1}>{d}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#464555] mb-1">Nom du plat *</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Ex: Riz au poisson" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#464555] mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2} placeholder="Description du plat..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#464555] mb-1">Prix (FCFA)</label>
              <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                min={0} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd]" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_vegetarian} onChange={e => setForm(f => ({ ...f, is_vegetarian: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-[#3525cd] focus:ring-[#3525cd]" />
                <span className="text-sm text-[#191c1d]">Vegetarien</span>
                <Leaf className="w-4 h-4 text-emerald-500" />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#464555] mb-1">Allergenes (separes par des virgules)</label>
            <input type="text" value={form.allergens} onChange={e => setForm(f => ({ ...f, allergens: e.target.value }))}
              placeholder="Ex: arachide, lait, gluten"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd]" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-[#464555] hover:bg-[#f8f9fa] rounded-lg transition-colors">
              Annuler
            </button>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] text-white rounded-lg text-sm font-medium hover:bg-[#2a1ea3] transition-colors disabled:opacity-50">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? 'Mettre a jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============ SUBSCRIPTION MODAL ============ */
function SubscriptionModal({ schoolId, onClose, onSaved, showToast }: {
  schoolId: string; onClose: () => void; onSaved: () => void; showToast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [students, setStudents] = useState<{ id: string; first_name: string; last_name: string }[]>([]);
  const [form, setForm] = useState({ student_id: '', plan_type: 'daily', start_date: new Date().toISOString().split('T')[0] });
  const [saving, setSaving] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabase();
      const { data } = await supabase.from('students').select('id, first_name, last_name')
        .eq('school_id', schoolId).order('last_name');
      setStudents(data || []);
      setLoadingStudents(false);
    };
    load();
  }, [schoolId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.student_id) { showToast('Veuillez selectionner un eleve', 'error'); return; }
    setSaving(true);
    try {
      const supabase = getSupabase();
      const endDate = new Date(form.start_date);
      if (form.plan_type === 'daily') endDate.setDate(endDate.getDate() + 1);
      else if (form.plan_type === 'weekly') endDate.setDate(endDate.getDate() + 7);
      else endDate.setMonth(endDate.getMonth() + 1);

      const { error } = await supabase.from('cantine_subscriptions').insert({
        school_id: schoolId,
        student_id: form.student_id,
        plan_type: form.plan_type,
        start_date: form.start_date,
        end_date: endDate.toISOString().split('T')[0],
        is_active: true,
      });
      if (error) throw error;
      showToast('Abonnement cree');
      onSaved();
    } catch (err) {
      console.error(err);
      showToast('Erreur lors de la creation', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#191c1d]">Nouvel abonnement</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f8f9fa]"><X className="w-5 h-5 text-[#464555]" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#464555] mb-1">Eleve *</label>
            {loadingStudents ? (
              <div className="flex items-center gap-2 py-2"><Loader2 className="w-4 h-4 animate-spin text-[#3525cd]" /><span className="text-sm text-[#464555]">Chargement...</span></div>
            ) : (
              <select value={form.student_id} onChange={e => setForm(f => ({ ...f, student_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd]">
                <option value="">Selectionner un eleve</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.last_name} {s.first_name}</option>)}
              </select>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-[#464555] mb-1">Formule</label>
            <select value={form.plan_type} onChange={e => setForm(f => ({ ...f, plan_type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd]">
              {PLAN_TYPES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#464555] mb-1">Date de debut</label>
            <input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd]" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-[#464555] hover:bg-[#f8f9fa] rounded-lg transition-colors">
              Annuler
            </button>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] text-white rounded-lg text-sm font-medium hover:bg-[#2a1ea3] transition-colors disabled:opacity-50">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Creer l&apos;abonnement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
