import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
    private breakpointObserver = inject(BreakpointObserver);

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private router: Router,
        public authenticationService: AuthenticationService,
        private titleService: Title) { }

    getNavigationText(): string {
        let title = 'Home';
        if (this.router.url.startsWith('/countries/') && this.router.url.split('/').length > 2) {
            title = 'Country Details';
        } else if (this.router.url.startsWith('/cities/') && this.router.url.split('/').length > 2) {
            title = 'City Details';
        } else if (this.router.url.includes('countries')) {
            title = 'Countries';
        } else if (this.router.url.includes('cities')) {
            title = 'Cities';
        }
        this.titleService.setTitle(title);
        return title;
    }
}
