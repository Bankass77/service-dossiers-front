import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { from, switchMap } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const keyclaokSerice = inject(KeycloakService);

  return from(keyclaokSerice.getToken()).pipe(
    switchMap(token => {
      if (!token) {
        return next(req);
      }

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    })
  );

};
