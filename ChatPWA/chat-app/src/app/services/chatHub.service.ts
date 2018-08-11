import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection, LogLevel, JsonHubProtocol } from '@aspnet/signalr';
import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment.prod';
import { Message, PrivateMessage, GroupMessage } from '../models/message';
import { UserSignalR } from '../models/userStats';
import { PrivateDataStoreService } from './private-data-store.service';
import { OnlineDataStoreService } from './online-data-store.service';
import { GroupModel } from '../models/groupData';
import { GroupDataStoreService } from './group-data-store.service';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {
  private connection: HubConnection;
  private isConnected: boolean;
  private currentUser: UserSignalR;

  constructor(private loginService: LoginService,
    public privateDataStore: PrivateDataStoreService, public groupDataStore: GroupDataStoreService,
    private onlineDataStore: OnlineDataStoreService) { }

  connect() {
    const token: string = this.loginService.getToken();
    if (this.connection === undefined && token !== undefined) {
      this.connection = new HubConnectionBuilder()
          .withUrl(environment.baseHubs + '/chat', {
            accessTokenFactory: () => token,
            logger: LogLevel.Trace
          })
          // .withHubProtocol(new JsonHubProtocol())
          .withHubProtocol(new MessagePackHubProtocol())
          .build();

      this.connection.start()
                     .catch(this.errorConnection)
                     .then(x => {
                        this.connection.invoke('GetUserContext').then(this.getUserContext.bind(this));
                      });
      // Register Callback
      this.connection.on('ReceivePrivateMessage', this.receivePrivateMessage.bind(this));
      this.connection.on('ReceiveGroupMessage', this.receiveGroupMessage.bind(this));
      this.connection.on('NewConnectedUser', this.newConnectedUser.bind(this));
      this.connection.on('NewDisconnectedUser', this.newConnectedUser.bind(this));
      this.connection.on('NewGroup', this.newGroup.bind(this));
      this.connection.on('UpdateGroup', this.updateGroup.bind(this));
      this.connection.on('DeleteGroup', this.deleteGroup.bind(this));
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
    this.privateDataStore.currentUser = new UserSignalR(user.Username, user.ConnectionId);
    this.groupDataStore.currentUser = new UserSignalR(user.Username, user.ConnectionId);
  }
  //#endregion

  //#region [PrivateChat]
  addPrivateMessage(message: PrivateMessage) {
    this.connection.send('AddPrivateMessage', message);
  }
  receivePrivateMessage(message: PrivateMessage) {
    this.privateDataStore.addMessage(message, message.From.ConnectionId);
  }
  //#endregion

  //#region [GroupChat]
  addGroupMessage(message: GroupMessage) {
    this.connection.send('AddGroupMessage', message);
  }
  receiveGroupMessage(message: GroupMessage) {
    this.groupDataStore.addMessage(message, message.Group);
  }
  //#endregion

  //#region [NotifyConnection]
  newConnectedUser(user: UserSignalR) {
    const userExist = this.onlineDataStore.usersConnectedList.find(x => x.Username === user.Username);
    if (userExist) { // ReConnect
      userExist.ConnectionId = user.ConnectionId;
    } else {
      this.onlineDataStore.usersConnected++;
      this.onlineDataStore.usersConnectedList.push(user);
    }
  }
  newDisconnectedUser(user: UserSignalR) {
    const userExist = this.onlineDataStore.usersConnectedList.find(x => x.Username === user.Username);
    if (userExist) {
      const index = this.onlineDataStore.usersConnectedList.indexOf(userExist);
      this.onlineDataStore.usersConnectedList.splice(index, 1);
    }
  }
  newGroup(group: GroupModel) {
    const groupExist = this.onlineDataStore.groupsList.find(x => x === group.Group);
    if (!groupExist) {
      this.onlineDataStore.groups++;
      this.onlineDataStore.groupsList.push(group.Group);
    }
  }
  updateGroup(group: GroupModel) {
    let groupExist = this.onlineDataStore.groupsList.find(x => x === group.Group);
    if (groupExist) {
      groupExist = group.Group;
    }
  }
  deleteGroup(group: GroupModel) {
    const groupExist = this.onlineDataStore.groupsList.find(x => x === group.Group);
    if (groupExist) {
      const index = this.onlineDataStore.groupsList.indexOf(groupExist);
      this.onlineDataStore.groupsList.splice(index, 1);
    }
  }
  //#endregion
}
