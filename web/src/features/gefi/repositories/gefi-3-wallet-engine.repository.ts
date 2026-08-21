import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-3: Wallet Engine — Digital Wallets, Transactions, Virtual Cards
// ============================================================================

export interface GEFIWallet extends BaseEntity { user_id: string; name: string; type: 'PRIMARY'|'SAVINGS'|'ESCROW'|'BUDGET'|'TRAVEL'|'BUSINESS'; currency_code: string; balance: number; available_balance: number; locked_balance: number; status: 'ACTIVE'|'FROZEN'|'CLOSED'|'PENDING'; pin_hash?: string; daily_limit: number; monthly_limit: number; metadata: Record<string,unknown>; }
export interface GEFIWalletTransaction extends BaseEntity { wallet_id: string; type: 'CREDIT'|'DEBIT'|'TRANSFER'|'REFUND'|'FEE'|'ADJUSTMENT'|'HOLD'|'RELEASE'; amount: number; balance_after: number; currency_code: string; reference: string; description: string; category?: string; counterparty_wallet_id?: string; status: 'PENDING'|'COMPLETED'|'FAILED'|'REVERSED'; metadata: Record<string,unknown>; }
export interface GEFIWalletTransfer extends BaseEntity { from_wallet_id: string; to_wallet_id: string; amount: number; fee_amount: number; net_amount: number; currency_code: string; description: string; status: 'PENDING'|'COMPLETED'|'FAILED'|'REVERSED'; completed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIWalletHold extends BaseEntity { wallet_id: string; amount: number; reason: string; reference_type?: string; reference_id?: string; status: 'ACTIVE'|'RELEASED'|'EXPIRED'; expires_at: string; released_at?: string; metadata: Record<string,unknown>; }
export interface GEFIWalletLimit extends BaseEntity { wallet_id: string; limit_type: 'DAILY'|'WEEKLY'|'MONTHLY'|'YEARLY'|'TRANSACTION'; amount: number; spent: number; remaining: number; period_start: string; period_end: string; metadata: Record<string,unknown>; }
export interface GEFIWalletVirtualCard extends BaseEntity { wallet_id: string; card_number_hash: string; last_four: string; brand: string; expiry_month: number; expiry_year: number; status: 'ACTIVE'|'FROZEN'|'CLOSED'|'EXPIRED'; single_use: boolean; max_amount?: number; spent_amount: number; metadata: Record<string,unknown>; }
export interface GEFIWalletVirtualCardTransaction extends BaseEntity { card_id: string; amount: number; currency_code: string; merchant_name: string; merchant_category: string; status: 'APPROVED'|'DECLINED'|'PENDING'; decline_reason?: string; metadata: Record<string,unknown>; }
export interface GEFIWalletTopUp extends BaseEntity { wallet_id: string; amount: number; method: 'BANK_TRANSFER'|'MOBILE_MONEY'|'CARD'|'CASH'; status: 'PENDING'|'COMPLETED'|'FAILED'; reference: string; completed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIWalletWithdrawal extends BaseEntity { wallet_id: string; amount: number; method: 'BANK_TRANSFER'|'MOBILE_MONEY'|'CASH'; destination: string; fee_amount: number; net_amount: number; status: 'PENDING'|'PROCESSING'|'COMPLETED'|'FAILED'; completed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIWalletSubscription extends BaseEntity { wallet_id: string; name: string; amount: number; frequency: 'WEEKLY'|'MONTHLY'|'QUARTERLY'|'ANNUAL'; next_charge_date: string; status: 'ACTIVE'|'PAUSED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIWalletGoal extends BaseEntity { wallet_id: string; name: string; target_amount: number; current_amount: number; deadline?: string; auto_contribute: boolean; contribute_amount?: number; contribute_frequency?: string; status: 'ACTIVE'|'COMPLETED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFISplitGroup extends BaseEntity { name: string; description?: string; creator_id: string; total_amount: number; currency_code: string; status: 'ACTIVE'|'SETTLED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFISplitParticipant extends BaseEntity { group_id: string; user_id: string; amount: number; paid_amount: number; status: 'PENDING'|'PAID'|'SETTLED'; metadata: Record<string,unknown>; }
export interface GEFISplitPayment extends BaseEntity { group_id: string; payer_id: string; amount: number; method: 'WALLET'|'BANK_TRANSFER'|'MOBILE_MONEY'; status: 'PENDING'|'COMPLETED'|'FAILED'; transaction_id?: string; metadata: Record<string,unknown>; }
export interface GEFIVoucher extends BaseEntity { code: string; amount: number; currency_code: string; issued_to?: string; issued_by: string; type: 'FIXED'|'PERCENTAGE'; max_uses: number; current_uses: number; expires_at?: string; status: 'ACTIVE'|'USED'|'EXPIRED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIVoucherRedemption extends BaseEntity { voucher_id: string; user_id: string; wallet_id: string; amount: number; redeemed_at: string; metadata: Record<string,unknown>; }
export interface GEFICashback extends BaseEntity { user_id: string; transaction_id: string; amount: number; percentage: number; status: 'PENDING'|'APPLIED'|'EXPIRED'; expires_at: string; metadata: Record<string,unknown>; }
export interface GEFIReferral extends BaseEntity { referrer_id: string; referred_id: string; code: string; bonus_amount: number; status: 'PENDING'|'QUALIFIED'|'PAID'|'EXPIRED'; qualified_at?: string; paid_at?: string; metadata: Record<string,unknown>; }
export interface GEFILoyaltyPoint extends BaseEntity { user_id: string; points: number; type: 'EARNED'|'REDEEMED'|'EXPIRED'|'ADJUSTED'; reference_type?: string; reference_id?: string; expires_at?: string; metadata: Record<string,unknown>; }
export interface GEFILoyaltyTier extends BaseEntity { name: string; min_points: number; max_points: number; benefits: Record<string,unknown>; multiplier: number; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIPaymentRequest extends BaseEntity { from_user_id: string; to_user_id: string; amount: number; currency_code: string; description: string; status: 'PENDING'|'ACCEPTED'|'DECLINED'|'EXPIRED'|'CANCELLED'; expires_at: string; metadata: Record<string,unknown>; }
export interface GEFIScheduledPayment extends BaseEntity { payer_wallet_id: string; payee_wallet_id: string; amount: number; currency_code: string; frequency: 'WEEKLY'|'BIWEEKLY'|'MONTHLY'|'QUARTERLY'|'ANNUAL'; next_payment_date: string; total_payments: number; completed_payments: number; status: 'ACTIVE'|'PAUSED'|'COMPLETED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIAutoSave extends BaseEntity { wallet_id: string; type: 'ROUND_UP'|'PERCENTAGE'|'FIXED'|'ACCELERATOR'; amount?: number; percentage?: number; frequency: 'DAILY'|'WEEKLY'|'MONTHLY'; savings_wallet_id: string; status: 'ACTIVE'|'PAUSED'|'CANCELLED'; total_saved: number; metadata: Record<string,unknown>; }
export interface GEFIPortfolio extends BaseEntity { user_id: string; name: string; total_value: number; total_invested: number; total_return: number; return_percentage: number; status: 'ACTIVE'|'FROZEN'|'CLOSED'; metadata: Record<string,unknown>; }
export interface GEFIPortfolioHolding extends BaseEntity { portfolio_id: string; asset_type: string; asset_name: string; quantity: number; avg_buy_price: number; current_price: number; market_value: number; unrealized_pnl: number; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; user_agent?: string; metadata: Record<string,unknown>; }

export interface GEFI3Repository {
  wallet: CrudRepository<GEFIWallet>;
  walletTransaction: CrudRepository<GEFIWalletTransaction>;
  walletTransfer: CrudRepository<GEFIWalletTransfer>;
  walletHold: CrudRepository<GEFIWalletHold>;
  walletLimit: CrudRepository<GEFIWalletLimit>;
  walletVirtualCard: CrudRepository<GEFIWalletVirtualCard>;
  walletVirtualCardTransaction: CrudRepository<GEFIWalletVirtualCardTransaction>;
  walletTopUp: CrudRepository<GEFIWalletTopUp>;
  walletWithdrawal: CrudRepository<GEFIWalletWithdrawal>;
  walletSubscription: CrudRepository<GEFIWalletSubscription>;
  walletGoal: CrudRepository<GEFIWalletGoal>;
  splitGroup: CrudRepository<GEFISplitGroup>;
  splitParticipant: CrudRepository<GEFISplitParticipant>;
  splitPayment: CrudRepository<GEFISplitPayment>;
  voucher: CrudRepository<GEFIVoucher>;
  voucherRedemption: CrudRepository<GEFIVoucherRedemption>;
  cashback: CrudRepository<GEFICashback>;
  referral: CrudRepository<GEFIReferral>;
  loyaltyPoint: CrudRepository<GEFILoyaltyPoint>;
  loyaltyTier: CrudRepository<GEFILoyaltyTier>;
  paymentRequest: CrudRepository<GEFIPaymentRequest>;
  scheduledPayment: CrudRepository<GEFIScheduledPayment>;
  autoSave: CrudRepository<GEFIAutoSave>;
  portfolio: CrudRepository<GEFIPortfolio>;
  portfolioHolding: CrudRepository<GEFIPortfolioHolding>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI3Repository(supabase: SupabaseClient): GEFI3Repository {
  return {
    wallet: createCrudRepository<GEFIWallet>(supabase, 'gefi_wallets'),
    walletTransaction: createCrudRepository<GEFIWalletTransaction>(supabase, 'gefi_wallet_transactions'),
    walletTransfer: createCrudRepository<GEFIWalletTransfer>(supabase, 'gefi_wallet_transfers'),
    walletHold: createCrudRepository<GEFIWalletHold>(supabase, 'gefi_wallet_holds'),
    walletLimit: createCrudRepository<GEFIWalletLimit>(supabase, 'gefi_wallet_limits'),
    walletVirtualCard: createCrudRepository<GEFIWalletVirtualCard>(supabase, 'gefi_wallet_virtual_cards'),
    walletVirtualCardTransaction: createCrudRepository<GEFIWalletVirtualCardTransaction>(supabase, 'gefi_wallet_virtual_card_transactions'),
    walletTopUp: createCrudRepository<GEFIWalletTopUp>(supabase, 'gefi_wallet_top_ups'),
    walletWithdrawal: createCrudRepository<GEFIWalletWithdrawal>(supabase, 'gefi_wallet_withdrawals'),
    walletSubscription: createCrudRepository<GEFIWalletSubscription>(supabase, 'gefi_wallet_subscriptions'),
    walletGoal: createCrudRepository<GEFIWalletGoal>(supabase, 'gefi_wallet_goals'),
    splitGroup: createCrudRepository<GEFISplitGroup>(supabase, 'gefi_split_groups'),
    splitParticipant: createCrudRepository<GEFISplitParticipant>(supabase, 'gefi_split_participants'),
    splitPayment: createCrudRepository<GEFISplitPayment>(supabase, 'gefi_split_payments'),
    voucher: createCrudRepository<GEFIVoucher>(supabase, 'gefi_vouchers'),
    voucherRedemption: createCrudRepository<GEFIVoucherRedemption>(supabase, 'gefi_voucher_redemptions'),
    cashback: createCrudRepository<GEFICashback>(supabase, 'gefi_cashbacks'),
    referral: createCrudRepository<GEFIReferral>(supabase, 'gefi_referrals'),
    loyaltyPoint: createCrudRepository<GEFILoyaltyPoint>(supabase, 'gefi_loyalty_points'),
    loyaltyTier: createCrudRepository<GEFILoyaltyTier>(supabase, 'gefi_loyalty_tiers'),
    paymentRequest: createCrudRepository<GEFIPaymentRequest>(supabase, 'gefi_payment_requests'),
    scheduledPayment: createCrudRepository<GEFIScheduledPayment>(supabase, 'gefi_scheduled_payments'),
    autoSave: createCrudRepository<GEFIAutoSave>(supabase, 'gefi_auto_saves'),
    portfolio: createCrudRepository<GEFIPortfolio>(supabase, 'gefi_portfolios'),
    portfolioHolding: createCrudRepository<GEFIPortfolioHolding>(supabase, 'gefi_portfolio_holdings'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_wallet_audit_trails'),
  };
}
