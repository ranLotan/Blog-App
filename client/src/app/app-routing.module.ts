import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './_components/register/register.component';
import { BlogsComponent } from './_components/blogs/blogs.component';
import { PostsListComponent } from './_components/posts-list/posts-list.component';
import { PostComponent } from './_components/post/post.component';
import { PostEditComponent } from './_components/post-edit/post-edit.component';


const routes: Routes = [
  {path: 'blogs', component: BlogsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'posts-list', component: PostsListComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'add-post', component: PostEditComponent},
  {path: 'edit-post/:id', component: PostEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
