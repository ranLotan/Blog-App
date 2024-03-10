import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/_interfaces/user-info';
import { PostService } from 'src/app/_services/post.service';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit{
  posts: IPost[] = [];

  constructor(private postService: PostService, private router: Router){}
  
  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: posts => {
        this.posts = posts;
      }
    })
  }

  public openPost(post: IPost){
    this.postService.setCurrentPost(post);
    this.router.navigate(['/post', post.id]);
  }
}
