
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

// Initialize tribal pattern animations
export const initTribalAnimations = () => {
  const tribalElements = document.querySelectorAll('.tribal-animated');
  
  // Create animation for each tribal element
  tribalElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      // Apply random rotation and scaling
      const rotate = Math.random() * 20 - 10; // -10 to 10 degrees
      const scale = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
      
      element.style.transform = `rotate(${rotate}deg) scale(${scale})`;
      
      // Add hover effect listeners
      element.addEventListener('mouseenter', () => {
        element.style.transform = `rotate(0deg) scale(1.05)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = `rotate(${rotate}deg) scale(${scale})`;
      });
    }
  });
};

// Dynamic color transitions based on scroll position
export const initColorTransitions = () => {
  const colorTransitionElements = document.querySelectorAll('[data-color-transition]');
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollPercentage = scrollPosition / totalHeight;
    
    colorTransitionElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        const fromColor = element.getAttribute('data-color-from') || '#FFD36B';
        const toColor = element.getAttribute('data-color-to') || '#4CAF50';
        
        // Interpolate between colors based on scroll position
        const color = interpolateColors(fromColor, toColor, scrollPercentage);
        element.style.color = color;
        element.style.borderColor = color;
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Helper function to interpolate between two colors
const interpolateColors = (color1: string, color2: string, factor: number) => {
  // Convert hex to RGB
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  // Parse RGB values
  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);
  
  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);
  
  // Interpolate
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  
  // Convert back to hex
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
};
