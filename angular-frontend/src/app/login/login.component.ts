import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

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
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
    }

    handleLogin() {
        this.authenticationService.authenticationService(this.username!, this.password!).subscribe((result) => {
            this.invalidLogin = false;
            this.loginSuccess = true;
            this.successMessage = 'Login Successful.';
            this.router.navigate(['/countries']);
        }, (error) => {
            this.loginSuccess = false;
            if (error.status === 401) {
                this.invalidLogin = true;
                this.errorMessage = 'Invalid Credentials';
            } else {
                this.invalidLogin = true;
                this.errorMessage = 'Could not connect to the server';
            }
        });
    }
}