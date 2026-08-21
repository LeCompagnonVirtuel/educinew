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

describe('Teacher Timeline Config Extended', () => {
  it('should have creation event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.CREATION).toBe('Création');
  });

  it('should have assignment event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.ASSIGNMENT).toBe('Affectation');
  });

  it('should have schedule change event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.SCHEDULE_CHANGE).toBe('Changement d\'emploi du temps');
  });

  it('should have contract update event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.CONTRACT_UPDATE).toBe('Mise à jour contrat');
  });

  it('should have leave event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.LEAVE).toBe('Congé');
  });

  it('should have evaluation event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.EVALUATION).toBe('Évaluation');
  });

  it('should have promotion event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.PROMOTION).toBe('Promotion');
  });

  it('should have transfer event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.TRANSFER).toBe('Transfert');
  });

  it('should have medical event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.MEDICAL).toBe('Médical');
  });

  it('should have document event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.DOCUMENT).toBe('Document');
  });

  it('should have photo event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.PHOTO).toBe('Photo');
  });

  it('should have other event', () => {
    expect(TEACHER_TIMELINE.EVENT_TYPES.OTHER).toBe('Autre');
  });

  it('should have 12 event types', () => {
    expect(Object.keys(TEACHER_TIMELINE.EVENT_TYPES)).toHaveLength(12);
  });
});

describe('Teacher Import Config Extended', () => {
  it('should have all CSV delimiters', () => {
    expect(TEACHER_IMPORT.CSV_DELIMITERS).toContain(',');
    expect(TEACHER_IMPORT.CSV_DELIMITERS).toContain(';');
    expect(TEACHER_IMPORT.CSV_DELIMITERS).toContain('\t');
  });

  it('should have French mapping for all fields', () => {
    expect(TEACHER_IMPORT.FIELD_MAPPING['Prénom']).toBe('firstName');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Nom']).toBe('lastName');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Email']).toBe('email');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Téléphone']).toBe('phone');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Date de naissance']).toBe('dateOfBirth');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Lieu de naissance']).toBe('placeOfBirth');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Sexe']).toBe('gender');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Adresse']).toBe('address');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Nationalité']).toBe('nationality');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Grade']).toBe('grade');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Spécialité']).toBe('speciality');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Département']).toBe('departmentId');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Date d\'embauche']).toBe('hireDate');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Type d\'emploi']).toBe('employmentType');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Type de contrat']).toBe('contractType');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Salaire']).toBe('salary');
    expect(TEACHER_IMPORT.FIELD_MAPPING['Taux horaire']).toBe('hourlyRate');
  });
});

describe('Teacher Export Config Extended', () => {
  it('should define PDF margins', () => {
    expect(TEACHER_EXPORT.PDF_OPTIONS.MARGINS.top).toBe(20);
    expect(TEACHER_EXPORT.PDF_OPTIONS.MARGINS.bottom).toBe(20);
    expect(TEACHER_EXPORT.PDF_OPTIONS.MARGINS.left).toBe(15);
    expect(TEACHER_EXPORT.PDF_OPTIONS.MARGINS.right).toBe(15);
  });

  it('should define Excel include headers', () => {
    expect(TEACHER_EXPORT.EXCEL_OPTIONS.INCLUDE_HEADERS).toBe(true);
  });

  it('should define CSV include headers', () => {
    expect(TEACHER_EXPORT.CSV_OPTIONS.INCLUDE_HEADERS).toBe(true);
  });
});

describe('Teacher Search Config Extended', () => {
  it('should have all search fields', () => {
    expect(TEACHER_SEARCH.FIELDS).toContain('firstName');
    expect(TEACHER_SEARCH.FIELDS).toContain('lastName');
    expect(TEACHER_SEARCH.FIELDS).toContain('matricule');
    expect(TEACHER_SEARCH.FIELDS).toContain('email');
    expect(TEACHER_SEARCH.FIELDS).toContain('phone');
    expect(TEACHER_SEARCH.FIELDS).toContain('speciality');
  });

  it('should have boost values', () => {
    expect(TEACHER_SEARCH.BOOST_FIELDS.matricule).toBe(3);
    expect(TEACHER_SEARCH.BOOST_FIELDS.firstName).toBe(2);
    expect(TEACHER_SEARCH.BOOST_FIELDS.lastName).toBe(2);
    expect(TEACHER_SEARCH.BOOST_FIELDS.speciality).toBe(2);
    expect(TEACHER_SEARCH.BOOST_FIELDS.email).toBe(1);
    expect(TEACHER_SEARCH.BOOST_FIELDS.phone).toBe(1);
  });
});

describe('Teacher Limits Config Extended', () => {
  it('should define free tier limit', () => {
    expect(TEACHER_LIMITS.MAX_TEACHERS_PER_SCHOOL.FREE).toBe(10);
  });

  it('should define starter tier limit', () => {
    expect(TEACHER_LIMITS.MAX_TEACHERS_PER_SCHOOL.STARTER).toBe(50);
  });

  it('should define pro tier limit', () => {
    expect(TEACHER_LIMITS.MAX_TEACHERS_PER_SCHOOL.PRO).toBe(200);
  });

  it('should define enterprise tier limit', () => {
    expect(TEACHER_LIMITS.MAX_TEACHERS_PER_SCHOOL.ENTERPRISE).toBe(5000);
  });
});

describe('Teacher Leave Config Extended', () => {
  it('should have all statuses with correct labels', () => {
    expect(TEACHER_LEAVE.STATUSES).toContain('PENDING');
    expect(TEACHER_LEAVE.STATUSES).toContain('APPROVED');
    expect(TEACHER_LEAVE.STATUSES).toContain('REJECTED');
    expect(TEACHER_LEAVE.STATUSES).toContain('CANCELLED');
  });

  it('should define maternity max days', () => {
    expect(TEACHER_LEAVE.MATERNITE_MAX_DAYS).toBe(98);
  });

  it('should define annual max days', () => {
    expect(TEACHER_LEAVE.ANNUEL_MAX_DAYS).toBe(30);
  });
});

describe('Teacher Evaluation Config Extended', () => {
  it('should have all evaluation types with correct labels', () => {
    expect(TEACHER_EVALUATION.TYPES).toContain('PEDAGOGIQUE');
    expect(TEACHER_EVALUATION.TYPES).toContain('ADMINISTRATIVE');
    expect(TEACHER_EVALUATION.TYPES).toContain('ANNUELLE');
    expect(TEACHER_EVALUATION.TYPES).toContain('PROBATION');
  });

  it('should have 8 default criteria', () => {
    expect(TEACHER_EVALUATION.DEFAULT_CRITERIA).toHaveLength(8);
  });

  it('should have max score 20', () => {
    expect(TEACHER_EVALUATION.MAX_SCORE).toBe(20);
  });

  it('should have passing score 10', () => {
    expect(TEACHER_EVALUATION.PASSING_SCORE).toBe(10);
  });
});

describe('Teacher Contract Config Extended', () => {
  it('should have all contract types', () => {
    expect(TEACHER_CONTRACT.TYPES).toHaveLength(5);
    expect(TEACHER_CONTRACT.TYPES).toContain('CDI');
    expect(TEACHER_CONTRACT.TYPES).toContain('CDD');
    expect(TEACHER_CONTRACT.TYPES).toContain('VACATAIRE');
    expect(TEACHER_CONTRACT.TYPES).toContain('CONSULTANT');
    expect(TEACHER_CONTRACT.TYPES).toContain('STAGE');
  });

  it('should define probation period', () => {
    expect(TEACHER_CONTRACT.PROBATION_PERIOD_DAYS).toBe(90);
  });

  it('should define renewal reminder', () => {
    expect(TEACHER_CONTRACT.RENEWAL_REMINDER_DAYS).toBe(30);
  });
});

describe('Teacher Permissions Extended', () => {
  it('should have correct CREATE permissions', () => {
    expect(TEACHER_PERMISSIONS.CREATE).toEqual(['ADMIN', 'SUPER_ADMIN']);
  });

  it('should have correct READ permissions', () => {
    expect(TEACHER_PERMISSIONS.READ).toContain('ADMIN');
    expect(TEACHER_PERMISSIONS.READ).toContain('SUPER_ADMIN');
    expect(TEACHER_PERMISSIONS.READ).toContain('SECRETAIRE');
    expect(TEACHER_PERMISSIONS.READ).toContain('ENSEIGNANT');
  });

  it('should have correct UPDATE permissions', () => {
    expect(TEACHER_PERMISSIONS.UPDATE).toEqual(['ADMIN', 'SUPER_ADMIN']);
  });

  it('should have correct DELETE permissions', () => {
    expect(TEACHER_PERMISSIONS.DELETE).toEqual(['SUPER_ADMIN']);
  });

  it('should have correct ARCHIVE permissions', () => {
    expect(TEACHER_PERMISSIONS.ARCHIVE).toEqual(['ADMIN', 'SUPER_ADMIN']);
  });

  it('should have correct RESTORE permissions', () => {
    expect(TEACHER_PERMISSIONS.RESTORE).toEqual(['ADMIN', 'SUPER_ADMIN']);
  });

  it('should have correct ASSIGN permissions', () => {
    expect(TEACHER_PERMISSIONS.ASSIGN).toEqual(['ADMIN', 'SUPER_ADMIN']);
  });

  it('should have correct SCHEDULE permissions', () => {
    expect(TEACHER_PERMISSIONS.SCHEDULE).toContain('ADMIN');
    expect(TEACHER_PERMISSIONS.SCHEDULE).toContain('SUPER_ADMIN');
    expect(TEACHER_PERMISSIONS.SCHEDULE).toContain('SECRETAIRE');
  });

  it('should have correct LEAVE permissions', () => {
    expect(TEACHER_PERMISSIONS.LEAVE).toContain('ADMIN');
    expect(TEACHER_PERMISSIONS.LEAVE).toContain('SUPER_ADMIN');
    expect(TEACHER_PERMISSIONS.LEAVE).toContain('ENSEIGNANT');
  });

  it('should have correct PAYROLL permissions', () => {
    expect(TEACHER_PERMISSIONS.PAYROLL).toEqual(['ADMIN', 'SUPER_ADMIN']);
  });

  it('should have correct EVALUATION permissions', () => {
    expect(TEACHER_PERMISSIONS.EVALUATION).toContain('ADMIN');
    expect(TEACHER_PERMISSIONS.EVALUATION).toContain('SUPER_ADMIN');
    expect(TEACHER_PERMISSIONS.EVALUATION).toContain('DIRECTEUR');
  });

  it('should have correct IMPORT permissions', () => {
    expect(TEACHER_PERMISSIONS.IMPORT).toEqual(['ADMIN', 'SUPER_ADMIN']);
  });

  it('should have correct EXPORT permissions', () => {
    expect(TEACHER_PERMISSIONS.EXPORT).toContain('ADMIN');
    expect(TEACHER_PERMISSIONS.EXPORT).toContain('SUPER_ADMIN');
    expect(TEACHER_PERMISSIONS.EXPORT).toContain('SECRETAIRE');
  });
});
