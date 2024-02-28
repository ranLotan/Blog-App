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
    
  public createComment(comment: IComment): Observable<IComment> {
    
    return this.httpClient.post<IComment>(`${this.url}comment`, comment );
    
  }
  public getUserName(){
    return this.accountService.currentUserSoure.getValue()?.userName;

  }
}