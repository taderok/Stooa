

import styled from 'styled-components';

import { COLOR_NEUTRO_700 } from '@/ui/settings';

const LogoStyled = styled.div`
  color: ${COLOR_NEUTRO_700};
  font-size: 26px;
  font-weight: 700;

  &:hover {
    color: ${COLOR_NEUTRO_700};
  }

  &:focus {
    color: ${COLOR_NEUTRO_700};
  }
`;

const LogoAppStyled = styled(LogoStyled)`
  font-size: 20px;
`;

export { LogoAppStyled };
export default LogoStyled;
