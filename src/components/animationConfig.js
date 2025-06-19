// animationConfig.js
export const ANIMATION_CONFIG = {
  // === SÉLECTEURS DES SECTIONS ===
  selectors: {
    hero: ".hero",
    section1: ".section-1", 
    section2: ".section-2"
  },

  // === DIMENSIONS DU PERSONNAGE ===
  character: {
    width: 200,
    height: 200,
    heroPosition: 75, // Plus bas dans le hero (75% au lieu de 50%)
    image: "/assets/images/guy.png"
  },

  // === VITESSE DE CHUTE ===
  fallSpeed: {
    scrollMultiplier: 0.6 // 60% de la vitesse du scroll (plus rapide que 30%)
  },

  // === TIMING AJUSTÉ ===
  phases: {
    fallEnd: 0.5,
    impactEnd: 0.7,
    disappearEnd: 1.0
  },

  // === FRAGMENTS ===
  fragments: {
    count: 15,
    sizeRange: { min: 12, max: 35 },
    velocityRange: { x: 400, y: 250 },
    colors: ["#444", "#555", "#666", "#777"]
  },

  // === RESPONSIVE ===
  responsive: {
    mobileBreakpoint: 768,
    mobileScale: 0.7
  },

  // === Z-INDEX ===
  zIndex: {
    overlay: 100,
    character: 101,
    fragments: 102,
    behindSection2: 1
  }
};

export function createFragments() {
  const config = ANIMATION_CONFIG.fragments;
  
  return Array.from({ length: config.count }, (_, i) => ({
    id: i,
    width: Math.random() * (config.sizeRange.max - config.sizeRange.min) + config.sizeRange.min,
    height: Math.random() * 20 + 8,
    xVelocity: (Math.random() - 0.5) * config.velocityRange.x,
    yVelocity: -(Math.random() * config.velocityRange.y + 100),
    rotation: Math.random() * 720 - 360,
    color: config.colors[Math.floor(Math.random() * config.colors.length)]
  }));
}

export function getResponsiveScale() {
  if (typeof window === 'undefined') return 1;
  return window.innerWidth <= ANIMATION_CONFIG.responsive.mobileBreakpoint 
    ? ANIMATION_CONFIG.responsive.mobileScale 
    : 1;
}
