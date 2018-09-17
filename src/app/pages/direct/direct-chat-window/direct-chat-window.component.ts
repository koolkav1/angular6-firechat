import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DirectMessaingService } from '../../../services/direct-messaing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-direct-chat-window',
  templateUrl: './direct-chat-window.component.html',
  styleUrls: ['./direct-chat-window.component.scss']
})
export class DirectChatWindowComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;

  private subscriptions: Subscription[] = [];
  public chatroom: Observable<any>;
  public messages: Observable<any>[] = [];
  public messagesLength;
  constructor(
    private route: ActivatedRoute,
    public directService: DirectMessaingService
  ) { 
    this.subscriptions.push(
      this.directService.selectedPrivateRoom.subscribe(chatroom => {
        this.chatroom = chatroom;
        console.log('chatroom exists yay');
        // this.loadingservice.isLoading.next(false);
      })
    );
    this.subscriptions.push(
      this.directService.selectedPrivateRoomMessages.subscribe(messages => {
        this.messages = messages;
        // this.loadingservice.isLoading.next(false);
        
      })
    );

  }

  ngOnInit() {
  
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const privateRoomID = params.get('privateRoomID');
        this.directService.changedPrivateRoom.next(privateRoomID);
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  ngAfterViewChecked():void{
   this.scrollToBotton();
  }
  private scrollToBotton():void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }catch(err){}
  }

}
