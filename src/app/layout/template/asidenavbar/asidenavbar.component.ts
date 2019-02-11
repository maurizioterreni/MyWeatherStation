import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { Dropdown, DROPDOWNS } from 'src/app/app-routing.module';


class SidebarDropdown {
  id: string;
  icon: string;
  titleText: string;
  isDropdown = true;
  routes = new Array<Route>();

  constructor(dropdown: Dropdown) {
    this.id = dropdown.id;
    this.icon = dropdown.icon;
    this.titleText = dropdown.titleText;
  }
}
@Component({
  selector: 'app-asidenavbar',
  templateUrl: './asidenavbar.component.html',
  styleUrls: ['./asidenavbar.component.scss']
})
export class AsidenavbarComponent implements OnInit {

  @ViewChild('leftSidebar') leftSidebar: ElementRef;

  sidebarElements: Array<(Route|SidebarDropdown)>;
  routes: Routes;

  constructor(private router: Router) { }

  ngOnInit() {
    this.routes = this.router.config.filter(r => {
      return r.data && r.data.nav && r.data.nav === 'leftmenu';
    });
    this.sidebarElements = new Array<(Route|SidebarDropdown)>();
    const parents = new Set<string>();
    const routesAdded = new Set<number>(); // mi permette di tenere traccia delle routes (nelle dropdown e non) già aggiunte alla sidebar
    this.routes.forEach((route, i) => {
      const data = route.data,
      parent = data.parent;
      routesAdded.add(data.id);
      this.sidebarElements.push(route);
      console.log(data);
    });
  }

}
