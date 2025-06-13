
// Page transition configuration
export const pageTransition = {
  initial: { 
    opacity: 0,
    y: 20,
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1]
    }
  },
  exit: { 
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

// Staggered animation for child elements
export const childVariants = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1]
    }
  })
};

// Button hover animation
export const buttonHover = {
  scale: 1.05,
  y: -2,
  transition: {
    duration: 0.2,
    ease: "easeInOut"
  }
};

// Card hover animation
export const cardHover = {
  scale: 1.03,
  y: -5,
  boxShadow: "0 14px 28px rgba(0, 0, 0, 0.15)",
  transition: {
    duration: 0.2,
    ease: "easeInOut"
  }
};
