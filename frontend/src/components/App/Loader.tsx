

import useTranslation from 'next-translate/useTranslation';

import { Container, Main, Overlay } from '@/layouts/App/styles';
import LoadingIcon from '@/components/Common/LoadingIcon';
import Seats from '@/components/App/Seats';

const Loading = () => {
  const { t } = useTranslation('app');

  return (
    <Container>
      <Main>
        <Seats />
      </Main>
      <Overlay>
        <LoadingIcon />
        <p className="text">{t('loading')}</p>
      </Overlay>
    </Container>
  );
};

export default Loading;
