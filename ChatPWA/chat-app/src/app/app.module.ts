import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRegistrationComponent } from './chat-registration/chat-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    ChatRegistrationComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
