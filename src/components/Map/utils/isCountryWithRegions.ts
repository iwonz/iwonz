import { REGIONS } from "./index.ts";

export const isCountryWithRegions = (countryIsoKey: string) =>
  REGIONS.includes(countryIsoKey);
