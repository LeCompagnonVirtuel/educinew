import { Linking } from 'react-native';

export const SUPPORT = {
  phone: '+2250504292778',
  phoneDisplay: '+225 05 04 29 27 78',
  whatsapp: '+2250706693038',
  whatsappDisplay: '+225 07 06 69 30 38',
  whatsappLink: 'https://wa.me/2250706693038',
  emails: {
    support: 'support@educi.live',
    platform: 'plateformeeduci@gmail.com',
  },
  location: {
    country: "Côte d'Ivoire",
    city: 'Abidjan',
    full: 'Abidjan, Côte d\'Ivoire',
    mapsLink: 'https://www.google.com/maps/place/Abidjan',
  },
  brand: {
    name: 'EduCI',
    tagline: 'L\'école connectée',
  },
} as const;

export function callSupport() {
  Linking.openURL(`tel:${SUPPORT.phone}`);
}

export function openWhatsApp(message?: string) {
  const msg = message || 'Bonjour, j\'ai besoin d\'aide avec EduCI.';
  const url = `${SUPPORT.whatsappLink}?text=${encodeURIComponent(msg)}`;
  Linking.openURL(url);
}

export function emailSupport(subject?: string) {
  let url = `mailto:${SUPPORT.emails.support}`;
  if (subject) url += `?subject=${encodeURIComponent(subject)}`;
  Linking.openURL(url);
}

export function openMaps() {
  Linking.openURL(SUPPORT.location.mapsLink);
}
