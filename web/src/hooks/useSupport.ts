'use client';

import { supportConfig, getSupportEmailLink, getSupportWhatsappLink, getSupportPhoneLink } from '@/lib/support';

export function useSupport() {
  return {
    config: supportConfig,
    phone: supportConfig.phoneDisplay,
    phoneLink: getSupportPhoneLink(),
    whatsapp: supportConfig.whatsappDisplay,
    whatsappLink: getSupportWhatsappLink(),
    email: supportConfig.emails.support,
    emailLink: getSupportEmailLink(),
    emailSecondary: supportConfig.emails.platform,
    location: supportConfig.location.full,
    mapsLink: supportConfig.location.mapsLink,
    helpCenter: supportConfig.helpCenter,
    contactPage: supportConfig.contactPage,
  };
}
