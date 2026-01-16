import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService) { }

    promise: Promise<string>;

  getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }

  isUser(): boolean {
      return this.keycloakService.getUserRoles().includes('USER');
  }

  isAdmin(): boolean {
      return this.keycloakService.getUserRoles().includes('ADMIN');
  }

}
