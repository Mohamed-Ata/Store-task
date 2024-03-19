import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { IndexComponent } from './index/index.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: ProductsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'product-details/:id',
        component: ProductDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
