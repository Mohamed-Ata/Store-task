import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../models/user-login.model';
import { Router } from '@angular/router';
import { Role } from '../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';
  role = Role;
  formSubmitted: boolean = false;
  constructor(
    private _authService: AuthService,
    private _router: Router
  ){ }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(){
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }


  procedLogin(){
    this.formSubmitted = true;
    const data: UserLogin = this.loginForm.value;
    if(this.loginForm.valid){
  
      if (this._authService.login(data)) {
        if(this._authService.getUserData()!.role == this.role.Admin){
          this._router.navigate(['/dashboard']); // Redirect to dashboard after successful login
        } else {
          this._router.navigate(['/products']); // Redirect to dashboard after successful login
        }
      } else {
        this.error = 'Invalid username or password';
      }
    }
  }
}


