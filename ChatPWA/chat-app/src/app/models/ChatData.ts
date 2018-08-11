import { Message, PrivateMessage } from './message';

export class PrivateChatData {
  public idChat: string;
  public messages: PrivateMessage[] = new Array<PrivateMessage>();
}

export class GroupChatData {
  public idChat: string;
  public messages: Message[] = new Array<Message>();
}
