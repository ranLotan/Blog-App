import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './_components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './_components/register/register.component';
import { BlogsComponent } from './_components/blogs/blogs.component';
import { PostsListComponent } from './_components/posts-list/posts-list.component';
import { PostComponent } from './_components/post/post.component';
import { PostEditComponent } from './_components/post-edit/post-edit.component';
import { CommentsComponent } from './_components/comment/comments/comments.component';
import { CommentComponent } from './_components/comment/comment/comment.component';
import { CommentFormComponent } from './_components/comment/comment-form/comment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterComponent,
    BlogsComponent,
    PostsListComponent,
    PostComponent,
    PostEditComponent,
    CommentsComponent,
    CommentComponent,
    CommentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
