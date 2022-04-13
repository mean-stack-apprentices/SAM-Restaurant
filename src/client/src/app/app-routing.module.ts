import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CategoryComponent } from './pages/category/category.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';

const routes: Routes = [
  {path: 'users', component: PageUsersComponent},
  {path:'pizza', component:MenuListComponent},
  {path:'menu', component:MenuListComponent},
{path:'menu/:category', component:MenuListComponent},
  {path:'',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
