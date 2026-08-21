import { describe, it, expect } from 'vitest';
import { ATTENDANCE_PERMISSIONS } from '@educi/config';

describe('Attendance Permissions', () => {
  it('should define ATTENDANCE_PERMISSIONS', () => {
    expect(ATTENDANCE_PERMISSIONS).toBeDefined();
    expect(typeof ATTENDANCE_PERMISSIONS).toBe('object');
  });

  it('should have RECORD_ATTENDANCE permission', () => {
    expect(ATTENDANCE_PERMISSIONS.RECORD_ATTENDANCE).toBeDefined();
    expect(Array.isArray(ATTENDANCE_PERMISSIONS.RECORD_ATTENDANCE)).toBe(true);
    expect(ATTENDANCE_PERMISSIONS.RECORD_ATTENDANCE).toContain('ADMIN');
    expect(ATTENDANCE_PERMISSIONS.RECORD_ATTENDANCE).toContain('TEACHER');
  });

  it('should have VIEW_ATTENDANCE permission', () => {
    expect(ATTENDANCE_PERMISSIONS.VIEW_ATTENDANCE).toBeDefined();
    expect(Array.isArray(ATTENDANCE_PERMISSIONS.VIEW_ATTENDANCE)).toBe(true);
    expect(ATTENDANCE_PERMISSIONS.VIEW_ATTENDANCE).toContain('ADMIN');
    expect(ATTENDANCE_PERMISSIONS.VIEW_ATTENDANCE).toContain('TEACHER');
    expect(ATTENDANCE_PERMISSIONS.VIEW_ATTENDANCE).toContain('STUDENT');
  });

  it('should have EDIT_ATTENDANCE permission', () => {
    expect(ATTENDANCE_PERMISSIONS.EDIT_ATTENDANCE).toBeDefined();
    expect(Array.isArray(ATTENDANCE_PERMISSIONS.EDIT_ATTENDANCE)).toBe(true);
    expect(ATTENDANCE_PERMISSIONS.EDIT_ATTENDANCE).toContain('ADMIN');
    expect(ATTENDANCE_PERMISSIONS.EDIT_ATTENDANCE).toContain('TEACHER');
  });

  it('should have DELETE_ATTENDANCE permission', () => {
    expect(ATTENDANCE_PERMISSIONS.DELETE_ATTENDANCE).toBeDefined();
    expect(Array.isArray(ATTENDANCE_PERMISSIONS.DELETE_ATTENDANCE)).toBe(true);
    expect(ATTENDANCE_PERMISSIONS.DELETE_ATTENDANCE).toContain('ADMIN');
    expect(ATTENDANCE_PERMISSIONS.DELETE_ATTENDANCE).toContain('SUPER_ADMIN');
  });

  it('should have MANAGE_SESSIONS permission', () => {
    expect(ATTENDANCE_PERMISSIONS.MANAGE_SESSIONS).toBeDefined();
    expect(Array.isArray(ATTENDANCE_PERMISSIONS.MANAGE_SESSIONS)).toBe(true);
  });

  it('should have VIEW_REPORTS permission', () => {
    expect(ATTENDANCE_PERMISSIONS.VIEW_REPORTS).toBeDefined();
    expect(Array.isArray(ATTENDANCE_PERMISSIONS.VIEW_REPORTS)).toBe(true);
  });

  it('should have MANAGE_ALERTS permission', () => {
    expect(ATTENDANCE_PERMISSIONS.MANAGE_ALERTS).toBeDefined();
    expect(Array.isArray(ATTENDANCE_PERMISSIONS.MANAGE_ALERTS)).toBe(true);
  });

  it('should have MANAGE_SETTINGS permission', () => {
    expect(ATTENDANCE_PERMISSIONS.MANAGE_SETTINGS).toBeDefined();
    expect(Array.isArray(ATTENDANCE_PERMISSIONS.MANAGE_SETTINGS)).toBe(true);
  });

  it('should include ADMIN in most permissions', () => {
    const adminPermissions = Object.entries(ATTENDANCE_PERMISSIONS)
      .filter(([, roles]) => roles.includes('ADMIN'));
    expect(adminPermissions.length).toBeGreaterThan(5);
  });

  it('should have all expected permission keys', () => {
    const expectedKeys = [
      'RECORD_ATTENDANCE', 'VIEW_ATTENDANCE', 'EDIT_ATTENDANCE', 'DELETE_ATTENDANCE',
      'MANAGE_SESSIONS', 'VIEW_REPORTS', 'MANAGE_ALERTS', 'MANAGE_SETTINGS',
    ];
    for (const key of expectedKeys) {
      expect(ATTENDANCE_PERMISSIONS[key as keyof typeof ATTENDANCE_PERMISSIONS]).toBeDefined();
    }
  });
});
