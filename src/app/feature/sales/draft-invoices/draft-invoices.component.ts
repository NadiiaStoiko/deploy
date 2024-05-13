import {Component, inject, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IInvoiceListItem} from "../../../core/models/invoice-list-item.model";
import {map, tap} from "rxjs/operators";
import {RegionalNumberFormatPipe} from "../../../shared/pipes/regional-number-format.pipe";

@Component({
    selector: 'app-draft-invoices',
    templateUrl: './draft-invoices.component.html',
    styleUrls: ['./draft-invoices.component.scss'],
})
export class DraftInvoicesComponent implements OnInit {

    title = 'Draft invoices';

    gridData$: Observable<IInvoiceListItem[]>;

    @Input()
    drafts$: Observable<IInvoiceListItem[]>;
    //
    // @Input()
    // totalAmount: number;

    constructor() {
        this.gridData$ = new Observable<IInvoiceListItem[]>();
        this.drafts$ = new Observable<IInvoiceListItem[]>();
    }

    ngOnInit(): void {
        this.gridData$ = this.drafts$.pipe(
            tap(drafts => console.log('Drafts:', drafts)) // Добавлено логирование
        );
    }

    // onInvoiceFilter(e: string) {
    //     const data = this.drafts$;
    //     this.searchStr = e.toLocaleLowerCase();
    //
    //     if (this.searchStr !== '') {
    //         const result = data.pipe(
    //             map((invoices) =>
    //                 invoices.filter(invoice =>
    //                     invoice.contactName.toLocaleLowerCase().includes(this.searchStr) ||
    //                     invoice.dateCreation.includes(this.searchStr) ||
    //                     this.regionalNumberPipe?.transform(invoice.totalAmount).toString().includes(this.searchStr))
    //             )
    //         )
    //
    //         this.gridData$ = result;
    //     } else {
    //         this.gridData$ = this.drafts$;
    //     }
    // }

}
