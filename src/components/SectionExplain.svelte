<script>
  import { t } from '../i18n/translations.js'
  export let padding = "var(--padding-110)";
  export let locale = 'fr';
</script>

<div
  class="flex flex-col justify-center items-center gap-6 self-stretch bg-gradient-section-1"
  style="padding: {padding}"
>
  <p class="self-stretch text-center text-primary font-salted text-22 font-normal">
    {t('s1.spinback.what', locale)}
  </p>
  
  <h1 class="self-stretch text-center text-white font-salted text-2xl sm:text-3xl md:text-32 font-normal">
    {t('s1.spinback.description', locale)}
  </h1>
</div>
