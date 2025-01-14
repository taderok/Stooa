

import styled from 'styled-components';

import { COLOR_NEUTRO_900, COLOR_NEUTRO_100 } from '@/ui/settings';
import { BODY_SM } from '@/ui/Texts';
import { space } from '@/ui/helpers';

const Title = styled.div`
  margin: 0 0 ${space(3)};
`;

const List = styled.ol`
  counter-reset: custom-counter;
  list-style: none;
  margin: 0 0 ${space(12)};
  padding-left: ${space(5)};

  li {
    counter-increment: custom-counter;
    margin: 0 0 ${space()};
    position: relative;

    &::before {
      ${BODY_SM};

      align-items: center;
      background: ${COLOR_NEUTRO_900};
      border-radius: 50%;
      content: counter(custom-counter, decimal);
      color: ${COLOR_NEUTRO_100};
      display: inline-flex;
      height: 23px;
      justify-content: center;
      left: ${space(-5)};
      line-height: 1;
      position: absolute;
      top: 5px;
      width: 23px;
    }
  }
`;

export { List, Title };
