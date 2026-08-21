import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createLicenseService(repo: EnterpriseRepositoryExtended) {
  return {
    async findLicenses(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findLicenses(enterpriseId, filters);
    },

    async findLicenseById(enterpriseId: string, licenseId: string) {
      if (!enterpriseId || !licenseId) throw new AppError('Identifiants requis');
      const license = await repo.findLicenseById(enterpriseId, licenseId);
      if (!license) throw new AppError('Licence non trouvée');
      return license;
    },

    async createLicense(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.key) throw new AppError('La clé de licence est requise');
      if (!data?.type) throw new AppError('Le type de licence est requis');
      return repo.createLicense({ ...data, enterprise_id: enterpriseId });
    },

    async updateLicense(enterpriseId: string, licenseId: string, data: any) {
      if (!enterpriseId || !licenseId) throw new AppError('Identifiants requis');
      const existing = await repo.findLicenseById(enterpriseId, licenseId);
      if (!existing) throw new AppError('Licence non trouvée');
      return repo.updateLicense(enterpriseId, licenseId, data);
    },

    async deleteLicense(enterpriseId: string, licenseId: string) {
      if (!enterpriseId || !licenseId) throw new AppError('Identifiants requis');
      const existing = await repo.findLicenseById(enterpriseId, licenseId);
      if (!existing) throw new AppError('Licence non trouvée');
      return repo.deleteLicense(enterpriseId, licenseId);
    },

    async activateLicense(enterpriseId: string, licenseId: string) {
      if (!enterpriseId || !licenseId) throw new AppError('Identifiants requis');
      const existing = await repo.findLicenseById(enterpriseId, licenseId);
      if (!existing) throw new AppError('Licence non trouvée');
      return repo.activateLicense(enterpriseId, licenseId);
    },

    async revokeLicense(enterpriseId: string, licenseId: string, reason?: string) {
      if (!enterpriseId || !licenseId) throw new AppError('Identifiants requis');
      const existing = await repo.findLicenseById(enterpriseId, licenseId);
      if (!existing) throw new AppError('Licence non trouvée');
      return repo.revokeLicense(enterpriseId, licenseId, reason);
    },

    async validateLicense(enterpriseId: string, licenseId: string) {
      if (!enterpriseId || !licenseId) throw new AppError('Identifiants requis');
      const existing = await repo.findLicenseById(enterpriseId, licenseId);
      if (!existing) throw new AppError('Licence non trouvée');
      return repo.validateLicense(enterpriseId, licenseId);
    },

    async renewLicense(enterpriseId: string, licenseId: string) {
      if (!enterpriseId || !licenseId) throw new AppError('Identifiants requis');
      const existing = await repo.findLicenseById(enterpriseId, licenseId);
      if (!existing) throw new AppError('Licence non trouvée');
      return repo.renewLicense(enterpriseId, licenseId);
    },
  };
}
