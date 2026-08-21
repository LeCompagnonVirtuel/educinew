import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-10: Crowdfunding — Campaigns, Donations, Rewards, Impact Tracking
// ============================================================================

export interface GEFICrowdCampaign extends BaseEntity { title: string; description: string; story: string; goal_amount: number; raised_amount: number; donor_count: number; category: 'INFRASTRUCTURE'|'SCHOLARSHIPS'|'TECHNOLOGY'|'LIBRARY'|'SPORTS'|'ARTS'|'RESEARCH'|'COMMUNITY'; media_urls: string[]; video_url?: string; end_date: string; status: 'DRAFT'|'ACTIVE'|'PAUSED'|'COMPLETED'|'FAILED'|'CANCELLED'; creator_id: string; metadata: Record<string,unknown>; }
export interface GEFICrowdCampaignUpdate extends BaseEntity { campaign_id: string; title: string; content: string; media_urls: string[]; published_at: string; metadata: Record<string,unknown>; }
export interface GEFICrowdDonation extends BaseEntity { campaign_id: string; donor_id?: string; donor_name: string; donor_email?: string; amount: number; currency_code: string; message?: string; is_anonymous: boolean; payment_method: string; transaction_id?: string; status: 'PENDING'|'COMPLETED'|'FAILED'|'REFUNDED'; completed_at?: string; metadata: Record<string,unknown>; }
export interface GEFICrowdRecurring extends BaseEntity { campaign_id: string; donor_id: string; amount: number; frequency: 'WEEKLY'|'MONTHLY'|'QUARTERLY'|'ANNUAL'; start_date: string; end_date?: string; total_donated: number; next_charge_date: string; status: 'ACTIVE'|'PAUSED'|'CANCELLED'|'COMPLETED'; metadata: Record<string,unknown>; }
export interface GEFICrowdReward extends BaseEntity { campaign_id: string; title: string; description: string; amount: number; quantity_available: number; quantity_claimed: number; estimated_delivery: string; shipping_required: boolean; shipping_cost: number; status: 'ACTIVE'|'SOLD_OUT'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFICrowdRewardClaim extends BaseEntity { reward_id: string; donation_id: string; donor_id: string; shipping_address?: Record<string,unknown>; status: 'PENDING'|'FULFILLED'|'SHIPPED'|'DELIVERED'; fulfilled_at?: string; tracking_number?: string; metadata: Record<string,unknown>; }
export interface GEFICrowdShare extends BaseEntity { campaign_id: string; user_id: string; platform: 'FACEBOOK'|'TWITTER'|'LINKEDIN'|'WHATSAPP'|'EMAIL'|'OTHER'; shared_at: string; clicks: number; donations_generated: number; metadata: Record<string,unknown>; }
export interface GEFICrowdComment extends BaseEntity { campaign_id: string; user_id?: string; user_name: string; content: string; parent_id?: string; status: 'VISIBLE'|'HIDDEN'|'DELETED'; created_at: string; metadata: Record<string,unknown>; }
export interface GEFICrowdMilestone extends BaseEntity { campaign_id: string; name: string; description: string; target_amount: number; reached_amount: number; reached_at?: string; reward_unlocked?: string; status: 'PENDING'|'REACHED'|'MISSED'; metadata: Record<string,unknown>; }
export interface GEFICrowdRefund extends BaseEntity { donation_id: string; amount: number; reason: string; status: 'PENDING'|'APPROVED'|'COMPLETED'|'REJECTED'; requested_at: string; processed_at?: string; processed_by?: string; metadata: Record<string,unknown>; }
export interface GEFICrowdTaxReceipt extends BaseEntity { donation_id: string; receipt_number: string; amount: number; currency_code: string; donor_name: string; donor_address: string; issued_date: string; fiscal_year: string; pdf_url?: string; status: 'ISSUED'|'VOIDED'; metadata: Record<string,unknown>; }
export interface GEFICrowdImpact extends BaseEntity { campaign_id: string; metric_name: string; metric_value: number; target_value: number; unit: string; period: string; description: string; verified: boolean; verified_by?: string; verified_at?: string; metadata: Record<string,unknown>; }
export interface GEFICrowdImpactStory extends BaseEntity { campaign_id: string; title: string; content: string; media_urls: string[]; beneficiary_name?: string; published_at: string; metadata: Record<string,unknown>; }
export interface GEFICrowdTeamMember extends BaseEntity { campaign_id: string; user_id: string; role: 'CREATOR'|'ADMIN'|'EDITOR'|'VIEWER'; joined_at: string; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFICrowdEndorsement extends BaseEntity { campaign_id: string; endorser_name: string; endorser_title?: string; endorser_organization?: string; quote: string; photo_url?: string; status: 'PENDING'|'APPROVED'|'REJECTED'; metadata: Record<string,unknown>; }
export interface GEFICrowdAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI10Repository {
  crowdCampaign: CrudRepository<GEFICrowdCampaign>;
  crowdCampaignUpdate: CrudRepository<GEFICrowdCampaignUpdate>;
  crowdDonation: CrudRepository<GEFICrowdDonation>;
  crowdRecurring: CrudRepository<GEFICrowdRecurring>;
  crowdReward: CrudRepository<GEFICrowdReward>;
  crowdRewardClaim: CrudRepository<GEFICrowdRewardClaim>;
  crowdShare: CrudRepository<GEFICrowdShare>;
  crowdComment: CrudRepository<GEFICrowdComment>;
  crowdMilestone: CrudRepository<GEFICrowdMilestone>;
  crowdRefund: CrudRepository<GEFICrowdRefund>;
  crowdTaxReceipt: CrudRepository<GEFICrowdTaxReceipt>;
  crowdImpact: CrudRepository<GEFICrowdImpact>;
  crowdImpactStory: CrudRepository<GEFICrowdImpactStory>;
  crowdTeamMember: CrudRepository<GEFICrowdTeamMember>;
  crowdEndorsement: CrudRepository<GEFICrowdEndorsement>;
  crowdAuditTrail: CrudRepository<GEFICrowdAuditTrail>;
}

export function createGEFI10Repository(supabase: SupabaseClient): GEFI10Repository {
  return {
    crowdCampaign: createCrudRepository<GEFICrowdCampaign>(supabase, 'gefi_crowd_campaigns'),
    crowdCampaignUpdate: createCrudRepository<GEFICrowdCampaignUpdate>(supabase, 'gefi_crowd_campaign_updates'),
    crowdDonation: createCrudRepository<GEFICrowdDonation>(supabase, 'gefi_crowd_donations'),
    crowdRecurring: createCrudRepository<GEFICrowdRecurring>(supabase, 'gefi_crowd_recurring'),
    crowdReward: createCrudRepository<GEFICrowdReward>(supabase, 'gefi_crowd_rewards'),
    crowdRewardClaim: createCrudRepository<GEFICrowdRewardClaim>(supabase, 'gefi_crowd_reward_claims'),
    crowdShare: createCrudRepository<GEFICrowdShare>(supabase, 'gefi_crowd_shares'),
    crowdComment: createCrudRepository<GEFICrowdComment>(supabase, 'gefi_crowd_comments'),
    crowdMilestone: createCrudRepository<GEFICrowdMilestone>(supabase, 'gefi_crowd_milestones'),
    crowdRefund: createCrudRepository<GEFICrowdRefund>(supabase, 'gefi_crowd_refunds'),
    crowdTaxReceipt: createCrudRepository<GEFICrowdTaxReceipt>(supabase, 'gefi_crowd_tax_receipts'),
    crowdImpact: createCrudRepository<GEFICrowdImpact>(supabase, 'gefi_crowd_impacts'),
    crowdImpactStory: createCrudRepository<GEFICrowdImpactStory>(supabase, 'gefi_crowd_impact_stories'),
    crowdTeamMember: createCrudRepository<GEFICrowdTeamMember>(supabase, 'gefi_crowd_team_members'),
    crowdEndorsement: createCrudRepository<GEFICrowdEndorsement>(supabase, 'gefi_crowd_endorsements'),
    crowdAuditTrail: createCrudRepository<GEFICrowdAuditTrail>(supabase, 'gefi_crowd_audit_trails'),
  };
}
