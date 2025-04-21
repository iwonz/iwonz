import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { downloadCountriesJson } from './components/Map/borders/downloadCountriesJson';
import { downloadRegionsJson } from './components/Map/borders/downloadRegionsJson';
import { addScript } from '@/utils';
import { Map } from './components/Map/Map';

addScript(
  'https://api-maps.yandex.ru/2.1/?apikey=1159e25f-cf19-4f0e-887d-1dd48b01bd16&lang=ru_RU',
  '',
  () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.downloadAllJsons = async () => {
      await downloadCountriesJson();
      await downloadRegionsJson();
    };

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Map />
      </React.StrictMode>
    );
  }
);
