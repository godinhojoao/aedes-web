import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export function Copyright(): JSX.Element {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 0, mb: 5 }}
    >
      {"Copyright © "}

      <Link
        color="inherit"
        href="https://www.linkedin.com/in/joaogodinhoo/"
        rel="noreferrer"
        target="_blank"
        mr={.5}
      >
        João Godinho
      </Link>

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
