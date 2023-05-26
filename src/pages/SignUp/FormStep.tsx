import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { FormStepProps } from "../../core/interfaces/props/FormStepProps";

function personalStep(): JSX.Element {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          autoComplete="given-name"
          name="name"
          required
          fullWidth
          id="name"
          label="Nome"
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="cpf"
          label="CPF"
          name="cpf"
          autoComplete="cpf"
        />
      </Grid>
    </>
  );
}

function credentialsStep(): JSX.Element {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="new-password"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="confirmPassword"
          label="Confirmar senha"
          type="confirmPassword"
          id="confirmPassword"
          autoComplete="password"
        />
      </Grid>
    </>
  );
}

export function FormStep(props: FormStepProps): JSX.Element {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      name: data.get("name"),
      cpf: data.get("cpf"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };
    // eslint-disable-next-line no-console
    console.log("payload", payload);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop={6}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
      </Box>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {props.isPersonalStep ? personalStep() : credentialsStep()}
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item mt={3}>
            <Link href="/" variant="body2">
              Já possui uma conta? Entrar
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
