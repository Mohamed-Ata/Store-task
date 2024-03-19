import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { IndexComponent } from './index/index.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    DashboardComponent,
    AddProductComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FilterComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule
  ]
})
export class DashboardModule { }
