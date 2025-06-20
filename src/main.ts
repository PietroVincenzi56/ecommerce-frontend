import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { initializeKeycloak, getKeycloakProviders } from './app/keycloak-init';


initializeKeycloak()
  .then(() => {
    bootstrapApplication(App, {
      ...appConfig,
      providers: [
        ...getKeycloakProviders(),
        ...(appConfig.providers || []),
      ]
    });
  })
  .catch((err) => console.error('Keycloak init failed', err));