import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'ecommerce_realm',
  clientId: 'ecommerce-frontend',
});

export function initializeKeycloak(): Promise<boolean> {
  return keycloak.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    //onLoad: 'login-required',
    //checkLoginIframe: false, 
    //pkceMethod: 'S256',
    //flow: 'standard',
  });
}

export function getKeycloakProviders() {
  return [
    { provide: Keycloak, useValue: keycloak }
  ];
}
