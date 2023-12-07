import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string | undefined;
    password: string | undefined;
    errorMessage = '';
    successMessage: string | undefined;
    invalidLogin = false;
    loginSuccess = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle('Login');
    }

    handleLogin() {
        this.authenticationService.authenticationService(this.username!, this.password!).subscribe({
            next: (_) => {
                this.invalidLogin = false;
                this.loginSuccess = true;
                this.successMessage = 'Login Successful.';
                this.router.navigate(['/countries']);
            },
            error: () => {
                this.loginSuccess = false;
                this.invalidLogin = true;
                this.errorMessage = 'Authentication Failed.';
            }
        });
    }
}