import { createContext, useContext, useMemo } from 'react';
import { createTranslator, type Locale } from '@/lib/i18n';

export const LanguageContext = createContext<Locale>('vi');

export function useTranslation() {
  const locale = useContext(LanguageContext);
  return useMemo(() => createTranslator(locale), [locale]);
}
