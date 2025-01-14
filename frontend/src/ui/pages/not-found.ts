

import styled from 'styled-components';

import { space, media } from '@/ui/helpers';

const NotFoundStyled = styled.div`
  .not-found-img {
    margin-bottom: ${space(4)};
  }
  .title-md,
  .body-lg {
    margin-bottom: ${space()};
  }

  .ctas {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: ${space(4)};

    ${media.max('tablet')`
      flex-direction: column;

      > *:first-child { margin-bottom: ${space(2)}; }
    `}

    ${media.min('tablet')`
      > *:first-child { margin-right: ${space(2)}; }
    `}
  }
`;

export default NotFoundStyled;
