export function isAuthenticatedRoute(routeName: string): boolean {
  const nonAuthenticatedRoutes = [
    '/entrar',
    '/cadastro',
  ];
  return !nonAuthenticatedRoutes.includes(routeName);
}