import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let titleService: jasmine.SpyObj<Title>;

  beforeEach(() => {
    breakpointObserver = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    breakpointObserver.observe.and.returnValue(of({ matches: false, breakpoints: {} }));
    router = jasmine.createSpyObj('Router', ['navigate'], { url: '/countries' });
    authService = jasmine.createSpyObj('AuthenticationService', ['isUserLoggedIn', 'logout']);
    titleService = jasmine.createSpyObj('Title', ['setTitle']);

    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserver },
        { provide: Router, useValue: router },
        { provide: AuthenticationService, useValue: authService },
        { provide: Title, useValue: titleService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title and return navigation text', () => {
    router = jasmine.createSpyObj('Router', [], { url: '/countries' });
    expect(component.getNavigationText()).toBe('Countries');
    expect(titleService.setTitle).toHaveBeenCalledWith('Countries');
  });

  it('should render navigation links when user is logged in', () => {
    authService.isUserLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[routerLink="/countries"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/cities"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/login"]')).toBeTruthy();
  });

  it('should not render navigation links when user is not logged in', () => {
    authService.isUserLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[routerLink="/countries"]')).toBeFalsy();
    expect(compiled.querySelector('a[routerLink="/cities"]')).toBeFalsy();
    expect(compiled.querySelector('a[routerLink="/login"]')).toBeFalsy();
  });
});