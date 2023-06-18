import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { ComplaintTable } from "../../core/components/ComplaintTable";

export function ComplaintPage(): JSX.Element {
  const rows = [
    {
      id: "report0",
      status: "Pendente",
      city: "Bagé",
      formattedAddress: "Getúlio vargas - Rua Otávio Hipólito 1940",
      createdAt: "09/06/2023",
    },
    {
      id: "report2",
      status: "Pendente",
      city: "Bagé",
      formattedAddress: "Getúlio vargas - Rua Otávio Hipólito 1940",
      createdAt: "09/06/2023",
    },
    {
      id: "report3",
      status: "Pendente",
      city: "Bagé",
      formattedAddress: "Getúlio vargas - Rua Otávio Hipólito 1940",
      createdAt: "09/06/2023",
    },
    {
      id: "report4",
      status: "Pendente",
      city: "Bagé",
      formattedAddress: "Getúlio vargas - Rua Otávio Hipólito 1940",
      createdAt: "09/06/2023",
    },
    {
      id: "report1",
      status: "Pendente",
      city: "Bagé",
      formattedAddress: "Getúlio vargas - Rua Otávio Hipólito 1940",
      createdAt: "09/06/2023",
    },
    {
      id: "report5",
      status: "Pendente",
      city: "Bagé",
      formattedAddress: "Getúlio vargas - Rua Otávio Hipólito 1940",
      createdAt: "09/06/2023",
    },
    {
      id: "report6",
      status: "Pendente",
      city: "Bagé",
      formattedAddress: "Getúlio vargas - Rua Otávio Hipólito 1940",
      createdAt: "09/06/2023",
    },
    {
      id: "report7",
      status: "Pendente",
      city: "Bagé",
      formattedAddress: "Getúlio vargas - Rua Otávio Hipólito 1940",
      createdAt: "09/06/2023",
    },
    {
      id: "report8",
      status: "Pendente",
      city: "Bagé",
      formattedAddress: "Getúlio vargas - Rua Otávio Hipólito 1940",
      createdAt: "09/06/2023",
    },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12} md={12} lg={12}>
          <ComplaintTable rows={rows} />
        </Grid>
      </Container>
    </>
  );
}
