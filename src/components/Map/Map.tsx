import { useEffect } from "react";

import {
  isDisputedRussiaRegion,
  isVisitedRegionOrCountry,
  isCountryWithRegions,
  getBalloonContent,
} from "./utils";
import {
  VISITED_CITIES_COUNT,
  VISITED_COUNTRIES_COUNT,
  VISITED_RUSSIA_REGIONS_COUNT,
  VISITED_AIRPORTS_COUNT,
} from "./VISITED_COMPUTED.ts";
import { LocationType } from "./types.ts";
import { VISITED_LOCATIONS } from "./VISITED_LOCATIONS.ts";

import countries from './countries.json';
import regions from './regions.json';

let map: any = null;

async function initializeMap() {
  if (map) {
    return;
  }

  map = new ymaps.Map(
    "map",
    {
      type: "yandex#map",
      center: [55.755864, 37.617698],
      zoom: 4,
      minZoom: 4,
      maxZoom: 16,
      controls: ["rulerControl"],
    },
    {
      autoFitToViewport: "always",
      suppressMapOpenBlock: true,
      suppressObsoleteBrowserNotifier: true,
      yandexMapAutoSwitch: false,
    },
  );

  const fullScreenControl = new ymaps.control.FullscreenControl();
  map.controls.add(fullScreenControl);

  const searchControl = new ymaps.control.SearchControl({
    options: {
      size: "small",
      provider: "yandex#map",
      noPlacemark: true,
    },
  });
  map.controls.add(searchControl);

  // Render locations
  const placesGeoObjectCollection = new ymaps.GeoObjectCollection();
  VISITED_LOCATIONS.forEach((location) => {
    const balloonContent = getBalloonContent(location);
    let iconImageHref = balloonContent
      ? "data:image/png;base64,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"
      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADVklEQVR4nO1azU4UQRDuIB70puhF8AVMyHbDroHTXjh6gKRrWfCkB6NnTVAu60EFDl6MYcPPE6jrQVaCzBPgxcTgA6gcVMADCS5LbMrUqMkiM8OuzHT3sv0llUx2JqG+r6urq6phTAMQ4AQK6EcO44pDSQn4oIT8rrjc9Y2eBazSO+TyHvbk+pAV2lizA9PDFxWXk0rA2p4AbMSUgM9KwAR2D3WxZgNyOK84zCgB1UaJBwhRVQKmMTPYwZoByGFUCdg8KvEDQnDYQAHDzFZg742TSsBc3MQPCiGLmM22M5uAvVdOKwGLSZOv2RZl+pvMopVf1EV+nwg2RILSEPYRIkwbJY8peTXUwcwI7t6awkqxjNult77RM/1G7+ISAXsgZ4Z8ZrBDcbkeuDLZ61iZe4PbC+8CrTK75H8T2+nQO3JOuwCKw0zYykeRrxUhrkhQXD7VSh67h7rCihwK8cPI/7Xdm1Nx5YIdTEGnNgEUl5NhzlSKr+sWgL6NMSE+0kIeWaGN6vQwR7ZLK3ULQN/GKMAaNV3JCyCgP8qRRgT48SI+AcgwBZeTF4DDeJQTpraALwCHu4kLoDi8jHLCRBKs2QbPkxdAwGqkI3QMzi7Vdwym8/EKwOG9DgE2D3WECqEIEeIshPYLINd1CFCty6F03g9xPydQYiytYGW6/DvsY175mi2wY48AQr/pEmDTNFHTW2DVXgF0JEEOJYu3wDPjhdCeQUMBY8kL0JPrs1YAnsvoaYa4/GRd+HP4qO02SQmYsE4AIR8yGwYie0bIax6IEGgia1H4P2G6gZfgrBLwzQLyG8buDVHIvGkBkINkJqG4LLZU6P8LmsMdNiRJiPyCFVdjNZejZX3k5Svsg1PMJmA2267jZKCwt2blg0B3dWFXZkciLuCr8YTX0BHJ5VMqUGII94q/6t2jZ1izAVPQSTc2/9M7UG2vODxAkb/Amh3ICm10aUFz+y/yMW4N3MZq/zX8mR7xjZ63Bu4gvaOWlrq6Y/FvckHw5hGjjB13eE4AdBHguS2ALgd4LgmiOwU8dwyiqwM8VwihqwQ9Vwqj6wU81wyh6wY91w6jmwew4w7PzQOwtecBy/M4FkZ+eR4LrBWwHCBCy5APEqHlyLM/8ObwPplJJ34Blnp5z6At/dsAAAAASUVORK5CYII=";

    if (location.type === LocationType.AIPORT) {
      iconImageHref = 'data:image/png;base64,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';
    }

    const iconImageSize = balloonContent ? [32, 32] : [32, 32];
    const iconImageOffset = balloonContent ? [-16, -28] : [-16, -28];

    const placemark = new ymaps.Placemark(
      location.coordinates,
      {
        hintContent: location.name,
        balloonContent,
      },
      {
        iconLayout: "default#image",
        iconImageHref,
        iconImageSize,
        iconImageOffset,
      },
    );

    placesGeoObjectCollection.add(placemark);
  });
  map.geoObjects.add(placesGeoObjectCollection);
  // End of render locations

  // Render countries
  const countriesGeoObjectCollection = new ymaps.GeoObjectCollection();
  const countriesGeoObjects: Record<string, typeof ymaps.GeoObject> = {};
  Object.keys(countries).forEach((countryIsoKey) => {
    const country = countries[countryIsoKey];
    const isWithRegions = isCountryWithRegions(countryIsoKey);

    country.properties.hintContent = isWithRegions
      ? null
      : country.properties.name;

    const countryGeoObject = new ymaps.GeoObject(country, {
      fillOpacity: isWithRegions ? 0 : 0.5,
      fillColor: isVisitedRegionOrCountry(countryIsoKey)
        ? "#80ff80"
        : "#e2e2e2",
      strokeWidth: 0,
      strokeColor: "#db757f",
      strokeOpacity: isWithRegions ? 0.5 : 1,
    });

    if (!isWithRegions) {
      countryGeoObject.events.add("mouseenter", () => {
        countryGeoObject.options.set("strokeWidth", 1);
      });

      countryGeoObject.events.add("mouseleave", () => {
        countryGeoObject.options.set("strokeWidth", 0);
      });
    }

    countriesGeoObjects[countryIsoKey] = countryGeoObject;

    countriesGeoObjectCollection.add(countryGeoObject);
  });
  map.geoObjects.add(countriesGeoObjectCollection);
  // End of render countries

  // Render regions
  const regionsGeoObjectCollection = new ymaps.GeoObjectCollection();
  const regionsGeoObjects: Record<string, typeof ymaps.GeoObject> = {};
  Object.keys(regions).forEach((regionIsoCode) => {
    const region = regions[regionIsoCode];
    const countryIsoCode = isDisputedRussiaRegion(regionIsoCode)
      ? "RU"
      : regionIsoCode.split("-")[0];

    region.properties.hintContent = `${countries[countryIsoCode].properties.name}, ${region.properties.name}`;

    const regionGeoObject = new ymaps.GeoObject(region, {
      fillOpacity: 0.5,
      fillColor: isVisitedRegionOrCountry(regionIsoCode)
        ? "#80ff80"
        : "#e2e2e2",
      strokeWidth: 0,
      strokeColor: "#db757f",
    });

    regionsGeoObjects[regionIsoCode] = regionGeoObject;

    regionGeoObject.events.add("mouseenter", () => {
      Object.keys(regions).forEach((regionIsoCode) => {
        const isDisputedRegion = isDisputedRussiaRegion(regionIsoCode);

        const isHighlighted =
          (isDisputedRegion && countryIsoCode === "RU") ||
          (regionIsoCode.startsWith(countryIsoCode) && !isDisputedRegion);

        if (isHighlighted) {
          regionsGeoObjects[regionIsoCode].options.set("strokeWidth", 0.3);
        }
      });

      regionGeoObject.options.set("strokeWidth", 1);
    });

    regionGeoObject.events.add("mouseleave", () => {
      Object.keys(regions).forEach((regionIsoCode) => {
        const isDisputedRegion = isDisputedRussiaRegion(regionIsoCode);

        const isHighlighted =
          (isDisputedRegion && countryIsoCode === "RU") ||
          (regionIsoCode.startsWith(countryIsoCode) && !isDisputedRegion);

        if (isHighlighted) {
          regionsGeoObjects[regionIsoCode].options.set("strokeWidth", 0);
        }
      });

      regionGeoObject.options.set("strokeWidth", 0);
    });

    regionsGeoObjectCollection.add(regionGeoObject);
  });
  map.geoObjects.add(regionsGeoObjectCollection);
  // End of render regions
}

export interface MapProps {
  isStatsVisible?: boolean;
  borderRadius?: number;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Map = ({ isStatsVisible, borderRadius = 10 }: MapProps) => {
  useEffect(() => {
    ymaps.ready(() => {
      initializeMap();
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          borderRadius,
          overflow: "hidden",
        }}
      ></div>
      {isStatsVisible && (
        <div
          style={{
            position: 'absolute',
            fontFamily: `'Roboto', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'`,
            right: 10,
            bottom: 10,
            fontSize: 14,
            padding: 30,
            background: '#fff',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: 'center',
            gap: 15,
          }}
        >
          <div>🌎 {VISITED_COUNTRIES_COUNT} стран</div>
          <div>🏙️ {VISITED_CITIES_COUNT} населённых пунктов</div>
          <div>🇷🇺 {VISITED_RUSSIA_REGIONS_COUNT} из 89 регионов России</div>
          <div>✈️ {VISITED_AIRPORTS_COUNT} аэропортов</div>
        </div>
      )}
    </div>
  );
};
