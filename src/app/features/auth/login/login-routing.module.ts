import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { loggedInGuard } from '../../../core/guards/logged-in.guard';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent,
    canActivate: [loggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
