import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(
    private _router: Router
  ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get userValue(): User {
    return this.currentUserSubject.value;
  }

  getUserData(){
    let currentChamberObject = JSON.parse(localStorage.getItem('currentUser')!);

    const userObject = {
      username: currentChamberObject.username,
      role: currentChamberObject.role
    }
    return userObject 
    
  }


  login(data: UserLogin): boolean {
    // Perform validation against static login users
    if ((data.userName === 'user' && data.password === 'user') ||
        (data.userName === 'admin' && data.password === 'admin')) {
      // Store user role in local storage
      
      let userData: User = { username: data.userName, role: data.userName === 'admin' ? Role.Admin : Role.User }

      this.currentUserSubject.next(userData);
      localStorage.setItem("currentUser",JSON.stringify(userData))

      return true;
    } else {
      return false;
    }
  }


  logout(): void {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    this._router.navigateByUrl('/auth');
    this.currentUserSubject.next(null!);
  }

  isLoggedIn(): boolean {
    // Check if user is logged in
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): any {
    // Get current user from local storage
    return JSON.parse(localStorage.getItem('currentUser')!);
  }
}
