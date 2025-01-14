

import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import Modal from '@/ui/Modal';
import Cross from '@/ui/svg/cross.svg';
import Trans from 'next-translate/Trans';
import Button from '@/components/Common/Button';

interface Props {
  closeModal: () => void;
  startIntroduction: () => void;
  disabled: boolean;
}

const StartIntroduction: React.FC<Props> = ({ closeModal, startIntroduction, disabled }) => {
  const { t } = useTranslation('fishbowl');

  return (
    <Modal>
      <div className="content">
        <button className="close" onClick={closeModal}>
          <Cross />
        </button>
        <h2 className="title-sm">{t('introduceModal.title')}</h2>
        <p className="description">
          <Trans i18nKey="fishbowl:introduceModal.description" components={{ i: <i /> }} />
        </p>
        <div className="modal-footer">
          <Button size="medium" onClick={startIntroduction} disabled={disabled}>
            {t('introduceModal.button')}
          </Button>
          <Button variant="subtleLink" onClick={closeModal}>
            {t('common:cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StartIntroduction;
