

import styled from 'styled-components';

import { space, media } from '@/ui/helpers';

const JoinFishbowlStyled = styled.div`
  .join-buttons {
    margin: ${space(3)} 0 0;

    > * {
      margin: 0 0 ${space(2)};
    }

    ${media.min('tablet')`
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: row;
    * + * {
      margin-left: ${space(2)};
    }
    `}

    flex-direction: column;
  }
`;

export { JoinFishbowlStyled };
