import { useState, FC } from "react";

import Map, { Marker, NavigationControl } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

import "mapbox-gl/dist/mapbox-gl.css";
import MapPin from "./MapPin";

interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface Props {
  coordinates: Array<Array<{ latitude: number; longitude: number }>>;
  colors: Array<string>;
}

const MapboxMap: FC<Props> = ({ coordinates, colors }) => {
  const DEFAULT_LATITUDE = -37.833753;
  const DEFAULT_LONGITUDE = 144.956935;

  const center = getCenter(coordinates.flat());
  const [viewState, setViewState] = useState<ViewState>({
    latitude: center && center.latitude ? center.latitude : DEFAULT_LATITUDE,
    longitude:
      center && center.longitude ? center.longitude : DEFAULT_LONGITUDE,
    zoom: 14,
  });

  // TODO: REMOVE
  const keyTEMP =
    "pk.eyJ1IjoiamVub3lhbW1hIiwiYSI6ImNsZWFvMTQ1ZzAzMXYzeGs3NDFycnhzMnUifQ.IgVPGPGj7zqAfz80sMxucw";

  return (
    <Map
      {...viewState}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      mapboxAccessToken={keyTEMP}
      onMove={(evt: any) => setViewState(evt.viewState)}
    >
      {coordinates.map((coordinateArray, arrayIndex) =>
        coordinateArray.map((coordinate, index) => (
          <Marker
            key={`${arrayIndex}-${index}`}
            latitude={coordinate.latitude}
            longitude={coordinate.longitude}
          >
            <MapPin color={colors[arrayIndex]} />
          </Marker>
        ))
      )}
      <NavigationControl style={{ bottom: 8, right: 8 }} />
    </Map>
  );
};

export default MapboxMap;
