import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
        AdminHeaderComponent,
        SideNavComponent,
        StartHeaderComponent,
        FooterComponent,
    } from '../barrel/components';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminHeaderComponent,
    SideNavComponent,
    StartHeaderComponent,
    FooterComponent
  ],
  exports:[
    AdminHeaderComponent,
    SideNavComponent,
    StartHeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class ComponentsModule { }
