import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { User } from '../interfaces/user';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class DirectMessaingService {
  public changedPrivateRoom: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectedPrivateRoom: Observable<any>;
  public selectedPrivateRoomMessages: Observable<any>;
  public privateRooms: Observable<any>;
  test1: any;
  test2: any;
  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router
  ) {
    this.selectedPrivateRoom = this.changedPrivateRoom.pipe(
      switchMap(
        (chatroomId) => {
          if (chatroomId) {
            // this.loadingService.isLoading.next(true);
            return this.db.doc(`direct-messages/${chatroomId}`).valueChanges();
          }
          return of(null);
        }
      ));
    this.selectedPrivateRoomMessages = this.changedPrivateRoom.pipe(
      switchMap(
        (chatroomId) => {
          if (chatroomId) {
            // this.loadingService.isLoading.next(true);
            return this.db.collection(`direct-messages/${chatroomId}/messages`, ref => {
              return ref.orderBy('createdAt', 'desc').limit(100);
            }).valueChanges().pipe(
              map(arr => arr.reverse())
            );
          }
          return of(null);
        }
      ));
    this.privateRooms = this.db.collection('direct-messages').valueChanges();
  }
  public doesPrivateRoomExistsAndNavigate(user1: User, user2: User) {
    let room1 = async () => {
      this.db.doc(`direct-messages/${user1.id}${user2.id}`).snapshotChanges().subscribe(obj => {
        this.test1 = obj.payload.exists;
        if(this.test1){
          this.router.navigate([`/direct-chat/${user1.id}${user2.id}`]);
        } else if (!this.test1) {
          this.db.doc(`direct-messages/${user2.id}${user1.id}`).snapshotChanges().subscribe(obj => {
            this.test2 = obj.payload.exists;
            if(this.test2){
              this.router.navigate([`/direct-chat/${user2.id}${user1.id}`]);
            } else{
              this.createPrivateRoom(user2);
            }
          });
        }
      });
    }
    room1();





  }


  public createPrivateRoom(user2: User) {

    const user1Id = this.authService.currentUserSnapshot.id;
    const privateRoomId = user1Id + user2.id;
    const channelName = `${this.authService.currentUserSnapshot.email}-${user2.email}`
    const newPrivateRoom = {
      id: privateRoomId,
      name: channelName

    };
    this.db.collection('direct-messages').doc(privateRoomId).set(newPrivateRoom);
    this.router.navigate([`/direct-chat/${user1Id}${user2.id}`]);
  }

  public sendPrivateMessage(text: string, user2: User): void {
    const chatroomId = this.changedPrivateRoom.value;
    const message = {
      message: text,
      createdAt: new Date(),
      sender: this.authService.currentUserSnapshot,
      receiver: user2
    };
    this.db.collection(`direct-messages/${chatroomId}/messages`).add(message);
  }

}
