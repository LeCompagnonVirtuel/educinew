import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Calendar,
  CreditCard, MessageSquare, Bus, Bell, Settings, Megaphone,
  Sparkles, TrendingUp, Menu, Clock, Award, ShoppingCart,
  QrCode, FileText, Palette, BarChart3, Building, Activity,
  Shield, MapPin, ClipboardCheck, Brain, Heart, DollarSign,
  Printer, FolderOpen, AlertTriangle, Eye, Globe, Layers,
  UserCircle, LogOut, Server, ScrollText, Briefcase,
} from 'lucide-react';
import type { NavigationConfig, RoleKey } from './types';

export const navigationConfigs: Record<RoleKey, NavigationConfig> = {
  admin: {
    groups: [
      {
        id: 'administration',
        label: 'Administration',
        items: [
          { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard' },
          { id: 'students', icon: Users, label: 'Élèves', href: '/students' },
          { id: 'teachers', icon: GraduationCap, label: 'Enseignants', href: '/teachers' },
          { id: 'classes', icon: BookOpen, label: 'Classes', href: '/classes' },
          { id: 'users', icon: Users, label: 'Utilisateurs', href: '/users' },
        ],
      },
      {
        id: 'pointage',
        label: 'Pointage',
        items: [
          { id: 'pointage-eleves', icon: GraduationCap, label: 'Pointage Élèves', href: '/admin/pointage-eleves' },
          { id: 'pointage-personnel', icon: Briefcase, label: 'Pointage Personnel', href: '/admin/pointage-personnel' },
        ],
      },
      {
        id: 'academique',
        label: 'Académique',
        items: [
          { id: 'grades', icon: TrendingUp, label: 'Notes', href: '/grades' },
          { id: 'bulletin', icon: FileText, label: 'Bulletins', href: '/bulletin' },
          { id: 'attendance', icon: Clock, label: 'Présences', href: '/attendance' },
          { id: 'timetable', icon: Calendar, label: 'Emploi du temps', href: '/timetable' },
          { id: 'courses', icon: BookOpen, label: 'Cours', href: '/courses' },
        ],
      },
      {
        id: 'communication',
        label: 'Communication',
        items: [
          { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' },
          { id: 'announcements', icon: Megaphone, label: 'Annonces', href: '/announcements' },
          { id: 'notifications', icon: Bell, label: 'Notifications', href: '/notifications' },
        ],
      },
      {
        id: 'finance',
        label: 'Finance',
        items: [
          { id: 'payments', icon: CreditCard, label: 'Paiements', href: '/payments' },
          { id: 'marketplace', icon: ShoppingCart, label: 'Marketplace', href: '/marketplace' },
        ],
      },
      {
        id: 'services',
        label: 'Services',
        items: [
          { id: 'transport', icon: Bus, label: 'Transport', href: '/transport' },
          { id: 'ai', icon: Sparkles, label: 'EduCI AI', href: '/ai' },
        ],
      },
      {
        id: 'rapports',
        label: 'Rapports & Suivi',
        items: [
          { id: 'reports', icon: BarChart3, label: 'Rapports', href: '/admin/reports' },
          { id: 'staff', icon: Briefcase, label: 'Personnel', href: '/admin/staff' },
          { id: 'logs', icon: ScrollText, label: 'Journal système', href: '/admin/logs' },
          { id: 'monitoring', icon: Server, label: 'Monitoring', href: '/admin/monitoring' },
          { id: 'qr-monitoring', icon: QrCode, label: 'QR Codes', href: '/admin/qr-monitoring' },
        ],
      },
      {
        id: 'parametres',
        label: 'Paramètres',
        items: [
          { id: 'branding', icon: Palette, label: 'Branding', href: '/admin/branding' },
          { id: 'settings', icon: Settings, label: 'Configuration', href: '/settings' },
          { id: 'profile', icon: UserCircle, label: 'Mon Profil', href: '/profile' },
        ],
      },
    ],
  },

  superadmin: {
    groups: [
      {
        id: 'plateforme',
        label: 'Plateforme',
        items: [
          { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: '/superadmin' },
          { id: 'schools', icon: Building, label: 'Établissements', href: '/superadmin' },
          { id: 'users', icon: Users, label: 'Utilisateurs', href: '/users' },
          { id: 'subscriptions', icon: CreditCard, label: 'Abonnements', href: '/superadmin' },
        ],
      },
      {
        id: 'monitoring',
        label: 'Monitoring',
        items: [
          { id: 'analytics', icon: BarChart3, label: 'Analytics', href: '/analytics' },
          { id: 'activity', icon: Activity, label: 'Activité', href: '/superadmin' },
          { id: 'support', icon: Shield, label: 'Support', href: '/superadmin' },
        ],
      },
      {
        id: 'configuration',
        label: 'Configuration',
        items: [
          { id: 'settings', icon: Settings, label: 'Paramètres', href: '/settings' },
          { id: 'profile', icon: UserCircle, label: 'Mon Profil', href: '/profile' },
        ],
      },
    ],
  },

  teacher: {
    groups: [
      {
        id: 'pedagogie',
        label: 'Pédagogie',
        items: [
          { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: '/teacher-dashboard' },
          { id: 'classes', icon: BookOpen, label: 'Mes classes', href: '/my-classes' },
          { id: 'grades', icon: TrendingUp, label: 'Notes', href: '/grade-entry' },
          { id: 'assignments', icon: FileText, label: 'Devoirs', href: '/assignments' },
        ],
      },
      {
        id: 'suivi',
        label: 'Suivi',
        items: [
          { id: 'attendance', icon: ClipboardCheck, label: 'Appel', href: '/mark-attendance' },
          { id: 'scan-students', icon: QrCode, label: 'Scanner élèves', href: '/teacher/scan-students' },
          { id: 'checkin', icon: MapPin, label: 'Mon pointage', href: '/teacher-checkin' },
          { id: 'timetable', icon: Clock, label: 'Emploi du temps', href: '/schedule' },
        ],
      },
      {
        id: 'communication',
        label: 'Communication',
        items: [
          { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' },
          { id: 'notifications', icon: Bell, label: 'Notifications', href: '/notifications' },
        ],
      },
      {
        id: 'outils',
        label: 'Outils',
        items: [
          { id: 'ai', icon: Sparkles, label: 'EduCI AI', href: '/ai' },
          { id: 'settings', icon: Settings, label: 'Paramètres', href: '/teacher-settings' },
          { id: 'profile', icon: UserCircle, label: 'Mon Profil', href: '/profile' },
        ],
      },
    ],
  },

  student: {
    groups: [
      {
        id: 'apprentissage',
        label: 'Apprentissage',
        items: [
          { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: '/student' },
          { id: 'grades', icon: TrendingUp, label: 'Mes Notes', href: '/student/grades' },
          { id: 'assignments', icon: FileText, label: 'Devoirs', href: '/student/assignments' },
          { id: 'quizzes', icon: Brain, label: 'Quiz & Examens', href: '/exam-prep' },
        ],
      },
      {
        id: 'organisation',
        label: 'Organisation',
        items: [
          { id: 'timetable', icon: Calendar, label: 'Emploi du temps', href: '/timetable' },
          { id: 'checkin', icon: QrCode, label: 'Pointage', href: '/student-checkin' },
          { id: 'bulletin', icon: FileText, label: 'Mon Bulletin', href: '/bulletin' },
        ],
      },
      {
        id: 'communication',
        label: 'Communication',
        items: [
          { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' },
          { id: 'notifications', icon: Bell, label: 'Notifications', href: '/notifications' },
        ],
      },
      {
        id: 'compte',
        label: 'Mon Compte',
        items: [
          { id: 'profile', icon: UserCircle, label: 'Mon Profil', href: '/profile' },
          { id: 'qr-badge', icon: QrCode, label: 'Badge QR', href: '/qr-badge' },
        ],
      },
    ],
  },

  parent: {
    groups: [
      {
        id: 'suivi-enfants',
        label: 'Suivi Enfants',
        items: [
          { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: '/parent' },
          { id: 'grades', icon: TrendingUp, label: 'Notes', href: '/parent/grades' },
          { id: 'attendance', icon: Clock, label: 'Présence', href: '/parent/attendance' },
          { id: 'bulletin', icon: FileText, label: 'Bulletins', href: '/bulletin' },
        ],
      },
      {
        id: 'finance',
        label: 'Finance',
        items: [
          { id: 'payments', icon: CreditCard, label: 'Paiements', href: '/parent/payments' },
        ],
      },
      {
        id: 'services',
        label: 'Services',
        items: [
          { id: 'transport', icon: Bus, label: 'Transport', href: '/parent/transport' },
        ],
      },
      {
        id: 'communication',
        label: 'Communication',
        items: [
          { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' },
          { id: 'notifications', icon: Bell, label: 'Notifications', href: '/notifications' },
        ],
      },
      {
        id: 'compte',
        label: 'Mon Compte',
        items: [
          { id: 'profile', icon: UserCircle, label: 'Mon Profil', href: '/profile' },
          { id: 'qr-badge', icon: QrCode, label: 'Badge QR', href: '/qr-badge' },
        ],
      },
    ],
  },

  comptable: {
    groups: [
      {
        id: 'finance',
        label: 'Finance',
        items: [
          { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: '/comptable' },
          { id: 'payments', icon: CreditCard, label: 'Paiements', href: '/comptable/payments' },
          { id: 'finance', icon: DollarSign, label: 'Finance', href: '/comptable/finance' },
          { id: 'fees', icon: DollarSign, label: 'Frais scolaires', href: '/payments' },
          { id: 'receipts', icon: Printer, label: 'Reçus', href: '/payment-history' },
        ],
      },
      {
        id: 'rapports',
        label: 'Rapports',
        items: [
          { id: 'reports', icon: BarChart3, label: 'Rapports', href: '/comptable/reports' },
        ],
      },
      {
        id: 'parametres',
        label: 'Paramètres',
        items: [
          { id: 'notifications', icon: Bell, label: 'Notifications', href: '/notifications' },
          { id: 'settings', icon: Settings, label: 'Paramètres', href: '/settings' },
          { id: 'profile', icon: UserCircle, label: 'Mon Profil', href: '/profile' },
        ],
      },
    ],
  },

  secretaire: {
    groups: [
      {
        id: 'gestion',
        label: 'Gestion',
        items: [
          { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: '/secretaire' },
          { id: 'documents', icon: FileText, label: 'Documents', href: '/secretaire/documents' },
          { id: 'students', icon: Users, label: 'Élèves', href: '/students' },
        ],
      },
      {
        id: 'communication',
        label: 'Communication',
        items: [
          { id: 'announcements', icon: Megaphone, label: 'Annonces', href: '/announcements' },
          { id: 'communications', icon: MessageSquare, label: 'Messages', href: '/messages' },
          { id: 'notifications', icon: Bell, label: 'Notifications', href: '/notifications' },
        ],
      },
      {
        id: 'parametres',
        label: 'Paramètres',
        items: [
          { id: 'settings', icon: Settings, label: 'Paramètres', href: '/settings' },
          { id: 'profile', icon: UserCircle, label: 'Mon Profil', href: '/profile' },
        ],
      },
    ],
  },

  censeur: {
    groups: [
      {
        id: 'discipline',
        label: 'Discipline',
        items: [
          { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: '/censeur' },
          { id: 'incidents', icon: AlertTriangle, label: 'Incidents', href: '/censeur/incidents' },
        ],
      },
      {
        id: 'suivi',
        label: 'Suivi',
        items: [
          { id: 'students', icon: Users, label: 'Élèves', href: '/students' },
          { id: 'attendance', icon: ClipboardCheck, label: 'Présences', href: '/attendance' },
          { id: 'grades', icon: TrendingUp, label: 'Notes', href: '/grades' },
          { id: 'bulletin', icon: FileText, label: 'Bulletins', href: '/bulletin' },
        ],
      },
      {
        id: 'parametres',
        label: 'Paramètres',
        items: [
          { id: 'notifications', icon: Bell, label: 'Notifications', href: '/notifications' },
          { id: 'settings', icon: Settings, label: 'Paramètres', href: '/settings' },
          { id: 'profile', icon: UserCircle, label: 'Mon Profil', href: '/profile' },
        ],
      },
    ],
  },

  surveillant: {
    groups: [
      {
        id: 'surveillance',
        label: 'Surveillance',
        items: [
          { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: '/surveillant' },
          { id: 'pointage-eleves', icon: ClipboardCheck, label: 'Pointage Élèves', href: '/admin/pointage-eleves' },
          { id: 'visiteurs', icon: Users, label: 'Visiteurs', href: '/surveillant/visiteurs' },
        ],
      },
      {
        id: 'pointage',
        label: 'Pointage',
        items: [
          { id: 'pointage-personnel', icon: Briefcase, label: 'Pointage Personnel', href: '/admin/pointage-personnel' },
          { id: 'pointage', icon: QrCode, label: 'Scanner QR', href: '/pointage' },
        ],
      },
      {
        id: 'communication',
        label: 'Communication',
        items: [
          { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' },
          { id: 'notifications', icon: Bell, label: 'Notifications', href: '/notifications' },
        ],
      },
      {
        id: 'parametres',
        label: 'Paramètres',
        items: [
          { id: 'profile', icon: UserCircle, label: 'Mon Profil', href: '/profile' },
          { id: 'qr-badge', icon: QrCode, label: 'Mon Badge QR', href: '/qr-badge' },
        ],
      },
    ],
  },

  chauffeur: {
    groups: [
      {
        id: 'transport',
        label: 'Transport',
        items: [
          { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: '/driver-dashboard' },
          { id: 'transport', icon: Bus, label: 'Mes Trajets', href: '/transport' },
          { id: 'map', icon: MapPin, label: 'Carte', href: '/transport-map' },
        ],
      },
      {
        id: 'communication',
        label: 'Communication',
        items: [
          { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' },
          { id: 'notifications', icon: Bell, label: 'Notifications', href: '/notifications' },
        ],
      },
      {
        id: 'compte',
        label: 'Mon Compte',
        items: [
          { id: 'profile', icon: UserCircle, label: 'Mon Profil', href: '/profile' },
          { id: 'qr-badge', icon: QrCode, label: 'Mon Badge QR', href: '/qr-badge' },
        ],
      },
    ],
  },
};
