import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {

  private readonly keyclaok: Keycloak;
  constructor() {
    this.keyclaok = new Keycloak(
      {
        url: 'http://localhost:8081',
        realm: 'conseil-etat',
        clientId: 'service-dossiers-front'
      }
    );
  }

  async init(): Promise<boolean> {

    return this.keyclaok.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    });

  }
  async login(): Promise<void> {
    await this.keyclaok.login({
      redirectUri: window.location.origin
    });

  }

  async logout(): Promise<void> {

    await this.keyclaok.logout({
      redirectUri: window.location.origin
    });
  }


  isAuthenticated(): boolean {
    return !!this.keyclaok.authenticated;
  }

  /**
  * Rafraîchit le token si nécessaire et retourne le JWT courant.
  */
  async getToken(): Promise<string | undefined> {
    if (!this.keyclaok.authenticated) {
      return undefined;
    }

    try {
      await this.keyclaok.updateToken(30);

      return this.keyclaok.token;
    } catch (error) {
      console.error('Impossible de rafraichir le token keycloak', error);
      return undefined;
    }

  }

  getUsername(): string | undefined {
    return this.keyclaok.tokenParsed?.['preferred_username'];
  }

}
