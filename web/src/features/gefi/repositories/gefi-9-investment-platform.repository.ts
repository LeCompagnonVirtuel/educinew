import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-9: Investment Platform — Endowments, Portfolios, Performance
// ============================================================================

export interface GEFIEndowment extends BaseEntity { name: string; description: string; type: 'PERMANENT'|'TERM'|'QUASI'|'REstricted'|'UNRESTRICTED'; total_value: number; invested_value: number; cash_value: number; currency_code: string; inception_date: string; status: 'ACTIVE'|'FROZEN'|'LIQUIDATED'; metadata: Record<string,unknown>; }
export interface GEFIEndowmentContribution extends BaseEntity { endowment_id: string; donor_name: string; amount: number; currency_code: string; contribution_date: string; type: 'CASH'|'SECURITY'|'REAL_ESTATE'|'IN_KIND'; restricted: boolean; restrictions?: string; status: 'RECEIVED'|'PENDING'|'VERIFIED'; metadata: Record<string,unknown>; }
export interface GEFIEndowmentDistribution extends BaseEntity { endowment_id: string; amount: number; distribution_date: string; purpose: string; spending_rule: 'FIXED'|'PERCENTAGE'|'TOTAL_RETURN'; fiscal_year: string; status: 'APPROVED'|'DISTRIBUTED'|'PENDING'; metadata: Record<string,unknown>; }
export interface GEFIInvestmentPortfolio extends BaseEntity { name: string; type: 'CONSERVATIVE'|'MODERATE'|'AGGRESSIVE'|'BALANCED'|'CUSTOM'; total_value: number; total_cost: number; unrealized_pnl: number; realized_pnl: number; currency_code: string; benchmark_id?: string; status: 'ACTIVE'|'FROZEN'|'CLOSED'; metadata: Record<string,unknown>; }
export interface GEFIInvestmentHolding extends BaseEntity { portfolio_id: string; asset_type: 'STOCK'|'BOND'|'MUTUAL_FUND'|'ETF'|'REAL_ESTATE'|'CASH'|'COMMODITY'|'CRYPTO'; asset_name: string; ticker?: string; quantity: number; avg_cost: number; current_price: number; market_value: number; weight: number; unrealized_pnl: number; last_updated: string; metadata: Record<string,unknown>; }
export interface GEFIInvestmentTransaction extends BaseEntity { portfolio_id: string; type: 'BUY'|'SELL'|'DIVIDEND'|'INTEREST'|'DEPOSIT'|'WITHDRAWAL'; asset_name: string; ticker?: string; quantity: number; price: number; amount: number; fee: number; net_amount: number; executed_date: string; status: 'EXECUTED'|'PENDING'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIInvestmentBenchmark extends BaseEntity { name: string; type: 'INDEX'|'BLENDED'|'CUSTOM'; composition: Record<string,unknown>[]; total_return_ytd: number; total_return_1y: number; total_return_3y: number; total_return_5y: number; volatility: number; sharpe_ratio: number; metadata: Record<string,unknown>; }
export interface GEFIInvestmentPerformance extends BaseEntity { portfolio_id: string; period: string; total_return: number; benchmark_return: number; alpha: number; beta: number; sharpe_ratio: number; sortino_ratio: number; max_drawdown: number; volatility: number; information_ratio: number; calculated_at: string; metadata: Record<string,unknown>; }
export interface GEFIInvestmentRisk extends BaseEntity { portfolio_id: string; var_95: number; var_99: number; cvar_95: number; tracking_error: number; information_ratio: number; beta: number; correlation: number; concentration_risk: number; liquidity_risk: number; calculated_at: string; metadata: Record<string,unknown>; }
export interface GEFIInvestmentPolicy extends BaseEntity { name: string; description: string; asset_allocation: Record<string,unknown>; rebalancing_frequency: string; rebalancing_threshold: number; prohibited_assets: string[]; min_cash_reserve: number; status: 'ACTIVE'|'INACTIVE'; effective_date: string; metadata: Record<string,unknown>; }
export interface GEFIInvestmentRebalance extends BaseEntity { portfolio_id: string; policy_id: string; rebalance_date: string; target_allocation: Record<string,unknown>; current_allocation: Record<string,unknown>; trades: Record<string,unknown>[]; status: 'PLANNED'|'EXECUTED'|'PARTIAL'; executed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIInvestmentReport extends BaseEntity { portfolio_id: string; report_type: 'MONTHLY'|'QUARTERLY'|'ANNUAL'|'AD_HOC'; period: string; performance: Record<string,unknown>; holdings: Record<string,unknown>[]; commentary: string; generated_at: string; status: 'DRAFT'|'FINAL'; metadata: Record<string,unknown>; }
export interface GEFIInvestmentFeeSchedule extends BaseEntity { portfolio_id: string; fee_type: 'MANAGEMENT'|'PERFORMANCE'|'CUSTODIAN'|'AUDIT'|'ADVISORY'; amount: number; percentage?: number; frequency: string; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIInvestmentFeePayment extends BaseEntity { schedule_id: string; amount: number; period: string; payment_date: string; status: 'PAID'|'PENDING'|'OVERDUE'; transaction_id?: string; metadata: Record<string,unknown>; }
export interface GEFIInvestmentCustodian extends BaseEntity { name: string; contact_person: string; email: string; phone: string; address: string; account_numbers: Record<string,unknown>[]; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIInvestmentCustodyAccount extends BaseEntity { custodian_id: string; portfolio_id: string; account_number: string; account_type: string; balance: number; last_reconciled: string; status: 'ACTIVE'|'FROZEN'|'CLOSED'; metadata: Record<string,unknown>; }
export interface GEFIInvestmentAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI9Repository {
  endowment: CrudRepository<GEFIEndowment>;
  endowmentContribution: CrudRepository<GEFIEndowmentContribution>;
  endowmentDistribution: CrudRepository<GEFIEndowmentDistribution>;
  investmentPortfolio: CrudRepository<GEFIInvestmentPortfolio>;
  investmentHolding: CrudRepository<GEFIInvestmentHolding>;
  investmentTransaction: CrudRepository<GEFIInvestmentTransaction>;
  investmentBenchmark: CrudRepository<GEFIInvestmentBenchmark>;
  investmentPerformance: CrudRepository<GEFIInvestmentPerformance>;
  investmentRisk: CrudRepository<GEFIInvestmentRisk>;
  investmentPolicy: CrudRepository<GEFIInvestmentPolicy>;
  investmentRebalance: CrudRepository<GEFIInvestmentRebalance>;
  investmentReport: CrudRepository<GEFIInvestmentReport>;
  investmentFeeSchedule: CrudRepository<GEFIInvestmentFeeSchedule>;
  investmentFeePayment: CrudRepository<GEFIInvestmentFeePayment>;
  investmentCustodian: CrudRepository<GEFIInvestmentCustodian>;
  investmentCustodyAccount: CrudRepository<GEFIInvestmentCustodyAccount>;
  investmentAuditTrail: CrudRepository<GEFIInvestmentAuditTrail>;
}

export function createGEFI9Repository(supabase: SupabaseClient): GEFI9Repository {
  return {
    endowment: createCrudRepository<GEFIEndowment>(supabase, 'gefi_endowments'),
    endowmentContribution: createCrudRepository<GEFIEndowmentContribution>(supabase, 'gefi_endowment_contributions'),
    endowmentDistribution: createCrudRepository<GEFIEndowmentDistribution>(supabase, 'gefi_endowment_distributions'),
    investmentPortfolio: createCrudRepository<GEFIInvestmentPortfolio>(supabase, 'gefi_investment_portfolios'),
    investmentHolding: createCrudRepository<GEFIInvestmentHolding>(supabase, 'gefi_investment_holdings'),
    investmentTransaction: createCrudRepository<GEFIInvestmentTransaction>(supabase, 'gefi_investment_transactions'),
    investmentBenchmark: createCrudRepository<GEFIInvestmentBenchmark>(supabase, 'gefi_investment_benchmarks'),
    investmentPerformance: createCrudRepository<GEFIInvestmentPerformance>(supabase, 'gefi_investment_performances'),
    investmentRisk: createCrudRepository<GEFIInvestmentRisk>(supabase, 'gefi_investment_risks'),
    investmentPolicy: createCrudRepository<GEFIInvestmentPolicy>(supabase, 'gefi_investment_policies'),
    investmentRebalance: createCrudRepository<GEFIInvestmentRebalance>(supabase, 'gefi_investment_rebalances'),
    investmentReport: createCrudRepository<GEFIInvestmentReport>(supabase, 'gefi_investment_reports'),
    investmentFeeSchedule: createCrudRepository<GEFIInvestmentFeeSchedule>(supabase, 'gefi_investment_fee_schedules'),
    investmentFeePayment: createCrudRepository<GEFIInvestmentFeePayment>(supabase, 'gefi_investment_fee_payments'),
    investmentCustodian: createCrudRepository<GEFIInvestmentCustodian>(supabase, 'gefi_investment_custodians'),
    investmentCustodyAccount: createCrudRepository<GEFIInvestmentCustodyAccount>(supabase, 'gefi_investment_custody_accounts'),
    investmentAuditTrail: createCrudRepository<GEFIInvestmentAuditTrail>(supabase, 'gefi_investment_audit_trails'),
  };
}
