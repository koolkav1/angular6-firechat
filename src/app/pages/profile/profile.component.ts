import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{
  public currentUser: any = null;
  public user: User;
 public profileUrl: Observable<string | null>;
  private subscriptions: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  
  ) { 
    this.loadingService.isLoading.next(true);

  }

  ngOnInit() {
    this.subscriptions.push(
      this.auth.currentUser.subscribe(
        user => {
          this.currentUser = user;
          this.loadingService.isLoading.next(false);
          const ref = this.storage.ref(`${user.photoUrl}`);
          console.log(ref.getDownloadURL());
          this.profileUrl = ref.getDownloadURL();
          
        }
      )
    );

    this.subscriptions.push(
      this.route.paramMap.subscribe( params => {
        const userId = params.get('userId');
        const userRef : AngularFirestoreDocument<User> = this.db.doc(`users/${userId}`);
        userRef.valueChanges().subscribe(user => this.user = user);
      })
    );
    
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
