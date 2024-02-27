import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/_interfaces/user-info';
import { AccountService } from 'src/app/_services/account.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public post: IPost | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService, public accountService: AccountService ){}

  ngOnInit(): void {
    this.postService.currentPost$.subscribe(post => {
      console.log(post)
      this.post = post;
    })
    // this.route.paramMap.subscribe(params => {
    //   const postId = params.get('id'); // Assuming 'id' is the URL parameter name
    //   if (postId) {
    //     // Fetch the post details from your service using postId
    //     // ... (replace with your actual logic to fetch the post based on postId)
    //     this.post = /* retrieved post data */;
    //   }
    // })    
  }

  public editPost(){
    this.router.navigate(['/post/edit']);
  }
}
