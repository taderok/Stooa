

import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '@/contexts/AuthContext';
import ResetPasswordForm from '@/components/Web/Forms/reset-password';
import Layout from '@/layouts/Default';

const ChangePassword = () => {
  const { loading } = useAuth();
  const { t } = useTranslation('password');
  const router = useRouter();
  const { token } = router.query;

  const userToken = token as string;

  return loading ? (
    <></>
  ) : (
    <Layout title={t('title')} decorated>
      <h1 className="title-md">{t('title')}</h1>
      <ResetPasswordForm token={userToken} />
    </Layout>
  );
};

export default ChangePassword;
