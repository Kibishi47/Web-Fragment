<script>
  export let label = "KICKSTARTER";
  export let link = "#";
  export let backgroundSvg = "/assets/images/button.svg";
  export let borderSvg = "/assets/images/button.svg";
  export let hoverBackgroundSvg = "/assets/images/button.svg";
  export let newTab = false;
  export let size = "200px"; // (largeur)
  export let ratio = 0.2;

  let isHovered = false;

  function toggleHover(state) {
    isHovered = state;
  }
  $: buttonHeight = `calc(${size} * ${ratio})`;
</script>

<a
  href={link}
  target={newTab ? "_blank" : "_self"}
  rel="noopener noreferrer"
  class="custom-btn"
  on:mouseenter={() => toggleHover(true)}
  on:mouseleave={() => toggleHover(false)}
  style="width: {size}; height: {buttonHeight}; background-image: url({isHovered
    ? hoverBackgroundSvg
    : backgroundSvg}); background-size: cover; background-repeat: no-repeat; background-position: center;"
>
  <!-- Texte -->
  <span class="btn-label">{label}</span>
</a>

<style>
  .custom-btn {
    position: relative;
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    font-weight: bold;
    color: white;
    font-size: 1.2rem;
    user-select: none;
  }

  .custom-btn .btn-bg {
    display: block;
    object-fit: cover;
    width: 100%;
    height: auto;
  }

  .custom-btn .btn-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .custom-btn .btn-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    white-space: nowrap;
  }
</style>
