import { describe, it, expect } from 'vitest';
import {
  CreateStudentSchema,
  UpdateStudentSchema,
  ArchiveStudentSchema,
  DeleteStudentSchema,
  TransferStudentSchema,
  PromotionStudentSchema,
  GuardianSchema,
  EmergencyContactSchema,
  MedicalSchema,
  VaccinationSchema,
  PhotoSchema,
  ImportSchema,
  ExportSchema,
  FiltersSchema,
  SearchSchema,
  QRCodeSchema,
  StudentCardSchema,
  TimelineSchema,
  StatisticsSchema,
} from '@/features/students/validators';

describe('Student Validators', () => {
  describe('CreateStudentSchema', () => {
    it('should validate correct student data', () => {
      const result = CreateStudentSchema.safeParse({
        firstName: 'Jean',
        lastName: 'Dupont',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty firstName', () => {
      const result = CreateStudentSchema.safeParse({ firstName: '', lastName: 'Dupont' });
      expect(result.success).toBe(false);
    });

    it('should reject empty lastName', () => {
      const result = CreateStudentSchema.safeParse({ firstName: 'Jean', lastName: '' });
      expect(result.success).toBe(false);
    });

    it('should accept optional fields', () => {
      const result = CreateStudentSchema.safeParse({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@test.com',
        phone: '+22501234567',
        gender: 'M',
        nationality: 'Ivoirienne',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all genders', () => {
      for (const gender of ['M', 'F', 'OTHER', 'UNKNOWN']) {
        const result = CreateStudentSchema.safeParse({ firstName: 'A', lastName: 'B', gender });
        expect(result.success).toBe(true);
      }
    });

    it('should accept all blood groups', () => {
      for (const bg of ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN']) {
        const result = CreateStudentSchema.safeParse({ firstName: 'A', lastName: 'B', bloodGroup: bg });
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid email', () => {
      const result = CreateStudentSchema.safeParse({ firstName: 'A', lastName: 'B', email: 'invalid' });
      expect(result.success).toBe(false);
    });

    it('should reject invalid phone', () => {
      const result = CreateStudentSchema.safeParse({ firstName: 'A', lastName: 'B', phone: '123' });
      expect(result.success).toBe(false);
    });
  });

  describe('UpdateStudentSchema', () => {
    it('should validate partial update', () => {
      const result = UpdateStudentSchema.safeParse({ firstName: 'Nouveau' });
      expect(result.success).toBe(true);
    });

    it('should validate status update', () => {
      const result = UpdateStudentSchema.safeParse({ status: 'INACTIVE' });
      expect(result.success).toBe(true);
    });

    it('should accept all statuses', () => {
      for (const status of ['ACTIVE', 'INACTIVE', 'TRANSFERRED', 'GRADUATED', 'SUSPENDED', 'ARCHIVED']) {
        const result = UpdateStudentSchema.safeParse({ status });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('ArchiveStudentSchema', () => {
    it('should validate with reason', () => {
      const result = ArchiveStudentSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        reason: 'Transfert',
      });
      expect(result.success).toBe(true);
    });

    it('should validate without reason', () => {
      const result = ArchiveStudentSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('DeleteStudentSchema', () => {
    it('should require SUPPRIMER', () => {
      const result = DeleteStudentSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        confirmation: 'SUPPRIMER',
      });
      expect(result.success).toBe(true);
    });

    it('should reject wrong confirmation', () => {
      const result = DeleteStudentSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        confirmation: 'DELETE',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('TransferStudentSchema', () => {
    it('should validate correct transfer', () => {
      const result = TransferStudentSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        reason: 'Changement de ville',
        transferDate: '2025-09-01',
      });
      expect(result.success).toBe(true);
    });

    it('should require reason', () => {
      const result = TransferStudentSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        transferDate: '2025-09-01',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('PromotionStudentSchema', () => {
    it('should validate promotion', () => {
      const result = PromotionStudentSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        toClassId: '123e4567-e89b-12d3-a456-426614174001',
        type: 'PROMOTION',
      });
      expect(result.success).toBe(true);
    });

    it('should validate repetition', () => {
      const result = PromotionStudentSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        toClassId: '123e4567-e89b-12d3-a456-426614174001',
        type: 'REPETITION',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('GuardianSchema', () => {
    it('should validate correct guardian', () => {
      const result = GuardianSchema.safeParse({
        name: 'Marie Dupont',
        relationship: 'PARENT',
        phone: '+22507070707',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = GuardianSchema.safeParse({ name: '', relationship: 'PARENT', phone: '+22507070707' });
      expect(result.success).toBe(false);
    });

    it('should accept all relationships', () => {
      for (const rel of ['PARENT', 'GUARDIAN', 'TUTOR', 'OTHER']) {
        const result = GuardianSchema.safeParse({ name: 'Test', relationship: rel, phone: '+22507070707' });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('MedicalSchema', () => {
    it('should validate correct medical data', () => {
      const result = MedicalSchema.safeParse({
        bloodGroup: 'A+',
        height: 150,
        weight: 45,
        allergies: ['Pollen'],
      });
      expect(result.success).toBe(true);
    });

    it('should accept empty medical data', () => {
      const result = MedicalSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });

  describe('VaccinationSchema', () => {
    it('should validate correct vaccination', () => {
      const result = VaccinationSchema.safeParse({
        vaccineName: 'COVID-19',
        dateGiven: '2025-01-15',
      });
      expect(result.success).toBe(true);
    });

    it('should require vaccine name', () => {
      const result = VaccinationSchema.safeParse({ dateGiven: '2025-01-15' });
      expect(result.success).toBe(false);
    });
  });

  describe('PhotoSchema', () => {
    it('should validate with default type', () => {
      const file = new File(['test'], 'photo.jpg', { type: 'image/jpeg' });
      const result = PhotoSchema.safeParse({ file });
      expect(result.success).toBe(true);
    });
  });

  describe('FiltersSchema', () => {
    it('should validate with defaults', () => {
      const result = FiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it('should validate custom filters', () => {
      const result = FiltersSchema.safeParse({
        search: 'test',
        status: 'ACTIVE',
        gender: 'M',
        page: 2,
        limit: 50,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('SearchSchema', () => {
    it('should validate correct search', () => {
      const result = SearchSchema.safeParse({ query: 'Jean' });
      expect(result.success).toBe(true);
    });

    it('should reject short query', () => {
      const result = SearchSchema.safeParse({ query: 'J' });
      expect(result.success).toBe(false);
    });
  });

  describe('QRCodeSchema', () => {
    it('should validate with default type', () => {
      const result = QRCodeSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('StudentCardSchema', () => {
    it('should validate with defaults', () => {
      const result = StudentCardSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('ExportSchema', () => {
    it('should validate CSV export', () => {
      const result = ExportSchema.safeParse({ format: 'CSV' });
      expect(result.success).toBe(true);
    });

    it('should validate PDF export', () => {
      const result = ExportSchema.safeParse({ format: 'PDF' });
      expect(result.success).toBe(true);
    });

    it('should accept all formats', () => {
      for (const format of ['PDF', 'EXCEL', 'CSV', 'JSON']) {
        const result = ExportSchema.safeParse({ format });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('ImportSchema', () => {
    it('should validate with CSV file', () => {
      const file = new File(['test'], 'students.csv', { type: 'text/csv' });
      const result = ImportSchema.safeParse({ file });
      expect(result.success).toBe(true);
    });
  });

  describe('TimelineSchema', () => {
    it('should validate correct timeline event', () => {
      const result = TimelineSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        type: 'CREATION',
        description: 'Création de l\'élève',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all event types', () => {
      const types = ['CREATION', 'CLASS_CHANGE', 'LEVEL_CHANGE', 'PROMOTION', 'REPETITION', 'TRANSFER', 'PAYMENT', 'ATTENDANCE', 'SANCTION', 'REWARD', 'MEDICAL', 'DOCUMENT', 'PHOTO', 'OTHER'];
      for (const type of types) {
        const result = TimelineSchema.safeParse({
          studentId: '123e4567-e89b-12d3-a456-426614174000',
          type,
          description: 'Test',
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('StatisticsSchema', () => {
    it('should validate with schoolId', () => {
      const result = StatisticsSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });
});
