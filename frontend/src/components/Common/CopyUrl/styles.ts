

import styled from 'styled-components';

import { space, rems } from '@/ui/helpers';
import {
  BORDER_RADIUS,
  COLOR_GREEN_100,
  COLOR_GREEN_200,
  COLOR_GREEN_600,
  COLOR_GREEN_900,
  COLOR_PURPLE_200,
  COLOR_PURPLE_300,
  COLOR_PURPLE_400,
  COLOR_PURPLE_500,
  COLOR_PURPLE_900
} from '@/ui/settings';
import { BODY_XS } from '@/ui/Texts';

const Share = styled.div`
  ${BODY_XS}

  &.align-left {
    text-align: left;

    .button {
      margin-left: 0;
    }
  }

  .button {
    align-items: center;
    background: ${COLOR_PURPLE_200};
    border: 1px solid ${COLOR_PURPLE_300};
    border-radius: ${BORDER_RADIUS};
    color: ${COLOR_PURPLE_900};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin: 0 auto ${space(1.5)};
    padding: ${space()} ${space(2)};

    &:focus {
      outline-color: ${COLOR_PURPLE_900};
    }

    svg {
      margin-left: ${space()};

      path {
        fill: ${COLOR_PURPLE_500};
      }
    }

    span {
      width: ${rems(200)};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    * {
      pointer-events: none;
    }
  }

  .help {
    color: ${COLOR_PURPLE_400};
    text-align: center;
  }

  &.success {
    .button {
      background: ${COLOR_GREEN_100};
      border: 1px solid ${COLOR_GREEN_200};
      color: ${COLOR_GREEN_900};
      pointer-events: none;

      &:focus {
        outline-color: ${COLOR_GREEN_600};
      }

      svg {
        path {
          fill: ${COLOR_GREEN_600};
        }
      }
    }

    .help {
      color: ${COLOR_GREEN_600};
    }
  }
`;

export default Share;
