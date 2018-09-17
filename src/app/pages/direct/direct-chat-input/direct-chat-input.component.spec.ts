import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectChatInputComponent } from './direct-chat-input.component';

describe('DirectChatInputComponent', () => {
  let component: DirectChatInputComponent;
  let fixture: ComponentFixture<DirectChatInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectChatInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectChatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
