import { describe, it, expect } from 'vitest';
import { ACADEMIC_PERMISSIONS } from '@educi/config';

describe('Academic Permissions', () => {
  describe('CREATE permissions', () => {
    it('should allow ADMIN to create classes', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_CLASS).toContain('ADMIN');
    });

    it('should allow SUPER_ADMIN to create classes', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_CLASS).toContain('SUPER_ADMIN');
    });

    it('should allow ACADEMIC_MANAGER to create classes', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_CLASS).toContain('ACADEMIC_MANAGER');
    });

    it('should not allow TEACHER to create classes', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_CLASS).not.toContain('TEACHER');
    });

    it('should allow ADMIN to create subjects', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_SUBJECT).toContain('ADMIN');
    });

    it('should allow ADMIN to create departments', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_DEPARTMENT).toContain('ADMIN');
    });

    it('should allow ADMIN to create levels', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_LEVEL).toContain('ADMIN');
    });

    it('should allow ADMIN to create sections', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_SECTION).toContain('ADMIN');
    });

    it('should allow ADMIN to create streams', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_STREAM).toContain('ADMIN');
    });

    it('should allow ADMIN to create rooms', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_ROOM).toContain('ADMIN');
    });
  });

  describe('READ permissions', () => {
    it('should allow more roles to read than create', () => {
      expect(ACADEMIC_PERMISSIONS.READ_CLASS.length).toBeGreaterThanOrEqual(
        ACADEMIC_PERMISSIONS.CREATE_CLASS.length
      );
    });

    it('should allow TEACHER to read classes', () => {
      expect(ACADEMIC_PERMISSIONS.READ_CLASS).toContain('TEACHER');
    });

    it('should allow SECRETARY to read classes', () => {
      expect(ACADEMIC_PERMISSIONS.READ_CLASS).toContain('SECRETARY');
    });
  });

  describe('UPDATE permissions', () => {
    it('should allow ADMIN to update classes', () => {
      expect(ACADEMIC_PERMISSIONS.UPDATE_CLASS).toContain('ADMIN');
    });

    it('should not allow TEACHER to update classes', () => {
      expect(ACADEMIC_PERMISSIONS.UPDATE_CLASS).not.toContain('TEACHER');
    });
  });

  describe('DELETE permissions', () => {
    it('should only allow SUPER_ADMIN to delete classes', () => {
      expect(ACADEMIC_PERMISSIONS.DELETE_CLASS).toEqual(['SUPER_ADMIN']);
    });

    it('should not allow ADMIN to delete classes', () => {
      expect(ACADEMIC_PERMISSIONS.DELETE_CLASS).not.toContain('ADMIN');
    });
  });

  describe('Schedule permissions', () => {
    it('should allow ADMIN to manage schedule', () => {
      expect(ACADEMIC_PERMISSIONS.MANAGE_SCHEDULE).toContain('ADMIN');
    });

    it('should allow ACADEMIC_MANAGER to generate schedule', () => {
      expect(ACADEMIC_PERMISSIONS.GENERATE_SCHEDULE).toContain('ACADEMIC_MANAGER');
    });
  });

  describe('Calendar permissions', () => {
    it('should allow SECRETARY to manage calendar', () => {
      expect(ACADEMIC_PERMISSIONS.MANAGE_CALENDAR).toContain('SECRETARY');
    });
  });

  describe('Statistics permissions', () => {
    it('should allow DIRECTEUR to view statistics', () => {
      expect(ACADEMIC_PERMISSIONS.VIEW_STATISTICS).toContain('DIRECTEUR');
    });
  });

  describe('Import/Export permissions', () => {
    it('should allow ADMIN to import data', () => {
      expect(ACADEMIC_PERMISSIONS.IMPORT_DATA).toContain('ADMIN');
    });

    it('should allow SECRETARY to export data', () => {
      expect(ACADEMIC_PERMISSIONS.EXPORT_DATA).toContain('SECRETARY');
    });

    it('should not allow TEACHER to import data', () => {
      expect(ACADEMIC_PERMISSIONS.IMPORT_DATA).not.toContain('TEACHER');
    });
  });
});
