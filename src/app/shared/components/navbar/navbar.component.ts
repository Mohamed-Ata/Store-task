import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../features/auth/models/user';
import { Role } from '../../../features/auth/models/role';
import { TranslocoModule } from '@ngneat/transloco';
import { LocalizeService } from '../../services/localize.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslocoModule, NgbModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean = false;
  currentUser!: User;
  userRole = Role
  @Output() toggleMenuEvent = new EventEmitter<boolean>();
  isOpened: boolean = false;
  selectedLang:any;
  status: boolean = false;


  // OK: field initializer
  // spareTyre = inject(TranslateService);
  
  constructor(
     public _authService: AuthService,
     public _localize: LocalizeService
  ) {
    }


  ngOnInit(): void {
    this._authService.currentUser.subscribe( res => this.currentUser = res);

    if(this._authService.isLoggedIn()){
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false
    }
    this._localize.getLanguage();
  }

  toggleMenu() {
    this.isOpened = !this.isOpened;
    this.toggleMenuEvent.emit(this.isOpened);
  }

  openMenu(){
    if (window.innerWidth <= 991){
      this.status = !this.status;  
    }
  }
}
