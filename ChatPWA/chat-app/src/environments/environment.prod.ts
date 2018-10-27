export const environment = {
  production: true,
  baseUrl: 'https://dnsignalr.azurewebsites.net/api/',
  baseHubs: 'https://dnsignalr.azurewebsites.net',
  controllers: {
    Auth : 'Auth',
    Groups: 'Groups',
    JoinGroups : 'JoinGroups',
    UserStats: 'UserStats'
  }
};

/*
export const environment = {
  production: false,
  baseUrl: 'https://localhost:44341/api/',
  baseHubs: 'https://localhost:44341',
  controllers: {
    Auth : 'Auth',
    Groups: 'Groups',
    JoinGroups : 'JoinGroups',
    UserStats: 'UserStats'
  }
};
*/
