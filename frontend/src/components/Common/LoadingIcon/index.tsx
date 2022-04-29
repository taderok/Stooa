

import lottie from 'lottie-web';
import { useEffect } from 'react';

import { IconWrapper } from '@/components/Common/LoadingIcon/styles';
import LoaderJson from '@/ui/animations/loader/loader.json';

const LoadingIcon = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById('loading-svg'),
      animationData: LoaderJson,
      renderer: 'svg',
      loop: true,
      autoplay: true
    });
  }, []);

  return <IconWrapper id="loading-svg"></IconWrapper>;
};

export default LoadingIcon;
