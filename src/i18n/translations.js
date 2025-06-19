export const translations = {
  fr: {
    "s1.spinback.what": "qu'est-ce que spinback ?",
    "s1.spinback.description":
      "Spinback est un jeu d'enquête interactif où vous explorez la mémoire collective d'une soirée étudiante qui vole en éclats.",
    "s2.interaction.subtitle": "un mode d'interaction innovant",
    "s2.interaction.title":
      "Contrôlez le passé comme un vinyle, à l'aide d'une véritable platine : avancez, rembobinez, isolez chaque détail, pour rétablir la vérité.",
    "s3.trailer.title": "TRAILER",
    "s3.trailer.iframe_title": "Trailer vidéo",
    "s3.trailer.video_not_supported":
      "Votre navigateur ne supporte pas la lecture de vidéos.",
    "s3.trailer.coming_soon": "Trailer à venir",
    "s3.trailer.preview_alt": "Aperçu du trailer",
  },
  en: {
    "s1.spinback.what": "what is spinback?",
    "s1.spinback.description":
      "Spinback is an interactive investigation game where you explore the collective memory of a student party that falls apart.",
    "s2.interaction.subtitle": "an innovative interaction mode",
    "s2.interaction.title":
      "Control the past like a vinyl, using a real turntable: fast forward, rewind, isolate every detail, to restore the truth.",
    "s3.trailer.title": "TRAILER",
    "s3.trailer.iframe_title": "Video trailer",
    "s3.trailer.video_not_supported":
      "Your browser does not support video playback.",
    "s3.trailer.coming_soon": "Trailer coming soon",
    "s3.trailer.preview_alt": "Trailer preview",
  },
};

export function t(key, locale = "fr") {
  return translations[locale]?.[key] || key;
}
