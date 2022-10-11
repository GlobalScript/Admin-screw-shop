import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authServices/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  hide = true;
  registrError = false;
  customSubscription!:Subscription;

  constructor(
      private router: Router,
      private authService: AuthService
      ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "firstname": new FormControl("",
      [
            Validators.required
      ]),
      "lastname": new FormControl("",
      [
            Validators.required 
      ]),
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
  
  ngOnDestroy(): void {
      if(this.customSubscription){
          this.customSubscription.unsubscribe();
      }
  }
  
  formSubmit(event:any){
        event.preventDefault()
        this.form.disable()
        this.customSubscription = this.authService.registration(this.form.value).subscribe({
          next: ()=> this.router.navigate(['authorization/login']),
          error: ()=> {
            this.registrError = true;
            this.form.enable();
          } 
        })
  }

  toggleHide(event:any){
      event.preventDefault();
      this.hide = !this.hide;
  }
}

