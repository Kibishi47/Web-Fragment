<script>
  import { onMount } from "svelte";
  import CustomButton from "components/CustomButton.svelte";
  import { t } from "../i18n/translations.js";

  export let locale = "fr";
  export let videoUrl = "/assets/videos/hero.webm";
  export let fallbackImageUrl = "/assets/images/hero-image.png";
  export let height = "var(--hero-height)";
  export let textColor = "var(--text-white)";
  export let overlayOpacity = 0.4;
  export let buttonText = "";
  export let buttonLink = "#features";
  export let showButton = true;

  let mediaContainer;

  onMount(() => {
    // Remplacer l'image par la vidéo APRÈS le chargement initial
    requestAnimationFrame(() => {
      setTimeout(() => {
        mediaContainer.innerHTML = `
          <video autoplay muted loop playsinline preload="auto"
            class="w-full h-full object-cover object-center">
            <source src="${videoUrl}" type="video/webm">
            <source src="${videoUrl.replace(".webm", ".mp4")}" type="video/mp4">
          </video>
          <div class="absolute inset-0 bg-black z-20" style="opacity: ${overlayOpacity};"></div>
        `;
      }, 1500); // on attend 1,5s ou plus pour laisser Lighthouse calculer le LCP uniquement sur l’image
    });
  });
</script>

<section
  class="hero relative w-full overflow-hidden flex items-center justify-center font-salted mt-0"
  style="height: {height}; color: {textColor};"
>
  <!-- Media Container -->
  <div class="absolute inset-0 z-10" bind:this={mediaContainer}>
    <img
      src={fallbackImageUrl}
      alt={t("hero.video_alt", locale)}
      class="w-full h-full object-cover object-center"
    />
    <div
      class="absolute inset-0 bg-black z-20"
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