import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtService} from "../services/jwt.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(private jwtService: JwtService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headersConfig: any = {};

        if (!req.headers.has('accept')) {
            headersConfig['Accept'] = 'application/json';
        }

        if (((!req.url.includes('files') && !req.url.includes('images') && !req.url.includes('Background') && !req.url.includes('Icon') && !req.url.includes('SafT'))
            || req.url.includes('imagesclickable')) && (req.method === 'PUT' || req.method === 'POST')) {
            headersConfig['Content-Type'] = 'application/json';
        }

        let token;
        if (req.url.includes(environment.accounting_api_url)) {
            token = this.jwtService.getToken();
        } else {
            token = this.jwtService.getToken();
        }

        if (token) {
            headersConfig['Authorization'] = `Bearer ${token}`;
        }

        const request = req.clone({setHeaders: headersConfig});
        return next.handle(request);
    }
}
