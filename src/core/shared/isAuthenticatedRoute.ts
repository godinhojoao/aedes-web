export function isAuthenticatedRoute(routeName: string): boolean {
  const authenticatedRoutes = [
    '/denuncias',
    '/mapa-dengue',
    '/informacoes',
  ];
  return authenticatedRoutes.includes(routeName);
}