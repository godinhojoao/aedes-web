/* eslint-disable no-console */
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Copyright } from "../../core/components/Copyright";
import { signupSchema } from "../../core/validations/signUpSchema";
import { Controller } from "react-hook-form";
import { OnChangeEvent } from "../../core/interfaces/declarations/OnChangeEvent";
import { formatCPF } from "../../core/shared/formatCPF";

const defaultTheme = createTheme();

export function SignUpPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    control,
    trigger,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = (data: any): void => {
    console.log("data", data);
    trigger().then(() => {
      console.log("ta valido");
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginTop={6}
          >
            <Avatar sx={{ m: 0, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Cadastro
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message as any}
                  label="Nome"
                  autoComplete="off"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="cpf"
                  defaultValue=""
                  render={({ field }): JSX.Element => (
                    <TextField
                      {...field}
                      label="CPF"
                      value={formatCPF(field.value)}
                      onChange={(e: OnChangeEvent): void =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                      error={!!errors.cpf}
                      helperText={errors.cpf?.message as any}
                      fullWidth
                      required
                      autoComplete="off"
                    />
                  )}
                  rules={{
                    required: "CPF é obrigatório",
                    pattern: {
                      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      message: "Formato de CPF inválido",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message as any}
                  label="E-mail"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Senha"
                  type="password"
                  id="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message as any}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirmar senha"
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message as any}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item mt={2} mb={2}>
                <Link href="/" variant="body2">
                  Já possui uma conta? Entrar
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={!isValid && isSubmitted}
            onClick={handleSubmit(onSubmit)}
          >
            Cadastrar
          </Button>
        </Box>

        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
