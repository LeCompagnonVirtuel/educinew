import { describe, it, expect } from 'vitest';
import { PermissionService } from '../../src/features/auth/services/permission.service';

describe('PermissionService', () => {
  const service = new PermissionService();

  describe('canAccessRoute', () => {
    it('allows STUDENT to access /student routes', () => {
      expect(service.canAccessRoute('STUDENT', '/student')).toBe(true);
      expect(service.canAccessRoute('STUDENT', '/student/grades')).toBe(true);
    });
    it('denies STUDENT access to /dashboard', () => {
      expect(service.canAccessRoute('STUDENT', '/dashboard')).toBe(false);
    });
    it('allows ADMIN to access /dashboard', () => {
      expect(service.canAccessRoute('ADMIN', '/dashboard')).toBe(true);
    });
    it('allows SUPER_ADMIN to access all routes', () => {
      expect(service.canAccessRoute('SUPER_ADMIN', '/superadmin')).toBe(true);
      expect(service.canAccessRoute('SUPER_ADMIN', '/dashboard')).toBe(true);
      expect(service.canAccessRoute('SUPER_ADMIN', '/users')).toBe(true);
    });
  });

  describe('canPerformAction', () => {
    it('allows SUPER_ADMIN to manage schools', () => {
      expect(service.canPerformAction('SUPER_ADMIN', 'MANAGE_SCHOOLS')).toBe(true);
    });
    it('denies TEACHER from managing schools', () => {
      expect(service.canPerformAction('TEACHER', 'MANAGE_SCHOOLS')).toBe(false);
    });
    it('allows ADMIN to manage users', () => {
      expect(service.canPerformAction('ADMIN', 'MANAGE_USERS')).toBe(true);
    });
    it('denies STUDENT from managing users', () => {
      expect(service.canPerformAction('STUDENT', 'MANAGE_USERS')).toBe(false);
    });
  });

  describe('hasMinimumHierarchy', () => {
    it('SUPER_ADMIN has higher hierarchy than ADMIN', () => {
      expect(service.hasMinimumHierarchy('SUPER_ADMIN', 'ADMIN')).toBe(true);
    });
    it('ADMIN does not have higher hierarchy than SUPER_ADMIN', () => {
      expect(service.hasMinimumHierarchy('ADMIN', 'SUPER_ADMIN')).toBe(false);
    });
    it('TEACHER has higher hierarchy than STUDENT', () => {
      expect(service.hasMinimumHierarchy('TEACHER', 'STUDENT')).toBe(true);
    });
  });
});
