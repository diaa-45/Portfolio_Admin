import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NofificationsListComponent } from './nofifications-list.component';

describe('NofificationsListComponent', () => {
  let component: NofificationsListComponent;
  let fixture: ComponentFixture<NofificationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NofificationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NofificationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
