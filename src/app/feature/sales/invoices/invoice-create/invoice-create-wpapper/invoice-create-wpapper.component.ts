import {Component, inject, OnInit} from '@angular/core';
import {AccountingInvoiceService} from "../../../../../core/services/accounting-invoice.service";
import {SettingsService} from "../../../../../core/services/settings.service";
import {asapScheduler, Subject, subscribeOn, takeUntil} from "rxjs";
import {catchError} from "rxjs/operators";
import {IInvoice} from "../../../../../core/models/invoice.model";
import {IInvoiceListItem} from "../../../../../core/models/invoice-list-item.model";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-invoice-create-wpapper',
    templateUrl: './invoice-create-wpapper.component.html',
    styleUrls: ['./invoice-create-wpapper.component.scss'],
})
export class InvoiceCreateWpapperComponent implements OnInit {
    public invoiceNumber!: number;
    public invoiceId!: number;
    private invoiceService = inject(AccountingInvoiceService);
    private accountingSettingsService = inject(SettingsService);
    private destroy$: Subject<boolean> = new Subject();
    public invoiceEdited!: IInvoice | any;
    public attachment!: any;
    public attachmentId: number | undefined;
    copiedInvoiceId: number | null = null;

    constructor(private activatedRoute: ActivatedRoute) {}


    ngOnInit() {
        // this.activatedRoute.queryParams.subscribe((param: any) => {
        //     this.invoiceId = +param.invoiceId;
        // });

        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.copiedInvoiceId = params['invoiceId'] || null;
            if (this.copiedInvoiceId) {
                this.invoiceService.getInvoiceById(this.copiedInvoiceId).pipe(
                    subscribeOn(asapScheduler),
                    takeUntil(this.destroy$),
                    // catchError(err => {
                    //     this.errorDialog.openError(err.message);
                    //     throw new Error(err);
                    // })
                )
                    .subscribe(invoice => {
                        this.invoiceEdited = invoice;
                        this.invoiceNumber = this.invoiceEdited.invoiceNumber;
                        this.attachmentId = invoice.attachment;

                        console.log('Received invoice:', invoice);


                    });
            }
        });
    }
}
