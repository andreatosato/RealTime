import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {
  private connection;

  constructor(private loginService: LoginService) { }

  connect() {
    if (this.connection === undefined && this.loginService.getToken() !== undefined) {
      this.connection = new HubConnectionBuilder()
          .withUrl('/chat', { accessTokenFactory: () => this.loginService.getToken() })
          // .withHubProtocol(new MessagePackHubProtocol())
          .build();
    }
  }
}
