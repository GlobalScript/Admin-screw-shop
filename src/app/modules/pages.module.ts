import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchGoodsPipe } from '../pipes/searchGoods.pipe'; 
import { SearchCartPipe } from '../pipes/searchCart.pipe'; 
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { GoodsComponent, CreateComponent, CustomersComponent, ProdCardComponent,
EditComponent, DeleteComponent, OrderComponent, RolesComponent, DeleteMessageComponent } from '../barrel/pages';
import { RouterModule } from '@angular/router';
import { RegMatchPipe } from '../pipes/regMatch.pipe';
import { PhoneFormatPipe } from '../pipes/phoneFormat.pipe';
import { NgxEchartsModule } from 'ngx-echarts';
import { AdminChartComponent } from '../pages/admin-chart/admin-chart.component';

@NgModule({
  declarations: [
    GoodsComponent,
    CreateComponent,
    CustomersComponent,
    RolesComponent,
    ProdCardComponent,
    EditComponent,
    DeleteComponent,
    SearchGoodsPipe,
    SearchCartPipe,
    RegMatchPipe,
    PhoneFormatPipe,
    OrderComponent,
    AdminChartComponent,
    DeleteMessageComponent
  ],
  exports:[
    GoodsComponent,
    CreateComponent,
    CustomersComponent,
    RolesComponent,
    AdminChartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class PagesModule { }
