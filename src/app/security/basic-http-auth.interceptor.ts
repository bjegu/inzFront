
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
@Injectable({
    providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.authService.isUserLoggedIn()) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.authService.getJwtToken()
                }
            })
        }
        return next.handle(req);
    }
}