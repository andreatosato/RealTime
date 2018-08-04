import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatListsComponent } from './chat-lists/chat-lists.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chat-list', component: ChatListsComponent },
    { path: 'chat-room', component: ChatRoomComponent },
    { path: '**', redirectTo: '' }
  ];

export const routing = RouterModule.forRoot(appRoutes);
