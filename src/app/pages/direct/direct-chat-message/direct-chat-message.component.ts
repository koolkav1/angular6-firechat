import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../models/message';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-direct-chat-message',
  templateUrl: './direct-chat-message.component.html',
  styleUrls: ['./direct-chat-message.component.scss']
})
export class DirectChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Input() photoURL: any;
  
  public chatPhoto: Observable<string | null>;

  constructor(private fs: AngularFireStorage
  ) {
   
  }

  ngOnInit() {
    const ref = this.fs.ref(`${this.photoURL}`);
    this.chatPhoto = ref.getDownloadURL();
    
      
    
  }

}
