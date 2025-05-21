<script>
import { onMount, onDestroy } from 'svelte';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import {
    VIEW_H_VH,
    SOL_OFFSET_VH,
    IMPACT_POINT,
    BREAK_POINT,
    FRAGMENT_COUNT,
    SQUARE_HEIGHT,
    SQUARE_WIDTH,
    SOL_HEIGHT,
    createFragments
} from './constants.js';

let carre, sol, fragmentsContainer;
let lenis;
const fragments = createFragments(FRAGMENT_COUNT);
let isMobile = false;

function checkMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

function setFragmentsContainerPosition() {
    if (!sol || !fragmentsContainer) return;
    const rect = sol.getBoundingClientRect();
    gsap.set(fragmentsContainer, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
    });
}

function getScrollHeight() {
    return document.documentElement.scrollHeight - window.innerHeight;
}

function animateScroll({ getViewHeight }) {
    gsap.registerPlugin(ScrollTrigger);
    
    // Ajuster les dimensions en fonction de la taille de l'écran
    const mobileScale = isMobile ? 0.7 : 1;
    const squareWidth = SQUARE_WIDTH * mobileScale;
    const squareHeight = SQUARE_HEIGHT * mobileScale;
    const solHeight = SOL_HEIGHT * mobileScale;
    
    // Mettre à jour les dimensions des éléments
    gsap.set(carre, { width: squareWidth, height: squareHeight });
    gsap.set(sol, { height: solHeight });

    // Initial positions
    gsap.set(carre, { opacity: 1, y: -squareHeight });
    gsap.set(".fragment", { opacity: 0, x: 0, y: 0, rotation: 0, scale: 1 });
    gsap.set(sol, { x: 0 });

    // Timeline juste pour la synchro scroll
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: isMobile ? 0.5 : 1, // Scrub plus rapide sur mobile
            markers: false,
            onUpdate: () => {
                setFragmentsContainerPosition();

                const prog = tl.scrollTrigger.progress;
                const solTop = sol.getBoundingClientRect().top;
                const viewHeight = getViewHeight();

                // PHASE 1 : descente (ease out)
                if (prog <= IMPACT_POINT) {
                    const startY = -squareHeight;
                    const endY = solTop - squareHeight;
                    const t = prog / IMPACT_POINT;
                    const eased = gsap.parseEase("power2.out")(t);
                    const y = startY + eased * (endY - startY);
                    gsap.set(carre, { y });
                    sol.style.opacity = 1;
                    gsap.set(".fragment", { opacity: 0 });
                    gsap.set(sol, { x: 0 });
                }
                // PHASE 2 : enfoncement (rebond)
                else if (prog <= BREAK_POINT) {
                    const t = (prog - IMPACT_POINT) / (BREAK_POINT - IMPACT_POINT);
                    const eased = gsap.parseEase("elastic.out(1, 0.5)")(t);
                    const y = solTop - squareHeight + eased * (20 * mobileScale);
                    gsap.set(carre, { y });
                    sol.style.opacity = 1;
                    gsap.set(".fragment", { opacity: 0 });
                    gsap.set(sol, { y: eased * (6 * mobileScale) });
                }
                // PHASE 3 : cassure/dispersion
                else {
                    const t = (prog - BREAK_POINT) / (1 - BREAK_POINT);
                    const eased = gsap.parseEase("power2.in")(t);
                    const startY = solTop - squareHeight + (20 * mobileScale);
                    const finalY = viewHeight;
                    const y = startY + eased * (finalY - startY);
                    gsap.set(carre, { y });
                    sol.style.opacity = Math.max(0, 1 - eased * 200);

                    // Fragments : delay progressif pour chaque fragment
                    gsap.set(".fragment", {
                        opacity: 1,
                        x: i => {
                            const delay = i / fragments.length * 0.2;
                            const localT = Math.max(0, (t - delay) / (1 - delay));
                            // Réduire la dispersion sur mobile
                            const dispersionFactor = isMobile ? 0.7 : 1;
                            return fragments[i].xOffset * localT * dispersionFactor;
                        },
                        y: i => {
                            const delay = i / fragments.length * 0.2;
                            const localT = Math.max(0, (t - delay) / (1 - delay));
                            // Réduire la dispersion sur mobile
                            const dispersionFactor = isMobile ? 0.7 : 1;
                            return fragments[i].yOffset * localT * dispersionFactor;
                        },
                        rotation: i => {
                            const delay = i / fragments.length * 0.2;
                            const localT = Math.max(0, (t - delay) / (1 - delay));
                            return fragments[i].rotation * localT;
                        },
                        scale: i => {
                            const delay = i / fragments.length * 0.2;
                            const localT = Math.max(0, (t - delay) / (1 - delay));
                            return 1 - localT * 0.3;
                        }
                    });
                }
            }
        }
    });
}

onMount(() => {
    checkMobile();
    let scrollHeight = getScrollHeight();
    
    function updateScrollHeight() {
        scrollHeight = getScrollHeight();
    }
    
    function handleResize() {
        checkMobile();
        updateScrollHeight();
        setFragmentsContainerPosition();
        
        // Réinitialiser l'animation lors du redimensionnement
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        animateScroll({ getViewHeight: () => scrollHeight });
    }
    
    window.addEventListener('resize', handleResize);

    // Init Lenis avec des paramètres adaptés aux mobiles
    lenis = new Lenis({
        duration: isMobile ? 0.8 : 1.2, // Plus court sur mobile
        easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: true, // Activer le défilement fluide sur tactile
        touchMultiplier: isMobile ? 1.5 : 2, // Ajuster pour mobile
        infinite: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    setFragmentsContainerPosition();
    window.addEventListener('scroll', setFragmentsContainerPosition);

    animateScroll({ getViewHeight: () => scrollHeight });

    onDestroy(() => {
        window.removeEventListener('scroll', setFragmentsContainerPosition);
        window.removeEventListener('resize', handleResize);
        lenis?.destroy();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
});
</script>

<div class="animation-overlay">
    <div
        bind:this={carre}
        class="carre"
        ></div>
    <div bind:this={fragmentsContainer} class="fragments-container">
        {#each fragments as fragment, i}
        <div
            class="fragment"
            style="
            width: {fragment.width}px;
            height: {fragment.height}px;
            z-index: {fragment.zIndex};
            background-color: {fragment.color};
            "
            ></div>
        {/each}
    </div>
</div>

<div
    class="animation-component"
    style="margin-top: {SOL_OFFSET_VH}vh;"
    >
    <div bind:this={sol} class="sol"></div>
    <div class="scroll-space"></div>
</div>

<style>
.animation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    pointer-events: none;
}

.carre {
    position: absolute;
    width: 100px;
    height: 100px;
    background: #3498db;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 10;
    transition: width 0.3s ease, height 0.3s ease;
}

.fragments-container {
    position: fixed;
}

.fragment {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: center;
    border-radius: 2px;
    opacity: 0;
}

.animation-component {
    position: relative;
    width: 100%;
    z-index: 500;
}

.sol {
    width: 300px;
    height: 20px;
    background: #333;
    margin: 0 auto;
    position: relative;
    z-index: 500;
    transition: width 0.3s ease, height 0.3s ease;
}

.scroll-space {
    height: 100vh;
}

html.lenis {
    height: auto;
}

.lenis.lenis-smooth {
    scroll-behavior: auto;
}

.lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
}

.lenis.lenis-stopped {
    overflow: hidden;
}

.lenis.lenis-scrolling iframe {
    pointer-events: none;
}

/* Tablette */
@media (max-width: 1024px) {
    .sol {
        width: 250px;
    }
}

/* Mobile */
@media (max-width: 768px) {
    .sol {
        width: 200px;
    }
}

/* Petit mobile */
@media (max-width: 480px) {
    .sol {
        width: 180px;
    }
}
</style>
