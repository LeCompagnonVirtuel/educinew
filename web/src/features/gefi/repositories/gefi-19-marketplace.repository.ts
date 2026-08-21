import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-19: Marketplace — Financial Products, Vendors, Orders, Reviews
// ============================================================================

export interface GEFIMarketplaceProduct extends BaseEntity { vendor_id: string; name: string; description: string; category: string; subcategory: string; type: 'SERVICE'|'SOFTWARE'|'CONTENT'|'CONSULTING'|'TRAINING'|'CUSTOM'; price: number; currency_code: string; pricing_model: 'ONE_TIME'|'SUBSCRIPTION'|'USAGE_BASED'|'TIERED'; features: string[]; media_urls: string[]; status: 'ACTIVE'|'DRAFT'|'INACTIVE'|'REJECTED'; rating: number; review_count: number; order_count: number; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceProductTier extends BaseEntity { product_id: string; name: string; description: string; price: number; features: string[]; limits: Record<string,unknown>; is_default: boolean; display_order: number; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceVendor extends BaseEntity { name: string; description: string; contact_email: string; contact_phone: string; website?: string; logo_url?: string; verified: boolean; rating: number; product_count: number; total_revenue: number; status: 'ACTIVE'|'PENDING'|'SUSPENDED'|'REJECTED'; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceVendorApplication extends BaseEntity { vendor_name: string; contact_name: string; contact_email: string; business_type: string; description: string; documents: Record<string,unknown>[]; status: 'PENDING'|'APPROVED'|'REJECTED'; reviewed_by?: string; reviewed_at?: string; rejection_reason?: string; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceOrder extends BaseEntity { buyer_id: string; product_id: string; tier_id?: string; quantity: number; unit_price: number; total_amount: number; currency_code: string; subscription_id?: string; status: 'PENDING'|'CONFIRMED'|'COMPLETED'|'CANCELLED'|'REFUNDED'; completed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceOrderItem extends BaseEntity { order_id: string; product_id: string; tier_id?: string; quantity: number; unit_price: number; total_price: number; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceSubscription extends BaseEntity { buyer_id: string; product_id: string; tier_id: string; plan_name: string; amount: number; billing_cycle: 'MONTHLY'|'QUARTERLY'|'ANNUAL'; current_period_start: string; current_period_end: string; status: 'ACTIVE'|'PAST_DUE'|'CANCELLED'|'TRIALING'; cancel_at?: string; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceSubscriptionUsage extends BaseEntity { subscription_id: string; metric_name: string; usage_quantity: number; limit_quantity: number; period: string; overage_amount: number; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceReview extends BaseEntity { product_id: string; user_id: string; order_id?: string; rating: number; title: string; content: string; pros?: string; cons?: string; helpful_count: number; reply?: string; replied_by?: string; replied_at?: string; status: 'PUBLISHED'|'HIDDEN'|'PENDING'; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceReviewReply extends BaseEntity { review_id: string; user_id: string; content: string; created_at: string; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceQuestion extends BaseEntity { product_id: string; user_id: string; question: string; answer?: string; answered_by?: string; answered_at?: string; status: 'OPEN'|'ANSWERED'|'CLOSED'; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceCart extends BaseEntity { user_id: string; status: 'ACTIVE'|'CHECKOUT'|'COMPLETED'|'ABANDONED'; total_amount: number; currency_code: string; item_count: number; last_updated: string; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceCartItem extends BaseEntity { cart_id: string; product_id: string; tier_id?: string; quantity: number; unit_price: number; total_price: number; added_at: string; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceWishlist extends BaseEntity { user_id: string; product_id: string; added_at: string; notes?: string; metadata: Record<string,unknown>; }
export interface GEFIMarketplacePromotion extends BaseEntity { name: string; code: string; type: 'PERCENTAGE'|'FIXED_AMOUNT'|'FREE_TRIAL'|'BUY_ONE_GET_ONE'; value: number; max_uses: number; current_uses: number; min_purchase: number; applies_to: Record<string,unknown>; start_date: string; end_date: string; status: 'ACTIVE'|'INACTIVE'|'EXPIRED'; metadata: Record<string,unknown>; }
export interface GEFIMarketplacePromotionUsage extends BaseEntity { promotion_id: string; user_id: string; order_id: string; discount_amount: number; used_at: string; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceAnalytics extends BaseEntity { vendor_id: string; product_id?: string; period: string; views: number; unique_visitors: number; conversion_rate: number; revenue: number; orders: number; refunds: number; avg_rating: number; calculated_at: string; metadata: Record<string,unknown>; }
export interface GEFIMarketplaceSearchLog extends BaseEntity { user_id?: string; query: string; results_count: number; filters: Record<string,unknown>; clicked_product_id?: string; searched_at: string; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI19Repository {
  marketplaceProduct: CrudRepository<GEFIMarketplaceProduct>;
  marketplaceProductTier: CrudRepository<GEFIMarketplaceProductTier>;
  marketplaceVendor: CrudRepository<GEFIMarketplaceVendor>;
  marketplaceVendorApplication: CrudRepository<GEFIMarketplaceVendorApplication>;
  marketplaceOrder: CrudRepository<GEFIMarketplaceOrder>;
  marketplaceOrderItem: CrudRepository<GEFIMarketplaceOrderItem>;
  marketplaceSubscription: CrudRepository<GEFIMarketplaceSubscription>;
  marketplaceSubscriptionUsage: CrudRepository<GEFIMarketplaceSubscriptionUsage>;
  marketplaceReview: CrudRepository<GEFIMarketplaceReview>;
  marketplaceReviewReply: CrudRepository<GEFIMarketplaceReviewReply>;
  marketplaceQuestion: CrudRepository<GEFIMarketplaceQuestion>;
  marketplaceCart: CrudRepository<GEFIMarketplaceCart>;
  marketplaceCartItem: CrudRepository<GEFIMarketplaceCartItem>;
  marketplaceWishlist: CrudRepository<GEFIMarketplaceWishlist>;
  marketplacePromotion: CrudRepository<GEFIMarketplacePromotion>;
  marketplacePromotionUsage: CrudRepository<GEFIMarketplacePromotionUsage>;
  marketplaceAnalytics: CrudRepository<GEFIMarketplaceAnalytics>;
  marketplaceSearchLog: CrudRepository<GEFIMarketplaceSearchLog>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI19Repository(supabase: SupabaseClient): GEFI19Repository {
  return {
    marketplaceProduct: createCrudRepository<GEFIMarketplaceProduct>(supabase, 'gefi_marketplace_products'),
    marketplaceProductTier: createCrudRepository<GEFIMarketplaceProductTier>(supabase, 'gefi_marketplace_product_tiers'),
    marketplaceVendor: createCrudRepository<GEFIMarketplaceVendor>(supabase, 'gefi_marketplace_vendors'),
    marketplaceVendorApplication: createCrudRepository<GEFIMarketplaceVendorApplication>(supabase, 'gefi_marketplace_vendor_applications'),
    marketplaceOrder: createCrudRepository<GEFIMarketplaceOrder>(supabase, 'gefi_marketplace_orders'),
    marketplaceOrderItem: createCrudRepository<GEFIMarketplaceOrderItem>(supabase, 'gefi_marketplace_order_items'),
    marketplaceSubscription: createCrudRepository<GEFIMarketplaceSubscription>(supabase, 'gefi_marketplace_subscriptions'),
    marketplaceSubscriptionUsage: createCrudRepository<GEFIMarketplaceSubscriptionUsage>(supabase, 'gefi_marketplace_subscription_usage'),
    marketplaceReview: createCrudRepository<GEFIMarketplaceReview>(supabase, 'gefi_marketplace_reviews'),
    marketplaceReviewReply: createCrudRepository<GEFIMarketplaceReviewReply>(supabase, 'gefi_marketplace_review_replies'),
    marketplaceQuestion: createCrudRepository<GEFIMarketplaceQuestion>(supabase, 'gefi_marketplace_questions'),
    marketplaceCart: createCrudRepository<GEFIMarketplaceCart>(supabase, 'gefi_marketplace_carts'),
    marketplaceCartItem: createCrudRepository<GEFIMarketplaceCartItem>(supabase, 'gefi_marketplace_cart_items'),
    marketplaceWishlist: createCrudRepository<GEFIMarketplaceWishlist>(supabase, 'gefi_marketplace_wishlists'),
    marketplacePromotion: createCrudRepository<GEFIMarketplacePromotion>(supabase, 'gefi_marketplace_promotions'),
    marketplacePromotionUsage: createCrudRepository<GEFIMarketplacePromotionUsage>(supabase, 'gefi_marketplace_promotion_usages'),
    marketplaceAnalytics: createCrudRepository<GEFIMarketplaceAnalytics>(supabase, 'gefi_marketplace_analytics'),
    marketplaceSearchLog: createCrudRepository<GEFIMarketplaceSearchLog>(supabase, 'gefi_marketplace_search_logs'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_marketplace_audit_trails'),
  };
}
