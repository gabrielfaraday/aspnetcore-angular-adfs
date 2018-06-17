import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { MyService } from '../my.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public message: string;
  public token: string;
  public idtoken: string;

  constructor(private oauthService: OAuthService,
    private service: MyService) { }

  ngOnInit() {
    this.token = this.oauthService.getAccessToken();
    this.idtoken = this.oauthService.getIdToken();
  }

  getPublicAreaMessage() {
    this.service.getPublicMessage()
      .subscribe(
        msg => this.message = msg,
        error => { console.log(error); alert("Error occured"); });
  }

  getPrivateAreaMessage() {
    this.service.getPrivateMessage()
      .subscribe(
        msg => this.message = msg,
        error => { console.log(error); alert("Error occured"); });
  }

  logout(){
    this.oauthService.logOut();
    window.location.href= 'https://YOUR_SERVER/adfs/ls/?wa=wsignoutcleanup1.0';
  }

}
