

import { Variants } from 'framer-motion';

const basicRevealWithDelay: Variants = {
  initial: {
    opacity: 0.8,
    y: '-6px'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3
    }
  }
};

const bottomMobileReveal: Variants = {
  initial: {
    y: '100%',
    opacity: 1
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    x: '100%',
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  }
};

export { basicRevealWithDelay, bottomMobileReveal };
