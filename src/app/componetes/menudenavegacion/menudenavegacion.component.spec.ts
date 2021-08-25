import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenudenavegacionComponent } from './menudenavegacion.component';

describe('MenudenavegacionComponent', () => {
  let component: MenudenavegacionComponent;
  let fixture: ComponentFixture<MenudenavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenudenavegacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenudenavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
