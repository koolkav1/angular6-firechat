import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectChatWindowComponent } from './direct-chat-window.component';

describe('DirectChatWindowComponent', () => {
  let component: DirectChatWindowComponent;
  let fixture: ComponentFixture<DirectChatWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectChatWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
