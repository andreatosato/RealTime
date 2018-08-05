import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection, LogLevel, JsonHubProtocol } from '@aspnet/signalr';
import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment.prod';
import { Message } from '../models/message';
import { UserSignalR } from '../models/userStats';
import { PrivateChatDataStore } from '../models/dataStore';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {
  private connection: HubConnection;
  private isConnected: boolean;
  private currentUser: UserSignalR;

  constructor(private loginService: LoginService, private privateChatDataStore: PrivateChatDataStore) { }

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

      this.connection.start().then(x => {
        this.connection.invoke('GetUserContext', this.getUserContext);
        // Register Callback
        this.connection.on('receivePrivateMessage', this.receivePrivateMessage);
      }).catch(this.errorConnection);
      this.connection.on('start', this.startConnection);
      this.connection.onclose(this.closeConnection);
    }
  }
  //#region [Connection]
  startConnection() {
    this.isConnected = true;
    console.log('startConnection');
  }
  closeConnection(error: Error) {
    this.isConnected = false;
    console.error(error.toString());
  }
  errorConnection(error: Error) {
    this.isConnected = false;
    console.error(error.toString());
  }
  getUserContext(user: UserSignalR) {
    this.privateChatDataStore.currentUser = user;
  }
  //#endregion

  //#region [PrivateChat]
  addPrivateMessage(message: Message) {
    this.connection.send('addPrivateMessage', message);
  }
  receivePrivateMessage(message: Message) {
  }
  //#endregion
}
