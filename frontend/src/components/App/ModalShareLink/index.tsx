

import React, { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import Trans from 'next-translate/Trans';
import Modal from '@/ui/Modal';
import Cross from '@/ui/svg/cross.svg';
import ButtonCopyUrl from '@/components/Common/ButtonCopyUrl';
import { useStooa } from '@/contexts/StooaManager';
import { getOnBoardingCookie, isFishbowlShareLinkCookie, setShareLinkCookie } from '@/lib/auth';

const ModalShareLink: React.FC = () => {
  const { t } = useTranslation('fishbowl');
  const { data, isModerator } = useStooa();
  const [show, setShow] = useState<boolean>(true);
  const router = useRouter();
  const { fid } = router.query;

  const closeModal = (): void => {
    setShow(false);
  };

  const showModal = (): boolean => {
    return (
      show &&
      data.isFishbowlNow &&
      isModerator &&
      getOnBoardingCookie(isModerator) &&
      !isFishbowlShareLinkCookie(fid as string)
    );
  };

  useEffect(() => {
    if (!show) {
      setShareLinkCookie(fid as string);
    }
  }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {showModal() && (
        <Modal>
          <div className="content">
            <button className="close" onClick={closeModal}>
              <Cross />
            </button>
            <h2 className="title-sm">{t('shareModal.title')}</h2>
            <p className="description">
              <Trans i18nKey="fishbowl:shareModal.description" components={{ i: <i /> }} />
            </p>
            <div className="modal-footer">
              <ButtonCopyUrl withSvg variant="primary" fid={fid as string} locale={data.locale}>
                {t('common:linkButton')}
              </ButtonCopyUrl>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalShareLink;
