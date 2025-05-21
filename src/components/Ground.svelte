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

    // Initial positions
    gsap.set(carre, { opacity: 1, y: -SQUARE_HEIGHT });
    gsap.set(".fragment", { opacity: 0, x: 0, y: 0, rotation: 0, scale: 1 });
    gsap.set(sol, { x: 0 });

    // Timeline juste pour la synchro scroll
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            markers: false,
            // id: "ground",
            onUpdate: () => {
                setFragmentsContainerPosition();

                const prog = tl.scrollTrigger.progress;
                const solTop = sol.getBoundingClientRect().top;
                const viewHeight = getViewHeight();

                // PHASE 1 : descente (ease out)
                if (prog <= IMPACT_POINT) {
                    const startY = -SQUARE_HEIGHT;
                    const endY = solTop - SQUARE_HEIGHT;
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
                    const y = solTop - SQUARE_HEIGHT + eased * 20;
                    gsap.set(carre, { y });
                    sol.style.opacity = 1;
                    gsap.set(".fragment", { opacity: 0 });
                    gsap.set(sol, { y: eased * 6 });
                }
                // PHASE 3 : cassure/dispersion
                else {
                    const t = (prog - BREAK_POINT) / (1 - BREAK_POINT);
                    const eased = gsap.parseEase("power2.in")(t);
                    const startY = solTop - SQUARE_HEIGHT + 20;
                    const finalY = viewHeight;
                    const y = startY + eased * (finalY - startY);
                    gsap.set(carre, { y });
                    sol.style.opacity = Math.max(0, 1 - eased * 200);

                    // Sol vibre horizontalement au début de la cassure
                    /* const shake = t < 0.2 ? Math.sin(t * 30) * (1 - t / 0.2) * 10 : 0;
                    gsap.set(sol, { x: shake, y: 0 }); */

                    // const shake = t < 0.01 ? Math.sin(t * 500) * (1 - t / 0.01) * 30 : 0;
                    // gsap.set(sol, { x: shake, y: 0 });

                    // Fragments : delay progressif pour chaque fragment
                    gsap.set(".fragment", {
                        opacity: 1,
                        x: i => {
                            const delay = i / fragments.length * 0.2;
                            const localT = Math.max(0, (t - delay) / (1 - delay));
                            return fragments[i].xOffset * localT;
                        },
                        y: i => {
                            const delay = i / fragments.length * 0.2;
                            const localT = Math.max(0, (t - delay) / (1 - delay));
                            return fragments[i].yOffset * localT;
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
    let scrollHeight = getScrollHeight();
    function updateScrollHeight() {
        scrollHeight = getScrollHeight();
    }
    window.addEventListener('resize', updateScrollHeight);

    // Init Lenis
    lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
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
    window.addEventListener('resize', setFragmentsContainerPosition);

    animateScroll({ getViewHeight: () => scrollHeight });

    onDestroy(() => {
        window.removeEventListener('scroll', setFragmentsContainerPosition);
        window.removeEventListener('resize', setFragmentsContainerPosition);
        window.removeEventListener('resize', updateScrollHeight);
        lenis?.destroy();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
});
</script>

<div class="animation-overlay">
    <div
        bind:this={carre}
        class="carre"
        style="width: {SQUARE_WIDTH}px; height: {SQUARE_HEIGHT}px;"
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
    <div bind:this={sol} class="sol" style="height: {SOL_HEIGHT}px;"></div>
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
    /* height: 20px;  <-- Retiré, géré en JS */
    background: #333;
    margin: 0 auto;
    position: relative;
    z-index: 500;
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
</style>
