import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment, IEditCommentInfo } from 'src/app/_interfaces/user-info';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  @Input() comment! : IComment; 
  @Input() currentUserId!: string;
  @Input() activeComment!: string | null;
  @Output() deleteComment = new EventEmitter<string>();
  @Output() updateComment = new EventEmitter<{ text: string; commentId: string }>();
  @Output() setActiveComment = new EventEmitter<string | null>();
  
  public changesAllowed: boolean = false;

  constructor (){}
  ngOnInit(): void {
    this.changesAllowed = this.currentUserId === this.comment.authorId;
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return this.activeComment === this.comment.id;
  }
}
