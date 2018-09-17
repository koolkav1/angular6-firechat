import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class StoreUserService {
   testuser: User = {
    firstName: 'kav',
    lastName: 'khalsa',
    bio: 'something something',
    photoUrl: 'htgfdngfdb',
    id: 'bjfbhvfdsvf',
    email:' bfdbvfdvb',
    status: 'offline'
  }
private userSource = new BehaviorSubject<User>(this.testuser);
currentUser = this.userSource.asObservable();

  constructor() { }
changeUser(user: User){
  this.userSource.next(user);
  console.log('user 2 is stored');
}  
}
