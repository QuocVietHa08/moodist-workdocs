import { useEffect, useState } from 'react';

import { ReloadModal } from './reload-modal';
import { LanguageContext } from '@/contexts/language';
import type { Locale } from '@/lib/i18n';

export function Reload({ locale = 'vi' }: { locale?: Locale }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  return isBrowser ? (
    <LanguageContext.Provider value={locale}>
      <ReloadModal />
    </LanguageContext.Provider>
  ) : null;
}
