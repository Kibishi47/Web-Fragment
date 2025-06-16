// constants.js
export const SOL_OFFSET_VH = -200
export const IMPACT_POINT = 0.25
export const BREAK_POINT = 0.3
export const FRAGMENT_COUNT = 15

// Dimensions de base (pour desktop)
export const SQUARE_WIDTH = 300
export const SQUARE_HEIGHT = 300
export const SOL_HEIGHT = 10

// Fonction pour créer des fragments avec des tailles adaptatives
export function createFragments(count) {
  return Array.from({ length: count }, () => {
    const goesDown = Math.random() < 0.7

    // Tailles de base pour desktop
    const width = Math.random() < 0.25 ? Math.random() * 50 + 30 : Math.random() * 30 + 15
    const height = Math.random() < 0.25 ? Math.random() * 30 + 15 : Math.random() * 15 + 5

    // Ajuster les offsets pour être réactifs
    const xOffsetBase = (Math.random() - 0.5) * 1200
    const yOffsetBase = goesDown ? Math.random() * 600 + 100 : -Math.random() * 200 - 50

    return {
      // Dimensions originales (seront ajustées par GSAP)
      width,
      height,
      // Offsets originaux (seront ajustés par GSAP)
      xOffset: xOffsetBase,
      yOffset: yOffsetBase,
      rotation: Math.random() * 1440 - 720,
      zIndex: Math.random() < 0.3 ? 15 : 5,
      color: Math.random() < 0.25 ? "#222" : "#333",
    }
  })
}

// Fonction utilitaire pour adapter les valeurs en fonction de la taille de l'écran
export function getResponsiveValue(baseValue, breakpoints) {
  if (typeof window === "undefined") return baseValue

  const width = window.innerWidth

  if (width <= 480 && breakpoints.xs !== undefined) {
    return typeof breakpoints.xs === "function" ? breakpoints.xs(baseValue) : breakpoints.xs
  }

  if (width <= 768 && breakpoints.sm !== undefined) {
    return typeof breakpoints.sm === "function" ? breakpoints.sm(baseValue) : breakpoints.sm
  }

  if (width <= 1024 && breakpoints.md !== undefined) {
    return typeof breakpoints.md === "function" ? breakpoints.md(baseValue) : breakpoints.md
  }

  return baseValue
}
