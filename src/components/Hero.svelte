<script>
  import CustomButton from "components/CustomButton.svelte";
  
  // Props avec valeurs par défaut
  export let title = "SpinBack";
  export let subtitle = "Seule la vérité sonne juste.";
  export let videoUrl = "/assets/videos/hero.mp4";
  export let fallbackImageUrl = "/assets/images/hero-image.png";
  export let height = "100vh";
  export let textColor = "#ffffff";
  export let overlayOpacity = 0.4;
  export let buttonText = "Participer au kickstarter";
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
      <img src={fallbackImageUrl} alt="Hero background" class="hero-image" />
    </video>
    <div class="overlay"></div>
  </div>

  <div class="hero-content">
    <h1>{title}</h1>
    <p>{subtitle}</p>
    {#if showButton}
      <CustomButton
        label={buttonText}
        link={buttonLink}
        newTab={false}
        size={"400px"}
      />
    {/if}
  </div>
</section>

<style>
  .hero {
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
    /* background-color: rgba(0, 0, 0, var(--overlay-opacity)); */
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


  /* Responsive */
  @media (max-width: 768px) {
    .hero-content {
      padding: 1.5rem;
    }
  }
</style>
