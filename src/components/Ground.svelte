<script>
  import { onMount, onDestroy } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import Lenis from "lenis";
  import {
    SOL_OFFSET_VH,
    IMPACT_POINT,
    BREAK_POINT,
    FRAGMENT_COUNT,
    SQUARE_HEIGHT,
    SQUARE_WIDTH,
    SOL_HEIGHT,
    createFragments,
  } from "./constants.js";

  let carre, sol, fragmentsContainer;
  let lenis;
  const fragments = createFragments(FRAGMENT_COUNT);
  let isMobile = false;

  function checkMobile() {
    isMobile = window.innerWidth <= 900;
    return isMobile;
  }

  function setFragmentsContainerPosition() {
    if (!sol || !fragmentsContainer) return;
    const rect = sol.getBoundingClientRect();
    gsap.set(fragmentsContainer, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  }

  function getScrollHeight() {
    return document.documentElement.scrollHeight - window.innerHeight;
  }

  function getHeroOffset() {
    const hero = document.querySelector(".hero");
    return hero ? hero.offsetHeight : 0;
  }

  function animateScroll({ getViewHeight }) {
    gsap.registerPlugin(ScrollTrigger);

    const heroOffset = getHeroOffset();
    const mobileScale = isMobile ? 0.7 : 1;
    const squareWidth = SQUARE_WIDTH * mobileScale;
    const squareHeight = SQUARE_HEIGHT * mobileScale;
    const solHeight = SOL_HEIGHT * mobileScale;

    // Dimensions des éléments
    gsap.set(carre, { width: squareWidth, height: squareHeight });
    gsap.set(sol, { height: solHeight });

    // Position initiale
    const initialY = -squareHeight + heroOffset;
    gsap.set(carre, { opacity: 0, y: initialY, autoAlpha: 1 });
    gsap.set(".fragment", { opacity: 0, x: 0, y: 0, rotation: 0, scale: 1 });
    gsap.set(sol, { x: 0 });

    // Timeline principale
    gsap.timeline({
      scrollTrigger: {
        trigger: "#features",
        start: "top 90%",
        end: "bottom bottom",
        scrub: isMobile ? 0.5 : 1,
        markers: true,
        onEnter: () => {
          gsap.to(carre, { opacity: 1, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to(carre, { opacity: 0, y: initialY, duration: 0.3 });
        },
        onUpdate: (self) => {
          setFragmentsContainerPosition();

          if (self.progress === 0) {
            gsap.set(carre, { y: initialY });
            return;
          }

          const prog = self.progress;
          const solTop = sol.getBoundingClientRect().top;
          const viewHeight = getViewHeight();

          // PHASE 1: Descente
          if (prog <= IMPACT_POINT) {
            const startY = initialY;
            const endY = solTop - squareHeight;
            const t = prog / IMPACT_POINT;
            const eased = gsap.parseEase("power2.out")(t);
            const y = startY + eased * (endY - startY);
            gsap.set(carre, { y });
            sol.style.opacity = 1;
            gsap.set(".fragment", { opacity: 0 });
            gsap.set(sol, { x: 0 });
          } 
          // PHASE 2: Rebond
          else if (prog <= BREAK_POINT) {
            const t = (prog - IMPACT_POINT) / (BREAK_POINT - IMPACT_POINT);
            const eased = gsap.parseEase("elastic.out(1, 0.5)")(t);
            const y = solTop - squareHeight + eased * (20 * mobileScale);
            gsap.set(carre, { y });
            sol.style.opacity = 1;
            gsap.set(".fragment", { opacity: 0 });
            gsap.set(sol, { y: eased * (6 * mobileScale) });
          } 
          // PHASE 3: Dispersion
          else {
            const t = (prog - BREAK_POINT) / (1 - BREAK_POINT);
            const eased = gsap.parseEase("power2.in")(t);
            const startY = solTop - squareHeight + 20 * mobileScale;
            const finalY = viewHeight;
            const y = startY + eased * (finalY - startY);
            gsap.set(carre, { y });
            sol.style.opacity = Math.max(0, 1 - eased * 200);

            // Animation des fragments
            gsap.set(".fragment", {
              opacity: 1,
              x: (i) => {
                const delay = (i / fragments.length) * 0.2;
                const localT = Math.max(0, (t - delay) / (1 - delay));
                const dispersionFactor = isMobile ? 0.7 : 1;
                return fragments[i].xOffset * localT * dispersionFactor;
              },
              y: (i) => {
                const delay = (i / fragments.length) * 0.2;
                const localT = Math.max(0, (t - delay) / (1 - delay));
                const dispersionFactor = isMobile ? 0.7 : 1;
                return fragments[i].yOffset * localT * dispersionFactor;
              },
              rotation: (i) => {
                const delay = (i / fragments.length) * 0.2;
                const localT = Math.max(0, (t - delay) / (1 - delay));
                return fragments[i].rotation * localT;
              },
              scale: (i) => {
                const delay = (i / fragments.length) * 0.2;
                const localT = Math.max(0, (t - delay) / (1 - delay));
                return 1 - localT * 0.3;
              },
            });
          }
        },
      },
    });
  }

  onMount(() => {
    checkMobile();
    let scrollHeight = getScrollHeight();

    function handleResize() {
      checkMobile();
      scrollHeight = getScrollHeight();
      setFragmentsContainerPosition();

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      animateScroll({ getViewHeight: () => scrollHeight });
    }

    window.addEventListener("resize", handleResize);

    // Initialisation de Lenis
    lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: isMobile ? 1.5 : 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    setFragmentsContainerPosition();
    window.addEventListener("scroll", setFragmentsContainerPosition);

    animateScroll({ getViewHeight: () => scrollHeight });

    onDestroy(() => {
      window.removeEventListener("scroll", setFragmentsContainerPosition);
      window.removeEventListener("resize", handleResize);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });
  });
</script>

<div class="animation-overlay">
  <div bind:this={carre} class="carre"></div>
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

<div class="animation-component" style="margin-top: {SOL_OFFSET_VH}vh;">
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
    visibility: hidden;
    position: absolute;
    width: 400px;
    height: 400px;
    background-image: url("/assets/images/Guy.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 10;
    transition:
      width 0.3s ease,
      height 0.3s ease;
  }

  .fragments-container {
    position: fixed;
    pointer-events: none;
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
    pointer-events: none;
  }

  .sol {
    width: 300px;
    height: 20px;
    background: #333;
    margin: 0 auto;
    position: relative;
    z-index: 500;
    transition:
      width 0.3s ease,
      height 0.3s ease;
  }

  .scroll-space {
    height: 150vh;
    pointer-events: none;
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
