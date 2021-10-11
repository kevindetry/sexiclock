import { useState } from "react";
import { timeFormatter, useGeolocation, useTime } from "../services";

const Clock = (): JSX.Element => {
  const geolocation = useGeolocation();
  const [formatter, setFormatter] =
    useState<keyof typeof timeFormatter>("seximal");

  const time = useTime({
    ...(geolocation && { longitude: geolocation.longitude }),
    formatter,
  });

  return (
    <div css={{ display: "flex", flexDirection: "column" }}>
      <div
        css={{
          fontSize: "min(12rem, 20vw)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {time}
      </div>
      <div css={{ display: "flex", gap: "1rem" }}>
        <label>
          Seximal
          <input
            type="radio"
            value="seximal"
            checked={formatter === "seximal"}
            onChange={({ target: { value } }) =>
              setFormatter(value as keyof typeof timeFormatter)
            }
          />
        </label>
        <label>
          Legacy
          <input
            type="radio"
            value="legacy"
            checked={formatter === "legacy"}
            onChange={({ target: { value } }) =>
              setFormatter(value as keyof typeof timeFormatter)
            }
          />
        </label>
      </div>
    </div>
  );
};

export default Clock;
