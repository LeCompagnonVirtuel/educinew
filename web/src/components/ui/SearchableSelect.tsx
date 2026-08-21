'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, X, Check } from 'lucide-react';

interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  allowCustom?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function SearchableSelect({
  options, value, onChange, placeholder = 'Sélectionner...', label, error, required, allowCustom = false, icon, disabled = false
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => { if (open && searchRef.current) searchRef.current.focus(); }, [open]);

  const filtered = useMemo(() => {
    if (!search) return options;
    return options.filter(o => o.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setOpen(false);
    setSearch('');
  };

  const handleCustom = () => {
    if (search && allowCustom) {
      onChange(search);
      setOpen(false);
      setSearch('');
    }
  };

  const displayValue = open ? search : (value || '');

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10">{icon}</div>}
        <input
          ref={inputRef}
          value={displayValue}
          onChange={e => { setSearch(e.target.value); setOpen(true); }}
          onFocus={() => { setFocused(true); setOpen(true); setSearch(''); }}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-10 h-[52px] bg-white rounded-xl border-2 transition-all duration-200 outline-none text-slate-900 text-sm ${
            disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''
          } ${error ? 'border-red-300' : focused ? 'border-[#4F46E5]' : 'border-slate-200 hover:border-slate-300'}`}
        />
        <ChevronDown size={14} className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>

      {open && !disabled && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
          {options.length > 5 && (
            <div className="p-2 border-b border-slate-100">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchRef}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-8 pr-8 py-2 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:border-[#4F46E5] outline-none"
                />
                {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2"><X size={12} className="text-slate-400" /></button>}
              </div>
            </div>
          )}
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 && allowCustom ? (
              <button
                type="button"
                onMouseDown={handleCustom}
                className="w-full px-4 py-3 text-left text-sm text-[#4F46E5] hover:bg-indigo-50 font-medium"
              >
                + Utiliser &quot;{search}&quot;
              </button>
            ) : filtered.length === 0 ? (
              <div className="py-6 text-center">
                <p className="text-sm text-slate-400">Aucun résultat</p>
              </div>
            ) : (
              filtered.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onMouseDown={() => handleSelect(opt)}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-indigo-50 transition-colors ${
                    opt === value ? 'bg-indigo-50 font-semibold text-indigo-700' : 'text-slate-700'
                  }`}
                >
                  <span className="flex-1 truncate">{opt}</span>
                  {opt === value && <Check size={14} className="text-indigo-500 shrink-0" />}
                </button>
              ))
            )}
          </div>
          {options.length > 0 && (
            <div className="px-4 py-1.5 border-t border-slate-100 bg-slate-50">
              <p className="text-[10px] text-slate-400 text-center">{filtered.length} option{filtered.length > 1 ? 's' : ''}</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
