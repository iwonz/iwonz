import { PLACES_CONFIG } from '@/pages/places/config';
import { download } from '@/utils';

export const downloadCountriesJson = async () => {
  let countries = await ymaps.borders.load('001', {
    lang: PLACES_CONFIG.lang,
    quality: 3,
  });

  countries = countries.features.reduce((acc: any, feature: any) => {
    acc[feature.properties.iso3166] = feature;

    return acc;
  }, {});

  download(JSON.stringify(countries), 'countries.json');
};
