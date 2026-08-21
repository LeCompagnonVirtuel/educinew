import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-11: Marketplace — Educational Marketplace Framework
// ============================================================================

export interface GEGINListing extends BaseEntity {
  seller_id: string;
  title: string;
  description: string;
  type: 'course' | 'resource' | 'service' | 'tool' | 'template' | 'other';
  category: string;
  price: number;
  currency: string;
  status: 'draft' | 'active' | 'sold_out' | 'archived';
  images: string[];
  tags: string[];
  metadata: Record<string, unknown>;
}

export interface GEGINTransaction extends BaseEntity {
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'refunded' | 'disputed' | 'cancelled';
  payment_method: string;
  transaction_date: string;
  completed_at?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINReview extends BaseEntity {
  listing_id: string;
  transaction_id: string;
  reviewer_id: string;
  rating: number;
  title?: string;
  comment?: string;
  status: 'pending' | 'published' | 'hidden' | 'flagged';
  helpful_count: number;
  metadata: Record<string, unknown>;
}

export interface GEGINCommission extends BaseEntity {
  platform_fee_percent: number;
  minimum_amount: number;
  currency: string;
  payment_schedule: 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'inactive';
  metadata: Record<string, unknown>;
}

export interface GEGINProvider extends BaseEntity {
  name: string;
  type: 'institution' | 'independent' | 'organization';
  description?: string;
  logo_url?: string;
  website_url?: string;
  contact_email?: string;
  rating: number;
  total_sales: number;
  status: 'active' | 'inactive' | 'suspended';
  verified: boolean;
  metadata: Record<string, unknown>;
}

export interface GEGINBundle extends BaseEntity {
  name: string;
  description: string;
  listing_ids: string[];
  original_price: number;
  bundle_price: number;
  currency: string;
  status: 'active' | 'inactive' | 'archived';
  valid_until?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINWishlist extends BaseEntity {
  user_id: string;
  listing_id: string;
  added_at: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN11_TABLE_NAMES: Record<string, string> = {
  GEGINListing: 'gegin_listings',
  GEGINTransaction: 'gegin_transactions',
  GEGINReview: 'gegin_reviews',
  GEGINCommission: 'gegin_commissions',
  GEGINProvider: 'gegin_providers',
  GEGINBundle: 'gegin_bundles',
  GEGINWishlist: 'gegin_wishlists',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN11Repository {
  listings: CrudRepository<GEGINListing>;
  transactions: CrudRepository<GEGINTransaction>;
  reviews: CrudRepository<GEGINReview>;
  commissions: CrudRepository<GEGINCommission>;
  providers: CrudRepository<GEGINProvider>;
  bundles: CrudRepository<GEGINBundle>;
  wishlists: CrudRepository<GEGINWishlist>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN11Repository(supabase: SupabaseClient): GEGIN11Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    listings: crud<GEGINListing>(GEGIN11_TABLE_NAMES.GEGINListing),
    transactions: crud<GEGINTransaction>(GEGIN11_TABLE_NAMES.GEGINTransaction),
    reviews: crud<GEGINReview>(GEGIN11_TABLE_NAMES.GEGINReview),
    commissions: crud<GEGINCommission>(GEGIN11_TABLE_NAMES.GEGINCommission),
    providers: crud<GEGINProvider>(GEGIN11_TABLE_NAMES.GEGINProvider),
    bundles: crud<GEGINBundle>(GEGIN11_TABLE_NAMES.GEGINBundle),
    wishlists: crud<GEGINWishlist>(GEGIN11_TABLE_NAMES.GEGINWishlist),
  };
}
