import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected title = 'ecommerce-frontend';

  isLoggedIn = false;
  isAdmin = false;
  userName: string = '';
  address: string = '';
  phoneNumber: string = '';

  constructor(
    private keycloakService: KeycloakService, 
    private userService: UserService,
    private router: Router) {}

  
  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    if (this.isLoggedIn) {
      const kc = this.keycloakService.getKeycloakInstance();  
      const tokenParsed = kc.tokenParsed as any;
      this.userName = tokenParsed?.preferred_username || '';
      this.phoneNumber = tokenParsed?.phone_number ?? '';
      this.address = tokenParsed?.address ?? '';
      const roles = await this.keycloakService.getUserRoles();
      this.isAdmin = roles.includes('Admin');
  }
}

/*
  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    if (this.isLoggedIn) {
      const userDetails = await this.keycloakService.loadUserProfile();
      this.userName = userDetails.firstName ?? userDetails.username ?? '';
      const roles = await this.keycloakService.getUserRoles();
      this.isAdmin = roles.includes('Admin');
    }
  }
*/

  login() {
    this.keycloakService.login({ redirectUri: window.location.href });
  }

  async goToCart() {
    const loggedIn = await this.keycloakService.isLoggedIn();
    if (!loggedIn) {
      await this.keycloakService.login({ redirectUri: window.location.href });
      return; // cambiare in return a cart
    }

    this.router.navigate(['/cart']);
  }

  logout() {
  const kc = this.keycloakService.getKeycloakInstance();
  window.location.href = kc.createLogoutUrl({ redirectUri: window.location.origin })
    .replace(/([?&])id_token_hint=[^&]+(&|$)/, '$1');
}

}