import { type LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
  disabled?: boolean;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export type RoleKey =
  | 'admin'
  | 'superadmin'
  | 'teacher'
  | 'student'
  | 'parent'
  | 'comptable'
  | 'secretaire'
  | 'censeur'
  | 'surveillant'
  | 'chauffeur';

export interface NavigationConfig {
  groups: NavGroup[];
}
