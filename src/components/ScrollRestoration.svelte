<script>
import { onMount } from 'svelte';

onMount(() => {
    if (history.scrollRestoration){
    history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
});
</script>