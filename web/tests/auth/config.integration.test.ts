import { describe, it, expect } from 'vitest';
import { ROLE_ROUTES, PUBLIC_ROUTES, ROLE_HIERARCHY, AUTH_PERMISSIONS } from '@educi/config';

describe('Auth Config Integration', () => {
  describe('ROLE_ROUTES', () => {
    it('has routes for all 13 roles', () => {
      expect(Object.keys(ROLE_ROUTES)).toHaveLength(13);
    });

    it('SUPER_ADMIN has most routes', () => {
      expect(ROLE_ROUTES.SUPER_ADMIN.length).toBeGreaterThan(ROLE_ROUTES.STUDENT.length);
    });

    it('STUDENT has limited routes', () => {
      expect(ROLE_ROUTES.STUDENT.length).toBeLessThan(25);
    });

    it('all roles can access /profile', () => {
      for (const [role, routes] of Object.entries(ROLE_ROUTES)) {
        expect(routes).toContain('/profile');
      }
    });
  });

  describe('PUBLIC_ROUTES', () => {
    it('includes login', () => {
      expect(PUBLIC_ROUTES).toContain('/login');
    });
    it('includes register', () => {
      expect(PUBLIC_ROUTES).toContain('/register');
    });
    it('includes forgot-password', () => {
      expect(PUBLIC_ROUTES).toContain('/forgot-password');
    });
  });

  describe('ROLE_HIERARCHY', () => {
    it('has hierarchy for all roles', () => {
      expect(Object.keys(ROLE_HIERARCHY)).toHaveLength(13);
    });

    it('SUPER_ADMIN is highest', () => {
      expect(ROLE_HIERARCHY.SUPER_ADMIN).toBe(100);
    });

    it('STUDENT is lowest', () => {
      expect(ROLE_HIERARCHY.STUDENT).toBe(10);
    });
  });

  describe('AUTH_PERMISSIONS', () => {
    it('MANAGE_SCHOOLS only for SUPER_ADMIN', () => {
      expect(AUTH_PERMISSIONS.MANAGE_SCHOOLS).toEqual(['SUPER_ADMIN']);
    });

    it('MANAGE_USERS for SUPER_ADMIN and ADMIN', () => {
      expect(AUTH_PERMISSIONS.MANAGE_USERS).toContain('SUPER_ADMIN');
      expect(AUTH_PERMISSIONS.MANAGE_USERS).toContain('ADMIN');
    });

    it('VIEW_GRADES includes STUDENT', () => {
      expect(AUTH_PERMISSIONS.VIEW_GRADES).toContain('STUDENT');
    });

    it('EDIT_GRADES does not include STUDENT', () => {
      expect(AUTH_PERMISSIONS.EDIT_GRADES).not.toContain('STUDENT');
    });
  });
});
