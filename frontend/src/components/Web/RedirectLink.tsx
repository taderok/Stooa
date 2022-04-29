

import { useRouter } from 'next/router';
import Link from 'next/link';

const RedirectLink = ({ href, children, ...props }) => {
  const router = useRouter();
  const {
    query: { redirect }
  } = router;
  const url = redirect ? `${href}?redirect=${redirect}` : href;

  return (
    <Link href={url} {...props}>
      {children}
    </Link>
  );
};

export default RedirectLink;
