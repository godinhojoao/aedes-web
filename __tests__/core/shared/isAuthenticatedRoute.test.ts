import { isAuthenticatedRoute } from "../../../src/core/shared/isAuthenticatedRoute";

describe('isAuthenticatedRoute', () => {
  it('returns true for authenticated routes', () => {
    expect(isAuthenticatedRoute('/denuncias')).toBe(true);
    expect(isAuthenticatedRoute('/mapa-dengue')).toBe(true);
    expect(isAuthenticatedRoute('/informacoes')).toBe(true);
  });

  it('returns false for non-authenticated routes', () => {
    expect(isAuthenticatedRoute('/entrar')).toBe(false);
    expect(isAuthenticatedRoute('/cadastro')).toBe(false);
    expect(isAuthenticatedRoute('/dashboard')).toBe(false);
  });
});
