import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

export const adminGuard: CanActivateFn = async () => {
  const keycloak = inject(KeycloakService);
  const isLoggedIn = await keycloak.isLoggedIn();
  if (!isLoggedIn) return false;

  const roles = await keycloak.getUserRoles();
  return roles.includes('Admin');
};


