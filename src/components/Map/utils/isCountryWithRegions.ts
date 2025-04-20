import { REGIONS } from './index';

export const isCountryWithRegions = (countryIsoKey: string) => REGIONS.includes(countryIsoKey);
