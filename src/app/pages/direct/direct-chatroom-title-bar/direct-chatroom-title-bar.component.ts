import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-direct-chatroom-title-bar',
  templateUrl: './direct-chatroom-title-bar.component.html',
  styleUrls: ['./direct-chatroom-title-bar.component.scss']
})
export class DirectChatroomTitleBarComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
