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
  
  public getComments(): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(
      'http://localhost:3000/comments'
      );
    }
    
  public createComment(text: string, currentPostId: string): Observable<IComment> {
    const userName = this.accountService.currentUserSoure.getValue()?.userName;

    return this.httpClient.post<IComment>(`${this.url}comment`, {text, currentPostId, userName} );

  }
}