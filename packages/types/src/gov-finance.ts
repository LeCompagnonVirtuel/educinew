export enum BudgetType {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  DISTRICT = 'district',
  SCHOOL = 'school',
}

export enum BudgetStatus {
  DRAFT = 'draft',
  PROPOSED = 'proposed',
  APPROVED = 'approved',
  ACTIVE = 'active',
  CLOSED = 'closed',
  REJECTED = 'rejected',
}

export enum FundingSource {
  GOVERNMENT = 'government',
  INTERNATIONAL = 'international',
  PRIVATE = 'private',
  DONOR = 'donor',
  LOAN = 'loan',
  MIXED = 'mixed',
}

export enum FundingType {
  GRANT = 'grant',
  LOAN = 'loan',
  SUBSIDY = 'subsidy',
  SCHOLARSHIP = 'scholarship',
  INVESTMENT = 'investment',
  DONATION = 'donation',
}

export enum ScholarshipType {
  MERIT = 'merit',
  NEED = 'need',
  SPORTS = 'sports',
  ARTS = 'arts',
  TECHNICAL = 'technical',
  GOVERNMENT = 'government',
  PRIVATE = 'private',
}

export enum GrantType {
  PROJECT = 'project',
  PROGRAM = 'program',
  RESEARCH = 'research',
  INFRASTRUCTURE = 'infrastructure',
  CAPACITY_BUILDING = 'capacity_building',
  EMERGENCY = 'emergency',
}

export enum SubsidyType {
  INFRASTRUCTURE = 'infrastructure',
  EQUIPMENT = 'equipment',
  TRAINING = 'training',
  SCHOLARSHIP = 'scholarship',
  OPERATIONAL = 'operational',
}

export enum PayrollCategory {
  TEACHER = 'teacher',
  STAFF = 'staff',
  ADMINISTRATIVE = 'administrative',
  MANAGEMENT = 'management',
  CONSULTANT = 'consultant',
}

export enum InvestmentType {
  INFRASTRUCTURE = 'infrastructure',
  EQUIPMENT = 'equipment',
  TECHNOLOGY = 'technology',
  REAL_ESTATE = 'real_estate',
  FINANCIAL = 'financial',
}

export enum ProcurementStatus {
  PLANNED = 'planned',
  BIDDING = 'bidding',
  EVALUATION = 'evaluation',
  AWARDED = 'awarded',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ContractType {
  SUPPLY = 'supply',
  SERVICE = 'service',
  WORKS = 'works',
  CONSULTANCY = 'consultancy',
  LEASE = 'lease',
}

export enum AuditType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  FINANCIAL = 'financial',
  PERFORMANCE = 'performance',
  COMPLIANCE = 'compliance',
}

export enum TreasuryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  CLOSED = 'closed',
}

export enum BudgetCategory {
  PERSONNEL = 'personnel',
  OPERATIONS = 'operations',
  INFRASTRUCTURE = 'infrastructure',
  EQUIPMENT = 'equipment',
  TRAINING = 'training',
  SCHOLARSHIPS = 'scholarships',
  RESEARCH = 'research',
  OTHER = 'other',
}

export enum FiscalYear {
  CURRENT = 'current',
  PREVIOUS = 'previous',
  NEXT = 'next',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'bank_transfer',
  MOBILE_MONEY = 'mobile_money',
  CASH = 'cash',
  CHECK = 'check',
  CARD = 'card',
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
  ADJUSTMENT = 'adjustment',
}

export enum AccountType {
  ASSET = 'asset',
  LIABILITY = 'liability',
  EQUITY = 'equity',
  REVENUE = 'revenue',
  EXPENSE = 'expense',
}

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REVISION = 'revision',
}

export enum ReportType {
  FINANCIAL = 'financial',
  BUDGET = 'budget',
  AUDIT = 'audit',
  PAYROLL = 'payroll',
  PROCUREMENT = 'procurement',
}

export enum Currency {
  XOF = 'xof',
  XAF = 'xaf',
  NGN = 'ngn',
  GHS = 'ghs',
  KES = 'kes',
  USD = 'usd',
  EUR = 'eur',
}

export enum ExchangeRateType {
  FIXED = 'fixed',
  FLOATING = 'floating',
  BLACK_MARKET = 'black_market',
}

export enum TaxType {
  INCOME = 'income',
  SALES = 'sales',
  VAT = 'vat',
  WITHHOLDING = 'withholding',
  PAYROLL = 'payroll',
}

export enum InsuranceType {
  HEALTH = 'health',
  LIFE = 'life',
  PROPERTY = 'property',
  LIABILITY = 'liability',
  VEHICLE = 'vehicle',
}

export enum DepreciationMethod {
  STRAIGHT_LINE = 'straight_line',
  DECLINING_BALANCE = 'declining_balance',
  UNITS_OF_PRODUCTION = 'units_of_production',
}

export enum AssetStatus {
  ACTIVE = 'active',
  MAINTENANCE = 'maintenance',
  RETIRED = 'retired',
  DISPOSED = 'disposed',
  LOST = 'lost',
}

export enum LiabilityType {
  LOAN = 'loan',
  BOND = 'bond',
  LEASE = 'lease',
  ACCOUNT_PAYABLE = 'account_payable',
  ACCRUED = 'accrued',
}

export enum EquityType {
  CAPITAL = 'capital',
  RESERVE = 'reserve',
  RETAINED_EARNINGS = 'retained_earnings',
  SURPLUS = 'surplus',
}

export enum RevenueType {
  TUITION = 'tuition',
  GRANTS = 'grants',
  DONATIONS = 'donations',
  SERVICES = 'services',
  INVESTMENT = 'investment',
}

export enum ExpenseType {
  SALARY = 'salary',
  SUPPLIES = 'supplies',
  MAINTENANCE = 'maintenance',
  UTILITIES = 'utilities',
  TRANSPORT = 'transport',
}

export enum CashFlowType {
  OPERATING = 'operating',
  INVESTING = 'investing',
  FINANCING = 'financing',
}

export enum BudgetPeriod {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUAL = 'semi_annual',
  ANNUAL = 'annual',
}

export enum CostCenter {
  ACADEMIC = 'academic',
  ADMINISTRATIVE = 'administrative',
  FINANCIAL = 'financial',
  TECHNICAL = 'technical',
  SUPPORT = 'support',
}

export enum FundingAllocation {
  DIRECT = 'direct',
  INDIRECT = 'indirect',
  OVERHEAD = 'overhead',
  CONTINGENCY = 'contingency',
}

export enum ScholarshipStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  COMPLETED = 'completed',
  TERMINATED = 'terminated',
}

export enum GrantStatus {
  PROPOSED = 'proposed',
  APPROVED = 'approved',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CLOSED = 'closed',
}

export enum SubsidyStatus {
  PROPOSED = 'proposed',
  APPROVED = 'approved',
  DISBURSED = 'disbursed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum InvestmentStatus {
  PLANNED = 'planned',
  ACTIVE = 'active',
  MATURED = 'matured',
  LIQUIDATED = 'liquidated',
}

export enum ContractStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  TERMINATED = 'terminated',
  EXPIRED = 'expired',
}

export enum AuditStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FOLLOW_UP = 'follow_up',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REVERSED = 'reversed',
}

export enum BudgetPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum CostEstimationType {
  FIXED = 'fixed',
  VARIABLE = 'variable',
  MIXED = 'mixed',
}

export enum FundingSourceCategory {
  DOMESTIC = 'domestic',
  INTERNATIONAL = 'international',
  PRIVATE = 'private',
  MIXED = 'mixed',
}

export enum ProcurementMethod {
  TENDER = 'tender',
  QUOTATION = 'quotation',
  DIRECT = 'direct',
  FRAMEWORK = 'framework',
}

export enum ContractClauseType {
  PAYMENT = 'payment',
  DELIVERY = 'delivery',
  PENALTY = 'penalty',
  WARRANTY = 'warranty',
  TERMINATION = 'termination',
}

export enum AuditFinding {
  MINOR = 'minor',
  MAJOR = 'major',
  CRITICAL = 'critical',
  OBSERVATION = 'observation',
}

export enum TreasuryAccountType {
  CURRENT = 'current',
  SAVINGS = 'savings',
  INVESTMENT = 'investment',
  OPERATIONAL = 'operational',
}

export enum BudgetVariance {
  FAVORABLE = 'favorable',
  UNFAVORABLE = 'unfavorable',
  NEUTRAL = 'neutral',
}

export enum FinancialRatio {
  LIQUIDITY = 'liquidity',
  SOLVENCY = 'solvency',
  PROFITABILITY = 'profitability',
  EFFICIENCY = 'efficiency',
}

export enum InvestmentReturn {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
}

export enum AuditOpinion {
  UNQUALIFIED = 'unqualified',
  QUALIFIED = 'qualified',
  ADVERSE = 'adverse',
  DISCLAIMER = 'disclaimer',
}

export enum ComplianceStatus {
  COMPLIANT = 'compliant',
  NON_COMPLIANT = 'non_compliant',
  PARTIALLY_COMPLIANT = 'partially_compliant',
}

export enum BudgetForecastType {
  LINEAR = 'linear',
  MOVING_AVERAGE = 'moving_average',
  REGRESSION = 'regression',
  SEASONAL = 'seasonal',
}

export enum CostAllocationMethod {
  DIRECT = 'direct',
  STEP_DOWN = 'step_down',
  RECIPROCAL = 'reciprocal',
  ACTIVITY_BASED = 'activity_based',
}

export enum RevenueForecastType {
  HISTORICAL = 'historical',
  TREND = 'trend',
  SEASONAL = 'seasonal',
  COMBINED = 'combined',
}

export enum ExpenseForecastType {
  HISTORICAL = 'historical',
  BUDGET_BASED = 'budget_based',
  ACTIVITY_BASED = 'activity_based',
  COMBINED = 'combined',
}

export enum CashFlowForecastType {
  DIRECT = 'direct',
  INDIRECT = 'indirect',
  COMBINED = 'combined',
}

export enum FinancialKPI {
  REVENUE_GROWTH = 'revenue_growth',
  EXPENSE_RATIO = 'expense_ratio',
  PROFIT_MARGIN = 'profit_margin',
  ROI = 'roi',
  BREAK_EVEN = 'break_even',
}

export enum BudgetTemplate {
  STANDARD = 'standard',
  DETAILED = 'detailed',
  SIMPLIFIED = 'simplified',
  CUSTOM = 'custom',
}

export interface NationalBudget {
  id: string;
  budget_name: string;
  budget_code: string;
  fiscal_year: string;
  budget_type: BudgetType;
  total_amount: number;
  currency: Currency;
  status: BudgetStatus;
  approved_by: string;
  approval_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalBudgetCreate {
  budget_name: string;
  budget_code: string;
  fiscal_year: string;
  budget_type: BudgetType;
  total_amount: number;
  currency: Currency;
  status: BudgetStatus;
  approved_by: string;
  approval_date: string;
}

export interface NationalBudgetUpdate {
  budget_name?: string;
  budget_code?: string;
  fiscal_year?: string;
  budget_type?: BudgetType;
  total_amount?: number;
  currency?: Currency;
  status?: BudgetStatus;
  approved_by?: string;
  approval_date?: string;
}

export interface NationalBudgetQuery {
  search?: string;
  budget_type?: BudgetType;
  fiscal_year?: string;
  status?: BudgetStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface BudgetLine {
  id: string;
  budget_id: string;
  line_number: number;
  description: string;
  category: BudgetCategory;
  amount: number;
  spent_amount: number;
  remaining_amount: number;
  cost_center: CostCenter;
  priority: BudgetPriority;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetLineCreate {
  budget_id: string;
  line_number: number;
  description: string;
  category: BudgetCategory;
  amount: number;
  spent_amount: number;
  remaining_amount: number;
  cost_center: CostCenter;
  priority: BudgetPriority;
  status: string;
}

export interface BudgetLineUpdate {
  line_number?: number;
  description?: string;
  category?: BudgetCategory;
  amount?: number;
  spent_amount?: number;
  remaining_amount?: number;
  cost_center?: CostCenter;
  priority?: BudgetPriority;
  status?: string;
}

export interface BudgetLineQuery {
  budget_id?: string;
  search?: string;
  category?: BudgetCategory;
  cost_center?: CostCenter;
  priority?: BudgetPriority;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface BudgetAllocation {
  id: string;
  budget_id: string;
  line_id: string;
  entity_id: string;
  entity_type: string;
  allocated_amount: number;
  spent_amount: number;
  allocation_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetAllocationCreate {
  budget_id: string;
  line_id: string;
  entity_id: string;
  entity_type: string;
  allocated_amount: number;
  spent_amount: number;
  allocation_date: string;
  status: string;
}

export interface BudgetAllocationUpdate {
  line_id?: string;
  entity_id?: string;
  entity_type?: string;
  allocated_amount?: number;
  spent_amount?: number;
  allocation_date?: string;
  status?: string;
}

export interface BudgetAllocationQuery {
  budget_id?: string;
  line_id?: string;
  entity_id?: string;
  entity_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SchoolFunding {
  id: string;
  school_id: string;
  school_name: string;
  funding_source: FundingSource;
  funding_type: FundingType;
  amount: number;
  currency: Currency;
  period_start: string;
  period_end: string;
  conditions: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SchoolFundingCreate {
  school_id: string;
  school_name: string;
  funding_source: FundingSource;
  funding_type: FundingType;
  amount: number;
  currency: Currency;
  period_start: string;
  period_end: string;
  conditions: string;
  status: string;
}

export interface SchoolFundingUpdate {
  school_id?: string;
  school_name?: string;
  funding_source?: FundingSource;
  funding_type?: FundingType;
  amount?: number;
  currency?: Currency;
  period_start?: string;
  period_end?: string;
  conditions?: string;
  status?: string;
}

export interface SchoolFundingQuery {
  school_id?: string;
  search?: string;
  funding_source?: FundingSource;
  funding_type?: FundingType;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegionalFunding {
  id: string;
  region: string;
  department: string;
  funding_source: FundingSource;
  funding_type: FundingType;
  amount: number;
  currency: Currency;
  period_start: string;
  period_end: string;
  allocation_criteria: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface RegionalFundingCreate {
  region: string;
  department: string;
  funding_source: FundingSource;
  funding_type: FundingType;
  amount: number;
  currency: Currency;
  period_start: string;
  period_end: string;
  allocation_criteria: string;
  status: string;
}

export interface RegionalFundingUpdate {
  region?: string;
  department?: string;
  funding_source?: FundingSource;
  funding_type?: FundingType;
  amount?: number;
  currency?: Currency;
  period_start?: string;
  period_end?: string;
  allocation_criteria?: string;
  status?: string;
}

export interface RegionalFundingQuery {
  region?: string;
  department?: string;
  funding_source?: FundingSource;
  funding_type?: FundingType;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Scholarship {
  id: string;
  scholarship_name: string;
  scholarship_code: string;
  scholarship_type: ScholarshipType;
  donor_name: string;
  amount: number;
  currency: Currency;
  duration_months: number;
  eligibility_criteria: string;
  application_start: string;
  application_end: string;
  status: ScholarshipStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ScholarshipCreate {
  scholarship_name: string;
  scholarship_code: string;
  scholarship_type: ScholarshipType;
  donor_name: string;
  amount: number;
  currency: Currency;
  duration_months: number;
  eligibility_criteria: string;
  application_start: string;
  application_end: string;
  status: ScholarshipStatus;
}

export interface ScholarshipUpdate {
  scholarship_name?: string;
  scholarship_code?: string;
  scholarship_type?: ScholarshipType;
  donor_name?: string;
  amount?: number;
  currency?: Currency;
  duration_months?: number;
  eligibility_criteria?: string;
  application_start?: string;
  application_end?: string;
  status?: ScholarshipStatus;
}

export interface ScholarshipQuery {
  search?: string;
  scholarship_type?: ScholarshipType;
  donor_name?: string;
  status?: ScholarshipStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Grant {
  id: string;
  grant_name: string;
  grant_code: string;
  grant_type: GrantType;
  donor_name: string;
  amount: number;
  currency: Currency;
  duration_months: number;
  objectives: string;
  reporting_requirements: string;
  application_start: string;
  application_end: string;
  status: GrantStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GrantCreate {
  grant_name: string;
  grant_code: string;
  grant_type: GrantType;
  donor_name: string;
  amount: number;
  currency: Currency;
  duration_months: number;
  objectives: string;
  reporting_requirements: string;
  application_start: string;
  application_end: string;
  status: GrantStatus;
}

export interface GrantUpdate {
  grant_name?: string;
  grant_code?: string;
  grant_type?: GrantType;
  donor_name?: string;
  amount?: number;
  currency?: Currency;
  duration_months?: number;
  objectives?: string;
  reporting_requirements?: string;
  application_start?: string;
  application_end?: string;
  status?: GrantStatus;
}

export interface GrantQuery {
  search?: string;
  grant_type?: GrantType;
  donor_name?: string;
  status?: GrantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Subsidy {
  id: string;
  subsidy_name: string;
  subsidy_code: string;
  subsidy_type: SubsidyType;
  provider_name: string;
  amount: number;
  currency: Currency;
  duration_months: number;
  eligibility_criteria: string;
  application_start: string;
  application_end: string;
  status: SubsidyStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SubsidyCreate {
  subsidy_name: string;
  subsidy_code: string;
  subsidy_type: SubsidyType;
  provider_name: string;
  amount: number;
  currency: Currency;
  duration_months: number;
  eligibility_criteria: string;
  application_start: string;
  application_end: string;
  status: SubsidyStatus;
}

export interface SubsidyUpdate {
  subsidy_name?: string;
  subsidy_code?: string;
  subsidy_type?: SubsidyType;
  provider_name?: string;
  amount?: number;
  currency?: Currency;
  duration_months?: number;
  eligibility_criteria?: string;
  application_start?: string;
  application_end?: string;
  status?: SubsidyStatus;
}

export interface SubsidyQuery {
  search?: string;
  subsidy_type?: SubsidyType;
  provider_name?: string;
  status?: SubsidyStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Payroll {
  id: string;
  payroll_name: string;
  payroll_code: string;
  payroll_category: PayrollCategory;
  fiscal_year: string;
  month: number;
  total_amount: number;
  currency: Currency;
  employee_count: number;
  processed_by: string;
  processed_at: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PayrollCreate {
  payroll_name: string;
  payroll_code: string;
  payroll_category: PayrollCategory;
  fiscal_year: string;
  month: number;
  total_amount: number;
  currency: Currency;
  employee_count: number;
  processed_by: string;
  processed_at: string;
  status: string;
}

export interface PayrollUpdate {
  payroll_name?: string;
  payroll_code?: string;
  payroll_category?: PayrollCategory;
  fiscal_year?: string;
  month?: number;
  total_amount?: number;
  currency?: Currency;
  employee_count?: number;
  processed_by?: string;
  processed_at?: string;
  status?: string;
}

export interface PayrollQuery {
  search?: string;
  payroll_category?: PayrollCategory;
  fiscal_year?: string;
  month?: number;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PayrollItem {
  id: string;
  payroll_id: string;
  employee_id: string;
  employee_name: string;
  position: string;
  base_salary: number;
  allowances: number;
  deductions: number;
  net_salary: number;
  currency: Currency;
  payment_method: PaymentMethod;
  bank_account: string | null;
  mobile_money_number: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PayrollItemCreate {
  payroll_id: string;
  employee_id: string;
  employee_name: string;
  position: string;
  base_salary: number;
  allowances: number;
  deductions: number;
  net_salary: number;
  currency: Currency;
  payment_method: PaymentMethod;
  bank_account: string | null;
  mobile_money_number: string | null;
  status: string;
}

export interface PayrollItemUpdate {
  payroll_id?: string;
  employee_id?: string;
  employee_name?: string;
  position?: string;
  base_salary?: number;
  allowances?: number;
  deductions?: number;
  net_salary?: number;
  currency?: Currency;
  payment_method?: PaymentMethod;
  bank_account?: string | null;
  mobile_money_number?: string | null;
  status?: string;
}

export interface PayrollItemQuery {
  payroll_id?: string;
  employee_id?: string;
  search?: string;
  payment_method?: PaymentMethod;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Investment {
  id: string;
  investment_name: string;
  investment_code: string;
  investment_type: InvestmentType;
  amount: number;
  currency: Currency;
  expected_return: number;
  actual_return: number | null;
  start_date: string;
  maturity_date: string;
  risk_level: string;
  status: InvestmentStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface InvestmentCreate {
  investment_name: string;
  investment_code: string;
  investment_type: InvestmentType;
  amount: number;
  currency: Currency;
  expected_return: number;
  actual_return: number | null;
  start_date: string;
  maturity_date: string;
  risk_level: string;
  status: InvestmentStatus;
}

export interface InvestmentUpdate {
  investment_name?: string;
  investment_code?: string;
  investment_type?: InvestmentType;
  amount?: number;
  currency?: Currency;
  expected_return?: number;
  actual_return?: number | null;
  start_date?: string;
  maturity_date?: string;
  risk_level?: string;
  status?: InvestmentStatus;
}

export interface InvestmentQuery {
  search?: string;
  investment_type?: InvestmentType;
  risk_level?: string;
  status?: InvestmentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface InvestmentTracker {
  id: string;
  investment_id: string;
  tracking_date: string;
  current_value: number;
  daily_return: number;
  cumulative_return: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InvestmentTrackerCreate {
  investment_id: string;
  tracking_date: string;
  current_value: number;
  daily_return: number;
  cumulative_return: number;
  notes: string;
}

export interface InvestmentTrackerUpdate {
  tracking_date?: string;
  current_value?: number;
  daily_return?: number;
  cumulative_return?: number;
  notes?: string;
}

export interface InvestmentTrackerQuery {
  investment_id?: string;
  tracking_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Procurement {
  id: string;
  procurement_name: string;
  procurement_code: string;
  description: string;
  category: BudgetCategory;
  estimated_budget: number;
  currency: Currency;
  procurement_method: ProcurementMethod;
  publication_date: string;
  closing_date: string;
  award_date: string | null;
  status: ProcurementStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ProcurementCreate {
  procurement_name: string;
  procurement_code: string;
  description: string;
  category: BudgetCategory;
  estimated_budget: number;
  currency: Currency;
  procurement_method: ProcurementMethod;
  publication_date: string;
  closing_date: string;
  award_date: string | null;
  status: ProcurementStatus;
}

export interface ProcurementUpdate {
  procurement_name?: string;
  procurement_code?: string;
  description?: string;
  category?: BudgetCategory;
  estimated_budget?: number;
  currency?: Currency;
  procurement_method?: ProcurementMethod;
  publication_date?: string;
  closing_date?: string;
  award_date?: string | null;
  status?: ProcurementStatus;
}

export interface ProcurementQuery {
  search?: string;
  category?: BudgetCategory;
  procurement_method?: ProcurementMethod;
  status?: ProcurementStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PublicContract {
  id: string;
  contract_name: string;
  contract_code: string;
  contract_type: ContractType;
  procurement_id: string;
  contractor_name: string;
  contractor_registration: string;
  contract_amount: number;
  currency: Currency;
  start_date: string;
  end_date: string;
  payment_terms: string;
  performance_bond: number;
  status: ContractStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PublicContractCreate {
  contract_name: string;
  contract_code: string;
  contract_type: ContractType;
  procurement_id: string;
  contractor_name: string;
  contractor_registration: string;
  contract_amount: number;
  currency: Currency;
  start_date: string;
  end_date: string;
  payment_terms: string;
  performance_bond: number;
  status: ContractStatus;
}

export interface PublicContractUpdate {
  contract_name?: string;
  contract_code?: string;
  contract_type?: ContractType;
  procurement_id?: string;
  contractor_name?: string;
  contractor_registration?: string;
  contract_amount?: number;
  currency?: Currency;
  start_date?: string;
  end_date?: string;
  payment_terms?: string;
  performance_bond?: number;
  status?: ContractStatus;
}

export interface PublicContractQuery {
  search?: string;
  contract_type?: ContractType;
  procurement_id?: string;
  contractor_name?: string;
  status?: ContractStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinancialAudit {
  id: string;
  audit_name: string;
  audit_code: string;
  audit_type: AuditType;
  audit_period_start: string;
  audit_period_end: string;
  auditor_name: string;
  auditor_firm: string;
  audit_fee: number;
  currency: Currency;
  findings_count: number;
  opinion: AuditOpinion;
  status: AuditStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FinancialAuditCreate {
  audit_name: string;
  audit_code: string;
  audit_type: AuditType;
  audit_period_start: string;
  audit_period_end: string;
  auditor_name: string;
  auditor_firm: string;
  audit_fee: number;
  currency: Currency;
  findings_count: number;
  opinion: AuditOpinion;
  status: AuditStatus;
}

export interface FinancialAuditUpdate {
  audit_name?: string;
  audit_code?: string;
  audit_type?: AuditType;
  audit_period_start?: string;
  audit_period_end?: string;
  auditor_name?: string;
  auditor_firm?: string;
  audit_fee?: number;
  currency?: Currency;
  findings_count?: number;
  opinion?: AuditOpinion;
  status?: AuditStatus;
}

export interface FinancialAuditQuery {
  search?: string;
  audit_type?: AuditType;
  auditor_name?: string;
  auditor_firm?: string;
  opinion?: AuditOpinion;
  status?: AuditStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TreasuryIntegration {
  id: string;
  integration_name: string;
  integration_code: string;
  treasury_account: string;
  bank_name: string;
  bank_branch: string;
  account_number: string;
  account_type: TreasuryAccountType;
  currency: Currency;
  balance: number;
  last_sync_date: string;
  status: TreasuryStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TreasuryIntegrationCreate {
  integration_name: string;
  integration_code: string;
  treasury_account: string;
  bank_name: string;
  bank_branch: string;
  account_number: string;
  account_type: TreasuryAccountType;
  currency: Currency;
  balance: number;
  last_sync_date: string;
  status: TreasuryStatus;
}

export interface TreasuryIntegrationUpdate {
  integration_name?: string;
  integration_code?: string;
  treasury_account?: string;
  bank_name?: string;
  bank_branch?: string;
  account_number?: string;
  account_type?: TreasuryAccountType;
  currency?: Currency;
  balance?: number;
  last_sync_date?: string;
  status?: TreasuryStatus;
}

export interface TreasuryIntegrationQuery {
  search?: string;
  bank_name?: string;
  account_type?: TreasuryAccountType;
  currency?: Currency;
  status?: TreasuryStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceConfig {
  id: string;
  config_key: string;
  config_value: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceConfigCreate {
  config_key: string;
  config_value: string;
  description: string;
}

export interface FinanceConfigUpdate {
  config_key?: string;
  config_value?: string;
  description?: string;
}

export interface FinanceConfigQuery {
  config_key?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceMetrics {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  period_start: string;
  period_end: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceMetricsCreate {
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  period_start: string;
  period_end: string;
}

export interface FinanceMetricsUpdate {
  metric_name?: string;
  metric_value?: number;
  metric_unit?: string;
  period_start?: string;
  period_end?: string;
}

export interface FinanceMetricsQuery {
  metric_name?: string;
  period_start?: string;
  period_end?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceAuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  details: string;
  ip_address: string;
  timestamp: string;
  created_at: string;
}

export interface FinanceAuditLogCreate {
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  details: string;
  ip_address: string;
  timestamp: string;
}

export interface FinanceAuditLogQuery {
  action?: string;
  entity_type?: string;
  user_id?: string;
  timestamp?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  read: boolean;
  created_at: string;
}

export interface FinanceNotificationCreate {
  title: string;
  message: string;
  type: string;
  priority: string;
}

export interface FinanceNotificationUpdate {
  read?: boolean;
}

export interface FinanceNotificationQuery {
  type?: string;
  priority?: string;
  read?: boolean;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceDocument {
  id: string;
  document_type: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceDocumentCreate {
  document_type: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
}

export interface FinanceDocumentUpdate {
  document_type?: string;
  title?: string;
  description?: string;
  file_url?: string;
  file_type?: string;
  file_size?: number;
  uploaded_by?: string;
}

export interface FinanceDocumentQuery {
  document_type?: string;
  search?: string;
  uploaded_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceReport {
  id: string;
  report_name: string;
  report_type: ReportType;
  description: string;
  period_start: string;
  period_end: string;
  generated_by: string;
  file_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceReportCreate {
  report_name: string;
  report_type: ReportType;
  description: string;
  period_start: string;
  period_end: string;
  generated_by: string;
  file_url: string;
  status: string;
}

export interface FinanceReportUpdate {
  report_name?: string;
  report_type?: ReportType;
  description?: string;
  period_start?: string;
  period_end?: string;
  generated_by?: string;
  file_url?: string;
  status?: string;
}

export interface FinanceReportQuery {
  search?: string;
  report_type?: ReportType;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceStatistics {
  id: string;
  stat_name: string;
  stat_value: number;
  stat_unit: string;
  period: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceStatisticsCreate {
  stat_name: string;
  stat_value: number;
  stat_unit: string;
  period: string;
  category: string;
}

export interface FinanceStatisticsUpdate {
  stat_name?: string;
  stat_value?: number;
  stat_unit?: string;
  period?: string;
  category?: string;
}

export interface FinanceStatisticsQuery {
  stat_name?: string;
  period?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceTransaction {
  id: string;
  transaction_number: string;
  transaction_type: TransactionType;
  amount: number;
  currency: Currency;
  description: string;
  reference: string;
  account_id: string;
  counterparty: string;
  transaction_date: string;
  status: TransactionStatus;
  created_at: string;
  updated_at: string;
}

export interface FinanceTransactionCreate {
  transaction_number: string;
  transaction_type: TransactionType;
  amount: number;
  currency: Currency;
  description: string;
  reference: string;
  account_id: string;
  counterparty: string;
  transaction_date: string;
  status: TransactionStatus;
}

export interface FinanceTransactionUpdate {
  transaction_number?: string;
  transaction_type?: TransactionType;
  amount?: number;
  currency?: Currency;
  description?: string;
  reference?: string;
  account_id?: string;
  counterparty?: string;
  transaction_date?: string;
  status?: TransactionStatus;
}

export interface FinanceTransactionQuery {
  search?: string;
  transaction_type?: TransactionType;
  currency?: Currency;
  account_id?: string;
  status?: TransactionStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceAccount {
  id: string;
  account_number: string;
  account_name: string;
  account_type: AccountType;
  balance: number;
  currency: Currency;
  parent_account_id: string | null;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceAccountCreate {
  account_number: string;
  account_name: string;
  account_type: AccountType;
  balance: number;
  currency: Currency;
  parent_account_id: string | null;
  description: string;
  status: string;
}

export interface FinanceAccountUpdate {
  account_number?: string;
  account_name?: string;
  account_type?: AccountType;
  balance?: number;
  currency?: Currency;
  parent_account_id?: string | null;
  description?: string;
  status?: string;
}

export interface FinanceAccountQuery {
  search?: string;
  account_type?: AccountType;
  currency?: Currency;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceApproval {
  id: string;
  entity_type: string;
  entity_id: string;
  approval_type: string;
  approver_id: string;
  approver_name: string;
  approval_date: string;
  approval_status: ApprovalStatus;
  comments: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceApprovalCreate {
  entity_type: string;
  entity_id: string;
  approval_type: string;
  approver_id: string;
  approver_name: string;
  approval_date: string;
  approval_status: ApprovalStatus;
  comments: string;
}

export interface FinanceApprovalUpdate {
  entity_type?: string;
  entity_id?: string;
  approval_type?: string;
  approver_id?: string;
  approver_name?: string;
  approval_date?: string;
  approval_status?: ApprovalStatus;
  comments?: string;
}

export interface FinanceApprovalQuery {
  entity_type?: string;
  entity_id?: string;
  approval_type?: string;
  approver_id?: string;
  approval_status?: ApprovalStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceWorkflow {
  id: string;
  workflow_name: string;
  entity_type: string;
  steps: string;
  current_step: string;
  assigned_to: string;
  due_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceWorkflowCreate {
  workflow_name: string;
  entity_type: string;
  steps: string;
  current_step: string;
  assigned_to: string;
  due_date: string;
  status: string;
}

export interface FinanceWorkflowUpdate {
  workflow_name?: string;
  entity_type?: string;
  steps?: string;
  current_step?: string;
  assigned_to?: string;
  due_date?: string;
  status?: string;
}

export interface FinanceWorkflowQuery {
  search?: string;
  entity_type?: string;
  assigned_to?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceBudgetForecast {
  id: string;
  budget_id: string;
  forecast_type: BudgetForecastType;
  forecast_date: string;
  forecasted_amount: number;
  actual_amount: number | null;
  variance: number | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceBudgetForecastCreate {
  budget_id: string;
  forecast_type: BudgetForecastType;
  forecast_date: string;
  forecasted_amount: number;
  actual_amount: number | null;
  variance: number | null;
  notes: string;
}

export interface FinanceBudgetForecastUpdate {
  budget_id?: string;
  forecast_type?: BudgetForecastType;
  forecast_date?: string;
  forecasted_amount?: number;
  actual_amount?: number | null;
  variance?: number | null;
  notes?: string;
}

export interface FinanceBudgetForecastQuery {
  budget_id?: string;
  forecast_type?: BudgetForecastType;
  forecast_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceCashFlow {
  id: string;
  cash_flow_type: CashFlowType;
  amount: number;
  currency: Currency;
  description: string;
  reference: string;
  flow_date: string;
  balance_after: number;
  created_at: string;
  updated_at: string;
}

export interface FinanceCashFlowCreate {
  cash_flow_type: CashFlowType;
  amount: number;
  currency: Currency;
  description: string;
  reference: string;
  flow_date: string;
  balance_after: number;
}

export interface FinanceCashFlowUpdate {
  cash_flow_type?: CashFlowType;
  amount?: number;
  currency?: Currency;
  description?: string;
  reference?: string;
  flow_date?: string;
  balance_after?: number;
}

export interface FinanceCashFlowQuery {
  cash_flow_type?: CashFlowType;
  currency?: Currency;
  flow_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinancePayment {
  id: string;
  payment_number: string;
  payment_type: TransactionType;
  amount: number;
  currency: Currency;
  payment_method: PaymentMethod;
  payer_name: string;
  payee_name: string;
  description: string;
  reference: string;
  payment_date: string;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
}

export interface FinancePaymentCreate {
  payment_number: string;
  payment_type: TransactionType;
  amount: number;
  currency: Currency;
  payment_method: PaymentMethod;
  payer_name: string;
  payee_name: string;
  description: string;
  reference: string;
  payment_date: string;
  status: PaymentStatus;
}

export interface FinancePaymentUpdate {
  payment_number?: string;
  payment_type?: TransactionType;
  amount?: number;
  currency?: Currency;
  payment_method?: PaymentMethod;
  payer_name?: string;
  payee_name?: string;
  description?: string;
  reference?: string;
  payment_date?: string;
  status?: PaymentStatus;
}

export interface FinancePaymentQuery {
  search?: string;
  payment_type?: TransactionType;
  payment_method?: PaymentMethod;
  status?: PaymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceInvoice {
  id: string;
  invoice_number: string;
  invoice_type: TransactionType;
  amount: number;
  currency: Currency;
  tax_amount: number;
  total_amount: number;
  payer_name: string;
  payer_email: string;
  description: string;
  due_date: string;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
}

export interface FinanceInvoiceCreate {
  invoice_number: string;
  invoice_type: TransactionType;
  amount: number;
  currency: Currency;
  tax_amount: number;
  total_amount: number;
  payer_name: string;
  payer_email: string;
  description: string;
  due_date: string;
  status: PaymentStatus;
}

export interface FinanceInvoiceUpdate {
  invoice_number?: string;
  invoice_type?: TransactionType;
  amount?: number;
  currency?: Currency;
  tax_amount?: number;
  total_amount?: number;
  payer_name?: string;
  payer_email?: string;
  description?: string;
  due_date?: string;
  status?: PaymentStatus;
}

export interface FinanceInvoiceQuery {
  search?: string;
  invoice_type?: TransactionType;
  payer_name?: string;
  status?: PaymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceExpense {
  id: string;
  expense_number: string;
  category: BudgetCategory;
  amount: number;
  currency: Currency;
  description: string;
  vendor_name: string;
  receipt_url: string | null;
  expense_date: string;
  approved_by: string | null;
  approval_date: string | null;
  status: ApprovalStatus;
  created_at: string;
  updated_at: string;
}

export interface FinanceExpenseCreate {
  expense_number: string;
  category: BudgetCategory;
  amount: number;
  currency: Currency;
  description: string;
  vendor_name: string;
  receipt_url: string | null;
  expense_date: string;
  approved_by: string | null;
  approval_date: string | null;
  status: ApprovalStatus;
}

export interface FinanceExpenseUpdate {
  expense_number?: string;
  category?: BudgetCategory;
  amount?: number;
  currency?: Currency;
  description?: string;
  vendor_name?: string;
  receipt_url?: string | null;
  expense_date?: string;
  approved_by?: string | null;
  approval_date?: string | null;
  status?: ApprovalStatus;
}

export interface FinanceExpenseQuery {
  search?: string;
  category?: BudgetCategory;
  vendor_name?: string;
  status?: ApprovalStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceRevenue {
  id: string;
  revenue_number: string;
  source: RevenueType;
  amount: number;
  currency: Currency;
  description: string;
  payer_name: string;
  revenue_date: string;
  status: TransactionStatus;
  created_at: string;
  updated_at: string;
}

export interface FinanceRevenueCreate {
  revenue_number: string;
  source: RevenueType;
  amount: number;
  currency: Currency;
  description: string;
  payer_name: string;
  revenue_date: string;
  status: TransactionStatus;
}

export interface FinanceRevenueUpdate {
  revenue_number?: string;
  source?: RevenueType;
  amount?: number;
  currency?: Currency;
  description?: string;
  payer_name?: string;
  revenue_date?: string;
  status?: TransactionStatus;
}

export interface FinanceRevenueQuery {
  search?: string;
  source?: RevenueType;
  payer_name?: string;
  status?: TransactionStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceAsset {
  id: string;
  asset_number: string;
  asset_name: string;
  asset_type: InvestmentType;
  purchase_date: string;
  purchase_price: number;
  current_value: number;
  currency: Currency;
  depreciation_method: DepreciationMethod;
  useful_life_years: number;
  salvage_value: number;
  location: string;
  status: AssetStatus;
  created_at: string;
  updated_at: string;
}

export interface FinanceAssetCreate {
  asset_number: string;
  asset_name: string;
  asset_type: InvestmentType;
  purchase_date: string;
  purchase_price: number;
  current_value: number;
  currency: Currency;
  depreciation_method: DepreciationMethod;
  useful_life_years: number;
  salvage_value: number;
  location: string;
  status: AssetStatus;
}

export interface FinanceAssetUpdate {
  asset_number?: string;
  asset_name?: string;
  asset_type?: InvestmentType;
  purchase_date?: string;
  purchase_price?: number;
  current_value?: number;
  currency?: Currency;
  depreciation_method?: DepreciationMethod;
  useful_life_years?: number;
  salvage_value?: number;
  location?: string;
  status?: AssetStatus;
}

export interface FinanceAssetQuery {
  search?: string;
  asset_type?: InvestmentType;
  depreciation_method?: DepreciationMethod;
  status?: AssetStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceLiability {
  id: string;
  liability_number: string;
  liability_name: string;
  liability_type: LiabilityType;
  amount: number;
  currency: Currency;
  interest_rate: number;
  start_date: string;
  maturity_date: string;
  monthly_payment: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceLiabilityCreate {
  liability_number: string;
  liability_name: string;
  liability_type: LiabilityType;
  amount: number;
  currency: Currency;
  interest_rate: number;
  start_date: string;
  maturity_date: string;
  monthly_payment: number;
  status: string;
}

export interface FinanceLiabilityUpdate {
  liability_number?: string;
  liability_name?: string;
  liability_type?: LiabilityType;
  amount?: number;
  currency?: Currency;
  interest_rate?: number;
  start_date?: string;
  maturity_date?: string;
  monthly_payment?: number;
  status?: string;
}

export interface FinanceLiabilityQuery {
  search?: string;
  liability_type?: LiabilityType;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceEquity {
  id: string;
  equity_number: string;
  equity_name: string;
  equity_type: EquityType;
  amount: number;
  currency: Currency;
  description: string;
  effective_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceEquityCreate {
  equity_number: string;
  equity_name: string;
  equity_type: EquityType;
  amount: number;
  currency: Currency;
  description: string;
  effective_date: string;
  status: string;
}

export interface FinanceEquityUpdate {
  equity_number?: string;
  equity_name?: string;
  equity_type?: EquityType;
  amount?: number;
  currency?: Currency;
  description?: string;
  effective_date?: string;
  status?: string;
}

export interface FinanceEquityQuery {
  search?: string;
  equity_type?: EquityType;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceTax {
  id: string;
  tax_name: string;
  tax_type: TaxType;
  rate: number;
  amount: number;
  currency: Currency;
  tax_period: string;
  filing_date: string;
  payment_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceTaxCreate {
  tax_name: string;
  tax_type: TaxType;
  rate: number;
  amount: number;
  currency: Currency;
  tax_period: string;
  filing_date: string;
  payment_date: string;
  status: string;
}

export interface FinanceTaxUpdate {
  tax_name?: string;
  tax_type?: TaxType;
  rate?: number;
  amount?: number;
  currency?: Currency;
  tax_period?: string;
  filing_date?: string;
  payment_date?: string;
  status?: string;
}

export interface FinanceTaxQuery {
  search?: string;
  tax_type?: TaxType;
  tax_period?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceInsurance {
  id: string;
  policy_number: string;
  insurance_type: InsuranceType;
  provider_name: string;
  coverage_amount: number;
  premium_amount: number;
  currency: Currency;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceInsuranceCreate {
  policy_number: string;
  insurance_type: InsuranceType;
  provider_name: string;
  coverage_amount: number;
  premium_amount: number;
  currency: Currency;
  start_date: string;
  end_date: string;
  status: string;
}

export interface FinanceInsuranceUpdate {
  policy_number?: string;
  insurance_type?: InsuranceType;
  provider_name?: string;
  coverage_amount?: number;
  premium_amount?: number;
  currency?: Currency;
  start_date?: string;
  end_date?: string;
  status?: string;
}

export interface FinanceInsuranceQuery {
  search?: string;
  insurance_type?: InsuranceType;
  provider_name?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceAuditFinding {
  id: string;
  audit_id: string;
  finding_type: AuditFinding;
  description: string;
  recommendation: string;
  management_response: string | null;
  corrective_action: string | null;
  responsible_person: string;
  due_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceAuditFindingCreate {
  audit_id: string;
  finding_type: AuditFinding;
  description: string;
  recommendation: string;
  management_response: string | null;
  corrective_action: string | null;
  responsible_person: string;
  due_date: string;
  status: string;
}

export interface FinanceAuditFindingUpdate {
  audit_id?: string;
  finding_type?: AuditFinding;
  description?: string;
  recommendation?: string;
  management_response?: string | null;
  corrective_action?: string | null;
  responsible_person?: string;
  due_date?: string;
  status?: string;
}

export interface FinanceAuditFindingQuery {
  audit_id?: string;
  finding_type?: AuditFinding;
  responsible_person?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceCompliance {
  id: string;
  regulation_name: string;
  compliance_type: string;
  compliance_status: ComplianceStatus;
  assessment_date: string;
  assessed_by: string;
  next_assessment_date: string;
  notes: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceComplianceCreate {
  regulation_name: string;
  compliance_type: string;
  compliance_status: ComplianceStatus;
  assessment_date: string;
  assessed_by: string;
  next_assessment_date: string;
  notes: string;
  status: string;
}

export interface FinanceComplianceUpdate {
  regulation_name?: string;
  compliance_type?: string;
  compliance_status?: ComplianceStatus;
  assessment_date?: string;
  assessed_by?: string;
  next_assessment_date?: string;
  notes?: string;
  status?: string;
}

export interface FinanceComplianceQuery {
  search?: string;
  compliance_type?: string;
  compliance_status?: ComplianceStatus;
  assessed_by?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceRatio {
  id: string;
  ratio_name: string;
  ratio_type: FinancialRatio;
  ratio_value: number;
  benchmark_value: number;
  variance: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceRatioCreate {
  ratio_name: string;
  ratio_type: FinancialRatio;
  ratio_value: number;
  benchmark_value: number;
  variance: number;
  period: string;
}

export interface FinanceRatioUpdate {
  ratio_name?: string;
  ratio_type?: FinancialRatio;
  ratio_value?: number;
  benchmark_value?: number;
  variance?: number;
  period?: string;
}

export interface FinanceRatioQuery {
  search?: string;
  ratio_type?: FinancialRatio;
  period?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceBudgetVariance {
  id: string;
  budget_id: string;
  line_id: string;
  budgeted_amount: number;
  actual_amount: number;
  variance: number;
  variance_type: BudgetVariance;
  percentage: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceBudgetVarianceCreate {
  budget_id: string;
  line_id: string;
  budgeted_amount: number;
  actual_amount: number;
  variance: number;
  variance_type: BudgetVariance;
  percentage: number;
  period: string;
}

export interface FinanceBudgetVarianceUpdate {
  budget_id?: string;
  line_id?: string;
  budgeted_amount?: number;
  actual_amount?: number;
  variance?: number;
  variance_type?: BudgetVariance;
  percentage?: number;
  period?: string;
}

export interface FinanceBudgetVarianceQuery {
  budget_id?: string;
  line_id?: string;
  variance_type?: BudgetVariance;
  period?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceCostAllocation {
  id: string;
  cost_center: CostCenter;
  allocated_amount: number;
  allocation_method: CostAllocationMethod;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceCostAllocationCreate {
  cost_center: CostCenter;
  allocated_amount: number;
  allocation_method: CostAllocationMethod;
  period: string;
}

export interface FinanceCostAllocationUpdate {
  cost_center?: CostCenter;
  allocated_amount?: number;
  allocation_method?: CostAllocationMethod;
  period?: string;
}

export interface FinanceCostAllocationQuery {
  cost_center?: CostCenter;
  allocation_method?: CostAllocationMethod;
  period?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceInvestmentReturn {
  id: string;
  investment_id: string;
  return_date: string;
  return_amount: number;
  return_type: InvestmentReturn;
  percentage: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceInvestmentReturnCreate {
  investment_id: string;
  return_date: string;
  return_amount: number;
  return_type: InvestmentReturn;
  percentage: number;
  notes: string;
}

export interface FinanceInvestmentReturnUpdate {
  investment_id?: string;
  return_date?: string;
  return_amount?: number;
  return_type?: InvestmentReturn;
  percentage?: number;
  notes?: string;
}

export interface FinanceInvestmentReturnQuery {
  investment_id?: string;
  return_date?: string;
  return_type?: InvestmentReturn;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceExchangeRate {
  id: string;
  currency_from: Currency;
  currency_to: Currency;
  rate: number;
  rate_type: ExchangeRateType;
  effective_date: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceExchangeRateCreate {
  currency_from: Currency;
  currency_to: Currency;
  rate: number;
  rate_type: ExchangeRateType;
  effective_date: string;
  source: string;
}

export interface FinanceExchangeRateUpdate {
  currency_from?: Currency;
  currency_to?: Currency;
  rate?: number;
  rate_type?: ExchangeRateType;
  effective_date?: string;
  source?: string;
}

export interface FinanceExchangeRateQuery {
  currency_from?: Currency;
  currency_to?: Currency;
  rate_type?: ExchangeRateType;
  effective_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceContractClause {
  id: string;
  contract_id: string;
  clause_type: ContractClauseType;
  clause_text: string;
  clause_order: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceContractClauseCreate {
  contract_id: string;
  clause_type: ContractClauseType;
  clause_text: string;
  clause_order: number;
  status: string;
}

export interface FinanceContractClauseUpdate {
  contract_id?: string;
  clause_type?: ContractClauseType;
  clause_text?: string;
  clause_order?: number;
  status?: string;
}

export interface FinanceContractClauseQuery {
  contract_id?: string;
  clause_type?: ContractClauseType;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceContractPayment {
  id: string;
  contract_id: string;
  payment_number: string;
  amount: number;
  currency: Currency;
  payment_date: string;
  invoice_number: string;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
}

export interface FinanceContractPaymentCreate {
  contract_id: string;
  payment_number: string;
  amount: number;
  currency: Currency;
  payment_date: string;
  invoice_number: string;
  status: PaymentStatus;
}

export interface FinanceContractPaymentUpdate {
  contract_id?: string;
  payment_number?: string;
  amount?: number;
  currency?: Currency;
  payment_date?: string;
  invoice_number?: string;
  status?: PaymentStatus;
}

export interface FinanceContractPaymentQuery {
  contract_id?: string;
  payment_number?: string;
  status?: PaymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FinanceBudgetTemplate {
  id: string;
  template_name: string;
  template_type: BudgetTemplate;
  description: string;
  categories: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface FinanceBudgetTemplateCreate {
  template_name: string;
  template_type: BudgetTemplate;
  description: string;
  categories: string;
  created_by: string;
}

export interface FinanceBudgetTemplateUpdate {
  template_name?: string;
  template_type?: BudgetTemplate;
  description?: string;
  categories?: string;
  created_by?: string;
}

export interface FinanceBudgetTemplateQuery {
  search?: string;
  template_type?: BudgetTemplate;
  created_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}