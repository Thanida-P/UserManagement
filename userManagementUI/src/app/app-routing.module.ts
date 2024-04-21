import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard';
import { DocumentComponent } from './document';
import { SidebarComponent } from './sidebar';
import { LoginComponent } from './login';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'menus', 
    component: SidebarComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'document', component: DocumentComponent},
    ]
  }
  
  // otherwise redirect to home
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
