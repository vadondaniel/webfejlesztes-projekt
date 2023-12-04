import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './services/auth.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);
    if (!authService.isUserLoggedIn()) {
        return router.createUrlTree(['/login']);
    }
    return true;
};