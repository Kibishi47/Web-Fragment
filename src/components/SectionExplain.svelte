<script>
  import { t } from '../i18n/translations.js'
  export let padding = "var(--padding-110)";
  export let locale = 'fr';
</script>

<div
  class="section-1 flex flex-col justify-center items-center gap-6 self-stretch bg-gradient-section-1"
  style="padding: {padding}"
>
  <p class="self-stretch text-center text-primary font-salted text-22 font-normal">
    {t('s1.spinback.what', locale)}
  </p>
  
  <h2 class="font-salted text-4xl md:text-4xl lg:text-5xl font-normal leading-tight text-center m-0">
    {t('s1.spinback.description', locale)}
  </h2>
</div>
