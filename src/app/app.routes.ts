import { Routes } from '@angular/router';
import { AuthShell } from './components/auth/auth-shell/auth-shell';
import { AuthDashboard } from './components/user/auth-dashboard/auth-dashboard';
import { authGuard } from './components/auth/auth.guard';
import { Sidenav } from './shared/components/sidenav/sidenav';
import { SubscriptionsPricing } from './components/subscriptions/subscriptions-pricing/subscriptions-pricing';
import { EmailPending } from './shared/components/results/email-pending/email-pending';
import { SelectAddon } from './components/subscriptions/select-addon/select-addon';


export const routes: Routes = [
  {
    path: 'auth',
    component: AuthShell,
    children: [
      { path: 'dashboard', component: AuthDashboard, canActivate: [authGuard] },
    ],
  },
   { path: 'auth/verify-email', component: EmailPending },
  { path: 'subscriptions', component: SubscriptionsPricing },
  {path:'auth/select-addons' , component: SelectAddon},
  { path: 'dashboard', component: AuthDashboard},
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'nav', component: Sidenav },
];

