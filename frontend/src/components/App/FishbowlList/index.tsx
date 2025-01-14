

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { motion, AnimatePresence } from 'framer-motion';

import {
  ROUTE_FISHBOWL,
  ROUTE_FISHBOWL_CREATE,
  ROUTE_FISHBOWL_HOST_NOW,
  ROUTE_HOME
} from '@/app.config';
import { Fishbowl } from '@/types/api-platform/interfaces/fishbowl';
import { pushEventDataLayer } from '@/lib/analytics';

import RedirectLink from '@/components/Web/RedirectLink';
import LoadingIcon from '@/components/Common/LoadingIcon';
import FishbowlCard from '@/components/App/FishbowlList/FishbowlCard';
import {
  EmptyFishbowlList,
  FishbowlListWrapper,
  FishbowlScrollList,
  Header,
  FishbowlListContent,
  EditFormWrapper,
  DetailPlaceholder,
  MobileBackButton
} from '@/components/App/FishbowlList/styles';
import FishbowlForm from '@/components/Web/Forms/FishbowlForm';
import Button from '@/components/Common/Button';

import { getAuthToken } from '@/lib/auth';
import api from '@/lib/api';
import { getIsoDateTimeWithActualTimeZone, isTimeLessThanNMinutes } from '@/lib/helpers';
import { useWindowSize } from '@/hooks/useWIndowSize';
import { basicRevealWithDelay, bottomMobileReveal } from '@/ui/animations/motion/reveals';
import PlusSign from '@/ui/svg/plus-sign.svg';
import BackArrow from '@/ui/svg/arrow-prev.svg';
import { BREAKPOINTS } from '@/ui/settings';

const FishbowlList = () => {
  const [selectedFishbowl, setSelectedFishbowl] = useState<Fishbowl>(null);
  const [fishbowls, setFishbowls] = useState<Fishbowl[]>(null);
  const { width: windowWidth } = useWindowSize();
  const { t, lang } = useTranslation('fishbowl-list');
  const router = useRouter();

  const handleClick = (fishbowl: Fishbowl) => {
    setSelectedFishbowl(fishbowl);
  };

  const params = new URLSearchParams([
    ['finishDateTime[after]', getIsoDateTimeWithActualTimeZone()]
  ]);

  const getFishbowls = async () => {
    const auth = await getAuthToken();

    api
      .get(`/fishbowls`, {
        headers: {
          authorization: `${auth ? auth.authorizationString : null}`
        },
        params
      })
      .then(response => {
        setFishbowls(response.data);
      })
      .catch(error => {
        console.error('[STOOA] Fishbowl list error', error);
        router.push(ROUTE_HOME, ROUTE_HOME, { locale: lang });
      });
  };

  const handleUpdateFishbowl = updatedFishbowl => {
    setFishbowls(currentFishbowls => {
      return currentFishbowls.map(fishbowl => {
        if (fishbowl.id !== updatedFishbowl.id) {
          return fishbowl;
        } else {
          return { ...fishbowl, ...updatedFishbowl };
        }
      });
    });
  };

  useEffect(() => {
    getFishbowls();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!fishbowls) {
    return <LoadingIcon />;
  } else {
    return (
      <FishbowlListWrapper>
        <Header>
          <div>
            <h1 className="fishbowl-list__title" data-testid="scheduled-header">
              <Trans
                i18nKey="fishbowl-list:scheduledFishbowls"
                components={{ i: <i />, span: <span data-testid="count" /> }}
                values={{
                  count: fishbowls.length
                }}
              />
            </h1>
            <RedirectLink href={ROUTE_FISHBOWL_CREATE} locale={lang} passHref>
              <Button
                as="a"
                variant="secondary"
                className="schedule-fishbowl"
                onClick={() => {
                  pushEventDataLayer({
                    category: 'Schedule Fishbowl',
                    action: 'Fishbowl List',
                    label: window.location.href
                  });
                }}
              >
                <span>{t('common:scheduleFishbowl')}</span>
                <PlusSign />
              </Button>
            </RedirectLink>
          </div>
          <span className="divider" />
        </Header>
        <FishbowlListContent className={fishbowls.length === 0 ? '' : 'not-empty'}>
          {fishbowls.length === 0 ? (
            <EmptyFishbowlList data-testid="empty-list">
              <div className="fishbowl-list__empty-illustration">
                {/* // eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="multi"
                  src="/img/fishbowl-list/empty-chairs-table.png"
                  alt="Empty chairs with table"
                />
                <img
                  className="single"
                  src="/img/fishbowl-list/empty-chair.png"
                  alt="Empty chair"
                />
              </div>
              <h2 className="body-lg medium">
                <Trans i18nKey="fishbowl-list:emptyListTitle" components={{ i: <i /> }} />
              </h2>
              <p>
                <Trans i18nKey="fishbowl-list:emptyListDescription" components={{ i: <i /> }} />
              </p>
              <div className="empty-actions">
                <RedirectLink href={ROUTE_FISHBOWL_CREATE} passHref>
                  <Button
                    as="a"
                    variant="secondary"
                    size="large"
                    className="animate-item cta-create-fishbowl"
                    onClick={() => {
                      pushEventDataLayer({
                        category: 'Schedule Fishbowl',
                        action: 'Empty Fishbowl List',
                        label: 'Fishbowl List'
                      });
                    }}
                  >
                    <span>{t('common:scheduleFishbowl')}</span>
                  </Button>
                </RedirectLink>
                <RedirectLink href={ROUTE_FISHBOWL_HOST_NOW} passHref>
                  <Button
                    as="a"
                    size="large"
                    className="animate-item cta-create-fishbowl"
                    onClick={() => {
                      pushEventDataLayer({
                        category: 'Host Fishbowl Now',
                        action: 'Empty Fishbowl List',
                        label: 'Fishbowl List'
                      });
                    }}
                  >
                    <span>{t('common:hostFishbowlNow')}</span>
                  </Button>
                </RedirectLink>
              </div>
            </EmptyFishbowlList>
          ) : (
            <>
              <FishbowlScrollList data-testid="fishbowl-list-wrapper">
                {fishbowls.map((fishbowl, index) => (
                  <FishbowlCard
                    onClick={fishbowl => handleClick(fishbowl)}
                    key={index}
                    fishbowl={fishbowl}
                    selected={fishbowl.id === selectedFishbowl?.id}
                  />
                ))}
              </FishbowlScrollList>
              <AnimatePresence>
                {selectedFishbowl &&
                  (!isTimeLessThanNMinutes(selectedFishbowl.startDateTimeTz, 30) ? (
                    <EditFormWrapper
                      as={motion.div}
                      variants={basicRevealWithDelay}
                      initial="initial"
                      exit="exit"
                      animate="visible"
                    >
                      <motion.div
                        className="form-wrapper"
                        variants={
                          windowWidth <= BREAKPOINTS.desktop
                            ? bottomMobileReveal
                            : basicRevealWithDelay
                        }
                        initial="initial"
                        exit="exit"
                        animate="visible"
                      >
                        <div className="form-header">
                          <MobileBackButton
                            className="bottom"
                            onClick={() => setSelectedFishbowl(null)}
                          >
                            <BackArrow />
                          </MobileBackButton>
                          <h2 className="title-md form-title">
                            <Trans i18nKey="fishbowl-list:titleEdit" components={{ i: <i /> }} />
                          </h2>
                        </div>
                        <FishbowlForm
                          $isFull={windowWidth <= BREAKPOINTS.desktop}
                          selectedFishbowl={selectedFishbowl}
                          isEditForm={true}
                          onSaveCallback={handleUpdateFishbowl}
                        />
                      </motion.div>
                    </EditFormWrapper>
                  ) : (
                    <DetailPlaceholder
                      data-testid="started-fishbowl-placeholder"
                      as={motion.div}
                      variants={
                        windowWidth <= BREAKPOINTS.desktop
                          ? bottomMobileReveal
                          : basicRevealWithDelay
                      }
                      initial="initial"
                      exit="exit"
                      animate="visible"
                    >
                      <h2 className="body-lg medium">
                        <Trans i18nKey="fishbowl-list:fishbowlStarted" components={{ i: <i /> }} />
                      </h2>
                      <p>
                        <Trans
                          i18nKey="fishbowl-list:fishbowlStartedDescription"
                          components={{ i: <i /> }}
                        />
                      </p>
                      <RedirectLink
                        href={`${ROUTE_FISHBOWL}/${selectedFishbowl.slug}`}
                        locale={selectedFishbowl.locale}
                        passHref
                      >
                        <Button
                          as="a"
                          className="enter-fishbowl"
                          data-testid="started-enter-fishbowl"
                        >
                          <span>{t('enterFishbowl')}</span>
                        </Button>
                      </RedirectLink>
                      <Button
                        variant="text"
                        className="back"
                        onClick={() => setSelectedFishbowl(null)}
                      >
                        <span>{t('back')}</span>
                      </Button>
                    </DetailPlaceholder>
                  ))}
              </AnimatePresence>
              {!selectedFishbowl && (
                <DetailPlaceholder data-testid="selected-placeholder" className="not-selected">
                  <h2 className="body-lg medium">
                    <Trans
                      i18nKey="fishbowl-list:noSelectedFishbowlTitle"
                      components={{ i: <i /> }}
                    />
                  </h2>
                  <p>
                    <Trans
                      i18nKey="fishbowl-list:noSelectedFishbowlDescription"
                      components={{ i: <i /> }}
                    />
                  </p>
                </DetailPlaceholder>
              )}
            </>
          )}
        </FishbowlListContent>
      </FishbowlListWrapper>
    );
  }
};

export default FishbowlList;
