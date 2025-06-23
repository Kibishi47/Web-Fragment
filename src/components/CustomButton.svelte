<script>
  export let label = "KICKSTARTER";
  export let link = "#";
  export let backgroundSvg = "/assets/images/button-413x74.svg";
  export let hoverBackgroundSvg = null;
  export let newTab = false;
  export let fontSize = "text-lg";
  export let lgFontSize = "lg:text-xl";
  export let mdFontSize = "md:text-lg";
  export let smFontSize = "sm:text-base";
  export let paddingX = "px-2.5";
  export let paddingY = "py-1.5";
  export let width = "w-auto";

  let isHovered = false;

  function toggleHover(state) {
    isHovered = state;
  }
</script>

<a
  href={link}
  target={newTab ? "_blank" : "_self"}
  rel={newTab ? "noopener noreferrer" : undefined}
  class="relative inline-block cursor-pointer no-underline font-normal text-white select-none max-w-full focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2 {width}"
  on:mouseenter={() => toggleHover(true)}
  on:mouseleave={() => toggleHover(false)}
>
  <!-- Image de fond normale -->
  <img 
    src={backgroundSvg} 
    alt="" 
    width="413"
    height="74"
    class="block w-full h-auto max-w-full transition-opacity duration-300 ease-in-out"
    style="image-rendering: auto; shape-rendering: geometricPrecision; filter: contrast(1.1);"
    class:opacity-0={isHovered && hoverBackgroundSvg}
  />

  <!-- Image de fond hover (si fournie) -->
  {#if hoverBackgroundSvg}
    <img 
      src={hoverBackgroundSvg} 
      alt="" 
      class="absolute top-0 left-0 block w-full h-auto max-w-full transition-opacity duration-300 ease-in-out"
      style="image-rendering: auto; shape-rendering: geometricPrecision; filter: contrast(1.1);"
      class:opacity-0={!isHovered}
    />
  {/if}

  <!-- Zone de texte -->
  <div 
    class="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none box-border {paddingX} {paddingY}"
  >
    <span class="whitespace-nowrap text-center overflow-hidden text-ellipsis max-w-[90%] {lgFontSize} {mdFontSize} {smFontSize} {fontSize}">
      {label}
    </span>
  </div>
</a>
