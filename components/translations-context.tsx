"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { en } from '@/lib/translations/en'
import { es } from '@/lib/translations/es'
import { fr } from '@/lib/translations/fr'
import { zh } from '@/lib/translations/zh'

type TranslationValue = string | { [key: string]: TranslationValue }

type Translations = {
  [key: string]: TranslationValue
}

const translations: { [key: string]: Translations } = {
  en,
  es,
  fr,
  zh
}

type TranslationsContextType = {
  t: (key: string) => string
  locale: string
  setLocale: (locale: string) => void
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined)

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en')

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = en

    for (const k of keys) {
      if (value === undefined || value === null) return key
      value = value[k]
    }

    return typeof value === 'string' ? value : key
  }

  const value = {
    t,
    locale,
    setLocale,
  }

  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  )
}

export function useTranslations() {
  const context = useContext(TranslationsContext)
  if (context === undefined) {
    throw new Error('useTranslations must be used within a TranslationsProvider')
  }
  return context
} 