import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-15: Multi-Currency — Exchange Rates, Currency Management, Conversion
// ============================================================================

export interface GEFICurrency extends BaseEntity { code: string; name: string; symbol: string; decimal_places: number; is_active: boolean; is_base_currency: boolean; country_code: string; region: string; metadata: Record<string,unknown>; }
export interface GEFIExchangeRate extends BaseEntity { from_currency: string; to_currency: string; rate: number; inverse_rate: number; type: 'SPOT'|'FORWARD'|'FIXED'|'MOBILE'|'PARALLEL'|'CENTRAL_BANK'; source: string; effective_date: string; expiry_date?: string; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIExchangeRateHistory extends BaseEntity { from_currency: string; to_currency: string; rate: number; type: string; source: string; recorded_at: string; metadata: Record<string,unknown>; }
export interface GEFICurrencyPair extends BaseEntity { base_currency: string; quote_currency: string; pip_value: number; spread: number; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFICurrencyConversion extends BaseEntity { from_currency: string; to_currency: string; from_amount: number; to_amount: number; rate: number; fee: number; net_amount: number; conversion_date: string; reference: string; status: 'COMPLETED'|'PENDING'|'FAILED'; metadata: Record<string,unknown>; }
export interface GEFICurrencyWallet extends BaseEntity { user_id: string; currency_code: string; balance: number; locked_balance: number; is_default: boolean; status: 'ACTIVE'|'FROZEN'|'CLOSED'; metadata: Record<string,unknown>; }
export interface GEFICurrencyWalletTransaction extends BaseEntity { wallet_id: string; type: 'CREDIT'|'DEBIT'|'CONVERSION'|'TRANSFER'; amount: number; balance_after: number; currency_code: string; reference: string; description: string; status: 'PENDING'|'COMPLETED'|'FAILED'; metadata: Record<string,unknown>; }
export interface GEFIFXOrder extends BaseEntity { user_id: string; from_currency: string; to_currency: string; from_amount: number; to_amount: number; rate: number; rate_type: string; status: 'PENDING'|'EXECUTED'|'CANCELLED'|'EXPIRED'; executed_at?: string; expires_at: string; metadata: Record<string,unknown>; }
export interface GEFIFXAlert extends BaseEntity { user_id: string; from_currency: string; to_currency: string; target_rate: number; current_rate: number; direction: 'ABOVE'|'BELOW'; status: 'ACTIVE'|'TRIGGERED'|'CANCELLED'; triggered_at?: string; metadata: Record<string,unknown>; }
export interface GEFICurrencyRateProvider extends BaseEntity { name: string; api_url: string; api_key_encrypted: string; frequency: string; last_sync: string; status: 'ACTIVE'|'INACTIVE'|'ERROR'; error_count: number; metadata: Record<string,unknown>; }
export interface GEFICurrencyRateSyncLog extends BaseEntity { provider_id: string; pairs_synced: number; success_count: number; error_count: number; started_at: string; completed_at?: string; status: 'RUNNING'|'COMPLETED'|'FAILED'; error_message?: string; metadata: Record<string,unknown>; }
export interface GEFICurrencyRevaluation extends BaseEntity { account_id: string; currency_code: string; balance: number; old_rate: number; new_rate: number; unrealized_gain: number; unrealized_loss: number; revaluation_date: string; status: 'PENDING'|'COMPLETED'|'REVERSED'; metadata: Record<string,unknown>; }
export interface GEFICurrencyHedge extends BaseEntity { user_id: string; from_currency: string; to_currency: string; amount: number; hedge_rate: number; market_rate: number; hedge_type: 'FORWARD'|'OPTION'|'SWAP'; entry_date: string; maturity_date: string; status: 'ACTIVE'|'EXERCISED'|'EXPIRED'|'CANCELLED'; pnl: number; metadata: Record<string,unknown>; }
export interface GEFICountryCurrencyMapping extends BaseEntity { country_code: string; currency_code: string; is_primary: boolean; effective_date: string; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIPriceList extends BaseEntity { name: string; currency_code: string; type: 'TUITION'|'FEES'|'SERVICES'|'PRODUCTS'; effective_date: string; expiry_date: string; status: 'ACTIVE'|'INACTIVE'|'EXPIRED'; metadata: Record<string,unknown>; }
export interface GEFIPriceListItem extends BaseEntity { price_list_id: string; item_code: string; description: string; unit_price: number; tax_included: boolean; tax_rate: number; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFICurrencyAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI15Repository {
  currency: CrudRepository<GEFICurrency>;
  exchangeRate: CrudRepository<GEFIExchangeRate>;
  exchangeRateHistory: CrudRepository<GEFIExchangeRateHistory>;
  currencyPair: CrudRepository<GEFICurrencyPair>;
  currencyConversion: CrudRepository<GEFICurrencyConversion>;
  currencyWallet: CrudRepository<GEFICurrencyWallet>;
  currencyWalletTransaction: CrudRepository<GEFICurrencyWalletTransaction>;
  fxOrder: CrudRepository<GEFIFXOrder>;
  fxAlert: CrudRepository<GEFIFXAlert>;
  currencyRateProvider: CrudRepository<GEFICurrencyRateProvider>;
  currencyRateSyncLog: CrudRepository<GEFICurrencyRateSyncLog>;
  currencyRevaluation: CrudRepository<GEFICurrencyRevaluation>;
  currencyHedge: CrudRepository<GEFICurrencyHedge>;
  countryCurrencyMapping: CrudRepository<GEFICountryCurrencyMapping>;
  priceList: CrudRepository<GEFIPriceList>;
  priceListItem: CrudRepository<GEFIPriceListItem>;
  currencyAuditTrail: CrudRepository<GEFICurrencyAuditTrail>;
}

export function createGEFI15Repository(supabase: SupabaseClient): GEFI15Repository {
  return {
    currency: createCrudRepository<GEFICurrency>(supabase, 'gefi_currencies'),
    exchangeRate: createCrudRepository<GEFIExchangeRate>(supabase, 'gefi_exchange_rates'),
    exchangeRateHistory: createCrudRepository<GEFIExchangeRateHistory>(supabase, 'gefi_exchange_rate_history'),
    currencyPair: createCrudRepository<GEFICurrencyPair>(supabase, 'gefi_currency_pairs'),
    currencyConversion: createCrudRepository<GEFICurrencyConversion>(supabase, 'gefi_currency_conversions'),
    currencyWallet: createCrudRepository<GEFICurrencyWallet>(supabase, 'gefi_currency_wallets'),
    currencyWalletTransaction: createCrudRepository<GEFICurrencyWalletTransaction>(supabase, 'gefi_currency_wallet_transactions'),
    fxOrder: createCrudRepository<GEFIFXOrder>(supabase, 'gefi_fx_orders'),
    fxAlert: createCrudRepository<GEFIFXAlert>(supabase, 'gefi_fx_alerts'),
    currencyRateProvider: createCrudRepository<GEFICurrencyRateProvider>(supabase, 'gefi_currency_rate_providers'),
    currencyRateSyncLog: createCrudRepository<GEFICurrencyRateSyncLog>(supabase, 'gefi_currency_rate_sync_logs'),
    currencyRevaluation: createCrudRepository<GEFICurrencyRevaluation>(supabase, 'gefi_currency_revaluations'),
    currencyHedge: createCrudRepository<GEFICurrencyHedge>(supabase, 'gefi_currency_hedges'),
    countryCurrencyMapping: createCrudRepository<GEFICountryCurrencyMapping>(supabase, 'gefi_country_currency_mappings'),
    priceList: createCrudRepository<GEFIPriceList>(supabase, 'gefi_price_lists'),
    priceListItem: createCrudRepository<GEFIPriceListItem>(supabase, 'gefi_price_list_items'),
    currencyAuditTrail: createCrudRepository<GEFICurrencyAuditTrail>(supabase, 'gefi_currency_audit_trails'),
  };
}
