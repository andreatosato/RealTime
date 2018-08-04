import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ChatService } from '../services/chat.service';
import { ChatHubService } from '../services/chatHub.service';

@Component({
  selector: 'app-chat-lists',
  templateUrl: './chat-lists.component.html',
  styles: [],
})
export class ChatListsComponent implements OnInit {
  public usersConnected: number;
  public usersConnectedList: string[];
  public groups: number;
  public groupsList: string[];
  constructor(public loginService: LoginService, private chatService: ChatService,
    private chatHubService: ChatHubService) { }

  ngOnInit() {
    this.chatHubService.connect();
    setTimeout(function() {
      this.chatService.getUsersStats().subscribe(x => {
        this.usersConnected = x.Count;
        this.usersConnectedList = x.Values;
      });
      this.chatService.getGroupsStats().subscribe(x => {
        this.groups = x.Count;
        this.groupsList = x.Values;
      });
    }.bind(this), 1000);
  }
}
