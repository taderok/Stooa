

import styled from 'styled-components';

import { rems, space } from '@/ui/helpers';
import { COLOR_RED_500 } from '@/ui/settings';
import { BODY_SM } from '@/ui/Texts';

const ValidationError = styled.div`
  ${BODY_SM};

  color: ${COLOR_RED_500};
  font-size: ${rems(12)};
  margin-top: ${space(0.5)};
  padding: 0 ${space(2)};
`;

const ValidationIcon = styled.div`
  height: ${rems(16)};
  position: absolute;
  right: ${space(2)};
  top: ${space(2)};
  width: ${rems(16)};
`;

export { ValidationError, ValidationIcon };
