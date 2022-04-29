

import styled from 'styled-components';

import { media } from '@/ui/helpers';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(80px, 100px));
  justify-content: center;
  justify-items: stretch;
  align-items: start;
  margin: auto;
  width: 100%;

  ${media.max('tablet')`
    &.moderator { padding-left: 0; }
  `}

  button {
    margin: 0;
    max-width: 100%;
  }
`;

export { Container };
