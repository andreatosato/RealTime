import { Injectable } from '@angular/core';
import { UserSignalR } from '../models/userStats';
import { PrivateChatData, GroupChatData } from '../models/ChatData';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class GroupDataStoreService {
  public currentUser: UserSignalR;
  public chatData: GroupChatData[] = new Array<GroupChatData>();
  constructor() {}
  addMessage(message: Message, idChat: string) {
    let data = this.chatData.find(x => x.idChat === idChat);
    if (data === undefined) {
      data = new GroupChatData();
      data.idChat = idChat;
      this.chatData.push(data);
    }
    data.messages.push(message);
  }
}
