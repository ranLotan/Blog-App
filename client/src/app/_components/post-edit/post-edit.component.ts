import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPost } from 'src/app/_interfaces/user-info';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {
  private editingPost = false;
  public blogForm: FormGroup;
  private postId: string = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private toastr: ToastrService,
    private router: Router) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    
    this.route.paramMap.subscribe(params => {
     this.postId = params.get('id') ?? "";
     if (this.postId) {
        this.editingPost = true;
        this.loadPost();
      }
     });
  }

  private loadPost() {
    const currentPost = this.postService.currentPostSoure.getValue();
    this.blogForm.get('title')?.setValue(currentPost?.title);
    this.blogForm.get('content')?.setValue(currentPost?.content);
  }

  
  public onSubmit(){
    if (this.blogForm.invalid) {
      return; 
    }
    
    const blogPost: IPost = this.blogForm.value;
  
    if (this.editingPost){
      blogPost.id = this.postId;
      this.editPost(blogPost);
    }
    else {
      blogPost.authorId = this.postService.getCurrentUserId();
      if (blogPost.authorId === "-1"){
        return;
      }
      this.addPost(blogPost);
    }
  }

  private editPost(blogPost: IPost){
    this.postService.editPost(blogPost).subscribe({
      next: _ => {
        this.toastr.success(`Post edited Succcessfuly`);
        this.router.navigate(['/posts-list']);
      }, 
      error: _ =>  this.toastr.error(`Create New Post Request Failed`), //todo: add failure information
    });
  }

  
  private addPost(blogPost: IPost){
    this.postService.addPost(blogPost).subscribe({
      next: post => {
        this.toastr.success(`Post Added Succcessfuly`);
        this.postService.setCurrentPost(post);
        this.router.navigate(['/post', post.id]);
      },
      error: _ =>  this.toastr.error(`Create New Post Request Failed`),
    });
  }
}
