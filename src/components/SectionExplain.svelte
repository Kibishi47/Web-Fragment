<script>
  import { t } from '../i18n/translations.js'
  export let padding = "110px";
  export let locale = 'fr';
</script>

<div
  class="section-1 flex flex-col justify-center items-center gap-6 self-stretch bg-gradient-to-b from-[#1c0b3f] via-[#1c0b3f] to-[#491da5] to-175%"
  style="padding: {padding}"
>
  <p
    class="self-stretch text-center text-[#9e3ffa] font-['Salted'] text-[22px] font-normal"
  >
    {t('s1.spinback.what', locale)}
  </p>
  <h1
    class="self-stretch text-center text-white font-['Salted'] text-2xl sm:text-3xl md:text-[32px] font-normal"
  >
    {t('s1.spinback.description', locale)}
  </h1>
</div>
