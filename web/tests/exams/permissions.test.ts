import { describe, it, expect } from 'vitest';
import { EXAM_PERMISSIONS } from '@educi/config';

describe('Exam RBAC Permissions', () => {
  it('should define EXAM_PERMISSIONS', () => {
    expect(EXAM_PERMISSIONS).toBeDefined();
    expect(typeof EXAM_PERMISSIONS).toBe('object');
  });

  it('should have CREATE_EXAM permission', () => {
    expect(EXAM_PERMISSIONS.CREATE_EXAM).toBeDefined();
    expect(Array.isArray(EXAM_PERMISSIONS.CREATE_EXAM)).toBe(true);
  });

  it('should have CREATE_EXAM for ADMIN', () => {
    expect(EXAM_PERMISSIONS.CREATE_EXAM).toContain('ADMIN');
  });

  it('should have CREATE_EXAM for SUPER_ADMIN', () => {
    expect(EXAM_PERMISSIONS.CREATE_EXAM).toContain('SUPER_ADMIN');
  });

  it('should have CREATE_EXAM for TEACHER', () => {
    expect(EXAM_PERMISSIONS.CREATE_EXAM).toContain('TEACHER');
  });

  it('should have CREATE_EXAM for ACADEMIC_DIRECTOR', () => {
    expect(EXAM_PERMISSIONS.CREATE_EXAM).toContain('ACADEMIC_DIRECTOR');
  });

  it('should have VIEW_EXAM permission', () => {
    expect(EXAM_PERMISSIONS.VIEW_EXAM).toBeDefined();
    expect(Array.isArray(EXAM_PERMISSIONS.VIEW_EXAM)).toBe(true);
  });

  it('should have VIEW_EXAM for STUDENT', () => {
    expect(EXAM_PERMISSIONS.VIEW_EXAM).toContain('STUDENT');
  });

  it('should have VIEW_EXAM for PARENT', () => {
    expect(EXAM_PERMISSIONS.VIEW_EXAM).toContain('PARENT');
  });

  it('should have DELETE_EXAM restricted to admin', () => {
    expect(EXAM_PERMISSIONS.DELETE_EXAM).toContain('ADMIN');
    expect(EXAM_PERMISSIONS.DELETE_EXAM).toContain('SUPER_ADMIN');
    expect(EXAM_PERMISSIONS.DELETE_EXAM).not.toContain('TEACHER');
  });

  it('should have ENTER_MARKS permission', () => {
    expect(EXAM_PERMISSIONS.ENTER_MARKS).toBeDefined();
    expect(Array.isArray(EXAM_PERMISSIONS.ENTER_MARKS)).toBe(true);
  });

  it('should have ENTER_MARKS for TEACHER', () => {
    expect(EXAM_PERMISSIONS.ENTER_MARKS).toContain('TEACHER');
  });

  it('should have MANAGE_DECISIONS permission', () => {
    expect(EXAM_PERMISSIONS.MANAGE_DECISIONS).toBeDefined();
    expect(Array.isArray(EXAM_PERMISSIONS.MANAGE_DECISIONS)).toBe(true);
  });

  it('should have MANAGE_DECISIONS for ACADEMIC_DIRECTOR', () => {
    expect(EXAM_PERMISSIONS.MANAGE_DECISIONS).toContain('ACADEMIC_DIRECTOR');
  });

  it('should have MANAGE_DECISIONS for DIRECTOR', () => {
    expect(EXAM_PERMISSIONS.MANAGE_DECISIONS).toContain('DIRECTOR');
  });

  it('should have MANAGE_SETTINGS restricted to admin', () => {
    expect(EXAM_PERMISSIONS.MANAGE_SETTINGS).toContain('ADMIN');
    expect(EXAM_PERMISSIONS.MANAGE_SETTINGS).toContain('SUPER_ADMIN');
    expect(EXAM_PERMISSIONS.MANAGE_SETTINGS).not.toContain('TEACHER');
  });

  it('should have IMPORT_MARKS permission', () => {
    expect(EXAM_PERMISSIONS.IMPORT_MARKS).toBeDefined();
    expect(Array.isArray(EXAM_PERMISSIONS.IMPORT_MARKS)).toBe(true);
  });

  it('should have IMPORT_MARKS for TEACHER', () => {
    expect(EXAM_PERMISSIONS.IMPORT_MARKS).toContain('TEACHER');
  });

  it('should have EXPORT_MARKS permission', () => {
    expect(EXAM_PERMISSIONS.EXPORT_MARKS).toBeDefined();
    expect(Array.isArray(EXAM_PERMISSIONS.EXPORT_MARKS)).toBe(true);
  });

  it('should have EXPORT_MARKS for SECRETARY', () => {
    expect(EXAM_PERMISSIONS.EXPORT_MARKS).toContain('SECRETARY');
  });

  it('should have VALIDATE_MARKS permission', () => {
    expect(EXAM_PERMISSIONS.VALIDATE_MARKS).toBeDefined();
    expect(Array.isArray(EXAM_PERMISSIONS.VALIDATE_MARKS)).toBe(true);
  });

  it('should have VALIDATE_MARKS for ACADEMIC_DIRECTOR', () => {
    expect(EXAM_PERMISSIONS.VALIDATE_MARKS).toContain('ACADEMIC_DIRECTOR');
  });

  it('should have PUBLISH_MARKS permission', () => {
    expect(EXAM_PERMISSIONS.PUBLISH_MARKS).toBeDefined();
    expect(Array.isArray(EXAM_PERMISSIONS.PUBLISH_MARKS)).toBe(true);
  });

  it('should have PUBLISH_MARKS for ADMIN only', () => {
    expect(EXAM_PERMISSIONS.PUBLISH_MARKS).toContain('ADMIN');
    expect(EXAM_PERMISSIONS.PUBLISH_MARKS).toContain('SUPER_ADMIN');
    expect(EXAM_PERMISSIONS.PUBLISH_MARKS).not.toContain('TEACHER');
  });

  it('should have VIEW_STATISTICS permission', () => {
    expect(EXAM_PERMISSIONS.VIEW_STATISTICS).toBeDefined();
    expect(Array.isArray(EXAM_PERMISSIONS.VIEW_STATISTICS)).toBe(true);
  });

  it('should have VIEW_STATISTICS for TEACHER', () => {
    expect(EXAM_PERMISSIONS.VIEW_STATISTICS).toContain('TEACHER');
  });

  it('should have VIEW_STATISTICS for DIRECTOR', () => {
    expect(EXAM_PERMISSIONS.VIEW_STATISTICS).toContain('DIRECTOR');
  });

  it('should have GENERATE_BULLETINS permission', () => {
    expect(EXAM_PERMISSIONS.GENERATE_BULLETINS).toBeDefined();
    expect(Array.isArray(EXAM_PERMISSIONS.GENERATE_BULLETINS)).toBe(true);
  });

  it('should have GENERATE_BULLETINS for ACADEMIC_DIRECTOR', () => {
    expect(EXAM_PERMISSIONS.GENERATE_BULLETINS).toContain('ACADEMIC_DIRECTOR');
  });

  it('should have all expected permission keys', () => {
    const expectedKeys = [
      'CREATE_EXAM', 'VIEW_EXAM', 'DELETE_EXAM', 'ENTER_MARKS',
      'MANAGE_DECISIONS', 'MANAGE_SETTINGS', 'IMPORT_MARKS', 'EXPORT_MARKS',
      'VALIDATE_MARKS', 'PUBLISH_MARKS', 'VIEW_STATISTICS', 'GENERATE_BULLETINS',
    ];
    for (const key of expectedKeys) {
      expect(EXAM_PERMISSIONS[key as keyof typeof EXAM_PERMISSIONS]).toBeDefined();
    }
  });

  it('should include ADMIN in most permissions', () => {
    const adminPermissions = Object.entries(EXAM_PERMISSIONS)
      .filter(([, roles]) => roles.includes('ADMIN'));
    expect(adminPermissions.length).toBeGreaterThan(10);
  });

  it('should include SUPER_ADMIN in most permissions', () => {
    const superAdminPermissions = Object.entries(EXAM_PERMISSIONS)
      .filter(([, roles]) => roles.includes('SUPER_ADMIN'));
    expect(superAdminPermissions.length).toBeGreaterThan(10);
  });

  it('should restrict certain permissions to admin only', () => {
    const restrictedPerms = ['DELETE_EXAM', 'MANAGE_SETTINGS', 'PUBLISH_MARKS'];
    for (const perm of restrictedPerms) {
      const roles = EXAM_PERMISSIONS[perm as keyof typeof EXAM_PERMISSIONS];
      expect(roles).not.toContain('TEACHER');
      expect(roles).not.toContain('STUDENT');
      expect(roles).not.toContain('PARENT');
    }
  });

  it('should allow teachers to enter marks', () => {
    expect(EXAM_PERMISSIONS.ENTER_MARKS).toContain('TEACHER');
  });

  it('should allow teachers to import marks', () => {
    expect(EXAM_PERMISSIONS.IMPORT_MARKS).toContain('TEACHER');
  });

  it('should allow teachers to export marks', () => {
    expect(EXAM_PERMISSIONS.EXPORT_MARKS).toContain('TEACHER');
  });

  it('should allow students to view exams', () => {
    expect(EXAM_PERMISSIONS.VIEW_EXAM).toContain('STUDENT');
  });

  it('should allow parents to view exams', () => {
    expect(EXAM_PERMISSIONS.VIEW_EXAM).toContain('PARENT');
  });

  it('should validate all permissions are arrays', () => {
    for (const [, roles] of Object.entries(EXAM_PERMISSIONS)) {
      expect(Array.isArray(roles)).toBe(true);
    }
  });
});
