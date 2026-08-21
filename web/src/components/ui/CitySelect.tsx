'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, MapPin } from 'lucide-react';
import { type AfricanCountry } from '@/lib/data/african-countries';

interface CitySelectProps {
  country: AfricanCountry;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function CitySelect({ country, value, onChange, className = '' }: CitySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [customCity, setCustomCity] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const allCities = country.regions.flatMap(r => r.cities.map(c => c.name));
  const uniqueCities = [...new Set(allCities)];
  const isCustom = value && !uniqueCities.includes(value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  const filtered = uniqueCities.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (city: string) => {
    onChange(city);
    setOpen(false);
    setSearch('');
    setCustomCity('');
  };

  const handleCustomSubmit = () => {
    if (customCity.trim()) {
      onChange(customCity.trim());
      setOpen(false);
      setSearch('');
      setCustomCity('');
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-4 bg-white rounded-xl border-2 border-slate-200 hover:border-slate-300 focus:border-[#4F46E5] outline-none transition-all duration-200 text-left"
      >
        <MapPin size={18} className="text-slate-400 flex-shrink-0" />
        <span className={`flex-1 text-[15px] ${value ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
          {value || 'Sélectionnez une ville'}
        </span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-slide-up">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Villes en ${country.nameFr}...`}
                className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:border-[#4F46E5] focus:bg-white outline-none transition-all"
              />
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto overscroll-contain">
            {filtered.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleSelect(city)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-indigo-50 transition-colors ${
                  value === city ? 'bg-indigo-50' : ''
                }`}
              >
                <MapPin size={14} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-900">{city}</span>
                {value === city && (
                  <div className="w-2 h-2 rounded-full bg-[#4F46E5] ml-auto" />
                )}
              </button>
            ))}
            {filtered.length === 0 && !search && (
              <p className="py-3 text-center text-sm text-slate-400">Aucune ville disponible</p>
            )}
          </div>

          {/* Custom city input */}
          <div className="p-2 border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                placeholder="Autre ville..."
                className="flex-1 px-3 py-2 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:border-[#4F46E5] focus:bg-white outline-none transition-all"
              />
              <button
                type="button"
                onClick={handleCustomSubmit}
                disabled={!customCity.trim()}
                className="px-3 py-2 text-sm font-medium text-[#4F46E5] bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-40"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
