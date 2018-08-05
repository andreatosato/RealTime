import { UserSignalR } from './userStats';

export class Message {
    To: UserSignalR;
    From: UserSignalR;
    TextMessage: string;
    IdChat: string;
}
