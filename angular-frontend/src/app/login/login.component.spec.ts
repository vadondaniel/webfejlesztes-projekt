import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let router: jasmine.SpyObj<Router>;
  let titleService: Title;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthenticationService', ['authenticationService']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    titleService = jasmine.createSpyObj('Title', ['setTitle']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MatCardModule, MatFormFieldModule],
      providers: [
        { provide: AuthenticationService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: Title, useValue: titleService }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title on init', () => {
    component.ngOnInit();
    expect(titleService.setTitle).toHaveBeenCalledWith('Login');
  });

  it('should handle successful login', () => {
    authService.authenticationService.and.returnValue(of(undefined));
    component.handleLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/countries']);
    expect(component.loginSuccess).toBeTrue();
    expect(component.invalidLogin).toBeFalse();
  });

  it('should handle failed login with status 401', () => {
    authService.authenticationService.and.returnValue(throwError({ status: 401 }));
    component.handleLogin();
    expect(component.invalidLogin).toBeTrue();
    expect(component.errorMessage).toBe('Invalid Credentials');
  });

  it('should handle failed login with other status', () => {
    authService.authenticationService.and.returnValue(throwError({ status: 500 }));
    component.handleLogin();
    expect(component.invalidLogin).toBeTrue();
    expect(component.errorMessage).toBe('Could not connect to the server');
  });
});