import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginToken: string;
  
  constructor(private http: HttpClient) { }

  login(user: string){
    return this.http.post(environment.baseUrl, new TokenRequest({username: user}))
    .subscribe((x: string) => this.loginToken = x);
  }

  public getToken() {
    return this.loginToken;
  }
}
