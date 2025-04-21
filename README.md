# Create your own version

1. Clone this repo
2. Change `GITHUB_LOGIN` and `GITHUB_REPO_NAME` in `scripts/deploy.js`
3. Change `GITHUB_REPO_NAME` in `vite.config.js`

# Places

For configure check `src/pages/places/config.tsx`.

## Updating visited places

1. Fill `src/pages/places/VISITED_REGIONS.ts` and `src/pages/places/VISITED_LOCATIONS.ts`

## Updatind borders

1. `yarn dev`
2. Open `http://localhost:5173/src/pages/places/index.html` in browser
3. Open Console
4. Call `downloadAllJsons()` in Console
5. Move downloaded `countries.json` and `regions.json` to `src/pages/places/components/Map/borders`

## Dev

1. `yarn dev`
2. Open `http://localhost:5173/src/pages/places/index.html` in browser

## Deploy

1. `yarn deploy`
