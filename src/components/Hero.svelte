<script>
  import { onMount } from "svelte";
  import CustomButton from "components/CustomButton.svelte";
  import { t } from "../i18n/translations.js";

  export let locale = "fr";
  export let videoUrl = "/assets/videos/hero.webm";
  export let fallbackImageUrl = "/assets/images/hero-image.webp";
  export let height = "var(--hero-height)";
  export let textColor = "var(--text-white)";
  export let overlayOpacity = 0.4;
  export let buttonText = "";
  export let buttonLink = "#features";
  export let showButton = true;

  let showVideo = false;

  onMount(() => {
    // Attend que la page soit montée, puis active la vidéo après un court délai
    setTimeout(() => {
      showVideo = true;
    }, 300); // vous pouvez ajuster ce délai selon vos tests
  });
</script>

<section
  class="hero relative w-full overflow-hidden flex items-center justify-center font-salted mt-0"
  style="height: {height}; color: {textColor};"
>
  <!-- Media Container -->
  <div class="absolute inset-0 z-10">
    <!-- Image fallback rapide et optimisée -->
    <img
      src={fallbackImageUrl}
      alt={t("hero.video_alt", locale)}
      class="w-full h-full object-cover object-center absolute inset-0 z-10 transition-opacity duration-700"
      style="opacity: {showVideo ? 0 : 1};"
    />

    <!-- Lazy-loaded video uniquement après initial render -->
    {#if showVideo}
      <video
        autoplay
        muted
        playsinline
        loop
        class="w-full h-full object-cover object-center absolute inset-0 z-10 transition-opacity duration-700"
        style="opacity: 1;"
      >
        <source src={videoUrl} type="video/webm" />
      </video>
    {/if}

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black z-20 pointer-events-none"
      style="opacity: {overlayOpacity};"
    ></div>
  </div>

  <!-- Content -->
  <div class="relative z-30 flex flex-col items-center justify-center gap-10">
    <img
      src="/assets/images/LogoMain.svg"
      alt="Spinback logo"
      class="lg:w-120 w-80 h-auto mb-8"
    />

    {#if showButton}
      <CustomButton
        label={buttonText || t("hero.button", locale)}
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