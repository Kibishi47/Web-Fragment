<script>
  export let label = "KICKSTARTER";
  export let link = "#";
  export let backgroundSvg = "/assets/images/button-413x74.svg";
  export let hoverBackgroundSvg = null;
  export let newTab = false;
  export let fontSize = "1.2rem";
  export let paddingX = "10px";
  export let paddingY = "5px";

  let isHovered = false;

  function toggleHover(state) {
    isHovered = state;
  }
</script>

<a
  href={link}
  target={newTab ? "_blank" : "_self"}
  rel="noopener noreferrer"
  class="custom-btn"
  on:mouseenter={() => toggleHover(true)}
  on:mouseleave={() => toggleHover(false)}
>
  <!-- Image de fond -->
  <img src={isHovered && hoverBackgroundSvg ? hoverBackgroundSvg : backgroundSvg} alt="Button" class="btn-img" />

  <!-- Zone de texte avec padding -->
  <div class="btn-content" style="padding: {paddingY} {paddingX}; font-size: {fontSize};">
    <span class="btn-label">{label}</span>
  </div>
</a>

<style>
  .custom-btn {
    position: relative;
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    font-weight: 400;
    color: white;
    user-select: none;
    width: fit-content; /* largeur automatique */
  }

  .custom-btn .btn-img {
    display: block;
    width: 100%;
    height: auto;
  }

  .btn-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    box-sizing: border-box;
  }

  .btn-label {
    white-space: nowrap;
    text-align: center;
  }
</style>
