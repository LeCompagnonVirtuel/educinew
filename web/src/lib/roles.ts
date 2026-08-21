/**
 * Role configuration.
 * Source de vérité : @educi/config (packages/config/src/index.ts)
 * Ce fichier sera remplacé par un re-export une fois les workspace links actifs.
 */
export const ROLE_DASHBOARDS: Record<string, string> = {
  SUPER_ADMIN: '/superadmin',
  ADMIN: '/dashboard',
  DIRECTEUR: '/directeur',
  COMPTABLE: '/comptable',
  SECRETAIRE: '/secretaire',
  CENSEUR: '/censeur',
  SURVEILLANT: '/surveillant',
  TEACHER: '/teacher-dashboard',
  PARENT: '/parent',
  STUDENT: '/student',
  CHAUFFEUR: '/driver-dashboard',
  BIBLIOTHECAIRE: '/library',
  INFIRMIER: '/infirmerie',
};

export const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Super Administrateur',
  ADMIN: 'Administrateur',
  DIRECTEUR: 'Directeur',
  TEACHER: 'Enseignant',
  PARENT: 'Parent',
  STUDENT: 'Élève',
  COMPTABLE: 'Comptable',
  SECRETAIRE: 'Secrétaire',
  CENSEUR: 'Censeur',
  SURVEILLANT: 'Surveillant',
  CHAUFFEUR: 'Conducteur',
  BIBLIOTHECAIRE: 'Bibliothécaire',
  INFIRMIER: 'Infirmier',
};

export const ROLE_REDIRECTS: Record<string, string> = {
  SUPER_ADMIN: '/superadmin',
  ADMIN: '/dashboard',
  DIRECTEUR: '/directeur',
  COMPTABLE: '/comptable',
  SECRETAIRE: '/secretaire',
  CENSEUR: '/censeur',
  SURVEILLANT: '/surveillant',
  TEACHER: '/teacher-dashboard',
  PARENT: '/parent',
  STUDENT: '/student',
  CHAUFFEUR: '/driver-dashboard',
  BIBLIOTHECAIRE: '/library',
  INFIRMIER: '/infirmerie',
};

export const ROLE_HIERARCHY: Record<string, number> = {
  SUPER_ADMIN: 100,
  ADMIN: 90,
  DIRECTEUR: 80,
  COMPTABLE: 60,
  SECRETAIRE: 60,
  CENSEUR: 60,
  SURVEILLANT: 50,
  TEACHER: 40,
  BIBLIOTHECAIRE: 40,
  INFIRMIER: 40,
  CHAUFFEUR: 30,
  PARENT: 20,
  STUDENT: 10,
};
