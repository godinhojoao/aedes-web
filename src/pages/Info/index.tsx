import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { GitHub, LinkedIn } from "@mui/icons-material";
import IfsulPng from "./../../assets/ifsul.png";

const employees = [
  {
    id: 1,
    name: "Diego Fontoura",
    role: "Professor orientador",
    image: "",
    linkedin: "",
    github: "",
  },
  {
    id: 2,
    name: "Diego Porcellis",
    role: "Professor orientador",
    image: "",
    linkedin: "",
    github: "",
  },
  {
    id: 3,
    name: "João Godinho",
    role: "Desenvolvedor",
    image: "",
    linkedin: "https://www.linkedin.com/in/joaogodinhoo",
    github: "https://github.com/godinhojoao",
  },
];

export function InfoPage(): JSX.Element {
  function smoothScroll(target: string): void {
    document.querySelector(target)?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          width: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Sobre o sistema
          </Typography>
          <Typography
            variant="h5"
            align="justify"
            color="text.secondary"
            paragraph
          >
            Este projeto consiste na implementação de um sistema de informação
            que permitirá aos cidadãos locais denunciar focos do mosquito Aedes
            aegypti, enquanto os órgãos municipais responsáveis pelo controle da
            dengue receberão notificações desses focos. Com o objetivo de
            facilitar a identificação dos locais de infestação, reduzir custos e
            melhorar a saúde pública, essa iniciativa visa envolver a comunidade
            no combate à dengue por meio de ferramentas tecnológicas,
            colaborando com as ações governamentais e o controle da doença.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              onClick={(): void => smoothScroll("#employees")}
              variant="contained"
            >
              Colaboradores
            </Button>
            <Button
              variant="outlined"
              onClick={(): void => smoothScroll("#sponsors")}
            >
              Apoiadores
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container id="employees" sx={{ py: 8 }} maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Colaboradores
        </Typography>
        <Grid container spacing={4}>
          {employees.map((employee) => (
            <Grid item key={employee.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{ pb: 0 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {employee.name}
                  </Typography>
                  <Typography>{employee.role}</Typography>
                </CardContent>
                <CardActions>
                  {employee.linkedin && (
                    <IconButton
                      href={employee.linkedin}
                      target="_blank"
                      aria-label="LinkedIn"
                      color="primary"
                    >
                      <LinkedIn />
                    </IconButton>
                  )}

                  {employee.github && (
                    <IconButton
                      href={employee.github}
                      target="_blank"
                      aria-label="GitHub"
                      color="primary"
                    >
                      <GitHub />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          mb: 4,
          width: "100%",
        }}
        id="sponsors"
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Apoiadores
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Instituto Federal Sul-rio-grandense
          </Typography>
          <Typography
            variant="h6"
            align="justify"
            color="text.secondary"
            paragraph
          >
            Este projeto de sistema de informação, que permite aos cidadãos
            locais denunciar focos do mosquito Aedes aegypti e notificar os
            órgãos municipais responsáveis pelo controle da dengue, é apoiado
            pelo Instituto Federal Sul-rio-grandense como um projeto educacional
            de bolsa estudantil de iniciação científica. O objetivo principal é
            auxiliar os municípios na identificação dos focos de mosquitos,
            reduzindo custos e promovendo uma melhor saúde pública. Com o
            envolvimento da comunidade e o uso de ferramentas tecnológicas,
            busca-se colaborar no combate ao Aedes aegypti e otimizar as ações
            governamentais relacionadas ao controle da doença.
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            <img
              style={{ maxWidth: "100px" }}
              src={IfsulPng}
              alt="IFSUL logo"
            />
          </Typography>
        </Container>
      </Box>
    </>
  );
}
