import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../../core/guards/auth.guard';
import { IndexComponent } from './index/index.component';
import { AddProductComponent } from './add-product/add-product.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent,
    canActivate: [adminGuard,authGuard],
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: "add-product",
        component: AddProductComponent
      },
      {
        path: "edit-product/:id",
        component: AddProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
