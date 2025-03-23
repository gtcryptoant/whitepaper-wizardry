
export const initRevealAnimations = (threshold = 0.15, selector = '.reveal-on-scroll') => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold }
  );

  const revealElements = document.querySelectorAll(selector);
  revealElements.forEach((el) => observer.observe(el));

  return () => {
    revealElements.forEach((el) => observer.unobserve(el));
  };
};

export const initProgressiveReveal = (elements: Element[], delayBetween = 100) => {
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, index * delayBetween);
  });
};

// Track scroll position for parallax effects
export const initParallaxEffects = () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute('data-speed') || '0.5';
      // Convert string to number for calculations
      const speedValue = parseFloat(speed);
      const yPos = -(scrollPosition * speedValue);
      // Add type assertion for HTMLElement to access style property
      if (element instanceof HTMLElement) {
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
