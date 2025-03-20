import React, { createContext, useState, ReactNode } from 'react';

type Language = 'en' | 'de';
type Translations = Record<string, string>;

const translations: Record<Language, Translations> = {
  en: {
    name: 'Name',
    status: 'Status',
    species: 'Species',
    selectStatus: 'Select status',
    searchSpecies: 'Search species',
    loading: 'Loading...',
    alive: 'Alive',
    dead: 'Dead',
    unknown: 'Unknown'
  },
  de: {
    name: 'Name',
    status: 'Status',
    species: 'Spezies',
    selectStatus: 'Status auswählen',
    searchSpecies: 'Spezies suchen',
    loading: 'Laden...',
    alive: 'Lebendig',
    dead: 'Tot',
    unknown: 'Unbekannt'
  }
};

export const LanguageContext = createContext({
  language: 'en' as Language,
  setLanguage: (lang: Language) => {},
  t: translations.en
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};