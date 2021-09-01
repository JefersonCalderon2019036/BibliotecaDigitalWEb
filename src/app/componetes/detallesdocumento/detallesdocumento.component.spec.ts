import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesdocumentoComponent } from './detallesdocumento.component';

describe('DetallesdocumentoComponent', () => {
  let component: DetallesdocumentoComponent;
  let fixture: ComponentFixture<DetallesdocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesdocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesdocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
