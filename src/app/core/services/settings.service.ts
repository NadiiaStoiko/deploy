import {inject, Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {ApiService} from "./api.service";
import {BehaviorSubject, Observable} from "rxjs";
import {IAccountingCompany} from "../../home/choose-company.model";
import {map, tap} from "rxjs/operators";
import {AccountingApiService} from "./accounting-api.service";


@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private apiService = inject(ApiService);
    private accountingUserService = inject(UserService);
    private accountingApiService = inject(AccountingApiService);
    private companyCashedSettings$ = new BehaviorSubject<IAccountingCompany[]>([]);
    private managedCompanyId?: number;
    private currentCompanyName = new BehaviorSubject<string>('Default Company Name');

    constructor() {
        this.updateManagedCompanyId();
    }

    setCurrentCompanyName(name: string) {
        this.currentCompanyName.next(name);
    }

    getCurrentCompanyName(): Observable<string> {
        return this.currentCompanyName.asObservable();
    }

    setManagedCompanyId(companyId: number): void {
        localStorage.setItem('managedCompanyId', JSON.stringify(companyId));
        this.managedCompanyId = companyId;
    }

    updateManagedCompanyId() {
        const item = localStorage.getItem('managedCompanyId');
        if (item) {
            this.managedCompanyId = +JSON.parse(item);
        } else {
            this.managedCompanyId = 0;
        }
    }

    getCompany(userId: number): Observable<IAccountingCompany[]> {
        return this.accountingApiService.put(`/companies/ReadAllCompanies`, {userId}).pipe(
            map(company => company.companies),
            tap((company: IAccountingCompany[]) => {
                this.companyCashedSettings$.next(company);

                // const managedCompanyId = JSON.parse(localStorage.getItem('managedCompanyId'));

                // if (managedCompanyId) {
                //     this.manageCompany(managedCompanyId);
                //     const managedCompany = this.getManagedCompany().getValue();
                //     if (!managedCompany.isOnBoardingPassed) {
                //         this.router.navigate(['/bookkeeping/onboarding']);
                //     }
                // } else {
                //     this.managedCompany$.next(company[0]);
                //     localStorage.setItem('managedCompanyId', JSON.stringify(company[0].companyId));
                // }
            })
        );
    }

    getManagedCompanyId(): number {
        const item = localStorage.getItem('managedCompanyId');
        if (item === null) {
            return 0;
        }
        return +JSON.parse(item);
    }

}
