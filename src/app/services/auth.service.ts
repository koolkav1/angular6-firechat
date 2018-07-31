import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser:Observable<User | null>;
  public currentUserSnapshot: User | null;

  constructor(
    private router: Router,
    private alertService:AlertService,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
          
      this.currentUser = this.afAuth.authState
      .pipe(
        switchMap(
          (user) => {
            if(user){
              return this.db.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
              return of(null);
            }
          }
        )
      );
      this.setCurrentUserSnapshot();
   }
   public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean>{
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then((user) => {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        const updatedUser = {
          id: user.user.uid,
          email: user.user.email,
          firstName,
          lastName,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/udemy-chat-app.appspot.com/o/default_profile_pic.jpg?alt=media&token=83090f3b-099a-484b-bfc4-e0c3c6e7ea0c'
        };
        userRef.set(updatedUser);
        return true;
      })
      .catch((err) => false)
    );
   }
   public login (email: string, password: string) : Observable<boolean> {
     return from(
       this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user)=> true)
       .catch((err)=> false)
     );
   }
   public logout(): void {
     this.afAuth.auth.signOut().then(()=> {
      this.router.navigate(['/login']);
    this.alertService.alerts.next( new Alert('You have been successfully signed out', AlertType.Success));
     });
    
   }
   private setCurrentUserSnapshot():void {
    this.currentUser.subscribe(user => {
      this.currentUserSnapshot = user;
    });
   }
}
