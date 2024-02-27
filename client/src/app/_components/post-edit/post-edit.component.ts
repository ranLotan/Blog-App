import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
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

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private postService: PostService) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    
    this.route.paramMap.subscribe(params => {
     this.postId = params.get('id') ?? ""; // Assuming 'id' is the URL parameter name
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
      return; // Prevent submission if invalid
    }
    
    const blogPost: IPost = this.blogForm.value;
  
    if (this.editingPost){
      blogPost.id = this.postId;
      this.postService.editPost(blogPost);
    }
    else {
      blogPost.authorId = this.postService.getCurrentUserId();
      if (blogPost.authorId === "-1"){
        return;
      }
      this.postService.addPost(blogPost);
    }
  }
}
