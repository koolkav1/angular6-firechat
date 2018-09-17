import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectChatroomTitleBarComponent } from './direct-chatroom-title-bar.component';

describe('DirectChatroomTitleBarComponent', () => {
  let component: DirectChatroomTitleBarComponent;
  let fixture: ComponentFixture<DirectChatroomTitleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectChatroomTitleBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectChatroomTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
