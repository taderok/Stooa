

import { css } from 'styled-components';

import { media } from '@/ui/helpers';

const Animations = css`
  .animate .animate-item,
  .billboard-animate .animate-item {
    opacity: 0;
    position: relative;
    transform: translateY(20px);
    will-change: opacity, transform;

    ${media.min('tablet')`
      transform: translateY(30px);
    `}
  }
`;

export default Animations;
