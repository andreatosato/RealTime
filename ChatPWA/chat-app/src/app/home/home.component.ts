import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { ChatHubService } from '../services/chatHub.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

}
