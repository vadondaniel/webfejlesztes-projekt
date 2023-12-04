import { Component } from '@angular/core';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webfejlesztes-projekt';

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.checkLoginStatus();
  }
}
