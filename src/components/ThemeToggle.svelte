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
  class="theme-toggle"
  aria-label="Toggle theme"
>
  {#if theme === 'light'}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

<style>
  .theme-toggle {
    background: rgba(255 255 255 / 0.1);
    border: none;
    border-radius: 50%;
    padding: 0.6rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    color: var(--color-foreground, #fff);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 6px rgba(0,0,0,0.15);
  }

  .theme-toggle:hover {
    background: rgba(255 255 255 / 0.25);
    transform: scale(1.1);
  }

  .theme-toggle:focus {
    outline: 2px solid var(--color-accent, #64b5f6);
    outline-offset: 3px;
  }

  /* Dark/light theme colors (CSS variables) */
  :root[data-theme='light'] {
    --color-foreground: #222;
    --color-accent: #1976d2;
  }

  :root[data-theme='dark'] {
    --color-foreground: #eee;
    --color-accent: #90caf9;
  }
</style>
