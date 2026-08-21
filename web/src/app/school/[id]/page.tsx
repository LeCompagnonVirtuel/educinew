import { notFound } from 'next/navigation';
import PublicSchoolClient from './PublicSchoolClient';

const SCHOOLS: Record<string, any> = {
  '1': { id: '1', name: 'Lycée Classique d\'Abidjan', code: 'EDUCI-CI-ABJ-1024', address: 'Cocody, Abidjan', city: 'Abidjan', lat: 5.3600, lng: -4.0083, type: 'Lycée', students: 1250, teachers: 45, isPremium: true, rating: 4.8, phone: '+225 27 22 44 00', email: 'contact@lycee-classique.ci', description: 'Un des meilleurs lycées de Côte d\'Ivoire, offrant une éducation de qualité depuis 1960.', programs: ['Sciences', 'Lettres', 'Économie', 'Technique'] },
  '2': { id: '2', name: 'Collège Notre Dame d\'Afrique', code: 'EDUCI-CI-ABJ-2048', address: 'Plateau, Abidjan', city: 'Abidjan', lat: 5.3167, lng: -4.0167, type: 'Collège', students: 890, teachers: 32, isPremium: true, rating: 4.6, phone: '+225 27 22 11 00', email: 'contact@notredame.ci', description: 'Collège catholique réputé pour son excellence académique.', programs: ['Général', 'Arts', 'Sports'] },
  '3': { id: '3', name: 'Groupe Scolaire Les Palmiers', code: 'EDUCI-CI-ABJ-3072', address: 'Yopougon, Abidjan', city: 'Abidjan', lat: 5.3200, lng: -4.0500, type: 'Primaire', students: 650, teachers: 28, isPremium: false, rating: 4.3, phone: '+225 27 34 55 00', email: 'info@palmiers.ci', description: 'École primaire moderne avec programmes enrichis.', programs: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'] },
  '4': { id: '4', name: 'École Primaire de Marcory', code: 'EDUCI-CI-ABJ-4096', address: 'Marcory, Abidjan', city: 'Abidjan', lat: 5.3050, lng: -3.9900, type: 'Primaire', students: 420, teachers: 18, isPremium: false, rating: 4.1, phone: '+225 27 25 66 00', email: 'direction@ep-marcory.ci', description: 'École publique de qualité au cœur de Marcory.', programs: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'] },
  '5': { id: '5', name: 'Lycée Technique Yamoussoukro', code: 'EDUCI-CI-YAK-5120', address: 'Yamoussoukro', city: 'Yamoussoukro', lat: 6.8276, lng: -5.2893, type: 'Lycée', students: 980, teachers: 38, isPremium: true, rating: 4.5, phone: '+225 30 64 77 00', email: 'contact@lt-yak.ci', description: 'Lycée technique de référence dans la capitale politique.', programs: ['Sciences', 'Technique', 'Agriculture'] },
  '6': { id: '6', name: 'Institut Sainte Marie', code: 'EDUCI-CI-ABJ-6144', address: 'Bingerville, Abidjan', city: 'Abidjan', lat: 5.3500, lng: -3.8900, type: 'Collège', students: 560, teachers: 22, isPremium: false, rating: 4.2, phone: '+225 27 28 99 00', email: 'info@ism-bingerville.ci', description: 'Collège privé avec internat et activités extrascolaires.', programs: ['6ème', '5ème', '4ème', '3ème'] },
  '7': { id: '7', name: 'École Internationale d\'Abidjan', code: 'EDUCI-CI-ABJ-7168', address: 'Riviera, Abidjan', city: 'Abidjan', lat: 5.3700, lng: -3.9800, type: 'Lycée', students: 1100, teachers: 52, isPremium: true, rating: 4.9, phone: '+225 27 30 11 00', email: 'admissions@eia-ci.com', description: 'École internationale avec programmes bilingues français-anglais.', programs: ['Bac Français', 'Bac International', 'IB'] },
  '8': { id: '8', name: 'Collège Moderne de Bouaké', code: 'EDUCI-CI-BKE-8192', address: 'Bouaké', city: 'Bouaké', lat: 7.6900, lng: -5.0300, type: 'Collège', students: 780, teachers: 30, isPremium: false, rating: 4.0, phone: '+225 31 63 22 00', email: 'cmoderne@bouake.ci', description: 'Collège moderne au cœur de la deuxième ville de Côte d\'Ivoire.', programs: ['Général', 'Technique'] },
};

export default function PublicSchoolPage({ params }: { params: { id: string } }) {
  const school = SCHOOLS[params.id];
  if (!school) notFound();
  return <PublicSchoolClient school={school} />;
}
