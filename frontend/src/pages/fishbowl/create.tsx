

import { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

import Layout from '@/layouts/Default';
import FishbowlForm from '@/components/Web/Forms/FishbowlForm';
import { useStateValue } from '@/contexts/AppContext';

import { IConferenceStatus } from '@/jitsi/Status';

const Create = () => {
  const { t } = useTranslation('fishbowl');
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: 'FISHBOWL_STATUS',
      fishbowlReady: false,
      fishbowlStarted: false,
      isGuest: false,
      prejoin: true,
      conferenceStatus: IConferenceStatus?.NOT_STARTED
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout title={t('title')}>
      <h1 className="title-md form-title">{t('title')}</h1>
      <FishbowlForm />
    </Layout>
  );
};

export default Create;
