import Context from "Context/Context";
import { useContext, useRef, useEffect, EffectCallback } from "react";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onIdle?: (map: google.maps.Map) => void;
}

function Map({ onIdle, style }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const value = useContext(Context);
  if (!value) {
    throw new Error("Could not find context value");
  }

  const map = value?.map;
  const center = value?.center;
  const zoom = value?.zoom;
  const setMap = value?.setMap;

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP],
        },
        disableDefaultUI: true,
        mapTypeControl: false,
        scaleControl: false,
        zoomControl: false,
      });
      setMap(newMap);
    }
  }, [ref, map, setMap]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      if (ref?.current) {
        map.setCenter(center);
        map.setZoom(zoom);
      }
    }
  }, [map, center, zoom]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onIdle]);

  return <div ref={ref} style={style} id="map" />;
}

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: EffectCallback,
  dependencies: any[]
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default Map;
