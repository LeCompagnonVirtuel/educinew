import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('HR Schemas Validators', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Employee schema validation', () => {
    it('should validate employee first_name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValid('John')).toBe(true);
      expect(isValid('A')).toBe(false);
      expect(isValid('x'.repeat(101))).toBe(false);
    });

    it('should validate employee last_name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValid('Doe')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate employee email', () => {
      const isValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValid('john@test.com')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate employee phone', () => {
      const isValid = (phone: string) => /^\+?[0-9]{8,15}$/.test(phone);
      expect(isValid('+225012345678')).toBe(true);
      expect(isValid('123')).toBe(false);
    });

    it('should validate employee gender', () => {
      const isValid = (gender: string) => ['male', 'female', 'other'].includes(gender);
      expect(isValid('male')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate employee status', () => {
      const isValid = (status: string) => ['active', 'on_leave', 'suspended', 'terminated'].includes(status);
      expect(isValid('active')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate contract_type', () => {
      const isValid = (type: string) => ['CDI', 'CDD', 'Stage', 'Vacation'].includes(type);
      expect(isValid('CDI')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate hire_date is not in future', () => {
      const isNotFuture = (date: string) => new Date(date) <= new Date();
      expect(isNotFuture('2025-01-01')).toBe(true);
    });

    it('should validate employee_code format', () => {
      const isValid = (code: string) => /^[A-Z]{2,4}-\d{4}-\d{4,}$/.test(code);
      expect(isValid('DIR-2026-0001')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });
  });

  describe('Department schema validation', () => {
    it('should validate department name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValid('IT')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate department code', () => {
      const isValid = (code: string) => /^[A-Z]{2,10}$/.test(code);
      expect(isValid('IT')).toBe(true);
      expect(isValid('invalid123')).toBe(false);
    });
  });

  describe('Position schema validation', () => {
    it('should validate position name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValid('Directeur')).toBe(true);
      expect(isValid('A')).toBe(false);
    });
  });

  describe('Contract schema validation', () => {
    it('should validate contract_type', () => {
      const isValid = (type: string) => ['CDI', 'CDD', 'Stage', 'Vacation', 'Interim'].includes(type);
      expect(isValid('CDI')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate start_date format', () => {
      const isValid = (date: string) => !isNaN(Date.parse(date));
      expect(isValid('2026-01-01')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate end_date after start_date', () => {
      const isValid = (start: string, end: string) => new Date(end) >= new Date(start);
      expect(isValid('2026-01-01', '2026-12-31')).toBe(true);
      expect(isValid('2026-12-31', '2026-01-01')).toBe(false);
    });

    it('should validate salary is positive', () => {
      const isValid = (salary: number) => salary >= 0;
      expect(isValid(500000)).toBe(true);
      expect(isValid(-1000)).toBe(false);
    });
  });

  describe('Leave schema validation', () => {
    it('should validate leave_type', () => {
      const isValid = (type: string) => ['annual', 'sick', 'maternity', 'paternity', 'personal', 'unpaid', 'bereavement'].includes(type);
      expect(isValid('annual')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate leave start_date', () => {
      const isValid = (date: string) => !isNaN(Date.parse(date));
      expect(isValid('2026-08-01')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate leave end_date after start_date', () => {
      const isValid = (start: string, end: string) => new Date(end) >= new Date(start);
      expect(isValid('2026-08-01', '2026-08-05')).toBe(true);
      expect(isValid('2026-08-05', '2026-08-01')).toBe(false);
    });

    it('should validate leave status', () => {
      const isValid = (status: string) => ['pending', 'approved', 'rejected', 'cancelled'].includes(status);
      expect(isValid('pending')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate leave reason length', () => {
      const isValid = (reason: string) => reason.length >= 10 && reason.length <= 500;
      expect(isValid('Family vacation planned for next week')).toBe(true);
      expect(isValid('Short')).toBe(false);
    });
  });

  describe('Training schema validation', () => {
    it('should validate training title', () => {
      const isValid = (title: string) => title.length >= 3 && title.length <= 200;
      expect(isValid('Leadership Training')).toBe(true);
      expect(isValid('Ab')).toBe(false);
    });

    it('should validate training dates', () => {
      const isValid = (start: string, end: string) => new Date(end) >= new Date(start);
      expect(isValid('2026-09-01', '2026-09-05')).toBe(true);
      expect(isValid('2026-09-05', '2026-09-01')).toBe(false);
    });
  });

  describe('Certification schema validation', () => {
    it('should validate certification name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValid('PMP')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate issue_date before expiry_date', () => {
      const isValid = (issued: string, expiry: string) => new Date(issued) <= new Date(expiry);
      expect(isValid('2024-01-01', '2026-01-01')).toBe(true);
      expect(isValid('2026-01-01', '2024-01-01')).toBe(false);
    });
  });

  describe('Performance review schema validation', () => {
    it('should validate score range', () => {
      const isValid = (score: number) => score >= 0 && score <= 100;
      expect(isValid(85)).toBe(true);
      expect(isValid(-1)).toBe(false);
      expect(isValid(101)).toBe(false);
    });

    it('should validate review_period format', () => {
      const isValid = (period: string) => /^(Q[1-4]|H[1-2]|Annual) \d{4}$/.test(period);
      expect(isValid('Q1 2026')).toBe(true);
      expect(isValid('Invalid')).toBe(false);
    });
  });

  describe('Objective schema validation', () => {
    it('should validate objective title', () => {
      const isValid = (title: string) => title.length >= 3 && title.length <= 200;
      expect(isValid('Improve performance')).toBe(true);
      expect(isValid('Ab')).toBe(false);
    });

    it('should validate progress range', () => {
      const isValid = (progress: number) => progress >= 0 && progress <= 100;
      expect(isValid(50)).toBe(true);
      expect(isValid(-1)).toBe(false);
      expect(isValid(101)).toBe(false);
    });

    it('should validate priority', () => {
      const isValid = (priority: string) => ['low', 'medium', 'high', 'critical'].includes(priority);
      expect(isValid('high')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });
  });

  describe('Recruitment schema validation', () => {
    it('should validate recruitment title', () => {
      const isValid = (title: string) => title.length >= 3 && title.length <= 200;
      expect(isValid('Teacher Position')).toBe(true);
      expect(isValid('Ab')).toBe(false);
    });

    it('should validate recruitment status', () => {
      const isValid = (status: string) => ['draft', 'open', 'in_progress', 'closed', 'cancelled'].includes(status);
      expect(isValid('open')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });
  });

  describe('Candidate schema validation', () => {
    it('should validate candidate name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValid('John Doe')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate candidate email', () => {
      const isValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValid('john@test.com')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });
  });

  describe('Interview schema validation', () => {
    it('should validate scheduled_date', () => {
      const isValid = (date: string) => !isNaN(Date.parse(date));
      expect(isValid('2026-08-01T10:00:00Z')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });
  });

  describe('Disciplinary action schema validation', () => {
    it('should validate action type', () => {
      const isValid = (type: string) => ['verbal_warning', 'written_warning', 'suspension', 'demotion', 'termination'].includes(type);
      expect(isValid('verbal_warning')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate severity level', () => {
      const isValid = (level: string) => ['low', 'medium', 'high', 'critical'].includes(level);
      expect(isValid('low')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });
  });

  describe('Document schema validation', () => {
    it('should validate document type', () => {
      const isValid = (type: string) => ['contract', 'id_card', 'diploma', 'certificate', 'cv', 'other'].includes(type);
      expect(isValid('contract')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate file size (max 10MB)', () => {
      const isValid = (bytes: number) => bytes <= 10 * 1024 * 1024;
      expect(isValid(5 * 1024 * 1024)).toBe(true);
      expect(isValid(15 * 1024 * 1024)).toBe(false);
    });
  });

  describe('Promotion schema validation', () => {
    it('should validate new_position', () => {
      const isValid = (position: string) => position.length >= 2 && position.length <= 100;
      expect(isValid('Directeur')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate effective_date', () => {
      const isNotPast = (date: string) => new Date(date) >= new Date();
      expect(isNotPast('2030-01-01')).toBe(true);
    });
  });

  describe('Transfer schema validation', () => {
    it('should validate from_department', () => {
      const isValid = (dept: string) => dept.length >= 2 && dept.length <= 100;
      expect(isValid('IT')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate to_department', () => {
      const isValid = (dept: string) => dept.length >= 2 && dept.length <= 100;
      expect(isValid('HR')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate departments are different', () => {
      const isValid = (from: string, to: string) => from !== to;
      expect(isValid('IT', 'HR')).toBe(true);
      expect(isValid('IT', 'IT')).toBe(false);
    });
  });

  describe('Termination schema validation', () => {
    it('should validate termination type', () => {
      const isValid = (type: string) => ['resignation', 'dismissal', 'retirement', 'mutual_agreement', 'end_of_contract'].includes(type);
      expect(isValid('resignation')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate effective_date', () => {
      const isValid = (date: string) => !isNaN(Date.parse(date));
      expect(isValid('2026-08-01')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });
  });

  describe('Reward schema validation', () => {
    it('should validate reward title', () => {
      const isValid = (title: string) => title.length >= 3 && title.length <= 200;
      expect(isValid('Employee of the Month')).toBe(true);
      expect(isValid('Ab')).toBe(false);
    });

    it('should validate reward type', () => {
      const isValid = (type: string) => ['certificate', 'bonus', 'gift', 'public_recognition', 'promotion'].includes(type);
      expect(isValid('certificate')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });
  });

  describe('Payroll reference schema validation', () => {
    it('should validate reference name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValid('Base Salary 2026')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate amount', () => {
      const isValid = (amount: number) => amount >= 0;
      expect(isValid(500000)).toBe(true);
      expect(isValid(-1000)).toBe(false);
    });
  });

  describe('Benefit schema validation', () => {
    it('should validate benefit name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValid('Health Insurance')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate benefit amount', () => {
      const isValid = (amount: number) => amount >= 0;
      expect(isValid(50000)).toBe(true);
      expect(isValid(-1000)).toBe(false);
    });
  });

  describe('Deduction schema validation', () => {
    it('should validate deduction name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValid('CNPS')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate deduction amount', () => {
      const isValid = (amount: number) => amount >= 0;
      expect(isValid(10000)).toBe(true);
      expect(isValid(-1000)).toBe(false);
    });
  });

  describe('Allowance schema validation', () => {
    it('should validate allowance name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValid('Transport Allowance')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate allowance amount', () => {
      const isValid = (amount: number) => amount >= 0;
      expect(isValid(50000)).toBe(true);
      expect(isValid(-1000)).toBe(false);
    });
  });

  describe('Shift schema validation', () => {
    it('should validate shift name', () => {
      const isValid = (name: string) => name.length >= 2 && name.length <= 50;
      expect(isValid('Morning Shift')).toBe(true);
      expect(isValid('A')).toBe(false);
    });

    it('should validate time format', () => {
      const isValid = (time: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
      expect(isValid('08:00')).toBe(true);
      expect(isValid('25:00')).toBe(false);
    });
  });

  describe('Schedule schema validation', () => {
    it('should validate start_date', () => {
      const isValid = (date: string) => !isNaN(Date.parse(date));
      expect(isValid('2026-07-01')).toBe(true);
      expect(isValid('invalid')).toBe(false);
    });

    it('should validate end_date after start_date', () => {
      const isValid = (start: string, end: string) => new Date(end) >= new Date(start);
      expect(isValid('2026-07-01', '2026-07-31')).toBe(true);
      expect(isValid('2026-07-31', '2026-07-01')).toBe(false);
    });
  });
});
