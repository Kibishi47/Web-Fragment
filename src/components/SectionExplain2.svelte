<script>
  import { t } from '../i18n/translations.js'
  
  export let locale = 'fr'
  export let padding = "var(--padding-140-120)";
  export let imageSrc = "/assets/images/IlluPlatine.svg";
  export let imageSize = "w-full";
  export let imageMaxWidth = "var(--max-width-550)";
  export let imagePosition = "ml-auto";
  export let textSpacing = "var(--gap-24)";
  export let columnGap = "var(--gap-124)";
  export let titleColor = "text-white";
  export let subtitleColor = "text-text-dark";
  export let sectionHeight = "auto";
  export let alignItems = "center";
</script>

<section 
  class="relative w-full overflow-hidden bg-gradient-section-2 z-20 font-salted" 
  style="padding: {padding}; height: {sectionHeight};"
>
  <!-- Version Desktop -->
  <div 
    class="hidden md:flex mx-auto flex-col md:flex-row justify-between h-full items-center"
    style="gap: {columnGap};"
  >
    <div class="md:w-1/2 text-left">
      <p class="{subtitleColor} font-salted text-xl md:text-2xl text-left m-0">
        {t('s2.interaction.subtitle', locale)}
      </p>
      
      <h2 
        class="{titleColor} font-salted text-4xl md:text-4xl lg:text-5xl font-normal leading-tight text-left m-0"
        style="margin-top: {textSpacing};"
      >
        {t('s2.interaction.title', locale)}
      </h2>
    </div>
    
    <div class="md:w-1/2 flex justify-end">
      <div class="{imagePosition}">
        <img 
          src={imageSrc} 
          alt="Platine DJ" 
          class="h-auto object-contain {imageSize}" 
          style="max-width: {imageMaxWidth};"
        />
      </div>
    </div>
  </div>

  <!-- Version Mobile -->
  <div class="block md:hidden text-center">
    <div class="mb-8">
      <p class="{subtitleColor} font-salted text-lg font-medium mb-6 uppercase tracking-wide">
        {t('s2.interaction.subtitle', locale)}
      </p>
      
      <h2 class="{titleColor} font-salted text-2xl sm:text-3xl font-normal leading-tight">
        {t('s2.interaction.title', locale)}
      </h2>
    </div>
    
    <div class="flex justify-center">
      <img 
        src={imageSrc} 
        alt="Platine DJ" 
        class="h-auto object-contain max-w-400"
        style="width: 120vw;"
      />
    </div>
  </div>
</section>
