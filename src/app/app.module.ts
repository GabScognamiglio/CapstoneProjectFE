import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';


const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule, 
    RouterModule.forRoot(routes),
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
