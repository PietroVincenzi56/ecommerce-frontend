import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { App } from './app/app';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app.routes';       

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'ecommerce_realm',
        clientId: 'ecommerce-frontend',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(KeycloakAngularModule, HttpClientModule),
    provideRouter(routes), 
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
});
