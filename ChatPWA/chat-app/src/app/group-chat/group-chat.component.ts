import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatHubService } from '../services/chatHub.service';
import { GroupDataStoreService } from '../services/group-data-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, GroupMessage } from '../models/message';
import { ChatService } from '../services/chat.service';
import { JoinGroupModel } from '../models/groupData';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['/group-chat.component.css']
})
export class GroupChatComponent implements OnInit, OnDestroy {
  public newMessage: GroupMessage = new GroupMessage();
  public groupName: string;
  constructor(private chatHubService: ChatHubService, public groupChatDataStore: GroupDataStoreService,
    private chatService: ChatService, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.groupName = params['groupName'];
      this.newMessage.Group = this.groupName;
      const joinModel = new JoinGroupModel();
      joinModel.Group = this.groupName;
      joinModel.Username = this.groupChatDataStore.currentUser.Username;
      this.chatService.addUserToGroup(joinModel);
    });
    this.newMessage.From = this.groupChatDataStore.currentUser;
    this.newMessage.TextMessage = '';
  }
  ngOnDestroy(): void {
    const joinModel = new JoinGroupModel();
    joinModel.Group = this.groupName;
    joinModel.Username = this.groupChatDataStore.currentUser.Username;
    this.chatService.removeUserFromGroup(joinModel);
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
  leaveGroup() {
    this.router.navigate(['/chat-list']);
  }
}
