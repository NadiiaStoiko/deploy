import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AccountingApiService {
    constructor(
        private http: HttpClient,
    ) { }

    getConfig() {
        return new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
    }

    get(path: string, options = {}): Observable<any> {
        return this.http.get(`${environment.accounting_api_url}${path}`, options)
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}, options = {}): Observable<any> {
        return this.http.put(
            `${environment.accounting_api_url}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    nonJSONPut(path: string, body: Object = {}, options = {}): Observable<any> {
        return this.http.put(
            `${environment.accounting_api_url}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.accounting_api_url}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    nonJSONPost(path: string, body: Object = {}, options = {}): Observable<any> {
        return this.http.post(
            `${environment.accounting_api_url}${path}`,
            body,
            options
        ).pipe(catchError(this.formatErrors));
    }

    patch(path: string, body: Object = {}): Observable<any> {
        return this.http.patch(
            `${environment.accounting_api_url}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    // delete(path): Observable<any> {
    //     return this.http.delete(
    //         `${environment.accounting_api_url}${path}`
    //     ).pipe(catchError(this.formatErrors));
    // }

    private formatErrors(error: any) {
        return throwError(error);
    }
}

