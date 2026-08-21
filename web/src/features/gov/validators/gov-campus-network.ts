// Government & National Governance Validators - Campus & Network
// Phase 2.9 - EduCI Platform

import { z } from 'zod';

// ─── Campus ──────────────────────────────────────────────────
export const campusCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().min(2).max(100),
  postalCode: z.string().max(20).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  capacity: z.number().int().min(0).optional(),
  area: z.number().min(0).optional(),
  type: z.enum(['main', 'branch', 'satellite', 'annex']),
  status: z.enum(['active', 'inactive', 'under_construction', 'closed']).default('active'),
});

export const campusUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().min(2).max(100).optional(),
  postalCode: z.string().max(20).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  capacity: z.number().int().min(0).optional(),
  area: z.number().min(0).optional(),
  type: z.enum(['main', 'branch', 'satellite', 'annex']).optional(),
  status: z.enum(['active', 'inactive', 'under_construction', 'closed']).optional(),
});

export const campusQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'city', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'under_construction', 'closed']).optional(),
  type: z.enum(['main', 'branch', 'satellite', 'annex']).optional(),
  country: z.string().max(100).optional(),
});

// ─── CampusGroup ─────────────────────────────────────────────
export const campusGroupCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  description: z.string().max(2000).optional(),
  type: z.enum(['network', 'consortium', 'chain', 'franchise', 'alliance', 'religious', 'private', 'ngo', 'international']),
  headquartersCampusId: z.string().uuid().optional(),
  memberCount: z.number().int().min(0).optional(),
  establishedDate: z.string().datetime().optional(),
  website: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  status: z.enum(['active', 'inactive', 'pending_approval', 'dissolved']).default('active'),
});

export const campusGroupUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().max(2000).optional(),
  type: z.enum(['network', 'consortium', 'chain', 'franchise', 'alliance', 'religious', 'private', 'ngo', 'international']).optional(),
  headquartersCampusId: z.string().uuid().optional(),
  memberCount: z.number().int().min(0).optional(),
  establishedDate: z.string().datetime().optional(),
  website: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  status: z.enum(['active', 'inactive', 'pending_approval', 'dissolved']).optional(),
});

export const campusGroupQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending_approval', 'dissolved']).optional(),
  type: z.enum(['network', 'consortium', 'chain', 'franchise', 'alliance', 'religious', 'private', 'ngo', 'international']).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── CampusGroupMember ───────────────────────────────────────
export const campusGroupMemberCreateSchema = z.object({
  groupId: z.string().uuid(),
  campusId: z.string().uuid(),
  role: z.enum(['headquarters', 'member', 'associate', 'observer']),
  joinDate: z.string().datetime(),
  contributionAmount: z.number().min(0).optional(),
  votingRights: z.boolean().default(true),
  representativeName: z.string().max(200).optional(),
  representativeEmail: z.string().email().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).default('active'),
});

export const campusGroupMemberUpdateSchema = z.object({
  role: z.enum(['headquarters', 'member', 'associate', 'observer']).optional(),
  contributionAmount: z.number().min(0).optional(),
  votingRights: z.boolean().optional(),
  representativeName: z.string().max(200).optional(),
  representativeEmail: z.string().email().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
});

export const campusGroupMemberQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['role', 'joinDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
  role: z.enum(['headquarters', 'member', 'associate', 'observer']).optional(),
  groupId: z.string().uuid().optional(),
  campusId: z.string().uuid().optional(),
});

// ─── SharedResource ──────────────────────────────────────────
export const sharedResourceCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  type: z.enum(['facility', 'equipment', 'vehicle', 'technology', 'personnel', 'curriculum', 'other']),
  campusId: z.string().uuid().optional(),
  availableFrom: z.string().datetime().optional(),
  availableTo: z.string().datetime().optional(),
  maxConcurrentUsers: z.number().int().min(1).default(1),
  bookingRequired: z.boolean().default(true),
  costPerHour: z.number().min(0).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  rules: z.string().max(2000).optional(),
  status: z.enum(['available', 'unavailable', 'maintenance', 'retired']).default('available'),
});

export const sharedResourceUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional(),
  type: z.enum(['facility', 'equipment', 'vehicle', 'technology', 'personnel', 'curriculum', 'other']).optional(),
  campusId: z.string().uuid().optional(),
  availableFrom: z.string().datetime().optional(),
  availableTo: z.string().datetime().optional(),
  maxConcurrentUsers: z.number().int().min(1).optional(),
  bookingRequired: z.boolean().optional(),
  costPerHour: z.number().min(0).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  rules: z.string().max(2000).optional(),
  status: z.enum(['available', 'unavailable', 'maintenance', 'retired']).optional(),
});

export const sharedResourceQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'costPerHour', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['available', 'unavailable', 'maintenance', 'retired']).optional(),
  type: z.enum(['facility', 'equipment', 'vehicle', 'technology', 'personnel', 'curriculum', 'other']).optional(),
  bookingRequired: z.boolean().optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── SharedResourceBooking ───────────────────────────────────
export const sharedResourceBookingCreateSchema = z.object({
  resourceId: z.string().uuid(),
  campusId: z.string().uuid(),
  requestedBy: z.string().uuid(),
  purpose: z.string().min(10).max(1000),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  attendees: z.number().int().min(1).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled', 'completed']).default('pending'),
});

export const sharedResourceBookingUpdateSchema = z.object({
  purpose: z.string().min(10).max(1000).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  attendees: z.number().int().min(1).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled', 'completed']).optional(),
  approvedBy: z.string().uuid().optional(),
  rejectionReason: z.string().max(1000).optional(),
});

export const sharedResourceBookingQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['startTime', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled', 'completed']).optional(),
  resourceId: z.string().uuid().optional(),
  campusId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

// ─── CrossCampusUser ─────────────────────────────────────────
export const crossCampusUserCreateSchema = z.object({
  userId: z.string().uuid(),
  campusId: z.string().uuid(),
  accessLevel: z.enum(['full', 'limited', 'read_only', 'restricted']),
  purpose: z.string().max(500).optional(),
  validFrom: z.string().datetime(),
  validTo: z.string().datetime().optional(),
  permissions: z.array(z.string().max(100)).optional(),
  approvedBy: z.string().uuid().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['active', 'inactive', 'expired', 'revoked']).default('active'),
});

export const crossCampusUserUpdateSchema = z.object({
  accessLevel: z.enum(['full', 'limited', 'read_only', 'restricted']).optional(),
  purpose: z.string().max(500).optional(),
  validFrom: z.string().datetime().optional(),
  validTo: z.string().datetime().optional(),
  permissions: z.array(z.string().max(100)).optional(),
  approvedBy: z.string().uuid().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['active', 'inactive', 'expired', 'revoked']).optional(),
});

export const crossCampusUserQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['accessLevel', 'validFrom', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'expired', 'revoked']).optional(),
  accessLevel: z.enum(['full', 'limited', 'read_only', 'restricted']).optional(),
  userId: z.string().uuid().optional(),
  campusId: z.string().uuid().optional(),
});

// ─── CampusTransfer ──────────────────────────────────────────
export const campusTransferCreateSchema = z.object({
  studentId: z.string().uuid(),
  fromCampusId: z.string().uuid(),
  toCampusId: z.string().uuid(),
  reason: z.string().min(10).max(2000),
  transferType: z.enum(['permanent', 'temporary', 'exchange']),
  effectiveDate: z.string().datetime(),
  approvedBy: z.string().uuid().optional(),
  academicRecords: z.boolean().default(false),
  financialClearance: z.boolean().default(false),
  notes: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'completed', 'cancelled']).default('pending'),
});

export const campusTransferUpdateSchema = z.object({
  reason: z.string().min(10).max(2000).optional(),
  transferType: z.enum(['permanent', 'temporary', 'exchange']).optional(),
  effectiveDate: z.string().datetime().optional(),
  approvedBy: z.string().uuid().optional(),
  academicRecords: z.boolean().optional(),
  financialClearance: z.boolean().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'completed', 'cancelled']).optional(),
  rejectionReason: z.string().max(1000).optional(),
});

export const campusTransferQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['effectiveDate', 'transferType', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'completed', 'cancelled']).optional(),
  transferType: z.enum(['permanent', 'temporary', 'exchange']).optional(),
  studentId: z.string().uuid().optional(),
  fromCampusId: z.string().uuid().optional(),
  toCampusId: z.string().uuid().optional(),
});

// ─── CentralizedAdministration ───────────────────────────────
export const centralizedAdministrationCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  type: z.enum(['central_office', 'regional_hub', 'shared_services', 'support_center']),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  directorName: z.string().max(200).optional(),
  budget: z.number().min(0).optional(),
  staffCount: z.number().int().min(0).optional(),
  services: z.array(z.string().max(100)).optional(),
  status: z.enum(['active', 'inactive', 'under_review']).default('active'),
});

export const centralizedAdministrationUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional(),
  type: z.enum(['central_office', 'regional_hub', 'shared_services', 'support_center']).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  directorName: z.string().max(200).optional(),
  budget: z.number().min(0).optional(),
  staffCount: z.number().int().min(0).optional(),
  services: z.array(z.string().max(100)).optional(),
  status: z.enum(['active', 'inactive', 'under_review']).optional(),
});

export const centralizedAdministrationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'under_review']).optional(),
  type: z.enum(['central_office', 'regional_hub', 'shared_services', 'support_center']).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── CampusAnalytics ─────────────────────────────────────────
export const campusAnalyticsCreateSchema = z.object({
  campusId: z.string().uuid(),
  period: z.string().max(50),
  academicYear: z.string().max(20),
  totalStudents: z.number().int().min(0).optional(),
  totalTeachers: z.number().int().min(0).optional(),
  totalStaff: z.number().int().min(0).optional(),
  attendanceRate: z.number().min(0).max(100).optional(),
  passRate: z.number().min(0).max(100).optional(),
  dropoutRate: z.number().min(0).max(100).optional(),
  utilizationRate: z.number().min(0).max(100).optional(),
  satisfactionScore: z.number().min(0).max(5).optional(),
  expenditurePerStudent: z.number().min(0).optional(),
  metrics: z.record(z.number()).optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const campusAnalyticsUpdateSchema = z.object({
  period: z.string().max(50).optional(),
  academicYear: z.string().max(20).optional(),
  totalStudents: z.number().int().min(0).optional(),
  totalTeachers: z.number().int().min(0).optional(),
  totalStaff: z.number().int().min(0).optional(),
  attendanceRate: z.number().min(0).max(100).optional(),
  passRate: z.number().min(0).max(100).optional(),
  dropoutRate: z.number().min(0).max(100).optional(),
  utilizationRate: z.number().min(0).max(100).optional(),
  satisfactionScore: z.number().min(0).max(5).optional(),
  expenditurePerStudent: z.number().min(0).optional(),
  metrics: z.record(z.number()).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const campusAnalyticsQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['period', 'academicYear', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  academicYear: z.string().max(20).optional(),
  campusId: z.string().uuid().optional(),
});

// ─── InterCampusCommunication ────────────────────────────────
export const interCampusCommunicationCreateSchema = z.object({
  fromCampusId: z.string().uuid(),
  toCampusId: z.string().uuid(),
  subject: z.string().min(2).max(300),
  message: z.string().min(10).max(10000),
  category: z.enum(['academic', 'administrative', 'emergency', 'general', 'request', 'notification']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  requiresResponse: z.boolean().default(false),
  deadline: z.string().datetime().optional(),
  attachmentUrls: z.array(z.string().url()).optional(),
  status: z.enum(['sent', 'delivered', 'read', 'acknowledged', 'archived']).default('sent'),
});

export const interCampusCommunicationUpdateSchema = z.object({
  subject: z.string().min(2).max(300).optional(),
  message: z.string().min(10).max(10000).optional(),
  category: z.enum(['academic', 'administrative', 'emergency', 'general', 'request', 'notification']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  requiresResponse: z.boolean().optional(),
  deadline: z.string().datetime().optional(),
  attachmentUrls: z.array(z.string().url()).optional(),
  status: z.enum(['sent', 'delivered', 'read', 'acknowledged', 'archived']).optional(),
  response: z.string().max(5000).optional(),
  respondedAt: z.string().datetime().optional(),
});

export const interCampusCommunicationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['subject', 'category', 'priority', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['sent', 'delivered', 'read', 'acknowledged', 'archived']).optional(),
  category: z.enum(['academic', 'administrative', 'emergency', 'general', 'request', 'notification']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  fromCampusId: z.string().uuid().optional(),
  toCampusId: z.string().uuid().optional(),
});

// ─── SchoolNetwork ───────────────────────────────────────────
export const schoolNetworkCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  description: z.string().max(2000).optional(),
  type: z.enum(['public', 'private', 'mixed', 'government', 'community']),
  website: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  headquartersAddress: z.string().max(500).optional(),
  establishedDate: z.string().datetime().optional(),
  memberCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'pending', 'dissolved']).default('active'),
});

export const schoolNetworkUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().max(2000).optional(),
  type: z.enum(['public', 'private', 'mixed', 'government', 'community']).optional(),
  website: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  headquartersAddress: z.string().max(500).optional(),
  establishedDate: z.string().datetime().optional(),
  memberCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'pending', 'dissolved']).optional(),
});

export const schoolNetworkQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending', 'dissolved']).optional(),
  type: z.enum(['public', 'private', 'mixed', 'government', 'community']).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── NetworkMember ───────────────────────────────────────────
export const networkMemberCreateSchema = z.object({
  networkId: z.string().uuid(),
  schoolId: z.string().uuid(),
  joinDate: z.string().datetime(),
  membershipType: z.enum(['full', 'associate', 'affiliate', 'observer']),
  annualFee: z.number().min(0).optional(),
  representativeName: z.string().max(200).optional(),
  representativeEmail: z.string().email().optional(),
  benefits: z.array(z.string().max(200)).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).default('active'),
});

export const networkMemberUpdateSchema = z.object({
  membershipType: z.enum(['full', 'associate', 'affiliate', 'observer']).optional(),
  annualFee: z.number().min(0).optional(),
  representativeName: z.string().max(200).optional(),
  representativeEmail: z.string().email().optional(),
  benefits: z.array(z.string().max(200)).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
});

export const networkMemberQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['membershipType', 'joinDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
  membershipType: z.enum(['full', 'associate', 'affiliate', 'observer']).optional(),
  networkId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── SchoolChain ─────────────────────────────────────────────
export const schoolChainCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  description: z.string().max(2000).optional(),
  headquartersAddress: z.string().max(500).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  website: z.string().url().optional(),
  totalCampuses: z.number().int().min(0).optional(),
  totalStudents: z.number().int().min(0).optional(),
  establishedDate: z.string().datetime().optional(),
  brandGuidelines: z.string().max(5000).optional(),
  status: z.enum(['active', 'inactive', 'expanding', 'contracting']).default('active'),
});

export const schoolChainUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().max(2000).optional(),
  headquartersAddress: z.string().max(500).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  website: z.string().url().optional(),
  totalCampuses: z.number().int().min(0).optional(),
  totalStudents: z.number().int().min(0).optional(),
  establishedDate: z.string().datetime().optional(),
  brandGuidelines: z.string().max(5000).optional(),
  status: z.enum(['active', 'inactive', 'expanding', 'contracting']).optional(),
});

export const schoolChainQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'totalCampuses', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'expanding', 'contracting']).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── SchoolFranchise ─────────────────────────────────────────
export const schoolFranchiseCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  franchisorId: z.string().uuid(),
  code: z.string().min(2).max(50),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  country: z.string().min(2).max(100),
  franchiseFee: z.number().min(0).optional(),
  royaltyPercentage: z.number().min(0).max(100).optional(),
  contractStart: z.string().datetime().optional(),
  contractEnd: z.string().datetime().optional(),
  territory: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending', 'terminated']).default('active'),
});

export const schoolFranchiseUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  franchisorId: z.string().uuid().optional(),
  code: z.string().min(2).max(50).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  country: z.string().min(2).max(100).optional(),
  franchiseFee: z.number().min(0).optional(),
  royaltyPercentage: z.number().min(0).max(100).optional(),
  contractStart: z.string().datetime().optional(),
  contractEnd: z.string().datetime().optional(),
  territory: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending', 'terminated']).optional(),
});

export const schoolFranchiseQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'country', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending', 'terminated']).optional(),
  country: z.string().max(100).optional(),
  schoolId: z.string().uuid().optional(),
  franchisorId: z.string().uuid().optional(),
});

// ─── ReligiousSchoolGroup ────────────────────────────────────
export const religiousSchoolGroupCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  religion: z.string().min(2).max(100),
  denomination: z.string().max(100).optional(),
  description: z.string().max(2000).optional(),
  headquartersAddress: z.string().max(500).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  totalSchools: z.number().int().min(0).optional(),
  totalStudents: z.number().int().min(0).optional(),
  governanceModel: z.string().max(200).optional(),
  affiliatedOrganization: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
});

export const religiousSchoolGroupUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  religion: z.string().min(2).max(100).optional(),
  denomination: z.string().max(100).optional(),
  description: z.string().max(2000).optional(),
  headquartersAddress: z.string().max(500).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  totalSchools: z.number().int().min(0).optional(),
  totalStudents: z.number().int().min(0).optional(),
  governanceModel: z.string().max(200).optional(),
  affiliatedOrganization: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
});

export const religiousSchoolGroupQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'religion', 'totalSchools', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
  religion: z.string().max(100).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── PrivateSchoolGroup ──────────────────────────────────────
export const privateSchoolGroupCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  description: z.string().max(2000).optional(),
  ownershipType: z.enum(['corporate', 'individual', 'partnership', 'trust', 'foundation']),
  headquartersAddress: z.string().max(500).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  totalSchools: z.number().int().min(0).optional(),
  totalStudents: z.number().int().min(0).optional(),
  annualRevenue: z.number().min(0).optional(),
  establishedDate: z.string().datetime().optional(),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
});

export const privateSchoolGroupUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().max(2000).optional(),
  ownershipType: z.enum(['corporate', 'individual', 'partnership', 'trust', 'foundation']).optional(),
  headquartersAddress: z.string().max(500).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  totalSchools: z.number().int().min(0).optional(),
  totalStudents: z.number().int().min(0).optional(),
  annualRevenue: z.number().min(0).optional(),
  establishedDate: z.string().datetime().optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
});

export const privateSchoolGroupQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'ownershipType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
  ownershipType: z.enum(['corporate', 'individual', 'partnership', 'trust', 'foundation']).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── NgoSchoolGroup ──────────────────────────────────────────
export const ngoSchoolGroupCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  description: z.string().max(2000).optional(),
  ngoName: z.string().min(2).max(200),
  focusArea: z.array(z.string().max(100)),
  headquartersAddress: z.string().max(500).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  totalSchools: z.number().int().min(0).optional(),
  totalStudents: z.number().int().min(0).optional(),
  annualBudget: z.number().min(0).optional(),
  fundingSources: z.array(z.string().max(200)).optional(),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
});

export const ngoSchoolGroupUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().max(2000).optional(),
  ngoName: z.string().min(2).max(200).optional(),
  focusArea: z.array(z.string().max(100)).optional(),
  headquartersAddress: z.string().max(500).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  totalSchools: z.number().int().min(0).optional(),
  totalStudents: z.number().int().min(0).optional(),
  annualBudget: z.number().min(0).optional(),
  fundingSources: z.array(z.string().max(200)).optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
});

export const ngoSchoolGroupQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'ngoName', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
  focusArea: z.array(z.string().max(100)).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── InternationalSchoolGroup ────────────────────────────────
export const internationalSchoolGroupCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  description: z.string().max(2000).optional(),
  countries: z.array(z.string().min(2).max(100)),
  headquartersCountry: z.string().min(2).max(100),
  curriculum: z.enum(['ib', 'cambridge', 'american', 'national', 'mixed']),
  website: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  totalSchools: z.number().int().min(0).optional(),
  totalStudents: z.number().int().min(0).optional(),
  establishedDate: z.string().datetime().optional(),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
});

export const internationalSchoolGroupUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().max(2000).optional(),
  countries: z.array(z.string().min(2).max(100)).optional(),
  headquartersCountry: z.string().min(2).max(100).optional(),
  curriculum: z.enum(['ib', 'cambridge', 'american', 'national', 'mixed']).optional(),
  website: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  totalSchools: z.number().int().min(0).optional(),
  totalStudents: z.number().int().min(0).optional(),
  establishedDate: z.string().datetime().optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
});

export const internationalSchoolGroupQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'headquartersCountry', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
  curriculum: z.enum(['ib', 'cambridge', 'american', 'national', 'mixed']).optional(),
  headquartersCountry: z.string().max(100).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── NetworkAgreement ────────────────────────────────────────
export const networkAgreementCreateSchema = z.object({
  networkId: z.string().uuid(),
  title: z.string().min(2).max(300),
  description: z.string().max(5000),
  agreementType: z.enum(['membership', 'partnership', 'service', 'data_sharing', 'resource_sharing', 'governance']),
  parties: z.array(z.string().max(200)),
  effectiveDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  terms: z.string().min(10).max(10000),
  renewalTerms: z.string().max(2000).optional(),
  terminationClause: z.string().max(2000).optional(),
  documentUrl: z.string().url().optional(),
  status: z.enum(['draft', 'pending_approval', 'active', 'expired', 'terminated']).default('draft'),
});

export const networkAgreementUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  description: z.string().max(5000).optional(),
  agreementType: z.enum(['membership', 'partnership', 'service', 'data_sharing', 'resource_sharing', 'governance']).optional(),
  parties: z.array(z.string().max(200)).optional(),
  effectiveDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  terms: z.string().min(10).max(10000).optional(),
  renewalTerms: z.string().max(2000).optional(),
  terminationClause: z.string().max(2000).optional(),
  documentUrl: z.string().url().optional(),
  status: z.enum(['draft', 'pending_approval', 'active', 'expired', 'terminated']).optional(),
});

export const networkAgreementQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'agreementType', 'effectiveDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'pending_approval', 'active', 'expired', 'terminated']).optional(),
  agreementType: z.enum(['membership', 'partnership', 'service', 'data_sharing', 'resource_sharing', 'governance']).optional(),
  networkId: z.string().uuid().optional(),
});

// ─── NetworkReport ───────────────────────────────────────────
export const networkReportCreateSchema = z.object({
  networkId: z.string().uuid(),
  title: z.string().min(2).max(300),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'special', 'performance']),
  period: z.string().max(50),
  content: z.string().min(10).max(20000),
  highlights: z.array(z.string().max(500)).optional(),
  challenges: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  metrics: z.record(z.number()).optional(),
  submittedBy: z.string().uuid().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).default('draft'),
});

export const networkReportUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'special', 'performance']).optional(),
  period: z.string().max(50).optional(),
  content: z.string().min(10).max(20000).optional(),
  highlights: z.array(z.string().max(500)).optional(),
  challenges: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  metrics: z.record(z.number()).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reviewedBy: z.string().uuid().optional(),
  reviewNotes: z.string().max(5000).optional(),
});

export const networkReportQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'period', 'reportType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'special', 'performance']).optional(),
  networkId: z.string().uuid().optional(),
});

// ─── Campus Filter Schemas ───────────────────────────────────
export const campusFilterSchema = z.object({
  status: z.enum(['active', 'inactive', 'under_construction', 'closed']).optional(),
  type: z.enum(['main', 'branch', 'satellite', 'annex']).optional(),
  country: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  search: z.string().max(200).optional(),
});

export const campusGroupFilterSchema = z.object({
  status: z.enum(['active', 'inactive', 'pending_approval', 'dissolved']).optional(),
  type: z.enum(['network', 'consortium', 'chain', 'franchise', 'alliance', 'religious', 'private', 'ngo', 'international']).optional(),
  schoolId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const sharedResourceFilterSchema = z.object({
  status: z.enum(['available', 'unavailable', 'maintenance', 'retired']).optional(),
  type: z.enum(['facility', 'equipment', 'vehicle', 'technology', 'personnel', 'curriculum', 'other']).optional(),
  bookingRequired: z.boolean().optional(),
  schoolId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const campusTransferFilterSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'completed', 'cancelled']).optional(),
  transferType: z.enum(['permanent', 'temporary', 'exchange']).optional(),
  studentId: z.string().uuid().optional(),
  fromCampusId: z.string().uuid().optional(),
  toCampusId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const schoolNetworkFilterSchema = z.object({
  status: z.enum(['active', 'inactive', 'pending', 'dissolved']).optional(),
  type: z.enum(['public', 'private', 'mixed', 'government', 'community']).optional(),
  schoolId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const networkMemberFilterSchema = z.object({
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
  membershipType: z.enum(['full', 'associate', 'affiliate', 'observer']).optional(),
  networkId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const interCampusCommunicationFilterSchema = z.object({
  status: z.enum(['sent', 'delivered', 'read', 'acknowledged', 'archived']).optional(),
  category: z.enum(['academic', 'administrative', 'emergency', 'general', 'request', 'notification']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  fromCampusId: z.string().uuid().optional(),
  toCampusId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const networkAgreementFilterSchema = z.object({
  status: z.enum(['draft', 'pending_approval', 'active', 'expired', 'terminated']).optional(),
  agreementType: z.enum(['membership', 'partnership', 'service', 'data_sharing', 'resource_sharing', 'governance']).optional(),
  networkId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});
