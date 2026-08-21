export enum CampaignStatus {
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
}

export enum DonationType {
  ONE_TIME = 'ONE_TIME',
  RECURRING = 'RECURRING',
  ANONYMOUS = 'ANONYMOUS',
  IN_KIND = 'IN_KIND',
  MATCHED = 'MATCHED',
  CORPORATE = 'CORPORATE',
  LEGACY = 'LEGACY',
}

export enum DonationFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL',
}

export enum MilestoneStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  ACHIEVED = 'ACHIEVED',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum FraudPreventionLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  ENHANCED = 'ENHANCED',
  MAXIMUM = 'MAXIMUM',
}

export enum ImpactReportType {
  FINANCIAL = 'FINANCIAL',
  ACADEMIC = 'ACADEMIC',
  SOCIAL = 'SOCIAL',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  COMPREHENSIVE = 'COMPREHENSIVE',
}

export interface CrowdfundingCampaign {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  shortDescription: string;
  goalAmount: number;
  raisedAmount: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  category: string;
  imageUrl: string;
  videoUrl: string;
  tags: string[];
  featuredAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CampaignProject {
  id: string;
  schoolId: string;
  campaignId: string;
  projectName: string;
  description: string;
  location: string;
  beneficiaryCount: number;
  totalCost: number;
  currency: string;
  timeline: string;
  expectedImpact: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CampaignDonor {
  id: string;
  schoolId: string;
  campaignId: string;
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  totalDonated: number;
  currency: string;
  donationCount: number;
  lastDonationAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Donation {
  id: string;
  schoolId: string;
  campaignId: string;
  donorId: string;
  amount: number;
  currency: string;
  type: DonationType;
  paymentMethod: string;
  paymentReference: string;
  message: string;
  isAnonymous: boolean;
  status: string;
  donatedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RecurringDonation {
  id: string;
  schoolId: string;
  campaignId: string;
  donorId: string;
  amount: number;
  currency: string;
  frequency: DonationFrequency;
  nextPaymentDate: string;
  lastPaymentDate: string | null;
  totalDonated: number;
  totalPayments: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CampaignGoal {
  id: string;
  schoolId: string;
  campaignId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  deadline: string;
  isStretch: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CampaignMilestone {
  id: string;
  schoolId: string;
  campaignId: string;
  name: string;
  description: string;
  targetAmount: number;
  targetDate: string;
  achievedDate: string | null;
  status: MilestoneStatus;
  percentageComplete: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CampaignVerification {
  id: string;
  schoolId: string;
  campaignId: string;
  verificationType: string;
  status: VerificationStatus;
  documents: string[];
  verifiedBy: string | null;
  verifiedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FraudPrevention {
  id: string;
  schoolId: string;
  campaignId: string;
  level: FraudPreventionLevel;
  riskScore: number;
  flags: string[];
  lastCheckedAt: string;
  actions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DonationImpactReport {
  id: string;
  schoolId: string;
  campaignId: string;
  reportType: ImpactReportType;
  period: string;
  totalDonations: number;
  totalDonors: number;
  beneficiariesReached: number;
  narrative: string;
  metrics: Record<string, number>;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CampaignUpdate {
  id: string;
  schoolId: string;
  campaignId: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  authorId: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DonorEngagement {
  id: string;
  schoolId: string;
  campaignId: string;
  donorId: string;
  engagementType: string;
  engagementDate: string;
  channel: string;
  message: string;
  responseReceived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RewardTier {
  id: string;
  schoolId: string;
  campaignId: string;
  name: string;
  description: string;
  minimumDonation: number;
  currency: string;
  maxClaimants: number;
  currentClaimants: number;
  rewardDescription: string;
  estimatedDelivery: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
