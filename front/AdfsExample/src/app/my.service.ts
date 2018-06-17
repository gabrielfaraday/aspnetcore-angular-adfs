import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { BaseService } from './base.service';

@Injectable()
export class MyService extends BaseService {

  constructor(private http: Http, private adfs: OAuthService, private r: Router) { super(adfs, r); }

  getPrivateMessage(): Observable<string> {
    let options = this.getAuthHeader();

    return this.http.get(this.UrlService + "home/private", options)
      .map((res: Response) => <string>super.extractData(res))
      .catch(err => super.serviceError(err, true));
  }

  getPublicMessage(): Observable<string> {
    let options = this.getAuthHeader();

    return this.http.get(this.UrlService + "home/public", options)
      .map((res: Response) => <string>super.extractData(res))
      .catch(err => super.serviceError(err, true));
  }
  
}