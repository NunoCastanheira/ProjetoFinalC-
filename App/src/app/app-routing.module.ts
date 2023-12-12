import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { authGuardGuard } from './auth-guard.guard';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'users', component: UsersComponent , canActivate: [authGuardGuard]},
  { path: 'products', component: ProductsComponent, canActivate: [authGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
