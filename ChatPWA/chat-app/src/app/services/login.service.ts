import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TokenRequest } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginToken: string;
  private username: string;
  constructor(private http: HttpClient, private router: Router) { }

  login(user: string) {
    this.username = user;
    const tokenRequest = new TokenRequest();
    tokenRequest.Username = user;
    return this.http.post(environment.baseUrl + environment.controllers.Auth, tokenRequest)
    .subscribe((x: any) => {
      this.loginToken = x.Token;
      this.router.navigateByUrl('home');
    });
  }

  public getToken() {
    return this.loginToken;
  }

  public getUsername() {
    return this.username;
  }
}
