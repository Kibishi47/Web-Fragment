<script>
  import { t } from '../i18n/translations.js'
  
  export let locale = 'fr';
  export let companyName = "";
  export let year = "";
  export let studioName = "";
  export let copyrightText = "";
  export let backgroundColor = "var(--bg-gameplay)";
  export let textColor = "var(--text-white)";
  export let linkColor = "var(--text-white)";
  export let linkHoverColor = "var(--color-secondary)";
  
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
  class="w-full font-tomarik py-32"
  style="background-color: {backgroundColor}; color: {textColor}; padding: 3rem 0;"
>
  <div class="flex flex-col items-center justify-center min-h-full px-16" style:gap="1rem">
    <!-- Copyright - Parfaitement centré avec padding -->
    <div class="text-center max-w-4xl py-16">
      <p class="text-sm md:text-base font-medium tracking-wide leading-relaxed">
        <span class="font-bold uppercase">{companyName || t('footer.company', locale)}</span>
        <span class="mx-2">©</span>
        <span>{year || t('footer.year', locale)}</span>
        <span class="mx-2">{studioName || t('footer.studio', locale)}</span>
        <span class="block sm:inline mt-6 sm:mt-0 sm:ml-2">{copyrightText || t('footer.copyright', locale)}</span>
      </p>
    </div>
    
    <!-- Liens - Parfaitement centrés avec padding -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16">
      {#each links as link, index}
        <a 
          href={link.href}
          class="text-sm md:text-base font-medium uppercase tracking-widest transition-colors duration-300 hover:underline text-center px-12 "
          style="color: {linkColor};"
          on:mouseenter={(e) => e.target.style.color = linkHoverColor}
          on:mouseleave={(e) => e.target.style.color = linkColor}
        >
          {link.label}
        </a>
        
        {#if index < links.length - 1}
          <span class="hidden sm:inline text-gray-300 font-light select-none text-xl">|</span>
        {/if}
      {/each}
    </div>
  </div>
</footer>
