// constants.js
export const VIEW_H_VH     = 250;
export const SOL_OFFSET_VH = -150;
export const IMPACT_POINT  = 0.25;
export const BREAK_POINT   = 0.30;
export const FRAGMENT_COUNT = 15;

export const SQUARE_WIDTH = 100;
export const SQUARE_HEIGHT = 100;


export function createFragments(count) {
  return Array.from({ length: count }, () => {
    const goesDown = Math.random() < 0.7;
    return {
      width:   Math.random() < 0.25 ? Math.random() * 50 + 30 : Math.random() * 30 + 15,
      height:  Math.random() < 0.25 ? Math.random() * 30 + 15 : Math.random() * 15 + 5,
      xOffset: (Math.random() - 0.5) * 1200,
      yOffset: goesDown 
               ? Math.random() * 600 + 100 
               : -Math.random() * 200 - 50,
      rotation: Math.random() * 1440 - 720,
      zIndex:   Math.random() < 0.3 ? 15 : 5,
      color:    Math.random() < 0.25 ? '#222' : '#333'
    };
  });
}
