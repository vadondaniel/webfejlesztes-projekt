import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    // BASE_PATH: 'http://localhost:8080'
    USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

    public username: string | null;
    public password: string | null;

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.username = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
        this.password = sessionStorage.getItem('password'); // Assuming you also store the password in sessionStorage
    }

    authenticationService(username: string, password: string) {
        return this.http.get(`${this.configService.basePath}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((_) => {
                this.username = username;
                this.password = password;
                this.registerSuccessfulLogin(username, password);
            }));
    }

    createBasicAuthToken(username: string, password: string) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username: string, password: string) {
        sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem('password', password);
    }

    logout() {
        sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem('password');
        this.username = null;
        this.password = null;
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    checkLoginStatus() {
        const username = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem('password'); // Assuming you also store the password in sessionStorage

        if (username && password) {
            this.username = username;
            this.password = password;
        }
    }
}
