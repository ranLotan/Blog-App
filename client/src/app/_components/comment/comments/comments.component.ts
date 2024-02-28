import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/_interfaces/user-info';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() currentPostId!: string;

  comments: IComment[] = [];

  constructor(private commentsService: CommentService) {}

  ngOnInit(): void {
    this.commentsService.getPostComments(this.currentPostId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  public addComment(event:  {text: string;}){
    console.log('addComment', event);
    const comment: IComment ={ 
      content: event.text,
      postId: this.currentPostId,
      author: this.commentsService.getUserName() ?? ""
    }
    this.commentsService.createComment(comment).subscribe((createdComment: IComment) => {
      this.comments = [createdComment, ...this.comments];
    });
  }
}
