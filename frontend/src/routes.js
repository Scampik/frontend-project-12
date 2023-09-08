const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  loginPage: () => '/login',
  signupPage: () => '/signup',
  notFoundPage: () => '*',
  chatPage: () => '/',
};

export default routes;
