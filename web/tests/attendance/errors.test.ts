import { describe, it, expect } from 'vitest';
import {
  AttendanceNotFoundError,
  AttendanceConflictError,
  AttendanceValidationError,
  AttendanceSessionNotFoundError,
  AttendanceSessionError,
  AttendanceDuplicateError,
  AttendanceLateError,
  AttendanceJustificationNotFoundError,
  AttendanceJustificationError,
  AttendanceCorrectionNotFoundError,
  AttendanceCorrectionError,
  AttendanceAlertNotFoundError,
  AttendanceNotificationError,
  AttendanceImportError,
  AttendanceExportError,
  AttendanceQRCodeError,
  AttendanceQRCodeExpiredError,
  AttendanceGPSError,
  AttendanceGPSOutOfRadiusError,
  AttendanceFaceRecognitionError,
  AttendanceFaceNotRecognizedError,
  AttendanceNFCError,
  AttendanceNFCNotRecognizedError,
  AttendanceSyncError,
  AttendanceSyncConflictError,
  AttendancePolicyNotFoundError,
  AttendancePolicyError,
  AttendanceSettingsError,
  AttendanceDeviceNotFoundError,
  AttendanceLocationError,
  AttendanceRateExceededError,
  AttendanceMaxAbsencesError,
} from '@educi/errors';

describe('Attendance Errors', () => {
  it('AttendanceNotFoundError should have correct message', () => {
    const error = new AttendanceNotFoundError();
    expect(error).toBeInstanceOf(AttendanceNotFoundError);
    expect(error.message).toContain('Présence');
    expect(error.statusCode).toBe(404);
  });

  it('AttendanceNotFoundError should accept identifier', () => {
    const error = new AttendanceNotFoundError('ATT001');
    expect(error.message).toContain('ATT001');
  });

  it('AttendanceConflictError should have correct code', () => {
    const error = new AttendanceConflictError();
    expect(error).toBeInstanceOf(AttendanceConflictError);
    expect(error.message).toContain('Conflit');
    expect(error.statusCode).toBe(409);
  });

  it('AttendanceValidationError should store errors', () => {
    const errors = [{ field: 'status', message: 'Requis' }];
    const error = new AttendanceValidationError(errors);
    expect(error).toBeInstanceOf(AttendanceValidationError);
    expect(error.errors).toEqual(errors);
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceSessionNotFoundError should have correct message', () => {
    const error = new AttendanceSessionNotFoundError();
    expect(error).toBeInstanceOf(AttendanceSessionNotFoundError);
    expect(error.message).toContain('Session');
    expect(error.statusCode).toBe(404);
  });

  it('AttendanceSessionNotFoundError should accept identifier', () => {
    const error = new AttendanceSessionNotFoundError('SES001');
    expect(error.message).toContain('SES001');
  });

  it('AttendanceSessionError should have correct code', () => {
    const error = new AttendanceSessionError();
    expect(error).toBeInstanceOf(AttendanceSessionError);
    expect(error.message).toContain('session');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceDuplicateError should have correct message', () => {
    const error = new AttendanceDuplicateError('2025-10-15', 'STU001');
    expect(error).toBeInstanceOf(AttendanceDuplicateError);
    expect(error.message).toContain('2025-10-15');
    expect(error.statusCode).toBe(409);
  });

  it('AttendanceLateError should have correct message', () => {
    const error = new AttendanceLateError(15);
    expect(error).toBeInstanceOf(AttendanceLateError);
    expect(error.message).toContain('15');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceJustificationNotFoundError should have correct message', () => {
    const error = new AttendanceJustificationNotFoundError();
    expect(error).toBeInstanceOf(AttendanceJustificationNotFoundError);
    expect(error.message).toContain('Justification');
    expect(error.statusCode).toBe(404);
  });

  it('AttendanceJustificationNotFoundError should accept identifier', () => {
    const error = new AttendanceJustificationNotFoundError('JUS001');
    expect(error.message).toContain('JUS001');
  });

  it('AttendanceJustificationError should have correct code', () => {
    const error = new AttendanceJustificationError();
    expect(error).toBeInstanceOf(AttendanceJustificationError);
    expect(error.message).toContain('justification');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceCorrectionNotFoundError should have correct message', () => {
    const error = new AttendanceCorrectionNotFoundError();
    expect(error).toBeInstanceOf(AttendanceCorrectionNotFoundError);
    expect(error.message).toContain('Correction');
    expect(error.statusCode).toBe(404);
  });

  it('AttendanceCorrectionNotFoundError should accept identifier', () => {
    const error = new AttendanceCorrectionNotFoundError('COR001');
    expect(error.message).toContain('COR001');
  });

  it('AttendanceCorrectionError should have correct code', () => {
    const error = new AttendanceCorrectionError();
    expect(error).toBeInstanceOf(AttendanceCorrectionError);
    expect(error.message).toContain('correction');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceAlertNotFoundError should have correct message', () => {
    const error = new AttendanceAlertNotFoundError();
    expect(error).toBeInstanceOf(AttendanceAlertNotFoundError);
    expect(error.message).toContain('Alerte');
    expect(error.statusCode).toBe(404);
  });

  it('AttendanceAlertNotFoundError should accept identifier', () => {
    const error = new AttendanceAlertNotFoundError('ALT001');
    expect(error.message).toContain('ALT001');
  });

  it('AttendanceNotificationError should have correct code', () => {
    const error = new AttendanceNotificationError();
    expect(error).toBeInstanceOf(AttendanceNotificationError);
    expect(error.message).toContain('notification');
    expect(error.statusCode).toBe(500);
  });

  it('AttendanceImportError should have correct code', () => {
    const error = new AttendanceImportError();
    expect(error).toBeInstanceOf(AttendanceImportError);
    expect(error.message).toContain('import');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceExportError should have correct code', () => {
    const error = new AttendanceExportError();
    expect(error).toBeInstanceOf(AttendanceExportError);
    expect(error.message).toContain('export');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceQRCodeError should have correct code', () => {
    const error = new AttendanceQRCodeError();
    expect(error).toBeInstanceOf(AttendanceQRCodeError);
    expect(error.message).toContain('QR');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceQRCodeExpiredError should have correct message', () => {
    const error = new AttendanceQRCodeExpiredError();
    expect(error).toBeInstanceOf(AttendanceQRCodeExpiredError);
    expect(error.message).toContain('expiré');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceGPSError should have correct code', () => {
    const error = new AttendanceGPSError();
    expect(error).toBeInstanceOf(AttendanceGPSError);
    expect(error.message).toContain('GPS');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceGPSOutOfRadiusError should have correct message', () => {
    const error = new AttendanceGPSOutOfRadiusError(100);
    expect(error).toBeInstanceOf(AttendanceGPSOutOfRadiusError);
    expect(error.message).toContain('100');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceFaceRecognitionError should have correct code', () => {
    const error = new AttendanceFaceRecognitionError();
    expect(error).toBeInstanceOf(AttendanceFaceRecognitionError);
    expect(error.message).toContain('faciale');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceFaceNotRecognizedError should have correct message', () => {
    const error = new AttendanceFaceNotRecognizedError();
    expect(error).toBeInstanceOf(AttendanceFaceNotRecognizedError);
    expect(error.message).toContain('non reconnu');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceNFCError should have correct code', () => {
    const error = new AttendanceNFCError();
    expect(error).toBeInstanceOf(AttendanceNFCError);
    expect(error.message).toContain('NFC');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceNFCNotRecognizedError should have correct message', () => {
    const error = new AttendanceNFCNotRecognizedError();
    expect(error).toBeInstanceOf(AttendanceNFCNotRecognizedError);
    expect(error.message).toContain('non reconnu');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceSyncError should have correct code', () => {
    const error = new AttendanceSyncError();
    expect(error).toBeInstanceOf(AttendanceSyncError);
    expect(error.message).toContain('synchronisation');
    expect(error.statusCode).toBe(500);
  });

  it('AttendanceSyncConflictError should have correct message', () => {
    const error = new AttendanceSyncConflictError(5);
    expect(error).toBeInstanceOf(AttendanceSyncConflictError);
    expect(error.message).toContain('5');
    expect(error.conflicts).toBe(5);
    expect(error.statusCode).toBe(409);
  });

  it('AttendancePolicyNotFoundError should have correct message', () => {
    const error = new AttendancePolicyNotFoundError();
    expect(error).toBeInstanceOf(AttendancePolicyNotFoundError);
    expect(error.message).toContain('Politique');
    expect(error.statusCode).toBe(404);
  });

  it('AttendancePolicyNotFoundError should accept identifier', () => {
    const error = new AttendancePolicyNotFoundError('POL001');
    expect(error.message).toContain('POL001');
  });

  it('AttendancePolicyError should have correct code', () => {
    const error = new AttendancePolicyError();
    expect(error).toBeInstanceOf(AttendancePolicyError);
    expect(error.message).toContain('politique');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceSettingsError should have correct code', () => {
    const error = new AttendanceSettingsError();
    expect(error).toBeInstanceOf(AttendanceSettingsError);
    expect(error.message).toContain('configuration');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceDeviceNotFoundError should have correct message', () => {
    const error = new AttendanceDeviceNotFoundError();
    expect(error).toBeInstanceOf(AttendanceDeviceNotFoundError);
    expect(error.message).toContain('Appareil');
    expect(error.statusCode).toBe(404);
  });

  it('AttendanceDeviceNotFoundError should accept identifier', () => {
    const error = new AttendanceDeviceNotFoundError('DEV001');
    expect(error.message).toContain('DEV001');
  });

  it('AttendanceLocationError should have correct code', () => {
    const error = new AttendanceLocationError();
    expect(error).toBeInstanceOf(AttendanceLocationError);
    expect(error.message).toContain('localisation');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceRateExceededError should have correct message', () => {
    const error = new AttendanceRateExceededError(60, 75);
    expect(error).toBeInstanceOf(AttendanceRateExceededError);
    expect(error.message).toContain('60');
    expect(error.message).toContain('75');
    expect(error.statusCode).toBe(400);
  });

  it('AttendanceMaxAbsencesError should have correct message', () => {
    const error = new AttendanceMaxAbsencesError(10);
    expect(error).toBeInstanceOf(AttendanceMaxAbsencesError);
    expect(error.message).toContain('10');
    expect(error.statusCode).toBe(400);
  });
});
