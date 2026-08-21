import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbMarketplace = {
  async listListings(filters?: { category?: string; search?: string }) {
    const supabase = getSupabase();
    const sid = await getAuthenticatedSchoolId();
    let query = supabase
      .from('marketplace_listings')
      .select('*, seller:users(id, name, avatar_url), purchases:marketplace_purchases(count)');
    if (sid) query = query.eq('school_id', sid);
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.search) query = query.ilike('title', `%${filters.search}%`);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },

  async getCategories() {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('marketplace_categories')
      .select('*')
      .order('name');
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data || []);
  },

  async createListing(data: any) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { data: listing, error } = await supabase
      .from('marketplace_listings')
      .insert({
        ...data,
        school_id: data.school_id || schoolId,
      })
      .select()
      .single();
    if (error) throw error;
    return camel(listing);
  },

  async getOrders(userId?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { data: { user } } = await supabase.auth.getUser();
    const uid = userId || user?.id;
    if (!uid) return [];

    let query = supabase
      .from('marketplace_purchases')
      .select('*, listing:marketplace_listings(*, seller:users(id, name)), buyer:users(id, name)')
      .eq('buyer_id', uid);
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },

  async createOrder(listingId: string, quantity: number = 1) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data: listing } = await supabase
      .from('marketplace_listings')
      .select('id, price, school_id')
      .eq('id', listingId)
      .single();
    if (!listing) throw new Error('Article introuvable');

    const { data: purchase, error } = await supabase
      .from('marketplace_purchases')
      .insert({
        listing_id: listingId,
        buyer_id: user.id,
        school_id: listing.school_id,
        quantity,
        total_amount: (listing.price || 0) * quantity,
        status: 'COMPLETED',
      })
      .select()
      .single();
    if (error) throw error;
    return camel(purchase);
  },
};
