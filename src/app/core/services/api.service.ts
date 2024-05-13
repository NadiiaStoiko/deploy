import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

// import { JwtService } from './jwt.service';
import {catchError} from 'rxjs/operators';
import {JwtService} from "./jwt.service";

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        private jwtService: JwtService
    ) {
    }

    getConfig() {
        return new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
    }

    get(path: string, options = {}): Observable<any> {
        return this.http.get(`${environment.api_url}${path}`, options)
            .pipe(catchError(this.formatErrors));
    }

    // get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    //   return this.http.get(`${environment.api_url}${path}`, { params })
    //     .pipe(catchError(this.formatErrors));
    // }

    put(path: string, body: Object = {}, options = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    nonJSONPut(path: string, body: Object = {}, options = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    nonJSONPost(path: string, body: Object = {}, options = {}): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    patch(path: string, body: Object = {}): Observable<any> {
        return this.http.patch(
            `${environment.api_url}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    // delete(path): Observable<any> {
    //     return this.http.delete(
    //         `${environment.api_url}${path}`
    //     ).pipe(catchError(this.formatErrors));
    // }

    private formatErrors(error: any) {
        console.log(error);
        return throwError(error);
    }
}
