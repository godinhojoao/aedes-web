import { ValidationError } from "yup";
import { signupSchema } from "./../../../src/core/validations/signUpSchema";

describe("SignUp validation schemas", () => {
  describe("signupSchema", () => {
    it("Given valid payload should return data object", async () => {
      const personalData = {
        name: "John Doe",
        cpf: "40693664070",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      await expect(signupSchema.validate(personalData)).resolves.toBe(
        personalData
      );
    });

    it("Given invalid cpf should return error", async () => {
      const personalData = {
        name: "John Doe",
        cpf: "40693664072",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      };
      const noValidCall = (): any => signupSchema.validateSync(personalData);
      expect(noValidCall).toThrow(ValidationError);
      expect(noValidCall).toThrow("CPF inválido");
    });

    it("Given invalid name should return error", async () => {
      const personalData = {
        name: "John DoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosd",
        cpf: "40693664070",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      };
      const noValidCall = (): any => signupSchema.validateSync(personalData);
      expect(noValidCall).toThrow(ValidationError);
      expect(noValidCall).toThrow("Nome deve conter no máximo 255 caracteres");
    });

    it("Given invalid confirmPassword should return error", async () => {
      const personalData = {
        name: "John",
        cpf: "40693664070",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password1",
      };
      const noValidCall = (): any => signupSchema.validateSync(personalData);
      expect(noValidCall).toThrow(ValidationError);
      expect(noValidCall).toThrow("Senhas não coincidem");
    });

    it("Given invalid email should return error", async () => {
      const personalData = {
        name: "John",
        cpf: "40693664070",
        email: "johnasdsa",
        password: "password123",
        confirmPassword: "password123",
      };
      const noValidCall = (): any => signupSchema.validateSync(personalData);
      expect(noValidCall).toThrow(ValidationError);
      expect(noValidCall).toThrow("E-mail inválido");
    });
  });
});
