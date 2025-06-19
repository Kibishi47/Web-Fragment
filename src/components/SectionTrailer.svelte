<script>
  import { t } from '../i18n/translations.js' // ajustez le chemin
  
  export let locale = 'fr' // nouvelle prop
  export let title = ""; // On va utiliser la traduction maintenant
  export let videoSrc = ""; 
  export let posterImage = "";
  export let backgroundColor = "#0B0B1A";
  export let titleColor = "#ffffff";
  export let padding = "80px 40px";
  export let aspectRatio = "16/9";
</script>

<section 
  class="trailer-section"
  style="background-color: {backgroundColor}; padding: {padding};"
>
  <div class="container">
    <!-- Titre -->
    <h2 
      class="trailer-title"
      style="color: {titleColor};"
    >
      {title || t('s3.trailer.title', locale)}
    </h2>
    
    <!-- Conteneur vidéo -->
    <div 
      class="video-container"
      style="aspect-ratio: {aspectRatio};"
    >
      {#if videoSrc}
        <!-- Si c'est une URL YouTube/Vimeo -->
        {#if videoSrc.includes('youtube') || videoSrc.includes('vimeo')}
          <iframe
            src={videoSrc}
            title={t('s3.trailer.iframe_title', locale)}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        {:else}
          <!-- Si c'est un fichier vidéo direct -->
          <video
            controls
            poster={posterImage}
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4">
            <p>{t('s3.trailer.video_not_supported', locale)}</p>
          </video>
        {/if}
      {:else}
        <!-- Placeholder si pas de vidéo -->
        <div class="video-placeholder">
          {#if posterImage}
            <img src={posterImage} alt={t('s3.trailer.preview_alt', locale)} />
          {:else}
            <div class="placeholder-content">
              <div class="play-icon">▶</div>
              <p>{t('s3.trailer.coming_soon', locale)}</p>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Le CSS reste identique -->
<style>
  .trailer-section {
    width: 100%;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0B0B1A;
  }

  .container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }

  .trailer-title {
    font-family: 'Salted', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: normal;
    text-align: left;
    margin: 0 0 40px 0;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .video-container {
    width: 100%;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .video-container iframe,
  .video-container video {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  .video-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1a1a;
    color: #fff;
    position: relative;
  }

  .video-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder-content {
    text-align: center;
    z-index: 2;
  }

  .play-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .placeholder-content p {
    font-size: 1.2rem;
    margin: 0;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .trailer-title {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .video-container {
      border-radius: 4px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 15px;
    }
  }
</style>
