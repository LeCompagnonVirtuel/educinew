export enum WalletType {
  PERSONAL = "PERSONAL",
  EMPLOYER_SPONSORED = "EMPLOYER_SPONSORED",
  GOVERNMENT_FUND = "GOVERNMENT_FUND",
  SCHOLARSHIP = "SCHOLARSHIP",
  GRANT = "GRANT",
  INSTITUTIONAL = "INSTITUTIONAL",
  SHARED = "SHARED",
  ESCROW = "ESCROW",
  CRYPTO = "CRYPTO",
  HYBRID = "HYBRID",
}

export enum CreditType {
  TRAINING = "TRAINING",
  LEARNING = "LEARNING",
  CERTIFICATION = "CERTIFICATION",
  COURSE = "COURSE",
  TUITION = "TUITION",
  BOOKS = "BOOKS",
  TECHNOLOGY = "TECHNOLOGY",
  TRANSPORT = "TRANSPORT",
  HOUSING = "HOUSING",
  SUBSISTENCE = "SUBSISTENCE",
}

export enum GrantType {
  MERIT_BASED = "MERIT_BASED",
  NEED_BASED = "NEED_BASED",
  RESEARCH = "RESEARCH",
  INNOVATION = "INNOVATION",
  DIVERSITY = "DIVERSITY",
  REGIONAL = "REGIONAL",
  INDUSTRY = "INDUSTRY",
  GOVERNMENT = "GOVERNMENT",
  INTERNATIONAL = "INTERNATIONAL",
  EMERGENCY = "EMERGENCY",
}

export enum ScholarshipType {
  ACADEMIC = "ACADEMIC",
  ATHLETIC = "ATHLETIC",
  ARTISTIC = "ARTISTIC",
  NEED_BASED = "NEED_BASED",
  MERIT_BASED = "MERIT_BASED",
  COMMUNITY_SERVICE = "COMMUNITY_SERVICE",
  MINORITY = "MINORITY",
  INTERNATIONAL = "INTERNATIONAL",
  INDUSTRY_SPONSORED = "INDUSTRY_SPONSORED",
  GOVERNMENT = "GOVERNMENT",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
  CANCELLED = "CANCELLED",
  DISPUTED = "DISPUTED",
  ON_HOLD = "ON_HOLD",
  SCHEDULED = "SCHEDULED",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PAUSED = "PAUSED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  TRIAL = "TRIAL",
  PENDING = "PENDING",
  REACTIVATED = "REACTIVATED",
}

export enum FundingStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  PARTIALLY_APPROVED = "PARTIALLY_APPROVED",
  REJECTED = "REJECTED",
  DISBURSED = "DISBURSED",
  PARTIALLY_DISBURSED = "PARTIALLY_DISBURSED",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
  APPEALED = "APPEALED",
}

export enum EligibilityStatus {
  ELIGIBLE = "ELIGIBLE",
  INELIGIBLE = "INELIGIBLE",
  PARTIALLY_ELIGIBLE = "PARTIALLY_ELIGIBLE",
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  REQUIRES_DOCUMENTATION = "REQUIRES_DOCUMENTATION",
  CONDITIONALLY_ELIGIBLE = "CONDITIONALLY_ELIGIBLE",
  EXPIRED = "EXPIRED",
}

export enum DistributionMethod {
  DIRECT_DEPOSIT = "DIRECT_DEPOSIT",
  BANK_TRANSFER = "BANK_TRANSFER",
  MOBILE_MONEY = "MOBILE_MONEY",
  CHECK = "CHECK",
  CASH = "CASH",
  VOUCHER = "VOUCHER",
  CREDIT = "CREDIT",
  SCHOLARSHIP = "SCHOLARSHIP",
  IN_KIND = "IN_KIND",
  ESCROW = "ESCROW",
}

export enum ROIType {
  COURSE = "COURSE",
  CERTIFICATION = "CERTIFICATION",
  DEGREE = "DEGREE",
  TRAINING_PROGRAM = "TRAINING_PROGRAM",
  TUITION = "TUITION",
  BOOKS = "BOOKS",
  TECHNOLOGY = "TECHNOLOGY",
  OVERALL = "OVERALL",
  EMPLOYER_SPONSORED = "EMPLOYER_SPONSORED",
  GOVERNMENT_PROGRAM = "GOVERNMENT_PROGRAM",
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  TRANSFER = "TRANSFER",
  PAYMENT = "PAYMENT",
  REFUND = "REFUND",
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
  ADJUSTMENT = "ADJUSTMENT",
  FEE = "FEE",
  INTEREST = "INTEREST",
}

export enum CurrencyCode {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  XOF = "XOF",
  XAF = "XAF",
  KES = "KES",
  NGN = "NGN",
  ZAR = "ZAR",
  GHS = "GHS",
  EGP = "EGP",
  MAD = "MAD",
  TND = "TND",
  DZD = "DZD",
  CFA = "CFA",
  LOCAL = "LOCAL",
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  MOBILE_MONEY = "MOBILE_MONEY",
  WALLET = "WALLET",
  CRYPTO = "CRYPTO",
  CHECK = "CHECK",
  CASH = "CASH",
  DIRECT_DEBIT = "DIRECT_DEBIT",
  QR_CODE = "QR_CODE",
}

export enum RecurrenceFrequency {
  ONE_TIME = "ONE_TIME",
  WEEKLY = "WEEKLY",
  BI_WEEKLY = "BI_WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  ANNUAL = "ANNUAL",
}

export enum ApprovalLevel {
  NONE = "NONE",
  SINGLE = "SINGLE",
  DUAL = "DUAL",
  MULTI_LEVEL = "MULTI_LEVEL",
  COMMITTEE = "COMMITTEE",
}

export enum AuditStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FLAGGED = "FLAGGED",
  RESOLVED = "RESOLVED",
  ESCALATED = "ESCALATED",
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PARTIALLY_COMPLIANT = "PARTIALLY_COMPLIANT",
  UNDER_REVIEW = "UNDER_REVIEW",
  WAIVED = "WAIVED",
}

export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum NotificationType {
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  PAYMENT_UPCOMING = "PAYMENT_UPCOMING",
  BALANCE_LOW = "BALANCE_LOW",
  SUBSCRIPTION_EXPIRING = "SUBSCRIPTION_EXPIRING",
  FUNDING_APPROVED = "FUNDING_APPROVED",
  FUNDING_REJECTED = "FUNDING_REJECTED",
  DISBURSEMENT_READY = "DISBURSEMENT_READY",
  RECEIPT_AVAILABLE = "RECEIPT_AVAILABLE",
  FRAUD_ALERT = "FRAUD_ALERT",
}

export enum ReportType {
  FINANCIAL_SUMMARY = "FINANCIAL_SUMMARY",
  TRANSACTION_LOG = "TRANSACTION_LOG",
  BUDGET_REPORT = "BUDGET_REPORT",
  EXPENSE_REPORT = "EXPENSE_REPORT",
  INCOME_REPORT = "INCOME_REPORT",
  ROI_REPORT = "ROI_REPORT",
  COMPLIANCE_REPORT = "COMPLIANCE_REPORT",
  AUDIT_REPORT = "AUDIT_REPORT",
  TAX_REPORT = "TAX_REPORT",
  PROJECTION = "PROJECTION",
}

export enum BudgetCategory {
  TUITION = "TUITION",
  BOOKS = "BOOKS",
  TECHNOLOGY = "TECHNOLOGY",
  HOUSING = "HOUSING",
  TRANSPORT = "TRANSPORT",
  FOOD = "FOOD",
  HEALTHCARE = "HEALTHCARE",
  CERTIFICATION = "CERTIFICATION",
  TRAINING = "TRAINING",
  SOFTWARE = "SOFTWARE",
  EQUIPMENT = "EQUIPMENT",
  MISCELLANEOUS = "MISCELLANEOUS",
}

export enum ExpenseStatus {
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  REIMBURSED = "REIMBURSED",
  PENDING = "PENDING",
}

export enum InvoiceStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  VIEWED = "VIEWED",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
  PARTIALLY_PAID = "PARTIALLY_PAID",
}

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_AMOUNT = "FIXED_AMOUNT",
  EARLY_BIRD = "EARLY_BIRD",
  GROUP = "GROUP",
  LOYALTY = "LOYALTY",
  PROMOTIONAL = "PROMOTIONAL",
  SCHOLARSHIP = "SCHOLARSHIP",
}

export enum FeeType {
  TUITION = "TUITION",
  REGISTRATION = "REGISTRATION",
  EXAMINATION = "EXAMINATION",
  LABORATORY = "LABORATORY",
  LIBRARY = "LIBRARY",
  TECHNOLOGY = "TECHNOLOGY",
  STUDENT_ACTIVITY = "STUDENT_ACTIVITY",
  HEALTH_INSURANCE = "HEALTH_INSURANCE",
  PARKING = "PARKING",
  LATE_FEE = "LATE_FEE",
}

export enum RefundPolicy {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  PRO_RATA = "PRO_RATA",
  CREDIT_ONLY = "CREDIT_ONLY",
  NO_REFUND = "NO_REFUND",
  SLIDING_SCALE = "SLIDING_SCALE",
}

export enum InstallmentPlanType {
  FIXED = "FIXED",
  DECLINING = "DECLINING",
  GRADUATED = "GRADUATED",
  BALLOON = "BALLOON",
  CUSTOM = "CUSTOM",
}

export enum InsuranceType {
  HEALTH = "HEALTH",
  DENTAL = "DENTAL",
  VISION = "VISION",
  LIFE = "LIFE",
  DISABILITY = "DISABILITY",
  LIABILITY = "LIABILITY",
}

export enum TaxExemptStatus {
  EXEMPT = "EXEMPT",
  PARTIALLY_EXEMPT = "PARTIALLY_EXEMPT",
  NON_EXEMPT = "NON_EXEMPT",
  PENDING = "PENDING",
}

export enum FinancialAidType {
  GRANT = "GRANT",
  SCHOLARSHIP = "SCHOLARSHIP",
  LOAN = "LOAN",
  WORK_STUDY = "WORK_STUDY",
  TUITION_WAIVER = "TUITION_WAIVER",
  EMERGENCY_AID = "EMERGENCY_AID",
}

export enum LoanStatus {
  APPLICATION = "APPLICATION",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  DISBURSED = "DISBURSED",
  REPAYING = "REPAYING",
  DEFERRED = "DEFERRED",
  FORGIVEN = "FORGIVEN",
  DEFAULTED = "DEFAULTED",
}

export enum DisbursementStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  PARTIAL = "PARTIAL",
}

export enum ReconciliationStatus {
  PENDING = "PENDING",
  MATCHED = "MATCHED",
  UNMATCHED = "UNMATCHED",
  DISCREPANCY = "DISCREPANCY",
  RESOLVED = "RESOLVED",
}

export enum ExchangeRateType {
  SPOT = "SPOT",
  FORWARD = "FORWARD",
  MID = "MID",
  BANK = "BANK",
}

export enum FraudAlertType:
  UNUSUAL_TRANSACTION = "UNUSUAL_TRANSACTION",
  VELOCITY_CHECK = "VELOCITY_CHECK",
  AMOUNT_ANOMALY = "AMOUNT_ANOMALY",
  LOCATION_ANOMALY = "LOCATION_ANOMALY",
  IDENTITY_MISMATCH = "IDENTITY_MISMATCH",
  DUPLICATE_TRANSACTION = "DUPLICATE_TRANSACTION",
}

export enum PaymentGateway {
  STRIPE = "STRIPE",
  PAYPAL = "PAYPAL",
  FLUTTERWAVE = "FLUTTERWAVE",
  PAYSTACK = "PAYSTACK",
  RAZORPAY = "RAZORPAY",
  SQUARE = "SQUARE",
  MONEY_FUSION = "MONEY_FUSION",
}

export enum RecipientType {
  STUDENT = "STUDENT",
  INSTITUTION = "INSTITUTION",
  VENDOR = "VENDOR",
  EMPLOYER = "EMPLOYER",
  GOVERNMENT = "GOVERNMENT",
  NON_PROFIT = "NON_PROFIT",
}

export enum FundSource {
  PERSONAL = "PERSONAL",
  EMPLOYER = "EMPLOYER",
  GOVERNMENT = "GOVERNMENT",
  SCHOLARSHIP = "SCHOLARSHIP",
  LOAN = "LOAN",
  FAMILY = "FAMILY",
  CHARITY = "CHARITY",
  CROWDFUNDING = "CROWDFUNDING",
}

export enum FinancialGoalType {
  TUITION = "TUITION",
  CERTIFICATION = "CERTIFICATION",
  TRAINING = "TRAINING",
  EMERGENCY = "EMERGENCY",
  RETIREMENT = "RETIREMENT",
  INVESTMENT = "INVESTMENT",
}

export enum AlertSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  SUCCESS = "SUCCESS",
}

export interface LearningWallet {
  id: string;
  school_id: string;
  user_id: string;
  wallet_name: string;
  wallet_type: WalletType;
  currency: CurrencyCode;
  balance: number;
  available_balance: number;
  pending_balance: number;
  frozen_balance: number;
  total_deposited: number;
  total_spent: number;
  total_refunded: number;
  total_earned_interest: number;
  credit_balance: Record<CreditType, number>;
  transactions: WalletTransaction[];
  recurring_payments: RecurringPayment[];
  linked_accounts: LinkedAccount[];
  auto_reload_enabled: boolean;
  auto_reload_threshold: number;
  auto_reload_amount: number;
  spending_limits: SpendingLimit[];
  notifications_enabled: boolean;
  last_activity: string;
  is_active: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface WalletTransaction {
  transaction_id: string;
  transaction_type: TransactionType;
  amount: number;
  currency: CurrencyCode;
  balance_after: number;
  description: string;
  category: BudgetCategory;
  reference: string;
  recipient_id: string | null;
  recipient_type: RecipientType | null;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface RecurringPayment {
  payment_id: string;
  name: string;
  amount: number;
  currency: CurrencyCode;
  frequency: RecurrenceFrequency;
  next_payment_date: string;
  end_date: string | null;
  payment_method: PaymentMethod;
  category: BudgetCategory;
  description: string;
  is_active: boolean;
  total_payments: number;
  successful_payments: number;
  failed_payments: number;
  metadata: Record<string, unknown>;
}

export interface LinkedAccount {
  account_id: string;
  account_type: string;
  provider: string;
  account_number: string;
  is_primary: boolean;
  is_verified: boolean;
  last_verified: string;
  metadata: Record<string, unknown>;
}

export interface SpendingLimit {
  category: BudgetCategory;
  daily_limit: number;
  weekly_limit: number;
  monthly_limit: number;
  current_daily_spend: number;
  current_weekly_spend: number;
  current_monthly_spend: number;
  currency: CurrencyCode;
}

export interface TrainingCredit {
  id: string;
  school_id: string;
  user_id: string;
  credit_type: CreditType;
  amount: number;
  currency: CurrencyCode;
  remaining_amount: number;
  used_amount: number;
  expired_amount: number;
  source: FundSource;
  source_reference: string;
  issuer: string;
  issue_date: string;
  expiration_date: string;
  valid_from: string;
  valid_until: string;
  transferable: boolean;
  usable_for: string[];
  restrictions: string[];
  status: CredentialStatus;
  auto_apply: boolean;
  priority: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EducationGrant {
  id: string;
  school_id: string;
  grant_name: string;
  grant_type: GrantType;
  funding_amount: number;
  currency: CurrencyCode;
  total_applicants: number;
  approved_applicants: number;
  disbursed_amount: number;
  remaining_amount: number;
  eligibility_criteria: EligibilityCriteria;
  application_deadline: string;
  funding_period_start: string;
  funding_period_end: string;
  max_recipients: number;
  current_recipients: number;
  renewal_allowed: boolean;
  max_renewals: number;
  renewal_deadline: string | null;
  required_documents: string[];
  selection_criteria: SelectionCriterion[];
  approval_workflow: ApprovalWorkflow;
  disbursement_schedule: DisbursementSchedule[];
  reporting_requirements: string[];
  compliance_requirements: string[];
  status: FundingStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EligibilityCriteria {
  min_gpa: number | null;
  max_gpa: number | null;
  education_levels: EducationLevel[];
  fields_of_study: string[];
  citizenship_requirements: string[];
  residency_requirements: string[];
  income_threshold: number | null;
  age_min: number | null;
  age_max: number | null;
  enrollment_status: string[];
  disability_status: boolean;
  veteran_status: boolean;
  first_generation: boolean;
  minimum_credits: number | null;
  maximum_credits: number | null;
  additional_criteria: Record<string, unknown>;
}

export type EducationLevel = string;

export interface SelectionCriterion {
  criterion_name: string;
  weight: number;
  scoring_method: string;
  min_score: number;
  max_score: number;
  description: string;
}

export interface ApprovalWorkflow {
  levels: ApprovalLevel[];
  approvers: string[];
  auto_approve_threshold: number;
  escalation_days: number;
  notifications: boolean;
}

export interface DisbursementSchedule {
  installment_number: number;
  amount: number;
  scheduled_date: string;
  actual_date: string | null;
  status: DisbursementStatus;
  payment_method: PaymentMethod;
}

export interface Scholarship {
  id: string;
  school_id: string;
  scholarship_name: string;
  scholarship_type: ScholarshipType;
  funding_amount: number;
  currency: CurrencyCode;
  total_applicants: number;
  approved_applicants: number;
  disbursed_amount: number;
  remaining_amount: number;
  sponsor_name: string;
  sponsor_type: string;
  eligibility_criteria: EligibilityCriteria;
  application_deadline: string;
  award_period_start: string;
  award_period_end: string;
  renewable: boolean;
  max_renewals: number;
  gpa_maintenance: number;
  enrollment_requirement: string;
  required_documents: string[];
  selection_process: string;
  interview_required: boolean;
  essay_required: boolean;
  recommendation_letters_required: number;
  community_service_hours: number | null;
  status: FundingStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EmployerTrainingBudget {
  id: string;
  school_id: string;
  employer_id: string;
  employer_name: string;
  budget_name: string;
  fiscal_year: number;
  total_budget: number;
  currency: CurrencyCode;
  allocated_amount: number;
  spent_amount: number;
  remaining_amount: number;
  committed_amount: number;
  budget_by_category: Record<BudgetCategory, number>;
  employees_enrolled: number;
  employees_completed: number;
  average_spend_per_employee: number;
  approved_training_providers: string[];
  approved_courses: string[];
  approval_workflow: ApprovalWorkflow;
  expense_policies: ExpensePolicy[];
  reporting_frequency: string;
  budget_owner: string;
  budget_approver: string;
  status: FundingStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ExpensePolicy {
  category: BudgetCategory;
  max_amount_per_transaction: number;
  max_monthly_amount: number;
  requires_receipt: boolean;
  requires_approval: boolean;
  approval_chain: string[];
  eligible_expenses: string[];
  excluded_expenses: string[];
}

export interface GovernmentTrainingProgram {
  id: string;
  school_id: string;
  program_name: string;
  government_agency: string;
  country: string;
  funding_type: string;
  total_funding: number;
  currency: CurrencyCode;
  available_funding: number;
  disbursement_amount: number;
  eligibility_criteria: EligibilityCriteria;
  application_process: string;
  application_deadline: string;
  program_duration_months: number;
  training_providers: string[];
  eligible_courses: string[];
  eligible_certifications: string[];
  participant_requirements: string[];
  reporting_requirements: string[];
  compliance_requirements: string[];
  status: FundingStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface LearningPayment {
  id: string;
  school_id: string;
  payer_id: string;
  payer_type: string;
  payee_id: string;
  payee_type: string;
  amount: number;
  currency: CurrencyCode;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_date: string;
  due_date: string;
  description: string;
  category: BudgetCategory;
  fee_type: FeeType;
  invoice_id: string | null;
  receipt_url: string | null;
  transaction_reference: string;
  refund_amount: number;
  refund_reason: string | null;
  discount_applied: number;
  discount_type: DiscountType | null;
  tax_amount: number;
  tax_rate: number;
  total_amount: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CoursePayment {
  id: string;
  school_id: string;
  student_id: string;
  course_id: string;
  course_name: string;
  provider: string;
  original_amount: number;
  discounted_amount: number;
  final_amount: number;
  currency: CurrencyCode;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  installment_plan_id: string | null;
  financial_aid_id: string | null;
  scholarship_id: string | null;
  employer_budget_id: string | null;
  government_program_id: string | null;
  wallet_id: string | null;
  credits_applied: number;
  receipt_url: string | null;
  enrollment_status: string;
  completion_date: string | null;
  refund_policy: RefundPolicy;
  refund_deadline: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CertificationPayment {
  id: string;
  school_id: string;
  student_id: string;
  certification_id: string;
  certification_name: string;
  issuing_body: string;
  exam_fee: number;
  preparation_fee: number;
  total_amount: number;
  currency: CurrencyCode;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  exam_date: string | null;
  result: string | null;
  certificate_url: string | null;
  retake_allowed: boolean;
  retake_fee: number;
  financial_aid_id: string | null;
  employer_budget_id: string | null;
  wallet_id: string | null;
  credits_applied: number;
  receipt_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SubscriptionManagement {
  id: string;
  school_id: string;
  subscriber_id: string;
  subscriber_type: string;
  plan_name: string;
  plan_description: string;
  subscription_status: SubscriptionStatus;
  billing_frequency: RecurrenceFrequency;
  amount: number;
  currency: CurrencyCode;
  payment_method: PaymentMethod;
  trial_start_date: string | null;
  trial_end_date: string | null;
  subscription_start_date: string;
  next_billing_date: string;
  subscription_end_date: string | null;
  auto_renew: boolean;
  cancellation_date: string | null;
  cancellation_reason: string | null;
  pause_date: string | null;
  resume_date: string | null;
  total_paid: number;
  total_payments: number;
  failed_payments: number;
  features_included: string[];
  usage_limits: Record<string, number>;
  current_usage: Record<string, number>;
  discount_code: string | null;
  discount_percentage: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FinancialAid {
  id: string;
  school_id: string;
  student_id: string;
  aid_type: FinancialAidType;
  aid_name: string;
  funding_amount: number;
  currency: CurrencyCode;
  source: FundSource;
  source_reference: string;
  application_id: string;
  application_date: string;
  award_date: string | null;
  disbursement_date: string | null;
  status: FundingStatus;
  eligibility_status: EligibilityStatus;
  conditions: string[];
  renewal_terms: string | null;
  gpa_requirement: number | null;
  enrollment_requirement: string;
  repayment_terms: string | null;
  interest_rate: number | null;
  grace_period_months: number | null;
  documents_required: string[];
  documents_submitted: string[];
  documents_verified: string[];
  approved_amount: number;
  disbursed_amount: number;
  remaining_amount: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FundingEligibility {
  id: string;
  school_id: string;
  user_id: string;
  eligibility_status: EligibilityStatus;
  eligible_funds: EligibleFund[];
  total_eligible_amount: number;
  matched_programs: string[];
  recommendation_score: number;
  assessment_date: string;
  expiry_date: string;
  documents_needed: string[];
  next_steps: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EligibleFund {
  fund_id: string;
  fund_name: string;
  fund_type: string;
  estimated_amount: number;
  currency: CurrencyCode;
  match_score: number;
  deadline: string;
  requirements_met: string[];
  requirements_missing: string[];
  probability_of_award: number;
}

export interface FundingApplication {
  id: string;
  school_id: string;
  applicant_id: string;
  fund_id: string;
  fund_name: string;
  fund_type: string;
  application_status: FundingStatus;
  application_date: string;
  last_updated: string;
  submitted_documents: ApplicationDocument[];
  application_data: Record<string, unknown>;
  review_notes: string | null;
  reviewer_id: string | null;
  review_date: string | null;
  decision_date: string | null;
  approved_amount: number | null;
  denial_reason: string | null;
  appeal_deadline: string | null;
  appeal_submitted: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ApplicationDocument {
  document_id: string;
  document_type: string;
  document_name: string;
  file_url: string;
  file_size: number;
  upload_date: string;
  verified: boolean;
  verification_date: string | null;
}

export interface FundingDistribution {
  id: string;
  school_id: string;
  distribution_name: string;
  fund_source: FundSource;
  total_amount: number;
  currency: CurrencyCode;
  distributed_amount: number;
  remaining_amount: number;
  distribution_method: DistributionMethod;
  recipients: DistributionRecipient[];
  schedule: DisbursementSchedule[];
  compliance_rules: ComplianceRule[];
  reporting_requirements: string[];
  audit_trail: AuditEntry[];
  status: DisbursementStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DistributionRecipient {
  recipient_id: string;
  recipient_name: string;
  recipient_type: RecipientType;
  allocated_amount: number;
  distributed_amount: number;
  currency: CurrencyCode;
  distribution_method: DistributionMethod;
  status: DisbursementStatus;
  distribution_date: string | null;
  reference: string;
}

export interface ComplianceRule {
  rule_id: string;
  rule_name: string;
  rule_description: string;
  required: boolean;
  verification_method: string;
  compliance_status: ComplianceStatus;
  deadline: string | null;
}

export interface AuditEntry {
  entry_id: string;
  action: string;
  performed_by: string;
  timestamp: string;
  details: Record<string, unknown>;
}

export interface TrainingROI {
  id: string;
  school_id: string;
  training_id: string;
  training_name: string;
  roi_type: ROIType;
  total_investment: number;
  currency: CurrencyCode;
  direct_returns: number;
  indirect_returns: number;
  intangible_returns: number;
  roi_percentage: number;
  roi_ratio: number;
  payback_period_months: number;
  net_present_value: number;
  internal_rate_return: number;
  cost_per_learner: number;
  productivity_gain: number;
  employee_retention_improvement: number;
  skill_improvement_score: number;
  performance_improvement_score: number;
  satisfaction_improvement_score: number;
  measurement_period_months: number;
  measurement_date: string;
  confidence_score: number;
  benchmark_comparison: number;
  historical_data: ROIHistoricalData[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ROIHistoricalData {
  period: string;
  investment: number;
  returns: number;
  roi_percentage: number;
}

export interface FinanceConfig {
  id: string;
  school_id: string;
  default_currency: CurrencyCode;
  supported_currencies: CurrencyCode[];
  payment_methods_enabled: PaymentMethod[];
  distribution_methods_enabled: DistributionMethod[];
  auto_payment_enabled: boolean;
  auto_invoice_enabled: boolean;
  receipt_auto_generate: boolean;
  tax_rate: number;
  tax_inclusive: boolean;
  late_fee_percentage: number;
  late_fee_max: number;
  grace_period_days: number;
  refund_policy: RefundPolicy;
  refund_window_days: number;
  installment_plans_enabled: boolean;
  max_installments: number;
  installment_processing_fee: number;
  scholarship_auto_match: boolean;
  financial_aid_auto_match: boolean;
  government_program_auto_match: boolean;
  budget_alert_threshold: number;
  fraud_detection_enabled: boolean;
  reconciliation_auto: boolean;
  notification_settings: FinanceNotificationSettings;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface FinanceNotificationSettings {
  payment_received: boolean;
  payment_failed: boolean;
  payment_upcoming: boolean;
  balance_low: boolean;
  subscription_expiring: boolean;
  funding_approved: boolean;
  funding_rejected: boolean;
  disbursement_ready: boolean;
  receipt_available: boolean;
  fraud_alert: boolean;
  channels: NotificationType[];
}

export interface FinanceMetrics {
  id: string;
  school_id: string;
  measurement_date: string;
  period: string;
  total_revenue: number;
  total_expenses: number;
  net_income: number;
  total_wallet_balance: number;
  active_wallets: number;
  total_transactions: number;
  successful_transactions: number;
  failed_transactions: number;
  total_payments: number;
  average_payment_amount: number;
  total_scholarships_awarded: number;
  total_scholarships_disbursed: number;
  total_grants_awarded: number;
  total_grants_disbursed: number;
  total_financial_aid: number;
  total_employer_training_spend: number;
  total_government_program_funding: number;
  active_subscriptions: number;
  subscription_revenue: number;
  churn_rate: number;
  customer_acquisition_cost: number;
  lifetime_value: number;
  average_roi: number;
  outstanding_receivables: number;
  outstanding_payables: number;
  cash_flow: number;
  budget_utilization_rate: number;
  expense_by_category: Record<BudgetCategory, number>;
  revenue_by_source: Record<FundSource, number>;
  payment_method_distribution: Record<PaymentMethod, number>;
  currency_distribution: Record<CurrencyCode, number>;
  compliance_score: number;
  audit_score: number;
  fraud_rate: number;
  refund_rate: number;
  dispute_rate: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface InstallmentPlan {
  id: string;
  school_id: string;
  student_id: string;
  total_amount: number;
  currency: CurrencyCode;
  down_payment: number;
  number_of_installments: number;
  installment_amount: number;
  frequency: RecurrenceFrequency;
  plan_type: InstallmentPlanType;
  interest_rate: number;
  processing_fee: number;
  start_date: string;
  end_date: string;
  payment_method: PaymentMethod;
  auto_debit_enabled: boolean;
  installments: Installment[];
  status: SubscriptionStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Installment {
  installment_number: number;
  due_date: string;
  amount: number;
  principal: number;
  interest: number;
  fees: number;
  total: number;
  status: PaymentStatus;
  paid_date: string | null;
  paid_amount: number;
}

export interface Invoice {
  id: string;
  school_id: string;
  invoice_number: string;
  issuer_id: string;
  issuer_type: string;
  recipient_id: string;
  recipient_type: string;
  line_items: InvoiceLineItem[];
  subtotal: number;
  discount_amount: number;
  discount_type: DiscountType | null;
  tax_amount: number;
  tax_rate: number;
  total_amount: number;
  amount_paid: number;
  amount_due: number;
  currency: CurrencyCode;
  invoice_date: string;
  due_date: string;
  paid_date: string | null;
  status: InvoiceStatus;
  payment_terms: string;
  notes: string;
  payment_method: PaymentMethod | null;
  receipt_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface InvoiceLineItem {
  item_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  category: BudgetCategory;
  fee_type: FeeType | null;
}

export interface ExpenseClaim {
  id: string;
  school_id: string;
  claimant_id: string;
  claimant_name: string;
  expenses: ExpenseItem[];
  total_amount: number;
  currency: CurrencyCode;
  submission_date: string;
  status: ExpenseStatus;
  approver_id: string | null;
  approval_date: string | null;
  rejection_reason: string | null;
  reimbursement_date: string | null;
  reimbursement_amount: number;
  policy_compliance: ComplianceStatus;
  receipt_required: boolean;
  receipts_submitted: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ExpenseItem {
  item_id: string;
  description: string;
  amount: number;
  currency: CurrencyCode;
  date: string;
  category: BudgetCategory;
  receipt_url: string | null;
  justification: string;
  vendor: string;
  approved: boolean;
}

export interface BudgetAllocation {
  id: string;
  school_id: string;
  budget_name: string;
  fiscal_year: number;
  total_budget: number;
  currency: CurrencyCode;
  allocations: BudgetCategoryAllocation[];
  spent_total: number;
  committed_total: number;
  remaining_total: number;
  utilization_rate: number;
  status: FundingStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface BudgetCategoryAllocation {
  category: BudgetCategory;
  allocated_amount: number;
  spent_amount: number;
  committed_amount: number;
  remaining_amount: number;
  utilization_rate: number;
  alert_threshold: number;
  alerts_enabled: boolean;
}

export interface FinancialReport {
  id: string;
  school_id: string;
  report_name: string;
  report_type: ReportType;
  period_start: string;
  period_end: string;
  generated_at: string;
  generated_by: string;
  summary: Record<string, unknown>;
  sections: ReportSection[];
  charts: ReportChart[];
  data_tables: ReportDataTable[];
  export_formats: ExportFormat[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type ExportFormat = string;

export interface ReportSection {
  section_id: string;
  section_name: string;
  content: string;
  key_metrics: Record<string, number>;
}

export interface ReportChart {
  chart_id: string;
  chart_type: string;
  title: string;
  data: Record<string, unknown>;
}

export interface ReportDataTable {
  table_id: string;
  title: string;
  headers: string[];
  rows: string[][];
}

export interface FinanceAuditLog {
  id: string;
  school_id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_value: Record<string, unknown> | null;
  new_value: Record<string, unknown> | null;
  amount: number | null;
  currency: CurrencyCode | null;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  risk_level: RiskLevel;
  metadata: Record<string, unknown>;
  created_at: string;
}
