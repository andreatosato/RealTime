import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/message';
import { UserSignalR } from '../models/userStats';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styles: []
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Input() currentUser: UserSignalR;
  constructor() { }

  ngOnInit() {
  }

}
