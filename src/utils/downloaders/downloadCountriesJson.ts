import { download } from "../index.ts";

export const downloadCountriesJson = async () => {
  let countries = await ymaps.borders.load("001", {
    lang: "ru",
    quality: 3,
  });

  countries = countries.features.reduce((acc, feature) => {
    acc[feature.properties.iso3166] = feature;

    return acc;
  }, {});

  download(JSON.stringify(countries), "countries.json");
};
