import { useEffect, useState } from "react";

export const useGeolocation = (): GeolocationCoordinates | undefined => {
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates>();

  useEffect(() => {
    navigator.geolocation.watchPosition(({ coords }) => setGeolocation(coords));
  }, []);

  return geolocation;
};
