import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './auth/auth.guard'
import { AppComponent } from './app.component';

import { FoodComponent } from './food/food.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchFoodPipe } from './food/searchFood.pipe';
import { SearchUserPipe } from './users/searchUser.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    FoodDetailComponent,
    ManageUserComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    SearchFoodPipe,
    SearchUserPipe,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
