import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { 
    path: 'Home', 
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) 
  }, 
  { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) },
  
  { 
    path: 'dashboard', 
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },

  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
];



// const routes: Routes = [
//   {
//     path: '',
//     component: WebsiteComponent,
//     children: [
//       {
//         path: '',
//         redirectTo: '/Home',
//         pathMatch: 'full'
//       },
//       { path: 'Home', loadChildren: () => import('./modules/website/home/home.module').then(m => m.HomeModule) },
//       { path: 'about', loadChildren: () => import('./modules/website/about-us/about-us.module').then(m => m.AboutUsModule) },
//       { path: 'usage-guides', loadChildren: () => import('./modules/website/usage-guides/usage-guides.module').then(m => m.UsageGuidesModule) },
//       { path: 'faq', loadChildren: () => import('./modules/website/faq/faq.module').then(m => m.FaqModule) },
//       { path: 'contact-us', loadChildren: () => import('./modules/website/contact-us/contact-us.module').then(m => m.ContactUsModule) },
//       { path: 'terms-and-conditions', loadChildren: () => import('./modules/website/terms-and-condtions/terms-and-condtions.module').then(m => m.TermsAndCondtionsModule) },
//       { path: 'privacy-policy', loadChildren: () => import('./modules/website/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
//       { path: 'view-document', loadChildren: () => import('./modules/website/view-document/view-document.module').then(m => m.ViewDocumentModule) },

//     ]
//     // loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule) 
//   },

//   {
//     path: 'dashboard',
//     loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
//     // canActivate: [AuthGuard]
//   },
  
//   { path: '**', redirectTo: '/Home', pathMatch: 'full' },
//   {
//     path: '',
//     redirectTo: '/Home',
//     pathMatch: 'full'
//   },
// ];



@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: "reload"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
