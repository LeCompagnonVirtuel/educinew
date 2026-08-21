'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, MapPin, Navigation, Check, AlertCircle, Loader2, Building2, Globe, Locate } from 'lucide-react';
import CountrySelect from '@/components/ui/CountrySelect';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { africanCountries, getCountryByNameFr, type AfricanCountry } from '@/lib/data/african-countries';

export default function StepLocation() {
  const { data, updateLocation, nextStep, prevStep } = useRegistration();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [selectedCountry, setSelectedCountry] = useState<AfricanCountry | null>(
    () => getCountryByNameFr(data.location.country) || null
  );
  const [geolocating, setGeolocating] = useState(false);
  const loc = data.location;

  // Derived data
  const regions = useMemo(() => selectedCountry?.regions.map(r => r.name) || [], [selectedCountry]);
  const selectedRegion = useMemo(() => selectedCountry?.regions.find(r => r.name === loc.region), [selectedCountry, loc.region]);
  const cities = useMemo(() => selectedRegion?.cities.map(c => c.name) || [], [selectedRegion]);
  const selectedCity = useMemo(() => selectedRegion?.cities.find(c => c.name === loc.city), [selectedRegion, loc.city]);
  const communes = useMemo(() => selectedCity?.communes || [], [selectedCity]);
  const quarters = useMemo(() => {
    if (!selectedCity?.quarters || !loc.commune) return [];
    return selectedCity.quarters[loc.commune] || [];
  }, [selectedCity, loc.commune]);

  // Validation
  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!loc.country) errs.country = 'Pays requis';
    if (!loc.city || loc.city.length < 2) errs.city = 'Ville requise';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [loc.country, loc.city]);

  useEffect(() => {
    if (Object.keys(touched).length > 0) validate();
  }, [loc, touched, validate]);

  const markTouched = (field: string) => setTouched(prev => ({ ...prev, [field]: true }));

  // Handlers
  const handleCountryChange = (country: AfricanCountry) => {
    setSelectedCountry(country);
    updateLocation({ country: country.nameFr, region: '', city: '', commune: '', quarter: '' });
    markTouched('country');
  };

  const handleRegionChange = (region: string) => {
    updateLocation({ region, city: '', commune: '', quarter: '' });
    markTouched('region');
  };

  const handleCityChange = (city: string) => {
    updateLocation({ city, commune: '', quarter: '' });
    markTouched('city');
  };

  const handleCommuneChange = (commune: string) => {
    updateLocation({ commune, quarter: '' });
    markTouched('commune');
  };

  const handleGeolocate = async () => {
    if (!navigator.geolocation) return;
    setGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        updateLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        // Try reverse geocoding
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&accept-language=fr`);
          const data = await res.json();
          if (data.address) {
            const city = data.address.city || data.address.town || data.address.village || '';
            const country = data.address.country || '';
            const found = africanCountries.find(c => c.nameFr === country || c.name === country);
            if (found) {
              setSelectedCountry(found);
              updateLocation({ country: found.nameFr, city });
            }
          }
        } catch {}
        setGeolocating(false);
      },
      () => setGeolocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleNext = () => {
    setTouched({ country: true, city: true });
    if (validate()) nextStep();
  };

  // Validation indicators
  const fieldStatus = (field: string, value: string | undefined) => {
    if (!touched[field]) return null;
    if (errors[field]) return 'error';
    if (value && value.length >= 2) return 'valid';
    return null;
  };

  const StatusIcon = ({ status }: { status: string | null }) => {
    if (status === 'valid') return <Check size={14} className="text-emerald-500" />;
    if (status === 'error') return <AlertCircle size={14} className="text-red-400" />;
    return null;
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Localisation</h2>
        <p className="text-sm text-slate-500">Où se trouve votre établissement ?</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Globe size={12} /> <span>Pays</span>
        <span className="text-slate-200">→</span>
        <MapPin size={12} /> <span>Région</span>
        <span className="text-slate-200">→</span>
        <Building2 size={12} /> <span>Ville</span>
        <span className="text-slate-200">→</span>
        <MapPin size={12} /> <span>Commune</span>
      </div>

      {/* Country */}
      <div className="relative">
        <CountrySelect value={loc.country || ''} onChange={handleCountryChange} />
        {fieldStatus('country', loc.country) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2"><StatusIcon status={fieldStatus('country', loc.country)} /></div>
        )}
      </div>

      {/* Region + City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <SearchableSelect
            options={regions}
            value={loc.region || ''}
            onChange={handleRegionChange}
            placeholder={selectedCountry ? `Région de ${selectedCountry.nameFr}` : 'Sélectionner d\'abord un pays'}
            label="Région / District"
            icon={<MapPin size={16} className="text-slate-400" />}
            disabled={!selectedCountry}
            allowCustom
          />
        </div>
        <div className="relative">
          <SearchableSelect
            options={cities}
            value={loc.city || ''}
            onChange={handleCityChange}
            placeholder={loc.region ? `Ville de ${loc.region}` : 'Sélectionner d\'abord une région'}
            label="Ville *"
            error={errors.city}
            required
            icon={<Building2 size={16} className="text-slate-400" />}
            disabled={!loc.region}
            allowCustom
          />
        </div>
      </div>

      {/* Commune + Quarter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SearchableSelect
          options={communes}
          value={loc.commune || ''}
          onChange={handleCommuneChange}
          placeholder={loc.city ? `Commune de ${loc.city}` : 'Sélectionner d\'abord une ville'}
          label="Commune"
          icon={<MapPin size={16} className="text-slate-400" />}
          disabled={!loc.city}
          allowCustom
        />
        <SearchableSelect
          options={quarters}
          value={loc.quarter || ''}
          onChange={v => { updateLocation({ quarter: v }); markTouched('quarter'); }}
          placeholder={loc.commune ? `Quartier de ${loc.commune}` : 'Sélectionner d\'abord une commune'}
          label="Quartier"
          icon={<MapPin size={16} className="text-slate-400" />}
          disabled={!loc.commune}
          allowCustom
        />
      </div>

      {/* Postal code + Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Code postal</label>
          <input
            value={loc.postalCode || ''}
            onChange={e => updateLocation({ postalCode: e.target.value })}
            className="w-full px-4 py-3.5 bg-white rounded-xl border-2 border-slate-200 focus:border-[#4F46E5] outline-none text-sm transition-all"
            placeholder={selectedCountry?.code === 'CI' ? '00225' : 'Code postal'}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Adresse complète</label>
          <input
            value={loc.fullAddress || ''}
            onChange={e => updateLocation({ fullAddress: e.target.value })}
            className="w-full px-4 py-3.5 bg-white rounded-xl border-2 border-slate-200 focus:border-[#4F46E5] outline-none text-sm transition-all"
            placeholder="123 Rue de l'Éducation"
          />
        </div>
      </div>

      {/* GPS + Geolocation */}
      <div className="p-4 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Coordonnées GPS</label>
          <button
            onClick={handleGeolocate}
            disabled={geolocating}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#4F46E5] text-white rounded-lg text-xs font-semibold hover:bg-[#4338CA] transition-all disabled:opacity-50"
          >
            {geolocating ? <Loader2 size={12} className="animate-spin" /> : <Locate size={12} />}
            {geolocating ? 'Localisation...' : 'Utiliser ma position'}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              value={loc.latitude || ''}
              onChange={e => updateLocation({ latitude: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2.5 bg-white rounded-lg border border-slate-200 focus:border-[#4F46E5] outline-none text-sm font-mono"
              placeholder="5.3600"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              value={loc.longitude || ''}
              onChange={e => updateLocation({ longitude: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2.5 bg-white rounded-lg border border-slate-200 focus:border-[#4F46E5] outline-none text-sm font-mono"
              placeholder="-4.0083"
            />
          </div>
        </div>
        {(loc.latitude !== 0 || loc.longitude !== 0) && loc.latitude && loc.longitude && (
          <div className="mt-2 p-2 bg-white rounded-lg border border-slate-100">
            <a
              href={`https://www.openstreetmap.org/?mlat=${loc.latitude}&mlon=${loc.longitude}#map=16/${loc.latitude}/${loc.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#4F46E5] hover:underline flex items-center gap-1"
            >
              <MapPin size={10} /> Voir sur la carte
            </a>
          </div>
        )}
      </div>

      {/* Selected country info */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100"
          >
            <span className="text-3xl">{selectedCountry.flag}</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">{selectedCountry.nameFr}</p>
              <p className="text-xs text-slate-500">
                {selectedCountry.dialCode} • {selectedCountry.regions.length} régions • {selectedCountry.regions.reduce((sum, r) => sum + r.cities.length, 0)} villes
              </p>
            </div>
            <Check size={16} className="text-emerald-500" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <button onClick={prevStep} className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Retour
        </button>
        <button onClick={handleNext} className="flex-[2] py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all group">
          Continuer <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
