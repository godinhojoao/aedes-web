import { formatCPF } from "../../../src/core/shared/formatCPF";

describe("formatCPF", () => {
  it("should format CPF with 11 digits", () => {
    expect(formatCPF("12345678900")).toBe("123.456.789-00");
  });

  it("should format CPF with less than 11 digits", () => {
    expect(formatCPF("123")).toBe("123");
    expect(formatCPF("123456")).toBe("123.456");
    expect(formatCPF("123456789")).toBe("123.456.789");
  });

  it("should format CPF with more than 11 digits", () => {
    expect(formatCPF("12345678900123")).toBe("123.456.789-00");
  });

  it("should handle empty value", () => {
    expect(formatCPF("")).toBe("");
  });
});
