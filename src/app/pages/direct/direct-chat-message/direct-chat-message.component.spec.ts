import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectChatMessageComponent } from './direct-chat-message.component';

describe('DirectChatMessageComponent', () => {
  let component: DirectChatMessageComponent;
  let fixture: ComponentFixture<DirectChatMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectChatMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
