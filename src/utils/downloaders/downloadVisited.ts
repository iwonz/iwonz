import { download } from "../index.ts";
import * as VISITED from "../../components/Map/VISITED_COMPUTED.ts";
import { VISITED_LOCATIONS } from "../../components/Map/VISITED_LOCATIONS.ts";

export const downloadVisited = () => {
  download(JSON.stringify(Object.assign({
    VISITED_LOCATIONS,
  }, VISITED)), "visited.json");
};
