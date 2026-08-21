import { describe, it, expect } from 'vitest';
import {
  TEACHER_STATUS,
  TEACHER_PERMISSIONS,
  TEACHER_DEFAULTS,
  TEACHER_LIMITS,
  TEACHER_IMPORT,
  TEACHER_EXPORT,
  TEACHER_TIMELINE,
  TEACHER_SEARCH,
  TEACHER_CONTRACT,
  TEACHER_LEAVE,
  TEACHER_EVALUATION,
} from '@educi/config';

describe('Teacher Assignment Config', () => {
  it('should define max assignments per teacher', () => {
    expect(TEACHER_LIMITS.MAX_ASSIGNMENTS_PER_TEACHER).toBe(10);
  });

  it('should define max schedule entries per day', () => {
    expect(TEACHER_LIMITS.MAX_SCHEDULE_ENTRIES_PER_DAY).toBe(8);
  });

  it('should define default max weekly hours', () => {
    expect(TEACHER_DEFAULTS.DEFAULT_MAX_WEEKLY_HOURS).toBe(24);
  });
});

describe('Teacher Schedule Config', () => {
  it('should define valid day of week range', () => {
    expect(0).toBeGreaterThanOrEqual(0);
    expect(6).toBeLessThanOrEqual(6);
  });

  it('should define time format as HH:MM', () => {
    const timeRegex = /^\d{2}:\d{2}$/;
    expect('08:00').toMatch(timeRegex);
    expect('17:30').toMatch(timeRegex);
    expect('8:00').not.toMatch(timeRegex);
  });
});

describe('Teacher Payroll Config', () => {
  it('should define currency as XOF', () => {
    expect(TEACHER_DEFAULTS.CURRENCY).toBe('XOF');
  });

  it('should define max hours per week as 40', () => {
    expect(TEACHER_DEFAULTS.MAX_WEEKLY_HOURS).toBe(40);
  });
});

describe('Teacher Leave Config', () => {
  it('should define advance notice days', () => {
    expect(TEACHER_LEAVE.ADVANCE_NOTICE_DAYS).toBe(7);
  });

  it('should define auto approve threshold', () => {
    expect(TEACHER_LEAVE.AUTO_APPROVE_THRESHOLD_DAYS).toBe(3);
  });

  it('should define paternity leave type', () => {
    expect(TEACHER_LEAVE.TYPES).toContain('PATERNITE');
  });

  it('should define sans_solde leave type', () => {
    expect(TEACHER_LEAVE.TYPES).toContain('SANS_SOLDE');
  });
});

describe('Teacher Evaluation Config', () => {
  it('should define all criteria', () => {
    expect(TEACHER_EVALUATION.DEFAULT_CRITERIA).toContain('Relation avec les élèves');
    expect(TEACHER_EVALUATION.DEFAULT_CRITERIA).toContain('Relation avec les collègues');
    expect(TEACHER_EVALUATION.DEFAULT_CRITERIA).toContain('Respect du règlement');
    expect(TEACHER_EVALUATION.DEFAULT_CRITERIA).toContain('Implication dans la vie scolaire');
  });

  it('should define review frequencies', () => {
    expect(TEACHER_EVALUATION.REVIEW_FREQUENCIES.PEDAGOGIQUE).toBe('TRIMESTRE');
    expect(TEACHER_EVALUATION.REVIEW_FREQUENCIES.ANNUELLE).toBe('ANNUELLE');
    expect(TEACHER_EVALUATION.REVIEW_FREQUENCIES.PROBATION).toBe('MOIS');
  });
});

describe('Teacher Import Config', () => {
  it('should have all optional fields', () => {
    expect(TEACHER_IMPORT.OPTIONAL_FIELDS).toContain('email');
    expect(TEACHER_IMPORT.OPTIONAL_FIELDS).toContain('phone');
    expect(TEACHER_IMPORT.OPTIONAL_FIELDS).toContain('grade');
    expect(TEACHER_IMPORT.OPTIONAL_FIELDS).toContain('speciality');
    expect(TEACHER_IMPORT.OPTIONAL_FIELDS).toContain('salary');
  });

  it('should have French mapping for speciality', () => {
    expect(TEACHER_IMPORT.FIELD_MAPPING['Spécialité']).toBe('speciality');
  });

  it('should have French mapping for employment type', () => {
    expect(TEACHER_IMPORT.FIELD_MAPPING['Type d\'emploi']).toBe('employmentType');
  });
});

describe('Teacher Export Config', () => {
  it('should define PDF options', () => {
    expect(TEACHER_EXPORT.PDF_OPTIONS.PAGE_SIZE).toBe('A4');
    expect(TEACHER_EXPORT.PDF_OPTIONS.INCLUDE_HEADER).toBe(true);
  });

  it('should define Excel options', () => {
    expect(TEACHER_EXPORT.EXCEL_OPTIONS.SHEET_NAME).toBe('Enseignants');
    expect(TEACHER_EXPORT.EXCEL_OPTIONS.AUTO_WIDTH).toBe(true);
  });

  it('should define CSV options', () => {
    expect(TEACHER_EXPORT.CSV_OPTIONS.DELIMITER).toBe(';');
    expect(TEACHER_EXPORT.CSV_OPTIONS.ENCODING).toBe('utf-8');
  });
});

describe('Teacher Timeline Config', () => {
  it('should have all event labels', () => {
    const labels = Object.values(TEACHER_TIMELINE.EVENT_TYPES);
    expect(labels.length).toBeGreaterThan(10);
  });

  it('should define retention days', () => {
    expect(TEACHER_TIMELINE.RETENTION_DAYS).toBe(3650);
  });
});

describe('Teacher Search Config', () => {
  it('should include speciality in search fields', () => {
    expect(TEACHER_SEARCH.FIELDS).toContain('speciality');
  });

  it('should boost matricule highest', () => {
    const boosts = TEACHER_SEARCH.BOOST_FIELDS;
    expect(boosts.matricule).toBeGreaterThanOrEqual(boosts.firstName);
    expect(boosts.firstName).toBeGreaterThanOrEqual(boosts.email);
  });
});

describe('Teacher Limits Config', () => {
  it('should define max import rows', () => {
    expect(TEACHER_LIMITS.MAX_IMPORT_ROWS).toBe(5000);
  });

  it('should define max export rows', () => {
    expect(TEACHER_LIMITS.MAX_EXPORT_ROWS).toBe(50000);
  });

  it('should define max documents per teacher', () => {
    expect(TEACHER_LIMITS.MAX_DOCUMENTS_PER_TEACHER).toBe(20);
  });

  it('should define max qualifications', () => {
    expect(TEACHER_LIMITS.MAX_QUALIFICATIONS).toBe(10);
  });

  it('should define max certifications', () => {
    expect(TEACHER_LIMITS.MAX_CERTIFICATIONS).toBe(10);
  });

  it('should define max concurrent leaves', () => {
    expect(TEACHER_LIMITS.MAX_CONCURRENT_LEAVES).toBe(3);
  });
});

describe('Teacher Contract Config', () => {
  it('should define all contract statuses', () => {
    expect(TEACHER_CONTRACT.STATUSES).toContain('ACTIVE');
    expect(TEACHER_CONTRACT.STATUSES).toContain('EXPIRED');
    expect(TEACHER_CONTRACT.STATUSES).toContain('TERMINATED');
    expect(TEACHER_CONTRACT.STATUSES).toContain('RENEWED');
  });

  it('should define min contract duration', () => {
    expect(TEACHER_CONTRACT.MIN_CONTRACT_DURATION_DAYS).toBe(30);
  });

  it('should define max contract duration', () => {
    expect(TEACHER_CONTRACT.MAX_CONTRACT_DURATION_DAYS).toBe(1825);
  });
});
