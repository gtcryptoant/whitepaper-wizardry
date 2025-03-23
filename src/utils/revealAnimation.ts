
export const initRevealAnimations = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.15 }
  );

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach((el) => observer.observe(el));

  return () => {
    revealElements.forEach((el) => observer.unobserve(el));
  };
};
