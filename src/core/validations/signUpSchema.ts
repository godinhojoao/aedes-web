import * as Yup from "yup";
import { isValidCPF } from "../shared/isValidCPF";

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nome é requerido")
    .max(255, "Nome deve conter no máximo 255 caracteres"),
  cpf: Yup.string()
    .required("CPF é requerido")
    .matches(/^\d{11}$/, "Formato de CPF inválido")
    .test("valid-cpf", "CPF inválido", (value: string) => {
      if (!value) return false;
      return isValidCPF(value);
    }),
  email: Yup.string()
    .max(255, "E-mail deve conter no máximo 255 caracteres")
    .email("E-mail inválido")
    .required("E-mail é requerido"),
  password: Yup.string()
    .required("Senha é requerida")
    .min(5, "A senha deve ter no mínimo 5 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      "A senha deve conter no mínimo: 1 número, 1 caractere especial, 1 letra maiúscula e 1 letra minúscula"
    ),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password")], "Senhas não coincidem")
  //   .required("Confirmação de senha é requerida"),
});
