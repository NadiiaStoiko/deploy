import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {ApiService} from "./api.service";
import {ApplicationListConfig} from "../models/applications-list-config.model";

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
    constructor(
        private apiService: ApiService
    ) {
    }

    query(config: ApplicationListConfig): Observable<{ applications: any[]; applicationsCount: number }> {
        // Convert any filters over to Angular's URLSearchParams
        const params = {};

        Object.keys(config.filters)
            .forEach((key) => {
                params[key] = config.filters[key];
            });

        return this.apiService
            .get(
                '/Applications',
                {params: new HttpParams({fromObject: params})}
            );
    }

    get(id) {
        return this.apiService.get('/Applications/' + id);
    }

    // delete(id) {
    //     return this.apiService.delete('/Applications/' + id);
    // }

    save(application): Observable<any> {
        return this.apiService.post('/Applications/', application);
    }

    update(applicationId, application): Observable<any> {
        return this.apiService.put('/Applications/' + applicationId, application);
    }

    getAppItems() {
        return this.apiService.get('/applications/items');
    }

    uploadIcon(id: number, icon) {
        return this.apiService.nonJSONPost('/applications/Icon/' + id, icon);
    }

    uploadBackground(id: number, background) {
        return this.apiService.nonJSONPost('/applications/Background/' + id, background);
    }

    updateImages(id: number) {
        return this.apiService.nonJSONPut('application/Images/' + id);
    }

    deleteIcons(id: number) {
        return this.apiService.delete('/applications/Icons/' + id);
    }

    deleteBackground(id: number) {
        return this.apiService.delete('/applications/Background/' + id);
    }
}
