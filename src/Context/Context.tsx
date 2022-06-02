import { createContext, Dispatch, SetStateAction } from "react";

export interface MapContext {
  center: google.maps.LatLngLiteral;
  keyword: string | null;
  map?: google.maps.Map;
  places: google.maps.places.PlaceResult[];
  zoom: number;
  setCenter: Dispatch<SetStateAction<google.maps.LatLngLiteral>>;
  setKeyword: Dispatch<SetStateAction<string | null>>;
  setMap: Dispatch<SetStateAction<google.maps.Map | undefined>>;
  setPlaces: Dispatch<SetStateAction<google.maps.places.PlaceResult[]>>;
  setZoom: Dispatch<SetStateAction<number>>;
  searchMap: () => void;
}

export default createContext<MapContext | null>(null);
