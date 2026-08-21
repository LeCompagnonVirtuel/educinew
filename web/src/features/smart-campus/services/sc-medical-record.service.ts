import type { SupabaseClient } from '@supabase/supabase-js';
import type { MedicalRecord, MedicalRecordCreate, MedicalRecordUpdate } from '@educi/types';
import { ScMedicalRecordNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMedicalRecordService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getMedicalRecord(schoolId: string, id: string): Promise<MedicalRecord> {
    const record = await this.repo.findMedicalRecordById(schoolId, id);
    if (!record) throw new ScMedicalRecordNotFoundError(id);
    return record;
  }

  async listMedicalRecords(schoolId: string, filters?: Record<string, unknown>): Promise<MedicalRecord[]> {
    return this.repo.findAllMedicalRecords(schoolId, filters);
  }

  async createMedicalRecord(schoolId: string, data: MedicalRecordCreate): Promise<MedicalRecord> {
    return this.repo.createMedicalRecord(schoolId, data);
  }

  async updateMedicalRecord(schoolId: string, id: string, data: MedicalRecordUpdate): Promise<MedicalRecord> {
    const existing = await this.repo.findMedicalRecordById(schoolId, id);
    if (!existing) throw new ScMedicalRecordNotFoundError(id);
    return this.repo.updateMedicalRecord(schoolId, id, data);
  }

  async deleteMedicalRecord(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMedicalRecordById(schoolId, id);
    if (!existing) throw new ScMedicalRecordNotFoundError(id);
    return this.repo.deleteMedicalRecord(schoolId, id);
  }

  async findByStudentId(schoolId: string, studentId: string): Promise<MedicalRecord | null> {
    return this.repo.findMedicalRecordByStudentId(schoolId, studentId);
  }

  async findWithAllergies(schoolId: string): Promise<MedicalRecord[]> {
    return this.repo.findMedicalRecordsWithAllergies(schoolId);
  }

  async countMedicalRecords(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMedicalRecords(schoolId, filters);
  }
}
