<script>
  import { t } from '../i18n/translations.js';
  
  export let locale = 'fr';
  export let title = '';
  export let videoSrc = 'https://www.youtube.com/embed/t0MhQf51rM4?si=CG-B2oEd7802o_iN';
  export let posterImage = '';
  export let backgroundColor = 'var(--bg-trailer)';
  export let titleColor = 'var(--text-white)';
  export let aspectRatio = 'var(--aspect-ratio-16-9)';

  // 🔁 Si c'est un lien YouTube, on force la version sans cookie
  $: safeVideoSrc =
    videoSrc.includes('youtube.com/embed/')
      ? videoSrc.replace('youtube.com', 'www.youtube-nocookie.com')
      : videoSrc;
</script>

<section 
  class="relative w-full overflow-hidden font-salted responsive-padding flex items-center justify-center lg:min-h-screen"
  style="background-color: {backgroundColor};"
>
  <div class="mx-auto px-4 w-full">
    <h2 
      class="font-salted text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-left m-0 mb-12 md:mb-16 responsive-text-spacing"
      style="color: {titleColor};"
    >
      {title || t('s3.trailer.title', locale)}
    </h2>

    <div 
      class="w-full bg-black rounded-lg overflow-hidden relative"
      style="aspect-ratio: {aspectRatio}; box-shadow: var(--shadow-video);"
    >
      {#if videoSrc}
        {#if videoSrc.includes('youtube') || videoSrc.includes('vimeo')}
          <iframe
            src={safeVideoSrc}
            title={t('s3.trailer.iframe_title', locale)}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full border-none block"
          ></iframe>
        {:else}
          <video
            controls
            poster={posterImage}
            preload="metadata"
            class="w-full h-full border-none block"
          >
            <source src={videoSrc} type="video/mp4" />
            <p class="font-salted text-white p-4">{t('s3.trailer.video_not_supported', locale)}</p>
          </video>
        {/if}
      {:else}
        <div class="w-full h-full flex items-center justify-center bg-gray-800 text-white relative">
          {#if posterImage}
            <img src={posterImage} alt={t('s3.trailer.preview_alt', locale)} class="w-full h-full object-cover" />
          {:else}
            <div class="text-center z-10">
              <div class="text-6xl mb-4 opacity-70">▶</div>
              <p class="font-salted text-lg opacity-80">{t('s3.trailer.coming_soon', locale)}</p>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>