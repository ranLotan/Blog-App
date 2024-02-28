import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPost, User } from '../_interfaces/user-info';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url: string = environment.apiUrl;
  public currentPostSoure = new BehaviorSubject<IPost | null>(null);
  public currentPost$ = this.currentPostSoure.asObservable();

  constructor(private http: HttpClient, private accounteService: AccountService) { }

  public getPosts(){
    return this.http.get<IPost[]>(`${this.url}post/sortedbydate`);
  }


  public addPost(post: IPost) :Observable<IPost>{
    return this.http.post<IPost>(`${this.url}post`, post);
  } 
  public editPost(post: IPost) :Observable<boolean>{
    return this.http.put<boolean>(`${this.url}post`, post);
  } 

  public setCurrentPost(post: IPost){
    this.currentPostSoure.next(post);
  }

  public getCurrentUserId(){
    const userString = localStorage.getItem('user');
    if (!userString){ 
      return "-1"; 
    }
    const user: User = JSON.parse(userString);
    return user.userId ?? -1;
  }



}
