import { supabase, camel, getAuthCookies } from './supabase';

export async function getMarketplaceListings(filters: any = {}) {
  let q = supabase.from('marketplace_listings').select('*, seller:users(*)');
  if (filters.category) q = q.eq('category', filters.category);
  const { data, error } = await q.order('created_at', { ascending: false });
  if (error) throw error;
  return camel(data || []);
}

export async function getMarketplaceListing(id: string) {
  const { data, error } = await supabase.from('marketplace_listings').select('*').eq('id', id).single();
  if (error) throw error;
  return camel(data);
}

export async function purchaseMarketplaceItem(listingId: string) {
  const cookies = await getAuthCookies();

  const apiBase = process.env.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_SITE_URL;
  if (!apiBase) throw new Error('URL API non configurée');

  const res = await fetch(`${apiBase}/api/marketplace/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    body: JSON.stringify({ listing_id: listingId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur achat' }));
    throw new Error(err.error || err.message || 'Erreur lors de l\'achat');
  }
  return res.json();
}

export async function getMarketplaceCategories() {
  const { data, error } = await supabase.from('marketplace_categories').select('*').order('name');
  if (error) throw error;
  return data || [];
}

export async function createMarketplaceListing(data: any) {
  const { data: listing, error } = await supabase.from('marketplace_listings').insert(data).select().single();
  if (error) throw error;
  return listing;
}
