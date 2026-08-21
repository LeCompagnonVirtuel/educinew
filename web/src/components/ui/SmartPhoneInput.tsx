'use client';

import { useState, useRef, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { ChevronDown, Search, X, Phone, Check, AlertCircle } from 'lucide-react';
import { africanCountries, type AfricanCountry } from '@/lib/data/african-countries';

interface SmartPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode?: string;
  onCountryChange?: (country: AfricanCountry) => void;
  error?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function SmartPhoneInput({
  value, onChange, countryCode = 'CI', onCountryChange, error, label = 'Téléphone', placeholder, required
}: SmartPhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState<AfricanCountry>(
    () => africanCountries.find(c => c.code === countryCode) || africanCountries[0]
  );
  const [focused, setFocused] = useState(false);
  const [valid, setValid] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const found = africanCountries.find(c => c.code === countryCode);
    if (found && found.code !== country.code) setCountry(found);
  }, [countryCode]);

  useEffect(() => {
    if (value) {
      const digits = value.replace(/\D/g, '');
      setValid(digits.length >= 7 && digits.length <= country.phoneLength + 2);
    } else {
      setValid(null);
    }
  }, [value, country.phoneLength]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { if (open && searchRef.current) searchRef.current.focus(); }, [open]);

  const filtered = africanCountries.filter(c =>
    c.nameFr.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dialCode.includes(search)
  );

  const handleSelect = (c: AfricanCountry) => {
    setCountry(c);
    setOpen(false);
    setSearch('');
    if (onCountryChange) onCountryChange(c);
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/[^\d\s\-]/g, '');
    onChange(digits);
  };

  const statusIcon = valid === true ? <Check size={14} className="text-emerald-500" /> :
    valid === false ? <AlertCircle size={14} className="text-red-400" /> : null;

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        {/* Country selector button */}
        <button
          type="button"
          onClick={() => { setOpen(!open); setSearch(''); }}
          className="flex items-center gap-2 px-3 h-[52px] bg-white rounded-xl border-2 border-slate-200 hover:border-indigo-300 focus:border-[#4F46E5] outline-none transition-all shrink-0"
        >
          <ReactCountryFlag countryCode={country.code} svg style={{ width: '20px', height: '20px', borderRadius: '3px' }} />
          <span className="text-sm font-semibold text-slate-600">{country.dialCode}</span>
          <ChevronDown size={12} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {/* Phone input */}
        <div className="relative flex-1">
          <Phone size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${focused ? 'text-[#4F46E5]' : 'text-slate-400'}`} />
          <input
            ref={inputRef}
            type="tel"
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder || `0${'1'.repeat(country.phoneLength - 1)}`}
            maxLength={country.phoneLength + 3}
            className={`w-full pl-10 pr-10 h-[52px] bg-white rounded-xl border-2 transition-all duration-200 outline-none text-slate-900 text-sm ${
              error ? 'border-red-300' : valid === true ? 'border-emerald-300' : focused ? 'border-[#4F46E5]' : 'border-slate-200 hover:border-slate-300'
            }`}
          />
          {statusIcon && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{statusIcon}</div>}
        </div>
      </div>

      {/* Country dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-2.5 border-b border-slate-100">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un pays..."
                className="w-full pl-8 pr-8 py-2 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:border-[#4F46E5] outline-none"
              />
              {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2"><X size={12} className="text-slate-400" /></button>}
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleSelect(c)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-indigo-50 transition-colors ${
                  c.code === country.code ? 'bg-indigo-50' : ''
                }`}
              >
                <ReactCountryFlag countryCode={c.code} svg style={{ width: '22px', height: '22px', borderRadius: '3px' }} />
                <span className="flex-1 text-sm font-medium text-slate-800">{c.nameFr}</span>
                <span className="text-xs font-semibold text-slate-500">{c.dialCode}</span>
              </button>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50">
            <p className="text-[10px] text-slate-400 text-center">{filtered.length} pays</p>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} />{error}</p>}
    </div>
  );
}
