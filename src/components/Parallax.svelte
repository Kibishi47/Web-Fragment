<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let decorPanel1, decorPanel2, mainPanel;

  // Couleur et opacité pour les panneaux décoratifs
  const decorPanelColor = '#1B0B3E';
  const decorPanelOpacity = 0.5;

  onMount(() => {
    if (!decorPanel1 || !decorPanel2 || !mainPanel) {
      console.error("ERREUR: Panneaux non référencés.");
      return;
    }
    
    gsap.registerPlugin(ScrollTrigger);

    // Tous les panneaux commencent en bas
    gsap.set([decorPanel1, decorPanel2, mainPanel], { y: '100vh' });

    // Trigger commun
    const commonTrigger = {
      trigger: "body",
      start: "top top", 
      end: "+=1000vh", // Animation sur 500vh de défilement
      scrub: true,
      markers: false // Désactiver en production
    };

    // Panneau décoratif 1 (arrière-plan, le plus lent)
    // Panneau décoratif 1 (arrière-plan, commence plus haut)
    gsap.fromTo(decorPanel1, 
      { y: '75vh' }, // Position de départ plus haute
      {
        y: '-75vh', // Position finale
        ease: 'none',
        scrollTrigger: { ...commonTrigger }
      }
    );

    // Panneau décoratif 2 (position intermédiaire)
    gsap.fromTo(decorPanel2, 
      { y: '150vh' }, // Position de départ intermédiaire
      {
        y: '-75vh', // Position finale
        ease: 'none',
        scrollTrigger: { ...commonTrigger }
      }
    );

    // Panneau principal avec texte (commence plus bas)
    gsap.fromTo(mainPanel, 
      { y: '300vh' }, // Position de départ standard
      {
        y: '-75vh', // Position finale
        ease: 'none',
        scrollTrigger: { ...commonTrigger }
      }
    );
  });

  onDestroy(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
</script>

<!-- Espace pour permettre le défilement -->
<!-- <div class="scroll-enabler" style="height: 600vh; position: relative; z-index: 10;"> -->
  <!-- 100vh (pour la page visible) + 500vh (pour le 'end' de scrollTrigger) -->
<!-- </div> -->

<!-- Conteneur fixe pour les panneaux de parallaxe -->
<div class="parallax-container">
    <!-- Panneau décoratif 1 (arrière-plan) -->
    <div bind:this={decorPanel1} 
        class="parallax-panel" 
        style="background-color: blue; z-index: 1;">
    </div>
    
    <!-- Panneau décoratif 2 -->
    <div bind:this={decorPanel2} 
        class="parallax-panel"
        style="background-color: red; z-index: 2;">
    </div>
    
    <!-- Panneau principal avec texte -->
    <div bind:this={mainPanel} 
        class="parallax-panel main-panel"
        style="background-color: yellow; z-index: 3;">
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
  }

  .parallax-panel {
    position: absolute;
    width: 100%;
    height: 70vh;
    left: 0;
    top: 0; 
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: transform;
  }
  
  .main-panel {
    /* Le panneau principal peut avoir des styles différents */
    pointer-events: auto; /* Permet l'interaction avec le contenu */
    background-color: transparent; /* Transparent pour voir les panneaux décoratifs */
  }
</style>
