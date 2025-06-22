<script>
  import CustomButton from './CustomButton.svelte';
  import { t } from '../i18n/translations.js'

  export let locale = 'fr';
  export let date = "";
  export let month = "";
  export let year = "";
  export let subtitle = "";
  export let title = "";
  export let buttonText = "";
  export let buttonLink = "#";
  export let buttonBackgroundSvg = "/assets/images/button-198x86.svg";
  export let buttonHoverBackgroundSvg = "/assets/images/button-hover-198x86.svg";
  export let buttonFontSize = "text-32";
  export let buttonPaddingX = "px-6";
  export let buttonPaddingY = "py-4";
  export let backgroundColor = "var(--bg-trailer)";
  export let circleColor = "var(--color-secondary)";
  export let subtitleColor = "var(--color-secondary)";
  export let titleColor = "var(--text-white)";
  export let padding = "py-24 px-16";
</script>

<section 
  class="w-full min-h-screen flex items-center justify-center relative overflow-hidden font-salted {padding}"
  style="background-color: {backgroundColor};"
>
  <div class="w-full flex justify-center px-4 md:px-10">
    <div class="flex justify-center w-full max-w-5xl">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16 animate-fade-in-up">
        <!-- Cercle avec la date -->
        <div 
          class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-glow font-salted"
          style="background-color: {circleColor}; box-shadow: 0 0 80px rgba(255, 20, 147, 0.4);"
        >
          <div class="text-center text-white font-bold leading-tight w-full p-3 sm:p-4 md:p-5">
            <span class="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-0">
              {date || t('s5.event.date.day', locale)}
            </span>
            <span class="block text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wider -mt-2 -mb-1">
              {month || t('s5.event.date.month', locale)}
            </span>
            <span class="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black">
              {year || t('s5.event.date.year', locale)}
            </span>
          </div>
        </div>
        
        <!-- Contenu texte et bouton -->
        <div class="flex-1 max-w-lg text-center md:text-left">
          <p 
            class="text-sm md:text-base font-semibold mb-4 tracking-widest uppercase animate-slide-in-right font-salted"
            style="color: {subtitleColor}; animation-delay: 0.3s; animation-fill-mode: both;"
          >
            {subtitle || t('s5.event.subtitle', locale)}
          </p>
          
          <h2 
            class="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-black mb-8 md:mb-10 tracking-wide uppercase leading-tight animate-slide-in-right font-salted"
            style="color: {titleColor}; animation-delay: 0.5s; animation-fill-mode: both;"
          >
            {title || t('s5.event.title', locale)}
          </h2>
          
          <!-- Bouton personnalisé -->
          <div 
            class="animate-slide-in-right"
            style="animation-delay: 0.7s; animation-fill-mode: both;"
          >
            <CustomButton
              label={buttonText || t('s5.event.button', locale)}
              link={buttonLink}
              backgroundSvg={buttonBackgroundSvg}
              hoverBackgroundSvg={buttonHoverBackgroundSvg}
              fontSize={buttonFontSize}
              paddingX={buttonPaddingX}
              paddingY={buttonPaddingY}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 80px rgba(255, 20, 147, 0.4);
    }
    50% {
      transform: scale(1.02);
      box-shadow: 0 0 120px rgba(255, 20, 147, 0.6);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 1s ease-out;
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.8s ease-out;
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-pulse-glow,
    .animate-fade-in-up,
    .animate-slide-in-right {
      animation: none;
    }
  }
</style>
