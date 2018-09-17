import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { User } from '../../interfaces/user';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @ViewChild('f') editUserForm: NgForm;
  public currentUser: any = null;
  public userId: string = '';
  public profileUrl: Observable<string | null>;
  private subscriptions: Subscription[] = [];
  public uploadPercent: Observable<number>;
  public downloadURL: Observable<string>;
  private filePath: string;

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fs: AngularFireStorage,
    private db: AngularFirestore,
    private location: Location,
    private alertService: AlertService
  ) {
    this.loadingService.isLoading.next(true);
  
 
    this.subscriptions.push(
      this.auth.currentUser.subscribe(user => {
        const ref = this.fs.ref(`${user.photoUrl}`);
        this.profileUrl = ref.getDownloadURL();
        
      })
    );
    
  }

  ngOnInit() {
    this.subscriptions.push(
      this.auth.currentUser.subscribe(user => {        
        this.currentUser = user;
        this.loadingService.isLoading.next(false);
        
      })
    );
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    );
   
  }
  public uploadFile(event): void {
    const file = event.target.files[0];
     this.filePath = `${file.name}_${this.currentUser.id}`;    
    const fileref = this.fs.ref(this.filePath);
    const task = this.fs.upload(this.filePath, file);
    //Observe the percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL us available 
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileref.getDownloadURL();
        const ref = this.fs.ref(`${this.currentUser.photoUrl}`);
        this.profileUrl = ref.getDownloadURL();
      })
    ).subscribe();
   

  }
  public onSubmit(): void {
  this.currentUser.firstName = this.editUserForm.value.userData.firstName;
   this.currentUser.lastName = this.editUserForm.value.userData.lastName;
    this.currentUser.quote = this.editUserForm.value.userData.quote;
    this.currentUser.bio = this.editUserForm.value.userData.bio;
    this.currentUser.photoUrl = this.filePath;
    const user:User = this.currentUser;
    console.log(user);
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.id}`);
    userRef.set(Object.assign(user));

    this.alertService.alerts
      .next(new Alert('Your profile was successfully updated!', AlertType.Success));
    this.location.back();
    
  }
  

 
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
