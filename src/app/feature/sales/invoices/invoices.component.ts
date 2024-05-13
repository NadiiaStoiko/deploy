import {
    Component,
    EventEmitter,
    inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';

import {Observable, Subscription} from "rxjs";
import {IInvoiceListItem} from "../../../core/models/invoice-list-item.model";
import {AccountingInvoiceService} from "../../../core/services/accounting-invoice.service";
import {map} from "rxjs/operators";
import {SettingsService} from "../../../core/services/settings.service";

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss'],
    // encapsulation: ViewEncapsulation.None,
})
export class InvoicesComponent implements OnInit, OnDestroy {
    public searchFilter = '';
    public gridData: any;
    public searchStr = '';
    public title = 'Invoices';
    public dateFormat = 'dd/MM/yyyy';
    private accountingSettingsService = inject(SettingsService);
    // public regionalNumberFormat = inject(RegionalNumberFormatPipe);

    @Output()
    public invoiceSeen = new EventEmitter();
    // public selectedType = 'invoices';
    invoices: IInvoiceListItem[] = [];
    private subscription: Subscription = new Subscription();
    private _invoices$: Observable<IInvoiceListItem[]> | undefined;
    constructor(
        private invoiceService: AccountingInvoiceService,
    ) {}
    ngOnInit() {
        this.invoices$ = this.invoiceService.setInvoices();
        this.gridData = this.invoices$;
        this.invoices$.subscribe(invoices => {
            console.log('Invoices received:', invoices);
        }, error => {
            console.error('Error', error);
        });
    }

    public get invoices$(): Observable<IInvoiceListItem[]> | undefined {
        return this._invoices$;

    }
    @Input()
    set invoices$(invoices: Observable<IInvoiceListItem[]>) {
        if (invoices) {
            this._invoices$ = invoices.pipe(
                map((arr) =>
                    arr.filter(invoice => invoice.invoiceStatus !== 'Draft')
                        .sort((a, b) => b.invoiceNumber - a.invoiceNumber)
                )
            );
        }
    };

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
