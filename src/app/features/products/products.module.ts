import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { IndexComponent } from './index/index.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SkeltonLoadingComponent } from '../../shared/components/skelton-loading/skelton-loading.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';


@NgModule({
  declarations: [
    ProductsComponent,
    IndexComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SkeltonLoadingComponent,
    ProductCardComponent,
    FilterComponent
  ]
})
export class ProductsModule { }
