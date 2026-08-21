/**
 * @educi/config — Matrice de permissions par rôle.
 * Définit quelles routes sont accessibles par chaque rôle.
 */

export const ROLE_ROUTES: Record<string, readonly string[]> = {
  SUPER_ADMIN: [
    '/super-admin', '/superadmin', '/dashboard', '/students', '/teachers', '/classes',
    '/attendance', '/grades', '/bulletin', '/payments', '/transport',
    '/messages', '/announcements', '/timetable', '/courses', '/ai',
    '/marketplace', '/teacher-checkin', '/staff-checkin', '/notifications',
    '/users', '/settings', '/school-map', '/transport-map', '/calendar',
    '/roles', '/bulk-import', '/financials', '/analytics', '/school-analytics',
    '/security', '/report-card', '/behavior', '/academic-reports',
    '/profile', '/ai-dashboard', '/ai-study-plan', '/bulk-import-teachers',
    '/outstanding', '/student-documents', '/exam-prep', '/quiz', '/onboarding',
    '/pointage', '/driver-dashboard',
    '/admin/logs', '/admin/monitoring', '/admin/reports', '/admin/branding', '/admin/staff',
    '/admin/pointage-eleves', '/admin/pointage-personnel',
    '/admin/qr-monitoring', '/qr-badge',
    '/email-logs',
    '/library', '/cantine', '/infirmerie', '/nouvelle-annee', '/directeur',
  ],

  ADMIN: [
    '/dashboard', '/students', '/teachers', '/classes', '/grades', '/attendance',
    '/payments', '/transport', '/transport-map', '/school-map', '/users', '/announcements',
    '/settings', '/notifications', '/timetable', '/calendar', '/roles', '/bulk-import',
    '/financials', '/analytics', '/school-analytics', '/marketplace',
    '/security', '/ai', '/messages', '/report-card', '/behavior',
    '/academic-reports', '/courses', '/teacher-checkin', '/staff-checkin',
    '/bulletin', '/profile', '/ai-dashboard', '/bulk-import-teachers',
    '/outstanding', '/onboarding', '/pointage', '/driver-dashboard',
    '/admin/logs', '/admin/monitoring', '/admin/reports', '/admin/branding', '/admin/staff',
    '/admin/pointage-eleves', '/admin/pointage-personnel',
    '/admin/qr-monitoring', '/qr-badge',
    '/email-logs',
    '/library', '/cantine', '/infirmerie', '/nouvelle-annee', '/directeur',
  ],

  DIRECTEUR: [
    '/directeur', '/dashboard', '/students', '/teachers', '/classes',
    '/grades', '/attendance', '/bulletin', '/report-card', '/academic-reports',
    '/behavior', '/analytics', '/school-analytics', '/notifications',
    '/messages', '/profile', '/settings', '/timetable',
    '/library', '/cantine', '/infirmerie', '/qr-badge',
  ],

  COMPTABLE: [
    '/comptable', '/payments', '/financials', '/notifications',
    '/payment-history', '/payment-receipt', '/make-payment',
    '/profile', '/outstanding', '/pointage', '/settings',
    '/comptable/finance', '/comptable/payments', '/comptable/reports',
    '/qr-badge', '/cantine',
  ],

  SECRETAIRE: [
    '/secretaire', '/students', '/notifications', '/announcements',
    '/profile', '/secretaire/documents', '/pointage', '/messages', '/settings',
    '/qr-badge',
  ],

  CENSEUR: [
    '/censeur', '/students', '/notifications', '/attendance', '/grades', '/bulletin',
    '/profile', '/censeur/incidents', '/behavior', '/academic-reports', '/settings',
    '/qr-badge', '/infirmerie', '/library',
  ],

  SURVEILLANT: [
    '/surveillant', '/surveillant/pointage-eleves', '/surveillant/visiteurs',
    '/staff-checkin', '/pointage', '/students', '/teachers',
    '/admin/pointage-eleves', '/admin/pointage-personnel',
    '/notifications', '/messages', '/profile', '/settings',
    '/qr-badge',
  ],

  TEACHER: [
    '/teacher-dashboard', '/teacher-dashboard/enhanced', '/my-classes', '/mark-attendance',
    '/grade-entry', '/schedule', '/assignments', '/teacher-checkin', '/staff-checkin',
    '/teacher-settings', '/teacher-profile', '/ai', '/messages', '/notifications',
    '/courses', '/attendance', '/grades', '/bulletin', '/profile',
    '/exam-prep', '/ai-dashboard', '/ai-study-plan', '/pointage',
    '/teacher/scan-students', '/qr-badge',
  ],

  PARENT: [
    '/parent', '/notifications', '/parent-dashboard', '/bulletin',
    '/messages', '/payment-history', '/profile', '/make-payment',
    '/payment-receipt', '/payments',
    '/parent/attendance', '/parent/grades', '/parent/payments', '/parent/transport',
    '/qr-badge',
  ],

  STUDENT: [
    '/student', '/ai', '/notifications', '/student-dashboard', '/bulletin',
    '/profile', '/student/quiz', '/student/grades', '/student/assignments',
    '/student-documents', '/exam-prep', '/quiz', '/ai-study-plan', '/ai-dashboard',
    '/student-checkin', '/qr-badge', '/timetable', '/messages',
  ],

  CHAUFFEUR: [
    '/driver-dashboard', '/transport', '/transport-map',
    '/messages', '/notifications', '/profile', '/settings',
    '/qr-badge',
  ],

  BIBLIOTHECAIRE: [
    '/library', '/notifications', '/profile', '/settings', '/qr-badge',
  ],

  INFIRMIER: [
    '/infirmerie', '/notifications', '/profile', '/settings', '/qr-badge',
  ],
} as const;

// ==================== AUTH PERMISSIONS ====================

export const AUTH_PERMISSIONS = {
  MANAGE_SCHOOLS: ['SUPER_ADMIN'],
  CREATE_SCHOOL: ['SUPER_ADMIN'],
  DELETE_SCHOOL: ['SUPER_ADMIN'],
  MANAGE_USERS: ['SUPER_ADMIN', 'ADMIN'],
  CREATE_USER: ['SUPER_ADMIN', 'ADMIN'],
  DELETE_USER: ['SUPER_ADMIN'],
  CHANGE_ROLE: ['SUPER_ADMIN'],
  VIEW_ALL_SCHOOLS: ['SUPER_ADMIN'],
  MANAGE_OWN_SCHOOL: ['ADMIN', 'DIRECTEUR'],
  MANAGE_STAFF: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'],
  MANAGE_TEACHERS: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'],
  MANAGE_STUDENTS: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'SECRETAIRE', 'CENSEUR'],
  MANAGE_PARENTS: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'SECRETAIRE'],
  VIEW_GRADES: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'CENSEUR', 'TEACHER', 'PARENT', 'STUDENT'],
  EDIT_GRADES: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'TEACHER'],
  MANAGE_PAYMENTS: ['SUPER_ADMIN', 'ADMIN', 'COMPTABLE'],
  VIEW_PAYMENTS: ['SUPER_ADMIN', 'ADMIN', 'COMPTABLE', 'DIRECTEUR', 'PARENT', 'STUDENT'],
  MANAGE_ATTENDANCE: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'CENSEUR', 'SURVEILLANT', 'TEACHER'],
  VIEW_ATTENDANCE: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'CENSEUR', 'TEACHER', 'PARENT', 'STUDENT'],
  MANAGE_TRANSPORT: ['SUPER_ADMIN', 'ADMIN', 'CHAUFFEUR'],
  MANAGE_ANNOUNCEMENTS: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'SECRETAIRE'],
  MANAGE_LIBRARY: ['SUPER_ADMIN', 'ADMIN', 'BIBLIOTHECAIRE'],
  MANAGE_INFIRMERIE: ['SUPER_ADMIN', 'ADMIN', 'INFIRMIER'],
  VIEW_ANALYTICS: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'],
  MANAGE_SETTINGS: ['SUPER_ADMIN', 'ADMIN'],
  VIEW_SECURITY_LOGS: ['SUPER_ADMIN', 'ADMIN'],
  MANAGE_INVITATIONS: ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'],
} as const;
