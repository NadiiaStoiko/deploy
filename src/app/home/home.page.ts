import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAccountingCompany} from "./choose-company.model";
import {ApiService} from "../core/services/api.service";
import {FormGroup} from "@angular/forms";
import {SettingsService} from "../core/services/settings.service";
import {AccountingUserService} from '../core/services/accounting-user.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    public company: IAccountingCompany;
    private destroy$: Subject<boolean> = new Subject();
    public companies: IAccountingCompany[] = [];
    public selectedCompany: IAccountingCompany | null = null;
    public companyManagedId: number | null = null;

    constructor(
        private settingsService: SettingsService,
        private accountingUserService: AccountingUserService
    ) {
        this.company = {} as IAccountingCompany;
    }

    ngOnInit() {
        this.getCompanies()
    }

    getCompanies() {
        this.accountingUserService.getAccountingUser().pipe(
            takeUntil(this.destroy$)).subscribe(user => {
                if (user) {
                    this.settingsService
                        .getCompany(user.userId)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(companies => {
                            this.companies = companies;
                    });
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    selectCompany(company: IAccountingCompany) {
        this.selectedCompany = company;
        this.settingsService.setCurrentCompanyName(company.name);
    }

    manageCompany(company: IAccountingCompany): void {
        this.selectedCompany = company;
        if (company.companyId !== undefined) {
            this.companyManagedId = company.companyId;
        } else {
            this.companyManagedId = null;
        }

        if (this.companyManagedId !== null) {
            this.settingsService.setManagedCompanyId(this.companyManagedId);
        } else {
            console.error("companyManagedId is null, cannot set managed company ID.");
        }
    }

    isCompanySelected(company: IAccountingCompany): boolean {
        return !!(this.selectedCompany?.companyId === company.companyId);
    }

}
