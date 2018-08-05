import { Component, OnInit } from '@angular/core';
import { ChatHubService } from '../services/chatHub.service';
import { Message } from '../models/message';
import { PrivateDataStoreService } from '../services/private-data-store.service';
import { ActivatedRoute } from '@angular/router';
import { UserSignalR } from '../models/userStats';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styles: []
})
export class PrivateChatComponent implements OnInit {
  public newMessage: Message = new Message();
  private toUser: UserSignalR;
  constructor(private chatHubService: ChatHubService, public privateChatDataStore: PrivateDataStoreService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.toUser = {Username :  params['username'], ConnectionId: params['connectionId']};
      this.newMessage.To = this.toUser;
    });
    this.newMessage.From = this.privateChatDataStore.currentUser;
    this.newMessage.TextMessage = '';
  }

  addMessage() {
    this.chatHubService.addPrivateMessage(this.newMessage);
    this.privateChatDataStore.messages.push(this.newMessage);
    this.newMessage.TextMessage = '';
  }

}
