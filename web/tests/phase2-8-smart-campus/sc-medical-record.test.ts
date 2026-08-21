import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMedicalRecordService } from '@/features/smart-campus/services/sc-medical-record.service';

describe('ScMedicalRecordService', () => {
  let service: ScMedicalRecordService;
  const mockSupabase = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          then: vi.fn()
        })),
        then: vi.fn()
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn()
      }))
    }))
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ScMedicalRecordService(mockSupabase);
  });

  it('should get medical record by id', async () => {
    const result = await service.getMedicalRecord('school-1', 'record-1');
    expect(result).toBeDefined();
  });

  it('should return medical record with correct data', async () => {
    const mockRecord = { id: 'record-1', student_id: 'student-1', blood_type: 'O+', created_at: '2026-08-03' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockRecord, error: null });
    const result = await service.getMedicalRecord('school-1', 'record-1');
    expect(result).toEqual(mockRecord);
  });

  it('should handle error when getting medical record', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getMedicalRecord('school-1', 'record-1');
    expect(result).toBeNull();
  });

  it('should get all medical records for a school', async () => {
    const mockRecords = [{ id: 'record-1' }, { id: 'record-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getMedicalRecords('school-1');
    expect(result).toEqual(mockRecords);
  });

  it('should create a new medical record', async () => {
    const newRecord = { student_id: 'student-1', blood_type: 'A+', medical_conditions: 'None' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'record-3', ...newRecord }, error: null });
    const result = await service.createMedicalRecord('school-1', newRecord);
    expect(result).toBeDefined();
  });

  it('should update a medical record', async () => {
    const updates = { blood_type: 'B+' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'record-1', ...updates }, error: null });
    const result = await service.updateMedicalRecord('school-1', 'record-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a medical record', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteMedicalRecord('school-1', 'record-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteMedicalRecord('school-1', 'record-1');
    expect(result).toBe(false);
  });

  it('should get record by student', async () => {
    const mockRecords = [{ id: 'record-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getRecordByStudent('school-1', 'student-1');
    expect(result).toEqual(mockRecords);
  });

  it('should get records by blood type', async () => {
    const mockRecords = [{ id: 'record-1', blood_type: 'O+' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getRecordsByBloodType('school-1', 'O+');
    expect(result).toEqual(mockRecords);
  });

  it('should update medical conditions', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'record-1', medical_conditions: 'Asthma' }, error: null });
    const result = await service.updateMedicalConditions('school-1', 'record-1', 'Asthma');
    expect(result).toBeDefined();
  });

  it('should update blood type', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'record-1', blood_type: 'AB+' }, error: null });
    const result = await service.updateBloodType('school-1', 'record-1', 'AB+');
    expect(result).toBeDefined();
  });

  it('should get medical summary', async () => {
    const mockSummary = { student_id: 'student-1', blood_type: 'O+', conditions: 'None' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockSummary, error: null });
    const result = await service.getMedicalSummary('school-1', 'student-1');
    expect(result).toBeDefined();
  });

  it('should validate blood type', () => {
    const result = service.validateBloodType('O+');
    expect(result).toBe(true);
  });

  it('should reject invalid blood type', () => {
    const result = service.validateBloodType('X+');
    expect(result).toBe(false);
  });

  it('should validate medical record data', () => {
    const result = service.validateMedicalRecordData({ student_id: 'student-1', blood_type: 'O+' });
    expect(result).toBe(true);
  });

  it('should reject invalid medical record data', () => {
    const result = service.validateMedicalRecordData({ student_id: '', blood_type: '' });
    expect(result).toBe(false);
  });
});
