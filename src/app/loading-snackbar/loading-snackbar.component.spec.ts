import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSnackbarComponent } from './loading-snackbar.component';

describe('LoadingSnackbarComponent', () => {
  let component: LoadingSnackbarComponent;
  let fixture: ComponentFixture<LoadingSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
