import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { UserSignalR } from '../models/userStats';

@Injectable({
  providedIn: 'root'
})
export class PrivateDataStoreService {
  public messages: Message[] = new Array<Message>();
  public currentUser: UserSignalR = new UserSignalR();
  constructor() { }
}
