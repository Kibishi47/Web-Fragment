<script>
  import CustomButton from "./CustomButton.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import { t } from '../i18n/translations.js'

  export let locale = 'fr';
  export let links = [];
  export let kickstarter = {
    label: "",
    href: "/",
  };

  // Détection automatique de la langue active
  $: activeLang = locale === 'en' ? 'EN' : 'FR';
  
  // Génération des liens avec traductions
  $: navigationLinks = [
    
  ];
  
  const languages = ["FR", "EN"];

  function isActive(lang) {
    return lang === activeLang;
  }

  function toggleLanguage() {
    const currentPath = window.location.pathname;
    let newPath;

    if (currentPath.startsWith('/en')) {
      newPath = currentPath.replace('/en', '') || '/';
    } else {
      newPath = currentPath === '/' ? '/en' : `/en${currentPath}`;
    }

    window.location.href = newPath;
  }
</script>

<nav class="navbar font-salted">
  <!-- Logo -->
  <div class="logo">
    <img src="/assets/images/LogoNav.svg" alt={t('nav.logo_alt', locale)} class="h-12" />
  </div>

  <!-- Menu -->
  <div class="menu">
    {#each (links.length > 0 ? links : navigationLinks) as link}
      <a href={link.href} class="nav-link">{link.label}</a>
    {/each}

    <CustomButton
      label={kickstarter.label || t('nav.kickstarter', locale)}
      link={kickstarter.href}
      newTab={true}
      width="w-auto"
      paddingX="px-4"
      paddingY="py-2"
      backgroundSvg="/assets/images/button-154x47.svg"
      hoverBackgroundSvg="/assets/images/button-hover-154x47.svg"
      fontSize="text-base"
      lgFontSize="lg:text-2xl"
      mdFontSize="md:text-2xl"
      smFontSize="sm:text-2xl"
    />

    <!-- Switch de langues -->
    <div 
      class="language-switch"
      on:click={toggleLanguage}
      on:keydown={(e) => e.key === 'Enter' && toggleLanguage()}
      role="button"
      tabindex="0"
    >
      {#each languages as lang, i}
        <span class={isActive(lang) ? "active" : "inactive"}>
          {lang}
        </span>
        {#if i < languages.length - 1}
          <span class="separator">/</span>
        {/if}
      {/each}
    </div>
  </div>
</nav>

<style>
  nav.navbar {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #0c0b19;
    position: sticky;
    top: 0;
    z-index: 5000;
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    color: var(--text-white);
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: var(--muted);
  }

  .language-switch {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    gap: 0.3rem;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.3s ease;
  }

  .language-switch:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .language-switch .active {
    font-weight: bold;
    color: var(--color-primary);
    text-shadow: 0 0 8px rgba(158, 63, 250, 0.5);
  }

  .language-switch .inactive {
    color: #888888;
    transition: color 0.3s ease;
  }

  .separator {
    color: #666666;
  }
</style>
