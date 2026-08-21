export const supportConfig = {
  phone: '+2250504292778',
  phoneDisplay: '+225 05 04 29 27 78',
  phoneLink: 'tel:+2250504292778',

  whatsapp: '+2250706693038',
  whatsappDisplay: '+225 07 06 69 30 38',
  whatsappLink: 'https://wa.me/2250706693038',
  whatsappMessage: encodeURIComponent('Bonjour, j\'ai besoin d\'aide avec EduCI.'),

  emails: {
    support: 'support@educi.live',
    platform: 'plateformeeduci@gmail.com',
  },

  location: {
    country: "Côte d'Ivoire",
    city: 'Abidjan',
    full: 'Abidjan, Côte d\'Ivoire',
    gps: { lat: 5.3600, lng: -4.0083 },
    mapsLink: 'https://www.google.com/maps/place/Abidjan',
  },

  social: {
    website: 'https://educi.live',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  },

  brand: {
    name: 'EduCI',
    tagline: 'L\'école connectée',
    fullName: 'EduCI — Plateforme de gestion scolaire',
  },

  helpCenter: '/help',
  contactPage: '/contact',
  statusPage: '/status',
} as const;

export type SupportConfig = typeof supportConfig;

export function getSupportEmailLink(subject?: string): string {
  const base = `mailto:${supportConfig.emails.support}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

export function getSupportWhatsappLink(message?: string): string {
  const msg = message ? encodeURIComponent(message) : supportConfig.whatsappMessage;
  return `${supportConfig.whatsappLink}?text=${msg}`;
}

export function getSupportPhoneLink(): string {
  return supportConfig.phoneLink;
}
