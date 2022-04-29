

import { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

import Layout from '@/layouts/Default';
import Wysiwyg from '@/ui/Wysiwyg';

const CookiesPolicy = () => {
  const { t } = useTranslation('legals');

  useEffect(() => {
    const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
    if (cookiebotId) {
      const cookiebotDec = document.createElement('script');
      cookiebotDec.src = `https://consent.cookiebot.com/${cookiebotId}/cd.js`;
      cookiebotDec.id = 'CookieDeclaration';
      document.getElementById('cookies-container').appendChild(cookiebotDec);
    }
  }, []);

  return (
    <Layout center={false} title={t('cookiesPolicy.title')}>
      <Wysiwyg>
        <h1 className="title-lg">{t('cookiesPolicy.title')}</h1>
        <div id="cookies-container" />
      </Wysiwyg>
    </Layout>
  );
};

export default CookiesPolicy;
