<script>
  import { onMount, onDestroy } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { ANIMATION_CONFIG, createFragments, getResponsiveScale } from "./animationConfig.js";

  let character, fragmentsContainer;
  let fragments = createFragments();
  let currentScale = 1;

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
      zIndex: config.zIndex.fragments,
      visibility: 'visible'
    });

    ScrollTrigger.create({
      trigger: config.selectors.hero,
      start: "top center",
      end: () => `${section2.offsetTop + 400}px center`, // Plus de distance pour plus de chute
      scrub: 1,
      markers: true,
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
    const section2Top = section2.offsetTop;
    const section2Rect = section2.getBoundingClientRect();
    
    // Position de départ dans le hero
    const startY = heroTop + (heroHeight * config.character.heroPosition / 100);
    
    // Le personnage suit le scroll mais plus lentement
    const scrollOffset = window.pageYOffset;
    const characterY = startY - scrollOffset + (scrollOffset * config.fallSpeed.scrollMultiplier);

    // Collision plus tard dans l'animation
    const hasCollided = progress >= 0.6; // 60% au lieu de 50%

    console.log(`Progress: ${progress.toFixed(2)} | CharY: ${characterY.toFixed(0)} | Collided: ${hasCollided}`);

    if (!hasCollided) {
      // PHASE 1: Chute libre plus longue
      gsap.set(character, { 
        y: characterY, 
        opacity: 1,
        visibility: 'visible',
        zIndex: config.zIndex.character
      });
      
      gsap.set(".fragment", { 
        opacity: 0
      });
      
      console.log(`🔽 CHUTE LIBRE`);
      
    } else {
      // COLLISION DÉTECTÉE à 60%
      const collisionProgress = (progress - 0.6) / 0.4; // 0 à 1 de 60% à 100%
      
      // POSITIONNER LES FRAGMENTS
      gsap.set(fragmentsContainer, {
        left: "50%",
        top: section2Rect.top + "px",
        xPercent: -50,
        yPercent: 0
      });
      
      if (collisionProgress <= 0.3) {
        // PHASE 2A: Impact initial - fragments éclatent SEULEMENT maintenant
        const impactScreenY = section2Rect.top - (config.character.height * currentScale);
        const transitionY = characterY + (impactScreenY - characterY) * (collisionProgress / 0.3);
        const slowY = transitionY + (15 * currentScale * (collisionProgress / 0.3)); // Ralentissement plus subtil
        
        gsap.set(character, { 
          y: slowY, 
          opacity: 1,
          visibility: 'visible',
          zIndex: config.zIndex.character
        });
        
        // FRAGMENTS ÉCLATENT MAINTENANT (pas avant)
        fragments.forEach((fragment, index) => {
          gsap.set(`.fragment:nth-child(${index + 1})`, {
            opacity: 1,
            visibility: 'visible',
            x: fragment.xVelocity * (collisionProgress / 0.3) * currentScale * 0.3,
            y: fragment.yVelocity * (collisionProgress / 0.3) * currentScale * 0.3,
            rotation: fragment.rotation * (collisionProgress / 0.3),
            scale: 2,
            backgroundColor: fragment.color
          });
        });
        
        console.log(`💥 IMPACT! Progress: ${collisionProgress.toFixed(2)}`);
        
      } else if (collisionProgress <= 0.7) {
        // PHASE 2B: Le personnage continue à tomber après l'impact
        const continueProgress = (collisionProgress - 0.3) / 0.4; // 0 à 1 de 30% à 70%
        const impactScreenY = section2Rect.top - (config.character.height * currentScale);
        const continueFallY = impactScreenY + 15 * currentScale + (80 * currentScale * continueProgress);
        
        gsap.set(character, { 
          y: continueFallY, 
          opacity: 1,
          visibility: 'visible',
          zIndex: config.zIndex.character // Reste visible
        });
        
        // Fragments continuent leur mouvement
        fragments.forEach((fragment, index) => {
          gsap.set(`.fragment:nth-child(${index + 1})`, {
            opacity: 1,
            visibility: 'visible',
            x: fragment.xVelocity * (1 + continueProgress * 0.5) * currentScale * 0.3,
            y: fragment.yVelocity * (1 + continueProgress * 0.5) * currentScale * 0.3,
            rotation: fragment.rotation * (1 + continueProgress * 0.5),
            scale: 2,
            backgroundColor: fragment.color
          });
        });
        
        console.log(`⬇️ CHUTE CONTINUE! Progress: ${continueProgress.toFixed(2)}`);
        
      } else {
        // PHASE 2C: Disparition finale
        const fadeProgress = (collisionProgress - 0.7) / 0.3; // 0 à 1 de 70% à 100%
        const impactScreenY = section2Rect.top - (config.character.height * currentScale);
        const finalY = impactScreenY + 95 * currentScale + (50 * currentScale * fadeProgress);
        
        gsap.set(character, { 
          y: finalY, 
          opacity: Math.max(0, 1 - fadeProgress * 2),
          visibility: 'visible',
          zIndex: config.zIndex.behindSection2 // Passe derrière maintenant
        });
        
        // Fragments disparaissent
        fragments.forEach((fragment, index) => {
          gsap.set(`.fragment:nth-child(${index + 1})`, {
            opacity: Math.max(0, 1 - fadeProgress * 0.8),
            visibility: 'visible',
            x: fragment.xVelocity * (1.5 + fadeProgress * 0.3) * currentScale * 0.3,
            y: fragment.yVelocity * (1.5 + fadeProgress * 0.3) * currentScale * 0.3,
            rotation: fragment.rotation * (1.5 + fadeProgress),
            scale: Math.max(1, 2 - fadeProgress),
            backgroundColor: fragment.color
          });
        });
        
        console.log(`👻 DISPARITION! Fade: ${fadeProgress.toFixed(2)}`);
      }
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
  <div 
    bind:this={character} 
    class="character"
    style="background-image: url('{ANIMATION_CONFIG.character.image}');"
  ></div>
  
  <div bind:this={fragmentsContainer} class="fragments-container">
    {#each fragments as fragment}
      <div 
        class="fragment"
        style="
          width: {fragment.width}px;
          height: {fragment.height}px;
          background-color: {fragment.color};
          border: 2px solid #ff0000;
        "
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
    z-index: 102;
  }

  .fragment {
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 2px;
    visibility: visible;
  }
</style>
