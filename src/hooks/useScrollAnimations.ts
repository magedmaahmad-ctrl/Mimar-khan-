import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = (path?: string) => {
  useEffect(() => {
    let rafId: number | null = null;
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    const animateHero = () => {
      if (path !== "/") {
        return;
      }

      const heroHeadlineWords = Array.from(document.querySelectorAll<HTMLElement>('.hero-headline [data-word]'));
      if (!heroHeadlineWords.length) {
        return;
      }

      const heroDivider = document.querySelector<HTMLElement>('.hero-divider');
      const heroSubheadline = document.querySelector<HTMLElement>('.hero-subheadline');
      const heroActions = document.querySelector<HTMLElement>('.hero-actions');
      const heroInsights = Array.from(document.querySelectorAll<HTMLElement>('.hero-insight'));
      const heroFloaters = Array.from(document.querySelectorAll<HTMLElement>('.hero-floater'));

      heroTimeline.clear(true);

      gsap.set(heroHeadlineWords, { opacity: 0, y: 45 });
      if (heroDivider) gsap.set(heroDivider, { opacity: 0, y: 16 });
      if (heroSubheadline) gsap.set(heroSubheadline, { opacity: 0, y: 24 });
      if (heroActions) gsap.set(heroActions, { opacity: 0, y: 24 });
      if (heroInsights.length) gsap.set(heroInsights, { opacity: 0, y: 20 });
      if (heroFloaters.length) gsap.set(heroFloaters, { opacity: 0, y: 120 });

      if (heroFloaters.length) {
        heroTimeline.fromTo(heroFloaters, { opacity: 0, y: 120 }, { opacity: 0.85, y: 0, duration: 1.6, stagger: 0.18 }, 0);
      }
      if (heroDivider) {
        heroTimeline.fromTo(heroDivider, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.75 }, 0.2);
      }
      if (heroHeadlineWords.length) {
        heroTimeline.fromTo(heroHeadlineWords, {
          opacity: 0,
          y: 45
        }, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.05
        }, 0.1);
      }
      if (heroSubheadline) {
        heroTimeline.fromTo(heroSubheadline, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.85 }, 0.45);
      }
      if (heroActions) {
        heroTimeline.fromTo(heroActions, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.85 }, 0.55);
      }
      if (heroInsights.length) {
        heroTimeline.from(heroInsights, {
          opacity: 0,
          y: 20,
          duration: 0.9,
          stagger: 0.1
        }, 0.65);
      }
    };

    if (path === "/") {
      rafId = window.requestAnimationFrame(animateHero);
    }

    const scrollContext = gsap.context(() => {
      const fadeInScrollElements = gsap.utils.toArray<HTMLElement>('.fade-in-scroll');
      const fadeInUpElements = gsap.utils.toArray<HTMLElement>('.fade-in-up');

      fadeInScrollElements.forEach((element) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      });

      fadeInUpElements.forEach((element) => {
        gsap.fromTo(element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.stat-value').forEach((element) => {
        const value = Number(element.dataset.counterValue ?? "0");
        const suffix = element.dataset.counterSuffix ?? "";
        const counter = { current: 0 };

        gsap.to(counter, {
          current: value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true
          },
          onUpdate: () => {
            element.textContent = `${Math.round(counter.current)}${suffix}`;
          }
        });
      });

      gsap.utils.toArray<HTMLElement>('.approach-card').forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.parallax').forEach((element) => {
        gsap.to(element, {
          yPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      heroTimeline.kill();
      scrollContext.revert();
    };
  }, [path]);
};