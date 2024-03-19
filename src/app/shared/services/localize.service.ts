import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {

  constructor(public translate: TranslocoService) { }

  setLanguage(lang: string, direction: string) {
    localStorage.setItem("lang", lang.toLowerCase());
    localStorage.setItem("direction", direction.toLowerCase());
    this.translate.setActiveLang(lang);
    this.getLanguage();
  }

  hasLanguage() {
    return (localStorage.getItem("lang") != null && localStorage.getItem("lang")!.length > 0)
  }

  getLanguage() {
    let lang: string = localStorage.getItem("lang") || 'en';
    // let currentlang : string = localStorage.getItem('lang');
    if (lang == "" || lang == null || lang == 'undefined') {
      return this.getDefaultLanguage();
    }

    if (localStorage.getItem('lang') == 'ar') {
      this.translate.setActiveLang('ar');
    } else {
      this.translate.setActiveLang('en');
    }
    // get direction from local storage 
    if (localStorage.getItem('direction') == 'rtl') {
        document.getElementsByTagName("html")[0].setAttribute("dir", 'rtl');
    } else {
        document.getElementsByTagName("html")[0].setAttribute("dir", 'ltr');
    }
    return lang;
  }

  private getDefaultLanguage() {
    return('en')
  }
  refresh(): void {
    window.location.reload();
  }
}
