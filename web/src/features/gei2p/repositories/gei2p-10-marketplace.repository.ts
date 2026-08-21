import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-10: Marketplace — Educational Resource Exchange & Commerce
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface GEI2PMarketplaceProduct extends BaseEntity { name: string; description: string; category: 'course'|'credential'|'content'|'tool'|'service'|'data'|'api'; seller_did: string; seller_name: string; price: number; currency: string; pricing_model: 'one_time'|'subscription'|'usage'|'free'; status: 'draft'|'active'|'suspended'|'archived'; featured: boolean; tags: string[]; }
export interface GEI2PMarketplaceProductVersion extends BaseEntity { product_id: string; version: string; changelog: string; file_url?: string; file_size?: number; checksum: string; released_at: string; status: 'draft'|'released'|'deprecated'; }
export interface GEI2PMarketplaceProductReview extends BaseEntity { product_id: string; reviewer_did: string; reviewer_name: string; rating: number; title: string; content: string; pros?: string; cons?: string; helpful_count: number; created_at: string; }
export interface GEI2PMarketplaceProductMedia extends BaseEntity { product_id: string; media_type: 'image'|'video'|'document'|'demo'; url: string; title?: string; description?: string; sort_order: number; }
export interface GEI2PMarketplaceOrder extends BaseEntity { buyer_did: string; seller_did: string; product_id: string; product_version_id?: string; quantity: number; unit_price: number; total_amount: number; currency: string; status: 'pending'|'paid'|'delivered'|'completed'|'refunded'|'cancelled'|'disputed'; payment_method: string; created_at: string; completed_at?: string; }
export interface GEI2PMarketplacePayment extends BaseEntity { order_id: string; amount: number; currency: string; payment_method: string; transaction_id?: string; status: 'pending'|'processing'|'completed'|'failed'|'refunded'; paid_at?: string; refunded_at?: string; }
export interface GEI2PMarketplaceRefund extends BaseEntity { order_id: string; payment_id: string; amount: number; reason: string; status: 'pending'|'approved'|'denied'|'completed'; requested_by: string; requested_at: string; processed_at?: string; }
export interface GEI2PMarketplaceSubscription extends BaseEntity { buyer_did: string; product_id: string; plan: string; price: number; currency: string; billing_cycle: 'monthly'|'quarterly'|'yearly'; status: 'active'|'paused'|'cancelled'|'expired'|'past_due'; current_period_start: string; current_period_end: string; cancel_at?: string; }
export interface GEI2PMarketplaceSubscriptionLog extends BaseEntity { subscription_id: string; event_type: 'created'|'renewed'|'paused'|'resumed'|'cancelled'|'payment_failed'; details: Record<string,unknown>; timestamp: string; }
export interface GEI2PMarketplaceLicense extends BaseEntity { product_id: string; buyer_did: string; license_key: string; license_type: 'personal'|'institutional'|'site'|'enterprise'; max_users: number; current_users: number; expires_at?: string; status: 'active'|'expired'|'revoked'|'suspended'; }
export interface GEI2PMarketplaceLicenseActivation extends BaseEntity { license_id: string; device_id: string; device_name: string; activated_at: string; ip_address: string; }
export interface GEI2PMarketplaceSeller extends BaseEntity { user_did: string; store_name: string; description: string; logo_url?: string; website?: string; rating: number; total_sales: number; total_revenue: number; verified: boolean; status: 'active'|'suspended'|'pending_review'; joined_at: string; }
export interface GEI2PMarketplaceSellerPayout extends BaseEntity { seller_id: string; amount: number; currency: string; period_start: string; period_end: string; status: 'pending'|'processing'|'completed'|'failed'; processed_at?: string; }
export interface GEI2PMarketplaceCategory extends BaseEntity { name: string; slug: string; description: string; parent_id?: string; icon_url?: string; product_count: number; sort_order: number; }
export interface GEI2PMarketplaceTag extends BaseEntity { name: string; slug: string; product_count: number; }
export interface GEI2PMarketplaceWishlist extends BaseEntity { user_did: string; product_id: string; added_at: string; }
export interface GEI2PMarketplaceCart extends BaseEntity { user_did: string; product_id: string; quantity: number; added_at: string; }
export interface GEI2PMarketplaceSearchLog extends BaseEntity { user_did: string; query: string; filters: Record<string,unknown>; results_count: number; clicked_product_id?: string; searched_at: string; }
export interface GEI2PMarketplaceRecommendation extends BaseEntity { user_did: string; product_id: string; score: number; reason: string; algorithm: string; generated_at: string; }
export interface GEI2PMarketplaceAnalytics extends BaseEntity { seller_id: string; metric: string; value: number; dimension: Record<string,string>; period: string; calculated_at: string; }
export interface GEI2PMarketplaceAlert extends BaseEntity { seller_id: string; alert_type: 'low_stock'| 'refund_request'| 'negative_review'| 'policy_violation'| 'payout_issue'; severity: 'low'|'medium'|'high'|'critical'; title: string; message: string; resolved: boolean; resolved_at?: string; }
export interface GEI2PMarketplaceNotification extends BaseEntity { recipient_did: string; type: 'order'| 'payment'| 'review'| 'subscription'| 'promotion'| 'system'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PMarketplacePromotion extends BaseEntity { name: string; description: string; discount_type: 'percentage'|'fixed'|'buy_one_get_one'|'free_trial'; discount_value: number; min_order_amount?: number; product_ids?: string[]; category_ids?: string[]; start_date: string; end_date: string; max_uses?: number; current_uses: number; status: 'active'|'inactive'|'expired'; }
export interface GEI2PMarketplacePromotionUsage extends BaseEntity { promotion_id: string; user_did: string; order_id: string; discount_amount: number; used_at: string; }
export interface GEI2PMarketplaceContentDelivery extends BaseEntity { order_id: string; product_id: string; buyer_did: string; delivery_method: 'download'|'email'|'api'|'streaming'; file_url?: string; access_token?: string; expires_at?: string; download_count: number; max_downloads: number; status: 'pending'|'delivered'|'expired'|'revoked'; }
export interface GEI2PMarketplaceSupportTicket extends BaseEntity { buyer_did: string; seller_did?: string; product_id?: string; order_id?: string; subject: string; description: string; priority: 'low'|'medium'|'high'|'urgent'; status: 'open'|'in_progress'|'waiting'|'resolved'|'closed'; assigned_to?: string; created_at: string; resolved_at?: string; }
export interface GEI2PMarketplaceSupportMessage extends BaseEntity { ticket_id: string; author_did: string; content: string; attachments: string[]; created_at: string; }
export interface GEI2PMarketplaceAuditLog extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_did: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface GEI2PMarketplaceCompliance extends BaseEntity { product_id: string; regulation: string; status: 'compliant'|'non_compliant'|'pending_review'; checked_at: string; details: Record<string,unknown>; }
export interface GEI2PMarketplaceBackup extends BaseEntity { entity_type: string; entity_id: string; backup_type: 'full'|'incremental'; file_url: string; checksum: string; created_at_backup: string; expires_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P10_TABLE_NAMES: Record<string, string> = {
  GEI2PMarketplaceProduct: 'gei2p_marketplace_products',
  GEI2PMarketplaceProductVersion: 'gei2p_marketplace_product_versions',
  GEI2PMarketplaceProductReview: 'gei2p_marketplace_product_reviews',
  GEI2PMarketplaceProductMedia: 'gei2p_marketplace_product_media',
  GEI2PMarketplaceOrder: 'gei2p_marketplace_orders',
  GEI2PMarketplacePayment: 'gei2p_marketplace_payments',
  GEI2PMarketplaceRefund: 'gei2p_marketplace_refunds',
  GEI2PMarketplaceSubscription: 'gei2p_marketplace_subscriptions',
  GEI2PMarketplaceSubscriptionLog: 'gei2p_marketplace_subscription_logs',
  GEI2PMarketplaceLicense: 'gei2p_marketplace_licenses',
  GEI2PMarketplaceLicenseActivation: 'gei2p_marketplace_license_activations',
  GEI2PMarketplaceSeller: 'gei2p_marketplace_sellers',
  GEI2PMarketplaceSellerPayout: 'gei2p_marketplace_seller_payouts',
  GEI2PMarketplaceCategory: 'gei2p_marketplace_categories',
  GEI2PMarketplaceTag: 'gei2p_marketplace_tags',
  GEI2PMarketplaceWishlist: 'gei2p_marketplace_wishlists',
  GEI2PMarketplaceCart: 'gei2p_marketplace_carts',
  GEI2PMarketplaceSearchLog: 'gei2p_marketplace_search_logs',
  GEI2PMarketplaceRecommendation: 'gei2p_marketplace_recommendations',
  GEI2PMarketplaceAnalytics: 'gei2p_marketplace_analytics',
  GEI2PMarketplaceAlert: 'gei2p_marketplace_alerts',
  GEI2PMarketplaceNotification: 'gei2p_marketplace_notifications',
  GEI2PMarketplacePromotion: 'gei2p_marketplace_promotions',
  GEI2PMarketplacePromotionUsage: 'gei2p_marketplace_promotion_usages',
  GEI2PMarketplaceContentDelivery: 'gei2p_marketplace_content_deliveries',
  GEI2PMarketplaceSupportTicket: 'gei2p_marketplace_support_tickets',
  GEI2PMarketplaceSupportMessage: 'gei2p_marketplace_support_messages',
  GEI2PMarketplaceAuditLog: 'gei2p_marketplace_audit_logs',
  GEI2PMarketplaceCompliance: 'gei2p_marketplace_compliances',
  GEI2PMarketplaceBackup: 'gei2p_marketplace_backups',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P10Repository {
  products: CrudRepository<GEI2PMarketplaceProduct>;
  productVersions: CrudRepository<GEI2PMarketplaceProductVersion>;
  productReviews: CrudRepository<GEI2PMarketplaceProductReview>;
  productMedia: CrudRepository<GEI2PMarketplaceProductMedia>;
  orders: CrudRepository<GEI2PMarketplaceOrder>;
  payments: CrudRepository<GEI2PMarketplacePayment>;
  refunds: CrudRepository<GEI2PMarketplaceRefund>;
  subscriptions: CrudRepository<GEI2PMarketplaceSubscription>;
  subscriptionLogs: CrudRepository<GEI2PMarketplaceSubscriptionLog>;
  licenses: CrudRepository<GEI2PMarketplaceLicense>;
  licenseActivations: CrudRepository<GEI2PMarketplaceLicenseActivation>;
  sellers: CrudRepository<GEI2PMarketplaceSeller>;
  sellerPayouts: CrudRepository<GEI2PMarketplaceSellerPayout>;
  categories: CrudRepository<GEI2PMarketplaceCategory>;
  tags: CrudRepository<GEI2PMarketplaceTag>;
  wishlists: CrudRepository<GEI2PMarketplaceWishlist>;
  carts: CrudRepository<GEI2PMarketplaceCart>;
  searchLogs: CrudRepository<GEI2PMarketplaceSearchLog>;
  recommendations: CrudRepository<GEI2PMarketplaceRecommendation>;
  analytics: CrudRepository<GEI2PMarketplaceAnalytics>;
  alerts: CrudRepository<GEI2PMarketplaceAlert>;
  notifications: CrudRepository<GEI2PMarketplaceNotification>;
  promotions: CrudRepository<GEI2PMarketplacePromotion>;
  promotionUsages: CrudRepository<GEI2PMarketplacePromotionUsage>;
  contentDeliveries: CrudRepository<GEI2PMarketplaceContentDelivery>;
  supportTickets: CrudRepository<GEI2PMarketplaceSupportTicket>;
  supportMessages: CrudRepository<GEI2PMarketplaceSupportMessage>;
  auditLogs: CrudRepository<GEI2PMarketplaceAuditLog>;
  compliances: CrudRepository<GEI2PMarketplaceCompliance>;
  backups: CrudRepository<GEI2PMarketplaceBackup>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P10Repository(supabase: SupabaseClient): GEI2P10Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    products: crud<GEI2PMarketplaceProduct>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceProduct),
    productVersions: crud<GEI2PMarketplaceProductVersion>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceProductVersion),
    productReviews: crud<GEI2PMarketplaceProductReview>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceProductReview),
    productMedia: crud<GEI2PMarketplaceProductMedia>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceProductMedia),
    orders: crud<GEI2PMarketplaceOrder>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceOrder),
    payments: crud<GEI2PMarketplacePayment>(GEI2P10_TABLE_NAMES.GEI2PMarketplacePayment),
    refunds: crud<GEI2PMarketplaceRefund>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceRefund),
    subscriptions: crud<GEI2PMarketplaceSubscription>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceSubscription),
    subscriptionLogs: crud<GEI2PMarketplaceSubscriptionLog>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceSubscriptionLog),
    licenses: crud<GEI2PMarketplaceLicense>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceLicense),
    licenseActivations: crud<GEI2PMarketplaceLicenseActivation>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceLicenseActivation),
    sellers: crud<GEI2PMarketplaceSeller>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceSeller),
    sellerPayouts: crud<GEI2PMarketplaceSellerPayout>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceSellerPayout),
    categories: crud<GEI2PMarketplaceCategory>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceCategory),
    tags: crud<GEI2PMarketplaceTag>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceTag),
    wishlists: crud<GEI2PMarketplaceWishlist>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceWishlist),
    carts: crud<GEI2PMarketplaceCart>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceCart),
    searchLogs: crud<GEI2PMarketplaceSearchLog>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceSearchLog),
    recommendations: crud<GEI2PMarketplaceRecommendation>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceRecommendation),
    analytics: crud<GEI2PMarketplaceAnalytics>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceAnalytics),
    alerts: crud<GEI2PMarketplaceAlert>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceAlert),
    notifications: crud<GEI2PMarketplaceNotification>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceNotification),
    promotions: crud<GEI2PMarketplacePromotion>(GEI2P10_TABLE_NAMES.GEI2PMarketplacePromotion),
    promotionUsages: crud<GEI2PMarketplacePromotionUsage>(GEI2P10_TABLE_NAMES.GEI2PMarketplacePromotionUsage),
    contentDeliveries: crud<GEI2PMarketplaceContentDelivery>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceContentDelivery),
    supportTickets: crud<GEI2PMarketplaceSupportTicket>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceSupportTicket),
    supportMessages: crud<GEI2PMarketplaceSupportMessage>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceSupportMessage),
    auditLogs: crud<GEI2PMarketplaceAuditLog>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceAuditLog),
    compliances: crud<GEI2PMarketplaceCompliance>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceCompliance),
    backups: crud<GEI2PMarketplaceBackup>(GEI2P10_TABLE_NAMES.GEI2PMarketplaceBackup),
  };
}
