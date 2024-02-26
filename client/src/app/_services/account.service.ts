import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../_interfaces/user-info';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loginUrl: string = environment.apiUrl;
  public currentUserSoure = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSoure.asObservable();

  constructor(private client: HttpClient) { }

  public setCurrentUser(user: User) {
    this.currentUserSoure.next(user)
  }
  public login(model: any): Observable<User>{
    return this.client.post<User>(this.loginUrl + 'account/login', model).pipe(
      map((response): User => {
        if (response){
          console.log(response);
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSoure.next(response);
        }
        return response;
      })
    );
  }

  public logOut(): void{
    this.currentUserSoure.next(null);
    localStorage.removeItem('user');

  }

  public register(model: any): Observable<User>{
    return this.client.post<User>(this.loginUrl + 'account/register', model);
  }
}
