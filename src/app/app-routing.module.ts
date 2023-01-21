import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindsPageComponent } from './finds-page/finds-page.component';
import { LoginComponent } from './login/login.component';
import { NewPostComponent } from './new-post/new-post.component';
import { NewuserComponent } from './newuser/newuser.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './services/auth.service';
import { UpdatePostComponent } from './update-post/update-post.component';

const routes: Routes = [
  {
    path: '',
    component: FindsPageComponent
  },
  {
    path: 'finds',
    component: FindsPageComponent
  },
  {
    path:'signin',
    component: LoginComponent,
  },
  {
    path:'new_post',
    component: NewPostComponent,
    canActivate:[AuthService]
  },
  {
    path:'update_post',
    component: UpdatePostComponent,
    canActivate:[AuthService]
  },
  {
    path:'register',
    component: NewuserComponent,
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate:[AuthService]
  },
  {
    path: '**',
    component: FindsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
