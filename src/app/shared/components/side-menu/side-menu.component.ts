import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Role } from '../../../features/auth/models/role';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnInit{
  @Input()isOpened: boolean = false;
  currentUser!: any;
  role = Role
  constructor(
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._authService.currentUser.subscribe( res => this.currentUser = res);
  }

  logOut(){
    this._authService.logout();
    this.isOpened = false
  }
}
