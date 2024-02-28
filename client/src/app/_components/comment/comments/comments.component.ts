import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/_interfaces/user-info';
import { CommentService } from 'src/app/_services/comment.service';

const commentsData: IComment[] = [
  {
    id: "1",
    body: "First comment",
    username: "Jack",
    userId: "1",
    parentId: null,
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
  {
    id: "2",
    body: "Second comment",
    username: "John",
    userId: "2",
    parentId: null,
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
  {
    id: "3",
    body: "First comment first child",
    username: "John",
    userId: "2",
    parentId: "1",
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
  {
    id: "4",
    body: "Second comment second child",
    username: "John",
    userId: "2",
    parentId: "2",
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
];
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
    // this.commentsService.getComments().subscribe((comments) => {
    //   this.comments = comments;
    // });
    this.comments = commentsData;
  }

  public addComment(event:  {text: string;}){
    console.log('addComment', event);
    // todo parse test to comment DTO
    this.commentsService.createComment(event.text, this.currentPostId).subscribe((createdComment: IComment) => {
      this.comments = [createdComment, ...this.comments];
    });
  }
}
