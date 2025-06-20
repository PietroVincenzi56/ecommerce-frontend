import { importProvidersFrom } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

const keycloak = new KeycloakService();

export function initializeKeycloak() {
  return keycloak.init({
    config: {
      url: 'http://localhost:8081/auth', 
      realm: 'ecommerce_realm',
      clientId: 'ecommerce-frontend',
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    },
    loadUserProfileAtStartUp: true,
  });
}

export function getKeycloakProviders() {
  return [
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: KeycloakService,
      useValue: keycloak,
    },
  ];
}