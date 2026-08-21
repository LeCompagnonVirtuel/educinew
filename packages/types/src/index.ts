/**
 * @educi/types — Source de vérité unique pour tous les types partagés.
 * Utilisé par web, mobile, et les packages internes.
 */

// ==================== ENUMS ====================

export const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  DIRECTEUR: 'DIRECTEUR',
  COMPTABLE: 'COMPTABLE',
  SECRETAIRE: 'SECRETAIRE',
  CENSEUR: 'CENSEUR',
  SURVEILLANT: 'SURVEILLANT',
  TEACHER: 'TEACHER',
  PARENT: 'PARENT',
  STUDENT: 'STUDENT',
  CHAUFFEUR: 'CHAUFFEUR',
  BIBLIOTHECAIRE: 'BIBLIOTHECAIRE',
  INFIRMIER: 'INFIRMIER',
} as const;
export type HrRole = (typeof Role)[keyof typeof Role];

export const Gender = { M: 'M', F: 'F' } as const;
export type HrGender = (typeof Gender)[keyof typeof Gender];

export const AttendanceStatus = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  EXCUSED: 'EXCUSED',
  SICK: 'SICK',
  PERMISSION: 'PERMISSION',
} as const;
export type HrAttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

export const PaymentMethod = {
  MONEY_FUSION: 'MONEY_FUSION',
  MOBILE_MONEY: 'MOBILE_MONEY',
  CARD: 'CARD',
  WALLET: 'WALLET',
  CASH: 'CASH',
  BANK_TRANSFER: 'BANK_TRANSFER',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const GradeType = {
  DEVOIR: 'DEVOIR',
  COMPOSITION: 'COMPOSITION',
  EXAMEN: 'EXAMEN',
} as const;
export type HrGradeType = (typeof GradeType)[keyof typeof GradeType];

export const PeriodType = {
  TRIMESTER: 'TRIMESTER',
  SEMESTER: 'SEMESTER',
  YEAR: 'YEAR',
} as const;
export type HrPeriodType = (typeof PeriodType)[keyof typeof PeriodType];

export const BulletinStatus = {
  DRAFT: 'DRAFT',
  VALIDATED: 'VALIDATED',
  PUBLISHED: 'PUBLISHED',
} as const;
export type HrBulletinStatus = (typeof BulletinStatus)[keyof typeof BulletinStatus];

export const CheckInMethod = {
  GPS: 'GPS',
  QR_CODE: 'QR_CODE',
  FACIAL_RECOGNITION: 'FACIAL_RECOGNITION',
  MANUAL: 'MANUAL',
} as const;
export type HrCheckInMethod = (typeof CheckInMethod)[keyof typeof CheckInMethod];

export const NotificationType = {
  PAYMENT: 'PAYMENT',
  GRADE: 'GRADE',
  ATTENDANCE: 'ATTENDANCE',
  TRANSPORT: 'TRANSPORT',
  MESSAGE: 'MESSAGE',
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  SYSTEM: 'SYSTEM',
  INVITATION: 'INVITATION',
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export const Mention = {
  INSUFFISANT: 'Insuffisant',
  PASSABLE: 'Passable',
  ASSEZ_BIEN: 'Assez Bien',
  BIEN: 'Bien',
  TRES_BIEN: 'Très Bien',
  EXCELLENT: 'Excellent',
} as const;
export type HrMention = (typeof Mention)[keyof typeof Mention];

export const ScanType = {
  ARRIVAL: 'ARRIVAL',
  DEPARTURE: 'DEPARTURE',
  LATE: 'LATE',
  PERMISSION: 'PERMISSION',
  EXCEPTIONAL: 'EXCEPTIONAL',
  CANTEEN: 'CANTEEN',
  LIBRARY: 'LIBRARY',
  EXAM: 'EXAM',
  EVENT: 'EVENT',
} as const;
export type HrScanType = (typeof ScanType)[keyof typeof ScanType];

// ==================== INTERFACES ====================

export interface User {
  id: string;
  name: string;
  email: string;
  role: HrRole;
  schoolId?: string;
  phone?: string;
  photoUrl?: string;
  isActive: boolean;
  createdAt: string;
  school?: School;
}

export interface School {
  id: string;
  name: string;
  code?: string;
  sigle?: string;
  slogan?: string;
  description?: string;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  logo?: string;
  faviconUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  academicYear?: string;
  gradingSystem?: string;
  passingGrade?: number;
  timezone?: string;
  language?: string;
  currency?: string;
  latitude?: number;
  longitude?: number;
  checkinRadius?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  _count?: {
    students: number;
    teachers: number;
    classes: number;
  };
}

export interface SchoolSettings {
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  gradingSystem: string;
  passingGrade: number;
  academicYear: string;
  checkinRadius: number;
  notifications: Record<string, unknown>;
  paymentSettings: Record<string, unknown>;
  academicSettings: Record<string, unknown>;
}

export interface SchoolBranding {
  schoolId: string;
  officialName?: string;
  commercialName?: string;
  slogan?: string;
  motto?: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  logoIconUrl?: string;
  logoFaviconUrl?: string;
  logoDarkUrl?: string;
  colorPrimary?: string;
  colorSecondary?: string;
  colorAccent?: string;
  colorSuccess?: string;
  colorError?: string;
  colorWarning?: string;
  colorInfo?: string;
  darkModeEnabled?: boolean;
  fontPrimary?: string;
  fontSecondary?: string;
  directorName?: string;
  directorTitle?: string;
  signatureUrl?: string;
  stampUrl?: string;
  setupCompleted?: boolean;
  setupStep?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type SchoolPlan = 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';

export type SchoolStatus = 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED' | 'PENDING';

export interface SchoolLimits {
  maxStudents: number;
  maxTeachers: number;
  maxStorageMb: number;
  maxSmsPerMonth: number;
  maxEmailsPerMonth: number;
  maxQrCodes: number;
  enabledModules: string[];
}

export interface SchoolSubscription {
  plan: SchoolPlan;
  status: SchoolStatus;
  startDate?: string;
  endDate?: string;
  limits: SchoolLimits;
}

export interface SchoolStatistics {
  studentsCount: number;
  teachersCount: number;
  classesCount: number;
  parentsCount: number;
  staffCount: number;
  activeUsers: number;
  storageUsedMb: number;
}

export interface SchoolCreationRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  website?: string;
  sigle?: string;
  slogan?: string;
  description?: string;
  plan?: SchoolPlan;
}

export interface SchoolUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  website?: string;
  sigle?: string;
  slogan?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  checkinRadius?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export const SchoolPlanLimits: Record<SchoolPlan, SchoolLimits> = {
  FREE: {
    maxStudents: 100,
    maxTeachers: 10,
    maxStorageMb: 500,
    maxSmsPerMonth: 0,
    maxEmailsPerMonth: 100,
    maxQrCodes: 5,
    enabledModules: ['students', 'teachers', 'classes', 'grades', 'attendance'],
  },
  STARTER: {
    maxStudents: 500,
    maxTeachers: 50,
    maxStorageMb: 2000,
    maxSmsPerMonth: 500,
    maxEmailsPerMonth: 1000,
    maxQrCodes: 50,
    enabledModules: ['students', 'teachers', 'classes', 'grades', 'attendance', 'payments', 'transport', 'messages'],
  },
  PRO: {
    maxStudents: 2000,
    maxTeachers: 200,
    maxStorageMb: 10000,
    maxSmsPerMonth: 5000,
    maxEmailsPerMonth: 10000,
    maxQrCodes: 500,
    enabledModules: ['students', 'teachers', 'classes', 'grades', 'attendance', 'payments', 'transport', 'messages', 'ai', 'library', 'cantine', 'marketplace'],
  },
  ENTERPRISE: {
    maxStudents: 100000,
    maxTeachers: 10000,
    maxStorageMb: 100000,
    maxSmsPerMonth: 100000,
    maxEmailsPerMonth: 100000,
    maxQrCodes: 10000,
    enabledModules: ['students', 'teachers', 'classes', 'grades', 'attendance', 'payments', 'transport', 'messages', 'ai', 'library', 'cantine', 'marketplace', 'enterprise', 'analytics', 'api'],
  },
};

// ==================== ONBOARDING TYPES ====================

export type OnboardingStep =
  | 'general_info'
  | 'admin_info'
  | 'academic_config'
  | 'pedagogic_structure'
  | 'director_creation'
  | 'modules'
  | 'branding'
  | 'validation';

export type OnboardingStatus = 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface OnboardingGeneralInfo {
  name: string;
  code?: string;
  phone?: string;
  email: string;
  address?: string;
  city?: string;
  region?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  logoUrl?: string;
  coverPhotoUrl?: string;
}

export interface OnboardingAdminInfo {
  schoolType: 'PUBLIC' | 'PRIVE' | 'CONFESSIONNEL' | 'TECHNIQUE' | 'UNIVERSITE';
  foundingDate?: string;
  languages: string[];
  currency: string;
  timezone: string;
}

export interface OnboardingAcademicConfig {
  academicYear: string;
  yearStartDate: string;
  yearEndDate: string;
  termsCount: number;
  semestersCount: number;
  gradingSystem: 'FRENCH_20' | 'PERCENTAGE' | 'LETTER';
  passingGrade: number;
  mentionThresholds: Record<string, number>;
  coefficientSystem: boolean;
}

export interface OnboardingLevel {
  name: string;
  order: number;
  sections: OnboardingSection[];
}

export interface OnboardingSection {
  name: string;
  series?: string[];
  filieres?: string[];
  maxStudents: number;
}

export interface OnboardingPedagogicStructure {
  levels: OnboardingLevel[];
}

export interface OnboardingDirector {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  photoUrl?: string;
}

export interface OnboardingModules {
  payments: boolean;
  transport: boolean;
  library: boolean;
  cafeteria: boolean;
  health: boolean;
  discipline: boolean;
  marketplace: boolean;
  hr: boolean;
  gps: boolean;
  exams: boolean;
  sms: boolean;
  ai: boolean;
}

export interface OnboardingBranding {
  logoUrl?: string;
  colorPrimary: string;
  colorSecondary: string;
  fontPrimary?: string;
  faviconUrl?: string;
  shortName?: string;
  slogan?: string;
}

export interface OnboardingData {
  generalInfo: OnboardingGeneralInfo;
  adminInfo: OnboardingAdminInfo;
  academicConfig: OnboardingAcademicConfig;
  pedagogicStructure: OnboardingPedagogicStructure;
  director: OnboardingDirector;
  modules: OnboardingModules;
  branding: OnboardingBranding;
}

export interface OnboardingProgress {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  startedAt: string;
  updatedAt: string;
}

export interface OnboardingState {
  id: string;
  schoolId?: string;
  userId: string;
  status: OnboardingStatus;
  data: OnboardingData;
  progress: OnboardingProgress;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingValidationResult {
  isValid: boolean;
  errors: Array<{ step: OnboardingStep; field: string; message: string }>;
  warnings: Array<{ step: OnboardingStep; field: string; message: string }>;
}

export const ONBOARDING_STEPS: readonly OnboardingStep[] = [
  'general_info',
  'admin_info',
  'academic_config',
  'pedagogic_structure',
  'director_creation',
  'modules',
  'branding',
  'validation',
] as const;

export const ONBOARDING_STEP_LABELS: Record<OnboardingStep, string> = {
  general_info: 'Informations générales',
  admin_info: 'Informations administratives',
  academic_config: 'Configuration académique',
  pedagogic_structure: 'Structure pédagogique',
  director_creation: 'Création du Directeur',
  modules: 'Modules',
  branding: 'Branding',
  validation: 'Validation finale',
};

export const DEFAULT_MODULES: OnboardingModules = {
  payments: false,
  transport: false,
  library: false,
  cafeteria: false,
  health: false,
  discipline: false,
  marketplace: false,
  hr: false,
  gps: false,
  exams: true,
  sms: false,
  ai: false,
};

export const DEFAULT_BRANDING_COLORS = {
  colorPrimary: '#1E40AF',
  colorSecondary: '#3B82F6',
} as const;

// ==================== STUDENT TYPES ====================

export type StudentStatus = 'ACTIVE' | 'INACTIVE' | 'TRANSFERRED' | 'GRADUATED' | 'SUSPENDED' | 'ARCHIVED' | 'DELETED';
export type StudentGender = 'M' | 'F' | 'OTHER' | 'UNKNOWN';
export type StudentBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'UNKNOWN';
export type StudentReligion = 'CHRISTIAN' | 'MUSLIM' | 'ANIMIST' | 'OTHER' | 'NONE' | 'UNKNOWN';
export type StudentNationality = string;
export type StudentLanguage = string;
export type StudentRelationship = 'PARENT' | 'GUARDIAN' | 'TUTOR' | 'OTHER';

export interface Student {
  id: string;
  userId: string;
  schoolId: string;
  classId?: string;
  parentId?: string;
  matricule: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  gender?: StudentGender;
  address?: string;
  phone?: string;
  email?: string;
  nationality?: StudentNationality;
  bloodGroup?: StudentBloodGroup;
  allergies?: string;
  series?: string;
  level?: string;
  status: StudentStatus;
  enrollmentDate?: string;
  photoUrl?: string;
  documents?: StudentDocument[];
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  user?: { id: string; name: string; email: string; photoUrl?: string };
  class?: { id: string; name: string; level: string };
  parent?: { id: string; name: string };
}

export interface StudentProfile {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  gender?: StudentGender;
  nationality?: StudentNationality;
  bloodGroup?: StudentBloodGroup;
  religion?: StudentReligion;
  languages?: string[];
  address?: string;
  phone?: string;
  email?: string;
  photoUrl?: string;
  previousSchool?: string;
  previousSchoolAddress?: string;
  admissionDate?: string;
  admissionClass?: string;
  notes?: string;
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  schoolId: string;
  academicYearId: string;
  classId: string;
  levelId?: string;
  sectionId?: string;
  enrollmentDate: string;
  status: 'ENROLLED' | 'PENDING' | 'CANCELLED';
  previousClassId?: string;
  notes?: string;
}

export interface StudentAcademicRecord {
  id: string;
  studentId: string;
  academicYearId: string;
  classId: string;
  level: string;
  section?: string;
  series?: string;
  average?: number;
  rank?: number;
  totalStudents?: number;
  result?: 'PASSED' | 'FAILED' | 'PENDING';
  mention?: string;
  observations?: string;
}

export interface StudentParent {
  id: string;
  studentId: string;
  parentId: string;
  relationship: StudentRelationship;
  isEmergency: boolean;
  parent?: { id: string; name: string; email: string; phone: string };
}

export interface StudentGuardian {
  id: string;
  studentId: string;
  name: string;
  relationship: StudentRelationship;
  phone: string;
  email?: string;
  address?: string;
  occupation?: string;
  isEmergency: boolean;
}

export interface StudentEmergencyContact {
  id: string;
  studentId: string;
  name: string;
  phone: string;
  relationship: string;
  address?: string;
  isPrimary: boolean;
}

export interface StudentMedicalRecord {
  id: string;
  studentId: string;
  bloodGroup?: StudentBloodGroup;
  height?: number;
  weight?: number;
  allergies?: string[];
  medications?: string[];
  conditions?: string[];
  disabilities?: string[];
  doctorName?: string;
  doctorPhone?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  notes?: string;
  lastCheckup?: string;
}

export interface StudentVaccination {
  id: string;
  studentId: string;
  vaccineName: string;
  dateGiven: string;
  doseNumber?: number;
  nextDoseDate?: string;
  batchNumber?: string;
  administeredBy?: string;
  location?: string;
  notes?: string;
}

export interface StudentAllergy {
  id: string;
  studentId: string;
  allergen: string;
  severity: 'MILD' | 'MODERATE' | 'SEVERE' | 'LIFE_THREATENING';
  reaction?: string;
  notes?: string;
}

export interface StudentDisability {
  id: string;
  studentId: string;
  type: string;
  description?: string;
  accommodations?: string[];
  notes?: string;
}

export interface StudentTransport {
  id: string;
  studentId: string;
  busId?: string;
  routeId?: string;
  stopId?: string;
  driverName?: string;
  driverPhone?: string;
  busNumber?: string;
  routeName?: string;
  stopName?: string;
  notes?: string;
}

export interface StudentCard {
  id: string;
  studentId: string;
  cardNumber: string;
  issuedDate: string;
  expiryDate?: string;
  isActive: boolean;
  qrCode?: string;
}

export interface StudentQRCode {
  id: string;
  studentId: string;
  code: string;
  type: 'ATTENDANCE' | 'IDENTITY' | 'PAYMENT' | 'GENERAL';
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
}

export interface StudentPhoto {
  id: string;
  studentId: string;
  url: string;
  type: 'PROFILE' | 'ID_CARD' | 'DOCUMENT' | 'MEDICAL';
  isPrimary: boolean;
  createdAt: string;
}

export interface StudentDocument {
  id: string;
  studentId: string;
  name: string;
  type: 'BIRTH_CERTIFICATE' | 'TRANSCRIPT' | 'MEDICAL' | 'PHOTO' | 'ADMINISTRATIVE' | 'OTHER';
  url: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  uploadedBy?: string;
}

export interface StudentAttendanceSummary {
  studentId: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  attendanceRate: number;
}

export interface StudentGradeSummary {
  studentId: string;
  academicYearId: string;
  subjects: Array<{
    subjectId: string;
    subjectName: string;
    average: number;
    rank: number;
    min: number;
    max: number;
  }>;
  overallAverage: number;
  overallRank: number;
  totalStudents: number;
}

export interface StudentPaymentSummary {
  studentId: string;
  totalFees: number;
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
  lastPaymentDate?: string;
  currency: string;
}

export interface StudentLibrarySummary {
  studentId: string;
  booksBorrowed: number;
  booksOverdue: number;
  booksReturned: number;
  currentBorrowings: Array<{
    bookId: string;
    bookTitle: string;
    borrowDate: string;
    dueDate: string;
    isOverdue: boolean;
  }>;
}

export interface StudentCanteenSummary {
  studentId: string;
  hasSubscription: boolean;
  subscriptionType?: string;
  mealsThisMonth: number;
  balance: number;
}

export interface StudentDisciplineSummary {
  studentId: string;
  totalSanctions: number;
  totalWarnings: number;
  totalRewards: number;
  recentIncidents: Array<{
    type: 'SANCTION' | 'WARNING' | 'REWARD';
    description: string;
    date: string;
  }>;
}

export interface StudentTimeline {
  id: string;
  studentId: string;
  type: 'CREATION' | 'CLASS_CHANGE' | 'LEVEL_CHANGE' | 'PROMOTION' | 'REPETITION' | 'TRANSFER' | 'PAYMENT' | 'ATTENDANCE' | 'SANCTION' | 'REWARD' | 'MEDICAL' | 'DOCUMENT' | 'PHOTO' | 'OTHER';
  description: string;
  details?: Record<string, unknown>;
  date: string;
  userId?: string;
}

export interface StudentStatistics {
  schoolId: string;
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  newStudents: number;
  boys: number;
  girls: number;
  byAge: Record<string, number>;
  byLevel: Record<string, number>;
  byClass: Record<string, number>;
  byStatus: Record<string, number>;
  transfers: number;
  promotions: number;
  repetitions: number;
  archived: number;
}

export interface StudentPromotion {
  id: string;
  studentId: string;
  fromClassId: string;
  toClassId: string;
  academicYearId: string;
  type: 'PROMOTION' | 'REPETITION';
  average?: number;
  notes?: string;
  date: string;
}

export interface StudentTransfer {
  id: string;
  studentId: string;
  fromSchoolId: string;
  toSchoolId?: string;
  reason: string;
  transferDate: string;
  documents?: string[];
  notes?: string;
}

export interface StudentArchive {
  id: string;
  studentId: string;
  reason?: string;
  archivedAt: string;
  archivedBy?: string;
  canRestore: boolean;
}

export interface StudentImport {
  id: string;
  schoolId: string;
  fileName: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'PARTIAL';
  totalRows: number;
  processedRows: number;
  successfulRows: number;
  failedRows: number;
  errors?: Array<{ row: number; field: string; message: string }>;
  mapping?: Record<string, string>;
  startedAt: string;
  completedAt?: string;
}

export interface StudentExport {
  id: string;
  schoolId: string;
  format: 'PDF' | 'EXCEL' | 'CSV' | 'JSON';
  filters?: Record<string, unknown>;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  fileUrl?: string;
  rowCount?: number;
  startedAt: string;
  completedAt?: string;
}

export interface StudentFilters {
  search?: string;
  status?: StudentStatus | 'ALL';
  gender?: StudentGender | 'ALL';
  classId?: string;
  levelId?: string;
  sectionId?: string;
  parentId?: string;
  dateOfBirthFrom?: string;
  dateOfBirthTo?: string;
  enrollmentDateFrom?: string;
  enrollmentDateTo?: string;
  hasMedical?: boolean;
  hasTransport?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'firstName' | 'lastName' | 'matricule' | 'enrollmentDate' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface StudentSearch {
  query: string;
  schoolId: string;
  fields?: string[];
  limit?: number;
}

export interface StudentDashboard {
  totalStudents: number;
  newThisMonth: number;
  activeToday: number;
  pendingPayments: number;
  attendanceRate: number;
  recentActivity: StudentTimeline[];
  topPerformers: Array<{ studentId: string; name: string; average: number }>;
  lowAttendance: Array<{ studentId: string; name: string; rate: number }>;
}

export interface StudentListResult {
  data: Student[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  gender?: StudentGender;
  address?: string;
  nationality?: string;
  bloodGroup?: StudentBloodGroup;
  classId?: string;
  parentId?: string;
  enrollmentDate?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  allergies?: string;
  series?: string;
  level?: string;
}

export interface UpdateStudentRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  gender?: StudentGender;
  address?: string;
  nationality?: string;
  bloodGroup?: StudentBloodGroup;
  classId?: string;
  parentId?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  allergies?: string;
  series?: string;
  level?: string;
  status?: StudentStatus;
}

export interface HrStudent {
  id: string;
  userId: string;
  schoolId: string;
  subjectId?: string;
  phone?: string;
  user: { id: string; name: string; email: string; photoUrl?: string };
  subject?: { id: string; name: string };
  school?: School;
}

export interface Staff {
  id: string;
  userId: string;
  schoolId: string;
  position: string;
  department?: string;
  hireDate?: string;
  contractType?: string;
  salary?: number;
  phone?: string;
  isActive: boolean;
  user: { id: string; name: string; email: string; photoUrl?: string };
  school?: School;
}

export interface StaffAttendance {
  id: string;
  staffId: string;
  userId: string;
  schoolId: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  breakStart?: string;
  breakEnd?: string;
  serviceStart?: string;
  repriseTime?: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'DEPARTED' | 'ON_BREAK';
  method: string;
  latitude?: number;
  longitude?: number;
  qrVerified?: boolean;
  lateMinutes: number;
  totalWorkMinutes: number;
  breakMinutes: number;
  recordedBy?: string;
  recordedByType: 'SELF' | 'SURVEILLANT' | 'ADMIN';
  notes?: string;
  staff?: Staff;
  recordedByUser?: User;
}

export interface Visitor {
  id: string;
  schoolId: string;
  visitorName: string;
  visitorPhone?: string;
  visitorIdType: string;
  visitorIdNumber?: string;
  photoUrl?: string;
  purpose: string;
  personToVisit: string;
  personRole?: string;
  badgeNumber?: string;
  badgeQrCode?: string;
  entryTime: string;
  exitTime?: string;
  status: 'INSIDE' | 'EXITED' | 'CANCELLED';
  createdBy: string;
  creator?: User;
}

export interface StaffInvitation {
  id: string;
  schoolId: string;
  email: string;
  role: string;
  position: string;
  department?: string;
  invitationToken: string;
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'CANCELLED';
  invitedBy: string;
  expiresAt: string;
  acceptedAt?: string;
  inviter?: User;
}

export interface Class {
  id: string;
  schoolId: string;
  name: string;
  level: string;
  academicYearId?: string;
  capacity: number;
  _count?: { students: number };
}

export interface Subject {
  id: string;
  name: string;
  coefficient: number;
  _count?: { teachers: number; grades: number };
}

export interface Period {
  id: string;
  schoolId: string;
  name: string;
  periodType: HrPeriodType;
  startDate: string;
  endDate: string;
  academicYearId: string;
  orderIndex: number;
  isActive: boolean;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  teacherId?: string;
  schoolId?: string;
  score: number;
  maxScore: number;
  gradeType: HrGradeType;
  coefficient: number;
  bonus: number;
  isOptional: boolean;
  term: string;
  periodId?: string;
  academicYearId?: string;
  isValidated: boolean;
  validatedAt?: string;
  validatedBy?: string;
  comment?: string;
  student?: { user: { name: string }; class?: { name: string } };
  subject?: { name: string; coefficient: number };
  teacher?: { user: { name: string } };
  period?: Period;
}

export interface BulletinEntry {
  id: string;
  bulletinId: string;
  subjectId: string;
  subjectName: string;
  coefficient: number;
  average: number;
  scoreTotal: number;
  coeffTotal: number;
  rank?: number;
  teacherComment?: string;
  subject?: Subject;
}

export interface Bulletin {
  id: string;
  studentId: string;
  classId: string;
  periodId: string;
  schoolId: string;
  academicYearId: string;
  generalAverage: number;
  totalCoefficient: number;
  totalScore: number;
  rank?: number;
  classSize: number;
  mention?: string;
  status: HrBulletinStatus;
  validatedAt?: string;
  validatedBy?: string;
  teacherComment?: string;
  student?: Student;
  period?: Period;
  entries?: BulletinEntry[];
}

export interface SubjectResult {
  subjectId: string;
  subjectName: string;
  coefficient: number;
  average: number;
  scoreTotal: number;
  coeffTotal: number;
  gradeCount: number;
  grades: { score: number; maxScore: number; gradeType: string; coefficient: number }[];
}

export interface StudentReport {
  studentId: string;
  studentName: string;
  matricule: string;
  className?: string;
  subjects: SubjectResult[];
  generalAverage: number;
  totalScore: number;
  totalCoefficient: number;
  rank?: number;
  mention: string;
}

export interface ClassDashboard {
  classSize: number;
  generalAverage: number;
  successRate: number;
  highestAverage: number;
  lowestAverage: number;
  mentionDistribution: Record<string, number>;
  subjectAverages: {
    subjectId: string;
    subjectName: string;
    coefficient: number;
    classAverage: number;
    highest: number;
    lowest: number;
  }[];
  ranking: {
    studentId: string;
    studentName: string;
    matricule: string;
    average: number;
    rank?: number;
    mention: string;
  }[];
}

export interface Attendance {
  id: string;
  studentId: string;
  schoolId: string;
  date: string;
  status: HrAttendanceStatus;
  remark?: string;
  method?: string;
  latitude?: number;
  longitude?: number;
  student?: { user: { name: string }; class?: { name: string } };
}

export interface Payment {
  id: string;
  studentId: string;
  schoolId: string;
  userId?: string;
  tuitionPlanId?: string;
  invoiceId?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  reference: string;
  status: PaymentStatus;
  receiptUrl?: string;
  student?: { user: { name: string }; class?: { name: string } };
  tuitionPlan?: { name: string };
}

export interface Invoice {
  id: string;
  schoolId: string;
  studentId: string;
  type: string;
  amount: number;
  discountAmount?: number;
  finalAmount: number;
  dueDate: string;
  paidAmount: number;
  status: string;
  student?: Student;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  bonusBalance: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  schoolId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender?: { id: string; name: string; photoUrl?: string };
  receiver?: { id: string; name: string; photoUrl?: string };
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  isRead: boolean;
  data?: unknown;
  createdAt: string;
}

export interface Bus {
  id: string;
  schoolId: string;
  driverName: string;
  driverId?: string;
  plateNumber: string;
  route?: string;
  capacity: number;
  isActive: boolean;
  vehicleModel?: string;
  vehicleYear?: number;
  vehicleColor?: string;
  insuranceExpiry?: string;
  technicalCheckExpiry?: string;
  photoUrl?: string;
  notes?: string;
  studentCount?: number;
  tracking?: { latitude: number; longitude: number; timestamp: string; speedKmh?: number }[];
}

export interface BusStudent {
  id: string;
  busId: string;
  studentId: string;
  schoolId: string;
  stopName?: string;
  stopLatitude?: number;
  stopLongitude?: number;
  pickupOrder: number;
  isActive: boolean;
  student?: {
    id: string;
    name: string;
    matricule: string;
    className?: string;
    parentName?: string;
    parentPhone?: string;
  };
}

export interface Trip {
  id: string;
  busId: string;
  driverId: string;
  schoolId: string;
  tripType: 'MORNING' | 'AFTERNOON' | 'SPECIAL';
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  startedAt?: string;
  completedAt?: string;
  totalDistanceKm: number;
  totalStudents: number;
  studentsPickedUp: number;
  studentsDroppedOff: number;
  notes?: string;
  createdAt: string;
}

export interface TripEvent {
  id: string;
  tripId: string;
  busId: string;
  schoolId: string;
  eventType: 'GPS_UPDATE' | 'STUDENT_BOARDED' | 'STUDENT_ALIGHTED' | 'STOP_ARRIVED' | 'STOP_DEPARTED' | 'INCIDENT' | 'TRIP_STARTED' | 'TRIP_COMPLETED';
  studentId?: string;
  latitude?: number;
  longitude?: number;
  speedKmh?: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Announcement {
  id: string;
  schoolId: string;
  title: string;
  message: string;
  targetRole?: string;
  createdAt: string;
}

export interface TeacherAttendance {
  id: string;
  teacherId: string;
  schoolId: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  method: HrCheckInMethod;
  latitude?: number;
  longitude?: number;
  distanceMeters?: number;
  lateMinutes: number;
  verified: boolean;
  teacher?: Teacher;
}

export interface MarketplaceListing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  category: string;
  price: number;
  type: string;
  status: string;
  createdAt: string;
}

export interface Invitation {
  id: string;
  schoolId: string;
  email: string;
  role: HrRole;
  token: string;
  matricule?: string;
  invitedById: string;
  expiresAt: string;
  status: string;
}

export interface AuditLog {
  id: string;
  schoolId: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}

export interface QRCode {
  id: string;
  schoolId: string;
  userId: string;
  userType: 'student' | 'teacher' | 'admin' | 'staff';
  qrData: string;
  qrUrl?: string;
  barcodeData?: string;
  isActive: boolean;
  generatedAt: string;
  expiresAt?: string;
  lastScannedAt?: string;
  scanCount: number;
  user?: User;
}

export interface ClassQRCode {
  id: string;
  schoolId: string;
  classId: string;
  academicYearId?: string;
  qrToken: string;
  qrData: string;
  isActive: boolean;
  scanCount: number;
  lastScannedAt?: string;
  expiresAt?: string;
  createdAt: string;
  class?: Class;
}

export interface AttendanceEvent {
  id: string;
  schoolId: string;
  studentId?: string;
  userId?: string;
  eventType: string;
  scanTime: string;
  scannedBy?: string;
  qrCodeId?: string;
  latitude?: number;
  longitude?: number;
  deviceInfo?: string;
  notes?: string;
  student?: Student;
  scannedByUser?: User;
}

export interface EmailLog {
  id: string;
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  emailType: string;
  status: 'PENDING' | 'SENT' | 'FAILED' | 'RETRY';
  resendId?: string;
  errorMessage?: string;
  schoolId?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
  attempts: number;
  maxAttempts: number;
  nextRetryAt?: string;
  createdAt: string;
  sentAt?: string;
}

export interface EmailStats {
  total: number;
  sent: number;
  failed: number;
  pending: number;
  byType: Record<string, number>;
}

// ==================== AUTH TYPES ====================

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: HrRole;
  schoolId?: string;
  phone?: string;
  photoUrl?: string;
  isActive: boolean;
  emailConfirmedAt?: string;
  isFirstLogin: boolean;
  createdAt: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: AuthUser;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: HrRole;
  schoolId?: string;
  phone?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface VerifyEmailData {
  token: string;
  type?: string;
}

export interface RefreshTokenData {
  refreshToken: string;
}

export interface InvitationData {
  email: string;
  role: HrRole;
  schoolId: string;
  invitedById: string;
  expiresAt: string;
}

export interface MFASetupSecret {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface MFAVerifyData {
  code: string;
  factorId?: string;
}

export interface DeviceInfo {
  deviceId: string;
  userAgent: string;
  browser?: string;
  os?: string;
  ip?: string;
  lastActiveAt: string;
}

export interface SessionInfo {
  id: string;
  userId: string;
  deviceInfo: DeviceInfo;
  createdAt: string;
  lastActiveAt: string;
  isActive: boolean;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string;
}

export interface RolePermissions {
  role: HrRole;
  permissions: Permission[];
  routes: readonly string[];
}

export interface PasswordPolicyConfig {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxAge: number;
  historyCount: number;
}

export interface SecurityConfig {
  maxLoginAttempts: number;
  lockoutDurationMinutes: number;
  sessionTimeoutHours: number;
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
  passwordPolicy: PasswordPolicyConfig;
}

export interface AuditEvent {
  id: string;
  schoolId?: string;
  userId?: string;
  action: HrAuditAction;
  entity: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

// ==================== TEACHER TYPES ====================

export type TeacherStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ARCHIVED' | 'ON_LEAVE' | 'CONTRACT_ENDED';
export type TeacherGender = 'M' | 'F' | 'OTHER' | 'UNKNOWN';
export type TeacherEmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'VOLUNTEER' | 'INTERN';
export type TeacherContractType = 'CDI' | 'CDD' | 'VACATAIRE' | 'CONSULTANT' | 'STAGE';
export type TeacherGrade = 'A1' | 'A2' | 'A3' | 'B1' | 'B2' | 'B3' | 'C1' | 'C2' | 'C3' | 'D1' | 'D2' | 'D3';
export type TeacherSpeciality = 'MATHEMATIQUES' | 'PHYSIQUE' | 'CHIMIE' | 'BIOLOGIE' | 'FRANCAIS' | 'ANGLAIS' | 'HISTOIRE' | 'GEOGRAPHIE' | 'PHILOSOPHIE' | 'INFORMATIQUE' | 'EDUCATION_PHYSIQUE' | 'ARTS' | 'MUSIQUE' | 'TECHNOLOGIE' | 'ECONOMIE' | 'DROIT' | 'AUTRE';
export type TeacherLeaveType = 'MALADIE' | 'MATERNITE' | 'PATERNITE' | 'ANNUEL' | 'EXCEPTIONNEL' | 'SANS_SOLDE' | 'FORMATION';
export type TeacherLeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type TeacherEvaluationType = 'PEDAGOGIQUE' | 'ADMINISTRATIVE' | 'ANNUELLE' | 'PROBATION';
export type TimelineEventType = 'CREATION' | 'ASSIGNMENT' | 'SCHEDULE_CHANGE' | 'CONTRACT_UPDATE' | 'LEAVE' | 'EVALUATION' | 'PROMOTION' | 'TRANSFER' | 'MEDICAL' | 'DOCUMENT' | 'PHOTO' | 'OTHER';

export interface Teacher {
  id: string;
  userId: string;
  schoolId: string;
  matricule: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  gender?: TeacherGender;
  address?: string;
  phone?: string;
  email?: string;
  nationality?: string;
  bloodGroup?: string;
  employmentType: TeacherEmploymentType;
  contractType: TeacherContractType;
  grade?: TeacherGrade;
  speciality?: TeacherSpeciality;
  departmentId?: string;
  hireDate?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  salary?: number;
  hourlyRate?: number;
  maxWeeklyHours?: number;
  photoUrl?: string;
  status: TeacherStatus;
  isActive: boolean;
  archivedAt?: string;
  archivedBy?: string;
  createdAt: string;
  updatedAt?: string;
  user?: { id: string; name: string; email: string; photoUrl?: string };
  department?: { id: string; name: string };
  school?: School;
}

export interface TeacherProfile {
  id: string;
  teacherId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  gender?: TeacherGender;
  nationality?: string;
  languages?: string[];
  address?: string;
  phone?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  photoUrl?: string;
  bio?: string;
  socialMedia?: Record<string, string>;
}

export interface TeacherAssignment {
  id: string;
  teacherId: string;
  schoolId: string;
  classId: string;
  subjectId: string;
  academicYearId: string;
  levelId?: string;
  sectionId?: string;
  hoursPerWeek: number;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  teacher?: Teacher;
  class?: { id: string; name: string; level: string };
  subject?: { id: string; name: string };
}

export interface TeacherContract {
  id: string;
  teacherId: string;
  schoolId: string;
  contractType: TeacherContractType;
  startDate: string;
  endDate?: string;
  salary?: number;
  hourlyRate?: number;
  maxHoursPerWeek?: number;
  terms: string;
  status: 'ACTIVE' | 'EXPIRED' | 'TERMINATED' | 'RENEWED';
  signedAt?: string;
  terminatedAt?: string;
  terminationReason?: string;
  documents?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface TeacherDepartment {
  id: string;
  schoolId: string;
  name: string;
  description?: string;
  headTeacherId?: string;
  teacherCount: number;
  createdAt: string;
}

export interface TeacherSubject {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  coefficient: number;
  maxHoursPerWeek: number;
  departmentId?: string;
  levels: string[];
}

export interface TeacherSchedule {
  id: string;
  teacherId: string;
  schoolId: string;
  classId: string;
  subjectId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room?: string;
  isRecurring: boolean;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
}

export interface TeacherAvailability {
  id: string;
  teacherId: string;
  schoolId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  reason?: string;
  recurring: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface HrTeacherAttendanceLegacy {
  id: string;
  teacherId: string;
  schoolId: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  method: string;
  latitude?: number;
  longitude?: number;
  distanceMeters?: number;
  lateMinutes: number;
  verified: boolean;
  teacher?: Teacher;
}

export interface TeacherPayrollSummary {
  teacherId: string;
  teacherName: string;
  matricule: string;
  baseSalary: number;
  overtimePay: number;
  bonuses: number;
  deductions: number;
  netPay: number;
  contractType: TeacherContractType;
  hoursWorked: number;
  overtimeHours: number;
}

export interface TeacherLeave {
  id: string;
  teacherId: string;
  schoolId: string;
  leaveType: TeacherLeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: TeacherLeaveStatus;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  daysCount: number;
  attachments?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface TeacherQualification {
  id: string;
  teacherId: string;
  institution: string;
  degree: string;
  field: string;
  graduationYear: number;
  grade?: string;
  documentUrl?: string;
  verified: boolean;
  createdAt: string;
}

export interface TeacherCertification {
  id: string;
  teacherId: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber?: string;
  documentUrl?: string;
  verified: boolean;
  createdAt: string;
}

export interface TeacherExperience {
  id: string;
  teacherId: string;
  organization: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
  isCurrent: boolean;
}

export interface TeacherEmergencyContact {
  id: string;
  teacherId: string;
  name: string;
  phone: string;
  relationship: string;
  address?: string;
  isPrimary: boolean;
}

export interface TeacherMedicalRecord {
  id: string;
  teacherId: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  allergies?: string[];
  medications?: string[];
  conditions?: string[];
  doctorName?: string;
  doctorPhone?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TeacherEvaluation {
  id: string;
  teacherId: string;
  schoolId: string;
  evaluatorId: string;
  evaluationType: TeacherEvaluationType;
  period: string;
  score?: number;
  maxScore: number;
  criteria: Array<{ name: string; score: number; maxScore: number; comment?: string }>;
  strengths?: string[];
  improvements?: string[];
  overallComment?: string;
  nextReviewDate?: string;
  createdAt: string;
}

export interface TeacherPerformance {
  teacherId: string;
  averageScore: number;
  totalEvaluations: number;
  lastEvaluationDate?: string;
  trend: 'IMPROVING' | 'STABLE' | 'DECLINING';
  strengths: string[];
  areasForImprovement: string[];
}

export interface TeacherStatistics {
  schoolId: string;
  totalTeachers: number;
  activeTeachers: number;
  inactiveTeachers: number;
  onLeave: number;
  byGender: Record<string, number>;
  byContractType: Record<string, number>;
  bySpeciality: Record<string, number>;
  byDepartment: Record<string, number>;
  byGrade: Record<string, number>;
  averageSeniority: number;
  averageSalary: number;
  totalHoursPerWeek: number;
  leaveApprovalRate: number;
  averageEvaluationScore: number;
}

export interface TeacherTimeline {
  id: string;
  teacherId: string;
  schoolId: string;
  type: TimelineEventType;
  description: string;
  details?: Record<string, unknown>;
  createdBy?: string;
  createdAt: string;
}

export interface TeacherImport {
  teachers: CreateTeacherRequest[];
  dryRun: boolean;
  skipDuplicates: boolean;
  mapping?: Record<string, string>;
}

export interface TeacherExport {
  format: 'PDF' | 'EXCEL' | 'CSV' | 'JSON';
  filters?: Record<string, unknown>;
  includePhoto?: boolean;
  selectedIds?: string[];
}

export interface TeacherFilters {
  search?: string;
  status?: TeacherStatus | 'ALL';
  gender?: TeacherGender | 'ALL';
  employmentType?: TeacherEmploymentType | 'ALL';
  contractType?: TeacherContractType | 'ALL';
  departmentId?: string;
  grade?: TeacherGrade;
  speciality?: TeacherSpeciality;
  hireDateFrom?: string;
  hireDateTo?: string;
  hasContract?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TeacherSearch {
  query: string;
  limit?: number;
}

export interface TeacherDashboard {
  schoolId: string;
  totalActive: number;
  onLeave: number;
  pendingLeaves: number;
  expiringContracts: number;
  recentEvaluations: number;
  averageScore: number;
  departmentBreakdown: Array<{ department: string; count: number }>;
  contractBreakdown: Array<{ type: string; count: number }>;
  leaveBreakdown: Array<{ type: string; count: number }>;
  upcomingReviews: Array<{ teacherId: string; teacherName: string; date: string; type: string }>;
}

export interface CreateTeacherRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  gender?: TeacherGender;
  address?: string;
  nationality?: string;
  employmentType: TeacherEmploymentType;
  contractType: TeacherContractType;
  grade?: TeacherGrade;
  speciality?: TeacherSpeciality;
  departmentId?: string;
  hireDate?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  salary?: number;
  hourlyRate?: number;
  maxWeeklyHours?: number;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
}

export interface UpdateTeacherRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  gender?: TeacherGender;
  address?: string;
  nationality?: string;
  employmentType?: TeacherEmploymentType;
  contractType?: TeacherContractType;
  grade?: TeacherGrade;
  speciality?: TeacherSpeciality;
  departmentId?: string;
  salary?: number;
  hourlyRate?: number;
  maxWeeklyHours?: number;
  status?: TeacherStatus;
}

export interface TeacherListResult {
  data: Teacher[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==================== ACADEMIC TYPES ====================

export type AcademicYearStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
export type TermStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
export type ClassStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
export type RoomType = 'NORMAL' | 'LABORATORY' | 'COMPUTER' | 'AMPHITHEATER' | 'WORKSHOP' | 'LIBRARY';
export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'ARCHIVED';
export type AssignmentStatus = 'ACTIVE' | 'INACTIVE' | 'COMPLETED' | 'ARCHIVED';
export type ScheduleStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
export type ConflictType = 'TEACHER' | 'ROOM' | 'CLASS' | 'HOURS' | 'SUBJECT' | 'YEAR';
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface AcademicYear {
  id: string;
  schoolId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: AcademicYearStatus;
  isCurrent: boolean;
  termsCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Term {
  id: string;
  academicYearId: string;
  schoolId: string;
  name: string;
  order: number;
  startDate: string;
  endDate: string;
  status: TermStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface Level {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  order: number;
  educationCycle: 'MATERNELLE' | 'PRIMAIRE' | 'COLLEGE' | 'LYCEE' | 'SUPERIEUR';
  sections: string[];
  createdAt: string;
}

export interface Section {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  levelId?: string;
  createdAt: string;
}

export interface Stream {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  levelId?: string;
  description?: string;
  createdAt: string;
}

export interface Department {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  headTeacherId?: string;
  teacherCount: number;
  createdAt: string;
}

export interface HrSubject {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  coefficient: number;
  maxHoursPerWeek: number;
  departmentId?: string;
  color?: string;
  levels: string[];
  archived: boolean;
  createdAt: string;
  updatedAt?: string;
  department?: { id: string; name: string };
}

export interface SchoolClass {
  id: string;
  schoolId: string;
  name: string;
  levelId: string;
  sectionId?: string;
  streamId?: string;
  capacity: number;
  currentEnrollment: number;
  roomId?: string;
  mainTeacherId?: string;
  color?: string;
  academicYearId: string;
  status: ClassStatus;
  createdAt: string;
  level?: { id: string; name: string };
  section?: { id: string; name: string };
  stream?: { id: string; name: string };
  room?: { id: string; name: string };
  mainTeacher?: { id: string; firstName: string; lastName: string };
}

export interface Room {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  capacity: number;
  roomType: RoomType;
  floor?: number;
  building?: string;
  hasProjector: boolean;
  hasWhiteboard: boolean;
  hasComputer: boolean;
  hasInternet: boolean;
  status: RoomStatus;
  createdAt: string;
}

export interface HrTeacherAssignment {
  id: string;
  teacherId: string;
  schoolId: string;
  classId: string;
  subjectId: string;
  academicYearId: string;
  termId?: string;
  levelId?: string;
  sectionId?: string;
  streamId?: string;
  hoursPerWeek: number;
  startDate: string;
  endDate?: string;
  status: AssignmentStatus;
  createdAt: string;
  teacher?: { id: string; firstName: string; lastName: string };
  class?: { id: string; name: string };
  subject?: { id: string; name: string; coefficient: number };
}

export interface TimetableSlot {
  id: string;
  schoolId: string;
  academicYearId: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  roomId?: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isBreak: boolean;
  breakName?: string;
  status: ScheduleStatus;
  createdAt: string;
  teacher?: { id: string; firstName: string; lastName: string };
  class?: { id: string; name: string };
  subject?: { id: string; name: string; color?: string };
  room?: { id: string; name: string };
}

export interface ScheduleConflict {
  id: string;
  schoolId: string;
  academicYearId?: string;
  conflictType: ConflictType;
  slot1Id: string;
  slot2Id: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  createdAt: string;
}

export interface AcademicEvent {
  id: string;
  schoolId: string;
  academicYearId: string;
  title: string;
  description?: string;
  eventType: 'TRIMESTER' | 'SEMESTER' | 'VACATION' | 'EXAM' | 'COUNCIL' | 'HOLIDAY' | 'MEETING' | 'OTHER';
  startDate: string;
  endDate: string;
  isRecurring: boolean;
  createdBy?: string;
  createdAt: string;
}

export interface AcademicStatistics {
  schoolId: string;
  academicYearId: string;
  totalClasses: number;
  totalSubjects: number;
  totalTeachers: number;
  totalRooms: number;
  roomOccupancyRate: number;
  teacherWorkloadAvg: number;
  classFillRate: number;
  totalHoursPerWeek: number;
  byLevel: Array<{ level: string; classes: number; students: number }>;
  byDepartment: Array<{ department: string; subjects: number; teachers: number }>;
  roomUsage: Array<{ room: string; usageRate: number }>;
}

export interface AcademicSearch {
  query: string;
  types?: Array<'CLASS' | 'ROOM' | 'TEACHER' | 'SUBJECT' | 'DEPARTMENT' | 'SLOT'>;
  limit?: number;
}

export interface AcademicDashboard {
  schoolId: string;
  totalClasses: number;
  totalSubjects: number;
  activeTeachers: number;
  totalRooms: number;
  availableRooms: number;
  todayClasses: number;
  pendingConflicts: number;
  upcomingEvents: number;
  classBreakdown: Array<{ level: string; count: number }>;
  subjectBreakdown: Array<{ subject: string; hours: number }>;
  roomBreakdown: Array<{ type: string; count: number }>;
}

export interface CreateClassRequest {
  name: string;
  levelId: string;
  sectionId?: string;
  streamId?: string;
  capacity: number;
  roomId?: string;
  mainTeacherId?: string;
  color?: string;
  academicYearId: string;
}

export interface UpdateClassRequest {
  name?: string;
  levelId?: string;
  sectionId?: string;
  streamId?: string;
  capacity?: number;
  roomId?: string;
  mainTeacherId?: string;
  color?: string;
  status?: ClassStatus;
}

export interface CreateSubjectRequest {
  name: string;
  code: string;
  coefficient?: number;
  maxHoursPerWeek?: number;
  departmentId?: string;
  color?: string;
  levels: string[];
}

export interface UpdateSubjectRequest {
  name?: string;
  code?: string;
  coefficient?: number;
  maxHoursPerWeek?: number;
  departmentId?: string;
  color?: string;
  levels?: string[];
}

export interface CreateDepartmentRequest {
  name: string;
  code: string;
  headTeacherId?: string;
}

export interface UpdateDepartmentRequest {
  name?: string;
  code?: string;
  headTeacherId?: string;
}

export interface CreateLevelRequest {
  name: string;
  code: string;
  order: number;
  educationCycle: 'MATERNELLE' | 'PRIMAIRE' | 'COLLEGE' | 'LYCEE' | 'SUPERIEUR';
  sections?: string[];
}

export interface UpdateLevelRequest {
  name?: string;
  code?: string;
  order?: number;
  educationCycle?: 'MATERNELLE' | 'PRIMAIRE' | 'COLLEGE' | 'LYCEE' | 'SUPERIEUR';
}

export interface CreateSectionRequest {
  name: string;
  code: string;
  levelId?: string;
}

export interface UpdateSectionRequest {
  name?: string;
  code?: string;
  levelId?: string;
}

export interface CreateStreamRequest {
  name: string;
  code: string;
  levelId?: string;
  description?: string;
}

export interface UpdateStreamRequest {
  name?: string;
  code?: string;
  levelId?: string;
  description?: string;
}

export interface CreateRoomRequest {
  name: string;
  code: string;
  capacity: number;
  roomType: RoomType;
  floor?: number;
  building?: string;
  hasProjector?: boolean;
  hasWhiteboard?: boolean;
  hasComputer?: boolean;
  hasInternet?: boolean;
}

export interface UpdateRoomRequest {
  name?: string;
  code?: string;
  capacity?: number;
  roomType?: RoomType;
  floor?: number;
  building?: string;
  hasProjector?: boolean;
  hasWhiteboard?: boolean;
  hasComputer?: boolean;
  hasInternet?: boolean;
  status?: RoomStatus;
}

export interface CreateAssignmentRequest {
  teacherId: string;
  classId: string;
  subjectId: string;
  academicYearId: string;
  termId?: string;
  hoursPerWeek: number;
  startDate: string;
  endDate?: string;
}

export interface CreateScheduleSlotRequest {
  classId: string;
  subjectId: string;
  teacherId: string;
  roomId?: string;
  academicYearId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  eventType: AcademicEvent['eventType'];
  startDate: string;
  endDate: string;
  academicYearId: string;
  isRecurring?: boolean;
}

export interface AcademicFilters {
  search?: string;
  levelId?: string;
  sectionId?: string;
  streamId?: string;
  departmentId?: string;
  academicYearId?: string;
  teacherId?: string;
  classId?: string;
  subjectId?: string;
  roomType?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ScheduleGeneratorInput {
  schoolId: string;
  academicYearId: string;
  classIds: string[];
  constraints?: {
    maxHoursPerDay?: number;
    maxHoursPerTeacherPerDay?: number;
    breakSlots?: Array<{ startTime: string; endTime: string; name: string }>;
    preferredStartHour?: number;
    preferredEndHour?: number;
  };
}

export interface ScheduleGeneratorResult {
  slots: CreateScheduleSlotRequest[];
  conflicts: ScheduleConflict[];
  statistics: {
    totalSlots: number;
    teacherUtilization: number;
    roomUtilization: number;
    classCoverage: number;
  };
}

// ==================== GENERICS ====================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  studentsCount: number;
  teachersCount: number;
  classesCount: number;
  attendanceRate: number;
  paymentsTotal: number;
  paymentsPending: number;
  recentPayments: Payment[];
  recentActivity: { action: string; date: string; user: string }[];
}

export interface DashboardAnalytics {
  attendanceByMonth: { month: string; rate: number }[];
  gradeDistribution: { range: string; count: number }[];
  paymentsByMonth: { month: string; amount: number }[];
  topStudents: { name: string; average: number }[];
}

// ==================== ATTENDANCE TYPES ====================

export type StudentAttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' | 'SICK' | 'PERMISSION' | 'EXCLUDED' | 'REMOTE' | 'UNKNOWN';
export type TeacherAttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'ON_LEAVE' | 'MISSION' | 'SUBSTITUTE' | 'TRAINING' | 'REMOTE' | 'UNKNOWN';
export type AttendanceMethod = 'MANUAL' | 'QR_CODE' | 'GPS' | 'NFC' | 'FACE_RECOGNITION' | 'IMPORT' | 'AUTO';
export type AttendanceReason = 'ILLNESS' | 'FAMILY' | 'TRANSPORT' | 'WEATHER' | 'PERSONAL' | 'SCHOOL_ACTIVITY' | 'OTHER' | 'UNKNOWN';
export type AttendanceType = 'STUDENT' | 'TEACHER';
export type AttendanceSessionStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type AttendancePeriod = 'MORNING' | 'AFTERNOON' | 'FULL_DAY' | 'EVENING';

export interface HrAttendance {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  academicYearId: string;
  date: string;
  status: StudentAttendanceStatus;
  method: AttendanceMethod;
  reason?: AttendanceReason;
  reasonNote?: string;
  justificationId?: string;
  checkInTime?: string;
  checkOutTime?: string;
  lateMinutes?: number;
  period: AttendancePeriod;
  recordedBy: string;
  verifiedBy?: string;
  verifiedAt?: string;
  source: 'MANUAL' | 'API' | 'IMPORT' | 'SYNC';
  deviceId?: string;
  gpsLat?: number;
  gpsLng?: number;
  qrCode?: string;
  photo?: string;
  notes?: string;
  isLate: boolean;
  isExcused: boolean;
  hoursPresent?: number;
  createdAt: string;
  updatedAt: string;
}

export interface HrTeacherAttendance {
  id: string;
  schoolId: string;
  teacherId: string;
  date: string;
  status: TeacherAttendanceStatus;
  method: AttendanceMethod;
  reason?: string;
  reasonNote?: string;
  checkInTime?: string;
  checkOutTime?: string;
  lateMinutes?: number;
  period: AttendancePeriod;
  recordedBy: string;
  verifiedBy?: string;
  verifiedAt?: string;
  source: 'MANUAL' | 'API' | 'IMPORT' | 'SYNC';
  deviceId?: string;
  gpsLat?: number;
  gpsLng?: number;
  notes?: string;
  isLate: boolean;
  hoursWorked?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  id: string;
  schoolId: string;
  sessionId: string;
  studentId: string;
  classId: string;
  status: StudentAttendanceStatus;
  method: AttendanceMethod;
  recordedBy: string;
  checkInTime?: string;
  checkOutTime?: string;
  lateMinutes?: number;
  notes?: string;
  createdAt: string;
}

export interface AttendanceSession {
  id: string;
  schoolId: string;
  classId: string;
  teacherId: string;
  subjectId?: string;
  academicYearId: string;
  date: string;
  period: AttendancePeriod;
  status: AttendanceSessionStatus;
  startTime: string;
  endTime?: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRate: number;
  qrCode?: string;
  gpsLat?: number;
  gpsLng?: number;
  qrEnabled: boolean;
  gpsEnabled: boolean;
  nfcEnabled: boolean;
  faceEnabled: boolean;
  createdBy: string;
  completedBy?: string;
  completedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceSummary {
  schoolId: string;
  studentId?: string;
  classId?: string;
  academicYearId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  sickDays: number;
  permissionDays: number;
  attendanceRate: number;
  punctualityRate: number;
  totalHoursPresent: number;
  totalHoursExpected: number;
  byMonth: Array<{ month: string; rate: number }>;
  byClass: Array<{ classId: string; className: string; rate: number }>;
  bySubject: Array<{ subjectId: string; subjectName: string; rate: number }>;
}

export interface AttendanceStatistics {
  schoolId: string;
  academicYearId: string;
  date: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  lateStudents: number;
  excusedStudents: number;
  attendanceRate: number;
  punctualityRate: number;
  totalTeachers: number;
  presentTeachers: number;
  absentTeachers: number;
  lateTeachers: number;
  teacherAttendanceRate: number;
  byClass: Array<{
    classId: string;
    className: string;
    total: number;
    present: number;
    absent: number;
    late: number;
    rate: number;
  }>;
  byLevel: Array<{
    levelId: string;
    levelName: string;
    total: number;
    present: number;
    rate: number;
  }>;
  byDay: Array<{ day: string; rate: number }>;
  byMonth: Array<{ month: string; rate: number }>;
  trends: {
    weekly: number[];
    monthly: number[];
    yearly: number[];
  };
}

export interface AttendanceDashboard {
  schoolId: string;
  date: string;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  excusedToday: number;
  attendanceRate: number;
  totalStudents: number;
  totalTeachers: number;
  presentTeachers: number;
  absentTeachers: number;
  teacherAttendanceRate: number;
  mostAssiduousClass: { classId: string; className: string; rate: number };
  leastAssiduousClass: { classId: string; className: string; rate: number };
  atRiskStudents: Array<{ studentId: string; name: string; rate: number; classId: string }>;
  absentTeachers: Array<{ teacherId: string; name: string; subject?: string }>;
  monthlyEvolution: Array<{ month: string; rate: number }>;
  weeklyHeatmap: Array<{ day: string; rate: number }>;
  alerts: AttendanceAlert[];
  recentActivity: Array<{ action: string; date: string; user: string }>;
}

export interface AttendanceTimeline {
  schoolId: string;
  studentId?: string;
  teacherId?: string;
  events: Array<{
    id: string;
    type: 'CHECK_IN' | 'CHECK_OUT' | 'STATUS_CHANGE' | 'JUSTIFICATION' | 'CORRECTION' | 'ALERT';
    date: string;
    time: string;
    description: string;
    metadata?: Record<string, unknown>;
  }>;
  totalEvents: number;
  page: number;
  limit: number;
}

export interface AttendanceReport {
  schoolId: string;
  reportType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'CUSTOM';
  startDate: string;
  endDate: string;
  classId?: string;
  levelId?: string;
  studentId?: string;
  data: {
    summary: AttendanceSummary;
    details: Attendance[];
    statistics: AttendanceStatistics;
    charts: Array<{
      type: string;
      title: string;
      data: Record<string, unknown>;
    }>;
  };
  generatedAt: string;
  generatedBy: string;
}

export interface AttendanceAlert {
  id: string;
  schoolId: string;
  alertType: 'CONSECUTIVE_ABSENCE' | 'LOW_ATTENDANCE' | 'FREQUENT_LATE' | 'UNEXPLAINED_ABSENCE' | 'CLASS_LOW_RATE' | 'TEACHER_ABSENCE' | 'SESSION_MISSED';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  message: string;
  targetType: 'STUDENT' | 'TEACHER' | 'CLASS' | 'SCHOOL';
  targetId: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface AttendanceNotification {
  id: string;
  schoolId: string;
  notificationType: 'ABSENCE' | 'LATE' | 'JUSTIFICATION' | 'ALERT' | 'REPORT' | 'REMINDER';
  recipientType: 'PARENT' | 'TEACHER' | 'ADMIN' | 'STUDENT';
  recipientId: string;
  channel: 'SMS' | 'WHATSAPP' | 'PUSH' | 'EMAIL' | 'IN_APP';
  title: string;
  message: string;
  sent: boolean;
  sentAt?: string;
  read: boolean;
  readAt?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface AttendanceImport {
  id: string;
  schoolId: string;
  importType: 'STUDENT_ATTENDANCE' | 'TEACHER_ATTENDANCE';
  fileName: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  totalRows: number;
  processedRows: number;
  successRows: number;
  errorRows: number;
  errors: Array<{ row: number; field: string; message: string }>;
  importedBy: string;
  importedAt: string;
}

export interface AttendanceExport {
  format: 'PDF' | 'EXCEL' | 'CSV' | 'JSON';
  exportType: 'STUDENT_ATTENDANCE' | 'TEACHER_ATTENDANCE' | 'SUMMARY' | 'REPORT' | 'STATISTICS';
  filters: AttendanceFilters;
  data: Record<string, unknown>[];
  filename: string;
}

export interface AttendanceHistory {
  schoolId: string;
  entityType: 'STUDENT' | 'TEACHER' | 'CLASS';
  entityId: string;
  records: Array<{
    date: string;
    status: string;
    method: string;
    recordedBy: string;
    notes?: string;
  }>;
  totalRecords: number;
}

export interface AttendanceCorrection {
  id: string;
  schoolId: string;
  attendanceId: string;
  originalStatus: StudentAttendanceStatus;
  newStatus: StudentAttendanceStatus;
  reason: string;
  correctedBy: string;
  approvedBy?: string;
  approvedAt?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface AttendanceJustification {
  id: string;
  schoolId: string;
  studentId: string;
  attendanceId: string;
  reason: AttendanceReason;
  description: string;
  documentUrl?: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceDevice {
  id: string;
  schoolId: string;
  name: string;
  type: 'QR_SCANNER' | 'NFC_READER' | 'FACE_CAMERA' | 'GPS_BEACON' | 'MOBILE_APP';
  location?: string;
  isActive: boolean;
  lastSyncAt?: string;
  batteryLevel?: number;
  firmwareVersion?: string;
  createdAt: string;
}

export interface AttendanceLocation {
  id: string;
  schoolId: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  isActive: boolean;
  allowedMethods: AttendanceMethod[];
  createdAt: string;
}

export interface AttendanceSync {
  id: string;
  schoolId: string;
  deviceId: string;
  syncType: 'FULL' | 'INCREMENTAL';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  recordsCount: number;
  syncedCount: number;
  failedCount: number;
  conflictsCount: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
}

export interface AttendanceQR {
  id: string;
  schoolId: string;
  sessionId: string;
  code: string;
  expiresAt: string;
  maxScans: number;
  scanCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface AttendanceGPS {
  id: string;
  schoolId: string;
  sessionId: string;
  latitude: number;
  longitude: number;
  radius: number;
  studentId?: string;
  verified: boolean;
  distanceFromSchool?: number;
  createdAt: string;
}

export interface AttendanceFaceRecognition {
  id: string;
  schoolId: string;
  studentId: string;
  faceData: string;
  confidence: number;
  verified: boolean;
  photoUrl?: string;
  createdAt: string;
}

export interface AttendanceNFC {
  id: string;
  schoolId: string;
  studentId: string;
  nfcTagId: string;
  readerId: string;
  verified: boolean;
  createdAt: string;
}

export interface AttendanceSettings {
  id: string;
  schoolId: string;
  qrEnabled: boolean;
  gpsEnabled: boolean;
  nfcEnabled: boolean;
  faceEnabled: boolean;
  gpsRadius: number;
  qrExpiryMinutes: number;
  autoMarkAbsentAfterMinutes: number;
  allowLateJustification: boolean;
  lateThresholdMinutes: number;
  notificationsEnabled: boolean;
  parentNotifications: boolean;
  smsEnabled: boolean;
  whatsappEnabled: boolean;
  pushEnabled: boolean;
  emailEnabled: boolean;
  consecutiveAbsenceThreshold: number;
  lowAttendanceThreshold: number;
  createdAt: string;
  updatedAt: string;
}

export interface AttendancePolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  maxAbsencesWithoutJustification: number;
  maxConsecutiveAbsences: number;
  lateToleranceMinutes: number;
  autoExclusionThreshold: number;
  parentNotificationAfterAbsences: number;
  adminAlertAfterAbsences: number;
  allowExemption: boolean;
  exemptionRoles: string[];
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceAudit {
  id: string;
  schoolId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  deviceId?: string;
  createdAt: string;
}

export interface AttendanceSearch {
  query: string;
  types?: Array<'STUDENT' | 'TEACHER' | 'CLASS' | 'SESSION'>;
  dateFrom?: string;
  dateTo?: string;
  status?: StudentAttendanceStatus;
  classId?: string;
  limit?: number;
}

export interface AttendanceAnalytics {
  schoolId: string;
  academicYearId: string;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  metrics: {
    overallRate: number;
    studentRate: number;
    teacherRate: number;
    punctualityRate: number;
    improvementRate: number;
  };
  trends: {
    attendance: Array<{ date: string; rate: number }>;
    punctuality: Array<{ date: string; rate: number }>;
    byClass: Array<{ classId: string; className: string; rate: number }>;
    byLevel: Array<{ levelId: string; levelName: string; rate: number }>;
  };
  predictions: {
    atRiskStudents: Array<{ studentId: string; name: string; predictedRate: number }>;
    dropoutRisk: Array<{ studentId: string; name: string; riskScore: number }>;
    improvementOpportunities: Array<{ classId: string; className: string; potentialGain: number }>;
  };
  recommendations: Array<{
    type: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    title: string;
    description: string;
    targetId?: string;
  }>;
}

export interface AttendanceFilters {
  search?: string;
  studentId?: string;
  teacherId?: string;
  classId?: string;
  levelId?: string;
  academicYearId?: string;
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StudentAttendanceStatus | TeacherAttendanceStatus;
  method?: AttendanceMethod;
  period?: AttendancePeriod;
  reason?: AttendanceReason;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateAttendanceRequest {
  studentId: string;
  classId: string;
  academicYearId: string;
  date: string;
  status: StudentAttendanceStatus;
  method?: AttendanceMethod;
  reason?: AttendanceReason;
  reasonNote?: string;
  period?: AttendancePeriod;
  checkInTime?: string;
  lateMinutes?: number;
  notes?: string;
}

export interface UpdateAttendanceRequest {
  status?: StudentAttendanceStatus;
  reason?: AttendanceReason;
  reasonNote?: string;
  checkInTime?: string;
  checkOutTime?: string;
  lateMinutes?: number;
  notes?: string;
}

export interface CreateTeacherAttendanceRequest {
  teacherId: string;
  date: string;
  status: TeacherAttendanceStatus;
  method?: AttendanceMethod;
  reason?: string;
  reasonNote?: string;
  period?: AttendancePeriod;
  checkInTime?: string;
  lateMinutes?: number;
  notes?: string;
}

export interface CreateSessionRequest {
  classId: string;
  teacherId: string;
  subjectId?: string;
  academicYearId: string;
  date: string;
  period: AttendancePeriod;
  startTime: string;
  qrEnabled?: boolean;
  gpsEnabled?: boolean;
  nfcEnabled?: boolean;
  faceEnabled?: boolean;
  notes?: string;
}

export interface BulkAttendanceRequest {
  classId: string;
  academicYearId: string;
  date: string;
  period: AttendancePeriod;
  records: Array<{
    studentId: string;
    status: StudentAttendanceStatus;
    reason?: AttendanceReason;
    reasonNote?: string;
    lateMinutes?: number;
  }>;
  recordedBy: string;
}

export interface AttendanceReportRequest {
  reportType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'CUSTOM';
  startDate: string;
  endDate: string;
  classId?: string;
  levelId?: string;
  studentId?: string;
  format?: 'PDF' | 'EXCEL' | 'CSV' | 'JSON';
}

export interface AttendanceDashboardRequest {
  date?: string;
  classId?: string;
  levelId?: string;
}

export interface AttendanceImportRequest {
  importType: 'STUDENT_ATTENDANCE' | 'TEACHER_ATTENDANCE';
  data: Record<string, unknown>[];
  date: string;
  period?: AttendancePeriod;
  classId?: string;
}

export interface AttendanceExportRequest {
  format: 'PDF' | 'EXCEL' | 'CSV' | 'JSON';
  exportType: 'STUDENT_ATTENDANCE' | 'TEACHER_ATTENDANCE' | 'SUMMARY' | 'REPORT' | 'STATISTICS';
  filters: AttendanceFilters;
}

export interface AttendanceRepository {
  // Attendance CRUD
  findAttendance(id: string): Promise<Attendance | null>;
  findAllAttendance(schoolId: string, filters: AttendanceFilters): Promise<{ data: Attendance[]; total: number }>;
  createAttendance(data: CreateAttendanceRequest, schoolId: string, recordedBy: string): Promise<Attendance>;
  updateAttendance(id: string, data: UpdateAttendanceRequest): Promise<Attendance>;
  deleteAttendance(id: string): Promise<void>;
  bulkCreateAttendance(records: Array<CreateAttendanceRequest & { recordedBy: string }>, schoolId: string): Promise<Attendance[]>;

  // Teacher Attendance
  findTeacherAttendance(id: string): Promise<TeacherAttendance | null>;
  findAllTeacherAttendance(schoolId: string, filters: AttendanceFilters): Promise<{ data: TeacherAttendance[]; total: number }>;
  createTeacherAttendance(data: CreateTeacherAttendanceRequest, schoolId: string, recordedBy: string): Promise<TeacherAttendance>;
  updateTeacherAttendance(id: string, data: Partial<TeacherAttendance>): Promise<TeacherAttendance>;

  // Sessions
  findSession(id: string): Promise<AttendanceSession | null>;
  findAllSessions(schoolId: string, filters: AttendanceFilters): Promise<{ data: AttendanceSession[]; total: number }>;
  createSession(data: CreateSessionRequest, schoolId: string, createdBy: string): Promise<AttendanceSession>;
  updateSession(id: string, data: Partial<AttendanceSession>): Promise<AttendanceSession>;
  completeSession(id: string, completedBy: string): Promise<void>;
  cancelSession(id: string): Promise<void>;

  // Records
  findRecord(id: string): Promise<AttendanceRecord | null>;
  findRecordsBySession(sessionId: string): Promise<AttendanceRecord[]>;
  createRecord(data: Omit<AttendanceRecord, 'id' | 'createdAt'>): Promise<AttendanceRecord>;
  updateRecord(id: string, data: Partial<AttendanceRecord>): Promise<AttendanceRecord>;

  // Justifications
  findJustification(id: string): Promise<AttendanceJustification | null>;
  findAllJustifications(schoolId: string, filters: AttendanceFilters): Promise<{ data: AttendanceJustification[]; total: number }>;
  createJustification(data: Omit<AttendanceJustification, 'id' | 'createdAt' | 'updatedAt'>): Promise<AttendanceJustification>;
  updateJustification(id: string, data: Partial<AttendanceJustification>): Promise<AttendanceJustification>;

  // Corrections
  findCorrection(id: string): Promise<AttendanceCorrection | null>;
  findAllCorrections(schoolId: string, filters: AttendanceFilters): Promise<{ data: AttendanceCorrection[]; total: number }>;
  createCorrection(data: Omit<AttendanceCorrection, 'id' | 'createdAt'>): Promise<AttendanceCorrection>;
  updateCorrection(id: string, data: Partial<AttendanceCorrection>): Promise<AttendanceCorrection>;

  // Alerts
  findAlerts(schoolId: string, filters?: AttendanceFilters): Promise<AttendanceAlert[]>;
  createAlert(data: Omit<AttendanceAlert, 'id' | 'createdAt'>): Promise<AttendanceAlert>;
  resolveAlert(id: string, resolvedBy: string): Promise<void>;

  // Notifications
  findNotifications(schoolId: string, recipientId: string): Promise<AttendanceNotification[]>;
  createNotification(data: Omit<AttendanceNotification, 'id' | 'createdAt'>): Promise<AttendanceNotification>;
  markNotificationRead(id: string): Promise<void>;

  // Statistics & Dashboard
  getStatistics(schoolId: string, academicYearId: string, date?: string): Promise<AttendanceStatistics>;
  getDashboard(schoolId: string, date?: string): Promise<AttendanceDashboard>;
  getSummary(schoolId: string, studentId: string, startDate: string, endDate: string): Promise<AttendanceSummary>;
  getTimeline(schoolId: string, studentId?: string, teacherId?: string, page?: number, limit?: number): Promise<AttendanceTimeline>;
  getAnalytics(schoolId: string, academicYearId: string, period: string): Promise<AttendanceAnalytics>;

  // Reports
  generateReport(schoolId: string, request: AttendanceReportRequest): Promise<AttendanceReport>;
  getDailyReport(schoolId: string, date: string, classId?: string): Promise<AttendanceReport>;
  getMonthlyReport(schoolId: string, month: string, year: number, classId?: string): Promise<AttendanceReport>;

  // Search
  search(schoolId: string, query: string, types?: string[], limit?: number): Promise<Array<{ id: string; name: string; type: string }>>;

  // Import/Export
  importAttendance(schoolId: string, data: Record<string, unknown>[], importType: string): Promise<AttendanceImport>;
  exportAttendance(schoolId: string, filters: AttendanceFilters, format: string): Promise<AttendanceExport>;

  // History
  getHistory(schoolId: string, entityType: string, entityId: string): Promise<AttendanceHistory>;

  // Settings & Policy
  getSettings(schoolId: string): Promise<AttendanceSettings>;
  updateSettings(schoolId: string, data: Partial<AttendanceSettings>): Promise<AttendanceSettings>;
  getPolicies(schoolId: string): Promise<AttendancePolicy[]>;
  createPolicy(data: Omit<AttendancePolicy, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AttendancePolicy>;
  updatePolicy(id: string, data: Partial<AttendancePolicy>): Promise<AttendancePolicy>;

  // QR Code
  generateQRCode(sessionId: string, schoolId: string): Promise<AttendanceQR>;
  validateQRCode(code: string, schoolId: string): Promise<boolean>;

  // GPS
  validateGPS(schoolId: string, studentId: string, latitude: number, longitude: number): Promise<boolean>;

  // Face Recognition
  validateFace(schoolId: string, studentId: string, photoData: string): Promise<boolean>;

  // NFC
  validateNFC(schoolId: string, studentId: string, nfcTagId: string): Promise<boolean>;

  // Sync
  syncAttendance(schoolId: string, deviceId: string, records: Attendance[]): Promise<AttendanceSync>;
  getSyncStatus(schoolId: string, deviceId: string): Promise<AttendanceSync | null>;

  // Devices
  findDevices(schoolId: string): Promise<AttendanceDevice[]>;
  registerDevice(data: Omit<AttendanceDevice, 'id' | 'createdAt'>, schoolId: string): Promise<AttendanceDevice>;

  // Locations
  findLocations(schoolId: string): Promise<AttendanceLocation[]>;
  createLocation(data: Omit<AttendanceLocation, 'id' | 'createdAt'>, schoolId: string): Promise<AttendanceLocation>;

  // Audit
  logAudit(schoolId: string, userId: string, action: string, entityType: string, entityId: string, details?: Record<string, unknown>): Promise<void>;
  getAuditLog(schoolId: string, filters?: AttendanceFilters): Promise<AttendanceAudit[]>;
}

// ==================== EXAMINATION & GRADING TYPES ====================

export const ExamStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  LOCKED: 'LOCKED',
  ARCHIVED: 'ARCHIVED',
} as const;
export type HrExamStatus = (typeof ExamStatus)[keyof typeof ExamStatus];

export const ExamType = {
  CONTINUOUS: 'CONTINUOUS',
  END_OF_TERM: 'END_OF_TERM',
  MID_TERM: 'MID_TERM',
  FINAL: 'FINAL',
  DIAGNOSTIC: 'DIAGNOSTIC',
  HOMEWORK: 'HOMEWORK',
  ORAL: 'ORAL',
  PRACTICAL: 'PRACTICAL',
  PROJECT: 'PROJECT',
} as const;
export type HrExamType = (typeof ExamType)[keyof typeof ExamType];

export const ExamMode = {
  WRITTEN: 'WRITTEN',
  ORAL: 'ORAL',
  PRACTICAL: 'PRACTICAL',
  ONLINE: 'ONLINE',
  BLENDED: 'BLENDED',
} as const;
export type HrExamMode = (typeof ExamMode)[keyof typeof ExamMode];

export const GradeScale = {
  NUMERIC_20: 'NUMERIC_20',
  LETTER: 'LETTER',
  COEFFICIENT: 'COEFFICIENT',
  COMPETENCY: 'COMPETENCY',
} as const;
export type HrGradeScale = (typeof GradeScale)[keyof typeof GradeScale];

export const DecisionStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  APPEALED: 'APPEALED',
} as const;
export type HrDecisionStatus = (typeof DecisionStatus)[keyof typeof DecisionStatus];

export const DecisionType = {
  PASSAGE: 'PASSAGE',
  REPETITION: 'REPETITION',
  ORIENTATION: 'ORIENTATION',
  EXCLUSION: 'EXCLUSION',
  HONOR: 'HONOR',
  ENCOURAGEMENT: 'ENCOURAGEMENT',
  CONDITIONAL_PASSAGE: 'CONDITIONAL_PASSAGE',
  BOARD_DECISION: 'BOARD_DECISION',
} as const;
export type HrDecisionType = (typeof DecisionType)[keyof typeof DecisionType];

export const MeritType = {
  HONOR_ROLL: 'HONOR_ROLL',
  EXCELLENCE: 'EXCELLENCE',
  IMPROVEMENT: 'IMPROVEMENT',
  DISCIPLINE: 'DISCIPLINE',
} as const;
export type HrMeritType = (typeof MeritType)[keyof typeof MeritType];

export const RankingMethod = {
  AVERAGE: 'AVERAGE',
  WEIGHTED_AVERAGE: 'WEIGHTED_AVERAGE',
  TOTAL: 'TOTAL',
  MEDIAN: 'MEDIAN',
} as const;
export type HrRankingMethod = (typeof RankingMethod)[keyof typeof RankingMethod];

export const CorrectionStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type HrCorrectionStatus = (typeof CorrectionStatus)[keyof typeof CorrectionStatus];

export const PublicationStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  HIDDEN: 'HIDDEN',
} as const;
export type HrPublicationStatus = (typeof PublicationStatus)[keyof typeof PublicationStatus];

export const TranscriptStatus = {
  PENDING: 'PENDING',
  GENERATED: 'GENERATED',
  DELIVERED: 'DELIVERED',
  ARCHIVED: 'ARCHIVED',
} as const;
export type HrTranscriptStatus = (typeof TranscriptStatus)[keyof typeof TranscriptStatus];

export const AssessmentType = {
  TEST: 'TEST',
  EXAM: 'EXAM',
  HOMEWORK: 'HOMEWORK',
  ORAL: 'ORAL',
  PROJECT: 'PROJECT',
  PARTICIPATION: 'PARTICIPATION',
  PRACTICAL: 'PRACTICAL',
} as const;
export type HrAssessmentType = (typeof AssessmentType)[keyof typeof AssessmentType];

export const CompetencyLevel = {
  BEGINNER: 'BEGINNER',
  DEVELOPING: 'DEVELOPING',
  PROFICIENT: 'PROFICIENT',
  ADVANCED: 'ADVANCED',
  EXCELLENT: 'EXCELLENT',
} as const;
export type HrCompetencyLevel = (typeof CompetencyLevel)[keyof typeof CompetencyLevel];

export const MarkEntryStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  VALIDATED: 'VALIDATED',
  PUBLISHED: 'PUBLISHED',
} as const;
export type HrMarkEntryStatus = (typeof MarkEntryStatus)[keyof typeof MarkEntryStatus];

export interface Exam {
  id: string;
  schoolId: string;
  name: string;
  description?: string;
  examType: HrExamType;
  examMode: HrExamMode;
  academicYearId: string;
  termId?: string;
  subjectId: string;
  classId: string;
  totalMarks: number;
  passingMarks: number;
  duration?: number;
  examDate: string;
  startTime?: string;
  endTime?: string;
  status: HrExamStatus;
  isPublished: boolean;
  publishedAt?: string;
  publishedBy?: string;
  isLocked: boolean;
  lockedAt?: string;
  lockedBy?: string;
  instructions?: string;
  weight?: number;
  coefficient?: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExamSession {
  id: string;
  schoolId: string;
  examId: string;
  sessionId: string;
  date: string;
  startTime: string;
  endTime: string;
  room?: string;
  supervisor?: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExamRoom {
  id: string;
  schoolId: string;
  name: string;
  capacity: number;
  location?: string;
  equipment?: string[];
  isActive: boolean;
  createdAt: string;
}

export interface ExamSupervisor {
  id: string;
  schoolId: string;
  examId: string;
  teacherId: string;
  role: 'MAIN' | 'ASSISTANT' | 'INVIGILATOR';
  roomId?: string;
  assignedAt: string;
  createdAt: string;
}

export interface ExamCandidate {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  seatNumber?: number;
  status: 'REGISTERED' | 'ABSENT' | 'PRESENT' | 'EXCLUDED';
  specialArrangements?: string;
  createdAt: string;
}

export interface ExamSchedule {
  id: string;
  schoolId: string;
  academicYearId: string;
  termId?: string;
  examId: string;
  classId: string;
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
  roomId?: string;
  supervisorId?: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface ExamResult {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  grade?: string;
  rank?: number;
  remarks?: string;
  isAbsent: boolean;
  isExcused: boolean;
  status: 'PENDING' | 'PUBLISHED' | 'CORRECTED';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExamResultItem {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  questionNumber: number;
  maxMarks: number;
  marksObtained: number;
  comments?: string;
  criteriaId?: string;
  createdAt: string;
}

export interface HrGrade {
  id: string;
  schoolId: string;
  name: string;
  minMark: number;
  maxMark: number;
  gpa?: number;
  description?: string;
  color?: string;
  order: number;
  createdAt: string;
}

export interface GradeRule {
  id: string;
  schoolId: string;
  name: string;
  conditions: Array<{
    field: string;
    operator: 'GT' | 'GTE' | 'LT' | 'LTE' | 'EQ' | 'BETWEEN';
    value: number | string;
    value2?: number;
  }>;
  grade: string;
  priority: number;
  isActive: boolean;
  createdAt: string;
}

export interface GradeFormula {
  id: string;
  schoolId: string;
  name: string;
  formula: string;
  variables: string[];
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Mark {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  subjectId: string;
  classId: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  grade?: string;
  teacherComment?: string;
  internalNote?: string;
  isAbsent: boolean;
  isExcused: boolean;
  status: HrMarkEntryStatus;
  enteredBy: string;
  validatedBy?: string;
  validatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarkEntry {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  maxMarks: number;
  comments?: string;
  enteredBy: string;
  status: HrMarkEntryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MarkHistory {
  id: string;
  schoolId: string;
  markId: string;
  previousMarks?: number;
  newMarks: number;
  reason: string;
  changedBy: string;
  changedAt: string;
  createdAt: string;
}

export interface MarkValidation {
  id: string;
  schoolId: string;
  examId: string;
  classId: string;
  subjectId: string;
  totalStudents: number;
  validatedCount: number;
  pendingCount: number;
  status: 'PENDING' | 'PARTIAL' | 'COMPLETE' | 'LOCKED';
  validatedBy?: string;
  validatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubjectCoefficient {
  id: string;
  schoolId: string;
  subjectId: string;
  classId: string;
  academicYearId: string;
  coefficient: number;
  weight?: number;
  isActive: boolean;
  createdAt: string;
}

export interface SubjectAverage {
  id: string;
  schoolId: string;
  studentId: string;
  subjectId: string;
  classId: string;
  academicYearId: string;
  termId?: string;
  average: number;
  totalMarks: number;
  maxMarks: number;
  examCount: number;
  rank?: number;
  grade?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TermAverage {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  academicYearId: string;
  termId: string;
  average: number;
  totalMarks: number;
  maxMarks: number;
  rank?: number;
  grade?: string;
  status: 'PENDING' | 'CALCULATED' | 'PUBLISHED';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SemesterAverage {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  academicYearId: string;
  semester: 1 | 2;
  average: number;
  totalMarks: number;
  maxMarks: number;
  rank?: number;
  grade?: string;
  status: 'PENDING' | 'CALCULATED' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}

export interface AnnualAverage {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  academicYearId: string;
  average: number;
  totalMarks: number;
  maxMarks: number;
  rank?: number;
  grade?: string;
  mention?: string;
  status: 'PENDING' | 'CALCULATED' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}

export interface StudentRanking {
  id: string;
  schoolId: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  academicYearId: string;
  termId?: string;
  rank: number;
  totalStudents: number;
  average: number;
  percentage: number;
  grade?: string;
  mention?: string;
  rankChange?: number;
  createdAt: string;
}

export interface ClassRanking {
  id: string;
  schoolId: string;
  classId: string;
  className: string;
  academicYearId: string;
  termId?: string;
  rankings: StudentRanking[];
  averageRate: number;
  topAverage: number;
  bottomAverage: number;
  medianAverage: number;
  createdAt: string;
}

export interface SchoolRanking {
  id: string;
  schoolId: string;
  academicYearId: string;
  termId?: string;
  classRankings: ClassRanking[];
  overallAverage: number;
  totalStudents: number;
  overallPassRate: number;
  createdAt: string;
}

export interface Decision {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  academicYearId: string;
  termId?: string;
  decisionType: HrDecisionType;
  status: HrDecisionStatus;
  reason?: string;
  conditions?: string[];
  nextClassId?: string;
  approvedBy?: string;
  approvedAt?: string;
  boardDate?: string;
  appealDeadline?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Merit {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  academicYearId: string;
  termId?: string;
  meritType: HrMeritType;
  average: number;
  rank: number;
  description: string;
  issuedAt: string;
  issuedBy: string;
  createdAt: string;
}

export interface DisciplineImpact {
  id: string;
  schoolId: string;
  studentId: string;
  academicYearId: string;
  type: 'WARNING' | 'SUSPENSION' | 'EXCLUSION' | 'REPRIMAND';
  reason: string;
  startDate: string;
  endDate?: string;
  impactOnRanking: boolean;
  pointsDeducted?: number;
  issuedBy: string;
  createdAt: string;
}

export interface Transcript {
  id: string;
  schoolId: string;
  studentId: string;
  academicYearId: string;
  termId?: string;
  status: HrTranscriptStatus;
  generatedAt?: string;
  generatedBy?: string;
  deliveredAt?: string;
  deliveredBy?: string;
  fileUrl?: string;
  qrCode?: string;
  hash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportCard {
  id: string;
  schoolId: string;
  studentId: string;
  studentName: string;
  className: string;
  academicYearId: string;
  termId: string;
  termName: string;
  average: number;
  rank: number;
  totalStudents: number;
  grade?: string;
  mention?: string;
  status: 'PENDING' | 'GENERATED' | 'DELIVERED';
  observations?: string;
  generatedAt?: string;
  fileUrl?: string;
  qrCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Competency {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  domain: string;
  subjectId?: string;
  classId?: string;
  level: HrCompetencyLevel;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface CompetencyResult {
  id: string;
  schoolId: string;
  studentId: string;
  competencyId: string;
  classId: string;
  academicYearId: string;
  termId?: string;
  level: HrCompetencyLevel;
  score: number;
  comments?: string;
  assessedBy: string;
  assessedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearningOutcome {
  id: string;
  schoolId: string;
  subjectId: string;
  classId: string;
  code: string;
  description: string;
  domain: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface EvaluationCriteria {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  maxScore: number;
  weight: number;
  subjectId?: string;
  classId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AssessmentRubric {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  criteria: Array<{
    name: string;
    maxScore: number;
    levels: Array<{
      name: string;
      score: number;
      description: string;
    }>;
  }>;
  subjectId?: string;
  classId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Correction {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  previousMarks: number;
  newMarks: number;
  reason: string;
  status: HrCorrectionStatus;
  requestedBy: string;
  requestedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CorrectionRequest {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  requestedMarks: number;
  currentMarks: number;
  reason: string;
  evidence?: string;
  status: HrCorrectionStatus;
  requestedBy: string;
  requestedAt: string;
  createdAt: string;
}

export interface ExamStatistics {
  id: string;
  schoolId: string;
  examId: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  average: number;
  median: number;
  standardDeviation: number;
  highestMark: number;
  lowestMark: number;
  passRate: number;
  failRate: number;
  gradeDistribution: Array<{ grade: string; count: number; percentage: number }>;
  markDistribution: Array<{ range: string; count: number; percentage: number }>;
  createdAt: string;
}

export interface ExamDashboard {
  schoolId: string;
  totalExams: number;
  publishedExams: number;
  pendingExams: number;
  lockedExams: number;
  totalMarks: number;
  pendingMarks: number;
  averagePassRate: number;
  upcomingExams: Exam[];
  recentResults: ExamResult[];
  alerts: ExamNotification[];
  createdAt: string;
}

export interface ExamAnalytics {
  schoolId: string;
  academicYearId: string;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'TERM' | 'YEARLY';
  metrics: {
    overallAverage: number;
    overallPassRate: number;
    averageImprovement: number;
    subjectAverages: Array<{ subjectId: string; subjectName: string; average: number }>;
    classAverages: Array<{ classId: string; className: string; average: number }>;
    trends: Array<{ period: string; average: number }>;
  };
  predictions: {
    atRiskStudents: Array<{ studentId: string; name: string; average: number; risk: string }>;
    topStudents: Array<{ studentId: string; name: string; average: number; rank: number }>;
  };
  createdAt: string;
}

export interface ExamTimeline {
  schoolId: string;
  examId?: string;
  studentId?: string;
  events: Array<{
    id: string;
    type: 'EXAM_CREATED' | 'EXAM_PUBLISHED' | 'MARKS_ENTERED' | 'MARKS_VALIDATED' | 'MARKS_PUBLISHED' | 'AVERAGE_CALCULATED' | 'RANKING_GENERATED' | 'DECISION_MADE' | 'REPORT_CARD_GENERATED' | 'TRANSCRIPT_GENERATED';
    date: string;
    time: string;
    description: string;
    userId: string;
    metadata?: Record<string, unknown>;
  }>;
  totalEvents: number;
  page: number;
  limit: number;
}

export interface ExamAudit {
  id: string;
  schoolId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  previousValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  deviceId?: string;
  createdAt: string;
}

export interface ImportMarks {
  id: string;
  schoolId: string;
  examId: string;
  fileName: string;
  importType: 'CSV' | 'EXCEL' | 'JSON';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  totalRows: number;
  processedRows: number;
  successRows: number;
  errorRows: number;
  errors: Array<{ row: number; field: string; message: string }>;
  importedBy: string;
  importedAt: string;
}

export interface ExportMarks {
  id: string;
  schoolId: string;
  format: 'PDF' | 'EXCEL' | 'CSV' | 'JSON';
  exportType: 'MARKS' | 'RESULTS' | 'RANKINGS' | 'REPORT_CARDS' | 'TRANSCRIPTS';
  filters: ExamFilters;
  filename: string;
  fileUrl?: string;
  generatedBy: string;
  generatedAt: string;
}

export interface ExamSearch {
  query: string;
  types?: HrExamType[];
  classId?: string;
  subjectId?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: HrExamStatus;
  limit?: number;
}

export interface ExamFilters {
  search?: string;
  examType?: HrExamType;
  examMode?: HrExamMode;
  classId?: string;
  subjectId?: string;
  academicYearId?: string;
  termId?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: HrExamStatus;
  isPublished?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ExamNotification {
  id: string;
  schoolId: string;
  notificationType: 'EXAM_PUBLISHED' | 'MARKS_PUBLISHED' | 'REPORT_CARD_READY' | 'TRANSCRIPT_READY' | 'DECISION_MADE' | 'CORRECTION_PENDING' | 'DEADLINE_REMINDER';
  recipientType: 'TEACHER' | 'PARENT' | 'STUDENT' | 'ADMIN';
  recipientId: string;
  channel: 'SMS' | 'EMAIL' | 'PUSH' | 'WHATSAPP' | 'IN_APP';
  title: string;
  message: string;
  sent: boolean;
  sentAt?: string;
  read: boolean;
  readAt?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ExamSettings {
  id: string;
  schoolId: string;
  defaultTotalMarks: number;
  defaultPassingMarks: number;
  defaultCoefficient: number;
  roundingMethod: 'STANDARD' | 'CEIL' | 'FLOOR' | 'HALF_UP';
  decimalPlaces: number;
  allowNegativeMarks: boolean;
  autoCalculateAverages: boolean;
  autoGenerateRankings: boolean;
  autoGenerateDecisions: boolean;
  passThreshold: number;
  honorThreshold: number;
  excellenceThreshold: number;
  enableCompetencies: boolean;
  enableTranscripts: boolean;
  enableReportCards: boolean;
  enableQRVerification: boolean;
  enableElectronicSignature: boolean;
  enableParentNotifications: boolean;
  enableStudentNotifications: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExamRequest {
  name: string;
  description?: string;
  examType: HrExamType;
  examMode: HrExamMode;
  academicYearId: string;
  termId?: string;
  subjectId: string;
  classId: string;
  totalMarks: number;
  passingMarks: number;
  duration?: number;
  examDate: string;
  startTime?: string;
  endTime?: string;
  instructions?: string;
  weight?: number;
  coefficient?: number;
}

export interface ExamUpdateRequest {
  name?: string;
  description?: string;
  totalMarks?: number;
  passingMarks?: number;
  duration?: number;
  examDate?: string;
  startTime?: string;
  endTime?: string;
  instructions?: string;
  weight?: number;
  coefficient?: number;
  status?: HrExamStatus;
}

export interface MarkEntryRequest {
  examId: string;
  studentId: string;
  marksObtained: number;
  maxMarks: number;
  comments?: string;
}

export interface BulkMarkEntryRequest {
  examId: string;
  entries: Array<{
    studentId: string;
    marksObtained: number;
    maxMarks: number;
    comments?: string;
  }>;
}

export interface DecisionRequest {
  studentId: string;
  classId: string;
  academicYearId: string;
  termId?: string;
  decisionType: HrDecisionType;
  reason?: string;
  conditions?: string[];
  nextClassId?: string;
  notes?: string;
}

export interface ReportCardRequest {
  studentId: string;
  academicYearId: string;
  termId: string;
  observations?: string;
}

export interface TranscriptRequest {
  studentId: string;
  academicYearId: string;
  termId?: string;
}

export interface ExamRepository {
  // Exam CRUD
  findExam(id: string): Promise<Exam | null>;
  findAllExams(schoolId: string, filters: ExamFilters): Promise<{ data: Exam[]; total: number }>;
  createExam(data: ExamRequest, schoolId: string, createdBy: string): Promise<Exam>;
  updateExam(id: string, data: ExamUpdateRequest): Promise<Exam>;
  deleteExam(id: string): Promise<void>;
  archiveExam(id: string): Promise<void>;
  restoreExam(id: string): Promise<void>;
  publishExam(id: string, publishedBy: string): Promise<void>;
  lockExam(id: string, lockedBy: string): Promise<void>;
  unlockExam(id: string): Promise<void>;

  // Marks
  findMark(id: string): Promise<Mark | null>;
  findAllMarks(schoolId: string, examId: string): Promise<Mark[]>;
  findStudentMarks(schoolId: string, studentId: string, filters?: ExamFilters): Promise<Mark[]>;
  findSubjectMarks(schoolId: string, subjectId: string, classId: string): Promise<Mark[]>;
  enterMark(data: MarkEntryRequest, schoolId: string, enteredBy: string): Promise<Mark>;
  bulkEnterMarks(data: BulkMarkEntryRequest, schoolId: string, enteredBy: string): Promise<Mark[]>;
  updateMark(id: string, data: Partial<Mark>): Promise<Mark>;
  deleteMark(id: string): Promise<void>;
  validateMarks(examId: string, validatedBy: string): Promise<void>;
  publishMarks(examId: string, publishedBy: string): Promise<void>;
  getMarkHistory(markId: string): Promise<MarkHistory[]>;
  importMarks(schoolId: string, examId: string, data: Record<string, unknown>[], importedBy: string): Promise<ImportMarks>;

  // Grades & Coefficients
  findGrades(schoolId: string): Promise<Grade[]>;
  createGrade(data: Omit<Grade, 'id' | 'createdAt'>): Promise<Grade>;
  updateGrade(id: string, data: Partial<Grade>): Promise<Grade>;
  deleteGrade(id: string): Promise<void>;
  findGradeRules(schoolId: string): Promise<GradeRule[]>;
  createGradeRule(data: Omit<GradeRule, 'id' | 'createdAt'>): Promise<GradeRule>;
  updateGradeRule(id: string, data: Partial<GradeRule>): Promise<GradeRule>;
  deleteGradeRule(id: string): Promise<void>;
  findCoefficients(schoolId: string, classId: string, academicYearId: string): Promise<SubjectCoefficient[]>;
  updateCoefficient(id: string, data: Partial<SubjectCoefficient>): Promise<SubjectCoefficient>;

  // Averages
  calculateSubjectAverage(studentId: string, subjectId: string, classId: string, academicYearId: string, termId?: string): Promise<SubjectAverage>;
  calculateTermAverage(studentId: string, classId: string, academicYearId: string, termId: string): Promise<TermAverage>;
  calculateSemesterAverage(studentId: string, classId: string, academicYearId: string, semester: 1 | 2): Promise<SemesterAverage>;
  calculateAnnualAverage(studentId: string, classId: string, academicYearId: string): Promise<AnnualAverage>;
  findSubjectAverages(schoolId: string, classId: string, academicYearId: string): Promise<SubjectAverage[]>;
  findTermAverages(schoolId: string, classId: string, academicYearId: string, termId: string): Promise<TermAverage[]>;
  publishTermAverages(classId: string, termId: string, publishedBy: string): Promise<void>;

  // Rankings
  calculateClassRanking(classId: string, academicYearId: string, termId?: string, method?: HrRankingMethod): Promise<ClassRanking>;
  calculateSchoolRanking(academicYearId: string, termId?: string, method?: HrRankingMethod): Promise<SchoolRanking>;
  findStudentRanking(studentId: string, classId: string, academicYearId: string): Promise<StudentRanking>;

  // Decisions
  findDecision(id: string): Promise<Decision | null>;
  findDecisions(schoolId: string, classId: string, academicYearId: string): Promise<Decision[]>;
  createDecision(data: DecisionRequest, schoolId: string): Promise<Decision>;
  updateDecision(id: string, data: Partial<Decision>): Promise<Decision>;
  approveDecision(id: string, approvedBy: string): Promise<void>;
  batchApproveDecisions(classId: string, academicYearId: string, approvedBy: string): Promise<void>;

  // Competencies
  findCompetencies(schoolId: string, classId?: string): Promise<Competency[]>;
  createCompetency(data: Omit<Competency, 'id' | 'createdAt'>): Promise<Competency>;
  updateCompetency(id: string, data: Partial<Competency>): Promise<Competency>;
  deleteCompetency(id: string): Promise<void>;
  findCompetencyResults(studentId: string, classId: string, academicYearId: string): Promise<CompetencyResult[]>;
  createCompetencyResult(data: Omit<CompetencyResult, 'id' | 'createdAt'>): Promise<CompetencyResult>;

  // Report Cards
  generateReportCard(data: ReportCardRequest, schoolId: string): Promise<ReportCard>;
  findReportCards(schoolId: string, classId: string, termId: string): Promise<ReportCard[]>;
  findReportCard(id: string): Promise<ReportCard | null>;

  // Transcripts
  generateTranscript(data: TranscriptRequest, schoolId: string): Promise<Transcript>;
  findTranscripts(schoolId: string, studentId: string): Promise<Transcript[]>;
  findTranscript(id: string): Promise<Transcript | null>;

  // Statistics & Analytics
  getExamStatistics(examId: string): Promise<ExamStatistics>;
  getExamDashboard(schoolId: string): Promise<ExamDashboard>;
  getExamAnalytics(schoolId: string, academicYearId: string): Promise<ExamAnalytics>;

  // Search
  searchExams(schoolId: string, query: string): Promise<Exam[]>;

  // Timeline
  getTimeline(schoolId: string, examId?: string, studentId?: string, page?: number, limit?: number): Promise<ExamTimeline>;

  // Corrections
  findCorrection(id: string): Promise<Correction | null>;
  findCorrections(schoolId: string, examId: string): Promise<Correction[]>;
  createCorrection(data: Omit<Correction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Correction>;
  approveCorrection(id: string, reviewedBy: string, reviewNote?: string): Promise<void>;
  rejectCorrection(id: string, reviewedBy: string, reviewNote?: string): Promise<void>;

  // Notifications
  findNotifications(schoolId: string, recipientId: string): Promise<ExamNotification[]>;
  createNotification(data: Omit<ExamNotification, 'id' | 'createdAt'>): Promise<ExamNotification>;
  markNotificationRead(id: string): Promise<void>;

  // Settings
  getSettings(schoolId: string): Promise<ExamSettings>;
  updateSettings(schoolId: string, data: Partial<ExamSettings>): Promise<ExamSettings>;

  // Audit
  logAudit(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>): Promise<void>;
  getAuditLog(schoolId: string, filters?: ExamFilters): Promise<ExamAudit[]>;

  // Export
  exportMarks(schoolId: string, examId: string, format: string): Promise<ExportMarks>;
  exportResults(schoolId: string, classId: string, format: string): Promise<ExportMarks>;
  exportRankings(schoolId: string, classId: string, format: string): Promise<ExportMarks>;
}

// ==================== MESSAGE & COMMUNICATION TYPES ====================

export enum ConversationTypeType {
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP',
  CLASS = 'CLASS',
  LEVEL = 'LEVEL',
  COHORT = 'COHORT',
  PARENTS = 'PARENTS',
  STAFF = 'STAFF',
  TEACHERS = 'TEACHERS',
  ADMIN = 'ADMIN',
  DIRECTION = 'DIRECTION',
  ACCOUNTING = 'ACCOUNTING',
}

export enum MessageTypeType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  SYSTEM = 'SYSTEM',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  BROADCAST = 'BROADCAST',
}

export enum MessageStatusType {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
}

export enum HrNotificationTypeEnum {
  MESSAGE = 'MESSAGE',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  BROADCAST = 'BROADCAST',
  MENTION = 'MENTION',
  REACTION = 'REACTION',
  SYSTEM = 'SYSTEM',
  REMINDER = 'REMINDER',
}

export enum NotificationChannelType {
  IN_APP = 'IN_APP',
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}

export enum BroadcastScope {
  SINGLE = 'SINGLE',
  CLASS = 'CLASS',
  LEVEL = 'LEVEL',
  ALL_PARENTS = 'ALL_PARENTS',
  ALL_TEACHERS = 'ALL_TEACHERS',
  ALL_STUDENTS = 'ALL_STUDENTS',
  ALL_STAFF = 'ALL_STAFF',
  WHOLE_SCHOOL = 'WHOLE_SCHOOL',
  MULTI_SCHOOL = 'MULTI_SCHOOL',
}

export enum ReactionTypeType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  LAUGH = 'LAUGH',
  WOW = 'WOW',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
}

export enum GroupRoleType {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  MEMBER = 'MEMBER',
}

export enum AttachmentType {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  ARCHIVE = 'ARCHIVE',
  OTHER = 'OTHER',
}

export enum ReportReason {
  SPAM = 'SPAM',
  HARASSMENT = 'HARASSMENT',
  INAPPROPRIATE = 'INAPPROPRIATE',
  MISINFORMATION = 'MISINFORMATION',
  OTHER = 'OTHER',
}

export enum ModerationAction {
  WARNING = 'WARNING',
  MUTED = 'MUTED',
  BLOCKED = 'BLOCKED',
  REMOVED = 'REMOVED',
  BANNED = 'BANNED',
}

export interface Conversation {
  id: string;
  schoolId: string;
  type: ConversationType;
  title: string;
  description?: string;
  avatarUrl?: string;
  isArchived: boolean;
  isPinned: boolean;
  isMuted: boolean;
  lastMessageAt?: string;
  lastMessagePreview?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationMember {
  id: string;
  conversationId: string;
  userId: string;
  role: GroupRole;
  isMuted: boolean;
  lastReadAt?: string;
  joinedAt: string;
  leftAt?: string;
}

export interface HrMessage {
  id: string;
  schoolId: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: MessageType;
  status: MessageStatus;
  replyToId?: string;
  isEdited: boolean;
  isDeleted: boolean;
  isPinned: boolean;
  isForwarded: boolean;
  forwardedFromId?: string;
  attachments: Attachment[];
  reactions: Reaction[];
  readBy: MessageRead[];
  createdAt: string;
  updatedAt: string;
}

export interface MessageRead {
  id: string;
  messageId: string;
  userId: string;
  readAt: string;
}

export interface Reaction {
  id: string;
  messageId: string;
  userId: string;
  type: ReactionType;
  createdAt: string;
}

export interface Attachment {
  id: string;
  messageId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  thumbnailUrl?: string;
  mimeType: string;
  type: AttachmentType;
  uploadedBy: string;
  createdAt: string;
}

export interface HrNotification {
  id: string;
  schoolId: string;
  userId: string;
  type: HrNotificationTypeEnum;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  isDeleted: boolean;
  channels: NotificationChannel[];
  sentAt: string;
  readAt?: string;
  createdAt: string;
}

export interface NotificationPreference {
  id: string;
  userId: string;
  schoolId: string;
  channel: NotificationChannel;
  type: HrNotificationTypeEnum;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  schoolId: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  type: ConversationType;
  createdBy: string;
  isArchived: boolean;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: GroupRole;
  joinedAt: string;
  leftAt?: string;
}

export interface HrAnnouncement {
  id: string;
  schoolId: string;
  title: string;
  content: string;
  type: HrNotificationTypeEnum;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  targetAudience: BroadcastScope;
  targetIds: string[];
  attachments: Attachment[];
  publishedBy: string;
  publishedAt?: string;
  expiresAt?: string;
  isPublished: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Broadcast {
  id: string;
  schoolId: string;
  title: string;
  content: string;
  scope: BroadcastScope;
  targetIds: string[];
  channels: NotificationChannel[];
  attachments: Attachment[];
  sentBy: string;
  sentAt?: string;
  isScheduled: boolean;
  scheduledAt?: string;
  recipientCount: number;
  deliveredCount: number;
  readCount: number;
  status: 'DRAFT' | 'SCHEDULED' | 'SENT' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

export interface MessageSearch {
  query: string;
  conversationId?: string;
  senderId?: string;
  type?: MessageType;
  dateFrom?: string;
  dateTo?: string;
  hasAttachment?: boolean;
  limit?: number;
  offset?: number;
}

export interface MessageFilters {
  conversationId?: string;
  senderId?: string;
  type?: MessageType;
  status?: MessageStatus;
  dateFrom?: string;
  dateTo?: string;
  hasAttachment?: boolean;
  isArchived?: boolean;
  isPinned?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface NotificationSettings {
  userId: string;
  schoolId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
  whatsappEnabled: boolean;
  messageNotifications: boolean;
  announcementNotifications: boolean;
  broadcastNotifications: boolean;
  mentionNotifications: boolean;
  reactionNotifications: boolean;
  systemNotifications: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConversationRequest {
  type: ConversationType;
  title: string;
  description?: string;
  memberIds: string[];
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  type?: MessageType;
  replyToId?: string;
  attachmentIds?: string[];
}

export interface EditMessageRequest {
  content: string;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  type: ConversationType;
  memberIds: string[];
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  type: HrNotificationTypeEnum;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  targetAudience: BroadcastScope;
  targetIds?: string[];
  attachmentIds?: string[];
  scheduledAt?: string;
  expiresAt?: string;
}

export interface CreateBroadcastRequest {
  title: string;
  content: string;
  scope: BroadcastScope;
  targetIds?: string[];
  channels: NotificationChannel[];
  attachmentIds?: string[];
  scheduledAt?: string;
}

export interface MessageStatistics {
  totalMessages: number;
  messagesByType: Record<string, number>;
  messagesByDay: Array<{ date: string; count: number }>;
  activeConversations: number;
  activeUsers: number;
  averageMessagesPerDay: number;
  topSenders: Array<{ userId: string; count: number }>;
}

export interface CommunicationDashboard {
  totalConversations: number;
  activeConversations: number;
  totalMessages: number;
  unreadMessages: number;
  totalNotifications: number;
  unreadNotifications: number;
  totalAnnouncements: number;
  totalBroadcasts: number;
  activeUsers: number;
  recentMessages: Message[];
  recentAnnouncements: Announcement[];
}

export interface MessageAudit {
  id: string;
  schoolId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  previousValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface MessageRepository {
  findConversation(id: string): Promise<Conversation | null>;
  findAllConversations(schoolId: string, filters?: MessageFilters): Promise<{ data: Conversation[]; total: number }>;
  createConversation(data: CreateConversationRequest, schoolId: string): Promise<Conversation>;
  updateConversation(id: string, data: Partial<Conversation>): Promise<Conversation>;
  deleteConversation(id: string): Promise<void>;
  archiveConversation(id: string): Promise<Conversation>;
  restoreConversation(id: string): Promise<Conversation>;
  pinConversation(id: string): Promise<Conversation>;
  muteConversation(id: string, muted: boolean): Promise<Conversation>;
  findConversationMembers(conversationId: string): Promise<ConversationMember[]>;
  addConversationMember(conversationId: string, userId: string, role?: GroupRole): Promise<ConversationMember>;
  removeConversationMember(conversationId: string, userId: string): Promise<void>;
  updateMemberRole(conversationId: string, userId: string, role: GroupRole): Promise<ConversationMember>;
  muteMember(conversationId: string, userId: string, muted: boolean): Promise<ConversationMember>;
  updateLastRead(conversationId: string, userId: string): Promise<void>;
  findMessage(id: string): Promise<Message | null>;
  findMessages(conversationId: string, filters?: MessageFilters): Promise<{ data: Message[]; total: number }>;
  createMessage(data: SendMessageRequest, senderId: string, schoolId: string): Promise<Message>;
  updateMessage(id: string, data: EditMessageRequest): Promise<Message>;
  deleteMessage(id: string): Promise<void>;
  softDeleteMessage(id: string): Promise<Message>;
  pinMessage(id: string): Promise<Message>;
  forwardMessage(id: string, targetConversationIds: string[], userId: string): Promise<Message[]>;
  searchMessages(schoolId: string, search: MessageSearch): Promise<{ data: Message[]; total: number }>;
  findMessageReactions(messageId: string): Promise<Reaction[]>;
  addReaction(messageId: string, userId: string, type: ReactionType): Promise<Reaction>;
  removeReaction(messageId: string, userId: string): Promise<void>;
  markAsRead(messageId: string, userId: string): Promise<MessageRead>;
  markConversationAsRead(conversationId: string, userId: string): Promise<void>;
  getUnreadCount(conversationId: string, userId: string): Promise<number>;
  getTotalUnreadCount(userId: string, schoolId: string): Promise<number>;
  findAttachment(id: string): Promise<Attachment | null>;
  createAttachment(data: { messageId: string; fileName: string; fileType: string; fileSize: number; fileUrl: string; mimeType: string; type: AttachmentType; uploadedBy: string }): Promise<Attachment>;
  deleteAttachment(id: string): Promise<void>;
  getAttachments(messageId: string): Promise<Attachment[]>;
  findNotification(id: string): Promise<Notification | null>;
  findNotifications(userId: string, schoolId: string, filters?: MessageFilters): Promise<{ data: Notification[]; total: number }>;
  createNotification(data: { userId: string; schoolId: string; type: HrNotificationTypeEnum; title: string; body: string; data?: Record<string, unknown>; channels?: NotificationChannel[] }): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<Notification>;
  markAllNotificationsAsRead(userId: string, schoolId: string): Promise<void>;
  deleteNotification(id: string): Promise<void>;
  deleteAllNotifications(userId: string, schoolId: string): Promise<void>;
  findNotificationPreferences(userId: string, schoolId: string): Promise<NotificationPreference[]>;
  updateNotificationPreference(userId: string, schoolId: string, channel: NotificationChannel, type: HrNotificationTypeEnum, isEnabled: boolean): Promise<NotificationPreference>;
  findNotificationSettings(userId: string, schoolId: string): Promise<NotificationSettings | null>;
  updateNotificationSettings(userId: string, schoolId: string, data: Partial<NotificationSettings>): Promise<NotificationSettings>;
  findGroup(id: string): Promise<Group | null>;
  findAllGroups(schoolId: string, filters?: MessageFilters): Promise<{ data: Group[]; total: number }>;
  createGroup(data: CreateGroupRequest, schoolId: string, createdBy: string): Promise<Group>;
  updateGroup(id: string, data: Partial<Group>): Promise<Group>;
  deleteGroup(id: string): Promise<void>;
  archiveGroup(id: string): Promise<Group>;
  findGroupMembers(groupId: string): Promise<GroupMember[]>;
  addGroupMember(groupId: string, userId: string, role?: GroupRole): Promise<GroupMember>;
  removeGroupMember(groupId: string, userId: string): Promise<void>;
  findAnnouncement(id: string): Promise<Announcement | null>;
  findAnnouncements(schoolId: string, filters?: MessageFilters): Promise<{ data: Announcement[]; total: number }>;
  createAnnouncement(data: CreateAnnouncementRequest, schoolId: string, publishedBy: string): Promise<Announcement>;
  updateAnnouncement(id: string, data: Partial<Announcement>): Promise<Announcement>;
  deleteAnnouncement(id: string): Promise<void>;
  publishAnnouncement(id: string): Promise<Announcement>;
  incrementViewCount(id: string): Promise<void>;
  findBroadcast(id: string): Promise<Broadcast | null>;
  findBroadcasts(schoolId: string, filters?: MessageFilters): Promise<{ data: Broadcast[]; total: number }>;
  createBroadcast(data: CreateBroadcastRequest, schoolId: string, sentBy: string): Promise<Broadcast>;
  updateBroadcast(id: string, data: Partial<Broadcast>): Promise<Broadcast>;
  deleteBroadcast(id: string): Promise<void>;
  sendBroadcast(id: string): Promise<Broadcast>;
  scheduleBroadcast(id: string, scheduledAt: string): Promise<Broadcast>;
  getMessageStatistics(schoolId: string, filters?: MessageFilters): Promise<MessageStatistics>;
  getDashboard(schoolId: string): Promise<CommunicationDashboard>;
  logAudit(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>): Promise<void>;
  getAuditLog(schoolId: string, filters?: MessageFilters): Promise<MessageAudit[]>;
}

export enum HrPaymentStatusEnumEnum {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  PARTIAL = 'PARTIAL',
  OVERDUE = 'OVERDUE',
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  SENT = 'SENT',
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
  VOID = 'VOID',
}

export enum InvoiceType {
  TUITION = 'TUITION',
  REGISTRATION = 'REGISTRATION',
  EXAM = 'EXAM',
  TRANSPORT = 'TRANSPORT',
  MEALS = 'MEALS',
  UNIFORM = 'UNIFORM',
  BOOKS = 'BOOKS',
  ACTIVITIES = 'ACTIVITIES',
  DORMITORY = 'DORMITORY',
  LABORATORY = 'LABORATORY',
  TECHNOLOGY = 'TECHNOLOGY',
  INSURANCE = 'INSURANCE',
  OTHER = 'OTHER',
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
  REFUND = 'REFUND',
  ADJUSTMENT = 'ADJUSTMENT',
}

export enum ExpenseCategory {
  SALARIES = 'SALARIES',
  UTILITIES = 'UTILITIES',
  MAINTENANCE = 'MAINTENANCE',
  SUPPLIES = 'SUPPLIES',
  TRANSPORT = 'TRANSPORT',
  FOOD = 'FOOD',
  TECHNOLOGY = 'TECHNOLOGY',
  MARKETING = 'MARKETING',
  INSURANCE = 'INSURANCE',
  TAXES = 'TAXES',
  TRAINING = 'TRAINING',
  EQUIPMENT = 'EQUIPMENT',
  FURNITURE = 'FURNITURE',
  CLEANING = 'CLEANING',
  SECURITY = 'SECURITY',
  OTHER = 'OTHER',
}

export enum RevenueCategory {
  TUITION = 'TUITION',
  REGISTRATION = 'REGISTRATION',
  EXAM = 'EXAM',
  TRANSPORT = 'TRANSPORT',
  MEALS = 'MEALS',
  UNIFORM = 'UNIFORM',
  BOOKS = 'BOOKS',
  ACTIVITIES = 'ACTIVITIES',
  DORMITORY = 'DORMITORY',
  DONATIONS = 'DONATIONS',
  GRANTS = 'GRANTS',
  INVESTMENTS = 'INVESTMENTS',
  OTHER = 'OTHER',
}

export enum HrPaymentMethodEnumEnum {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_MONEY = 'MOBILE_MONEY',
  CARD = 'CARD',
  CHECK = 'CHECK',
  ONLINE = 'ONLINE',
  OTHER = 'OTHER',
}

export enum Currency {
  XOF = 'XOF',
  EUR = 'EUR',
  USD = 'USD',
}

export enum CashRegisterStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  BALANCED = 'BALANCED',
  DISCREPANCY = 'DISCREPANCY',
}

export enum AccountingEntryType {
  JOURNAL = 'JOURNAL',
  PURCHASE = 'PURCHASE',
  SALE = 'SALE',
  RECEIPT = 'RECEIPT',
  PAYMENT = 'PAYMENT',
  GENERAL = 'GENERAL',
}

export enum BudgetStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED',
  EXCEEDED = 'EXCEEDED',
}

export enum ScholarshipType {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  MERIT = 'MERIT',
  NEED_BASED = 'NEED_BASED',
  ATHLETIC = 'ATHLETIC',
  SIBLING = 'SIBLING',
}

export enum DiscountType {
  EARLY_PAYMENT = 'EARLY_PAYMENT',
  SIBLING = 'SIBLING',
  STAFF = 'STAFF',
  SCHOLARSHIP = 'SCHOLARSHIP',
  LOYALTY = 'LOYALTY',
  CUSTOM = 'CUSTOM',
}

export enum InstallmentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

export enum RefundStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PROCESSED = 'PROCESSED',
  REJECTED = 'REJECTED',
}

export enum ReceiptStatus {
  PENDING = 'PENDING',
  GENERATED = 'GENERATED',
  SENT = 'SENT',
  DOWNLOADED = 'DOWNLOADED',
}

export enum TaxType {
  VAT = 'VAT',
  SERVICE = 'SERVICE',
  WITHHOLDING = 'WITHHOLDING',
  OTHER = 'OTHER',
}

export enum FinanceNotificationType {
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  INVOICE_CREATED = 'INVOICE_CREATED',
  INVOICE_OVERDUE = 'INVOICE_OVERDUE',
  PAYMENT_REMINDER = 'PAYMENT_REMINDER',
  REFUND_PROCESSED = 'REFUND_PROCESSED',
  BUDGET_EXCEEDED = 'BUDGET_EXCEEDED',
  RECEIPT_READY = 'RECEIPT_READY',
  SALARY_PROCESSED = 'SALARY_PROCESSED',
  REPORT_READY = 'REPORT_READY',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
}

export interface HrInvoice {
  id: string;
  schoolId: string;
  invoiceNumber: string;
  studentId: string;
  parentId?: string;
  type: InvoiceType;
  status: InvoiceStatus;
  amount: number;
  discount: number;
  tax: number;
  totalAmount: number;
  currency: Currency;
  dueDate: string;
  paidAt?: string;
  description?: string;
  notes?: string;
  items: InvoiceItem[];
  payments: Payment[];
  receipt?: Receipt;
  installmentPlan?: InstallmentPlan;
  isRecurring: boolean;
  recurringInterval?: string;
  templateId?: string;
  qrCode?: string;
  pdfUrl?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  category: InvoiceType;
}

export interface InvoiceTemplate {
  id: string;
  schoolId: string;
  name: string;
  description?: string;
  type: InvoiceType;
  items: Array<{ description: string; amount: number; category: InvoiceType }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HrPayment {
  id: string;
  schoolId: string;
  paymentNumber: string;
  invoiceId: string;
  studentId: string;
  amount: number;
  currency: Currency;
  method: HrPaymentMethodEnum;
  status: HrPaymentStatusEnum;
  reference?: string;
  transactionId?: string;
  gatewayResponse?: Record<string, unknown>;
  notes?: string;
  receivedBy: string;
  receivedAt: string;
  confirmedAt?: string;
  confirmedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentHistory {
  id: string;
  paymentId: string;
  action: string;
  previousStatus?: HrPaymentStatusEnum;
  newStatus?: HrPaymentStatusEnum;
  notes?: string;
  performedBy: string;
  performedAt: string;
}

export interface PaymentAttempt {
  id: string;
  paymentId: string;
  status: HrPaymentStatusEnum;
  gatewayResponse?: Record<string, unknown>;
  error?: string;
  attemptedAt: string;
}

export interface PaymentMethodConfig {
  id: string;
  schoolId: string;
  method: HrPaymentMethodEnum;
  isEnabled: boolean;
  config: Record<string, unknown>;
  fees: number;
  feeType: 'FIXED' | 'PERCENTAGE';
  createdAt: string;
  updatedAt: string;
}

export interface Receipt {
  id: string;
  schoolId: string;
  receiptNumber: string;
  paymentId: string;
  invoiceId: string;
  studentId: string;
  amount: number;
  currency: Currency;
  status: ReceiptStatus;
  pdfUrl?: string;
  qrCode?: string;
  issuedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReceiptTemplate {
  id: string;
  schoolId: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  schoolId: string;
  type: TransactionType;
  category: string;
  amount: number;
  currency: Currency;
  description?: string;
  reference?: string;
  paymentId?: string;
  expenseId?: string;
  revenueId?: string;
  journalEntryId?: string;
  date: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: string;
  schoolId: string;
  expenseNumber: string;
  category: ExpenseCategory;
  amount: number;
  currency: Currency;
  description: string;
  vendor?: string;
  receiptUrl?: string;
  receiptNumber?: string;
  approvedBy?: string;
  approvedAt?: string;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'PAID' | 'CANCELLED';
  paymentMethod?: HrPaymentMethodEnum;
  paymentDate?: string;
  reference?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Revenue {
  id: string;
  schoolId: string;
  revenueNumber: string;
  category: RevenueCategory;
  amount: number;
  currency: Currency;
  description: string;
  source?: string;
  studentId?: string;
  invoiceId?: string;
  paymentId?: string;
  date: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CashRegister {
  id: string;
  schoolId: string;
  name: string;
  status: CashRegisterStatus;
  openingBalance: number;
  currentBalance: number;
  closingBalance?: number;
  expectedBalance?: number;
  discrepancy?: number;
  openedBy: string;
  openedAt: string;
  closedBy?: string;
  closedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CashRegisterMovement {
  id: string;
  cashRegisterId: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  amount: number;
  description: string;
  reference?: string;
  paymentId?: string;
  expenseId?: string;
  performedBy: string;
  performedAt: string;
}

export interface AccountingEntry {
  id: string;
  schoolId: string;
  entryNumber: string;
  type: AccountingEntryType;
  date: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  currency: Currency;
  reference?: string;
  journalId?: string;
  isBalanced: boolean;
  isPosted: boolean;
  postedAt?: string;
  postedBy?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountingJournal {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  description?: string;
  type: AccountingEntryType;
  isActive: boolean;
  entryCount: number;
  totalDebit: number;
  totalCredit: number;
  createdAt: string;
  updatedAt: string;
}

export interface AccountingAccount {
  id: string;
  schoolId: string;
  code: string;
  name: string;
  description?: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  parentAccount?: string;
  isActive: boolean;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  schoolId: string;
  name: string;
  description?: string;
  academicYearId: string;
  status: BudgetStatus;
  totalAmount: number;
  spentAmount: number;
  remainingAmount: number;
  utilizationRate: number;
  startDate: string;
  endDate: string;
  items: BudgetItem[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetItem {
  id: string;
  budgetId: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  utilizationRate: number;
  notes?: string;
}

export interface BudgetExecution {
  id: string;
  budgetId: string;
  budgetItemId: string;
  amount: number;
  description: string;
  reference?: string;
  executedAt: string;
  executedBy: string;
}

export interface Discount {
  id: string;
  schoolId: string;
  name: string;
  type: DiscountType;
  value: number;
  valueType: 'FIXED' | 'PERCENTAGE';
  maxAmount?: number;
  minInvoiceAmount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  applicableTo: InvoiceType[];
  conditions?: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Scholarship {
  id: string;
  studentId: string;
  name: string;
  type: ScholarshipType;
  value: number;
  valueType: 'FIXED' | 'PERCENTAGE';
  maxAmount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  conditions?: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface InstallmentPlan {
  id: string;
  schoolId: string;
  invoiceId: string;
  studentId: string;
  totalAmount: number;
  numberOfInstallments: number;
  frequency: 'MONTHLY' | 'QUARTERLY' | 'CUSTOM';
  startDate: string;
  installments: Installment[];
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Installment {
  id: string;
  planId: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  status: InstallmentStatus;
  paidAt?: string;
  paymentId?: string;
  lateFee?: number;
}

export interface Refund {
  id: string;
  schoolId: string;
  refundNumber: string;
  paymentId: string;
  invoiceId: string;
  studentId: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  processedAt?: string;
  processedBy?: string;
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface LateFee {
  id: string;
  schoolId: string;
  invoiceId: string;
  studentId: string;
  amount: number;
  rate: number;
  daysOverdue: number;
  appliedAt: string;
  appliedBy: string;
  isWaived: boolean;
  waivedBy?: string;
  waivedAt?: string;
}

export interface FinancialReport {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  period: string;
  startDate: string;
  endDate: string;
  data: Record<string, unknown>;
  pdfUrl?: string;
  generatedAt: string;
  generatedBy: string;
  createdAt: string;
}

export interface IncomeStatement {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  revenueByCategory: Array<{ category: string; amount: number; percentage: number }>;
  expensesByCategory: Array<{ category: string; amount: number; percentage: number }>;
  period: string;
}

export interface BalanceSheet {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  assets: Array<{ account: string; amount: number }>;
  liabilities: Array<{ account: string; amount: number }>;
  equity: Array<{ account: string; amount: number }>;
  asOf: string;
}

export interface CashFlow {
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  netCashFlow: number;
  beginningCash: number;
  endingCash: number;
  period: string;
}

export interface ProfitLoss {
  revenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  operatingExpenses: number;
  operatingIncome: number;
  otherIncome: number;
  otherExpenses: number;
  netIncome: number;
  period: string;
}

export interface FinanceStatistics {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  collectionRate: number;
  outstandingAmount: number;
  paidAmount: number;
  averagePaymentTime: number;
  revenueByMonth: Array<{ month: string; amount: number }>;
  expensesByMonth: Array<{ month: string; amount: number }>;
  paymentsByMethod: Array<{ method: string; count: number; amount: number }>;
  topRevenueCategories: Array<{ category: string; amount: number }>;
  topExpenseCategories: Array<{ category: string; amount: number }>;
}

export interface FinanceAnalytics {
  revenueGrowth: number;
  expenseGrowth: number;
  profitMargin: number;
  collectionEfficiency: number;
  averageInvoiceAmount: number;
  averagePaymentDelay: number;
  overdueRate: number;
  refundRate: number;
  trends: Array<{ period: string; revenue: number; expenses: number; profit: number }>;
  predictions: Array<{ period: string; predictedRevenue: number; predictedExpenses: number }>;
}

export interface FinanceTimeline {
  events: Array<{ id: string; type: string; description: string; amount?: number; date: string; userId: string }>;
}

export interface FinanceAudit {
  id: string;
  schoolId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  previousValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface FinanceNotification {
  id: string;
  schoolId: string;
  userId: string;
  type: FinanceNotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}

export interface FinanceSettings {
  id: string;
  schoolId: string;
  currency: Currency;
  taxRate: number;
  lateFeeRate: number;
  lateFeeMaxAmount: number;
  invoicePrefix: string;
  receiptPrefix: string;
  paymentPrefix: string;
  autoGenerateReceipt: boolean;
  enableInstallments: boolean;
  maxInstallments: number;
  reminderDaysBefore: number;
  overdueReminderDays: number;
  fiscalYearStart: string;
  createdAt: string;
  updatedAt: string;
}

export interface CurrencyRate {
  from: Currency;
  to: Currency;
  rate: number;
  updatedAt: string;
}

export interface PaymentReminder {
  id: string;
  invoiceId: string;
  studentId: string;
  type: 'BEFORE_DUE' | 'ON_DUE' | 'AFTER_DUE';
  sentAt: string;
  channel: string;
}

export interface Debt {
  studentId: string;
  totalDebt: number;
  currency: Currency;
  invoices: Array<{ invoiceId: string; amount: number; dueDate: string; daysOverdue: number }>;
  lastReminderAt?: string;
}

export interface StudentBalance {
  studentId: string;
  totalPaid: number;
  totalDue: number;
  balance: number;
  currency: Currency;
  lastPaymentAt?: string;
}

export interface ParentStatement {
  parentId: string;
  students: Array<{ studentId: string; studentName: string; totalPaid: number; totalDue: number; balance: number }>;
  totalPaid: number;
  totalDue: number;
  balance: number;
  period: string;
}

export interface TeacherSalary {
  id: string;
  schoolId: string;
  teacherId: string;
  month: string;
  year: number;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'PENDING' | 'PROCESSED' | 'PAID';
  processedAt?: string;
  paidAt?: string;
  createdAt: string;
}

export interface Payroll {
  id: string;
  schoolId: string;
  name: string;
  month: string;
  year: number;
  totalAmount: number;
  totalTeachers: number;
  status: 'DRAFT' | 'PROCESSING' | 'COMPLETED' | 'PAID';
  items: PayrollItem[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollItem {
  id: string;
  payrollId: string;
  teacherId: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'PENDING' | 'PROCESSED' | 'PAID';
}

export interface Tax {
  id: string;
  schoolId: string;
  name: string;
  type: TaxType;
  rate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaxRule {
  id: string;
  schoolId: string;
  taxId: string;
  category: string;
  minAmount: number;
  maxAmount?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Voucher {
  id: string;
  schoolId: string;
  voucherNumber: string;
  type: 'DISCOUNT' | 'CREDIT' | 'REFUND';
  amount: number;
  currency: Currency;
  studentId?: string;
  description: string;
  isUsed: boolean;
  usedAt?: string;
  usedBy?: string;
  expiresAt: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface VoucherItem {
  id: string;
  voucherId: string;
  description: string;
  amount: number;
}

export interface InvoiceSearch {
  query?: string;
  studentId?: string;
  type?: InvoiceType;
  status?: InvoiceStatus;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  limit?: number;
  offset?: number;
}

export interface InvoiceFilters {
  studentId?: string;
  type?: InvoiceType;
  status?: InvoiceStatus;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  isOverdue?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaymentFilters {
  studentId?: string;
  invoiceId?: string;
  method?: HrPaymentMethodEnum;
  status?: HrPaymentStatusEnum;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ExpenseFilters {
  category?: ExpenseCategory;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface RevenueFilters {
  category?: RevenueCategory;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FinancialKPIs {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  profitMargin: number;
  collectionRate: number;
  outstandingAmount: number;
  overdueAmount: number;
  averagePaymentTime: number;
  revenuePerStudent: number;
  expensePerStudent: number;
}

export interface FinanceDashboard {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  outstandingAmount: number;
  overdueAmount: number;
  collectionRate: number;
  recentPayments: Payment[];
  recentExpenses: Expense[];
  topRevenueCategories: Array<{ category: string; amount: number }>;
  topExpenseCategories: Array<{ category: string; amount: number }>;
  monthlyTrend: Array<{ month: string; revenue: number; expenses: number }>;
}

export interface FinanceRepository {
  // Invoices
  findInvoice(id: string): Promise<Invoice | null>;
  findAllInvoices(schoolId: string, filters?: InvoiceFilters): Promise<{ data: Invoice[]; total: number }>;
  createInvoice(data: Record<string, unknown>, schoolId: string): Promise<Invoice>;
  updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice>;
  deleteInvoice(id: string): Promise<void>;
  cancelInvoice(id: string): Promise<Invoice>;
  sendInvoice(id: string): Promise<Invoice>;
  voidInvoice(id: string): Promise<Invoice>;

  // Invoice Items
  findInvoiceItems(invoiceId: string): Promise<InvoiceItem[]>;
  createInvoiceItem(data: Record<string, unknown>): Promise<InvoiceItem>;
  updateInvoiceItem(id: string, data: Partial<InvoiceItem>): Promise<InvoiceItem>;
  deleteInvoiceItem(id: string): Promise<void>;

  // Invoice Templates
  findInvoiceTemplate(id: string): Promise<InvoiceTemplate | null>;
  findAllInvoiceTemplates(schoolId: string): Promise<InvoiceTemplate[]>;
  createInvoiceTemplate(data: Record<string, unknown>, schoolId: string): Promise<InvoiceTemplate>;
  updateInvoiceTemplate(id: string, data: Partial<InvoiceTemplate>): Promise<InvoiceTemplate>;
  deleteInvoiceTemplate(id: string): Promise<void>;

  // Payments
  findPayment(id: string): Promise<Payment | null>;
  findAllPayments(schoolId: string, filters?: PaymentFilters): Promise<{ data: Payment[]; total: number }>;
  createPayment(data: Record<string, unknown>, schoolId: string): Promise<Payment>;
  updatePayment(id: string, data: Partial<Payment>): Promise<Payment>;
  deletePayment(id: string): Promise<void>;
  confirmPayment(id: string, confirmedBy: string): Promise<Payment>;
  cancelPayment(id: string): Promise<Payment>;
  processBulkPayments(payments: Array<Record<string, unknown>>, schoolId: string): Promise<Payment[]>;
  verifyPayment(id: string): Promise<Payment>;

  // Payment History
  findPaymentHistory(paymentId: string): Promise<PaymentHistory[]>;
  createPaymentHistory(data: Record<string, unknown>): Promise<PaymentHistory>;

  // Payment Attempts
  findPaymentAttempts(paymentId: string): Promise<PaymentAttempt[]>;
  createPaymentAttempt(data: Record<string, unknown>): Promise<PaymentAttempt>;

  // Payment Method Configs
  findPaymentMethodConfigs(schoolId: string): Promise<PaymentMethodConfig[]>;
  updatePaymentMethodConfig(id: string, data: Partial<PaymentMethodConfig>): Promise<PaymentMethodConfig>;

  // Receipts
  findReceipt(id: string): Promise<Receipt | null>;
  findAllReceipts(schoolId: string, filters?: InvoiceFilters): Promise<{ data: Receipt[]; total: number }>;
  createReceipt(data: Record<string, unknown>, schoolId: string): Promise<Receipt>;
  updateReceipt(id: string, data: Partial<Receipt>): Promise<Receipt>;
  deleteReceipt(id: string): Promise<void>;
  generateReceipt(paymentId: string): Promise<Receipt>;
  sendReceipt(id: string): Promise<Receipt>;

  // Receipt Templates
  findReceiptTemplate(id: string): Promise<ReceiptTemplate | null>;
  findAllReceiptTemplates(schoolId: string): Promise<ReceiptTemplate[]>;

  // Transactions
  findTransaction(id: string): Promise<Transaction | null>;
  findAllTransactions(schoolId: string, filters?: InvoiceFilters): Promise<{ data: Transaction[]; total: number }>;
  createTransaction(data: Record<string, unknown>, schoolId: string): Promise<Transaction>;

  // Expenses
  findExpense(id: string): Promise<Expense | null>;
  findAllExpenses(schoolId: string, filters?: ExpenseFilters): Promise<{ data: Expense[]; total: number }>;
  createExpense(data: Record<string, unknown>, schoolId: string): Promise<Expense>;
  updateExpense(id: string, data: Partial<Expense>): Promise<Expense>;
  deleteExpense(id: string): Promise<void>;
  approveExpense(id: string, approvedBy: string): Promise<Expense>;
  cancelExpense(id: string): Promise<Expense>;

  // Revenue
  findRevenue(id: string): Promise<Revenue | null>;
  findAllRevenues(schoolId: string, filters?: RevenueFilters): Promise<{ data: Revenue[]; total: number }>;
  createRevenue(data: Record<string, unknown>, schoolId: string): Promise<Revenue>;

  // Cash Register
  findCashRegister(id: string): Promise<CashRegister | null>;
  findAllCashRegisters(schoolId: string): Promise<CashRegister[]>;
  createCashRegister(data: Record<string, unknown>, schoolId: string): Promise<CashRegister>;
  openCashRegister(id: string, openedBy: string): Promise<CashRegister>;
  closeCashRegister(id: string, closingBalance: number, closedBy: string): Promise<CashRegister>;
  findCashRegisterMovements(cashRegisterId: string): Promise<CashRegisterMovement[]>;
  createCashRegisterMovement(data: Record<string, unknown>): Promise<CashRegisterMovement>;

  // Accounting
  findAccountingEntry(id: string): Promise<AccountingEntry | null>;
  findAllAccountingEntries(schoolId: string, filters?: InvoiceFilters): Promise<{ data: AccountingEntry[]; total: number }>;
  createAccountingEntry(data: Record<string, unknown>, schoolId: string): Promise<AccountingEntry>;
  postAccountingEntry(id: string, postedBy: string): Promise<AccountingEntry>;
  lockAccountingEntry(id: string): Promise<AccountingEntry>;

  // Journals
  findJournal(id: string): Promise<AccountingJournal | null>;
  findAllJournals(schoolId: string): Promise<AccountingJournal[]>;
  createJournal(data: Record<string, unknown>, schoolId: string): Promise<AccountingJournal>;
  updateJournal(id: string, data: Partial<AccountingJournal>): Promise<AccountingJournal>;

  // Accounts
  findAccount(id: string): Promise<AccountingAccount | null>;
  findAllAccounts(schoolId: string): Promise<AccountingAccount[]>;
  createAccount(data: Record<string, unknown>, schoolId: string): Promise<AccountingAccount>;
  updateAccount(id: string, data: Partial<AccountingAccount>): Promise<AccountingAccount>;

  // Budgets
  findBudget(id: string): Promise<Budget | null>;
  findAllBudgets(schoolId: string): Promise<Budget[]>;
  createBudget(data: Record<string, unknown>, schoolId: string): Promise<Budget>;
  updateBudget(id: string, data: Partial<Budget>): Promise<Budget>;
  deleteBudget(id: string): Promise<void>;
  executeBudgetItem(budgetId: string, data: Record<string, unknown>): Promise<BudgetExecution>;
  findBudgetItems(budgetId: string): Promise<BudgetItem[]>;

  // Discounts
  findDiscount(id: string): Promise<Discount | null>;
  findAllDiscounts(schoolId: string): Promise<Discount[]>;
  createDiscount(data: Record<string, unknown>, schoolId: string): Promise<Discount>;
  updateDiscount(id: string, data: Partial<Discount>): Promise<Discount>;
  deleteDiscount(id: string): Promise<void>;

  // Scholarships
  findScholarship(id: string): Promise<Scholarship | null>;
  findAllScholarships(schoolId: string): Promise<Scholarship[]>;
  createScholarship(data: Record<string, unknown>, schoolId: string): Promise<Scholarship>;
  updateScholarship(id: string, data: Partial<Scholarship>): Promise<Scholarship>;
  deleteScholarship(id: string): Promise<void>;

  // Installment Plans
  findInstallmentPlan(id: string): Promise<InstallmentPlan | null>;
  findAllInstallmentPlans(schoolId: string): Promise<InstallmentPlan[]>;
  createInstallmentPlan(data: Record<string, unknown>, schoolId: string): Promise<InstallmentPlan>;
  updateInstallmentPlan(id: string, data: Partial<InstallmentPlan>): Promise<InstallmentPlan>;

  // Refunds
  findRefund(id: string): Promise<Refund | null>;
  findAllRefunds(schoolId: string, filters?: PaymentFilters): Promise<{ data: Refund[]; total: number }>;
  createRefund(data: Record<string, unknown>, schoolId: string): Promise<Refund>;
  approveRefund(id: string, approvedBy: string): Promise<Refund>;
  processRefund(id: string, processedBy: string): Promise<Refund>;
  rejectRefund(id: string): Promise<Refund>;

  // Late Fees
  findLateFees(schoolId: string, filters?: InvoiceFilters): Promise<LateFee[]>;
  applyLateFee(invoiceId: string, data: Record<string, unknown>): Promise<LateFee>;
  waiveLateFee(id: string, waivedBy: string): Promise<LateFee>;

  // Reports
  generateIncomeStatement(schoolId: string, startDate: string, endDate: string): Promise<IncomeStatement>;
  generateBalanceSheet(schoolId: string, asOf: string): Promise<BalanceSheet>;
  generateCashFlow(schoolId: string, startDate: string, endDate: string): Promise<CashFlow>;
  generateProfitLoss(schoolId: string, startDate: string, endDate: string): Promise<ProfitLoss>;
  generateFinancialReport(schoolId: string, type: string, startDate: string, endDate: string): Promise<FinancialReport>;

  // Statistics & Analytics
  getFinanceStatistics(schoolId: string, filters?: InvoiceFilters): Promise<FinanceStatistics>;
  getFinanceAnalytics(schoolId: string, filters?: InvoiceFilters): Promise<FinanceAnalytics>;
  getFinanceKPIs(schoolId: string): Promise<FinancialKPIs>;

  // Dashboard
  getDashboard(schoolId: string): Promise<FinanceDashboard>;

  // Student/Parent
  getStudentBalance(studentId: string): Promise<StudentBalance>;
  getParentStatement(parentId: string, startDate: string, endDate: string): Promise<ParentStatement>;

  // Debts
  getDebts(schoolId: string): Promise<Debt[]>;
  getStudentDebt(studentId: string): Promise<Debt>;

  // Search
  searchInvoices(schoolId: string, search: InvoiceSearch): Promise<{ data: Invoice[]; total: number }>;

  // Notifications
  findNotifications(userId: string, schoolId: string): Promise<FinanceNotification[]>;
  createNotification(data: Record<string, unknown>): Promise<FinanceNotification>;
  markNotificationAsRead(id: string): Promise<FinanceNotification>;

  // Settings
  findSettings(schoolId: string): Promise<FinanceSettings | null>;
  updateSettings(schoolId: string, data: Partial<FinanceSettings>): Promise<FinanceSettings>;

  // Timeline
  getTimeline(schoolId: string, filters?: InvoiceFilters): Promise<FinanceTimeline>;

  // Audit
  logAudit(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>): Promise<void>;
  getAuditLog(schoolId: string, filters?: InvoiceFilters): Promise<FinanceAudit[]>;

  // Export
  exportInvoices(schoolId: string, format: string, filters?: InvoiceFilters): Promise<Record<string, unknown>>;
  exportPayments(schoolId: string, format: string, filters?: PaymentFilters): Promise<Record<string, unknown>>;
  exportExpenses(schoolId: string, format: string, filters?: ExpenseFilters): Promise<Record<string, unknown>>;
  exportReport(schoolId: string, type: string, format: string, startDate: string, endDate: string): Promise<Record<string, unknown>>;
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  TERMINATED = 'TERMINATED',
  SUSPENDED = 'SUSPENDED',
  RETIRED = 'RETIRED',
  PROBATION = 'PROBATION',
}

export enum ContractType {
  CDI = 'CDI',
  CDD = 'CDD',
  VACATAIRE = 'VACATAIRE',
  PRESTATAIRE = 'PRESTATAIRE',
  STAGE = 'STAGE',
  INTERN = 'INTERN',
}

export enum DepartmentType {
  DIRECTION = 'DIRECTION',
  ADMINISTRATION = 'ADMINISTRATION',
  FINANCE = 'FINANCE',
  PEDAGOGY = 'PEDAGOGY',
  HR = 'HR',
  TRANSPORT = 'TRANSPORT',
  LIBRARY = 'LIBRARY',
  INFIRMARY = 'INFIRMARY',
  SECURITY = 'SECURITY',
  MAINTENANCE = 'MAINTENANCE',
  IT = 'IT',
  CLEANING = 'CLEANING',
  OTHER = 'OTHER',
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum LeaveType {
  ANNUAL = 'ANNUAL',
  SICK = 'SICK',
  MATERNITY = 'MATERNITY',
  PATERNITY = 'PATERNITY',
  TRAINING = 'TRAINING',
  PERMISSION = 'PERMISSION',
  EXCEPTIONAL = 'EXCEPTIONAL',
  UNPAID = 'UNPAID',
}

export enum PerformanceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export enum PerformanceLevel {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  SATISFACTORY = 'SATISFACTORY',
  NEEDS_IMPROVEMENT = 'NEEDS_IMPROVEMENT',
  POOR = 'POOR',
}

export enum RecruitmentStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export enum InterviewStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum TrainingStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum DocumentTypeType {
  CONTRACT = 'CONTRACT',
  DIPLOMA = 'DIPLOMA',
  CNPS = 'CNPS',
  NATIONAL_ID = 'NATIONAL_ID',
  PASSPORT = 'PASSPORT',
  DRIVER_LICENSE = 'DRIVER_LICENSE',
  ATTESTATION = 'ATTESTATION',
  MEDICAL_CERTIFICATE = 'MEDICAL_CERTIFICATE',
  OTHER = 'OTHER',
}

export enum ShiftType {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  FULL_DAY = 'FULL_DAY',
  NIGHT = 'NIGHT',
  CUSTOM = 'CUSTOM',
}

export enum TerminationReason {
  RESIGNATION = 'RESIGNATION',
  END_OF_CONTRACT = 'END_OF_CONTRACT',
  DISMISSAL = 'DISMISSAL',
  RETIREMENT = 'RETIRED',
  MUTUAL_AGREEMENT = 'MUTUAL_AGREEMENT',
  REDUNDANCY = 'REDUNDANCY',
  OTHER = 'OTHER',
}

export enum PromotionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PROCESSED = 'PROCESSED',
}

export enum TransferStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PROCESSED = 'PROCESSED',
}

export enum DisciplinaryStatus {
  PENDING = 'PENDING',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  APPEALED = 'APPEALED',
  RESOLVED = 'RESOLVED',
}

export enum DisciplinaryType {
  VERBAL_WARNING = 'VERBAL_WARNING',
  WRITTEN_WARNING = 'WRITTEN_WARNING',
  REPRIMAND = 'REPRIMAND',
  SUSPENSION = 'SUSPENSION',
  DEMOTION = 'DEMOTION',
  DISMISSAL = 'DISMISSAL',
}

export enum RecruitmentPipeline {
  APPLICATION = 'APPLICATION',
  SCREENING = 'SCREENING',
  INTERVIEW = 'INTERVIEW',
  TEST = 'TEST',
  FINAL_INTERVIEW = 'FINAL_INTERVIEW',
  OFFER = 'OFFER',
  HIRED = 'HIRED',
  REJECTED = 'REJECTED',
}

export enum EmployeeGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}

export enum BenefitType {
  HEALTH_INSURANCE = 'HEALTH_INSURANCE',
  LIFE_INSURANCE = 'LIFE_INSURANCE',
  TRANSPORT = 'TRANSPORT',
  HOUSING = 'HOUSING',
  MEALS = 'MEALS',
  PHONE = 'PHONE',
  INTERNET = 'INTERNET',
  OTHER = 'OTHER',
}

export enum DeductionType {
  TAX = 'TAX',
  INSURANCE = 'INSURANCE',
  LOAN = 'LOAN',
  ADVANCE = 'ADVANCE',
  OTHER = 'OTHER',
}

export interface Employee {
  id: string;
  schoolId: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: EmployeeGender;
  maritalStatus?: MaritalStatus;
  nationality?: string;
  address?: string;
  city?: string;
  photoUrl?: string;
  signatureUrl?: string;
  departmentId?: string;
  positionId?: string;
  hireDate: string;
  status: EmployeeStatus;
  contractType: ContractType;
  managerId?: string;
  emergencyContact?: EmergencyContact;
  medicalInfo?: MedicalInformation;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeProfile {
  id: string;
  employeeId: string;
  education?: string;
  experience?: string;
  skills?: string[];
  languages?: string[];
  certifications?: string[];
  emergencyContacts?: EmergencyContact[];
  medicalInfo?: MedicalInformation;
  bankInfo?: Record<string, unknown>;
  taxInfo?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface MedicalInformation {
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
  conditions?: string[];
  emergencyMedicalContact?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}

export interface EmployeeContract {
  id: string;
  schoolId: string;
  employeeId: string;
  contractNumber: string;
  type: ContractType;
  startDate: string;
  endDate?: string;
  position: string;
  departmentId?: string;
  salary: number;
  currency: string;
  benefits?: Benefit[];
  deductions?: Deduction[];
  allowances?: Allowance[];
  trialPeriodMonths?: number;
  renewalDate?: string;
  isRenewable: boolean;
  status: 'ACTIVE' | 'EXPIRED' | 'TERMINATED' | 'RENEWED';
  signedAt?: string;
  signedBy?: string;
  documentUrl?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmploymentHistory {
  id: string;
  employeeId: string;
  action: string;
  previousDepartmentId?: string;
  newDepartmentId?: string;
  previousPosition?: string;
  newPosition?: string;
  previousSalary?: number;
  newSalary?: number;
  effectiveDate: string;
  reason?: string;
  performedBy: string;
  createdAt: string;
}

export interface HrDepartment {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  description?: string;
  type: DepartmentType;
  headId?: string;
  parentId?: string;
  isActive: boolean;
  employeeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  description?: string;
  departmentId: string;
  level: number;
  minSalary?: number;
  maxSalary?: number;
  isActive: boolean;
  employeeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SalaryScale {
  id: string;
  schoolId: string;
  name: string;
  grades: SalaryGrade[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SalaryGrade {
  id: string;
  scaleId: string;
  grade: string;
  level: number;
  minSalary: number;
  maxSalary: number;
  midPoint: number;
}

export interface Benefit {
  id: string;
  employeeId: string;
  type: BenefitType;
  amount: number;
  description?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

export interface Deduction {
  id: string;
  employeeId: string;
  type: DeductionType;
  amount: number;
  percentage?: number;
  description?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

export interface Allowance {
  id: string;
  employeeId: string;
  name: string;
  amount: number;
  description?: string;
  isTaxable: boolean;
  isActive: boolean;
}

export interface Bonus {
  id: string;
  employeeId: string;
  name: string;
  amount: number;
  type: string;
  description?: string;
  awardedAt: string;
  awardedBy: string;
}

export interface PayrollReference {
  id: string;
  schoolId: string;
  employeeId: string;
  month: string;
  year: number;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'PENDING' | 'PROCESSED' | 'PAID';
  processedAt?: string;
  paidAt?: string;
  createdAt: string;
}

export interface Leave {
  id: string;
  schoolId: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  documents?: string[];
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveBalance {
  id: string;
  employeeId: string;
  year: number;
  leaveType: LeaveType;
  entitled: number;
  taken: number;
  remaining: number;
  carriedOver: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveApproval {
  id: string;
  leaveId: string;
  approverId: string;
  status: LeaveStatus;
  comments?: string;
  approvedAt: string;
}

export interface Training {
  id: string;
  schoolId: string;
  title: string;
  description?: string;
  trainer?: string;
  type: string;
  startDate: string;
  endDate: string;
  location?: string;
  maxParticipants: number;
  currentParticipants: number;
  status: TrainingStatus;
  cost?: number;
  currency?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingSession {
  id: string;
  trainingId: string;
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  trainer?: string;
  location?: string;
  notes?: string;
  attendance: TrainingEnrollment[];
}

export interface TrainingEnrollment {
  id: string;
  trainingId: string;
  employeeId: string;
  status: 'ENROLLED' | 'ATTENDED' | 'COMPLETED' | 'CANCELLED';
  enrolledAt: string;
  completedAt?: string;
  certificateUrl?: string;
  score?: number;
}

export interface Certification {
  id: string;
  employeeId: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  documentUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface PerformanceReview {
  id: string;
  schoolId: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  startDate: string;
  endDate: string;
  overallScore?: number;
  overallLevel?: PerformanceLevel;
  status: PerformanceStatus;
  objectives: Objective[];
  comments?: string;
  reviewDate?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Evaluation {
  id: string;
  reviewId: string;
  criterion: string;
  score: number;
  level: PerformanceLevel;
  comments?: string;
}

export interface Objective {
  id: string;
  reviewId: string;
  title: string;
  description?: string;
  targetDate: string;
  weight: number;
  score?: number;
  level?: PerformanceLevel;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'MISSED';
}

export interface Promotion {
  id: string;
  schoolId: string;
  employeeId: string;
  fromPosition: string;
  toPosition: string;
  fromDepartment?: string;
  toDepartment?: string;
  fromSalary: number;
  toSalary: number;
  effectiveDate: string;
  reason: string;
  status: PromotionStatus;
  approvedBy?: string;
  approvedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transfer {
  id: string;
  schoolId: string;
  employeeId: string;
  fromDepartment: string;
  toDepartment: string;
  fromPosition: string;
  toPosition: string;
  effectiveDate: string;
  reason: string;
  status: TransferStatus;
  approvedBy?: string;
  approvedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Termination {
  id: string;
  schoolId: string;
  employeeId: string;
  reason: TerminationReason;
  lastWorkingDay: string;
  noticePeriodDays: number;
  severancePay?: number;
  finalSettlement?: number;
  exitInterview: boolean;
  documents?: string[];
  notes?: string;
  status: 'PENDING' | 'APPROVED' | 'PROCESSED' | 'COMPLETED';
  approvedBy?: string;
  approvedAt?: string;
  processedBy?: string;
  processedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DisciplinaryAction {
  id: string;
  schoolId: string;
  employeeId: string;
  type: DisciplinaryType;
  title: string;
  description: string;
  date: string;
  issuedBy: string;
  witnessIds?: string[];
  documents?: string[];
  status: DisciplinaryStatus;
  appealDate?: string;
  appealNotes?: string;
  resolutionDate?: string;
  resolutionNotes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Warning {
  id: string;
  disciplinaryActionId: string;
  level: number;
  validUntil?: string;
  isExpired: boolean;
}

export interface Suspension {
  id: string;
  disciplinaryActionId: string;
  startDate: string;
  endDate: string;
  days: number;
  isPaid: boolean;
}

export interface Reward {
  id: string;
  schoolId: string;
  employeeId: string;
  name: string;
  type: string;
  description?: string;
  amount?: number;
  awardedAt: string;
  awardedBy: string;
  documents?: string[];
  createdAt: string;
}

export interface Recruitment {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  departmentId: string;
  positionId: string;
  positions: number;
  salaryRange?: { min: number; max: number };
  requirements?: string[];
  status: RecruitmentStatus;
  pipeline: RecruitmentPipeline[];
  publishedAt?: string;
  closedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: string;
  recruitmentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  status: RecruitmentPipeline;
  rating?: number;
  notes?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Interview {
  id: string;
  recruitmentId: string;
  candidateId: string;
  interviewerId: string;
  scheduledAt: string;
  duration: number;
  location?: string;
  type: 'ONSITE' | 'REMOTE' | 'PHONE';
  status: InterviewStatus;
  score?: number;
  notes?: string;
  recommendation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobOffer {
  id: string;
  recruitmentId: string;
  candidateId: string;
  position: string;
  salary: number;
  startDate: string;
  benefits?: string[];
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  sentAt?: string;
  respondedAt?: string;
  expiresAt: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  type: DocumentType;
  name: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  issueDate?: string;
  expiryDate?: string;
  issuedBy?: string;
  documentNumber?: string;
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeSchedule {
  id: string;
  employeeId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  shiftType: ShiftType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeShift {
  id: string;
  employeeId: string;
  date: string;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'MISSED' | 'SWAPPED';
  notes?: string;
}

export interface EmployeeAttendance {
  id: string;
  employeeId: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  hoursWorked: number;
  overtime: number;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE';
  notes?: string;
}

export interface EmployeeDashboard {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  pendingLeaves: number;
  recentPromotions: Promotion[];
  recentTransfers: Transfer[];
  expiringContracts: EmployeeContract[];
  upcomingTrainings: Training[];
  pendingEvaluations: PerformanceReview[];
  disciplinaryActions: DisciplinaryAction[];
}

export interface EmployeeStatistics {
  totalEmployees: number;
  byDepartment: Array<{ department: string; count: number }>;
  byContractType: Array<{ type: string; count: number }>;
  byStatus: Array<{ status: string; count: number }>;
  byGender: Array<{ gender: string; count: number }>;
  averageAge: number;
  averageSalary: number;
  turnoverRate: number;
  averageTenure: number;
}

export interface EmployeeTimeline {
  events: Array<{ id: string; type: string; description: string; date: string; userId: string }>;
}

export interface EmployeeAudit {
  id: string;
  schoolId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  previousValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface EmployeeSearch {
  query?: string;
  departmentId?: string;
  positionId?: string;
  status?: EmployeeStatus;
  contractType?: ContractType;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

export interface EmployeeFilters {
  departmentId?: string;
  positionId?: string;
  status?: EmployeeStatus;
  contractType?: ContractType;
  hireDateFrom?: string;
  hireDateTo?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface HrHRNotification {
  id: string;
  schoolId: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}

export interface HRSettings {
  id: string;
  schoolId: string;
  employeeCodePrefix: string;
  defaultProbationMonths: number;
  leaveYearStart: string;
  workingDaysPerWeek: number;
  workingHoursPerDay: number;
  overtimeRate: number;
  maxOvertimeHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface HRRepository {
  // Employees
  findEmployee(id: string): Promise<Employee | null>;
  findAllEmployees(schoolId: string, filters?: EmployeeFilters): Promise<{ data: Employee[]; total: number }>;
  createEmployee(data: Record<string, unknown>, schoolId: string): Promise<Employee>;
  updateEmployee(id: string, data: Partial<Employee>): Promise<Employee>;
  deleteEmployee(id: string): Promise<void>;
  findEmployeeProfile(employeeId: string): Promise<EmployeeProfile | null>;
  updateEmployeeProfile(employeeId: string, data: Partial<EmployeeProfile>): Promise<EmployeeProfile>;

  // Departments
  findDepartment(id: string): Promise<HrDepartment | null>;
  findAllDepartments(schoolId: string): Promise<HrDepartment[]>;
  createDepartment(data: Record<string, unknown>, schoolId: string): Promise<HrDepartment>;
  updateDepartment(id: string, data: Partial<HrDepartment>): Promise<HrDepartment>;
  deleteDepartment(id: string): Promise<void>;

  // Positions
  findPosition(id: string): Promise<Position | null>;
  findAllPositions(schoolId: string, departmentId?: string): Promise<Position[]>;
  createPosition(data: Record<string, unknown>, schoolId: string): Promise<Position>;
  updatePosition(id: string, data: Partial<Position>): Promise<Position>;
  deletePosition(id: string): Promise<void>;

  // Contracts
  findContract(id: string): Promise<EmployeeContract | null>;
  findAllContracts(schoolId: string, employeeId?: string): Promise<EmployeeContract[]>;
  createContract(data: Record<string, unknown>, schoolId: string): Promise<EmployeeContract>;
  updateContract(id: string, data: Partial<EmployeeContract>): Promise<EmployeeContract>;
  terminateContract(id: string): Promise<EmployeeContract>;
  renewContract(id: string, data: Record<string, unknown>): Promise<EmployeeContract>;
  findExpiringContracts(schoolId: string, withinDays: number): Promise<EmployeeContract[]>;

  // Employment History
  findEmploymentHistory(employeeId: string): Promise<EmploymentHistory[]>;
  createEmploymentHistory(data: Record<string, unknown>): Promise<EmploymentHistory>;

  // Leave
  findLeave(id: string): Promise<Leave | null>;
  findAllLeaves(schoolId: string, employeeId?: string): Promise<Leave[]>;
  createLeave(data: Record<string, unknown>, schoolId: string): Promise<Leave>;
  updateLeave(id: string, data: Partial<Leave>): Promise<Leave>;
  approveLeave(id: string, approverId: string): Promise<Leave>;
  rejectLeave(id: string, approverId: string, reason: string): Promise<Leave>;
  cancelLeave(id: string): Promise<Leave>;
  findLeaveBalance(employeeId: string, year: number): Promise<LeaveBalance[]>;
  updateLeaveBalance(employeeId: string, leaveType: LeaveType, days: number): Promise<LeaveBalance>;
  findPendingLeaves(schoolId: string): Promise<Leave[]>;

  // Training
  findTraining(id: string): Promise<Training | null>;
  findAllTrainings(schoolId: string): Promise<Training[]>;
  createTraining(data: Record<string, unknown>, schoolId: string): Promise<Training>;
  updateTraining(id: string, data: Partial<Training>): Promise<Training>;
  deleteTraining(id: string): Promise<void>;
  findTrainingSessions(trainingId: string): Promise<TrainingSession[]>;
  createTrainingSession(data: Record<string, unknown>): Promise<TrainingSession>;
  enrollInTraining(trainingId: string, employeeId: string): Promise<TrainingEnrollment>;
  completeTraining(trainingId: string, employeeId: string, score?: number): Promise<TrainingEnrollment>;
  findTrainingEnrollments(trainingId: string): Promise<TrainingEnrollment[]>;

  // Certifications
  findCertification(id: string): Promise<Certification | null>;
  findEmployeeCertifications(employeeId: string): Promise<Certification[]>;
  createCertification(data: Record<string, unknown>): Promise<Certification>;
  updateCertification(id: string, data: Partial<Certification>): Promise<Certification>;
  deleteCertification(id: string): Promise<void>;
  findExpiringCertifications(schoolId: string, withinDays: number): Promise<Certification[]>;

  // Performance
  findPerformanceReview(id: string): Promise<PerformanceReview | null>;
  findAllPerformanceReviews(schoolId: string, employeeId?: string): Promise<PerformanceReview[]>;
  createPerformanceReview(data: Record<string, unknown>, schoolId: string): Promise<PerformanceReview>;
  updatePerformanceReview(id: string, data: Partial<PerformanceReview>): Promise<PerformanceReview>;
  completePerformanceReview(id: string): Promise<PerformanceReview>;
  findReviewObjectives(reviewId: string): Promise<Objective[]>;
  createObjective(data: Record<string, unknown>): Promise<Objective>;
  updateObjective(id: string, data: Partial<Objective>): Promise<Objective>;

  // Promotions
  findPromotion(id: string): Promise<Promotion | null>;
  findAllPromotions(schoolId: string): Promise<Promotion[]>;
  createPromotion(data: Record<string, unknown>, schoolId: string): Promise<Promotion>;
  approvePromotion(id: string, approverId: string): Promise<Promotion>;
  rejectPromotion(id: string, approverId: string): Promise<Promotion>;
  processPromotion(id: string): Promise<Promotion>;

  // Transfers
  findTransfer(id: string): Promise<Transfer | null>;
  findAllTransfers(schoolId: string): Promise<Transfer[]>;
  createTransfer(data: Record<string, unknown>, schoolId: string): Promise<Transfer>;
  approveTransfer(id: string, approverId: string): Promise<Transfer>;
  rejectTransfer(id: string, approverId: string): Promise<Transfer>;
  processTransfer(id: string): Promise<Transfer>;

  // Terminations
  findTermination(id: string): Promise<Termination | null>;
  findAllTerminations(schoolId: string): Promise<Termination[]>;
  createTermination(data: Record<string, unknown>, schoolId: string): Promise<Termination>;
  approveTermination(id: string, approverId: string): Promise<Termination>;
  processTermination(id: string): Promise<Termination>;

  // Disciplinary
  findDisciplinaryAction(id: string): Promise<DisciplinaryAction | null>;
  findAllDisciplinaryActions(schoolId: string, employeeId?: string): Promise<DisciplinaryAction[]>;
  createDisciplinaryAction(data: Record<string, unknown>, schoolId: string): Promise<DisciplinaryAction>;
  updateDisciplinaryAction(id: string, data: Partial<DisciplinaryAction>): Promise<DisciplinaryAction>;
  resolveDisciplinaryAction(id: string, notes: string): Promise<DisciplinaryAction>;

  // Rewards
  findReward(id: string): Promise<Reward | null>;
  findEmployeeRewards(employeeId: string): Promise<Reward[]>;
  createReward(data: Record<string, unknown>, schoolId: string): Promise<Reward>;

  // Recruitment
  findRecruitment(id: string): Promise<Recruitment | null>;
  findAllRecruitments(schoolId: string): Promise<Recruitment[]>;
  createRecruitment(data: Record<string, unknown>, schoolId: string): Promise<Recruitment>;
  updateRecruitment(id: string, data: Partial<Recruitment>): Promise<Recruitment>;
  closeRecruitment(id: string): Promise<Recruitment>;

  // Candidates
  findCandidate(id: string): Promise<Candidate | null>;
  findCandidatesByRecruitment(recruitmentId: string): Promise<Candidate[]>;
  createCandidate(data: Record<string, unknown>): Promise<Candidate>;
  updateCandidate(id: string, data: Partial<Candidate>): Promise<Candidate>;

  // Interviews
  findInterview(id: string): Promise<Interview | null>;
  findInterviewsByRecruitment(recruitmentId: string): Promise<Interview[]>;
  createInterview(data: Record<string, unknown>): Promise<Interview>;
  updateInterview(id: string, data: Partial<Interview>): Promise<Interview>;
  completeInterview(id: string, score: number, notes: string): Promise<Interview>;

  // Job Offers
  findJobOffer(id: string): Promise<JobOffer | null>;
  createJobOffer(data: Record<string, unknown>): Promise<JobOffer>;
  updateJobOffer(id: string, data: Partial<JobOffer>): Promise<JobOffer>;
  acceptJobOffer(id: string): Promise<JobOffer>;
  rejectJobOffer(id: string): Promise<JobOffer>;

  // Documents
  findEmployeeDocument(id: string): Promise<EmployeeDocument | null>;
  findEmployeeDocuments(employeeId: string): Promise<EmployeeDocument[]>;
  createEmployeeDocument(data: Record<string, unknown>): Promise<EmployeeDocument>;
  updateEmployeeDocument(id: string, data: Partial<EmployeeDocument>): Promise<EmployeeDocument>;
  deleteEmployeeDocument(id: string): Promise<void>;
  verifyEmployeeDocument(id: string, verifiedBy: string): Promise<EmployeeDocument>;
  findExpiringDocuments(schoolId: string, withinDays: number): Promise<EmployeeDocument[]>;

  // Schedule & Attendance
  findEmployeeSchedule(employeeId: string): Promise<EmployeeSchedule[]>;
  updateEmployeeSchedule(employeeId: string, schedule: EmployeeSchedule[]): Promise<EmployeeSchedule[]>;
  findEmployeeShifts(employeeId: string, dateFrom: string, dateTo: string): Promise<EmployeeShift[]>;
  createEmployeeShift(data: Record<string, unknown>): Promise<EmployeeShift>;
  findEmployeeAttendance(employeeId: string, dateFrom: string, dateTo: string): Promise<EmployeeAttendance[]>;
  clockIn(employeeId: string): Promise<EmployeeAttendance>;
  clockOut(employeeId: string): Promise<EmployeeAttendance>;

  // Dashboard & Statistics
  getDashboard(schoolId: string): Promise<EmployeeDashboard>;
  getStatistics(schoolId: string): Promise<EmployeeStatistics>;
  getTimeline(employeeId: string): Promise<EmployeeTimeline>;

  // Search
  searchEmployees(schoolId: string, search: EmployeeSearch): Promise<{ data: Employee[]; total: number }>;

  // Notifications
  findNotifications(userId: string, schoolId: string): Promise<HrHRNotification[]>;
  createNotification(data: Record<string, unknown>): Promise<HrHRNotification>;
  markNotificationAsRead(id: string): Promise<HrHRNotification>;

  // Settings
  findSettings(schoolId: string): Promise<HRSettings | null>;
  updateSettings(schoolId: string, data: Partial<HRSettings>): Promise<HRSettings>;

  // Audit
  logAudit(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>): Promise<void>;
  getAuditLog(schoolId: string, filters?: EmployeeFilters): Promise<EmployeeAudit[]>;

  // Export
  exportEmployees(schoolId: string, format: string, filters?: EmployeeFilters): Promise<Record<string, unknown>>;
  exportAttendance(schoolId: string, format: string, dateFrom: string, dateTo: string): Promise<Record<string, unknown>>;
  exportLeaves(schoolId: string, format: string): Promise<Record<string, unknown>>;
}

// ============================================================
// PHASE 2.1 — ENTERPRISE ADMINISTRATION DASHBOARD
// ============================================================

// --- Enterprise Enums ---

export const EnterprisePlanType = {
  STARTER: 'starter',
  PROFESSIONAL: 'professional',
  BUSINESS: 'business',
  ENTERPRISE: 'enterprise',
  CUSTOM: 'custom',
} as const;
export type EnterprisePlanType = (typeof EnterprisePlanType)[keyof typeof EnterprisePlanType];

export const EnterpriseSchoolStatus = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
  ARCHIVED: 'archived',
  PENDING: 'pending',
  TRIAL: 'trial',
  EXPIRED: 'expired',
} as const;
export type EnterpriseSchoolStatus = (typeof EnterpriseSchoolStatus)[keyof typeof EnterpriseSchoolStatus];

export const EnterpriseSubscriptionStatus = {
  ACTIVE: 'active',
  PAST_DUE: 'past_due',
  CANCELLED: 'cancelled',
  TRIALING: 'trialing',
  PAUSED: 'paused',
  EXPIRED: 'expired',
  PENDING: 'pending',
} as const;
export type EnterpriseSubscriptionStatus = (typeof EnterpriseSubscriptionStatus)[keyof typeof EnterpriseSubscriptionStatus];

export const EnterpriseLicenseStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
} as const;
export type EnterpriseLicenseStatus = (typeof EnterpriseLicenseStatus)[keyof typeof EnterpriseLicenseStatus];

export const EnterpriseUserRole = {
  SUPER_ADMIN: 'super_admin',
  SUPPORT: 'support',
  SALES: 'sales',
  FINANCE: 'finance',
  DEVELOPER: 'developer',
  AUDITOR: 'auditor',
  VIEWER: 'viewer',
} as const;
export type EnterpriseUserRole = (typeof EnterpriseUserRole)[keyof typeof EnterpriseUserRole];

export const EnterpriseUserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  LOCKED: 'locked',
  PENDING_MFA: 'pending_mfa',
} as const;
export type EnterpriseUserStatus = (typeof EnterpriseUserStatus)[keyof typeof EnterpriseUserStatus];

export const TicketStatus = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  WAITING: 'waiting',
  ESCALATED: 'escalated',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const;
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export const TicketPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical',
} as const;
export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority];

export const TicketCategory = {
  BUG: 'bug',
  FEATURE_REQUEST: 'feature_request',
  ACCOUNT: 'account',
  BILLING: 'billing',
  TECHNICAL: 'technical',
  TRAINING: 'training',
  OTHER: 'other',
} as const;
export type TicketCategory = (typeof TicketCategory)[keyof typeof TicketCategory];

export const FeatureFlagStatus = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  BETA: 'beta',
  DEPRECATED: 'deprecated',
} as const;
export type FeatureFlagStatus = (typeof FeatureFlagStatus)[keyof typeof FeatureFlagStatus];

export const MonitoringStatus = {
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  DOWN: 'down',
  MAINTENANCE: 'maintenance',
} as const;
export type MonitoringStatus = (typeof MonitoringStatus)[keyof typeof MonitoringStatus];

export const NotificationChannel = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in_app',
  WHATSAPP: 'whatsapp',
} as const;
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];

export const AuditAction = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LOGIN: 'login',
  LOGOUT: 'logout',
  LOGIN_FAILED: 'login_failed',
  PASSWORD_CHANGE: 'password_change',
  PASSWORD_RESET: 'password_reset',
  MFA_ENABLE: 'mfa_enable',
  MFA_DISABLE: 'mfa_disable',
  MFA_VERIFY: 'mfa_verify',
  EMAIL_VERIFY: 'email_verify',
  INVITATION_CREATE: 'invitation_create',
  INVITATION_ACCEPT: 'invitation_accept',
  INVITATION_REVOKE: 'invitation_revoke',
  SESSION_CREATE: 'session_create',
  SESSION_REVOKE: 'session_revoke',
  SESSION_REVOKE_ALL: 'session_revoke_all',
  ACCOUNT_LOCK: 'account_lock',
  ACCOUNT_UNLOCK: 'account_unlock',
  ROLE_CHANGE: 'role_change',
  RBAC_DENIED: 'rbac_denied',
  EXPORT: 'export',
  IMPORT: 'import',
  APPROVE: 'approve',
  REJECT: 'reject',
  ACTIVATE: 'activate',
  DEACTIVATE: 'deactivate',
  SUSPEND: 'suspend',
  BLOCK: 'block',
  ARCHIVE: 'archive',
  RESTORE: 'restore',
  PAYMENT: 'payment',
  REFUND: 'refund',
  LICENSE_CREATE: 'license_create',
  LICENSE_ACTIVATE: 'license_activate',
  LICENSE_REVOKE: 'license_revoke',
  SETTINGS_CHANGE: 'settings_change',
  FEATURE_TOGGLE: 'feature_toggle',
  MAINTENANCE_START: 'maintenance_start',
  MAINTENANCE_END: 'maintenance_end',
} as const;
export type HrAuditAction = (typeof AuditAction)[keyof typeof AuditAction];
export type HrAuditActionType = HrAuditAction;

export const BillingCycle = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  ANNUALLY: 'annually',
  ONE_TIME: 'one_time',
} as const;
export type HrBillingCycle = (typeof BillingCycle)[keyof typeof BillingCycle];

export const PaymentGateway = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  WAVE: 'wave',
  ORANGE_MONEY: 'orange_money',
  MTN_MONEY: 'mtn_money',
  BANK_TRANSFER: 'bank_transfer',
} as const;
export type HrPaymentGateway = (typeof PaymentGateway)[keyof typeof PaymentGateway];

export const MaintenanceType = {
  SCHEDULED: 'scheduled',
  EMERGENCY: 'emergency',
  UPDATE: 'update',
  MIGRATION: 'migration',
} as const;
export type HrMaintenanceType = (typeof MaintenanceType)[keyof typeof MaintenanceType];

export const EnterpriseModule = {
  AUTH: 'auth',
  ACADEMIC: 'academic',
  ATTENDANCE: 'attendance',
  EXAMS: 'exams',
  MESSAGES: 'messages',
  FINANCE: 'finance',
  HR: 'hr',
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  ONBOARDING: 'onboarding',
  SCHOOLS: 'schools',
} as const;
export type HrEnterpriseModule = (typeof EnterpriseModule)[keyof typeof EnterpriseModule];

// --- Enterprise Interfaces ---

export interface EnterpriseSchool {
  id: string;
  name: string;
  code: string;
  slug: string;
  status: EnterpriseSchoolStatus;
  plan: EnterprisePlanType;
  licenseId?: string;
  subscriptionId?: string;
  ownerUserId: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  city?: string;
  country: string;
  timezone: string;
  locale: string;
  logoUrl?: string;
  faviconUrl?: string;
  customDomain?: string;
  studentCount: number;
  teacherCount: number;
  userCount: number;
  storageUsedMb: number;
  storageQuotaMb: number;
  apiRequestsThisMonth: number;
  apiQuota: number;
  modulesEnabled: HrEnterpriseModule[];
  settings: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
}

export interface EnterpriseSubscription {
  id: string;
  schoolId: string;
  plan: EnterprisePlanType;
  status: EnterpriseSubscriptionStatus;
  billingCycle: HrBillingCycle;
  amount: number;
  currency: string;
  paymentGateway: HrPaymentGateway;
  gatewaySubscriptionId?: string;
  trialStart?: string;
  trialEnd?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAt?: string;
  cancelledAt?: string;
  pendingPlan?: EnterprisePlanType;
  pendingBillingCycle?: HrBillingCycle;
  couponId?: string;
  discountPercent: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface EnterpriseLicense {
  id: string;
  schoolId: string;
  key: string;
  token: string;
  status: EnterpriseLicenseStatus;
  plan: EnterprisePlanType;
  maxUsers: number;
  maxStudents: number;
  maxStorageMb: number;
  features: string[];
  allowedDomains: string[];
  allowedDevices: number;
  activatedAt?: string;
  expiresAt: string;
  revokedAt?: string;
  revokedReason?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface EnterpriseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: EnterpriseUserRole;
  status: EnterpriseUserStatus;
  avatarUrl?: string;
  phone?: string;
  mfaEnabled: boolean;
  mfaSecret?: string;
  lastLoginAt?: string;
  loginCount: number;
  permissions: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface EnterpriseRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EnterprisePermission {
  id: string;
  name: string;
  description: string;
  module: string;
  action: string;
}

export interface EnterpriseSession {
  id: string;
  userId: string;
  token: string;
  ipAddress: string;
  userAgent: string;
  expiresAt: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  schoolId?: string;
  userId: string;
  assignedTo?: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  tags: string[];
  slaDeadline?: string;
  firstResponseAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  isInternal: boolean;
  attachments: string[];
  createdAt: string;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  status: FeatureFlagStatus;
  module: HrEnterpriseModule;
  percentage: number;
  allowedSchools: string[];
  deniedSchools: string[];
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface EnterpriseAuditLog {
  id: string;
  userId?: string;
  schoolId?: string;
  action: HrAuditActionType;
  entityType: string;
  entityId: string;
  previousValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  body: string;
  type: string;
  channels: NotificationChannel[];
  targetRoles: EnterpriseUserRole[];
  targetSchools: string[];
  sentAt?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: string;
  category: string;
  description: string;
  isPublic: boolean;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillingCycleRecord {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: string;
  invoiceUrl?: string;
  paidAt?: string;
  dueDate: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface StorageUsage {
  id: string;
  schoolId: string;
  fileType: string;
  fileSizeMb: number;
  fileCount: number;
  lastUpdated: string;
}

export interface ApiUsage {
  id: string;
  schoolId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTimeMs: number;
  timestamp: string;
}

export interface AnalyticsSnapshot {
  id: string;
  date: string;
  totalSchools: number;
  activeSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalUsers: number;
  newSchools: number;
  churnedSchools: number;
  mrr: number;
  arr: number;
  revenueGrowth: number;
  activeSubscriptions: number;
  trialSubscriptions: number;
  apiRequests: number;
  storageUsedMb: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface MonitoringEvent {
  id: string;
  type: string;
  source: string;
  status: MonitoringStatus;
  message: string;
  details: Record<string, unknown>;
  resolvedAt?: string;
  createdAt: string;
}

export interface MaintenanceWindow {
  id: string;
  title: string;
  description: string;
  type: HrMaintenanceType;
  startTime: string;
  endTime: string;
  affectedServices: string[];
  status: string;
  notificationSent: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ReleaseNote {
  id: string;
  version: string;
  title: string;
  content: string;
  type: string;
  modules: HrEnterpriseModule[];
  publishedAt: string;
  createdAt: string;
}

export interface SystemHealth {
  id: string;
  service: string;
  status: MonitoringStatus;
  cpuUsage: number;
  ramUsage: number;
  diskUsage: number;
  uptime: number;
  lastCheck: string;
  metadata: Record<string, unknown>;
}

export interface QuotaUsage {
  id: string;
  schoolId: string;
  resource: string;
  used: number;
  limit: number;
  unit: string;
  period: string;
  lastUpdated: string;
}

export interface EnterpriseDashboard {
  totalSchools: number;
  activeSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalUsers: number;
  activeSubscriptions: number;
  trialSubscriptions: number;
  mrr: number;
  arr: number;
  revenueGrowth: number;
  expiredSchools: number;
  suspendedSchools: number;
  storageUsedMb: number;
  apiRequestsThisMonth: number;
  systemErrors: number;
  avgResponseTime: number;
  serverLoad: number;
  recentActivity: EnterpriseAuditLog[];
  topSchools: EnterpriseSchool[];
}

export interface EnterpriseSchoolFilters {
  status?: EnterpriseSchoolStatus;
  plan?: EnterprisePlanType;
  country?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface EnterpriseUserFilters {
  role?: EnterpriseUserRole;
  status?: EnterpriseUserStatus;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: TicketCategory;
  assignedTo?: string;
  schoolId?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface EnterpriseAuditFilters {
  action?: HrAuditActionType;
  entityType?: string;
  schoolId?: string;
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface EnterpriseAnalytics {
  period: string;
  schoolsByPlan: Record<string, number>;
  schoolsByStatus: Record<string, number>;
  revenueByMonth: Array<{ month: string; amount: number }>;
  growthMetrics: { newSchools: number; churnedSchools: number; growthRate: number };
  usageMetrics: { apiRequests: number; storageUsedMb: number; activeUsers: number };
  topModules: Array<{ module: string; usage: number }>;
}

export interface EnterpriseStatistics {
  totalSchools: number;
  activeSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalUsers: number;
  mrr: number;
  arr: number;
  growthRate: number;
  avgSchoolSize: number;
  churnRate: number;
}

export interface EnterpriseTimeline {
  events: EnterpriseAuditLog[];
  total: number;
  page: number;
  limit: number;
}

export interface EnterpriseNotification {
  id: string;
  title: string;
  body: string;
  type: string;
  channels: NotificationChannel[];
  targetRoles: EnterpriseUserRole[];
  targetSchools: string[];
  sentAt?: string;
  readBy: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface EnterpriseSettings {
  id: string;
  siteName: string;
  siteUrl: string;
  logoUrl?: string;
  faviconUrl?: string;
  supportEmail: string;
  billingEmail: string;
  defaultTimezone: string;
  defaultLocale: string;
  defaultCurrency: string;
  maxSchools: number;
  maxUsersPerSchool: number;
  maxStudentsPerSchool: number;
  storageQuotaMb: number;
  apiQuota: number;
  trialDays: number;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  customCss?: string;
  customJs?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  smsProvider?: string;
  smsApiKey?: string;
  paymentGateway?: HrPaymentGateway;
  stripePublicKey?: string;
  stripeSecretKey?: string;
  webhookSecret?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CloneSchoolOptions {
  includeStudents: boolean;
  includeTeachers: boolean;
  includeClasses: boolean;
  includeSettings: boolean;
  includeFinance: boolean;
  newName: string;
  newCode: string;
}

export interface MigrateSchoolOptions {
  targetPlan: EnterprisePlanType;
  migrateData: boolean;
  migrateUsers: boolean;
  migrateFinance: boolean;
  scheduledDate?: string;
}

export interface EnterpriseRepository {
  findSchools(filters?: EnterpriseSchoolFilters): Promise<EnterpriseSchool[]>;
  findSchoolById(schoolId: string): Promise<EnterpriseSchool | null>;
  findSchoolByCode(code: string): Promise<EnterpriseSchool | null>;
  findSchoolBySlug(slug: string): Promise<EnterpriseSchool | null>;
  createSchool(data: Partial<EnterpriseSchool>): Promise<EnterpriseSchool>;
  updateSchool(schoolId: string, data: Partial<EnterpriseSchool>): Promise<EnterpriseSchool>;
  deleteSchool(schoolId: string): Promise<void>;
  suspendSchool(schoolId: string, reason: string): Promise<EnterpriseSchool>;
  activateSchool(schoolId: string): Promise<EnterpriseSchool>;
  blockSchool(schoolId: string, reason: string): Promise<EnterpriseSchool>;
  archiveSchool(schoolId: string): Promise<EnterpriseSchool>;
  restoreSchool(schoolId: string): Promise<EnterpriseSchool>;
  cloneSchool(schoolId: string, options: CloneSchoolOptions): Promise<EnterpriseSchool>;
  migrateSchool(schoolId: string, options: MigrateSchoolOptions): Promise<EnterpriseSchool>;
  getSchoolHealth(schoolId: string): Promise<Record<string, unknown>>;
  getSchoolStorage(schoolId: string): Promise<StorageUsage[]>;
  getSchoolQuota(schoolId: string): Promise<QuotaUsage[]>;

  findSubscriptions(filters?: EnterpriseSchoolFilters): Promise<EnterpriseSubscription[]>;
  findSubscriptionById(subscriptionId: string): Promise<EnterpriseSubscription | null>;
  findSubscriptionBySchool(schoolId: string): Promise<EnterpriseSubscription | null>;
  createSubscription(data: Partial<EnterpriseSubscription>): Promise<EnterpriseSubscription>;
  updateSubscription(subscriptionId: string, data: Partial<EnterpriseSubscription>): Promise<EnterpriseSubscription>;
  cancelSubscription(subscriptionId: string): Promise<EnterpriseSubscription>;
  renewSubscription(subscriptionId: string): Promise<EnterpriseSubscription>;
  changePlan(subscriptionId: string, plan: EnterprisePlanType, cycle: HrBillingCycle): Promise<EnterpriseSubscription>;

  findLicenses(filters?: EnterpriseSchoolFilters): Promise<EnterpriseLicense[]>;
  findLicenseById(licenseId: string): Promise<EnterpriseLicense | null>;
  findLicenseByKey(key: string): Promise<EnterpriseLicense | null>;
  createLicense(data: Partial<EnterpriseLicense>): Promise<EnterpriseLicense>;
  activateLicense(key: string, schoolId: string): Promise<EnterpriseLicense>;
  revokeLicense(licenseId: string, reason: string): Promise<EnterpriseLicense>;
  validateLicense(licenseId: string): Promise<boolean>;
  renewLicense(licenseId: string, expiresAt: string): Promise<EnterpriseLicense>;

  findEnterpriseUsers(filters?: EnterpriseUserFilters): Promise<EnterpriseUser[]>;
  findEnterpriseUserById(userId: string): Promise<EnterpriseUser | null>;
  findEnterpriseUserByEmail(email: string): Promise<EnterpriseUser | null>;
  createEnterpriseUser(data: Partial<EnterpriseUser>): Promise<EnterpriseUser>;
  updateEnterpriseUser(userId: string, data: Partial<EnterpriseUser>): Promise<EnterpriseUser>;
  deleteEnterpriseUser(userId: string): Promise<void>;
  lockEnterpriseUser(userId: string): Promise<EnterpriseUser>;
  unlockEnterpriseUser(userId: string): Promise<EnterpriseUser>;
  resetMfa(userId: string): Promise<EnterpriseUser>;
  findUserSessions(userId: string): Promise<EnterpriseSession[]>;
  revokeSession(sessionId: string): Promise<void>;
  revokeAllSessions(userId: string): Promise<void>;

  findTickets(filters?: TicketFilters): Promise<SupportTicket[]>;
  findTicketById(ticketId: string): Promise<SupportTicket | null>;
  createTicket(data: Partial<SupportTicket>): Promise<SupportTicket>;
  updateTicket(ticketId: string, data: Partial<SupportTicket>): Promise<SupportTicket>;
  assignTicket(ticketId: string, userId: string): Promise<SupportTicket>;
  escalateTicket(ticketId: string): Promise<SupportTicket>;
  resolveTicket(ticketId: string): Promise<SupportTicket>;
  closeTicket(ticketId: string): Promise<SupportTicket>;
  findTicketMessages(ticketId: string): Promise<TicketMessage[]>;
  addTicketMessage(ticketId: string, data: Partial<TicketMessage>): Promise<TicketMessage>;

  findFeatureFlags(): Promise<FeatureFlag[]>;
  findFeatureFlagById(flagId: string): Promise<FeatureFlag | null>;
  findFeatureFlagByKey(key: string): Promise<FeatureFlag | null>;
  createFeatureFlag(data: Partial<FeatureFlag>): Promise<FeatureFlag>;
  updateFeatureFlag(flagId: string, data: Partial<FeatureFlag>): Promise<FeatureFlag>;
  deleteFeatureFlag(flagId: string): Promise<void>;
  toggleFeatureFlag(flagId: string, enabled: boolean): Promise<FeatureFlag>;
  isFeatureEnabled(key: string, schoolId?: string): Promise<boolean>;

  findAuditLogs(filters?: EnterpriseAuditFilters): Promise<EnterpriseAuditLog[]>;
  logAudit(data: Partial<EnterpriseAuditLog>): Promise<EnterpriseAuditLog>;
  getAuditStats(filters?: EnterpriseAuditFilters): Promise<Record<string, unknown>>;

  findSystemNotifications(): Promise<SystemNotification[]>;
  createSystemNotification(data: Partial<SystemNotification>): Promise<SystemNotification>;
  markNotificationRead(notificationId: string, userId: string): Promise<SystemNotification>;
  deleteNotification(notificationId: string): Promise<void>;

  findSystemSettings(): Promise<SystemSetting[]>;
  findSettingByKey(key: string): Promise<SystemSetting | null>;
  updateSetting(key: string, value: string, updatedBy: string): Promise<SystemSetting>;

  findBillingCycles(subscriptionId: string): Promise<BillingCycleRecord[]>;
  createBillingCycle(data: Partial<BillingCycleRecord>): Promise<BillingCycleRecord>;

  getAnalyticsSnapshot(date: string): Promise<AnalyticsSnapshot | null>;
  createAnalyticsSnapshot(data: Partial<AnalyticsSnapshot>): Promise<AnalyticsSnapshot>;
  getAnalyticsRange(startDate: string, endDate: string): Promise<AnalyticsSnapshot[]>;

  findMonitoringEvents(filters?: { status?: MonitoringStatus; type?: string; page?: number; limit?: number }): Promise<MonitoringEvent[]>;
  createMonitoringEvent(data: Partial<MonitoringEvent>): Promise<MonitoringEvent>;
  resolveMonitoringEvent(eventId: string): Promise<MonitoringEvent>;

  findMaintenanceWindows(): Promise<MaintenanceWindow[]>;
  createMaintenanceWindow(data: Partial<MaintenanceWindow>): Promise<MaintenanceWindow>;
  updateMaintenanceWindow(id: string, data: Partial<MaintenanceWindow>): Promise<MaintenanceWindow>;
  cancelMaintenanceWindow(id: string): Promise<MaintenanceWindow>;

  findReleaseNotes(): Promise<ReleaseNote[]>;
  createReleaseNote(data: Partial<ReleaseNote>): Promise<ReleaseNote>;

  getSystemHealth(): Promise<SystemHealth[]>;
  updateSystemHealth(service: string, data: Partial<SystemHealth>): Promise<SystemHealth>;

  getQuotaUsage(schoolId: string): Promise<QuotaUsage[]>;
  updateQuotaUsage(schoolId: string, resource: string, used: number): Promise<QuotaUsage>;

  getApiUsage(schoolId: string, dateFrom?: string, dateTo?: string): Promise<ApiUsage[]>;
  logApiUsage(data: Partial<ApiUsage>): Promise<ApiUsage>;

  getEnterpriseDashboard(): Promise<EnterpriseDashboard>;
  getEnterpriseStatistics(): Promise<EnterpriseStatistics>;
  getEnterpriseAnalytics(period: string): Promise<EnterpriseAnalytics>;
  exportEnterpriseData(format: string, filters?: Record<string, unknown>): Promise<Record<string, unknown>>;
}

// ============================================================
// PHASE 2.2 — ANALYTICS & BUSINESS INTELLIGENCE
// ============================================================

// --- Analytics Enums ---

export const AnalyticsPeriod = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
} as const;
export type AnalyticsPeriodType = (typeof AnalyticsPeriod)[keyof typeof AnalyticsPeriod];

export const ChartType = {
  LINE: 'line',
  AREA: 'area',
  BAR: 'bar',
  PIE: 'pie',
  DONUT: 'donut',
  RADAR: 'radar',
  POLAR: 'polar',
  TREEMAP: 'treemap',
  SANKEY: 'sankey',
  BUBBLE: 'bubble',
  SCATTER: 'scatter',
  HEATMAP: 'heatmap',
  GAUGE: 'gauge',
  FUNNEL: 'funnel',
  CANDLESTICK: 'candlestick',
  TIMELINE: 'timeline',
  CALENDAR: 'calendar',
  GEO_MAP: 'geo_map',
} as const;
export type ChartTypeEnum = (typeof ChartType)[keyof typeof ChartType];

export const ExportFormat = {
  EXCEL: 'excel',
  PDF: 'pdf',
  CSV: 'csv',
  JSON: 'json',
  XML: 'xml',
  POWERPOINT: 'powerpoint',
} as const;
export type ExportFormatType = (typeof ExportFormat)[keyof typeof ExportFormat];

export const ReportSchedule = {
  NONE: 'none',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
} as const;
export type ReportScheduleType = (typeof ReportSchedule)[keyof typeof ReportSchedule];

export const DataSourceType = {
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  CLASSES: 'classes',
  SUBJECTS: 'subjects',
  EXAMS: 'exams',
  ATTENDANCE: 'attendance',
  FINANCE: 'finance',
  HR: 'hr',
  MESSAGES: 'messages',
  SCHOOLS: 'schools',
  USERS: 'users',
  PAYMENTS: 'payments',
  ENROLLMENTS: 'enrollments',
} as const;
export type DataSourceTypeEnum = (typeof DataSourceType)[keyof typeof DataSourceType];

export const RiskLevel = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;
export type RiskLevelType = (typeof RiskLevel)[keyof typeof RiskLevel];

export const PredictiveModel = {
  DROPOUT: 'dropout',
  PAYMENT_DEFAULT: 'payment_default',
  ACADEMIC_RISK: 'academic_risk',
  REVENUE_FORECAST: 'revenue_forecast',
  ENROLLMENT_FORECAST: 'enrollment_forecast',
  STAFF_TURNOVER: 'staff_turnover',
  CLASS_OVERLOAD: 'class_overload',
  DEMAND_FORECAST: 'demand_forecast',
} as const;
export type PredictiveModelType = (typeof PredictiveModel)[keyof typeof PredictiveModel];

export const WidgetType = {
  KPI: 'kpi',
  CHART: 'chart',
  TABLE: 'table',
  MAP: 'map',
  GAUGE: 'gauge',
  HEATMAP: 'heatmap',
  TIMELINE: 'timeline',
  TEXT: 'text',
  IMAGE: 'image',
  LIST: 'list',
  PROGRESS: 'progress',
  COMPARISON: 'comparison',
} as const;
export type WidgetTypeEnum = (typeof WidgetType)[keyof typeof WidgetType];

export const DimensionGranularity = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
} as const;
export type DimensionGranularityType = (typeof DimensionGranularity)[keyof typeof DimensionGranularity];

// --- Analytics Interfaces ---

export interface ExecutiveDashboard {
  revenue: RevenueKPIs;
  financial: FinancialKPIs;
  academic: AcademicKPIs;
  hr: HrKPIs;
  student: StudentKPIs;
  teacher: TeacherKPIs;
  parent: ParentKPIs;
  system: SystemKPIs;
  generatedAt: string;
}

export interface RevenueKPIs {
  totalRevenue: number;
  monthlyRevenue: number;
  dailyRevenue: number;
  mrr: number;
  arr: number;
  revenueGrowth: number;
  revenuePerSchool: number;
  revenuePerStudent: number;
  forecastNextMonth: number;
  forecastNextQuarter: number;
}

export interface FinancialKPIs {
  totalExpenses: number;
  monthlyExpenses: number;
  profit: number;
  profitMargin: number;
  cashFlow: number;
  outstandingPayments: number;
  overduePayments: number;
  budgetUtilization: number;
  costPerStudent: number;
  costPerTeacher: number;
}

export interface AcademicKPIs {
  totalSchools: number;
  activeSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalUsers: number;
  totalParents: number;
  avgSuccessRate: number;
  avgAttendanceRate: number;
  avgClassSize: number;
  topPerformingSchools: Array<{ schoolId: string; name: string; score: number }>;
  bottomPerformingSchools: Array<{ schoolId: string; name: string; score: number }>;
}

export interface HrKPIs {
  totalEmployees: number;
  activeEmployees: number;
  turnoverRate: number;
  avgTenure: number;
  trainingCompletionRate: number;
  avgPerformanceScore: number;
  openPositions: number;
  pendingLeaves: number;
  absenteeismRate: number;
  employeeSatisfaction: number;
}

export interface StudentKPIs {
  totalEnrollments: number;
  newEnrollments: number;
  dropoutRate: number;
  retentionRate: number;
  avgGPA: number;
  atRiskStudents: number;
  chronicAbsentees: number;
  averageAge: number;
  genderDistribution: Record<string, number>;
  topStudents: Array<{ studentId: string; name: string; gpa: number }>;
}

export interface TeacherKPIs {
  totalTeachers: number;
  activeTeachers: number;
  avgTeacherStudentRatio: number;
  avgPerformanceRating: number;
  avgClassesPerTeacher: number;
  avgHoursPerWeek: number;
  certificationRate: number;
  topPerformers: Array<{ teacherId: string; name: string; rating: number }>;
}

export interface ParentKPIs {
  totalParents: number;
  activeParents: number;
  avgPaymentRate: number;
  avgEngagementScore: number;
  avgAppUsageMinutes: number;
  communicationRate: number;
  satisfactionScore: number;
}

export interface SystemKPIs {
  apiCalls: number;
  storageUsedMb: number;
  storageQuotaMb: number;
  uptimePercent: number;
  avgResponseTime: number;
  errorRate: number;
  activeSessions: number;
  peakConcurrentUsers: number;
}

export interface AcademicAnalytics {
  successRate: SuccessRateData;
  gradeEvolution: GradeEvolutionData;
  attendanceAnalytics: AttendanceAnalyticsData;
  performanceByClass: PerformanceByEntity[];
  performanceByLevel: PerformanceByEntity[];
  performanceBySchool: PerformanceByEntity[];
  performanceByTeacher: PerformanceByEntity[];
  performanceByYear: PerformanceByEntity[];
  subjectDifficulty: SubjectDifficultyData[];
  predictiveResults: PredictiveAIResult[];
}

export interface SuccessRateData {
  overall: number;
  byClass: Array<{ classId: string; name: string; rate: number }>;
  bySubject: Array<{ subjectId: string; name: string; rate: number }>;
  byLevel: Array<{ level: string; rate: number }>;
  byYear: Array<{ year: string; rate: number }>;
  trend: Array<{ period: string; rate: number }>;
}

export interface GradeEvolutionData {
  overall: Array<{ period: string; average: number }>;
  bySubject: Array<{ subject: string; trend: Array<{ period: string; average: number }> }>;
  byClass: Array<{ class: string; trend: Array<{ period: string; average: number }> }>;
}

export interface AttendanceAnalyticsData {
  overallRate: number;
  byClass: Array<{ classId: string; name: string; rate: number }>;
  byStudent: Array<{ studentId: string; name: string; rate: number }>;
  byMonth: Array<{ month: string; rate: number }>;
  chronicAbsentees: number;
  lateArrivals: number;
}

export interface PerformanceByEntity {
  id: string;
  name: string;
  score: number;
  rank: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface SubjectDifficultyData {
  subjectId: string;
  name: string;
  avgScore: number;
  failureRate: number;
  difficultyIndex: number;
  trend: Array<{ period: string; score: number }>;
}

export interface FinancialAnalytics {
  revenue: RevenueAnalytics;
  expenses: ExpenseAnalytics;
  profit: ProfitAnalytics;
  cashFlow: CashFlowAnalytics;
  payments: PaymentAnalytics;
  forecast: FinancialForecast;
  budgetVsActual: BudgetVsActualData;
}

export interface RevenueAnalytics {
  total: number;
  daily: Array<{ date: string; amount: number }>;
  monthly: Array<{ month: string; amount: number }>;
  yearly: Array<{ year: string; amount: number }>;
  byCategory: Array<{ category: string; amount: number; percentage: number }>;
  bySchool: Array<{ schoolId: string; name: string; amount: number }>;
  growth: { daily: number; monthly: number; yearly: number };
}

export interface ExpenseAnalytics {
  total: number;
  monthly: Array<{ month: string; amount: number }>;
  byCategory: Array<{ category: string; amount: number; percentage: number }>;
  trend: Array<{ period: string; amount: number }>;
}

export interface ProfitAnalytics {
  total: number;
  margin: number;
  monthly: Array<{ month: string; profit: number; margin: number }>;
  trend: Array<{ period: string; profit: number }>;
}

export interface CashFlowAnalytics {
  current: number;
  inflows: number;
  outflows: number;
  netFlow: number;
  projected: Array<{ period: string; amount: number }>;
  runway: number;
}

export interface PaymentAnalytics {
  total: number;
  collected: number;
  pending: number;
  overdue: number;
  collectionRate: number;
  avgPaymentDelay: number;
  byMethod: Array<{ method: string; count: number; amount: number }>;
}

export interface FinancialForecast {
  nextMonth: ForecastPoint;
  nextQuarter: ForecastPoint;
  nextYear: ForecastPoint;
  confidence: number;
  model: string;
}

export interface ForecastPoint {
  predicted: number;
  lower: number;
  upper: number;
  period: string;
}

export interface BudgetVsActualData {
  budget: number;
  actual: number;
  variance: number;
  variancePercent: number;
  byCategory: Array<{ category: string; budget: number; actual: number; variance: number }>;
}

export interface HrAnalytics {
  workforce: WorkforceAnalytics;
  turnover: TurnoverAnalytics;
  attendance: HrAttendanceAnalytics;
  training: TrainingAnalytics;
  performance: HrPerformanceAnalytics;
  compensation: CompensationAnalytics;
}

export interface WorkforceAnalytics {
  total: number;
  byDepartment: Array<{ department: string; count: number; percentage: number }>;
  byContractType: Array<{ type: string; count: number }>;
  byGender: Array<{ gender: string; count: number; percentage: number }>;
  avgAge: number;
  avgTenure: number;
}

export interface TurnoverAnalytics {
  rate: number;
  monthly: Array<{ month: string; rate: number }>;
  byDepartment: Array<{ department: string; rate: number }>;
  reasons: Array<{ reason: string; count: number; percentage: number }>;
  forecast: ForecastPoint;
}

export interface HrAttendanceAnalytics {
  avgRate: number;
  byEmployee: Array<{ employeeId: string; name: string; rate: number }>;
  byMonth: Array<{ month: string; rate: number }>;
  absenteeism: number;
  punctuality: number;
}

export interface TrainingAnalytics {
  totalPrograms: number;
  completionRate: number;
  avgScore: number;
  byType: Array<{ type: string; count: number; completionRate: number }>;
  topPrograms: Array<{ name: string; enrollments: number; completionRate: number }>;
}

export interface HrPerformanceAnalytics {
  avgScore: number;
  distribution: Array<{ level: string; count: number; percentage: number }>;
  byDepartment: Array<{ department: string; avgScore: number }>;
  improvement: number;
}

export interface CompensationAnalytics {
  avgSalary: number;
  medianSalary: number;
  byDepartment: Array<{ department: string; avgSalary: number }>;
  salaryRange: { min: number; max: number };
  totalPayroll: number;
}

export interface StudentAnalytics {
  enrollment: EnrollmentAnalytics;
  academic: StudentAcademicAnalytics;
  discipline: DisciplineAnalytics;
  health: HealthAnalytics;
  payments: StudentPaymentAnalytics;
  engagement: EngagementAnalytics;
  risk: StudentRiskAnalytics;
  dropout: DropoutPrediction;
}

export interface EnrollmentAnalytics {
  total: number;
  new: number;
  returning: number;
  transferred: number;
  dropped: number;
  retentionRate: number;
  byClass: Array<{ class: string; count: number }>;
  byMonth: Array<{ month: string; enrollments: number }>;
  trend: Array<{ period: string; count: number }>;
}

export interface StudentAcademicAnalytics {
  avgGPA: number;
  avgAttendance: number;
  passRate: number;
  honorRoll: number;
  academicProbation: number;
  byClass: Array<{ class: string; avgGPA: number; passRate: number }>;
  improvement: number;
}

export interface DisciplineAnalytics {
  totalIncidents: number;
  resolvedIncidents: number;
  byType: Array<{ type: string; count: number }>;
  byMonth: Array<{ month: string; count: number }>;
  topStudents: Array<{ studentId: string; name: string; incidents: number }>;
}

export interface HealthAnalytics {
  totalRecords: number;
  healthIssues: number;
  vaccinationRate: number;
  bmiDistribution: Array<{ range: string; count: number }>;
}

export interface StudentPaymentAnalytics {
  totalDue: number;
  totalPaid: number;
  outstanding: number;
  overdue: number;
  collectionRate: number;
  avgPaymentDelay: number;
  byClass: Array<{ class: string; paid: number; due: number }>;
}

export interface EngagementAnalytics {
  avgLoginFrequency: number;
  avgSessionDuration: number;
  activeUsers: number;
  inactiveUsers: number;
  appUsage: number;
  featureUsage: Array<{ feature: string; users: number; percentage: number }>;
}

export interface StudentRiskAnalytics {
  atRiskCount: number;
  riskDistribution: Array<{ level: RiskLevelType; count: number; percentage: number }>;
  byFactor: Array<{ factor: string; count: number; impact: number }>;
  interventions: number;
  improvementRate: number;
}

export interface DropoutPrediction {
  predictedDropouts: number;
  confidence: number;
  factors: Array<{ factor: string; weight: number; description: string }>;
  recommendations: string[];
  atRiskStudents: Array<{ studentId: string; name: string; riskScore: number; factors: string[] }>;
}

export interface TeacherAnalytics {
  performance: TeacherPerformanceAnalytics;
  attendance: TeacherAttendanceAnalytics;
  workload: TeacherWorkloadAnalytics;
  satisfaction: TeacherSatisfactionAnalytics;
  kpis: TeacherKPIsData;
}

export interface TeacherPerformanceAnalytics {
  avgRating: number;
  distribution: Array<{ rating: number; count: number }>;
  topPerformers: Array<{ teacherId: string; name: string; rating: number }>;
  improvement: number;
  bySubject: Array<{ subject: string; avgRating: number }>;
}

export interface TeacherAttendanceAnalytics {
  avgRate: number;
  byTeacher: Array<{ teacherId: string; name: string; rate: number }>;
  byMonth: Array<{ month: string; rate: number }>;
}

export interface TeacherWorkloadAnalytics {
  avgClassesPerTeacher: number;
  avgHoursPerWeek: number;
  avgStudentsPerTeacher: number;
  overloaded: number;
  byDepartment: Array<{ department: string; avgLoad: number }>;
}

export interface TeacherSatisfactionAnalytics {
  avgScore: number;
  distribution: Array<{ score: number; count: number }>;
  byCategory: Array<{ category: string; score: number }>;
  trend: Array<{ period: string; score: number }>;
}

export interface TeacherKPIsData {
  avgPerformance: number;
  avgAttendance: number;
  avgStudentSatisfaction: number;
  avgClassPerformance: number;
  certificationRate: number;
  trainingCompletion: number;
}

export interface ParentAnalytics {
  payments: ParentPaymentAnalytics;
  engagement: ParentEngagementAnalytics;
  communication: ParentCommunicationAnalytics;
  satisfaction: ParentSatisfactionAnalytics;
}

export interface ParentPaymentAnalytics {
  totalPaid: number;
  avgPaymentTime: number;
  onTimeRate: number;
  byParent: Array<{ parentId: string; name: string; totalPaid: number; onTime: boolean }>;
}

export interface ParentEngagementAnalytics {
  appUsage: number;
  loginFrequency: number;
  featureUsage: Array<{ feature: string; percentage: number }>;
  activeRate: number;
}

export interface ParentCommunicationAnalytics {
  messagesSent: number;
  messagesRead: number;
  readRate: number;
  avgResponseTime: number;
  byChannel: Array<{ channel: string; count: number }>;
}

export interface ParentSatisfactionAnalytics {
  avgScore: number;
  nps: number;
  distribution: Array<{ score: number; count: number }>;
  feedback: Array<{ theme: string; count: number; sentiment: string }>;
}

export interface PredictiveAIResult {
  model: PredictiveModelType;
  predictions: Prediction[];
  accuracy: number;
  confidence: number;
  generatedAt: string;
  factors: PredictionFactor[];
  recommendations: string[];
}

export interface Prediction {
  entityId: string;
  entityName: string;
  entityType: string;
  riskScore: number;
  riskLevel: RiskLevelType;
  factors: string[];
  probability: number;
  suggestedAction: string;
}

export interface PredictionFactor {
  name: string;
  weight: number;
  impact: number;
  description: string;
}

export interface ReportConfig {
  id: string;
  name: string;
  description: string;
  dataSource: DataSourceTypeEnum;
  filters: Record<string, unknown>;
  groupBy: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  columns: ReportColumn[];
  charts: ReportChart[];
  schedule: ReportScheduleType;
  scheduleConfig: Record<string, unknown>;
  recipients: string[];
  format: ExportFormatType;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportColumn {
  key: string;
  label: string;
  type: string;
  format?: string;
  width?: number;
  visible: boolean;
}

export interface ReportChart {
  id: string;
  type: ChartTypeEnum;
  title: string;
  dataSource: DataSourceTypeEnum;
  xAxis: string;
  yAxis: string;
  series: string[];
  colors: string[];
  position: { x: number; y: number; w: number; h: number };
}

export interface DashboardWidget {
  id: string;
  type: WidgetTypeEnum;
  title: string;
  dataSource: DataSourceTypeEnum;
  config: Record<string, unknown>;
  position: { x: number; y: number; w: number; h: number };
  refreshInterval: number;
  visible: boolean;
}

export interface CustomDashboard {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  isDefault: boolean;
  isShared: boolean;
  sharedWith: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataWarehouseFact {
  id: string;
  date: string;
  schoolId: string;
  metric: string;
  value: number;
  dimensions: Record<string, string>;
  createdAt: string;
}

export interface DataWarehouseDimension {
  id: string;
  name: string;
  type: string;
  attributes: Record<string, unknown>;
}

export interface ETLJob {
  id: string;
  name: string;
  source: string;
  destination: string;
  status: string;
  lastRun: string;
  nextRun: string;
  recordsProcessed: number;
  errors: number;
  duration: number;
}

export interface ScheduledReport {
  id: string;
  reportConfigId: string;
  schedule: ReportScheduleType;
  lastRun: string;
  nextRun: string;
  recipients: string[];
  channel: string;
  status: string;
  createdAt: string;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
  metadata: Record<string, unknown>;
}

export interface ChartDataset {
  label: string;
  data: number[];
  color?: string;
  type?: ChartTypeEnum;
}

export interface GeoMapData {
  regions: Array<{ id: string; name: string; value: number; coordinates?: { lat: number; lng: number } }>;
  metadata: Record<string, unknown>;
}

export interface HeatmapData {
  rows: string[];
  columns: string[];
  values: number[][];
  min: number;
  max: number;
}

export interface FunnelData {
  stages: Array<{ name: string; value: number; percentage: number }>;
}

export interface AnalyticsRepository {
  getExecutiveDashboard(dateFrom?: string, dateTo?: string): Promise<ExecutiveDashboard>;
  getAcademicAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<AcademicAnalytics>;
  getFinancialAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<FinancialAnalytics>;
  getHrAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<HrAnalytics>;
  getStudentAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<StudentAnalytics>;
  getTeacherAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<TeacherAnalytics>;
  getParentAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<ParentAnalytics>;

  runPredictiveModel(model: PredictiveModelType, schoolId: string, params?: Record<string, unknown>): Promise<PredictiveAIResult>;
  getPredictions(model: PredictiveModelType, schoolId: string): Promise<Prediction[]>;

  createReport(config: Partial<ReportConfig>): Promise<ReportConfig>;
  updateReport(reportId: string, config: Partial<ReportConfig>): Promise<ReportConfig>;
  deleteReport(reportId: string): Promise<void>;
  getReport(reportId: string): Promise<ReportConfig | null>;
  listReports(filters?: Record<string, unknown>): Promise<ReportConfig[]>;
  executeReport(reportId: string, format: ExportFormatType): Promise<Record<string, unknown>>;

  createDashboard(config: Partial<CustomDashboard>): Promise<CustomDashboard>;
  updateDashboard(dashboardId: string, config: Partial<CustomDashboard>): Promise<CustomDashboard>;
  deleteDashboard(dashboardId: string): Promise<void>;
  getDashboard(dashboardId: string): Promise<CustomDashboard | null>;
  listDashboards(userId: string): Promise<CustomDashboard[]>;
  shareDashboard(dashboardId: string, userIds: string[]): Promise<CustomDashboard>;

  addWidget(dashboardId: string, widget: Partial<DashboardWidget>): Promise<DashboardWidget>;
  updateWidget(dashboardId: string, widgetId: string, widget: Partial<DashboardWidget>): Promise<DashboardWidget>;
  removeWidget(dashboardId: string, widgetId: string): Promise<void>;

  getChartData(dataSource: DataSourceTypeEnum, chartType: ChartTypeEnum, params?: Record<string, unknown>): Promise<ChartData>;
  getGeoMapData(params?: Record<string, unknown>): Promise<GeoMapData>;
  getHeatmapData(params?: Record<string, unknown>): Promise<HeatmapData>;
  getFunnelData(params?: Record<string, unknown>): Promise<FunnelData>;

  exportData(format: ExportFormatType, dataSource: DataSourceTypeEnum, params?: Record<string, unknown>): Promise<Record<string, unknown>>;
  importData(format: ExportFormatType, dataSource: DataSourceTypeEnum, data: Record<string, unknown>): Promise<{ imported: number; errors: number }>;

  createScheduledReport(config: Partial<ScheduledReport>): Promise<ScheduledReport>;
  updateScheduledReport(id: string, config: Partial<ScheduledReport>): Promise<ScheduledReport>;
  deleteScheduledReport(id: string): Promise<void>;
  listScheduledReports(): Promise<ScheduledReport[]>;
  executeScheduledReport(id: string): Promise<void>;

  getFactTable(params?: Record<string, unknown>): Promise<DataWarehouseFact[]>;
  getDimension(type: string): Promise<DataWarehouseDimension[]>;
  runETL(jobId: string): Promise<ETLJob>;
  getETLJobs(): Promise<ETLJob[]>;

  logAnalyticsEvent(schoolId: string, event: string, data: Record<string, unknown>): Promise<void>;
  getAnalyticsEvents(schoolId: string, dateFrom?: string, dateTo?: string): Promise<Record<string, unknown>[]>;
}

export const ConversationType = { DIRECT: 'direct', GROUP: 'group', CHANNEL: 'channel', BROADCAST: 'broadcast', SUPPORT: 'support', ANNOUNCEMENT: 'announcement' } as const;
export type ConversationType = (typeof ConversationType)[keyof typeof ConversationType];

export const ConversationStatus = { ACTIVE: 'active', ARCHIVED: 'archived', DELETED: 'deleted', MUTED: 'muted', PINNED: 'pinned' } as const;
export type ConversationStatus = (typeof ConversationStatus)[keyof typeof ConversationStatus];

export const MessageType = { TEXT: 'text', IMAGE: 'image', VIDEO: 'video', AUDIO: 'audio', DOCUMENT: 'document', GIF: 'gif', STICKER: 'sticker', LOCATION: 'location', CONTACT: 'contact', POLL: 'poll', SYSTEM: 'system', VOICE_NOTE: 'voice_note' } as const;
export type MessageType = (typeof MessageType)[keyof typeof MessageType];

export const MessageStatus = { SENT: 'sent', DELIVERED: 'delivered', READ: 'read', PENDING: 'pending', FAILED: 'failed', DELETED: 'deleted', EDITED: 'edited' } as const;
export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];

export const MessagePriority = { LOW: 'low', NORMAL: 'normal', HIGH: 'high', URGENT: 'urgent' } as const;
export type MessagePriority = (typeof MessagePriority)[keyof typeof MessagePriority];

export const GroupType = { CLASS: 'class', PARENTS: 'parents', TEACHERS: 'teachers', ADMINISTRATION: 'administration', DIRECTION: 'direction', HR: 'hr', FINANCE: 'finance', DEPARTMENT: 'department', PROJECT: 'project', COMMITTEE: 'committee', CLUB: 'club', ASSOCIATION: 'association', CUSTOM: 'custom' } as const;
export type GroupType = (typeof GroupType)[keyof typeof GroupType];

export const GroupRole = { OWNER: 'owner', ADMIN: 'admin', MODERATOR: 'moderator', MEMBER: 'member', GUEST: 'guest' } as const;
export type GroupRole = (typeof GroupRole)[keyof typeof GroupRole];

export const CallType = { AUDIO: 'audio', VIDEO: 'video', CONFERENCE: 'conference' } as const;
export type CallType = (typeof CallType)[keyof typeof CallType];

export const CallStatus = { RINGING: 'ringing', ACTIVE: 'active', ENDED: 'ended', MISSED: 'missed', DECLINED: 'declined', BUSY: 'busy' } as const;
export type CallStatus = (typeof CallStatus)[keyof typeof CallStatus];

export const EmailStatus = { DRAFT: 'draft', SENT: 'sent', DELIVERED: 'delivered', OPENED: 'opened', READ: 'read', BOUNCED: 'bounced', FAILED: 'failed' } as const;
export type EmailStatus = (typeof EmailStatus)[keyof typeof EmailStatus];

export const SmsProvider = { ORANGE: 'orange', MTN: 'mtn', MOOV: 'moov', WAVE: 'wave' } as const;
export type SmsProvider = (typeof SmsProvider)[keyof typeof SmsProvider];

export const SmsStatus = { PENDING: 'pending', SENT: 'sent', DELIVERED: 'delivered', FAILED: 'failed' } as const;
export type SmsStatus = (typeof SmsStatus)[keyof typeof SmsStatus];

export const PushPlatform = { ANDROID: 'android', IOS: 'ios', WEB: 'web', DESKTOP: 'desktop' } as const;
export type PushPlatform = (typeof PushPlatform)[keyof typeof PushPlatform];

export const PushStatus = { PENDING: 'pending', SENT: 'sent', DELIVERED: 'delivered', OPENED: 'opened', FAILED: 'failed' } as const;
export type PushStatus = (typeof PushStatus)[keyof typeof PushStatus];

export const AnnouncementType = { DIRECTION: 'direction', CLASS: 'class', SCHOOL: 'school', EMERGENCY: 'emergency', EVENT: 'event', REMINDER: 'reminder', ABSENCE: 'absence', RESULTS: 'results', PAYMENT: 'payment', EXAM: 'exam', TRANSPORT: 'transport', CANTEEN: 'canteen' } as const;
export type AnnouncementType = (typeof AnnouncementType)[keyof typeof AnnouncementType];

export const AnnouncementPriority = { LOW: 'low', NORMAL: 'normal', HIGH: 'high', CRITICAL: 'critical' } as const;
export type AnnouncementPriority = (typeof AnnouncementPriority)[keyof typeof AnnouncementPriority];

export const CalendarEventType = { EXAM: 'exam', MEETING: 'meeting', EVENT: 'event', HOLIDAY: 'holiday', BIRTHDAY: 'birthday', TRAINING: 'training', PARENT_DAY: 'parent_day', SPORTS: 'sports' } as const;
export type CalendarEventType = (typeof CalendarEventType)[keyof typeof CalendarEventType];

export const TaskStatus = { TODO: 'todo', IN_PROGRESS: 'in_progress', REVIEW: 'review', DONE: 'done', CANCELLED: 'cancelled' } as const;
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskPriority = { LOW: 'low', NORMAL: 'normal', HIGH: 'high', URGENT: 'urgent' } as const;
export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

export const DocumentType = { FILE: 'file', FOLDER: 'folder', IMAGE: 'image', VIDEO: 'video', AUDIO: 'audio', PDF: 'pdf', SPREADSHEET: 'spreadsheet', PRESENTATION: 'presentation', OTHER: 'other' } as const;
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];

export const DocumentPermissionLevel = { VIEW: 'view', COMMENT: 'comment', EDIT: 'edit', ADMIN: 'admin' } as const;
export type DocumentPermissionLevel = (typeof DocumentPermissionLevel)[keyof typeof DocumentPermissionLevel];

export const CollaborationMode = { EDIT: 'edit', COMMENT: 'comment', VIEW: 'view' } as const;
export type CollaborationMode = (typeof CollaborationMode)[keyof typeof CollaborationMode];

export const AISummaryType = { CONVERSATION: 'conversation', MEETING: 'meeting', DOCUMENT: 'document', EMAIL: 'email' } as const;
export type AISummaryType = (typeof AISummaryType)[keyof typeof AISummaryType];

export const SpamAction = { ALLOW: 'allow', QUARANTINE: 'quarantine', BLOCK: 'block' } as const;
export type SpamAction = (typeof SpamAction)[keyof typeof SpamAction];

export const ThreadStatus = { OPEN: 'open', LOCKED: 'locked', RESOLVED: 'resolved' } as const;
export type ThreadStatus = (typeof ThreadStatus)[keyof typeof ThreadStatus];

export const ReactionType = { LIKE: 'like', LOVE: 'love', LAUGH: 'laugh', WOW: 'wow', SAD: 'sad', ANGRY: 'angry', THUMBS_UP: 'thumbs_up', THUMBS_DOWN: 'thumbs_down', FIRE: 'fire', CLAP: 'clap', HEART: 'heart', CHECK: 'check' } as const;
export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType];

export const MentionType = { USER: 'user', GROUP: 'group', CHANNEL: 'channel', EVERYONE: 'everyone', ROLE: 'role' } as const;
export type MentionType = (typeof MentionType)[keyof typeof MentionType];

export const TypingStatus = { TYPING: 'typing', STOPPED: 'stopped' } as const;
export type TypingStatus = (typeof TypingStatus)[keyof typeof TypingStatus];

export const OnlineStatus = { ONLINE: 'online', AWAY: 'away', BUSY: 'busy', OFFLINE: 'offline' } as const;
export type OnlineStatus = (typeof OnlineStatus)[keyof typeof OnlineStatus];

export const SearchScope = { MESSAGES: 'messages', CONVERSATIONS: 'conversations', FILES: 'files', CONTACTS: 'contacts', ALL: 'all' } as const;
export type SearchScope = (typeof SearchScope)[keyof typeof SearchScope];

export const NotificationEventType = { MESSAGE: 'message', MENTION: 'mention', CALL: 'call', ANNOUNCEMENT: 'announcement', TASK: 'task', DOCUMENT: 'document', CALENDAR: 'calendar', SYSTEM: 'system' } as const;
export type NotificationEventType = (typeof NotificationEventType)[keyof typeof NotificationEventType];

export interface Conversation {
  id: string;
  schoolId: string;
  type: ConversationType;
  name?: string;
  description?: string;
  avatar?: string;
  creatorId: string;
  participants: string[];
  admins: string[];
  lastMessage?: Message;
  lastMessageAt?: string;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  status: ConversationStatus;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  schoolId: string;
  senderId: string;
  type: MessageType;
  content: string;
  replyTo?: string;
  threadId?: string;
  isEdited: boolean;
  isDeleted: boolean;
  isPinned: boolean;
  status: MessageStatus;
  priority: MessagePriority;
  reactions: MessageReaction[];
  mentions: MessageMention[];
  attachments: MessageAttachment[];
  readBy: MessageRead[];
  deliveredTo: MessageDelivered[];
  scheduledAt?: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface MessageAttachment {
  id: string;
  messageId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  thumbnailUrl?: string;
  duration?: number;
  width?: number;
  height?: number;
  transcription?: string;
  metadata?: Record<string, unknown>;
}

export interface MessageReaction {
  id: string;
  messageId: string;
  userId: string;
  type: ReactionType;
  createdAt: string;
}

export interface MessageMention {
  id: string;
  messageId: string;
  userId: string;
  type: MentionType;
  position: number;
  length: number;
}

export interface MessageThread {
  id: string;
  parentMessageId: string;
  conversationId: string;
  replyCount: number;
  lastReplyAt: string;
  isLocked: boolean;
  createdAt: string;
}

export interface MessageRead {
  id: string;
  messageId: string;
  userId: string;
  readAt: string;
}

export interface MessageDelivered {
  id: string;
  messageId: string;
  userId: string;
  deliveredAt: string;
}

export interface Group {
  id: string;
  schoolId: string;
  type: GroupType;
  name: string;
  description?: string;
  avatar?: string;
  creatorId: string;
  members: GroupMember[];
  admins: string[];
  settings: GroupSettings;
  isPublic: boolean;
  maxMembers: number;
  inviteLink?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: GroupRole;
  joinedAt: string;
  mutedUntil?: string;
  notifications: boolean;
  metadata?: Record<string, unknown>;
}

export interface GroupInvite {
  id: string;
  groupId: string;
  invitedBy: string;
  email?: string;
  phone?: string;
  role: GroupRole;
  status: string;
  expiresAt: string;
  createdAt: string;
}

export interface GroupSettings {
  id: string;
  groupId: string;
  whoCanPost: string;
  whoCanAddMembers: string;
  whoCanEditInfo: string;
  whoCanInvite: string;
  autoJoin: boolean;
  approvalRequired: boolean;
  metadata?: Record<string, unknown>;
}

export interface Call {
  id: string;
  schoolId: string;
  type: CallType;
  status: CallStatus;
  callerId: string;
  participants: CallParticipant[];
  groupId?: string;
  startedAt: string;
  endedAt?: string;
  duration?: number;
  recording?: CallRecording;
  screenShare: boolean;
  metadata?: Record<string, unknown>;
}

export interface CallParticipant {
  id: string;
  callId: string;
  userId: string;
  joinedAt: string;
  leftAt?: string;
  isMuted: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  connectionQuality: string;
}

export interface CallRecording {
  id: string;
  callId: string;
  url: string;
  duration: number;
  size: number;
  format: string;
  createdAt: string;
}

export interface CallInvitation {
  id: string;
  callId: string;
  invitedBy: string;
  userId: string;
  status: string;
  sentAt: string;
  respondedAt?: string;
}

export interface Email {
  id: string;
  schoolId: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  htmlBody?: string;
  attachments: MessageAttachment[];
  status: EmailStatus;
  templateId?: string;
  campaignId?: string;
  trackingId?: string;
  sentAt?: string;
  openedAt?: string;
  readAt?: string;
  bouncedAt?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface EmailTemplate {
  id: string;
  schoolId: string;
  name: string;
  subject: string;
  body: string;
  htmlBody?: string;
  variables: string[];
  category: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailCampaign {
  id: string;
  schoolId: string;
  name: string;
  templateId: string;
  recipients: string[];
  schedule?: string;
  status: string;
  stats: EmailCampaignStats;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailCampaignStats {
  total: number;
  sent: number;
  delivered: number;
  opened: number;
  read: number;
  bounced: number;
  failed: number;
  clicked: number;
}

export interface EmailTracking {
  id: string;
  emailId: string;
  event: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface EmailSignature {
  id: string;
  schoolId: string;
  userId: string;
  name: string;
  content: string;
  isDefault: boolean;
  createdAt: string;
}

export interface SmsMessage {
  id: string;
  schoolId: string;
  provider: SmsProvider;
  from: string;
  to: string;
  body: string;
  status: SmsStatus;
  scheduledAt?: string;
  sentAt?: string;
  deliveredAt?: string;
  failedAt?: string;
  errorMessage?: string;
  cost: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface SmsBulk {
  id: string;
  schoolId: string;
  name: string;
  templateId?: string;
  recipients: string[];
  schedule?: string;
  status: string;
  stats: SmsBulkStats;
  createdBy: string;
  createdAt: string;
}

export interface SmsBulkStats {
  total: number;
  sent: number;
  delivered: number;
  failed: number;
  cost: number;
}

export interface SmsTemplate {
  id: string;
  schoolId: string;
  name: string;
  body: string;
  variables: string[];
  category: string;
  isActive: boolean;
  createdAt: string;
}

export interface PushNotification {
  id: string;
  schoolId: string;
  platform: PushPlatform;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  imageUrl?: string;
  actionUrl?: string;
  status: PushStatus;
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  failedAt?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface PushSubscription {
  id: string;
  userId: string;
  schoolId: string;
  platform: PushPlatform;
  endpoint: string;
  keys: Record<string, string>;
  isActive: boolean;
  createdAt: string;
}

export interface PushTemplate {
  id: string;
  schoolId: string;
  name: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  platform: PushPlatform;
  isActive: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  schoolId: string;
  type: AnnouncementType;
  title: string;
  body: string;
  htmlBody?: string;
  priority: AnnouncementPriority;
  targetAudience: string[];
  targetClasses: string[];
  targetUsers: string[];
  attachments: MessageAttachment[];
  schedule?: string;
  status: string;
  readBy: AnnouncementRead[];
  acknowledgedBy: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnnouncementRead {
  id: string;
  announcementId: string;
  userId: string;
  readAt: string;
  acknowledgedAt?: string;
}

export interface CalendarEvent {
  id: string;
  schoolId: string;
  title: string;
  description?: string;
  type: CalendarEventType;
  startDate: string;
  endDate: string;
  allDay: boolean;
  location?: string;
  organizer: string;
  attendees: CalendarAttendee[];
  recurrence?: string;
  reminders: CalendarReminder[];
  attachments: MessageAttachment[];
  color?: string;
  isPublic: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarAttendee {
  id: string;
  eventId: string;
  userId: string;
  status: string;
  role: string;
  respondedAt?: string;
}

export interface CalendarReminder {
  id: string;
  eventId: string;
  type: string;
  minutesBefore: number;
  sent: boolean;
}

export interface CalendarSubscription {
  id: string;
  schoolId: string;
  userId: string;
  provider: string;
  externalId: string;
  syncToken?: string;
  lastSyncAt?: string;
}

export interface Task {
  id: string;
  schoolId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  creatorId: string;
  dueDate?: string;
  startDate?: string;
  completedAt?: string;
  checklist: TaskChecklist[];
  attachments: MessageAttachment[];
  comments: TaskComment[];
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  attachments: MessageAttachment[];
  createdAt: string;
}

export interface TaskChecklist {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
  order: number;
  createdAt: string;
}

export interface TaskAssignment {
  id: string;
  taskId: string;
  userId: string;
  assignedBy: string;
  assignedAt: string;
}

export interface Document {
  id: string;
  schoolId: string;
  name: string;
  type: DocumentType;
  parentId?: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  content?: string;
  creatorId: string;
  permissions: DocumentPermissionEntry[];
  versions: DocumentVersion[];
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  url: string;
  size: number;
  changes?: string;
  createdBy: string;
  createdAt: string;
}

export interface DocumentPermissionEntry {
  id: string;
  documentId: string;
  userId: string;
  permission: DocumentPermissionLevel;
  grantedBy: string;
  grantedAt: string;
}

export interface DocumentComment {
  id: string;
  documentId: string;
  userId: string;
  content: string;
  position?: Record<string, unknown>;
  resolved: boolean;
  createdAt: string;
}

export interface CollaborationSession {
  id: string;
  documentId: string;
  schoolId: string;
  userId: string;
  cursor?: Record<string, unknown>;
  selection?: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CollaborationPresence {
  id: string;
  sessionId: string;
  userId: string;
  cursor?: Record<string, unknown>;
  selection?: Record<string, unknown>;
  color: string;
  isActive: boolean;
  lastSeen: string;
}

export interface AISummary {
  id: string;
  schoolId: string;
  sourceType: AISummaryType;
  sourceId: string;
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  sentiment: string;
  language: string;
  wordCount: number;
  createdAt: string;
}

export interface AITranslation {
  id: string;
  schoolId: string;
  sourceText: string;
  targetLanguage: string;
  translatedText: string;
  confidence: number;
  createdAt: string;
}

export interface AICorrection {
  id: string;
  schoolId: string;
  originalText: string;
  correctedText: string;
  changes: Array<{ original: string; corrected: string; position: number }>;
  language: string;
  createdAt: string;
}

export interface AIResponse {
  id: string;
  schoolId: string;
  context: string;
  suggestedResponse: string;
  confidence: number;
  tone: string;
  createdAt: string;
}

export interface AIMeetingSummary {
  id: string;
  meetingId: string;
  schoolId: string;
  summary: string;
  attendees: string[];
  decisions: string[];
  actionItems: string[];
  nextSteps: string[];
  duration: number;
  createdAt: string;
}

export interface AISpamDetection {
  id: string;
  schoolId: string;
  content: string;
  isSpam: boolean;
  confidence: number;
  reason: string;
  action: SpamAction;
  createdAt: string;
}

export interface Notification {
  id: string;
  schoolId: string;
  userId: string;
  type: NotificationEventType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  channel: string;
  status: string;
  readAt?: string;
  createdAt: string;
}

export interface NotificationPreference {
  id: string;
  userId: string;
  schoolId: string;
  channel: string;
  eventType: NotificationEventType;
  enabled: boolean;
  metadata?: Record<string, unknown>;
}

export interface NotificationBatch {
  id: string;
  schoolId: string;
  type: NotificationEventType;
  recipients: string[];
  status: string;
  stats: NotificationBatchStats;
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
}

export interface NotificationBatchStats {
  total: number;
  sent: number;
  delivered: number;
  failed: number;
}

export interface Contact {
  id: string;
  schoolId: string;
  userId: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role: string;
  department?: string;
  isOnline: boolean;
  lastSeen?: string;
  metadata?: Record<string, unknown>;
}

export interface ContactGroup {
  id: string;
  schoolId: string;
  name: string;
  members: string[];
  createdBy: string;
  createdAt: string;
}

export interface LinkPreview {
  id: string;
  url: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
  type?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface UserPresence {
  id: string;
  userId: string;
  schoolId: string;
  status: OnlineStatus;
  lastSeen: string;
  device?: string;
  metadata?: Record<string, unknown>;
  updatedAt: string;
}

export interface Poll {
  id: string;
  schoolId: string;
  conversationId: string;
  question: string;
  options: PollOption[];
  creatorId: string;
  isAnonymous: boolean;
  expiresAt?: string;
  status: string;
  createdAt: string;
}

export interface PollOption {
  id: string;
  pollId: string;
  text: string;
  voteCount: number;
}

export interface PollVote {
  id: string;
  pollId: string;
  userId: string;
  optionId: string;
  createdAt: string;
}

export interface Webhook {
  id: string;
  schoolId: string;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  lastTriggered?: string;
  failureCount: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ScheduledMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  scheduledAt: string;
  status: string;
  sentAt?: string;
  createdAt: string;
}

export interface AutoResponse {
  id: string;
  schoolId: string;
  trigger: string;
  response: string;
  isActive: boolean;
  priority: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Channel {
  id: string;
  schoolId: string;
  name: string;
  description?: string;
  type: string;
  creatorId: string;
  members: string[];
  settings: Record<string, unknown>;
  isPublic: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SearchQuery {
  id: string;
  schoolId: string;
  userId: string;
  query: string;
  scope: SearchScope;
  filters?: Record<string, unknown>;
  results: number;
  duration: number;
  createdAt: string;
}

export interface ExportJob {
  id: string;
  schoolId: string;
  type: string;
  format: string;
  status: string;
  fileUrl?: string;
  expiresAt?: string;
  createdBy: string;
  createdAt: string;
}

export interface CommunicationRepository {
  getConversations(schoolId: string, userId: string, filters?: Record<string, unknown>): Promise<Conversation[]>;
  getConversation(conversationId: string): Promise<Conversation | null>;
  createConversation(data: Partial<Conversation>): Promise<Conversation>;
  updateConversation(conversationId: string, data: Partial<Conversation>): Promise<Conversation>;
  deleteConversation(conversationId: string): Promise<void>;
  archiveConversation(conversationId: string): Promise<Conversation>;
  muteConversation(conversationId: string, muted: boolean): Promise<Conversation>;
  pinConversation(conversationId: string, pinned: boolean): Promise<Conversation>;
  addParticipant(conversationId: string, userId: string): Promise<Conversation>;
  removeParticipant(conversationId: string, userId: string): Promise<Conversation>;
  getMessages(conversationId: string, filters?: Record<string, unknown>): Promise<Message[]>;
  getMessage(messageId: string): Promise<Message | null>;
  sendMessage(data: Partial<Message>): Promise<Message>;
  editMessage(messageId: string, content: string): Promise<Message>;
  deleteMessage(messageId: string): Promise<void>;
  pinMessage(messageId: string, pinned: boolean): Promise<Message>;
  reactToMessage(messageId: string, userId: string, type: ReactionType): Promise<MessageReaction>;
  removeReaction(messageId: string, userId: string): Promise<void>;
  replyToMessage(messageId: string, data: Partial<Message>): Promise<Message>;
  forwardMessage(messageId: string, conversationIds: string[]): Promise<Message[]>;
  searchMessages(schoolId: string, query: string, filters?: Record<string, unknown>): Promise<Message[]>;
  markAsRead(messageId: string, userId: string): Promise<void>;
  markAsDelivered(messageId: string, userId: string): Promise<void>;
  getUnreadCount(conversationId: string, userId: string): Promise<number>;
  getThread(threadId: string): Promise<MessageThread | null>;
  getThreadMessages(threadId: string): Promise<Message[]>;
  lockThread(threadId: string, locked: boolean): Promise<MessageThread>;
  getGroups(schoolId: string, filters?: Record<string, unknown>): Promise<Group[]>;
  getGroup(groupId: string): Promise<Group | null>;
  createGroup(data: Partial<Group>): Promise<Group>;
  updateGroup(groupId: string, data: Partial<Group>): Promise<Group>;
  deleteGroup(groupId: string): Promise<void>;
  addGroupMember(groupId: string, userId: string, role: GroupRole): Promise<GroupMember>;
  removeGroupMember(groupId: string, userId: string): Promise<void>;
  updateGroupMemberRole(groupId: string, userId: string, role: GroupRole): Promise<GroupMember>;
  inviteToGroup(groupId: string, data: Partial<GroupInvite>): Promise<GroupInvite>;
  getGroupInvites(groupId: string): Promise<GroupInvite[]>;
  getCalls(schoolId: string, filters?: Record<string, unknown>): Promise<Call[]>;
  getCall(callId: string): Promise<Call | null>;
  initiateCall(data: Partial<Call>): Promise<Call>;
  joinCall(callId: string, userId: string): Promise<CallParticipant>;
  leaveCall(callId: string, userId: string): Promise<void>;
  endCall(callId: string): Promise<Call>;
  muteCallParticipant(callId: string, userId: string, muted: boolean): Promise<CallParticipant>;
  toggleVideo(callId: string, userId: string, enabled: boolean): Promise<CallParticipant>;
  toggleScreenShare(callId: string, userId: string, sharing: boolean): Promise<CallParticipant>;
  getCallRecording(callId: string): Promise<CallRecording | null>;
  getEmails(schoolId: string, filters?: Record<string, unknown>): Promise<Email[]>;
  getEmail(emailId: string): Promise<Email | null>;
  sendEmail(data: Partial<Email>): Promise<Email>;
  saveDraft(data: Partial<Email>): Promise<Email>;
  deleteEmail(emailId: string): Promise<void>;
  getEmailTemplates(schoolId: string): Promise<EmailTemplate[]>;
  createEmailTemplate(data: Partial<EmailTemplate>): Promise<EmailTemplate>;
  updateEmailTemplate(templateId: string, data: Partial<EmailTemplate>): Promise<EmailTemplate>;
  deleteEmailTemplate(templateId: string): Promise<void>;
  sendCampaign(data: Partial<EmailCampaign>): Promise<EmailCampaign>;
  getEmailCampaigns(schoolId: string): Promise<EmailCampaign[]>;
  getEmailSignatures(schoolId: string, userId: string): Promise<EmailSignature[]>;
  getSmsMessages(schoolId: string, filters?: Record<string, unknown>): Promise<SmsMessage[]>;
  sendSms(data: Partial<SmsMessage>): Promise<SmsMessage>;
  sendBulkSms(data: Partial<SmsBulk>): Promise<SmsBulk>;
  getSmsTemplates(schoolId: string): Promise<SmsTemplate[]>;
  createSmsTemplate(data: Partial<SmsTemplate>): Promise<SmsTemplate>;
  getPushNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<PushNotification[]>;
  sendPushNotification(data: Partial<PushNotification>): Promise<PushNotification>;
  subscribeToPush(data: Partial<PushSubscription>): Promise<PushSubscription>;
  unsubscribeFromPush(subscriptionId: string): Promise<void>;
  getPushTemplates(schoolId: string): Promise<PushTemplate[]>;
  getAnnouncements(schoolId: string, filters?: Record<string, unknown>): Promise<Announcement[]>;
  getAnnouncement(announcementId: string): Promise<Announcement | null>;
  createAnnouncement(data: Partial<Announcement>): Promise<Announcement>;
  updateAnnouncement(announcementId: string, data: Partial<Announcement>): Promise<Announcement>;
  deleteAnnouncement(announcementId: string): Promise<void>;
  publishAnnouncement(announcementId: string): Promise<Announcement>;
  acknowledgeAnnouncement(announcementId: string, userId: string): Promise<void>;
  getCalendarEvents(schoolId: string, filters?: Record<string, unknown>): Promise<CalendarEvent[]>;
  getCalendarEvent(eventId: string): Promise<CalendarEvent | null>;
  createCalendarEvent(data: Partial<CalendarEvent>): Promise<CalendarEvent>;
  updateCalendarEvent(eventId: string, data: Partial<CalendarEvent>): Promise<CalendarEvent>;
  deleteCalendarEvent(eventId: string): Promise<void>;
  respondToEvent(eventId: string, userId: string, status: string): Promise<CalendarAttendee>;
  getCalendarSubscriptions(schoolId: string, userId: string): Promise<CalendarSubscription[]>;
  getTasks(schoolId: string, filters?: Record<string, unknown>): Promise<Task[]>;
  getTask(taskId: string): Promise<Task | null>;
  createTask(data: Partial<Task>): Promise<Task>;
  updateTask(taskId: string, data: Partial<Task>): Promise<Task>;
  deleteTask(taskId: string): Promise<void>;
  assignTask(taskId: string, userId: string, assignedBy: string): Promise<TaskAssignment>;
  addTaskComment(taskId: string, data: Partial<TaskComment>): Promise<TaskComment>;
  toggleTaskChecklist(taskId: string, checklistId: string): Promise<TaskChecklist>;
  getDocuments(schoolId: string, filters?: Record<string, unknown>): Promise<Document[]>;
  getDocument(documentId: string): Promise<Document | null>;
  createDocument(data: Partial<Document>): Promise<Document>;
  updateDocument(documentId: string, data: Partial<Document>): Promise<Document>;
  deleteDocument(documentId: string): Promise<void>;
  moveDocument(documentId: string, parentId: string): Promise<Document>;
  shareDocument(documentId: string, userId: string, permission: DocumentPermissionLevel): Promise<DocumentPermissionEntry>;
  getDocumentVersions(documentId: string): Promise<DocumentVersion[]>;
  addDocumentVersion(documentId: string, data: Partial<DocumentVersion>): Promise<DocumentVersion>;
  addDocumentComment(documentId: string, data: Partial<DocumentComment>): Promise<DocumentComment>;
  startCollaborationSession(documentId: string, userId: string): Promise<CollaborationSession>;
  updateCollaborationPresence(sessionId: string, data: Partial<CollaborationPresence>): Promise<CollaborationPresence>;
  endCollaborationSession(sessionId: string): Promise<void>;
  getCollaborationSessions(documentId: string): Promise<CollaborationSession[]>;
  generateSummary(schoolId: string, sourceType: AISummaryType, sourceId: string): Promise<AISummary>;
  translateText(schoolId: string, text: string, targetLanguage: string): Promise<AITranslation>;
  correctText(schoolId: string, text: string, language: string): Promise<AICorrection>;
  suggestResponse(schoolId: string, context: string): Promise<AIResponse>;
  generateMeetingSummary(meetingId: string): Promise<AIMeetingSummary>;
  detectSpam(schoolId: string, content: string): Promise<AISpamDetection>;
  getNotifications(schoolId: string, userId: string, filters?: Record<string, unknown>): Promise<Notification[]>;
  markNotificationRead(notificationId: string): Promise<void>;
  getNotificationPreferences(userId: string, schoolId: string): Promise<NotificationPreference[]>;
  updateNotificationPreference(preferenceId: string, data: Partial<NotificationPreference>): Promise<NotificationPreference>;
  sendNotificationBatch(data: Partial<NotificationBatch>): Promise<NotificationBatch>;
  getContacts(schoolId: string, filters?: Record<string, unknown>): Promise<Contact[]>;
  getContact(contactId: string): Promise<Contact | null>;
  createContact(data: Partial<Contact>): Promise<Contact>;
  updateContact(contactId: string, data: Partial<Contact>): Promise<Contact>;
  deleteContact(contactId: string): Promise<void>;
  getContactGroups(schoolId: string): Promise<ContactGroup[]>;
  getPolls(conversationId: string): Promise<Poll[]>;
  getPoll(pollId: string): Promise<Poll | null>;
  createPoll(data: Partial<Poll>): Promise<Poll>;
  votePoll(pollId: string, userId: string, optionId: string): Promise<PollVote>;
  closePoll(pollId: string): Promise<Poll>;
  getWebhooks(schoolId: string): Promise<Webhook[]>;
  createWebhook(data: Partial<Webhook>): Promise<Webhook>;
  updateWebhook(webhookId: string, data: Partial<Webhook>): Promise<Webhook>;
  deleteWebhook(webhookId: string): Promise<void>;
  search(schoolId: string, query: string, scope: SearchScope, filters?: Record<string, unknown>): Promise<SearchQuery>;
  scheduleMessage(data: Partial<ScheduledMessage>): Promise<ScheduledMessage>;
  cancelScheduledMessage(messageId: string): Promise<void>;
  getScheduledMessages(conversationId: string): Promise<ScheduledMessage[]>;
  getAutoResponses(schoolId: string): Promise<AutoResponse[]>;
  createAutoResponse(data: Partial<AutoResponse>): Promise<AutoResponse>;
  updateAutoResponse(autoResponseId: string, data: Partial<AutoResponse>): Promise<AutoResponse>;
  deleteAutoResponse(autoResponseId: string): Promise<void>;
  getChannels(schoolId: string): Promise<Channel[]>;
  getChannel(channelId: string): Promise<Channel | null>;
  createChannel(data: Partial<Channel>): Promise<Channel>;
  updateChannel(channelId: string, data: Partial<Channel>): Promise<Channel>;
  deleteChannel(channelId: string): Promise<void>;
  updatePresence(userId: string, schoolId: string, status: OnlineStatus): Promise<UserPresence>;
  getPresence(schoolId: string, userIds: string[]): Promise<UserPresence[]>;
  exportConversation(conversationId: string, format: string): Promise<ExportJob>;
  exportDocuments(schoolId: string, format: string): Promise<ExportJob>;
  setTypingIndicator(conversationId: string, userId: string, status: TypingStatus): Promise<void>;
  getTypingUsers(conversationId: string): Promise<string[]>;
}

// ============================================================================
// DOCUMENT MANAGEMENT & DIGITAL WORKFLOW ENTERPRISE TYPES
// ============================================================================

// ------------------------------ Enums ------------------------------

export const DocStatus = {
  Draft: 'draft',
  InReview: 'in_review',
  Approved: 'approved',
  Published: 'published',
  Archived: 'archived',
  Deleted: 'deleted',
  Expired: 'expired',
  Superseded: 'superseded',
  UnderLegalHold: 'under_legal_hold',
  PendingDestruction: 'pending_destruction',
  Active: 'active',
  Inactive: 'inactive',
  Restricted: 'restricted',
  Quarantined: 'quarantined',
  Processing: 'processing',
} as const;
export type DocStatus = (typeof DocStatus)[keyof typeof DocStatus];

export const DocCategory = {
  Academic: 'academic',
  Administrative: 'administrative',
  Financial: 'financial',
  Legal: 'legal',
  HumanResources: 'human_resources',
  StudentRecords: 'student_records',
  FacultyRecords: 'faculty_records',
  Research: 'research',
  Accreditation: 'accreditation',
  Compliance: 'compliance',
  Policy: 'policy',
  Curriculum: 'curriculum',
  Examination: 'examination',
  Admission: 'admission',
  Graduation: 'graduation',
  Transfer: 'transfer',
  Extracurricular: 'extracurricular',
  Facility: 'facility',
  Technology: 'technology',
  Marketing: 'marketing',
  Communications: 'communications',
  Board: 'board',
  Minutes: 'minutes',
  Reports: 'reports',
  Templates: 'templates',
  Forms: 'forms',
  Certificates: 'certificates',
  Transcripts: 'transcripts',
  Diplomas: 'diplomas',
  Other: 'other',
} as const;
export type DocCategory = (typeof DocCategory)[keyof typeof DocCategory];

export const DocClassification = {
  Public: 'public',
  Internal: 'internal',
  Confidential: 'confidential',
  HighlyConfidential: 'highly_confidential',
  Restricted: 'restricted',
  TopSecret: 'top_secret',
  Unclassified: 'unclassified',
  ForOfficialUseOnly: 'for_official_use_only',
  PersonallyIdentifiable: 'personally_identifiable',
  ProtectedB: 'protected_b',
  ProtectedC: 'protected_c',
  FERPA: 'ferpa',
  HIPAA: 'hipaa',
  FERPAStudent: 'ferpa_student',
  FinancialAid: 'financial_aid',
  Medical: 'medical',
  Disciplinary: 'disciplinary',
  Sensitive: 'sensitive',
} as const;
export type DocClassification = (typeof DocClassification)[keyof typeof DocClassification];

export const DocVisibility = {
  Public: 'public',
  Institution: 'institution',
  Department: 'department',
  Team: 'team',
  Private: 'private',
  Personal: 'personal',
  Shared: 'shared',
  RoleBased: 'role_based',
  Custom: 'custom',
} as const;
export type DocVisibility = (typeof DocVisibility)[keyof typeof DocVisibility];

export const DocStorage = {
  Cloud: 'cloud',
  Local: 'local',
  Hybrid: 'hybrid',
  OnPremise: 'on_premise',
  External: 'external',
  S3: 's3',
  AzureBlob: 'azure_blob',
  GCS: 'gcs',
  SharePoint: 'sharepoint',
  GoogleDrive: 'google_drive',
  Dropbox: 'dropbox',
  OneDrive: 'one_drive',
  WebDAV: 'webdav',
  FTP: 'ftp',
  SFTP: 'sftp',
} as const;
export type DocStorage = (typeof DocStorage)[keyof typeof DocStorage];

export const DocSource = {
  Upload: 'upload',
  Scan: 'scan',
  Email: 'email',
  Fax: 'fax',
  API: 'api',
  Import: 'import',
  Generated: 'generated',
  Template: 'template',
  Merge: 'merge',
  Conversion: 'conversion',
  OCR: 'ocr',
  Fallback: 'fallback',
  Integration: 'integration',
  Webhook: 'webhook',
  Mobile: 'mobile',
} as const;
export type DocSource = (typeof DocSource)[keyof typeof DocSource];

export const DocFormat = {
  PDF: 'pdf',
  DOCX: 'docx',
  DOC: 'doc',
  XLSX: 'xlsx',
  XLS: 'xls',
  PPTX: 'pptx',
  PPT: 'ppt',
  TXT: 'txt',
  RTF: 'rtf',
  ODT: 'odt',
  ODS: 'ods',
  ODP: 'odp',
  CSV: 'csv',
  TSV: 'tsv',
  HTML: 'html',
  XML: 'xml',
  JSON: 'json',
  PNG: 'png',
  JPEG: 'jpeg',
  JPG: 'jpg',
  GIF: 'gif',
  TIFF: 'tiff',
  BMP: 'bmp',
  SVG: 'svg',
  WebP: 'webp',
  MP4: 'mp4',
  MP3: 'mp3',
  WAV: 'wav',
  AVI: 'avi',
  MOV: 'mov',
  ZIP: 'zip',
  RAR: 'rar',
  TAR: 'tar',
  GZ: 'gz',
  HEIC: 'heic',
  WebM: 'webm',
  OGG: 'ogg',
  Other: 'other',
} as const;
export type DocFormat = (typeof DocFormat)[keyof typeof DocFormat];

export const DocProcessingStatus = {
  Pending: 'pending',
  Queued: 'queued',
  Processing: 'processing',
  Completed: 'completed',
  Failed: 'failed',
  Cancelled: 'cancelled',
  RetryPending: 'retry_pending',
  Timeout: 'timeout',
  Paused: 'paused',
  Resumed: 'resumed',
} as const;
export type DocProcessingStatus = (typeof DocProcessingStatus)[keyof typeof DocProcessingStatus];

export const DocRetentionAction = {
  Retain: 'retain',
  Archive: 'archive',
  Destroy: 'destroy',
  Transfer: 'transfer',
  Migrate: 'migrate',
  Review: 'review',
  Encrypt: 'encrypt',
  Deidentify: 'deidentify',
  LegalHold: 'legal_hold',
  Disposition: 'disposition',
} as const;
export type DocRetentionAction = (typeof DocRetentionAction)[keyof typeof DocRetentionAction];

export const FolderType = {
  Standard: 'standard',
  Project: 'project',
  Archive: 'archive',
  Template: 'template',
  Shared: 'shared',
  System: 'system',
  Trash: 'trash',
  Favorites: 'favorites',
  Recent: 'recent',
  Inbox: 'inbox',
  Outbox: 'outbox',
  Drafts: 'drafts',
  Staging: 'staging',
  Sandbox: 'sandbox',
} as const;
export type FolderType = (typeof FolderType)[keyof typeof FolderType];

export const FolderStatus = {
  Active: 'active',
  Inactive: 'inactive',
  Archived: 'archived',
  Locked: 'locked',
  Restricted: 'restricted',
  PendingDeletion: 'pending_deletion',
  Migrating: 'migrating',
  Syncing: 'syncing',
} as const;
export type FolderStatus = (typeof FolderStatus)[keyof typeof FolderStatus];

export const WorkspaceType = {
  Personal: 'personal',
  Team: 'team',
  Department: 'department',
  Project: 'project',
  CrossFunctional: 'cross_functional',
  External: 'external',
  Administrative: 'administrative',
  Shared: 'shared',
  Template: 'template',
  Archived: 'archived',
} as const;
export type WorkspaceType = (typeof WorkspaceType)[keyof typeof WorkspaceType];

export const WorkspaceStatus = {
  Active: 'active',
  Inactive: 'inactive',
  Archived: 'archived',
  Locked: 'locked',
  PendingDeletion: 'pending_deletion',
  Migrating: 'migrating',
  Maintenance: 'maintenance',
} as const;
export type WorkspaceStatus = (typeof WorkspaceStatus)[keyof typeof WorkspaceStatus];

export const PermissionType = {
  View: 'view',
  Edit: 'edit',
  Comment: 'comment',
  Approve: 'approve',
  Delete: 'delete',
  Share: 'share',
  Print: 'print',
  Download: 'download',
  Upload: 'upload',
  Manage: 'manage',
  Admin: 'admin',
  Owner: 'owner',
  CoOwner: 'co_owner',
  Contributor: 'contributor',
  Reviewer: 'reviewer',
  Commenter: 'commenter',
  Viewer: 'viewer',
  RestrictedViewer: 'restricted_viewer',
} as const;
export type PermissionType = (typeof PermissionType)[keyof typeof PermissionType];

export const AccessLevel = {
  None: 'none',
  Read: 'read',
  Write: 'write',
  Execute: 'execute',
  Full: 'full',
  Custom: 'custom',
  Elevated: 'elevated',
  Temporary: 'temporary',
  Emergency: 'emergency',
} as const;
export type AccessLevel = (typeof AccessLevel)[keyof typeof AccessLevel];

export const ShareType = {
  Internal: 'internal',
  External: 'external',
  Public: 'public',
  Link: 'link',
  Embed: 'embed',
  Guest: 'guest',
  Partner: 'partner',
  Vendor: 'vendor',
  Consultant: 'consultant',
  Parent: 'parent',
  Student: 'student',
} as const;
export type ShareType = (typeof ShareType)[keyof typeof ShareType];

export const ShareExpiry = {
  Never: 'never',
  OneHour: 'one_hour',
  TwentyFourHours: 'twenty_four_hours',
  SevenDays: 'seven_days',
  ThirtyDays: 'thirty_days',
  NinetyDays: 'ninety_days',
  OneYear: 'one_year',
  Custom: 'custom',
  AccessBased: 'access_based',
} as const;
export type ShareExpiry = (typeof ShareExpiry)[keyof typeof ShareExpiry];

export const SignatureStatus = {
  Pending: 'pending',
  Sent: 'sent',
  Viewed: 'viewed',
  Signed: 'signed',
  Declined: 'declined',
  Expired: 'expired',
  Voided: 'voided',
  Aborted: 'aborted',
  Completed: 'completed',
  PartiallySigned: 'partially_signed',
  WaitingForOthers: 'waiting_for_others',
} as const;
export type SignatureStatus = (typeof SignatureStatus)[keyof typeof SignatureStatus];

export const SignatureType = {
  Electronic: 'electronic',
  Digital: 'digital',
  ClickToSign: 'click_to_sign',
  TypeToSign: 'type_to_sign',
  Drawn: 'drawn',
  Biometric: 'biometric',
  Certificate: 'certificate',
  Qualified: 'qualified',
  Advanced: 'advanced',
  Simple: 'simple',
  Notarized: 'notarized',
  Witnessed: 'witnessed',
  Notary: 'notary',
} as const;
export type SignatureType = (typeof SignatureType)[keyof typeof SignatureType];

export const SignatureLevel = {
  Simple: 'simple',
  Advanced: 'advanced',
  Qualified: 'qualified',
  Enterprise: 'enterprise',
  Legal: 'legal',
  Regulatory: 'regulatory',
  Government: 'government',
  FERPA: 'ferpa',
  HIPAA: 'hipaa',
  SOC2: 'soc2',
} as const;
export type SignatureLevel = (typeof SignatureLevel)[keyof typeof SignatureLevel];

export const ApprovalStatus = {
  Pending: 'pending',
  InProgress: 'in_progress',
  Approved: 'approved',
  Rejected: 'rejected',
  Cancelled: 'cancelled',
  Escalated: 'escalated',
  Delegated: 'delegated',
  Recalled: 'recalled',
  OnHold: 'on_hold',
  Returned: 'returned',
  Revising: 'revising',
} as const;
export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

export const ApprovalType = {
  Sequential: 'sequential',
  Parallel: 'parallel',
  AnyOne: 'any_one',
  Majority: 'majority',
  Unanimous: 'unanimous',
  Custom: 'custom',
  Auto: 'auto',
  Conditional: 'conditional',
  Hierarchical: 'hierarchical',
  Delegated: 'delegated',
} as const;
export type ApprovalType = (typeof ApprovalType)[keyof typeof ApprovalType];

export const ApprovalAction = {
  Approve: 'approve',
  Reject: 'reject',
  RequestChanges: 'request_changes',
  Delegate: 'delegate',
  Escalate: 'escalate',
  Comment: 'comment',
  Recall: 'recall',
  Return: 'return',
  Skip: 'skip',
  Reroute: 'reroute',
} as const;
export type ApprovalAction = (typeof ApprovalAction)[keyof typeof ApprovalAction];

export const WorkflowStatus = {
  Draft: 'draft',
  Active: 'active',
  Paused: 'paused',
  Completed: 'completed',
  Cancelled: 'cancelled',
  Failed: 'failed',
  Error: 'error',
  InProgress: 'in_progress',
  WaitingForInput: 'waiting_for_input',
  WaitingForApproval: 'waiting_for_approval',
  RevisionRequired: 'revision_required',
  Expired: 'expired',
} as const;
export type WorkflowStatus = (typeof WorkflowStatus)[keyof typeof WorkflowStatus];

export const WorkflowType = {
  Approval: 'approval',
  Review: 'review',
  Signature: 'signature',
  Notification: 'notification',
  DataCollection: 'data_collection',
  DocumentGeneration: 'document_generation',
  Routing: 'routing',
  Escalation: 'escalation',
  Compliance: 'compliance',
  Onboarding: 'onboarding',
  Offboarding: 'offboarding',
  Custom: 'custom',
  Composite: 'composite',
  Scheduled: 'scheduled',
  EventDriven: 'event_driven',
} as const;
export type WorkflowType = (typeof WorkflowType)[keyof typeof WorkflowType];

export const WorkflowTrigger = {
  Manual: 'manual',
  Scheduled: 'scheduled',
  EventBased: 'event_based',
  ConditionBased: 'condition_based',
  API: 'api',
  Webhook: 'webhook',
  Email: 'email',
  FileUpload: 'file_upload',
  StatusChange: 'status_change',
  DateTrigger: 'date_trigger',
  Recurring: 'recurring',
  Batch: 'batch',
  Integration: 'integration',
} as const;
export type WorkflowTrigger = (typeof WorkflowTrigger)[keyof typeof WorkflowTrigger];

export const WorkflowCondition = {
  Always: 'always',
  DateRange: 'date_range',
  ValueEquals: 'value_equals',
  ValueContains: 'value_contains',
  ValueGreaterThan: 'value_greater_than',
  ValueLessThan: 'value_less_than',
  UserInGroup: 'user_in_group',
  UserHasRole: 'user_has_role',
  DocumentStatus: 'document_status',
  FieldEquals: 'field_equals',
  AllConditions: 'all_conditions',
  AnyCondition: 'any_condition',
  CustomExpression: 'custom_expression',
} as const;
export type WorkflowCondition = (typeof WorkflowCondition)[keyof typeof WorkflowCondition];

export const OCRStatus = {
  Pending: 'pending',
  Processing: 'processing',
  Completed: 'completed',
  Failed: 'failed',
  PartiallyCompleted: 'partially_completed',
  Cancelled: 'cancelled',
  Queued: 'queued',
  RetryPending: 'retry_pending',
} as const;
export type OCRStatus = (typeof OCRStatus)[keyof typeof OCRStatus];

export const OCRFieldType = {
  Text: 'text',
  Number: 'number',
  Date: 'date',
  Time: 'time',
  DateTime: 'date_time',
  Currency: 'currency',
  Percentage: 'percentage',
  Email: 'email',
  Phone: 'phone',
  Address: 'address',
  Name: 'name',
  Organization: 'organization',
  Checkbox: 'checkbox',
  Signature: 'signature',
  Barcode: 'barcode',
  QRCode: 'qr_code',
  Table: 'table',
  Image: 'image',
  Handwritten: 'handwritten',
  Stamp: 'stamp',
} as const;
export type OCRFieldType = (typeof OCRFieldType)[keyof typeof OCRFieldType];

export const OCRLanguage = {
  English: 'en',
  Spanish: 'es',
  French: 'fr',
  German: 'de',
  Italian: 'it',
  Portuguese: 'pt',
  Chinese: 'zh',
  Japanese: 'ja',
  Korean: 'ko',
  Arabic: 'ar',
  Russian: 'ru',
  Hindi: 'hi',
  Dutch: 'nl',
  Swedish: 'sv',
  Polish: 'pl',
  Turkish: 'tr',
  Thai: 'th',
  Vietnamese: 'vi',
  MultiLanguage: 'multi',
  AutoDetect: 'auto',
} as const;
export type OCRLanguage = (typeof OCRLanguage)[keyof typeof OCRLanguage];

export const OCRConfidence = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
  VeryHigh: 'very_high',
  Custom: 'custom',
} as const;
export type OCRConfidence = (typeof OCRConfidence)[keyof typeof OCRConfidence];

export const ArchiveStatus = {
  Pending: 'pending',
  Archived: 'archived',
  Restored: 'restored',
  Migrated: 'migrated',
  Destroyed: 'destroyed',
  OnHold: 'on_hold',
  Expired: 'expired',
  Failed: 'failed',
  PendingReview: 'pending_review',
} as const;
export type ArchiveStatus = (typeof ArchiveStatus)[keyof typeof ArchiveStatus];

export const ArchiveType = {
  Standard: 'standard',
  Compressed: 'compressed',
  Encrypted: 'encrypted',
  Legal: 'legal',
  Regulatory: 'regulatory',
  Permanent: 'permanent',
  Temporary: 'temporary',
  Compliance: 'compliance',
  Cold: 'cold',
  Deep: 'deep',
} as const;
export type ArchiveType = (typeof ArchiveType)[keyof typeof ArchiveType];

export const ArchiveStorage = {
  Standard: 'standard',
  InfrequentAccess: 'infrequent_access',
  Glacier: 'glacier',
  DeepArchive: 'deep_archive',
  ColdStorage: 'cold_storage',
  Tape: 'tape',
  Optical: 'optical',
  Cloud: 'cloud',
  OnPremise: 'on_premise',
  Hybrid: 'hybrid',
} as const;
export type ArchiveStorage = (typeof ArchiveStorage)[keyof typeof ArchiveStorage];

export const BackupStatus = {
  Pending: 'pending',
  InProgress: 'in_progress',
  Completed: 'completed',
  Failed: 'failed',
  Cancelled: 'cancelled',
  PartiallyCompleted: 'partially_completed',
  Queued: 'queued',
  Retrying: 'retrying',
} as const;
export type BackupStatus = (typeof BackupStatus)[keyof typeof BackupStatus];

export const BackupType = {
  Full: 'full',
  Incremental: 'incremental',
  Differential: 'differential',
  Snapshot: 'snapshot',
  Mirror: 'mirror',
  Continuous: 'continuous',
  OnDemand: 'on_demand',
  DisasterRecovery: 'disaster_recovery',
} as const;
export type BackupType = (typeof BackupType)[keyof typeof BackupType];

export const BackupFrequency = {
  RealTime: 'real_time',
  Hourly: 'hourly',
  EverySixHours: 'every_six_hours',
  EveryTwelveHours: 'every_twelve_hours',
  Daily: 'daily',
  Weekly: 'weekly',
  BiWeekly: 'bi_weekly',
  Monthly: 'monthly',
  Quarterly: 'quarterly',
  Annually: 'annually',
  OnDemand: 'on_demand',
} as const;
export type BackupFrequency = (typeof BackupFrequency)[keyof typeof BackupFrequency];

export const RestoreStatus = {
  Pending: 'pending',
  InProgress: 'in_progress',
  Completed: 'completed',
  Failed: 'failed',
  Cancelled: 'cancelled',
  PartiallyCompleted: 'partially_completed',
  Verifying: 'verifying',
  Rollback: 'rollback',
} as const;
export type RestoreStatus = (typeof RestoreStatus)[keyof typeof RestoreStatus];

export const TrashStatus = {
  Active: 'active',
  Trashed: 'trashed',
  PermanentlyDeleted: 'permanently_deleted',
  Restoring: 'restoring',
  ScheduledDeletion: 'scheduled_deletion',
  Overdue: 'overdue',
} as const;
export type TrashStatus = (typeof TrashStatus)[keyof typeof TrashStatus];

export const WatermarkType = {
  Text: 'text',
  Image: 'image',
  Dynamic: 'dynamic',
  Confidential: 'confidential',
  Draft: 'draft',
  Sample: 'sample',
  Copy: 'copy',
  DoNotCopy: 'do_not_copy',
  Custom: 'custom',
  Diagonal: 'diagonal',
  Horizontal: 'horizontal',
  Tiled: 'tiled',
  Invisible: 'invisible',
} as const;
export type WatermarkType = (typeof WatermarkType)[keyof typeof WatermarkType];

export const WatermarkPosition = {
  Center: 'center',
  TopLeft: 'top_left',
  TopCenter: 'top_center',
  TopRight: 'top_right',
  MiddleLeft: 'middle_left',
  MiddleRight: 'middle_right',
  BottomLeft: 'bottom_left',
  BottomCenter: 'bottom_center',
  BottomRight: 'bottom_right',
  Diagonal: 'diagonal',
  Tiled: 'tiled',
} as const;
export type WatermarkPosition = (typeof WatermarkPosition)[keyof typeof WatermarkPosition];

export const TagType = {
  Standard: 'standard',
  System: 'system',
  User: 'user',
  Auto: 'auto',
  Classification: 'classification',
  Category: 'category',
  Status: 'status',
  Priority: 'priority',
  Custom: 'custom',
} as const;
export type TagType = (typeof TagType)[keyof typeof TagType];

export const ActivityType = {
  Create: 'create',
  Read: 'read',
  Update: 'update',
  Delete: 'delete',
  Download: 'download',
  Upload: 'upload',
  Share: 'share',
  Print: 'print',
  Email: 'email',
  Move: 'move',
  Copy: 'copy',
  Rename: 'rename',
  Lock: 'lock',
  Unlock: 'unlock',
  Approve: 'approve',
  Reject: 'reject',
  Comment: 'comment',
  Version: 'version',
  Restore: 'restore',
  Archive: 'archive',
  Export: 'export',
  Import: 'import',
  Merge: 'merge',
  Split: 'split',
  Convert: 'convert',
  OCR: 'ocr',
  Sign: 'sign',
  Review: 'review',
  Assign: 'assign',
  Permission: 'permission',
  Workflow: 'workflow',
  Access: 'access',
  Login: 'login',
  Logout: 'logout',
  Search: 'search',
  View: 'view',
  BulkAction: 'bulk_action',
  ComplianceAction: 'compliance_action',
  SecurityEvent: 'security_event',
} as const;
export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];

export const CommentType = {
  General: 'general',
  Annotation: 'annotation',
  Highlight: 'highlight',
  StickyNote: 'sticky_note',
  Reply: 'reply',
  Task: 'task',
  Mention: 'mention',
  System: 'system',
  Approval: 'approval',
  Revision: 'revision',
  Feedback: 'feedback',
  Issue: 'issue',
  Suggestion: 'suggestion',
  Question: 'question',
} as const;
export type CommentType = (typeof CommentType)[keyof typeof CommentType];

export const VersionDiff = {
  None: 'none',
  Minor: 'minor',
  Major: 'major',
  Patch: 'patch',
  Breaking: 'breaking',
  Significant: 'significant',
  Trivial: 'trivial',
  Custom: 'custom',
} as const;
export type VersionDiff = (typeof VersionDiff)[keyof typeof VersionDiff];

export const SearchScopeDoc = {
  All: 'all',
  CurrentFolder: 'current_folder',
  Subfolders: 'subfolders',
  Workspace: 'workspace',
  Department: 'department',
  Institution: 'institution',
  SharedWithMe: 'shared_with_me',
  MyDocuments: 'my_documents',
  RecentDocuments: 'recent_documents',
  Favorites: 'favorites',
  Trash: 'trash',
  Archive: 'archive',
  Templates: 'templates',
  Public: 'public',
} as const;
export type SearchScopeDoc = (typeof SearchScopeDoc)[keyof typeof SearchScopeDoc];

export const ClassificationLevel = {
  Level0: 0,
  Level1: 1,
  Level2: 2,
  Level3: 3,
  Level4: 4,
  Level5: 5,
  Custom: -1,
} as const;
export type ClassificationLevel = (typeof ClassificationLevel)[keyof typeof ClassificationLevel];

export const LegalHoldStatus = {
  Active: 'active',
  Released: 'released',
  Pending: 'pending',
  Expired: 'expired',
  Disputed: 'disputed',
  PartialRelease: 'partial_release',
} as const;
export type LegalHoldStatus = (typeof LegalHoldStatus)[keyof typeof LegalHoldStatus];

export const WebDAVStatus = {
  Connected: 'connected',
  Disconnected: 'disconnected',
  Error: 'error',
  Authenticating: 'authenticating',
  Syncing: 'syncing',
  Idle: 'idle',
  Reconnecting: 'reconnecting',
} as const;
export type WebDAVStatus = (typeof WebDAVStatus)[keyof typeof WebDAVStatus];

export const ThumbnailStatus = {
  Pending: 'pending',
  Generating: 'generating',
  Completed: 'completed',
  Failed: 'failed',
  NotSupported: 'not_supported',
  Cached: 'cached',
  Expired: 'expired',
  Regenerating: 'regenerating',
} as const;
export type ThumbnailStatus = (typeof ThumbnailStatus)[keyof typeof ThumbnailStatus];

export const MergeStatus = {
  Pending: 'pending',
  InProgress: 'in_progress',
  Completed: 'completed',
  Failed: 'failed',
  Cancelled: 'cancelled',
  PartiallyCompleted: 'partially_completed',
  ConflictDetected: 'conflict_detected',
} as const;
export type MergeStatus = (typeof MergeStatus)[keyof typeof MergeStatus];

export const SplitStatus = {
  Pending: 'pending',
  InProgress: 'in_progress',
  Completed: 'completed',
  Failed: 'failed',
  Cancelled: 'cancelled',
  PartiallyCompleted: 'partially_completed',
} as const;
export type SplitStatus = (typeof SplitStatus)[keyof typeof SplitStatus];

export const CompressionLevel = {
  None: 'none',
  Low: 'low',
  Medium: 'medium',
  High: 'high',
  Maximum: 'maximum',
  Adaptive: 'adaptive',
  Custom: 'custom',
} as const;
export type CompressionLevel = (typeof CompressionLevel)[keyof typeof CompressionLevel];

export const ConversionFormat = {
  PDF: 'pdf',
  DOCX: 'docx',
  DOC: 'doc',
  XLSX: 'xlsx',
  XLS: 'xls',
  PPTX: 'pptx',
  PPT: 'ppt',
  TXT: 'txt',
  RTF: 'rtf',
  HTML: 'html',
  XML: 'xml',
  CSV: 'csv',
  JSON: 'json',
  ODT: 'odt',
  ODS: 'ods',
  ODP: 'odp',
  EPUB: 'epub',
  Markdown: 'markdown',
  PlainText: 'plain_text',
  RichText: 'rich_text',
} as const;
export type ConversionFormat = (typeof ConversionFormat)[keyof typeof ConversionFormat];

export const ImportSource = {
  Local: 'local',
  URL: 'url',
  FTP: 'ftp',
  SFTP: 'sftp',
  SharePoint: 'sharepoint',
  GoogleDrive: 'google_drive',
  Dropbox: 'dropbox',
  OneDrive: 'one_drive',
  Email: 'email',
  API: 'api',
  WebDAV: 'webdav',
  Box: 'box',
  Evernote: 'evernote',
  Confluence: 'confluence',
  Legacy: 'legacy',
} as const;
export type ImportSource = (typeof ImportSource)[keyof typeof ImportSource];

export const ExportFormatDoc = {
  PDF: 'pdf',
  DOCX: 'docx',
  ZIP: 'zip',
  TAR: 'tar',
  CSV: 'csv',
  JSON: 'json',
  XML: 'xml',
  HTML: 'html',
  Markdown: 'markdown',
  PNG: 'png',
  JPEG: 'jpeg',
  TIFF: 'tiff',
  PlainText: 'plain_text',
  Custom: 'custom',
} as const;
export type ExportFormatDoc = (typeof ExportFormatDoc)[keyof typeof ExportFormatDoc];

export const AuditActionDoc = {
  Create: 'create',
  Read: 'read',
  Update: 'update',
  Delete: 'delete',
  Download: 'download',
  Upload: 'upload',
  Share: 'share',
  Print: 'print',
  Email: 'email',
  Move: 'move',
  Copy: 'copy',
  Rename: 'rename',
  Lock: 'lock',
  Unlock: 'unlock',
  Approve: 'approve',
  Reject: 'reject',
  Comment: 'comment',
  Version: 'version',
  Restore: 'restore',
  Archive: 'archive',
  Export: 'export',
  Import: 'import',
  Merge: 'merge',
  Split: 'split',
  Convert: 'convert',
  OCR: 'ocr',
  Sign: 'sign',
  Review: 'review',
  Assign: 'assign',
  Permission: 'permission',
  Workflow: 'workflow',
  Access: 'access',
  BulkAction: 'bulk_action',
  ComplianceAction: 'compliance_action',
  SecurityEvent: 'security_event',
  Encryption: 'encryption',
  Decryption: 'decryption',
  Redaction: 'redaction',
  Classification: 'classification',
  Retention: 'retention',
  Disposition: 'disposition',
  Backup: 'backup',
  RestoreBackup: 'restore_backup',
  Purge: 'purge',
  AdminAction: 'admin_action',
  ConfigurationChange: 'configuration_change',
  IntegrationAction: 'integration_action',
  BillingAction: 'billing_action',
} as const;
export type AuditActionDoc = (typeof AuditActionDoc)[keyof typeof AuditActionDoc];

export const ScanMode = {
  SinglePage: 'single_page',
  MultiPage: 'multi_page',
  Duplex: 'duplex',
  AutoDetect: 'auto_detect',
  Color: 'color',
  Grayscale: 'grayscale',
  BlackWhite: 'black_white',
  HighResolution: 'high_resolution',
  Fast: 'fast',
  OCR: 'ocr',
} as const;
export type ScanMode = (typeof ScanMode)[keyof typeof ScanMode];

export const ProcessingPipeline = {
  Ingestion: 'ingestion',
  Validation: 'validation',
  Classification: 'classification',
  OCR: 'ocr',
  Indexing: 'indexing',
  Metadata: 'metadata',
  Watermarking: 'watermarking',
  Encryption: 'encryption',
  Compression: 'compression',
  Conversion: 'conversion',
  Thumbnail: 'thumbnail',
  Preview: 'preview',
  Compliance: 'compliance',
  Storage: 'storage',
  Notification: 'notification',
  Archival: 'archival',
  Disposal: 'disposal',
  Custom: 'custom',
} as const;
export type ProcessingPipeline = (typeof ProcessingPipeline)[keyof typeof ProcessingPipeline];


// ------------------------------ Interfaces ------------------------------

export interface DocDocument {
  id: string;
  title: string;
  description: string;
  content: string;
  status: DocStatus;
  category: DocCategory;
  classification: DocClassification;
  visibility: DocVisibility;
  storage: DocStorage;
  source: DocSource;
  format: DocFormat;
  mimeType: string;
  size: number;
  checksum: string;
  path: string;
  folderId: string;
  workspaceId: string;
  parentId: string | null;
  ownerId: string;
  authorId: string;
  authorName: string;
  versionId: string;
  versionNumber: number;
  currentVersion: number;
  totalVersions: number;
  thumbnailId: string | null;
  lockId: string | null;
  lockedBy: string | null;
  lockedAt: string | null;
  expiresAt: string | null;
  retentionDate: string | null;
  legalHoldId: string | null;
  archiveId: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  permissions: DocPermission[];
  comments: DocComment[];
  versions: DocVersion[];
  activities: DocActivity[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  archivedAt: string | null;
  deletedAt: string | null;
  lastAccessedAt: string | null;
  lastAccessedBy: string | null;
  accessCount: number;
  downloadCount: number;
  viewCount: number;
  shareCount: number;
  commentCount: number;
  isFavorite: boolean;
  isTemplate: boolean;
  isLocked: boolean;
  isDeleted: boolean;
  isArchived: boolean;
  isVersioned: boolean;
  isEncrypted: boolean;
  isWatermarked: boolean;
  isDigitallySigned: boolean;
  isProcessed: boolean;
  isIndexable: boolean;
  isSearchable: boolean;
  isPublic: boolean;
  isShared: boolean;
  hasWorkflow: boolean;
  hasApproval: boolean;
  hasSignature: boolean;
  isCompliant: boolean;
  complianceScore: number;
  ocrStatus: OCRStatus | null;
  workflowId: string | null;
  approvalId: string | null;
  signatureId: string | null;
  customMetadata: Record<string, unknown>;
  originalFilename: string;
  filename: string;
  extension: string;
  encoding: string;
  language: string;
  pageCount: number;
  wordCount: number;
  charCount: number;
  dpi: number;
  width: number;
  height: number;
  duration: number | null;
  checksumAlgorithm: string;
  checksumValue: string;
  externalId: string | null;
  externalSource: string | null;
  syncStatus: string | null;
  lastSyncedAt: string | null;
  contentHash: string;
  previousVersionId: string | null;
  nextVersionId: string | null;
  parentDocumentId: string | null;
  childDocumentIds: string[];
  relatedDocumentIds: string[];
  templateId: string | null;
  isGeneratedFromTemplate: boolean;
  signers: string[];
  approvers: string[];
  reviewers: string[];
  lastModifiedBy: string;
  createdBy: string;
  createdByName: string;
  deletedBy: string | null;
  archivedBy: string | null;
}

export interface DocFolder {
  id: string;
  name: string;
  description: string;
  path: string;
  type: FolderType;
  status: FolderStatus;
  visibility: DocVisibility;
  classification: DocClassification;
  parentId: string | null;
  parentPath: string | null;
  workspaceId: string;
  ownerId: string;
  ownerName: string;
  size: number;
  documentCount: number;
  subfolderCount: number;
  totalSize: number;
  totalDocumentCount: number;
  depth: number;
  level: number;
  isRoot: boolean;
  isShared: boolean;
  isLocked: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  isHidden: boolean;
  isSystem: boolean;
  isInherited: boolean;
  inheritedFrom: string | null;
  permissions: DocPermission[];
  tags: string[];
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  accessedAt: string | null;
  deletedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
  lastAccessedBy: string | null;
  accessCount: number;
  childFolders: DocFolder[];
  documents: DocDocument[];
  retentionPolicyId: string | null;
  archivePolicyId: string | null;
  backupPolicyId: string | null;
  legalHoldId: string | null;
  syncStatus: string | null;
  lastSyncedAt: string | null;
  externalId: string | null;
  externalSource: string | null;
  quota: number | null;
  usedQuota: number;
  quotaPercentage: number;
  encryptionEnabled: boolean;
  watermarkEnabled: boolean;
  versionControlEnabled: boolean;
  auditEnabled: boolean;
  complianceEnabled: boolean;
  autoClassification: boolean;
  defaultClassification: DocClassification | null;
  defaultRetention: number | null;
  inheritPermissions: boolean;
  inheritPolicies: boolean;
  inheritClassification: boolean;
  inheritRetention: boolean;
  inheritBackup: boolean;
  inheritLegalHold: boolean;
}

export interface DocWorkspace {
  id: string;
  name: string;
  description: string;
  type: WorkspaceType;
  status: WorkspaceStatus;
  visibility: DocVisibility;
  classification: DocClassification;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  memberCount: number;
  documentCount: number;
  folderCount: number;
  size: number;
  totalSize: number;
  quota: number;
  usedQuota: number;
  quotaPercentage: number;
  memberIds: string[];
  adminIds: string[];
  departments: string[];
  tags: string[];
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  settings: Record<string, unknown>;
  policies: DocPolicy[];
  permissions: DocPermission[];
  createdAt: string;
  updatedAt: string;
  accessedAt: string | null;
  archivedAt: string | null;
  deletedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
  isArchived: boolean;
  isDeleted: boolean;
  isDefault: boolean;
  isTemplate: boolean;
  isPublic: boolean;
  isShared: boolean;
  isLocked: boolean;
  isEncrypted: boolean;
  isWatermarked: boolean;
  isVersionControlled: boolean;
  isAuditEnabled: boolean;
  isComplianceEnabled: boolean;
  isSyncEnabled: boolean;
  isBackupEnabled: boolean;
  isLegalHoldEnabled: boolean;
  isWebDAVEnabled: boolean;
  isAPIEnabled: boolean;
  isWebhookEnabled: boolean;
  isIntegrationEnabled: boolean;
  externalId: string | null;
  externalSource: string | null;
  syncStatus: string | null;
  lastSyncedAt: string | null;
  storageClass: string;
  replicationFactor: number;
  geoRedundant: boolean;
  backupFrequency: BackupFrequency;
  lastBackupAt: string | null;
  lastRestoreAt: string | null;
  retentionPolicyId: string | null;
  archivePolicyId: string | null;
  backupPolicyId: string | null;
  legalHoldId: string | null;
  compliancePolicyId: string | null;
  securityPolicyId: string | null;
}

export interface DocPermission {
  id: string;
  documentId: string;
  folderId: string | null;
  workspaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  groupId: string | null;
  groupName: string | null;
  type: PermissionType;
  accessLevel: AccessLevel;
  isInherited: boolean;
  inheritedFrom: string | null;
  isRevoked: boolean;
  isExpired: boolean;
  expiresAt: string | null;
  grantedAt: string;
  grantedBy: string;
  grantedByName: string;
  revokedAt: string | null;
  revokedBy: string | null;
  revokedByName: string | null;
  conditions: Record<string, unknown> | null;
  metadata: Record<string, unknown>;
  shareId: string | null;
  shareType: ShareType | null;
  shareExpiry: ShareExpiry | null;
  shareLink: string | null;
}

export interface DocAccess {
  id: string;
  documentId: string;
  userId: string;
  userName: string;
  userEmail: string;
  accessType: string;
  accessLevel: AccessLevel;
  ipAddress: string | null;
  userAgent: string | null;
  deviceType: string | null;
  location: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  isVPN: boolean;
  isProxy: boolean;
  isTor: boolean;
  isSuspicious: boolean;
  riskScore: number;
  riskLevel: string;
  riskFactors: string[];
  accessedAt: string;
  sessionId: string;
  requestId: string;
  traceId: string;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface DocActivity {
  id: string;
  documentId: string;
  folderId: string | null;
  workspaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: ActivityType;
  description: string;
  details: Record<string, unknown>;
  previousValue: unknown;
  newValue: unknown;
  ipAddress: string | null;
  userAgent: string | null;
  deviceType: string | null;
  sessionId: string;
  requestId: string;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DocComment {
  id: string;
  documentId: string;
  folderId: string | null;
  workspaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
  type: CommentType;
  content: string;
  plainText: string;
  htmlContent: string;
  parentId: string | null;
  threadId: string | null;
  replyCount: number;
  replies: DocComment[];
  mentions: string[];
  mentionUserIds: string[];
  position: Record<string, unknown> | null;
  anchor: Record<string, unknown> | null;
  isResolved: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
  isEdited: boolean;
  editedAt: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  isPinned: boolean;
  isImportant: boolean;
  isRead: boolean;
  readAt: string | null;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DocTag {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: TagType;
  color: string;
  icon: string;
  category: string;
  namespace: string;
  isSystem: boolean;
  isPublic: boolean;
  isGlobal: boolean;
  isLocal: boolean;
  isInherited: boolean;
  documentCount: number;
  usageCount: number;
  lastUsedAt: string | null;
  isActive: boolean;
  isDeleted: boolean;
  metadata: Record<string, unknown>;
  documentIds: string[];
  folderIds: string[];
  workspaceIds: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DocCategoryEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  parentId: string | null;
  parentPath: string | null;
  depth: number;
  level: number;
  isRoot: boolean;
  isLeaf: boolean;
  isActive: boolean;
  isDefault: boolean;
  isSystem: boolean;
  isPublic: boolean;
  documentCount: number;
  subcategoryCount: number;
  totalDocumentCount: number;
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  tags: string[];
  permissions: DocPermission[];
  policies: DocPolicy[];
  retentionPolicyId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}


export interface DocArchive {
  id: string;
  name: string;
  description: string;
  type: ArchiveType;
  status: ArchiveStatus;
  storage: ArchiveStorage;
  classification: DocClassification;
  visibility: DocVisibility;
  workspaceId: string;
  ownerId: string;
  ownerName: string;
  documentCount: number;
  size: number;
  totalSize: number;
  documentIds: string[];
  folderIds: string[];
  archiveDate: string;
  expirationDate: string | null;
  lastAccessedAt: string | null;
  lastAccessedBy: string | null;
  accessCount: number;
  restoreCount: number;
  lastRestoreAt: string | null;
  isEncrypted: boolean;
  isCompressed: boolean;
  isEncryptedAtRest: boolean;
  isEncryptedInTransit: boolean;
  encryptionAlgorithm: string | null;
  encryptionKeyId: string | null;
  compressionAlgorithm: string | null;
  compressionLevel: CompressionLevel | null;
  checksumAlgorithm: string;
  checksumValue: string;
  checksumVerified: boolean;
  integrityVerified: boolean;
  retentionPolicyId: string | null;
  archivePolicyId: string | null;
  backupPolicyId: string | null;
  legalHoldId: string | null;
  externalId: string | null;
  externalSource: string | null;
  syncStatus: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  permissions: DocPermission[];
  createdAt: string;
  updatedAt: string;
  archivedAt: string;
  deletedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocArchiveRule {
  id: string;
  name: string;
  description: string;
  archiveId: string;
  workspaceId: string;
  isActive: boolean;
  priority: number;
  conditions: Record<string, unknown>[];
  actions: DocRetentionAction[];
  category: DocCategory | null;
  classification: DocClassification | null;
  status: DocStatus | null;
  ageDays: number | null;
  sizeBytes: number | null;
  format: DocFormat | null;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
  lastEvaluatedAt: string | null;
  evaluationCount: number;
  matchCount: number;
  successCount: number;
  failureCount: number;
}

export interface DocArchivePolicy {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  archiveType: ArchiveType;
  archiveStorage: ArchiveStorage;
  retentionDays: number | null;
  retentionYears: number | null;
  autoArchive: boolean;
  archiveAfterDays: number | null;
  deleteAfterArchive: boolean;
  compressionEnabled: boolean;
  compressionLevel: CompressionLevel;
  encryptionEnabled: boolean;
  encryptionAlgorithm: string;
  integrityCheck: boolean;
  isActive: boolean;
  priority: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocSignature {
  id: string;
  documentId: string;
  workspaceId: string;
  signerId: string;
  signerName: string;
  signerEmail: string;
  status: SignatureStatus;
  type: SignatureType;
  level: SignatureLevel;
  signatureData: string | null;
  signatureImage: string | null;
  signatureFont: string | null;
  signatureColor: string | null;
  signatureX: number | null;
  signatureY: number | null;
  signatureWidth: number | null;
  signatureHeight: number | null;
  signaturePage: number | null;
  signedAt: string | null;
  sentAt: string | null;
  viewedAt: string | null;
  declinedAt: string | null;
  declinedReason: string | null;
  expiresAt: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  deviceInfo: Record<string, unknown> | null;
  locationInfo: Record<string, unknown> | null;
  certificateId: string | null;
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocSignatureRequest {
  id: string;
  documentId: string;
  workspaceId: string;
  title: string;
  message: string;
  subject: string;
  status: SignatureStatus;
  type: SignatureType;
  level: SignatureLevel;
  requestedBy: string;
  requestedByName: string;
  requestedByEmail: string;
  signers: DocSignatureInvitee[];
  signatureFields: DocSignatureField[];
  signingOrder: string[];
  isSequential: boolean;
  isParallel: boolean;
  expiryDays: number;
  expiresAt: string | null;
  reminderEnabled: boolean;
  reminderFrequency: number;
  reminderCount: number;
  lastReminderAt: string | null;
  nextReminderAt: string | null;
  isAutoRemind: boolean;
  isAutoExpire: boolean;
  isAutoComplete: boolean;
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  deletedAt: string | null;
  lastModifiedBy: string;
}

export interface DocSignatureWorkflow {
  id: string;
  signatureRequestId: string;
  documentId: string;
  workspaceId: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  type: WorkflowType;
  trigger: WorkflowTrigger;
  currentStep: number;
  totalSteps: number;
  steps: DocSignatureWorkflowStep[];
  history: DocApprovalHistory[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocSignatureWorkflowStep {
  id: string;
  workflowId: string;
  stepNumber: number;
  name: string;
  description: string;
  signerId: string;
  signerName: string;
  signerEmail: string;
  status: SignatureStatus;
  action: ApprovalAction;
  required: boolean;
  completed: boolean;
  completedAt: string | null;
  signatureData: string | null;
  signatureImage: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown>;
}

export interface DocApprovalWorkflow {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  documentId: string | null;
  folderId: string | null;
  type: ApprovalType;
  status: WorkflowStatus;
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  currentStep: number;
  totalSteps: number;
  steps: DocApprovalStep[];
  history: DocApprovalHistory[];
  isActive: boolean;
  isDefault: boolean;
  priority: number;
  timeoutDays: number | null;
  escalationEnabled: boolean;
  escalationDays: number | null;
  reminderEnabled: boolean;
  reminderDays: number | null;
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocApprovalStep {
  id: string;
  workflowId: string;
  stepNumber: number;
  name: string;
  description: string;
  type: ApprovalType;
  required: boolean;
  approverIds: string[];
  approverNames: string[];
  approverEmails: string[];
  groupIds: string[];
  groupNames: string[];
  roleIds: string[];
  roleNames: string[];
  status: ApprovalStatus;
  action: ApprovalAction | null;
  comment: string | null;
  completed: boolean;
  completedAt: string | null;
  delegatedTo: string | null;
  delegatedToName: string | null;
  escalatedAt: string | null;
  escalatedTo: string | null;
  timeoutDays: number | null;
  metadata: Record<string, unknown>;
}

export interface DocApprovalHistory {
  id: string;
  workflowId: string;
  stepId: string;
  documentId: string;
  action: ApprovalAction;
  approverId: string;
  approverName: string;
  approverEmail: string;
  comment: string | null;
  previousStatus: ApprovalStatus;
  newStatus: ApprovalStatus;
  delegatedTo: string | null;
  delegatedToName: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocOCRResult {
  id: string;
  documentId: string;
  workspaceId: string;
  status: OCRStatus;
  language: OCRLanguage;
  confidence: OCRConfidence;
  overallConfidence: number;
  text: string;
  htmlText: string;
  fields: DocOCRField[];
  templates: DocOCRTemplate[];
  pageCount: number;
  wordCount: number;
  charCount: number;
  processingTimeMs: number;
  processingEngine: string;
  processingVersion: string;
  error: string | null;
  retryCount: number;
  maxRetries: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocOCRField {
  id: string;
  ocrResultId: string;
  name: string;
  type: OCRFieldType;
  value: string;
  confidence: number;
  coordinates: Record<string, unknown>;
  boundingBox: Record<string, unknown>;
  pageNumber: number;
  rowIndex: number | null;
  columnIndex: number | null;
  isRequired: boolean;
  isAutoDetected: boolean;
  isManuallyVerified: boolean;
  verifiedBy: string | null;
  verifiedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface DocOCRTemplate {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  category: DocCategory;
  fields: DocOCRField[];
  isDefault: boolean;
  isActive: boolean;
  priority: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocScanJob {
  id: string;
  documentId: string;
  workspaceId: string;
  mode: ScanMode;
  status: DocProcessingStatus;
  deviceName: string | null;
  deviceId: string | null;
  resolution: number;
  colorMode: string;
  duplex: boolean;
  paperSize: string;
  pageCount: number;
  processedPages: number;
  outputFormat: DocFormat;
  outputPath: string | null;
  outputFileId: string | null;
  error: string | null;
  retryCount: number;
  maxRetries: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}


export interface DocFileMetadata {
  id: string;
  documentId: string;
  filename: string;
  originalFilename: string;
  extension: string;
  mimeType: string;
  encoding: string;
  size: number;
  checksum: string;
  checksumAlgorithm: string;
  pageCount: number | null;
  wordCount: number | null;
  charCount: number | null;
  duration: number | null;
  width: number | null;
  height: number | null;
  dpi: number | null;
  language: string | null;
  author: string | null;
  title: string | null;
  subject: string | null;
  keywords: string[] | null;
  creator: string | null;
  producer: string | null;
  creationDate: string | null;
  modificationDate: string | null;
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocFileChecksum {
  id: string;
  documentId: string;
  algorithm: string;
  value: string;
  verifiedAt: string | null;
  verifiedBy: string | null;
  isVerified: boolean;
  previousValue: string | null;
  previousAlgorithm: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocFileStorage {
  id: string;
  documentId: string;
  storageType: DocStorage;
  storageClass: string;
  region: string;
  availabilityZone: string;
  bucketName: string | null;
  containerName: string | null;
  path: string;
  url: string | null;
  cdnUrl: string | null;
  backupUrl: string | null;
  archiveUrl: string | null;
  isEncrypted: boolean;
  isCompressed: boolean;
  replicationFactor: number;
  geoRedundant: boolean;
  lastSyncedAt: string | null;
  syncStatus: string | null;
  externalId: string | null;
  externalSource: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocShareLink {
  id: string;
  documentId: string;
  folderId: string | null;
  workspaceId: string;
  url: string;
  token: string;
  type: ShareType;
  expiry: ShareExpiry;
  expiresAt: string | null;
  isActive: boolean;
  isPublic: boolean;
  isPasswordProtected: boolean;
  passwordHash: string | null;
  maxDownloads: number | null;
  downloadCount: number;
  maxViews: number | null;
  viewCount: number;
  maxUsers: number | null;
  currentUserCount: number;
  notifyOnAccess: boolean;
  notifyOnDownload: boolean;
  notifyOnView: boolean;
  allowedDomains: string[];
  blockedDomains: string[];
  allowedIPs: string[];
  blockedIPs: string[];
  allowedCountries: string[];
  blockedCountries: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocSharePermission {
  id: string;
  shareLinkId: string;
  documentId: string;
  userId: string;
  userName: string;
  userEmail: string;
  permissionType: PermissionType;
  accessLevel: AccessLevel;
  isRevoked: boolean;
  isExpired: boolean;
  expiresAt: string | null;
  grantedAt: string;
  grantedBy: string;
  grantedByName: string;
  revokedAt: string | null;
  revokedBy: string | null;
  revokedByName: string | null;
  metadata: Record<string, unknown>;
}

export interface DocWatermark {
  id: string;
  documentId: string;
  type: WatermarkType;
  position: WatermarkPosition;
  text: string | null;
  imageUrl: string | null;
  opacity: number;
  rotation: number;
  fontSize: number | null;
  fontFamily: string | null;
  fontColor: string | null;
  backgroundColor: string | null;
  x: number | null;
  y: number | null;
  width: number | null;
  height: number | null;
  scale: number;
  isTiled: boolean;
  tileSpacing: number | null;
  pages: number[];
  applyToAllPages: boolean;
  applyToFirstPage: boolean;
  applyToLastPage: boolean;
  isActive: boolean;
  isDefault: boolean;
  isSystem: boolean;
  isCustom: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocTemplate {
  id: string;
  name: string;
  description: string;
  category: DocCategory;
  format: DocFormat;
  mimeType: string;
  size: number;
  content: string | null;
  filePath: string | null;
  fileUrl: string | null;
  thumbnailUrl: string | null;
  workspaceId: string;
  folderId: string | null;
  ownerId: string;
  ownerName: string;
  isActive: boolean;
  isDefault: boolean;
  isSystem: boolean;
  isPublic: boolean;
  isShared: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  isVersioned: boolean;
  currentVersion: number;
  totalVersions: number;
  usageCount: number;
  lastUsedAt: string | null;
  lastUsedBy: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  formFields: DocFormField[];
  permissions: DocPermission[];
  versions: DocVersion[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocGeneratedDocument {
  id: string;
  templateId: string;
  templateName: string;
  documentId: string;
  documentName: string;
  status: DocProcessingStatus;
  format: DocFormat;
  mimeType: string;
  size: number;
  filePath: string | null;
  fileUrl: string | null;
  parameters: Record<string, unknown>;
  mergeFields: Record<string, unknown>;
  conditionalSections: Record<string, unknown>;
  loopSections: Record<string, unknown>;
  error: string | null;
  processingTimeMs: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocMergeDocument {
  id: string;
  name: string;
  description: string;
  status: MergeStatus;
  outputFormat: DocFormat;
  outputMimeType: string;
  outputSize: number;
  outputFilePath: string | null;
  outputFileUrl: string | null;
  documentIds: string[];
  documentNames: string[];
  documentOrder: string[];
  pageRanges: Record<string, string> | null;
  bookmarks: Record<string, string> | null;
  tableOfContents: boolean;
  coverPage: boolean;
  coverPageTemplate: string | null;
  headerFooter: boolean;
  headerTemplate: string | null;
  footerTemplate: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
  workspaceId: string;
}

export interface DocAudit {
  id: string;
  documentId: string;
  folderId: string | null;
  workspaceId: string;
  action: AuditActionDoc;
  description: string;
  userId: string;
  userName: string;
  userEmail: string;
  previousValue: unknown;
  newValue: unknown;
  ipAddress: string | null;
  userAgent: string | null;
  deviceType: string | null;
  sessionId: string;
  requestId: string;
  traceId: string;
  metadata: Record<string, unknown>;
  tags: string[];
  customFields: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocRetention {
  id: string;
  documentId: string;
  folderId: string | null;
  workspaceId: string;
  action: DocRetentionAction;
  retentionDays: number | null;
  retentionYears: number | null;
  retentionDate: string | null;
  destructionDate: string | null;
  isExtended: boolean;
  extendedUntil: string | null;
  extendedBy: string | null;
  extendedReason: string | null;
  isActive: boolean;
  isOnHold: boolean;
  legalHoldId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocLegalHold {
  id: string;
  name: string;
  description: string;
  status: LegalHoldStatus;
  workspaceId: string;
  documentIds: string[];
  folderIds: string[];
  caseNumber: string | null;
  caseName: string | null;
  legalMatter: string | null;
  custodian: string | null;
  custodianEmail: string | null;
  issuedBy: string;
  issuedByName: string;
  issuedByEmail: string;
  issuedAt: string;
  expiresAt: string | null;
  releasedAt: string | null;
  releasedBy: string | null;
  releasedByName: string | null;
  releaseReason: string | null;
  reason: string;
  scope: string;
  instructions: string | null;
  notificationSent: boolean;
  notificationSentAt: string | null;
  notificationsSentCount: number;
  acknowledgmentRequired: boolean;
  acknowledgmentReceived: boolean;
  acknowledgmentReceivedAt: string | null;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocTrash {
  id: string;
  documentId: string;
  folderId: string | null;
  workspaceId: string;
  status: TrashStatus;
  originalPath: string;
  originalFolderId: string | null;
  deletedBy: string;
  deletedByName: string;
  deletedAt: string;
  permanentDeletionDate: string;
  isRestorable: boolean;
  isExpired: boolean;
  restoreCount: number;
  lastRestoredAt: string | null;
  lastRestoredBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocRestoreHistory {
  id: string;
  documentId: string;
  trashId: string;
  workspaceId: string;
  restoredBy: string;
  restoredByName: string;
  restoredAt: string;
  originalPath: string;
  restoredToPath: string;
  restoredToFolderId: string | null;
  status: RestoreStatus;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocExternalStorage {
  id: string;
  name: string;
  type: DocStorage;
  workspaceId: string;
  isActive: boolean;
  isDefault: boolean;
  configuration: Record<string, unknown>;
  credentials: Record<string, unknown>;
  syncEnabled: boolean;
  syncFrequency: BackupFrequency;
  lastSyncedAt: string | null;
  syncStatus: string | null;
  documentCount: number;
  size: number;
  quota: number | null;
  usedQuota: number;
  quotaPercentage: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocWebDAVConfig {
  id: string;
  workspaceId: string;
  status: WebDAVStatus;
  url: string;
  username: string;
  password: string | null;
  realm: string | null;
  domain: string | null;
  basePath: string;
  isActive: boolean;
  isSecure: boolean;
  isAnonymous: boolean;
  lastConnectedAt: string | null;
  lastSyncedAt: string | null;
  syncStatus: string | null;
  error: string | null;
  retryCount: number;
  maxRetries: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocBackupJob {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  type: BackupType;
  status: BackupStatus;
  frequency: BackupFrequency;
  storageType: DocStorage;
  storageClass: string;
  region: string;
  bucketName: string | null;
  path: string;
  size: number;
  compressedSize: number | null;
  isEncrypted: boolean;
  encryptionAlgorithm: string | null;
  checksumAlgorithm: string;
  checksumValue: string;
  checksumVerified: boolean;
  integrityVerified: boolean;
  documentCount: number;
  folderCount: number;
  fileCount: number;
  totalSize: number;
  compressionRatio: number | null;
  processingTimeMs: number;
  error: string | null;
  retryCount: number;
  maxRetries: number;
  isScheduled: boolean;
  nextRunAt: string | null;
  lastRunAt: string | null;
  lastSuccessfulRunAt: string | null;
  lastFailedRunAt: string | null;
  runCount: number;
  successCount: number;
  failureCount: number;
  retentionCount: number | null;
  retentionDays: number | null;
  isIncremental: boolean;
  previousBackupId: string | null;
  deltaSize: number | null;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocVersion {
  id: string;
  documentId: string;
  versionNumber: number;
  label: string | null;
  description: string | null;
  status: DocStatus;
  size: number;
  checksum: string;
  checksumAlgorithm: string;
  filePath: string;
  fileUrl: string | null;
  thumbnailUrl: string | null;
  previewUrl: string | null;
  diffType: VersionDiff;
  diffSummary: string | null;
  diffDetails: Record<string, unknown> | null;
  changes: Record<string, unknown>[];
  previousVersionId: string | null;
  nextVersionId: string | null;
  isCurrent: boolean;
  isMajor: boolean;
  isMinor: boolean;
  isPatch: boolean;
  publishedBy: string;
  publishedByName: string;
  publishedAt: string;
  metadata: Record<string, unknown>;
  customFields: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocVersionDiff {
  id: string;
  documentId: string;
  versionId1: string;
  versionId2: string;
  versionNumber1: number;
  versionNumber2: number;
  diffType: VersionDiff;
  summary: string;
  addedCount: number;
  removedCount: number;
  modifiedCount: number;
  unchangedCount: number;
  addedContent: string;
  removedContent: string;
  modifiedContent: string;
  addedWords: number;
  removedWords: number;
  modifiedWords: number;
  addedLines: number;
  removedLines: number;
  modifiedLines: number;
  addedPages: number;
  removedPages: number;
  modifiedPages: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}


export interface DocBulkOperation {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  operation: string;
  status: DocProcessingStatus;
  documentIds: string[];
  folderIds: string[];
  totalItems: number;
  processedItems: number;
  failedItems: number;
  skippedItems: number;
  pendingItems: number;
  progress: number;
  error: string | null;
  errors: string[];
  parameters: Record<string, unknown>;
  results: Record<string, unknown>[];
  startedAt: string | null;
  completedAt: string | null;
  estimatedCompletionAt: string | null;
  processingTimeMs: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocConflictResolution {
  id: string;
  documentId: string;
  workspaceId: string;
  localVersionId: string;
  remoteVersionId: string;
  localVersionNumber: number;
  remoteVersionNumber: number;
  conflictType: string;
  resolution: string;
  resolvedBy: string | null;
  resolvedByName: string | null;
  resolvedAt: string | null;
  localChanges: Record<string, unknown>;
  remoteChanges: Record<string, unknown>;
  mergedContent: string | null;
  isAutoResolved: boolean;
  isManualResolved: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocCheckout {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  checkedOutAt: string;
  expiresAt: string | null;
  isExpired: boolean;
  isActive: boolean;
  checkedInAt: string | null;
  checkedInBy: string | null;
  checkedInByName: string | null;
  versionId: string;
  versionNumber: number;
  filePath: string;
  fileUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocLock {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  lockType: string;
  lockedAt: string;
  expiresAt: string | null;
  isExpired: boolean;
  isActive: boolean;
  unlockedAt: string | null;
  unlockedBy: string | null;
  unlockedByName: string | null;
  reason: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocFavorite {
  id: string;
  documentId: string;
  folderId: string | null;
  workspaceId: string;
  userId: string;
  userName: string;
  notes: string | null;
  sortOrder: number;
  addedAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocRecentDocument {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  accessedAt: string;
  accessType: string;
  duration: number | null;
  pagesViewed: number | null;
  progress: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocOfflineDocument {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  syncedAt: string;
  expiresAt: string | null;
  isExpired: boolean;
  isActive: boolean;
  filePath: string;
  fileSize: number;
  checksum: string;
  checksumAlgorithm: string;
  versionId: string;
  versionNumber: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocUploadSession {
  id: string;
  workspaceId: string;
  folderId: string | null;
  userId: string;
  userName: string;
  status: DocProcessingStatus;
  totalFiles: number;
  uploadedFiles: number;
  failedFiles: number;
  pendingFiles: number;
  totalSize: number;
  uploadedSize: number;
  progress: number;
  error: string | null;
  errors: string[];
  fileIds: string[];
  fileNames: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  expiresAt: string | null;
}

export interface DocProcessingJob {
  id: string;
  documentId: string;
  workspaceId: string;
  pipeline: ProcessingPipeline;
  status: DocProcessingStatus;
  step: string;
  progress: number;
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  error: string | null;
  retryCount: number;
  maxRetries: number;
  startedAt: string | null;
  completedAt: string | null;
  processingTimeMs: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocMetadataExtraction {
  id: string;
  documentId: string;
  workspaceId: string;
  status: DocProcessingStatus;
  engine: string;
  version: string;
  metadata: Record<string, unknown>;
  standardFields: Record<string, unknown>;
  customFields: Record<string, unknown>;
  extendedProperties: Record<string, unknown>;
  dublinCore: Record<string, unknown>;
  xmp: Record<string, unknown>;
  exif: Record<string, unknown>;
  iptc: Record<string, unknown>;
  error: string | null;
  processingTimeMs: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocClassificationResult {
  id: string;
  documentId: string;
  workspaceId: string;
  status: DocProcessingStatus;
  engine: string;
  version: string;
  primaryClassification: DocClassification;
  secondaryClassifications: DocClassification[];
  confidence: number;
  categories: string[];
  tags: string[];
  entities: Record<string, unknown>[];
  topics: Record<string, unknown>[];
  sentiment: string;
  language: string;
  error: string | null;
  processingTimeMs: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocSearchIndex {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  isActive: boolean;
  isDefault: boolean;
  isRebuilding: boolean;
  lastRebuiltAt: string | null;
  lastRebuiltBy: string | null;
  documentCount: number;
  indexSize: number;
  fieldCount: number;
  fields: Record<string, unknown>[];
  settings: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocSearchQuery {
  id: string;
  workspaceId: string;
  userId: string;
  userName: string;
  query: string;
  scope: SearchScopeDoc;
  filters: Record<string, unknown>;
  sort: string;
  order: string;
  page: number;
  pageSize: number;
  resultCount: number;
  totalResults: number;
  highlightedResults: boolean;
  includeMetadata: boolean;
  includeContent: boolean;
  includeComments: boolean;
  includeVersions: boolean;
  duration: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocSearchResult {
  id: string;
  queryId: string;
  documentId: string;
  documentTitle: string;
  documentPath: string;
  documentType: DocFormat;
  documentCategory: DocCategory;
  documentClassification: DocClassification;
  documentStatus: DocStatus;
  score: number;
  rank: number;
  highlights: DocSearchHighlight[];
  snippets: string[];
  matchedFields: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocSearchHighlight {
  field: string;
  fragment: string;
  startOffset: number;
  endOffset: number;
  isActive: boolean;
}

export interface DocSearchFilter {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  userId: string;
  filterType: string;
  conditions: Record<string, unknown>[];
  isActive: boolean;
  isDefault: boolean;
  isShared: boolean;
  usageCount: number;
  lastUsedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocNotification {
  id: string;
  workspaceId: string;
  userId: string;
  documentId: string | null;
  folderId: string | null;
  type: string;
  title: string;
  message: string;
  data: Record<string, unknown>;
  isRead: boolean;
  readAt: string | null;
  isDismissed: boolean;
  dismissedAt: string | null;
  priority: string;
  channel: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocReminder {
  id: string;
  workspaceId: string;
  userId: string;
  documentId: string;
  message: string;
  remindAt: string;
  isRecurring: boolean;
  recurrencePattern: string | null;
  isActive: boolean;
  isSent: boolean;
  sentAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocExpiry {
  id: string;
  documentId: string;
  workspaceId: string;
  expiresAt: string;
  expiryType: string;
  actionOnExpiry: DocRetentionAction;
  notificationDays: number[];
  notificationsSent: number[];
  lastNotificationAt: string | null;
  isActive: boolean;
  isExtended: boolean;
  extendedUntil: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocReview {
  id: string;
  documentId: string;
  workspaceId: string;
  title: string;
  description: string;
  status: ApprovalStatus;
  reviewerIds: string[];
  reviewerNames: string[];
  reviewerEmails: string[];
  dueDate: string | null;
  startedAt: string | null;
  completedAt: string | null;
  overallComments: string;
  reviewType: string;
  isBlindReview: boolean;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocReviewComment {
  id: string;
  reviewId: string;
  documentId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerEmail: string;
  content: string;
  position: Record<string, unknown> | null;
  severity: string;
  category: string;
  status: string;
  resolvedAt: string | null;
  resolvedBy: string | null;
  replies: DocReviewComment[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocApprovalRequest {
  id: string;
  documentId: string;
  workspaceId: string;
  workflowId: string;
  title: string;
  description: string;
  status: ApprovalStatus;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  currentStep: number;
  totalSteps: number;
  approverIds: string[];
  approverNames: string[];
  dueDate: string | null;
  startedAt: string | null;
  completedAt: string | null;
  completionAction: string | null;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DocDelegation {
  id: string;
  workspaceId: string;
  delegatorId: string;
  delegatorName: string;
  delegatorEmail: string;
  delegateId: string;
  delegateName: string;
  delegateEmail: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  scope: string;
  documentIds: string[];
  folderIds: string[];
  reason: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocAccessLog {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  accessType: string;
  accessLevel: AccessLevel;
  ipAddress: string | null;
  userAgent: string | null;
  deviceType: string | null;
  location: string | null;
  country: string | null;
  duration: number | null;
  sessionId: string;
  requestId: string;
  isSuccessful: boolean;
  errorMessage: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocQuota {
  id: string;
  workspaceId: string;
  totalQuota: number;
  usedQuota: number;
  availableQuota: number;
  quotaPercentage: number;
  documentCount: number;
  folderCount: number;
  fileCount: number;
  byCategory: Record<string, number>;
  byClassification: Record<string, number>;
  byStorage: Record<string, number>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocStorageUsage {
  id: string;
  workspaceId: string;
  storageType: DocStorage;
  totalSize: number;
  usedSize: number;
  availableSize: number;
  usagePercentage: number;
  documentCount: number;
  byCategory: Record<string, number>;
  byClassification: Record<string, number>;
  trend: Record<string, unknown>[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocAnalytics {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalDocuments: number;
  newDocuments: number;
  updatedDocuments: number;
  deletedDocuments: number;
  archivedDocuments: number;
  totalViews: number;
  totalDownloads: number;
  totalShares: number;
  totalComments: number;
  totalSearches: number;
  activeUsers: number;
  newUsers: number;
  topDocuments: Record<string, unknown>[];
  topUsers: Record<string, unknown>[];
  topCategories: Record<string, unknown>[];
  topSearches: Record<string, unknown>[];
  storageUsage: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocInsight {
  id: string;
  workspaceId: string;
  type: string;
  title: string;
  description: string;
  severity: string;
  category: string;
  data: Record<string, unknown>;
  recommendations: string[];
  relatedDocumentIds: string[];
  relatedUserIds: string[];
  isActive: boolean;
  isRead: boolean;
  readAt: string | null;
  isDismissed: boolean;
  dismissedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocRecommendation {
  id: string;
  workspaceId: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  documentId: string | null;
  documentTitle: string | null;
  reason: string;
  confidence: number;
  score: number;
  isActive: boolean;
  isViewed: boolean;
  viewedAt: string | null;
  isAccepted: boolean;
  acceptedAt: string | null;
  isDismissed: boolean;
  dismissedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocDuplicateDetection {
  id: string;
  workspaceId: string;
  documentId1: string;
  documentId2: string;
  similarityScore: number;
  similarityType: string;
  matchingFields: string[];
  matchingPercentage: number;
  isConfirmed: boolean;
  confirmedBy: string | null;
  confirmedAt: string | null;
  isResolved: boolean;
  resolvedBy: string | null;
  resolvedAt: string | null;
  resolution: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocSimilarityResult {
  id: string;
  documentId: string;
  workspaceId: string;
  similarDocumentIds: string[];
  similarDocumentTitles: string[];
  similarityScores: number[];
  overallSimilarity: number;
  algorithm: string;
  version: string;
  processingTimeMs: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocCompliance {
  id: string;
  documentId: string;
  workspaceId: string;
  ruleId: string;
  ruleName: string;
  status: string;
  score: number;
  maxScore: number;
  percentage: number;
  violations: DocComplianceViolation[];
  warnings: DocComplianceWarning[];
  lastCheckedAt: string;
  lastCheckedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocComplianceViolation {
  id: string;
  complianceId: string;
  ruleId: string;
  ruleName: string;
  severity: string;
  message: string;
  description: string;
  field: string | null;
  expectedValue: unknown;
  actualValue: unknown;
  suggestion: string;
  isAutoFixable: boolean;
  isFixed: boolean;
  fixedAt: string | null;
  fixedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocComplianceWarning {
  id: string;
  complianceId: string;
  ruleId: string;
  ruleName: string;
  severity: string;
  message: string;
  description: string;
  field: string | null;
  suggestion: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocRegulation {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  jurisdiction: string;
  category: string;
  isActive: boolean;
  isMandatory: boolean;
  effectiveDate: string;
  expirationDate: string | null;
  requirements: Record<string, unknown>[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocRetentionSchedule {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  category: DocCategory;
  classification: DocClassification;
  retentionYears: number;
  retentionDays: number;
  actionOnExpiry: DocRetentionAction;
  autoApply: boolean;
  isActive: boolean;
  documentCount: number;
  lastAppliedAt: string | null;
  lastAppliedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocDisposition {
  id: string;
  documentId: string;
  workspaceId: string;
  scheduleId: string;
  action: DocRetentionAction;
  status: string;
  scheduledDate: string;
  executedDate: string | null;
  executedBy: string | null;
  executedByName: string | null;
  approvalRequired: boolean;
  approvedBy: string | null;
  approvedByName: string | null;
  approvedAt: string | null;
  approvalComment: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocDispositionAction {
  id: string;
  dispositionId: string;
  action: DocRetentionAction;
  status: string;
  parameters: Record<string, unknown>;
  result: Record<string, unknown> | null;
  error: string | null;
  executedAt: string | null;
  executedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocChainOfCustody {
  id: string;
  documentId: string;
  workspaceId: string;
  eventType: string;
  eventDescription: string;
  userId: string;
  userName: string;
  userEmail: string;
  previousHash: string;
  currentHash: string;
  ipAddress: string | null;
  userAgent: string | null;
  location: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocForensicAudit {
  id: string;
  documentId: string;
  workspaceId: string;
  eventType: string;
  eventDescription: string;
  userId: string;
  userName: string;
  userEmail: string;
  previousHash: string;
  currentHash: string;
  ipAddress: string | null;
  userAgent: string | null;
  deviceInfo: Record<string, unknown> | null;
  locationInfo: Record<string, unknown> | null;
  integrityVerified: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocTimestamp {
  id: string;
  documentId: string;
  workspaceId: string;
  timestampType: string;
  timestampValue: string;
  timestampAuthority: string;
  certificateId: string | null;
  certificate: DocCertificate | null;
  digitalId: DocDigitalID | null;
  isVerified: boolean;
  verifiedAt: string | null;
  verifiedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocDigitalID {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  digitalIdType: string;
  digitalIdValue: string;
  issuer: string;
  issuerUrl: string;
  serialNumber: string;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  isRevoked: boolean;
  revokedAt: string | null;
  revokedBy: string | null;
  revokedReason: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocCertificate {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  certificateType: string;
  subject: string;
  issuer: string;
  serialNumber: string;
  validFrom: string;
  validTo: string;
  fingerprint: string;
  fingerprintAlgorithm: string;
  publicKey: string;
  keyUsage: string[];
  extendedKeyUsage: string[];
  isActive: boolean;
  isRevoked: boolean;
  revokedAt: string | null;
  revokedBy: string | null;
  revokedReason: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocEncryption {
  id: string;
  documentId: string;
  workspaceId: string;
  algorithm: string;
  keySize: number;
  mode: string;
  keyId: string;
  keyVersion: number;
  iv: string | null;
  encryptedKey: string | null;
  encryptedAt: string;
  encryptedBy: string;
  encryptedByName: string;
  isVerified: boolean;
  verifiedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocDecryption {
  id: string;
  documentId: string;
  workspaceId: string;
  decryptionKey: string;
  decryptedAt: string;
  decryptedBy: string;
  decryptedByName: string;
  isVerified: boolean;
  verifiedAt: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocDRM {
  id: string;
  documentId: string;
  workspaceId: string;
  drmType: string;
  licenseKey: string;
  licenseServer: string | null;
  rights: Record<string, unknown>;
  expiryDate: string | null;
  maxDevices: number | null;
  currentDeviceCount: number;
  isActive: boolean;
  isRevoked: boolean;
  revokedAt: string | null;
  revokedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocViewingSession {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  sessionId: string;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  pagesViewed: number[];
  currentPage: number;
  totalPages: number;
  zoomLevel: number;
  viewMode: string;
  ipAddress: string | null;
  userAgent: string | null;
  deviceType: string | null;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocDownloadLog {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  versionId: string | null;
  versionNumber: number | null;
  format: DocFormat;
  fileSize: number;
  downloadType: string;
  ipAddress: string | null;
  userAgent: string | null;
  deviceType: string | null;
  location: string | null;
  duration: number | null;
  isSuccessful: boolean;
  errorMessage: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocPrintLog {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  versionId: string | null;
  versionNumber: number | null;
  pageCount: number;
  copies: number;
  colorMode: string;
  paperSize: string;
  orientation: string;
  printerName: string | null;
  printerLocation: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  deviceType: string | null;
  isSuccessful: boolean;
  errorMessage: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocWatermarkConfig {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  type: WatermarkType;
  position: WatermarkPosition;
  text: string | null;
  imageUrl: string | null;
  opacity: number;
  rotation: number;
  fontSize: number | null;
  fontFamily: string | null;
  fontColor: string | null;
  backgroundColor: string | null;
  scale: number;
  isDefault: boolean;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocRedaction {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  reason: string;
  redactionType: string;
  redactionData: Record<string, unknown>;
  pages: number[];
  coordinates: Record<string, unknown>[];
  isVisible: boolean;
  isPermanent: boolean;
  approvedBy: string | null;
  approvedByName: string | null;
  approvedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocAnnotation {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  type: CommentType;
  content: string;
  pageNumber: number;
  coordinates: Record<string, unknown>;
  color: string;
  opacity: number;
  authorName: string;
  authorAvatar: string | null;
  isResolved: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
  replies: DocAnnotation[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocHighlight {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  pageNumber: number;
  startOffset: number;
  endOffset: number;
  selectedText: string;
  color: string;
  opacity: number;
  note: string | null;
  isShared: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocSignatureField {
  id: string;
  documentId: string;
  workspaceId: string;
  signatureRequestId: string | null;
  signerId: string;
  signerName: string;
  signerEmail: string;
  fieldName: string;
  fieldType: string;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isRequired: boolean;
  isCompleted: boolean;
  completedAt: string | null;
  value: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocFormField {
  id: string;
  documentId: string;
  templateId: string | null;
  workspaceId: string;
  fieldName: string;
  fieldType: string;
  label: string;
  placeholder: string | null;
  defaultValue: unknown;
  isRequired: boolean;
  isReadOnly: boolean;
  isVisible: boolean;
  validationRules: Record<string, unknown> | null;
  options: Record<string, unknown>[] | null;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocFormTemplate {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  category: DocCategory;
  fields: DocFormField[];
  layout: Record<string, unknown>;
  styling: Record<string, unknown>;
  isActive: boolean;
  isDefault: boolean;
  isSystem: boolean;
  usageCount: number;
  lastUsedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocFormInstance {
  id: string;
  formTemplateId: string;
  documentId: string | null;
  workspaceId: string;
  userId: string;
  userName: string;
  status: string;
  data: Record<string, unknown>;
  submittedAt: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  reviewComments: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocBatchProcess {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  operation: string;
  status: DocProcessingStatus;
  documentIds: string[];
  totalItems: number;
  processedItems: number;
  failedItems: number;
  progress: number;
  parameters: Record<string, unknown>;
  results: Record<string, unknown>[];
  error: string | null;
  errors: string[];
  startedAt: string | null;
  completedAt: string | null;
  processingTimeMs: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocQueue {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  isActive: boolean;
  priority: number;
  maxConcurrent: number;
  currentActive: number;
  pendingCount: number;
  processingCount: number;
  completedCount: number;
  failedCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocJobStatus {
  id: string;
  queueId: string;
  documentId: string;
  workspaceId: string;
  operation: string;
  status: DocProcessingStatus;
  priority: number;
  progress: number;
  startedAt: string | null;
  completedAt: string | null;
  processingTimeMs: number | null;
  error: string | null;
  retryCount: number;
  maxRetries: number;
  parameters: Record<string, unknown>;
  result: Record<string, unknown> | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocPipeline {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  stages: Record<string, unknown>[];
  isActive: boolean;
  isDefault: boolean;
  executionCount: number;
  successCount: number;
  failureCount: number;
  averageExecutionTimeMs: number;
  lastExecutedAt: string | null;
  lastExecutedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocTransform {
  id: string;
  documentId: string;
  workspaceId: string;
  transformType: string;
  sourceFormat: DocFormat;
  targetFormat: DocFormat;
  status: DocProcessingStatus;
  inputFilePath: string;
  outputFilePath: string | null;
  outputFileUrl: string | null;
  outputFileSize: number | null;
  parameters: Record<string, unknown>;
  error: string | null;
  processingTimeMs: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocConvertResult {
  id: string;
  documentId: string;
  workspaceId: string;
  sourceFormat: DocFormat;
  targetFormat: ConversionFormat;
  status: DocProcessingStatus;
  inputFilePath: string;
  outputFilePath: string | null;
  outputFileSize: number | null;
  quality: string;
  preserveFormatting: boolean;
  preserveMetadata: boolean;
  preserveAnnotations: boolean;
  preserveComments: boolean;
  preserveTrackChanges: boolean;
  error: string | null;
  processingTimeMs: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocValidateResult {
  id: string;
  documentId: string;
  workspaceId: string;
  validationType: string;
  status: DocProcessingStatus;
  isValid: boolean;
  score: number;
  maxScore: number;
  issues: Record<string, unknown>[];
  warnings: Record<string, unknown>[];
  suggestions: Record<string, unknown>[];
  checksPerformed: number;
  checksPassed: number;
  checksFailed: number;
  checksSkipped: number;
  error: string | null;
  processingTimeMs: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocSyncStatus {
  id: string;
  documentId: string;
  workspaceId: string;
  externalStorageType: DocStorage;
  externalId: string;
  externalPath: string;
  syncDirection: string;
  status: string;
  lastSyncedAt: string | null;
  lastSyncedBy: string | null;
  nextSyncAt: string | null;
  syncFrequency: BackupFrequency;
  error: string | null;
  retryCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocExternalSync {
  id: string;
  workspaceId: string;
  externalStorageType: DocStorage;
  externalStorageId: string;
  externalStorageName: string;
  status: string;
  direction: string;
  documentCount: number;
  folderCount: number;
  totalSize: number;
  lastSyncedAt: string | null;
  lastSyncedBy: string | null;
  nextSyncAt: string | null;
  syncFrequency: BackupFrequency;
  error: string | null;
  retryCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocWebhook {
  id: string;
  workspaceId: string;
  name: string;
  url: string;
  secret: string;
  events: string[];
  isActive: boolean;
  failureCount: number;
  lastTriggeredAt: string | null;
  lastTriggeredBy: string | null;
  lastResponseStatus: number | null;
  lastErrorMessage: string | null;
  retryCount: number;
  maxRetries: number;
  timeoutMs: number;
  headers: Record<string, string>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocAPIKey {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  keyHash: string;
  keyPrefix: string;
  scopes: string[];
  rateLimit: number;
  expiresAt: string | null;
  isActive: boolean;
  lastUsedAt: string | null;
  lastUsedIp: string | null;
  usageCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocRateLimit {
  id: string;
  workspaceId: string;
  apiKeyId: string | null;
  endpoint: string;
  method: string;
  maxRequests: number;
  windowMs: number;
  currentCount: number;
  windowStart: string;
  isExceeded: boolean;
  resetAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocUsage {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  storageUsed: number;
  storageLimit: number;
  apiCalls: number;
  apiLimit: number;
  downloads: number;
  downloadLimit: number;
  uploads: number;
  uploadLimit: number;
  ocrPages: number;
  ocrLimit: number;
  signatures: number;
  signatureLimit: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocBilling {
  id: string;
  workspaceId: string;
  planId: string;
  planName: string;
  billingCycle: string;
  amount: number;
  currency: string;
  status: string;
  nextBillingDate: string | null;
  lastBillingDate: string | null;
  paymentMethod: string | null;
  invoiceUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocPlan {
  id: string;
  name: string;
  description: string;
  tier: string;
  storageLimit: number;
  apiLimit: number;
  downloadLimit: number;
  uploadLimit: number;
  ocrLimit: number;
  signatureLimit: number;
  userLimit: number;
  workspaceLimit: number;
  features: string[];
  price: number;
  currency: string;
  billingCycle: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocFeature {
  id: string;
  name: string;
  description: string;
  category: string;
  isEnabled: boolean;
  isPremium: boolean;
  isBeta: boolean;
  usageCount: number;
  lastUsedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocIntegration {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  type: string;
  provider: string;
  status: string;
  configuration: Record<string, unknown>;
  credentials: Record<string, unknown>;
  isActive: boolean;
  lastSyncedAt: string | null;
  syncFrequency: BackupFrequency;
  error: string | null;
  retryCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocPlugin {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  version: string;
  author: string;
  status: string;
  configuration: Record<string, unknown>;
  isActive: boolean;
  installDate: string;
  lastUpdated: string | null;
  usageCount: number;
  lastUsedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocExtension {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  version: string;
  author: string;
  type: string;
  status: string;
  configuration: Record<string, unknown>;
  isActive: boolean;
  installDate: string;
  lastUpdated: string | null;
  usageCount: number;
  lastUsedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocTheme {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  borderColor: string;
  fontFamily: string;
  fontSize: number;
  borderRadius: number;
  logoUrl: string | null;
  faviconUrl: string | null;
  customCss: string | null;
  isDefault: boolean;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocBranding {
  id: string;
  workspaceId: string;
  name: string;
  logoUrl: string | null;
  logoLightUrl: string | null;
  logoDarkUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  companyName: string;
  companyUrl: string | null;
  supportUrl: string | null;
  privacyUrl: string | null;
  termsUrl: string | null;
  customCss: string | null;
  customJs: string | null;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocCustomField {
  id: string;
  name: string;
  displayName: string;
  description: string;
  workspaceId: string;
  fieldType: string;
  dataType: string;
  isRequired: boolean;
  isSearchable: boolean;
  isFilterable: boolean;
  isSortable: boolean;
  isGroupable: boolean;
  isAggregatable: boolean;
  defaultValue: unknown;
  options: Record<string, unknown>[] | null;
  validationRules: Record<string, unknown> | null;
  isActive: boolean;
  sortOrder: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocValidationRule {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  ruleType: string;
  severity: string;
  condition: Record<string, unknown>;
  errorMessage: string;
  successMessage: string | null;
  isActive: boolean;
  isSystem: boolean;
  executionCount: number;
  successCount: number;
  failureCount: number;
  lastExecutedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocBusinessRule {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  ruleType: string;
  trigger: string;
  conditions: Record<string, unknown>[];
  actions: Record<string, unknown>[];
  isActive: boolean;
  priority: number;
  executionCount: number;
  successCount: number;
  failureCount: number;
  lastExecutedAt: string | null;
  lastExecutedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocConditionalAccess {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  conditions: Record<string, unknown>[];
  effect: string;
  priority: number;
  isActive: boolean;
  isSystem: boolean;
  documentCount: number;
  lastEvaluatedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocRole {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  permissions: string[];
  isSystem: boolean;
  isDefault: boolean;
  isActive: boolean;
  memberCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocGroup {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  type: string;
  isActive: boolean;
  memberCount: number;
  memberIds: string[];
  memberNames: string[];
  memberEmails: string[];
  parentGroupId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocPolicy {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  policyType: string;
  rules: Record<string, unknown>[];
  isActive: boolean;
  isSystem: boolean;
  isEnforced: boolean;
  priority: number;
  documentCount: number;
  lastAppliedAt: string | null;
  lastAppliedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocComplianceRule {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  regulationId: string | null;
  category: string;
  severity: string;
  condition: Record<string, unknown>;
  autoFix: boolean;
  autoFixAction: string | null;
  isActive: boolean;
  isSystem: boolean;
  documentCount: number;
  violationCount: number;
  lastCheckedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocAuditTrail {
  id: string;
  workspaceId: string;
  documentId: string | null;
  folderId: string | null;
  entityType: string;
  entityId: string;
  action: AuditActionDoc;
  userId: string;
  userName: string;
  userEmail: string;
  previousState: Record<string, unknown> | null;
  newState: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  sessionId: string | null;
  requestId: string | null;
  traceId: string | null;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: string;
}

export interface DocEvent {
  id: string;
  workspaceId: string;
  documentId: string | null;
  folderId: string | null;
  eventType: string;
  eventSource: string;
  eventVersion: string;
  payload: Record<string, unknown>;
  metadata: Record<string, unknown>;
  isProcessed: boolean;
  processedAt: string | null;
  processedBy: string | null;
  error: string | null;
  retryCount: number;
  maxRetries: number;
  createdAt: string;
  updatedAt: string;
}

export interface DocEventHandler {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  eventType: string;
  handlerType: string;
  handlerConfig: Record<string, unknown>;
  isActive: boolean;
  priority: number;
  executionCount: number;
  successCount: number;
  failureCount: number;
  lastExecutedAt: string | null;
  lastError: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocEventLog {
  id: string;
  workspaceId: string;
  eventId: string;
  handlerId: string | null;
  eventType: string;
  eventSource: string;
  status: string;
  payload: Record<string, unknown>;
  result: Record<string, unknown> | null;
  error: string | null;
  processingTimeMs: number | null;
  retryCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}


export interface DocSignatureInvitee {
  id: string;
  signatureRequestId: string;
  documentId: string;
  workspaceId: string;
  userId: string | null;
  name: string;
  email: string;
  phone: string | null;
  status: SignatureStatus;
  signingOrder: number;
  signedAt: string | null;
  declinedAt: string | null;
  declinedReason: string | null;
  viewedAt: string | null;
  lastReminderAt: string | null;
  reminderCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocCollaborationSession {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  cursor: Record<string, unknown> | null;
  selection: Record<string, unknown> | null;
  color: string;
  isActive: boolean;
  startedAt: string;
  lastActiveAt: string;
  endedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocAnnotationLayer {
  id: string;
  documentId: string;
  workspaceId: string;
  name: string;
  description: string;
  isVisible: boolean;
  isLocked: boolean;
  opacity: number;
  color: string;
  annotations: DocAnnotation[];
  createdBy: string;
  createdByName: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocDrawingMarkup {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  markupType: string;
  pageNumber: number;
  coordinates: Record<string, unknown>[];
  color: string;
  strokeWidth: number;
  opacity: number;
  fillColor: string | null;
  text: string | null;
  fontSize: number | null;
  fontFamily: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocCommentThread {
  id: string;
  documentId: string;
  workspaceId: string;
  title: string;
  status: string;
  commentCount: number;
  participants: string[];
  lastCommentAt: string | null;
  lastCommentBy: string | null;
  isResolved: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocMention {
  id: string;
  documentId: string;
  workspaceId: string;
  mentionerId: string;
  mentionerName: string;
  mentionedUserId: string;
  mentionedUserName: string;
  context: string;
  isRead: boolean;
  readAt: string | null;
  notificationId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocSubscription {
  id: string;
  documentId: string;
  folderId: string | null;
  workspaceId: string;
  userId: string;
  userName: string;
  events: string[];
  isActive: boolean;
  isEmail: boolean;
  isPush: boolean;
  isInApp: boolean;
  lastNotifiedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocWatch {
  id: string;
  documentId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  watchType: string;
  isActive: boolean;
  lastCheckedAt: string | null;
  lastChangeDetectedAt: string | null;
  changeCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocChangeNotification {
  id: string;
  documentId: string;
  workspaceId: string;
  changeType: string;
  changedBy: string;
  changedByName: string;
  changeSummary: string;
  previousVersionId: string | null;
  newVersionId: string | null;
  notifiedUserIds: string[];
  notifiedCount: number;
  isDelivered: boolean;
  deliveredAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocApprovalDelegate {
  id: string;
  approvalStepId: string;
  workspaceId: string;
  delegatorId: string;
  delegatorName: string;
  delegateId: string;
  delegateName: string;
  reason: string;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocSigningCeremony {
  id: string;
  signatureRequestId: string;
  documentId: string;
  workspaceId: string;
  status: SignatureStatus;
  startedAt: string | null;
  completedAt: string | null;
  signingUrl: string | null;
  brandingEnabled: boolean;
  authenticationRequired: boolean;
  authenticationMethod: string | null;
  witnessRequired: boolean;
  notarizationRequired: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocNotaryService {
  id: string;
  workspaceId: string;
  name: string;
  provider: string;
  configuration: Record<string, unknown>;
  isActive: boolean;
  notaryCount: number;
  lastNotarizedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocLegalSeal {
  id: string;
  documentId: string;
  workspaceId: string;
  sealType: string;
  sealData: string;
  issuedBy: string;
  issuedByName: string;
  issuedAt: string;
  validFrom: string;
  validTo: string | null;
  isActive: boolean;
  isRevoked: boolean;
  revokedAt: string | null;
  revokedBy: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocComplianceCertification {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  certificationBody: string;
  certificationNumber: string;
  scope: string;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  documents: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocRegulatoryFiling {
  id: string;
  workspaceId: string;
  documentId: string;
  regulationId: string;
  filingType: string;
  jurisdiction: string;
  filingDate: string | null;
  dueDate: string;
  status: string;
  filingReference: string | null;
  submittedBy: string | null;
  submittedByName: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocDocumentClassification {
  id: string;
  documentId: string;
  workspaceId: string;
  classificationPolicyId: string;
  primaryClassification: DocClassification;
  secondaryClassifications: DocClassification[];
  classificationLevel: ClassificationLevel;
  confidence: number;
  classifiedBy: string;
  classifiedByName: string;
  classifiedAt: string;
  isAutoClassified: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocClassificationPolicy {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  rules: Record<string, unknown>[];
  defaultClassification: DocClassification;
  autoClassify: boolean;
  requireManualReview: boolean;
  isActive: boolean;
  documentCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocDataLossPrevention {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  rules: Record<string, unknown>[];
  isActive: boolean;
  actions: string[];
  alertEmails: string[];
  detectionCount: number;
  lastDetectedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocSecurityScan {
  id: string;
  documentId: string;
  workspaceId: string;
  scanType: string;
  status: DocProcessingStatus;
  result: string;
  threats: Record<string, unknown>[];
  warnings: Record<string, unknown>[];
  scannedAt: string | null;
  scannedBy: string | null;
  engine: string;
  engineVersion: string;
  processingTimeMs: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocMalwareScan {
  id: string;
  documentId: string;
  workspaceId: string;
  status: DocProcessingStatus;
  isClean: boolean;
  malwareType: string | null;
  malwareName: string | null;
  quarantineAction: string | null;
  scannedAt: string | null;
  engine: string;
  engineVersion: string;
  signatureVersion: string;
  processingTimeMs: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocVirusScan {
  id: string;
  documentId: string;
  workspaceId: string;
  status: DocProcessingStatus;
  isClean: boolean;
  virusName: string | null;
  virusDefinition: string | null;
  action: string | null;
  scannedAt: string | null;
  engine: string;
  engineVersion: string;
  processingTimeMs: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocSensitivityLabel {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  color: string;
  priority: number;
  isEncryptionRequired: boolean;
  isExternalSharingAllowed: boolean;
  accessScope: string[];
  isActive: boolean;
  documentCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocAccessPolicy {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  policyType: string;
  conditions: Record<string, unknown>[];
  effect: string;
  priority: number;
  isActive: boolean;
  isSystem: boolean;
  appliesTo: string[];
  documentCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocDataGovernance {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  policies: string[];
  dataOwner: string;
  dataSteward: string;
  retentionYears: number;
  isActive: boolean;
  lastReviewedAt: string | null;
  lastReviewedBy: string | null;
  nextReviewAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocLifecycleStage {
  id: string;
  documentId: string;
  workspaceId: string;
  stage: string;
  enteredAt: string;
  exitedAt: string | null;
  enteredBy: string;
  exitedBy: string | null;
  duration: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocMigrationJob {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  sourceType: DocStorage;
  targetType: DocStorage;
  status: DocProcessingStatus;
  documentIds: string[];
  totalItems: number;
  processedItems: number;
  failedItems: number;
  progress: number;
  error: string | null;
  startedAt: string | null;
  completedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocMigrationPlan {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  sourceType: DocStorage;
  targetType: DocStorage;
  migrationStrategy: string;
  scheduleType: string;
  isActive: boolean;
  documentCount: number;
  totalSize: number;
  lastMigrationAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocCloudStorage {
  id: string;
  name: string;
  provider: string;
  workspaceId: string;
  bucketName: string;
  region: string;
  accessKeyId: string | null;
  endpoint: string | null;
  isActive: boolean;
  isDefault: boolean;
  totalSize: number;
  usedSize: number;
  documentCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocLocalStorage {
  id: string;
  name: string;
  workspaceId: string;
  path: string;
  totalSize: number;
  usedSize: number;
  availableSize: number;
  isActive: boolean;
  isDefault: boolean;
  documentCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocBlobStorage {
  id: string;
  name: string;
  provider: string;
  workspaceId: string;
  containerName: string;
  connectionString: string | null;
  endpoint: string | null;
  isActive: boolean;
  isDefault: boolean;
  totalSize: number;
  usedSize: number;
  documentCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocCDNConfig {
  id: string;
  workspaceId: string;
  provider: string;
  endpoint: string;
  distributionId: string | null;
  customDomain: string | null;
  sslEnabled: boolean;
  cachePolicy: string;
  cacheTtl: number;
  isActive: boolean;
  totalBandwidth: number;
  monthlyBandwidthLimit: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocCacheConfig {
  id: string;
  workspaceId: string;
  cacheType: string;
  strategy: string;
  ttl: number;
  maxSize: number;
  currentSize: number;
  hitRate: number;
  missRate: number;
  evictionCount: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocReplication {
  id: string;
  workspaceId: string;
  sourceStorageId: string;
  targetStorageId: string;
  replicationType: string;
  status: string;
  lagMs: number | null;
  lastReplicatedAt: string | null;
  isActive: boolean;
  documentCount: number;
  totalSize: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocGeoRedundancy {
  id: string;
  workspaceId: string;
  primaryRegion: string;
  secondaryRegions: string[];
  replicationFactor: number;
  isActive: boolean;
  isAutomatic: boolean;
  lastFailoverAt: string | null;
  failoverCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocFailoverConfig {
  id: string;
  workspaceId: string;
  primaryStorageId: string;
  failoverStorageIds: string[];
  isActive: boolean;
  isAutomatic: boolean;
  failoverThreshold: number;
  failbackThreshold: number;
  lastFailoverAt: string | null;
  lastFailbackAt: string | null;
  failoverCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocHealthCheck {
  id: string;
  workspaceId: string;
  storageId: string | null;
  checkType: string;
  status: string;
  responseTimeMs: number | null;
  errorMessage: string | null;
  checkedAt: string;
  metadata: Record<string, unknown>;
}

export interface DocMetricsDashboard {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  widgets: Record<string, unknown>[];
  layout: Record<string, unknown>;
  isDefault: boolean;
  isShared: boolean;
  refreshInterval: number;
  lastRefreshedAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByName: string;
  lastModifiedBy: string;
}

export interface DocPerformanceReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  avgResponseTimeMs: number;
  p95ResponseTimeMs: number;
  p99ResponseTimeMs: number;
  totalRequests: number;
  failedRequests: number;
  errorRate: number;
  throughput: number;
  uptime: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocUsageReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalDocuments: number;
  newDocuments: number;
  totalViews: number;
  totalDownloads: number;
  totalSearches: number;
  totalApiCalls: number;
  storageUsed: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocComplianceReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalDocuments: number;
  compliantDocuments: number;
  nonCompliantDocuments: number;
  compliancePercentage: number;
  violations: number;
  warnings: number;
  resolvedViolations: number;
  pendingReviews: number;
  categories: Record<string, unknown>[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocSecurityReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalScans: number;
  cleanScans: number;
  threatDetections: number;
  blockedAttempts: number;
  accessDenials: number;
  suspiciousActivities: number;
  incidents: number;
  resolvedIncidents: number;
  openIncidents: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocAuditReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalEvents: number;
  eventsByType: Record<string, number>;
  eventsByUser: Record<string, number>;
  eventsByDocument: Record<string, number>;
  peakHour: number;
  uniqueUsers: number;
  uniqueDocuments: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocDocumentReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalDocuments: number;
  documentsByCategory: Record<string, number>;
  documentsByClassification: Record<string, number>;
  documentsByStatus: Record<string, number>;
  documentsByFormat: Record<string, number>;
  totalSize: number;
  avgSize: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocWorkflowReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalWorkflows: number;
  completedWorkflows: number;
  failedWorkflows: number;
  activeWorkflows: number;
  avgCompletionTimeMs: number;
  workflowsByType: Record<string, number>;
  workflowsByStatus: Record<string, number>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocSignatureReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalRequests: number;
  completedSignatures: number;
  pendingSignatures: number;
  declinedSignatures: number;
  expiredSignatures: number;
  avgCompletionTimeMs: number;
  signaturesByType: Record<string, number>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocApprovalReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalApprovals: number;
  approved: number;
  rejected: number;
  pending: number;
  cancelled: number;
  avgApprovalTimeMs: number;
  approvalsByType: Record<string, number>;
  topApprovers: Record<string, unknown>[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocStorageReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalStorageUsed: number;
  storageByType: Record<string, number>;
  storageByClassification: Record<string, number>;
  storageByCategory: Record<string, number>;
  growthRate: number;
  projectedUsage: number;
  quotaUsage: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocActivityReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalActivities: number;
  activitiesByType: Record<string, number>;
  activitiesByUser: Record<string, number>;
  activitiesByDocument: Record<string, number>;
  peakActivityHour: number;
  uniqueUsers: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocUserActivityReport {
  id: string;
  workspaceId: string;
  userId: string;
  userName: string;
  period: string;
  startDate: string;
  endDate: string;
  totalActivities: number;
  documentsCreated: number;
  documentsModified: number;
  documentsViewed: number;
  documentsDownloaded: number;
  documentsShared: number;
  searchCount: number;
  avgSessionDuration: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocPermissionReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalPermissions: number;
  permissionsByType: Record<string, number>;
  permissionsByLevel: Record<string, number>;
  inheritedPermissions: number;
  directPermissions: number;
  expiredPermissions: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocShareReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalShares: number;
  sharesByType: Record<string, number>;
  internalShares: number;
  externalShares: number;
  publicShares: number;
  activeShares: number;
  expiredShares: number;
  topSharedDocuments: Record<string, unknown>[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DocAccessReport {
  id: string;
  workspaceId: string;
  period: string;
  startDate: string;
  endDate: string;
  totalAccesses: number;
  uniqueUsers: number;
  uniqueDocuments: number;
  accessesByType: Record<string, number>;
  peakAccessHour: number;
  avgAccessDuration: number;
  suspiciousAccesses: number;
  deniedAccesses: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

// ==================== PHASE 4.7 — GESTCRP ====================
export * from './phase4-7-gestcrp';

// ==================== PHASE 4.8 — GECIRAP ====================
export * from './phase4-8-gecirap';

// ==================== PHASE 4.9 — GEDKIN ====================
export * from './phase4-9-gedkin';

// ==================== PHASE 4.10 — GEAESIP ====================
export * from './phase4-10-geaesip';

