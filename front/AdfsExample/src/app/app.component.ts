import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public constructor(private oauthService: OAuthService) {

    this.oauthService.redirectUri = window.location.origin;

    this.oauthService.clientId = 'YOUR_CLIENT_ID';
    this.oauthService.loginUrl = 'https://YOUR_SERVER/adfs/oauth2/authorize';
    this.oauthService.issuer = 'https://YOUR_SERVER/adfs';

    this.oauthService.scope = "openid profile";
    this.oauthService.responseType = 'id_token token';

    this.oauthService.setStorage(sessionStorage);

    this.oauthService.tryLogin();

  }
}
