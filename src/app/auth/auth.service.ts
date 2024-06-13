import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { AuthData } from '../interfaces/auth-data';
import { Router } from '@angular/router';
import { SignUp } from '../interfaces/sign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = "http://localhost:8080/auth/"
  jwtHelper = new JwtHelperService
  private authSub = new BehaviorSubject<AuthData | null>(null)
  user$ = this.authSub.asObservable();
  timeout: any;

  constructor(private http: HttpClient, private router: Router) { }

  // signup(data: SignUp) {
  //   return this.http.post(`${this.apiURL}register`, data, {responseType:'text'})
  // }

  signup(data: SignUp) {
    return this.http.post(`${this.apiURL}register`, data, { responseType: 'text' }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // login(data: { email: string, password: string }) {
  //   console.log("prova service")
  //   return this.http.post<AuthData>(`${this.apiURL}login`, data).pipe(
  //     tap((data) => {
  //       // alert('Login effettuato.')
  //       console.log('auth data: ', data)
  //     }),
  //     tap((data) => {
  //       this.authSub.next(data);
  //       localStorage.setItem('user', JSON.stringify(data));
  //       this.autologout(data)
  //     }), catchError(this.errors)
  //   )
  // }
  // private errors(err: any) {
  //   console.error(err.error)
  //   switch (err.error) {
  //     case 'Email already exists':
  //       return throwError('utente già presente');
  //       break;
  //     case 'Incorrect password':
  //       return throwError('password errata');
  //       break;
  //     case 'Cannot find user':
  //       return throwError('utente inesistente')
  //     default:
  //       return throwError('errore generico')
  //   }
  // }


  login(data: { email: string, password: string }) {
    console.log("prova service");
    return this.http.post<AuthData>(`${this.apiURL}login`, data).pipe(
      tap((data) => {
        console.log('auth data: ', data);
        this.authSub.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.autologout(data);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 401) {
        errorMessage = 'Wrong password!';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(() => errorMessage);
  }

  logout() {
    this.authSub.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

  restore() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return
    } else {
      const user: AuthData = JSON.parse(userJson)
      this.authSub.next(user);
      this.autologout(user)
    }
  }

  autologout(user: AuthData) {
    const dateExpiration = this.jwtHelper.getTokenExpirationDate(user.token) as Date;
    const millisecondsExp = dateExpiration.getTime() - new Date().getTime();
    this.timeout = setTimeout(() => {
      this.logout();
    }, millisecondsExp);
  }


}
