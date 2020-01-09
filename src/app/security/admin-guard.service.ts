import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
    constructor(public auth: AuthenticationService, public router: Router) { }
    canActivate(): boolean {
        if (!this.auth.hasAdminAuthority()) {
            this.router.navigate(['agreementList']);
            return false;
        }
        return true;
    }
}