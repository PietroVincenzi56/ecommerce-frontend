import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


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

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {
      const userDetails = await this.keycloakService.loadUserProfile();
      this.userName = userDetails.firstName ?? userDetails.username ?? '';
      const roles = await this.keycloakService.getUserRoles();
      this.isAdmin = roles.includes('Admin');
    }
  }

  login() {
    this.keycloakService.login({ redirectUri: window.location.href });
  }

}