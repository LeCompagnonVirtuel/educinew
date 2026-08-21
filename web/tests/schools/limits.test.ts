import { describe, it, expect } from 'vitest';
import { SchoolPlanLimits } from '@educi/types';

describe('School Plan Limits', () => {
  it('should have limits for all plans', () => {
    expect(SchoolPlanLimits.FREE).toBeDefined();
    expect(SchoolPlanLimits.STARTER).toBeDefined();
    expect(SchoolPlanLimits.PRO).toBeDefined();
    expect(SchoolPlanLimits.ENTERPRISE).toBeDefined();
  });

  it('FREE should have 100 students max', () => {
    expect(SchoolPlanLimits.FREE.maxStudents).toBe(100);
  });

  it('STARTER should have more limits than FREE', () => {
    expect(SchoolPlanLimits.STARTER.maxStudents).toBeGreaterThan(SchoolPlanLimits.FREE.maxStudents);
    expect(SchoolPlanLimits.STARTER.maxTeachers).toBeGreaterThan(SchoolPlanLimits.FREE.maxTeachers);
    expect(SchoolPlanLimits.STARTER.maxStorageMb).toBeGreaterThan(SchoolPlanLimits.FREE.maxStorageMb);
  });

  it('PRO should have more limits than STARTER', () => {
    expect(SchoolPlanLimits.PRO.maxStudents).toBeGreaterThan(SchoolPlanLimits.STARTER.maxStudents);
    expect(SchoolPlanLimits.PRO.maxTeachers).toBeGreaterThan(SchoolPlanLimits.STARTER.maxTeachers);
    expect(SchoolPlanLimits.PRO.maxStorageMb).toBeGreaterThan(SchoolPlanLimits.STARTER.maxStorageMb);
  });

  it('ENTERPRISE should have the highest limits', () => {
    expect(SchoolPlanLimits.ENTERPRISE.maxStudents).toBeGreaterThan(SchoolPlanLimits.PRO.maxStudents);
    expect(SchoolPlanLimits.ENTERPRISE.maxTeachers).toBeGreaterThan(SchoolPlanLimits.PRO.maxTeachers);
    expect(SchoolPlanLimits.ENTERPRISE.maxStorageMb).toBeGreaterThan(SchoolPlanLimits.PRO.maxStorageMb);
  });

  it('should have enabled modules for each plan', () => {
    expect(SchoolPlanLimits.FREE.enabledModules).toContain('students');
    expect(SchoolPlanLimits.FREE.enabledModules).toContain('teachers');
    expect(SchoolPlanLimits.STARTER.enabledModules).toContain('payments');
    expect(SchoolPlanLimits.PRO.enabledModules).toContain('ai');
    expect(SchoolPlanLimits.ENTERPRISE.enabledModules).toContain('enterprise');
  });

  it('ENTERPRISE should have all modules', () => {
    expect(SchoolPlanLimits.ENTERPRISE.enabledModules.length).toBeGreaterThan(
      SchoolPlanLimits.PRO.enabledModules.length
    );
  });
});
