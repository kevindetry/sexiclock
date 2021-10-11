import createCache from "@emotion/cache";
import { CacheProvider, Global } from "@emotion/react";
import { StrictMode, Suspense, useMemo } from "react";
import { Clock } from "./components";

const colorScheme = (scheme: "light" | "dark") =>
  `@media (prefers-color-scheme: ${scheme})`;

const GlobalStyle = () => (
  <Global
    styles={{
      body: {
        fontFamily: "system-ui",
        margin: 0,
        [colorScheme("light")]: {
          backgroundColor: "#fff",
          color: "#000b",
        },

        [colorScheme("dark")]: {
          backgroundColor: "#333",
          color: "#fffc",
        },
      },
      "html,body,#app": {
        blockSize: "100%",
        inlineSize: "100%",
      },
      "#app": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    }}
  />
);

const App = (): JSX.Element => {
  const cache = useMemo(
    () => createCache({ key: "css", stylisPlugins: [] }),
    []
  );
  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <GlobalStyle />
        <Suspense fallback={null}>
          <Clock />
        </Suspense>
      </CacheProvider>
    </StrictMode>
  );
};

export default App;
