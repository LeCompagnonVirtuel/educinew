import { useMemo } from 'react';
import { useBranding } from '@/components/branding/BrandingProvider';
import type { BrandingOptions } from '@/lib/export-utils';

/**
 * Returns BrandingOptions derived from the current school branding,
 * ready to pass into exportToFile() for branded PDFs.
 */
export function useExportBranding(): BrandingOptions {
  const { branding } = useBranding();

  return useMemo(() => {
    if (!branding) return {};
    return {
      primaryColor: branding.color_primary,
      secondaryColor: branding.color_secondary,
      schoolName: branding.commercial_name || branding.official_name || undefined,
      logoUrl: branding.logo_url || undefined,
    };
  }, [branding]);
}
