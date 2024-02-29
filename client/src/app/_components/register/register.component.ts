import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_interfaces/user-info';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() users: string[] = [];


  public model: any = {};

  constructor(private accountService: AccountService,
    private router: Router,
    private toaster: ToastrService){
    
  }

  public register() {
    if (!this.validateRegistration()){
      return;
    }
    this.accountService.register(this.model).subscribe({
      next: _ => {
        this.toaster.success("Registration Successful");
        this.toaster.success("Now Login");
      },
      error: (result: User) => this.toaster.error(result.error),      
    });
  }

  public clear(): void {
    this.model.username = '';
    this.model.password = '';
  }

  private validateRegistration(): boolean{
    if (!this.model.username){
      this.toaster.error("user name is empty");
      return false;
    }
    return true;
  }

}
