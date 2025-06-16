<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import cloudUrl from '../assets/images/clouds.png';

  let decorPanel1, decorPanel2, mainPanel;
  let isMobile = false;

  // Couleur et opacité pour les panneaux décoratifs
  const decorPanelColor = '#1B0B3E';
  const decorPanelOpacity = 0.5;

  function checkMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
  }

  onMount(() => {
    checkMobile();
    
    if (!decorPanel1 || !decorPanel2 || !mainPanel) {
      console.error("ERREUR: Panneaux non référencés.");
      return;
    }
    
    gsap.registerPlugin(ScrollTrigger);

    // Tous les panneaux commencent en bas
    gsap.set([decorPanel1, decorPanel2, mainPanel], { y: '100vh' });

    function setupParallax() {
      // Nettoyer les animations existantes
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Ajuster les valeurs de parallaxe en fonction de la taille de l'écran
      const mobileFactor = isMobile ? 0.6 : 1;
      
      // Trigger commun
      const commonTrigger = {
        trigger: "body",
        start: "top top", 
        end: isMobile ? "+=700vh" : "+=1000vh", // Réduire la distance sur mobile
        scrub: isMobile ? 0.5 : true, // Scrub plus rapide sur mobile
        markers: true,
      };

      // Panneau décoratif 1 (arrière-plan, commence plus haut)
      gsap.fromTo(decorPanel1, 
        { y: `${90 * mobileFactor}vh` }, // Position de départ plus haute
        {
          y: `${-90 * mobileFactor}vh`, // Position finale
          ease: 'none',
          scrollTrigger: { ...commonTrigger }
        }
      );

      // Panneau décoratif 2 (position intermédiaire)
      gsap.fromTo(decorPanel2, 
        { y: `${180 * mobileFactor}vh` }, // Position de départ intermédiaire
        {
          y: `${-90 * mobileFactor}vh`, // Position finale
          ease: 'none',
          scrollTrigger: { ...commonTrigger }
        }
      );

      // Panneau principal avec texte (commence plus bas)
      gsap.fromTo(mainPanel, 
        { y: `${360 * mobileFactor}vh` }, // Position de départ standard
        {
          y: `${-90 * mobileFactor}vh`, // Position finale
          ease: 'none',
          scrollTrigger: { ...commonTrigger }
        }
      );
    }
    
    setupParallax();
    
    // Réinitialiser le parallaxe lors du redimensionnement
    const handleResize = () => {
      const wasMobile = isMobile;
      checkMobile();
      
      // Seulement réinitialiser si le statut mobile a changé
      if (wasMobile !== isMobile) {
        setupParallax();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    onDestroy(() => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
  });
</script>

<!-- Conteneur fixe pour les panneaux de parallaxe -->
<div class="parallax-container">
    <!-- Panneau décoratif 1 (arrière-plan) -->
    <div bind:this={decorPanel1} 
        class="parallax-panel" 
        style="
          background-image: url({cloudUrl}) !important;
          background-size: cover;
          background-position: center;
          opacity: 1;
          z-index: 1;">
    </div>
    
    <!-- Panneau décoratif 2 -->
    <div bind:this={decorPanel2} 
        class="parallax-panel"
        style="z-index: 2;">
    </div>
    
    <!-- Panneau principal avec texte -->
    <div bind:this={mainPanel} 
        class="parallax-panel main-panel"
        style="z-index: 3;">
        <slot>
          <!-- Le contenu principal sera inséré ici -->
        </slot>
    </div>
</div>

<style>
  :global(body) {
    margin: 0;
    background-color: #1B0B3E; 
  }

  .parallax-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1; 
    pointer-events: none;
    overflow: hidden;
    pointer-events: none;
  }

  .parallax-panel {
    position: absolute;
    width: 100%;
    height: 90vh;
    left: 0;
    top: 0; 
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: transform;
    transition: height 0.3s ease;
    pointer-events: none;
  }
  
  .main-panel {
    /* Le panneau principal peut avoir des styles différents */
    pointer-events: auto; /* Permet l'interaction avec le contenu */
    background-color: transparent; /* Transparent pour voir les panneaux décoratifs */
  }
  
  /* Tablette */
  @media (max-width: 1024px) {
    .parallax-panel {
      height: 85vh;
    }
  }
  
  /* Mobile */
  @media (max-width: 768px) {
    .parallax-panel {
      height: 80vh;
    }
  }
  
  /* Petit mobile */
  @media (max-width: 480px) {
    .parallax-panel {
      height: 75vh;
    }
  }
</style>
