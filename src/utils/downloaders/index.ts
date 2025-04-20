import { downloadCountriesJson } from './downloadCountriesJson';
import { downloadRegionsJson } from './downloadRegionsJson';
import { downloadVisited } from './downloadVisited';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.downloadAllJsons = async () => {
  await downloadCountriesJson();
  await downloadRegionsJson();
  await downloadVisited();
};
