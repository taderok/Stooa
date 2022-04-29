

import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/layouts/Default';
import LogInForm from '@/components/Web/Forms/log-in';

const SignIn = () => {
  const { t } = useTranslation('login');
  const { loading } = useAuth();

  return loading ? (
    <></>
  ) : (
    <Layout title={t('title')}>
      <h1 className="title-md form-title">{t('title')}</h1>
      <LogInForm />
    </Layout>
  );
};

export default SignIn;
