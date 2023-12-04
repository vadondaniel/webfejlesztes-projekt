import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './auth.service';
import { ConfigService } from './config.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService, ConfigService]
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user', () => {
    service.authenticationService('testuser', 'testpass').subscribe(response => {
      expect(response).toEqual(undefined);
    });

    const request = httpMock.expectOne(`${configService.basePath}/basicauth`);
    expect(request.request.method).toBe('GET');
    request.flush(null); // flush with null to emit undefined
  });

  it('should register successful login', () => {
    service.registerSuccessfulLogin('testuser', 'testpass');
    expect(sessionStorage.getItem(service.USER_NAME_SESSION_ATTRIBUTE_NAME)).toBe('testuser');
    expect(sessionStorage.getItem('password')).toBe('testpass');
  });

  it('should logout user', () => {
    service.logout();
    expect(sessionStorage.getItem(service.USER_NAME_SESSION_ATTRIBUTE_NAME)).toBeNull();
    expect(sessionStorage.getItem('password')).toBeNull();
  });

  it('should check if user is logged in', () => {
    sessionStorage.setItem(service.USER_NAME_SESSION_ATTRIBUTE_NAME, 'testuser');
    expect(service.isUserLoggedIn()).toBeTrue();
  });

  it('should get logged in username', () => {
    sessionStorage.setItem(service.USER_NAME_SESSION_ATTRIBUTE_NAME, 'testuser');
    expect(service.getLoggedInUserName()).toBe('testuser');
  });
});