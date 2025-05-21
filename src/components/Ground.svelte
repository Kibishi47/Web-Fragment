<script>
import {
    onMount,
    onDestroy
} from 'svelte';
import {
    gsap
} from 'gsap';
import {
    ScrollTrigger
} from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import {
    VIEW_H_VH,
    SOL_OFFSET_VH,
    IMPACT_POINT,
    BREAK_POINT,
    FRAGMENT_COUNT,
    SQUARE_HEIGHT,
    SQUARE_WIDTH,
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

function animateScroll({
    viewHeight
}) {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        markers: true,
        id: "ground",
        scrub: 1,
        onUpdate: self => {
            const prog = self.progress;
            setFragmentsContainerPosition();

            if (prog <= IMPACT_POINT) {
                const startY = -SQUARE_HEIGHT;
                const endY = sol.getBoundingClientRect().top - SQUARE_HEIGHT;
                const y = startY + (prog / IMPACT_POINT) * (endY - startY);
                gsap.set(carre, {
                    y
                });
                sol.style.opacity = 1;
                gsap.set(".fragment", {
                    opacity: 0
                });
            } else if (prog <= BREAK_POINT) {
                const p = (prog - IMPACT_POINT) / (BREAK_POINT - IMPACT_POINT);
                const y = sol.getBoundingClientRect().top - SQUARE_HEIGHT + p * 20;
                gsap.set(carre, {
                    y
                });
                sol.style.opacity = 1;
                gsap.set(".fragment", {
                    opacity: 0
                });
            } else {
                const p = (prog - BREAK_POINT) / (1 - BREAK_POINT);
                const startY = sol.getBoundingClientRect().top - SQUARE_HEIGHT + 20;
                const finalY = viewHeight;
                const y = startY + p * (finalY - startY);
                gsap.set(carre, {
                    y
                });
                sol.style.opacity = Math.max(0, 1 - p * 10);
                gsap.set(".fragment", {
                    opacity: 1,
                    x: i => fragments[i].xOffset * p,
                    y: i => fragments[i].yOffset * p,
                    rotation: i => fragments[i].rotation * p,
                    scale: 1 - p * 0.3
                });
            }
        }
    });
}

onMount(() => {
    const viewHeight = window.innerHeight * (VIEW_H_VH / 100);

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

    // Initial positions
    gsap.set(carre, {
        opacity: 1,
        y: -viewHeight * 0.7
    });
    gsap.set(".fragment", {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0
    });

    setFragmentsContainerPosition();
    window.addEventListener('scroll', setFragmentsContainerPosition);

    animateScroll({
        viewHeight
    });

    onDestroy(() => {
        window.removeEventListener('scroll', setFragmentsContainerPosition);
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
