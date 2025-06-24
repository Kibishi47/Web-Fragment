<script>
  import { onMount, onDestroy } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { ANIMATION_CONFIG, createFragments, getResponsiveScale } from "./animationConfig.js";

  let character, fragmentsContainer;
  let fragments = createFragments();
  let currentScale = 1;
  let fragmentsTriggered = false;
  let isMobile = false;

  // Détection mobile
  function checkMobile() {
    isMobile = window.innerWidth <= 768;
  }

  function setupAnimation() {
    // Ne pas initialiser l'animation sur mobile
    if (isMobile) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    currentScale = getResponsiveScale();
    const config = ANIMATION_CONFIG;
    
    const hero = document.querySelector(config.selectors.hero);
    const section2 = document.querySelector(config.selectors.section2);
    
    if (!hero || !section2) {
      console.error('Hero ou Section2 non trouvés !');
      return;
    }

    // ... reste du code d'animation inchangé
  }

  onMount(() => {
    checkMobile();
    
    // Ne pas démarrer l'animation sur mobile
    if (isMobile) return;
    
    currentScale = getResponsiveScale();
    
    setTimeout(() => {
      setupAnimation();
    }, 200);

    const handleResize = () => {
      checkMobile();
      if (!isMobile) {
        currentScale = getResponsiveScale();
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);

    onDestroy(() => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
  });
</script>

<!-- Affichage conditionnel -->
{#if !isMobile}
  <div class="animation-overlay">
    <!-- Personnage principal -->
    <div 
      bind:this={character} 
      class="character"
      style="background-image: url('{ANIMATION_CONFIG.character.image}');"
    ></div>
    
    <!-- Fragments -->
    <div bind:this={fragmentsContainer} class="fragments-container">
      {#each fragments as fragment}
        <div 
          class="fragment {fragment.type} {fragment.zLayer}"
          style="--size: {fragment.size}px;"
        ></div>
      {/each}
    </div>
  </div>
{/if}

<!-- CSS inchangé -->
<style>
  .animation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    z-index: 100;
  }

  .character {
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    visibility: hidden;
  }

  .fragments-container {
    position: fixed;
    pointer-events: none;
  }

  .fragment {
    position: absolute;
    transform: translate(-50%, -50%);
    visibility: visible;
  }

  .triangle {
    width: 0;
    height: 0;
    border-left: calc(var(--size) * 0.5) solid transparent;
    border-right: calc(var(--size) * 0.5) solid transparent;
    border-bottom: var(--size) solid #6D09CE;
    filter: drop-shadow(0 2px 4px rgba(109, 9, 206, 0.4));
  }

  .square {
    width: var(--size);
    height: var(--size);
    background: #6D09CE;
    border-radius: 2px;
    filter: drop-shadow(0 2px 4px rgba(109, 9, 206, 0.4));
  }

  .triangle:nth-child(3n) {
    border-bottom: none;
    border-top: var(--size) solid #6D09CE;
  }

  .triangle:nth-child(5n) {
    border-left: var(--size) solid #6D09CE;
    border-top: calc(var(--size) * 0.5) solid transparent;
    border-bottom: calc(var(--size) * 0.5) solid transparent;
    border-right: none;
  }
</style>
