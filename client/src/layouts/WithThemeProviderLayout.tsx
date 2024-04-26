import React, { ReactElement } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { JsxElement } from "typescript";

export function WithThemeProviderLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            md: 1024,
            sm: 640,
            xs: 0,
            lg: 1280,
            xl: 1536,
          },
        },
      })}
    >
      <Grid container justifyContent="center">
        <Grid xs={10}>{children}</Grid>
      </Grid>
    </ThemeProvider>
  );
}
