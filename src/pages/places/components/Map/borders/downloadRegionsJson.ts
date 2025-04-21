import { PLACES_CONFIG } from '@/pages/places/config';
import { download } from '@/utils';

export const downloadRegionsJson = async () => {
  let regions = await Promise.all(
    PLACES_CONFIG.countriesWithRegions.map((region) => {
      return ymaps.borders.load(region, {
        lang: PLACES_CONFIG.lang,
        quality: 3,
      });
    })
  );

  regions = regions.reduce((acc, region) => {
    region.features.forEach((feature: any) => {
      acc[feature.properties.iso3166] = feature;
    });

    return acc;
  }, {});

  download(JSON.stringify(regions), 'regions.json');
};
