<script>
  import { t } from '../i18n/translations.js' // ajustez le chemin
  
  export let locale = 'fr'; // nouvelle prop
  export let companyName = "";
  export let year = "";
  export let studioName = "";
  export let copyrightText = "";
  export let backgroundColor = "#2a1b4a";
  export let textColor = "#ffffff";
  export let linkColor = "#ffffff";
  export let linkHoverColor = "#ff1493";
  
  // Links avec traductions dynamiques
  $: links = [
    { 
      label: t('footer.legal', locale), 
      href: locale === 'en' ? "/en/legal-notice" : "/mentions-legales" 
    },
    { 
      label: t('footer.cookies', locale), 
      href: locale === 'en' ? "/en/cookies" : "/cookies" 
    },
    { 
      label: t('footer.design', locale), 
      href: locale === 'en' ? "/en/design-document" : "/dossier-conception" 
    }
  ];
</script>

<footer 
  class="w-full py-8"
  style="background-color: {backgroundColor}; color: {textColor};"
>
  <div class="flex flex-col items-center justify-center min-h-full px-4 space-y-6">
    <!-- Copyright - Parfaitement centré -->
    <div class="text-center max-w-4xl">
      <p class="text-sm md:text-base font-medium tracking-wide leading-relaxed">
        <span class="font-bold uppercase">{companyName || t('footer.company', locale)}</span>
        <span class="mx-1">©</span>
        <span>{year || t('footer.year', locale)}</span>
        <span class="mx-1">{studioName || t('footer.studio', locale)}</span>
        <span class="block sm:inline mt-2 sm:mt-0 sm:ml-1">{copyrightText || t('footer.copyright', locale)}</span>
      </p>
    </div>
    
    <!-- Liens - Parfaitement centrés -->
    <div class="flex flex-col sm:flex-row items-center justify-center">
      {#each links as link, index}
        <div class="flex items-center">
          <a 
            href={link.href}
            class="text-sm md:text-base font-medium uppercase tracking-widest transition-colors duration-300 hover:underline text-center px-2 py-1"
            style="color: {linkColor};"
            on:mouseenter={(e) => e.target.style.color = linkHoverColor}
            on:mouseleave={(e) => e.target.style.color = linkColor}
          >
            {link.label}
          </a>
          
          {#if index < links.length - 1}
            <span class="hidden sm:inline text-gray-300 font-light select-none mx-4">|</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</footer>

<style>
  footer {
    font-family: 'Salted', sans-serif;
  }
</style>
