import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {CompanyListConfig} from "../models/company-list-config";
import {HttpParams} from "@angular/common/http";
import {Company} from "../models/company.model";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
    constructor(
        private apiService: ApiService
    ) {
    }


    query(config: CompanyListConfig): Observable<{ companies: Company[]; companiesCount: number }> {

        const params = {};
        Object.keys(config.filters)
            .forEach((key) => {
                params[key] = config.filters[key];
            });

        return this.apiService.get(
            '/companies',
            {params: new HttpParams({fromObject: params})}
        );
    }

    get(id) {
        return this.apiService.get('/companies/' + id);
    }
    getDeletedCompanies() {
        return this.apiService.get('/companies/deleted');
    }

    getDeletedUsers(id) {
        return this.apiService.get('/companies/deleted/users/' + id);
    }

    getColor(data) {
        return this.apiService.get('/companies/color?year=' + data.year + '&month=' + data.month);
    }

    save(company) {
        return this.apiService.post('/companies/', company);
    }

    delete(id) {
        return this.apiService.delete('/companies/' + id);
    }

    update(id, company) {
        return this.apiService.put('/companies/' + id, company);
    }
    activate(id){
        return this.apiService.put('/companies/activate/' + id);
    }
    getAdministrationCompany(id){
        return this.apiService.get('/companies/administration/' + id);
    }
    saveAdministrationCompany(company){
        return this.apiService.put('/companies/administration/' + company.id, company);
    }
    editUserSettings(user){
        return this.apiService.put('/companies/administration/edit-user', user);
    }
    getCompanyLogoutTime(){
        return this.apiService.get('/companies/administration/logout-time');
    }
    updateCompanyLogoutTime(logoutTime){
        return this.apiService.put('/companies/administration/logout-time', logoutTime);
    }
}
