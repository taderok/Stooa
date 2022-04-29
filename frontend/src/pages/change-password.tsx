

import useTranslation from 'next-translate/useTranslation';

import PasswordForm from '@/components/Web/Forms/change-password';
import Layout from '@/layouts/Default';

const EditProfile = () => {
  const { t } = useTranslation('change-password');

  return (
    <Layout title={t('title')}>
      <h1 className="title-md form-title">{t('title')}</h1>
      <PasswordForm />
    </Layout>
  );
};

export default EditProfile;
