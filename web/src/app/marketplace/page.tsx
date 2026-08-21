'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbMarketplace } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency, cn } from '@/lib/utils';
import Pagination from '@/components/ui/Pagination';
import {
  Play, HelpCircle, BookOpen, Brain, FlaskConical, Search,
  ShoppingCart, Sparkles, Box, Plus, X, Minus,
  Trash2, ShoppingBag, CreditCard
} from 'lucide-react';

export default function MarketplacePage() {
  const { user } = useAuth();
  const isSeller = user?.role === 'TEACHER' || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  
  const [listings, setListings] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'catalog' | 'cart' | 'orders'>('catalog');
  const [showCheckout, setShowCheckout] = useState(false);
  const [toast, setToast] = useState<{msg: string; type: string} | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [l, c, o] = await Promise.all([
          sbMarketplace.listListings({ category: selectedCategory || undefined, search: search || undefined }),
          sbMarketplace.getCategories(),
          sbMarketplace.getOrders().catch(() => []),
        ]);
        setListings(l || []);
        if (c?.length) setCategories(c);
        setOrders(o || []);
      } catch (err) { setListings([]); setCategories([]); setOrders([]); } finally { setLoading(false); }
    }
    load();
  }, [selectedCategory, search]);

  const showToast = (msg: string) => {
    setToast({ msg, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredListings = listings.filter(l =>
    (!selectedCategory || l.category === selectedCategory) &&
    (!search || l.title.toLowerCase().includes(search.toLowerCase()))
  );

  const [marketPage, setMarketPage] = useState(1);
  const marketPerPage = 12;
  const marketTotalPages = Math.max(1, Math.ceil(filteredListings.length / marketPerPage));
  const paginatedListings = filteredListings.slice((marketPage - 1) * marketPerPage, marketPage * marketPerPage);

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find((item: any) => item.product.id === product.id);
      if (existing) {
        return prev.map((item: any) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast('Ajoute au panier');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map((item: any) => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  const handleCheckout = async () => {
    try {
      for (const item of cart) {
        await sbMarketplace.createOrder(item.product.id, item.quantity);
      }
      // Reload orders from DB
      const realOrders = await sbMarketplace.getOrders();
      setOrders(realOrders);
      setCart([]);
      setShowCheckout(false);
      setActiveView('orders');
      showToast('Commande enregistrée');
    } catch (err: any) {
      showToast(err.message || 'Erreur lors de la commande');
    }
  };

  const revenue = listings.reduce((acc: number, l: any) => acc + (l.price * (l._count?.purchases || 0)), 0);
  const totalSales = listings.reduce((acc: number, l: any) => acc + (l._count?.purchases || 0), 0);

  return (
    <RoleLayout role="admin">
      {toast && (
        <div className="fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold bg-emerald-500 text-white">
          {toast.msg}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={14} /> EduCI Marketplace
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">Educational Resources</h2>
          <p className="text-slate-500 mt-2">Courses, materials, tutoring and more</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveView('orders')} className={cn('px-4 py-2 rounded-xl text-sm font-medium', activeView === 'orders' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-600')}>
            Commandes ({orders.length})
          </button>
          {isSeller && (
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium">
              Vendeur
            </button>
          )}
          <button onClick={() => setActiveView('cart')} className="relative p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeView === 'catalog' && (
        <>
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            <button onClick={() => setSelectedCategory('')} className={cn('px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap', !selectedCategory ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border')}>
              All
            </button>
            {categories.map((cat: any) => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={cn('px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap', selectedCategory === cat.id ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border')}>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {filteredListings.slice(0, 3).map((listing: any) => (
              <div key={listing.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100">
                <div className="h-40 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                  <Play size={36} className="text-indigo-400" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">{listing.category}</span>
                  <h4 className="font-bold text-slate-900 mt-2 mb-1">{listing.title}</h4>
                  <p className="text-sm text-slate-500 mb-4">{listing.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">{formatCurrency(listing.price)}</span>
                    <button onClick={() => addToCart(listing)} className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700">
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-bold">All Resources ({filteredListings.length})</h3>
            </div>
            {paginatedListings.map((listing: any) => (
              <div key={listing.id} className="p-4 flex items-center gap-4 border-b last:border-0">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Play size={20} className="text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{listing.title}</h4>
                  <p className="text-xs text-slate-500">{listing.seller?.name}</p>
                </div>
                <span className="font-bold text-indigo-600">{formatCurrency(listing.price)}</span>
                <button onClick={() => addToCart(listing)} className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg">
                  Ajouter
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {activeView === 'cart' && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Mon panier</h2>
          {cart.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <ShoppingCart size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Panier vide</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item: any) => (
                <div key={item.product.id} className="bg-white rounded-xl p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.product.title}</h4>
                    <p className="text-sm text-slate-500">{formatCurrency(item.product.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 bg-slate-100 rounded"><Minus size={16} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 bg-slate-100 rounded"><Plus size={16} /></button>
                  </div>
                </div>
              ))}
              <div className="bg-white rounded-xl p-6">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>{cartTotal.toLocaleString()} XOF</span>
                </div>
                <button onClick={() => setShowCheckout(true)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
                  Commander
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeView === 'orders' && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Mes commandes</h2>
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <Box size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Aucune commande</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">{order.status}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{order.total.toLocaleString()} XOF</span>
                  </div>
                </div>
            ))}
            <Pagination currentPage={marketPage} totalPages={marketTotalPages} onPageChange={setMarketPage} />
          </div>
          )}
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowCheckout(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Paiement</h3>
              <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>{cartTotal.toLocaleString()} XOF</span>
            </div>
            <button onClick={handleCheckout} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700">
              Payer {cartTotal.toLocaleString()} XOF
            </button>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}