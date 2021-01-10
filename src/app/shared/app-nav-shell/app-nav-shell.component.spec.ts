import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavShellComponent } from './app-nav-shell.component';

describe('AppNavShellComponent', () => {
  let component: AppNavShellComponent;
  let fixture: ComponentFixture<AppNavShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppNavShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
