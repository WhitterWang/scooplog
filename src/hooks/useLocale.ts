import { useCallback, useEffect, useState } from 'react'
import type { Locale } from '../types'
import { loadLocale, saveLocale } from '../lib/storage'

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(() => loadLocale())

  useEffect(() => {
    saveLocale(locale)
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  return { locale, setLocale }
}
