import { NgModule, isDevMode } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { TranslocoRootModule } from './transloco-root.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    NavbarComponent,
    FooterComponent,
    SideMenuComponent,
    HttpClientModule,
    LoadingScreenComponent,
    TranslocoRootModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}