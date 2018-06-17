import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';


export abstract class BaseService {
  public Token: string = "";

  constructor(private oauthService: OAuthService, private router: Router) {  }

  protected UrlService: string = 'http://localhost:5000/api/';

  protected getAuthHeader(): RequestOptions {
    
    this.Token = this.oauthService.getAccessToken();

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.Token}`);
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  protected serviceError(error: Response | any, redirectToErrorPageOn500: boolean) {
    let errMsg: string;

    if (error instanceof Response && error.status !== 401 && error.status !== 403 && error.status !== 404) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }
    
    console.error(error);

    return Observable.throw(error);
  }

  protected extractData(response: Response) {
    let body = response.json();
    return body.message || {};
  }

}