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
  class="relative w-full overflow-hidden font-salted responsive-padding min-h-screen"
  style="background-color: {backgroundColor};"
>
  <div class="mx-auto max-w-7xl px-4 w-full">
    <!-- Titre -->
    <h2 
      class="font-salted text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-left m-0 mb-12 md:mb-16 uppercase tracking-widest opacity-0 animate-fade-in-up"
      style="color: {titleColor};"
    >
      {title || t('s4.gameplay.title', locale)}
    </h2>
    
    <!-- Features -->
    <div class="flex flex-col space-y-32 lg:space-y-40">
      {#each features as feature, index}
        <div 
          class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center opacity-0 animate-fade-in-up"
          class:lg:direction-rtl={feature.imagePosition === 'right'}
          style="animation-delay: {index * 0.2}s; animation-fill-mode: forwards;"
        >
          <!-- Image -->
          <div 
            class="relative transition-transform duration-300 ease-in-out hover:rotate-0 hover:scale-105 order-2 lg:order-none"
            class:lg:direction-ltr={feature.imagePosition === 'right'}
            style="
              transform: rotate({feature.imageRotation}deg) scale({feature.imageScale});
              filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
            "
          >
            <img 
              src={feature.image} 
              alt={feature.imageAlt}
              loading="lazy"
              class="w-full h-auto max-w-sm mx-auto lg:max-w-none transition-all duration-300"
            />
          </div>
          
          <!-- Texte -->
          <div 
            class="p-5 lg:p-0 order-1 lg:order-none text-center lg:text-left"
            class:lg:direction-ltr={feature.imagePosition === 'right'}
          >
            <p 
              class="font-salted text-lg sm:text-xl lg:text-2xl leading-relaxed m-0 tracking-wide opacity-90"
              style="color: {textColor};"
            >
              {feature.text}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .lg\:direction-rtl {
    @media (min-width: 1024px) {
      direction: rtl;
    }
  }

  .lg\:direction-ltr {
    @media (min-width: 1024px) {
      direction: ltr;
    }
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

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in-up,
    .transition-transform {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
