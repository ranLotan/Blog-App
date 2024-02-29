import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './_components/register/register.component';
import { BlogsComponent } from './_components/blogs/blogs.component';
import { PostsListComponent } from './_components/posts-list/posts-list.component';
import { PostComponent } from './_components/post/post.component';
import { PostEditComponent } from './_components/post-edit/post-edit.component';
import { authGuard } from './_guards/auth.guard';


const routes: Routes = [
  {path: '', component: BlogsComponent},
  {path: 'register', component: RegisterComponent},
  {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children:[
      {path: 'posts-list', component: PostsListComponent},
      {path: 'post/:id', component: PostComponent},
      {path: 'add-post', component: PostEditComponent},
      {path: 'edit-post/:id', component: PostEditComponent},
    ]
  },
  {path: '**', component: BlogsComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
