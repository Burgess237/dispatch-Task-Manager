import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
      canActivate: [AuthGuard] },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule) },
  {
    path: 'completed-tasks',
    loadChildren: () => import('./completed-tasks/completed-tasks.module').then( m => m.CompletedTasksPageModule),
      canActivate: [AuthGuard] },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule),
      canActivate: [AuthGuard] },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
