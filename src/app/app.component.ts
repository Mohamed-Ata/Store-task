import { Component, OnInit } from '@angular/core';
import { HelperService } from './core/services/helper.service';
import { LocalizeService } from './shared/services/localize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'stcTask';
  isOpen: boolean = false;
  splash: boolean = true;
  loader: any;

  constructor(
    private _helperService: HelperService,
    public translate: LocalizeService
  ) {
    // translate.addLangs(['en', 'nl']);
    // translate.setDefaultLang('en');
  }

  
  togglemenu() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
    this._helperService.loader
      .subscribe((res) => {
        this.loader = res;
      });

    this.translate.getLanguage()
  }
}
