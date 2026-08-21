// Government & National Governance Validators - Ministry & Region
// Phase 2.9 - EduCI Platform

import { z } from 'zod';

// ─── Ministry ────────────────────────────────────────────────
export const ministryCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(200),
  country: z.string().min(2).max(100),
  code: z.string().min(2).max(50),
  ministerName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'dissolved', 'pending']).default('active'),
});

export const ministryUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  country: z.string().min(2).max(100).optional(),
  code: z.string().min(2).max(50).optional(),
  ministerName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'dissolved', 'pending']).optional(),
});

export const ministryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'country', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'dissolved', 'pending']).optional(),
  country: z.string().max(100).optional(),
});

export const ministryFilterSchema = z.object({
  country: z.string().max(100).optional(),
  status: z.enum(['active', 'inactive', 'dissolved', 'pending']).optional(),
  search: z.string().max(200).optional(),
});

// ─── MinistryDepartment ──────────────────────────────────────
export const ministryDepartmentCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  headName: z.string().min(2).max(200).optional(),
  headTitle: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  budget: z.number().min(0).optional(),
  staffCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'restructured']).default('active'),
});

export const ministryDepartmentUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  headName: z.string().min(2).max(200).optional(),
  headTitle: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  budget: z.number().min(0).optional(),
  staffCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'restructured']).optional(),
});

export const ministryDepartmentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'restructured']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── Directorate ─────────────────────────────────────────────
export const directorateCreateSchema = z.object({
  ministryId: z.string().uuid(),
  departmentId: z.string().uuid().optional(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  directorName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  jurisdiction: z.string().max(500).optional(),
  budget: z.number().min(0).optional(),
  staffCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'merged']).default('active'),
});

export const directorateUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  directorName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  jurisdiction: z.string().max(500).optional(),
  budget: z.number().min(0).optional(),
  staffCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'merged']).optional(),
});

export const directorateQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'merged']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── EducationPolicy ─────────────────────────────────────────
export const educationPolicyCreateSchema = z.object({
  ministryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  description: z.string().min(10).max(5000),
  category: z.enum(['curriculum', 'assessment', 'equity', 'infrastructure', 'teacher', 'technology', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  effectiveDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  targetAudience: z.string().max(500).optional(),
  legalReference: z.string().max(500).optional(),
  status: z.enum(['draft', 'under_review', 'approved', 'active', 'archived']).default('draft'),
  version: z.string().max(20).optional(),
});

export const educationPolicyUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  description: z.string().min(10).max(5000).optional(),
  category: z.enum(['curriculum', 'assessment', 'equity', 'infrastructure', 'teacher', 'technology', 'other']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  effectiveDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  targetAudience: z.string().max(500).optional(),
  legalReference: z.string().max(500).optional(),
  status: z.enum(['draft', 'under_review', 'approved', 'active', 'archived']).optional(),
  version: z.string().max(20).optional(),
});

export const educationPolicyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'priority', 'effectiveDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'under_review', 'approved', 'active', 'archived']).optional(),
  category: z.enum(['curriculum', 'assessment', 'equity', 'infrastructure', 'teacher', 'technology', 'other']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── NationalProgram ─────────────────────────────────────────
export const nationalProgramCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  code: z.string().min(2).max(50),
  description: z.string().min(10).max(5000),
  objective: z.string().min(10).max(3000),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  budget: z.number().min(0).optional(),
  beneficiaryCount: z.number().int().min(0).optional(),
  targetRegion: z.string().max(200).optional(),
  leadDepartment: z.string().max(200).optional(),
  status: z.enum(['planning', 'active', 'completed', 'suspended', 'cancelled']).default('planning'),
});

export const nationalProgramUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().min(10).max(5000).optional(),
  objective: z.string().min(10).max(3000).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  budget: z.number().min(0).optional(),
  beneficiaryCount: z.number().int().min(0).optional(),
  targetRegion: z.string().max(200).optional(),
  leadDepartment: z.string().max(200).optional(),
  status: z.enum(['planning', 'active', 'completed', 'suspended', 'cancelled']).optional(),
});

export const nationalProgramQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'startDate', 'budget', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['planning', 'active', 'completed', 'suspended', 'cancelled']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── EducationStrategy ───────────────────────────────────────
export const educationStrategyCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  description: z.string().min(10).max(5000),
  vision: z.string().min(10).max(2000).optional(),
  mission: z.string().min(10).max(2000).optional(),
  goals: z.array(z.string().max(500)),
  targetYear: z.number().int().min(2020).max(2100),
  budget: z.number().min(0).optional(),
  leadOffice: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'completed', 'revised']).default('draft'),
  version: z.string().max(20).optional(),
});

export const educationStrategyUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  description: z.string().min(10).max(5000).optional(),
  vision: z.string().min(10).max(2000).optional(),
  mission: z.string().min(10).max(2000).optional(),
  goals: z.array(z.string().max(500)).optional(),
  targetYear: z.number().int().min(2020).max(2100).optional(),
  budget: z.number().min(0).optional(),
  leadOffice: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'completed', 'revised']).optional(),
  version: z.string().max(20).optional(),
});

export const educationStrategyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'targetYear', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'completed', 'revised']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── Circular ────────────────────────────────────────────────
export const circularCreateSchema = z.object({
  ministryId: z.string().uuid(),
  referenceNumber: z.string().min(2).max(100),
  title: z.string().min(2).max(300),
  content: z.string().min(10).max(10000),
  category: z.enum(['directive', 'instruction', 'guideline', 'notification', 'order']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  issueDate: z.string().datetime(),
  effectiveDate: z.string().datetime().optional(),
  targetRecipients: z.array(z.string().max(200)),
  requiresAcknowledgement: z.boolean().default(false),
  attachmentUrl: z.string().url().optional(),
  status: z.enum(['draft', 'published', 'superseded', 'revoked']).default('draft'),
});

export const circularUpdateSchema = z.object({
  referenceNumber: z.string().min(2).max(100).optional(),
  title: z.string().min(2).max(300).optional(),
  content: z.string().min(10).max(10000).optional(),
  category: z.enum(['directive', 'instruction', 'guideline', 'notification', 'order']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  issueDate: z.string().datetime().optional(),
  effectiveDate: z.string().datetime().optional(),
  targetRecipients: z.array(z.string().max(200)).optional(),
  requiresAcknowledgement: z.boolean().optional(),
  attachmentUrl: z.string().url().optional(),
  status: z.enum(['draft', 'published', 'superseded', 'revoked']).optional(),
});

export const circularQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'issueDate', 'priority', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'published', 'superseded', 'revoked']).optional(),
  category: z.enum(['directive', 'instruction', 'guideline', 'notification', 'order']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── OfficialDocument ────────────────────────────────────────
export const officialDocumentCreateSchema = z.object({
  ministryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  documentType: z.enum(['law', 'decree', 'regulation', 'standard', 'memorandum', 'report', 'manual']),
  referenceNumber: z.string().min(2).max(100),
  content: z.string().min(10).max(20000).optional(),
  fileUrl: z.string().url().optional(),
  fileHash: z.string().max(128).optional(),
  issueDate: z.string().datetime().optional(),
  effectiveDate: z.string().datetime().optional(),
  authorDepartment: z.string().max(200).optional(),
  tags: z.array(z.string().max(50)).optional(),
  status: z.enum(['draft', 'under_review', 'approved', 'published', 'archived']).default('draft'),
});

export const officialDocumentUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  documentType: z.enum(['law', 'decree', 'regulation', 'standard', 'memorandum', 'report', 'manual']).optional(),
  referenceNumber: z.string().min(2).max(100).optional(),
  content: z.string().min(10).max(20000).optional(),
  fileUrl: z.string().url().optional(),
  fileHash: z.string().max(128).optional(),
  issueDate: z.string().datetime().optional(),
  effectiveDate: z.string().datetime().optional(),
  authorDepartment: z.string().max(200).optional(),
  tags: z.array(z.string().max(50)).optional(),
  status: z.enum(['draft', 'under_review', 'approved', 'published', 'archived']).optional(),
});

export const officialDocumentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'issueDate', 'documentType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'under_review', 'approved', 'published', 'archived']).optional(),
  documentType: z.enum(['law', 'decree', 'regulation', 'standard', 'memorandum', 'report', 'manual']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── EducationCalendar ───────────────────────────────────────
export const educationCalendarCreateSchema = z.object({
  ministryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  eventType: z.enum(['holiday', 'exam', 'enrollment', 'training', 'conference', 'deadline', 'ceremony', 'other']),
  description: z.string().max(2000).optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  academicYear: z.string().max(20),
  affectedLevels: z.array(z.enum(['primary', 'secondary', 'tertiary', 'vocational', 'all'])),
  isPublicHoliday: z.boolean().default(false),
  region: z.string().max(200).optional(),
  status: z.enum(['planned', 'confirmed', 'cancelled', 'completed']).default('planned'),
});

export const educationCalendarUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  eventType: z.enum(['holiday', 'exam', 'enrollment', 'training', 'conference', 'deadline', 'ceremony', 'other']).optional(),
  description: z.string().max(2000).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  academicYear: z.string().max(20).optional(),
  affectedLevels: z.array(z.enum(['primary', 'secondary', 'tertiary', 'vocational', 'all'])).optional(),
  isPublicHoliday: z.boolean().optional(),
  region: z.string().max(200).optional(),
  status: z.enum(['planned', 'confirmed', 'cancelled', 'completed']).optional(),
});

export const educationCalendarQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'startDate', 'eventType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['planned', 'confirmed', 'cancelled', 'completed']).optional(),
  eventType: z.enum(['holiday', 'exam', 'enrollment', 'training', 'conference', 'deadline', 'ceremony', 'other']).optional(),
  academicYear: z.string().max(20).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── NationalStatistic ───────────────────────────────────────
export const nationalStatisticCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  category: z.enum(['enrollment', 'literacy', 'dropout', 'teacher_student_ratio', 'graduation', 'expenditure', 'infrastructure', 'gender_parity', 'other']),
  value: z.number(),
  unit: z.string().max(50),
  academicYear: z.string().max(20),
  region: z.string().max(200).optional(),
  source: z.string().max(200).optional(),
  methodology: z.string().max(1000).optional(),
  confidenceLevel: z.enum(['high', 'medium', 'low']).optional(),
  previousValue: z.number().optional(),
  changePercentage: z.number().optional(),
  status: z.enum(['provisional', 'verified', 'published']).default('provisional'),
});

export const nationalStatisticUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  category: z.enum(['enrollment', 'literacy', 'dropout', 'teacher_student_ratio', 'graduation', 'expenditure', 'infrastructure', 'gender_parity', 'other']).optional(),
  value: z.number().optional(),
  unit: z.string().max(50).optional(),
  academicYear: z.string().max(20).optional(),
  region: z.string().max(200).optional(),
  source: z.string().max(200).optional(),
  methodology: z.string().max(1000).optional(),
  confidenceLevel: z.enum(['high', 'medium', 'low']).optional(),
  previousValue: z.number().optional(),
  changePercentage: z.number().optional(),
  status: z.enum(['provisional', 'verified', 'published']).optional(),
});

export const nationalStatisticQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'category', 'academicYear', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['provisional', 'verified', 'published']).optional(),
  category: z.enum(['enrollment', 'literacy', 'dropout', 'teacher_student_ratio', 'graduation', 'expenditure', 'infrastructure', 'gender_parity', 'other']).optional(),
  academicYear: z.string().max(20).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── MinistryUser ────────────────────────────────────────────
export const ministryUserCreateSchema = z.object({
  ministryId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['minister', 'deputy_minister', 'director', 'inspector', 'admin', 'analyst', 'viewer']),
  department: z.string().max(200).optional(),
  title: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  officeLocation: z.string().max(200).optional(),
  permissions: z.array(z.string().max(100)).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).default('active'),
});

export const ministryUserUpdateSchema = z.object({
  role: z.enum(['minister', 'deputy_minister', 'director', 'inspector', 'admin', 'analyst', 'viewer']).optional(),
  department: z.string().max(200).optional(),
  title: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  officeLocation: z.string().max(200).optional(),
  permissions: z.array(z.string().max(100)).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
});

export const ministryUserQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['role', 'department', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  role: z.enum(['minister', 'deputy_minister', 'director', 'inspector', 'admin', 'analyst', 'viewer']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── MinistryNotification ────────────────────────────────────
export const ministryNotificationCreateSchema = z.object({
  ministryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  message: z.string().min(10).max(5000),
  type: z.enum(['info', 'warning', 'alert', 'urgent', 'policy_change', 'deadline']),
  targetRoles: z.array(z.enum(['minister', 'deputy_minister', 'director', 'inspector', 'admin', 'analyst', 'viewer', 'all'])),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  isRead: z.boolean().default(false),
  expiresAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
  status: z.enum(['draft', 'sent', 'acknowledged', 'archived']).default('draft'),
});

export const ministryNotificationUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  message: z.string().min(10).max(5000).optional(),
  type: z.enum(['info', 'warning', 'alert', 'urgent', 'policy_change', 'deadline']).optional(),
  targetRoles: z.array(z.enum(['minister', 'deputy_minister', 'director', 'inspector', 'admin', 'analyst', 'viewer', 'all'])).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  isRead: z.boolean().optional(),
  expiresAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
  status: z.enum(['draft', 'sent', 'acknowledged', 'archived']).optional(),
});

export const ministryNotificationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'type', 'priority', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'sent', 'acknowledged', 'archived']).optional(),
  type: z.enum(['info', 'warning', 'alert', 'urgent', 'policy_change', 'deadline']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── EducationRegion ─────────────────────────────────────────
export const educationRegionCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  directorName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  population: z.number().int().min(0).optional(),
  area: z.number().min(0).optional(),
  budget: z.number().min(0).optional(),
  schoolCount: z.number().int().min(0).optional(),
  studentCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'reorganized']).default('active'),
});

export const educationRegionUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  directorName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  population: z.number().int().min(0).optional(),
  area: z.number().min(0).optional(),
  budget: z.number().min(0).optional(),
  schoolCount: z.number().int().min(0).optional(),
  studentCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'reorganized']).optional(),
});

export const educationRegionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'population', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'reorganized']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── EducationDistrict ───────────────────────────────────────
export const educationDistrictCreateSchema = z.object({
  regionId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  supervisorName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  population: z.number().int().min(0).optional(),
  budget: z.number().min(0).optional(),
  schoolCount: z.number().int().min(0).optional(),
  studentCount: z.number().int().min(0).optional(),
  teacherCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'merged']).default('active'),
});

export const educationDistrictUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  supervisorName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  population: z.number().int().min(0).optional(),
  budget: z.number().min(0).optional(),
  schoolCount: z.number().int().min(0).optional(),
  studentCount: z.number().int().min(0).optional(),
  teacherCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'merged']).optional(),
});

export const educationDistrictQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'population', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'merged']).optional(),
  regionId: z.string().uuid().optional(),
});

// ─── Academy ─────────────────────────────────────────────────
export const academyCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  code: z.string().min(2).max(50),
  type: z.enum(['teachers_training', 'educational_research', 'curriculum_development', 'leadership', 'technical']),
  description: z.string().max(2000).optional(),
  directorName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  capacity: z.number().int().min(0).optional(),
  budget: z.number().min(0).optional(),
  establishedYear: z.number().int().min(1800).max(2100).optional(),
  status: z.enum(['active', 'inactive', 'under_review']).default('active'),
});

export const academyUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  code: z.string().min(2).max(50).optional(),
  type: z.enum(['teachers_training', 'educational_research', 'curriculum_development', 'leadership', 'technical']).optional(),
  description: z.string().max(2000).optional(),
  directorName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  capacity: z.number().int().min(0).optional(),
  budget: z.number().min(0).optional(),
  establishedYear: z.number().int().min(1800).max(2100).optional(),
  status: z.enum(['active', 'inactive', 'under_review']).optional(),
});

export const academyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'under_review']).optional(),
  type: z.enum(['teachers_training', 'educational_research', 'curriculum_development', 'leadership', 'technical']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── RegionalDirectorate ─────────────────────────────────────
export const regionalDirectorateCreateSchema = z.object({
  regionId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  directorName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  jurisdiction: z.string().max(500).optional(),
  budget: z.number().min(0).optional(),
  staffCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'merged']).default('active'),
});

export const regionalDirectorateUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  directorName: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  jurisdiction: z.string().max(500).optional(),
  budget: z.number().min(0).optional(),
  staffCount: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive', 'merged']).optional(),
});

export const regionalDirectorateQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'merged']).optional(),
  regionId: z.string().uuid().optional(),
});

// ─── Inspector ───────────────────────────────────────────────
export const inspectorCreateSchema = z.object({
  ministryId: z.string().uuid(),
  userId: z.string().uuid(),
  licenseNumber: z.string().min(2).max(100),
  specialization: z.array(z.string().max(100)),
  qualification: z.string().max(500).optional(),
  experienceYears: z.number().int().min(0).max(50).optional(),
  assignedRegion: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  maxSchools: z.number().int().min(1).max(50).default(10),
  status: z.enum(['active', 'inactive', 'on_leave', 'suspended']).default('active'),
});

export const inspectorUpdateSchema = z.object({
  licenseNumber: z.string().min(2).max(100).optional(),
  specialization: z.array(z.string().max(100)).optional(),
  qualification: z.string().max(500).optional(),
  experienceYears: z.number().int().min(0).max(50).optional(),
  assignedRegion: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  maxSchools: z.number().int().min(1).max(50).optional(),
  status: z.enum(['active', 'inactive', 'on_leave', 'suspended']).optional(),
});

export const inspectorQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['licenseNumber', 'specialization', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'on_leave', 'suspended']).optional(),
  assignedRegion: z.string().max(200).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── InspectionVisit ─────────────────────────────────────────
export const inspectionVisitCreateSchema = z.object({
  inspectorId: z.string().uuid(),
  schoolId: z.string().uuid(),
  visitType: z.enum(['routine', 'follow_up', 'special', 'unannounced', 'compliance']),
  scheduledDate: z.string().datetime(),
  purpose: z.string().min(10).max(2000),
  checklistItems: z.array(z.string().max(500)).optional(),
  notes: z.string().max(5000).optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled', 'postponed']).default('scheduled'),
});

export const inspectionVisitUpdateSchema = z.object({
  scheduledDate: z.string().datetime().optional(),
  purpose: z.string().min(10).max(2000).optional(),
  checklistItems: z.array(z.string().max(500)).optional(),
  notes: z.string().max(5000).optional(),
  findings: z.string().max(10000).optional(),
  recommendations: z.string().max(5000).optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled', 'postponed']).optional(),
  completedAt: z.string().datetime().optional(),
  score: z.number().min(0).max(100).optional(),
});

export const inspectionVisitQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['scheduledDate', 'visitType', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled', 'postponed']).optional(),
  visitType: z.enum(['routine', 'follow_up', 'special', 'unannounced', 'compliance']).optional(),
  inspectorId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── RegionalReport ──────────────────────────────────────────
export const regionalReportCreateSchema = z.object({
  regionId: z.string().uuid(),
  title: z.string().min(2).max(300),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'special', 'incident']),
  period: z.string().max(50),
  content: z.string().min(10).max(20000),
  highlights: z.array(z.string().max(500)).optional(),
  challenges: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  submittedBy: z.string().uuid().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).default('draft'),
});

export const regionalReportUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'special', 'incident']).optional(),
  period: z.string().max(50).optional(),
  content: z.string().min(10).max(20000).optional(),
  highlights: z.array(z.string().max(500)).optional(),
  challenges: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reviewedBy: z.string().uuid().optional(),
  reviewNotes: z.string().max(5000).optional(),
});

export const regionalReportQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'period', 'reportType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'special', 'incident']).optional(),
  regionId: z.string().uuid().optional(),
});

// ─── RegionalKpi ─────────────────────────────────────────────
export const regionalKpiCreateSchema = z.object({
  regionId: z.string().uuid(),
  name: z.string().min(2).max(200),
  category: z.enum(['enrollment', 'retention', 'achievement', 'infrastructure', 'finance', 'teacher']),
  targetValue: z.number(),
  currentValue: z.number().optional(),
  unit: z.string().max(50),
  academicYear: z.string().max(20),
  weight: z.number().min(0).max(100).default(100),
  formula: z.string().max(500).optional(),
  status: z.enum(['on_track', 'at_risk', 'behind', 'achieved']).default('on_track'),
});

export const regionalKpiUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  category: z.enum(['enrollment', 'retention', 'achievement', 'infrastructure', 'finance', 'teacher']).optional(),
  targetValue: z.number().optional(),
  currentValue: z.number().optional(),
  unit: z.string().max(50).optional(),
  academicYear: z.string().max(20).optional(),
  weight: z.number().min(0).max(100).optional(),
  formula: z.string().max(500).optional(),
  status: z.enum(['on_track', 'at_risk', 'behind', 'achieved']).optional(),
});

export const regionalKpiQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'category', 'academicYear', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['on_track', 'at_risk', 'behind', 'achieved']).optional(),
  category: z.enum(['enrollment', 'retention', 'achievement', 'infrastructure', 'finance', 'teacher']).optional(),
  regionId: z.string().uuid().optional(),
});

// ─── DistrictReport ──────────────────────────────────────────
export const districtReportCreateSchema = z.object({
  districtId: z.string().uuid(),
  title: z.string().min(2).max(300),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'weekly', 'special']),
  period: z.string().max(50),
  content: z.string().min(10).max(20000),
  enrollmentData: z.record(z.number()).optional(),
  attendanceData: z.record(z.number()).optional(),
  performanceData: z.record(z.number()).optional(),
  financeData: z.record(z.number()).optional(),
  highlights: z.array(z.string().max(500)).optional(),
  submittedBy: z.string().uuid().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).default('draft'),
});

export const districtReportUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'weekly', 'special']).optional(),
  period: z.string().max(50).optional(),
  content: z.string().min(10).max(20000).optional(),
  enrollmentData: z.record(z.number()).optional(),
  attendanceData: z.record(z.number()).optional(),
  performanceData: z.record(z.number()).optional(),
  financeData: z.record(z.number()).optional(),
  highlights: z.array(z.string().max(500)).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reviewedBy: z.string().uuid().optional(),
  reviewNotes: z.string().max(5000).optional(),
});

export const districtReportQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'period', 'reportType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'weekly', 'special']).optional(),
  districtId: z.string().uuid().optional(),
});

// ─── RegionUser ──────────────────────────────────────────────
export const regionUserCreateSchema = z.object({
  regionId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['regional_director', 'deputy_director', 'inspector', 'analyst', 'admin', 'coordinator', 'viewer']),
  department: z.string().max(200).optional(),
  title: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  officeLocation: z.string().max(200).optional(),
  permissions: z.array(z.string().max(100)).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).default('active'),
});

export const regionUserUpdateSchema = z.object({
  role: z.enum(['regional_director', 'deputy_director', 'inspector', 'analyst', 'admin', 'coordinator', 'viewer']).optional(),
  department: z.string().max(200).optional(),
  title: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  officeLocation: z.string().max(200).optional(),
  permissions: z.array(z.string().max(100)).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
});

export const regionUserQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['role', 'department', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  role: z.enum(['regional_director', 'deputy_director', 'inspector', 'analyst', 'admin', 'coordinator', 'viewer']).optional(),
  regionId: z.string().uuid().optional(),
});

// ─── Ministry Filter Schemas ─────────────────────────────────
export const educationPolicyFilterSchema = z.object({
  category: z.enum(['curriculum', 'assessment', 'equity', 'infrastructure', 'teacher', 'technology', 'other']).optional(),
  status: z.enum(['draft', 'under_review', 'approved', 'active', 'archived']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const nationalProgramFilterSchema = z.object({
  status: z.enum(['planning', 'active', 'completed', 'suspended', 'cancelled']).optional(),
  ministryId: z.string().uuid().optional(),
  startDateFrom: z.string().datetime().optional(),
  startDateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const circularFilterSchema = z.object({
  category: z.enum(['directive', 'instruction', 'guideline', 'notification', 'order']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  status: z.enum(['draft', 'published', 'superseded', 'revoked']).optional(),
  ministryId: z.string().uuid().optional(),
  issueDateFrom: z.string().datetime().optional(),
  issueDateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const officialDocumentFilterSchema = z.object({
  documentType: z.enum(['law', 'decree', 'regulation', 'standard', 'memorandum', 'report', 'manual']).optional(),
  status: z.enum(['draft', 'under_review', 'approved', 'published', 'archived']).optional(),
  ministryId: z.string().uuid().optional(),
  issueDateFrom: z.string().datetime().optional(),
  issueDateTo: z.string().datetime().optional(),
  tags: z.array(z.string().max(50)).optional(),
  search: z.string().max(200).optional(),
});

export const nationalStatisticFilterSchema = z.object({
  category: z.enum(['enrollment', 'literacy', 'dropout', 'teacher_student_ratio', 'graduation', 'expenditure', 'infrastructure', 'gender_parity', 'other']).optional(),
  status: z.enum(['provisional', 'verified', 'published']).optional(),
  academicYear: z.string().max(20).optional(),
  region: z.string().max(200).optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const educationCalendarFilterSchema = z.object({
  eventType: z.enum(['holiday', 'exam', 'enrollment', 'training', 'conference', 'deadline', 'ceremony', 'other']).optional(),
  academicYear: z.string().max(20).optional(),
  status: z.enum(['planned', 'confirmed', 'cancelled', 'completed']).optional(),
  isPublicHoliday: z.boolean().optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const inspectorFilterSchema = z.object({
  status: z.enum(['active', 'inactive', 'on_leave', 'suspended']).optional(),
  assignedRegion: z.string().max(200).optional(),
  specialization: z.array(z.string().max(100)).optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const inspectionVisitFilterSchema = z.object({
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled', 'postponed']).optional(),
  visitType: z.enum(['routine', 'follow_up', 'special', 'unannounced', 'compliance']).optional(),
  inspectorId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
  scheduledDateFrom: z.string().datetime().optional(),
  scheduledDateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const educationRegionFilterSchema = z.object({
  status: z.enum(['active', 'inactive', 'reorganized']).optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const educationDistrictFilterSchema = z.object({
  status: z.enum(['active', 'inactive', 'merged']).optional(),
  regionId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});
