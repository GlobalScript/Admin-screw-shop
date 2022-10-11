import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import {
        AdminLayoutComponent,
        AuthLayoutComponent,
        StartLayoutComponent,
        NotFoundComponent
  } from '../barrel/layouts';
import {ComponentsModule} from './components.module'
import { AuthorizationModule } from './authorization.module';
import { MaterialModule } from './material.module';
import { PagesModule } from './pages.module';
import { AuthService } from '../services/authServices/auth.service';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    StartLayoutComponent,
    NotFoundComponent,
  ],
  exports:[
    ComponentsModule
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    AuthorizationModule,
    MaterialModule,
    PagesModule
   
  ],
  providers: [
    AuthService
  ]
})
export class LayoutsModule { }
