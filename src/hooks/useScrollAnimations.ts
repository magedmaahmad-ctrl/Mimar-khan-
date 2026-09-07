import { useEffect } from "react";

export const useScrollAnimations = (path?: string) => {
  useEffect(() => {
    const animatedElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".fade-in-scroll, .fade-in-up, .approach-card",
      ),
    );
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>(".stat-value"),
    );

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const target = Number(element.dataset.counterValue ?? "0");
          const suffix = element.dataset.counterSuffix ?? "";
          const startedAt = performance.now();

          const updateCounter = (now: number) => {
            const progress = Math.min((now - startedAt) / 1200, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = `${Math.round(target * eased)}${suffix}`;
            if (progress < 1) window.requestAnimationFrame(updateCounter);
          };

          window.requestAnimationFrame(updateCounter);
          observer.unobserve(element);
        });
      },
      { threshold: 0.2 },
    );

    animatedElements.forEach((element) => revealObserver.observe(element));
    counters.forEach((element) => counterObserver.observe(element));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, [path]);
};
