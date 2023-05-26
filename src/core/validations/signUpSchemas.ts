import * as Yup from "yup";
import { isValidCPF } from "../shared/isValidCPF";

export const personalSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nome é requerido')
    .max(255, 'Nome deve conter no máximo 255 caracteres'),
  cpf: Yup.string()
    .required('CPF é requerido')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido')
    .test('valid-cpf', 'CPF inválido', (value: string) => {
      if (!value) return false;
      return isValidCPF(value);
    })
});

export const credentialsSchema = Yup.object().shape({
  email: Yup.string()
    .max(255, 'E-mail deve conter no máximo 255 caracteres')
    .email('E-mail inválido')
    .required('E-mail é requerido'),

  password: Yup.string()
    .required('Senha é requerida'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Senhas não coincidem')
    .required('Confirmação de senha é requerida'),
});