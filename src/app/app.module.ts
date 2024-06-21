import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

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
import { StatsComponent } from './components/stats/stats.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { SupportComponent } from './components/support/support.component';
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { UserDetailsComponent } from './components/account-settings/user-details/user-details.component';
import { EditProfileComponent } from './components/account-settings/edit-profile/edit-profile.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { NewIncomeComponent } from './components/new-income/new-income.component';
import { NewExpenseComponent } from './components/new-expense/new-expense.component';
import { ExpensesComponent } from './components/stats/expenses/expenses.component';
import { IncomesComponent } from './components/stats/incomes/incomes.component';
import { ExpensesVsIncomesComponent } from './components/stats/expenses-vs-incomes/expenses-vs-incomes.component';
import { SavingGoalsComponent } from './components/saving-goals/saving-goals.component';
import { NewGoalComponent } from './components/saving-goals/new-goal/new-goal.component';
import { DecimalTwoDigitsPipe } from './pipe/decimal-two-digits.pipe';



const routes: Route[] = [

  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'new-expense',
        component: NewExpenseComponent
      },
      {
        path: 'new-income',
        component: NewIncomeComponent
      }
    ],
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
    path: 'stats',
    component: StatsComponent,
    children: [
      {
        path: 'expenses',
        component: ExpensesComponent
      },
      {
        path: 'incomes',
        component: IncomesComponent
      },
      {
        path: 'expenses-vs-incomes',
        component: ExpensesVsIncomesComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-settings',
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
  },
  {
    path: 'new-account',
    component: NewAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'saving-goals',
    component: SavingGoalsComponent,
    children: [
      {
        path: 'new-goal',
        component: NewGoalComponent
      }
    ],
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
    EditProfileComponent,
    NewAccountComponent,
    NewIncomeComponent,
    NewExpenseComponent,
    StatsComponent,
    ExpensesComponent,
    IncomesComponent,
    ExpensesVsIncomesComponent,
    SavingGoalsComponent,
    NewGoalComponent,
    DecimalTwoDigitsPipe
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
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
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
