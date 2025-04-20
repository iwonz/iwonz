import { download } from '../index';
import { REGIONS } from '../../components/Map/utils';

export const downloadRegionsJson = async () => {
  let regions = await Promise.all(
    REGIONS.map((region) => {
      return ymaps.borders.load(region, {
        lang: 'ru',
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
