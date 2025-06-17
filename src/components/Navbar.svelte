<script>
  import CustomButton from "./CustomButton.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";

  export let links = [{}]; // [{ label: "ACCUEIL", href: "/" }]

  export let kickstarter = {
    label: "KICKSTARTER",
    href: "/",
  };
  export let activeLang = "FR";

  const languages = ["FR", "EN"];

  function isActive(lang) {
    return lang === activeLang;
  }
</script>

<nav class="navbar">
  <!-- Logo -->
  <div class="logo">
    <img src="/assets/logo.png" alt="Logo" />
  </div>

  <!-- Menu -->
  <div class="menu">
    <!-- Thème clair / sombre -->
    <!-- <ThemeToggle /> -->

    {#each links as link}
      <a href={link.href} class="nav-link">{link.label}</a>
    {/each}

    <!-- Utilisation du composant bouton -->
    <CustomButton
      label={kickstarter.label}
      link={kickstarter.href}
      newTab={true}
      size="143px"
      fontSize="18px"
      backgroundSvg="/assets/images/button-154x47.svg"
    />

    <!-- Switch de langues -->
    <div class="language-switch">
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
  }

  .language-switch .active {
    font-weight: bold;
    color: white;
    cursor: pointer;
  }

  .language-switch .inactive {
    color: #888888;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .language-switch .inactive:hover {
    color: #cccccc;
  }

  .separator {
    color: white;
  }
</style>
