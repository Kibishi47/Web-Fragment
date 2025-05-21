<script lang="ts">
  import { onMount } from 'svelte';

  let theme: 'light' | 'dark' = 'light';
  let mounted = false;

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  onMount(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      theme = savedTheme;
    } else if (prefersDark) {
      theme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', theme);
    mounted = true;
  });
</script>

<button
  on:click={toggleTheme}
  class="theme-toggle bg-transparent border-none cursor-pointer p-2 rounded-full text-foreground transition-all duration-200 hover:bg-card hover:scale-110"
  aria-label="Toggle theme"
>
  {#if theme === 'light'}
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  {/if}
</button>
