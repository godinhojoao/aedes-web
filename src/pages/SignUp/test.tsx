/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const validationSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  cpf: yup
    .string()
    .matches(/^\d{11}$/, "Formato de CPF inválido")
    .required("CPF é obrigatório"),
});

export function YourFormComponent() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            render={({ field }) => (
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="name"
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message as any}
                label="Nome"
                autoFocus
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Title"
                error={!!formState.errors?.title}
                helperText={errors.cpf?.message as any}
                id="cpf"
                autoComplete="cpf"
              />
            )}
            name="cpf"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
