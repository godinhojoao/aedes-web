import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export function Copyright(): JSX.Element {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
    >
      {"Copyright © "}

      <Link
        color="inherit"
        href="https://www.linkedin.com/in/jo%C3%A3o-godinho/"
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
