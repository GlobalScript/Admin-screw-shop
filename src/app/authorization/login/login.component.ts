import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authServices/auth.service';
import { TokenService } from 'src/app/services/authServices/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  hide = true;
  loginError = false;
  customSubscription!:Subscription;
  message = false;

  constructor(
      private router: Router,
      private authService: AuthService,
      private tokenService: TokenService
      ) { }

  ngOnInit(): void {
      this.form = new FormGroup({
          "email": new FormControl("",
                [
                  Validators.required, 
                  Validators.email
                ]),
          'password': new FormControl('',
                [
                  Validators.required,
                  Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
                ]),
        });
  }
  
  formSubmit(event:any){
        event.preventDefault()
        this.form.disable()
        this.customSubscription = this.authService.login(this.form.value).subscribe({
          next: ()=> {
            if(!this.tokenService.parseJwt().role){
                  this.authService.logout()
                  this.form.enable();
                  this.message = true;
            }
            this.router.navigate(['admin/chart'])

          }, 
          error: ()=> {
            this.loginError = true;
            this.form.enable();
          } 
        })
  }

  toggleHide(event:any){
      event.preventDefault();
      this.hide = !this.hide;
  }
 
  ngOnDestroy(): void {
    if(this.customSubscription){
        this.customSubscription.unsubscribe();
    }
  }

}
