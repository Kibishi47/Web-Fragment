<script>
  export let title = "GAMEPLAY";
  export let backgroundColor = "#3a2a5c";
  export let titleColor = "#ffffff";
  export let textColor = "#ffffff";
  export let padding = "100px 40px";
  export let features = [
    {
      id: 1,
      image: "/assets/images/gameplay1.png",
      imageAlt: "Interface de jeu avec souvenirs",
      text: "Revivez la soirée à travers trois souvenirs distincts, chaque souvenir se compose comme une scène interactive que vous pouvez contrôler",
      imagePosition: "left",
      imageRotation: -8,
      imageScale: 1
    },
    {
      id: 2,
      image: "/assets/images/gameplay2.png",
      imageAlt: "Environnement de jeu 3D",
      text: "Remontez le temps à travers différentes ambiances sonores et visuelles, l'histoire se répercute entre les différents souvenirs dans lesquels vous naviguez",
      imagePosition: "right",
      imageRotation: 5,
      imageScale: 1.1
    },
    {
      id: 3,
      image: "/assets/images/gameplay3.png",
      imageAlt: "Interface d'enquête",
      text: "Enquêtez sur le drame qui vous est introduit au début du jeu. Écoutez les conversations des personnages, regroupez vos observations dans votre dossier, et choisissez quels éléments vous souhaitez conserver dans votre témoignage",
      imagePosition: "left",
      imageRotation: -3,
      imageScale: 0.95
    }
  ];
</script>

<section 
  class="gameplay-section"
  style="background-color: {backgroundColor}; padding: {padding};"
>
  <div class="container">
    <!-- Titre -->
    <h2 
      class="gameplay-title"
      style="color: {titleColor};"
    >
      {title}
    </h2>
    
    <!-- Features -->
    <div class="features-list">
      {#each features as feature, index}
        <div 
          class="feature-item"
          class:reverse={feature.imagePosition === 'right'}
          style="--delay: {index * 0.2}s;"
        >
          <!-- Image -->
          <div 
            class="feature-image"
            style="
              --rotation: {feature.imageRotation}deg;
              --scale: {feature.imageScale};
            "
          >
            <img 
              src={feature.image} 
              alt={feature.imageAlt}
              loading="lazy"
            />
          </div>
          
          <!-- Texte -->
          <div class="feature-text">
            <p style="color: {textColor};">
              {feature.text}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .gameplay-section {
    width: 100%;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }

  .gameplay-title {
    font-family: 'Salted', sans-serif;
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: normal;
    text-align: left;
    margin: 0 0 80px 0;
    letter-spacing: 3px;
    text-transform: uppercase;
    animation: fadeInUp 1s ease-out;
  }

  .features-list {
    display: flex;
    flex-direction: column;
    gap: 120px;
  }

  .feature-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
    animation-delay: var(--delay);
  }

  .feature-item.reverse {
    direction: rtl;
  }

  .feature-item.reverse > * {
    direction: ltr;
  }

  .feature-image {
    position: relative;
    transform: rotate(var(--rotation)) scale(var(--scale));
    transition: transform 0.3s ease;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
  }

  .feature-image:hover {
    transform: rotate(0deg) scale(1.05);
  }

  .feature-image img {
    width: 100%;
    height: auto;
    /* border-radius: 12px; */
    /* border: 3px solid rgba(255, 255, 255, 0.1); */
    transition: border-color 0.3s ease;
  }

  .feature-image:hover img {
    border-color: rgba(255, 255, 255, 0.3);
  }

  .feature-text {
    padding: 20px;
  }

  .feature-text p {
    font-family: 'Salted', sans-serif;
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    line-height: 1.6;
    margin: 0;
    text-align: left;
    letter-spacing: 0.5px;
    opacity: 0.9;
  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .feature-item {
      gap: 60px;
    }
    
    .features-list {
      gap: 100px;
    }
  }

  @media (max-width: 768px) {
    .gameplay-title {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .feature-item,
    .feature-item.reverse {
      grid-template-columns: 1fr;
      gap: 40px;
      text-align: center;
      direction: ltr;
    }
    
    .features-list {
      gap: 80px;
    }
    
    .feature-image {
      order: -1;
      max-width: 400px;
      margin: 0 auto;
    }
    
    .feature-text {
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 15px;
    }
    
    .feature-item {
      gap: 30px;
    }
    
    .features-list {
      gap: 60px;
    }
    
    .feature-image {
      max-width: 300px;
    }
  }

  /* Effet parallax subtil */
  @media (prefers-reduced-motion: no-preference) {
    .feature-image {
      transition: transform 0.3s ease, filter 0.3s ease;
    }
    
    .gameplay-section {
      background-attachment: fixed;
    }
  }

  /* Mode sombre amélioré */
  @media (prefers-color-scheme: dark) {
    .feature-image img {
      border-color: rgba(255, 255, 255, 0.05);
    }
    
    .feature-image:hover img {
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
</style>
