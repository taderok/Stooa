

import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { Fishbowl } from '@/types/api-platform';
import { useStateValue } from '@/contexts/AppContext';
import { formatDateTime } from '@/lib/helpers';
import CopyUrl from '@/components/Common/CopyUrl';
import { Container, Description, Time, TimeLeft } from '@/ui/pages/fishbowl-detail';

interface Props {
  data: Fishbowl;
}

const FishbowlDetail: React.FC<Props> = ({ data }) => {
  const [{ fishbowlReady }] = useStateValue();
  const { t } = useTranslation('fishbowl');
  const startDate = formatDateTime(data.startDateTimeTz);
  const endDate = formatDateTime(data.endDateTimeTz);

  return (
    <Container centered>
      <h1 className="title-md">{data.name}</h1>
      {data.description && <Description>{data.description}</Description>}
      <Time
        as="time"
        dateTime={`${startDate.date} ${startDate.time} - ${endDate.time}`}
        className="highlight"
      >
        <p className="body-md medium">{t('dateandtime')}</p>
        <div className="body-lg">
          {`${t(`months.${startDate.month}`)} ${startDate.day}, ${startDate.year}. ${
            startDate.time
          } - ${endDate.time} ${endDate.timezone}`}
        </div>
      </Time>
      {!fishbowlReady && (
        <>
          <TimeLeft className="warning body-md prewrap" block>
            <Trans i18nKey="fishbowl:accessMsg" components={{ strong: <strong /> }} />
          </TimeLeft>
          <CopyUrl className="centered" data={data} />
        </>
      )}
    </Container>
  );
};

export default FishbowlDetail;
