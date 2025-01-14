

import styled from 'styled-components';

import { space } from '@/ui/helpers';
import { BODY_SM } from '@/ui/Texts';

const Navigation = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  ${BODY_SM}

  > *:not(:last-child) {
    margin-right: ${space(3)};
  }
`;

const Avatar = styled.div`
  align-items: center;
  display: flex;
  font-weight: 500;
  justify-content: flex-start;

  svg {
    margin-right: ${space()};

    path {
      fill: currentColor;
    }
  }
`;

export { Avatar };
export default Navigation;
