/* eslint-disable no-console */
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Copyright } from "../../core/components/Copyright";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInSchema } from "../../core/validations/signInSchema";
import { PasswordInput } from "../../core/components/PasswordInput";
import { useState } from "react";
import { CustomModal } from "../../core/components/Modal";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GraphqlError } from "../../core/interfaces/graphql/GraphqlError";
import {
  SignInInput,
  SignInResponse,
} from "../../core/interfaces/graphql/SignInMutation";
import { SIGN_IN } from "../../core/graphql/mutations";
import { LocalStorageManager } from "../../core/shared/LocalStorageManager";

export function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentErrors, setCurrentErrors] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    trigger,
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const [signIn] = useMutation<SignInResponse, SignInInput>(SIGN_IN, {
    onError: () => setOpenModal(true),
    onCompleted: (data: SignInResponse) => {
      const account = data.signIn.account;
      const token = data.signIn.token;
      LocalStorageManager.setItem("aedes-account", account);
      LocalStorageManager.setItem("aedes-token", token);
      navigate("/denuncias");
    },
  });

  const onSubmit = async (input: any): Promise<void> => {
    trigger().then(async () => {
      const result = await signIn({ variables: { input: input } });
      // @ts-ignore
      if (result && result.errors && result.errors.graphQLErrors) {
        // @ts-ignore
        const errorMessages = result.errors.graphQLErrors.map(
          (error: GraphqlError) => error.detailedMessage
        );
        setCurrentErrors(errorMessages);
      }
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t): any =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entre com sua conta
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                margin="normal"
                id="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message as any}
                label="E-mail"
                autoComplete="off"
              />

              <PasswordInput errors={errors} register={register} />
            </Grid>

            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar senha"
              /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid && isSubmitted}
              onClick={handleSubmit(onSubmit)}
            >
              Entrar
            </Button>
            <Grid container mb={4}>
              {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid> */}
              <Grid item>
                <Link href="/#/cadastro" variant="body2" color="primary">
                  {"Não tem uma conta? Criar nova conta"}
                </Link>
              </Grid>
            </Grid>
            <Copyright />

            <CustomModal
              open={openModal}
              currentErrors={currentErrors}
              onClose={(): void => setOpenModal(false)}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
