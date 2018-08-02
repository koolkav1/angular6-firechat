import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from '../../../../services/chatroom.service';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;

  private subscriptions: Subscription[] = [];
  public chatroom: Observable<any>;
  public messages: Observable<any>[] = [];
  public messagesLength;
 
  constructor(
    private route: ActivatedRoute,
    private chatroomService: ChatroomService,
    private loadingservice: LoadingService
  ) {
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
        // this.loadingservice.isLoading.next(false);
      })
    );
    this.subscriptions.push(
      this.chatroomService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
        // this.loadingservice.isLoading.next(false);
        
      })
    );
 
   }

  ngOnInit() {
    this.scrollToBotton();

    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const chatroomId = params.get('chatroomId');
        this.chatroomService.changedChatroom.next(chatroomId);
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
