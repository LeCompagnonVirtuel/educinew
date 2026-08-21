import {
  GestcrpDLPPolicyError,
  GestcrpDLPIncidentError,
  GestcrpEncryptionKeyError,
  GestcrpDataRetentionPolicyError,
  GestcrpDataMaskingError,
} from '@educi/errors';
import {
  createDLPPolicySchema,
  updateDLPPolicySchema,
  createEncryptionKeySchema,
  updateEncryptionKeySchema,
} from '../validators';
import type {
  GestcrpDLPPolicy,
  GestcrpDLPIncident,
  GestcrpEncryptionKey,
  GestcrpDataRetentionPolicy,
  GestcrpDataMaskingRule,
  DataSecurityRepository,
} from '../repositories/data-security-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// Data Security & DLP Service
// ============================================================================

export class DataSecurityService extends BaseGestcrpService {
  constructor(
    private readonly dataSecurityRepo: DataSecurityRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── DLP Policies ────────────────────────────────────────────────────────

  async listDLPPolicies(schoolId: string, params: PaginationParams = {}): Promise<PaginatedResult<GestcrpDLPPolicy>> {
    this.validateSchoolId(schoolId);
    return this.dataSecurityRepo.dlpPolicies.findAll(schoolId, this.validatePagination(params));
  }

  async getDLPPolicy(schoolId: string, id: string): Promise<GestcrpDLPPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique DLP');
    return this.ensureExists(this.dataSecurityRepo.dlpPolicies, id, schoolId, 'Politique DLP');
  }

  async getActiveDLPPolicies(schoolId: string): Promise<PaginatedResult<GestcrpDLPPolicy>> {
    this.validateSchoolId(schoolId);
    return this.dataSecurityRepo.findActiveDLPPolicies(schoolId);
  }

  async createDLPPolicy(schoolId: string, data: Record<string, unknown>): Promise<GestcrpDLPPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'policy_type', 'data_classification', 'actions', 'severity', 'applies_to'], 'Politique DLP');
    this.validateEnum(data.applies_to as string, ['UPLOAD', 'DOWNLOAD', 'EMAIL', 'PRINT', 'COPY', 'TRANSFER', 'ALL'] as const, 'applies_to', 'Politique DLP');
    const validated = this.validateSchema(createDLPPolicySchema, data, 'Politique DLP');
    const existing = await this.dataSecurityRepo.dlpPolicies.findAll(schoolId, { name: validated.name, limit: 1 });
    if (existing.total > 0) throw new GestcrpDLPPolicyError(`Une politique DLP "${validated.name}" existe déjà`);
    return this.dataSecurityRepo.dlpPolicies.create({
      name: validated.name, description: validated.description, enabled: validated.enabled ?? true,
      policy_type: validated.policy_type, data_classification: validated.data_classification,
      patterns: validated.patterns ?? [], actions: validated.actions, exclusions: validated.exclusions ?? [],
      severity: validated.severity, notification_channels: validated.notification_channels ?? [], applies_to: validated.applies_to,
    }, schoolId);
  }

  async updateDLPPolicy(schoolId: string, id: string, data: Record<string, unknown>): Promise<GestcrpDLPPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique DLP');
    const existing = await this.ensureExists(this.dataSecurityRepo.dlpPolicies, id, schoolId, 'Politique DLP');
    this.validateOwnership(existing, schoolId, 'Politique DLP');
    return this.dataSecurityRepo.dlpPolicies.update(id, schoolId, this.validateSchema(updateDLPPolicySchema, data, 'Politique DLP'));
  }

  async deleteDLPPolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique DLP');
    const existing = await this.ensureExists(this.dataSecurityRepo.dlpPolicies, id, schoolId, 'Politique DLP');
    this.validateOwnership(existing, schoolId, 'Politique DLP');
    await this.dataSecurityRepo.dlpPolicies.softDelete(id, schoolId);
  }

  async toggleDLPPolicy(schoolId: string, id: string, enabled: boolean): Promise<GestcrpDLPPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique DLP');
    const existing = await this.ensureExists(this.dataSecurityRepo.dlpPolicies, id, schoolId, 'Politique DLP');
    this.validateOwnership(existing, schoolId, 'Politique DLP');
    return this.dataSecurityRepo.dlpPolicies.update(id, schoolId, { enabled });
  }

  // ─── DLP Incidents ──────────────────────────────────────────────────────

  async listDLPIncidents(schoolId: string, params: PaginationParams = {}): Promise<PaginatedResult<GestcrpDLPIncident>> {
    this.validateSchoolId(schoolId);
    return this.dataSecurityRepo.dlpIncidents.findAll(schoolId, this.validatePagination(params));
  }

  async getDLPIncident(schoolId: string, id: string): Promise<GestcrpDLPIncident> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Incident DLP');
    return this.ensureExists(this.dataSecurityRepo.dlpIncidents, id, schoolId, 'Incident DLP');
  }

  async getUnreviewedIncidents(schoolId: string, params: PaginationParams = {}): Promise<PaginatedResult<GestcrpDLPIncident>> {
    this.validateSchoolId(schoolId);
    return this.dataSecurityRepo.findUnreviewedIncidents(schoolId, params);
  }

  async createDLPIncident(schoolId: string, data: Record<string, unknown>): Promise<GestcrpDLPIncident> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['policy_id', 'user_id', 'action', 'data_classification', 'source', 'destination', 'content_preview'], 'Incident DLP');
    const policyExists = await this.dataSecurityRepo.dlpPolicies.exists(data.policy_id as string, schoolId);
    if (!policyExists) throw new GestcrpDLPPolicyError(`Politique DLP (${data.policy_id}) introuvable`);
    return this.dataSecurityRepo.dlpIncidents.create({
      policy_id: data.policy_id as string, user_id: data.user_id as string, action: data.action as string,
      data_classification: data.data_classification as string,
      matched_patterns: (data.matched_patterns as Record<string, unknown>[]) ?? [],
      source: data.source as string, destination: data.destination as string,
      file_name: data.file_name as string, file_size: data.file_size as number, file_type: data.file_type as string,
      content_preview: data.content_preview as string, blocked: (data.blocked as boolean) ?? false,
      encrypted: (data.encrypted as boolean) ?? false, watermarked: (data.watermarked as boolean) ?? false,
      notified: (data.notified as boolean) ?? false, timestamp: (data.timestamp as string) ?? new Date().toISOString(),
    }, schoolId);
  }

  async reviewDLPIncident(schoolId: string, id: string, reviewerId: string, disposition: 'TRUE_POSITIVE' | 'FALSE_POSITIVE' | 'ACCEPTED_RISK'): Promise<GestcrpDLPIncident> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Incident DLP');
    this.validateId(reviewerId, 'Réviseur');
    this.validateEnum(disposition, ['TRUE_POSITIVE', 'FALSE_POSITIVE', 'ACCEPTED_RISK'] as const, 'disposition', 'Incident DLP');
    const existing = await this.ensureExists(this.dataSecurityRepo.dlpIncidents, id, schoolId, 'Incident DLP');
    this.validateOwnership(existing, schoolId, 'Incident DLP');
    if (existing.reviewed_by) throw new GestcrpDLPIncidentError('Cet incident DLP a déjà été revu');
    return this.dataSecurityRepo.dlpIncidents.update(id, schoolId, { reviewed_by: reviewerId, reviewed_at: new Date().toISOString(), disposition });
  }

  // ─── Encryption Keys ─────────────────────────────────────────────────────

  async listEncryptionKeys(schoolId: string, params: PaginationParams = {}): Promise<PaginatedResult<GestcrpEncryptionKey>> {
    this.validateSchoolId(schoolId);
    return this.dataSecurityRepo.encryptionKeys.findAll(schoolId, this.validatePagination(params));
  }

  async getEncryptionKey(schoolId: string, id: string): Promise<GestcrpEncryptionKey> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Clé de chiffrement');
    return this.ensureExists(this.dataSecurityRepo.encryptionKeys, id, schoolId, 'Clé de chiffrement');
  }

  async getActiveEncryptionKeys(schoolId: string): Promise<PaginatedResult<GestcrpEncryptionKey>> {
    this.validateSchoolId(schoolId);
    return this.dataSecurityRepo.findActiveEncryptionKeys(schoolId);
  }

  async createEncryptionKey(schoolId: string, data: Record<string, unknown>): Promise<GestcrpEncryptionKey> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'algorithm', 'size', 'purpose', 'fingerprint', 'encrypted_private_key'], 'Clé de chiffrement');
    this.validateEnum(data.purpose as string, ['ENCRYPTION', 'SIGNING', 'HMAC', 'KEY_EXCHANGE', 'BACKUP'] as const, 'purpose', 'Clé de chiffrement');
    this.validateRange(data.size as number, 128, 4096, 'size', 'Clé de chiffrement');
    const validated = this.validateSchema(createEncryptionKeySchema, data, 'Clé de chiffrement');
    const existing = await this.dataSecurityRepo.encryptionKeys.findAll(schoolId, { name: validated.name, limit: 1 });
    if (existing.total > 0) throw new GestcrpEncryptionKeyError(`Une clé "${validated.name}" existe déjà`);
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    return this.dataSecurityRepo.encryptionKeys.create({
      name: validated.name, algorithm: validated.algorithm, size: validated.size, purpose: validated.purpose,
      status: 'ACTIVE', fingerprint: validated.fingerprint, public_key: validated.public_key,
      encrypted_private_key: validated.encrypted_private_key, key_version: 1, expires_at: expiresAt.toISOString(),
    }, schoolId);
  }

  async rotateEncryptionKey(schoolId: string, id: string): Promise<GestcrpEncryptionKey> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Clé de chiffrement');
    const existing = await this.ensureExists(this.dataSecurityRepo.encryptionKeys, id, schoolId, 'Clé de chiffrement');
    this.validateOwnership(existing, schoolId, 'Clé de chiffrement');
    if (existing.status === 'REVOKED') throw new GestcrpEncryptionKeyError('Une clé révoquée ne peut pas être rotée');
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    return this.dataSecurityRepo.encryptionKeys.update(id, schoolId, { status: 'ACTIVE', key_version: existing.key_version + 1, rotated_at: new Date().toISOString(), expires_at: expiresAt.toISOString() });
  }

  async revokeEncryptionKey(schoolId: string, id: string): Promise<GestcrpEncryptionKey> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Clé de chiffrement');
    const existing = await this.ensureExists(this.dataSecurityRepo.encryptionKeys, id, schoolId, 'Clé de chiffrement');
    this.validateOwnership(existing, schoolId, 'Clé de chiffrement');
    return this.dataSecurityRepo.encryptionKeys.update(id, schoolId, { status: 'REVOKED' });
  }

  // ─── Retention Policies ──────────────────────────────────────────────────

  async listRetentionPolicies(schoolId: string, params: PaginationParams = {}): Promise<PaginatedResult<GestcrpDataRetentionPolicy>> {
    this.validateSchoolId(schoolId);
    return this.dataSecurityRepo.retentionPolicies.findAll(schoolId, this.validatePagination(params));
  }

  async getRetentionPolicy(schoolId: string, id: string): Promise<GestcrpDataRetentionPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de rétention');
    return this.ensureExists(this.dataSecurityRepo.retentionPolicies, id, schoolId, 'Politique de rétention');
  }

  async createRetentionPolicy(schoolId: string, data: Record<string, unknown>): Promise<GestcrpDataRetentionPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'data_classification', 'retention_days', 'deletion_method'], 'Politique de rétention');
    this.validateEnum(data.deletion_method as string, ['SECURE_DELETE', 'CRYPTO_SHREDDING', 'PHYSICAL_DESTRUCTION'] as const, 'deletion_method', 'Politique de rétention');
    this.validateRange(data.retention_days as number, 1, 36500, 'retention_days', 'Politique de rétention');
    const existing = await this.dataSecurityRepo.retentionPolicies.findAll(schoolId, { name: data.name as string, limit: 1 });
    if (existing.total > 0) throw new GestcrpDataRetentionPolicyError(`Une politique "${data.name}" existe déjà`);
    return this.dataSecurityRepo.retentionPolicies.create({
      name: data.name as string, description: data.description as string, enabled: (data.enabled as boolean) ?? true,
      data_classification: data.data_classification as string[], retention_days: data.retention_days as number,
      archive_before_deletion: (data.archive_before_deletion as boolean) ?? false, archive_duration_days: data.archive_duration_days as number,
      deletion_method: data.deletion_method as GestcrpDataRetentionPolicy['deletion_method'],
      exceptions: (data.exceptions as string[]) ?? [], compliance_frameworks: (data.compliance_frameworks as string[]) ?? [],
    }, schoolId);
  }

  async updateRetentionPolicy(schoolId: string, id: string, data: Record<string, unknown>): Promise<GestcrpDataRetentionPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de rétention');
    const existing = await this.ensureExists(this.dataSecurityRepo.retentionPolicies, id, schoolId, 'Politique de rétention');
    this.validateOwnership(existing, schoolId, 'Politique de rétention');
    return this.dataSecurityRepo.retentionPolicies.update(id, schoolId, data);
  }

  async deleteRetentionPolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de rétention');
    const existing = await this.ensureExists(this.dataSecurityRepo.retentionPolicies, id, schoolId, 'Politique de rétention');
    this.validateOwnership(existing, schoolId, 'Politique de rétention');
    await this.dataSecurityRepo.retentionPolicies.softDelete(id, schoolId);
  }

  // ─── Masking Rules ───────────────────────────────────────────────────────

  async listMaskingRules(schoolId: string, params: PaginationParams = {}): Promise<PaginatedResult<GestcrpDataMaskingRule>> {
    this.validateSchoolId(schoolId);
    return this.dataSecurityRepo.maskingRules.findAll(schoolId, this.validatePagination(params));
  }

  async getMaskingRule(schoolId: string, id: string): Promise<GestcrpDataMaskingRule> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Règle de masquage');
    return this.ensureExists(this.dataSecurityRepo.maskingRules, id, schoolId, 'Règle de masquage');
  }

  async createMaskingRule(schoolId: string, data: Record<string, unknown>): Promise<GestcrpDataMaskingRule> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'field_patterns', 'masking_type', 'applies_to'], 'Règle de masquage');
    this.validateEnum(data.masking_type as string, ['FULL', 'PARTIAL', 'TOKEN', 'HASH', 'FORMAT_PRESERVING', 'REDACTION'] as const, 'masking_type', 'Règle de masquage');
    const existing = await this.dataSecurityRepo.maskingRules.findAll(schoolId, { name: data.name as string, limit: 1 });
    if (existing.total > 0) throw new GestcrpDataMaskingError(`Une règle "${data.name}" existe déjà`);
    return this.dataSecurityRepo.maskingRules.create({
      name: data.name as string, description: data.description as string, enabled: (data.enabled as boolean) ?? true,
      field_patterns: data.field_patterns as string[], masking_type: data.masking_type as GestcrpDataMaskingRule['masking_type'],
      mask_char: (data.mask_char as string) ?? '*', preserve_length: (data.preserve_length as boolean) ?? true,
      tokenization_key: data.tokenization_key as string, applies_to: data.applies_to as string[],
    }, schoolId);
  }

  async updateMaskingRule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GestcrpDataMaskingRule> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Règle de masquage');
    const existing = await this.ensureExists(this.dataSecurityRepo.maskingRules, id, schoolId, 'Règle de masquage');
    this.validateOwnership(existing, schoolId, 'Règle de masquage');
    return this.dataSecurityRepo.maskingRules.update(id, schoolId, data);
  }

  async deleteMaskingRule(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Règle de masquage');
    const existing = await this.ensureExists(this.dataSecurityRepo.maskingRules, id, schoolId, 'Règle de masquage');
    this.validateOwnership(existing, schoolId, 'Règle de masquage');
    await this.dataSecurityRepo.maskingRules.softDelete(id, schoolId);
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getDLPStats(schoolId: string): Promise<{
    totalPolicies: number;
    activePolicies: number;
    totalIncidents: number;
    unreviewedIncidents: number;
    blockedCount: number;
    byClassification: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);
    const [policies, incidents] = await Promise.all([
      this.dataSecurityRepo.dlpPolicies.findAll(schoolId, { limit: 1000 }),
      this.dataSecurityRepo.dlpIncidents.findAll(schoolId, { limit: 1000 }),
    ]);
    const activePolicies = policies.data.filter((p) => p.enabled).length;
    const unreviewedIncidents = incidents.data.filter((i) => !i.reviewed_by).length;
    const blockedCount = incidents.data.filter((i) => i.blocked).length;
    const byClassification: Record<string, number> = {};
    for (const incident of incidents.data) {
      byClassification[incident.data_classification] = (byClassification[incident.data_classification] ?? 0) + 1;
    }
    return { totalPolicies: policies.total, activePolicies, totalIncidents: incidents.total, unreviewedIncidents, blockedCount, byClassification };
  }

  async getEncryptionKeyStats(schoolId: string): Promise<{
    total: number;
    active: number;
    rotating: number;
    deprecated: number;
    revoked: number;
    expired: number;
  }> {
    this.validateSchoolId(schoolId);
    const all = await this.dataSecurityRepo.encryptionKeys.findAll(schoolId, { limit: 1000 });
    return {
      total: all.total,
      active: all.data.filter((k) => k.status === 'ACTIVE').length,
      rotating: all.data.filter((k) => k.status === 'ROTATING').length,
      deprecated: all.data.filter((k) => k.status === 'DEPRECATED').length,
      revoked: all.data.filter((k) => k.status === 'REVOKED').length,
      expired: all.data.filter((k) => k.status === 'EXPIRED').length,
    };
  }
}
