import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // eslint-disable-next-line max-len
  { path: 'home',            loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),                                  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'login',           loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  { path: 'register',        loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule) },
    // eslint-disable-next-line max-len
  { path: 'completed-tasks', loadChildren: () => import('./completed-tasks/completed-tasks.module').then( m => m.CompletedTasksPageModule), canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
