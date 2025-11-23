import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;

        if (!dot || !outline) return;

        // Initial setup
        gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });
        gsap.set(outline, { xPercent: -50, yPercent: -50, opacity: 0 });

        const mouse = { x: 0, y: 0 };
        const delayedMouse = { x: 0, y: 0 };

        // Mouse movement handler
        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            if (!isVisible) {
                setIsVisible(true);
                gsap.to([dot, outline], { opacity: 1, duration: 0.3 });
            }

            // Instant movement for dot
            gsap.to(dot, {
                x: mouse.x,
                y: mouse.y,
                duration: 0,
            });
        };

        // Animation loop for smooth outline movement
        const tick = () => {
            // Linear interpolation for smooth delay
            delayedMouse.x += (mouse.x - delayedMouse.x) * 0.15; // Adjust speed here (0.1 - 0.2 is good)
            delayedMouse.y += (mouse.y - delayedMouse.y) * 0.15;

            gsap.set(outline, {
                x: delayedMouse.x,
                y: delayedMouse.y,
            });
        };

        // Hover effects
        const onMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement;

            // Scale up outline
            gsap.to(outline, {
                width: 26,
                height: 26,
                duration: 0.3,
                ease: "power2.out",
            });

            // Scale up dot slightly
            gsap.to(dot, {
                scale: 1.5,
                duration: 0.3,
                ease: "power2.out",
            });

            // Magnetic effect (optional - can be complex to implement perfectly globally, 
            // but we can add a subtle pull if needed. For now, just visual feedback is robust)
        };

        const onMouseLeave = () => {
            // Reset sizes
            gsap.to(outline, {
                width: 16,
                height: 16,
                duration: 0.3,
                ease: "power2.out",
            });

            gsap.to(dot, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        // Add listeners
        window.addEventListener("mousemove", onMouseMove);
        gsap.ticker.add(tick);

        const interactiveElements = document.querySelectorAll("a, button, .clickable, input, textarea, select, [role='button']");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", onMouseEnter);
            el.addEventListener("mouseleave", onMouseLeave);
        });

        // Mutation observer for dynamic elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    const newElements = (mutation.target as Element).querySelectorAll("a, button, .clickable, input, textarea, select, [role='button']");
                    newElements.forEach((el) => {
                        el.removeEventListener("mouseenter", onMouseEnter);
                        el.removeEventListener("mouseleave", onMouseLeave);
                        el.addEventListener("mouseenter", onMouseEnter);
                        el.addEventListener("mouseleave", onMouseLeave);
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            gsap.ticker.remove(tick);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnter);
                el.removeEventListener("mouseleave", onMouseLeave);
            });
            observer.disconnect();
        };
    }, [isVisible]);

    // Hide on mobile
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-[7px] h-[7px] bg-[#111] rounded-full pointer-events-none z-[99999]"
                style={{ opacity: 0 }} // Initial opacity
            />
            {/* Outline */}
            <div
                ref={outlineRef}
                className="fixed top-0 left-0 w-[16px] h-[16px] border border-[#111] rounded-full pointer-events-none z-[99998] opacity-40"
                style={{ opacity: 0 }} // Initial opacity
            />
        </>
    );
};

export default CustomCursor;
