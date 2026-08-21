import { describe, it, expect } from 'vitest';
import { BrandingService } from '@/features/onboarding/services/branding.service';
import type { OnboardingData } from '@/features/onboarding/types';

describe('BrandingService', () => {
  const service = new BrandingService();

  it('should build branding config from data', () => {
    const branding = service.buildBrandingConfig({
      colorPrimary: '#FF0000',
      colorSecondary: '#00FF00',
      shortName: 'ECOLE',
      slogan: 'L\'avenir commence ici',
    });
    expect(branding.colorPrimary).toBe('#FF0000');
    expect(branding.colorSecondary).toBe('#00FF00');
    expect(branding.shortName).toBe('ECOLE');
    expect(branding.slogan).toBe('L\'avenir commence ici');
  });

  it('should return default branding', () => {
    const branding = service.getDefaultBranding();
    expect(branding.colorPrimary).toBe('#1E40AF');
    expect(branding.colorSecondary).toBe('#3B82F6');
  });

  it('should handle empty branding data', () => {
    const branding = service.buildBrandingConfig({ colorPrimary: '#1E40AF', colorSecondary: '#3B82F6' });
    expect(branding.colorPrimary).toBe('#1E40AF');
    expect(branding.colorSecondary).toBe('#3B82F6');
  });

  it('should process valid logo file', async () => {
    const file = new File(['test'], 'logo.png', { type: 'image/png' });
    const result = await service.processLogo(file);
    expect(result).toBe(file);
  });

  it('should reject invalid file type', () => {
    const file = new File(['test'], 'logo.exe', { type: 'application/exe' });
    expect(() => service.validateFile(file)).toThrow();
  });

  it('should reject oversized file', () => {
    const largeContent = new Uint8Array(6 * 1024 * 1024);
    const file = new File([largeContent], 'large.png', { type: 'image/png' });
    expect(() => service.validateFile(file)).toThrow();
  });
});
