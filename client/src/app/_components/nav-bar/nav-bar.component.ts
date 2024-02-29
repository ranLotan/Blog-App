import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, from } from 'rxjs';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_interfaces/user-info';
import { Router } from '@angular/router';
import { ToastrService as ToasterService } from 'ngx-toastr';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit, OnDestroy {
  
  public model : any = {};
  public isLoggedIn: boolean = false;
  public userName: string = '';
  private userSubscription: Subscription | null = null;
  
  constructor( 
    public accountService : AccountService,
    private router: Router,
    private toaster: ToasterService,
    ){}
    
    ngOnInit(): void {
      this.userSubscription = this.accountService.currentUser$.subscribe(user => {
        this.isLoggedIn = !!user;
        if(user){
          this.userName = user.userName;
        }
        else {
        this.userName = '';
      }
    })
  }
  
  ngOnDestroy(): void {
    if(this.userSubscription)
      this.userSubscription.unsubscribe();
  }

  public login(): void {
    if (!this.model.username || !this.model.password){
      this.toaster.error("user or password are empty");
      return;
    }
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/posts-list'),
      error: (result: User) => {
        let msg = typeof(result.error) == 'string' ? result.error : "Request Failed";
        this.toaster.error(msg);
      }
    });
  }

  public logOut(): void{
    this.accountService.logOut();
    this.router.navigateByUrl('/');
  }
}
