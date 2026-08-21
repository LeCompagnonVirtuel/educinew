'use client';

import { createContext, useContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import { translations, TranslationKeys } from '@/lib/translations';

type TranslationProxy = TranslationKeys & ((path: string) => string | undefined);

function createTranslationProxy(translationsObj: Record<string, unknown>): TranslationProxy {
  const fn = (path: string): string | undefined => {
    return path.split('.').reduce((obj: unknown, key: string) => {
      if (obj && typeof obj === 'object' && key in obj) {
        return (obj as Record<string, unknown>)[key];
      }
      return undefined;
    }, translationsObj) as string | undefined;
  };
  return new Proxy(fn, {
    get: (_target, prop: string) => {
      const value = (translationsObj as Record<string, unknown>)[prop];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return createTranslationProxy(value as Record<string, unknown>);
      }
      return value;
    },
    apply: (_target, _thisArg, args) => {
      return args[0].split('.').reduce((obj: unknown, key: string) => {
        if (obj && typeof obj === 'object' && key in obj) {
          return (obj as Record<string, unknown>)[key];
        }
        return undefined;
      }, translationsObj);
    },
  }) as unknown as TranslationProxy;
}

type Lang = 'fr' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationProxy;
}

function getTranslations(lang: Lang): TranslationProxy {
  const rawT = (translations as Record<string, unknown>)[lang] || (translations as Record<string, unknown>).fr;
  return createTranslationProxy(rawT as Record<string, unknown>);
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  t: getTranslations('fr'),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('educi_lang') as Lang | null;
    if (stored && (stored === 'fr' || stored === 'en')) {
      setLangState(stored);
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('educi_lang', newLang);
    }
  }, []);

  const t = useMemo(() => getTranslations(lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context || !context.t) {
    return { lang: 'fr' as const, setLang: () => {}, t: getTranslations('fr') };
  }
  return context;
}
