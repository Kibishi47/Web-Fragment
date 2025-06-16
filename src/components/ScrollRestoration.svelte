<script>
  import { onMount } from "svelte";

  onMount(() => {
    document.documentElement.setAttribute("data-theme", "dark");

    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  });
</script>
