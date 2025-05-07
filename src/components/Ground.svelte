<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import Lenis from '@studio-freight/lenis';
  
  let carre;
  let sol;
  let fragmentsContainer;
  let lenis;
  
  // Points de déclenchement du défilement
  const impactPoint = 0.25; // Quand le carré touche le sol
  const breakPoint = 0.3;   // Quand le sol se casse
  
  // Créer les données des fragments avec des déplacements plus importants
  const fragmentCount = 15;
  const fragments = Array.from({ length: fragmentCount }, () => {
    // Déterminer si le fragment va vers le haut ou vers le bas (majorité vers le bas)
    const goesDown = Math.random() < 0.7; // 70% de chance d'aller vers le bas
    
    return {
      width: Math.random() < 0.25 ? Math.random() * 50 + 30 : Math.random() * 30 + 15,
      height: Math.random() < 0.25 ? Math.random() * 30 + 15 : Math.random() * 15 + 5,
      // Déplacement horizontal plus important
      xOffset: (Math.random() - 0.5) * 1200, // Doublé pour aller plus loin
      // Déplacement vertical favorisant la direction vers le bas
      yOffset: goesDown 
              ? Math.random() * 600 + 100 // Vers le bas, plus loin
              : -Math.random() * 200 - 50, // Vers le haut, moins loin
      // Rotation plus importante
      rotation: Math.random() * 1440 - 720, // Doublée pour plus de rotation
      zIndex: Math.random() < 0.3 ? 15 : 5,
      color: Math.random() < 0.25 ? '#222' : '#333'
    };
  });
  
  onMount(() => {
    // Initialiser Lenis pour un défilement fluide
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Fonction d'easing personnalisée
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    
    // Fonction de mise à jour pour Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    // Démarrer la boucle d'animation
    requestAnimationFrame(raf);
    
    // Connecter Lenis à GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    // Enregistrer le plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialiser les éléments
    gsap.set(carre, { 
      opacity: 1,
      y: -window.innerHeight * 0.7 // Positionné très haut mais déjà visible
    });
    
    // Initialiser les fragments
    gsap.set(".fragment", { 
      opacity: 0,
      x: 0,
      y: 0,
      rotation: 0
    });
    
    // Fonction pour mettre à jour la position des fragments
    function updateFragmentsPosition() {
      if (sol) {
        const solRect = sol.getBoundingClientRect();
        gsap.set(fragmentsContainer, {
          top: solRect.top,
          left: solRect.left,
          width: solRect.width,
          height: solRect.height
        });
      }
    }
    
    // Mettre à jour la position des fragments au défilement
    window.addEventListener('scroll', updateFragmentsPosition);
    
    // Animation au scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const scrollProgress = self.progress;
        
        // Mettre à jour la position des fragments
        updateFragmentsPosition();
        
        // Phase 1: Le carré descend vers le sol
        if (scrollProgress <= impactPoint) {
          // Animation du carré qui descend de très haut
          const startY = -window.innerHeight * 0.7;
          const solRect = sol ? sol.getBoundingClientRect() : { top: window.innerHeight - 50 };
          const endY = solRect.top - 100; // Position du sol moins la hauteur du carré
          const carreY = startY + (scrollProgress / impactPoint) * (endY - startY);
          
          gsap.set(carre, { y: carreY });
          
          // Sol visible
          if (sol) sol.style.opacity = 1;
          
          // Fragments invisibles
          gsap.set(".fragment", { opacity: 0 });
        }
        // Phase 2: Le carré touche le sol mais le sol n'est pas encore cassé
        else if (scrollProgress <= breakPoint) {
          // Le carré s'enfonce légèrement dans le sol
          const solRect = sol ? sol.getBoundingClientRect() : { top: window.innerHeight - 50 };
          const progress = (scrollProgress - impactPoint) / (breakPoint - impactPoint);
          const carreY = solRect.top - 100 + progress * 20; // Enfoncement léger
          
          gsap.set(carre, { y: carreY });
          
          // Sol visible
          if (sol) sol.style.opacity = 1;
          
          // Fragments invisibles
          gsap.set(".fragment", { opacity: 0 });
        }
        // Phase 3: Le sol se casse, les fragments apparaissent, le carré continue de descendre
        else {
          // Le carré continue de descendre jusqu'au bas de la page
          const solRect = sol ? sol.getBoundingClientRect() : { top: window.innerHeight - 50 };
          const progress = (scrollProgress - breakPoint) / (1 - breakPoint);
          
          // Calculer la position finale pour que le carré soit complètement en bas de la page
          const finalY = window.innerHeight; // Position du bas de la page
          const startY = solRect.top - 80; // Position après l'impact
          const carreY = startY + progress * (finalY - startY);
          
          gsap.set(carre, { y: carreY });
          
          // Sol invisible progressivement mais plus rapidement
          if (sol) sol.style.opacity = Math.max(0, 1 - progress * 10);
          
          // Fragments visibles avec dispersion plus importante
          gsap.set(".fragment", { 
            opacity: 1,
            x: (i) => fragments[i].xOffset * progress,
            y: (i) => fragments[i].yOffset * progress,
            rotation: (i) => fragments[i].rotation * progress,
            // Ajouter un effet de gravité pour les fragments qui tombent
            scale: 1 - (progress * 0.3) // Légère réduction de taille avec la distance
          });
        }
      }
    });
    
    // Nettoyage lors de la destruction du composant
    return () => {
      window.removeEventListener('scroll', updateFragmentsPosition);
      if (lenis) {
        lenis.destroy();
      }
    };
  });
</script>

<!-- Éléments fixes qui se superposent -->
<div class="animation-overlay">
  <!-- Le carré qui tombe -->
  <div bind:this={carre} class="carre"></div>
  
  <!-- Les fragments -->
  <div bind:this={fragmentsContainer} class="fragments-container">
    {#each fragments as fragment, i}
      <div class="fragment" 
           style="width: {fragment.width}px; height: {fragment.height}px; z-index: {fragment.zIndex}; background-color: {fragment.color};">
      </div>
    {/each}
  </div>
</div>

<!-- Composant d'animation avec le sol qui défile -->
<div class="animation-component">
  <!-- Le sol qui défile avec la page mais se superpose aux autres éléments -->
  <div bind:this={sol} class="sol"></div>
  
  <!-- Espace pour le défilement -->
  <div class="scroll-space"></div>
</div>

<style>
  /* Conteneur d'animation qui se superpose à tout */
  .animation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000; /* Valeur élevée pour être au-dessus de tout */
    pointer-events: none; /* Permet de cliquer à travers */
  }
  
  .carre {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #3498db;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 10;
  }
  
  .fragments-container {
    position: fixed;
    /* Les dimensions et la position seront définies dynamiquement par GSAP */
  }
  
  .fragment {
    position: absolute;
    transform-origin: center center;
    border-radius: 2px;
    opacity: 0;
    /* Positionnement initial au centre exact du conteneur */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  /* Composant d'animation avec le sol */
  .animation-component {
    position: relative;
    width: 100%;
    z-index: 500; /* Au-dessus du contenu normal mais sous l'animation fixe */
    margin-top: -75vh; /* Positionne le sol plus haut sur la page */
  }
  
  /* Le sol qui défile avec la page */
  .sol {
    width: 300px;
    height: 20px;
    background-color: #333;
    margin: 0 auto;
    position: relative;
    z-index: 500; /* Même z-index que le composant parent */
  }
  
  /* Espace pour le défilement */
  .scroll-space {
    height: 200vh; /* Espace supplémentaire pour le défilement */
  }
  
  /* Styles pour le défilement fluide */
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
