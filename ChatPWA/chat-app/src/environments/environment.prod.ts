export const environment = {
  production: true,
  baseUrl: 'https://codegensignalr.azurewebsites.net/api/',
  baseHubs: 'https://codegensignalr.azurewebsites.net:44341',
  controllers: {
    Auth : 'Auth',
    Groups: 'Groups',
    JoinGroups : 'JoinGroups',
    UserStats: 'UserStats'
  }
};
