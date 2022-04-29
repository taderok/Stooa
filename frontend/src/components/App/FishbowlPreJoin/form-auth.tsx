

import useTranslation from 'next-translate/useTranslation';

import userRepository from '@/jitsi/User';
import { useStateValue } from '@/contexts/AppContext';

import Button from '@/components/Common/Button';
import { InputStyled } from '@/ui/Form';
import FormikForm from '@/ui/Form';

type TProps = {
  name: string;
};

const AuthUser = ({ name }: TProps) => {
  const [{}, dispatch] = useStateValue();
  const { t } = useTranslation('form');

  const handleOnSubmit = () => {
    dispatch({
      type: 'JOIN_USER',
      prejoin: false
    });
  };

  userRepository.setUser({ nickname: name });

  return (
    <FormikForm as="div">
      <InputStyled className="disabled">
        <input className="filled" type="text" disabled value={name} />
        <label>{t('name')}</label>
      </InputStyled>
      <fieldset className="submit-wrapper">
        <Button size="large" as="a" onClick={handleOnSubmit}>
          {t('button.enterFishbowl')}
        </Button>
      </fieldset>
    </FormikForm>
  );
};

export default AuthUser;
