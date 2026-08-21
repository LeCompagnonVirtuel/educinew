/**
 * Types partagés EduCI.
 * Source de vérité : @educi/types (packages/types/src/index.ts)
 * Ce fichier sera remplacé par `export * from '@educi/types'` une fois les workspace links actifs.
 */

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
export type Role = (typeof Role)[keyof typeof Role];

export const Gender = { M: 'M', F: 'F' } as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const AttendanceStatus = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
} as const;
export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

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
export type GradeType = (typeof GradeType)[keyof typeof GradeType];

export const PeriodType = {
  TRIMESTER: 'TRIMESTER',
  SEMESTER: 'SEMESTER',
  YEAR: 'YEAR',
} as const;
export type PeriodType = (typeof PeriodType)[keyof typeof PeriodType];

export const BulletinStatus = {
  DRAFT: 'DRAFT',
  VALIDATED: 'VALIDATED',
  PUBLISHED: 'PUBLISHED',
} as const;
export type BulletinStatus = (typeof BulletinStatus)[keyof typeof BulletinStatus];

export const CheckInMethod = {
  GPS: 'GPS',
  QR_CODE: 'QR_CODE',
  FACIAL_RECOGNITION: 'FACIAL_RECOGNITION',
  MANUAL: 'MANUAL',
} as const;
export type CheckInMethod = (typeof CheckInMethod)[keyof typeof CheckInMethod];

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
export type Mention = (typeof Mention)[keyof typeof Mention];

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
export type ScanType = (typeof ScanType)[keyof typeof ScanType];

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
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
  address?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  primaryColor?: string;
  latitude?: number;
  longitude?: number;
  checkinRadius?: number;
  createdAt: string;
  _count?: {
    students: number;
    teachers: number;
    classes: number;
  };
}

export interface Student {
  id: string;
  userId: string;
  schoolId: string;
  classId?: string;
  parentId?: string;
  matricule: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  enrollmentDate?: string;
  isActive?: boolean;
  user: { id: string; name: string; email: string; photoUrl?: string };
  class?: { id: string; name: string; level: string };
  parent?: { id: string; name: string };
  parents?: { id: string; name: string }[];
}

export interface Teacher {
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
  periodType: PeriodType;
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
  gradeType: GradeType;
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
  status: BulletinStatus;
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
  status: AttendanceStatus;
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
  tracking?: { latitude: number; longitude: number; timestamp: string }[];
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
  method: CheckInMethod;
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
  role: Role;
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
  userType: 'student' | 'teacher' | 'admin';
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
