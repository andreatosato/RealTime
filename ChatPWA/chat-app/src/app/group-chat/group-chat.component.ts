import { Component, OnInit } from '@angular/core';
import { ChatHubService } from '../services/chatHub.service';
import { GroupDataStoreService } from '../services/group-data-store.service';
import { ActivatedRoute } from '@angular/router';
import { Message, GroupMessage } from '../models/message';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['/group-chat.component.css']
})
export class GroupChatComponent implements OnInit {
  public newMessage: GroupMessage = new GroupMessage();
  public groupName: string;
  constructor(private chatHubService: ChatHubService, public groupChatDataStore: GroupDataStoreService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.groupName = params['groupName'];
      this.newMessage.Group = this.groupName;
    });
    this.newMessage.From = this.groupChatDataStore.currentUser;
    this.newMessage.TextMessage = '';
  }

  addMessage() {
    this.chatHubService.addGroupMessage(this.newMessage);
    this.groupChatDataStore.addMessage(Object.assign({}, this.newMessage), this.groupName);
    this.newMessage.TextMessage = '';
  }
  getMessages(): Message[] {
    const chatData = this.groupChatDataStore.chatData.find(x => x.idChat === this.groupName);
    if (chatData === undefined) {
      return new Array<Message>();
    }
    return chatData.messages;
  }
}
