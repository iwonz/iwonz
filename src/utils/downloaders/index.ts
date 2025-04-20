import { downloadCountriesJson } from "./downloadCountriesJson.ts";
import { downloadRegionsJson } from "./downloadRegionsJson.ts";
import { downloadVisited } from "./downloadVisited.ts";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.downloadAllJsons = async () => {
  await downloadCountriesJson();
  await downloadRegionsJson();
  await downloadVisited();
};
