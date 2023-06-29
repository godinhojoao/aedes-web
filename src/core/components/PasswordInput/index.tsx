import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export function PasswordInput({ errors, register }: any): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <TextField
      required
      fullWidth
      label="Senha"
      type={showPassword ? "text" : "password"}
      id="password"
      {...register("password")}
      error={!!errors.password}
      helperText={errors.password?.message as any}
      autoComplete="off"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={(): void => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
