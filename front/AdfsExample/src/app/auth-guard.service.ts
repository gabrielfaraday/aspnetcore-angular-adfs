import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable()
export class AuthGuardService implements CanActivate {
    public token: string;

    constructor(private router: Router, private oauthService: OAuthService) { }

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        

        if (!this.oauthService.hasValidAccessToken()) {
            this.oauthService.tryLogin();
        }

        if (!this.oauthService.hasValidAccessToken()) {
            this.oauthService.initImplicitFlow();
            
            return false;
        }

        return true;

    }
}