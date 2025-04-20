export const isDisputedRussiaRegion = (regionIsoCode: string) =>
  [
    'UA-09', // Луганская область
    'UA-23', // Запорожская область
    'UA-65', // Херсонская область
    'UA-14', // Донецкая область
  ].includes(regionIsoCode);
