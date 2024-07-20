import { theme as proTheme } from "@chakra-ui/pro-theme";
import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from "@chakra-ui/react";

import "@fontsource-variable/inter";

export const theme = extendTheme(
  {
    colors: {
      ...baseTheme.colors,
      brand: baseTheme.colors.blue,
      proxima: {
        orange: "#FF7043",
        blue: "#2E66F6",
        lightblue: "#ebf0ff",
        black: "#1e2227",
        darkgray: "#2d3748",
        gray: "#78889B",
        mediumgray: "#E8EBEE",
        lightgray: "#f7fafc",
        white: "#ffffff",
        red: "#ff5065",
        green: "#64c354",
        lightgreen: "#e2ffdd",
        yellow: "#E7D430",
        brown: "#e09b5d",
        canvas: "#f6f7f8",
      },
    },
    fonts: {
      heading: "'Inter Variable', -apple-system, system-ui, sans-serif",
      body: "'Inter Variable', -apple-system, system-ui, sans-serif",
    },
    styles: {
      global: {
        "html, body": {
          color: "proxima.black",
        },
      },
    },
  },
  proTheme,
  withDefaultColorScheme({ colorScheme: "orange" })
);
