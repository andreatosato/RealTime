import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection;

  constructor(private loginService: LoginService) { }

  connect() {
    this.connection = new HubConnectionBuilder()
    .withUrl("/chatHub", { accessTokenFactory: () => this.loginService.loginToken })
    .withHubProtocol(new MessagePackHubProtocol())
    .build();
  }
}
