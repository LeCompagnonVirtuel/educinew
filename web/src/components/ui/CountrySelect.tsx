'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { ChevronDown, Search, X } from 'lucide-react';
import { africanCountries, defaultCountry, type AfricanCountry } from '@/lib/data/african-countries';

interface CountrySelectProps {
  value: string;
  onChange: (country: AfricanCountry) => void;
  className?: string;
}

export default function CountrySelect({ value, onChange, className = '' }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<AfricanCountry>(defaultCountry);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const found = africanCountries.find(c => c.nameFr === value || c.name === value || c.code === value);
    if (found) setSelected(found);
  }, [value]);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setSearch('');
    setHighlightedIndex(-1);
  }, []);

  const openDropdown = useCallback(() => {
    setOpen(true);
    setHighlightedIndex(-1);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDropdown]);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [search]);

  const filtered = africanCountries.filter(c =>
    c.nameFr.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dialCode.includes(search) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
          handleSelect(filtered[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        closeDropdown();
        buttonRef.current?.focus();
        break;
      case 'Home':
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setHighlightedIndex(filtered.length - 1);
        break;
    }
  };

  const handleSelect = (country: AfricanCountry) => {
    setSelected(country);
    closeDropdown();
    onChange(country);
    buttonRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => open ? closeDropdown() : openDropdown()}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Pays sélectionné: ${selected.nameFr}`}
        className="w-full flex items-center gap-3 px-4 h-[52px] bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none transition-all duration-200 text-left"
      >
        <ReactCountryFlag
          countryCode={selected.code}
          svg
          style={{ width: '24px', height: '24px', borderRadius: '4px' }}
          title={selected.nameFr}
        />
        <span className="flex-1 text-[15px] font-semibold text-slate-800 dark:text-slate-200 truncate">
          {selected.nameFr}
        </span>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 tabular-nums">
          {selected.dialCode}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 dark:text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Sélectionner un pays"
          className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-2xl shadow-slate-200/60 dark:shadow-slate-900/60 overflow-hidden animate-dropdown-open origin-top"
        >
          {/* Search */}
          <div className="p-2.5 border-b border-slate-100 dark:border-slate-700">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher un pays..."
                aria-label="Rechercher un pays"
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 focus:border-[#4F46E5] focus:bg-white dark:focus:bg-slate-600 outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  aria-label="Effacer la recherche"
                >
                  <X size={12} className="text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {/* Country list */}
          <div ref={listRef} className="max-h-72 overflow-y-auto overscroll-contain scroll-smooth" role="presentation">
            {filtered.length === 0 ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <Search size={20} className="text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Aucun pays trouvé</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Essayez un autre nom ou indicatif</p>
              </div>
            ) : (
              filtered.map((country, index) => {
                const isSelected = selected.code === country.code;
                const isHighlighted = index === highlightedIndex;

                return (
                  <button
                    key={country.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(country)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-100 ${
                      isHighlighted
                        ? 'bg-indigo-50 dark:bg-indigo-900/30'
                        : isSelected
                          ? 'bg-indigo-50/60 dark:bg-indigo-900/20'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      style={{ width: '26px', height: '26px', borderRadius: '4px' }}
                      title={country.nameFr}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${isSelected ? 'font-semibold text-indigo-700 dark:text-indigo-300' : 'font-medium text-slate-800 dark:text-slate-200'}`}>
                        {country.nameFr}
                      </p>
                    </div>
                    <span className={`text-sm tabular-nums ${isSelected ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'font-medium text-slate-500 dark:text-slate-400'}`}>
                      {country.dialCode}
                    </span>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-[#4F46E5] dark:bg-indigo-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer count */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-750">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
              {filtered.length} pays disponible{filtered.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
