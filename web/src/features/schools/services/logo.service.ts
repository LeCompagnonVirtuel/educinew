import { SchoolLogoError } from '@educi/errors';
import { logger } from '@educi/logger';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
const MAX_SIZE = 5 * 1024 * 1024;

export class LogoService {
  validateFile(file: File): void {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new SchoolLogoError(`Format non supporté: ${file.type}. Utilisez PNG, JPEG, WebP ou SVG`);
    }

    if (file.size > MAX_SIZE) {
      throw new SchoolLogoError(`Le fichier ne doit pas dépasser ${MAX_SIZE / 1024 / 1024}MB`);
    }
  }

  async compressImage(file: File, maxWidth = 800): Promise<File> {
    if (file.type === 'image/svg+xml') return file;

    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: file.type }));
            } else {
              resolve(file);
            }
          },
          file.type,
          0.8
        );
      };

      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  }

  getOptimalDimensions(type: 'logo' | 'logo_icon' | 'logo_favicon' | 'logo_dark'): { width: number; height: number } {
    const dimensions: Record<string, { width: number; height: number }> = {
      logo: { width: 400, height: 400 },
      logo_icon: { width: 200, height: 200 },
      logo_favicon: { width: 64, height: 64 },
      logo_dark: { width: 400, height: 400 },
    };
    return dimensions[type] || dimensions.logo;
  }

  async processLogo(file: File, type: 'logo' | 'logo_icon' | 'logo_favicon' | 'logo_dark' = 'logo'): Promise<File> {
    this.validateFile(file);
    const dims = this.getOptimalDimensions(type);
    logger.info('Processing logo', { type, originalSize: file.size, targetWidth: dims.width }, 'schools');
    return this.compressImage(file, dims.width);
  }
}
