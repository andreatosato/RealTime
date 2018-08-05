import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { UserSignalR } from '../models/userStats';


@Injectable({
  providedIn: 'root'
})
export class PrivateDataStoreService {
  public currentUser: UserSignalR;
  public chatData: PrivateChatData[] = new Array<PrivateChatData>();
  constructor() {}
  addMessage(message: Message) {
    let data = this.chatData.find(x => x.idChat === message.From.ConnectionId);
    if (data === undefined) {
      data = new PrivateChatData();
      data.idChat = message.From.ConnectionId;
      this.chatData.push(data);
    }
    data.messages.push(message);
  }
}

export class PrivateChatData {
  public idChat: string;
  public messages: Message[] = new Array<Message>();
}
