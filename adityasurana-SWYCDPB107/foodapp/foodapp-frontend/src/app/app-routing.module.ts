import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard'

const appRoutes: Routes = [
  { path: '', component: AuthComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'food', component: FoodComponent, canActivate:[AuthGuard]},
  { path: 'food-detail', component: FoodDetailComponent, canActivate:[AuthGuard]},
  { path: 'manage-user', component: ManageUserComponent, canActivate:[AuthGuard]},
  { path: 'users', component: UsersComponent, canActivate:[AuthGuard]},
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
