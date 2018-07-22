import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  private connection;
  constructor() { }

  ngOnInit() {
    this.connection = new HubConnectionBuilder()
      .withUrl("/chatHub", { accessTokenFactory: () => this.loginToken })
      .withHubProtocol(new MessagePackHubProtocol())
      .build();
  }

}
