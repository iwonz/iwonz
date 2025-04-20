import { isDisputedRussiaRegion } from './utils';
import { VISITED_REGIONS } from './VISITED_REGIONS';
import { VISITED_LOCATIONS } from './VISITED_LOCATIONS';
import { LocationType } from './types';

export const ACTIONS = VISITED_LOCATIONS.flatMap((location) =>
  location?.actions ? location.actions : [],
);
export const ACTIONS_COUNT = ACTIONS.length;

export const VISITED_COUNTRIES_COUNT = Object.keys(VISITED_REGIONS).filter((isoKey) => !isoKey.includes('-')).length;
export const VISITED_RUSSIA_REGIONS_COUNT = Object.keys(VISITED_REGIONS).filter((isoKey) => isoKey.startsWith('RU-') || isDisputedRussiaRegion(isoKey)).length;

export const VISITED_CITIES_COUNT = VISITED_LOCATIONS.filter((location) => location.type === LocationType.CITY).length;
export const VISITED_PLACES_COUNT = VISITED_LOCATIONS.filter((location) => location.type === LocationType.PLACE).length;
export const VISITED_AIRPORTS_COUNT = VISITED_LOCATIONS.filter((location) => location.type === LocationType.AIPORT).length;
