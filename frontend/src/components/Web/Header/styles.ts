

import styled from 'styled-components';

import { BODY_SM } from '@/ui/Texts';
import { media, space } from '@/ui/helpers';

const Navigation = styled.nav`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  ${BODY_SM}

  .secondary {
    display: none;
  }

  ${media.min('tablet')`
    > *:not(:last-child) {
      margin-right: ${space(3)};
    }

    .secondary { display: block; }
  `}
`;

export default Navigation;
