export enum InvestmentType {
  EQUITY = 'EQUITY',
  DEBT = 'DEBT',
  CONVERTIBLE = 'CONVERTIBLE',
  REVENUE_BASED = 'REVENUE_BASED',
  GRANT = 'GRANT',
  PRIZE = 'PRIZE',
  IMPACT_BOND = 'IMPACT_BOND',
  PAY_FOR_SUCCESS = 'PAY_FOR_SUCCESS',
}

export enum InvestmentRoundStatus {
  PLANNING = 'PLANNING',
  FUNDRAISING = 'FUNDRAISING',
  DUE_DILIGENCE = 'DUE_DILIGENCE',
  TERM_NEGOTIATION = 'TERM_NEGOTIATION',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
  EXTENDED = 'EXTENDED',
}

export enum InvestorType {
  ANGEL = 'ANGEL',
  VENTURE_CAPITAL = 'VENTURE_CAPITAL',
  PRIVATE_EQUITY = 'PRIVATE_EQUITY',
  INSTITUTIONAL = 'INSTITUTIONAL',
  CORPORATE = 'CORPORATE',
  GOVERNMENT = 'GOVERNMENT',
  FAMILY_OFFICE = 'FAMILY_OFFICE',
  IMPACT_INVESTOR = 'IMPACT_INVESTOR',
}

export enum RiskLevel {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export enum ExitStrategy {
  IPO = 'IPO',
  ACQUISITION = 'ACQUISITION',
  MERGER = 'MERGER',
  BUYBACK = 'BUYBACK',
  LIQUIDATION = 'LIQUIDATION',
  SECONDARY_SALE = 'SECONDARY_SALE',
  DIVIDEND_HARVEST = 'DIVIDEND_HARVEST',
}

export enum ImpactMetricCategory {
  LEARNING_OUTCOMES = 'LEARNING_OUTCOMES',
  ENROLLMENT = 'ENROLLMENT',
  RETENTION = 'RETENTION',
  EMPLOYABILITY = 'EMPLOYABILITY',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  DIGITAL_ACCESS = 'DIGITAL_ACCESS',
  GENDER_EQUALITY = 'GENDER_EQUALITY',
  INCLUSION = 'INCLUSION',
}

export enum ValuationMethod {
  DCF = 'DCF',
  COMPARABLE = 'COMPARABLE',
  PRECEDENT = 'PRECEDENT',
  COST_BASED = 'COST_BASED',
  MARKET_MULTIPLE = 'MARKET_MULTIPLE',
}

export interface EducationProject {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  category: string;
  targetImpact: string;
  totalFundingRequired: number;
  fundingSecured: number;
  currency: string;
  expectedROI: number;
  riskLevel: RiskLevel;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InvestmentOpportunity {
  id: string;
  schoolId: string;
  projectId: string;
  title: string;
  description: string;
  investmentType: InvestmentType;
  minimumInvestment: number;
  maximumInvestment: number;
  currency: string;
  expectedReturn: number;
  duration: string;
  riskLevel: RiskLevel;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InvestorProfile {
  id: string;
  schoolId: string;
  name: string;
  type: InvestorType;
  country: string;
  totalInvestments: number;
  investmentFocus: string[];
  minInvestmentSize: number;
  maxInvestmentSize: number;
  currency: string;
  isAccredited: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InvestmentRound {
  id: string;
  schoolId: string;
  projectId: string;
  name: string;
  type: InvestmentType;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: InvestmentRoundStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FundingTarget {
  id: string;
  schoolId: string;
  projectId: string;
  roundId: string;
  targetAmount: number;
  minimumRaise: number;
  maximumRaise: number;
  currency: string;
  deadline: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CapitalCommitment {
  id: string;
  schoolId: string;
  roundId: string;
  investorId: string;
  committedAmount: number;
  currency: string;
  committedDate: string;
  callSchedule: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CapitalAllocation {
  id: string;
  schoolId: string;
  projectId: string;
  roundId: string;
  amount: number;
  currency: string;
  allocationDate: string;
  purpose: string;
  trancheNumber: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ImpactMetric {
  id: string;
  schoolId: string;
  projectId: string;
  category: ImpactMetricCategory;
  name: string;
  targetValue: number;
  actualValue: number;
  unit: string;
  measurementDate: string;
  methodology: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ROI {
  id: string;
  schoolId: string;
  projectId: string;
  calculationDate: string;
  investmentAmount: number;
  returnAmount: number;
  roiPercentage: number;
  timeHorizon: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IRR {
  id: string;
  schoolId: string;
  projectId: string;
  calculationDate: string;
  irrPercentage: number;
  cashFlows: number[];
  periodYears: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NPV {
  id: string;
  schoolId: string;
  projectId: string;
  calculationDate: string;
  discountRate: number;
  npv: number;
  presentValue: number;
  futureValue: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InvestmentRisk {
  id: string;
  schoolId: string;
  projectId: string;
  riskCategory: string;
  description: string;
  probability: number;
  impact: number;
  riskScore: number;
  mitigationStrategy: string;
  owner: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InvestmentPortfolio {
  id: string;
  schoolId: string;
  investorId: string;
  name: string;
  totalValue: number;
  totalInvested: number;
  unrealizedGain: number;
  currency: string;
  numberOfInvestments: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PortfolioPerformance {
  id: string;
  schoolId: string;
  portfolioId: string;
  period: string;
  totalReturn: number;
  annualizedReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  benchmarkReturn: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InvestmentExit {
  id: string;
  schoolId: string;
  projectId: string;
  investorId: string;
  strategy: ExitStrategy;
  exitAmount: number;
  entryAmount: number;
  multiple: number;
  holdingPeriod: string;
  exitDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DueDiligence {
  id: string;
  schoolId: string;
  projectId: string;
  investorId: string;
  checklistItems: string[];
  completedItems: string[];
  findings: string[];
  riskAssessment: string;
  recommendation: string;
  status: string;
  conductedBy: string;
  conductedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TermSheet {
  id: string;
  schoolId: string;
  projectId: string;
  roundId: string;
  investorId: string;
  investmentAmount: number;
  valuation: number;
  equityPercentage: number;
  liquidationPreference: number;
  antiDilution: string;
  boardSeats: number;
  vetoRights: string[];
  status: string;
  signedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
