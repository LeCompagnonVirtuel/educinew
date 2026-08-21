'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import RoleLayout from '@/components/layout/RoleLayout';
import NominatimSearch from '@/components/map/NominatimSearch';
import { useLanguage } from '@/hooks/useLanguage';
import { sbSchools } from '@/lib/api';
import { Building, MapPin, Users, GraduationCap, Phone, Mail, Navigation, Loader2 } from 'lucide-react';

const TransportMap = dynamic(() => import('@/components/map/TransportMap'), { ssr: false });

interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  lat: number;
  lng: number;
  students: number;
  teachers: number;
  phone: string;
  email: string;
}

export default function SchoolMapPage() {
  const { lang } = useLanguage();
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await sbSchools.list();
        const mapped: School[] = (data || []).map((s: any, i: number) => ({
          id: s.id,
          name: s.name || 'École',
          code: s.code || `EDU-${s.id?.slice(0, 4)}`,
          address: s.address || 'Non défini',
          lat: s.latitude || 5.36 + (i * 0.02),
          lng: s.longitude || -4.01 + (i * 0.01),
          students: s.studentCount || 0,
          teachers: s.teacherCount || 0,
          phone: s.phone || '-',
          email: s.email || '-',
        }));
        setSchools(mapped);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const markers = schools.map(s => ({
    id: s.id,
    type: 'school' as const,
    lat: s.lat,
    lng: s.lng,
    name: s.name,
    info: `${s.code} — ${s.students} élèves`,
  }));

  const handleSearchSelect = (result: { name: string; lat: number; lng: number }) => {};

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: lang === 'fr' ? 'Établissements' : 'Schools' }, { label: lang === 'fr' ? 'Carte' : 'Map' }]}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-80 space-y-4">
          <NominatimSearch
            placeholder={lang === 'fr' ? 'Rechercher un établissement...' : 'Search school...'}
            onSelect={handleSearchSelect}
          />

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Building size={18} className="text-[#3525cd]" />
              <h3 className="font-bold text-[#191c1d]">{lang === 'fr' ? 'Établissements' : 'Schools'}</h3>
              <span className="ml-auto bg-[#e2dfff] text-[#3525cd] text-xs font-bold px-2 py-0.5 rounded-full">{schools.length}</span>
            </div>
            {loading ? (
              <div className="text-center py-8"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></div>
            ) : (
              <div className="space-y-2">
                {schools.map(school => (
                  <button
                    key={school.id}
                    onClick={() => setSelectedSchool(school)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      selectedSchool?.id === school.id ? 'bg-[#e2dfff] ring-1 ring-[#3525cd]' : 'bg-[#f8f9fa] hover:bg-slate-100'
                    }`}
                  >
                    <p className="text-sm font-bold text-[#191c1d] truncate">{school.name}</p>
                    <p className="text-xs text-[#464555]">{school.code}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1"><Users size={12} /> {school.students}</span>
                      <span className="flex items-center gap-1"><GraduationCap size={12} /> {school.teachers}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <TransportMap
            markers={markers}
            center={[5.34, -4.02]}
            zoom={11}
            height={selectedSchool ? '400px' : 'calc(100vh - 200px)'}
            onMarkerClick={(m) => {
              const school = schools.find(s => s.id === m.id);
              if (school) setSelectedSchool(school);
            }}
          />

          {selectedSchool && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#191c1d]">{selectedSchool.name}</h2>
                  <p className="text-sm text-[#464555] mt-1">{selectedSchool.code}</p>
                </div>
                <div className="bg-[#e2dfff] px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-[#3525cd]">{selectedSchool.address}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Users, label: lang === 'fr' ? 'Élèves' : 'Students', value: selectedSchool.students, color: 'bg-blue-50 text-blue-600' },
                  { icon: GraduationCap, label: lang === 'fr' ? 'Enseignants' : 'Teachers', value: selectedSchool.teachers, color: 'bg-green-50 text-green-600' },
                  { icon: Phone, label: lang === 'fr' ? 'Téléphone' : 'Phone', value: selectedSchool.phone, color: 'bg-amber-50 text-amber-600' },
                  { icon: Mail, label: 'Email', value: selectedSchool.email, color: 'bg-purple-50 text-purple-600' },
                ].map((stat, i) => (
                  <div key={i} className={`p-3 rounded-xl ${stat.color.split(' ')[0]}`}>
                    <stat.icon size={18} className={stat.color.split(' ')[1]} />
                    <p className="text-xs font-bold text-[#464555] mt-1">{stat.label}</p>
                    <p className="text-sm font-bold text-[#191c1d] truncate">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleLayout>
  );
}
