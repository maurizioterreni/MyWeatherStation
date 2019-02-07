import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
   return new CustomTranslateLoader(http);
}

export class CustomTranslateLoader implements TranslateLoader {

   constructor(private http: HttpClient, public prefix: string = 'assets/i18n/', public suffix: string = '.json') {}

   public getTranslation(lang: string): any {
      // aggiungo un custom header per skippare il rewrite degli url
      let headers = new HttpHeaders();
      headers =  headers.append( 'skip-interceptors', 'true' );
      headers =  headers.append( 'skip-loading', 'true' ); // Se attivo il loading la chiamata non viene mai completata

      return this.http.get(`${this.prefix}${lang}${this.suffix}`, {headers: headers});
   }
}
