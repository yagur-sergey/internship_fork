import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'auth-realm',
  clientId: 'client-server'
};

export const environment = {
  production: false,
  // apis: { resourceserver: 'http://localhost:8090/'},
  keycloakConfig
};