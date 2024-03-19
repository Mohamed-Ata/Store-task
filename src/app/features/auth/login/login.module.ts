import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PageHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule
  ]
})
export class LoginModule { }
