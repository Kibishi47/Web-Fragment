<script>
  import { onMount, onDestroy } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { ANIMATION_CONFIG, createFragments, getResponsiveScale } from "./animationConfig.js";

  let character, fragmentsContainer;
  let fragments = createFragments();
  let currentScale = 1;
  let fragmentsTriggered = false;

  function setupAnimation() {
    gsap.registerPlugin(ScrollTrigger);
    
    currentScale = getResponsiveScale();
    const config = ANIMATION_CONFIG;
    
    const hero = document.querySelector(config.selectors.hero);
    const section2 = document.querySelector(config.selectors.section2);
    
    if (!hero || !section2) {
      console.error('Hero ou Section2 non trouvés !');
      return;
    }

    // Configuration du personnage
    gsap.set(character, {
      width: config.character.width * currentScale,
      height: config.character.height * currentScale,
      opacity: 1,
      visibility: 'visible',
      left: "50%",
      xPercent: -50,
      zIndex: config.zIndex.character
    });

    gsap.set(".fragment", {
      opacity: 0,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      visibility: 'visible'
    });

    gsap.set(fragmentsContainer, {
      position: 'fixed',
      zIndex: config.zIndex.fragmentsFront,
      visibility: 'visible'
    });

    ScrollTrigger.create({
      trigger: config.selectors.hero,
      start: "top center",
      end: () => `${section2.offsetTop + 600}px center`,
      scrub: 1,
      markers: false,
      onUpdate: (self) => {
        animatePhases(self.progress);
      }
    });
  }

  function animatePhases(progress) {
    const config = ANIMATION_CONFIG;
    
    const hero = document.querySelector(config.selectors.hero);
    const section2 = document.querySelector(config.selectors.section2);
    
    if (!hero || !section2) return;

    const heroTop = hero.offsetTop;
    const heroHeight = hero.offsetHeight;
    const section2Rect = section2.getBoundingClientRect();
    
    const startY = heroTop + (heroHeight * config.character.heroPosition / 100);
    const scrollOffset = window.pageYOffset;
    const characterY = startY - scrollOffset + (scrollOffset * config.fallSpeed.scrollMultiplier);
    const hasCollided = progress >= 0.6;

    // Fade du personnage après 80%
    let characterOpacity = 1;
    if (progress >= 0.8) {
      const fadeProgress = (progress - 0.8) / 0.2;
      characterOpacity = Math.max(0, 1 - fadeProgress);
    }

    // Réinitialiser si on revient en arrière
    if (progress < 0.6) {
      fragmentsTriggered = false;
    }

    console.log(`Progress: ${progress.toFixed(2)} | CharY: ${characterY.toFixed(0)} | Collided: ${hasCollided}`);

    if (!hasCollided) {
      // PHASE 1: Chute libre
      gsap.set(character, { 
        y: characterY, 
        opacity: characterOpacity,
        visibility: 'visible',
        zIndex: config.zIndex.character
      });
      
      gsap.set(".fragment", { 
        opacity: 0
      });
      
      console.log(`🔽 CHUTE LIBRE`);
      
    } else {
      // PHASE 2: Collision
      
      if (!fragmentsTriggered) {
        fragmentsTriggered = true;
        console.log('🎆 FRAGMENTS DÉCLENCHÉS !');
      }
      
      const collisionProgress = (progress - 0.6) / 0.4;
      
      // POSITIONNER LES FRAGMENTS
      gsap.set(fragmentsContainer, {
        left: "50%",
        top: section2Rect.top + "px",
        xPercent: -50,
        yPercent: 0
      });
      
      // Le personnage continue sa chute
      gsap.set(character, { 
        y: characterY,
        opacity: characterOpacity,
        visibility: 'visible',
        zIndex: progress >= 0.7 ? config.zIndex.behindSection2 : config.zIndex.character
      });
      
      // ANIMATION DES FRAGMENTS
      fragments.forEach((fragment, index) => {
        const time = collisionProgress * 3;
        
        let x = fragment.startX + fragment.xVelocity * time;
        let y = fragment.startY + fragment.yVelocity * time + (config.fragments.gravity * time * time * 50);
        
        const friction = Math.pow(config.fragments.friction, time * 60);
        x *= friction;
        
        const rotation = fragment.rotation + fragment.rotationSpeed * time * 60;
        
        let opacity = 1;
        if (collisionProgress >= 0.5) {
          const fadeProgress = (collisionProgress - 0.5) / 0.5;
          opacity = Math.max(0, 1 - fadeProgress * 0.8);
        }
        
        const zIndex = fragment.zLayer === 'front' ? config.zIndex.fragmentsFront : config.zIndex.fragmentsBehind;
        
        gsap.set(`.fragment:nth-child(${index + 1})`, {
          opacity: opacity,
          visibility: 'visible',
          x: x * currentScale,
          y: y * currentScale,
          rotation: rotation,
          scale: Math.max(0.5, 1 - collisionProgress * 0.3),
          zIndex: zIndex
        });
      });
      
      console.log(`💥 COLLISION! CollisionProgress: ${collisionProgress.toFixed(2)}`);
    }
  }

  onMount(() => {
    currentScale = getResponsiveScale();
    
    setTimeout(() => {
      setupAnimation();
    }, 200);

    const handleResize = () => {
      currentScale = getResponsiveScale();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    onDestroy(() => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
  });
</script>

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
