import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { WalletsComponent } from './components/wallets/wallets.component';
import { StatsComponent } from './components/stats/stats.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { SupportComponent } from './components/support/support.component';
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { UserDetailsComponent } from './components/account-settings/user-details/user-details.component';
import { EditProfileComponent } from './components/account-settings/edit-profile/edit-profile.component';


const routes: Route[] = [

  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'wallets',
    component: WalletsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    children: [
      {
        path: 'details',
        component: UserDetailsComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'support',
    component: SupportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-ticket',
    component: NewTicketComponent,
    canActivate: [AuthGuard]
  }


]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    SupportComponent,
    NewTicketComponent,
    AccountSettingsComponent,
    UserDetailsComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      timeOut: 2300,
      positionClass: 'toast-conferma',
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
