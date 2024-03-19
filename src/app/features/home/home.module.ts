import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SkeltonLoadingComponent } from '../../shared/components/skelton-loading/skelton-loading.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductCardComponent,
    SkeltonLoadingComponent
  ]
})
export class HomeModule { }
