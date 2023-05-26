import { isValidCPF } from "../../../src/core/shared/isValidCPF";

describe('isValidCPF', () => {
  describe('Valid cases', () => {
    it('should return true for a valid CPF with formatted string', () => {
      expect(isValidCPF('123.456.789-09')).toBe(true);
    });

    it('should return true for a valid CPF with unformatted string', () => {
      expect(isValidCPF('52998224725')).toBe(true);
    });

    it('should return true for a valid CPF with repeating digits', () => {
      expect(isValidCPF('11144477735')).toBe(true);
    });

    it('should return true for a valid CPF with unformatted string 2', () => {
      expect(isValidCPF('12345678909')).toBe(true);
    });
  });

  describe('Invalid cases', () => {
    it('should return false for a invalid CPF with all zeros', () => {
      expect(isValidCPF('00000000000')).toBe(false);
    });

    it('should return false for an invalid CPF with formatted string', () => {
      expect(isValidCPF('123.456.789-10')).toBe(false);
    });

    it('should return false for an invalid CPF with incorrect last digit', () => {
      expect(isValidCPF('52998224724')).toBe(false);
    });

    it('should return false for an invalid CPF with all zeros but incorrect last digit', () => {
      expect(isValidCPF('00000000001')).toBe(false);
    });

    it('should return false for an invalid CPF shorter than 11 characters', () => {
      expect(isValidCPF('12345678')).toBe(false);
    });

    it('should return false for an invalid CPF longer than 11 characters', () => {
      expect(isValidCPF('123456789012')).toBe(false);
    });

    it('should return false for an invalid CPF containing non-numeric characters', () => {
      expect(isValidCPF('ABC12345678')).toBe(false);
    });
  });
});
