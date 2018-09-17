import { Component, OnInit, OnDestroy } from '@angular/core';
import { DirectMessaingService } from '../../../services/direct-messaing.service';
import { StoreUserService } from '../../../services/store-user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-direct-chat-input',
  templateUrl: './direct-chat-input.component.html',
  styleUrls: ['./direct-chat-input.component.scss']
})
export class DirectChatInputComponent implements OnInit, OnDestroy {
  public newMessageText : string;
  user2: User;
  constructor(
    private directMessageService: DirectMessaingService,
    private storeUser: StoreUserService
  ) {
    this.storeUser.currentUser.subscribe(user2 => this.user2 = user2);
   }

  ngOnInit() {
  }
  public submit(message: string){
    this.directMessageService.sendPrivateMessage(message,this.user2);
    this.newMessageText = '';
  }
  ngOnDestroy(){
   
  }
}
