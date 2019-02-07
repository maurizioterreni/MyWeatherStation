import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './factory/httpLoaderFactory';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { TopnavbarComponent } from './layout/template/topnavbar/topnavbar.component';
import { AsidenavbarComponent } from './layout/template/asidenavbar/asidenavbar.component';
import { FooternavbarComponent } from './layout/template/footernavbar/footernavbar.component';
import { SettingsnavbarComponent } from './layout/template/settingsnavbar/settingsnavbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopnavbarComponent,
    AsidenavbarComponent,
    FooternavbarComponent,
    SettingsnavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
