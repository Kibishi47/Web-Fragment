<script>
  import { t } from '../i18n/translations.js'
  
  export let locale = 'fr';
  export let title = "";
  export let backgroundColor = "var(--bg-gameplay)";
  export let titleColor = "var(--text-white)";
  export let textColor = "var(--text-white)";
  
  // Features avec les clés de traduction
  $: features = [
    {
      id: 1,
      image: "/assets/images/gameplay1.png",
      imageAlt: t('s4.gameplay.feature1.alt', locale),
      text: t('s4.gameplay.feature1.text', locale),
      imagePosition: "left",
      imageRotation: -8,
      imageScale: 1
    },
    {
      id: 2,
      image: "/assets/images/gameplay2.png",
      imageAlt: t('s4.gameplay.feature2.alt', locale),
      text: t('s4.gameplay.feature2.text', locale),
      imagePosition: "right",
      imageRotation: 5,
      imageScale: 1.1
    },
    {
      id: 3,
      image: "/assets/images/gameplay3.png",
      imageAlt: t('s4.gameplay.feature3.alt', locale),
      text: t('s4.gameplay.feature3.text', locale),
      imagePosition: "left",
      imageRotation: -3,
      imageScale: 0.95
    }
  ];
</script>

<section 
  class="py-16 g:py-25 lg:px-10 gameplay-section font-salted responsive-padding"
  style="background-color: {backgroundColor};"
>
  <div class="container">
    <!-- Titre -->
    <h2 
      class="gameplay-title font-salted"
      style="color: {titleColor};"
    >
      {title || t('s4.gameplay.title', locale)}
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
            <p class="font-salted" style="color: {textColor};">
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
    max-width: var(--max-width-1400);
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }

  .gameplay-title {
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
    gap: var(--gap-120);
  }

  .feature-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--gap-80);
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
    filter: var(--shadow-feature);
  }

  .feature-image:hover {
    transform: rotate(0deg) scale(1.05);
  }

  .feature-image img {
    width: 100%;
    height: auto;
    transition: border-color 0.3s ease;
  }

  .feature-image:hover img {
    border-color: rgba(255, 255, 255, 0.3);
  }

  .feature-text {
    padding: 20px;
  }

  .feature-text p {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    line-height: 1.6;
    margin: 0;
    text-align: left;
    letter-spacing: 0.5px;
    opacity: 0.9;
  }

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
      max-width: var(--max-width-400);
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
      max-width: var(--max-width-300);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .feature-image {
      transition: transform 0.3s ease, filter 0.3s ease;
    }
    
    .gameplay-section {
      background-attachment: fixed;
    }
  }

  @media (prefers-color-scheme: dark) {
    .feature-image img {
      border-color: rgba(255, 255, 255, 0.05);
    }
    
    .feature-image:hover img {
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
</style>
