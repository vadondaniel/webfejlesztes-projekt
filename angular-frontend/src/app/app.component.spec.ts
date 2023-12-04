import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from './services/auth.service';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from './navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthenticationService', ['checkLoginStatus', 'isUserLoggedIn']);

    TestBed.configureTestingModule({
      declarations: [AppComponent, NavigationComponent],
      imports: [RouterTestingModule, MatSidenavModule, MatToolbarModule, MatListModule, NoopAnimationsModule],
      providers: [
        { provide: AuthenticationService, useValue: authService }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkLoginStatus on ngOnInit', () => {
    component.ngOnInit();
    expect(authService.checkLoginStatus).toHaveBeenCalled();
  });

  it('should show navigation and router-outlet when user is logged in', () => {
    authService.isUserLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-navigation')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should show router-outlet when user is not logged in', () => {
    authService.isUserLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-navigation')).toBeFalsy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});