import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, of} from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { LoadingService } from './loading.service';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  public chatrooms: Observable<any>;
  public changedChatroom: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages:Observable<any>;
  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {
    this.selectedChatroom = this.changedChatroom.pipe(
      switchMap(
        (chatroomId) => {
          if(chatroomId){
            // this.loadingService.isLoading.next(true);
            return this.db.doc(`chat-rooms/${chatroomId}`).valueChanges();
          }
          return of(null);
        }
      ));
      this.selectedChatroomMessages = this.changedChatroom.pipe(
        switchMap(
          (chatroomId) => {
            if(chatroomId){
              // this.loadingService.isLoading.next(true);
              return this.db.collection(`chat-rooms/${chatroomId}/messages`, ref => {
                return ref.orderBy('createdAt', 'desc').limit(100);
              }).valueChanges().pipe(
                map(arr => arr.reverse())
              );
            }
            return of(null);
          }
        ));
    this.chatrooms = this.db.collection('chat-rooms').valueChanges();
   }
   public createChatroom(room: string) {
     const chatroomId = this.db.createId();
     const newChatroom = {
       id: chatroomId,
       name: room
     }
     this.db.collection(`chat-rooms`).doc(`${chatroomId}`).set(newChatroom);
     
   }
   public createMessage(text: string):void {
    const chatroomId = this.changedChatroom.value;
    const message = {
      message: text,
      createdAt: new Date(),
      sender: this.authService.currentUserSnapshot
    };
    this.db.collection(`chat-rooms/${chatroomId}/messages`).add(message);
   }
}
