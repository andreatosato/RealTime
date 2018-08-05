import { Message } from './message';
import { UserSignalR } from './userStats';

export class PrivateChatDataStore {
    messages: Message[];
    chatName: string;
    currentUser: UserSignalR;
}

export class GroupChatDataStore extends PrivateChatDataStore {
    users: UserSignalR[];
}
