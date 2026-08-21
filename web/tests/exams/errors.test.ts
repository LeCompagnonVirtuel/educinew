import { describe, it, expect } from 'vitest';
import {
  ExamNotFoundError,
  ExamAlreadyPublishedError,
  ExamLockedError,
  ExamNotPublishedError,
  InvalidMarkError,
  NegativeMarkError,
  MarkExceedsMaxError,
  GradeCalculationError,
  RankingCalculationError,
  BulletinGenerationError,
  TranscriptGenerationError,
  CoefficientMissingError,
  DecisionConflictError,
  DecisionAlreadyApprovedError,
  CompetencyCalculationError,
  CorrectionAlreadyApprovedError,
  CorrectionRejectedError,
  ReportCardLockedError,
  ReportCardNotFoundError,
  TranscriptNotFoundError,
  TranscriptNotGeneratedError,
  ExamImportError,
  ExamExportError,
  ExamDuplicateError,
  ExamDateConflictError,
  ExamSessionNotFoundError,
  ExamRoomNotFoundError,
  ExamRoomFullError,
  ExamCandidateNotFoundError,
  ExamCandidateAlreadyRegisteredError,
  GradeNotFoundError,
  GradeRuleConflictError,
  MarkNotFoundError,
  MarkAlreadyValidatedError,
  MarksNotCompleteError,
  AverageCalculationError,
  DecisionNotFoundError,
  CompetencyNotFoundError,
  MeritNotFoundError,
  ExamStatisticsError,
  ExamDashboardError,
  ExamSettingsError,
  ExamNotificationError,
  PublicationError,
  ExamValidationError,
} from '@educi/errors';

describe('Exam Errors', () => {
  describe('ExamNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new ExamNotFoundError();
      expect(error.message).toBe('Examen introuvable');
      expect(error.code).toBe('EXAM_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });

    it('should include identifier', () => {
      const error = new ExamNotFoundError('exam-123');
      expect(error.message).toContain('exam-123');
    });
  });

  describe('ExamAlreadyPublishedError', () => {
    it('should have correct properties', () => {
      const error = new ExamAlreadyPublishedError();
      expect(error.code).toBe('EXAM_ALREADY_PUBLISHED');
      expect(error.statusCode).toBe(409);
    });

    it('should include identifier', () => {
      const error = new ExamAlreadyPublishedError('exam-1');
      expect(error.message).toContain('exam-1');
    });
  });

  describe('ExamLockedError', () => {
    it('should have correct properties', () => {
      const error = new ExamLockedError();
      expect(error.code).toBe('EXAM_LOCKED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('ExamNotPublishedError', () => {
    it('should have correct properties', () => {
      const error = new ExamNotPublishedError();
      expect(error.code).toBe('EXAM_NOT_PUBLISHED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('InvalidMarkError', () => {
    it('should have correct properties', () => {
      const error = new InvalidMarkError('abc');
      expect(error.code).toBe('INVALID_MARK');
      expect(error.statusCode).toBe(400);
      expect(error.message).toContain('abc');
    });

    it('should accept numeric marks', () => {
      const error = new InvalidMarkError(25);
      expect(error.message).toContain('25');
    });
  });

  describe('NegativeMarkError', () => {
    it('should have correct properties', () => {
      const error = new NegativeMarkError(-5);
      expect(error.code).toBe('NEGATIVE_MARK');
      expect(error.statusCode).toBe(400);
      expect(error.message).toContain('-5');
    });
  });

  describe('MarkExceedsMaxError', () => {
    it('should have correct properties', () => {
      const error = new MarkExceedsMaxError(25, 20);
      expect(error.code).toBe('MARK_EXCEEDS_MAX');
      expect(error.statusCode).toBe(400);
      expect(error.message).toContain('25');
      expect(error.message).toContain('20');
    });
  });

  describe('GradeCalculationError', () => {
    it('should have correct defaults', () => {
      const error = new GradeCalculationError();
      expect(error.code).toBe('GRADE_CALCULATION_ERROR');
      expect(error.statusCode).toBe(500);
    });

    it('should accept custom message', () => {
      const error = new GradeCalculationError('Custom error');
      expect(error.message).toBe('Custom error');
    });
  });

  describe('RankingCalculationError', () => {
    it('should have correct defaults', () => {
      const error = new RankingCalculationError();
      expect(error.code).toBe('RANKING_CALCULATION_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('BulletinGenerationError', () => {
    it('should have correct defaults', () => {
      const error = new BulletinGenerationError();
      expect(error.code).toBe('BULLETIN_GENERATION_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('TranscriptGenerationError', () => {
    it('should have correct defaults', () => {
      const error = new TranscriptGenerationError();
      expect(error.code).toBe('TRANSCRIPT_GENERATION_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('CoefficientMissingError', () => {
    it('should have correct defaults', () => {
      const error = new CoefficientMissingError();
      expect(error.code).toBe('COEFFICIENT_MISSING');
      expect(error.statusCode).toBe(400);
    });

    it('should include subject name', () => {
      const error = new CoefficientMissingError('Math');
      expect(error.message).toContain('Math');
    });
  });

  describe('DecisionConflictError', () => {
    it('should have correct defaults', () => {
      const error = new DecisionConflictError();
      expect(error.code).toBe('DECISION_CONFLICT');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('DecisionAlreadyApprovedError', () => {
    it('should have correct properties', () => {
      const error = new DecisionAlreadyApprovedError();
      expect(error.code).toBe('DECISION_ALREADY_APPROVED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('CompetencyCalculationError', () => {
    it('should have correct defaults', () => {
      const error = new CompetencyCalculationError();
      expect(error.code).toBe('COMPETENCY_CALCULATION_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('CorrectionAlreadyApprovedError', () => {
    it('should have correct properties', () => {
      const error = new CorrectionAlreadyApprovedError();
      expect(error.code).toBe('CORRECTION_ALREADY_APPROVED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('CorrectionRejectedError', () => {
    it('should have correct properties', () => {
      const error = new CorrectionRejectedError();
      expect(error.code).toBe('CORRECTION_REJECTED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('ReportCardLockedError', () => {
    it('should have correct properties', () => {
      const error = new ReportCardLockedError();
      expect(error.code).toBe('REPORT_CARD_LOCKED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('ReportCardNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new ReportCardNotFoundError();
      expect(error.message).toBe('Bulletin introuvable');
      expect(error.code).toBe('REPORT_CARD_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('TranscriptNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new TranscriptNotFoundError();
      expect(error.code).toBe('TRANSCRIPT_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('TranscriptNotGeneratedError', () => {
    it('should have correct properties', () => {
      const error = new TranscriptNotGeneratedError();
      expect(error.code).toBe('TRANSCRIPT_NOT_GENERATED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('ExamImportError', () => {
    it('should have correct defaults', () => {
      const error = new ExamImportError();
      expect(error.code).toBe('EXAM_IMPORT_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('ExamExportError', () => {
    it('should have correct defaults', () => {
      const error = new ExamExportError();
      expect(error.code).toBe('EXAM_EXPORT_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('ExamDuplicateError', () => {
    it('should include exam name', () => {
      const error = new ExamDuplicateError('Final Math');
      expect(error.code).toBe('EXAM_DUPLICATE');
      expect(error.statusCode).toBe(409);
      expect(error.message).toContain('Final Math');
    });
  });

  describe('ExamDateConflictError', () => {
    it('should have correct defaults', () => {
      const error = new ExamDateConflictError();
      expect(error.code).toBe('EXAM_DATE_CONFLICT');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('ExamSessionNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new ExamSessionNotFoundError();
      expect(error.code).toBe('EXAM_SESSION_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('ExamRoomNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new ExamRoomNotFoundError();
      expect(error.code).toBe('EXAM_ROOM_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('ExamRoomFullError', () => {
    it('should include room name', () => {
      const error = new ExamRoomFullError('Salle A');
      expect(error.code).toBe('EXAM_ROOM_FULL');
      expect(error.statusCode).toBe(409);
      expect(error.message).toContain('Salle A');
    });
  });

  describe('ExamCandidateNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new ExamCandidateNotFoundError();
      expect(error.code).toBe('EXAM_CANDIDATE_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('ExamCandidateAlreadyRegisteredError', () => {
    it('should have correct properties', () => {
      const error = new ExamCandidateAlreadyRegisteredError();
      expect(error.code).toBe('EXAM_CANDIDATE_ALREADY_REGISTERED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('GradeNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new GradeNotFoundError();
      expect(error.message).toBe('Note introuvable');
      expect(error.code).toBe('GRADE_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('GradeRuleConflictError', () => {
    it('should have correct defaults', () => {
      const error = new GradeRuleConflictError();
      expect(error.code).toBe('GRADE_RULE_CONFLICT');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('MarkNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new MarkNotFoundError();
      expect(error.message).toBe('Note introuvable');
      expect(error.code).toBe('MARK_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('MarkAlreadyValidatedError', () => {
    it('should have correct properties', () => {
      const error = new MarkAlreadyValidatedError();
      expect(error.code).toBe('MARK_ALREADY_VALIDATED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('MarksNotCompleteError', () => {
    it('should include missing count', () => {
      const error = new MarksNotCompleteError(5);
      expect(error.code).toBe('MARKS_NOT_COMPLETE');
      expect(error.statusCode).toBe(400);
      expect(error.message).toContain('5');
    });
  });

  describe('AverageCalculationError', () => {
    it('should have correct defaults', () => {
      const error = new AverageCalculationError();
      expect(error.code).toBe('AVERAGE_CALCULATION_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('DecisionNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new DecisionNotFoundError();
      expect(error.message).toBe('Décision introuvable');
      expect(error.code).toBe('DECISION_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('CompetencyNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new CompetencyNotFoundError();
      expect(error.message).toBe('Compétence introuvable');
      expect(error.code).toBe('COMPETENCY_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('MeritNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new MeritNotFoundError();
      expect(error.message).toBe('Mention introuvable');
      expect(error.code).toBe('MERIT_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('ExamStatisticsError', () => {
    it('should have correct defaults', () => {
      const error = new ExamStatisticsError();
      expect(error.code).toBe('EXAM_STATISTICS_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('ExamDashboardError', () => {
    it('should have correct defaults', () => {
      const error = new ExamDashboardError();
      expect(error.code).toBe('EXAM_DASHBOARD_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('ExamSettingsError', () => {
    it('should have correct defaults', () => {
      const error = new ExamSettingsError();
      expect(error.code).toBe('EXAM_SETTINGS_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('ExamNotificationError', () => {
    it('should have correct defaults', () => {
      const error = new ExamNotificationError();
      expect(error.code).toBe('EXAM_NOTIFICATION_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('PublicationError', () => {
    it('should have correct defaults', () => {
      const error = new PublicationError();
      expect(error.code).toBe('PUBLICATION_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('ExamValidationError', () => {
    it('should include errors array', () => {
      const errors = [
        { field: 'name', message: 'Required' },
        { field: 'mark', message: 'Invalid' },
      ];
      const error = new ExamValidationError(errors);
      expect(error.code).toBe('EXAM_VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.errors).toHaveLength(2);
      expect(error.errors[0].field).toBe('name');
    });

    it('should format message with error count', () => {
      const error = new ExamValidationError([{ field: 'x', message: 'y' }]);
      expect(error.message).toContain('1');
    });
  });
});
