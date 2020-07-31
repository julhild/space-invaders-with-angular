import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenderShipComponent } from './defender-ship.component';

describe('DefenderShipComponent', () => {
  let component: DefenderShipComponent;
  let fixture: ComponentFixture<DefenderShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefenderShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefenderShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
