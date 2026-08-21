'use client';

import { useState } from 'react';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import { MapPin, Globe, Navigation } from 'lucide-react';
import CountrySelect from '@/components/ui/CountrySelect';
import CitySelect from '@/components/ui/CitySelect';

const inputClass = (field: string, focused: string) =>
  `w-full px-4 py-3.5 bg-white rounded-xl border-2 transition-all duration-300 outline-none text-slate-900 text-[15px]
   ${focused === field ? 'border-[#4F46E5] bg-white shadow-sm shadow-[#4F46E5]/5' : 'border-slate-200 hover:border-slate-300'}`;

const labelClass = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2';

export default function StepLocation() {
  const { data, updateLocation, nextStep } = useOnboarding();
  const [focused, setFocused] = useState('');

  return (
    <StepCard
      title="Localisation"
      subtitle="Où se trouve votre établissement ? Les parents et élèves pourront vous trouver."
      icon="📍"
      onNext={nextStep}
      canProceed={!!(data.location.city && data.location.region)}
    >
      <div className="space-y-5">
        {/* Country */}
        <div>
          <label className={labelClass}>Pays</label>
          <CountrySelect
            value={data.location.country}
            onChange={(country) => updateLocation({ country: country.nameFr })}
          />
        </div>

        {/* Region + City */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Région / Département</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={data.location.region}
                onChange={(e) => updateLocation({ region: e.target.value })}
                onFocus={() => setFocused('region')} onBlur={() => setFocused('')}
                className={inputClass('region', focused) + ' pl-11'}
                placeholder="Lagunes"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Ville</label>
            <CitySelect
              country={{ nameFr: data.location.country } as any}
              value={data.location.city}
              onChange={(city) => updateLocation({ city })}
            />
          </div>
        </div>

        {/* Commune + Quarter */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Commune</label>
            <input
              value={data.location.commune}
              onChange={(e) => updateLocation({ commune: e.target.value })}
              onFocus={() => setFocused('commune')} onBlur={() => setFocused('')}
              className={inputClass('commune', focused)}
              placeholder="Cocody"
            />
          </div>
          <div>
            <label className={labelClass}>Quartier</label>
            <input
              value={data.location.quarter}
              onChange={(e) => updateLocation({ quarter: e.target.value })}
              onFocus={() => setFocused('quarter')} onBlur={() => setFocused('')}
              className={inputClass('quarter', focused)}
              placeholder="Deux Plateaux"
            />
          </div>
        </div>

        {/* Full Address */}
        <div>
          <label className={labelClass}>Adresse complète</label>
          <input
            value={data.location.fullAddress}
            onChange={(e) => updateLocation({ fullAddress: e.target.value })}
            onFocus={() => setFocused('address')} onBlur={() => setFocused('')}
            className={inputClass('address', focused)}
            placeholder="Boulevard de la République, face au parc..."
          />
        </div>

        {/* GPS Coordinates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Latitude</label>
            <div className="relative">
              <Navigation size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                step="any"
                value={data.location.latitude}
                onChange={(e) => updateLocation({ latitude: parseFloat(e.target.value) || 0 })}
                onFocus={() => setFocused('lat')} onBlur={() => setFocused('')}
                className={inputClass('lat', focused) + ' pl-11'}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Longitude</label>
            <div className="relative">
              <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                step="any"
                value={data.location.longitude}
                onChange={(e) => updateLocation({ longitude: parseFloat(e.target.value) || 0 })}
                onFocus={() => setFocused('lng')} onBlur={() => setFocused('')}
                className={inputClass('lng', focused) + ' pl-11'}
              />
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="rounded-xl overflow-hidden border border-slate-200 h-48 bg-slate-100 relative">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.location.longitude - 0.01}%2C${data.location.latitude - 0.01}%2C${data.location.longitude + 0.01}%2C${data.location.latitude + 0.01}&layer=mapnik&marker=${data.location.latitude}%2C${data.location.longitude}`}
            style={{ border: 0 }}
          />
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-slate-600">
            {data.location.latitude.toFixed(4)}, {data.location.longitude.toFixed(4)}
          </div>
        </div>
      </div>
    </StepCard>
  );
}
