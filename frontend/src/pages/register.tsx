

import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/layouts/Default';
import RegisterForm from '@/components/Web/Forms/register';

const Register = () => {
  const { t } = useTranslation('register');
  const { loading } = useAuth();

  return loading ? (
    <></>
  ) : (
    <Layout title={t('title')}>
      <h1 className="title-md form-title">{t('title')}</h1>
      <RegisterForm />
    </Layout>
  );
};

export default Register;
