import { ValidationError } from 'yup';
import { personalSchema, credentialsSchema } from './../../../src/core/validations/signUpSchemas';


describe('SignUp validation schemas', () => {
  describe('personalSchema', () => {
    it('Given valid payload should return data object', async () => {
      const personalData = {
        name: 'John Doe',
        cpf: '406.936.640-70',
      };

      await expect(personalSchema.validate(personalData)).resolves.toBe(
        personalData
      );
    });

    it('Given invalid cpf should return error', async () => {
      const personalData = {
        name: 'John Doe',
        cpf: '406.936.640-87',
      };

      const noValidCall = (): any => personalSchema.validateSync(personalData);
      expect(noValidCall).toThrow(ValidationError);
      expect(noValidCall).toThrow('CPF inválido');
    });

    it('Given invalid payload should return error', async () => {
      const personalData = {
        name: 'John DoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosdDoeasdkodaskodkasokodsakoadskoadskosd',
        cpf: '406.936.640-70',
      };

      const noValidCall = (): any => personalSchema.validateSync(personalData);
      expect(noValidCall).toThrow(ValidationError);
      expect(noValidCall).toThrow('Nome deve conter no máximo 255 caracteres');
    });
  });

  describe('credentialsSchema', () => {
    it('Given valid credentials should return data object', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };
      await expect(credentialsSchema.validate(credentials)).resolves.toBe(
        credentials
      );
    });

    it('Given invalid confirmPassword should return error', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password456',
      };

      const noValidCall = (): any => credentialsSchema.validateSync(credentials);
      expect(noValidCall).toThrow(ValidationError);
      expect(noValidCall).toThrow('Senhas não coincidem');
    });

    it('Given invalid email should return error', async () => {
      const credentials = {
        email: 'johnadsa',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const noValidCall = (): any => credentialsSchema.validateSync(credentials);
      expect(noValidCall).toThrow(ValidationError);
      expect(noValidCall).toThrow('E-mail inválido');
    });
  });
});
