import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewuserComponent } from './newuser/newuser.component';
import { LoginComponent } from './login/login.component';
import { FindsPageComponent } from './finds-page/finds-page.component';
import { NewPostComponent } from './new-post/new-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { PostCardComponent } from './post-card/post-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AppendHtmlDirective } from './directives/append-html.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewuserComponent,
    LoginComponent,
    FindsPageComponent,
    NewPostComponent,
    UpdatePostComponent,
    PostCardComponent,
    ProfileComponent,
    AppendHtmlDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
