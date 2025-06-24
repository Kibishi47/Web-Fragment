<script>
  import { t } from '../i18n/translations.js'
  export let locale = 'fr';
</script>

<div
  class="section-1 flex flex-col justify-center items-center gap-6 self-stretch bg-gradient-section-1 responsive-section-padding px-4"
>
  <p class="self-stretch text-center text-primary font-salted text-22 font-normal responsive-subtitle">
    {t('s1.spinback.what', locale)}
  </p>
  
  <h2 class="font-salted text-4xl md:text-4xl lg:text-5xl font-normal leading-tight text-center m-0 responsive-title">
    {t('s1.spinback.description', locale)}
  </h2>
</div>
