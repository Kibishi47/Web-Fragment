<script>
  import CustomButton from "./CustomButton.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";

  export let locale = 'fr'; // Nouvelle prop pour recevoir la langue depuis la page
  export let links = [{}];
  export let kickstarter = {
    label: "KICKSTARTER",
    href: "/",
  };

  // Détection automatique de la langue active
  $: activeLang = locale === 'en' ? 'EN' : 'FR';
  
  const languages = ["FR", "EN"];

  function isActive(lang) {
    return lang === activeLang;
  }

  // Fonction toggle simplifiée - fonctionne sur n'importe quel clic
  function toggleLanguage() {
    const currentPath = window.location.pathname;
    let newPath;

    if (currentPath.startsWith('/en')) {
      // Actuellement en anglais, passer en français
      newPath = currentPath.replace('/en', '') || '/';
    } else {
      // Actuellement en français, passer en anglais
      newPath = currentPath === '/' ? '/en' : `/en${currentPath}`;
    }

    window.location.href = newPath;
  }
</script>

<nav class="navbar">
  <!-- Logo -->
  <div class="logo">
    <img src="/assets/logo.png" alt="Logo" />
  </div>

  <!-- Menu -->
  <div class="menu">
    {#each links as link}
      <a href={link.href} class="nav-link">{link.label}</a>
    {/each}

    <CustomButton
      label={kickstarter.label}
      link={kickstarter.href}
      newTab={true}
      size="143px"
      fontSize="18px"
      backgroundSvg="/assets/images/button-154x47.svg"
    />

    <!-- Switch de langues - un seul bouton cliquable -->
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

  .logo img {
    height: 50px;
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: #cccccc;
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
    color: #9e3ffa; /* Couleur violette pour la langue active */
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
