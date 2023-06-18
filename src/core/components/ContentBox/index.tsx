import Box from "@mui/material/Box";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Toolbar, createTheme } from "@mui/material";
import { Copyright } from "../Copyright";
import { ContentBoxProps } from "../../interfaces/props/ContentBoxProps";

const defaultTheme = createTheme();

export function ContentBox({ children }: ContentBoxProps): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme): any =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          width: "100%",
        }}
      >
        <Toolbar />
        {children}
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}
