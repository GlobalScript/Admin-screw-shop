import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../authorization/login/login.component';
import { RegistrationComponent } from '../authorization/registration/registration.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../authorization/interceptor/tokenInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  exports: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ]
})
export class AuthorizationModule { }
