

import React from 'react';

import UrlSvg from '@/ui/svg/url.svg';
import Check from '@/ui/svg/checkmark.svg';

import { toast } from 'react-toastify';
import { ROUTE_FISHBOWL } from '@/app.config';
import { defaultLocale } from '@/i18n';
import useTranslation from 'next-translate/useTranslation';
import Button from '@/components/Common/Button';

interface Props {
  fid: string;
  locale: string;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  withSvg?: boolean;
}

const ButtonCopyUrl: React.FC<Props> = ({ fid, locale, size, variant, withSvg, ...props }) => {
  const { t } = useTranslation('common');
  const fbRoute = `${ROUTE_FISHBOWL}/${fid}`;
  const fbUrl = `${process.env.NEXT_PUBLIC_APP_DOMAIN}${
    locale === defaultLocale ? '' : `/${locale}`
  }${fbRoute}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(fbUrl);
    toast(t('successCopiedLink'), {
      icon: <Check />,
      toastId: 'link-copied',
      type: 'success',
      position: 'bottom-center',
      autoClose: 5000
    });
  };

  return (
    <Button size={size} variant={variant} onClick={handleCopyUrl} {...props}>
      {t('linkButton')}
      {withSvg && <UrlSvg />}
    </Button>
  );
};

export default ButtonCopyUrl;
