import { describe, it, expect } from 'vitest';
import { sbAuth } from '@/lib/api/domains/auth.service';
import { sbStudents } from '@/lib/api/domains/students.service';
import { sbTeachers } from '@/lib/api/domains/teachers.service';
import { sbClasses } from '@/lib/api/domains/classes.service';
import { sbGrades } from '@/lib/api/domains/grades.service';
import { sbAttendance } from '@/lib/api/domains/attendance.service';
import { sbPayments } from '@/lib/api/domains/payments.service';
import { sbNotifications } from '@/lib/api/domains/notifications.service';
import { sbMessaging } from '@/lib/api/domains/messaging.service';
import { sbDashboard } from '@/lib/api/domains/dashboard.service';
import { sbAi } from '@/lib/api/domains/ai.service';

describe('Domain services', () => {
  it('sbAuth has login method', () => { expect(typeof sbAuth.login).toBe('function'); });
  it('sbAuth has registerSchool method', () => { expect(typeof sbAuth.registerSchool).toBe('function'); });
  it('sbStudents has list method', () => { expect(typeof sbStudents.list).toBe('function'); });
  it('sbStudents has create method', () => { expect(typeof sbStudents.create).toBe('function'); });
  it('sbTeachers has list method', () => { expect(typeof sbTeachers.list).toBe('function'); });
  it('sbClasses has list method', () => { expect(typeof sbClasses.list).toBe('function'); });
  it('sbGrades has list method', () => { expect(typeof sbGrades.list).toBe('function'); });
  it('sbGrades has create method', () => { expect(typeof sbGrades.create).toBe('function'); });
  it('sbAttendance has list method', () => { expect(typeof sbAttendance.list).toBe('function'); });
  it('sbPayments has list method', () => { expect(typeof sbPayments.list).toBe('function'); });
  it('sbNotifications has list method', () => { expect(typeof sbNotifications.list).toBe('function'); });
  it('sbMessaging has getInbox method', () => { expect(typeof sbMessaging.getInbox).toBe('function'); });
  it('sbDashboard has getStats method', () => { expect(typeof sbDashboard.getStats).toBe('function'); });
  it('sbAi has chat method', () => { expect(typeof sbAi.chat).toBe('function'); });
});
