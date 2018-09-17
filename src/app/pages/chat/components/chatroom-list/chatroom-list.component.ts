import { Component, OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, DoCheck } from '@angular/core';
import { ChatroomService } from '../../../../services/chatroom.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DirectMessaingService } from '../../../../services/direct-messaing.service';
import { StoreUserService } from '../../../../services/store-user.service';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit, DoCheck, AfterViewChecked {
  userArray:User[];
  userArray2: User[];
  currentUser: User;
  constructor(
    public chatroomService: ChatroomService,
    private authService: AuthService,
    private router: Router,
    public directMessageService: DirectMessaingService,
    private storeUser: StoreUserService
  ) { 
    this.currentUser = this.authService.currentUserSnapshot;
    this.authService.getAllUsers().subscribe(users=> {
      this.userArray = users;
    
    });
      
    
   
     
   

   
   
  }

  ngOnInit() {
  
  }
  ngDoCheck(){
 
  }
  ngAfterViewChecked(){
    
  }
  onSubmit(form: NgForm){
    const channelName: string = form.value.channelName;
    console.log(channelName);
    this.chatroomService.createChatroom(channelName);
  }
  chat(user: User){
    this.storeUser.changeUser(user);
   this.directMessageService.doesPrivateRoomExistsAndNavigate(this.currentUser, user);
  
     
      
    }
    
   
   
  

}
