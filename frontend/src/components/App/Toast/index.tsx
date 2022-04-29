

import React, { useEffect, useState } from 'react';

import CrossIcon from '@/ui/svg/cross.svg';
import { Container, Cross } from '@/components/App/Toast/styles';

interface Props {
  message: string;
  onDismiss: () => void;
}

const Toast: React.FC<Props> = ({ message, onDismiss }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 500);
  }, []);

  return (
    <Container show={show}>
      <span className="body-sm">{message}</span>
      <Cross onClick={onDismiss}>
        <CrossIcon />
      </Cross>
    </Container>
  );
};

export default Toast;
