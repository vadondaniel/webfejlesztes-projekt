import { CanActivateFn, UrlTree, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './services/auth.service';

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);
    if (!authService.isUserLoggedIn()) {
        return router.createUrlTree(['/login']);
    }
    return true;
};