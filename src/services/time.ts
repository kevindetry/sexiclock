import { useCallback, useEffect, useState } from "react";
import { useRAF } from "./request-animation-frame";

export const useTime = ({
  longitude,
  formatter = "seximal",
}: {
  longitude?: number;
  formatter?: keyof typeof timeFormatter;
} = {}): string => {
  const getTime = useCallback(
    () =>
      timeFormatter[formatter](
        longitude === undefined
          ? timeForBrowserTimezone()
          : timeForLongitude(longitude)
      ),
    [formatter, longitude]
  );

  const [time, setTime] = useState(getTime);

  const updateTime = useCallback(() => {
    setTime(getTime);
  }, [getTime]);

  useEffect(() => {
    updateTime();
  }, [updateTime]);

  useRAF(updateTime);

  return time;
};

const dayDuration = 24 * 60 * 60 * 1000;

const timeForLongitude = (longitude: number) => {
  const now = Date.now();
  const millisecondsPerLongitude = dayDuration / 360;
  const longitudeOffset = millisecondsPerLongitude * (longitude ?? 0);
  const dateStart = new Date(now + longitudeOffset).setUTCHours(0, 0, 0, 0);
  return now + longitudeOffset - dateStart;
};

const timeForBrowserTimezone = () => {
  const now = Date.now();
  const dateStart = new Date(now).setHours(0, 0, 0, 0);
  return now - dateStart;
};

export const timeFormatter = {
  seximal: (lapsed: number): string =>
    {
      const seximalUnit = (dayDuration / 6 ** 6);
      return Math.floor(lapsed / seximalUnit)
        .toString(6)
        .padStart(6, "0")
        .split("")
        .reduce((acc, x, i) => acc + (i % 2 ? "" : ":") + x);
    },

  legacy: (lapsed: number): string => {
    const result = [];
    result.unshift(Math.floor((lapsed /= 1000) % 60));
    result.unshift(Math.floor((lapsed /= 60) % 60));
    result.unshift(Math.floor((lapsed /= 60) % 24));
    return result.map((x) => `${x}`.padStart(2, "0")).join(":");
  },
};
