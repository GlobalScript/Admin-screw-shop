import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {layoutRoute} from '../routes/layout-route';
const routes: Routes = [...layoutRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
