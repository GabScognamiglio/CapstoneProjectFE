import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          const newReq = request.clone({
            headers: request.headers.append('Authorization',"Bearer " + user.token)
          })
          return next.handle(newReq);
        }
        else {
          return next.handle(request)
        }
      })
    )
}
}
