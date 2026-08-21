'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Search, MapPin, Filter, LayoutList, Map, ChevronRight, GraduationCap, Users, Star, Building, X, Navigation, Loader2, Globe, School, TrendingUp, Heart } from 'lucide-react';

const TransportMap = dynamic(() => import('@/components/map/TransportMap'), { ssr: false });

interface School {
  id: string;
  name: string;
  code?: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  type: string;
  students: number;
  isPremium: boolean;
  isEduCI: boolean;
  rating: number;
  distance?: number;
}

const EDUCI_SCHOOLS: School[] = [];

const SCHOOL_TYPES = [
  { key: 'all', labelFr: 'Tous', labelEn: 'All' },
  { key: 'Primaire', labelFr: 'Primaire', labelEn: 'Primary' },
  { key: 'Collège', labelFr: 'Collège', labelEn: 'Middle School' },
  { key: 'Lycée', labelFr: 'Lycée', labelEn: 'High School' },
];

const DISTANCES = [
  { key: 0, labelFr: 'Toutes distances', labelEn: 'All distances' },
  { key: 5, labelFr: '5 km', labelEn: '5 km' },
  { key: 10, labelFr: '10 km', labelEn: '10 km' },
  { key: 25, labelFr: '25 km', labelEn: '25 km' },
  { key: 50, labelFr: '50 km', labelEn: '50 km' },
  { key: 100, labelFr: '100 km', labelEn: '100 km' },
  { key: 500, labelFr: '500 km', labelEn: '500 km' },
  { key: 1000, labelFr: '1000 km', labelEn: '1000 km' },
];

export default function SchoolExplorer({ lang = 'fr' }: { lang?: string }) {
  const [realSchools, setRealSchools] = useState<School[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDistance, setSelectedDistance] = useState(0);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${API_URL}/api/schools`)
      .then(r => r.json())
      .then((schools: any[]) => {
        const mapped = (schools || [])
          .filter((s: any) => s.latitude && s.longitude && s.isActive)
          .map((s: any) => ({
            id: s.id,
            name: s.name,
            code: s.code,
            address: s.address || '',
            city: s.address?.split(',')[0] || '',
            country: 'Côte d\'Ivoire',
            lat: s.latitude,
            lng: s.longitude,
            type: 'École',
            students: s._count?.students || 0,
            isPremium: false,
            isEduCI: true,
            rating: 0,
          }));
        setRealSchools(mapped);
      })
      .catch(() => {});
  }, []);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [nominatimResults, setNominatimResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [allSchools, setAllSchools] = useState<School[]>([]);
  const [nominatimSchools, setNominatimSchools] = useState<School[]>([]);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation({ lat: 5.3600, lng: -4.0083 })
      );
    } else {
      setUserLocation({ lat: 5.3600, lng: -4.0083 });
    }
  }, []);

  // Search schools via Nominatim (global)
  const searchSchoolsGlobal = async (query: string) => {
    if (query.length < 3) { setNominatimSchools([]); return; }
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ' school')}&limit=10&accept-language=fr&addressdetails=1`
      );
      const data = await res.json();
      const schools: School[] = data.map((r: any) => ({
        id: `nom-${r.place_id}`,
        name: r.display_name.split(',')[0],
        address: r.display_name,
        city: r.address?.city || r.address?.town || r.address?.village || '',
        country: r.address?.country || '',
        lat: parseFloat(r.lat),
        lng: parseFloat(r.lon),
        type: r.type || 'École',
        students: 0,
        isPremium: false,
        isEduCI: false,
        rating: 0,
      }));
      setNominatimSchools(schools);
    } catch (err) {
      console.error('Nominatim search error:', err);
    }
    setSearching(false);
  };

  // Handle search input
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchSchoolsGlobal(value);
    }, 500);
  };

  // Calculate distance (Haversine)
  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // Merge and filter schools
  const merged = [...realSchools, ...nominatimSchools];
  const filteredSchools = merged
    .filter(s => {
      if (selectedType !== 'all' && s.type !== selectedType) return false;
      if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !s.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !s.country.toLowerCase().includes(searchQuery.toLowerCase())) {
        // Keep Nominatim results even if name doesn't match (they come from search)
        if (!s.id.startsWith('nom-')) return false;
      }
      if (selectedDistance > 0 && userLocation && getDistance(userLocation.lat, userLocation.lng, s.lat, s.lng) > selectedDistance) return false;
      return true;
    })
    .map(s => ({ ...s, distance: userLocation ? getDistance(userLocation.lat, userLocation.lng, s.lat, s.lng) : 0 }))
    .sort((a, b) => {
      // EduCI schools first, then by distance
      if (a.isEduCI && !b.isEduCI) return -1;
      if (!a.isEduCI && b.isEduCI) return 1;
      return (a.distance || 0) - (b.distance || 0);
    });

  // Build markers
  const markers = filteredSchools.map(s => ({
    id: s.id,
    type: 'school' as const,
    lat: s.lat,
    lng: s.lng,
    name: s.name,
    info: `${s.isEduCI ? '🏫 EduCI' : '🌍'} ${s.type} — ${s.students > 0 ? s.students + ' élèves' : s.city}`,
  }));

  const mapCenter: [number, number] = userLocation ? [userLocation.lat, userLocation.lng] : [5.36, -4.0083];

  const eduCiCount = filteredSchools.filter(s => s.isEduCI).length;
  const totalCount = filteredSchools.length;

  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden" id="explorer">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#e2dfff] text-[#3525cd] px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Globe size={14} />
            {lang === 'fr' ? 'Explorateur mondial d\'écoles' : 'Global School Explorer'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">
            {lang === 'fr' ? 'Établissements inscrits sur EduCI' : 'Schools registered on EduCI'}
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'Retrouvez ici les établissements qui utilisent réellement EduCI. Seuls les établissements inscrits sont affichés.'
              : 'Find here the schools that actually use EduCI. Only registered schools are shown.'}
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={lang === 'fr' ? 'École, ville, pays...' : 'School, city, country...'}
              className="w-full pl-12 pr-10 py-3 bg-[#f8f9fa] rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] outline-none text-sm"
            />
            {searching && <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#3525cd]" />}
            {searchQuery && !searching && (
              <button onClick={() => { setSearchQuery(''); setNominatimSchools([]); }} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X size={16} className="text-[#6B7280]" />
              </button>
            )}
          </div>

          {/* Type filter */}
          <div className="flex gap-2 overflow-x-auto">
            {SCHOOL_TYPES.map(t => (
              <button
                key={t.key}
                onClick={() => setSelectedType(t.key)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedType === t.key
                    ? 'bg-[#3525cd] text-white shadow-md shadow-indigo-200'
                    : 'bg-[#f8f9fa] text-[#464555] hover:bg-[#e2dfff]'
                }`}
              >
                {lang === 'fr' ? t.labelFr : t.labelEn}
              </button>
            ))}
          </div>

          {/* Distance filter */}
          <select
            value={selectedDistance}
            onChange={(e) => setSelectedDistance(Number(e.target.value))}
            className="px-4 py-2.5 bg-[#f8f9fa] rounded-xl border border-slate-200 text-sm font-semibold text-[#191c1d] outline-none"
          >
            {DISTANCES.map(d => (
              <option key={d.key} value={d.key}>
                {lang === 'fr' ? d.labelFr : d.labelEn}
              </option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex bg-[#f8f9fa] rounded-xl p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`p-2.5 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-[#3525cd]' : 'text-[#6B7280]'}`}
            >
              <Map size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-[#3525cd]' : 'text-[#6B7280]'}`}
            >
              <LayoutList size={18} />
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-4 mb-4 text-sm text-[#6B7280]">
          <span className="flex items-center gap-1.5">
            <School size={14} className="text-[#3525cd]" />
            <strong className="text-[#191c1d]">{eduCiCount}</strong> {lang === 'fr' ? 'écoles EduCI' : 'EduCI schools'}
          </span>
          <span className="flex items-center gap-1.5">
            <Globe size={14} className="text-[#6B7280]" />
            <strong className="text-[#191c1d]">{totalCount}</strong> {lang === 'fr' ? 'au total' : 'total'}
          </span>
        </div>

        {/* Map / List View */}
        {viewMode === 'map' ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Map */}
            <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <TransportMap
                markers={markers}
                center={mapCenter}
                zoom={userLocation ? 10 : 5}
                height="550px"
                onMarkerClick={(m) => {
                  const school = filteredSchools.find(s => s.id === m.id);
                  if (school) setSelectedSchool(school);
                }}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-2 max-h-[550px] overflow-y-auto">
              {filteredSchools.map(school => (
                <button
                  key={school.id}
                  onClick={() => setSelectedSchool(school)}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    selectedSchool?.id === school.id
                      ? 'bg-[#e2dfff] ring-2 ring-[#3525cd]'
                      : school.isEduCI
                        ? 'bg-white border border-[#3525cd]/10 hover:shadow-md'
                        : 'bg-white border border-slate-100 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-[#191c1d] truncate">{school.name}</h4>
                        {school.isPremium && <Star size={12} className="text-amber-500 flex-shrink-0" fill="currentColor" />}
                      </div>
                      <p className="text-xs text-[#464555] truncate">{school.city}, {school.country}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-2">
                      <span className="text-xs font-bold text-[#3525cd] bg-[#e2dfff] px-2 py-0.5 rounded-full whitespace-nowrap">
                        {school.distance?.toFixed(0)} km
                      </span>
                      {school.isEduCI && (
                        <span className="text-[9px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">EDUCI</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span>{school.type}</span>
                    {school.students > 0 && <span className="flex items-center gap-1"><Users size={11} /> {school.students}</span>}
                    {school.rating > 0 && <span className="flex items-center gap-1"><Star size={11} className="text-amber-500" /> {school.rating}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchools.map(school => (
              <div key={school.id} className={`bg-white rounded-2xl p-5 border hover:shadow-lg transition-shadow ${school.isEduCI ? 'border-[#3525cd]/20' : 'border-slate-100'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${school.isPremium ? 'bg-amber-50 text-amber-600' : school.isEduCI ? 'bg-[#e2dfff] text-[#3525cd]' : 'bg-slate-100 text-slate-500'}`}>
                    <Building size={22} />
                  </div>
                  <div className="flex items-center gap-1">
                    {school.isEduCI && <span className="text-[9px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">EDUCI</span>}
                    {school.isPremium && <Star size={14} className="text-amber-500" fill="currentColor" />}
                    {school.rating > 0 && <span className="text-sm font-bold text-[#191c1d]">{school.rating}</span>}
                  </div>
                </div>
                <h3 className="font-bold text-[#191c1d] mb-1">{school.name}</h3>
                <p className="text-xs text-[#464555] mb-3 truncate">{school.address} — {school.city}, {school.country}</p>
                <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-4">
                  <span className="flex items-center gap-1"><GraduationCap size={12} /> {school.type}</span>
                  {school.students > 0 && <span className="flex items-center gap-1"><Users size={12} /> {school.students}</span>}
                  <span className="flex items-center gap-1"><Navigation size={12} /> {school.distance?.toFixed(0)} km</span>
                </div>
                <div className="flex gap-2">
                  {school.isEduCI ? (
                    <a href={`/school/${school.id.replace('e', '')}`} className="flex-1 text-center py-2 bg-[#3525cd] text-white text-xs font-bold rounded-lg hover:bg-[#4338CA] transition-colors">
                      {lang === 'fr' ? 'Voir l\'école' : 'View School'}
                    </a>
                  ) : (
                    <button className="flex-1 text-center py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">
                      {lang === 'fr' ? 'Voir sur la carte' : 'View on map'}
                    </button>
                  )}
                  <a href="/register" className="flex-1 text-center py-2 bg-[#f8f9fa] text-[#3525cd] text-xs font-bold rounded-lg hover:bg-[#e2dfff] transition-colors border border-[#3525cd]/20">
                    {lang === 'fr' ? 'S\'inscrire' : 'Register'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected School Detail Modal */}
        {selectedSchool && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSchool(null)}>
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-[#191c1d]">{selectedSchool.name}</h3>
                    {selectedSchool.isEduCI && <span className="text-[9px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">EDUCI</span>}
                  </div>
                  <p className="text-sm text-[#464555]">{selectedSchool.address}</p>
                  <p className="text-xs text-[#6B7280] mt-1">{selectedSchool.city}, {selectedSchool.country}</p>
                </div>
                <button onClick={() => setSelectedSchool(null)}>
                  <X size={20} className="text-[#6B7280]" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-[#e2dfff] rounded-xl p-3 text-center">
                  <Users size={18} className="text-[#3525cd] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#191c1d]">{selectedSchool.students || '—'}</p>
                  <p className="text-[10px] text-[#464555]">{lang === 'fr' ? 'Élèves' : 'Students'}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                  <Star size={18} className="text-amber-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#191c1d]">{selectedSchool.rating || '—'}</p>
                  <p className="text-[10px] text-[#464555]">{lang === 'fr' ? 'Note' : 'Rating'}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <Navigation size={18} className="text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#191c1d]">{selectedSchool.distance?.toFixed(0) || '—'}</p>
                  <p className="text-[10px] text-[#464555]">km</p>
                </div>
              </div>
              <div className="flex gap-3">
                {selectedSchool.isEduCI ? (
                  <a href={`/school/${selectedSchool.id.replace('e', '')}`} className="flex-1 text-center py-3 bg-[#3525cd] text-white font-bold rounded-xl hover:bg-[#4338CA] transition-colors">
                    {lang === 'fr' ? 'Voir l\'école' : 'View School'}
                  </a>
                ) : (
                  <button className="flex-1 text-center py-3 bg-slate-100 text-slate-600 font-bold rounded-xl">
                    {lang === 'fr' ? 'Bientôt disponible' : 'Coming Soon'}
                  </button>
                )}
                <a href="/register" className="flex-1 text-center py-3 bg-[#f8f9fa] text-[#3525cd] font-bold rounded-xl border border-[#3525cd]/20 hover:bg-[#e2dfff] transition-colors">
                  {lang === 'fr' ? 'S\'inscrire' : 'Register'}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
