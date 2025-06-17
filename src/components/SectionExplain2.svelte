<script>
  export let padding = "140px 120px";
  export let imageSrc = "/assets/images/IlluPlatine.svg";
  export let imageSize = "w-full";
  export let imageMaxWidth = "550px";
  export let imagePosition = "ml-auto";
  export let textSpacing = "24px";
  export let columnGap = "124px";
  export let titleColor = "text-white";
  export let subtitleColor = "text-[#1C0B3F]";
  export let sectionHeight = "auto"; // Hauteur de la section (auto par défaut)
  export let alignItems = "center"; // Alignement vertical des colonnes
</script>

<section 
  class="relative w-full overflow-hidden bg-gradient-to-b from-[#AA53FFB2] to-[#6a09c9]" 
  style="padding: {padding}; height: {sectionHeight};">
  <div class="mx-auto flex flex-col md:flex-row justify-between h-full"
       style="gap: {columnGap}; align-items: {alignItems};">
    <div class="md:w-1/2 text-left">
      <p class={`${subtitleColor} font-['Salted'] text-lg md:text-xl text-left m-0`}>un mode d'interaction innovant</p>
      
      <h2 class={`${titleColor} font-['Salted'] text-3xl sm:text-3xl md:text-3xl font-normal leading-tight text-left m-0`}
          style="margin-top: {textSpacing};">
        Contrôlez le passé comme un vinyle, à l'aide d'une véritable platine : avancez, rembobinez, isolez chaque détail, pour rétablir la vérité.
      </h2>
    </div>
    
    <div class="md:w-1/2 flex justify-end p-0">
      <div class={`${imagePosition} p-0 m-0`}>
        <img 
          src={imageSrc} 
          alt="Platine DJ" 
          class={`h-auto object-contain ${imageSize} p-0 m-0`} 
          style={imageMaxWidth ? `max-width: ${imageMaxWidth};` : ''}
        />
      </div>
    </div>
  </div>
</section>
