

import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '@/contexts/AuthContext';
import RecoverPasswordForm from '@/components/Web/Forms/recover-password';
import Layout from '@/layouts/Default';
import { Description } from '@/ui/pages';

const RecoverPassword = () => {
  const { t } = useTranslation('recover');
  const { loading } = useAuth();

  return loading ? (
    <></>
  ) : (
    <Layout title={t('title')}>
      <h1 className="title-md">{t('title')}</h1>
      <Description>{t('description')}</Description>
      <RecoverPasswordForm />
    </Layout>
  );
};

export default RecoverPassword;
