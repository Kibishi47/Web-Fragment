<script>
  import { t } from "../i18n/translations.js";

  export let locale = "fr";
  export let imageSrc = "/assets/images/IlluPlatine.svg";
  export let imageSize = "w-full";
  export let imagePosition = "ml-auto";
  export let titleColor = "text-white";
  export let subtitleColor = "text-text-dark";
  export let sectionHeight = "auto";
</script>

<section
  class="section-2 relative w-full overflow-hidden bg-gradient-section-2 z-20 font-salted responsive-padding"
  style="height: {sectionHeight};"
>
  <!-- Version Desktop -->
  <div
    class="hidden md:flex mx-auto flex-col md:flex-row justify-between h-full items-center responsive-gap"
  >
    <div class="md:w-1/2 text-left">
      <p class="{subtitleColor} font-salted text-xl md:text-2xl text-left m-0">
        {t("s2.interaction.subtitle", locale)}
      </p>

      <h2
        class="{titleColor} font-salted text-4xl md:text-4xl lg:text-5xl font-normal leading-tight text-left m-0 responsive-text-spacing"
      >
        {t("s2.interaction.title", locale)}
      </h2>
    </div>

    <div class="md:w-1/2 flex justify-end">
      <div class={imagePosition}>
        <img
          src={imageSrc}
          alt="Platine DJ"
          class="h-auto object-contain {imageSize} responsive-image"
        />
      </div>
    </div>
  </div>

  <!-- Version Mobile -->
  <div class="block md:hidden text-center px-4">
    <div class="mb-8">
      <p
        class="{subtitleColor} font-salted text-base sm:text-lg font-medium mb-6 uppercase tracking-wide"
      >
        {t("s2.interaction.subtitle", locale)}
      </p>

      <h2
        class="{titleColor} font-salted text-xl sm:text-2xl md:text-3xl font-normal leading-tight"
      >
        {t("s2.interaction.title", locale)}
      </h2>
    </div>

    <div class="flex justify-center">
      <img
        src={imageSrc}
        alt="Platine DJ"
        class="h-auto object-contain w-full max-w-xs sm:max-w-sm"
      />
    </div>
  </div>
</section>
