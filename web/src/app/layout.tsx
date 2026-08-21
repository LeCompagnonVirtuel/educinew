import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'EduCI — Gestion scolaire intelligente pour l\'Afrique',
  description: 'Plateforme tout-en-un : presences, notes, bulletins, paiements Mobile Money, communication parents, IA pedagogique. Essai gratuit 30 jours.',
  keywords: ['gestion scolaire', 'ecole', 'Cote d\'Ivoire', 'Afrique', 'Mobile Money', 'bulletin', 'presence', 'EduCI'],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo-icon.svg', sizes: '32x32' },
    ],
    apple: '/logo-icon.svg',
  },
  openGraph: {
    title: 'EduCI — Gestion scolaire intelligente',
    description: 'La plateforme qui connecte etablissements, enseignants, parents et eleves.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F77F00',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
