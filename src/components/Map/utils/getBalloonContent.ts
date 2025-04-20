import type { Location } from '../types';

export const getBalloonContent = (location: Location) => {
  if (location.actions) {
    const actions = location.actions
      .map((link) => {
        return `<li><a href="${link.url}" target="_blank">${link.name}</a></li>`;
      })
      .join('');

    return `События в этом месте:<br /><ul>${actions}</ul>`;
  }

  return null;
};
