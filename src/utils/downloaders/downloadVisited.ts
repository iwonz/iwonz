import { download } from '../index';
import * as VISITED from '../../components/Map/VISITED_COMPUTED';
import { VISITED_LOCATIONS } from '../../components/Map/VISITED_LOCATIONS';

export const downloadVisited = () => {
  download(
    JSON.stringify(
      Object.assign(
        {
          VISITED_LOCATIONS,
        },
        VISITED
      )
    ),
    'visited.json'
  );
};
