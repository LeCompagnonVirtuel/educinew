'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}

interface NominatimSearchProps {
  placeholder?: string;
  onSelect: (result: { name: string; lat: number; lng: number }) => void;
  className?: string;
}

export default function NominatimSearch({ placeholder = 'Rechercher une adresse...', onSelect, className = '' }: NominatimSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const search = async (q: string) => {
    if (q.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&accept-language=fr&countrycodes=ci`
      );
      const data = await res.json();
      setResults(data);
      setShowResults(true);
    } catch (err) {
      console.error('Nominatim search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 500);
  };

  const handleSelect = (result: SearchResult) => {
    const name = result.display_name.split(',').slice(0, 2).join(',').trim();
    setQuery(name);
    setShowResults(false);
    onSelect({ name, lat: parseFloat(result.lat), lng: parseFloat(result.lon) });
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 border border-slate-200 shadow-sm">
        <Search size={18} className="text-[#6B7280] flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder={placeholder}
          className="flex-1 py-3 bg-transparent outline-none text-sm text-[#191c1d]"
        />
        {loading && <Loader2 size={16} className="animate-spin text-[#3525cd]" />}
        {query && !loading && (
          <button onClick={() => { setQuery(''); setResults([]); setShowResults(false); }}>
            <X size={16} className="text-[#6B7280]" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 max-h-64 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.place_id}
              onClick={() => handleSelect(result)}
              className="w-full flex items-start gap-3 p-3 text-left hover:bg-[#f8f9fa] transition-colors"
            >
              <MapPin size={16} className="text-[#3525cd] flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#191c1d] truncate">
                  {result.display_name.split(',').slice(0, 2).join(',')}
                </p>
                <p className="text-xs text-[#6B7280] truncate">
                  {result.display_name.split(',').slice(2).join(',')}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
