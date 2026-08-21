import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocBrandingNotFoundError,
  DocBrandingUpdateError,
  DocBrandingPresetError,
  DocBrandingPreviewError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createBrandingService(repository: DocumentRepositoryEnterprise) {
  return {
    async getBrandingConfig(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching branding config', { schoolId, userId }, 'BrandingService');

        const config = await repository.getBrandingConfig(schoolId);

        logger.info('Branding config fetched successfully', { schoolId }, 'BrandingService');

        return config;
      } catch (error) {
        logger.error('Failed to fetch branding config', { schoolId, error }, 'BrandingService');
        throw error;
      }
    },

    async updateBrandingConfig(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('branding data is required');

        logger.info('Updating branding config', { schoolId, userId }, 'BrandingService');

        const config = await repository.updateBrandingConfig(schoolId, userId, data);

        logger.info('Branding config updated successfully', { schoolId }, 'BrandingService');

        return config;
      } catch (error) {
        logger.error('Failed to update branding config', { schoolId, error }, 'BrandingService');
        throw error;
      }
    },

    async getBrandingPresets(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching branding presets', { schoolId, userId }, 'BrandingService');

        const presets = await repository.getBrandingPresets(schoolId);

        logger.info('Branding presets fetched successfully', { schoolId, count: presets.length }, 'BrandingService');

        return presets;
      } catch (error) {
        logger.error('Failed to fetch branding presets', { schoolId, error }, 'BrandingService');
        throw error;
      }
    },

    async applyBrandingPreset(schoolId: string, presetId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!presetId) throw new DocValidationError('presetId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Applying branding preset', { schoolId, presetId, userId }, 'BrandingService');

        const presets = await repository.getBrandingPresets(schoolId);
        const preset = presets.find((p: { id: string }) => p.id === presetId);
        if (!preset) throw new DocBrandingPresetError(`Preset ${presetId} not found`);

        const config = await repository.applyBrandingPreset(schoolId, presetId);

        logger.info('Branding preset applied successfully', { schoolId, presetId }, 'BrandingService');

        return config;
      } catch (error) {
        logger.error('Failed to apply branding preset', { schoolId, presetId, error }, 'BrandingService');
        throw error;
      }
    },

    async getBrandingPreview(schoolId: string, userId: string, documentId?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching branding preview', { schoolId, userId, documentId }, 'BrandingService');

        const config = await repository.getBrandingConfig(schoolId);
        if (!config) throw new DocBrandingNotFoundError(schoolId);

        const preview = {
          schoolId,
          documentId,
          branding: config,
          previewUrl: `/api/documents/branding/preview`,
        };

        logger.info('Branding preview generated', { schoolId }, 'BrandingService');

        return preview;
      } catch (error) {
        logger.error('Failed to generate branding preview', { schoolId, error }, 'BrandingService');
        throw error;
      }
    },

    async getBrandingStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching branding stats', { schoolId, userId }, 'BrandingService');

        const config = await repository.getBrandingConfig(schoolId);
        const presets = await repository.getBrandingPresets(schoolId);
        const stats = {
          hasCustomBranding: !!config,
          totalPresets: presets.length,
          activePreset: config ? (config as unknown as Record<string, unknown>).activePreset || null : null,
        };

        logger.info('Branding stats fetched', { schoolId }, 'BrandingService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch branding stats', { schoolId, error }, 'BrandingService');
        throw error;
      }
    },
  };
}
