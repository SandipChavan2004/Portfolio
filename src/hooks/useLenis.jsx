import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
    useEffect(() => {
        // Detect if device is mobile/touch device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            || window.innerWidth < 1024;

        // Skip Lenis on mobile devices - use native scrolling
        if (isMobile) {
            console.log('Mobile device detected - using native scroll');
            return;
        }

        // Initialize Lenis for desktop only
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        // Integrate Lenis with ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Integrate GSAP ticker with Lenis
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's default lag smoothing for better sync
        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, []);
};
