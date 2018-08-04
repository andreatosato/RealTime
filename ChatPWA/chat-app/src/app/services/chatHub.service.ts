import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection, LogLevel, JsonHubProtocol } from '@aspnet/signalr';
import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {
  private connection: HubConnection;

  constructor(private loginService: LoginService) { }

  connect() {
    const token: string = this.loginService.getToken();
    if (this.connection === undefined && token !== undefined) {
      this.connection = new HubConnectionBuilder()
          .withUrl(environment.baseHubs + '/chat', {
            accessTokenFactory: () => token,
            logger: LogLevel.Trace
          })
          .withHubProtocol(new JsonHubProtocol())
          // .withHubProtocol(new MessagePackHubProtocol())
          .build();

      this.connection.start().catch(this.errorConnection);
      this.connection.on('start', this.startConnection);
      this.connection.onclose(this.closeConnection);
    }
  }
  startConnection() {
    console.log('startConnection');
  }
  closeConnection(error: Error) {
    console.error(error.toString());
  }

  errorConnection(error: Error) {
    console.error(error.toString());
  }
}
