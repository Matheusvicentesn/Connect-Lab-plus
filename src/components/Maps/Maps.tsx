import * as React from "react";
import mapboxgl from "mapbox-gl";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { MapStyle } from "./Maps.style";

interface MapProps {
  latitude: number;
  longitude: number;
}

const MapContainer = styled(Box)(MapStyle);

const apiUrl = import.meta.env.VITE_API_URL_MAP;

const Map = ({ latitude, longitude }: MapProps) => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<mapboxgl.Map>();

  React.useEffect(() => {
    mapboxgl.accessToken = apiUrl;

    const newMap = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 15,
    });

    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(newMap);
    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, [latitude, longitude]);

  return <MapContainer ref={mapContainer} />;
};

export default Map;
