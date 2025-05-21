<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
    import { CustomEase } from 'gsap/CustomEase';
    
    let carre;
    let initialAnimationComplete = false;
    
    // Paramètre configurable
    const transitionPoint = 0.3;
    
    onMount(() => {
      // Enregistrer les plugins
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      
      // Position initiale
      gsap.set(carre, { 
        y: -100,
        left: "50%",
        xPercent: -50 // Centre le carré horizontalement
      });
      
      // Animation initiale avec courbe personnalisée
      gsap.to(carre, {
        y: window.innerHeight - 150,
        duration: 2,
        ease: CustomEase.create("custom", "M0,0 C0.012,0 0.687,0.252 0.868,0.541 0.984,0.726 0.954,0.707 1,1 "),
        delay: 0.5,
        onComplete: () => {
          initialAnimationComplete = true;
        }
      });
      
      // Hauteur totale de défilement
      const scrollHeight = document.querySelector('.scroll-container').offsetHeight;
      // Hauteur de la fenêtre
      const windowHeight = window.innerHeight;
      // Position finale du carré après l'animation initiale (en pixels depuis le haut)
      const initialCarrePosition = window.innerHeight - 150;
      
      ScrollTrigger.create({
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          if (!initialAnimationComplete) return;
          
          const scrollProgress = self.progress;
          
          // Calculer où serait le carré s'il était un élément normal du DOM
          const maxScrollDistance = scrollHeight - windowHeight;
          const scrollAmount = maxScrollDistance * scrollProgress;
          
          // Position "naturelle" du carré
          const naturalPosition = initialCarrePosition - scrollAmount;
          
          if (scrollProgress < transitionPoint) {
            // Première phase: le carré remonte comme un élément normal
            gsap.set(carre, { y: naturalPosition });
          } else {
            // Seconde phase: chute exponentielle
            
            // Position au moment de la transition
            const transitionPosition = initialCarrePosition - (maxScrollDistance * transitionPoint);
            
            // Progression de la chute
            const fallProgress = (scrollProgress - transitionPoint) / (1 - transitionPoint);
            
            // Utiliser la même courbe personnalisée pour la chute ou une autre
            // const easeProgress = CustomEase.create("custom-fall", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1")(fallProgress);
            const easeProgress = gsap.parseEase("power4.in")(fallProgress);
            
            // Position finale de la chute
            const endY = window.innerHeight + 300;
            
            // Interpolation entre la position de transition et la position finale
            const currentY = gsap.utils.interpolate(transitionPosition, endY, easeProgress);
            
            gsap.set(carre, { y: currentY });
          }
        }
      });
    });
  </script>
  
  <div class="scroll-container">
    <div class="fixed-container">
      <div bind:this={carre} class="carre"></div>
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
    
    .carre {
      position: absolute;
      width: 100px;
      height: 100px;
      background-color: #3498db;
      z-index: 10;
    }
    
    .scroll-space {
      height: 100%;
    }
  </style>
  