import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './layout/component/dashboard/dashboard.component';

export interface Dropdown {
  id: string;
  icon?: string;
  titleText?: string;
}

export const DROPDOWNS: Array<Dropdown> = [
  {id: 'DASHBOARD', titleText: 'routing.dropdowns.dashboard.title', icon: 'fa-folder-open' },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent, pathMatch: 'full',
    data: {
      id: 1, breadcrumbPath: [1], titleText: 'routing.dashboard.title', headerText: 'routing.dashboard.header',
      desc: 'routing.dashboard.desc', parent: 'DASHBOARD', icon: 'fa-dashboard', nav: 'leftmenu'
    }
  },
  {
    path: 'weatherstation-list', component: DashboardComponent, pathMatch: 'full',
    data: {
      id: 2, breadcrumbPath: [1, 2], titleText: 'routing.dashboard.title', headerText: 'routing.dashboard.header',
      desc: 'routing.dashboard.desc', parent: 'DASHBOARD', icon: 'fa-dashboard', nav: 'leftmenu'
    }
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
