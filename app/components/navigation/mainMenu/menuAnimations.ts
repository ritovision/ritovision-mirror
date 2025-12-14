export const modalVariants = {
    closed: {
      clipPath: 'circle(0% at 50% 50%)',
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1] as const
      }
    },
    open: {
      clipPath: 'circle(150% at 50% 50%)',
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1] as const
      }
    }
  };
  
  export const buttonVariants = {
    normal: { opacity: 1 },
    transparent: { opacity: 0, transition: { duration: 0.5 } },
    fadeOut: { opacity: 0, transition: { duration: 0.75 } }
  };
  
  export const elementVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3 } 
    }
  };
  
  export const closeButtonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.3, delay: .75
       }
    },
  };
  