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
    // filtro i soli elementi leftmenu
    this.routes = this.router.config.filter(r => {
      return r.data && r.data.parent;
    });

    this.sidebarElements = new Array<(Route|SidebarDropdown)>();

    // aggiorno la lista delle sidebar ad ogni sottoscrizione dell'obs authorization
    // costruisco un array di sidebarElements che sono Route o SidebarDropdown rispettando l'ordine nel routing
    this.sidebarElements = new Array<(Route|SidebarDropdown)>();
    const parents = new Set<string>();
    const routesAdded = new Set<number>(); // mi permette di tenere traccia delle routes (nelle dropdown e non) già aggiunte alla sidebar
    this.routes.forEach((route, i) => {
      const data = route.data,
      parent = data.parent;

      if (parent && !parents.has(parent)) {
        parents.add(parent);
        // costruisco l'oggetto elemento come tipologia SidebarDropDown
        const element = new SidebarDropdown(DROPDOWNS.find((dropdown: Dropdown) => dropdown.id === parent));

        // ricerco eventuali altre routes con lo stesso parent
        this.routes.filter(r => r.data.parent === parent)
        .forEach(r => {
            element.routes.push(r);
        });
      // aggiungo l'oggetto sidebar solo se ha elementi figli
      if (element.routes.length > 0) {
        const firstRoute = element.routes[0];
        // se ho una sola route ed è marcata preferNoDropDown allora non inserisco una dropdown bensì una route semplice
        if (element.routes.length === 1 && firstRoute.data.preferNoDropDown) {
          firstRoute.data.titleText = firstRoute.data.titleTextNotInDropdown;
          firstRoute.data.desc = firstRoute.data.descTextNotInDropdown;
          routesAdded.add(firstRoute.data.id);
          this.sidebarElements.push(firstRoute);
        } else {
          element.routes.map( (r): number => r.data.id).forEach(routesAdded.add.bind(routesAdded));
          this.sidebarElements.push(element);
        }
      }

    } else if ( !parent && !routesAdded.has(data.id)) {
      routesAdded.add(data.id);
      this.sidebarElements.push(route);
    }
    });
  }

  isActive(sidebarElement: (Route|SidebarDropdown)) {
    // if is ROUTE type
    /*if (!(sidebarElement as SidebarDropdown).isDropdown) {
      return this.isRouteActive(sidebarElement as Route);
    } else {
      return this.isSidebarDropdownActive(sidebarElement as SidebarDropdown);
    }*/
    return true;
  }
  isRouteActive(sidebarElement: Route) {
    /*if (!this.currentModuleId) {
      return false;
    }
    return this.currentModuleId === sidebarElement.data.moduleId;*/
    return false;
  }

}
