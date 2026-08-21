import { z } from 'zod';

const employeeStatusEnum = z.enum(['active', 'inactive', 'on_leave', 'suspended', 'terminated', 'retired']);
const contractTypeEnum = z.enum(['cdi', 'cdd', 'interim', 'apprentice', 'stage', 'freelance', 'part_time', 'full_time']);
const departmentTypeEnum = z.enum(['administration', 'academic', 'finance', 'maintenance', 'security', 'kitchen', 'transport', 'medical', 'it', 'hr', 'marketing', 'other']);
const leaveTypeEnum = z.enum(['annual', 'sick', 'maternity', 'paternity', 'bereavement', 'marriage', 'educational', 'unpaid', 'special', 'compensatory']);
const leaveStatusEnum = z.enum(['pending', 'approved', 'rejected', 'cancelled', 'expired']);
const performanceStatusEnum = z.enum(['draft', 'in_progress', 'completed', 'reviewed', 'approved']);
const performanceLevelEnum = z.enum(['excellent', 'good', 'satisfactory', 'needs_improvement', 'unsatisfactory']);
const recruitmentStatusEnum = z.enum(['open', 'on_hold', 'closed', 'cancelled']);
const interviewStatusEnum = z.enum(['scheduled', 'in_progress', 'completed', 'cancelled', 'no_show']);
const trainingStatusEnum = z.enum(['planned', 'in_progress', 'completed', 'cancelled', 'postponed']);
const documentTypeEnum = z.enum(['contract', 'id_card', 'passport', 'cv', 'diploma', 'certificate', 'medical', 'photo', 'other']);
const shiftTypeEnum = z.enum(['morning', 'afternoon', 'evening', 'night', 'full_day', 'split']);
const terminationReasonEnum = z.enum(['voluntary', 'mutual', 'layoff', 'misconduct', 'performance', 'restructuring', 'end_of_contract', 'retirement', 'death', 'medical', 'other']);
const promotionStatusEnum = z.enum(['proposed', 'approved', 'rejected', 'implemented']);
const transferStatusEnum = z.enum(['proposed', 'approved', 'rejected', 'implemented']);
const disciplinaryStatusEnum = z.enum(['open', 'in_progress', 'resolved', 'appealed', 'closed']);
const disciplinaryTypeEnum = z.enum(['warning', 'suspension', 'demotion', 'termination', 'bonus_deduction', 'other']);
const employeeGenderEnum = z.enum(['male', 'female', 'other']);
const maritalStatusEnum = z.enum(['single', 'married', 'divorced', 'widowed', 'other']);

export const createEmployeeSchema = z.object({
  schoolId: z.string().uuid(),
  employeeCode: z.string().min(1).max(50),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  middleName: z.string().max(100).optional(),
  gender: employeeGenderEnum,
  dateOfBirth: z.string().datetime(),
  nationality: z.string().max(100).optional(),
  maritalStatus: maritalStatusEnum.optional(),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
  emergencyContact: z.object({
    name: z.string().min(1).max(200),
    relationship: z.string().max(100),
    phone: z.string().min(1).max(20),
    email: z.string().email().optional(),
    address: z.string().max(500).optional(),
  }).optional(),
  medicalInfo: z.object({
    bloodType: z.string().max(10).optional(),
    allergies: z.string().max(500).optional(),
    conditions: z.string().max(500).optional(),
    medications: z.string().max(500).optional(),
    disability: z.string().max(500).optional(),
    insuranceNumber: z.string().max(100).optional(),
    insuranceProvider: z.string().max(200).optional(),
  }).optional(),
  departmentId: z.string().uuid(),
  positionId: z.string().uuid(),
  hireDate: z.string().datetime(),
  contractType: contractTypeEnum,
  salaryScaleId: z.string().uuid().optional(),
  salaryGradeId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateEmployeeSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  middleName: z.string().max(100).optional(),
  gender: employeeGenderEnum.optional(),
  dateOfBirth: z.string().datetime().optional(),
  nationality: z.string().max(100).optional(),
  maritalStatus: maritalStatusEnum.optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
  status: employeeStatusEnum.optional(),
  departmentId: z.string().uuid().optional(),
  positionId: z.string().uuid().optional(),
  salaryScaleId: z.string().uuid().optional(),
  salaryGradeId: z.string().uuid().optional(),
  emergencyContact: z.object({
    name: z.string().min(1).max(200),
    relationship: z.string().max(100),
    phone: z.string().min(1).max(20),
    email: z.string().email().optional(),
    address: z.string().max(500).optional(),
  }).optional(),
  medicalInfo: z.object({
    bloodType: z.string().max(10).optional(),
    allergies: z.string().max(500).optional(),
    conditions: z.string().max(500).optional(),
    medications: z.string().max(500).optional(),
    disability: z.string().max(500).optional(),
    insuranceNumber: z.string().max(100).optional(),
    insuranceProvider: z.string().max(200).optional(),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createDepartmentSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  code: z.string().min(1).max(50),
  type: departmentTypeEnum,
  description: z.string().max(1000).optional(),
  headId: z.string().uuid().optional(),
  parentDepartmentId: z.string().uuid().optional(),
  location: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  budget: z.number().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateDepartmentSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  code: z.string().min(1).max(50).optional(),
  type: departmentTypeEnum.optional(),
  description: z.string().max(1000).optional(),
  headId: z.string().uuid().optional(),
  parentDepartmentId: z.string().uuid().optional(),
  location: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  budget: z.number().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createPositionSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  code: z.string().min(1).max(50),
  departmentId: z.string().uuid(),
  description: z.string().max(1000).optional(),
  level: z.number().int().min(1).max(100).optional(),
  minSalary: z.number().min(0).optional(),
  maxSalary: z.number().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updatePositionSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  code: z.string().min(1).max(50).optional(),
  departmentId: z.string().uuid().optional(),
  description: z.string().max(1000).optional(),
  level: z.number().int().min(1).max(100).optional(),
  minSalary: z.number().min(0).optional(),
  maxSalary: z.number().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createContractSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  contractType: contractTypeEnum,
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  probationEndDate: z.string().datetime().optional(),
  noticePeriodDays: z.number().int().min(0).max(365).optional(),
  salary: z.number().min(0),
  currency: z.string().max(3).optional(),
  paymentFrequency: z.enum(['monthly', 'bi_weekly', 'weekly', 'quarterly', 'annually']).optional(),
  workingHoursPerWeek: z.number().min(0).max(60).optional(),
  annualLeaveDays: z.number().int().min(0).max(60).optional(),
  description: z.string().max(1000).optional(),
  terms: z.string().max(5000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateContractSchema = z.object({
  contractType: contractTypeEnum.optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  probationEndDate: z.string().datetime().optional(),
  noticePeriodDays: z.number().int().min(0).max(365).optional(),
  salary: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  paymentFrequency: z.enum(['monthly', 'bi_weekly', 'weekly', 'quarterly', 'annually']).optional(),
  workingHoursPerWeek: z.number().min(0).max(60).optional(),
  annualLeaveDays: z.number().int().min(0).max(60).optional(),
  description: z.string().max(1000).optional(),
  terms: z.string().max(5000).optional(),
  status: z.enum(['active', 'expired', 'terminated', 'renewed']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createLeaveSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  leaveType: leaveTypeEnum,
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  reason: z.string().min(1).max(1000),
  isHalfDay: z.boolean().optional(),
  documents: z.array(z.object({
    name: z.string().min(1).max(200),
    type: documentTypeEnum,
    fileUrl: z.string().url(),
    fileSize: z.number().int().min(0).optional(),
    mimeType: z.string().max(100).optional(),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateLeaveSchema = z.object({
  status: leaveStatusEnum.optional(),
  rejectionReason: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const approveLeaveSchema = z.object({
  approved: z.boolean(),
  rejectionReason: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createTrainingSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['workshop', 'seminar', 'online', 'conference', 'certification', 'mentoring', 'other']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string().max(200).optional(),
  maxParticipants: z.number().int().min(1).max(1000).optional(),
  instructor: z.string().max(200).optional(),
  cost: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  status: trainingStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateTrainingSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['workshop', 'seminar', 'online', 'conference', 'certification', 'mentoring', 'other']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  location: z.string().max(200).optional(),
  maxParticipants: z.number().int().min(1).max(1000).optional(),
  instructor: z.string().max(200).optional(),
  cost: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  status: trainingStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const enrollTrainingSchema = z.object({
  employeeId: z.string().uuid(),
  metadata: z.record(z.unknown()).optional(),
});

export const createPerformanceReviewSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  reviewerId: z.string().uuid(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  type: z.enum(['annual', 'semi_annual', 'quarterly', 'probation', 'project', 'other']),
  status: performanceStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updatePerformanceReviewSchema = z.object({
  status: performanceStatusEnum.optional(),
  overallRating: performanceLevelEnum.optional(),
  comments: z.string().max(5000).optional(),
  recommendations: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createObjectiveSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  reviewId: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  targetDate: z.string().datetime().optional(),
  weight: z.number().min(0).max(100).optional(),
  status: z.enum(['not_started', 'in_progress', 'completed', 'cancelled']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateObjectiveSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  targetDate: z.string().datetime().optional(),
  weight: z.number().min(0).max(100).optional(),
  status: z.enum(['not_started', 'in_progress', 'completed', 'cancelled']).optional(),
  progress: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createPromotionSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  newPositionId: z.string().uuid(),
  effectiveDate: z.string().datetime(),
  reason: z.string().min(1).max(1000),
  newSalary: z.number().min(0).optional(),
  status: promotionStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updatePromotionSchema = z.object({
  status: promotionStatusEnum.optional(),
  rejectionReason: z.string().max(1000).optional(),
  effectiveDate: z.string().datetime().optional(),
  newSalary: z.number().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createTransferSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  fromDepartmentId: z.string().uuid(),
  toDepartmentId: z.string().uuid(),
  newPositionId: z.string().uuid().optional(),
  effectiveDate: z.string().datetime(),
  reason: z.string().min(1).max(1000),
  status: transferStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateTransferSchema = z.object({
  status: transferStatusEnum.optional(),
  rejectionReason: z.string().max(1000).optional(),
  effectiveDate: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createTerminationSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  reason: terminationReasonEnum,
  effectiveDate: z.string().datetime(),
  noticePeriodDays: z.number().int().min(0).max(365).optional(),
  lastWorkingDay: z.string().datetime().optional(),
  severancePay: z.number().min(0).optional(),
  comments: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateTerminationSchema = z.object({
  effectiveDate: z.string().datetime().optional(),
  lastWorkingDay: z.string().datetime().optional(),
  severancePay: z.number().min(0).optional(),
  comments: z.string().max(2000).optional(),
  status: z.enum(['pending', 'processed', 'cancelled']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createDisciplinaryActionSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  type: disciplinaryTypeEnum,
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  date: z.string().datetime(),
  witnesses: z.array(z.string().max(200)).optional(),
  evidence: z.array(z.object({
    name: z.string().min(1).max(200),
    type: documentTypeEnum,
    fileUrl: z.string().url(),
  })).optional(),
  status: disciplinaryStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateDisciplinaryActionSchema = z.object({
  status: disciplinaryStatusEnum.optional(),
  resolution: z.string().max(2000).optional(),
  resolutionDate: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createRecruitmentSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  departmentId: z.string().uuid().optional(),
  positionId: z.string().uuid().optional(),
  openings: z.number().int().min(1).max(100),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  location: z.string().max(200).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  status: recruitmentStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateRecruitmentSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  openings: z.number().int().min(1).max(100).optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  location: z.string().max(200).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  status: recruitmentStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createCandidateSchema = z.object({
  schoolId: z.string().uuid(),
  recruitmentId: z.string().uuid(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  resumeUrl: z.string().url().optional(),
  coverLetter: z.string().max(5000).optional(),
  linkedIn: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateCandidateSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  resumeUrl: z.string().url().optional(),
  coverLetter: z.string().max(5000).optional(),
  linkedIn: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  status: z.enum(['new', 'screening', 'interview', 'offer', 'hired', 'rejected', 'withdrawn']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createInterviewSchema = z.object({
  schoolId: z.string().uuid(),
  candidateId: z.string().uuid(),
  recruitmentId: z.string().uuid(),
  interviewers: z.array(z.string().uuid()).min(1),
  scheduledDate: z.string().datetime(),
  duration: z.number().int().min(5).max(480),
  location: z.string().max(200).optional(),
  type: z.enum(['in_person', 'phone', 'video', 'technical', 'panel']),
  notes: z.string().max(2000).optional(),
  status: interviewStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateInterviewSchema = z.object({
  scheduledDate: z.string().datetime().optional(),
  duration: z.number().int().min(5).max(480).optional(),
  location: z.string().max(200).optional(),
  type: z.enum(['in_person', 'phone', 'video', 'technical', 'panel']).optional(),
  notes: z.string().max(2000).optional(),
  status: interviewStatusEnum.optional(),
  feedback: z.string().max(5000).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createJobOfferSchema = z.object({
  schoolId: z.string().uuid(),
  candidateId: z.string().uuid(),
  recruitmentId: z.string().uuid(),
  positionId: z.string().uuid().optional(),
  salary: z.number().min(0),
  currency: z.string().max(3).optional(),
  startDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  terms: z.string().max(5000).optional(),
  notes: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateJobOfferSchema = z.object({
  salary: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  startDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  terms: z.string().max(5000).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['draft', 'sent', 'accepted', 'rejected', 'expired', 'cancelled']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createEmployeeDocumentSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: documentTypeEnum,
  fileUrl: z.string().url(),
  fileSize: z.number().int().min(0).optional(),
  mimeType: z.string().max(100).optional(),
  expiryDate: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateEmployeeDocumentSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  type: documentTypeEnum.optional(),
  fileUrl: z.string().url().optional(),
  expiryDate: z.string().datetime().optional(),
  verified: z.boolean().optional(),
  verifiedBy: z.string().uuid().optional(),
  verifiedAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createScheduleSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  shiftType: shiftTypeEnum,
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  recurring: z.boolean().optional(),
  recurrencePattern: z.enum(['daily', 'weekly', 'bi_weekly', 'monthly']).optional(),
  notes: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateScheduleSchema = z.object({
  shiftType: shiftTypeEnum.optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  recurring: z.boolean().optional(),
  recurrencePattern: z.enum(['daily', 'weekly', 'bi_weekly', 'monthly']).optional(),
  notes: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const clockInSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  clockInTime: z.string().datetime().optional(),
  location: z.string().max(200).optional(),
  notes: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const clockOutSchema = z.object({
  schoolId: z.string().uuid(),
  employeeId: z.string().uuid(),
  clockOutTime: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const searchEmployeesSchema = z.object({
  schoolId: z.string().uuid(),
  query: z.string().max(200).optional(),
  departmentId: z.string().uuid().optional(),
  positionId: z.string().uuid().optional(),
  status: employeeStatusEnum.optional(),
  contractType: contractTypeEnum.optional(),
  hireDateFrom: z.string().datetime().optional(),
  hireDateTo: z.string().datetime().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  sortBy: z.enum(['firstName', 'lastName', 'employeeCode', 'hireDate', 'department', 'position']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const createBenefitSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['health_insurance', 'life_insurance', 'retirement', 'transport', 'housing', 'meal', 'education', 'phone', 'internet', 'other']),
  amount: z.number().min(0).optional(),
  percentage: z.number().min(0).max(100).optional(),
  currency: z.string().max(3).optional(),
  isTaxable: z.boolean().optional(),
  maxEmployees: z.number().int().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateBenefitSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['health_insurance', 'life_insurance', 'retirement', 'transport', 'housing', 'meal', 'education', 'phone', 'internet', 'other']).optional(),
  amount: z.number().min(0).optional(),
  percentage: z.number().min(0).max(100).optional(),
  currency: z.string().max(3).optional(),
  isTaxable: z.boolean().optional(),
  maxEmployees: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createDeductionSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['tax', 'social_security', 'pension', 'health', 'loan', 'advance', 'absence', 'other']),
  amount: z.number().min(0).optional(),
  percentage: z.number().min(0).max(100).optional(),
  currency: z.string().max(3).optional(),
  isMandatory: z.boolean().optional(),
  maxAmount: z.number().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateDeductionSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['tax', 'social_security', 'pension', 'health', 'loan', 'advance', 'absence', 'other']).optional(),
  amount: z.number().min(0).optional(),
  percentage: z.number().min(0).max(100).optional(),
  currency: z.string().max(3).optional(),
  isMandatory: z.boolean().optional(),
  maxAmount: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createAllowanceSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['housing', 'transport', 'technical', 'responsibility', 'other']),
  amount: z.number().min(0),
  currency: z.string().max(3).optional(),
  isRecurring: z.boolean().optional(),
  frequency: z.enum(['monthly', 'quarterly', 'annually', 'one_time']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateAllowanceSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['housing', 'transport', 'technical', 'responsibility', 'other']).optional(),
  amount: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  isRecurring: z.boolean().optional(),
  frequency: z.enum(['monthly', 'quarterly', 'annually', 'one_time']).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const generateEmployeeCodeSchema = z.object({
  schoolId: z.string().uuid(),
  departmentCode: z.string().min(1).max(10),
  year: z.number().int().min(2020).max(2099).optional(),
});

export const createSalaryScaleSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  code: z.string().min(1).max(50),
  description: z.string().max(1000).optional(),
  minSalary: z.number().min(0),
  maxSalary: z.number().min(0),
  currency: z.string().max(3).optional(),
  grades: z.array(z.object({
    name: z.string().min(1).max(100),
    code: z.string().min(1).max(20),
    minSalary: z.number().min(0),
    maxSalary: z.number().min(0),
    level: z.number().int().min(1).max(100),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateSalaryScaleSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  code: z.string().min(1).max(50).optional(),
  description: z.string().max(1000).optional(),
  minSalary: z.number().min(0).optional(),
  maxSalary: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});
