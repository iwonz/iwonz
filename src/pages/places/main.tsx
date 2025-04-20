import React from "react";
import ReactDOM from "react-dom/client";
import "../../utils/downloaders/index.ts";
import { Map } from "../../components/Map/Map.tsx";
import { addScript } from "../../utils/addScript.ts";
import './places.css';

addScript(
  "https://api-maps.yandex.ru/2.1/?apikey=1159e25f-cf19-4f0e-887d-1dd48b01bd16&lang=ru_RU",
  "",
  () => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <Map isStatsVisible={true} borderRadius={0} />
      </React.StrictMode>,
    );
  },
);
