// Government & National Governance Validators - Exams, Inspection & Accreditation
// Phase 2.9 - EduCI Platform

import { z } from 'zod';

// ─── NationalExam ────────────────────────────────────────────
export const nationalExamCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  code: z.string().min(2).max(50),
  type: z.enum(['entrance', 'exit', 'certification', 'placement', 'competitive']),
  level: z.enum(['primary', 'secondary', 'tertiary', 'vocational']),
  subject: z.string().min(2).max(100),
  description: z.string().max(2000).optional(),
  registrationStart: z.string().datetime(),
  registrationEnd: z.string().datetime(),
  examDate: z.string().datetime(),
  resultDate: z.string().datetime().optional(),
  duration: z.number().int().min(1).max(600),
  totalMarks: z.number().int().min(1).max(1000),
  passingMarks: z.number().int().min(0).max(1000),
  registrationFee: z.number().min(0).optional(),
  maxCandidates: z.number().int().min(1).optional(),
  syllabusUrl: z.string().url().optional(),
  status: z.enum(['draft', 'registration_open', 'registration_closed', 'ongoing', 'completed', 'cancelled']).default('draft'),
});

export const nationalExamUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  code: z.string().min(2).max(50).optional(),
  type: z.enum(['entrance', 'exit', 'certification', 'placement', 'competitive']).optional(),
  level: z.enum(['primary', 'secondary', 'tertiary', 'vocational']).optional(),
  subject: z.string().min(2).max(100).optional(),
  description: z.string().max(2000).optional(),
  registrationStart: z.string().datetime().optional(),
  registrationEnd: z.string().datetime().optional(),
  examDate: z.string().datetime().optional(),
  resultDate: z.string().datetime().optional(),
  duration: z.number().int().min(1).max(600).optional(),
  totalMarks: z.number().int().min(1).max(1000).optional(),
  passingMarks: z.number().int().min(0).max(1000).optional(),
  registrationFee: z.number().min(0).optional(),
  maxCandidates: z.number().int().min(1).optional(),
  syllabusUrl: z.string().url().optional(),
  status: z.enum(['draft', 'registration_open', 'registration_closed', 'ongoing', 'completed', 'cancelled']).optional(),
});

export const nationalExamQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'examDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'registration_open', 'registration_closed', 'ongoing', 'completed', 'cancelled']).optional(),
  type: z.enum(['entrance', 'exit', 'certification', 'placement', 'competitive']).optional(),
  level: z.enum(['primary', 'secondary', 'tertiary', 'vocational']).optional(),
  subject: z.string().max(100).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── ExamCenter ──────────────────────────────────────────────
export const examCenterCreateSchema = z.object({
  examId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  address: z.string().max(500),
  city: z.string().max(100),
  state: z.string().max(100).optional(),
  country: z.string().min(2).max(100),
  capacity: z.number().int().min(1),
  contactPerson: z.string().min(2).max(200).optional(),
  contactPhone: z.string().max(20).optional(),
  contactEmail: z.string().email().optional(),
  facilities: z.array(z.string().max(100)).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).default('active'),
});

export const examCenterUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().min(2).max(100).optional(),
  capacity: z.number().int().min(1).optional(),
  contactPerson: z.string().min(2).max(200).optional(),
  contactPhone: z.string().max(20).optional(),
  contactEmail: z.string().email().optional(),
  facilities: z.array(z.string().max(100)).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
});

export const examCenterQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'city', 'capacity', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  examId: z.string().uuid().optional(),
});
// ─── ExamCandidate ───────────────────────────────────────────
export const examCandidateCreateSchema = z.object({
  examId: z.string().uuid(),
  studentId: z.string().uuid(),
  centerId: z.string().uuid(),
  registrationNumber: z.string().min(2).max(100),
  fullName: z.string().min(2).max(200),
  dateOfBirth: z.string().datetime(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  identificationType: z.enum(['national_id', 'passport', 'birth_certificate', 'student_id']),
  identificationNumber: z.string().min(2).max(100),
  schoolName: z.string().max(200).optional(),
  previousResults: z.record(z.unknown()).optional(),
  photoUrl: z.string().url().optional(),
  paymentStatus: z.enum(['paid', 'pending', 'waived', 'refunded']).default('pending'),
  status: z.enum(['registered', 'confirmed', 'absent', 'completed', 'disqualified']).default('registered'),
});

export const examCandidateUpdateSchema = z.object({
  centerId: z.string().uuid().optional(),
  registrationNumber: z.string().min(2).max(100).optional(),
  fullName: z.string().min(2).max(200).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  schoolName: z.string().max(200).optional(),
  previousResults: z.record(z.unknown()).optional(),
  photoUrl: z.string().url().optional(),
  paymentStatus: z.enum(['paid', 'pending', 'waived', 'refunded']).optional(),
  status: z.enum(['registered', 'confirmed', 'absent', 'completed', 'disqualified']).optional(),
});

export const examCandidateQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['registrationNumber', 'fullName', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['registered', 'confirmed', 'absent', 'completed', 'disqualified']).optional(),
  paymentStatus: z.enum(['paid', 'pending', 'waived', 'refunded']).optional(),
  examId: z.string().uuid().optional(),
  centerId: z.string().uuid().optional(),
});

// ─── ExamSupervisor ──────────────────────────────────────────
export const examSupervisorCreateSchema = z.object({
  examId: z.string().uuid(),
  userId: z.string().uuid(),
  centerId: z.string().uuid(),
  role: z.enum(['chief_supervisor', 'supervisor', 'invigilator', 'observer']),
  name: z.string().min(2).max(200),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  qualification: z.string().max(500).optional(),
  experience: z.string().max(500).optional(),
  assignedRooms: z.array(z.string().max(100)).optional(),
  shift: z.enum(['morning', 'afternoon', 'full_day']).optional(),
  paymentAmount: z.number().min(0).optional(),
  status: z.enum(['assigned', 'confirmed', 'completed', 'absent', 'cancelled']).default('assigned'),
});

export const examSupervisorUpdateSchema = z.object({
  role: z.enum(['chief_supervisor', 'supervisor', 'invigilator', 'observer']).optional(),
  name: z.string().min(2).max(200).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  qualification: z.string().max(500).optional(),
  experience: z.string().max(500).optional(),
  assignedRooms: z.array(z.string().max(100)).optional(),
  shift: z.enum(['morning', 'afternoon', 'full_day']).optional(),
  paymentAmount: z.number().min(0).optional(),
  status: z.enum(['assigned', 'confirmed', 'completed', 'absent', 'cancelled']).optional(),
});

export const examSupervisorQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'role', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['assigned', 'confirmed', 'completed', 'absent', 'cancelled']).optional(),
  role: z.enum(['chief_supervisor', 'supervisor', 'invigilator', 'observer']).optional(),
  examId: z.string().uuid().optional(),
  centerId: z.string().uuid().optional(),
});
// ─── ExamSession ─────────────────────────────────────────────
export const examSessionCreateSchema = z.object({
  examId: z.string().uuid(),
  centerId: z.string().uuid(),
  sessionDate: z.string().datetime(),
  startTime: z.string(),
  endTime: z.string(),
  room: z.string().max(100),
  subject: z.string().max(100).optional(),
  maxCandidates: z.number().int().min(1),
  actualCandidates: z.number().int().min(0).optional(),
  chiefSupervisorId: z.string().uuid().optional(),
  materialsList: z.array(z.string().max(200)).optional(),
  specialInstructions: z.string().max(2000).optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).default('scheduled'),
});

export const examSessionUpdateSchema = z.object({
  sessionDate: z.string().datetime().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  room: z.string().max(100).optional(),
  subject: z.string().max(100).optional(),
  maxCandidates: z.number().int().min(1).optional(),
  actualCandidates: z.number().int().min(0).optional(),
  chiefSupervisorId: z.string().uuid().optional(),
  materialsList: z.array(z.string().max(200)).optional(),
  specialInstructions: z.string().max(2000).optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).optional(),
});

export const examSessionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['sessionDate', 'startTime', 'room', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).optional(),
  examId: z.string().uuid().optional(),
  centerId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

// ─── MarkingCenter ───────────────────────────────────────────
export const markingCenterCreateSchema = z.object({
  examId: z.string().uuid(),
  name: z.string().min(2).max(200),
  address: z.string().max(500),
  city: z.string().max(100),
  capacity: z.number().int().min(1),
  coordinatorName: z.string().min(2).max(200).optional(),
  coordinatorEmail: z.string().email().optional(),
  coordinatorPhone: z.string().max(20).optional(),
  markingStart: z.string().datetime(),
  markingEnd: z.string().datetime().optional(),
  totalPapers: z.number().int().min(0).optional(),
  markedPapers: z.number().int().min(0).optional(),
  qualityCheckRate: z.number().min(0).max(100).optional(),
  status: z.enum(['preparing', 'active', 'completed', 'paused']).default('preparing'),
});

export const markingCenterUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  capacity: z.number().int().min(1).optional(),
  coordinatorName: z.string().min(2).max(200).optional(),
  coordinatorEmail: z.string().email().optional(),
  coordinatorPhone: z.string().max(20).optional(),
  markingStart: z.string().datetime().optional(),
  markingEnd: z.string().datetime().optional(),
  totalPapers: z.number().int().min(0).optional(),
  markedPapers: z.number().int().min(0).optional(),
  qualityCheckRate: z.number().min(0).max(100).optional(),
  status: z.enum(['preparing', 'active', 'completed', 'paused']).optional(),
});

export const markingCenterQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'city', 'totalPapers', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['preparing', 'active', 'completed', 'paused']).optional(),
  city: z.string().max(100).optional(),
  examId: z.string().uuid().optional(),
});

// ─── ExamResult ──────────────────────────────────────────────
export const examResultCreateSchema = z.object({
  examId: z.string().uuid(),
  candidateId: z.string().uuid(),
  centerId: z.string().uuid(),
  sessionId: z.string().uuid().optional(),
  totalMarks: z.number().int().min(0),
  obtainedMarks: z.number().int().min(0),
  percentage: z.number().min(0).max(100),
  grade: z.string().max(10).optional(),
  status: z.enum(['pass', 'fail', 'absent', 'disqualified', 'withheld', 'pending_review']),
  subjectScores: z.record(z.number()).optional(),
  remarks: z.string().max(1000).optional(),
  verifiedBy: z.string().uuid().optional(),
  publishedAt: z.string().datetime().optional(),
  reviewStatus: z.enum(['none', 'under_review', 'approved', 'rejected']).default('none'),
});

export const examResultUpdateSchema = z.object({
  totalMarks: z.number().int().min(0).optional(),
  obtainedMarks: z.number().int().min(0).optional(),
  percentage: z.number().min(0).max(100).optional(),
  grade: z.string().max(10).optional(),
  status: z.enum(['pass', 'fail', 'absent', 'disqualified', 'withheld', 'pending_review']).optional(),
  subjectScores: z.record(z.number()).optional(),
  remarks: z.string().max(1000).optional(),
  verifiedBy: z.string().uuid().optional(),
  publishedAt: z.string().datetime().optional(),
  reviewStatus: z.enum(['none', 'under_review', 'approved', 'rejected']).optional(),
});

export const examResultQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['obtainedMarks', 'percentage', 'grade', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['pass', 'fail', 'absent', 'disqualified', 'withheld', 'pending_review']).optional(),
  reviewStatus: z.enum(['none', 'under_review', 'approved', 'rejected']).optional(),
  examId: z.string().uuid().optional(),
  candidateId: z.string().uuid().optional(),
  centerId: z.string().uuid().optional(),
});
// ─── Certificate ─────────────────────────────────────────────
export const certificateCreateSchema = z.object({
  examId: z.string().uuid(),
  candidateId: z.string().uuid(),
  certificateNumber: z.string().min(2).max(100),
  certificateType: z.enum(['completion', 'distinction', 'merit', 'pass', 'honour']),
  holderName: z.string().min(2).max(200),
  dateOfIssue: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  issuingAuthority: z.string().min(2).max(200),
  qualification: z.string().max(200).optional(),
  grade: z.string().max(20).optional(),
  subjects: z.array(z.string().max(100)).optional(),
  verificationUrl: z.string().url().optional(),
  digitalSignature: z.string().max(500).optional(),
  status: z.enum(['valid', 'revoked', 'expired', 'pending']).default('valid'),
});

export const certificateUpdateSchema = z.object({
  certificateNumber: z.string().min(2).max(100).optional(),
  certificateType: z.enum(['completion', 'distinction', 'merit', 'pass', 'honour']).optional(),
  holderName: z.string().min(2).max(200).optional(),
  dateOfIssue: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  issuingAuthority: z.string().min(2).max(200).optional(),
  qualification: z.string().max(200).optional(),
  grade: z.string().max(20).optional(),
  subjects: z.array(z.string().max(100)).optional(),
  verificationUrl: z.string().url().optional(),
  digitalSignature: z.string().max(500).optional(),
  status: z.enum(['valid', 'revoked', 'expired', 'pending']).optional(),
});

export const certificateQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['certificateNumber', 'holderName', 'dateOfIssue', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['valid', 'revoked', 'expired', 'pending']).optional(),
  certificateType: z.enum(['completion', 'distinction', 'merit', 'pass', 'honour']).optional(),
  examId: z.string().uuid().optional(),
  candidateId: z.string().uuid().optional(),
});

// ─── Diploma ─────────────────────────────────────────────────
export const diplomaCreateSchema = z.object({
  schoolId: z.string().uuid(),
  candidateId: z.string().uuid(),
  diplomaNumber: z.string().min(2).max(100),
  diplomaType: z.enum(['high_school', 'bachelors', 'masters', 'doctorate', 'vocational', 'professional']),
  holderName: z.string().min(2).max(200),
  fieldOfStudy: z.string().min(2).max(200),
  institution: z.string().min(2).max(200),
  dateOfIssue: z.string().datetime(),
  graduationYear: z.number().int().min(1900).max(2100),
  gpa: z.number().min(0).max(4).optional(),
  honours: z.enum(['first', 'second_upper', 'second_lower', 'third', 'none']).optional(),
  thesisTitle: z.string().max(500).optional(),
  transcriptUrl: z.string().url().optional(),
  status: z.enum(['valid', 'revoked', 'pending', 'expired']).default('valid'),
});

export const diplomaUpdateSchema = z.object({
  diplomaNumber: z.string().min(2).max(100).optional(),
  diplomaType: z.enum(['high_school', 'bachelors', 'masters', 'doctorate', 'vocational', 'professional']).optional(),
  holderName: z.string().min(2).max(200).optional(),
  fieldOfStudy: z.string().min(2).max(200).optional(),
  institution: z.string().min(2).max(200).optional(),
  dateOfIssue: z.string().datetime().optional(),
  graduationYear: z.number().int().min(1900).max(2100).optional(),
  gpa: z.number().min(0).max(4).optional(),
  honours: z.enum(['first', 'second_upper', 'second_lower', 'third', 'none']).optional(),
  thesisTitle: z.string().max(500).optional(),
  transcriptUrl: z.string().url().optional(),
  status: z.enum(['valid', 'revoked', 'pending', 'expired']).optional(),
});

export const diplomaQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['diplomaNumber', 'holderName', 'graduationYear', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['valid', 'revoked', 'pending', 'expired']).optional(),
  diplomaType: z.enum(['high_school', 'bachelors', 'masters', 'doctorate', 'vocational', 'professional']).optional(),
  schoolId: z.string().uuid().optional(),
  candidateId: z.string().uuid().optional(),
});

// ─── ExamFraud ───────────────────────────────────────────────
export const examFraudCreateSchema = z.object({
  examId: z.string().uuid(),
  candidateId: z.string().uuid(),
  reportedBy: z.string().uuid(),
  incidentDate: z.string().datetime(),
  fraudType: z.enum(['cheating', 'impersonation', 'leakage', 'forgery', 'collusion', 'electronic', 'other']),
  description: z.string().min(10).max(5000),
  evidenceUrls: z.array(z.string().url()).optional(),
  witnesses: z.array(z.string().max(200)).optional(),
  centerId: z.string().uuid().optional(),
  roomNumber: z.string().max(50).optional(),
  severity: z.enum(['minor', 'major', 'critical']).default('major'),
  status: z.enum(['reported', 'investigating', 'hearing', 'resolved', 'appealed', 'closed']).default('reported'),
});

export const examFraudUpdateSchema = z.object({
  incidentDate: z.string().datetime().optional(),
  fraudType: z.enum(['cheating', 'impersonation', 'leakage', 'forgery', 'collusion', 'electronic', 'other']).optional(),
  description: z.string().min(10).max(5000).optional(),
  evidenceUrls: z.array(z.string().url()).optional(),
  witnesses: z.array(z.string().max(200)).optional(),
  severity: z.enum(['minor', 'major', 'critical']).optional(),
  status: z.enum(['reported', 'investigating', 'hearing', 'resolved', 'appealed', 'closed']).optional(),
  investigationNotes: z.string().max(5000).optional(),
  outcome: z.string().max(2000).optional(),
  penaltyApplied: z.string().max(500).optional(),
});

export const examFraudQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['incidentDate', 'fraudType', 'severity', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['reported', 'investigating', 'hearing', 'resolved', 'appealed', 'closed']).optional(),
  fraudType: z.enum(['cheating', 'impersonation', 'leakage', 'forgery', 'collusion', 'electronic', 'other']).optional(),
  severity: z.enum(['minor', 'major', 'critical']).optional(),
  examId: z.string().uuid().optional(),
  candidateId: z.string().uuid().optional(),
});
// ─── ExamAppeal ──────────────────────────────────────────────
export const examAppealCreateSchema = z.object({
  examId: z.string().uuid(),
  candidateId: z.string().uuid(),
  resultId: z.string().uuid(),
  appealType: z.enum(['result_review', 'marking_error', 'procedural', 'eligibility', 'other']),
  reason: z.string().min(10).max(5000),
  supportingDocuments: z.array(z.string().url()).optional(),
  requestedAction: z.string().max(1000),
  submissionDate: z.string().datetime(),
  hearingDate: z.string().datetime().optional(),
  status: z.enum(['submitted', 'under_review', 'hearing_scheduled', 'decision_pending', 'upheld', 'rejected', 'closed']).default('submitted'),
});

export const examAppealUpdateSchema = z.object({
  appealType: z.enum(['result_review', 'marking_error', 'procedural', 'eligibility', 'other']).optional(),
  reason: z.string().min(10).max(5000).optional(),
  supportingDocuments: z.array(z.string().url()).optional(),
  requestedAction: z.string().max(1000).optional(),
  hearingDate: z.string().datetime().optional(),
  status: z.enum(['submitted', 'under_review', 'hearing_scheduled', 'decision_pending', 'upheld', 'rejected', 'closed']).optional(),
  decision: z.string().max(2000).optional(),
  decidedBy: z.string().uuid().optional(),
  decidedAt: z.string().datetime().optional(),
});

export const examAppealQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['submissionDate', 'appealType', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['submitted', 'under_review', 'hearing_scheduled', 'decision_pending', 'upheld', 'rejected', 'closed']).optional(),
  appealType: z.enum(['result_review', 'marking_error', 'procedural', 'eligibility', 'other']).optional(),
  examId: z.string().uuid().optional(),
  candidateId: z.string().uuid().optional(),
});

// ─── ExamStatistics ──────────────────────────────────────────
export const examStatisticsCreateSchema = z.object({
  examId: z.string().uuid(),
  totalRegistered: z.number().int().min(0),
  totalAppeared: z.number().int().min(0),
  totalPassed: z.number().int().min(0),
  totalFailed: z.number().int().min(0),
  totalAbsent: z.number().int().min(0),
  totalDisqualified: z.number().int().min(0),
  passPercentage: z.number().min(0).max(100),
  averageScore: z.number().min(0),
  highestScore: z.number().min(0),
  lowestScore: z.number().min(0),
  medianScore: z.number().min(0).optional(),
  standardDeviation: z.number().min(0).optional(),
  gradeDistribution: z.record(z.number()).optional(),
  regionWiseStats: z.record(z.unknown()).optional(),
  genderWiseStats: z.record(z.unknown()).optional(),
  publishedAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const examStatisticsUpdateSchema = z.object({
  totalRegistered: z.number().int().min(0).optional(),
  totalAppeared: z.number().int().min(0).optional(),
  totalPassed: z.number().int().min(0).optional(),
  totalFailed: z.number().int().min(0).optional(),
  totalAbsent: z.number().int().min(0).optional(),
  totalDisqualified: z.number().int().min(0).optional(),
  passPercentage: z.number().min(0).max(100).optional(),
  averageScore: z.number().min(0).optional(),
  highestScore: z.number().min(0).optional(),
  lowestScore: z.number().min(0).optional(),
  medianScore: z.number().min(0).optional(),
  standardDeviation: z.number().min(0).optional(),
  gradeDistribution: z.record(z.number()).optional(),
  regionWiseStats: z.record(z.unknown()).optional(),
  genderWiseStats: z.record(z.unknown()).optional(),
  publishedAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const examStatisticsQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['examId', 'passPercentage', 'averageScore', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  examId: z.string().uuid().optional(),
});
// ─── InspectionMission ───────────────────────────────────────
export const inspectionMissionCreateSchema = z.object({
  ministryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  description: z.string().min(10).max(5000),
  missionType: z.enum(['routine', 'special', 'follow_up', 'emergency', 'audit']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  teamLeaderId: z.string().uuid().optional(),
  teamMembers: z.array(z.string().uuid()).optional(),
  targetSchools: z.array(z.string().uuid()).optional(),
  targetRegion: z.string().max(200).optional(),
  budget: z.number().min(0).optional(),
  objectives: z.array(z.string().max(500)).optional(),
  status: z.enum(['planning', 'active', 'completed', 'cancelled', 'on_hold']).default('planning'),
});

export const inspectionMissionUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  description: z.string().min(10).max(5000).optional(),
  missionType: z.enum(['routine', 'special', 'follow_up', 'emergency', 'audit']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  teamLeaderId: z.string().uuid().optional(),
  teamMembers: z.array(z.string().uuid()).optional(),
  targetSchools: z.array(z.string().uuid()).optional(),
  targetRegion: z.string().max(200).optional(),
  budget: z.number().min(0).optional(),
  objectives: z.array(z.string().max(500)).optional(),
  status: z.enum(['planning', 'active', 'completed', 'cancelled', 'on_hold']).optional(),
  completionReport: z.string().max(10000).optional(),
});

export const inspectionMissionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'missionType', 'startDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['planning', 'active', 'completed', 'cancelled', 'on_hold']).optional(),
  missionType: z.enum(['routine', 'special', 'follow_up', 'emergency', 'audit']).optional(),
  ministryId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

// ─── InspectionReport ────────────────────────────────────────
export const inspectionReportCreateSchema = z.object({
  visitId: z.string().uuid(),
  missionId: z.string().uuid().optional(),
  inspectorId: z.string().uuid(),
  schoolId: z.string().uuid(),
  reportDate: z.string().datetime(),
  overallScore: z.number().min(0).max(100),
  categoryScores: z.record(z.number()),
  strengths: z.array(z.string().max(500)).optional(),
  weaknesses: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  complianceStatus: z.enum(['compliant', 'partially_compliant', 'non_compliant']),
  followUpRequired: z.boolean().default(false),
  followUpDate: z.string().datetime().optional(),
  attachments: z.array(z.string().url()).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).default('draft'),
});

export const inspectionReportUpdateSchema = z.object({
  reportDate: z.string().datetime().optional(),
  overallScore: z.number().min(0).max(100).optional(),
  categoryScores: z.record(z.number()).optional(),
  strengths: z.array(z.string().max(500)).optional(),
  weaknesses: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  complianceStatus: z.enum(['compliant', 'partially_compliant', 'non_compliant']).optional(),
  followUpRequired: z.boolean().optional(),
  followUpDate: z.string().datetime().optional(),
  attachments: z.array(z.string().url()).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reviewedBy: z.string().uuid().optional(),
  reviewNotes: z.string().max(5000).optional(),
});

export const inspectionReportQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['reportDate', 'overallScore', 'complianceStatus', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  complianceStatus: z.enum(['compliant', 'partially_compliant', 'non_compliant']).optional(),
  visitId: z.string().uuid().optional(),
  inspectorId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
});
// ─── InspectionRecommendation ────────────────────────────────
export const inspectionRecommendationCreateSchema = z.object({
  reportId: z.string().uuid(),
  category: z.enum(['academic', 'infrastructure', 'safety', 'governance', 'finance', 'hr', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().min(10).max(2000),
  actionRequired: z.string().min(10).max(2000),
  responsibleParty: z.string().max(200).optional(),
  deadline: z.string().datetime().optional(),
  estimatedCost: z.number().min(0).optional(),
  status: z.enum(['open', 'in_progress', 'completed', 'overdue', 'dismissed']).default('open'),
});

export const inspectionRecommendationUpdateSchema = z.object({
  category: z.enum(['academic', 'infrastructure', 'safety', 'governance', 'finance', 'hr', 'other']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  description: z.string().min(10).max(2000).optional(),
  actionRequired: z.string().min(10).max(2000).optional(),
  responsibleParty: z.string().max(200).optional(),
  deadline: z.string().datetime().optional(),
  estimatedCost: z.number().min(0).optional(),
  status: z.enum(['open', 'in_progress', 'completed', 'overdue', 'dismissed']).optional(),
  completionNotes: z.string().max(2000).optional(),
  completedAt: z.string().datetime().optional(),
});

export const inspectionRecommendationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['priority', 'deadline', 'category', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['open', 'in_progress', 'completed', 'overdue', 'dismissed']).optional(),
  category: z.enum(['academic', 'infrastructure', 'safety', 'governance', 'finance', 'hr', 'other']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  reportId: z.string().uuid().optional(),
});

// ─── SchoolCompliance ────────────────────────────────────────
export const schoolComplianceCreateSchema = z.object({
  schoolId: z.string().uuid(),
  standardId: z.string().uuid(),
  assessmentDate: z.string().datetime(),
  assessorId: z.string().uuid().optional(),
  complianceScore: z.number().min(0).max(100),
  evidence: z.array(z.string().url()).optional(),
  notes: z.string().max(5000).optional(),
  nextReviewDate: z.string().datetime().optional(),
  status: z.enum(['compliant', 'partially_compliant', 'non_compliant', 'pending_review']).default('pending_review'),
});

export const schoolComplianceUpdateSchema = z.object({
  standardId: z.string().uuid().optional(),
  assessmentDate: z.string().datetime().optional(),
  assessorId: z.string().uuid().optional(),
  complianceScore: z.number().min(0).max(100).optional(),
  status: z.enum(['compliant', 'partially_compliant', 'non_compliant', 'pending_review']).optional(),
  evidence: z.array(z.string().url()).optional(),
  notes: z.string().max(5000).optional(),
  nextReviewDate: z.string().datetime().optional(),
});

export const schoolComplianceQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['complianceScore', 'assessmentDate', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['compliant', 'partially_compliant', 'non_compliant', 'pending_review']).optional(),
  schoolId: z.string().uuid().optional(),
  standardId: z.string().uuid().optional(),
});

// ─── CorrectiveAction ────────────────────────────────────────
export const correctiveActionCreateSchema = z.object({
  schoolId: z.string().uuid(),
  reportId: z.string().uuid().optional(),
  recommendationId: z.string().uuid().optional(),
  title: z.string().min(2).max(300),
  description: z.string().min(10).max(5000),
  actionType: z.enum(['immediate', 'short_term', 'long_term', 'structural']),
  responsiblePerson: z.string().max(200).optional(),
  deadline: z.string().datetime(),
  estimatedCost: z.number().min(0).optional(),
  fundingSource: z.string().max(200).optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'overdue', 'cancelled']).default('planned'),
});

export const correctiveActionUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  description: z.string().min(10).max(5000).optional(),
  actionType: z.enum(['immediate', 'short_term', 'long_term', 'structural']).optional(),
  responsiblePerson: z.string().max(200).optional(),
  deadline: z.string().datetime().optional(),
  estimatedCost: z.number().min(0).optional(),
  fundingSource: z.string().max(200).optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'overdue', 'cancelled']).optional(),
  completedAt: z.string().datetime().optional(),
  completionNotes: z.string().max(5000).optional(),
  actualCost: z.number().min(0).optional(),
});

export const correctiveActionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['deadline', 'title', 'actionType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'overdue', 'cancelled']).optional(),
  actionType: z.enum(['immediate', 'short_term', 'long_term', 'structural']).optional(),
  schoolId: z.string().uuid().optional(),
});
// ─── InspectionCalendar ──────────────────────────────────────
export const inspectionCalendarCreateSchema = z.object({
  ministryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  inspectionType: z.enum(['routine', 'special', 'follow_up', 'audit', 'emergency']),
  scheduledDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  assignedInspectors: z.array(z.string().uuid()).optional(),
  targetSchools: z.array(z.string().uuid()).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['scheduled', 'confirmed', 'completed', 'cancelled', 'postponed']).default('scheduled'),
});

export const inspectionCalendarUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  inspectionType: z.enum(['routine', 'special', 'follow_up', 'audit', 'emergency']).optional(),
  scheduledDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  assignedInspectors: z.array(z.string().uuid()).optional(),
  targetSchools: z.array(z.string().uuid()).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['scheduled', 'confirmed', 'completed', 'cancelled', 'postponed']).optional(),
});

export const inspectionCalendarQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'scheduledDate', 'inspectionType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['scheduled', 'confirmed', 'completed', 'cancelled', 'postponed']).optional(),
  inspectionType: z.enum(['routine', 'special', 'follow_up', 'audit', 'emergency']).optional(),
  region: z.string().max(200).optional(),
  ministryId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

// ─── SchoolRating ────────────────────────────────────────────
export const schoolRatingCreateSchema = z.object({
  schoolId: z.string().uuid(),
  ratingDate: z.string().datetime(),
  overallRating: z.enum(['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']),
  academicScore: z.number().min(0).max(100),
  infrastructureScore: z.number().min(0).max(100).optional(),
  governanceScore: z.number().min(0).max(100).optional(),
  teacherQualityScore: z.number().min(0).max(100).optional(),
  studentOutcomeScore: z.number().min(0).max(100).optional(),
  safetyScore: z.number().min(0).max(100).optional(),
  ratedBy: z.string().uuid().optional(),
  methodology: z.string().max(500).optional(),
  previousRating: z.enum(['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']).optional(),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const schoolRatingUpdateSchema = z.object({
  ratingDate: z.string().datetime().optional(),
  overallRating: z.enum(['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']).optional(),
  academicScore: z.number().min(0).max(100).optional(),
  infrastructureScore: z.number().min(0).max(100).optional(),
  governanceScore: z.number().min(0).max(100).optional(),
  teacherQualityScore: z.number().min(0).max(100).optional(),
  studentOutcomeScore: z.number().min(0).max(100).optional(),
  safetyScore: z.number().min(0).max(100).optional(),
  ratedBy: z.string().uuid().optional(),
  methodology: z.string().max(500).optional(),
  previousRating: z.enum(['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']).optional(),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const schoolRatingQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['ratingDate', 'overallRating', 'academicScore', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  overallRating: z.enum(['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']).optional(),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  schoolId: z.string().uuid().optional(),
});
// ─── InspectionChecklist ─────────────────────────────────────
export const inspectionChecklistCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  inspectionType: z.enum(['routine', 'special', 'follow_up', 'audit', 'safety']),
  items: z.array(z.object({
    code: z.string().max(50),
    description: z.string().max(500),
    category: z.string().max(100),
    weight: z.number().min(0).max(100).optional(),
    isRequired: z.boolean().default(true),
  })),
  version: z.string().max(20).optional(),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
});

export const inspectionChecklistUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional(),
  inspectionType: z.enum(['routine', 'special', 'follow_up', 'audit', 'safety']).optional(),
  items: z.array(z.object({
    code: z.string().max(50),
    description: z.string().max(500),
    category: z.string().max(100),
    weight: z.number().min(0).max(100).optional(),
    isRequired: z.boolean().default(true),
  })).optional(),
  version: z.string().max(20).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
});

export const inspectionChecklistQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'inspectionType', 'version', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
  inspectionType: z.enum(['routine', 'special', 'follow_up', 'audit', 'safety']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── InspectorPerformance ────────────────────────────────────
export const inspectorPerformanceCreateSchema = z.object({
  inspectorId: z.string().uuid(),
  period: z.string().max(50),
  academicYear: z.string().max(20),
  totalVisits: z.number().int().min(0),
  completedVisits: z.number().int().min(0),
  reportsSubmitted: z.number().int().min(0),
  onTimeReports: z.number().int().min(0),
  averageScore: z.number().min(0).max(100).optional(),
  accuracyRate: z.number().min(0).max(100).optional(),
  feedbackScore: z.number().min(0).max(5).optional(),
  commendations: z.number().int().min(0).optional(),
  complaints: z.number().int().min(0).optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const inspectorPerformanceUpdateSchema = z.object({
  period: z.string().max(50).optional(),
  academicYear: z.string().max(20).optional(),
  totalVisits: z.number().int().min(0).optional(),
  completedVisits: z.number().int().min(0).optional(),
  reportsSubmitted: z.number().int().min(0).optional(),
  onTimeReports: z.number().int().min(0).optional(),
  averageScore: z.number().min(0).max(100).optional(),
  accuracyRate: z.number().min(0).max(100).optional(),
  feedbackScore: z.number().min(0).max(5).optional(),
  commendations: z.number().int().min(0).optional(),
  complaints: z.number().int().min(0).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const inspectorPerformanceQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['period', 'totalVisits', 'averageScore', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  inspectorId: z.string().uuid().optional(),
  academicYear: z.string().max(20).optional(),
});
// ─── ComplianceTrend ─────────────────────────────────────────
export const complianceTrendCreateSchema = z.object({
  schoolId: z.string().uuid(),
  standardId: z.string().uuid().optional(),
  period: z.string().max(50),
  academicYear: z.string().max(20),
  currentScore: z.number().min(0).max(100),
  previousScore: z.number().min(0).max(100).optional(),
  changePercentage: z.number().optional(),
  trend: z.enum(['improving', 'stable', 'declining']),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  publishedAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const complianceTrendUpdateSchema = z.object({
  period: z.string().max(50).optional(),
  academicYear: z.string().max(20).optional(),
  currentScore: z.number().min(0).max(100).optional(),
  previousScore: z.number().min(0).max(100).optional(),
  changePercentage: z.number().optional(),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  publishedAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const complianceTrendQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['period', 'currentScore', 'trend', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  schoolId: z.string().uuid().optional(),
  standardId: z.string().uuid().optional(),
});

// ─── Accreditation ───────────────────────────────────────────
export const accreditationCreateSchema = z.object({
  schoolId: z.string().uuid(),
  accreditingBody: z.string().min(2).max(200),
  programName: z.string().min(2).max(300),
  level: z.enum(['institutional', 'program', 'department', 'specialized']),
  applicationDate: z.string().datetime(),
  validityPeriod: z.number().int().min(1).max(10).optional(),
  accreditationNumber: z.string().max(100).optional(),
  accreditedDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  conditions: z.array(z.string().max(500)).optional(),
  notes: z.string().max(5000).optional(),
  status: z.enum(['applied', 'under_review', 'site_visit', 'decision_pending', 'accredited', 'provisional', 'denied', 'suspended', 'expired']).default('applied'),
});

export const accreditationUpdateSchema = z.object({
  accreditingBody: z.string().min(2).max(200).optional(),
  programName: z.string().min(2).max(300).optional(),
  level: z.enum(['institutional', 'program', 'department', 'specialized']).optional(),
  applicationDate: z.string().datetime().optional(),
  status: z.enum(['applied', 'under_review', 'site_visit', 'decision_pending', 'accredited', 'provisional', 'denied', 'suspended', 'expired']).optional(),
  validityPeriod: z.number().int().min(1).max(10).optional(),
  accreditationNumber: z.string().max(100).optional(),
  accreditedDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  conditions: z.array(z.string().max(500)).optional(),
  notes: z.string().max(5000).optional(),
});

export const accreditationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['applicationDate', 'accreditedDate', 'programName', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['applied', 'under_review', 'site_visit', 'decision_pending', 'accredited', 'provisional', 'denied', 'suspended', 'expired']).optional(),
  level: z.enum(['institutional', 'program', 'department', 'specialized']).optional(),
  schoolId: z.string().uuid().optional(),
});
// ─── AccreditationStandard ───────────────────────────────────
export const accreditationStandardCreateSchema = z.object({
  accreditingBody: z.string().min(2).max(200),
  name: z.string().min(2).max(300),
  code: z.string().min(2).max(50),
  description: z.string().max(2000).optional(),
  category: z.enum(['academic', 'infrastructure', 'governance', 'finance', 'student_support', 'research', 'community']),
  criteria: z.array(z.object({
    code: z.string().max(50),
    description: z.string().max(500),
    weight: z.number().min(0).max(100).optional(),
    isRequired: z.boolean().default(true),
    evidenceRequired: z.string().max(500).optional(),
  })),
  minScore: z.number().min(0).max(100).optional(),
  maxScore: z.number().min(0).max(100).optional(),
  version: z.string().max(20).optional(),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
});

export const accreditationStandardUpdateSchema = z.object({
  accreditingBody: z.string().min(2).max(200).optional(),
  name: z.string().min(2).max(300).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().max(2000).optional(),
  category: z.enum(['academic', 'infrastructure', 'governance', 'finance', 'student_support', 'research', 'community']).optional(),
  criteria: z.array(z.object({
    code: z.string().max(50),
    description: z.string().max(500),
    weight: z.number().min(0).max(100).optional(),
    isRequired: z.boolean().default(true),
    evidenceRequired: z.string().max(500).optional(),
  })).optional(),
  minScore: z.number().min(0).max(100).optional(),
  maxScore: z.number().min(0).max(100).optional(),
  version: z.string().max(20).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
});

export const accreditationStandardQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'category', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
  category: z.enum(['academic', 'infrastructure', 'governance', 'finance', 'student_support', 'research', 'community']).optional(),
  accreditingBody: z.string().max(200).optional(),
});

// ─── AccreditationAssessment ─────────────────────────────────
export const accreditationAssessmentCreateSchema = z.object({
  accreditationId: z.string().uuid(),
  assessorId: z.string().uuid(),
  standardId: z.string().uuid(),
  assessmentDate: z.string().datetime(),
  scores: z.record(z.number()),
  totalScore: z.number().min(0).max(100),
  findings: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  evidenceUrls: z.array(z.string().url()).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved']).default('draft'),
});

export const accreditationAssessmentUpdateSchema = z.object({
  assessorId: z.string().uuid().optional(),
  standardId: z.string().uuid().optional(),
  assessmentDate: z.string().datetime().optional(),
  scores: z.record(z.number()).optional(),
  totalScore: z.number().min(0).max(100).optional(),
  findings: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  evidenceUrls: z.array(z.string().url()).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved']).optional(),
});

export const accreditationAssessmentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['assessmentDate', 'totalScore', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved']).optional(),
  accreditationId: z.string().uuid().optional(),
  assessorId: z.string().uuid().optional(),
  standardId: z.string().uuid().optional(),
});
// ─── Certification ───────────────────────────────────────────
export const certificationCreateSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(2).max(300),
  issuingBody: z.string().min(2).max(200),
  certificationType: z.enum(['iso', 'quality', 'safety', 'environmental', 'other']),
  certificateNumber: z.string().max(100).optional(),
  issueDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  scope: z.string().max(500).optional(),
  documentUrl: z.string().url().optional(),
  renewalRequired: z.boolean().default(true),
  status: z.enum(['valid', 'expired', 'revoked', 'pending_renewal']).default('valid'),
});

export const certificationUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  issuingBody: z.string().min(2).max(200).optional(),
  certificationType: z.enum(['iso', 'quality', 'safety', 'environmental', 'other']).optional(),
  certificateNumber: z.string().max(100).optional(),
  issueDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  scope: z.string().max(500).optional(),
  documentUrl: z.string().url().optional(),
  renewalRequired: z.boolean().optional(),
  status: z.enum(['valid', 'expired', 'revoked', 'pending_renewal']).optional(),
});

export const certificationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'issueDate', 'expiryDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['valid', 'expired', 'revoked', 'pending_renewal']).optional(),
  certificationType: z.enum(['iso', 'quality', 'safety', 'environmental', 'other']).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── Renewal ─────────────────────────────────────────────────
export const renewalCreateSchema = z.object({
  certificationId: z.string().uuid(),
  schoolId: z.string().uuid(),
  renewalType: z.enum(['accreditation', 'certification', 'license', 'registration']),
  applicationDate: z.string().datetime(),
  currentExpiryDate: z.string().datetime(),
  newExpiryDate: z.string().datetime().optional(),
  renewalFee: z.number().min(0).optional(),
  requirements: z.array(z.string().max(500)).optional(),
  documentsSubmitted: z.array(z.string().url()).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['applied', 'under_review', 'approved', 'rejected', 'completed', 'expired']).default('applied'),
});

export const renewalUpdateSchema = z.object({
  renewalType: z.enum(['accreditation', 'certification', 'license', 'registration']).optional(),
  applicationDate: z.string().datetime().optional(),
  currentExpiryDate: z.string().datetime().optional(),
  newExpiryDate: z.string().datetime().optional(),
  renewalFee: z.number().min(0).optional(),
  requirements: z.array(z.string().max(500)).optional(),
  documentsSubmitted: z.array(z.string().url()).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['applied', 'under_review', 'approved', 'rejected', 'completed', 'expired']).optional(),
  decisionDate: z.string().datetime().optional(),
  decisionBy: z.string().uuid().optional(),
  decisionNotes: z.string().max(2000).optional(),
});

export const renewalQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['applicationDate', 'currentExpiryDate', 'renewalType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['applied', 'under_review', 'approved', 'rejected', 'completed', 'expired']).optional(),
  renewalType: z.enum(['accreditation', 'certification', 'license', 'registration']).optional(),
  schoolId: z.string().uuid().optional(),
  certificationId: z.string().uuid().optional(),
});
// ─── QualityAudit ────────────────────────────────────────────
export const qualityAuditCreateSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(2).max(300),
  auditType: z.enum(['internal', 'external', 'regulatory', 'voluntary']),
  auditDate: z.string().datetime(),
  auditorName: z.string().min(2).max(200),
  auditorOrganization: z.string().max(200).optional(),
  scope: z.string().max(500),
  overallScore: z.number().min(0).max(100).optional(),
  findings: z.array(z.object({
    category: z.string().max(100),
    description: z.string().max(500),
    severity: z.enum(['minor', 'major', 'critical']),
    recommendation: z.string().max(500).optional(),
  })).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  followUpDate: z.string().datetime().optional(),
  documentUrl: z.string().url().optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'follow_up_required', 'closed']).default('planned'),
});

export const qualityAuditUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  auditType: z.enum(['internal', 'external', 'regulatory', 'voluntary']).optional(),
  auditDate: z.string().datetime().optional(),
  auditorName: z.string().min(2).max(200).optional(),
  auditorOrganization: z.string().max(200).optional(),
  scope: z.string().max(500).optional(),
  overallScore: z.number().min(0).max(100).optional(),
  findings: z.array(z.object({
    category: z.string().max(100),
    description: z.string().max(500),
    severity: z.enum(['minor', 'major', 'critical']),
    recommendation: z.string().max(500).optional(),
  })).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  followUpDate: z.string().datetime().optional(),
  documentUrl: z.string().url().optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'follow_up_required', 'closed']).optional(),
});

export const qualityAuditQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['auditDate', 'overallScore', 'auditType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'follow_up_required', 'closed']).optional(),
  auditType: z.enum(['internal', 'external', 'regulatory', 'voluntary']).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── ComplianceRule ──────────────────────────────────────────
export const complianceRuleCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  code: z.string().min(2).max(50),
  description: z.string().min(10).max(5000),
  category: z.enum(['safety', 'academic', 'financial', 'environmental', 'labor', 'data_protection', 'governance', 'other']),
  legalBasis: z.string().max(500).optional(),
  effectiveDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  penalties: z.string().max(2000).optional(),
  enforcementLevel: z.enum(['mandatory', 'advisory', 'voluntary']).default('mandatory'),
  applicableTo: z.array(z.enum(['public', 'private', 'ngo', 'international', 'all'])),
  status: z.enum(['draft', 'active', 'suspended', 'repealed']).default('draft'),
});

export const complianceRuleUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().min(10).max(5000).optional(),
  category: z.enum(['safety', 'academic', 'financial', 'environmental', 'labor', 'data_protection', 'governance', 'other']).optional(),
  legalBasis: z.string().max(500).optional(),
  effectiveDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  penalties: z.string().max(2000).optional(),
  enforcementLevel: z.enum(['mandatory', 'advisory', 'voluntary']).optional(),
  applicableTo: z.array(z.enum(['public', 'private', 'ngo', 'international', 'all'])).optional(),
  status: z.enum(['draft', 'active', 'suspended', 'repealed']).optional(),
});

export const complianceRuleQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'category', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'suspended', 'repealed']).optional(),
  category: z.enum(['safety', 'academic', 'financial', 'environmental', 'labor', 'data_protection', 'governance', 'other']).optional(),
  enforcementLevel: z.enum(['mandatory', 'advisory', 'voluntary']).optional(),
  ministryId: z.string().uuid().optional(),
});
// ─── QualityIndicator ────────────────────────────────────────
export const qualityIndicatorCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  category: z.enum(['academic', 'operational', 'financial', 'satisfaction', 'safety', 'other']),
  unit: z.string().max(50),
  targetValue: z.number(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  formula: z.string().max(500).optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'annually']),
  dataSources: z.array(z.string().max(200)).optional(),
  responsibleEntity: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
});

export const qualityIndicatorUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional(),
  category: z.enum(['academic', 'operational', 'financial', 'satisfaction', 'safety', 'other']).optional(),
  unit: z.string().max(50).optional(),
  targetValue: z.number().optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  formula: z.string().max(500).optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'annually']).optional(),
  dataSources: z.array(z.string().max(200)).optional(),
  responsibleEntity: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
});

export const qualityIndicatorQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'category', 'frequency', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
  category: z.enum(['academic', 'operational', 'financial', 'satisfaction', 'safety', 'other']).optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'annually']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── AccreditationDocument ───────────────────────────────────
export const accreditationDocumentCreateSchema = z.object({
  accreditationId: z.string().uuid(),
  title: z.string().min(2).max(300),
  documentType: z.enum(['application', 'evidence', 'report', 'decision', 'correspondence', 'checklist', 'other']),
  fileUrl: z.string().url(),
  fileSize: z.number().int().min(0).optional(),
  mimeType: z.string().max(100).optional(),
  uploadedBy: z.string().uuid().optional(),
  description: z.string().max(2000).optional(),
  version: z.string().max(20).optional(),
  status: z.enum(['current', 'archived', 'superseded']).default('current'),
});

export const accreditationDocumentUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  documentType: z.enum(['application', 'evidence', 'report', 'decision', 'correspondence', 'checklist', 'other']).optional(),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().int().min(0).optional(),
  mimeType: z.string().max(100).optional(),
  uploadedBy: z.string().uuid().optional(),
  description: z.string().max(2000).optional(),
  version: z.string().max(20).optional(),
  status: z.enum(['current', 'archived', 'superseded']).optional(),
});

export const accreditationDocumentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'documentType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['current', 'archived', 'superseded']).optional(),
  documentType: z.enum(['application', 'evidence', 'report', 'decision', 'correspondence', 'checklist', 'other']).optional(),
  accreditationId: z.string().uuid().optional(),
});

// ─── AuditFinding ────────────────────────────────────────────
export const auditFindingCreateSchema = z.object({
  auditId: z.string().uuid(),
  findingNumber: z.string().max(50),
  title: z.string().min(2).max(300),
  category: z.enum(['financial', 'operational', 'compliance', 'governance', 'safety', 'academic']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().min(10).max(5000),
  rootCause: z.string().max(2000).optional(),
  impact: z.string().max(2000).optional(),
  recommendation: z.string().max(2000).optional(),
  managementResponse: z.string().max(2000).optional(),
  responsiblePerson: z.string().max(200).optional(),
  targetDate: z.string().datetime().optional(),
  evidenceUrls: z.array(z.string().url()).optional(),
  status: z.enum(['open', 'in_progress', 'resolved', 'accepted', 'closed']).default('open'),
});

export const auditFindingUpdateSchema = z.object({
  findingNumber: z.string().max(50).optional(),
  title: z.string().min(2).max(300).optional(),
  category: z.enum(['financial', 'operational', 'compliance', 'governance', 'safety', 'academic']).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  description: z.string().min(10).max(5000).optional(),
  rootCause: z.string().max(2000).optional(),
  impact: z.string().max(2000).optional(),
  recommendation: z.string().max(2000).optional(),
  managementResponse: z.string().max(2000).optional(),
  responsiblePerson: z.string().max(200).optional(),
  targetDate: z.string().datetime().optional(),
  evidenceUrls: z.array(z.string().url()).optional(),
  status: z.enum(['open', 'in_progress', 'resolved', 'accepted', 'closed']).optional(),
  resolutionNotes: z.string().max(2000).optional(),
  resolvedAt: z.string().datetime().optional(),
});

export const auditFindingQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['findingNumber', 'severity', 'category', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['open', 'in_progress', 'resolved', 'accepted', 'closed']).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  category: z.enum(['financial', 'operational', 'compliance', 'governance', 'safety', 'academic']).optional(),
  auditId: z.string().uuid().optional(),
});

// ─── Exam Filter Schemas ─────────────────────────────────────
export const nationalExamFilterSchema = z.object({
  status: z.enum(['draft', 'registration_open', 'registration_closed', 'ongoing', 'completed', 'cancelled']).optional(),
  type: z.enum(['entrance', 'exit', 'certification', 'placement', 'competitive']).optional(),
  level: z.enum(['primary', 'secondary', 'tertiary', 'vocational']).optional(),
  ministryId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const examCandidateFilterSchema = z.object({
  status: z.enum(['registered', 'confirmed', 'absent', 'completed', 'disqualified']).optional(),
  paymentStatus: z.enum(['paid', 'pending', 'waived', 'refunded']).optional(),
  examId: z.string().uuid().optional(),
  centerId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const examResultFilterSchema = z.object({
  status: z.enum(['pass', 'fail', 'absent', 'disqualified', 'withheld', 'pending_review']).optional(),
  reviewStatus: z.enum(['none', 'under_review', 'approved', 'rejected']).optional(),
  examId: z.string().uuid().optional(),
  candidateId: z.string().uuid().optional(),
  minScore: z.number().min(0).max(100).optional(),
  maxScore: z.number().min(0).max(100).optional(),
  search: z.string().max(200).optional(),
});

export const inspectionReportFilterSchema = z.object({
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  complianceStatus: z.enum(['compliant', 'partially_compliant', 'non_compliant']).optional(),
  inspectorId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const accreditationFilterSchema = z.object({
  status: z.enum(['applied', 'under_review', 'site_visit', 'decision_pending', 'accredited', 'provisional', 'denied', 'suspended', 'expired']).optional(),
  level: z.enum(['institutional', 'program', 'department', 'specialized']).optional(),
  schoolId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const inspectionMissionFilterSchema = z.object({
  status: z.enum(['planning', 'active', 'completed', 'cancelled', 'on_hold']).optional(),
  missionType: z.enum(['routine', 'special', 'follow_up', 'emergency', 'audit']).optional(),
  ministryId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const qualityAuditFilterSchema = z.object({
  status: z.enum(['planned', 'in_progress', 'completed', 'follow_up_required', 'closed']).optional(),
  auditType: z.enum(['internal', 'external', 'regulatory', 'voluntary']).optional(),
  schoolId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const certificateFilterSchema = z.object({
  status: z.enum(['valid', 'revoked', 'expired', 'pending']).optional(),
  certificateType: z.enum(['completion', 'distinction', 'merit', 'pass', 'honour']).optional(),
  examId: z.string().uuid().optional(),
  candidateId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const complianceRuleFilterSchema = z.object({
  status: z.enum(['draft', 'active', 'suspended', 'repealed']).optional(),
  category: z.enum(['safety', 'academic', 'financial', 'environmental', 'labor', 'data_protection', 'governance', 'other']).optional(),
  enforcementLevel: z.enum(['mandatory', 'advisory', 'voluntary']).optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});
