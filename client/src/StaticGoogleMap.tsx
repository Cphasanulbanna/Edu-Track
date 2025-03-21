import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";

interface InfoDetails {
  name?: string;
  image?: string;
  address?: string;
}

interface MapObj {
  detail: {
    center: google.maps.LatLngLiteral;
  };
}

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const StaticGoogleMap = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [position, setPosition] = useState<google.maps.LatLngLiteral>({
    lat: 8.5229914,
    lng: 76.9558926,
  });
  const [infoDetails, setInfoDetails] = useState<InfoDetails>({});

  const MapHandler = ({ place, marker }: MapHandlerProps) => {
    const map = useMap();

    useEffect(() => {
      if (!map || !place || !marker) return;

      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry?.viewport);
      }
      marker.position = place.geometry?.location;
      setInfoDetails({
        name: place.name,
        address: place.formatted_address,
        image: place.photos?.[0]?.getUrl(),
      });
    }, [map, place, marker]);

    return null;
  };

  const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
      useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
      if (!places || !inputRef.current) return;

      const options = {
        fields: ["geometry", "name", "formatted_address", "photos"],
      };

      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
      if (!placeAutocomplete) return;

      placeAutocomplete.addListener("place_changed", () => {
        onPlaceSelect(placeAutocomplete.getPlace());
      });
    }, [onPlaceSelect, placeAutocomplete]);

    return (
      <div className="autocomplete-container">
        <input ref={inputRef} />
      </div>
    );
  };

  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  const onMapChange = useCallback((data: MapObj) => {
    const lat = data?.detail?.center?.lat;
    const lng = data?.detail?.center?.lng;
    setPosition({ lat: lat, lng: lng });
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Map
        mapId={"map-1"}
        defaultZoom={14}
        defaultCenter={position}
        style={{ height: "100vh", width: "100vw" }}
        // gestureHandling={"greedy"}
        // disableDefaultUI={true}
        onBoundsChanged={onMapChange}
      >
        <AdvancedMarker
          ref={markerRef}
          position={position}
          onClick={handleMarkerClick}
        />
        {infoWindowShown && (
          <InfoWindow anchor={marker} onClose={handleClose}>
            <h2>{infoDetails?.name}</h2>
            <p>Some arbitrary html to be rendered into the InfoWindow.</p>
            <div>
              <img
                src={infoDetails.image}
                alt=""
                width={"100px"}
                height={"100px"}
              />
            </div>
          </InfoWindow>
        )}
      </Map>
      <MapControl position={ControlPosition.TOP}>
        <div className="autocomplete-control">
          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
        </div>
      </MapControl>
      <MapHandler place={selectedPlace} marker={marker} />
    </APIProvider>
  );
};

export default StaticGoogleMap;
