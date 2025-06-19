<script>
  import CustomButton from "components/CustomButton.svelte";
  import { t } from '../i18n/translations.js' // ajustez le chemin

  export let locale = 'fr'; // nouvelle prop
  export let title = "";
  export let subtitle = "";
  export let videoUrl = "/assets/videos/hero.webm";
  export let fallbackImageUrl = "/assets/images/hero-image.png";
  export let height = "90vh";
  export let textColor = "#ffffff";
  export let overlayOpacity = 0.4;
  export let buttonText = "";
  export let buttonLink = "#features";
  export let showButton = true;
  export let alignText = "center";
</script>

<section
  class="hero"
  style="--hero-height: {height}; --text-color: {textColor}; --overlay-opacity: {overlayOpacity}; --text-align: {alignText};"
>
  <div class="hero-media-container">
    <video
      autoplay
      loop
      muted
      playsinline
      class="hero-video"
      poster={fallbackImageUrl}
    >
      <source src={videoUrl} type="video/mp4" />

      <!-- Fallback pour les navigateurs qui ne supportent pas la vidéo -->
      <img src={fallbackImageUrl} alt={t('hero.video_alt', locale)} class="hero-image" />
    </video>
    <div class="overlay"></div>
  </div>

  <div class="hero-content">
    <h1>{title || t('hero.title', locale)}</h1>
    <p>{subtitle || t('hero.subtitle', locale)}</p>
    {#if showButton}
      <CustomButton
        label={buttonText || t('hero.button', locale)}
        link={buttonLink}
        fontSize="32px"
        paddingX="24px"
        paddingY="16px"
      />
    {/if}
  </div>
</section>

<!-- Le CSS reste identique -->
<style>
  .hero {
    margin-top: 0;
    position: relative;
    width: 100%;
    height: var(--hero-height);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
  }

  .hero-media-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .hero-video,
  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .hero-content {
    position: relative;
    z-index: 3;
    max-width: 1200px;
    width: 90%;
    padding: 2rem;
    text-align: var(--text-align);
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    margin-bottom: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .hero-content {
      padding: 1.5rem;
    }
  }
</style>
