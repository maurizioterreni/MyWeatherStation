import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MyWeatherStation';
  constructor(private translateService: TranslateService) {}
  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue fixed sidebar-mini';
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang('it');

  }

  // getLoggedProfile(): Observable<LoggedProfile> {
  //   return this.loggedProfileService.get().share();
  // }

  ngOnDestroy() {
    document.body.className = '';
  }
}
