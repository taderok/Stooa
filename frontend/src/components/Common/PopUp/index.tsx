

import { Container, Content } from '@/components/Common/PopUp/styles';

const PopUp = ({ children, open }) => (
  <Container open={open}>
    <Content>{children}</Content>
  </Container>
);

export default PopUp;
