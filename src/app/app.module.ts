import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {AlertModule} from 'ngx-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatInputComponent } from './pages/chat/components/chat-input/chat-input.component';
import { ChatroomListComponent } from './pages/chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './pages/chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatMessageComponent } from './pages/chat/components/chat-message/chat-message.component';
import { ChatWindowComponent } from './pages/chat/components/chat-window/chat-window.component';
import { AlertService } from './services/alert.service';
import { LoadingModule } from 'ngx-loading';
import { LoadingService } from './services/loading.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { environment } from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { ChatroomService } from './services/chatroom.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { IsOwnerGuard } from './guards/is-owner.guard';
import { FirestoreDatePipe } from './pipes/firestoredate.pipe';

import { DirectComponent } from './pages/direct/direct.component';
import { DirectChatWindowComponent } from './pages/direct/direct-chat-window/direct-chat-window.component';
import { DirectChatroomTitleBarComponent } from './pages/direct/direct-chatroom-title-bar/direct-chatroom-title-bar.component';
import { DirectChatInputComponent } from './pages/direct/direct-chat-input/direct-chat-input.component';
import { DirectChatMessageComponent } from './pages/direct/direct-chat-message/direct-chat-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    NavbarComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatMessageComponent,
    ChatWindowComponent,
    ProfileComponent,
    EditProfileComponent,
    FirestoreDatePipe,
   
    DirectComponent,
   
    DirectChatWindowComponent,
   
    DirectChatroomTitleBarComponent,
   
    DirectChatInputComponent,
   
    DirectChatMessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    LoadingModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [AlertService, LoadingService, AuthService, AuthGuard, ChatroomService, IsOwnerGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
