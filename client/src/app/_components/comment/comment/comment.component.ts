import { Component, Input } from '@angular/core';
import { IComment } from 'src/app/_interfaces/user-info';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment! : IComment; 
}
