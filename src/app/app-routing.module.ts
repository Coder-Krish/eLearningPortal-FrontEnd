import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { PostsComponent } from './posts/posts.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { NotesComponent } from './notes/notes.component';
import { ProgramsAndSubjectsComponent } from './programs-and-subjects/programs-and-subjects.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
{ path: 'home', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'user', component: BoardUserComponent,},
{ path: 'mod', component: BoardModeratorComponent },
{ path: 'admin', component: BoardAdminComponent },
{ path: 'users/:id', component: RegisteredUsersComponent },
{ path: 'users1/:id', component: RegisteredUsersComponent },
{ path: 'users2/:id', component: RegisteredUsersComponent },
{ path: 'users3/:id', component: RegisteredUsersComponent },
{ path: 'posts/:id', component: PostsComponent},
{ path: 'posts1/:id', component: PostsComponent},
{ path: 'posts2/:id', component: PostsComponent},
{ path: 'posts3/:id', component: PostsComponent},
{ path: 'discussions/:id', component:DiscussionsComponent},
{ path: 'discussions1/:id', component:DiscussionsComponent},
{ path: 'discussions2/:id', component:DiscussionsComponent},
{ path: 'discussions3/:id', component:DiscussionsComponent},
{ path: 'notes', component:NotesComponent},
{ path: 'change-password', component:ChangePasswordComponent},
{ path: 'forgot-password', component:ForgotPasswordComponent},
{ path: 'programs-and-subjects/:id', component:ProgramsAndSubjectsComponent},
{ path: '', redirectTo: 'login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
