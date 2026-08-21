import { SupabaseClient } from '@supabase/supabase-js';
import {
  NationalStudentId, NationalStudentIdCreate, NationalStudentIdUpdate,
  TeacherRegistry, TeacherRegistryCreate, TeacherRegistryUpdate,
  SchoolRegistry, SchoolRegistryCreate, SchoolRegistryUpdate,
  DigitalCertificate, DigitalCertificateCreate, DigitalCertificateUpdate,
  QrVerification, QrVerificationCreate, QrVerificationUpdate,
  IdentityVerification, IdentityVerificationCreate, IdentityVerificationUpdate,
  BiometricData, BiometricDataCreate, BiometricDataUpdate,
  IdentityAudit, IdentityAuditCreate, IdentityAuditUpdate,
} from '@educi/types';
import {
  GovNationalStudentIdNotFoundError,
  GovTeacherRegistryNotFoundError,
  GovSchoolRegistryNotFoundError,
  GovDigitalCertificateNotFoundError,
  GovQrVerificationNotFoundError,
  GovIdentityVerificationNotFoundError,
  GovBiometricDataNotFoundError,
  GovIdentityAuditNotFoundError,
} from '@educi/errors';

// ============================================================================
// GOV Module 6: Identity Management
// ============================================================================

export interface GOV6Repository {
  nationalStudentId: NationalStudentIdRepo;
  teacherRegistry: TeacherRegistryRepo;
  schoolRegistry: SchoolRegistryRepo;
  digitalCertificate: DigitalCertificateRepo;
  qrVerification: QrVerificationRepo;
  identityVerification: IdentityVerificationRepo;
  biometricData: BiometricDataRepo;
  identityAudit: IdentityAuditRepo;
}

export interface NationalStudentIdRepo {
  findById(schoolId: string, id: string): Promise<NationalStudentId>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<NationalStudentId[]>;
  create(schoolId: string, data: Partial<NationalStudentIdCreate>): Promise<NationalStudentId>;
  update(schoolId: string, id: string, data: Partial<NationalStudentIdCreate>): Promise<NationalStudentId>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByStudent(schoolId: string, studentId: string): Promise<NationalStudentId | null>;
  findByNationalId(schoolId: string, nationalId: string): Promise<NationalStudentId | null>;
  verify(schoolId: string, nationalId: string): Promise<NationalStudentId | null>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface TeacherRegistryRepo {
  findById(schoolId: string, id: string): Promise<TeacherRegistry>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherRegistry[]>;
  create(schoolId: string, data: Partial<TeacherRegistryCreate>): Promise<TeacherRegistry>;
  update(schoolId: string, id: string, data: Partial<TeacherRegistryCreate>): Promise<TeacherRegistry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByTeacher(schoolId: string, teacherId: string): Promise<TeacherRegistry | null>;
  findByLicenseNumber(schoolId: string, licenseNumber: string): Promise<TeacherRegistry | null>;
  verify(schoolId: string, id: string): Promise<void>;
  suspend(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface SchoolRegistryRepo {
  findById(schoolId: string, id: string): Promise<SchoolRegistry>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolRegistry[]>;
  create(schoolId: string, data: Partial<SchoolRegistryCreate>): Promise<SchoolRegistry>;
  update(schoolId: string, id: string, data: Partial<SchoolRegistryCreate>): Promise<SchoolRegistry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findBySchool(schoolId: string, schoolId_: string): Promise<SchoolRegistry | null>;
  findByRegistrationNumber(schoolId: string, registrationNumber: string): Promise<SchoolRegistry | null>;
  verify(schoolId: string, id: string): Promise<void>;
  deregister(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface DigitalCertificateRepo {
  findById(schoolId: string, id: string): Promise<DigitalCertificate>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalCertificate[]>;
  create(schoolId: string, data: Partial<DigitalCertificateCreate>): Promise<DigitalCertificate>;
  update(schoolId: string, id: string, data: Partial<DigitalCertificateCreate>): Promise<DigitalCertificate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByUser(schoolId: string, userId: string): Promise<DigitalCertificate[]>;
  findActive(schoolId: string): Promise<DigitalCertificate[]>;
  verify(schoolId: string, certificateId: string): Promise<DigitalCertificate | null>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface QrVerificationRepo {
  findById(schoolId: string, id: string): Promise<QrVerification>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<QrVerification[]>;
  create(schoolId: string, data: Partial<QrVerificationCreate>): Promise<QrVerification>;
  update(schoolId: string, id: string, data: Partial<QrVerificationCreate>): Promise<QrVerification>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCode(schoolId: string, code: string): Promise<QrVerification | null>;
  verify(schoolId: string, code: string): Promise<QrVerification | null>;
  invalidate(schoolId: string, id: string): Promise<void>;
  findActive(schoolId: string): Promise<QrVerification[]>;
}

export interface IdentityVerificationRepo {
  findById(schoolId: string, id: string): Promise<IdentityVerification>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerification[]>;
  create(schoolId: string, data: Partial<IdentityVerificationCreate>): Promise<IdentityVerification>;
  update(schoolId: string, id: string, data: Partial<IdentityVerificationCreate>): Promise<IdentityVerification>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByUser(schoolId: string, userId: string): Promise<IdentityVerification[]>;
  findByStatus(schoolId: string, status: string): Promise<IdentityVerification[]>;
  approve(schoolId: string, id: string): Promise<void>;
  reject(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface BiometricDataRepo {
  findById(schoolId: string, id: string): Promise<BiometricData>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<BiometricData[]>;
  create(schoolId: string, data: Partial<BiometricDataCreate>): Promise<BiometricData>;
  update(schoolId: string, id: string, data: Partial<BiometricDataCreate>): Promise<BiometricData>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByUser(schoolId: string, userId: string): Promise<BiometricData[]>;
  findByType(schoolId: string, type: string): Promise<BiometricData[]>;
  verify(schoolId: string, id: string): Promise<void>;
  deactivate(schoolId: string, id: string): Promise<void>;
}

export interface IdentityAuditRepo {
  findById(schoolId: string, id: string): Promise<IdentityAudit>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityAudit[]>;
  create(schoolId: string, data: Partial<IdentityAuditCreate>): Promise<IdentityAudit>;
  update(schoolId: string, id: string, data: Partial<IdentityAuditCreate>): Promise<IdentityAudit>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByUser(schoolId: string, userId: string): Promise<IdentityAudit[]>;
  findByAction(schoolId: string, action: string): Promise<IdentityAudit[]>;
}

// ============================================================================
// Factory
// ============================================================================

function makeRepo<T>(supabase: SupabaseClient, table: string, Err: new (id: string) => Error, extra: Record<string, any> = {}) {
  const base = {
    async findById(schoolId: string, id: string): Promise<T> {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new Err(id);
      return data;
    },
    async findAll(schoolId: string, filters?: Record<string, unknown>): Promise<T[]> {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
    async create(schoolId: string, data: Partial<any>): Promise<T> {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId: string, id: string, data: Partial<any>): Promise<T> {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new Err(id);
      return d;
    },
    async delete(schoolId: string, id: string): Promise<void> {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId: string): Promise<number> {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
  };
  return Object.assign(base, extra) as any;
}

export function createGOV6Repository(supabase: SupabaseClient): GOV6Repository {
  return {
    nationalStudentId: makeRepo(supabase, 'gov_national_student_ids', GovNationalStudentIdNotFoundError, {
      async findByStudent(schoolId: string, studentId: string) {
        const { data, error } = await supabase.from('gov_national_student_ids').select('*').eq('school_id', schoolId).eq('student_id', studentId).single();
        if (error) return null;
        return data;
      },
      async findByNationalId(schoolId: string, nationalId: string) {
        const { data, error } = await supabase.from('gov_national_student_ids').select('*').eq('school_id', schoolId).eq('national_id', nationalId).single();
        if (error) return null;
        return data;
      },
      async verify(schoolId: string, nationalId: string) {
        const { data, error } = await supabase.from('gov_national_student_ids').select('*').eq('school_id', schoolId).eq('national_id', nationalId).eq('status', 'active').single();
        if (error) return null;
        return data;
      },
      async revoke(schoolId: string, id: string, reason: string) {
        const { error } = await supabase.from('gov_national_student_ids').update({ status: 'revoked', revocation_reason: reason }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovNationalStudentIdNotFoundError(id);
      },
    }),
    teacherRegistry: makeRepo(supabase, 'gov_teacher_registries', GovTeacherRegistryNotFoundError, {
      async findByTeacher(schoolId: string, teacherId: string) {
        const { data, error } = await supabase.from('gov_teacher_registries').select('*').eq('school_id', schoolId).eq('teacher_id', teacherId).single();
        if (error) return null;
        return data;
      },
      async findByLicenseNumber(schoolId: string, licenseNumber: string) {
        const { data, error } = await supabase.from('gov_teacher_registries').select('*').eq('school_id', schoolId).eq('license_number', licenseNumber).single();
        if (error) return null;
        return data;
      },
      async verify(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_teacher_registries').update({ status: 'verified' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovTeacherRegistryNotFoundError(id);
      },
      async suspend(schoolId: string, id: string, reason: string) {
        const { error } = await supabase.from('gov_teacher_registries').update({ status: 'suspended', suspension_reason: reason }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovTeacherRegistryNotFoundError(id);
      },
    }),
    schoolRegistry: makeRepo(supabase, 'gov_school_registries', GovSchoolRegistryNotFoundError, {
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_school_registries').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_).single();
        if (error) return null;
        return data;
      },
      async findByRegistrationNumber(schoolId: string, registrationNumber: string) {
        const { data, error } = await supabase.from('gov_school_registries').select('*').eq('school_id', schoolId).eq('registration_number', registrationNumber).single();
        if (error) return null;
        return data;
      },
      async verify(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_school_registries').update({ status: 'verified' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovSchoolRegistryNotFoundError(id);
      },
      async deregister(schoolId: string, id: string, reason: string) {
        const { error } = await supabase.from('gov_school_registries').update({ status: 'deregistered', deregistration_reason: reason }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovSchoolRegistryNotFoundError(id);
      },
    }),
    digitalCertificate: makeRepo(supabase, 'gov_digital_certificates', GovDigitalCertificateNotFoundError, {
      async findByUser(schoolId: string, userId: string) {
        const { data, error } = await supabase.from('gov_digital_certificates').select('*').eq('school_id', schoolId).eq('user_id', userId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_digital_certificates').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async verify(schoolId: string, certificateId: string) {
        const { data, error } = await supabase.from('gov_digital_certificates').select('*').eq('school_id', schoolId).eq('id', certificateId).eq('status', 'active').single();
        if (error) return null;
        return data;
      },
      async revoke(schoolId: string, id: string, reason: string) {
        const { error } = await supabase.from('gov_digital_certificates').update({ status: 'revoked', revocation_reason: reason }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovDigitalCertificateNotFoundError(id);
      },
    }),
    qrVerification: makeRepo(supabase, 'gov_qr_verifications', GovQrVerificationNotFoundError, {
      async findByCode(schoolId: string, code: string) {
        const { data, error } = await supabase.from('gov_qr_verifications').select('*').eq('school_id', schoolId).eq('code', code).single();
        if (error) return null;
        return data;
      },
      async verify(schoolId: string, code: string) {
        const { data, error } = await supabase.from('gov_qr_verifications').select('*').eq('school_id', schoolId).eq('code', code).eq('status', 'active').single();
        if (error) return null;
        return data;
      },
      async invalidate(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_qr_verifications').update({ status: 'invalidated' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovQrVerificationNotFoundError(id);
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_qr_verifications').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
    }),
    identityVerification: makeRepo(supabase, 'gov_identity_verifications', GovIdentityVerificationNotFoundError, {
      async findByUser(schoolId: string, userId: string) {
        const { data, error } = await supabase.from('gov_identity_verifications').select('*').eq('school_id', schoolId).eq('user_id', userId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_identity_verifications').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async approve(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_identity_verifications').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovIdentityVerificationNotFoundError(id);
      },
      async reject(schoolId: string, id: string, reason: string) {
        const { error } = await supabase.from('gov_identity_verifications').update({ status: 'rejected', rejection_reason: reason }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovIdentityVerificationNotFoundError(id);
      },
    }),
    biometricData: makeRepo(supabase, 'gov_biometric_data', GovBiometricDataNotFoundError, {
      async findByUser(schoolId: string, userId: string) {
        const { data, error } = await supabase.from('gov_biometric_data').select('*').eq('school_id', schoolId).eq('user_id', userId);
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_biometric_data').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
      async verify(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_biometric_data').update({ status: 'verified' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovBiometricDataNotFoundError(id);
      },
      async deactivate(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_biometric_data').update({ status: 'deactivated' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovBiometricDataNotFoundError(id);
      },
    }),
    identityAudit: makeRepo(supabase, 'gov_identity_audits', GovIdentityAuditNotFoundError, {
      async findByUser(schoolId: string, userId: string) {
        const { data, error } = await supabase.from('gov_identity_audits').select('*').eq('school_id', schoolId).eq('user_id', userId);
        if (error) throw error;
        return data ?? [];
      },
      async findByAction(schoolId: string, action: string) {
        const { data, error } = await supabase.from('gov_identity_audits').select('*').eq('school_id', schoolId).eq('action', action);
        if (error) throw error;
        return data ?? [];
      },
    }),
  };
}
