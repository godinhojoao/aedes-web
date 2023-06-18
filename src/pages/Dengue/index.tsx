import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ComplaintsMap } from "./ComplaintsMap";

export function DenguePage(): JSX.Element {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <ComplaintsMap />
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
