import type { OnboardingData, BrandingConfig } from '../types';
import { SchoolLogoError } from '@educi/errors';
import { logger } from '@educi/logger';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
const MAX_SIZE = 5 * 1024 * 1024;

export class BrandingService {
  validateFile(file: File): void {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new SchoolLogoError(`Format non supporté: ${file.type}. Utilisez PNG, JPEG, WebP ou SVG`);
    }
    if (file.size > MAX_SIZE) {
      throw new SchoolLogoError(`Le fichier ne doit pas dépasser ${MAX_SIZE / 1024 / 1024}MB`);
    }
  }

  buildBrandingConfig(data: OnboardingData['branding']): BrandingConfig {
    return {
      logoUrl: data.logoUrl || undefined,
      colorPrimary: data.colorPrimary || '#1E40AF',
      colorSecondary: data.colorSecondary || '#3B82F6',
      fontPrimary: data.fontPrimary || undefined,
      faviconUrl: data.faviconUrl || undefined,
      shortName: data.shortName || undefined,
      slogan: data.slogan || undefined,
    };
  }

  getDefaultBranding(): BrandingConfig {
    return {
      colorPrimary: '#1E40AF',
      colorSecondary: '#3B82F6',
    };
  }

  async processLogo(file: File): Promise<File> {
    this.validateFile(file);
    logger.info('Processing branding logo', { fileName: file.name, size: file.size }, 'onboarding');
    return file;
  }
}
