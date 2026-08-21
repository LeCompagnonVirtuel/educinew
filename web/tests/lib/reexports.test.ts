import { describe, it, expect } from 'vitest';
import { sbAuth, sbStudents, sbTeachers, sbClasses, sbGrades, sbAttendance, sbPayments, sbNotifications, sbMessaging, sbDashboard, sbTransport, sbInvitations, sbMarketplace, sbImport, sbAudit, sbParent, sbTeacherCheckin, sbAi } from '@/lib/api/supabase-client';

describe('supabase-client re-exports', () => {
  it('exports sbAuth', () => { expect(sbAuth).toBeDefined(); });
  it('exports sbStudents', () => { expect(sbStudents).toBeDefined(); });
  it('exports sbTeachers', () => { expect(sbTeachers).toBeDefined(); });
  it('exports sbClasses', () => { expect(sbClasses).toBeDefined(); });
  it('exports sbGrades', () => { expect(sbGrades).toBeDefined(); });
  it('exports sbAttendance', () => { expect(sbAttendance).toBeDefined(); });
  it('exports sbPayments', () => { expect(sbPayments).toBeDefined(); });
  it('exports sbNotifications', () => { expect(sbNotifications).toBeDefined(); });
  it('exports sbMessaging', () => { expect(sbMessaging).toBeDefined(); });
  it('exports sbDashboard', () => { expect(sbDashboard).toBeDefined(); });
  it('exports sbTransport', () => { expect(sbTransport).toBeDefined(); });
  it('exports sbInvitations', () => { expect(sbInvitations).toBeDefined(); });
  it('exports sbMarketplace', () => { expect(sbMarketplace).toBeDefined(); });
  it('exports sbImport', () => { expect(sbImport).toBeDefined(); });
  it('exports sbAudit', () => { expect(sbAudit).toBeDefined(); });
  it('exports sbParent', () => { expect(sbParent).toBeDefined(); });
  it('exports sbTeacherCheckin', () => { expect(sbTeacherCheckin).toBeDefined(); });
  it('exports sbAi', () => { expect(sbAi).toBeDefined(); });
});
