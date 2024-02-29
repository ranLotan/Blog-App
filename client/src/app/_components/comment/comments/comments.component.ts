import { Component, Input, OnInit } from '@angular/core';
import { IComment, IEditCommentInfo } from 'src/app/_interfaces/user-info';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() currentPostId!: string;
  public currentUserId: string = this.commentsService.getUserId() ?? "";
  public activeComment: string | null = null;

  public comments: IComment[] = [];

  constructor(private commentsService: CommentService) {}

  ngOnInit(): void {
    this.commentsService.getPostComments(this.currentPostId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  public addComment(event:  {text: string;}){
    console.log('addComment', event);
    const comment ={ 
      content: event.text,
      postId: this.currentPostId,
      author: this.commentsService.getUserName(),
      authorId: this.commentsService.getUserId(),
    }
    this.commentsService.createComment(comment).subscribe((createdComment: IComment) => {
      this.comments = [createdComment, ...this.comments];
    });
  }

  public updateComment(event: { text: string; commentId: string }){
    const commentToEdit = {
      id: event.commentId,
      postId: this.currentPostId,
      content: event.text,
    }
    this.commentsService.updateComment(commentToEdit).subscribe((updatedComment) => {
      this.comments = this.comments.map((comment) => {
        if (comment.id === commentToEdit.id) {
          return updatedComment;
        }
        return comment;
      });

      this.activeComment = null;
    });
  }
  public deleteComment(commentId: string){
    this.commentsService.deleteComment(commentId).subscribe((deleteComment) => {
      this.comments = this.comments.filter((comment) => comment.id !== deleteComment.id);

      this.activeComment = null;
    });
  }

  public setActiveComment(activeComment: string | null): void {
    this.activeComment = activeComment;
  }
}
