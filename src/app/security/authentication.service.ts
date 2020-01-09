import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginRequest } from './login-request.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    jwtService = new JwtHelperService()

    constructor(private httpClient: HttpClient) {
        this.resolveJWT(sessionStorage.getItem('token'))
     }

    jwtPayload: any;
    static ADMIN_PERMISSION = 'ADMIN_PERMISSION'

    apiGeneral = environment.apiUrl;

    logIn(request: LoginRequest) {
        return this.httpClient.post<any>(this.apiGeneral + 'login', request, { observe: 'response' })
            .pipe(
                map(
                    response => {
                        sessionStorage.setItem('username', request.username);
                        let tokenStr = response.headers.get('authorization');
                        sessionStorage.setItem('token', tokenStr);
                        this.resolveJWT(tokenStr);
                        return;
                    }
                )
            );
    }
    logOut() {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')
        this.jwtPayload = null
    }
    isUserLoggedIn() {
        return !(sessionStorage.getItem('username') === null) && !(sessionStorage.getItem('token') === null)
    }
    getJwtToken() {
        return sessionStorage.getItem('token')
    }

    private resolveJWT(token: string) {
        this.jwtPayload = this.jwtService.decodeToken(token);
    }

    hasAdminAuthority(): boolean {
        if (this.jwtPayload) {
            const authorities = this.jwtPayload.auths as String[];
            return authorities.includes(AuthenticationService.ADMIN_PERMISSION)
        }
        return false;
    }

}