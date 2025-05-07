<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { CustomEase } from 'gsap/CustomEase';
    
    let carre;
    let sol;
    let monde;
    let initialAnimationComplete = false;
    let impactAnimationDone = false;
    
    // Paramètre configurable
    const transitionPoint = 0.3;
    
    // Créer les données des fragments avec plus de variété
    const fragmentCount = 15; // Plus de fragments
    const fragments = Array.from({ length: fragmentCount }, (_, i) => {
      // Déterminer si c'est un gros fragment (25% de chance)
      const isLarge = Math.random() < 0.25;
      // Déterminer si le fragment passe devant le carré (30% de chance)
      const isInFront = Math.random() < 0.3;
      // Déterminer la vitesse de parallax (entre 0.7 et 1.3)
      const parallaxFactor = 0.7 + Math.random() * 0.6;
      
      return {
        width: isLarge ? Math.random() * 50 + 30 : Math.random() * 30 + 15,
        height: isLarge ? Math.random() * 30 + 15 : Math.random() * 15 + 5,
        // Dispersion plus large pour les gros fragments
        xOffset: (Math.random() - 0.5) * (isLarge ? 700 : 500),
        // Certains fragments vont vers le haut, surtout les petits
        yOffset: (Math.random() > 0.3 || isLarge) 
                ? Math.random() * (isLarge ? 300 : 200) + 50 
                : -Math.random() * 200 - 50,
        rotation: Math.random() * 1080 - 540, // Rotation plus ample
        // Trajectoire fixe pour éviter les tremblements
        finalX: 0,
        finalY: 0,
        finalRotation: 0,
        // Effet de parallax
        parallaxFactor: parallaxFactor,
        // Z-index
        zIndex: isInFront ? 15 : 5,
        // Couleur légèrement variée
        color: isLarge ? '#222' : '#333'
      };
    });
    
    onMount(() => {
      // Enregistrer les plugins
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      
      // Position initiale du monde
      gsap.set(monde, { y: 0 });
      
      // Position initiale du carré
      gsap.set(carre, { 
        y: -100,
        left: "50%",
        xPercent: -50
      });
      
      // Position initiale du sol
      gsap.set(sol, {
        y: window.innerHeight - 50,
        left: "50%",
        xPercent: -50,
        opacity: 1
      });
      
      // Cacher les fragments initialement
      gsap.set(".fragment", { 
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0
      });
      
      // Animation initiale - le carré tombe jusqu'au sol
      gsap.to(carre, {
        // Position exacte pour toucher le sol
        y: window.innerHeight - 150,
        duration: 2,
        ease: CustomEase.create("custom", "M0,0 C0.012,0 0.687,0.252 0.868,0.541 0.984,0.726 0.954,0.707 1,1 "),
        delay: 0.5,
        onComplete: () => {
          initialAnimationComplete = true;
          // Déclencher l'animation d'impact
          animateImpact();
        }
      });
      
      function animateImpact() {
        // Faire disparaître le sol
        gsap.to(sol, {
          opacity: 0,
          duration: 0.3
        });
        
        // Précalculer les positions finales pour chaque fragment
        fragments.forEach((fragment, index) => {
          // Calculer une seule fois les positions finales pour éviter les tremblements
          fragment.finalX = fragment.xOffset;
          fragment.finalY = fragment.yOffset;
          fragment.finalRotation = fragment.rotation;
          
          const el = document.getElementById(`fragment-${index}`);
          
          // Faire apparaître
          gsap.to(el, {
            opacity: 1,
            duration: 0.1
          });
          
          // Projeter avec plus d'énergie - durée variable selon la taille
          const duration = fragment.width > 30 ? 1.5 : 1.2;
          
          gsap.to(el, {
            x: fragment.finalX,
            y: fragment.finalY,
            rotation: fragment.finalRotation,
            duration: duration,
            ease: "power2.out"
          });
        });
        
        // Continuer la chute du carré après l'impact
        gsap.to(carre, {
          y: window.innerHeight,
          duration: 1,
          ease: "power3.in",
          onComplete: () => {
            impactAnimationDone = true;
          }
        });
      }
      
      // Hauteur totale de défilement
      const scrollHeight = document.querySelector('.scroll-container').offsetHeight;
      // Hauteur de la fenêtre
      const windowHeight = window.innerHeight;
      
      // Animation au scroll - le monde remonte avec effet de parallax
      ScrollTrigger.create({
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          if (!impactAnimationDone) return;
          
          const scrollProgress = self.progress;
          const maxScrollDistance = scrollHeight - windowHeight;
          
          if (scrollProgress < transitionPoint) {
            // Première phase: le monde remonte normalement
            const scrollAmount = maxScrollDistance * scrollProgress;
            
            // Le monde remonte à vitesse normale
            gsap.set(monde, { y: -scrollAmount });
            
            // Les fragments ont un effet de parallax
            fragments.forEach((fragment, index) => {
              const el = document.getElementById(`fragment-${index}`);
              
              // Appliquer l'effet de parallax - certains fragments remontent plus vite/lentement
              const parallaxOffset = scrollAmount * (fragment.parallaxFactor - 1);
              
              gsap.set(el, {
                y: fragment.finalY - parallaxOffset
              });
            });
            
          } else {
            // Seconde phase: le monde continue de remonter, mais le carré tombe
            const scrollAmount = maxScrollDistance * transitionPoint;
            gsap.set(monde, { y: -scrollAmount });
            
            // Chute exponentielle du carré
            const fallProgress = (scrollProgress - transitionPoint) / (1 - transitionPoint);
            const easeProgress = gsap.parseEase("power4.in")(fallProgress);
            const startY = window.innerHeight; // Position après l'impact
            const endY = startY + 600; // Position finale de la chute
            const currentY = gsap.utils.interpolate(startY, endY, easeProgress);
            
            gsap.set(carre, { y: currentY });
            
            // Les fragments continuent aussi de tomber - avec effet de parallax
            fragments.forEach((fragment, index) => {
              const el = document.getElementById(`fragment-${index}`);
              
              // Position au point de transition avec parallax
              const parallaxOffset = scrollAmount * (fragment.parallaxFactor - 1);
              const startFragY = fragment.finalY - parallaxOffset;
              
              // Distance de chute variable selon la taille
              const fallDistance = fragment.width > 30 ? 700 : 500;
              const endFragY = startFragY + fallDistance;
              
              // Calculer la position actuelle
              const currentFragY = gsap.utils.interpolate(startFragY, endFragY, easeProgress);
              
              // Appliquer la position
              gsap.set(el, {
                y: currentFragY
              });
            });
          }
        }
      });
    });
  </script>
  
  <div class="scroll-container">
    <div class="fixed-container">
      <!-- Le monde qui contient tout -->
      <div bind:this={monde} class="monde">
        <!-- Le carré qui tombe -->
        <div bind:this={carre} class="carre"></div>
        
        <!-- Le sol qui se brise -->
        <div bind:this={sol} class="sol"></div>
        
        <!-- Les fragments -->
        <div class="fragments-container">
          {#each fragments as fragment, i}
            <div id={`fragment-${i}`} class="fragment" 
                 style="width: {fragment.width}px; height: {fragment.height}px; z-index: {fragment.zIndex}; background-color: {fragment.color};">
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="scroll-space"></div>
  </div>
  
  <style>
    .scroll-container {
      position: relative;
      width: 100%;
      height: 300vh;
    }
    
    .fixed-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
    
    .monde {
      position: relative;
      width: 100%;
      height: 200vh;
    }
    
    .carre {
      position: absolute;
      width: 100px;
      height: 100px;
      background-color: #3498db;
      z-index: 10;
    }
    
    .sol {
      position: absolute;
      width: 300px;
      height: 20px;
      background-color: #333;
      z-index: 5;
    }
    
    .fragments-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .fragment {
      position: absolute;
      transform-origin: center center;
      border-radius: 2px;
      top: calc(100vh - 50px); /* Position initiale au niveau du sol */
      left: 50%; /* Centré horizontalement */
      transform: translateX(-50%); /* Ajustement pour le centrage */
    }
    
    .scroll-space {
      height: 100%;
    }
  </style>
  