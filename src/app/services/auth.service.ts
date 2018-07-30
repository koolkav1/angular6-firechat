import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser:Observable<User | null>;

  constructor(private router: Router,
  private alertService:AlertService) {
    //todo fetch the user fom the Firebase backend, then set the user
    this.currentUser = of(null);
   }
   public signup(firstname: string, lastName: string, email: string, password: string): Observable<boolean>{
    // TODO call Firebase singup function
    return of(true);
   }
   public login (email: string, password: string) : Observable<boolean> {
     return of(true);
   }
   public logout(): void {
    this.router.navigate(['/login']);
    this.alertService.alerts.next( new Alert('You have been successfully signed out', AlertType.Success));
   }
}
