import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
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
  public statusUser: any;
  public listOfUsers: Observable<User[]>;

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
          photoUrl: 'great_hair.jpg_NRj0vUpj1ahCnXtUWOsuvzBQIg62',
          quote: 'List is like a box of chocolates, you never know what you are going to get!',
          bio: 'Bio is under construction...',
          status: 'online'
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
       .then((user)=> {
         this.statusUser = user;
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        const status = { status:'online' } ;
        userRef.update(status);
         
         return true;
        })
       .catch((err)=> {console.log(err); return false;})
     );
   }
   public logout(): void {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${this.statusUser.user.uid}`);
    
    const status = { status:'offline' } ;
    userRef.update(status).then((succes) => {
      console.log(succes);
    })
    .catch((err)=> {
      console.log(err);
    });
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
 
  public getAllUsers() {
    return this.db.collection('users').valueChanges();
  }
  public getAllUsersExceptCurrent(){
    this.listOfUsers = this.db.collection('users').valueChanges();    
    
      
    }
          
    
  }

