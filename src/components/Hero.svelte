<script>
  import CustomButton from 'components/CustomButton.svelte';
  import { t } from '../i18n/translations.js';

  export let locale = 'fr';
  export let videoUrl = '/assets/videos/hero.webm';
  export let fallbackImageUrl = '/assets/images/hero-image.webp';
  export let height = 'var(--hero-height)';
  export let textColor = 'var(--text-white)';
  export let overlayOpacity = 0.4;
  export let buttonText = '';
  export let buttonLink = '#features';
  export let showButton = true;
</script>

<section
  class="hero relative w-full overflow-hidden flex items-center justify-center font-salted mt-0"
  style="height: {height}; color: {textColor};"
>
  <!-- Media container -->
  <div class="absolute inset-0 z-10">
    <!-- Fallback image : servira potentiellement de LCP -->
    <img
      src={fallbackImageUrl}
      alt={t('hero.video_alt', locale)}
      class="w-full h-full object-cover object-center absolute inset-0 z-0"
    />

    <!-- Vidéo : chargée immédiatement, sans cacher l’image -->
    <video
      autoplay
      loop
      muted
      playsinline
      class="w-full h-full object-cover object-center absolute inset-0 z-10"
    >
      <source src={videoUrl} type="video/webm" />
    </video>

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black z-20 pointer-events-none"
      style="opacity: {overlayOpacity};"
    ></div>
  </div>

  <!-- Contenu -->
  <div class="relative z-30 flex flex-col items-center justify-center gap-10">
    <img
      src="/assets/images/LogoMain.svg"
      alt="Spinback logo"
      class="lg:w-120 w-80 h-auto mb-8"
      fetchpriority="low"
      loading="eager"
    />

    {#if showButton}
      <CustomButton
        label={buttonText || t('hero.button', locale)}
        link={buttonLink}
        paddingX="px-6"
        paddingY="py-4"
        backgroundSvg="/assets/images/button-413x74.svg"
        hoverBackgroundSvg="/assets/images/button-hover-413x74.svg"
        fontSize="text-2xl"
        lgFontSize="lg:text-3xl"
        mdFontSize="md:text-3xl"
        smFontSize="sm:text-2xl"
      />
    {/if}
  </div>
</section>