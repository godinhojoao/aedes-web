import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Copyright } from "../../core/components/Copyright";
import { signupSchema } from "../../core/validations/signUpSchema";
import { Controller } from "react-hook-form";
import { OnChangeEvent } from "../../core/interfaces/declarations/OnChangeEvent";
import { formatCPF } from "../../core/shared/formatCPF";
import {
  CreateAccountInput,
  CreatedAccountResponse,
} from "../../core/interfaces/graphql/CreateAccountMutation";
import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT } from "../../core/graphql/mutations";
import { CustomModal } from "../../core/components/Modal";
import { GraphqlError } from "../../core/interfaces/graphql/GraphqlError";
import { PasswordInput } from "../../core/components/PasswordInput";

export function SignUpPage(): JSX.Element {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentErrors, setCurrentErrors] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    control,
    trigger,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const [createAccount] = useMutation<CreatedAccountResponse, CreateAccountInput>(
    CREATE_ACCOUNT,
    {
      onError: () => setOpenModal(true),
      onCompleted: () => navigate("/entrar"),
    }
  );

  const onSubmit = async (input: any): Promise<void> => {
    trigger().then(async () => {
      const result = await createAccount({ variables: { input: input } });
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
    <Container component="main" maxWidth="xs">
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
              <PasswordInput errors={errors} register={register} />
            </Grid>
            {/* <Grid item xs={12}>
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
            </Grid> */}
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item mt={2} mb={2}>
              <Link href="/" variant="body2" color="secondary">
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
          sx={{ mb: 4 }}
        >
          Cadastrar
        </Button>
      </Box>

      <Copyright />

      <CustomModal
        open={openModal}
        currentErrors={currentErrors}
        onClose={(): void => setOpenModal(false)}
      />
    </Container>
  );
}
