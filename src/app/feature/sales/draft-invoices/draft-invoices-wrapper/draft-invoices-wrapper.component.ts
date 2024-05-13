import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject, takeUntil} from "rxjs";
import {IInvoiceListItem} from "../../../../core/models/invoice-list-item.model";
import {AccountingInvoiceService} from "../../../../core/services/accounting-invoice.service";
import {SettingsService} from "../../../../core/services/settings.service";
import {catchError, tap} from "rxjs/operators";

@Component({
    selector: 'app-draft-invoices-wrapper',
    templateUrl: './draft-invoices-wrapper.component.html',
    styleUrls: ['./draft-invoices-wrapper.component.scss'],
})
export class DraftInvoicesWrapperComponent implements OnInit, OnDestroy {
    public drafts$: Observable<IInvoiceListItem[]>;
    private invoiceService = inject(AccountingInvoiceService);
    private settingsService = inject(SettingsService);
    private destroy$ = new Subject<boolean>();
    public totalAmount?: number;
    constructor() {
        this.drafts$ = new Observable<IInvoiceListItem[]>();
    }

    ngOnInit() {
        this.drafts$ = this.invoiceService.getInvoices().pipe(
            tap(drafts => console.log('Invoices:', drafts)),
            tap(drafts => {
                this.totalAmount = this.calcTotal(drafts);
            }),
            catchError(err => {
                console.error('Error occurred:', err);
                return of([]); // Возвращаем пустой массив в случае ошибки
            })
        );
        // this.invoiceService.getInvoicesByStatus('Draft').pipe(
        //     tap((drafts) => {
        //         this.totalAmount = this.calcTotal(drafts);
        //     }),
        //     takeUntil(this.destroy$),
        //     // catchError(err => {
        //     //     this.isLoading = false;
        //     //     this.errorDialog.openError(err.message);
        //     //     throw new Error(err);
        //     // })
        // ).subscribe()
        // // (() => this.isLoading = false);
        //
        // this.drafts$ = this.invoiceService.getInvoices();

        // this.accountingVatService.getVatCashedData().pipe(
        //     takeUntil(this.destroy$),
        //     catchError(err => {
        //         this.errorDialog.openError(err.message);
        //         throw new Error(err);
        //     })
        // ).subscribe(vatCashed => this.taxCurrency = vatCashed.taxCurrency);

        // this.settingsService.getFiscalYears().pipe(
        //     takeUntil(this.destroy$),
        //     catchError(err => {
        //         this.errorDialog.openError(err.message);
        //         throw new Error(err);
        //     })
        // ).subscribe((years) => {
        //     if (years.length > 0) {
        //         this.fiscalYears = years;
        //         this.selectedYear = new Date(years.find(year => year.isSelected).fromDate).getFullYear();
        //         this.isYearOpen = years.find(year => year.isSelected).state === 'Open';
        //     }
        // });
    }

    calcTotal(drafts: IInvoiceListItem[]) {
        let currentTotal = 0;
        if (drafts.length > 0) {
            currentTotal = +drafts.reduce((acc, draft) => {
                if (draft.secondTotalAmount) {
                    return draft.secondTotalAmount + acc;
                } else {
                    return draft.totalAmount + acc;
                }
            }, 0).toFixed(2);
        }
        return currentTotal;
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}
