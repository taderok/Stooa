

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LocaleCookie from '@/lib/LocaleCookie';

const usePersistLocaleCookie = () => {
  const { locale, defaultLocale } = useRouter();

  useEffect(() => {
    LocaleCookie.setLocaleCookie(locale);
  }, [locale, defaultLocale]);
};

export default usePersistLocaleCookie;
