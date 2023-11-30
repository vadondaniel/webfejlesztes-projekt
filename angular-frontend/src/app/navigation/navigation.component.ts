import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  getNavigationText(): string {
    if (this.router.url.startsWith('/countries/') && this.router.url.split('/').length > 2) {
      return 'Country Details';
    } else if (this.router.url.startsWith('/cities/') && this.router.url.split('/').length > 2) {
      return 'City Details';
    } else if (this.router.url.includes('countries')) {
      return 'Countries';
    } else if (this.router.url.includes('cities')) {
      return 'Cities';
    } else {
      return 'Home';
    }
  }
}
