

import Link from 'next/link';

import { APP_NAME } from '@/app.config';
import LogoStyled, { LogoAppStyled } from '@/components/Common/Logo/styles';

interface Props {
  href?: string;
  className?: string;
}

const Logo = ({ href = '', className, ...props }: Props) => {
  return href ? (
    <Link href={href} passHref>
      <LogoStyled as="a" className={className} {...props}>
        {APP_NAME}
      </LogoStyled>
    </Link>
  ) : (
    <LogoAppStyled className={`logo ${className}`}>{APP_NAME}</LogoAppStyled>
  );
};

export default Logo;
