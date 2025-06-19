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
  export let sectionHeight = "auto";
  export let alignItems = "center";
</script>

<section 
  class="section-2 relative w-full overflow-hidden bg-gradient-to-b from-[#7f3dc5] to-[#6a09c9] z-20" 
  style="padding: {padding}; height: {sectionHeight};"
>
  <!-- Version Desktop (exactement comme avant + texte légèrement plus gros) -->
  <div class="hidden md:flex mx-auto flex-col md:flex-row justify-between h-full"
       style="gap: {columnGap}; align-items: {alignItems};">
    <div class="md:w-1/2 text-left">
      <p class="{subtitleColor} font-['Salted'] text-xl md:text-2xl text-left m-0">
        un mode d'interaction innovant
      </p>
      
      <h2 class="{titleColor} font-['Salted'] text-4xl md:text-4xl lg:text-5xl font-normal leading-tight text-left m-0"
          style="margin-top: {textSpacing};">
        Contrôlez le passé comme un vinyle, à l'aide d'une véritable platine : avancez, rembobinez, isolez chaque détail, pour rétablir la vérité.
      </h2>
    </div>
    
    <div class="md:w-1/2 flex justify-end p-0">
      <div class="{imagePosition} p-0 m-0">
        <img 
          src={imageSrc} 
          alt="Platine DJ" 
          class="h-auto object-contain {imageSize} p-0 m-0" 
          style={imageMaxWidth ? `max-width: ${imageMaxWidth};` : ''}
        />
      </div>
    </div>
  </div>

  <!-- Version Mobile (image 120% width) -->
  <div class="block md:hidden text-center">
    <!-- Texte centré en haut -->
    <div class="mb-8">
      <p class="{subtitleColor} font-['Salted'] text-lg font-medium mb-6 uppercase tracking-wide">
        un mode d'interaction innovant
      </p>
      
      <h2 class="{titleColor} font-['Salted'] text-2xl sm:text-3xl font-normal leading-tight">
        Contrôlez le passé comme un vinyle, à l'aide d'une véritable platine : avancez, rembobinez, isolez chaque détail, pour rétablir la vérité.
      </h2>
    </div>
    
    <!-- Image très grande (120% de la largeur) -->
    <div class="flex justify-center">
      <img 
        src={imageSrc} 
        alt="Platine DJ" 
        class="h-auto object-contain"
        style="width: 120vw; max-width: 400px"
      />
    </div>
  </div>
</section>

<style>
  section {
    font-family: 'Salted', sans-serif;
  }
</style>
