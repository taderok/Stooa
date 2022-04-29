

import React from 'react';

import { Container, Main } from '@/layouts/Default/styles';

const Page: React.FC = ({ children }) => {
  return (
    <Container>
      <Main center>{children}</Main>
    </Container>
  );
};

export default Page;
