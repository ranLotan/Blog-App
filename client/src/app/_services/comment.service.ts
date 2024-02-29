import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../_interfaces/user-info';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url: string = environment.apiUrl;
  
  constructor(private httpClient: HttpClient, private accountService: AccountService) {}
  
  public getPostComments(postId: string): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(`${this.url}comment/sortedbydate?postid=${postId}`);
  }
  
  public createComment(comment: any): Observable<IComment> {
    return this.httpClient.post<IComment>(`${this.url}comment`, comment );    
  }
  
  public updateComment(commentToEdit: { id: string; postId: string; content: string; }) {
    return this.httpClient.put<IComment>(`${this.url}comment`, commentToEdit );    
  }

  public deleteComment(commentId: string): Observable<IComment>  {
    return this.httpClient.delete<IComment>(`${this.url}comment/${commentId}`);
  }

  public getUserName(){
    return this.accountService.currentUserSoure.getValue()?.userName;
  }

  public getUserId(){
    return this.accountService.currentUserSoure.getValue()?.userId;
  }
}