import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ChatService } from '../services/chat.service';
import { ChatHubService } from '../services/chatHub.service';
import { UserSignalR } from '../models/userStats';
import { Router } from '@angular/router';
import { PrivateDataStoreService } from '../services/private-data-store.service';

@Component({
  selector: 'app-chat-lists',
  templateUrl: './chat-lists.component.html',
  styles: [],
})
export class ChatListsComponent implements OnInit {
  public usersConnected: number;
  public usersConnectedList: UserSignalR[];
  public groups: number;
  public groupsList: string[];
  constructor(public loginService: LoginService, private chatService: ChatService, private router: Router,
    private privateChatDataStore: PrivateDataStoreService) { }

  ngOnInit() {
    this.chatService.getUsersStats().subscribe(x => {
      this.usersConnected = x.Count;
      this.usersConnectedList = x.Values;
    });
    this.chatService.getGroupsStats().subscribe(x => {
      this.groups = x.Count;
      this.groupsList = x.Values;
    });
  }
  privateChat(user: UserSignalR) {
    this.router.navigate(['/private-chat'], {queryParams: {connectionId: user.ConnectionId, username: user.Username}});
  }
}
