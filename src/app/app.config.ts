import { ApplicationConfig, provideBrowserGlobalErrorListeners,provideAppInitializer, inject} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { KeycloakService } from './src/app/core/auth/keycloak.service';
import { authInterceptorInterceptor } from './src/app/core/interceptors/auth.interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),
    provideAppInitializer(()=>{
      const keycloakService= inject(KeycloakService);
      return keycloakService.init();
    })
  ]
};
