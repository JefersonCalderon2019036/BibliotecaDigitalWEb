import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesprestamosComponent } from './detallesprestamos.component';

describe('DetallesprestamosComponent', () => {
  let component: DetallesprestamosComponent;
  let fixture: ComponentFixture<DetallesprestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesprestamosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesprestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
