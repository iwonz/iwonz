export enum LocationType {
  CITY,
  PLACE,
  AIPORT,
}

export interface Location {
  type: LocationType;
  name: string;
  coordinates: [number, number];
  actions?: Array<{
    name: string;
    url: string;
  }>;
}
