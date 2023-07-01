import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { ComplaintTable } from "../../core/components/ComplaintTable";

export function ComplaintPage(): JSX.Element {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12} md={12} lg={12}>
          <ComplaintTable />
        </Grid>
      </Container>
    </>
  );
}
